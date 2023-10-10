import React, { ReactNode } from 'react';
import cn from 'classnames';

import { IconButton } from 'shared/view/components/IconButton';
import { TelegramIcon, InstagramIcon, MailIcon, FaceBookIcon } from 'shared/view/components/icons';

import styles from './Socials.module.scss';

type SocialName = 'telegram' | 'facebook' | 'instagram' | 'mail';

type SocialData = {
  id: SocialName;
  link: string;
};

const SocialIconMap: Record<SocialName, ReactNode> = {
  telegram: <TelegramIcon />,
  instagram: <InstagramIcon />,
  facebook: <FaceBookIcon />,
  mail: <MailIcon />,
};

const socialsData: SocialData[] = [
  {
    id: 'telegram',
    link: 'https://t.me/tr_roman',
  },
  {
    id: 'instagram',
    link: 'https://instagram.com/roman_trukhtanov',
  },
  {
    id: 'facebook',
    link: 'https://www.facebook.com/romantrukhtanov',
  },
  {
    id: 'mail',
    link: 'mailto:romantrukhtanov@gmail.com',
  },
];

type Props = {
  direction: 'vertical' | 'horizontal';
};

export const Socials = ({ direction = 'horizontal' }: Props) => {
  return (
    <div className={cn(styles.root, styles[direction])}>{socialsData.map(renderSocialItem)}</div>
  );

  function renderSocialItem(socialData: SocialData) {
    return (
      <IconButton key={socialData.id} size="large" onClick={makeSocialLinkClickHandler(socialData)}>
        {SocialIconMap[socialData.id]}
      </IconButton>
    );
  }

  function makeSocialLinkClickHandler({ link, id }: SocialData) {
    return (e: React.MouseEvent) => {
      e.preventDefault();

      if (id === 'mail') {
        window.location.href = link;
      } else {
        window.open(link, '_blank');
      }
    };
  }
};
