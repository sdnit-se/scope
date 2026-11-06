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
import { v4 } from 'uuid';

import { useNoteTypingFocus } from '@/activities/notes/hooks/useNoteTypingFocus';
import {
  getNoteDraftStorageKey,
  markNoteDraftFiled,
  readFiledNoteId,
  readNoteDraft,
  removeNoteDraft,
  writeNoteDraft,
} from '@/activities/notes/utils/noteDraftStorage';
import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { type ActivityTargetableObject } from '@/activities/types/ActivityTargetableEntity';
import { getActivityTargetObjectFieldIdName } from '@/activities/utils/getActivityTargetObjectFieldIdName';
import { getNoteTitleFromText } from '@/activities/notes/utils/getNoteTitleFromText';
import { withNoteDraftLock } from '@/activities/notes/utils/withNoteDraftLock';
import { getToastOptionsFromError } from '@/error-handler/utils/getToastOptionsFromError';
import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { useCreateOneRecord } from '@/object-record/hooks/useCreateOneRecord';
import { useLazyFindOneRecord } from '@/object-record/hooks/useLazyFindOneRecord';
import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';

const AUTOSAVE_DELAY_MS = 1000;

const NOTE_TYPES = ['NOTE', 'CALL', 'MEETING', 'EMAIL'] as const;

type NoteType = (typeof NOTE_TYPES)[number];

