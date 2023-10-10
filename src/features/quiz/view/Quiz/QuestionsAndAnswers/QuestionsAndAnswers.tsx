import React from 'react';
import { observer } from 'mobx-react-lite';

import { useFeature } from 'features/featureProvider';
import { useURLParams } from 'pages/shared/hooks/useURLParams';
import { Question } from 'features/quiz/view/Question/Question';
import { Answers } from 'features/quiz/view/Answers/Answers';
import type * as M from 'services/questions/mobx/model';

import styles from './QuestionsAndAnswers.module.scss';

export const QuestionsAndAnswers = observer(function QuestionsAndAnswers() {
  const { ticketID, category } = useURLParams();

  const {
    activeQuestion,
    updateActiveQuestion,
    isFinishedQuiz,
    isActiveQuestionAnswered,
    checkAndSetFinishedQuiz,
  } = useFeature('quiz');

  const { questionData } = activeQuestion;

  const answersKey = ticketID ?? category ?? 'quiz';

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Question question={questionData.question} />

        <Answers
          answersKey={answersKey}
          question={activeQuestion}
          isAnswered={isActiveQuestionAnswered}
          disabled={isActiveQuestionAnswered || isFinishedQuiz}
          onClick={handleAnswerClick}
        />
      </div>
    </div>
  );

  function handleAnswerClick(answeredIndex: number) {
    const isRightAnswer = questionData.rightAnswer - 1 === answeredIndex;

    const updatedQuestion: M.Question = {
      ...activeQuestion,
      answeredIndex,
      status: isRightAnswer ? 'right' : 'wrong',
    };

    updateActiveQuestion(updatedQuestion);
    checkAndSetFinishedQuiz();
  }
});
