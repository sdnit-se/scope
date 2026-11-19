import { currentUserState } from '@/auth/states/currentUserState';
import { useSetNextOnboardingStatus } from '@/onboarding/hooks/useSetNextOnboardingStatus';
import { setIsBookCallOnboardingStepPending } from '@/onboarding/utils/setIsBookCallOnboardingStepPending';
import { useSetAtomState } from '@/ui/utilities/state/jotai/hooks/useSetAtomState';
import { useMutation } from '@apollo/client/react';
import { useCallback } from 'react';
import { CompleteBookCallOnboardingStepDocument } from '~/generated-metadata/graphql';

export const useCompleteBookCallOnboardingStep = () => {
  const setNextOnboardingStatus = useSetNextOnboardingStatus();
  const setCurrentUser = useSetAtomState(currentUserState);
  const [completeBookCallOnboardingStepMutation] = useMutation(
    CompleteBookCallOnboardingStepDocument,
  );

  return useCallback(
    async ({ hasBookedCall }: { hasBookedCall: boolean }) => {
      await completeBookCallOnboardingStepMutation({
        variables: { hasBookedCall, isAutoSkipped: false },
      });

      setCurrentUser((current) =>
        setIsBookCallOnboardingStepPending(current, false),
      );
      setNextOnboardingStatus({
        stepHistoryEffect: hasBookedCall
          ? 'clearAfterIrreversibleStep'
          : 'recordAsReversible',
      });
    },
    [
      completeBookCallOnboardingStepMutation,
      setCurrentUser,
      setNextOnboardingStatus,
    ],
  );
};
