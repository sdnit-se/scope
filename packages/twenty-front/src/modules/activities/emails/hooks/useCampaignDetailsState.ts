import { usePersistedCampaignDraft } from '@/activities/emails/hooks/usePersistedCampaignDraft';
import { type MessageCampaign } from '@/activities/emails/types/MessageCampaign';

type CampaignDetailsDraft = {
  listId: string | null;
  fromAddress: string;
  subject: string;
};

export const useCampaignDetailsState = ({
  campaign,
}: {
  campaign: MessageCampaign;
}) => {
  const { draft, updateDraft, flush, draftResyncKey } =
    usePersistedCampaignDraft<CampaignDetailsDraft>({
      campaignId: campaign.id,
      initialDraft: () => ({
        listId: campaign.listId,
        fromAddress: campaign.fromAddress?.primaryEmail ?? '',
        subject: campaign.subject ?? '',
      }),
      toUpdateOneRecordInput: (nextDraft) => ({
        listId: nextDraft.listId,
        fromAddress: {
          primaryEmail: nextDraft.fromAddress.trim(),
          additionalEmails: null,
        },
        subject: nextDraft.subject,
      }),
    });

  return {
    ...draft,
    flush,
    draftResyncKey,
    setListId: (listId: string | null) => updateDraft({ listId }),
    setFromAddress: (fromAddress: string) => updateDraft({ fromAddress }),
    setSubject: (subject: string) => updateDraft({ subject }),
  };
};
