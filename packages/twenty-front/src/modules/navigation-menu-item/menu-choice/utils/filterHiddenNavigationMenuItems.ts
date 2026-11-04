import { isDefined } from 'twenty-shared/utils';
import { type NavigationMenuItem } from '~/generated-metadata/graphql';

export const filterHiddenNavigationMenuItems = (
  items: NavigationMenuItem[],
  hiddenNavigationMenuItemIds: string[],
): NavigationMenuItem[] =>
  items.filter(
    (item) =>
      !hiddenNavigationMenuItemIds.includes(item.id) &&
      !(
        isDefined(item.folderId) &&
        hiddenNavigationMenuItemIds.includes(item.folderId)
      ),
  );
