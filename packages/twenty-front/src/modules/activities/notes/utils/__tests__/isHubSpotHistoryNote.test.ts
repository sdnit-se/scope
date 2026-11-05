import { isHubSpotHistoryNote } from '@/activities/notes/utils/isHubSpotHistoryNote';

const folded = (title: string) => isHubSpotHistoryNote({ title });

describe('isHubSpotHistoryNote', () => {
  it('recognises every record title the HubSpot migration writes, and their updated versions', () => {
    for (const title of [
      'HubSpot history',
      'HubSpot history (updated)',
      'HubSpot contact-create attribution',
      'HubSpot contact-create attribution (updated)',
      'HubSpot revenue attribution',
      'HubSpot association',
      'HubSpot form: Kontakta oss',
      'HubSpot form: Kontakta oss (updated)',
      'HubSpot company segment: Offentlig sektor',
      'HubSpot company segment: Offentlig sektor (updated)',
      'HubSpot deal segment: Q4 pipeline',
      'HubSpot deal segment: Q4 pipeline (updated)',
      'HubSpot quote templates (archived)',
      'HubSpot sales template (archived): Uppföljning',
      'HubSpot sales template (archived): Uppföljning (updated)',
      'HubSpot workflow (archived, not active in Twenty): Nya leads',
      'HubSpot workflow (archived, not active in Twenty): Nya leads (updated)',
      'HubSpot marketing event: Frukostseminarium',
      'HubSpot marketing event: Frukostseminarium (updated)',
      'HubSpot migration - temporary',
      ' hubspot HISTORY ',
    ]) {
      expect(folded(title)).toBe(true);
    }
  });

  it('leaves notes people wrote, imported calls and meetings and deal descriptions alone', () => {
    for (const title of [
      'HubSpot deal description',
      'Ringde om HubSpot history',
      'HubSpot history från mötet',
      'Möte med Polisen',
      '',
    ]) {
      expect(folded(title)).toBe(false);
    }

    expect(isHubSpotHistoryNote({ title: null as unknown as string })).toBe(
      false,
    );
  });
});
