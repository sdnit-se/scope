import { fieldMetadataItemByIdSelector } from '@/object-metadata/states/fieldMetadataItemByIdSelector';
import { isFieldMetadataItemFilterableAndSortableSelector } from '@/object-metadata/states/isFieldMetadataItemFilterableAndSortableSelector';
import { currentRecordSortsComponentState } from '@/object-record/record-sort/states/currentRecordSortsComponentState';
import { useAtomComponentState } from '@/ui/utilities/state/jotai/hooks/useAtomComponentState';
import { useAtomFamilySelectorValue } from '@/ui/utilities/state/jotai/hooks/useAtomFamilySelectorValue';
import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { isDefined } from 'twenty-shared/utils';
import { LightIconButton } from 'twenty-ui/components/input';
import { IconArrowDown, IconArrowsSort, IconArrowUp } from 'twenty-ui/icon';
import { themeCssVariables } from 'twenty-ui/theme';
import { v4 } from 'uuid';
import { ViewSortDirection } from '~/generated-metadata/graphql';

const StyledSortButtonContainer = styled.div<{
  isSorted: boolean;
  hasPlusButton: boolean;
}>`
  display: flex;
  opacity: ${({ isSorted }) => (isSorted ? 1 : 0)};
  position: absolute;
  right: ${({ hasPlusButton }) =>
    hasPlusButton
      ? themeCssVariables.spacing[8]
      : themeCssVariables.spacing[1]};
  top: ${themeCssVariables.spacing[1]};

  .header-cell:hover &,
  &:focus-within {
    opacity: 1;
  }
`;

type RecordTableColumnHeadSortButtonProps = {
  fieldMetadataItemId: string;
  hasPlusButton?: boolean;
};

export const RecordTableColumnHeadSortButton = ({
  fieldMetadataItemId,
  hasPlusButton = false,
}: RecordTableColumnHeadSortButtonProps) => {
  const { t } = useLingui();

  const { isSortable } = useAtomFamilySelectorValue(
    isFieldMetadataItemFilterableAndSortableSelector,
    { fieldMetadataItemId },
  );

  const { foundFieldMetadataItem } = useAtomFamilySelectorValue(
    fieldMetadataItemByIdSelector,
    { fieldMetadataItemId },
  );
  const fieldLabel = foundFieldMetadataItem?.label ?? '';

  const [currentRecordSorts, setCurrentRecordSorts] = useAtomComponentState(
    currentRecordSortsComponentState,
  );

  if (!isSortable) {
    return null;
  }

  const currentRecordSort = currentRecordSorts.find(
    (recordSort) => recordSort.fieldMetadataId === fieldMetadataItemId,
  );

  const nextDirection =
    currentRecordSort?.direction === ViewSortDirection.ASC
      ? ViewSortDirection.DESC
      : ViewSortDirection.ASC;

  // One column at a time: a second sort behind the view's own would change nothing people can see.
  const handleClick = () => {
    setCurrentRecordSorts([
      {
        id: currentRecordSort?.id ?? v4(),
        fieldMetadataId: fieldMetadataItemId,
        direction: nextDirection,
      },
    ]);
  };

  const Icon =
    currentRecordSort?.direction === ViewSortDirection.ASC
      ? IconArrowUp
      : currentRecordSort?.direction === ViewSortDirection.DESC
        ? IconArrowDown
        : IconArrowsSort;

  return (
    <StyledSortButtonContainer
      isSorted={isDefined(currentRecordSort)}
      hasPlusButton={hasPlusButton}
    >
      <LightIconButton
        size="sm"
        emphasis="subtle"
        onClick={handleClick}
        aria-label={
          nextDirection === ViewSortDirection.ASC
            ? t`Sort ${fieldLabel} ascending`
            : t`Sort ${fieldLabel} descending`
        }
      >
        <Icon />
      </LightIconButton>
    </StyledSortButtonContainer>
  );
};
