import i18next, { CallbackError, i18n, TFunction } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { action, makeObservable, observable, autorun } from 'mobx';
import resourcesToBackend from 'i18next-resources-to-backend';

import type { SettingsStore } from 'services/settings';
import { IS_PRODUCTION } from 'shared/helpers/env';
import { NAME_SPACE } from 'services/i18n/constants';
import { ru } from 'services/i18n/translations/ruTranslations';

import { tKeys, TKeys } from '.';

class I18NStore {
  constructor(private settings: SettingsStore) {
    makeObservable(this);

    this.i18nextInstance = i18next.createInstance();
    this.i18nextInstance
      .use(
        resourcesToBackend((lng, ns, callback) => {
          import(
            /* webpackChunkName: "../locales/[request]" */ `../../../locales/${lng}/${ns}.json`
          )
            .then((data: Record<string, unknown>) => callback(null, data))
            .catch(e => {
              if (!IS_PRODUCTION) {
                console.warn(e);
              }
              callback(e as CallbackError, null);
            });
        }),
      )
      .use(LanguageDetector)
      .use(initReactI18next)
      .init(
        {
          resources: { ru: { [NAME_SPACE]: ru } },
          partialBundledLanguages: true,
          fallbackLng: 'ru',
          debug: false, // enable for debug
          ns: NAME_SPACE,
          defaultNS: NAME_SPACE,
          returnEmptyString: false,
          returnNull: false,
          react: {
            useSuspense: false,
          },
        },
        () => {
          autorun(() => {
            this.i18nextInstance
              .changeLanguage(this.settings.selectedLanguage)
              .then(() => this.updateTReference());
          });
        },
      );
    this.updateTReference();
  }

  public tKeys: TKeys = tKeys;

  @observable
  public t!: TFunction;

  private readonly i18nextInstance: i18n;

  @action
  private updateTReference() {
    // called to update all data that depends on translations
    this.t = this.i18nextInstance.t.bind(this.i18nextInstance);
  }
}

export { I18NStore };
