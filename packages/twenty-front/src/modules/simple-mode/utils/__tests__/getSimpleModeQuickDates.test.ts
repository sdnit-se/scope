import { getSimpleModeQuickDates } from '@/simple-mode/utils/getSimpleModeQuickDates';
import { Temporal } from 'temporal-polyfill';

const quickDates = (today: string) =>
  getSimpleModeQuickDates(Temporal.PlainDate.from(today)).map(
    ({ label, date }) => [label, date.toString()],
  );

describe('getSimpleModeQuickDates', () => {
  it('offers one month, three months and the end of the quarter', () => {
    expect(quickDates('2026-11-05')).toEqual([
      ['Om 1 månad', '2026-12-05'],
      ['Om 3 månader', '2027-02-05'],
      ['Slutet av kvartalet', '2026-12-31'],
    ]);
  });

  it('keeps the last day of a short month and the quarter boundaries', () => {
    expect(quickDates('2026-01-31')).toEqual([
      ['Om 1 månad', '2026-02-28'],
      ['Om 3 månader', '2026-04-30'],
      ['Slutet av kvartalet', '2026-03-31'],
    ]);
    expect(quickDates('2026-04-01')[2]).toEqual([
      'Slutet av kvartalet',
      '2026-06-30',
    ]);
  });
});
