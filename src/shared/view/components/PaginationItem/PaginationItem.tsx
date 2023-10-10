import React from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import type { QuestionStatus } from 'services/questions/mobx/model';

import styles from './PaginationItem.module.scss';

export type Status = QuestionStatus | 'selected';

type Props = {
  num: number;
  status?: Status;
  isLargeSize?: boolean;
  isSelected?: boolean;
  onClick(): void;
};

export const PaginationItem = observer(function Pagination({
  num,
  isLargeSize,
  isSelected,
  status = 'default',
  onClick,
}: Props) {
  return (
    <div
      className={cn(styles.root, styles[status], {
        [styles.selected]: isSelected,
        [styles.large]: isLargeSize,
      })}
      onClick={handleClick}
    >
      {num}
    </div>
  );

  function handleClick(e: React.UIEvent) {
    e.preventDefault();
    onClick();
  }
});
