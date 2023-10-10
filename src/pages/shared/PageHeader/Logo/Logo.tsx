import React from 'react';
import { observer } from 'mobx-react-lite';

import { useService } from 'services/servicesProvider';

import styles from './Logo.module.scss';

export const Logo = observer(function Logo() {
  const { t, tKeys } = useService('i18n');
  const { selectedLanguage } = useService('settings');
  const translations = tKeys.pages.pageHeader;
  const languagesTranslations = tKeys.services.settings.languagesShort;

  return (
    <div className={styles.root}>
      {t(translations.logoTitle)}
      {' | '}
      <span className={styles.language}>{t(languagesTranslations[selectedLanguage])}</span>
    </div>
  );
});
