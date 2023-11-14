import React from 'react';
import { observer } from 'mobx-react-lite';

import { useFeature } from 'features/featureProvider';
import { Countdown } from 'shared/view/components/Countdown';
import { Title } from 'features/quiz/view/Title/Title';
import { Pagination } from 'features/quiz/view/Pagination/Pagination';
import { Progress } from 'features/quiz/view/Progress/Progress';
import { useURLParams } from 'pages/shared/hooks/useURLParams';
import { useRedirectToResults } from 'pages/shared/hooks/useRedirectToResults';
import { InfinityIcon } from 'shared/view/components/icons';

import styles from './MTopContent.module.scss';

type Props = {
  playMarquee?: boolean;
  onPaginationClick(num: number): void;
};

export const MTopContent = observer(function MTopContent({
  onPaginationClick,
  playMarquee,
}: Props) {
  const { ticketID, category } = useURLParams();
  const { redirectToResults } = useRedirectToResults();

  const {
    questions,
    finishedAt,
    completedAt,
    currentIndex,
    questionsAmount,
    rightAnswers,
    isFinishedQuiz,
    checkAndSetFinishedQuiz,
  } = useFeature('quiz');

  const isRenderTimer = !ticketID && !category;

  return (
    <div className={styles.root}>
      <Title playMarquee={playMarquee} />

      <div className={styles.progress}>
        {isRenderTimer ? (
          <Countdown
            completedAt={completedAt}
            finishedAt={finishedAt}
            isFinished={isFinishedQuiz}
            showOptions={{ minutes: true, seconds: true }}
            onComplete={() => {
              redirectToResults();
              checkAndSetFinishedQuiz(true);
            }}
          />
        ) : (
          <div className={styles.timer}>
            <InfinityIcon />
          </div>
        )}

        <Progress rightAnswers={rightAnswers} totalAmount={questionsAmount} />
      </div>

      <Pagination questions={questions} currentIndex={currentIndex} onClick={onPaginationClick} />
    </div>
  );
});
