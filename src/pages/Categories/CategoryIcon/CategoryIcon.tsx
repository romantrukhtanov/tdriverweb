import React from 'react';
import cn from 'classnames';

import styles from './CategoryIcon.module.scss';

type Props = {
  className?: string;
};

export function CategoryIcon({ className }: Props) {
  return (
    <svg
      className={cn(styles.root, className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 350 350"
      width="350"
      height="350"
      fill="none"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="13"
        d="M62.126 147.978a881.362 881.362 0 0 0-7.16 92.56A709.098 709.098 0 0 1 175 304.851a709.1 709.1 0 0 1 120.05-64.313 881.659 881.659 0 0 0-7.161-92.56m0 0a749.364 749.364 0 0 1 38.763-11.871A873.593 873.593 0 0 0 175.001 50.94a873.652 873.652 0 0 0-151.652 85.181A739.35 739.35 0 0 1 175 196.715a739.61 739.61 0 0 1 112.889-48.737ZM98.438 218.751a10.938 10.938 0 1 0-.002-21.876 10.938 10.938 0 0 0 .002 21.876Zm0 0v-53.594a807.362 807.362 0 0 1 76.563-42.029M72.815 291.565a87.221 87.221 0 0 0 25.623-61.877v-21.875"
      />
    </svg>
  );
}
