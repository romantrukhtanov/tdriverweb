import React from 'react';
import { DocsContainer as BaseContainer } from '@storybook/addon-docs';
import { useDarkMode } from 'storybook-dark-mode';

import { themes } from '../utils/themes';

/*
Storybook does not have the ability to change the theme for docs dynamically,
so a workaround is used.

@see https://github.com/hipstersmoothie/storybook-dark-mode/issues/127
@see https://github.com/storybookjs/storybook/issues/10523
 */
export const DocsContainer: typeof BaseContainer = ({ children, context }) => {
  const dark = useDarkMode();

  return (
    <BaseContainer context={context} theme={dark ? themes.dark : themes.light}>
      {children}
    </BaseContainer>
  );
};
