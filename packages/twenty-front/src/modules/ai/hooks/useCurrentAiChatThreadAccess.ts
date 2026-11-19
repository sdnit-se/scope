import { useIsOnNewAiChatSlot } from '@/ai/hooks/useIsOnNewAiChatSlot';
import { currentAiChatThreadState } from '@/ai/states/currentAiChatThreadState';
import { agentChatThreadPermissionsSelector } from '@/ai/states/selectors/agentChatThreadPermissionsSelector';
import { getAiChatThreadAccess } from '@/ai/utils/getAiChatThreadAccess';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';

export const useCurrentAiChatThreadAccess = () => {
  const currentAiChatThread = useAtomStateValue(currentAiChatThreadState);
  const isOnNewAiChatSlot = useIsOnNewAiChatSlot();
  const agentChatThreadPermissions = useAtomStateValue(
    agentChatThreadPermissionsSelector,
  );

  // Before the chat list picks a chat, the composer writes to the new one
  return getAiChatThreadAccess({
    isOnNewAiChatSlot: isOnNewAiChatSlot || currentAiChatThread === null,
    permissions: agentChatThreadPermissions,
  });
};
