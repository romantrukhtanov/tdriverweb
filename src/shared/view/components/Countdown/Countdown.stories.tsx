import type { Meta, StoryObj } from '@storybook/react';

import { date, add, UnitOfTime } from 'services/datetime';
import { withSizes } from 'stories/decorators';

import { Countdown } from './Countdown';

export default {
  component: Countdown,
  title: 'Shared/Countdown',
} satisfies Meta<typeof Countdown>;

export const Example: StoryObj<typeof Countdown> = {
  name: 'Countdown',

  args: {
    completedAt: add(date(), { [UnitOfTime.MONTHS]: 1 }),
    finishedAt: date(),
    showOptions: {
      days: true,
      hours: true,
      minutes: true,
      seconds: true,
    },
  },

  decorators: [withSizes({ width: 200 })],
};
