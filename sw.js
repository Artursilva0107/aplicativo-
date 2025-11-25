const CACHE_NAME = 'pwa-v1';
const urlsToCache = [
    '/',
    '/index.html',
    // CORRIGIDO: Nomes dos arquivos na Raiz
    '/main.css', 
    '/main.js',
    '/manifest.json',
    '/192x192.png',
    '/512x512.png',
    '/firebase-config.js'
];

// Instalação: Cacheia os arquivos essenciais
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Busca: Serve o recurso do cache se disponível
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Ativação: Limpa caches antigos
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
