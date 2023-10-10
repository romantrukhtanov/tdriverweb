import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useService } from 'services/servicesProvider';
import { usePrevious } from 'shared/view/hooks/usePrevious';
import type { Theme } from 'services/settings/model';

const META_TAG_ID = 'meta-theme-color';

export const ThemeProvider = observer(function ThemeProvider() {
  const settings = useService('settings');
  const { theme } = settings;
  const prevTheme = usePrevious(theme);

  useEffect(
    function toggleTheme() {
      if (document.documentElement.classList.length > 0) {
        document.documentElement.classList.remove(`theme-${prevTheme}`);
      }

      document.documentElement.classList.add(`theme-${theme}`);

      const themeColors: Record<Theme, string> = { day: '#f5f4f8', night: '#231f30' };
      getThemeColorMeta().content = themeColors[theme];
    },
    [theme, prevTheme],
  );

  return null;
});

function getThemeColorMeta(): HTMLMetaElement {
  return (document.getElementById(META_TAG_ID) as HTMLMetaElement) ?? makeThemeColorMeta();
}

function makeThemeColorMeta(): HTMLMetaElement {
  const meta = document.createElement('meta');
  meta.id = META_TAG_ID;
  meta.name = 'theme-color';
  document.head.appendChild(meta);
  return meta;
}
