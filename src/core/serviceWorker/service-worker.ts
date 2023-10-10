import { cacheOfflineHtml } from './cacheOfflineHtml';
import { cacheInternalAssets } from './cacheInternalAssets';

declare const self: ServiceWorkerGlobalScope;

// @ts-ignore: magic workbox property
self.__WB_DISABLE_DEV_LOGS = true; // eslint-disable-line no-underscore-dangle -- magic workbox property

self.addEventListener('install', () => {
  self.skipWaiting();
});

cacheOfflineHtml();

cacheInternalAssets();

/**
 * BELOW IS NO-OP SERVICE WORKER
 *
 * You must comment out the main service worker (above)
 * and uncomment this service worker
 * in case of problems with the deployed service worker
 *
 * @see https://developer.chrome.com/docs/workbox/remove-buggy-service-workers/
 * */

/*
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.clients
    .matchAll({ type: 'window' })
    .then(windowClients => {
      windowClients.forEach(windowClient => {
        windowClient.navigate(windowClient.url);
      });
    });
});
*/
