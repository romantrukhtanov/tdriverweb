import React from 'react';
import { SvgIcon } from '@mui/material';
import cn from 'classnames';

import styles from './ClockRightIcon.module.scss';

type Props = {
  className?: string;
};

export function ClockRightIcon({ className }: Props) {
  return (
    <SvgIcon className={cn(styles.root, className)} width={36} height={36} viewBox="0 0 36 36">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M17 5C10.373 5 5 10.373 5 17s5.373 12 12 12a1.5 1.5 0 1 1 0 3C8.716 32 2 25.284 2 17 2 8.716 8.716 2 17 2c8.284 0 15 6.716 15 15a1.5 1.5 0 0 1-3 0c0-6.627-5.372-12-12-12Zm17.42 16.816a1.5 1.5 0 0 1 .264 2.105l-7 9a1.5 1.5 0 0 1-2.225.159l-3.5-3.375a1.5 1.5 0 1 1 2.082-2.16l2.3 2.217 5.975-7.683a1.5 1.5 0 0 1 2.105-.263ZM18.5 8a1.5 1.5 0 1 0-3 0v9c0 .398.158.78.44 1.06l4.5 4.5a1.5 1.5 0 1 0 2.12-2.12l-4.06-4.061V8Z"
        clipRule="evenodd"
      />
    </SvgIcon>
  );
}
