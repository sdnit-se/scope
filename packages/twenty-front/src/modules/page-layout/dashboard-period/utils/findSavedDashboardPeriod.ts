import { DASHBOARD_PERIOD_RELATIVE_DATE_FILTERS } from '@/page-layout/dashboard-period/constants/DashboardPeriodRelativeDateFilters';
import { type DashboardPeriod } from '@/page-layout/dashboard-period/types/DashboardPeriod';
import { type ChartFilters } from '@/side-panel/pages/page-layout/types/ChartFilters';
import {
  isDefined,
  relativeDateFilterStringifiedSchema,
} from 'twenty-shared/utils';
import { ViewFilterOperand } from 'twenty-shared/types';

const periodOfRelativeValue = (value: string): DashboardPeriod | null => {
  const parsed = relativeDateFilterStringifiedSchema.safeParse(value);

  if (!parsed.success) {
    return null;
  }

  const match = Object.entries(DASHBOARD_PERIOD_RELATIVE_DATE_FILTERS).find(
    ([, relative]) =>
      relative.direction === parsed.data.direction &&
      relative.unit === parsed.data.unit &&
      (parsed.data.direction === 'THIS' ||
        relative.amount === parsed.data.amount),
  );

  return isDefined(match) ? (match[0] as DashboardPeriod) : null;
};

// The period every relative date filter of a dashboard was saved with, when they all agree:
// that is what the dashboard shows until a viewer picks another one.
export const findSavedDashboardPeriod = (
  chartFiltersOfWidgets: ChartFilters[],
): DashboardPeriod | null => {
  const periods = new Set(
    chartFiltersOfWidgets.flatMap((chartFilters) =>
      (chartFilters.recordFilters ?? [])
        .filter(
          (recordFilter) =>
            recordFilter.operand === ViewFilterOperand.IS_RELATIVE,
        )
        .map((recordFilter) => periodOfRelativeValue(recordFilter.value ?? '')),
    ),
  );

  if (periods.size !== 1) {
    return null;
  }

  return [...periods][0];
};
