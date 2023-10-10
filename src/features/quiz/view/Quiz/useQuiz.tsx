import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as R from 'remeda';

import { add, date, UnitOfTime } from 'services/datetime';
import type * as M from 'services/questions/mobx/model';

type Props = {
  questionsData: M.Question[];
};

export function useQuiz({ questionsData }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const questionsAmount = useMemo(() => questionsData.length, [questionsData]);

  const finishDate = useMemo(
    () => add(date(), { [UnitOfTime.MINUTES]: 20, [UnitOfTime.SECONDS]: 1 }),
    [],
  );

  const [currentIndex, setCurrentIndex] = useState(getStartQuestionIndex());

  const [questions, setQuestions] = useState<M.Question[]>(questionsData);
  const [question, setLocalQuestion] = useState<M.Question>(questions[currentIndex]);
  const [rightAnswers, setRightAnswers] = useState<number>(0);

  return {
    question,
    questions,
    rightAnswers,
    setRightAnswers,
    setQuestion,
    setNextQuestion,
    updateQuestion,
    currentIndex,
    setCurrentIndex,
    finishDate,
  };

  function setQuestionsSearchParams(index: number) {
    if (!R.isNumber(index)) {
      return;
    }

    setSearchParams({
      q: `${index + 1}`,
    });
  }

  function setQuestion(nextIndex: number) {
    setCurrentIndex(nextIndex);
    setLocalQuestion(questions[nextIndex]);
    setQuestionsSearchParams(nextIndex);
  }

  function setNextQuestion() {
    const nextIndex = getNextQuestionIndex();

    setQuestionsSearchParams(nextIndex);
    setCurrentIndex(nextIndex);
    setLocalQuestion(questions[nextIndex]);
  }

  function getStartQuestionIndex() {
    const searchQuestionNumber = Number(searchParams.get('q'));

    if (searchQuestionNumber) {
      return searchQuestionNumber > questionsAmount ? 0 : searchQuestionNumber - 1;
    }

    return 0;
  }

  function getNextQuestionIndex() {
    const nextIndex = questions.findIndex(q => !R.isNumber(q.answeredIndex));

    if (nextIndex > 0) {
      return nextIndex;
    }

    return 0;
  }

  function updateQuestion(updatedQuestion: M.Question, questionIndex: number) {
    setQuestions([
      ...questions.slice(0, questionIndex),
      updatedQuestion,
      ...questions.slice(questionIndex + 1),
    ]);
    setLocalQuestion(updatedQuestion);
  }
}
