import { isDefined } from 'twenty-shared/utils';

const NOTE_DRAFT_LOCK_WAIT_MS = 10000;

// Tabs saving the same draft take turns, so an older save still in flight cannot land after a newer one. A tab that
// waits too long saves anyway rather than being blocked by another tab's stuck request.
export const withNoteDraftLock = async <TResult>(
  lockName: string,
  write: () => Promise<TResult>,
): Promise<TResult> => {
  if (!isDefined(globalThis.navigator?.locks)) {
    return write();
  }

  let hasStarted = false;

  try {
    return await navigator.locks.request(
      lockName,
      { signal: AbortSignal.timeout(NOTE_DRAFT_LOCK_WAIT_MS) },
      () => {
        hasStarted = true;

        return write();
      },
    );
  } catch (error) {
    if (hasStarted) {
      throw error;
    }

    return write();
  }
};
