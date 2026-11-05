import { type Note } from '@/activities/types/Note';
import { doNotTranslate } from 'twenty-shared/i18n';

// The titles the HubSpot migration gives the raw records it carried over (shebang-crm apps/twenty-extension/src/migration).
// They are kept until their removal is agreed; notes people wrote, imported calls and meetings, and deal descriptions are not.
const HUBSPOT_RECORD_TITLES = doNotTranslate([
  'hubspot history',
  'hubspot contact-create attribution',
  'hubspot revenue attribution',
  'hubspot association',
]);

const HUBSPOT_RECORD_TITLE_PREFIXES = doNotTranslate([
  'hubspot form:',
  'hubspot company segment:',
  'hubspot deal segment:',
  'hubspot quote templates',
  'hubspot sales template (archived)',
  'hubspot workflow (archived',
  'hubspot marketing event:',
  'hubspot migration',
]);

const UPDATED_SUFFIX = doNotTranslate(' (updated)');

export const isHubSpotHistoryNote = (note: Pick<Note, 'title'>) => {
  const title = (note.title ?? '').trim().toLowerCase();
  const baseTitle = title.endsWith(UPDATED_SUFFIX)
    ? title.slice(0, -UPDATED_SUFFIX.length)
    : title;

  return (
    HUBSPOT_RECORD_TITLES.includes(baseTitle) ||
    HUBSPOT_RECORD_TITLE_PREFIXES.some((prefix) => baseTitle.startsWith(prefix))
  );
};
