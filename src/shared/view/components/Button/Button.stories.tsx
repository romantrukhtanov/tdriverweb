import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AddCircle } from '@mui/icons-material';

import { Button } from './Button';

const iconArg = {
  options: [undefined, 'e.g. <AddCircle />'],
  control: { type: 'radio' },
  mapping: {
    'e.g. <AddCircle />': <AddCircle />,
  },
};

export default {
  component: Button,
  title: 'Shared/Button',
  argTypes: {
    children: { control: { type: 'text' } },
    startIcon: iconArg,
    endIcon: iconArg,
    action: { control: { type: 'null' } },
  },
  args: {
    children: 'Some content',
    color: 'primary',
  },
} satisfies Meta<typeof Button>;

export const Example: StoryObj<typeof Button> = {
  name: 'Button',
};
