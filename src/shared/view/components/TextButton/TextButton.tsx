import React from 'react';
import { Button, ButtonProps } from '@mui/material';

import styles from './TextButton.module.scss';

type Props = ButtonProps & { dataTest?: string };

const buttonClasses: ButtonProps['classes'] = {
  root: styles.root,
  focusVisible: styles.focused,
};

function TextButton({ children, dataTest, ...rest }: Props) {
  return (
    <Button data-test={dataTest} disableRipple classes={buttonClasses} {...rest}>
      {children}
    </Button>
  );
}

export { TextButton };
