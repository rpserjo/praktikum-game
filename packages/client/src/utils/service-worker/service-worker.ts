import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

export {};

enum Route {
    Landing = '/',
    Signup = '/signup',
    Signin = '/signin',
    Home = '/home',
    Game = '/game',
    GameStart = '/game/start',
    GameFinish = '/game/finish',
    Profile = '/profile',
    Leaderboard = '/leaderboard',
    Forum = '/forum',
    NotFound = '/wrong-path',
    ServerErr = '/500',
}

declare const self: ServiceWorkerGlobalScope; // eslint-disable-line  no-undef

const STATIC_CACHE = 'static-cache-v1';

const URLS = [
    Route.Landing,
    Route.Signup,
    Route.Signin,
    Route.Home,
    Route.Game,
    Route.GameStart,
    Route.GameFinish,
    Route.Profile,
    Route.Leaderboard,
    Route.Forum,
    Route.NotFound,
    Route.ServerErr,
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open(STATIC_CACHE)
            .then(cache => cache.addAll(URLS))
            .catch(err => {
                console.log(err);
                throw err;
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            Promise.all(
                // eslint-disable-next-line
                cacheNames.map(key => {
                    if (key !== STATIC_CACHE && key.startsWith('static-cache-')) {
                        console.log('[ServiceWorker] Removing old cache', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response;
            }

            const fetchRequest = event.request.clone();
            // eslint-disable-next-line @typescript-eslint/no-shadow
            return fetch(fetchRequest).then(response => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                const responseToCache = response.clone();

                caches.open(STATIC_CACHE).then(cache => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            });
        })
    );
});

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST); // eslint-disable-line   no-underscore-dangle
