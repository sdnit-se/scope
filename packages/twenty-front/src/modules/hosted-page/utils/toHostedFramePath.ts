import { type Location } from 'react-router-dom';

import { HOSTED_PAGE_FRAME_PREFIX } from '@/hosted-page/constants/HostedPageFramePrefix';
import { HOSTED_PAGE_ROUTE_PREFIX } from '@/hosted-page/constants/HostedPageRoutePrefix';
import { SIDE_PANEL_PATH_SEARCH_PARAM } from '@/side-panel/routing/constants/SidePanelPathSearchParam';

// An address that resolves outside the hosted prefix becomes the prefix
// itself: the frame must never show one of Twenty's own pages.
export const toHostedFramePath = ({
  pathname,
  search,
  hash,
}: Pick<Location, 'pathname' | 'search' | 'hash'>): string => {
  const url = new URL(
    HOSTED_PAGE_FRAME_PREFIX + pathname.slice(HOSTED_PAGE_ROUTE_PREFIX.length),
    window.location.origin,
  );
  const searchParams = new URLSearchParams(search);
  searchParams.delete(SIDE_PANEL_PATH_SEARCH_PARAM);
  url.search = searchParams.toString();
  url.hash = hash;

  return url.pathname.startsWith(HOSTED_PAGE_FRAME_PREFIX)
    ? url.pathname + url.search + url.hash
    : HOSTED_PAGE_FRAME_PREFIX;
};
