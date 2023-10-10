import React from 'react';
import { Trans } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import { useService } from 'services/servicesProvider';
import { InnerBlock } from 'pages/shared/InnerBlock/InnerBlock';
import { Button } from 'shared/view/components/Button';
import { Wallet } from 'features/about/view/Wallet/Wallet';
import { BankCard } from 'features/about/view/BankCard/BankCard';
import { wallets, bankCards } from 'features/about/constants';

import { AboutIcon } from './AboutIcon/AboutIcon';
import styles from './About.module.scss';

export const About = observer(function About() {
  const { t, tKeys } = useService('i18n');
  const { selectedLanguage } = useService('settings');
  const translations = tKeys.pages.about;

  return (
    <InnerBlock
      title={t(translations.title)}
      gap="small"
      isSmallTitle={selectedLanguage === 'uzk'}
      aria-label="about"
    >
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.description}>
            <Trans
              className={styles.text}
              i18nKey={translations.description}
              tOptions={{ transKeepBasicHtmlNodesFor: ['br'] }}
            />
          </div>
          <div className={styles.supportProject}>
            <div className={styles.supportProjectTitle}>
              <p className={styles.text}>{t(translations.supportProject)}</p>
            </div>
            <div className={styles.donate}>
              {bankCards.map(bankCard => (
                <BankCard key={`${bankCard.name}_${bankCard.address}`} bankCard={bankCard} />
              ))}
            </div>
          </div>
          <div className={styles.wallets}>
            <div className={styles.walletsTitle}>
              <p className={styles.text}>{t(translations.cryptoWallets)}</p>
            </div>
            <div className={styles.walletsList}>
              {wallets.map(wallet => (
                <Wallet key={`${wallet.currency}_${wallet.address}`} wallet={wallet} />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.icon}>
          <AboutIcon />
        </div>
      </div>
    </InnerBlock>
  );
});
