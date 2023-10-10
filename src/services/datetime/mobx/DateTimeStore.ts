/* eslint-disable no-restricted-imports */
import { action, autorun, computed, makeObservable, observable } from 'mobx';

import type { Language } from 'services/i18n';
import type { Services } from 'services';

import { TIMEZONE_LOCAL } from '../constants';
import { LocaleType } from '../model';

/* eslint-disable @typescript-eslint/naming-convention */
const langsDict: Record<Language, (() => Promise<{ default: LocaleType }>) | null> = {
  ru: () => import(/* webpackChunkName: "date-fns-locales/ru" */ 'date-fns/locale/ru'),
  uz: () => import(/* webpackChunkName: "date-fns-locales/nl" */ 'date-fns/locale/uz'),
  uzk: () => import(/* webpackChunkName: "date-fns-locales/nl" */ 'date-fns/locale/uz'),
};
/* eslint-enable @typescript-eslint/naming-convention */

export class DateTimeStore {
  constructor(private readonly services: Services) {
    makeObservable(this);

    autorun(() => {
      const { selectedLanguage } = this.services.settings;
      langsDict[selectedLanguage]?.().then(({ default: locale }) => {
        this.setLocaleItem(selectedLanguage, locale);
      });
    });
  }

  @observable public localTimeZone = TIMEZONE_LOCAL;

  @observable.struct private localesDict: Partial<Record<Language, Locale>> = {};

  @computed
  public get locale(): Locale | undefined {
    return this.localesDict[this.services.settings.selectedLanguage];
  }

  @action
  private setLocaleItem(language: Language, locale: Locale) {
    this.localesDict[language] = locale;
  }
}
