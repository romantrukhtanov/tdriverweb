import React from 'react';

import { useService } from 'services/servicesProvider';

import type { Props } from './model';
import { BottomSheetIos } from './BottomSheetIos/BottomSheetIos';
import { BottomSheetChrome } from './BottomSheetChrome/BottomSheetChrome';

export const BottomSheet = (props: Props) => {
  const { implementationKind } = useService('installation');

  switch (implementationKind) {
    case 'iOS':
      return <BottomSheetIos {...props} />;
    case 'native':
      return <BottomSheetChrome {...props} />;
    default:
      return null;
  }
};
