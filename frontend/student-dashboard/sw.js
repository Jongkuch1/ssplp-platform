// Service Worker for offline functionality (FR04, NFR09)
const CACHE_NAME = 'ssplp-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/login.html',
    '/register.html',
    '/student-dashboard.html',
    '/subjects.html',
    '/student-quizzes.html',
    '/student-assignments.html',
    '/tutoring.html',
    '/messaging.html',
    '/progress.html',
    '/profile.html',
    '/css/style.css',
    '/js/core/app.js',
    '/js/core/api.js',
    '/js/core/i18n.js',
    '/js/load-profile.js',
    '/js/seed-data.js',
    '/logo.svg'
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
    if (event.tag === 'sync-quiz-attempts') {
        event.waitUntil(syncQuizAttempts());
    } else if (event.tag === 'sync-progress') {
        event.waitUntil(syncProgress());
    } else if (event.tag === 'sync-messages') {
        event.waitUntil(syncMessages());
    }
});

async function syncQuizAttempts() {
    const apiUrl = self.location.hostname === 'localhost'
        ? 'http://localhost:5000/api'
        : 'https://ssplp-backend.onrender.com/api';
    const attempts = JSON.parse(localStorage.getItem('pendingQuizAttempts') || '[]');
    for (const attempt of attempts) {
        try {
            await fetch(`${apiUrl}/learning/quiz-attempts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(attempt)
            });
        } catch (error) {
            console.error('Sync failed:', error);
        }
    }
    localStorage.removeItem('pendingQuizAttempts');
}

async function syncProgress() {
    const apiUrl = self.location.hostname === 'localhost'
        ? 'http://localhost:5000/api'
        : 'https://ssplp-backend.onrender.com/api';
    const progress = JSON.parse(localStorage.getItem('pendingProgress') || '[]');
    for (const item of progress) {
        try {
            await fetch(`${apiUrl}/learning/progress`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            });
        } catch (error) {
            console.error('Sync failed:', error);
        }
    }
    localStorage.removeItem('pendingProgress');
}

async function syncMessages() {
    const apiUrl = self.location.hostname === 'localhost'
        ? 'http://localhost:5000/api'
        : 'https://ssplp-backend.onrender.com/api';
    const messages = JSON.parse(localStorage.getItem('pendingMessages') || '[]');
    for (const msg of messages) {
        try {
            await fetch(`${apiUrl}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(msg)
            });
        } catch (error) {
            console.error('Sync failed:', error);
        }
    }
    localStorage.removeItem('pendingMessages');
}