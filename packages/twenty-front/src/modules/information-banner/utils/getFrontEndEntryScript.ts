import { doNotTranslate } from 'twenty-shared/i18n';

// Each build names its entry script after its content, so a different name means a different front end.
const FRONT_END_ENTRY_SCRIPT_PATTERN = new RegExp(
  doNotTranslate('/assets/index-[A-Za-z0-9_-]+\\.js'),
);

export const getFrontEndEntryScript = (html: string): string | undefined =>
  FRONT_END_ENTRY_SCRIPT_PATTERN.exec(html)?.[0];
