import { styled } from '@linaria/react';
import { t } from '@lingui/core/macro';
import { useEffect, useState, type KeyboardEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { CoreObjectNameSingular } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';
import { useToast } from 'twenty-ui/components/feedback';
import { Button } from 'twenty-ui/primitives/input';
import { themeCssVariables } from 'twenty-ui/theme';
import { useDebouncedCallback } from 'use-debounce';

import { useNoteTypingFocus } from '@/activities/notes/hooks/useNoteTypingFocus';
import { type ActivityTargetableObject } from '@/activities/types/ActivityTargetableEntity';
import { getActivityTargetObjectFieldIdName } from '@/activities/utils/getActivityTargetObjectFieldIdName';
import { getNoteTitleFromText } from '@/activities/notes/utils/getNoteTitleFromText';
import { getToastOptionsFromError } from '@/error-handler/utils/getToastOptionsFromError';
import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { useCreateOneRecord } from '@/object-record/hooks/useCreateOneRecord';
import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';

const AUTOSAVE_DELAY_MS = 1000;

const NOTE_TYPES = ['NOTE', 'CALL', 'MEETING', 'EMAIL'] as const;

type NoteType = (typeof NOTE_TYPES)[number];

const StyledComposer = styled.div`
  border: 1px solid ${themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.md};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[2]};
  margin: ${themeCssVariables.spacing[3]};
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
  font-size: ${themeCssVariables.font.size.md};
  line-height: 1.5;
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
  color: ${themeCssVariables.font.color.tertiary};
`;

type SaveStatus = 'idle' | 'saving' | 'saved';

type NoteQuickComposerProps = {
  targetRecord: ActivityTargetableObject;
  onDraftNoteChange: (noteId: string | undefined) => void;
};

// One click into the box and the person is typing, without the side panel. The draft is saved a second after typing
// stops so leaving loses nothing; Save or Ctrl/Cmd+Enter files it and empties the box for the next note.
export const NoteQuickComposer = ({
  targetRecord,
  onDraftNoteChange,
}: NoteQuickComposerProps) => {
  const { enqueueToast } = useToast();
  const { objectMetadataItem: noteMetadataItem } = useObjectMetadataItem({
    objectNameSingular: CoreObjectNameSingular.Note,
  });
  // Activity type is a field of this workspace's application, not of Twenty itself.
  const isActivityTypeAvailable = noteMetadataItem.fields.some(
    (field) => field.name === 'activityType',
  );
  const typingFocus = useNoteTypingFocus(`note-box-${targetRecord.id}`);

  const [text, setText] = useState('');
  const [noteType, setNoteType] = useState<NoteType>('NOTE');
  const [status, setStatus] = useState<SaveStatus>('idle');
  const [isFinishing, setIsFinishing] = useState(false);
  // Saves run one after another: the first creates the note, later ones update it. The link to the record is
  // tracked separately so a failed link is retried by the next save.
  const [draft] = useState<{
    noteId?: string;
    isCreating: boolean;
    isLinked: boolean;
    queue: Promise<unknown>;
  }>(() => ({ isCreating: false, isLinked: false, queue: Promise.resolve() }));

  const { createOneRecord: createNote } = useCreateOneRecord({
    objectNameSingular: CoreObjectNameSingular.Note,
    shouldMatchRootQueryFilter: true,
  });
  const { createOneRecord: createNoteTarget } = useCreateOneRecord({
    objectNameSingular: CoreObjectNameSingular.NoteTarget,
    shouldMatchRootQueryFilter: true,
  });
  const { updateOneRecord } = useUpdateOneRecord();

  const noteTypeLabels: Record<NoteType, string> = {
    NOTE: t`Note`,
    CALL: t`Call`,
    MEETING: t`Meeting`,
    EMAIL: t({ message: 'Email', context: 'note type' }),
  };

  const writeNote = async (noteText: string, type: NoteType) => {
    const fields = {
      title: getNoteTitleFromText(noteText) ?? t`Note`,
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
      draft.isCreating = true;

      try {
        draft.noteId = (await createNote(fields)).id;
      } finally {
        draft.isCreating = false;
      }
      onDraftNoteChange(draft.noteId);
    }

    if (!draft.isLinked) {
      await createNoteTarget({
        noteId: draft.noteId,
        [getActivityTargetObjectFieldIdName({
          nameSingular: targetRecord.targetObjectNameSingular,
        })]: targetRecord.id,
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
    // An empty box is nothing to file, unless a first save is still creating the note with older text.
    if (
      isFinishing ||
      (text.trim().length === 0 &&
        !isDefined(draft.noteId) &&
        !draft.isCreating)
    ) {
      return;
    }

    debouncedSave.cancel();

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
        aria-label={t`Write a note…`}
        placeholder={t`Write a note…`}
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
                {noteTypeLabels[type]}
              </Button>
            ))}
        </StyledTypes>
        <StyledActions>
          <StyledStatus aria-live="polite">
            {status === 'saving'
              ? t`Saving…`
              : status === 'saved'
                ? t`Saved ✓`
                : t`Ctrl+Enter saves`}
          </StyledStatus>
          <Button
            size="md"
            variant="solid"
            color="accent"
            disabled={isFinishing}
            onClick={() => void handleSave()}
          >
            {t`Save`}
          </Button>
        </StyledActions>
      </StyledFooter>
    </StyledComposer>
  );
};
