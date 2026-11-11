import { isNonEmptyString } from '@sniptt/guards';

// Mail programs copy an address as "Anna Prov <anna.prov@example.org>".
const NAME_THEN_ADDRESS = /^[^<>]*<([^<>]*)>$/;

export const sanitizeEmailInput = (input: string) => {
  const trimmedInput = input.trim();
  const address = NAME_THEN_ADDRESS.exec(trimmedInput)?.[1].trim();

  // Empty brackets are not an address: an empty value would read as "remove this one".
  return isNonEmptyString(address) ? address : trimmedInput;
};
