import { MOBILE_NAVIGATION_BAR_CLEARANCE } from '@/navigation/constants/MobileNavigationBarClearance';
import { SettingsNavigationDrawerItems } from '@/settings/components/SettingsNavigationDrawerItems';
import { NavigationDrawerScrollableContent } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerScrollableContent';
import { styled } from '@linaria/react';
import { useIsMobile } from 'twenty-ui/utilities';

const StyledMobileNavigationBarClearance = styled.div`
  flex-shrink: 0;
  height: ${MOBILE_NAVIGATION_BAR_CLEARANCE};
`;

export const SettingsNavigationDrawerContent = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <NavigationDrawerScrollableContent>
        <SettingsNavigationDrawerItems />
      </NavigationDrawerScrollableContent>

      {isMobile && <StyledMobileNavigationBarClearance />}
    </>
  );
};
