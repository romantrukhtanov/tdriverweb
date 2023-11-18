import React from 'react';
import { observer } from 'mobx-react-lite';

import { useService } from 'services/servicesProvider';
import { SelectLanguage } from 'services/settings/view/SelectLanguage/SelectLanguage';
import { IconButton } from 'shared/view/components/IconButton';
import { DayIcon, NightIcon } from 'shared/view/components/icons';

import { InstallApp } from '../InstallApp/InstallApp';
import styles from './Controls.module.scss';

export const Controls = observer(function Logo() {
  const { t, tKeys } = useService('i18n');
  const { selectedLanguage, toggleSelectLanguage, isSelectLanguageOpen, theme, toggleTheme } =
    useService('settings');
  const { canBeInstalled } = useService('installation');

  const languagesTranslations = tKeys.services.settings.languagesShort;

  return (
    <div className={styles.root}>
      <IconButton onClick={() => toggleTheme()} size="small">
        {theme === 'day' ? <DayIcon /> : <NightIcon />}
      </IconButton>

      <SelectLanguage control={getSelectLanguageButton()} />
      {canBeInstalled && <InstallApp />}
    </div>
  );

  function getSelectLanguageButton() {
    return (
      <IconButton
        onClick={toggleSelectLanguage}
        size="small"
        color={isSelectLanguageOpen ? 'info' : 'primary'}
      >
        {t(languagesTranslations[selectedLanguage])}
      </IconButton>
    );
  }
});
