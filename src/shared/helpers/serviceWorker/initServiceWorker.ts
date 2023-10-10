import { Workbox } from 'workbox-window';

function initServiceWorker(): void {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  const workboxInstance = new Workbox('/service-worker.js');

  workboxInstance.register();
}

export { initServiceWorker };
