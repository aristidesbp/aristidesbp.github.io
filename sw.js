const CACHE = "cardapio-adm-v11";
const ARQ = ["./", "adm_v11.html", "install_app_pwa.js", "manifest.webmanifest", "icon-192.png", "icon-512.png"];
self.addEventListener("install", function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return Promise.all(ARQ.map(function (a) { return c.add(a).catch(function () {}); })); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener("activate", function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });
// Cache primeiro, atualiza em segundo plano. Navegação com ?text=... usa a mesma página em cache.
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  const chave = e.request.mode === "navigate" ? e.request.url.split("?")[0] : e.request;
  e.respondWith(caches.match(chave).then(function (hit) {
    const rede = fetch(e.request).then(function (r) { if (r && (r.ok || r.type === "opaque")) { const cp = r.clone(); caches.open(CACHE).then(function (c) { c.put(chave, cp); }); } return r; }).catch(function () { return hit; });
    return hit || rede;
  }));
});