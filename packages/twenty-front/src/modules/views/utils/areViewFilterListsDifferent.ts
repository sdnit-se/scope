import { type ViewFilter } from '@/views/types/ViewFilter';
import { getViewFiltersToCreate } from '@/views/utils/getViewFiltersToCreate';
import { getViewFiltersToDelete } from '@/views/utils/getViewFiltersToDelete';
import { getViewFiltersToUpdate } from '@/views/utils/getViewFiltersToUpdate';

export const areViewFilterListsDifferent = (
  currentViewFilters: ViewFilter[],
  newViewFilters: ViewFilter[],
) =>
  getViewFiltersToCreate(currentViewFilters, newViewFilters).length > 0 ||
  getViewFiltersToDelete(currentViewFilters, newViewFilters).length > 0 ||
  getViewFiltersToUpdate(currentViewFilters, newViewFilters).length > 0;
