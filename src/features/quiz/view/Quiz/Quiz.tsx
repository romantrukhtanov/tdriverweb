import React from 'react';
import { observer } from 'mobx-react-lite';

import { useFeature } from 'features/featureProvider';
import { useResetScroll } from 'shared/view/hooks/useResetScroll';

import styles from './Quiz.module.scss';
import { QuizLayout } from './QuizLayout/QuizLayout';

type Props = {
  redirectTo?: string;
};

export const Quiz = observer(function Quiz({ redirectTo }: Props) {
  const { currentIndex } = useFeature('quiz');

  const elementRef = useResetScroll([currentIndex]);

  return (
    <div className={styles.root} ref={elementRef}>
      <QuizLayout redirectTo={redirectTo} />
    </div>
  );
});
