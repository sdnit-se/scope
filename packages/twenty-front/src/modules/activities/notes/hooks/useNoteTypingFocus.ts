import { usePushFocusItemToFocusStack } from '@/ui/utilities/focus/hooks/usePushFocusItemToFocusStack';
import { useRemoveFocusItemFromFocusStackById } from '@/ui/utilities/focus/hooks/useRemoveFocusItemFromFocusStackById';
import { useRemoveFocusItemFromFocusStackOnUnmount } from '@/ui/utilities/focus/hooks/useRemoveFocusItemFromFocusStackOnUnmount';
import { FocusComponentType } from '@/ui/utilities/focus/types/FocusComponentType';

// While someone types in the note box, Twenty's single-key shortcuts (such as "g" then "d") must not fire.
export const useNoteTypingFocus = (focusId: string) => {
  const { pushFocusItemToFocusStack } = usePushFocusItemToFocusStack();
  const { removeFocusItemFromFocusStackById } =
    useRemoveFocusItemFromFocusStackById();

  useRemoveFocusItemFromFocusStackOnUnmount({ focusId, isEnabled: true });

  return {
    onFocus: () =>
      pushFocusItemToFocusStack({
        focusId,
        component: { type: FocusComponentType.TEXT_AREA, instanceId: focusId },
        globalHotkeysConfig: {
          enableGlobalHotkeysConflictingWithKeyboard: false,
        },
      }),
    onBlur: () => removeFocusItemFromFocusStackById({ focusId }),
  };
};
