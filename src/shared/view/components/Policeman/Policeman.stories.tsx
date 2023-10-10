import type { Meta, StoryObj } from '@storybook/react';

import { Policeman } from './Policeman';

export default {
  component: Policeman,
  title: 'Shared/Policeman',
} satisfies Meta<typeof Policeman>;

export const Example: StoryObj<typeof Policeman> = {
  name: 'Policeman',
};
