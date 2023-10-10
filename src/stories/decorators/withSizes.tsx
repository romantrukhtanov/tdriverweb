import React from 'react';
import type { StoryFn } from '@storybook/react';

type Dimension = 'width' | 'maxWidth' | 'height' | 'maxHeight';

export const withSizes = (sizes: Partial<Record<Dimension, number | string>>) =>
  function WithMaxWidth(Story: StoryFn) {
    return (
      <div style={sizes}>
        <Story />
      </div>
    );
  };
