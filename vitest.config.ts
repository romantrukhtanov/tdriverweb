/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';

// eslint-disable-next-line import/no-default-export -- by design
export default defineConfig({
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        useDefineForClassFields: false,
      },
    },
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, './src/pages'),
      services: path.resolve(__dirname, './src/services'),
      features: path.resolve(__dirname, './src/features'),
      shared: path.resolve(__dirname, './src/shared'),
      core: path.resolve(__dirname, './src/core'),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['**/*.test.ts'],
    setupFiles: [path.resolve(__dirname, 'vitest.setup.ts')],
    coverage: {
      include: ['src/features/tradingChart/mobx/Datafeed/**/*'],
    },
  },
});
