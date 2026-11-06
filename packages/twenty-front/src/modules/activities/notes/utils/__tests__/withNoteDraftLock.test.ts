import { isDefined } from 'twenty-shared/utils';

import { withNoteDraftLock } from '@/activities/notes/utils/withNoteDraftLock';

type LockRequest = (
  name: string,
  options: { signal: AbortSignal },
  callback: () => Promise<unknown>,
) => Promise<unknown>;

const setLocks = (request: LockRequest | undefined) => {
  Object.defineProperty(navigator, 'locks', {
    configurable: true,
    value: isDefined(request) ? { request } : undefined,
  });
};

describe('withNoteDraftLock', () => {
  afterEach(() => {
    setLocks(undefined);
  });

  it('saves directly where the browser has no locks', async () => {
    setLocks(undefined);

    await expect(withNoteDraftLock('draft', async () => 'saved')).resolves.toBe(
      'saved',
    );
  });

  it('lets a second save start only after the first has finished', async () => {
    let tail = Promise.resolve();

    setLocks((_name, _options, callback) => {
      const run = tail.then(callback);

      tail = run.then(
        () => undefined,
        () => undefined,
      );

      return run;
    });

    const order: string[] = [];
    let finishFirst: () => void = () => undefined;

    const first = withNoteDraftLock('draft', async () => {
      order.push('first started');
      await new Promise<void>((resolve) => {
        finishFirst = resolve;
      });
      order.push('first finished');
    });
    const second = withNoteDraftLock('draft', async () => {
      order.push('second started');
    });

    await Promise.resolve();
    finishFirst();
    await Promise.all([first, second]);

    expect(order).toEqual([
      'first started',
      'first finished',
      'second started',
    ]);
  });

  it('saves anyway when waiting for another tab gives up', async () => {
    setLocks(async () => {
      throw new DOMException('Timed out', 'TimeoutError');
    });

    await expect(withNoteDraftLock('draft', async () => 'saved')).resolves.toBe(
      'saved',
    );
  });

  it('reports a failed save once instead of sending it again', async () => {
    setLocks((_name, _options, callback) => callback());
    const write = jest.fn(async () => {
      throw new Error('refused');
    });

    await expect(withNoteDraftLock('draft', write)).rejects.toThrow('refused');
    expect(write).toHaveBeenCalledTimes(1);
  });
});
