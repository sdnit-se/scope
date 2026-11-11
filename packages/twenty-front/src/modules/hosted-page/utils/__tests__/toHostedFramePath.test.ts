import { toHostedFramePath } from '@/hosted-page/utils/toHostedFramePath';

const framePath = (pathname: string, search = '', hash = '') =>
  toHostedFramePath({ pathname, search, hash });

describe('toHostedFramePath', () => {
  it('maps the route onto the hosted prefix, sub-pages included', () => {
    expect(framePath('/shebang')).toBe('/platform/');
    expect(framePath('/shebang/kontakter/7', '?flik=affarer', '#sist')).toBe(
      '/platform/kontakter/7?flik=affarer#sist',
    );
  });

  it("leaves out the side panel's own query parameter", () => {
    expect(framePath('/shebang/kontakter', '?panel=%2Fsettings&q=anna')).toBe(
      '/platform/kontakter?q=anna',
    );
  });

  it.each([
    '/shebang/../objects/people',
    '/shebang/%2e%2e/settings',
    '/shebang/..\\..\\objects',
  ])('never leaves the hosted prefix for %s', (pathname) => {
    expect(framePath(pathname)).toBe('/platform/');
  });
});
