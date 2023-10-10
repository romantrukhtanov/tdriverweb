import type { Theme } from 'services/settings';
import type { Language } from 'services/i18n';

export type SettingItemType<T> = {
  key: string;
  validator: (value: unknown) => value is T;
  defaultValue?: T;
};

export type PersistentTypes = {
  appId: string;
  theme: Theme;
  selectedLanguage: Language | null;
};

export type PersistentKeys = keyof PersistentTypes;

export type LocalSettingsType = {
  [K in PersistentKeys]: PersistentTypes[K] extends NonNullable<PersistentTypes[K]>
    ? SettingItemType<PersistentTypes[K]> &
        Required<Pick<SettingItemType<PersistentTypes[K]>, 'defaultValue'>>
    : SettingItemType<PersistentTypes[K]>;
};

export type SetItem = (key: string, value: unknown) => void;
export type GetItem = (key: string) => string | null;
