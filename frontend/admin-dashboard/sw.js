// Service Worker for offline functionality (FR04, NFR09)
const CACHE_NAME = 'ssplp-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/student-dashboard.html',
    '/teacher-dashboard.html',
    '/admin-dashboard.html',
    '/css/style.css',
    '/js/app.js',
    '/offline-sync.html'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            }
        )
    );
});

// Background sync for offline data
self.addEventListener('sync', function(event) {
    if (event.tag === 'background-sync') {
        event.waitUntil(syncOfflineData());
    }
});

function syncOfflineData() {
    // Sync offline quiz results, progress, etc.
    return new Promise((resolve) => {
        console.log('Syncing offline data...');
        resolve();
    });
}