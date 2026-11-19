import { currentUserState } from '@/auth/states/currentUserState';
import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { onboardingConfigState } from '@/client-config/states/onboardingConfigState';
import { ONBOARDING_CREDITS_PROGRESS_EMPTY_VALUE } from '@/onboarding/constants/OnboardingCreditsProgressEmptyValue';
import { onboardingCreateProfileDraftState } from '@/onboarding/states/onboardingCreateProfileDraftState';
import { currentWorkspaceOnboardingFreeCreditsSelector } from '@/onboarding/states/selectors/currentWorkspaceOnboardingFreeCreditsSelector';
import { onboardingInviteTeamValidEmailsSelector } from '@/onboarding/states/selectors/onboardingInviteTeamValidEmailsSelector';
import { type OnboardingCreditsProgress } from '@/onboarding/types/OnboardingCreditsProgress';
import { getOnboardingCreditsProgress } from '@/onboarding/utils/getOnboardingCreditsProgress';
import { createAtomSelector } from '@/ui/utilities/state/jotai/utils/createAtomSelector';
import { isDefined } from 'twenty-shared/utils';
import { isDeeplyEqual } from '~/utils/isDeeplyEqual';

export const onboardingCreditsProgressSelector =
  createAtomSelector<OnboardingCreditsProgress>({
    key: 'onboardingCreditsProgressSelector',
    get: ({ get }) => {
      const onboardingConfig = get(onboardingConfigState);

      if (!isDefined(onboardingConfig)) {
        return ONBOARDING_CREDITS_PROGRESS_EMPTY_VALUE;
      }

      const currentUser = get(currentUserState);

      return getOnboardingCreditsProgress({
        onboardingFreeCredits: get(
          currentWorkspaceOnboardingFreeCreditsSelector,
        ),
        onboardingConfig,
        onboardingStatus: currentUser?.onboardingStatus,
        isWorkspaceCreator: currentUser?.isWorkspaceCreator ?? false,
        profileName:
          get(onboardingCreateProfileDraftState) ??
          get(currentWorkspaceMemberState)?.name,
        inviteTeamValidEmailsCount: get(onboardingInviteTeamValidEmailsSelector)
          .length,
      });
    },
    areEqual: isDeeplyEqual,
  });
