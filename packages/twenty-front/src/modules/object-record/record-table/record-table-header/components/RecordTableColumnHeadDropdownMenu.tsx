import { Dropdown } from 'twenty-ui/components/navigation';

import { isFieldMetadataItemFilterableAndSortableSelector } from '@/object-metadata/states/isFieldMetadataItemFilterableAndSortableSelector';
import { isFieldMetadataItemLabelIdentifierSelector } from '@/object-metadata/states/isFieldMetadataItemLabelIdentifierSelector';
import { useChangeRecordFieldVisibility } from '@/object-record/record-field/hooks/useChangeRecordFieldVisibility';
import { type RecordField } from '@/object-record/record-field/types/RecordField';
import { ObjectFilterDropdownFilterInput } from '@/object-record/object-filter-dropdown/components/ObjectFilterDropdownFilterInput';
import { ObjectFilterDropdownComponentInstanceContext } from '@/object-record/object-filter-dropdown/states/contexts/ObjectFilterDropdownComponentInstanceContext';
import { useUpsertRecordSort } from '@/object-record/record-sort/hooks/useUpsertRecordSort';
import { currentRecordSortsComponentState } from '@/object-record/record-sort/states/currentRecordSortsComponentState';
import { useAtomComponentStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomComponentStateValue';
import { getColumnHeadFilterInstanceId } from '@/object-record/record-table/record-table-header/hooks/useColumnHeadFilter';
import { v4 } from 'uuid';
import { ViewSortDirection } from '~/generated-metadata/graphql';
import { useRecordTableContextOrThrow } from '@/object-record/record-table/contexts/RecordTableContext';
import { useMoveTableColumn } from '@/object-record/record-table/hooks/useMoveTableColumn';
import { useLingui } from '@lingui/react/macro';
import { useAtomFamilySelectorValue } from '@/ui/utilities/state/jotai/hooks/useAtomFamilySelectorValue';
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconEyeOff,
  IconSortAscending,
  IconSortDescending,
} from 'twenty-ui/icon';

type RecordTableColumnHeadDropdownMenuProps = {
  recordField: RecordField;
  objectMetadataId: string;
  dropdownId: string;
};

export const RecordTableColumnHeadDropdownMenu = ({
  recordField,
  dropdownId,
}: RecordTableColumnHeadDropdownMenuProps) => {
  const { t } = useLingui();

  const { visibleRecordFields } = useRecordTableContextOrThrow();

  const isLabelIdentifier = useAtomFamilySelectorValue(
    isFieldMetadataItemLabelIdentifierSelector,
    { fieldMetadataItemId: recordField.fieldMetadataItemId },
  );

  const secondVisibleRecordField = visibleRecordFields[1];
  const canMove = isLabelIdentifier !== true;
  const canMoveLeft =
    recordField.fieldMetadataItemId !==
      secondVisibleRecordField?.fieldMetadataItemId && canMove;

  const lastVisibleRecordField =
    visibleRecordFields[visibleRecordFields.length - 1];

  const canMoveRight =
    recordField.fieldMetadataItemId !==
      lastVisibleRecordField?.fieldMetadataItemId && canMove;

  const { recordTableId } = useRecordTableContextOrThrow();

  const { moveTableColumn } = useMoveTableColumn({
    recordTableId,
  });

  const { changeRecordFieldVisibility } =
    useChangeRecordFieldVisibility(recordTableId);

  const handleColumnMoveLeft = () => {
    if (!canMoveLeft) return;

    moveTableColumn('left', recordField.fieldMetadataItemId);
  };

  const handleColumnMoveRight = () => {
    if (!canMoveRight) return;

    moveTableColumn('right', recordField.fieldMetadataItemId);
  };

  const handleColumnVisibility = async () => {
    await changeRecordFieldVisibility({
      fieldMetadataId: recordField.fieldMetadataItemId,
      isVisible: false,
    });
  };

  const currentRecordSorts = useAtomComponentStateValue(
    currentRecordSortsComponentState,
  );

  const { upsertRecordSort } = useUpsertRecordSort();

  const currentSortDirection = currentRecordSorts.find(
    (sort) => sort.fieldMetadataId === recordField.fieldMetadataItemId,
  )?.direction;

  const handleSort = (direction: ViewSortDirection) => {
    const existingSort = currentRecordSorts.find(
      (sort) => sort.fieldMetadataId === recordField.fieldMetadataItemId,
    );

    upsertRecordSort({
      id: existingSort?.id ?? v4(),
      fieldMetadataId: recordField.fieldMetadataItemId,
      direction,
    });
  };

  const { isFilterable, isSortable } = useAtomFamilySelectorValue(
    isFieldMetadataItemFilterableAndSortableSelector,
    { fieldMetadataItemId: recordField.fieldMetadataItemId },
  );

  const showSeparator =
    (isFilterable || isSortable) && isLabelIdentifier !== true;
  const canHide = isLabelIdentifier !== true;

  return (
    <Dropdown.Section>
      {isFilterable && (
        <ObjectFilterDropdownComponentInstanceContext.Provider
          value={{
            instanceId: getColumnHeadFilterInstanceId(
              recordField.fieldMetadataItemId,
            ),
          }}
        >
          <ObjectFilterDropdownFilterInput filterDropdownId={dropdownId} />
        </ObjectFilterDropdownComponentInstanceContext.Provider>
      )}
      {isFilterable && isSortable && <Dropdown.Separator />}
      {isSortable && (
        <Dropdown.ActionItem
          startIcon={<IconSortAscending />}
          onClick={() => handleSort(ViewSortDirection.ASC)}
          endIcon={
            currentSortDirection === ViewSortDirection.ASC ? (
              <IconCheck />
            ) : undefined
          }
        >{t`Sort ascending`}</Dropdown.ActionItem>
      )}
      {isSortable && (
        <Dropdown.ActionItem
          startIcon={<IconSortDescending />}
          onClick={() => handleSort(ViewSortDirection.DESC)}
          endIcon={
            currentSortDirection === ViewSortDirection.DESC ? (
              <IconCheck />
            ) : undefined
          }
        >{t`Sort descending`}</Dropdown.ActionItem>
      )}
      {showSeparator && <Dropdown.Separator />}
      {canMoveLeft && (
        <Dropdown.ActionItem
          startIcon={<IconArrowLeft />}
          onClick={handleColumnMoveLeft}
          closeOnClick={false}
        >{t`Move left`}</Dropdown.ActionItem>
      )}
      {canMoveRight && (
        <Dropdown.ActionItem
          startIcon={<IconArrowRight />}
          onClick={handleColumnMoveRight}
          closeOnClick={false}
        >{t`Move right`}</Dropdown.ActionItem>
      )}
      {canHide && (
        <Dropdown.ActionItem
          startIcon={<IconEyeOff />}
          onClick={handleColumnVisibility}
        >{t`Hide`}</Dropdown.ActionItem>
      )}
    </Dropdown.Section>
  );
};
