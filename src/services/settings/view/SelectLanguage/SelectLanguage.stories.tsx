import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { withSizes } from 'stories/decorators';
import { TextButton } from 'shared/view/components/TextButton';

import { SelectLanguage } from './SelectLanguage';

export default {
  component: SelectLanguage,
  title: 'Settings/SelectLanguage',
  args: {
    control: <TextButton>Control</TextButton>,
    isOpen: true,
  },
  decorators: [withSizes({ maxWidth: 120 })],
} satisfies Meta<typeof SelectLanguage>;

export const Example: StoryObj<typeof SelectLanguage> = {
  name: 'SelectLanguage',
};
