import { getSimpleModeNoteTitle } from '@/simple-mode/utils/getSimpleModeNoteTitle';

describe('getSimpleModeNoteTitle', () => {
  it('uses the first line that has text', () => {
    expect(
      getSimpleModeNoteTitle('\n  Ringde Dylan.  \nUppföljning i december.'),
    ).toBe('Ringde Dylan.');
  });

  it('shortens a long first line', () => {
    const title = getSimpleModeNoteTitle('a'.repeat(200));

    expect(title).toHaveLength(80);
    expect(title.endsWith('…')).toBe(true);
  });

  it('never leaves a note untitled', () => {
    expect(getSimpleModeNoteTitle('   ')).toBe('Anteckning');
  });
});
