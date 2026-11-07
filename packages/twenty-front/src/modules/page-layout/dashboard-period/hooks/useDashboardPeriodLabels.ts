import { type DashboardPeriod } from '@/page-layout/dashboard-period/types/DashboardPeriod';
import { t } from '@lingui/core/macro';

export const useDashboardPeriodLabels = (): Record<
  DashboardPeriod,
  string
> => ({
  TODAY: t`Today`,
  THIS_WEEK: t`This week`,
  LAST_WEEK: t`Last week`,
  LAST_30_DAYS: t`30 days`,
  THIS_QUARTER: t`This quarter`,
  THIS_YEAR: t`This year`,
});
