import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { YMInitializer } from 'react-yandex-metrika';

import { Providers } from 'core/Providers';
import { ThemeProvider } from 'services/settings/view/ThemeProvider/ThemeProvider';
import { InstallationProvider } from 'services/installation/view/InstallationProvider';
import { ErrorBoundary } from 'pages/shared/ErrorBoundary/ErrorBoundary';
import { Router } from 'pages/Router/Router';

export const App = () => (
  <Providers>
    <ThemeProvider />
    <ErrorBoundary>
      <BrowserRouter>
        <Router />
        <InstallationProvider />
        <YMInitializer
          accounts={[95619603]}
          options={{
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
          }}
          version="2"
        />
      </BrowserRouter>
    </ErrorBoundary>
  </Providers>
);
