import React, { useContext, createContext, ReactNode } from 'react';

import { Features } from 'features/featureProvider';
import { Services } from 'services/servicesProvider';

export class RootStore {
  constructor() {
    this.services = new Services();
    this.features = new Features(this.services);
  }

  services: Services;
  features: Features;
}

const rootStoreContext = createContext<RootStore | null>(null);

export const useRootStore = () => {
  const context = useContext(rootStoreContext);
  if (context) {
    return context;
  }
  throw Error('Root store is not provided!');
};

const rootStore = new RootStore();

type RootStoreProviderProps = {
  children: ReactNode;
  store?: RootStore;
};

export const RootStoreProvider = ({ children, store = rootStore }: RootStoreProviderProps) => {
  return <rootStoreContext.Provider value={store}>{children}</rootStoreContext.Provider>;
};
