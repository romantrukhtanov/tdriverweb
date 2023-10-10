import React from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useService } from 'services/servicesProvider';

import styles from './Ticket.module.scss';

type Props = {
  ticketNumber: number;
  onClick?(): void;
};

export const Ticket = observer(function Ticket({ ticketNumber, onClick }: Props) {
  const { t, tKeys } = useService('i18n');
  const translations = tKeys.pages.tickets;

  return (
    <NavLink className={styles.root} to={`/tickets/${ticketNumber}`} onClick={onClick}>
      <p className={styles.ticketNumber}>
        {t(translations.ticket, {
          ticketNumber,
        })}
      </p>
    </NavLink>
  );
});
