import { CustomResolverFetchMoreLoader } from '@/activities/components/CustomResolverFetchMoreLoader';
import { SkeletonLoader } from '@/activities/components/SkeletonLoader';
import { NoteList } from '@/activities/notes/components/NoteList';
import { type Note } from '@/activities/types/Note';
import { AnimatedPlaceholder } from '@/ui/feedback/empty-state/components/AnimatedPlaceholder/AnimatedPlaceholder';
import { EmptyState } from '@/ui/feedback/empty-state/components/EmptyState';
import { styled } from '@linaria/react';
import { t } from '@lingui/core/macro';
import { type ReactNode } from 'react';
import { isDefined } from 'twenty-shared/utils';

import { IconPlus } from 'twenty-ui/icon';
import { Button } from 'twenty-ui/primitives/input';

const StyledNotesContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

type NotesCardContentProps = {
  loading: boolean;
  notes: Note[];
  onCreateNote: (() => void) | undefined;
  onLastRowVisible: () => Promise<void>;
  composer?: ReactNode;
};

export const NotesCardContent = ({
  loading,
  notes,
  onCreateNote,
  onLastRowVisible,
  composer,
}: NotesCardContentProps) => {
  const isNotesEmpty = notes.length === 0;

  if (loading && isNotesEmpty) {
    return <SkeletonLoader />;
  }

  if (isNotesEmpty) {
    return (
      <StyledNotesContainer>
        {composer}
        <EmptyState.Root>
          <AnimatedPlaceholder type="noNote" />
          <EmptyState.Content>
            <EmptyState.Title>{t`No notes`}</EmptyState.Title>
            <EmptyState.Description>
              {t`There are no associated notes with this record.`}
            </EmptyState.Description>
          </EmptyState.Content>
          {isDefined(onCreateNote) && (
            <Button
              startIcon={<IconPlus />}
              onClick={onCreateNote}
              variant="outline"
            >{t`New note`}</Button>
          )}
        </EmptyState.Root>
      </StyledNotesContainer>
    );
  }

  return (
    <StyledNotesContainer>
      {composer}
      <NoteList notes={notes} />
      <CustomResolverFetchMoreLoader
        loading={loading}
        onLastRowVisible={onLastRowVisible}
      />
    </StyledNotesContainer>
  );
};
