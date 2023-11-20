import React, { useLayoutEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { animated, useSpring } from '@react-spring/web';
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
import { getDefaultConfig } from 'shared/animations';

import { ResultsIcon } from './ResultsIcon/ResultsIcon';
import styles from './Results.module.scss';

type Props = {
  redirectToPage: string;
  redirectToQuiz(ticket: string): string;
};

export const Results = observer(function Results({ redirectToQuiz, redirectToPage }: Props) {
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

  const redirectToQuizPath = redirectToQuiz(ticketID || category || '/');

  const { redirect: quizRedirect } = useRedirect(redirectToQuizPath);
  const { redirect: pageRedirect } = useRedirect(redirectToPage);

  useLayoutEffect(() => {
    if (!questions.length) {
      quizRedirect();
    }
  }, [questions]); // eslint-disable-line react-hooks/exhaustive-deps

  const translations = tKeys.pages.results;
  const sharedTranslations = tKeys.shared;

  const leftSpring = useSpring(getDefaultConfig({ x: '-10%', duration: 1000 }));

  const opacitySpring = useSpring(getDefaultConfig({ duration: 1000 }));

  const iconSpring = useSpring(getDefaultConfig({ x: '20%', duration: 750 }));

  return (
    <animated.div className={styles.root} style={opacitySpring}>
      <PageHeader />
      <main className={styles.main}>
        <animated.div style={isMobile ? opacitySpring : leftSpring}>
          <InnerTitle title={t(translations.title)} gap="medium" />
        </animated.div>

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

            <div className={styles.buttons}>
              <div className={styles.button}>
                <Button fullWidth onClick={handleRepeatClick}>
                  {t(sharedTranslations.repeat)}
                </Button>
              </div>

              <div className={styles.button}>
                <Button fullWidth onClick={handleClick}>
                  {t(sharedTranslations.goToAnswers)}
                </Button>
              </div>
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
          <animated.div className={styles.icon} style={iconSpring}>
            <ResultsIcon />
          </animated.div>
        )}
      </main>
      <QuizFooter
        buttons={[
          {
            text: t(sharedTranslations.close),
            onClick: goBackToPage,
          },
        ]}
        withCopyright={isMobile}
      />
    </animated.div>
  );

  function goToQuiz() {
    if (redirectToQuizPath) {
      quizRedirect();
    }
  }

  function goBackToPage() {
    if (redirectToPage) {
      pageRedirect();
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
