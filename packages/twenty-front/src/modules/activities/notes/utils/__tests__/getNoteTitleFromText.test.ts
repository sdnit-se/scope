import { getNoteTitleFromText } from '@/activities/notes/utils/getNoteTitleFromText';

describe('getNoteTitleFromText', () => {
  it('uses the first non-empty line', () => {
    expect(getNoteTitleFromText('\n  Ringde Dylan  \nDe kör VMware')).toBe(
      'Ringde Dylan',
    );
  });

  it('shortens a long first line to 80 characters', () => {
    const title = getNoteTitleFromText('a'.repeat(100));

    expect(title).toHaveLength(80);
    expect(title?.endsWith('…')).toBe(true);
  });

  it('has no title for an empty note', () => {
    expect(getNoteTitleFromText('  \n ')).toBeUndefined();
  });
});
