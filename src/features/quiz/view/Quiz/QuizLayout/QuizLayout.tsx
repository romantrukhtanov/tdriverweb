import React from 'react';
import { observer } from 'mobx-react-lite';

import { useService } from 'services/servicesProvider';
import { useFeature } from 'features/featureProvider';
import { QuizHeader } from 'features/quiz/view/QuizHeader/QuizHeader';
import { QuizFooter } from 'pages/shared/QuizFooter/QuizFooter';
import { Title } from 'features/quiz/view/Title/Title';
import { MTopContent } from 'features/quiz/view/Quiz/MTopContent/MTopContent';
import { useRedirectToResults } from 'pages/shared/hooks/useRedirectToResults';
import { useRedirect } from 'shared/view/hooks/useRedirect';
import { Pagination } from 'features/quiz/view/Pagination/Pagination';

import { QuestionsMark } from '../QuestionMark/QuestionsMark';
import { QuestionsAndAnswers } from '../QuestionsAndAnswers/QuestionsAndAnswers';
import styles from './QuizLayout.module.scss';

type Props = {
  redirectTo?: string;
};

export const QuizLayout = observer(function QuizLayout({ redirectTo }: Props) {
  const { redirect, navigateToMain } = useRedirect(redirectTo);
  const { redirectToResults } = useRedirectToResults();

  const { t, tKeys } = useService('i18n');
  const { isMobile } = useService('settings');

  const {
    questions,
    setActiveQuestion,
    setCurrentIndex,
    currentIndex,
    isFinishedQuiz,
    isActiveQuestionAnswered,
    setNextQuestion,
    isGoToMainPage,
    setIsGoToMainPage,
    isShowQuestionMark,
    setIsShowQuestionMark,
  } = useFeature('quiz');

  const sharedTranslations = tKeys.shared;

  return (
    <>
      <QuizHeader />
      <main className={styles.main}>
        <div className={styles.content}>
          {isMobile ? (
            <MTopContent onPaginationClick={handlePaginationClick} />
          ) : (
            <>
              <Title />
              <Pagination
                questions={questions}
                currentIndex={currentIndex}
                onClick={handlePaginationClick}
              />
            </>
          )}
          {isShowQuestionMark ? (
            <QuestionsMark
              text={t(isGoToMainPage ? sharedTranslations.goToMain : sharedTranslations.finishTest)}
              onSuccess={() => {
                if (isGoToMainPage) {
                  navigateToMain();
                } else {
                  redirect();
                }
              }}
              onReject={() => {
                setIsGoToMainPage(false);
                setIsShowQuestionMark(false);
              }}
            />
          ) : (
            <QuestionsAndAnswers />
          )}
        </div>
      </main>

      {!isShowQuestionMark && (
        <QuizFooter
          buttons={[
            {
              text: t(
                isFinishedQuiz ? sharedTranslations.goToResults : sharedTranslations.continue,
              ),
              onClick: handleContinueClick,
            },
          ]}
          disabled={!(isActiveQuestionAnswered || isFinishedQuiz)}
        />
      )}
    </>
  );

  function handlePaginationClick(num: number) {
    setCurrentIndex(num);
    setActiveQuestion(questions[num]);
  }

  function handleContinueClick() {
    if (isFinishedQuiz) {
      redirectToResults();
    } else {
      setNextQuestion();
    }
  }
});
