import { styled } from '@linaria/react';
import { useEffect, useState, type KeyboardEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { CoreObjectNameSingular } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';
import { useToast } from 'twenty-ui/components/feedback';
import { Button } from 'twenty-ui/primitives/input';
import { themeCssVariables } from 'twenty-ui/theme';
import { useDebouncedCallback } from 'use-debounce';

import { getToastOptionsFromError } from '@/error-handler/utils/getToastOptionsFromError';
import { useCreateOneRecord } from '@/object-record/hooks/useCreateOneRecord';
import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';
import { SIMPLE_MODE_LABELS } from '@/simple-mode/constants/SimpleModeLabels';
import { useSimpleModeTypingFocus } from '@/simple-mode/hooks/useSimpleModeTypingFocus';
import { useIsNoteActivityTypeAvailable } from '@/simple-mode/hooks/useIsNoteActivityTypeAvailable';
import { type SimpleModeNoteTarget } from '@/simple-mode/types/SimpleModeNoteTarget';
import { getSimpleModeNoteTitle } from '@/simple-mode/utils/getSimpleModeNoteTitle';

const AUTOSAVE_DELAY_MS = 1000;

const NOTE_TYPES = ['NOTE', 'CALL', 'MEETING', 'EMAIL'] as const;

type NoteType = (typeof NOTE_TYPES)[number];

const StyledComposer = styled.div`
  border: 1px solid ${themeCssVariables.border.color.strong};
  border-radius: ${themeCssVariables.border.radius.md};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[2]};
  padding: ${themeCssVariables.spacing[3]};

  &:focus-within {
    border-color: ${themeCssVariables.border.color.blue};
  }
`;

const StyledTextarea = styled(TextareaAutosize)`
  background: transparent;
  border: none;
  color: ${themeCssVariables.font.color.primary};
  font-family: inherit;
  font-size: ${themeCssVariables.font.size.lg};
  line-height: 1.5;
  min-height: 96px;
  outline: none;
  resize: none;
  width: 100%;

  &::placeholder {
    color: ${themeCssVariables.font.color.light};
  }
`;

const StyledFooter = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${themeCssVariables.spacing[2]};
  justify-content: space-between;
`;

const StyledTypes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${themeCssVariables.spacing[1]};
`;

const StyledActions = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[3]};
`;

const StyledStatus = styled.span`
  color: ${themeCssVariables.font.color.secondary};
