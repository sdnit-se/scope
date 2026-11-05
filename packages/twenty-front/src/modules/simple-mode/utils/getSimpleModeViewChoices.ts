import {
  type NavigationMenuItem,
  NavigationMenuItemType,
} from '~/generated-metadata/graphql';
import { type View } from '@/views/types/View';
import { ViewFilterOperand } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';

export type SimpleModeViewChoices = {
  label: string;
  allViewId: string;
  mineViewId?: string;
};

const isFilteredOnCurrentMember = (view: View) =>
  view.viewFilters.some(
    (filter) =>
      filter.operand === ViewFilterOperand.IS &&
      filter.value.includes('"isCurrentWorkspaceMemberSelected":true'),
  );

// "Alla" is the list the shared menu opens for this object; "Mina" is the same kind of list filtered on the signed-in
// member. Without a shared menu entry for the object there is nothing to simplify, and the normal picker stays.
export const getSimpleModeViewChoices = ({
  objectMetadataId,
  views,
  navigationMenuItems,
}: {
  objectMetadataId: string;
  views: View[];
  navigationMenuItems: Pick<
    NavigationMenuItem,
    'type' | 'viewId' | 'folderId' | 'userWorkspaceId' | 'name' | 'position'
  >[];
}): SimpleModeViewChoices | null => {
  const viewById = new Map(views.map((view) => [view.id, view]));

  const menuEntry = navigationMenuItems
    .filter(
      (item) =>
        item.type === NavigationMenuItemType.VIEW &&
        !isDefined(item.folderId) &&
        !isDefined(item.userWorkspaceId) &&
        isDefined(item.viewId) &&
        viewById.get(item.viewId)?.objectMetadataId === objectMetadataId,
    )
    .toSorted((left, right) => left.position - right.position)[0];

  const allView = isDefined(menuEntry?.viewId)
    ? viewById.get(menuEntry.viewId)
    : undefined;

  if (!isDefined(allView)) {
    return null;
  }

  const mineView = views
    .filter(
      (view) =>
        view.objectMetadataId === objectMetadataId &&
        view.type === allView.type &&
        view.id !== allView.id &&
        isFilteredOnCurrentMember(view),
    )
    .toSorted((left, right) => left.position - right.position)[0];

  return {
    label: (menuEntry?.name ?? allView.name).toLocaleLowerCase('sv-SE'),
    allViewId: allView.id,
    mineViewId: mineView?.id,
  };
};
