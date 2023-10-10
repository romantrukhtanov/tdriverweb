import React from 'react';
import { SvgIcon } from '@mui/material';
import cn from 'classnames';

import styles from './ClockIcon.module.scss';

type Props = {
  className?: string;
};

export function ClockIcon({ className }: Props) {
  return (
    <SvgIcon className={cn(styles.root, className)} width={36} height={36} viewBox="0 0 36 36">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5 17c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12S5 23.627 5 17ZM17 2C8.716 2 2 8.716 2 17c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15Zm1.5 6a1.5 1.5 0 0 0-3 0v9c0 .398.158.78.44 1.06l4.5 4.5a1.5 1.5 0 1 0 2.12-2.12l-4.06-4.061V8Z"
        clipRule="evenodd"
      />
    </SvgIcon>
  );
}
