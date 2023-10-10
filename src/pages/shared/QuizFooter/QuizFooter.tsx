import React from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { useService } from 'services';
import { useFeature } from 'features/featureProvider';
import { Button } from 'shared/view/components/Button';
import { Countdown } from 'shared/view/components/Countdown';
import { Progress } from 'features/quiz/view/Progress/Progress';
import { Clock } from 'features/quiz/view/Clock/Clock';
import { useURLParams } from 'pages/shared/hooks/useURLParams';
import { useRedirectToResults } from 'pages/shared/hooks/useRedirectToResults';
import { ClockIcon, InfinityIcon } from 'shared/view/components/icons';

import styles from './QuizFooter.module.scss';

type ButtonItem = {
  text: string;
  onClick(): void;
};

type Props = {
  buttons: ButtonItem[];
  withCopyright?: boolean;
  disabled?: boolean;
};

export const QuizFooter = observer(function QuizFooter({
  buttons,
  withCopyright,
  disabled,
}: Props) {
  const { ticketID, category } = useURLParams();
  const { redirectToResults } = useRedirectToResults();

  const { isDesktop } = useService('settings');
  const { t, tKeys } = useService('i18n');
  const {
    finishedAt,
    completedAt,
    rightAnswers,
    questionsAmount,
    isFinishedQuiz,
    checkAndSetFinishedQuiz,
  } = useFeature('quiz');

  const sharedTranslations = tKeys.shared;

  const isRenderTimer = !ticketID && !category;

  return (
    <footer className={cn(styles.root, { [styles.withCopyright]: withCopyright })}>
      {isDesktop && renderProgress()}

      <div className={styles.buttonsWrapper}>
        {buttons.map(button => (
          <Button key={button.text} fullWidth onClick={button.onClick} disabled={disabled}>
            {button.text}
          </Button>
        ))}
      </div>

      {withCopyright && <div className={styles.copyright}>{t(sharedTranslations.copyright)}</div>}

      {isDesktop && isRenderTimer ? renderTimer() : isDesktop && renderInfinityBlock()}
    </footer>
  );

  function renderInfinityBlock() {
    return (
      <div className={styles.timer}>
        <InfinityIcon />
        <ClockIcon />
      </div>
    );
  }

  function renderProgress() {
    return <Progress rightAnswers={rightAnswers} totalAmount={questionsAmount} />;
  }

  function renderTimer() {
    return (
      <div className={styles.timer}>
        <Countdown
          finishedAt={finishedAt}
          completedAt={completedAt}
          isFinished={isFinishedQuiz}
          showOptions={{ minutes: true, seconds: true }}
          onComplete={() => {
            checkAndSetFinishedQuiz(true);
            redirectToResults();
          }}
        />
        {renderClock()}
      </div>
    );
  }

  function renderClock() {
    return (
      <div className={styles.clock}>
        <Clock />
      </div>
    );
  }
});
