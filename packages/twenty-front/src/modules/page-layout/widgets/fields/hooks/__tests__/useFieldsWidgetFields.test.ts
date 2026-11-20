import { renderHook } from '@testing-library/react';

import { type EnrichedObjectMetadataItem } from '@/object-metadata/types/EnrichedObjectMetadataItem';
import { type FieldMetadataItem } from '@/object-metadata/types/FieldMetadataItem';
import { useFieldsWidgetFields } from '@/page-layout/widgets/fields/hooks/useFieldsWidgetFields';

jest.mock(
  '@/object-core/workflows/hooks/useHiddenWorkspaceWorkflowRunRelationFields',
  () => ({ useHiddenWorkspaceWorkflowRunRelationFields: () => ['hidden'] }),
);

const field = (name: string) => ({ id: name, name }) as FieldMetadataItem;

describe('useFieldsWidgetFields', () => {
  it('lists only the fields the role may read', () => {
    const objectMetadataItem = {
      nameSingular: 'company',
      fields: [field('name'), field('invoiced'), field('hidden')],
      readableFields: [field('name'), field('hidden')],
    } as EnrichedObjectMetadataItem;

    const { result } = renderHook(() =>
      useFieldsWidgetFields(objectMetadataItem),
    );

    expect(result.current.map(({ name }) => name)).toEqual(['name']);
  });
});
