import React from 'react';
import { Trans } from 'react-i18next';
import { animated } from '@react-spring/web';
import { observer } from 'mobx-react-lite';

import { useService } from 'services/servicesProvider';
import { InnerBlock } from 'pages/shared/InnerBlock/InnerBlock';
import { Wallet } from 'features/about/view/Wallet/Wallet';
import { BankCard } from 'features/about/view/BankCard/BankCard';
import { getDefaultConfig, useSpringOnce } from 'shared/animations/useSpringOnce';
import { wallets, bankCards } from 'features/about/constants';

import { AboutIcon } from './AboutIcon/AboutIcon';
import styles from './About.module.scss';

export const About = observer(function About() {
  const { t, tKeys } = useService('i18n');
  const { selectedLanguage } = useService('settings');
  const translations = tKeys.pages.about;

  const bottomSpring = useSpringOnce(
    'about-bottom-spring',
    getDefaultConfig({ y: '50%', duration: 750 }),
  );

  const iconSpring = useSpringOnce('about-icon', getDefaultConfig({ x: '20%', duration: 750 }));

  return (
    <InnerBlock
      title={t(translations.title)}
      gap="small"
      isSmallTitle={selectedLanguage === 'uzk'}
      aria-label="about"
    >
      <div className={styles.root}>
        <div className={styles.content}>
          <animated.div className={styles.description} style={bottomSpring}>
            <Trans
              className={styles.text}
              i18nKey={translations.description}
              tOptions={{ transKeepBasicHtmlNodesFor: ['br'] }}
            />
          </animated.div>
          <animated.div className={styles.supportProject} style={bottomSpring}>
            <div className={styles.supportProjectTitle}>
              <p className={styles.text}>{t(translations.supportProject)}</p>
            </div>
            <div className={styles.donate}>
              {bankCards.map(bankCard => (
                <BankCard key={`${bankCard.name}_${bankCard.address}`} bankCard={bankCard} />
              ))}
            </div>
          </animated.div>
          <animated.div className={styles.wallets} style={bottomSpring}>
            <div className={styles.walletsTitle}>
              <p className={styles.text}>{t(translations.cryptoWallets)}</p>
            </div>
            <div className={styles.walletsList}>
              {wallets.map(wallet => (
                <Wallet key={`${wallet.currency}_${wallet.address}`} wallet={wallet} />
              ))}
            </div>
          </animated.div>
        </div>

        <animated.div className={styles.icon} style={iconSpring}>
          <AboutIcon />
        </animated.div>
      </div>
    </InnerBlock>
  );
});
