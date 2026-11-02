import { RecordFiltersComponentInstanceContext } from '@/object-record/record-filter/states/context/RecordFiltersComponentInstanceContext';
import { createAtomComponentFamilyState } from '@/ui/utilities/state/jotai/utils/createAtomComponentFamilyState';
import { type ViewFilter } from '@/views/types/ViewFilter';

// The saved view filters the current record filters were loaded from, so a later
// change to the saved view can be told apart from an unsaved change by the user.
export const loadedViewFiltersComponentFamilyState =
  createAtomComponentFamilyState<ViewFilter[] | undefined, { viewId?: string }>(
    {
      key: 'loadedViewFiltersComponentFamilyState',
      defaultValue: undefined,
      componentInstanceContext: RecordFiltersComponentInstanceContext,
    },
  );
