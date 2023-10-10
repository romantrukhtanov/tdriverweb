import React, { ReactNode } from 'react';
import { PopperPlacementType } from '@mui/material';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { useService } from 'services/servicesProvider';
import { AVAILABLE_LANGUAGES, Language } from 'services/i18n';
import { Dropdown } from 'shared/view/components/Dropdown';
import { TextButton } from 'shared/view/components/TextButton';

import styles from './SelectLanguage.module.scss';

type Props = {
  control: ReactNode;
  placement?: PopperPlacementType;
  isLarge?: boolean;
  isOpen?: boolean;
};

export const SelectLanguage = observer(function SelectLanguage({
  control,
  isOpen,
  isLarge,
  placement = 'bottom-end',
}: Props) {
  const { isSelectLanguageOpen, toggleSelectLanguage, selectLanguage } = useService('settings');

  const { t, tKeys } = useService('i18n');
  const translations = tKeys.services.settings.languages;

  return (
    <Dropdown
      open={isSelectLanguageOpen || !!isOpen}
      control={control}
      onClose={toggleSelectLanguage}
      disablePortal={false}
      withPreventDefault={false}
      placement={placement}
      aboveModalBackdrop
      fullWidth
    >
      <div className={cn(styles.root, { [styles.large]: isLarge })}>
        {AVAILABLE_LANGUAGES.map(language => (
          <TextButton key={language} onClick={() => handleSelectLanguage(language)}>
            {t(translations[language])}
          </TextButton>
        ))}
      </div>
    </Dropdown>
  );

  function handleSelectLanguage(language: Language) {
    selectLanguage(language);
    toggleSelectLanguage();
  }
});
