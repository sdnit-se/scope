import { getFrontEndEntryScript } from '@/information-banner/utils/getFrontEndEntryScript';
import { useEffect, useState } from 'react';
import { isDefined } from 'twenty-shared/utils';

const CHECK_INTERVAL_MS = 5 * 60 * 1000;

const getLoadedEntryScript = () =>
  [...document.querySelectorAll('script[src]')]
    .map((script) => getFrontEndEntryScript(script.getAttribute('src') ?? ''))
    .find(isDefined);

// Compares the entry script this tab loaded with the one the server now serves, every few minutes and whenever the
// tab is shown again. A tab never reloads itself: that would lose whatever someone is writing.
export const useIsNewFrontEndAvailable = () => {
  const [isNewFrontEndAvailable, setIsNewFrontEndAvailable] = useState(false);

  useEffect(() => {
    const loadedEntryScript = getLoadedEntryScript();

    if (!isDefined(loadedEntryScript) || isNewFrontEndAvailable) {
      return;
    }

    const checkServedEntryScript = async () => {
      if (document.visibilityState !== 'visible') {
        return;
      }

      try {
        const response = await fetch('/', { cache: 'no-store' });
        const servedEntryScript = getFrontEndEntryScript(await response.text());

        if (
          isDefined(servedEntryScript) &&
          servedEntryScript !== loadedEntryScript
        ) {
          setIsNewFrontEndAvailable(true);
        }
      } catch {
        return;
      }
    };

    const intervalId = window.setInterval(
      checkServedEntryScript,
      CHECK_INTERVAL_MS,
    );

    document.addEventListener('visibilitychange', checkServedEntryScript);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', checkServedEntryScript);
    };
  }, [isNewFrontEndAvailable]);

  return isNewFrontEndAvailable;
};
