import { useContext, createContext } from 'react';

import { SettingsStore } from 'services/settings';
import { I18NStore } from 'services/i18n/I18NStore';
import { WakeUp } from 'services/wakeUp/WakeUp';
import { InstallationStore } from 'services/installation/mobx/InstallationStore';
import { OnlineStore } from 'services/online/mobx/OnlineStore';
import { PersistentStore } from 'services/persistent';
import { DateTimeStore } from 'services/datetime';
import { QuestionsStore } from 'services/questions';

import { useI18n } from './i18n';

export class Services {
  readonly persistent = new PersistentStore();
  readonly settings = new SettingsStore(this.persistent);
  readonly i18n = new I18NStore(this.settings);
  readonly wakeUp = new WakeUp();
  readonly online = new OnlineStore();
  readonly installation = new InstallationStore(this);
  readonly datetime = new DateTimeStore(this);
  readonly questions = new QuestionsStore(this);
}

const servicesContext = createContext<Services | null>(null);
const ServicesProvider = servicesContext.Provider;

/* eslint-disable react-hooks/rules-of-hooks */
function useService(serviceName: 'i18n'): ReturnType<typeof useI18n>;
function useService<T extends keyof Services>(serviceName: T): Services[T];
function useService<T extends keyof Services>(serviceName: T | 'i18n') {
  if (serviceName === 'i18n') {
    // i18n lib manages state by itself; i18n functionality must be received via its hook
    return useI18n();
  }
  const context = useContext(servicesContext);
  if (context) {
    return context[serviceName];
  }
  throw Error('Service Provider or services in Service Provider are not provided!');
}
/* eslint-enable */

export { useService, ServicesProvider };
