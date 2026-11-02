import { contextStoreCurrentViewIdComponentState } from '@/context-store/states/contextStoreCurrentViewIdComponentState';
import { currentRecordFiltersComponentState } from '@/object-record/record-filter/states/currentRecordFiltersComponentState';
import { useRecordIndexContextOrThrow } from '@/object-record/record-index/contexts/RecordIndexContext';
import { useAtomComponentFamilyState } from '@/ui/utilities/state/jotai/hooks/useAtomComponentFamilyState';
import { useAtomComponentStateCallbackState } from '@/ui/utilities/state/jotai/hooks/useAtomComponentStateCallbackState';
import { useAtomComponentStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomComponentStateValue';
import { useSetAtomComponentState } from '@/ui/utilities/state/jotai/hooks/useSetAtomComponentState';
import { useAtomFamilySelectorValue } from '@/ui/utilities/state/jotai/hooks/useAtomFamilySelectorValue';
import { useMapViewFiltersToFilters } from '@/views/hooks/useMapViewFiltersToFilters';
import { hasInitializedCurrentRecordFiltersComponentFamilyState } from '@/views/states/hasInitializedCurrentRecordFiltersComponentFamilyState';
import { loadedViewFiltersComponentFamilyState } from '@/views/states/loadedViewFiltersComponentFamilyState';
import { viewFromViewIdFamilySelector } from '@/views/states/selectors/viewFromViewIdFamilySelector';
import { getRecordFiltersSyncWithSavedView } from '@/views/utils/getRecordFiltersSyncWithSavedView';
import { mapRecordFilterToViewFilter } from '@/views/utils/mapRecordFilterToViewFilter';
import { useStore } from 'jotai';
import { useEffect } from 'react';
import { isDefined } from 'twenty-shared/utils';

export const ViewBarRecordFilterEffect = () => {
  const contextStoreCurrentViewId = useAtomComponentStateValue(
    contextStoreCurrentViewIdComponentState,
  );

  const { objectMetadataItem, recordIndexId } = useRecordIndexContextOrThrow();

  const currentView = useAtomFamilySelectorValue(viewFromViewIdFamilySelector, {
    viewId: contextStoreCurrentViewId ?? '',
  });

  const [
    hasInitializedCurrentRecordFilters,
    setHasInitializedCurrentRecordFilters,
  ] = useAtomComponentFamilyState(
    hasInitializedCurrentRecordFiltersComponentFamilyState,
    {
      viewId: contextStoreCurrentViewId ?? undefined,
    },
  );

  const setCurrentRecordFilters = useSetAtomComponentState(
    currentRecordFiltersComponentState,
    recordIndexId,
  );

  const [loadedViewFilters, setLoadedViewFilters] = useAtomComponentFamilyState(
    loadedViewFiltersComponentFamilyState,
    {
      viewId: contextStoreCurrentViewId ?? undefined,
    },
  );

  const currentRecordFiltersCallbackState = useAtomComponentStateCallbackState(
    currentRecordFiltersComponentState,
    recordIndexId,
  );

  const store = useStore();

  const { mapViewFiltersToRecordFilters } = useMapViewFiltersToFilters();

  useEffect(() => {
    if (
      !isDefined(currentView) ||
      currentView.objectMetadataId !== objectMetadataItem.id
    ) {
      return;
    }

    if (!hasInitializedCurrentRecordFilters) {
      setCurrentRecordFilters(
        mapViewFiltersToRecordFilters(currentView.viewFilters),
      );
      setLoadedViewFilters(currentView.viewFilters);
      setHasInitializedCurrentRecordFilters(true);

      return;
    }

    // The page may have loaded a stale cached copy of the view: follow its saved
    // filters once they arrive, unless the user has changed the filters since.
    const sync = getRecordFiltersSyncWithSavedView({
      loadedViewFilters,
      savedViewFilters: currentView.viewFilters,
      viewFiltersFromCurrentRecordFilters: store
        .get(currentRecordFiltersCallbackState)
        .map(mapRecordFilterToViewFilter),
    });

    if (sync === 'none') {
      return;
    }

    setLoadedViewFilters(currentView.viewFilters);

    if (sync === 'follow') {
      setCurrentRecordFilters(
        mapViewFiltersToRecordFilters(currentView.viewFilters),
      );
    }
  }, [
    contextStoreCurrentViewId,
    setCurrentRecordFilters,
    mapViewFiltersToRecordFilters,
    hasInitializedCurrentRecordFilters,
    setHasInitializedCurrentRecordFilters,
    loadedViewFilters,
    setLoadedViewFilters,
    currentRecordFiltersCallbackState,
    store,
    currentView,
    objectMetadataItem,
  ]);

  return null;
};
