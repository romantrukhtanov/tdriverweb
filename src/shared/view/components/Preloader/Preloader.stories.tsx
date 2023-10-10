import type { Meta, StoryObj } from '@storybook/react';

import { Preloader } from './Preloader';

export default {
  component: Preloader,
  title: 'Shared/Preloader',
} satisfies Meta<typeof Preloader>;

export const Example: StoryObj<typeof Preloader> = {
  name: 'Preloader',
};
