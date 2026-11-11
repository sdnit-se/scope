import { useLingui } from '@lingui/react';
import { type RefObject, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type HostedPageContextMessage } from '@/hosted-page/types/HostedPageContextMessage';
import { parseHostedPageMessage } from '@/hosted-page/utils/parseHostedPageMessage';

type UseHostedPageBridgeArgs = {
  frameRef: RefObject<HTMLIFrameElement | null>;
  framePath: string;
  onReady: () => void;
};

// The message contract is in modules/hosted-page/README.md.
export const useHostedPageBridge = ({
  frameRef,
  framePath,
  onReady,
}: UseHostedPageBridgeArgs) => {
  const navigate = useNavigate();
  const { i18n } = useLingui();
  const [title, setTitle] = useState<string | null>(null);

  const postContext = useCallback(() => {
    const context: HostedPageContextMessage = {
      hostedPage: 1,
      type: 'context',
      path: framePath,
      colorScheme: document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light',
      locale: i18n.locale,
    };
    const frameWindow = frameRef.current?.contentWindow;
    frameWindow?.postMessage(context, window.location.origin);
  }, [frameRef, framePath, i18n.locale]);

  useEffect(() => {
    postContext();

    const observer = new MutationObserver(postContext);
    observer.observe(document.documentElement, { attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, [postContext]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = parseHostedPageMessage(
        event,
        frameRef.current?.contentWindow,
      );

      switch (message?.type) {
        case 'ready':
          onReady();
          postContext();
          break;
        case 'navigate':
          navigate(message.path, { replace: message.replace });
          break;
        case 'title':
          setTitle(message.title);
          break;
        case 'key':
          // Without the keyup, the shortcut library keeps the key as held.
          document.dispatchEvent(new KeyboardEvent('keydown', message));
          document.dispatchEvent(new KeyboardEvent('keyup', message));
      }
    };

    window.addEventListener('message', handleMessage);

    return () => window.removeEventListener('message', handleMessage);
  }, [frameRef, navigate, onReady, postContext]);

  return title;
};
