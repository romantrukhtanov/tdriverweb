import React from 'react';
import { observer } from 'mobx-react-lite';
import * as R from 'remeda';

import { useService } from 'services/servicesProvider';
import { useFeature } from 'features/featureProvider';
import { InnerBlock } from 'pages/shared/InnerBlock/InnerBlock';

import { Ticket } from './Ticket/Ticket';
import { TicketsIcon } from './TicketsIcon/TicketsIcon';
import styles from './Tickets.module.scss';

export const Tickets = observer(function Tickets() {
  const { t, tKeys } = useService('i18n');
  const { selectedLanguage } = useService('settings');
  const { ticketsAmount } = useService('questions');
  const { resetQuiz } = useFeature('quiz');
  const translations = tKeys.pages.tickets;

  return (
    <InnerBlock title={t(translations.title)} gap="large" aria-label="tickets">
      <div className={styles.root}>
        <ul className={styles.list}>
          {R.range(0, ticketsAmount).map(ticket => (
            <li key={`${selectedLanguage}_${ticket}`} className={styles.item}>
              <Ticket ticketNumber={ticket + 1} onClick={handleTicketClick} />
            </li>
          ))}
        </ul>
        <div className={styles.icon}>
          <TicketsIcon />
        </div>
      </div>
    </InnerBlock>
  );

  function handleTicketClick() {
    resetQuiz();
  }
});
