import { SIMPLE_MODE_LABELS } from '@/simple-mode/constants/SimpleModeLabels';

const MAX_TITLE_LENGTH = 80;

// A seller never types a title; the first line of the note becomes one so lists and search never show "Untitled".
export const getSimpleModeNoteTitle = (text: string) => {
  const firstLine = text
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.length > 0);

  if (firstLine === undefined) {
    return SIMPLE_MODE_LABELS.untitledNote;
  }

  return firstLine.length > MAX_TITLE_LENGTH
    ? `${firstLine.slice(0, MAX_TITLE_LENGTH - 1)}…`
    : firstLine;
};
