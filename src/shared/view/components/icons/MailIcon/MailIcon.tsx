import React from 'react';
import { SvgIcon } from '@mui/material';

type Props = {
  className?: string;
};

export function MailIcon({ className }: Props) {
  return (
    <SvgIcon width={24} height={24} className={className} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20.8 3H3.2a2.19 2.19 0 0 0-2.189 2.2L1 18.4a2.2 2.2 0 0 0 2.2 2.2h17.6a2.2 2.2 0 0 0 2.2-2.2V5.2A2.2 2.2 0 0 0 20.8 3Zm0 15.4H3.2v-11l8.8 5.5 8.8-5.5v11ZM12 10.7 3.2 5.2h17.6L12 10.7Z"
      />
    </SvgIcon>
  );
}
