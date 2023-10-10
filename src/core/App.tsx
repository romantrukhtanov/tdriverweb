import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Providers } from 'core/Providers';
import { ThemeProvider } from 'services/settings/view/ThemeProvider/ThemeProvider';
import { ErrorBoundary } from 'pages/shared/ErrorBoundary/ErrorBoundary';
import { Router } from 'pages/Router/Router';

export const App = () => (
  <Providers>
    <ThemeProvider />
    <ErrorBoundary>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ErrorBoundary>
  </Providers>
);
