import { type RecordField } from '@/object-record/record-field/types/RecordField';
import { useColumnHeadFilter } from '@/object-record/record-table/record-table-header/hooks/useColumnHeadFilter';
import { DropdownContent } from '@/ui/layout/dropdown/components/DropdownContent';
import { DropdownRoot } from '@/ui/layout/dropdown/components/DropdownRoot';
import { Dropdown } from 'twenty-ui/components/navigation';
import { RecordTableColumnHead } from './RecordTableColumnHead';
import { RecordTableColumnHeadDropdownMenu } from './RecordTableColumnHeadDropdownMenu';
import { RecordTableColumnHeadDropdownScrollEffect } from './RecordTableColumnHeadDropdownScrollEffect';

type RecordTableColumnHeadWithDropdownProps = {
  recordField: RecordField;
  objectMetadataId: string;
};

export const RecordTableColumnHeadWithDropdown = ({
  objectMetadataId,
  recordField,
}: RecordTableColumnHeadWithDropdownProps) => {
  const dropdownId = recordField.fieldMetadataItemId + '-header';

  const { openColumnHeadFilter, closeColumnHeadFilter } = useColumnHeadFilter(
    recordField.fieldMetadataItemId,
  );

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openColumnHeadFilter();
    } else {
      closeColumnHeadFilter();
    }
  };

  return (
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
        <RecordTableColumnHeadDropdownMenu
          recordField={recordField}
          objectMetadataId={objectMetadataId}
          dropdownId={dropdownId}
        />
      </DropdownContent>
    </DropdownRoot>
  );
};
