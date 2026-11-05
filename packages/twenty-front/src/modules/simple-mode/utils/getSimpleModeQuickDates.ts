import { SIMPLE_MODE_LABELS } from '@/simple-mode/constants/SimpleModeLabels';
import { type Temporal } from 'temporal-polyfill';

const MONTHS_PER_QUARTER = 3;

export const getSimpleModeQuickDates = (today: Temporal.PlainDate) => {
  const lastMonthOfQuarter =
    Math.ceil(today.month / MONTHS_PER_QUARTER) * MONTHS_PER_QUARTER;
  const endOfQuarter = today.with({ month: lastMonthOfQuarter, day: 1 });

  return [
    { label: SIMPLE_MODE_LABELS.inOneMonth, date: today.add({ months: 1 }) },
    {
      label: SIMPLE_MODE_LABELS.inThreeMonths,
      date: today.add({ months: 3 }),
    },
    {
      label: SIMPLE_MODE_LABELS.endOfQuarter,
      date: endOfQuarter.with({ day: endOfQuarter.daysInMonth }),
    },
  ];
};
