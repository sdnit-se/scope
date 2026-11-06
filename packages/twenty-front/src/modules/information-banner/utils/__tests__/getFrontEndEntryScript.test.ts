import { getFrontEndEntryScript } from '@/information-banner/utils/getFrontEndEntryScript';

describe('getFrontEndEntryScript', () => {
  it('finds the entry script a built page loads', () => {
    expect(
      getFrontEndEntryScript(
        '<script type="module" crossorigin src="/assets/index-Bn_f_DD5.js"></script><link href="/assets/index-Ab12.css">',
      ),
    ).toBe('/assets/index-Bn_f_DD5.js');
  });

  it('finds nothing on a page without a built entry, such as the dev server', () => {
    expect(
      getFrontEndEntryScript('<script type="module" src="/src/index.tsx">'),
    ).toBeUndefined();
  });
});
