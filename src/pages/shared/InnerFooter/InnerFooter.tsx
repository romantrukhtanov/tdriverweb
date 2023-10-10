import React from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { useService } from 'services/servicesProvider';
import { Socials } from 'pages/shared/Socials/Socials';

import styles from './InnerFooter.module.scss';

type Props = {
  isFixed?: boolean;
  isHiddenSocials?: boolean;
};

export const InnerFooter = observer(function InnerFooter({ isFixed, isHiddenSocials }: Props) {
  const { t, tKeys } = useService('i18n');
  const sharedTranslations = tKeys.shared;

  return (
    <footer className={cn(styles.root, { [styles.fixed]: isFixed })}>
      {!isHiddenSocials && (
        <div className={styles.socials}>
          <Socials direction="horizontal" />
        </div>
      )}
      <div className={styles.copyright}>{t(sharedTranslations.copyright)}</div>
    </footer>
  );
});
