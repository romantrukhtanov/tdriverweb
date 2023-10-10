import React from 'react';
import { observer } from 'mobx-react-lite';

import styles from './Question.module.scss';

type Props = {
  question: string;
};

export const Question = observer(function Question({ question }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>{question}</h3>
      </div>
    </div>
  );
});
