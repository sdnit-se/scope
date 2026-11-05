import { act, renderHook } from '@testing-library/react';
import { getDefaultStore } from 'jotai';

import {
  type CurrentWorkspaceMember,
  currentWorkspaceMemberState,
} from '@/auth/states/currentWorkspaceMemberState';
import { useSaveMenuChoice } from '@/navigation-menu-item/menu-choice/hooks/useSaveMenuChoice';
import { menuChoiceSaveQueueState } from '@/navigation-menu-item/menu-choice/states/menuChoiceSaveQueueState';
import { menuChoiceState } from '@/navigation-menu-item/menu-choice/states/menuChoiceState';

const mockCreateOneRecord = jest.fn();
const mockUpdateOneRecord = jest.fn();
const mockEnqueueToast = jest.fn();

jest.mock('@/object-record/hooks/useCreateOneRecord', () => ({
  useCreateOneRecord: () => ({ createOneRecord: mockCreateOneRecord }),
}));
jest.mock('@/object-record/hooks/useUpdateOneRecord', () => ({
  useUpdateOneRecord: () => ({ updateOneRecord: mockUpdateOneRecord }),
}));
jest.mock('twenty-ui/components/feedback', () => ({
  useToast: () => ({ enqueueToast: mockEnqueueToast }),
}));

const MEMBER_ID = 'member-1';

describe('useSaveMenuChoice', () => {
  const store = getDefaultStore();

  beforeEach(() => {
    jest.clearAllMocks();
    store.set(currentWorkspaceMemberState.atom, {
      id: MEMBER_ID,
    } as CurrentWorkspaceMember);
    store.set(menuChoiceState.atom, {
      workspaceMemberId: MEMBER_ID,
      hiddenNavigationMenuItemIds: [],
      savedHiddenNavigationMenuItemIds: [],
      isSimpleModeEnabled: false,
    });
    store.set(menuChoiceSaveQueueState.atom, Promise.resolve());
  });

  it('creates the record once and updates it for the next choice', async () => {
    mockCreateOneRecord.mockResolvedValue({ id: 'choice-1' });
    mockUpdateOneRecord.mockResolvedValue({});
    const { result } = renderHook(() => useSaveMenuChoice());

    await act(async () => {
      result.current.saveMenuChoice(['kunder']);
      result.current.saveMenuChoice(['kunder', 'sales']);
      await store.get(menuChoiceSaveQueueState.atom);
    });

    expect(mockCreateOneRecord).toHaveBeenCalledTimes(1);
    expect(mockUpdateOneRecord).toHaveBeenCalledWith(
      expect.objectContaining({
        idToUpdate: 'choice-1',
        updateOneRecordInput: {
          hiddenNavigationMenuItemIds: ['kunder', 'sales'],
        },
      }),
    );
    expect(store.get(menuChoiceState.atom)).toEqual({
      workspaceMemberId: MEMBER_ID,
      id: 'choice-1',
      hiddenNavigationMenuItemIds: ['kunder', 'sales'],
      savedHiddenNavigationMenuItemIds: ['kunder', 'sales'],
      isSimpleModeEnabled: false,
    });
  });

  it('keeps a newer choice that saved when an earlier save failed', async () => {
    store.set(menuChoiceState.atom, {
      workspaceMemberId: MEMBER_ID,
      id: 'choice-1',
      hiddenNavigationMenuItemIds: [],
      savedHiddenNavigationMenuItemIds: [],
      isSimpleModeEnabled: false,
    });
    mockUpdateOneRecord
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce({});
    const { result } = renderHook(() => useSaveMenuChoice());

    await act(async () => {
      result.current.saveMenuChoice(['kunder']);
      result.current.saveMenuChoice(['sales']);
      await store.get(menuChoiceSaveQueueState.atom);
    });

    expect(mockEnqueueToast).toHaveBeenCalledTimes(1);
    expect(
      store.get(menuChoiceState.atom)?.hiddenNavigationMenuItemIds,
    ).toEqual(['sales']);
  });

  it('restores the previous choice when the latest save fails', async () => {
    store.set(menuChoiceState.atom, {
      workspaceMemberId: MEMBER_ID,
      id: 'choice-1',
      hiddenNavigationMenuItemIds: ['kunder'],
      savedHiddenNavigationMenuItemIds: ['kunder'],
      isSimpleModeEnabled: false,
    });
    mockUpdateOneRecord.mockRejectedValueOnce(new Error('offline'));
    const { result } = renderHook(() => useSaveMenuChoice());

    await act(async () => {
      result.current.saveMenuChoice([]);
      await store.get(menuChoiceSaveQueueState.atom);
    });

    expect(
      store.get(menuChoiceState.atom)?.hiddenNavigationMenuItemIds,
    ).toEqual(['kunder']);
  });

  it('goes back to the saved choice when consecutive saves all fail', async () => {
    store.set(menuChoiceState.atom, {
      workspaceMemberId: MEMBER_ID,
      id: 'choice-1',
      hiddenNavigationMenuItemIds: [],
      savedHiddenNavigationMenuItemIds: [],
      isSimpleModeEnabled: false,
    });
    mockUpdateOneRecord.mockRejectedValue(new Error('offline'));
    const { result } = renderHook(() => useSaveMenuChoice());

    await act(async () => {
      result.current.saveMenuChoice(['kunder']);
      result.current.saveMenuChoice(['sales']);
      await store.get(menuChoiceSaveQueueState.atom);
    });

    expect(
      store.get(menuChoiceState.atom)?.hiddenNavigationMenuItemIds,
    ).toEqual([]);
  });
});
