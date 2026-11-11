import { parseHostedPageMessage } from '@/hosted-page/utils/parseHostedPageMessage';

const frameWindow = {} as Window;
const READY = { hostedPage: 1, type: 'ready' };

const parse = (data: unknown, overrides: Partial<MessageEvent> = {}) =>
  parseHostedPageMessage(
    { data, origin: window.location.origin, source: frameWindow, ...overrides },
    frameWindow,
  );

describe('parseHostedPageMessage', () => {
  it('reads a message of the contract from the frame', () => {
    expect(parse(READY)).toEqual(READY);
    expect(
      parse({ hostedPage: 1, type: 'navigate', path: '/objects/people' }),
    ).toMatchObject({ path: '/objects/people', replace: false });
  });

  it('refuses a message from another window or another origin', () => {
    expect(parse(READY, { source: {} as Window })).toBeNull();
    expect(parse(READY, { origin: 'https://example.com' })).toBeNull();
  });

  it.each<[string, unknown]>([
    ['a type the contract does not name', { hostedPage: 1, type: 'reload' }],
    ['a message without the version', { type: 'ready' }],
    ['a missing field', { hostedPage: 1, type: 'title' }],
    ['a key without its modifiers', { hostedPage: 1, type: 'key', key: 'k' }],
    ['something that is not an object', 'ready'],
    [
      'another site',
      { hostedPage: 1, type: 'navigate', path: '//example.com' },
    ],
    ['a relative path', { hostedPage: 1, type: 'navigate', path: 'people' }],
  ])('ignores %s', (_description, data) => {
    expect(parse(data)).toBeNull();
  });
});
