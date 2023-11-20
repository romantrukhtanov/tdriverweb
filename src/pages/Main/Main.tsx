import React from 'react';
import { animated } from '@react-spring/web';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { useService } from 'services/servicesProvider';
import { Socials } from 'pages/shared/Socials/Socials';
import { Policeman } from 'shared/view/components/Policeman';
import { Speedometer } from 'shared/view/components/Speedometer';
import { useSpringOnce, getDefaultConfig } from 'shared/animations';
import { Car } from 'shared/view/components/Car';

import { StartButton } from './StartButton/StartButton';
import styles from './Main.module.scss';

export const Main = observer(function Main() {
  const { t, tKeys } = useService('i18n');
  const { isMobile, isDesktop, selectedLanguage } = useService('settings');
  const translations = tKeys.pages.main;
  const sharedTranslations = tKeys.shared;

  const leftSpring = useSpringOnce(
    'main-left-spring',
    getDefaultConfig({ x: '-150%', duration: 1000 }),
  );
  const bottomSpring = useSpringOnce(
    'main-bottom-spring',
    getDefaultConfig({ y: '150%', duration: 1000 }),
  );
  const bottomSmallSpring = useSpringOnce(
    'main-bottom-small-spring',
    getDefaultConfig({ y: '30%', duration: 1000 }),
  );
  const topSpring = useSpringOnce(
    'main-top-spring',
    getDefaultConfig({ y: '-100%', duration: 1000 }),
  );
  const opacitySpring = useSpringOnce(
    'main-opacity-spring',
    getDefaultConfig({ opacity: 0, duration: 1000 }),
  );

  return (
    <animated.section className={styles.root} style={opacitySpring}>
      <div className={styles.titleWrapper}>
        <animated.div style={opacitySpring}>
          <Car />
        </animated.div>
        <animated.h1
          className={cn(styles.title, { [styles.small]: selectedLanguage === 'uzk' })}
          style={isMobile ? undefined : bottomSmallSpring}
        >
          {t(translations.title)}
        </animated.h1>
      </div>
      <animated.div className={styles.socials} style={leftSpring}>
        <Socials direction={isMobile ? 'horizontal' : 'vertical'} />
      </animated.div>
      <animated.div className={styles.policeman} style={bottomSpring}>
        <Policeman />
      </animated.div>
      {isDesktop && (
        <div className={styles.copyright}>
          <animated.div style={topSpring}>{t(sharedTranslations.copyright)}</animated.div>
        </div>
      )}
      {isDesktop && (
        <animated.div className={styles.speedometer} style={opacitySpring}>
          <Speedometer />
        </animated.div>
      )}
      <footer className={styles.footer}>
        <animated.div style={bottomSpring}>
          <StartButton />
        </animated.div>
        {isMobile && <div className={styles.copyright}>{t(sharedTranslations.copyright)}</div>}
      </footer>
    </animated.section>
  );
});
