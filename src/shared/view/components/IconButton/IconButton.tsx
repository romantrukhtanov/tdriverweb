import React, { forwardRef } from 'react';
import { IconButton as MUIIconButton, IconButtonProps } from '@mui/material';

import styles from './IconButton.module.scss';

const IconButtonClasses: IconButtonProps['classes'] = {
  root: styles.root,
  colorPrimary: styles.primary,
  colorSecondary: styles.secondary,
  colorInfo: styles.info,
  sizeSmall: styles.small,
  sizeMedium: styles.medium,
  sizeLarge: styles.large,
};

type Props = IconButtonProps & {
  isActive?: boolean;
};

const IconButton = forwardRef((props: Props, ref: React.Ref<HTMLButtonElement>) => (
  <MUIIconButton
    style={{ borderRadius: '50%' }}
    classes={IconButtonClasses}
    color="primary"
    size="medium"
    ref={ref}
    {...props}
  />
));

export { IconButton };
