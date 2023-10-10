import { makeObservable, computed, observable, action, autorun, runInAction } from 'mobx';
import { WebAppManifest } from 'web-app-manifest';

import { PLATFORM_ENV } from 'shared/helpers/envPlatform';
import type { Services } from 'services/servicesProvider';

import type { InstallationImplementationKind, InstallationStoreImplementation } from '../model';
import { InstallationIosStore } from './InstallationIosStore';
import { InstallationNativeStore } from './InstallationNativeStore';

export class InstallationStore {
  constructor(private readonly services: Services) {
    makeObservable(this);

    const stores = [
      {
        Store: InstallationNativeStore,
        kind: 'native',
      },
      {
        Store: InstallationIosStore,
        kind: 'iOS',
      },
    ] as const;

    const supportedStoreData = stores.find(({ Store }) => Store.isSupported());

    if (supportedStoreData) {
      this.implementation = new supportedStoreData.Store(this.services);
      this.implementationKind = supportedStoreData.kind;
    }

    autorun(() => {
      if (!this.manifestUrl) {
        runInAction(() => {
          this.manifest = null;
        });
        return;
      }
      fetch(this.manifestUrl)
        .then(response => response.json() as WebAppManifest)
        .then(manifest => {
          runInAction(() => {
            this.manifest = manifest;
          });
        });
    });

    autorun(() => {
      if (this.isShowCustomInstallPrompt) {
        this.setIsShowPromoteInstallPrompt(false);
      }
    });
  }

  private implementation?: InstallationStoreImplementation;

  public implementationKind?: InstallationImplementationKind;

  @computed public get canBeInstalled(): boolean {
    return this.implementation?.canBeInstalled ?? false;
  }

  @computed public get isShowCustomInstallPrompt(): boolean {
    return this.implementation?.isShowCustomInstallPrompt ?? false;
  }

  @computed public get manifestUrl(): string | null {
    if (!PLATFORM_ENV) {
      return null;
    }
    const { theme } = this.services.settings;
    return `/assets/pwa/generated-manifests/manifest-${theme}-${PLATFORM_ENV}.json`;
  }

  @observable public manifest: WebAppManifest | null = null;

  @observable public isShowPromoteInstallPrompt = false;

  @action public setIsShowPromoteInstallPrompt = (value: boolean): void => {
    this.isShowPromoteInstallPrompt = value;
  };

  public showInstallPrompt = (): void => {
    this.implementation?.showInstallPrompt();
  };

  public hideInstallPrompt = (): void => {
    this.implementation?.hideInstallPrompt?.();
  };

  public static listenEvents(): void {
    if (InstallationNativeStore.isSupported()) {
      InstallationNativeStore.listenEvents();
    }
  }
}
