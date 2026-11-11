import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isDefined, isSafeInternalPath } from 'twenty-shared/utils';
import { Button } from 'twenty-ui/primitives/input';

import { HOSTED_PAGE_FRAME_PREFIX } from '@/hosted-page/constants/HostedPageFramePrefix';
import { HOSTED_PAGE_READY_TIMEOUT_MS } from '@/hosted-page/constants/HostedPageReadyTimeoutMs';
import { useHostedPageBridge } from '@/hosted-page/hooks/useHostedPageBridge';
import { toHostedFramePath } from '@/hosted-page/utils/toHostedFramePath';
import { RecordIndexSkeletonLoader } from '@/object-record/record-index/components/RecordIndexSkeletonLoader';
import { EmptyState } from '@/ui/feedback/empty-state/components/EmptyState';
import { PageCardLayout } from '@/ui/layout/page/components/PageCardLayout';
import { PageTitle } from '@/ui/utilities/page-title/components/PageTitle';

// 'loaded' is a document of the hosted app that has not said `ready` yet.
type HostedPageStatus = 'loading' | 'loaded' | 'ready' | 'failed';

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  min-width: 0;
  position: relative;
`;

const StyledFrame = styled.iframe`
  border: 0;
  height: 100%;
  width: 100%;
`;

const StyledSkeleton = styled.div`
  display: flex;
  inset: 0;
  position: absolute;
`;

export const HostedPage = () => {
  const framePath = toHostedFramePath(useLocation());
  const { t } = useLingui();
  const navigate = useNavigate();
  const frameRef = useRef<HTMLIFrameElement>(null);
  // The source is fixed per attempt: a new `src` would reload the hosted page.
  const [frame, setFrame] = useState({ source: framePath, attempt: 0 });
  const [status, setStatus] = useState<HostedPageStatus>('loading');

  const onReady = useCallback(() => setStatus('ready'), []);
  const title = useHostedPageBridge({ frameRef, framePath, onReady });

  useEffect(() => {
    if (status !== 'loaded') {
      return;
    }

    const timeout = setTimeout(
      () => setStatus('failed'),
      HOSTED_PAGE_READY_TIMEOUT_MS,
    );

    return () => clearTimeout(timeout);
  }, [status]);

  const handleFrameLoad = () => {
    // Null for a cross-origin document, such as the browser's error page.
    const frameDocument = frameRef.current?.contentDocument;
    const { pathname = '', search, hash } = frameDocument?.location ?? {};
    const isHostedPath = pathname.startsWith(HOSTED_PAGE_FRAME_PREFIX);

    // The frame left the hosted prefix, so Twenty opens that page itself
    // instead of showing Twenty inside Twenty.
    if (!isHostedPath && isSafeInternalPath(pathname)) {
      navigate(pathname + search + hash, { replace: true });

      return;
    }

    const isHostedDocument =
      isHostedPath &&
      isDefined(frameDocument?.querySelector('meta[name="hosted-page"]'));

    setStatus((currentStatus) =>
      !isHostedDocument
        ? 'failed'
        : currentStatus === 'ready'
          ? 'ready'
          : 'loaded',
    );
  };

  const handleRetry = () => {
    setFrame({ source: framePath, attempt: frame.attempt + 1 });
    setStatus('loading');
  };

  const isPending = status === 'loading' || status === 'loaded';

  return (
    <StyledContainer aria-busy={isPending}>
      {isDefined(title) && <PageTitle title={title} />}
      <PageCardLayout header={null}>
        {status === 'failed' ? (
          <EmptyState.Root>
            <EmptyState.Title>{t`The page could not be loaded.`}</EmptyState.Title>
            <EmptyState.Actions>
              <Button onClick={handleRetry}>{t`Try again`}</Button>
              <Button href={framePath} target="_blank" rel="noreferrer">
                {t`Open in its own tab`}
              </Button>
            </EmptyState.Actions>
          </EmptyState.Root>
        ) : (
          <StyledFrame
            key={frame.attempt}
            ref={frameRef}
            src={frame.source}
            title={title ?? undefined}
            allow="clipboard-write"
            referrerPolicy="same-origin"
            onLoad={handleFrameLoad}
          />
        )}
      </PageCardLayout>
      {isPending && (
        <StyledSkeleton>
          <RecordIndexSkeletonLoader />
        </StyledSkeleton>
      )}
    </StyledContainer>
  );
};
