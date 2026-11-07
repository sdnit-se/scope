import { dashboardPeriodFamilyState } from '@/page-layout/dashboard-period/states/dashboardPeriodFamilyState';
import { useCurrentPageLayoutOrThrow } from '@/page-layout/hooks/useCurrentPageLayoutOrThrow';
import { useIsPageLayoutInEditMode } from '@/page-layout/hooks/useIsPageLayoutInEditMode';
import { useAtomFamilyState } from '@/ui/utilities/state/jotai/hooks/useAtomFamilyState';
import { PageLayoutType } from '~/generated-metadata/graphql';

// While a dashboard is edited, widgets show what is saved, so the period never leaks into a save.
export const useDashboardPeriod = () => {
  const { currentPageLayout } = useCurrentPageLayoutOrThrow();
  const isPageLayoutInEditMode = useIsPageLayoutInEditMode();

  const [chosenPeriod, setChosenPeriod] = useAtomFamilyState(
    dashboardPeriodFamilyState,
    currentPageLayout.id,
  );

  const isDashboard = currentPageLayout.type === PageLayoutType.DASHBOARD;

  return {
    isDashboard,
    appliedPeriod: isDashboard && !isPageLayoutInEditMode ? chosenPeriod : null,
    chosenPeriod,
    setChosenPeriod,
  };
};
