import React from 'react';
import { observer } from 'mobx-react-lite';

import { MAX_WRONG_ANSWERS } from 'services/questions/constants';
import { ClockIcon, ClockRightIcon, ClockWarnIcon } from 'shared/view/components/icons';
import { useFeature } from 'features/featureProvider';

export const Clock = observer(function Clock() {
  const { wrongAnswers, questionsAmount, rightAnswers, isFinishedQuiz } = useFeature('quiz');

  if (
    wrongAnswers > MAX_WRONG_ANSWERS ||
    (isFinishedQuiz && questionsAmount - rightAnswers > MAX_WRONG_ANSWERS)
  ) {
    return <ClockWarnIcon />;
  }

  if (questionsAmount - rightAnswers <= MAX_WRONG_ANSWERS) {
    return <ClockRightIcon />;
  }

  return <ClockIcon />;
});
