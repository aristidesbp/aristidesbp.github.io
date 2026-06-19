const CACHE_NAME = 'erp-abp-v1';

// Força a atualização imediata do Service Worker quando subir código novo
self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // 1. Lógica do Share Target (Receber a foto da galeria)
  if (event.request.method === 'POST' && event.request.url.includes('index.html')) {
    event.respondWith((async () => {
      const formData = await event.request.formData();
      const file = formData.get('arquivo_compartilhado');
      
      const cache = await caches.open('share-target-cache');
      
      if (file) {
        const fileResponse = new Response(file);
        await cache.put('/shared-file', fileResponse);
      }

      // Redireciona de volta para a tela do ERP
      return Response.redirect('./index.html?shared=true', 303);
    })());
    return;
  }

  // 2. Lógica Padrão PWA (OBRIGATÓRIO para o botão Instalar aparecer)
  // Deixa o tráfego fluir normalmente
  event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
  );
});
