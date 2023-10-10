import React from 'react';
import { SvgIcon } from '@mui/material';

type Props = {
  className?: string;
};

export function CrossIcon({ className }: Props) {
  return (
    <SvgIcon
      className={className}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="m13.409 11.998 4.295-4.286a1.003 1.003 0 0 0-1.418-1.418L12 10.59 7.714 6.294a1.003 1.003 0 1 0-1.418 1.418l4.295 4.286-4.295 4.286a.998.998 0 0 0 0 1.419 1.001 1.001 0 0 0 1.418 0L12 13.407l4.286 4.296a1 1 0 0 0 1.418 0 1.002 1.002 0 0 0 0-1.419l-4.295-4.286Z"
      />
    </SvgIcon>
  );
}
