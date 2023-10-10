import React from 'react';
import { Button as MUIButton, ButtonProps, CircularProgress } from '@mui/material';
import cn from 'classnames';

import styles from './Button.module.scss';

type Props = ButtonProps & {
  fullWidth?: boolean;
  fullHeight?: boolean;
  showPreloader?: boolean;
  capitalized?: boolean;
};

const Button: React.FC<Props> = ({
  children,
  fullHeight,
  fullWidth,
  showPreloader,
  capitalized,
  ...rest
}: Props) => (
  <MUIButton
    className={cn(styles.button, {
      [styles.disabled]: rest.disabled,
      [styles.fullHeight]: fullHeight,
      [styles.fullWidth]: fullWidth,
      [styles.capitalized]: capitalized,
    })}
    {...rest}
  >
    {children}
    {showPreloader && <CircularProgress classes={{ root: styles.preloader }} size={24} />}
  </MUIButton>
);

export { Button };
