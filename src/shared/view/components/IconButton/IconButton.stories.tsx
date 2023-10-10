import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavigateBefore } from '@mui/icons-material';

import { IconButton } from './IconButton';

export default {
  component: IconButton,
  title: 'Shared/IconButton',
} satisfies Meta<typeof IconButton>;

export const Example: StoryObj<typeof IconButton> = {
  name: 'IconButton',

  args: {
    children: <NavigateBefore />,
  },
};
