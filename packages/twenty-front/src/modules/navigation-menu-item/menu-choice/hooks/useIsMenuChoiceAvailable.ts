import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { MENU_CHOICE_OBJECT_NAME_SINGULAR } from '@/navigation-menu-item/menu-choice/constants/MenuChoiceObjectNameSingular';
import { useObjectMetadataItems } from '@/object-metadata/hooks/useObjectMetadataItems';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { isDefined } from 'twenty-shared/utils';

export const useIsMenuChoiceAvailable = () => {
  const currentWorkspaceMember = useAtomStateValue(currentWorkspaceMemberState);
  const { objectMetadataItems } = useObjectMetadataItems();

  return (
    isDefined(currentWorkspaceMember) &&
    objectMetadataItems.some(
      (item) => item.nameSingular === MENU_CHOICE_OBJECT_NAME_SINGULAR,
    )
  );
};
