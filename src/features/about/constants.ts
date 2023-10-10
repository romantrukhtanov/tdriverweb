import { WalletType, BankCardType } from 'features/about/model';

export const wallets: WalletType[] = [
  {
    currency: 'USDT',
    network: 'TRC20',
    address: 'TWYzkwhELa9knBSLqC5TFC8LjYMdTCfQw2',
  },
  {
    currency: 'BTC',
    network: 'BEP20',
    address: '0x31be2e9741d2f516867b49ca53ea436582fd8b77',
  },
];

export const bankCards: BankCardType[] = [
  {
    name: 'UZCARD',
    currency: 'UZS',
    address: '8600120448630965',
  },
  {
    name: 'UZCARD',
    currency: 'UZS',
    address: '8600490460476849',
  },
];
