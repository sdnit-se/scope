import { anyFieldFilterRelatedRecordFiltersComponentState } from '@/object-record/record-filter/states/anyFieldFilterRelatedRecordFiltersComponentState';
import { anyFieldFilterValueComponentState } from '@/object-record/record-filter/states/anyFieldFilterValueComponentState';
import { useAtomComponentStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomComponentStateValue';

// Matches found for an earlier search value are dropped until the lookup for the current value returns.
export const useAnyFieldFilterRelatedRecordFilters = (instanceId?: string) => {
  const anyFieldFilterValue = useAtomComponentStateValue(
    anyFieldFilterValueComponentState,
    instanceId,
  );

  const anyFieldFilterRelatedRecordFilters = useAtomComponentStateValue(
    anyFieldFilterRelatedRecordFiltersComponentState,
    instanceId,
  );

  return Object.values(anyFieldFilterRelatedRecordFilters)
    .filter((match) => match.filterValue === anyFieldFilterValue)
    .map((match) => match.filter);
};
