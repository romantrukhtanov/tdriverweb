import { action, observable, makeObservable } from 'mobx';

export class OnlineStore {
  constructor() {
    makeObservable(this);

    window.addEventListener('offline', this.handleOnlineStatusChange);
    window.addEventListener('online', this.handleOnlineStatusChange);
  }

  @observable public isOnline: boolean = navigator.onLine;

  @action.bound
  private handleOnlineStatusChange() {
    this.isOnline = navigator.onLine;
  }
}
