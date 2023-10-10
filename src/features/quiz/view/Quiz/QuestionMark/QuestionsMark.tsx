import React from 'react';
import { observer } from 'mobx-react-lite';

import { useService } from 'services/servicesProvider';
import { QuestionMarkIcon } from 'shared/view/components/icons';
import { Button } from 'shared/view/components/Button';

import styles from './QuestionsMark.module.scss';

type Props = {
  text: string;
  onSuccess(): void;
  onReject(): void;
};

export const QuestionsMark = observer(function QuestionsMark({ text, onSuccess, onReject }: Props) {
  const { t, tKeys } = useService('i18n');

  const sharedTranslations = tKeys.shared;

  return (
    <div className={styles.root}>
      <div className={styles.titleWrap}>
        <h2 className={styles.title}>{text}</h2>
      </div>
      <div className={styles.icon}>
        <QuestionMarkIcon />
      </div>
      <div className={styles.buttons}>
        <Button fullWidth onClick={onSuccess}>
          {t(sharedTranslations.yes)}
        </Button>
        <Button fullWidth onClick={onReject}>
          {t(sharedTranslations.no)}
        </Button>
      </div>
    </div>
  );
});
