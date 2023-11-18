import React from 'react';
import { observer } from 'mobx-react-lite';
import { animated, useSpring } from '@react-spring/web';

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

  const spring = useSpring({
    from: {
      opacity: 0,
    },
    opacity: 1,
    delay: 300,
  });

  return (
    <animated.div className={styles.root} ref={elementRef} style={spring}>
      <QuizLayout playMarquee={playMarquee} redirectTo={redirectTo} />
    </animated.div>
  );
});
