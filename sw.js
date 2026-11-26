// Mission Tracker — service worker : fonctionne hors ligne, et récupère la dernière version de la page dès qu'il y a du réseau.
const CACHE = 'obspm-tracker-v7';
const SHELL = ['./', './index.html', './manifest.webmanifest', './missions.js', './sprites.js', './icons/app-192.png', './icons/app-512.png', './icons/app-180.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // page : toujours la version du serveur (sans cache HTTP, sinon GitHub Pages peut renvoyer une version de 10 min), cache seulement hors ligne
  if (req.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/missions.js') || url.pathname.endsWith('/sprites.js')) {
    e.respondWith(fetch(req, { cache: 'no-store' }).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req.mode === 'navigate' ? './index.html' : req, cp)); return r; })
      .catch(() => caches.match(req.mode === 'navigate' ? './index.html' : req)));
    return;
  }
  // polices Google et fichiers statiques : cache d'abord, puis réseau
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok && (url.origin === location.origin || url.hostname.endsWith('gstatic.com') || url.hostname.endsWith('googleapis.com'))) {
      const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp));
    }
    return r;
  })));
});
