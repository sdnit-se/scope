import { formatViewedMonthLabel } from '@/ui/input/components/internal/date/utils/formatViewedMonthLabel';

describe('formatViewedMonthLabel', () => {
  it('names the month and year in the reader’s language', () => {
    expect(formatViewedMonthLabel('2026-01', 'sv-SE')).toBe('januari 2026');
    expect(formatViewedMonthLabel('2026-12', 'en')).toBe('December 2026');
  });

  it('names the Gregorian month the grid shows, whatever calendar the language uses', () => {
    expect(formatViewedMonthLabel('2026-11', 'fa-IR')).toContain('۲۰۲۶');
  });

  it('falls back to the source language without a locale', () => {
    expect(formatViewedMonthLabel('2027-03')).toBe('March 2027');
  });
});
