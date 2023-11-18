import type { Meta, StoryObj } from '@storybook/react';

import { Sphere } from './Sphere';

export default {
  component: Sphere,
  title: 'Shared/Car',
} satisfies Meta<typeof Sphere>;

export const Example: StoryObj<typeof Sphere> = {
  name: 'Car',
};
