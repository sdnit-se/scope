import { filterHiddenNavigationMenuItems } from '@/navigation-menu-item/menu-choice/utils/filterHiddenNavigationMenuItems';
import { type NavigationMenuItem } from '~/generated-metadata/graphql';

const item = (id: string, folderId?: string) =>
  ({ id, folderId }) as NavigationMenuItem;

describe('filterHiddenNavigationMenuItems', () => {
  const kunder = item('kunder');
  const salesFolder = item('sales');
  const staleDeals = item('stale-deals', 'sales');
  const kontakter = item('kontakter');

  it('hides the chosen entries and everything inside a hidden folder', () => {
    expect(
      filterHiddenNavigationMenuItems(
        [kunder, salesFolder, staleDeals, kontakter],
        ['sales', 'kontakter'],
      ),
    ).toEqual([kunder]);
  });

  it('shows the whole shared menu when nothing is hidden', () => {
    expect(
      filterHiddenNavigationMenuItems([kunder, salesFolder, staleDeals], []),
    ).toEqual([kunder, salesFolder, staleDeals]);
  });
});
