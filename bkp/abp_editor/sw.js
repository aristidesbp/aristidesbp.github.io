const CACHE_NAME = 'editor-pwa-v2';
const urlsToCache = [
  './',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // 1. Interceta o ficheiro enviado pelo menu de partilha do Android
  if (event.request.method === 'POST' && event.request.url.includes('/partilhar')) {
    event.respondWith((async () => {
      try {
        const formData = await event.request.formData();
        const ficheiro = formData.get('ficheiro');
        
        let texto = '';
        if (ficheiro) {
          texto = await ficheiro.text();
        }
        
        // Proteção contra quebras de código no HTML injetado
        const safeTexto = JSON.stringify(texto).replace(/<\//g, '<\\/');
        
        // Retorna um ecrã temporário que guarda o texto no navegador e redireciona para a app
        const html = `
          <!DOCTYPE html>
          <html lang="pt-PT">
          <head><meta charset="UTF-8"></head>
          <body>
            <script>
              localStorage.setItem('textoParaEditor', ${safeTexto});
              window.location.replace('./'); // Redireciona de volta para a raiz do editor
            </script>
          </body>
          </html>
        `;
        return new Response(html, { headers: { 'Content-Type': 'text/html' } });
      } catch (erro) {
        return Response.redirect('./', 303);
      }
    })());
    return; // Para a execução aqui para não cair no cache normal
  }

  // 2. Comportamento normal para funcionar offline
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