`;

type SaveStatus = 'idle' | 'saving' | 'saved';

type SimpleModeNoteComposerProps = {
  target: SimpleModeNoteTarget;
  onNoteSaved: () => void;
  onDraftNoteChange: (noteId: string | undefined) => void;
};

// One click in the box and the seller is typing. The note is saved while they type, so leaving the page loses nothing;
// "Spara" or Ctrl+Enter finishes it and empties the box for the next one.
export const SimpleModeNoteComposer = ({
  target,
  onNoteSaved,
  onDraftNoteChange,
}: SimpleModeNoteComposerProps) => {
  const { enqueueToast } = useToast();
  const isActivityTypeAvailable = useIsNoteActivityTypeAvailable();
  const typingFocus = useSimpleModeTypingFocus(
    `simple-mode-note-box-${target.recordId}`,
  );

  const [text, setText] = useState('');
  const [noteType, setNoteType] = useState<NoteType>('NOTE');
  const [status, setStatus] = useState<SaveStatus>('idle');
  const [isFinishing, setIsFinishing] = useState(false);
  // Saves run one after another, so the first one creates the note and later ones update that same note.
  const [draft] = useState<{
    noteId?: string;
    isLinked: boolean;
    queue: Promise<unknown>;
  }>(() => ({ isLinked: false, queue: Promise.resolve() }));

  const { createOneRecord: createNote } = useCreateOneRecord({
    objectNameSingular: CoreObjectNameSingular.Note,
  });
  const { createOneRecord: createNoteTarget } = useCreateOneRecord({
    objectNameSingular: CoreObjectNameSingular.NoteTarget,
  });
  const { updateOneRecord } = useUpdateOneRecord();

  const writeNote = async (noteText: string, type: NoteType) => {
    const fields = {
      title: getSimpleModeNoteTitle(noteText),
      bodyV2: { markdown: noteText, blocknote: null },
      ...(isActivityTypeAvailable ? { activityType: type } : {}),
    };

    if (isDefined(draft.noteId)) {
      await updateOneRecord({
        objectNameSingular: CoreObjectNameSingular.Note,
        idToUpdate: draft.noteId,
        updateOneRecordInput: fields,
      });
    } else if (noteText.trim().length === 0) {
      return;
    } else {
      draft.noteId = (await createNote(fields)).id;
      onDraftNoteChange(draft.noteId);
    }

    // Retried on the next save if it failed, so the note never stays off this record.
    if (!draft.isLinked) {
      await createNoteTarget({
        noteId: draft.noteId,
        [target.noteTargetFieldName]: target.recordId,
      });
      draft.isLinked = true;
    }
  };

  const queueSave = (noteText: string, type: NoteType): Promise<boolean> => {
    setStatus('saving');

    const save = draft.queue
      .then(() => writeNote(noteText, type))
      .then(() => {
        setStatus('saved');
        onNoteSaved();

        return true;
      })
      .catch((error: unknown) => {
        setStatus('idle');
        enqueueToast(getToastOptionsFromError({ error }));

        return false;
      });

    draft.queue = save;

    return save;
  };

  const debouncedSave = useDebouncedCallback(queueSave, AUTOSAVE_DELAY_MS);

  // Leaving the page while a save is waiting writes it at once instead of dropping it.
  useEffect(
    () => () => {
      void debouncedSave.flush();
    },
    [debouncedSave],
  );

  const handleTextChange = (nextText: string) => {
    setText(nextText);
    debouncedSave(nextText, noteType);
  };

  const handleTypeClick = (type: NoteType) => {
    setNoteType(type);

    if (text.trim().length > 0) {
      debouncedSave(text, type);
    }
  };

  const handleSave = async () => {
    debouncedSave.cancel();

    if (isFinishing || (text.trim().length === 0 && !isDefined(draft.noteId))) {
      return;
    }

    setIsFinishing(true);
    const isSaved = await queueSave(text, noteType);
    setIsFinishing(false);

    // A failed save keeps the text and the draft, so trying again updates the same note.
    if (isSaved) {
      draft.noteId = undefined;
      draft.isLinked = false;
      onDraftNoteChange(undefined);
      setText('');
      setNoteType('NOTE');
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      void handleSave();
    }
  };

  return (
    <StyledComposer>
      <StyledTextarea
        aria-label={SIMPLE_MODE_LABELS.noteBoxPlaceholder}
        placeholder={SIMPLE_MODE_LABELS.noteBoxPlaceholder}
        value={text}
        minRows={3}
        readOnly={isFinishing}
        onChange={(event) => handleTextChange(event.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={typingFocus.onFocus}
        onBlur={typingFocus.onBlur}
      />
      <StyledFooter>
        <StyledTypes>
          {isActivityTypeAvailable &&
            NOTE_TYPES.map((type) => (
              <Button
                key={type}
                size="sm"
                variant={noteType === type ? 'soft' : 'ghost'}
                color={noteType === type ? 'accent' : 'neutral'}
                aria-pressed={noteType === type}
                disabled={isFinishing}
                onClick={() => handleTypeClick(type)}
              >
                {SIMPLE_MODE_LABELS.noteTypes[type]}
              </Button>
            ))}
        </StyledTypes>
        <StyledActions>
          <StyledStatus aria-live="polite">
            {status === 'saving'
              ? SIMPLE_MODE_LABELS.saving
              : status === 'saved'
                ? SIMPLE_MODE_LABELS.saved
                : SIMPLE_MODE_LABELS.saveHint}
          </StyledStatus>
          <Button
            size="md"
            variant="solid"
            color="accent"
            disabled={isFinishing}
            onClick={() => void handleSave()}
          >
            {SIMPLE_MODE_LABELS.save}
          </Button>
        </StyledActions>
      </StyledFooter>
    </StyledComposer>
  );
};
