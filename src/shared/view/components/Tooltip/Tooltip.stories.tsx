import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from './Tooltip';

export default {
  component: Tooltip,
  title: 'Shared/Tooltip',
} satisfies Meta<typeof Tooltip>;

type Story = StoryObj<typeof Tooltip>;

export const Example: Story = {
  name: 'Tooltip',

  args: {
    title: 'Some title',
    message: `This product is in an open beta\n test stage. You can try our new\n service.`,
    children: <span>Some kind of content</span>,
  },
};