const isNoteType = (value: string): value is NoteType =>
  (NOTE_TYPES as readonly string[]).includes(value);

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

  const currentWorkspace = useAtomStateValue(currentWorkspaceState);
  const currentWorkspaceMember = useAtomStateValue(currentWorkspaceMemberState);
  const draftKey =
    isDefined(currentWorkspace) && isDefined(currentWorkspaceMember)
      ? getNoteDraftStorageKey({
          workspaceId: currentWorkspace.id,
          workspaceMemberId: currentWorkspaceMember.id,
          objectNameSingular: targetRecord.targetObjectNameSingular,
          recordId: targetRecord.id,
        })
      : undefined;

  // Each keystroke is kept in the browser, so a reload or a closed tab before the autosave loses nothing.
  const [restoredDraft] = useState(() => {
    if (!isDefined(draftKey)) {
      return undefined;
    }
    const stored = readNoteDraft(draftKey);

    // Fully saved text is just a note in the list now; replaying it could overwrite edits made since.
    if (stored?.isSynced === true) {
      removeNoteDraft(draftKey);

      return undefined;
    }

    return stored;
  });
  const restoredNoteType =
    isDefined(restoredDraft) && isNoteType(restoredDraft.noteType)
      ? restoredDraft.noteType
      : 'NOTE';

  const [text, setText] = useState(restoredDraft?.text ?? '');
  const [noteType, setNoteType] = useState<NoteType>(restoredNoteType);
  const [status, setStatus] = useState<SaveStatus>('idle');
  const [isFinishing, setIsFinishing] = useState(false);
  // Saves run one after another: the first creates the note, later ones update it. The link to the record is
  // tracked separately so a failed link is retried by the next save.
  const [draft] = useState<{
    text: string;
    noteType: NoteType;
    noteId?: string;
    linkId?: string;
    isCreated: boolean;
    isLinked: boolean;
    isSynced: boolean;
    isRestored: boolean;
    recreateFrom?: { isLinked: boolean; error: unknown };
    isRestoreHandled: boolean;
    isCreating: boolean;
    queuedSaves: number;
    queue: Promise<unknown>;
  }>(() => ({
    text: restoredDraft?.text ?? '',
    noteType: restoredNoteType,
    noteId: restoredDraft?.noteId,
    linkId: restoredDraft?.linkId,
    isCreated: restoredDraft?.isCreated ?? false,
    isLinked: restoredDraft?.isLinked ?? false,
    isSynced: false,
    isRestored: isDefined(restoredDraft?.noteId),
    isRestoreHandled: false,
    isCreating: false,
    queuedSaves: 0,
    queue: Promise.resolve(),
  }));

  const keepDraft = () => {
    if (isDefined(draftKey)) {
      writeNoteDraft(draftKey, {
        text: draft.text,
        noteType: draft.noteType,
        noteId: draft.noteId,
        linkId: draft.linkId,
        isCreated: draft.isCreated,
        isLinked: draft.isLinked,
        isSynced: draft.isSynced,
      });
    }
  };

  // A save finishing later records only what the server now has. Text another tab stored meanwhile, for this note or
  // as a draft of its own, is newer and stays.
  const keepIdentity = () => {
    if (!isDefined(draftKey)) {
      return;
    }
    const stored = readNoteDraft(draftKey);

    if (
      (isDefined(stored) && stored.noteId !== draft.noteId) ||
      readFiledNoteId(draftKey) === draft.noteId
    ) {
      return;
    }
    const text = stored?.text ?? draft.text;
    const noteType = stored?.noteType ?? draft.noteType;

    writeNoteDraft(draftKey, {
      text,
      noteType,
      noteId: draft.noteId,
      linkId: draft.linkId,
      isCreated: draft.isCreated,
      isLinked: draft.isLinked,
      isSynced:
        draft.isSynced && text === draft.text && noteType === draft.noteType,
    });
  };

  // The note and its link get their ids before anything is sent and are kept with the draft, so every save, tab and
  // reopening writes the same note: the database refuses a second one with that id.
  const startNewNote = () => {
    draft.noteId = v4();
    draft.linkId = v4();
    draft.isCreated = false;
    draft.isLinked = false;
    keepDraft();
    onDraftNoteChange(draft.noteId);
  };

  const { createOneRecord: createNote } = useCreateOneRecord({
    objectNameSingular: CoreObjectNameSingular.Note,
    shouldMatchRootQueryFilter: true,
  });
  const { createOneRecord: createNoteTarget } = useCreateOneRecord({
    objectNameSingular: CoreObjectNameSingular.NoteTarget,
    shouldMatchRootQueryFilter: true,
  });
  const { updateOneRecord } = useUpdateOneRecord();
  const { findOneRecord: findNote } = useLazyFindOneRecord({
    objectNameSingular: CoreObjectNameSingular.Note,
    recordGqlFields: { id: true, deletedAt: true },
    withSoftDeleted: true,
    fetchPolicy: 'network-only',
  });

  const isNoteInTrash = async (noteId: string) => {
    let deletedAt: string | null | undefined;

    await findNote({
      objectRecordId: noteId,
      onCompleted: (note) => {
        deletedAt = note.deletedAt;
      },
    }).catch(() => undefined);

    return isDefined(deletedAt);
  };

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

    if (!isDefined(draft.noteId)) {
      if (noteText.trim().length === 0) {
        return;
      }
      startNewNote();
    }

    // A recovered draft's ids may already have been written by an interrupted save or another tab, so they are
    // checked by updating before anything is created; a refused create would also drop the existing record from view.
    const isRecovering = draft.isRestored;

    // Writing to a note in the trash would change what restoring it brings back.
    if (isRecovering && (await isNoteInTrash(draft.noteId as string))) {
      startNewNote();
    } else if (draft.isCreated || isRecovering) {
      let updateError: unknown;
      const updated = await updateOneRecord({
        objectNameSingular: CoreObjectNameSingular.Note,
        idToUpdate: draft.noteId as string,
        updateOneRecordInput: fields,
      }).catch((error: unknown) => {
        updateError = error;

        return null;
      });

      if (isDefined(updated?.deletedAt)) {
        // In the trash, where updates still succeed: it stays there and the text becomes a new note.
        startNewNote();
      } else if (isDefined(updated)) {
        draft.isCreated = true;
      } else if (draft.isCreated && !isRecovering) {
        // The create below with the same id tells a destroyed note (id free, made anew and linked again) from a
        // passing failure (id taken, create refused, the original error reported and the next save updates again).
        draft.recreateFrom = { isLinked: draft.isLinked, error: updateError };
        draft.isCreated = false;
        draft.isLinked = false;
      } else {
        // Not on the server: any link it had went with it.
        draft.isCreated = false;
        draft.isLinked = false;
      }
    }

    if (!draft.isCreated) {
      draft.isCreating = true;

      const recreateFrom = draft.recreateFrom;

      draft.recreateFrom = undefined;

      try {
        await createNote({ id: draft.noteId, ...fields });
      } catch (error) {
        if (isDefined(recreateFrom)) {
          draft.isCreated = true;
          draft.isLinked = recreateFrom.isLinked;
          throw recreateFrom.error;
        }
        // The note may exist even though the create failed, so the next save checks by updating first.
        draft.isRestored = true;
        throw error;
      } finally {
        draft.isCreating = false;
      }
      draft.isCreated = true;
      keepIdentity();
    }

    if (!draft.isLinked) {
      const linkFields = {
        noteId: draft.noteId,
        [getActivityTargetObjectFieldIdName({
          nameSingular: targetRecord.targetObjectNameSingular,
        })]: targetRecord.id,
      };
      const confirmExistingLink = () =>
        updateOneRecord({
          objectNameSingular: CoreObjectNameSingular.NoteTarget,
          idToUpdate: draft.linkId as string,
          updateOneRecordInput: linkFields,
        }).then(
          (link) => isDefined(link) && !isDefined(link.deletedAt),
          () => false,
        );

      const isLinkedAlready = isRecovering && (await confirmExistingLink());

      if (!isLinkedAlready) {
        try {
          await createNoteTarget({ id: draft.linkId, ...linkFields });
        } catch (error) {
          // Refused because another tab made this very link: accepted only once it is confirmed on the server.
          if (!(await confirmExistingLink())) {
            throw error;
          }
        }
      }
      draft.isLinked = true;
      keepIdentity();
    }

    draft.isRestored = false;
  };

  // Another tab may have filed this note, or stored newer text for it, after this save was queued; that one wins.
  const isSaveOutdated = (noteText: string, type: NoteType) => {
    if (!isDefined(draftKey) || !isDefined(draft.noteId)) {
      return false;
    }
    if (readFiledNoteId(draftKey) === draft.noteId) {
      return true;
    }
    const stored = readNoteDraft(draftKey);

    return (
      isDefined(stored) &&
      stored.noteId === draft.noteId &&
      (stored.text !== noteText || stored.noteType !== type)
    );
  };

  const writeNoteUnlessOutdated = async (noteText: string, type: NoteType) => {
    if (isSaveOutdated(noteText, type)) {
      return false;
    }
    await writeNote(noteText, type);

    return true;
  };

  const queueSave = (noteText: string, type: NoteType): Promise<boolean> => {
    setStatus('saving');
    draft.queuedSaves += 1;

    const save = draft.queue
      .then(() =>
        isDefined(draftKey)
          ? withNoteDraftLock(draftKey, () =>
              writeNoteUnlessOutdated(noteText, type),
            )
          : writeNoteUnlessOutdated(noteText, type),
      )
      .then((isWritten) => {
        draft.queuedSaves -= 1;
        setStatus('saved');

        // A save still queued behind this one writes other text over it, so only the last one can be in sync.
        if (
          isWritten &&
          draft.queuedSaves === 0 &&
          noteText === draft.text &&
          type === draft.noteType
        ) {
          draft.isSynced = true;
          keepIdentity();
        }

        return true;
      })
      .catch((error: unknown) => {
        draft.queuedSaves -= 1;
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

  // A recovered draft is shown again, kept out of the list while it is in the box, and synced with its latest text.
  useEffect(() => {
    if (draft.isRestoreHandled || !isDefined(restoredDraft)) {
      return;
    }
    draft.isRestoreHandled = true;
    onDraftNoteChange(restoredDraft.noteId);

    // An emptied draft of a saved note is synced too, so the note does not keep text the person erased.
    if (
      restoredDraft.text.trim().length > 0 ||
      isDefined(restoredDraft.noteId)
    ) {
      debouncedSave(restoredDraft.text, restoredNoteType);
    }
  }, [
    draft,
    restoredDraft,
    restoredNoteType,
    onDraftNoteChange,
    debouncedSave,
  ]);

  const handleTextChange = (nextText: string) => {
    setText(nextText);
    draft.text = nextText;
    draft.isSynced = false;
    keepDraft();
    debouncedSave(nextText, noteType);
  };

  const handleTypeClick = (type: NoteType) => {
    setNoteType(type);
    draft.noteType = type;
    draft.isSynced = false;
    keepDraft();

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

    const filedText = text;
    const filedNoteType = noteType;

    setIsFinishing(true);
    const isSaved = await queueSave(filedText, filedNoteType);
    setIsFinishing(false);

    // A failed save keeps the text and the draft, so trying again updates the same note.
    if (isSaved) {
      const filedNoteId = draft.noteId;
      const stored = isDefined(draftKey) ? readNoteDraft(draftKey) : undefined;

      draft.noteId = undefined;
      draft.linkId = undefined;
      draft.isCreated = false;
      draft.isLinked = false;
      draft.text = '';
      draft.noteType = 'NOTE';

      // Another tab may have written newer text, another type or a draft of its own since; that stays recoverable.
      if (
        isDefined(draftKey) &&
        isDefined(filedNoteId) &&
        stored?.noteId === filedNoteId &&
        stored?.text === filedText &&
        stored?.noteType === filedNoteType
      ) {
        markNoteDraftFiled(draftKey, filedNoteId);
      }
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
