import { newFrontEndCheckState } from '@/information-banner/states/newFrontEndCheckState';
import { getFrontEndEntryScript } from '@/information-banner/utils/getFrontEndEntryScript';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { useStore } from 'jotai';
import { useEffect } from 'react';
import { isDefined } from 'twenty-shared/utils';

const CHECK_INTERVAL_MS = 5 * 60 * 1000;
const MINIMUM_CHECK_GAP_MS = 60 * 1000;

const getLoadedEntryScript = () =>
  [...document.querySelectorAll('script[src]')]
    .map((script) => getFrontEndEntryScript(script.getAttribute('src') ?? ''))
    .find(isDefined);

// Compares the entry script this tab loaded with the one the server now names in build-version.txt: when shown,
// every few minutes and when the tab is shown again. A tab never reloads itself: that would lose whatever someone
// is writing.
export const useIsNewFrontEndAvailable = () => {
  const store = useStore();
  const { isNewFrontEndAvailable } = useAtomStateValue(newFrontEndCheckState);

  useEffect(() => {
    const loadedEntryScript = getLoadedEntryScript();

    if (!isDefined(loadedEntryScript) || isNewFrontEndAvailable) {
      return;
    }

    const checkServedEntryScript = async () => {
      const { lastCheckedAt } = store.get(newFrontEndCheckState.atom);

      if (
        document.visibilityState !== 'visible' ||
        Date.now() - lastCheckedAt < MINIMUM_CHECK_GAP_MS
      ) {
        return;
      }

      store.set(newFrontEndCheckState.atom, (current) => ({
        ...current,
        lastCheckedAt: Date.now(),
      }));

      try {
        const response = await fetch(`/build-version.txt?at=${Date.now()}`, {
          cache: 'no-store',
        });
        const servedEntryScript = response.ok
          ? getFrontEndEntryScript(await response.text())
          : undefined;

        if (
          isDefined(servedEntryScript) &&
          servedEntryScript !== loadedEntryScript
        ) {
          store.set(newFrontEndCheckState.atom, (current) => ({
            ...current,
            isNewFrontEndAvailable: true,
          }));
        }
      } catch {
        return;
      }
    };

    void checkServedEntryScript();

    const intervalId = window.setInterval(
      checkServedEntryScript,
      CHECK_INTERVAL_MS,
    );

    document.addEventListener('visibilitychange', checkServedEntryScript);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', checkServedEntryScript);
    };
  }, [isNewFrontEndAvailable, store]);

  return isNewFrontEndAvailable;
};
