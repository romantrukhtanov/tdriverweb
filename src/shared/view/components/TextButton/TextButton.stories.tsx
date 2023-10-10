import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Adjust } from '@mui/icons-material';

import { TextButton } from './TextButton';

const iconArg = {
  options: [undefined, 'e.g. <Adjust />'],
  control: { type: 'radio' },
  mapping: {
    'e.g. <Adjust />': <Adjust />,
  },
};

export default {
  component: TextButton,
  title: 'Shared/TextButton',
  args: {
    children: 'Some content',
  },
  argTypes: {
    children: { control: { type: 'text' } },
    startIcon: iconArg,
    endIcon: iconArg,
    action: { control: { type: 'null' } },
  },
} satisfies Meta<typeof TextButton>;

export const Example: StoryObj<typeof TextButton> = {
  name: 'TextButton',
};
