import { isNonEmptyString, isObject, isString } from '@sniptt/guards';
import { doNotTranslate } from 'twenty-shared/i18n';
import { isDefined } from 'twenty-shared/utils';

export type NoteDraft = {
  text: string;
  noteType: string;
  noteId?: string;
  linkId?: string;
  isCreated: boolean;
  isLinked: boolean;
  // The server has this exact text; there is nothing left to recover.
  isSynced: boolean;
};

type NoteDraftScope = {
  workspaceId: string;
  workspaceMemberId: string;
  objectNameSingular: string;
  recordId: string;
};

const NOTE_DRAFT_KEY_PREFIX = doNotTranslate('twenty-note-draft');

// One draft per person, workspace and record, so a shared browser never shows someone else's words.
export const getNoteDraftStorageKey = ({
  workspaceId,
  workspaceMemberId,
  objectNameSingular,
  recordId,
}: NoteDraftScope) =>
  [
    NOTE_DRAFT_KEY_PREFIX,
    workspaceId,
    workspaceMemberId,
    objectNameSingular,
    recordId,
  ].join(':');

// Storage can be missing or full (private windows, blocked site data); the box then works as before, without recovery.
export const readNoteDraft = (key: string): NoteDraft | undefined => {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(key) ?? 'null');

    if (
      !isObject(stored) ||
      !isString((stored as NoteDraft).text) ||
      !isString((stored as NoteDraft).noteType)
    ) {
      return undefined;
    }

    const { text, noteType, noteId, linkId, isCreated, isLinked, isSynced } =
      stored as NoteDraft;
    const hasIdentity = isNonEmptyString(noteId) && isNonEmptyString(linkId);

    return {
      text,
      noteType,
      noteId: hasIdentity ? noteId : undefined,
      linkId: hasIdentity ? linkId : undefined,
      isCreated: hasIdentity && isCreated === true,
      isLinked: hasIdentity && isLinked === true,
      isSynced: hasIdentity && isSynced === true,
    };
  } catch {
    return undefined;
  }
};

export const removeNoteDraft = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch {
    return;
  }
};

export const writeNoteDraft = (key: string, draft: NoteDraft) => {
  try {
    if (draft.text.trim().length === 0 && !isDefined(draft.noteId)) {
      localStorage.removeItem(key);

      return;
    }

    localStorage.setItem(key, JSON.stringify(draft));
  } catch {
    // An older draft left behind could later be replayed over newer text; without a fresh copy, keep none.
    removeNoteDraft(key);
  }
};

const FILED_NOTE_IDS_LIMIT = 20;

const getFiledNoteIdsKey = (key: string) => `${key}:filed`;

const readFiledNoteIds = (key: string): string[] => {
  try {
    const stored: unknown = JSON.parse(
      localStorage.getItem(getFiledNoteIdsKey(key)) ?? '[]',
    );

    return Array.isArray(stored) ? stored.filter(isNonEmptyString) : [];
  } catch {
    return [];
  }
};

// Filed notes are kept apart from the draft, so a save another tab still has queued for one of them knows it is late
// even after a new draft takes the record's place.
export const rememberFiledNote = (key: string, noteId: string) => {
  try {
    localStorage.setItem(
      getFiledNoteIdsKey(key),
      JSON.stringify(
        [...readFiledNoteIds(key).filter((id) => id !== noteId), noteId].slice(
          -FILED_NOTE_IDS_LIMIT,
        ),
      ),
    );
  } catch {
    return;
  }
};

export const isNoteFiled = (key: string, noteId: string) =>
  readFiledNoteIds(key).includes(noteId);
