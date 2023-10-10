import React from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import type * as M from 'services/questions/mobx/model';

import styles from './Answer.module.scss';

type Props = {
  answer: string;
  disabled?: boolean;
  status: M.QuestionStatus;
  onClick?(): void;
};

export const Answer = observer(function Answer({
  answer,
  status = 'default',
  disabled,
  onClick,
}: Props) {
  return (
    <button
      className={cn(styles.root, styles[status], { [styles.disabled]: disabled })}
      type="button"
      onClick={handleAnswerClick}
      disabled={disabled}
    >
      <div className={styles.letter} />
      <p className={styles.answer}>{answer}</p>
    </button>
  );

  function handleAnswerClick() {
    onClick?.();
  }
});
