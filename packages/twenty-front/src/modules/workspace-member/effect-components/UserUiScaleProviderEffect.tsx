import { useEffect } from 'react';

import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { useIsSimpleModeEnabled } from '@/simple-mode/hooks/useIsSimpleModeEnabled';
import { UI_SCALE_MULTIPLIERS } from '@/ui/theme/constants/UiScaleMultipliers';
import { persistedUiScaleStepState } from '@/ui/theme/states/persistedUiScaleStepState';
import { type UiScale } from '@/ui/theme/types/UiScale';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { useSetAtomState } from '@/ui/utilities/state/jotai/hooks/useSetAtomState';
import { doNotTranslate } from 'twenty-shared/i18n';
import { isDefined } from 'twenty-shared/utils';

const SIMPLE_MODE_MINIMUM_UI_SCALE: UiScale = doNotTranslate('Large');

// BaseThemeProvider reads the persisted step before login; keep it following the workspace member, the synced source of truth
export const UserUiScaleProviderEffect = () => {
  const currentWorkspaceMember = useAtomStateValue(currentWorkspaceMemberState);
  const setPersistedUiScaleStep = useSetAtomState(persistedUiScaleStepState);
  const isSimpleModeEnabled = useIsSimpleModeEnabled();

  useEffect(() => {
    if (!isDefined(currentWorkspaceMember?.uiScale)) {
      return;
    }

    // Simple mode is at least Large; a person who already chose Larger keeps it.
    setPersistedUiScaleStep(
      isSimpleModeEnabled &&
        UI_SCALE_MULTIPLIERS[currentWorkspaceMember.uiScale] <
          UI_SCALE_MULTIPLIERS[SIMPLE_MODE_MINIMUM_UI_SCALE]
        ? SIMPLE_MODE_MINIMUM_UI_SCALE
        : currentWorkspaceMember.uiScale,
    );
  }, [
    currentWorkspaceMember?.uiScale,
    isSimpleModeEnabled,
    setPersistedUiScaleStep,
  ]);

  return <></>;
};
