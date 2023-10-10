import { action, computed, makeObservable, observable } from 'mobx';

import type { PersistentStore } from 'services/persistent';
import type { Theme, Dimension, DisplayMode } from 'services/settings/model';
import { AVAILABLE_LANGUAGES, Language } from 'services/i18n';

const DESKTOP_BREAKPOINT = 1280;
const TABLET_BREAKPOINT = 768;

export class SettingsStore {
  constructor(private readonly persistent: PersistentStore) {
    makeObservable(this);

    this.start();
  }

  @observable public theme: Theme = this.persistent.getPersistent('theme');

  @observable public isSelectLanguageOpen = false;

  @computed get isMobile(): boolean {
    return this.screenSize.width < DESKTOP_BREAKPOINT;
  }

  @computed get isTablet(): boolean {
    return this.screenSize.width >= TABLET_BREAKPOINT && this.screenSize.width < DESKTOP_BREAKPOINT;
  }

  @computed get isDesktop(): boolean {
    return this.screenSize.width >= DESKTOP_BREAKPOINT;
  }

  @observable public screenSize: Dimension = this.getScreenDimension();

  @observable public isMenuOpen = false;

  @computed get selectedLanguage() {
    return this.getSelectedLanguage(this.persistent.getPersistent('selectedLanguage'));
  }

  private standaloneMatchMedia = window.matchMedia('(display-mode: standalone)');

  public displayMode: DisplayMode = this.standaloneMatchMedia.matches ? 'standalone' : 'browser';

  public start() {
    window.addEventListener('resize', this.handleResize);

    if ('addEventListener' in this.standaloneMatchMedia) {
      this.standaloneMatchMedia.addEventListener('change', this.handleStandaloneChange);
    } else {
      // iOS13-
      (this.standaloneMatchMedia as MediaQueryList).addListener(this.handleStandaloneChange);
    }
  }

  private handleStandaloneChange = (event: MediaQueryListEvent) => {
    this.displayMode = event.matches ? 'standalone' : 'browser';
  };

  @action setIsMenuOpen = (value: boolean) => {
    this.isMenuOpen = value;
  };

  @action.bound
  public selectLanguage(language: Language) {
    this.persistent.setPersistent('selectedLanguage', language);
  }

  @action.bound
  public setIsSelectLanguageOpen(flag: boolean) {
    this.isSelectLanguageOpen = flag;
  }

  @action.bound
  public toggleSelectLanguage() {
    this.setIsSelectLanguageOpen(!this.isSelectLanguageOpen);
  }

  @action.bound
  public toggleTheme(forcedTheme?: Theme) {
    const newTheme = forcedTheme ?? this.theme === 'night' ? 'day' : 'night';
    this.theme = newTheme;
    this.persistent.setPersistent('theme', newTheme);
  }

  @action.bound
  private handleResize() {
    this.screenSize = this.getScreenDimension();
  }

  private getScreenDimension() {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
  }

  private getSelectedLanguage(language?: Language | null) {
    if (language) {
      return language;
    }
    const browserLanguage = navigator.language;
    // navigator may detect a lang in this format: en-US, we need only en
    const availableLanguage = AVAILABLE_LANGUAGES.find(
      x => x === browserLanguage || x === browserLanguage.slice(0, 2),
    );
    return availableLanguage ?? 'ru';
  }
}
