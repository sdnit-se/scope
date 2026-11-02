import { currentRecordFiltersComponentState } from '@/object-record/record-filter/states/currentRecordFiltersComponentState';
import { useAtomComponentStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomComponentStateValue';
import { useGetCurrentViewOnly } from '@/views/hooks/useGetCurrentViewOnly';
import { areViewFilterListsDifferent } from '@/views/utils/areViewFilterListsDifferent';
import { mapRecordFilterToViewFilter } from '@/views/utils/mapRecordFilterToViewFilter';
import { useMemo } from 'react';

export const useAreViewFiltersDifferentFromRecordFilters = () => {
  const { currentView } = useGetCurrentViewOnly();
  const currentRecordFilters = useAtomComponentStateValue(
    currentRecordFiltersComponentState,
  );

  const viewFiltersAreDifferentFromRecordFilters = useMemo(() => {
    const currentViewFilters = currentView?.viewFilters ?? [];
    const viewFiltersFromCurrentRecordFilters = currentRecordFilters.map(
      mapRecordFilterToViewFilter,
    );

    return areViewFilterListsDifferent(
      currentViewFilters,
      viewFiltersFromCurrentRecordFilters,
    );
  }, [currentRecordFilters, currentView]);

  return { viewFiltersAreDifferentFromRecordFilters };
};
