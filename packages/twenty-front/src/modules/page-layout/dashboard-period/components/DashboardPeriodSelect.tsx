import { DASHBOARD_PERIODS } from '@/page-layout/dashboard-period/constants/DashboardPeriods';
import { useDashboardPeriod } from '@/page-layout/dashboard-period/hooks/useDashboardPeriod';
import { useDashboardPeriodLabels } from '@/page-layout/dashboard-period/hooks/useDashboardPeriodLabels';
import { useDashboardPeriodSelectVisibility } from '@/page-layout/dashboard-period/hooks/useDashboardPeriodSelectVisibility';
import { findSavedDashboardPeriod } from '@/page-layout/dashboard-period/utils/findSavedDashboardPeriod';
import { useCurrentPageLayoutOrThrow } from '@/page-layout/hooks/useCurrentPageLayoutOrThrow';
import { Select } from '@/ui/input/components/Select';
import { IconCalendarEvent } from 'twenty-ui/icon';

export const DashboardPeriodSelect = () => {
  const { currentPageLayout } = useCurrentPageLayoutOrThrow();
  const { chosenPeriod, setChosenPeriod } = useDashboardPeriod();
  const { chartFiltersOfWidgets } = useDashboardPeriodSelectVisibility();
  const labels = useDashboardPeriodLabels();

  return (
    <Select
      dropdownId={`dashboard-period-${currentPageLayout.id}`}
      value={chosenPeriod ?? findSavedDashboardPeriod(chartFiltersOfWidgets)}
      options={DASHBOARD_PERIODS.map((period) => ({
        label: labels[period],
        value: period,
        Icon: IconCalendarEvent,
      }))}
      selectSizeVariant="small"
      dropdownWidth={160}
      onChange={setChosenPeriod}
    />
  );
};
