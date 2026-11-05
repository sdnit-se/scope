import { getSimpleModeViewChoices } from '@/simple-mode/utils/getSimpleModeViewChoices';
import { type View } from '@/views/types/View';
import { ViewType } from '@/views/types/ViewType';
import { NavigationMenuItemType } from '~/generated-metadata/graphql';

const COMPANY = 'company-object';

const view = (
  id: string,
  position: number,
  filterValues: (string | { value: string; operand: string })[] = [],
  type = ViewType.TABLE,
  objectMetadataId = COMPANY,
) =>
  ({
    id,
    name: id,
    type,
    position,
    objectMetadataId,
    viewFilters: filterValues.map((filter) =>
      typeof filter === 'string' ? { value: filter, operand: 'IS' } : filter,
    ),
  }) as unknown as View;

const menuEntry = (
  viewId: string,
  name: string,
  folderId: string | null = null,
) => ({
  type: NavigationMenuItemType.VIEW,
  viewId,
  folderId,
  userWorkspaceId: null,
  name,
  position: 0,
});

const MINE = JSON.stringify({
  isCurrentWorkspaceMemberSelected: true,
  selectedRecordIds: [],
});

describe('getSimpleModeViewChoices', () => {
  it('pairs the list the shared menu opens with the same kind of list filtered on me', () => {
    expect(
      getSimpleModeViewChoices({
        objectMetadataId: COMPANY,
        views: [
          view('all-companies', 0),
          view('kunder', -2),
          view('my-board', 1, [MINE], ViewType.KANBAN),
          view('my-accounts', 3, ['', MINE]),
        ],
        navigationMenuItems: [
          menuEntry('kunder', 'Kunder'),
          menuEntry('all-companies', 'All', 'some-folder'),
        ],
      }),
    ).toEqual({
      label: 'kunder',
      allViewId: 'kunder',
      mineViewId: 'my-accounts',
    });
  });

  it('never takes a list that excludes me as "Mina"', () => {
    expect(
      getSimpleModeViewChoices({
        objectMetadataId: COMPANY,
        views: [
          view('kunder', -2),
          view('not-mine', 1, [{ value: MINE, operand: 'IS_NOT' }]),
        ],
        navigationMenuItems: [menuEntry('kunder', 'Kunder')],
      })?.mineViewId,
    ).toBeUndefined();
  });

  it('offers only "Alla" when no list is filtered on me', () => {
    expect(
      getSimpleModeViewChoices({
        objectMetadataId: COMPANY,
        views: [view('kontakter', -1)],
        navigationMenuItems: [menuEntry('kontakter', 'Kontakter')],
      }),
    ).toEqual({
      label: 'kontakter',
      allViewId: 'kontakter',
      mineViewId: undefined,
    });
  });

  it('keeps the normal view picker when the shared menu has no top-level entry for the object', () => {
    expect(
      getSimpleModeViewChoices({
        objectMetadataId: COMPANY,
        views: [view('kunder', -2)],
        navigationMenuItems: [menuEntry('kunder', 'Kunder', 'some-folder')],
      }),
    ).toBeNull();
  });
});
