import React from 'react';
import { CircularProgress, CircularProgressProps } from '@mui/material';

import styles from './Preloader.module.scss';

type Props = {
  size?: number | string;
};

const Preloader: React.FC<Props> = ({ size }: Props) => {
  const preloaderClasses: CircularProgressProps['classes'] = {
    root: styles.root,
    circleDisableShrink: styles.fastAnimations,
  };

  return <CircularProgress disableShrink classes={preloaderClasses} size={size} />;
};

export { Preloader };
