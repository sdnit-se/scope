import { CustomResolverFetchMoreLoader } from '@/activities/components/CustomResolverFetchMoreLoader';
import { SkeletonLoader } from '@/activities/components/SkeletonLoader';
import { NoteList } from '@/activities/notes/components/NoteList';
import { type Note } from '@/activities/types/Note';
import { AnimatedPlaceholder } from '@/ui/feedback/empty-state/components/AnimatedPlaceholder/AnimatedPlaceholder';
import { EmptyState } from '@/ui/feedback/empty-state/components/EmptyState';
import { styled } from '@linaria/react';
import { t } from '@lingui/core/macro';
import { isHubSpotHistoryNote } from '@/activities/notes/utils/isHubSpotHistoryNote';
import { type ReactNode, useState } from 'react';
import { isDefined } from 'twenty-shared/utils';

import { IconChevronDown, IconChevronRight, IconPlus } from 'twenty-ui/icon';
import { Button } from 'twenty-ui/primitives/input';
import { themeCssVariables } from 'twenty-ui/theme';

const StyledNotesContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

const StyledHistoryToggle = styled.div`
  padding: ${themeCssVariables.spacing[3]};
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
  const [isHistoryShown, setIsHistoryShown] = useState(false);
  const isNotesEmpty = notes.length === 0;
  const historyNotes = notes.filter(isHubSpotHistoryNote);
  const writtenNotes = notes.filter((note) => !isHubSpotHistoryNote(note));

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
      <NoteList notes={writtenNotes} />
      {historyNotes.length > 0 && (
        <StyledHistoryToggle>
          <Button
            variant="ghost"
            startIcon={
              isHistoryShown ? <IconChevronDown /> : <IconChevronRight />
            }
            aria-expanded={isHistoryShown}
            onClick={() => setIsHistoryShown(!isHistoryShown)}
          >
            {t`HubSpot history (${historyNotes.length})`}
          </Button>
        </StyledHistoryToggle>
      )}
      {isHistoryShown && <NoteList notes={historyNotes} />}
      {/* Remounted per page: with history folded away a page can add nothing visible, so the loader must look again. */}
      <CustomResolverFetchMoreLoader
        key={notes.length}
        loading={loading}
        onLastRowVisible={onLastRowVisible}
      />
    </StyledNotesContainer>
  );
};
