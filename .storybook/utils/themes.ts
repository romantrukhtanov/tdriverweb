import { themes as defaultThemes } from '@storybook/theming';

const themes = {
  light: {
    ...defaultThemes.normal,
    appBg: '#e7e5eb',
  },
  dark: {
    ...defaultThemes.dark,
    appBg: '#161617',
    appContentBg: '#161617',
    barBg: '#161617',
    inputBg: '#1d1a28',
  },
};

export { themes };
