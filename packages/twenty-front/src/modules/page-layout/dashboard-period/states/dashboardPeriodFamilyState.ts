import { type DashboardPeriod } from '@/page-layout/dashboard-period/types/DashboardPeriod';
import { createAtomFamilyState } from '@/ui/utilities/state/jotai/utils/createAtomFamilyState';

// Each viewer's own choice per dashboard, never saved in the shared layout.
export const dashboardPeriodFamilyState = createAtomFamilyState<
  DashboardPeriod | null,
  string
>({
  key: 'dashboardPeriodFamilyState',
  defaultValue: null,
  useLocalStorage: true,
  localStorageOptions: { getOnInit: true },
});
