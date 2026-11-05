import { createAtomState } from '@/ui/utilities/state/jotai/utils/createAtomState';

export type MenuChoice = {
  workspaceMemberId: string;
  id?: string;
  hiddenNavigationMenuItemIds: string[];
  savedHiddenNavigationMenuItemIds: string[];
};

export const menuChoiceState = createAtomState<MenuChoice | null>({
  key: 'menuChoiceState',
  defaultValue: null,
});
