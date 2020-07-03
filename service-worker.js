importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute(
    [
        { url: '/index.html', revision: '1' },
        { url: '/manifest.json', revision: '1' },
        { url: '/favicon.ico', revision: '1' },
        { url: '/logo.png', revision: '1' },
        { url: '/logo192.png', revision: '1' },
        { url: '/nav.html', revision: '1' },
        { url: '/team.html', revision: '1' },
        { url: '/css/materialize.min.css', revision: '1' },
        { url: '/css/style.css', revision: '1' },
        { url: '/js/api.js', revision: '1' },
        { url: '/js/app.js', revision: '1' },
        { url: '/js/db.js', revision: '1' },
        { url: '/js/idb.js', revision: '1' },
        { url: '/js/materialize.min.js', revision: '1' },
        { url: '/js/nav.js', revision: '1' },
    ],
    {
        // Ignore all URL parameters.
        ignoreURLParametersMatching: [/.*/]
    }
);

// Workbox untuk team.html
workbox.routing.registerRoute(
    new RegExp("(team.html[?&]id=([^&#]*))"),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'team',
        plugins: [
            new workbox.cacheableResponse.Plugin({ statuses: [200] }),
            new workbox.rangeRequests.Plugin(),
        ],
        matchOptions: {
            ignoreSearch: true,
            ignoreVary: true
        }
    })
);

// Workbox untuk file yang terdapat pada folder pages
workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

// Menyimpan cache dari API football-data
workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'api-football-data-org',
    })
);

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

// SW untuk push notification
self.addEventListener('push', function (event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }

    const options = {
        body: body,
        icon: 'logo.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
