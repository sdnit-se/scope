import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { useState } from 'react';

import { mergeClassNames } from '@ui/utilities/internal/mergeClassNames';

import styles from '../Avatar.module.scss';
import { type AvatarImageProps } from '../types/AvatarImageProps';

const TWENTY_ICONS_URL = 'https://twenty-icons.com/';
const GOOGLE_ICONS_URL = 'https://www.google.com/s2/favicons?sz=64&domain=';
const GOOGLE_NO_ICON_WIDTH = 16;
const secondLogoUrls = new Map<string, string>();

const findSecondLogo = (logoUrl: string, onFound: () => void) => {
  const secondLogoUrl = logoUrl.replace(TWENTY_ICONS_URL, GOOGLE_ICONS_URL);
  const image = new Image();
  image.referrerPolicy = 'no-referrer';
  image.onload = image.onerror = () => {
    const found = image.naturalWidth > GOOGLE_NO_ICON_WIDTH;
    secondLogoUrls.set(logoUrl, found ? secondLogoUrl : '');
    onFound();
  };
  image.src = secondLogoUrl;
};

export const AvatarImage = ({ className, ...props }: AvatarImageProps) => {
  const [, setFoundLogoUrl] = useState<string>();
  const { src, onLoadingStatusChange } = props;
  const shownSrc = secondLogoUrls.get(src ?? '') ?? src;
  const twentyIconUrl =
    shownSrc === src && src?.startsWith(TWENTY_ICONS_URL) ? src : undefined;

  return (
    <AvatarPrimitive.Image
      {...props}
      referrerPolicy={shownSrc === src ? props.referrerPolicy : 'no-referrer'}
      src={shownSrc}
      onLoadingStatusChange={(status) => {
        onLoadingStatusChange?.(status);
        if (status === 'error' && twentyIconUrl !== undefined) {
          findSecondLogo(twentyIconUrl, () => setFoundLogoUrl(twentyIconUrl));
        }
      }}
      className={mergeClassNames(styles.image, className)}
    />
  );
};
