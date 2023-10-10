import React from 'react';
import { SvgIcon } from '@mui/material';

type Props = {
  className?: string;
};

export function CheckIcon({ className }: Props) {
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
        d="M20.134 6.337a1.14 1.14 0 0 0-1.617 0l-8.482 8.493-3.563-3.575a1.164 1.164 0 0 0-1.617 1.673L9.227 17.3a1.139 1.139 0 0 0 1.617 0l9.29-9.29a1.14 1.14 0 0 0 0-1.673Z"
      />
    </SvgIcon>
  );
}
