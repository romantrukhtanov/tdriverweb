import { useEffect } from 'react';

import { useService } from 'services/servicesProvider';

export function useLangTitle() {
  const { t, tKeys } = useService('i18n');
  const { selectedLanguage } = useService('settings');

  useEffect(() => {
    window.document.title = t(tKeys.shared.title);
  }, [selectedLanguage, t, tKeys]); // eslint-disable-line react-hooks/exhaustive-deps
}
