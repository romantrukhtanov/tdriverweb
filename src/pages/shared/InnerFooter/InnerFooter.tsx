import React from 'react';
import { observer } from 'mobx-react-lite';
import { animated } from '@react-spring/web';
import cn from 'classnames';

import { useService } from 'services/servicesProvider';
import { Socials } from 'pages/shared/Socials/Socials';
import { getDefaultConfig, useSpringOnce } from 'shared/animations';

import styles from './InnerFooter.module.scss';

type Props = {
  isFixed?: boolean;
  isHiddenSocials?: boolean;
};

export const InnerFooter = observer(function InnerFooter({ isFixed, isHiddenSocials }: Props) {
  const { t, tKeys } = useService('i18n');
  const sharedTranslations = tKeys.shared;

  const spring = useSpringOnce(
    'inner-footer',
    getDefaultConfig({ y: '100%', duration: 1000, opacity: 1 }),
  );

  return (
    <animated.footer className={cn(styles.root, { [styles.fixed]: isFixed })} style={spring}>
      {!isHiddenSocials && (
        <div className={styles.socials}>
          <Socials direction="horizontal" />
        </div>
      )}
      <div className={styles.copyright}>{t(sharedTranslations.copyright)}</div>
    </animated.footer>
  );
});
