var cacheName = 'TMC_v1';
var filesToCache = [
  '/',
  '/index.html',
  '/servicios.html',
  '/js/app.js',
  '/js/login.js',
  '/js/jquery.js',
  '/js/orden.js',
  '/js/bootstrap.bundle.js',
  '/js/bootstrap.bundle.js.map',
  '/js/bootstrap.bundle.min.js',
  '/js/bootstrap.bundle.min.js.map',
  '/js/bootstrap.js',
  '/js/bootstrap.js.map',
  '/js/bootstrap.min.js',
  '/js/bootstrap.min.js.map',  
  '/img/carousel 1.jpg',
  '/img/carousel 2.jpg',
  '/img/carousel 3.jpg',
  '/img/fondo.png',
  '/img/iconoServ.png',
  '/img/lista.png',
  '/img/noticia 1.png',
  '/img/noticia 2.png',
  '/img/noticia 3.png',
  '/img/pubserv.jpg',
  'css/album.css',
  'css/bootstrap.min.css',
  'css/carousel.css',
  'css/main.css',
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
      })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
});