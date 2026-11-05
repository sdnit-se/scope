import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { MENU_CHOICE_OBJECT_NAME_SINGULAR } from '@/navigation-menu-item/menu-choice/constants/MenuChoiceObjectNameSingular';
import { useIsSimpleModeFieldAvailable } from '@/navigation-menu-item/menu-choice/hooks/useIsSimpleModeFieldAvailable';
import { menuChoiceState } from '@/navigation-menu-item/menu-choice/states/menuChoiceState';
import { useFindManyRecords } from '@/object-record/hooks/useFindManyRecords';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { useSetAtomState } from '@/ui/utilities/state/jotai/hooks/useSetAtomState';
import { isDefined } from 'twenty-shared/utils';

export const MenuChoiceLoadEffect = () => {
  const currentWorkspaceMember = useAtomStateValue(currentWorkspaceMemberState);
  const setMenuChoice = useSetAtomState(menuChoiceState);
  const isSimpleModeFieldAvailable = useIsSimpleModeFieldAvailable();

  useFindManyRecords<
    ObjectRecord & {
      hiddenNavigationMenuItemIds: string[] | null;
      isSimpleModeEnabled?: boolean | null;
    }
  >({
    objectNameSingular: MENU_CHOICE_OBJECT_NAME_SINGULAR,
    filter: { workspaceMemberId: { eq: currentWorkspaceMember?.id } },
    limit: 1,
    recordGqlFields: {
      id: true,
      hiddenNavigationMenuItemIds: true,
      ...(isSimpleModeFieldAvailable ? { isSimpleModeEnabled: true } : {}),
    },
    fetchPolicy: 'network-only',
    // Later completions come from the cache after this person's own saves, which already updated the state.
    onCompleted: (records) => {
      const record = records[0];

      setMenuChoice((currentMenuChoice) =>
        isDefined(currentWorkspaceMember) &&
        currentMenuChoice?.workspaceMemberId !== currentWorkspaceMember.id
          ? {
              workspaceMemberId: currentWorkspaceMember.id,
              id: record?.id,
              hiddenNavigationMenuItemIds:
                record?.hiddenNavigationMenuItemIds ?? [],
              savedHiddenNavigationMenuItemIds:
                record?.hiddenNavigationMenuItemIds ?? [],
              isSimpleModeEnabled: record?.isSimpleModeEnabled === true,
            }
          : currentMenuChoice,
      );
    },
  });

  return null;
};
