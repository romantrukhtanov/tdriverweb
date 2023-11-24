import React from 'react';
import { SvgIcon } from '@mui/material';

type Props = {
  className?: string;
};

export function CategoryIcon({ className }: Props) {
  return (
    <SvgIcon className={className} viewBox="0 0 32 32" fontSize="inherit">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M16.245 2.974a.637.637 0 0 1 .51 0 86.254 86.254 0 0 1 14.974 8.409.637.637 0 0 1-.196 1.135 71.76 71.76 0 0 0-3.27.99c.355 2.859.569 5.735.64 8.616a.637.637 0 0 1-.392.603 68.86 68.86 0 0 0-11.658 6.245.637.637 0 0 1-.706 0 68.855 68.855 0 0 0-7.272-4.23 9.185 9.185 0 0 1-1.94 2.85.637.637 0 0 1-.9-.903 7.911 7.911 0 0 0 1.695-2.51 68.819 68.819 0 0 0-3.24-1.452.637.637 0 0 1-.391-.603c.07-2.881.284-5.757.64-8.616a71.662 71.662 0 0 0-3.271-.988.637.637 0 0 1-.197-1.136 86.254 86.254 0 0 1 14.974-8.41Zm-10.578 9.5a72.755 72.755 0 0 0-2.557-.809A84.98 84.98 0 0 1 16.5 4.253a84.979 84.979 0 0 1 13.391 7.41c-.85.253-1.694.52-2.53.8v.001A73.11 73.11 0 0 0 16.5 17.123a73.084 73.084 0 0 0-5.716-2.711 78.495 78.495 0 0 1 5.992-3.206.637.637 0 0 0-.552-1.148 79.777 79.777 0 0 0-6.912 3.751 73.026 73.026 0 0 0-3.645-1.336Zm.305 1.45a85.737 85.737 0 0 0-.588 7.797c.926.394 1.843.807 2.75 1.24.15-.615.226-1.248.225-1.884v-.56a1.707 1.707 0 0 1-.571-2.793c.165-.165.36-.293.571-.378v-2.542c-.79-.307-1.586-.6-2.387-.88Zm3.661 1.389v2.033a1.709 1.709 0 0 1 0 3.172v.557a9.185 9.185 0 0 1-.33 2.456 70.143 70.143 0 0 1 7.197 4.147 70.144 70.144 0 0 1 11.117-5.957 85.721 85.721 0 0 0-.587-7.797 71.837 71.837 0 0 0-10.23 4.482c-.187.1-.413.1-.6 0a71.815 71.815 0 0 0-6.567-3.093Z"
        clipRule="evenodd"
      />
    </SvgIcon>
  );
}
