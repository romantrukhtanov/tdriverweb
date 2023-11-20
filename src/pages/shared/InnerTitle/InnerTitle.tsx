import React from 'react';
import { observer } from 'mobx-react-lite';
import { animated } from '@react-spring/web';
import cn from 'classnames';

import { getDefaultConfig, useSpringOnce } from 'shared/animations';

import styles from './InnerTitle.module.scss';

type Props = {
  title: string;
  isSmallTitle?: boolean;
  gap?: 'small' | 'default' | 'medium' | 'large';
};

export const InnerTitle = observer(function InnerFooter({ title, gap, isSmallTitle }: Props) {
  const spring = useSpringOnce(title, getDefaultConfig({ x: '-15%', duration: 1000 }));

  return (
    <animated.div className={cn(styles.root, styles[`${gap}-gap`])} style={spring}>
      <h1 className={cn(styles.title, { [styles.small]: isSmallTitle })}>{title}</h1>
    </animated.div>
  );
});

export type { Props as InnerTitleProps };
