// sw.js
self.addEventListener('fetch', (event) => {
  // Verifica se a requisição é um POST vindo do menu de compartilhamento
  if (event.request.method === 'POST' && event.request.url.includes('/index.html')) {
    
    event.respondWith((async () => {
      const formData = await event.request.formData();
      const file = formData.get('arquivo_compartilhado');
      
      // Redireciona o usuário para a página inicial com um parâmetro na URL
      // avisando que há um arquivo aguardando
      const cache = await caches.open('share-target-cache');
      
      // Salvamos o arquivo temporariamente no cache do navegador
      if (file) {
        const fileResponse = new Response(file);
        await cache.put('/shared-file', fileResponse);
      }

      // Redireciona para o form do ERP
      return Response.redirect('/index.html?shared=true', 303);
    })());
  }
});
