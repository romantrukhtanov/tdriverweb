import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { useService } from 'services/servicesProvider';
import { useFeature } from 'features/featureProvider';
import { Button } from 'shared/view/components/Button';
import { routes } from 'pages/routes';

import styles from './StartButton.module.scss';

export const StartButton = observer(function StartButton() {
  const { t, tKeys } = useService('i18n');
  const { resetQuiz } = useFeature('quiz');
  const sharedTranslations = tKeys.shared;
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <Button fullWidth onClick={handleClick}>
        {t(sharedTranslations.startTest)}
      </Button>
    </div>
  );

  function handleClick() {
    resetQuiz();
    navigate(routes.quiz.getRoutePath());
  }
});
