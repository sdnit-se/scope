import { type createStore } from 'jotai';

import { type AgentChatThreadPermissions } from '@/ai/types/AgentChatThreadPermissions';
import { currentUserWorkspaceState } from '@/auth/states/currentUserWorkspaceState';
import { metadataStoreState } from '@/metadata-store/states/metadataStoreState';

export const setAgentChatThreadPermissions = (
  store: ReturnType<typeof createStore>,
  permissions: AgentChatThreadPermissions,
) => {
  store.set(metadataStoreState.atomFamily('objectMetadataItems'), {
    current: [{ id: 'chat-object', nameSingular: 'agentChatThread' }],
    draft: [],
    status: 'up-to-date',
  });
  store.set(currentUserWorkspaceState.atom, {
    ...store.get(currentUserWorkspaceState.atom),
    objectsPermissions: [
      {
        objectMetadataId: 'chat-object',
        canReadObjectRecords: permissions.canRead,
        canUpdateObjectRecords: permissions.canUpdate,
        canSoftDeleteObjectRecords: permissions.canSoftDelete,
        canDestroyObjectRecords: permissions.canDelete,
      },
    ],
  } as never);
};
