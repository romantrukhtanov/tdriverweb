import React from 'react';
import { observer } from 'mobx-react-lite';

import { ClockIcon, ClockRightIcon, ClockWarnIcon } from 'shared/view/components/icons';
import { useFeature } from 'features/featureProvider';

export const Clock = observer(function Clock() {
  const { wrongAnswers, questionsAmount, rightAnswers, isFinishedQuiz } = useFeature('quiz');

  if (wrongAnswers > 2 || (isFinishedQuiz && questionsAmount - rightAnswers > 2)) {
    return <ClockWarnIcon />;
  }

  if (questionsAmount - rightAnswers <= 2) {
    return <ClockRightIcon />;
  }

  return <ClockIcon />;
});
