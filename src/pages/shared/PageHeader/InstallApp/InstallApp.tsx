import React from 'react';
import { observer } from 'mobx-react-lite';

import { useService } from 'services/servicesProvider';
import { IconButton } from 'shared/view/components/IconButton';
import { InsertIcon } from 'shared/view/components/icons';

export const InstallApp = observer(function InstallApp() {
  const { showInstallPrompt } = useService('installation');

  const handleInstall = () => {
    showInstallPrompt();
  };

  return (
    <IconButton onClick={handleInstall} size="small">
      <InsertIcon />
    </IconButton>
  );
});
