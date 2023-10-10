import type { LocalSettingsType } from './model';
import { themeValidator, languageValidator, stringValidator } from './validators';
import { PersistentKeys } from './model';

export const LOCAL_SETTINGS: LocalSettingsType = {
  appId: {
    key: 'appId',
    defaultValue: 'tdriver',
    validator: stringValidator,
  },
  theme: {
    key: 'theme',
    defaultValue: 'day',
    validator: themeValidator,
  },
  selectedLanguage: {
    key: 'lng',
    defaultValue: 'ru',
    validator: languageValidator,
  },
};

export const PERSISTENT_KEYS = new Map<string, PersistentKeys>(
  Object.entries(LOCAL_SETTINGS).map(([localSettingsKey, localSettingsValue]) => [
    localSettingsValue.key,
    localSettingsKey as PersistentKeys,
  ]),
);

export const IS_MIGRATED_KEY = 'isMigrated';
export const PREFIX_PERSISTENT_KEY = 'bg.';
