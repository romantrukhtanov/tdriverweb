import React from 'react';
import { SvgIcon } from '@mui/material';
import cn from 'classnames';

import styles from './BurgerIcon.module.scss';

type Props = {
  className?: string;
};

export function BurgerIcon({ className }: Props) {
  return (
    <SvgIcon width={32} height={32} viewBox="0 0 32 32" className={cn(styles.root, className)}>
      <g fill="currentColor">
        <rect width="24" height="2" x="4" y="8" rx="1" />
        <rect width="24" height="2" x="4" y="15" rx="1" />
        <rect width="24" height="2" x="4" y="22" rx="1" />
      </g>
    </SvgIcon>
  );
}
