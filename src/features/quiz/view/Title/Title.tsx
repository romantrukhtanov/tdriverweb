import React from 'react';
import { observer } from 'mobx-react-lite';
import Marquee from 'react-fast-marquee';

import { useService } from 'services';
import * as M from 'services/questions/mobx/model';
import { useURLParams } from 'pages/shared/hooks/useURLParams';

import styles from './Title.module.scss';

type Props = {
  playMarquee?: boolean;
};

export const Title = observer(function Title({ playMarquee = false }: Props) {
  const { ticketID, category } = useURLParams();

  const { t, tKeys } = useService('i18n');
  const translations = tKeys.pages;
  const sharedTranslations = tKeys.shared;

  return (
    <div className={styles.root}>
      <Marquee className={styles.marquee} play={playMarquee} loop={0} speed={50} delay={0.25}>
        <h2 className={styles.title}>{renderTitle()}</h2>
      </Marquee>
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
