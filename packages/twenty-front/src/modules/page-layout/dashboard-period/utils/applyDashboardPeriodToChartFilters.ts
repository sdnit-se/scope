import { DASHBOARD_PERIOD_RELATIVE_DATE_FILTERS } from '@/page-layout/dashboard-period/constants/DashboardPeriodRelativeDateFilters';
import { type DashboardPeriod } from '@/page-layout/dashboard-period/types/DashboardPeriod';
import { hasRelativeDateFilter } from '@/page-layout/dashboard-period/utils/hasRelativeDateFilter';
import { type PersistedRecordFilter } from '@/object-record/record-filter/types/PersistedRecordFilter';
import { type ChartFilters } from '@/side-panel/pages/page-layout/types/ChartFilters';
import { stringifyRelativeDateFilter } from '@/views/view-filter-value/utils/stringifyRelativeDateFilter';
import { Temporal } from 'temporal-polyfill';
import { FieldMetadataType, ViewFilterOperand } from 'twenty-shared/types';
import { relativeDateFilterStringifiedSchema } from 'twenty-shared/utils';

const LAST_30_DAYS_EARLIER_DAYS = 29;

type ApplyDashboardPeriodToChartFiltersArgs = {
  chartFilters: ChartFilters;
  period: DashboardPeriod;
  getFieldType: (fieldMetadataId: string) => FieldMetadataType | undefined;
  timeZone: string;
  now?: Temporal.Instant;
};

const applyDashboardPeriodToRecordFilter = (
  recordFilter: PersistedRecordFilter,
  {
    period,
    getFieldType,
    timeZone,
    now = Temporal.Now.instant(),
  }: Omit<ApplyDashboardPeriodToChartFiltersArgs, 'chartFilters'>,
): PersistedRecordFilter => {
  const saved = relativeDateFilterStringifiedSchema.safeParse(
    recordFilter.value ?? '',
  );
  // A widget keeps its own time zone and week start; only the period changes.
  const filterTimeZone =
    (saved.success ? saved.data.timezone : undefined) ?? timeZone;

  if (period === 'LAST_30_DAYS') {
    const firstDay = now
      .toZonedDateTimeISO(filterTimeZone)
      .toPlainDate()
      .subtract({ days: LAST_30_DAYS_EARLIER_DAYS });

    return {
      ...recordFilter,
      operand: ViewFilterOperand.IS_AFTER,
      value:
        getFieldType(recordFilter.fieldMetadataId) === FieldMetadataType.DATE
          ? firstDay.toString()
          : firstDay
              .toZonedDateTime({ timeZone: filterTimeZone })
              .toInstant()
              .toString(),
    };
  }

  return {
    ...recordFilter,
    value: stringifyRelativeDateFilter({
      ...DASHBOARD_PERIOD_RELATIVE_DATE_FILTERS[period],
      timezone: filterTimeZone,
      firstDayOfTheWeek: saved.success
        ? saved.data.firstDayOfTheWeek
        : undefined,
    }),
  };
};

// The dashboard's period replaces the period of every relative date filter; widgets
// without one are left as they are.
export const applyDashboardPeriodToChartFilters = ({
  chartFilters,
  ...options
}: ApplyDashboardPeriodToChartFiltersArgs): ChartFilters => {
  if (!hasRelativeDateFilter(chartFilters)) {
    return chartFilters;
  }

  return {
    ...chartFilters,
    recordFilters: (chartFilters.recordFilters ?? []).map((recordFilter) =>
      recordFilter.operand === ViewFilterOperand.IS_RELATIVE
        ? applyDashboardPeriodToRecordFilter(recordFilter, options)
        : recordFilter,
    ),
  };
};
