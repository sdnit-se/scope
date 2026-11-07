import { findSavedDashboardPeriod } from '@/page-layout/dashboard-period/utils/findSavedDashboardPeriod';
import { ViewFilterOperand } from 'twenty-shared/types';

const relative = (value: string) => ({
  recordFilters: [
    { fieldMetadataId: 'field', operand: ViewFilterOperand.IS_RELATIVE, value },
  ],
});

describe('findSavedDashboardPeriod', () => {
  it('is the period all relative date filters share', () => {
    expect(
      findSavedDashboardPeriod([
        relative('THIS_1_WEEK;;Europe/Stockholm;;MONDAY;;'),
        relative('THIS_1_WEEK'),
        { recordFilters: [] },
      ]),
    ).toBe('THIS_WEEK');
    expect(findSavedDashboardPeriod([relative('PAST_1_WEEK')])).toBe(
      'LAST_WEEK',
    );
  });

  it('is none when widgets disagree or use a period the control does not offer', () => {
    expect(
      findSavedDashboardPeriod([
        relative('THIS_1_WEEK'),
        relative('THIS_1_MONTH'),
      ]),
    ).toBeNull();
    expect(findSavedDashboardPeriod([relative('PAST_2_WEEK')])).toBeNull();
    expect(findSavedDashboardPeriod([{ recordFilters: [] }])).toBeNull();
  });
});
