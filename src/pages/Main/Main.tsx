import React from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { useService } from 'services/servicesProvider';
import { Socials } from 'pages/shared/Socials/Socials';
import { Policeman } from 'shared/view/components/Policeman';
import { Speedometer } from 'shared/view/components/Speedometer';
import { Car } from 'shared/view/components/Car';

import { StartButton } from './StartButton/StartButton';
import styles from './Main.module.scss';

export const Main = observer(function Main() {
  const { t, tKeys } = useService('i18n');
  const { isMobile, isDesktop, selectedLanguage } = useService('settings');
  const translations = tKeys.pages.main;
  const sharedTranslations = tKeys.shared;

  return (
    <section className={styles.root}>
      <div className={styles.titleWrapper}>
        <Car />
        <h1 className={cn(styles.title, { [styles.small]: selectedLanguage === 'uzk' })}>
          {t(translations.title)}
        </h1>
      </div>
      <div className={styles.socials}>
        <Socials direction={isMobile ? 'horizontal' : 'vertical'} />
      </div>
      <div className={styles.policeman}>
        <Policeman />
      </div>
      {isDesktop && <div className={styles.copyright}>{t(sharedTranslations.copyright)}</div>}
      {isDesktop && (
        <div className={styles.speedometer}>
          <Speedometer />
        </div>
      )}
      <footer className={styles.footer}>
        <StartButton />
        {isMobile && <div className={styles.copyright}>{t(sharedTranslations.copyright)}</div>}
      </footer>
    </section>
  );
});
