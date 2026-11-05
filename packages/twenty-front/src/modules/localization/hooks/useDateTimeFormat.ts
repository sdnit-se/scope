import { DateFormat } from '@/localization/constants/DateFormat';
import { useIsSimpleModeEnabled } from '@/simple-mode/hooks/useIsSimpleModeEnabled';
import { workspaceMemberFormatPreferencesState } from '@/localization/states/workspaceMemberFormatPreferencesState';
import { resolveDateFormat } from '@/localization/utils/resolveDateFormat';
import { resolveTimeFormat } from '@/localization/utils/resolveTimeFormat';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';

export const useDateTimeFormat = () => {
  const workspaceMemberFormatPreferences = useAtomStateValue(
    workspaceMemberFormatPreferencesState,
  );
  const isSimpleModeEnabled = useIsSimpleModeEnabled();

  return {
    timeZone: workspaceMemberFormatPreferences.timeZone,
    dateFormat: isSimpleModeEnabled
      ? DateFormat.YEAR_FIRST
      : resolveDateFormat(workspaceMemberFormatPreferences.dateFormat),
    timeFormat: resolveTimeFormat(workspaceMemberFormatPreferences.timeFormat),
    calendarStartDay: workspaceMemberFormatPreferences.calendarStartDay,
  };
};
