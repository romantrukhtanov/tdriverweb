import React from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import styles from './InnerTitle.module.scss';

type Props = {
  title: string;
  isSmallTitle?: boolean;
  gap?: 'small' | 'default' | 'medium' | 'large';
};

export const InnerTitle = observer(function InnerFooter({ title, gap, isSmallTitle }: Props) {
  return (
    <div className={cn(styles.root, styles[`${gap}-gap`])}>
      <h1 className={cn(styles.title, { [styles.small]: isSmallTitle })}>{title}</h1>
    </div>
  );
});

export type { Props as InnerTitleProps };
