// Offline shell AND content cache. This inverts what Crystal's SW does, on
// purpose: Crystal's content lives behind a Worker and is not precached; this
// app's content IS the data modules, and the airplane-mode test is the whole
// moat, so every data module is in the precache list alongside the shell.
//
// Cache name must stay aimap-prefixed: seven PWAs share the
// janniksin.github.io origin and each SW deletes ONLY its own prefix. A
// blanket caches.keys() sweep here would evict the siblings' offline shells.
//
// WHEN TO BUMP: any deploy where files that must land together changed (CSS
// plus the markup or module that assumes it). Editing one file alone does not
// need a bump; the fetch handler is network-first and overwrites in place.
// When in doubt, bump.
// v2: the atlas. map.js is new and app.js/app.css/index.html all assume it,
// which is exactly the paired-change case above.
// v3: world widened to 2600 with cluster cards; map.js geometry and the CSS
// that lays it out changed together.
const CACHE = "aimap-v3";

const PRECACHE = [
  "./",
  "./index.html",
  "./app.css",
  "./core.js",
  "./app.js",
  "./map.js",
  "./stack.js",
  "./read.js",
  "./use.js",
  "./thing.js",
  "./sources.js",
  "./data/layers.js",
  "./data/things.js",
  "./data/jobs.js",
  "./data/sources.js",
  "./data/reads.js",
  "./data/cards.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
];

// addAll is all-or-nothing: one 404 and NOTHING is cached, which on a phone
// with no signal is a white screen. Cache one at a time, tolerate misses,
// activate either way; the fetch handler fills any gap later.
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => Promise.all(PRECACHE.map((u) => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("aimap-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// Only a real same-origin 200 is worth keeping. An opaque, redirected or 404
// response cached here would be served back as the shell forever.
const keep = (res) => !!res && res.ok && res.type === "basic";

function netThenCache(request) {
  return fetch(request).then((res) => {
    if (keep(res)) {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(request, copy));
    }
    return res;
  });
}

function cacheFallback(request) {
  return caches.match(request).then((hit) => {
    if (hit) return hit;
    if (request.mode === "navigate") return caches.match("./index.html").then((s) => s || Response.error());
    return Response.error();
  });
}

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;

  if (url.pathname.includes("/icons/")) {
    e.respondWith(caches.match(e.request).then((hit) => hit || netThenCache(e.request)));
    return;
  }

  // Network first, but one bar of signal must not hold the shell hostage: at
  // 1.5s the cached copy wins the race and the fetch still fills the cache.
  const net = netThenCache(e.request).catch(() => null);
  const slow = new Promise((r) => setTimeout(r, 1500)).then(() => caches.match(e.request));
  e.respondWith(
    Promise.race([net, slow])
      .then((res) => res || net)
      .then((res) => res || cacheFallback(e.request)),
  );
});
