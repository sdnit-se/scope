import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { getToastOptionsFromError } from '@/error-handler/utils/getToastOptionsFromError';
import { MENU_CHOICE_OBJECT_NAME_SINGULAR } from '@/navigation-menu-item/menu-choice/constants/MenuChoiceObjectNameSingular';
import { menuChoiceSaveQueueState } from '@/navigation-menu-item/menu-choice/states/menuChoiceSaveQueueState';
import { menuChoiceState } from '@/navigation-menu-item/menu-choice/states/menuChoiceState';
import { useCreateOneRecord } from '@/object-record/hooks/useCreateOneRecord';
import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { useStore } from 'jotai';
import { isDefined } from 'twenty-shared/utils';
import { useToast } from 'twenty-ui/components/feedback';

export const useSaveMenuChoice = () => {
  const store = useStore();
  const currentWorkspaceMember = useAtomStateValue(currentWorkspaceMemberState);
  const { enqueueToast } = useToast();

  const { createOneRecord } = useCreateOneRecord({
    objectNameSingular: MENU_CHOICE_OBJECT_NAME_SINGULAR,
  });
  const { updateOneRecord } = useUpdateOneRecord();

  const persistMenuChoice = async (
    workspaceMemberId: string,
    hiddenNavigationMenuItemIds: string[],
  ) => {
    const savedMenuChoiceId = store.get(menuChoiceState.atom)?.id;

    if (isDefined(savedMenuChoiceId)) {
      await updateOneRecord({
        objectNameSingular: MENU_CHOICE_OBJECT_NAME_SINGULAR,
        idToUpdate: savedMenuChoiceId,
        updateOneRecordInput: { hiddenNavigationMenuItemIds },
      });
    } else {
      const createdMenuChoice = await createOneRecord({
        workspaceMemberId,
        hiddenNavigationMenuItemIds,
      });

      store.set(menuChoiceState.atom, (menuChoice) =>
        isDefined(menuChoice)
          ? { ...menuChoice, id: createdMenuChoice.id }
          : null,
      );
    }

    store.set(menuChoiceState.atom, (menuChoice) =>
      isDefined(menuChoice)
        ? {
            ...menuChoice,
            savedHiddenNavigationMenuItemIds: hiddenNavigationMenuItemIds,
          }
        : null,
    );
  };

  const saveMenuChoice = (hiddenNavigationMenuItemIds: string[]) => {
    const menuChoice = store.get(menuChoiceState.atom);

    if (
      !isDefined(currentWorkspaceMember) ||
      menuChoice?.workspaceMemberId !== currentWorkspaceMember.id
    ) {
      return;
    }

    store.set(menuChoiceState.atom, {
      ...menuChoice,
      hiddenNavigationMenuItemIds,
    });

    const save = store
      .get(menuChoiceSaveQueueState.atom)
      .then(() =>
        persistMenuChoice(
          currentWorkspaceMember.id,
          hiddenNavigationMenuItemIds,
        ),
      )
      .catch((error: unknown) => {
        enqueueToast(getToastOptionsFromError({ error }));

        // A newer queued save writes the whole list, so only the latest save rolls back.
        if (store.get(menuChoiceSaveQueueState.atom) !== save) {
          return;
        }

        store.set(menuChoiceState.atom, (currentMenuChoice) =>
          isDefined(currentMenuChoice)
            ? {
                ...currentMenuChoice,
                hiddenNavigationMenuItemIds:
                  currentMenuChoice.savedHiddenNavigationMenuItemIds,
              }
            : null,
        );
      });

    store.set(menuChoiceSaveQueueState.atom, save);
  };

  return { saveMenuChoice };
};
