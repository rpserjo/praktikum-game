import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope; // eslint-disable-line  no-undef

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST); // eslint-disable-line   no-underscore-dangle
