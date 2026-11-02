import { type ViewFilter } from '@/views/types/ViewFilter';
import { areViewFilterListsDifferent } from '@/views/utils/areViewFilterListsDifferent';
import { isDefined } from 'twenty-shared/utils';

// After the saved filters of a view change (another tab, a refresh of a stale
// cached copy, a colleague's update), the record filters follow them only if
// they still match the saved filters they were loaded from. An unsaved change
// is kept, and the view bar then offers Reset or Update view as usual.
export const getRecordFiltersSyncWithSavedView = ({
  loadedViewFilters,
  savedViewFilters,
  viewFiltersFromCurrentRecordFilters,
}: {
  loadedViewFilters: ViewFilter[] | undefined;
  savedViewFilters: ViewFilter[];
  viewFiltersFromCurrentRecordFilters: ViewFilter[];
}): 'none' | 'follow' | 'keep-unsaved' => {
  if (
    !isDefined(loadedViewFilters) ||
    !areViewFilterListsDifferent(loadedViewFilters, savedViewFilters)
  ) {
    return 'none';
  }

  return areViewFilterListsDifferent(
    loadedViewFilters,
    viewFiltersFromCurrentRecordFilters,
  )
    ? 'keep-unsaved'
    : 'follow';
};
