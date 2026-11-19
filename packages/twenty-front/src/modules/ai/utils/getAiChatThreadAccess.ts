import { isDefined } from 'twenty-shared/utils';

import { type AgentChatThreadPermissions } from '@/ai/types/AgentChatThreadPermissions';

type GetAiChatThreadAccessParams = {
  isOnNewAiChatSlot: boolean;
  permissions: AgentChatThreadPermissions | undefined;
};

export const getAiChatThreadAccess = ({
  isOnNewAiChatSlot,
  permissions,
}: GetAiChatThreadAccessParams) => {
  if (isOnNewAiChatSlot) {
    return 'writer';
  }
  if (!isDefined(permissions?.canUpdate)) {
    return 'loading';
  }
  if (!permissions.canRead) {
    return 'unavailable';
  }
  return permissions.canUpdate ? 'writer' : 'viewer';
};
