import { CacheFirst, NetworkFirst, NetworkOnly, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute, Route } from 'workbox-routing';
import { ExpirationPlugin } from 'workbox-expiration';
import type { RouteMatchCallback, WorkboxPlugin } from 'workbox-core';

type CacheType =
  | typeof CacheFirst
  | typeof NetworkFirst
  | typeof NetworkOnly
  | typeof StaleWhileRevalidate;

type CacheDetails = {
  Cache: CacheType;
  capture: RegExp | string | RouteMatchCallback | Route;
  maxEntries?: number; // safe amount = amount at the time of development * multiplier (usually 2.5 or 3)
  maxAgeSeconds?: number;
  purgeOnQuotaError?: true;
  networkTimeoutSeconds?: number; // only for NetworkFirst
};

const SECONDS_IN_MONTH = 30 * 24 * 60 * 60;

export function cacheInternalAssets(): void {
  const cachesByName: Record<string, CacheDetails> = {
    shellMain: {
      Cache: CacheFirst,
      maxEntries: 6,
      capture: ({ request: { destination }, url: { pathname } }) => {
        return (
          pathname.match(/^\/(app|vendor)\.[a-z\d]+\./) && ['style', 'script'].includes(destination)
        );
      },
    },
    shellChunks: {
      Cache: CacheFirst,
      maxEntries: 100,
      capture: ({ request: { destination }, url: { pathname } }) => {
        return pathname.startsWith('/chunks/') && ['style', 'script'].includes(destination);
      },
    },
    locales: {
      Cache: CacheFirst,
      maxEntries: 3,
      capture: ({ request: { destination }, url: { pathname } }) => {
        return pathname.startsWith('/locales/') && destination === 'script';
      },
    },
    fonts: {
      Cache: CacheFirst,
      maxEntries: 28,
      capture: ({ request: { destination }, url: { pathname } }) => {
        return pathname.startsWith('/fonts/') && destination === 'font';
      },
    },
    images: {
      Cache: CacheFirst,
      maxAgeSeconds: 3 * SECONDS_IN_MONTH,
      purgeOnQuotaError: true,
      capture: ({ request: { destination }, url: { pathname } }) => {
        return pathname.startsWith('/images/') && destination === 'image';
      },
    },
    fontsForPdf: {
      Cache: StaleWhileRevalidate,
      maxEntries: 5,
      capture: ({ url: { pathname } }) => {
        return pathname.startsWith('/assets/fonts/');
      },
    },
    assetsImages: {
      Cache: StaleWhileRevalidate,
      maxAgeSeconds: 3 * SECONDS_IN_MONTH,
      purgeOnQuotaError: true,
      capture: ({ request: { destination }, url: { pathname } }) => {
        return pathname.startsWith('/assets/images/') && destination === 'image';
      },
    },
    assetsDetectWakeupWorker: {
      Cache: NetworkFirst,
      networkTimeoutSeconds: 5,
      capture: ({ url: { pathname } }) => {
        return pathname === '/assets/detectWakeupWorker.js';
      },
    },
    assetsManifest: {
      Cache: NetworkFirst,
      networkTimeoutSeconds: 5,
      capture: ({ url: { pathname } }) => {
        return pathname === '/assets/manifest.json';
      },
    },
    assetsPwa: {
      Cache: StaleWhileRevalidate,
      capture: ({ url: { pathname } }) => {
        return pathname === '/favicon.ico' || pathname.startsWith('/assets/pwa/');
      },
    },
    devServerHotUpdates: {
      Cache: NetworkOnly,
      capture: ({ url: { pathname } }) => {
        return pathname.match(/\.hot-update\.(js|json)$/);
      },
    },
  };

  Object.entries(cachesByName).forEach(
    ([
      cacheName,
      { Cache, capture, maxEntries, maxAgeSeconds, purgeOnQuotaError, networkTimeoutSeconds },
    ]) => {
      const plugins: WorkboxPlugin[] = [];
      if (maxEntries || maxAgeSeconds) {
        plugins.push(new ExpirationPlugin({ maxEntries, maxAgeSeconds, purgeOnQuotaError }));
      }
      registerRoute(capture, new Cache({ cacheName, networkTimeoutSeconds, plugins }));
    },
  );
}
