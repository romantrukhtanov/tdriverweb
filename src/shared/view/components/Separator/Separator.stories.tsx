import type { Meta, StoryObj } from '@storybook/react';

import { Separator } from './Separator';

export default {
  component: Separator,
  title: 'Shared/Separator',
} satisfies Meta<typeof Separator>;

export const Example: StoryObj<typeof Separator> = {
  name: 'Separator',
};
