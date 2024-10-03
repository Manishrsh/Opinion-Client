// Name of the cache
const CACHE_NAME = 'my-app-cache-v1';

// List of files to cache
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/vite.svg',
  '/src/main.jsx', // Your main JS file
  '/styles.css',   // Your CSS file (if any)
  '/coin.png',     // Example assets
  '/dollar.png',
  '/share.png',
  // Add any other resources you want to cache
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/index.html',
          '/styles.css',
          '/script.js',
          // Add other assets you want to cache
        ]);
      })
    );
  });
  

// Activate event - clear old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Fetch event - serve cached content or fetch from the network
