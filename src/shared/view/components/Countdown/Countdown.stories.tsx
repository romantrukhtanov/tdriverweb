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
    startDate: date(),
    finishDate: add(date(), { [UnitOfTime.MONTHS]: 1 }),
    showOptions: {
      days: true,
      hours: true,
      minutes: true,
      seconds: true,
    },
  },

  decorators: [withSizes({ width: 200 })],
};
