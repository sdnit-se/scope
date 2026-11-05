import { getMiddayInstant } from '@/simple-mode/utils/getMiddayInstant';
import { Temporal } from 'temporal-polyfill';

describe('getMiddayInstant', () => {
  it('stores the chosen day at noon in Stockholm, summer and winter', () => {
    expect(getMiddayInstant('2026-07-01', 'Europe/Stockholm')).toBe(
      '2026-07-01T10:00:00Z',
    );
    expect(getMiddayInstant('2026-12-31', 'Europe/Stockholm')).toBe(
      '2026-12-31T11:00:00Z',
    );
  });

  it('reads back as the same day in any time zone within twelve hours', () => {
    const instant = Temporal.Instant.from(
      getMiddayInstant('2026-03-29', 'Europe/Stockholm'),
    );

    for (const timeZone of ['UTC', 'America/New_York', 'Asia/Tokyo']) {
      expect(
        instant.toZonedDateTimeISO(timeZone).toPlainDate().toString(),
      ).toBe('2026-03-29');
    }
  });
});
