import React from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import * as R from 'remeda';

import styles from './Progress.module.scss';

type Props = {
  rightAnswers: number;
  totalAmount: number;
};

export const Progress = observer(function Progress({ totalAmount = 0, rightAnswers = 0 }: Props) {
  const progress = calcProgressPercent();

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div
          className={cn(styles.line, { [styles.outline]: progress !== 100 })}
          style={{ transform: `translate(-${progress}%, 0)` }}
        />
      </div>
      <div className={styles.counter}>
        {rightAnswers}/{totalAmount}
      </div>
    </div>
  );

  function calcProgressPercent() {
    return R.clamp(100 - (rightAnswers / totalAmount) * 100, { min: 0, max: 100 });
  }
});
