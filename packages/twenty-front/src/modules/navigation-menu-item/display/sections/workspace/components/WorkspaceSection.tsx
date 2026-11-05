import { NavigationMenuItemAddDropdown } from '@/navigation-menu-item/edit/components/NavigationMenuItemAddDropdown';
import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { isNonEmptyString } from '@sniptt/guards';
import { useNavigate } from 'react-router-dom';
import { isDefined } from 'twenty-shared/utils';
import { NavigationMenuItemType } from 'twenty-shared/types';
import { LightIconButton } from 'twenty-ui/components/input';
import { IconPlus, IconTool } from 'twenty-ui/icon';
import { themeCssVariables } from 'twenty-ui/theme';
import { useIsMobile } from 'twenty-ui/utilities';

import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { useEnterLayoutCustomizationMode } from '@/layout-customization/hooks/useEnterLayoutCustomizationMode';
import { isLayoutCustomizationModeEnabledState } from '@/layout-customization/states/isLayoutCustomizationModeEnabledState';
import { selectedNavigationMenuItemIdInEditModeState } from '@/navigation-menu-item/common/states/selectedNavigationMenuItemIdInEditModeState';
import { preloadNavigationMenuItemDndKit } from '@/navigation-menu-item/display/dnd/preloadNavigationMenuItemDndKit';
import {
  type NavigationMenuItemClickParams,
  useNavigationMenuItemSectionItems,
} from '@/navigation-menu-item/display/hooks/useNavigationMenuItemSectionItems';
import { WorkspaceSectionContainer } from '@/navigation-menu-item/display/sections/workspace/components/WorkspaceSectionContainer';
import { useReadableNavigationMenuItems } from '@/navigation-menu-item/display/hooks/useReadableNavigationMenuItems';
import { getNavigationMenuItemComputedLink } from '@/navigation-menu-item/display/utils/getNavigationMenuItemComputedLink';
import { CustomiseMenuDropdown } from '@/navigation-menu-item/menu-choice/components/CustomiseMenuDropdown';
import { MenuChoiceLoadEffect } from '@/navigation-menu-item/menu-choice/components/MenuChoiceLoadEffect';
import { useIsMenuChoiceAvailable } from '@/navigation-menu-item/menu-choice/hooks/useIsMenuChoiceAvailable';
import { menuChoiceState } from '@/navigation-menu-item/menu-choice/states/menuChoiceState';
import { filterHiddenNavigationMenuItems } from '@/navigation-menu-item/menu-choice/utils/filterHiddenNavigationMenuItems';
import { lastVisitedViewPerObjectMetadataItemState } from '@/navigation/states/lastVisitedViewPerObjectMetadataItemState';
import { objectMetadataItemsSelector } from '@/object-metadata/states/objectMetadataItemsSelector';
import { type EnrichedObjectMetadataItem } from '@/object-metadata/types/EnrichedObjectMetadataItem';
import { useHasPermissionFlag } from '@/settings/roles/hooks/useHasPermissionFlag';
import { useNavigationSection } from '@/ui/navigation/navigation-drawer/hooks/useNavigationSection';
import { useAtomState } from '@/ui/utilities/state/jotai/hooks/useAtomState';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { viewsSelector } from '@/views/states/selectors/viewsSelector';

import {
  type NavigationMenuItem,
  PermissionFlagType,
} from '~/generated-metadata/graphql';
import { doNotTranslate } from 'twenty-shared/i18n';

