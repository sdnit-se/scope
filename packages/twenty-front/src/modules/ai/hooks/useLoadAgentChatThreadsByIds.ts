import { useStore } from 'jotai';
import { useCallback } from 'react';
import { isDefined } from 'twenty-shared/utils';

import { useAddAgentChatThreadParticipants } from '@/ai/hooks/useAddAgentChatThreadParticipants';
import { useApplyAgentChatThreadUpdate } from '@/ai/hooks/useApplyAgentChatThreadUpdate';
import { useFetchAgentChatThreadsPage } from '@/ai/hooks/useFetchAgentChatThreadsPage';
import { agentChatThreadRecordUpdateCountState } from '@/ai/states/agentChatThreadRecordUpdateCountState';

// Chats a server view lists may be past the loaded pages
export const useLoadAgentChatThreadsByIds = () => {
  const store = useStore();
  const { addAgentChatThread } = useApplyAgentChatThreadUpdate();
  const { fetchAgentChatThreadsPage } = useFetchAgentChatThreadsPage();
  const { addAgentChatThreadParticipants } =
    useAddAgentChatThreadParticipants();

  const loadAgentChatThreadsByIds = useCallback(
    async (threadIds: string[]) => {
      if (threadIds.length === 0) {
        return [];
      }

      for (let attempt = 0; attempt < 2; attempt++) {
        const updateCountBeforeRequest = store.get(
          agentChatThreadRecordUpdateCountState.atom,
        );
        const page = await fetchAgentChatThreadsPage({
          lastCursor: null,
          threadIdFilter: { id: { in: threadIds } },
        });

        if (!isDefined(page)) {
          return undefined;
        }

        if (
          store.get(agentChatThreadRecordUpdateCountState.atom) !==
          updateCountBeforeRequest
        ) {
          continue;
        }

        for (const thread of page.threads) {
          addAgentChatThread(thread);
        }
        addAgentChatThreadParticipants(page.participants);

        return page.threads;
      }

      return undefined;
    },
    [
      addAgentChatThread,
      addAgentChatThreadParticipants,
      fetchAgentChatThreadsPage,
      store,
    ],
  );

  return { loadAgentChatThreadsByIds };
};
