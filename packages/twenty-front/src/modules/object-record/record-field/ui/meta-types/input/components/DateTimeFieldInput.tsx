import { FieldInputEventContext } from '@/object-record/record-field/ui/contexts/FieldInputEventContext';
import { RecordFieldComponentInstanceContext } from '@/object-record/record-field/ui/states/contexts/RecordFieldComponentInstanceContext';
import { SimpleModeQuickDates } from '@/simple-mode/components/SimpleModeQuickDates';
import { useIsSimpleModeEnabled } from '@/simple-mode/hooks/useIsSimpleModeEnabled';
import { getMiddayInstant } from '@/simple-mode/utils/getMiddayInstant';
import { DateInput } from '@/ui/field/input/components/DateInput';
import { DateTimeInput } from '@/ui/field/input/components/DateTimeInput';
import { useUserTimezone } from '@/ui/input/components/internal/date/hooks/useUserTimezone';
import { useAvailableComponentInstanceIdOrThrow } from '@/ui/utilities/state/component-state/hooks/useAvailableComponentInstanceIdOrThrow';
import { isNonEmptyString } from '@sniptt/guards';
import { useContext } from 'react';
import { Temporal } from 'temporal-polyfill';
import { useDateTimeField } from '@/object-record/record-field/ui/meta-types/hooks/useDateTimeField';
import { type Nullable } from 'twenty-shared/types';

export const DateTimeFieldInput = () => {
  const { fieldValue, setDraftValue } = useDateTimeField();
  const isSimpleModeEnabled = useIsSimpleModeEnabled();
  const { userTimezone } = useUserTimezone();

  const { onEnter, onEscape, onClickOutside, onSubmit } = useContext(
    FieldInputEventContext,
  );

  const instanceId = useAvailableComponentInstanceIdOrThrow(
    RecordFieldComponentInstanceContext,
  );

  const getDateToPersist = (newInstant: Nullable<Temporal.Instant>) => {
    if (!newInstant) {
      return null;
    } else {
      const newDateISO = newInstant?.toString();

      return newDateISO;
    }
  };

  const handleEnter = (newDate: Nullable<Temporal.Instant>) => {
    onEnter?.({ newValue: getDateToPersist(newDate) });
  };

  const handleEscape = (newDate: Nullable<Temporal.Instant>) => {
    onEscape?.({ newValue: getDateToPersist(newDate) });
  };

  const handleClickOutside = (
    event: MouseEvent | TouchEvent,
    newDate: Nullable<Temporal.Instant>,
  ) => {
    onClickOutside?.({ newValue: getDateToPersist(newDate), event });
  };

  const handleChange = (newInstant: Nullable<Temporal.Instant>) => {
    setDraftValue(newInstant?.toString() ?? '');
  };

  const handleClear = () => {
    onSubmit?.({ newValue: null });
  };

  const handleSubmit = (newInstant: Nullable<Temporal.Instant>) => {
    onSubmit?.({ newValue: getDateToPersist(newInstant) });
  };

  const dateValue = isNonEmptyString(fieldValue)
    ? Temporal.Instant.from(fieldValue)
    : null;

  if (isSimpleModeEnabled) {
    const originalPlainDate = dateValue
      ?.toZonedDateTimeISO(userTimezone)
      .toPlainDate()
      .toString();

    // Closing the picker without choosing another day keeps the stored time.
    const toInstant = (plainDate: Nullable<string>) =>
      !isNonEmptyString(plainDate)
        ? null
        : plainDate === originalPlainDate
          ? dateValue
          : Temporal.Instant.from(getMiddayInstant(plainDate, userTimezone));

    return (
      <DateInput
        instanceId={instanceId}
        value={originalPlainDate}
        onEnter={(plainDate) => handleEnter(toInstant(plainDate))}
        onEscape={(plainDate) => handleEscape(toInstant(plainDate))}
        onClickOutside={(event, plainDate) =>
          handleClickOutside(event, toInstant(plainDate))
        }
        onChange={(plainDate) => handleChange(toInstant(plainDate))}
        onSubmit={(plainDate) => handleSubmit(toInstant(plainDate))}
        onClear={handleClear}
        clearable
        renderFooter={(submit) => (
          <SimpleModeQuickDates timeZone={userTimezone} onPick={submit} />
        )}
      />
    );
  }

  return (
    <DateTimeInput
      instanceId={instanceId}
      onClickOutside={handleClickOutside}
      onEnter={handleEnter}
      onEscape={handleEscape}
      value={dateValue}
      clearable
      onChange={handleChange}
      onClear={handleClear}
      onSubmit={handleSubmit}
    />
  );
};
