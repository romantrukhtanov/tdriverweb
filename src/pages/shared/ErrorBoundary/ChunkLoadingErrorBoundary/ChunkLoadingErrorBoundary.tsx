import { PureComponent, ReactNode } from 'react';

const reloadPageWithErrorFlag = () => {
  const parser = new URL(window.location.href);
  parser.searchParams.set('pageLoadingError', 'true');
  window.location.href = parser.href;
};

const isAlreadyReloaded = () => {
  const parser = new URL(window.location.href);
  return parser.searchParams.has('pageLoadingError');
};

type Props = {
  children: ReactNode;
};

export class ChunkLoadingErrorBoundary extends PureComponent<Props> {
  componentDidCatch(error: Error) {
    if (/Loading( CSS)? chunk [\S]+ failed/.test(error.message) && !isAlreadyReloaded()) {
      reloadPageWithErrorFlag();
    }

    throw error;
  }

  render() {
    return this.props.children;
  }
}
