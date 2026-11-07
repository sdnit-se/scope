import { DASHBOARD_PERIODS } from '@/page-layout/dashboard-period/constants/DashboardPeriods';
import { useDashboardPeriod } from '@/page-layout/dashboard-period/hooks/useDashboardPeriod';
import { useDashboardPeriodLabels } from '@/page-layout/dashboard-period/hooks/useDashboardPeriodLabels';
import { useDashboardPeriodSelectVisibility } from '@/page-layout/dashboard-period/hooks/useDashboardPeriodSelectVisibility';
import { findSavedDashboardPeriod } from '@/page-layout/dashboard-period/utils/findSavedDashboardPeriod';
import { useCurrentPageLayoutOrThrow } from '@/page-layout/hooks/useCurrentPageLayoutOrThrow';
import { Select } from '@/ui/input/components/Select';
import { t } from '@lingui/core/macro';
import { isDefined } from 'twenty-shared/utils';
import { IconCalendarEvent } from 'twenty-ui/icon';

export const DashboardPeriodSelect = () => {
  const { currentPageLayout } = useCurrentPageLayoutOrThrow();
  const { chosenPeriod, setChosenPeriod } = useDashboardPeriod();
  const { chartFiltersOfWidgets } = useDashboardPeriodSelectVisibility();
  const labels = useDashboardPeriodLabels();
  const savedPeriod = findSavedDashboardPeriod(chartFiltersOfWidgets);

  return (
    <Select
      dropdownId={`dashboard-period-${currentPageLayout.id}`}
      value={chosenPeriod ?? savedPeriod}
      options={DASHBOARD_PERIODS.map((period) => ({
        label: labels[period],
        value: period,
        Icon: IconCalendarEvent,
      }))}
      // Charts saved with different periods keep them until someone picks one, and can go back.
      pinnedOption={
        isDefined(savedPeriod)
          ? undefined
          : { label: t`As saved`, value: null, Icon: IconCalendarEvent }
      }
      selectSizeVariant="small"
      dropdownWidth={160}
      onChange={setChosenPeriod}
    />
  );
};
