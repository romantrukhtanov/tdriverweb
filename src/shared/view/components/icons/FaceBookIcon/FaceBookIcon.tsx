import React from 'react';
import { SvgIcon } from '@mui/material';

type Props = {
  className?: string;
};

export function FaceBookIcon({ className }: Props) {
  return (
    <SvgIcon width={24} height={24} className={className} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M17.223 8.124H13.74V5.84c0-.857.569-1.057.969-1.057h2.457v-3.77L13.783 1c-3.756 0-4.61 2.812-4.61 4.611v2.513H7v3.884h2.172V23h4.57V12.008h3.082l.399-3.884Z"
      />
    </SvgIcon>
  );
}
