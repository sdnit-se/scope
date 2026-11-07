import { DASHBOARD_PERIOD_RELATIVE_DATE_FILTERS } from '@/page-layout/dashboard-period/constants/DashboardPeriodRelativeDateFilters';
import { type DashboardPeriod } from '@/page-layout/dashboard-period/types/DashboardPeriod';
import { hasRelativeDateFilter } from '@/page-layout/dashboard-period/utils/hasRelativeDateFilter';
import { type PersistedRecordFilter } from '@/object-record/record-filter/types/PersistedRecordFilter';
import { type ChartFilters } from '@/side-panel/pages/page-layout/types/ChartFilters';
import { stringifyRelativeDateFilter } from '@/views/view-filter-value/utils/stringifyRelativeDateFilter';
import { Temporal } from 'temporal-polyfill';
import {
  FieldMetadataType,
  FirstDayOfTheWeek,
  RecordFilterGroupLogicalOperator,
  ViewFilterOperand,
} from 'twenty-shared/types';
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
    isInOrGroup,
  }: Omit<ApplyDashboardPeriodToChartFiltersArgs, 'chartFilters'> & {
    isInOrGroup: boolean;
  },
): PersistedRecordFilter[] => {
  const saved = relativeDateFilterStringifiedSchema.safeParse(
    recordFilter.value ?? '',
  );
  // A widget keeps its own time zone and week start; only the period changes.
  const filterTimeZone =
    (saved.success ? saved.data.timezone : undefined) ?? timeZone;

  if (period === 'LAST_30_DAYS') {
    const today = now.toZonedDateTimeISO(filterTimeZone).toPlainDate();

    const dayValue = (day: Temporal.PlainDate) =>
      getFieldType(
        // A filter through a relation compares the related record's field.
        recordFilter.relationTargetFieldMetadataId ??
          recordFilter.fieldMetadataId,
      ) === FieldMetadataType.DATE
        ? day.toString()
        : day
            .toZonedDateTime({ timeZone: filterTimeZone })
            .toInstant()
            .toString();

    const from = {
      ...recordFilter,
      operand: ViewFilterOperand.IS_AFTER,
      value: dayValue(today.subtract({ days: LAST_30_DAYS_EARLIER_DAYS })),
    };

    // Due and close dates can lie ahead, so the period ends with today. Inside an OR group a
    // second filter would widen it instead, so there the period only has its start.
    if (isInOrGroup) {
      return [from];
    }

    const { id: _id, ...withoutId } = recordFilter;

    return [
      from,
      {
        ...withoutId,
        operand: ViewFilterOperand.IS_BEFORE,
        value: dayValue(today.add({ days: 1 })),
      },
    ];
  }

  return [
    {
      ...recordFilter,
      value: stringifyRelativeDateFilter({
        ...DASHBOARD_PERIOD_RELATIVE_DATE_FILTERS[period],
        timezone: filterTimeZone,
        // Twenty's resolver starts an unspecified week on Monday, not on the browser's locale.
        firstDayOfTheWeek:
          (saved.success ? saved.data.firstDayOfTheWeek : undefined) ??
          FirstDayOfTheWeek.MONDAY,
      }),
    },
  ];
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

  const orGroupIds = new Set(
    (chartFilters.recordFilterGroups ?? [])
      .filter(
        (group) =>
          group.logicalOperator === RecordFilterGroupLogicalOperator.OR,
      )
      .map((group) => group.id),
  );

  return {
    ...chartFilters,
    recordFilters: (chartFilters.recordFilters ?? []).flatMap((recordFilter) =>
      recordFilter.operand === ViewFilterOperand.IS_RELATIVE
        ? applyDashboardPeriodToRecordFilter(recordFilter, {
            ...options,
            isInOrGroup: orGroupIds.has(recordFilter.recordFilterGroupId ?? ''),
          })
        : [recordFilter],
    ),
  };
};
