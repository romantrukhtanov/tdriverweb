import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer, DrawerProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useSwipeable } from 'react-swipeable';
import cn from 'classnames';

import { useService } from 'services/servicesProvider';
import { SelectLanguage } from 'services/settings/view/SelectLanguage/SelectLanguage';
import { SIDE_MENU_TRANSITION_TIME } from 'shared/constants';
import { CloseIcon, DayIcon, NightIcon, InsertIcon } from 'shared/view/components/icons';
import { InnerFooter } from 'pages/shared/InnerFooter/InnerFooter';

import { Logo } from '../Logo/Logo';
import type { NavItem } from '../types';
import styles from './MMainNav.module.scss';

const drawerClasses: DrawerProps['classes'] = {
  paper: styles.paper,
};

type Props = {
  navItems: NavItem[];
};

export const MMainNav = observer(function MMainNav({ navItems }: Props) {
  const { t, tKeys } = useService('i18n');
  const {
    isMenuOpen,
    setIsMenuOpen,
    toggleTheme,
    theme,
    setIsSelectLanguageOpen,
    toggleSelectLanguage,
    selectedLanguage,
  } = useService('settings');
  const { canBeInstalled, showInstallPrompt } = useService('installation');
  const { isTablet } = useService('settings');

  const drawerRef = useRef<HTMLDivElement>(null);

  const handleSwipe = useSwipeable({
    onSwipedLeft: toggleMobileMenuOpen,
  });

  const translations = tKeys.services.settings;
  const languagesTranslations = translations.languagesShort;

  return (
    <Drawer
      anchor={isTablet ? 'top' : 'left'}
      open={isMenuOpen}
      onClose={toggleMobileMenuOpen}
      classes={drawerClasses}
      PaperProps={{
        ref: drawerRef,
        onScroll: handleScroll,
      }}
      transitionDuration={SIDE_MENU_TRANSITION_TIME}
      {...handleSwipe}
    >
      <div className={styles.root} onScroll={handleScroll}>
        <div className={styles.header}>
          <Logo />
          <button className={styles.closeButton} type="button" onClick={toggleMobileMenuOpen}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.navList}>
            <ul className={styles.list}>
              {navItems.map(navItem => (
                <li className={styles.navItem} key={navItem.id}>
                  <NavLink
                    className={({ isActive }) => cn(styles.navLink, { [styles.active]: isActive })}
                    to={navItem.href}
                    title={navItem.label}
                    onClick={toggleMobileMenuOpen}
                  >
                    {navItem.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.settings}>
            <button className={styles.button} type="button" onClick={() => toggleTheme()}>
              <div className={styles.icon}>{theme === 'day' ? <DayIcon /> : <NightIcon />}</div>
              <div className={styles.text}>{t(translations.theme[theme])}</div>
            </button>

            <SelectLanguage control={getSelectLanguageButton()} placement="bottom-start" isLarge />

            {canBeInstalled && (
              <button className={styles.button} type="button" onClick={() => handleInstall()}>
                <div className={styles.icon}>
                  <InsertIcon />
                </div>
                <div className={styles.text}>{t(translations.installApp)}</div>
              </button>
            )}
          </div>
        </div>

        <InnerFooter />
      </div>
    </Drawer>
  );

  function getSelectLanguageButton() {
    return (
      <button className={styles.button} type="button" onClick={toggleSelectLanguage}>
        <div className={styles.icon}>
          <span className={styles.language}>{t(languagesTranslations[selectedLanguage])}</span>
        </div>
        <div className={styles.text}>{t(translations.languages[selectedLanguage])}</div>
      </button>
    );
  }

  function handleInstall() {
    showInstallPrompt();
  }

  function toggleMobileMenuOpen() {
    setIsSelectLanguageOpen(false);
    setIsMenuOpen(!isMenuOpen);
  }

  function handleScroll(e: React.UIEvent) {
    e.stopPropagation(); // this is needed to prevent handleScroll call in MPageHeader
  }
});
