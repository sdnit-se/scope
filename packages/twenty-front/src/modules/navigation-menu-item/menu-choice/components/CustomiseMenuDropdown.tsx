import { useLingui } from '@lingui/react/macro';
import { LightIconButton } from 'twenty-ui/components/input';
import { Dropdown } from 'twenty-ui/components/navigation';
import { IconLayoutSidebar, IconRestore } from 'twenty-ui/icon';
import { type NavigationMenuItem } from '~/generated-metadata/graphql';

import { getNavigationMenuItemLabel } from '@/navigation-menu-item/display/utils/getNavigationMenuItemLabel';
import { useSaveMenuChoice } from '@/navigation-menu-item/menu-choice/hooks/useSaveMenuChoice';
import { menuChoiceState } from '@/navigation-menu-item/menu-choice/states/menuChoiceState';
import { objectMetadataItemsSelector } from '@/object-metadata/states/objectMetadataItemsSelector';
import { DropdownContent } from '@/ui/layout/dropdown/components/DropdownContent';
import { DropdownRoot } from '@/ui/layout/dropdown/components/DropdownRoot';
import { GenericDropdownContentWidth } from '@/ui/layout/dropdown/constants/GenericDropdownContentWidth';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { viewsSelector } from '@/views/states/selectors/viewsSelector';

type CustomiseMenuDropdownProps = {
  topLevelItems: NavigationMenuItem[];
};

export const CustomiseMenuDropdown = ({
  topLevelItems,
}: CustomiseMenuDropdownProps) => {
  const { t } = useLingui();
  const objectMetadataItems = useAtomStateValue(objectMetadataItemsSelector);
  const views = useAtomStateValue(viewsSelector);
  const menuChoice = useAtomStateValue(menuChoiceState);
  const { saveMenuChoice } = useSaveMenuChoice();

  const hiddenNavigationMenuItemIds =
    menuChoice?.hiddenNavigationMenuItemIds ?? [];

  const shownItemIds = topLevelItems
    .map((item) => item.id)
    .filter((id) => !hiddenNavigationMenuItemIds.includes(id));

  const handleShownItemIdsChange = (nextShownItemIds: string[]) => {
    const hiddenTopLevelItemIds = topLevelItems
      .map((item) => item.id)
      .filter((id) => !nextShownItemIds.includes(id));

    saveMenuChoice(hiddenTopLevelItemIds);
  };

  return (
    <DropdownRoot dropdownId="customise-menu" type="picker">
      <Dropdown.Trigger
        render={
          <LightIconButton
            emphasis="subtle"
            size="sm"
            aria-label={t`Customise menu`}
          >
            <IconLayoutSidebar />
          </LightIconButton>
        }
      />
      <DropdownContent
        side="right"
        align="start"
        width={GenericDropdownContentWidth.ExtraLarge}
        aria-label={t`Customise menu`}
      >
        <Dropdown.SelectionGroup
          aria-label={t`Menu entries`}
          multiple
          value={shownItemIds}
          onValueChange={handleShownItemIdsChange}
        >
          <Dropdown.Section scrollable>
            {topLevelItems.map((item) => (
              <Dropdown.OptionItem key={item.id} value={item.id}>
                {getNavigationMenuItemLabel(item, objectMetadataItems, views)}
              </Dropdown.OptionItem>
            ))}
          </Dropdown.Section>
        </Dropdown.SelectionGroup>
        <Dropdown.Separator />
        <Dropdown.Section>
          <Dropdown.ActionItem
            startIcon={<IconRestore />}
            disabled={hiddenNavigationMenuItemIds.length === 0}
            closeOnClick={false}
            onClick={() => saveMenuChoice([])}
          >
            {t`Restore default`}
          </Dropdown.ActionItem>
        </Dropdown.Section>
      </DropdownContent>
    </DropdownRoot>
  );
};
