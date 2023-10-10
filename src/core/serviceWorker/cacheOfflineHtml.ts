import { NetworkOnly } from 'workbox-strategies';
import { NavigationRoute, registerRoute } from 'workbox-routing';

export function cacheOfflineHtml(): void {
  const FALLBACK_CACHE_NAME = 'offlineHtml';
  const FALLBACK_HTML_URL = '/offline.html'; // does not exist physically

  const htmlFallbackStrategy = new NetworkOnly({
    networkTimeoutSeconds: 5,
    plugins: [
      {
        async fetchDidSucceed({ response }) {
          const responseClone = response.clone();
          caches
            .open(FALLBACK_CACHE_NAME)
            .then(cache => cache.put(FALLBACK_HTML_URL, responseClone));
          return response;
        },
        handlerDidError() {
          return caches.match(FALLBACK_HTML_URL, { cacheName: FALLBACK_CACHE_NAME });
        },
      },
    ],
  });
  registerRoute(
    new NavigationRoute(htmlFallbackStrategy, {
      denylist: [/^\/assets\//], // prevent cache charting_library html files
    }),
  );
}
