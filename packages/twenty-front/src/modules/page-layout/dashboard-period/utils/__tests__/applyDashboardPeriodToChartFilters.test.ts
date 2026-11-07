import { applyDashboardPeriodToChartFilters } from '@/page-layout/dashboard-period/utils/applyDashboardPeriodToChartFilters';
import { Temporal } from 'temporal-polyfill';
import {
  FieldMetadataType,
  RecordFilterGroupLogicalOperator,
  ViewFilterOperand,
} from 'twenty-shared/types';

const createdAt = 'created-at-field';
const dueDate = 'due-date-field';

const thisWeek = {
  fieldMetadataId: createdAt,
  operand: ViewFilterOperand.IS_RELATIVE,
  value: 'THIS_1_WEEK;;Europe/Stockholm;;MONDAY;;',
};

const createdByPeople = {
  fieldMetadataId: 'created-by-field',
  subFieldName: 'source' as const,
  operand: ViewFilterOperand.IS,
  value: '["MANUAL"]',
};

const getFieldType = (fieldMetadataId: string) =>
  fieldMetadataId === dueDate
    ? FieldMetadataType.DATE
    : FieldMetadataType.DATE_TIME;

// Saturday 7 November 2026, 09:00 in Stockholm.
const now = Temporal.Instant.from('2026-11-07T08:00:00Z');

const apply = (
  period: Parameters<typeof applyDashboardPeriodToChartFilters>[0]['period'],
  recordFilters: Parameters<
    typeof applyDashboardPeriodToChartFilters
  >[0]['chartFilters']['recordFilters'],
) =>
  applyDashboardPeriodToChartFilters({
    chartFilters: { recordFilters },
    period,
    getFieldType,
    timeZone: 'America/New_York',
    now,
  }).recordFilters;

describe('applyDashboardPeriodToChartFilters', () => {
  it('replaces the period of a relative date filter and keeps its time zone and week start', () => {
    expect(apply('LAST_WEEK', [thisWeek, createdByPeople])).toEqual([
      { ...thisWeek, value: 'PAST_1_WEEK;;Europe/Stockholm;;MONDAY;;' },
      createdByPeople,
    ]);
    expect(apply('TODAY', [thisWeek])?.[0].value).toBe(
      'THIS_1_DAY;;Europe/Stockholm;;MONDAY;;',
    );
    expect(apply('THIS_QUARTER', [thisWeek])?.[0].value).toBe(
      'THIS_1_QUARTER;;Europe/Stockholm;;MONDAY;;',
    );
    expect(apply('THIS_YEAR', [thisWeek])?.[0].value).toBe(
      'THIS_1_YEAR;;Europe/Stockholm;;MONDAY;;',
    );
  });

  it('counts the last 30 days from the start of the day 29 days ago up to the end of today', () => {
    expect(apply('LAST_30_DAYS', [thisWeek])).toEqual([
      {
        ...thisWeek,
        operand: ViewFilterOperand.IS_AFTER,
        value: '2026-10-08T22:00:00Z',
      },
      {
        ...thisWeek,
        operand: ViewFilterOperand.IS_BEFORE,
        value: '2026-11-07T23:00:00Z',
      },
    ]);
    expect(
      apply('LAST_30_DAYS', [{ ...thisWeek, fieldMetadataId: dueDate }]),
    ).toEqual([
      {
        ...thisWeek,
        fieldMetadataId: dueDate,
        operand: ViewFilterOperand.IS_AFTER,
        value: '2026-10-09',
      },
      {
        ...thisWeek,
        fieldMetadataId: dueDate,
        operand: ViewFilterOperand.IS_BEFORE,
        value: '2026-11-08',
      },
    ]);
  });

  it('keeps only the start of the last 30 days inside an OR group, where an end would widen it', () => {
    const inOrGroup = { ...thisWeek, recordFilterGroupId: 'or-group' };

    expect(
      applyDashboardPeriodToChartFilters({
        chartFilters: {
          recordFilters: [inOrGroup],
          recordFilterGroups: [
            {
              id: 'or-group',
              logicalOperator: RecordFilterGroupLogicalOperator.OR,
            },
          ],
        },
        period: 'LAST_30_DAYS',
        getFieldType,
        timeZone: 'Europe/Stockholm',
        now,
      }).recordFilters,
    ).toEqual([
      {
        ...inOrGroup,
        operand: ViewFilterOperand.IS_AFTER,
        value: '2026-10-08T22:00:00Z',
      },
    ]);
  });

  it('keeps a week that names no start day on Monday', () => {
    expect(
      apply('THIS_WEEK', [{ ...thisWeek, value: 'THIS_1_WEEK' }])?.[0].value,
    ).toBe('THIS_1_WEEK;;America/New_York;;MONDAY;;');
  });

  it('uses the viewer time zone when the filter has none', () => {
    expect(
      apply('LAST_30_DAYS', [{ ...thisWeek, value: 'THIS_1_WEEK' }])?.[0].value,
    ).toBe('2026-10-09T04:00:00Z');
  });

  it('leaves widgets without a relative date filter as they are', () => {
    const chartFilters = {
      recordFilters: [
        createdByPeople,
        {
          fieldMetadataId: dueDate,
          operand: ViewFilterOperand.IS_IN_PAST,
          value: '',
        },
      ],
    };

    expect(
      applyDashboardPeriodToChartFilters({
        chartFilters,
        period: 'TODAY',
        getFieldType,
        timeZone: 'Europe/Stockholm',
        now,
      }),
    ).toBe(chartFilters);
  });
});
