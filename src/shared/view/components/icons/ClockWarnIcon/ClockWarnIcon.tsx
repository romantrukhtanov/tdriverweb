import React from 'react';
import { SvgIcon } from '@mui/material';
import cn from 'classnames';

import styles from './ClockWarnIcon.module.scss';

type Props = {
  className?: string;
};

export function ClockWarnIcon({ className }: Props) {
  return (
    <SvgIcon className={cn(styles.root, className)} width={36} height={36} viewBox="0 0 36 36">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M17 5C10.373 5 5 10.373 5 17c0 6.628 5.373 12 12 12a1.5 1.5 0 0 1 0 3C8.716 32 2 25.284 2 17 2 8.716 8.716 2 17 2c8.284 0 15 6.716 15 15a1.5 1.5 0 0 1-3 0c0-6.627-5.372-12-12-12Zm0 1.5A1.5 1.5 0 0 1 18.5 8v8.379l1.06 1.06a1.5 1.5 0 1 1-2.12 2.122l-1.5-1.5A1.5 1.5 0 0 1 15.5 17V8A1.5 1.5 0 0 1 17 6.5Zm7.06 15.44a1.5 1.5 0 1 0-2.12 2.12l3.439 3.44-3.44 3.44a1.5 1.5 0 0 0 2.122 2.12l3.439-3.439 3.44 3.44a1.5 1.5 0 1 0 2.12-2.122L29.622 27.5l3.44-3.44a1.5 1.5 0 1 0-2.122-2.12L27.5 25.378l-3.44-3.44Z"
        clipRule="evenodd"
      />
    </SvgIcon>
  );
}
