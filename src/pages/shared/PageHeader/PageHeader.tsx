import React from 'react';
import { observer } from 'mobx-react-lite';

import { routes } from 'pages/routes';
import { useService } from 'services/servicesProvider';
import { SelectLanguage } from 'services/settings/view/SelectLanguage/SelectLanguage';
import { IconButton } from 'shared/view/components/IconButton';
import { DayIcon, BurgerIcon, NightIcon } from 'shared/view/components/icons';

import { Logo } from './Logo/Logo';
import { MainNav } from './MainNav/MainNav';
import { MMainNav } from './MMainNav/MMainNav';
import { InstallApp } from './InstallApp/InstallApp';
import type { NavItem } from './types';
import styles from './PageHeader.module.scss';

export const PageHeader = observer(function PageHeader() {
  const { t, tKeys } = useService('i18n');
  const {
    selectedLanguage,
    toggleSelectLanguage,
    isSelectLanguageOpen,
    theme,
    toggleTheme,
    isMobile,
    setIsMenuOpen,
  } = useService('settings');
  const { canBeInstalled } = useService('installation');

  const translations = tKeys.pages.pageHeader;
  const languagesTranslations = tKeys.services.settings.languagesShort;

  const mainNavItems: NavItem[] = [
    {
      id: 'Main',
      label: t(translations.mainMenu.main),
      href: '/',
    },
    {
      id: 'Categories',
      label: t(translations.mainMenu.categories),
      href: routes.categories.getRedirectPath(),
    },
    {
      id: 'Tickets',
      label: t(translations.mainMenu.tickets),
      href: routes.tickets.getRedirectPath(),
    },
    {
      id: 'About',
      label: t(translations.mainMenu.about),
      href: routes.about.getRedirectPath(),
    },
  ];
  return (
    <header className={styles.root}>
      <Logo />
      {isMobile ? getMobileNav() : getDesktopNav()}
    </header>
  );

  function getDesktopNav() {
    return (
      <>
        <div className={styles.mainNav}>
          <MainNav navItems={mainNavItems} />
        </div>
        <div className={styles.settings}>
          <IconButton onClick={() => toggleTheme()} size="small">
            {theme === 'day' ? <DayIcon /> : <NightIcon />}
          </IconButton>

          <SelectLanguage control={getSelectLanguageButton()} />
          {canBeInstalled && <InstallApp />}
        </div>
      </>
    );
  }

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

  function getMobileNav() {
    return (
      <>
        <div className={styles.burgerWrapper}>
          <button className={styles.burgerButton} type="button" onClick={() => setIsMenuOpen(true)}>
            <BurgerIcon />
          </button>
        </div>
        <MMainNav navItems={mainNavItems} />
      </>
    );
  }
});
