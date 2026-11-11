import { parsePath } from 'react-router-dom';
import { isSafeInternalPath } from 'twenty-shared/utils';

import { HOSTED_PAGE_ROUTE_PREFIX } from '@/hosted-page/constants/HostedPageRoutePrefix';

export const isLinkNavigationMenuItemActive = ({
  computedLink,
  location,
}: {
  computedLink: string;
  location: { pathname: string; search: string };
}): boolean => {
  if (!isSafeInternalPath(computedLink)) {
    return false;
  }

  const link = parsePath(computedLink);

  // A hosted page routes its own sub-pages, which belong to the same entry.
  const isHostedSubPage =
    link.pathname?.startsWith(HOSTED_PAGE_ROUTE_PREFIX) === true &&
    location.pathname.startsWith(`${link.pathname}/`);

  if (link.pathname !== location.pathname && !isHostedSubPage) {
    return false;
  }

  const currentSearchParams = new URLSearchParams(location.search);

  return [...new URLSearchParams(link.search)].every(
    ([key, value]) => currentSearchParams.get(key) === value,
  );
};
