import React, { ComponentType, useState } from 'react';
import type { ArgsStoryFn } from '@storybook/types';
import type { ReactRenderer } from '@storybook/react';

function getControlledRender<TState, TProps>({
  stateName,
  setStateName,
  initialState,
  Component,
}: {
  stateName: keyof TProps;
  setStateName: keyof TProps;
  initialState: TState;
  Component: ComponentType<TProps>;
}): ArgsStoryFn<ReactRenderer, TProps> {
  return function ControlledRender(args) {
    const [state, setState] = useState<TState>(initialState);

    return (
      <Component
        {...args}
        {...{
          [stateName]: state,
          [setStateName]: setState,
        }}
      />
    );
  };
}

export { getControlledRender };
