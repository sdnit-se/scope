import { useLayoutEffect } from 'react';

import { SIMPLE_MODE_CLASS_NAME } from '@/simple-mode/constants/SimpleModeClassName';
import { useIsSimpleModeEnabled } from '@/simple-mode/hooks/useIsSimpleModeEnabled';
import '@/simple-mode/styles/simple-mode.css';

export const SimpleModeThemeEffect = () => {
  const isSimpleModeEnabled = useIsSimpleModeEnabled();

  useLayoutEffect(() => {
    document.documentElement.classList.toggle(
      SIMPLE_MODE_CLASS_NAME,
      isSimpleModeEnabled,
    );

    return () =>
      document.documentElement.classList.remove(SIMPLE_MODE_CLASS_NAME);
  }, [isSimpleModeEnabled]);

  return null;
};
