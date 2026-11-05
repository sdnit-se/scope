import { ObjectFilterDropdownFilterInput } from '@/object-record/object-filter-dropdown/components/ObjectFilterDropdownFilterInput';
import { ObjectFilterDropdownComponentInstanceContext } from '@/object-record/object-filter-dropdown/states/contexts/ObjectFilterDropdownComponentInstanceContext';
import { objectFilterDropdownCurrentRecordFilterComponentState } from '@/object-record/object-filter-dropdown/states/objectFilterDropdownCurrentRecordFilterComponentState';
import { type RecordField } from '@/object-record/record-field/types/RecordField';
import { RecordTableColumnHeadSortButton } from '@/object-record/record-table/record-table-header/components/RecordTableColumnHeadSortButton';
import {
  getColumnHeadFilterInstanceId,
  useColumnHeadFilter,
} from '@/object-record/record-table/record-table-header/hooks/useColumnHeadFilter';
import { DropdownContent } from '@/ui/layout/dropdown/components/DropdownContent';
import { DropdownRoot } from '@/ui/layout/dropdown/components/DropdownRoot';
import { useAtomComponentStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomComponentStateValue';
import { Dropdown } from 'twenty-ui/components/navigation';
import { RecordTableColumnHead } from './RecordTableColumnHead';
import { RecordTableColumnHeadDropdownScrollEffect } from './RecordTableColumnHeadDropdownScrollEffect';

const HEADER_FILTER_NOT_CREATED_YET = 'column-head-filter-not-created-yet';

type RecordTableColumnHeadWithDropdownProps = {
  recordField: RecordField;
  hasPlusButton?: boolean;
};

export const RecordTableColumnHeadWithDropdown = ({
  recordField,
  hasPlusButton = false,
}: RecordTableColumnHeadWithDropdownProps) => {
  const dropdownId = recordField.fieldMetadataItemId + '-header';
  const filterInstanceId = getColumnHeadFilterInstanceId(
    recordField.fieldMetadataItemId,
  );

  const objectFilterDropdownCurrentRecordFilter = useAtomComponentStateValue(
    objectFilterDropdownCurrentRecordFilterComponentState,
    filterInstanceId,
  );

  const { isColumnFilterable, openColumnHeadFilter, closeColumnHeadFilter } =
    useColumnHeadFilter(recordField.fieldMetadataItemId);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openColumnHeadFilter();
    } else {
      closeColumnHeadFilter();
    }
  };

  const sortButton = (
    <RecordTableColumnHeadSortButton
      fieldMetadataItemId={recordField.fieldMetadataItemId}
      hasPlusButton={hasPlusButton}
    />
  );

  if (!isColumnFilterable) {
    return (
      <>
        <RecordTableColumnHead recordField={recordField} />
        {sortButton}
      </>
    );
  }

  return (
    <>
      <DropdownRoot
        type="menu"
        dropdownId={dropdownId}
        onOpenChange={handleOpenChange}
      >
        <Dropdown.Trigger nativeButton={false} render={<div />}>
          <RecordTableColumnHead recordField={recordField} />
        </Dropdown.Trigger>
        <RecordTableColumnHeadDropdownScrollEffect />
        <DropdownContent
          side="bottom"
          align="start"
          alignOffset={-1}
          sideOffset={0}
        >
          <Dropdown.Section>
            <ObjectFilterDropdownComponentInstanceContext.Provider
              value={{ instanceId: filterInstanceId }}
            >
              <ObjectFilterDropdownFilterInput
                filterDropdownId={dropdownId}
                // A relation picker otherwise shows the column's first filter, which may be a saved "is not".
                recordFilterId={
                  objectFilterDropdownCurrentRecordFilter?.id ??
                  HEADER_FILTER_NOT_CREATED_YET
                }
                isOperandHidden
              />
            </ObjectFilterDropdownComponentInstanceContext.Provider>
          </Dropdown.Section>
        </DropdownContent>
      </DropdownRoot>
      {sortButton}
    </>
  );
};
