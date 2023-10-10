import React, { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';

import { useService } from 'services/servicesProvider';
import { InnerFooter } from 'pages/shared/InnerFooter/InnerFooter';
import { InnerTitle, InnerTitleProps } from 'pages/shared/InnerTitle/InnerTitle';

import styles from './InnerBlock.module.scss';

type Props = InnerTitleProps & {
  children?: ReactNode;
};

export const InnerBlock = observer(function InnerBlock({
  title,
  isSmallTitle,
  children,
  gap = 'default',
  ...rest
}: Props) {
  const { isMobile, isDesktop } = useService('settings');

  return (
    <section className={styles.root} {...rest}>
      <InnerTitle gap={gap} title={title} isSmallTitle={isSmallTitle} />
      {children}
      <InnerFooter isFixed={isDesktop} isHiddenSocials={isMobile} />
    </section>
  );
});
