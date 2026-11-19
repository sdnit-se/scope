import { setAgentChatThreadPermissions } from '@/ai/testing/setAgentChatThreadPermissions';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { render, screen } from '@testing-library/react';
import { Provider as JotaiProvider } from 'jotai';
import { type ReactNode } from 'react';

import { AiChatEditorSection } from '@/ai/components/AiChatEditorSection';
import { currentAiChatThreadState } from '@/ai/states/currentAiChatThreadState';
import {
  jotaiStore,
  resetJotaiStore,
} from '@/ui/utilities/state/jotai/jotaiStore';

const useAiChatEditor = jest.fn();
jest.mock('@/ai/hooks/useAiChatEditor', () => ({
  useAiChatEditor: () => useAiChatEditor(),
}));
jest.mock('@/ai/components/AiChatStandaloneError', () => ({
  AiChatStandaloneError: () => null,
}));
// The gate's cards pull in a rich text editor Jest cannot load.
jest.mock('@/ai/components/AiChatPendingAskGate', () => ({
  AiChatPendingAskGate: ({ children }: { children: ReactNode }) => children,
}));
const Wrapper = ({ children }: { children: ReactNode }) => (
  <JotaiProvider store={jotaiStore}>
    <I18nProvider i18n={i18n}>{children}</I18nProvider>
  </JotaiProvider>
);

describe('Conversation composer access', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetJotaiStore();
    jotaiStore.set(currentAiChatThreadState.atom, 'thread');
  });

  it('shows loading until the chat object is known', () => {
    render(<AiChatEditorSection />, { wrapper: Wrapper });
    expect(screen.getByRole('status')).toHaveTextContent(
      'Loading conversation',
    );
    expect(useAiChatEditor).not.toHaveBeenCalled();
  });

  it('keeps the composer read-only when the role may read but not update chats', () => {
    setAgentChatThreadPermissions(jotaiStore, {
      canRead: true,
      canUpdate: false,
      canDelete: false,
      canSoftDelete: false,
    });
    render(<AiChatEditorSection />, { wrapper: Wrapper });
    expect(screen.getByRole('status')).toHaveTextContent(
      'You can read this conversation',
    );
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(useAiChatEditor).not.toHaveBeenCalled();
  });

  it('shows unavailable when the role may not read chats', () => {
    setAgentChatThreadPermissions(jotaiStore, {
      canRead: false,
      canUpdate: false,
      canDelete: false,
      canSoftDelete: false,
    });
    render(<AiChatEditorSection />, { wrapper: Wrapper });
    expect(screen.getByRole('status')).toHaveTextContent(
      'This conversation is no longer available.',
    );
    expect(screen.queryByText('Loading conversation…')).toBeNull();
    expect(useAiChatEditor).not.toHaveBeenCalled();
  });
});
