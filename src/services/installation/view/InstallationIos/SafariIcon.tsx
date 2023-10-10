import React from 'react';

type Props = {
  className?: string;
};

export function SafariIcon({ className }: Props) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 13.96 13.96"
      width="24"
      height="24"
    >
      <path d="M6.98 0A6.99 6.99 0 0 0 0 6.98a6.99 6.99 0 0 0 6.98 6.98 6.99 6.99 0 0 0 6.98-6.98A6.99 6.99 0 0 0 6.98 0zm0 1.07a5.9 5.9 0 0 1 5.91 5.91 5.9 5.9 0 0 1-5.9 5.91 5.9 5.9 0 0 1-5.92-5.9 5.9 5.9 0 0 1 5.91-5.92zm3.76 2.15L5.6 5.62l-2.38 5.12L8.4 8.4zM6.96 6.3a.8.8 0 1 1 0 1.59.8.8 0 0 1 0-1.6z" />
    </svg>
  );
}
