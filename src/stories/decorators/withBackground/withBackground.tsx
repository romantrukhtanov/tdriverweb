import React from 'react';
import type { StoryFn } from '@storybook/react';

import styles from './withBackground.module.scss';

export const withBackground = () =>
  function WithMainBackground(Story: StoryFn) {
    return (
      <div className={styles.root}>
        <Story />
      </div>
    );
  };
