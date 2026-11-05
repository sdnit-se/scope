import { useState } from 'react';
import { CoreObjectNameSingular } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';
import { Button } from 'twenty-ui/primitives/input';

import { useFindManyRecords } from '@/object-record/hooks/useFindManyRecords';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';
import { SimpleModeNoteComposer } from '@/simple-mode/components/SimpleModeNoteComposer';
import { SimpleModeNoteList } from '@/simple-mode/components/SimpleModeNoteList';
import { SimpleModeSection } from '@/simple-mode/components/SimpleModeSection';
import { SIMPLE_MODE_LABELS } from '@/simple-mode/constants/SimpleModeLabels';
import { type SimpleModeNote } from '@/simple-mode/types/SimpleModeNote';
import { type SimpleModeNoteTarget } from '@/simple-mode/types/SimpleModeNoteTarget';

type SimpleModeNotesSectionProps = {
  target: SimpleModeNoteTarget;
};

export const SimpleModeNotesSection = ({
  target,
}: SimpleModeNotesSectionProps) => {
  // The note still being written stays in the box, not in the history, so it is never edited in two places.
  const [draftNoteId, setDraftNoteId] = useState<string>();
  const { records, loading, refetch, hasNextPage, fetchMoreRecords } =
    useFindManyRecords<ObjectRecord & { note: SimpleModeNote | null }>({
      objectNameSingular: CoreObjectNameSingular.NoteTarget,
      filter: { [target.noteTargetFieldName]: { eq: target.recordId } },
      recordGqlFields: {
        id: true,
        note: {
          id: true,
          title: true,
          bodyV2: true,
          createdAt: true,
          createdBy: true,
        },
      },
      orderBy: [{ createdAt: 'DescNullsLast' }],
      limit: 60,
      fetchPolicy: 'network-only',
    });

  const notes = records
    .map((record) => record.note)
    .filter(isDefined)
    .filter((note) => note.id !== draftNoteId)
    .filter(
      (note, index, all) =>
        all.findIndex((other) => other.id === note.id) === index,
    )
    .toSorted((left, right) => right.createdAt.localeCompare(left.createdAt));

  const handleChanged = () => void refetch();

  return (
    <SimpleModeSection title={SIMPLE_MODE_LABELS.notes}>
      <SimpleModeNoteComposer
        target={target}
        onNoteSaved={handleChanged}
        onDraftNoteChange={setDraftNoteId}
      />
      <SimpleModeNoteList
        notes={notes}
        loading={loading}
        onChanged={handleChanged}
      />
      {hasNextPage && (
        <Button
          size="md"
          variant="ghost"
          onClick={() => void fetchMoreRecords()}
        >
          {SIMPLE_MODE_LABELS.showMore}
        </Button>
      )}
    </SimpleModeSection>
  );
};
