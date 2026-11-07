import { type DashboardPeriod } from '@/page-layout/dashboard-period/types/DashboardPeriod';
import {
  relativeDateFilterUnitSchema,
  type RelativeDateFilter,
} from 'twenty-shared/utils';

// The last 30 days are not a relative period: Twenty's past periods end before today.
export const DASHBOARD_PERIOD_RELATIVE_DATE_FILTERS: Record<
  Exclude<DashboardPeriod, 'LAST_30_DAYS'>,
  Pick<RelativeDateFilter, 'direction' | 'amount' | 'unit'>
> = {
  TODAY: { direction: 'THIS', amount: 1, unit: relativeDateFilterUnitSchema.enum.DAY },
  THIS_WEEK: { direction: 'THIS', amount: 1, unit: 'WEEK' },
  LAST_WEEK: { direction: 'PAST', amount: 1, unit: 'WEEK' },
  THIS_QUARTER: { direction: 'THIS', amount: 1, unit: 'QUARTER' },
  THIS_YEAR: { direction: 'THIS', amount: 1, unit: 'YEAR' },
};
