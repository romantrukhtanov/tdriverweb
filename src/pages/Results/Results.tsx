import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Trans } from 'react-i18next';

import { useService } from 'services/servicesProvider';
import { useFeature } from 'features/featureProvider';
import { PageHeader } from 'pages/shared/PageHeader/PageHeader';
import { InnerTitle } from 'pages/shared/InnerTitle/InnerTitle';
import { QuizFooter } from 'pages/shared/QuizFooter/QuizFooter';
import { PaginationItem } from 'shared/view/components/PaginationItem';
import { Button } from 'shared/view/components/Button';
import { CheckIcon, CrossIcon } from 'shared/view/components/icons';
import { useRedirect } from 'shared/view/hooks/useRedirect';
import { useURLParams } from 'pages/shared/hooks/useURLParams';

import { ResultsIcon } from './ResultsIcon/ResultsIcon';
import styles from './Results.module.scss';

type Props = {
  redirectTo(ticket: string): string;
};

export const Results = observer(function Results({ redirectTo }: Props) {
  const { ticketID, category } = useURLParams();

  const { t, tKeys } = useService('i18n');
  const { isDesktop, isMobile } = useService('settings');
  const {
    questions,
    questionsAmount,
    setActiveQuestion,
    rightAnswers,
    wrongAnswers,
    repeatQuiz,
    setCurrentIndex,
  } = useFeature('quiz');

  const redirectPath = redirectTo(ticketID || category || '/');

  const { redirect } = useRedirect(redirectPath);

  useEffect(() => {
    if (!questions.length) {
      redirect();
    }
  }, [questions]); // eslint-disable-line react-hooks/exhaustive-deps

  const translations = tKeys.pages.results;
  const sharedTranslations = tKeys.shared;

  return (
    <div className={styles.root}>
      <PageHeader />
      <main className={styles.main}>
        <InnerTitle title={t(translations.title)} gap="medium" />

        <div className={styles.content}>
          <div className={styles.column}>
            <div className={styles.message}>
              <h3 className={styles.messageTitle}>
                <Trans
                  i18nKey={
                    questionsAmount - rightAnswers > 2
                      ? translations.message.failure
                      : translations.message.success
                  }
                  tOptions={{ transKeepBasicHtmlNodesFor: ['br'] }}
                />
              </h3>
            </div>

            <div className={styles.results}>
              <div className={styles.resultsItem}>
                <div className={styles.resultsIcon}>
                  <CheckIcon />
                </div>
                <div className={styles.resultsText}>{t(translations.message.rightAnswers)}</div>
                <div className={styles.resultsAmount}>{rightAnswers}</div>
              </div>

              <div className={styles.resultsItem}>
                <div className={styles.resultsIcon}>
                  <CrossIcon />
                </div>
                <div className={styles.resultsText}>{t(translations.message.wrongAnswers)}</div>
                <div className={styles.resultsAmount}>{wrongAnswers}</div>
              </div>
            </div>

            <div className={styles.repeatButton}>
              <Button fullWidth onClick={handleRepeatClick}>
                {t(sharedTranslations.repeat)}
              </Button>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.pagination}>
              {questions.map(({ localIndex, status }) => (
                <PaginationItem
                  key={localIndex}
                  num={localIndex + 1}
                  status={status}
                  onClick={() => handlePaginationClick(localIndex)}
                  isLargeSize
                />
              ))}
            </div>
          </div>
        </div>

        {isDesktop && (
          <div className={styles.icon}>
            <ResultsIcon />
          </div>
        )}
      </main>
      <QuizFooter
        buttons={[
          {
            text: t(sharedTranslations.goToAnswers),
            onClick: handleClick,
          },
        ]}
        withCopyright={isMobile}
      />
    </div>
  );

  function goToQuiz() {
    if (redirectPath) {
      redirect();
    }
  }

  function handlePaginationClick(localIndex: number) {
    setCurrentIndex(localIndex);
    setActiveQuestion(questions[localIndex]);
    goToQuiz();
  }

  function handleRepeatClick() {
    repeatQuiz();
    goToQuiz();
  }

  function handleClick() {
    goToQuiz();
  }
});
