import React, { ReactNode } from 'react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

import { theme } from 'core/theme';
import { RootStoreProvider } from 'core/RootStore';
import { DepsProvider } from 'core/deps';

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <RootStoreProvider>
        <DepsProvider>{children}</DepsProvider>
      </RootStoreProvider>
    </ThemeProvider>
  </StyledEngineProvider>
);
