import { isHubSpotHistoryNote } from '@/activities/notes/utils/isHubSpotHistoryNote';

describe('isHubSpotHistoryNote', () => {
  it('recognises the HubSpot migration notes whatever their case or suffix', () => {
    expect(
      isHubSpotHistoryNote({ title: 'HubSpot migration - temporary' }),
    ).toBe(true);
    expect(isHubSpotHistoryNote({ title: ' hubspot Migration ' })).toBe(true);
  });

  it('leaves notes people wrote alone, even when they mention HubSpot', () => {
    expect(isHubSpotHistoryNote({ title: 'Ringde om HubSpot migration' })).toBe(
      false,
    );
    expect(isHubSpotHistoryNote({ title: null as unknown as string })).toBe(
      false,
    );
  });
});
