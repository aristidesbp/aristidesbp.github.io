/**
 * Nome do arquivo: buscar_universal.js
 * Objetivo: Campo de busca universal que identifica automaticamente as colunas da tabela.
 * Objetivo: Sistema de busca dinâmica que lê a tabela alvo direto do atributo data-tabela no HTML.

<!-- BUSCA UNIVERSAL -->
<div class="relative w-full mb-4 componente-busca" data-tabela="entidades">
<label class="block text-sm font-medium text-gray-700 font-bold mb-1">Busca Rápida</label>
<div class="flex gap-2">
<input type="text" class="input-busca-texto block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-2 focus:ring-blue-500 outline-none">
<button type="button" class="btn-disparar-busca bg-blue-600 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-700">
<i class="fas fa-search"></i>
</button>
<input type="hidden" class="id-selecionado-hidden" name="id_selecionado">
</div>
<ul class="lista-resultados-suspensa absolute z-50 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-2xl max-h-60 overflow-y-auto hidden"></ul>
</div>
<script src="js/buscar_universal.js"></script>
<!-- FIM DA BUSCA UNIVERSAL -->

 */



async function inicializarComponentesBusca() {
    // Busca todos os elementos que têm a classe 'componente-busca'
    const componentes = document.querySelectorAll('.componente-busca');

    componentes.forEach(async (container) => {
        const nomeTabela = container.getAttribute('data-tabela');
        const inputTexto = container.querySelector('.input-busca-texto');
        const btnBusca = container.querySelector('.btn-disparar-busca');
        const listaUI = container.querySelector('.lista-resultados-suspensa');
        const inputHidden = container.querySelector('.id-selecionado-hidden');

        let cacheDados = [];

        try {
            // 1. Carrega dados da tabela específica deste componente
            const { data, error } = await window.supabaseClient
                .from(nomeTabela)
                .select('*');

            if (error) throw error;
            cacheDados = data || [];

            // 2. Evento de Clique
            btnBusca.addEventListener('click', () => {
                const termo = inputTexto.value.trim().toLowerCase();
                const filtrados = (termo === "") 
                    ? cacheDados 
                    : cacheDados.filter(reg => 
                        Object.values(reg).some(v => String(v).toLowerCase().includes(termo))
                    );
                
                renderizarListaDinamica(filtrados, listaUI, inputTexto, inputHidden);
            });

            // Fechar ao clicar fora
            document.addEventListener('click', (e) => {
                if (!container.contains(e.target)) listaUI.classList.add('hidden');
            });

            console.log(`✅ Busca configurada para: ${nomeTabela}`);

        } catch (err) {
            console.error(`Erro ao carregar tabela ${nomeTabela}:`, err.message);
        }
    });
}

function renderizarListaDinamica(dados, listaUI, inputTexto, inputHidden) {
    listaUI.innerHTML = '';

    dados.forEach(item => {
        const li = document.createElement('li');
        li.className = "p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-50 bg-white flex flex-col";
        
        // Identifica campos para mostrar (tenta nomes comuns)
        const principal = item.nome_completo || item.nome || item.descricao || item.title || Object.values(item)[1];
        const secundario = item.cpf || item.tipo_entidade || item.codigo_barras || "";

        li.innerHTML = `
            <span class="font-bold text-sm text-gray-800">${principal}</span>
            <span class="text-[10px] text-gray-500 uppercase">${secundario}</span>
        `;
        
        li.onclick = () => {
            inputTexto.value = principal;
            inputHidden.value = item.id;
            listaUI.classList.add('hidden');
        };
        
        listaUI.appendChild(li);
    });

    listaUI.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', inicializarComponentesBusca);
