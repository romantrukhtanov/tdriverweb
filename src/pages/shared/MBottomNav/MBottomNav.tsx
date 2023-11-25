import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationActionProps,
  BottomNavigationAction,
} from '@mui/material';

import { routes } from 'pages/routes';
import { useService } from 'services/servicesProvider';

import { HomeIcon, CategoryIcon, TicketsIcon, ProjectIcon } from './icons';
import styles from './MBottomNav.module.scss';

type MBottomNavTabProps = {
  icon: React.ReactElement;
  label: React.ReactNode;
  url: string;
  value: string;
};

const bottomNavigationActionClasses: BottomNavigationActionProps['classes'] = {
  root: styles.tab,
  selected: styles.tabSelected,
  label: styles.tabLabel,
};

type Props = {
  onChange?(): void;
};

export const MBottomNav = ({ onChange }: Props) => {
  const { t, tKeys } = useService('i18n');
  const navigate = useNavigate();
  const location = useLocation();

  const translations = tKeys.pages.pageHeader;

  const navigationTabs: MBottomNavTabProps[] = [
    {
      label: t(translations.mainMenu.main),
      value: 'home',
      url: '/',
      icon: <HomeIcon className={styles.icon} />,
    },
    {
      label: t(translations.mainMenu.categories),
      value: 'categories',
      url: routes.categories.getRedirectPath(),
      icon: <CategoryIcon className={styles.icon} />,
    },
    {
      label: t(translations.mainMenu.tickets),
      value: 'tickets',
      url: routes.tickets.getRedirectPath(),
      icon: <TicketsIcon className={styles.icon} />,
    },
    {
      label: t(translations.mainMenu.about),
      value: 'about',
      url: routes.about.getRedirectPath(),
      icon: <ProjectIcon className={styles.icon} />,
    },
  ];

  const [activeTab, setActiveTab] = useState<string>(getActiveTab);

  useEffect(() => {
    const nextActiveTab = getActiveTab();

    if (activeTab !== nextActiveTab) {
      setActiveTab(nextActiveTab);
    }
  }, [location]);

  return (
    <div className={styles.root}>
      <BottomNavigation
        className={styles.nav}
        value={activeTab}
        showLabels
        onChange={handleChange}
        data-test="bottom-navigation"
      >
        {navigationTabs.map((item, index) => (
          <BottomNavigationAction key={index} classes={bottomNavigationActionClasses} {...item} />
        ))}
      </BottomNavigation>
    </div>
  );

  function getActiveTab() {
    const tab = navigationTabs.find(tabData => tabData.url === location.pathname);

    if (tab) {
      return tab.value;
    }
    return 'home';
  }

  function handleChange(_: React.SyntheticEvent, value: string) {
    if (value === activeTab) {
      return;
    }

    setActiveTab(value);
    onChange?.();

    const tabData = navigationTabs.find(tab => tab.value === value);

    if (tabData?.url) {
      navigate(tabData.url);
    }
  }
};

export type { MBottomNavTabProps };
