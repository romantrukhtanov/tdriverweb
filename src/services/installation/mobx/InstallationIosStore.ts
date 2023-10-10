import { action, makeObservable, observable } from 'mobx';

import type { Services } from 'services/servicesProvider';
import { IS_IOS } from 'shared/helpers/envPlatform';

import type { InstallationStoreImplementation } from '../model';

export class InstallationIosStore implements InstallationStoreImplementation {
  constructor(private readonly services: Services) {
    makeObservable(this);
  }

  @observable public canBeInstalled = this.services.settings.displayMode === 'browser';

  @observable public isShowCustomInstallPrompt = false;

  @action private setIsShowCustomInstallPrompt = (value: boolean): void => {
    this.isShowCustomInstallPrompt = value;
  };

  public showInstallPrompt = (): void => this.setIsShowCustomInstallPrompt(true);

  public hideInstallPrompt = (): void => this.setIsShowCustomInstallPrompt(false);

  public static isSupported() {
    return IS_IOS;
  }
}
