import React from 'react';
import { observer } from 'mobx-react-lite';

import { ChunkLoadingErrorBoundary } from './ChunkLoadingErrorBoundary/ChunkLoadingErrorBoundary';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = observer(function ErrorBoundary({
  children,
}) {
  return <ChunkLoadingErrorBoundary>{children}</ChunkLoadingErrorBoundary>;
});
