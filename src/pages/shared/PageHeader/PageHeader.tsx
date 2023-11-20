import React from 'react';
import { observer } from 'mobx-react-lite';
import { animated } from '@react-spring/web';

import { routes } from 'pages/routes';
import { useService } from 'services/servicesProvider';
import { BurgerIcon } from 'shared/view/components/icons';
import { useSpringOnce, getDefaultConfig } from 'shared/animations';

import { Logo } from './Logo/Logo';
import { MainNav } from './MainNav/MainNav';
import { Controls } from './Controls/Controls';
import { MMainNav } from './MMainNav/MMainNav';
import styles from './PageHeader.module.scss';
import type { NavItem } from './types';

export const PageHeader = observer(function PageHeader() {
  const { t, tKeys } = useService('i18n');
  const { isMobile, setIsMenuOpen } = useService('settings');

  const spring = useSpringOnce('main-header', getDefaultConfig({ y: '-100%', duration: 1000 }));

  const translations = tKeys.pages.pageHeader;

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
      <animated.div className={styles.wrapper} style={spring}>
        <Logo />
        {isMobile ? getMobileNav() : getDesktopNav()}
      </animated.div>
    </header>
  );

  function getDesktopNav() {
    return (
      <>
        <div className={styles.mainNav}>
          <MainNav navItems={mainNavItems} />
        </div>
        <Controls />
      </>
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
