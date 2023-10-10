import React from 'react';
import { observer } from 'mobx-react-lite';

import { useService } from 'services';
import * as M from 'services/questions/mobx/model';
import { useURLParams } from 'pages/shared/hooks/useURLParams';

import styles from './Title.module.scss';

export const Title = observer(function Title() {
  const { ticketID, category } = useURLParams();

  const { t, tKeys } = useService('i18n');
  const translations = tKeys.pages;
  const sharedTranslations = tKeys.shared;

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{renderTitle()}</h2>
    </div>
  );

  function renderTitle() {
    if (ticketID) {
      return t(translations.tickets.ticket, { ticketNumber: ticketID });
    }

    if (category) {
      return t(translations.categories.list[category as M.Category]);
    }

    return t(sharedTranslations.exam);
  }
});
