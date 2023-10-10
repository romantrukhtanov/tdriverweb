import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useService } from 'services/servicesProvider';

export const ManifestDynamic = observer(function ManifestDynamic() {
  const { manifestUrl } = useService('installation');

  useEffect(() => {
    if (!manifestUrl) {
      return;
    }
    const linkManifest = document.querySelector<HTMLLinkElement>('[rel="manifest"]');
    if (!linkManifest) {
      return;
    }
    linkManifest.href = manifestUrl;
  }, [manifestUrl]);

  return null;
});
