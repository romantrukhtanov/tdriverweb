import React from 'react';
import { animated } from '@react-spring/web';
import { observer } from 'mobx-react-lite';
import * as R from 'remeda';

import { useService } from 'services/servicesProvider';
import { useFeature } from 'features/featureProvider';
import { getDefaultConfig, useSpringOnce } from 'shared/animations/useSpringOnce';
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

  const spring = useSpringOnce('tickets-list', getDefaultConfig({ y: '10%', duration: 750 }));

  const iconSpring = useSpringOnce('ticket-icon', getDefaultConfig({ x: '20%', duration: 750 }));

  return (
    <InnerBlock title={t(translations.title)} gap="large" aria-label="tickets">
      <div className={styles.root}>
        <animated.ul className={styles.list} style={spring}>
          {R.range(0, ticketsAmount).map(ticket => (
            <li key={`${selectedLanguage}_${ticket}`} className={styles.item}>
              <Ticket ticketNumber={ticket + 1} onClick={handleTicketClick} />
            </li>
          ))}
        </animated.ul>
        <animated.div className={styles.icon} style={iconSpring}>
          <TicketsIcon />
        </animated.div>
      </div>
    </InnerBlock>
  );

  function handleTicketClick() {
    resetQuiz();
  }
});
