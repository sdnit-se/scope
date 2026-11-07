import { type ChartFilters } from '@/side-panel/pages/page-layout/types/ChartFilters';
import { ViewFilterOperand } from 'twenty-shared/types';

export const hasRelativeDateFilter = (chartFilters: ChartFilters) =>
  (chartFilters.recordFilters ?? []).some(
    (recordFilter) => recordFilter.operand === ViewFilterOperand.IS_RELATIVE,
  );
