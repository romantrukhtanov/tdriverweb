import type { Meta, StoryObj } from '@storybook/react';

import { Speedometer } from './Speedometer';

export default {
  component: Speedometer,
  title: 'Shared/Speedometer',
} satisfies Meta<typeof Speedometer>;

export const Example: StoryObj<typeof Speedometer> = {
  name: 'Speedometer',
};
