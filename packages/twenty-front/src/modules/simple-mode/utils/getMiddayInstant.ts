import { Temporal } from 'temporal-polyfill';

// A day-only choice stored as a timestamp sits at noon so no time zone moves it to another day.
export const getMiddayInstant = (plainDate: string, timeZone: string) =>
  Temporal.PlainDate.from(plainDate)
    .toZonedDateTime({ timeZone, plainTime: '12:00' })
    .toInstant()
    .toString();
