// Shift Log offline cache. Bump RELEASE on every release so phones pick up the new files.
// The same file serves the main app and the beta copy in /beta/; each keeps its own cache.
const RELEASE = "5.1.1";
const SCOPE = new URL(self.registration.scope).pathname;
const CHANNEL = SCOPE.endsWith("/beta/") ? "beta" : "main";
const PREFIX = "dutylog-" + CHANNEL + "-";
const VERSION = PREFIX + RELEASE;
const FILES = [
  "./", "./index.html", "./manifest.webmanifest",
  "./fonts/barlow-condensed-600.woff2", "./fonts/barlow-condensed-700.woff2",
  "./fonts/ibm-plex-mono-500.woff2", "./fonts/ibm-plex-mono-600.woff2", "./fonts/ibm-plex-sans-400.woff2",
  "./icons/apple-touch-icon.png", "./icons/icon-192.png", "./icons/icon-512.png",
  "./icons/icon-maskable-512.png", "./icons/favicon-32.png"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  if (CHANNEL === "main" && url.pathname.startsWith(SCOPE + "beta/")) return; // beta has its own worker
  if (req.mode === "navigate") {
    // Page: try the network for updates, fall back to the saved copy when offline.
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put("./index.html", copy)); return res;
    }).catch(() => caches.match("./index.html").then(r => r || caches.match("./"))));
    return;
  }
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(r => r || fetch(req)));
});
