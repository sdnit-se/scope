import { type FieldMetadataItem } from '@/object-metadata/types/FieldMetadataItem';
import { buildFilterFromChartBucket } from '@/page-layout/widgets/graph/utils/buildFilterFromChartBucket';
import { isFilteredViewRedirectionSupported } from '@/page-layout/widgets/graph/utils/isFilteredViewRedirectionSupported';
import { FieldMetadataType, ViewFilterOperand } from 'twenty-shared/types';

const assigneeField = {
  id: 'assignee-field',
  name: 'assignee',
  type: FieldMetadataType.RELATION,
} as FieldMetadataItem;

describe('a chart grouped by a relation', () => {
  it('opens the records of the bar that was clicked', () => {
    expect(
      buildFilterFromChartBucket({
        fieldMetadataItem: assigneeField,
        bucketRawValue: 'member-stefan',
      }),
    ).toEqual([
      {
        fieldName: 'assignee',
        operand: ViewFilterOperand.IS,
        value: JSON.stringify({
          isCurrentWorkspaceMemberSelected: false,
          selectedRecordIds: ['member-stefan'],
        }),
      },
    ]);
    expect(isFilteredViewRedirectionSupported(assigneeField)).toBe(true);
  });

  it('opens the records without one for the empty bar', () => {
    expect(
      buildFilterFromChartBucket({
        fieldMetadataItem: assigneeField,
        bucketRawValue: null,
      }),
    ).toEqual([
      { fieldName: 'assignee', operand: ViewFilterOperand.IS_EMPTY, value: '' },
    ]);
  });

  it('stays without click-through when grouped by a field of the related record', () => {
    expect(
      buildFilterFromChartBucket({
        fieldMetadataItem: assigneeField,
        bucketRawValue: 'Stefan',
        subFieldName: 'name',
      }),
    ).toEqual([]);
    expect(isFilteredViewRedirectionSupported(assigneeField, 'name')).toBe(
      false,
    );
  });
});
