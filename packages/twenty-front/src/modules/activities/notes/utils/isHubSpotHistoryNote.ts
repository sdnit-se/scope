import { type Note } from '@/activities/types/Note';

// The HubSpot migration left raw property dumps on every company; they are kept until their removal is agreed.
const HUBSPOT_HISTORY_TITLE_PREFIX = 'hubspot migration';

export const isHubSpotHistoryNote = (note: Pick<Note, 'title'>) =>
  (note.title ?? '')
    .trim()
    .toLowerCase()
    .startsWith(HUBSPOT_HISTORY_TITLE_PREFIX);
