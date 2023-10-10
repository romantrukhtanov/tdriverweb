import type { Meta, StoryObj } from '@storybook/react';

import { PaginationItem } from './PaginationItem';

export default {
  component: PaginationItem,
  title: 'Shared/PaginationItem',
} satisfies Meta<typeof PaginationItem>;

export const Example: StoryObj<typeof PaginationItem> = {
  name: 'PaginationItem',
  args: {
    num: 10,
    onClick() {},
  },
};
