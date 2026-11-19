import { styled } from '@linaria/react';

import { InformationBannerMaintenance } from '@/information-banner/components/maintenance/InformationBannerMaintenance';
import { InformationBannerNewVersion } from '@/information-banner/components/new-version/InformationBannerNewVersion';
import { InformationBannerReconnectAccountEmailAliases } from '@/information-banner/components/reconnect-account/InformationBannerReconnectAccountEmailAliases';
import { InformationBannerReconnectAccountInsufficientPermissions } from '@/information-banner/components/reconnect-account/InformationBannerReconnectAccountInsufficientPermissions';
import { useHasPermissionFlag } from '@/settings/roles/hooks/useHasPermissionFlag';
import { PermissionFlagType } from '~/generated-metadata/graphql';

const StyledInformationBannerWrapper = styled.div`
  position: relative;

  &:empty {
    height: 0;
  }
`;

export const InformationBannerWrapper = () => {
  const isAccountSyncEnabled = useHasPermissionFlag(
    PermissionFlagType.CONNECTED_ACCOUNTS,
  );

  return (
    <StyledInformationBannerWrapper>
      <InformationBannerMaintenance />
      <InformationBannerNewVersion />
      {isAccountSyncEnabled && (
        <InformationBannerReconnectAccountInsufficientPermissions />
      )}
      {isAccountSyncEnabled && (
        <InformationBannerReconnectAccountEmailAliases />
      )}
    </StyledInformationBannerWrapper>
  );
};
