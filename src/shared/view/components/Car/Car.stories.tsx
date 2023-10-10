import type { Meta, StoryObj } from '@storybook/react';

import { Car } from './Car';

export default {
  component: Car,
  title: 'Shared/Car',
} satisfies Meta<typeof Car>;

export const Example: StoryObj<typeof Car> = {
  name: 'Car',
};
