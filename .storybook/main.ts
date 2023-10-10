import type { StorybookConfig as StorybookConfigWebpack } from '@storybook/core-webpack';
import type { StorybookConfig as StorybookConfigVite } from '@storybook/react-vite';

import { modifyWebpackModule } from './utils/modifyWebpackModule';
import { modifyWebpackPlugins } from './utils/modifyWebpackPlugins';
import { modifyWebpackResolve } from './utils/modifyWebpackResolve';

import { modifyViteCss } from './utils/modifyViteCss';
import { modifyVitePlugins } from './utils/modifyVitePlugins';
import { modifyViteDefine } from './utils/modifyViteDefine';

const framework = process.env.STORYBOOK_FRAMEWORK === 'vite' ? 'vite' : 'webpack';

const configBase: Omit<StorybookConfigVite & StorybookConfigWebpack, 'framework'> = {
  stories: ['../src/**/*.stories.@(mdx|js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', 'storybook-dark-mode'],
  staticDirs: [
    {
      from: '../src/public',
      to: '/',
    },
  ],
  docs: {
    autodocs: 'tag',
  },
  core: {
    disableTelemetry: true,
  },
};

const config =
  framework === 'vite'
    ? ({
        ...configBase,
        framework: {
          name: '@storybook/react-vite',
          options: {},
        },
        viteFinal(config) {
          modifyViteCss(config);
          modifyVitePlugins(config);
          modifyViteDefine(config);
          return config;
        },
      } satisfies StorybookConfigVite)
    : ({
        ...configBase,
        framework: {
          name: '@storybook/react-webpack5',
          options: {},
        },
        webpackFinal(config) {
          modifyWebpackPlugins(config);
          modifyWebpackResolve(config);
          modifyWebpackModule(config);
          return config;
        },
      } satisfies StorybookConfigWebpack);

// @see https://github.com/storybookjs/storybook/issues/23675
export default { ...config };
