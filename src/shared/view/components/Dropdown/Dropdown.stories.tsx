import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Dropdown } from './Dropdown';

export default {
  component: Dropdown,
  title: 'Shared/Dropdown',
} satisfies Meta<typeof Dropdown>;

export const Example: StoryObj<typeof Dropdown> = {
  name: 'Dropdown',

  args: {
    open: true,
    children: <span>Some content</span>,
  },
};
