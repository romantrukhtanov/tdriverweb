import React from 'react';
import { SvgIcon } from '@mui/material';
import cn from 'classnames';

import styles from './CloseIcon.module.scss';

type Props = {
  className?: string;
};

export function CloseIcon({ className }: Props) {
  return (
    <SvgIcon className={cn(styles.root, className)} width={32} height={32} viewBox="0 0 32 32">
      <rect
        width="2.133"
        height="25.6"
        x="6.195"
        y="7.703"
        fill="currentColor"
        rx="1.067"
        transform="rotate(-45 6.195 7.703)"
      />
      <rect
        width="25.6"
        height="2.133"
        x="6.195"
        y="24.297"
        fill="currentColor"
        rx="1.067"
        transform="rotate(-45 6.195 24.297)"
      />
    </SvgIcon>
  );
}
