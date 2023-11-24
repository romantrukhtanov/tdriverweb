import React from 'react';
import { observer } from 'mobx-react-lite';

import { useService } from 'services';
import { CopyIcon } from 'shared/view/components/icons';
import { Tooltip } from 'shared/view/components/Tooltip';
import { useCopyToClipboard } from 'shared/helpers/clipboard';
import type { BankCardType } from 'features/about/model';

import styles from './BankCard.module.scss';

type Props = {
  bankCard: BankCardType;
};

export const BankCard = observer(function Wallet({ bankCard }: Props) {
  const { t, tKeys } = useService('i18n');
  const sharedTranslations = tKeys.shared;

  const [isCopiedAddress, copyAddress] = useCopyToClipboard(false, {
    timeout: 750,
  });

  return (
    <Tooltip open={isCopiedAddress} message={t(sharedTranslations.copied)}>
      <button
        className={styles.root}
        onClick={() => copyAddress(bankCard.address, true)}
        type="button"
      >
        <div className={styles.icon}>
          <CopyIcon className={styles.svg} />
        </div>
        <p className={styles.address}>
          {bankCard.name} ({bankCard.currency}):{' '}
          <span className={styles.addressText}>{cardAddressFormat(bankCard.address)}</span>
        </p>
      </button>
    </Tooltip>
  );

  function cardAddressFormat(address: string) {
    return address.replace(/(.{4})/g, '$1 ');
  }
});
