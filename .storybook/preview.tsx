import React, { useEffect, useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useDarkMode } from 'storybook-dark-mode';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import type { Preview } from '@storybook/react';

import { RootStore, RootStoreProvider } from 'core/RootStore';
import { theme } from 'core/theme';
import { DepsProvider } from 'core/deps';
import { AVAILABLE_LANGUAGES } from 'services/i18n';
import { useService } from 'services/servicesProvider';
import 'shared/view/styles/index.scss';

import { DocsContainer } from './components/DocContainer';
import { themes } from './utils/themes';

// the earlier a decorator is declared, the lower it is in the tree
const decorators: Preview['decorators'] = [
  Story => {
    const { toggleTheme } = useService('settings');
    const isDark = useDarkMode();
    useEffect(() => toggleTheme(isDark ? 'night' : 'day'), [isDark]);

    return <Story />;
  },
  (Story, { globals: { locale } }) => {
    const { selectLanguage } = useService('settings');
    useEffect(() => selectLanguage(locale), [locale]);

    return <Story />;
  },
  Story => {
    const [store] = useState(() => new RootStore());

    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <RootStoreProvider store={store}>
            <DepsProvider>
              <MemoryRouter>
                <Story />
              </MemoryRouter>
            </DepsProvider>
          </RootStoreProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  },
];

const parameters: Preview['parameters'] = {
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
  controls: {
    expanded: true,
  },
  docs: {
    container: DocsContainer,
  },
  darkMode: {
    stylePreview: true,
    darkClass: 'theme-night',
    lightClass: 'theme-day',
    light: themes.light,
    dark: themes.dark,
    classTarget: 'html',
  },
  options: {
    storySort: {
      order: ['Shared', ['Icons'], 'Features', 'Services'],
    },
  },
};

const globalTypes: Preview['globalTypes'] = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      title: 'Locale',
      dynamicTitle: true,
      items: AVAILABLE_LANGUAGES.map(value => ({ value, title: value })),
    },
  },
};

const preview: Preview = {
  decorators,
  parameters,
  globalTypes,
};

export default preview;
