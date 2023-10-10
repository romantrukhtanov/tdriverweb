import React, { PropsWithChildren, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { Popper, ClickAwayListener, PopperPlacementType } from '@mui/material';
import { Rect } from '@popperjs/core';
import { FocusTrap } from '@mui/base';

import { useService } from 'services/servicesProvider';
import { useElementSize } from 'shared/view/hooks/useElementSize';

import styles from './Dropdown.module.scss';

export type DropdownProps = {
  open: boolean;
  control: ReactNode;
  overlapped?: boolean;
  flipped?: boolean;
  disablePortal?: boolean;
  aboveModalBackdrop?: boolean;
  placement?: PopperPlacementType;
  fullWidth?: boolean;
  preventOverflow?: boolean;
  withPreventDefault?: boolean;
  onClose?(): void;
};

export const Dropdown = observer(function Dropdown({
  children,
  control,
  open,
  flipped,
  overlapped,
  preventOverflow,
  placement = 'bottom-start',
  fullWidth = false,
  disablePortal = true,
  aboveModalBackdrop = false,
  withPreventDefault = true,
  onClose = () => undefined,
}: PropsWithChildren<DropdownProps>) {
  const { element, elementRef } = useElementSize({});
  const { isMobile } = useService('settings');
  return (
    <div
      className={cn(styles.root, {
        [styles.fullWidth]: fullWidth,
      })}
      ref={elementRef}
    >
      {control}
      <Popper
        placement={placement}
        className={cn(styles.popper, {
          [styles.aboveModalBackdrop]: aboveModalBackdrop,
        })}
        open={open}
        disablePortal={disablePortal}
        anchorEl={element}
        modifiers={[
          {
            name: 'flip',
            enabled: !!flipped || !!preventOverflow,
            options: {
              altBoundary: true,
              rootBoundary: 'viewport',
              padding: 12,
            },
          },
          {
            name: 'offset',
            options: {
              offset: ({ reference }: { reference: Rect }) => {
                return overlapped ? [0, -reference.height] : [0, 8];
              },
            },
          },
          {
            name: 'preventOverflow',
            enabled: !!preventOverflow,
            options: {
              mainAxis: false,
              altAxis: true,
              altBoundary: true,
              padding: 12,
            },
          },
        ]}
      >
        <FocusTrap open={isMobile}>
          {/* need div with tabIndex={-1} wrap ClickAwayListener for FocusTrap correct behavior */}
          <div tabIndex={-1}>
            <ClickAwayListener
              onClickAway={e => {
                if (withPreventDefault) {
                  e.preventDefault();
                }
                onClose();
              }}
            >
              <div className={cn(styles.paper)}>{children}</div>
            </ClickAwayListener>
          </div>
        </FocusTrap>
      </Popper>
    </div>
  );
});
