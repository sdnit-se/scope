import {
  getNoteDraftStorageKey,
  readNoteDraft,
  removeNoteDraft,
  writeNoteDraft,
} from '@/activities/notes/utils/noteDraftStorage';

const scope = {
  workspaceId: 'workspace',
  workspaceMemberId: 'stefan',
  objectNameSingular: 'company',
  recordId: 'polisen',
};

describe('noteDraftStorage', () => {
  beforeEach(() => localStorage.clear());

  it('keeps a draft per member, workspace and record', () => {
    expect(getNoteDraftStorageKey(scope)).not.toBe(
      getNoteDraftStorageKey({ ...scope, workspaceMemberId: 'petter' }),
    );
    expect(getNoteDraftStorageKey(scope)).not.toBe(
      getNoteDraftStorageKey({ ...scope, recordId: 'saab' }),
    );
    expect(getNoteDraftStorageKey(scope)).not.toBe(
      getNoteDraftStorageKey({ ...scope, objectNameSingular: 'person' }),
    );
  });

  it('reads back exactly what was written, including the autosaved note', () => {
    const key = getNoteDraftStorageKey(scope);

    const draft = {
      text: 'Ringde Monster.\nVill höra om VMware Exit.',
      noteType: 'CALL',
      noteId: 'note-1',
      linkId: 'link-1',
      isCreated: true,
      isLinked: false,
      isSynced: false,
    };

    writeNoteDraft(key, draft);

    expect(readNoteDraft(key)).toEqual(draft);
  });

  it('keeps nothing for an empty box that never became a note, and forgets a filed draft', () => {
    const key = getNoteDraftStorageKey(scope);

    writeNoteDraft(key, {
      text: 'Hej',
      noteType: 'NOTE',
      isCreated: false,
      isLinked: false,
      isSynced: false,
    });
    writeNoteDraft(key, {
      text: '  ',
      noteType: 'NOTE',
      isCreated: false,
      isLinked: false,
      isSynced: false,
    });
    expect(readNoteDraft(key)).toBeUndefined();

    writeNoteDraft(key, {
      text: 'Hej',
      noteType: 'NOTE',
      noteId: 'n',
      linkId: 'l',
      isCreated: true,
      isLinked: true,
      isSynced: true,
    });
    removeNoteDraft(key);
    expect(readNoteDraft(key)).toBeUndefined();
  });

  it('ignores damaged or foreign values instead of failing', () => {
    const key = getNoteDraftStorageKey(scope);

    localStorage.setItem(key, '{not json');
    expect(readNoteDraft(key)).toBeUndefined();

    localStorage.setItem(key, JSON.stringify({ text: 5 }));
    expect(readNoteDraft(key)).toBeUndefined();

    localStorage.setItem(
      key,
      JSON.stringify({ text: 'x', noteType: 'NOTE', isLinked: true }),
    );
    expect(readNoteDraft(key)).toEqual({
      text: 'x',
      noteType: 'NOTE',
      noteId: undefined,
      linkId: undefined,
      isCreated: false,
      isLinked: false,
      isSynced: false,
    });

    // A note id without its link id is not a usable identity.
    localStorage.setItem(
      key,
      JSON.stringify({
        text: 'x',
        noteType: 'NOTE',
        noteId: 'n',
        isCreated: true,
      }),
    );
    expect(readNoteDraft(key)?.noteId).toBeUndefined();
  });

  it('keeps working when storage refuses to write', () => {
    const setItem = jest
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });

    expect(() =>
      writeNoteDraft(getNoteDraftStorageKey(scope), {
        text: 'Hej',
        noteType: 'NOTE',
        isCreated: false,
        isLinked: false,
        isSynced: false,
      }),
    ).not.toThrow();

    setItem.mockRestore();
  });
});
