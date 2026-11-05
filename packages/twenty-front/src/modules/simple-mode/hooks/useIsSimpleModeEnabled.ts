import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { menuChoiceState } from '@/navigation-menu-item/menu-choice/states/menuChoiceState';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { isDefined } from 'twenty-shared/utils';

export const useIsSimpleModeEnabled = () => {
  const currentWorkspaceMember = useAtomStateValue(currentWorkspaceMemberState);
  const menuChoice = useAtomStateValue(menuChoiceState);

  return (
    isDefined(currentWorkspaceMember) &&
    menuChoice?.workspaceMemberId === currentWorkspaceMember.id &&
    menuChoice.isSimpleModeEnabled
  );
};
