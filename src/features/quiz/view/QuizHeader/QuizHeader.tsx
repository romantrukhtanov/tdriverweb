import React from 'react';
import { observer } from 'mobx-react-lite';

import { useService } from 'services/servicesProvider';
import { useFeature } from 'features/featureProvider';
import { IconButton } from 'shared/view/components/IconButton';
import { CloseIcon } from 'shared/view/components/icons';

import styles from './QuizHeader.module.scss';

export const QuizHeader = observer(function QuizHeader() {
  const { isMobile } = useService('settings');

  const { setIsShowQuestionMark, setIsGoToMainPage } = useFeature('quiz');

  return (
    <>
      <header className={styles.root}>
        <div className={styles.logo}>
          <IconButton
            className={styles.extraIcon}
            color="secondary"
            size={isMobile ? 'medium' : 'large'}
            onClick={() => {
              setIsGoToMainPage(true);
              setIsShowQuestionMark(true);
            }}
          >
            TD
          </IconButton>
        </div>
        <div className={styles.close}>
          <IconButton
            className={styles.extraIcon}
            color="secondary"
            size={isMobile ? 'medium' : 'large'}
            onClick={() => {
              setIsGoToMainPage(false);
              setIsShowQuestionMark(true);
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </header>
    </>
  );
});
