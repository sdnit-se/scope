import { useLingui } from '@lingui/react/macro';

import { type MessageChannel } from '@/accounts/types/MessageChannel';
import { useMyMessageChannels } from '@/settings/accounts/hooks/useMyMessageChannels';
import { SettingsTableListSection } from '@/settings/components/SettingsTableListSection';
import { SettingsWorkspaceEmailGroupSourceCell } from '@/settings/workspace/components/SettingsWorkspaceEmailGroupSourceCell';
import { MessageChannelType, SettingsPath } from 'twenty-shared/types';
import { useNavigateSettings } from '~/hooks/useNavigateSettings';

export const SettingsWorkspaceEmailGroupSection = () => {
  const { t } = useLingui();
  const navigateSettings = useNavigateSettings();
  const { channels } = useMyMessageChannels();

  const emailGroupChannels = channels.filter(
    (channel) => channel.type === MessageChannelType.EMAIL_GROUP,
  );

  return (
    <SettingsTableListSection<MessageChannel>
      title={t`Channels`}
      description={t`Addresses your workspace uses to receive email in shared inboxes`}
      items={emailGroupChannels}
      columns={[
        { label: t`Email`, Cell: SettingsWorkspaceEmailGroupSourceCell },
      ]}
      gridAutoColumns="1fr"
      showRowChevron
      onRowClick={(channel) =>
        navigateSettings(SettingsPath.EmailGroupChannelDetail, {
          messageChannelId: channel.id,
        })
      }
      footerButtonLabel={t`Add email channel`}
      onFooterButtonClick={() =>
        navigateSettings(SettingsPath.NewEmailGroupChannel)
      }
    />
  );
};
