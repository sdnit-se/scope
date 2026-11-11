// Mail programs copy an address as "Anna Prov <anna.prov@example.org>".
const NAME_THEN_ADDRESS = /^[^<>]*<([^<>]*)>$/;

export const sanitizeEmailInput = (input: string) => {
  const trimmedInput = input.trim();

  return (NAME_THEN_ADDRESS.exec(trimmedInput)?.[1] ?? trimmedInput).trim();
};
