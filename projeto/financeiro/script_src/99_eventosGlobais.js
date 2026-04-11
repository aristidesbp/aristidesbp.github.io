document.addEventListener('DOMContentLoaded', () => {
    verificar_login();
    configurarDropZone('drop-boleto', 'f-boleto', 'nome-boleto');
    configurarDropZone('drop-comprovante', 'f-comprovante', 'nome-comprovante');

    // Lógica do Autocomplete da Entidade
    const inputBusca = document.getElementById('f-entidade-busca');
    const listaDropdown = document.getElementById('lista-entidades');
    const inputId = document.getElementById('f-entidade-id');

    inputBusca.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase();
        listaDropdown.innerHTML = '';
        if (!termo) { listaDropdown.classList.add('hidden'); inputId.value = ''; return; }

        const filtradas = window.entidadesCache.filter(ent => ent.nome_completo.toLowerCase().includes(termo));
        if (filtradas.length > 0) {
            listaDropdown.classList.remove('hidden');
            filtradas.forEach(ent => {
                const li = document.createElement('li');
                li.className = 'p-3 hover:bg-slate-100 cursor-pointer text-sm border-b last:border-b-0';
                li.innerHTML = `<i class="fas fa-user-circle text-slate-400 mr-2"></i>${ent.nome_completo}`;
                li.onclick = () => {
                    inputBusca.value = ent.nome_completo;
                    inputId.value = ent.id;
                    listaDropdown.classList.add('hidden');
                };
                listaDropdown.appendChild(li);
            });
        } else { listaDropdown.classList.add('hidden'); inputId.value = ''; }
    });
});

// Compartilhamento e PWA
if ('serviceWorker' in navigator) { navigator.serviceWorker.register('sw.js'); }

const btnInstalar = document.getElementById('btn-instalar');
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.eventoInstalacao = e; 
});

btnInstalar.addEventListener('click', async () => {
    if(typeof fecharMenu === 'function') fecharMenu();
    if (window.eventoInstalacao) {
        window.eventoInstalacao.prompt();
        const { outcome } = await window.eventoInstalacao.userChoice;
        if (outcome === 'accepted') { alert('Instalação autorizada!'); window.eventoInstalacao = null; }
    } else {
        alert("O ERP já está instalado ou o navegador não suporta a instalação automática.");
    }
});

window.addEventListener('appinstalled', () => { window.eventoInstalacao = null; });

window.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('shared') === 'true') {
        try {
            alternarAba('formulario');
            const cache = await caches.open('share-target-cache');
            const response = await cache.match('/shared-file');
            if (response) {
                const blob = await response.blob();
                const file = new File([blob], "comprovante.jpg", { type: blob.type });
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                const inputComprovante = document.getElementById('f-comprovante');
                inputComprovante.files = dataTransfer.files;
                mostrarNomeArquivo(inputComprovante, 'nome-comprovante');
                await cache.delete('/shared-file');
                window.history.replaceState({}, document.title, "/index.html");
            }
        } catch (err) { console.error(err); }
    }
});
