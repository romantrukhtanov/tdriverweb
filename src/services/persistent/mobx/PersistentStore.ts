/* eslint-disable ban/ban */
import { observable, makeObservable, action } from 'mobx';
import * as R from 'remeda';

import { IS_PRODUCTION } from 'shared/helpers/env';

import { LOCAL_SETTINGS, PERSISTENT_KEYS, PREFIX_PERSISTENT_KEY } from '../constants';
import type { GetItem, PersistentKeys, PersistentTypes, SetItem } from '../model';
import { migration } from '../migration';

export class PersistentStore {
  constructor() {
    makeObservable(this);

    window.addEventListener('storage', this.updater);

    migration(this.setItem, this.getItem);
  }

  @observable private _usedProperties = new Map<PersistentKeys, PersistentTypes[PersistentKeys]>();

  private updater = (event: StorageEvent): void => {
    if (event.key === null) {
      PERSISTENT_KEYS.forEach(subscription => this.removePersistent(subscription));
      return;
    }

    const persistentKey = event.key.substring(PREFIX_PERSISTENT_KEY.length);

    if (!PERSISTENT_KEYS.has(persistentKey)) {
      return;
    }

    const subscriptionField = PERSISTENT_KEYS.get(persistentKey);
    if (!subscriptionField) {
      return;
    }

    if (event.newValue === null) {
      this.removePersistent(subscriptionField);
      return;
    }

    if (event.newValue !== event.oldValue) {
      try {
        const convertedValue: PersistentTypes[PersistentKeys] = JSON.parse(event.newValue);
        this.setPersistent(subscriptionField, convertedValue);
      } catch {
        this.setPersistent(subscriptionField, event.newValue);
      }
    }
  };

  @action.bound
  public removePersistent(key: PersistentKeys) {
    const { key: storageKey, defaultValue } = LOCAL_SETTINGS[key];

    this._usedProperties.set(key, defaultValue ?? null);
    localStorage.removeItem(this.getKeyWithPrefix(storageKey));
  }

  @action.bound
  public setPersistent<T extends PersistentKeys>(key: T, newValue: PersistentTypes[T]) {
    const { key: storageKey, validator } = LOCAL_SETTINGS[key];

    if (!validator(newValue)) {
      if (!IS_PRODUCTION) {
        console.warn(
          `Failed to set new value for key "${key}" because value is invalid. New value -`,
          newValue,
        );
      }
      return;
    }

    const isValuesEquals =
      this._usedProperties.has(key) &&
      R.equals(newValue, this._usedProperties.get(key) as PersistentTypes[T]);

    if (!isValuesEquals) {
      this._usedProperties.set(key, newValue);
      this.setItem(storageKey, newValue);
    }
  }

  private setItem: SetItem = (key, value) => {
    localStorage.setItem(this.getKeyWithPrefix(key), JSON.stringify(value));
  };

  private getItem: GetItem = key => {
    return localStorage.getItem(this.getKeyWithPrefix(key));
  };

  public getPersistent = <T extends PersistentKeys>(key: T): PersistentTypes[T] => {
    if (!this._usedProperties.has(key)) {
      const initialValue = this.getInitialValue(key);
      this._usedProperties.set(key, initialValue);
    }

    return this._usedProperties.get(key) as PersistentTypes[T];
  };

  private getInitialValue = <T extends PersistentKeys>(key: T): PersistentTypes[T] | null => {
    const { key: storageKey, defaultValue, validator } = LOCAL_SETTINGS[key];
    const initialDefaultValue = defaultValue || null;
    const item = this.getItem(storageKey);

    try {
      if (item) {
        const initialValue = JSON.parse(item);

        if (validator(initialValue)) {
          return initialValue;
        }
      }
    } catch {
      return initialDefaultValue;
    }

    if (initialDefaultValue) {
      this.setItem(storageKey, initialDefaultValue);
    }

    return initialDefaultValue;
  };

  private getKeyWithPrefix = (key: string): string => {
    return `${PREFIX_PERSISTENT_KEY}${key}`;
  };
}
