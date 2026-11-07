import { useDashboardPeriod } from '@/page-layout/dashboard-period/hooks/useDashboardPeriod';
import { hasRelativeDateFilter } from '@/page-layout/dashboard-period/utils/hasRelativeDateFilter';
import { useCurrentPageLayoutOrThrow } from '@/page-layout/hooks/useCurrentPageLayoutOrThrow';
import { useIsPageLayoutInEditMode } from '@/page-layout/hooks/useIsPageLayoutInEditMode';
import { type ChartFilters } from '@/side-panel/pages/page-layout/types/ChartFilters';
import { isDefined } from 'twenty-shared/utils';

// The period control appears only on a dashboard that has a widget with a relative date filter.
export const useDashboardPeriodSelectVisibility = () => {
  const { currentPageLayout } = useCurrentPageLayoutOrThrow();
  const isPageLayoutInEditMode = useIsPageLayoutInEditMode();
  const { isDashboard } = useDashboardPeriod();

  const chartFiltersOfWidgets = currentPageLayout.tabs.flatMap((tab) =>
    tab.widgets.flatMap((widget): ChartFilters[] =>
      isDefined(widget.configuration) &&
      'filter' in widget.configuration &&
      isDefined(widget.configuration.filter)
        ? [widget.configuration.filter]
        : [],
    ),
  );

  return {
    chartFiltersOfWidgets,
    isDashboardPeriodSelectVisible:
      isDashboard &&
      !isPageLayoutInEditMode &&
      chartFiltersOfWidgets.some(hasRelativeDateFilter),
  };
};
