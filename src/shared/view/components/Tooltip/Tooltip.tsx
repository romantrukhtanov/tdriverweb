import React, { ReactNode } from 'react';
import cn from 'classnames';
import { Tooltip as MUITooltip, TooltipProps } from '@mui/material';

import styles from './Tooltip.module.scss';

type Props = {
  dataTest?: string;
  title?: ReactNode;
  message: ReactNode;
  children: TooltipProps['children'];
  open?: boolean;
  placement?: TooltipProps['placement'];
  disableHoverListener?: boolean;
  disableTouchListener?: boolean;
  wide?: boolean;
  onClose?(): void;
};

function Tooltip({
  dataTest,
  title,
  children,
  message,
  placement = 'top',
  open,
  disableHoverListener,
  disableTouchListener,
  wide,
  onClose,
}: Props) {
  const content = (() => {
    if (!message && !title) {
      return '';
    }

    const tooltipDataTest = dataTest && `tooltip-text-${dataTest}`;
    return (
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.message} data-test={tooltipDataTest}>
          {message}
        </div>
      </div>
    );
  })();
  return (
    <MUITooltip
      data-test={dataTest && `${dataTest}-tooltip`}
      title={content}
      classes={{
        tooltip: cn(styles.rootTooltip, {
          [styles.wide]: wide,
        }),
        popper: styles.popper,
        arrow: styles.arrow,
      }}
      placement={placement}
      open={open}
      disableFocusListener // onFocus and onBlur do not work if using a Tooltip with TextField https://github.com/mui-org/material-ui/issues/19883#issuecomment-592980194
      disableHoverListener={disableHoverListener}
      disableTouchListener={disableTouchListener}
      onClose={onClose}
      arrow
    >
      {children}
    </MUITooltip>
  );
}

export { Tooltip };
