import React from 'react';

type Props = {
  className?: string;
};

export function CrossIcon({ className }: Props) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="512"
      height="512"
    >
      <path d="M512 59.08 452.92 0 256 196.92 59.08 0 0 59.08 196.92 256 0 452.92 59.08 512 256 315.08 452.92 512 512 452.92 315.08 256z" />
    </svg>
  );
}