const StyledRightIconsContainer = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[1]};
`;

export const WorkspaceSection = () => {
  const isMobile = useIsMobile();
  const items = useNavigationMenuItemSectionItems();
  const objectMetadataItems = useAtomStateValue(objectMetadataItemsSelector);
  const views = useAtomStateValue(viewsSelector);
  const lastVisitedViewPerObjectMetadataItem = useAtomStateValue(
    lastVisitedViewPerObjectMetadataItemState,
  );
  const { enterLayoutCustomizationMode } = useEnterLayoutCustomizationMode();
  const hasLayoutsPermission = useHasPermissionFlag(PermissionFlagType.LAYOUTS);
  const isLayoutCustomizationModeEnabled = useAtomStateValue(
    isLayoutCustomizationModeEnabledState,
  );
  const [
    selectedNavigationMenuItemIdInEditMode,
    setSelectedNavigationMenuItemIdInEditMode,
  ] = useAtomState(selectedNavigationMenuItemIdInEditModeState);
  const navigate = useNavigate();
  const { openNavigationSection } = useNavigationSection(
    doNotTranslate('Workspace'),
  );
  const isMenuChoiceAvailable = useIsMenuChoiceAvailable();
  const menuChoice = useAtomStateValue(menuChoiceState);
  const currentWorkspaceMember = useAtomStateValue(currentWorkspaceMemberState);
  const currentMemberMenuChoice =
    menuChoice?.workspaceMemberId === currentWorkspaceMember?.id
      ? menuChoice
      : null;
  const folderChildrenById = new Map<string, NavigationMenuItem[]>();
  for (const item of items) {
    if (isDefined(item.folderId)) {
      folderChildrenById.set(item.folderId, [
        ...(folderChildrenById.get(item.folderId) ?? []),
        item,
      ]);
    }
  }
  const { filteredTopLevelItems } = useReadableNavigationMenuItems({
    topLevelItems: items.filter((item) => !isDefined(item.folderId)),
    folderChildrenById,
  });

  const shownItems = isLayoutCustomizationModeEnabled
    ? items
    : filterHiddenNavigationMenuItems(
        items,
        currentMemberMenuChoice?.hiddenNavigationMenuItemIds ?? [],
      );

  const { t } = useLingui();

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    enterLayoutCustomizationMode();
  };

  const handleNavigationMenuItemClick = ({
    item,
  }: NavigationMenuItemClickParams) => {
    setSelectedNavigationMenuItemIdInEditMode(item.id);
    if (
      item.type === NavigationMenuItemType.FOLDER ||
      item.type === NavigationMenuItemType.LINK
    ) {
      return;
    }
    const link = getNavigationMenuItemComputedLink({
      item,
      objectMetadataItems,
      views,
      lastVisitedViewPerObjectMetadataItem,
    });
    if (isNonEmptyString(link)) {
      navigate(link);
    }
  };
  const handleActiveObjectMetadataItemClick = (
    _objectMetadataItem: EnrichedObjectMetadataItem,
    navigationMenuItemId: string,
  ) => {
    if (enterLayoutCustomizationMode()) {
      setSelectedNavigationMenuItemIdInEditMode(navigationMenuItemId);
    }
  };

  return (
    <>
      {isMenuChoiceAvailable && <MenuChoiceLoadEffect />}
      <WorkspaceSectionContainer
        sectionTitle={t`Workspace`}
        items={shownItems}
        rightIcon={
          // Customising the menu is desktop-only.
          isMobile ? undefined : (
            <StyledRightIconsContainer>
              {isLayoutCustomizationModeEnabled ? (
                <NavigationMenuItemAddDropdown
                  instanceId="workspace-header"
                  position={0}
                  onOpen={openNavigationSection}
                >
                  <LightIconButton
                    emphasis="subtle"
                    size="sm"
                    aria-label={t`Add`}
                  >
                    <IconPlus />
                  </LightIconButton>
                </NavigationMenuItemAddDropdown>
              ) : (
                <>
                  {isMenuChoiceAvailable &&
                    isDefined(currentMemberMenuChoice) && (
                      <CustomiseMenuDropdown
                        topLevelItems={filteredTopLevelItems}
                      />
                    )}
                  {hasLayoutsPermission && (
                    <div onMouseEnter={preloadNavigationMenuItemDndKit}>
                      <LightIconButton
                        emphasis="subtle"
                        size="sm"
                        onClick={handleEditClick}
                        aria-label={t`Edit navigation`}
                      >
                        <IconTool />
                      </LightIconButton>
                    </div>
                  )}
                </>
              )}
            </StyledRightIconsContainer>
          )
        }
        selectedNavigationMenuItemId={selectedNavigationMenuItemIdInEditMode}
        onNavigationMenuItemClick={
          isLayoutCustomizationModeEnabled
            ? handleNavigationMenuItemClick
            : undefined
        }
        onActiveObjectMetadataItemClick={handleActiveObjectMetadataItemClick}
      />
    </>
  );
};
