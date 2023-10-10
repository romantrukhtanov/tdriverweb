import React from 'react';
import { SvgIcon } from '@mui/material';

type Props = {
  className?: string;
};

export function InsertIcon({ className }: Props) {
  return (
    <SvgIcon width={24} height={24} className={className} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.93 3c.468 0 .848.346.848.772v11.004l3.951-3.596a.91.91 0 0 1 1.2 0 .724.724 0 0 1 0 1.092l-5.4 4.914a.91.91 0 0 1-1.2 0l-5.4-4.914a.724.724 0 0 1 0-1.092.909.909 0 0 1 1.2 0l3.952 3.596V3.772c0-.426.38-.772.848-.772ZM5 19.728c0-.427.38-.772.848-.772h12.303c.47 0 .849.346.849.772 0 .426-.38.772-.849.772H5.848c-.468 0-.848-.346-.848-.772Z"
        clipRule="evenodd"
      />
    </SvgIcon>
  );
}
