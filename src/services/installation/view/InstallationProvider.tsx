import React from 'react';

import { useService } from 'services/servicesProvider';
import { lazyfy } from 'shared/helpers/lazyfy';

const { InstallationIosLazy } = lazyfy(
  () => import(/* webpackChunkName: "InstallationIos" */ './InstallationIos/InstallationIos'),
  'InstallationIos',
  { preload: false },
);

export const InstallationProvider = () => {
  const { implementationKind, canBeInstalled } = useService('installation');

  const isRenderIosProvider = implementationKind === 'iOS' && canBeInstalled;

  if (!isRenderIosProvider) {
    return null;
  }

  return <InstallationIosLazy />;
};
