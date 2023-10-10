import React from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import type { NavItem } from '../types';
import styles from './MainNav.module.scss';

type Props = {
  navItems: NavItem[];
};

export const MainNav = observer(function MainNav({ navItems }: Props) {
  return (
    <ul className={styles.root}>
      {navItems.map(navItem => (
        <li className={styles.navItem} key={navItem.id}>
          <NavLink
            className={({ isActive }) => cn(styles.navLink, { [styles.active]: isActive })}
            to={navItem.href}
            title={navItem.label}
          >
            {navItem.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
});
