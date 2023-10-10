import type { Meta, StoryObj } from '@storybook/react';

import { Rudder } from './Rudder';

export default {
  component: Rudder,
  title: 'Shared/Rudder',
} satisfies Meta<typeof Rudder>;

export const Example: StoryObj<typeof Rudder> = {
  name: 'Rudder',
};
