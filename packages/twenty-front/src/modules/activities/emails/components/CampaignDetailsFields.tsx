import { t } from '@lingui/core/macro';
import { useId } from 'react';
import {
  CoreObjectNameSingular,
  MessageChannelType,
} from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';
import { type SelectOption } from 'twenty-ui/primitives/input';

import { ComposerFieldRow } from '@/activities/components/ComposerFieldRow';
import { CampaignEnvelopeBox } from '@/activities/emails/components/CampaignEnvelopeBox';
import { CampaignVariablePicker } from '@/activities/emails/components/CampaignVariablePicker';
import { useCampaignDetailsState } from '@/activities/emails/hooks/useCampaignDetailsState';
import { type MessageCampaign } from '@/activities/emails/types/MessageCampaign';
import { useCreateOneRecord } from '@/object-record/hooks/useCreateOneRecord';
import { FormTextFieldInput } from '@/object-record/record-field/ui/form-types/components/FormTextFieldInput';
import { useMyMessageChannels } from '@/settings/accounts/hooks/useMyMessageChannels';
import { FormSingleRecordPicker } from '@/object-record/record-field/ui/form-types/components/FormSingleRecordPicker';
import { Select } from '@/ui/input/components/Select';
import { GenericDropdownContentWidth } from '@/ui/layout/dropdown/constants/GenericDropdownContentWidth';
import { useOpenDropdown } from '@/ui/layout/dropdown/hooks/useOpenDropdown';

const FROM_DROPDOWN_ID = 'campaign-composer-from-account';

type CampaignDetailsFieldsProps = {
  campaign: MessageCampaign;
};

export const CampaignDetailsFields = ({
  campaign,
}: CampaignDetailsFieldsProps) => {
  const detailsState = useCampaignDetailsState({ campaign });
  const instanceId = useId();
  const listDropdownId = `campaign-list-picker-${instanceId}`;
  const { openDropdown } = useOpenDropdown();

  const openDropdownById = (dropdownId: string) =>
    openDropdown({ dropdownComponentInstanceIdFromProps: dropdownId });
  const { channels } = useMyMessageChannels();
  const { createOneRecord: createMessageList } = useCreateOneRecord({
    objectNameSingular: CoreObjectNameSingular.MessageList,
  });

  const handleCreateList = async (searchInput?: string) => {
    const listName = searchInput?.trim() ?? '';
    const createdList = await createMessageList({
      name: listName.length > 0 ? listName : t`Untitled list`,
    });

    if (isDefined(createdList)) {
      detailsState.setListId(createdList.id);
    }
  };

  const senderOptions: SelectOption<string>[] = channels
    .filter((channel) => channel.type === MessageChannelType.EMAIL_GROUP)
    .map((channel) => channel.connectedAccount?.handle)
    .filter(isDefined)
    .map((handle) => ({ label: handle, value: handle }));

  const isSenderSelectDisabled =
    senderOptions.length <= 1 &&
    senderOptions.some((option) => option.value === detailsState.fromAddress);

  return (
    <CampaignEnvelopeBox onBlur={() => detailsState.flush()}>
      <ComposerFieldRow
        label={t`From`}
        onClick={
          isSenderSelectDisabled
            ? undefined
            : () => openDropdownById(FROM_DROPDOWN_ID)
        }
      >
        <Select
          dropdownId={FROM_DROPDOWN_ID}
          dropdownWidth={GenericDropdownContentWidth.ExtraLarge}
          fullWidth
          variant="transparent"
          value={detailsState.fromAddress}
          options={senderOptions}
          emptyOption={{ label: t`Select a sender`, value: '' }}
          onChange={detailsState.setFromAddress}
        />
      </ComposerFieldRow>
      <ComposerFieldRow
        label={t`To`}
        onClick={() => openDropdownById(listDropdownId)}
      >
        <FormSingleRecordPicker
          key={`list-${detailsState.draftResyncKey}`}
          dropdownId={listDropdownId}
          variant="transparent"
          objectNameSingulars={[CoreObjectNameSingular.MessageList]}
          defaultValue={detailsState.listId}
          onChange={detailsState.setListId}
          onCreate={handleCreateList}
        />
      </ComposerFieldRow>
      <ComposerFieldRow label={t`Subject`} hasDivider={false}>
        <FormTextFieldInput
          key={`subject-${detailsState.draftResyncKey}`}
          ariaLabel={t`Subject`}
          placeholder={t`Add a subject`}
          defaultValue={detailsState.subject}
          onChange={detailsState.setSubject}
          VariablePicker={CampaignVariablePicker}
          enableTemplateVariableFallback
        />
      </ComposerFieldRow>
    </CampaignEnvelopeBox>
  );
};
