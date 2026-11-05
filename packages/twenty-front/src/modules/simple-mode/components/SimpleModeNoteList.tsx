import { styled } from '@linaria/react';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { CoreObjectNameSingular } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';
import { useToast } from 'twenty-ui/components/feedback';
import { Button } from 'twenty-ui/primitives/input';
import { themeCssVariables } from 'twenty-ui/theme';

import { getToastOptionsFromError } from '@/error-handler/utils/getToastOptionsFromError';
import { useDeleteOneRecord } from '@/object-record/hooks/useDeleteOneRecord';
import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';
import { SIMPLE_MODE_LABELS } from '@/simple-mode/constants/SimpleModeLabels';
import { useSimpleModeTypingFocus } from '@/simple-mode/hooks/useSimpleModeTypingFocus';
import { type SimpleModeNote } from '@/simple-mode/types/SimpleModeNote';
import { getSimpleModeNoteTitle } from '@/simple-mode/utils/getSimpleModeNoteTitle';
import { beautifyExactDateTime } from '~/utils/date-utils';
import { getRichTextFieldTextLines } from '@/object-record/record-field/ui/utils/getRichTextFieldTextLines';

const StyledList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledNote = styled.li`
  border-bottom: 1px solid ${themeCssVariables.border.color.medium};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
  padding-bottom: ${themeCssVariables.spacing[3]};
`;

const StyledMeta = styled.div`
  color: ${themeCssVariables.font.color.secondary};
  display: flex;
  flex-wrap: wrap;
  gap: ${themeCssVariables.spacing[2]};
  justify-content: space-between;
`;

const StyledText = styled.button`
  background: none;
  border: none;
  color: ${themeCssVariables.font.color.primary};
  cursor: text;
  font-family: inherit;
  font-size: ${themeCssVariables.font.size.lg};
  line-height: 1.5;
  padding: 0;
  text-align: left;
  white-space: pre-wrap;
`;

const StyledEditor = styled(TextareaAutosize)`
  border: 1px solid ${themeCssVariables.border.color.strong};
  border-radius: ${themeCssVariables.border.radius.md};
  color: ${themeCssVariables.font.color.primary};
  font-family: inherit;
  font-size: ${themeCssVariables.font.size.lg};
  line-height: 1.5;
  padding: ${themeCssVariables.spacing[2]};
  resize: none;
  width: 100%;
`;

const StyledRow = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledEmpty = styled.p`
  color: ${themeCssVariables.font.color.secondary};
  margin: 0;
`;

type SimpleModeNoteListItemProps = {
  note: SimpleModeNote;
  onChanged: () => void;
};

const SimpleModeNoteListItem = ({
  note,
  onChanged,
}: SimpleModeNoteListItemProps) => {
  const { enqueueToast } = useToast();
  const { updateOneRecord } = useUpdateOneRecord();
  const { deleteOneRecord } = useDeleteOneRecord({
    objectNameSingular: CoreObjectNameSingular.Note,
  });

  const text =
    getRichTextFieldTextLines(note.bodyV2).join('\n') || note.title || '';
  const [editedText, setEditedText] = useState<string | null>(null);
  const [isDeleteAsked, setIsDeleteAsked] = useState(false);
  const typingFocus = useSimpleModeTypingFocus(`simple-mode-note-${note.id}`);

  const handleSave = async () => {
    if (!isDefined(editedText)) {
      return;
    }

    try {
      await updateOneRecord({
        objectNameSingular: CoreObjectNameSingular.Note,
        idToUpdate: note.id,
        updateOneRecordInput: {
          title: getSimpleModeNoteTitle(editedText),
          bodyV2: { markdown: editedText, blocknote: null },
        },
      });
      setEditedText(null);
      onChanged();
    } catch (error) {
      enqueueToast(getToastOptionsFromError({ error }));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteOneRecord(note.id);
      onChanged();
    } catch (error) {
      enqueueToast(getToastOptionsFromError({ error }));
    }
  };

  return (
    <StyledNote>
      <StyledMeta>
        <span>
          {beautifyExactDateTime(note.createdAt)}
          {isDefined(note.createdBy?.name) ? ` · ${note.createdBy.name}` : ''}
        </span>
        {!isDefined(editedText) && !isDeleteAsked && (
          <StyledRow>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setEditedText(text)}
            >
              {SIMPLE_MODE_LABELS.edit}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              color="danger"
              onClick={() => setIsDeleteAsked(true)}
            >
              {SIMPLE_MODE_LABELS.delete}
            </Button>
          </StyledRow>
        )}
      </StyledMeta>
      {isDefined(editedText) ? (
        <>
          <StyledEditor
            aria-label={SIMPLE_MODE_LABELS.edit}
            value={editedText}
            autoFocus
            minRows={2}
            onChange={(event) => setEditedText(event.target.value)}
            onFocus={typingFocus.onFocus}
            onBlur={typingFocus.onBlur}
          />
          <StyledRow>
            <Button
              size="md"
              variant="solid"
              color="accent"
              onClick={() => void handleSave()}
            >
              {SIMPLE_MODE_LABELS.save}
            </Button>
            <Button
              size="md"
              variant="ghost"
              onClick={() => setEditedText(null)}
            >
              {SIMPLE_MODE_LABELS.cancel}
            </Button>
          </StyledRow>
        </>
      ) : (
        <StyledText type="button" onClick={() => setEditedText(text)}>
          {text}
        </StyledText>
      )}
      {isDeleteAsked && (
        <StyledRow role="alert">
          <span>{SIMPLE_MODE_LABELS.deleteNoteQuestion}</span>
          <Button
            size="md"
            variant="solid"
            color="danger"
            onClick={() => void handleDelete()}
          >
            {SIMPLE_MODE_LABELS.delete}
          </Button>
          <Button
            size="md"
            variant="ghost"
            onClick={() => setIsDeleteAsked(false)}
          >
            {SIMPLE_MODE_LABELS.cancel}
          </Button>
        </StyledRow>
      )}
    </StyledNote>
  );
};

type SimpleModeNoteListProps = {
  notes: SimpleModeNote[];
  loading: boolean;
  onChanged: () => void;
};

export const SimpleModeNoteList = ({
  notes,
  loading,
  onChanged,
}: SimpleModeNoteListProps) => {
  if (!loading && notes.length === 0) {
    return <StyledEmpty>{SIMPLE_MODE_LABELS.noNotes}</StyledEmpty>;
  }

  return (
    <StyledList>
      {notes.map((note) => (
        <SimpleModeNoteListItem
          key={note.id}
          note={note}
          onChanged={onChanged}
        />
      ))}
    </StyledList>
  );
};
