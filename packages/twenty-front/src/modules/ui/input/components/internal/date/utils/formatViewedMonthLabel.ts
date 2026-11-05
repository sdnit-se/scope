import { isNonEmptyString } from '@sniptt/guards';
import { Temporal } from 'temporal-polyfill';
import { SOURCE_LOCALE } from 'twenty-shared/translations';

export const formatViewedMonthLabel = (
  viewedMonth: string,
  locale?: string,
) => {
  const { year, month } = Temporal.PlainYearMonth.from(viewedMonth);

  return new Intl.DateTimeFormat(
    isNonEmptyString(locale) ? locale : SOURCE_LOCALE,
    { calendar: 'gregory', month: 'long', year: 'numeric' },
  ).format(new Date(year, month - 1, 1));
};
