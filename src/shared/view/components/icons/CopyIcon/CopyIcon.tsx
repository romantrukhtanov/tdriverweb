import React from 'react';
import { SvgIcon } from '@mui/material';

type Props = {
  className?: string;
};

export function CopyIcon({ className }: Props) {
  return (
    <SvgIcon width={24} height={24} className={className} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1Zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2Zm0 16H8V7h11v14Z"
      />
    </SvgIcon>
  );
}
