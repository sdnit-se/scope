import { InformationBanner } from '@/information-banner/components/InformationBanner';
import { useIsNewFrontEndAvailable } from '@/information-banner/hooks/useIsNewFrontEndAvailable';
import { t } from '@lingui/core/macro';
import { useState } from 'react';
import { IconReload } from 'twenty-ui/icon';

export const InformationBannerNewVersion = () => {
  const isNewFrontEndAvailable = useIsNewFrontEndAvailable();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isNewFrontEndAvailable || isDismissed) {
    return null;
  }

  return (
    <InformationBanner
      componentInstanceId="information-banner-new-version"
      variant="soft"
      message={t`A new version of the CRM is available`}
      buttonTitle={t`Reload`}
      buttonIcon={IconReload}
      buttonOnClick={() => window.location.reload()}
      onClose={() => setIsDismissed(true)}
    />
  );
};
