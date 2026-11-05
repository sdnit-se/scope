import { type FieldDateMetadataSettings } from '@/object-record/record-field/ui/types/FieldMetadata';
import { EllipsisDisplay } from '@/ui/field/display/components/internal/EllipsisDisplay/EllipsisDisplay';
import { TimeZoneAbbreviation } from '@/ui/input/components/internal/date/components/TimeZoneAbbreviation';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { UserContext } from '@/users/contexts/UserContext';
import { styled } from '@linaria/react';
import { isNonEmptyString } from '@sniptt/guards';
import { useContext } from 'react';
import { themeCssVariables } from 'twenty-ui/theme';
import { dateLocaleState } from '@/localization/states/dateLocaleState';
import { formatDateTimeString } from '@/object-record/record-field/ui/utils/formatDateTimeString';
import { useIsSimpleModeEnabled } from '@/simple-mode/hooks/useIsSimpleModeEnabled';
import { getSimpleModeDateFieldSettings } from '@/simple-mode/utils/getSimpleModeDateFieldSettings';

const StyledTimeZoneSpacer = styled.span`
  min-width: ${themeCssVariables.spacing[1]};
`;

type DateTimeDisplayProps = {
  value: string | null | undefined;
  dateFieldSettings?: FieldDateMetadataSettings;
};

export const DateTimeDisplay = ({
  value,
  dateFieldSettings,
}: DateTimeDisplayProps) => {
  const { dateFormat, timeFormat, timeZone } = useContext(UserContext);
  const dateLocale = useAtomStateValue(dateLocaleState);
  const isSimpleModeEnabled = useIsSimpleModeEnabled();

  const formattedDate = formatDateTimeString({
    value,
    timeZone,
    dateFormat,
    timeFormat,
    dateFieldSettings: isSimpleModeEnabled
      ? getSimpleModeDateFieldSettings(dateFieldSettings)
      : dateFieldSettings,
    localeCatalog: dateLocale.localeCatalog,
  });

  return (
    <EllipsisDisplay>
      {formattedDate}
      <span></span>
      {isNonEmptyString(value) && !isSimpleModeEnabled && (
        <>
          <StyledTimeZoneSpacer />
          <TimeZoneAbbreviation instant={value} />
        </>
      )}
    </EllipsisDisplay>
  );
};
