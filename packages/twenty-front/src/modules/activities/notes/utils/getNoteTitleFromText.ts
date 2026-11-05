const MAX_TITLE_LENGTH = 80;

// Nobody types a title in the note box; the first line becomes one so lists and search never show "Untitled".
export const getNoteTitleFromText = (text: string) => {
  const firstLine = text
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.length > 0);

  if (firstLine === undefined) {
    return undefined;
  }

  return firstLine.length > MAX_TITLE_LENGTH
    ? `${firstLine.slice(0, MAX_TITLE_LENGTH - 1)}…`
    : firstLine;
};
