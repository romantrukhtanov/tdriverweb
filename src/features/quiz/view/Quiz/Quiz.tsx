import React from 'react';
import { observer } from 'mobx-react-lite';

import { useFeature } from 'features/featureProvider';
import { useResetScroll } from 'shared/view/hooks/useResetScroll';

import styles from './Quiz.module.scss';
import { QuizLayout } from './QuizLayout/QuizLayout';

type Props = {
  playMarquee?: boolean;
  redirectTo?: string;
};

export const Quiz = observer(function Quiz({ playMarquee, redirectTo }: Props) {
  const { currentIndex } = useFeature('quiz');

  const elementRef = useResetScroll([currentIndex]);

  return (
    <div className={styles.root} ref={elementRef}>
      <QuizLayout playMarquee={playMarquee} redirectTo={redirectTo} />
    </div>
  );
});
