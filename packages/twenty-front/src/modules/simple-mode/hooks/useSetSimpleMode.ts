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

// Saves on the person's menu-choice record, in the same queue as the menu, so neither save overwrites the other.
export const useSetSimpleMode = () => {
  const store = useStore();
  const currentWorkspaceMember = useAtomStateValue(currentWorkspaceMemberState);
  const { enqueueToast } = useToast();

  const { createOneRecord } = useCreateOneRecord({
    objectNameSingular: MENU_CHOICE_OBJECT_NAME_SINGULAR,
  });
  const { updateOneRecord } = useUpdateOneRecord();

  const persistSimpleMode = async (
    workspaceMemberId: string,
    isSimpleModeEnabled: boolean,
  ) => {
    const menuChoice = store.get(menuChoiceState.atom);

    if (isDefined(menuChoice?.id)) {
      await updateOneRecord({
        objectNameSingular: MENU_CHOICE_OBJECT_NAME_SINGULAR,
        idToUpdate: menuChoice.id,
        updateOneRecordInput: { isSimpleModeEnabled },
      });

      return;
    }

    const createdMenuChoice = await createOneRecord({
      workspaceMemberId,
      hiddenNavigationMenuItemIds:
        menuChoice?.savedHiddenNavigationMenuItemIds ?? [],
      isSimpleModeEnabled,
    });

    store.set(menuChoiceState.atom, (current) =>
      isDefined(current) ? { ...current, id: createdMenuChoice.id } : null,
    );
  };

  const setSimpleMode = (isSimpleModeEnabled: boolean) => {
    const menuChoice = store.get(menuChoiceState.atom);

    if (
      !isDefined(currentWorkspaceMember) ||
      menuChoice?.workspaceMemberId !== currentWorkspaceMember.id
    ) {
      return;
    }

    const previous = menuChoice.isSimpleModeEnabled;

    store.set(menuChoiceState.atom, { ...menuChoice, isSimpleModeEnabled });

    const save = store
      .get(menuChoiceSaveQueueState.atom)
      .then(() =>
        persistSimpleMode(currentWorkspaceMember.id, isSimpleModeEnabled),
      )
      .catch((error: unknown) => {
        enqueueToast(getToastOptionsFromError({ error }));

        if (store.get(menuChoiceSaveQueueState.atom) !== save) {
          return;
        }

        store.set(menuChoiceState.atom, (current) =>
          isDefined(current)
            ? { ...current, isSimpleModeEnabled: previous }
            : null,
        );
      });

    store.set(menuChoiceSaveQueueState.atom, save);
  };

  return { setSimpleMode };
};
