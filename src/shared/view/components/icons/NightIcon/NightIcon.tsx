import React from 'react';
import { SvgIcon } from '@mui/material';

type Props = {
  className?: string;
};

export function NightIcon({ className }: Props) {
  return (
    <SvgIcon width={24} height={24} className={className} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M10.312 2.702a.75.75 0 0 1 .708-.452c5.387.142 9.73 4.436 9.73 9.75 0 5.378-4.209 9.75-9.75 9.75-3.452 0-6.807-1.67-8.62-4.327a.75.75 0 0 1 .77-1.158c3.61.735 6.732-1.125 8.313-3.873 1.58-2.744 1.567-6.268-.997-8.865a.75.75 0 0 1-.154-.825Z"
        clipRule="evenodd"
      />
    </SvgIcon>
  );
}
