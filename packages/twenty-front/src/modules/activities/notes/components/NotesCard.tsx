import { useCreateActivityForTargetRecord } from '@/activities/hooks/useCreateActivityForTargetRecord';
import { NoteQuickComposer } from '@/activities/notes/components/NoteQuickComposer';
import { NotesCardContent } from '@/activities/notes/components/NotesCardContent';
import { useNotes } from '@/activities/notes/hooks/useNotes';
import { type ActivityTargetableObject } from '@/activities/types/ActivityTargetableEntity';
import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { useCanUpdateObjectRecords } from '@/object-record/hooks/useCanUpdateObjectRecords';
import { isObjectMetadataReadOnly } from '@/object-record/read-only/utils/isObjectMetadataReadOnly';
import { WidgetHeaderCountEffect } from '@/page-layout/widgets/components/WidgetHeaderCountEffect';
import { useTargetRecord } from '@/ui/layout/contexts/useTargetRecord';
import { useState } from 'react';
import { CoreObjectNameSingular } from 'twenty-shared/types';

type NotesCardForRecordProps = {
  targetRecord: ActivityTargetableObject;
};

const NotesCardForRecord = ({ targetRecord }: NotesCardForRecordProps) => {
  const { notes, loading, totalCountNotes, fetchMoreNotes, hasNextPage } =
    useNotes(targetRecord);
  // The note still being written stays in the box, not in the list, so it is never edited in two places.
  const [draftNoteId, setDraftNoteId] = useState<string>();

  const handleLastRowVisible = async () => {
    if (hasNextPage) {
      await fetchMoreNotes();
    }
  };

  const { canCreateActivity, createActivity } =
    useCreateActivityForTargetRecord({
      targetRecord,
      activityObjectNameSingular: CoreObjectNameSingular.Note,
    });

  // The box writes notes and their links itself, so it needs those permissions as well as the record's.
  const { objectMetadataItem: noteMetadataItem } = useObjectMetadataItem({
    objectNameSingular: CoreObjectNameSingular.Note,
  });
  const { canUpdateObjectRecords: canWriteNotes } = useCanUpdateObjectRecords(
    CoreObjectNameSingular.Note,
  );
  const { canUpdateObjectRecords: canWriteNoteTargets } =
    useCanUpdateObjectRecords(CoreObjectNameSingular.NoteTarget);
  const canWriteInBox =
    canCreateActivity &&
    canWriteNotes &&
    canWriteNoteTargets &&
    !isObjectMetadataReadOnly({ objectMetadataItem: noteMetadataItem });

  return (
    <>
      <WidgetHeaderCountEffect count={totalCountNotes} />
      <NotesCardContent
        loading={loading}
        notes={notes.filter((note) => note.id !== draftNoteId)}
        composer={
          canWriteInBox ? (
            <NoteQuickComposer
              targetRecord={targetRecord}
              onDraftNoteChange={setDraftNoteId}
            />
          ) : undefined
        }
        onCreateNote={canCreateActivity ? createActivity : undefined}
        onLastRowVisible={handleLastRowVisible}
      />
    </>
  );
};

// Keyed by record: a cached Notes tab reused for another record must not carry the first record's draft.
export const NotesCard = () => {
  const targetRecord = useTargetRecord();

  return (
    <NotesCardForRecord
      key={`${targetRecord.targetObjectNameSingular}:${targetRecord.id}`}
      targetRecord={targetRecord}
    />
  );
};
