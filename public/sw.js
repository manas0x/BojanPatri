// Basic Service Worker for PWA
self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
    // Required for PWA installability
});
