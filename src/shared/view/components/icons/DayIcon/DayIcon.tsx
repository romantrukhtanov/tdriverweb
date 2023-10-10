import React from 'react';
import { SvgIcon } from '@mui/material';

type Props = {
  className?: string;
};

export function DayIcon({ className }: Props) {
  return (
    <SvgIcon width={24} height={24} className={className} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1ZM4.293 4.293a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 0 1-1.414 1.414L4.293 5.707a1 1 0 0 1 0-1.414Zm15.557 0a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.415-1.414l1.415-1.414a1 1 0 0 1 1.414 0ZM6 12a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm-5 0a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Zm18 0a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Zm-1.98 5.02a1 1 0 0 1 1.415 0l1.414 1.415a1 1 0 0 1-1.414 1.414l-1.414-1.414a1 1 0 0 1 0-1.414Zm-9.898 0a1 1 0 0 1 0 1.415L5.708 19.85a1 1 0 0 1-1.415-1.414l1.415-1.414a1 1 0 0 1 1.414 0ZM12 19a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Z"
        clipRule="evenodd"
      />
    </SvgIcon>
  );
}
