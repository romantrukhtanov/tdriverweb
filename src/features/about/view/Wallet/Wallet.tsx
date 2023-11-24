import React from 'react';
import { observer } from 'mobx-react-lite';

import { useService } from 'services';
import { CopyIcon } from 'shared/view/components/icons';
import { Tooltip } from 'shared/view/components/Tooltip';
import { useCopyToClipboard } from 'shared/helpers/clipboard';
import type { WalletType } from 'features/about/model';

import styles from './Wallet.module.scss';

type Props = {
  wallet: WalletType;
};

export const Wallet = observer(function Wallet({ wallet }: Props) {
  const { t, tKeys } = useService('i18n');
  const sharedTranslations = tKeys.shared;

  const [isCopiedAddress, copyAddress] = useCopyToClipboard(false, {
    timeout: 750,
  });

  return (
    <Tooltip open={isCopiedAddress} message={t(sharedTranslations.copied)}>
      <button
        className={styles.root}
        onClick={() => copyAddress(wallet.address, true)}
        type="button"
      >
        <div className={styles.icon}>
          <CopyIcon className={styles.svg} />
        </div>
        <p className={styles.address}>
          {wallet.currency} ({wallet.network}): {wallet.address}
        </p>
      </button>
    </Tooltip>
  );
});
