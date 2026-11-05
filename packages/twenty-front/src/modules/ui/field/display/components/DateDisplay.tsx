import { type FieldDateMetadataSettings } from '@/object-record/record-field/ui/types/FieldMetadata';
import { EllipsisDisplay } from '@/ui/field/display/components/internal/EllipsisDisplay/EllipsisDisplay';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { UserContext } from '@/users/contexts/UserContext';
import { useContext } from 'react';
import { dateLocaleState } from '@/localization/states/dateLocaleState';
import { formatDateString } from '@/object-record/record-field/ui/utils/formatDateString';
import { doNotTranslate } from 'twenty-shared/i18n';
import { useIsSimpleModeEnabled } from '@/simple-mode/hooks/useIsSimpleModeEnabled';
import { getSimpleModeDateFieldSettings } from '@/simple-mode/utils/getSimpleModeDateFieldSettings';

type DateDisplayProps = {
  value: string | null | undefined;
  dateFieldSettings?: FieldDateMetadataSettings;
};
export const DateDisplay = ({ value, dateFieldSettings }: DateDisplayProps) => {
  const { dateFormat } = useContext(UserContext);
  const dateLocale = useAtomStateValue(dateLocaleState);
  const isSimpleModeEnabled = useIsSimpleModeEnabled();

  const formattedDate = formatDateString({
    value,
    timeZone: doNotTranslate('UTC'), // Needed because we have db-stored date (yyyy-mm-dd) is converted to UTC dateTime by TypeORM
    dateFormat,
    dateFieldSettings: isSimpleModeEnabled
      ? getSimpleModeDateFieldSettings(dateFieldSettings)
      : dateFieldSettings,
    localeCatalog: dateLocale.localeCatalog,
  });

  return <EllipsisDisplay>{formattedDate}</EllipsisDisplay>;
};
