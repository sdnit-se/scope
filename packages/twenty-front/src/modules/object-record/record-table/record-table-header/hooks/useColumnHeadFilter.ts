import { fieldMetadataItemIdUsedInDropdownComponentState } from '@/object-record/object-filter-dropdown/states/fieldMetadataItemIdUsedInDropdownComponentState';
import { objectFilterDropdownCurrentRecordFilterComponentState } from '@/object-record/object-filter-dropdown/states/objectFilterDropdownCurrentRecordFilterComponentState';
import { objectFilterDropdownSearchInputComponentState } from '@/object-record/object-filter-dropdown/states/objectFilterDropdownSearchInputComponentState';
import { relationTargetFieldMetadataIdUsedInDropdownComponentState } from '@/object-record/object-filter-dropdown/states/relationTargetFieldMetadataIdUsedInDropdownComponentState';
import { selectedOperandInDropdownComponentState } from '@/object-record/object-filter-dropdown/states/selectedOperandInDropdownComponentState';
import { subFieldNameUsedInDropdownComponentState } from '@/object-record/object-filter-dropdown/states/subFieldNameUsedInDropdownComponentState';
import { useCreateEmptyRecordFilterFromFieldMetadataItem } from '@/object-record/record-filter/hooks/useCreateEmptyRecordFilterFromFieldMetadataItem';
import { useFilterableFieldMetadataItemsInRecordIndexContext } from '@/object-record/record-filter/hooks/useFilterableFieldMetadataItemsInRecordIndexContext';
import { useRemoveRecordFilter } from '@/object-record/record-filter/hooks/useRemoveRecordFilter';
import { currentRecordFiltersComponentState } from '@/object-record/record-filter/states/currentRecordFiltersComponentState';
import { isRecordFilterConsideredEmpty } from '@/object-record/record-filter/utils/isRecordFilterConsideredEmpty';
import { useAtomComponentStateCallbackState } from '@/ui/utilities/state/jotai/hooks/useAtomComponentStateCallbackState';
import { useStore } from 'jotai';
import { useCallback } from 'react';
import { isDefined } from 'twenty-shared/utils';

export const getColumnHeadFilterInstanceId = (fieldMetadataItemId: string) =>
  `column-head-filter-${fieldMetadataItemId}`;

// Points the column header's filter editor at the column's existing filter, or at none yet: the editor creates the
// filter with the first value, and closing drops it again if the value was cleared.
export const useColumnHeadFilter = (fieldMetadataItemId: string) => {
  const { filterableFieldMetadataItems } =
    useFilterableFieldMetadataItemsInRecordIndexContext();

  const fieldMetadataItem = filterableFieldMetadataItems.find(
    (item) => item.id === fieldMetadataItemId,
  );

  const currentRecordFiltersCallbackState = useAtomComponentStateCallbackState(
    currentRecordFiltersComponentState,
  );

  const store = useStore();

  const { createEmptyRecordFilterFromFieldMetadataItem } =
    useCreateEmptyRecordFilterFromFieldMetadataItem();

  const { removeRecordFilter } = useRemoveRecordFilter();

  const instanceId = getColumnHeadFilterInstanceId(fieldMetadataItemId);

  const openColumnHeadFilter = useCallback(() => {
    if (!isDefined(fieldMetadataItem)) {
      return;
    }

    const existingRecordFilter = store
      .get(currentRecordFiltersCallbackState)
      .find(
        (recordFilter) =>
          recordFilter.fieldMetadataId === fieldMetadataItem.id &&
          !isDefined(recordFilter.recordFilterGroupId),
      );

    const recordFilter =
      existingRecordFilter ??
      createEmptyRecordFilterFromFieldMetadataItem(fieldMetadataItem)
        .newRecordFilter;

    store.set(
      fieldMetadataItemIdUsedInDropdownComponentState.atomFamily({
        instanceId,
      }),
      fieldMetadataItem.id,
    );
    store.set(
      selectedOperandInDropdownComponentState.atomFamily({ instanceId }),
      recordFilter.operand,
    );
    store.set(
      objectFilterDropdownCurrentRecordFilterComponentState.atomFamily({
        instanceId,
      }),
      existingRecordFilter,
    );
    store.set(
      subFieldNameUsedInDropdownComponentState.atomFamily({ instanceId }),
      recordFilter.subFieldName,
    );
    store.set(
      relationTargetFieldMetadataIdUsedInDropdownComponentState.atomFamily({
        instanceId,
      }),
      recordFilter.relationTargetFieldMetadataId ?? null,
    );
    store.set(
      objectFilterDropdownSearchInputComponentState.atomFamily({ instanceId }),
      '',
    );
  }, [
    createEmptyRecordFilterFromFieldMetadataItem,
    currentRecordFiltersCallbackState,
    fieldMetadataItem,
    instanceId,
    store,
  ]);

  const closeColumnHeadFilter = useCallback(() => {
    const editedRecordFilter = store.get(
      objectFilterDropdownCurrentRecordFilterComponentState.atomFamily({
        instanceId,
      }),
    );

    if (
      isDefined(editedRecordFilter) &&
      isRecordFilterConsideredEmpty(editedRecordFilter)
    ) {
      removeRecordFilter({ recordFilterId: editedRecordFilter.id });
    }
  }, [instanceId, removeRecordFilter, store]);

  return {
    isColumnFilterable: isDefined(fieldMetadataItem),
    openColumnHeadFilter,
    closeColumnHeadFilter,
  };
};
