import { usePushFocusItemToFocusStack } from '@/ui/utilities/focus/hooks/usePushFocusItemToFocusStack';
import { useRemoveFocusItemFromFocusStackById } from '@/ui/utilities/focus/hooks/useRemoveFocusItemFromFocusStackById';
import { useRemoveFocusItemFromFocusStackOnUnmount } from '@/ui/utilities/focus/hooks/useRemoveFocusItemFromFocusStackOnUnmount';
import { FocusComponentType } from '@/ui/utilities/focus/types/FocusComponentType';

// While someone types in a simple-mode box, Twenty's single-key shortcuts (such as "g" then "d") must not fire.
export const useSimpleModeTypingFocus = (focusId: string) => {
  const { pushFocusItemToFocusStack } = usePushFocusItemToFocusStack();
  const { removeFocusItemFromFocusStackById } =
    useRemoveFocusItemFromFocusStackById();

  // A box removed while focused (a form closing, Back) fires no blur; the shortcuts must come back anyway.
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
