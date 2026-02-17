/**
 * Nome do arquivo: buscar_universal.js
 * Objetivo: Sistema de busca dinâmica que lê a tabela alvo direto do atributo data-tabela no HTML.
 */

async function inicializarComponentesBusca() {
    // 1. Localiza todos os containers de busca na página
    const componentes = document.querySelectorAll('.componente-busca');

    componentes.forEach(async (container) => {
        // Seleciona os elementos específicos DESTE container usando classes
        const nomeTabela = container.getAttribute('data-tabela');
        const inputTexto = container.querySelector('.input-busca-texto');
        const btnBusca = container.querySelector('.btn-disparar-busca');
        const listaUI = container.querySelector('.lista-resultados-suspensa');
        const inputHidden = container.querySelector('.id-selecionado-hidden');

        if (!nomeTabela || !inputTexto || !btnBusca || !listaUI) return;

        let cacheDados = [];

        try {
            // 2. Carrega dados da tabela definida no HTML
            const { data, error } = await window.supabaseClient
                .from(nomeTabela)
                .select('*');

            if (error) throw error;
            cacheDados = data || [];

            // 3. Evento de Clique no botão de busca
            btnBusca.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita fechar a lista imediatamente
                const termo = inputTexto.value.trim().toLowerCase();
                
                const filtrados = (termo === "") 
                    ? cacheDados 
                    : cacheDados.filter(reg => 
                        Object.values(reg).some(v => String(v).toLowerCase().includes(termo))
                    );
                
                // Passamos os elementos específicos deste componente para a função de renderizar
                renderizarListaDinamica(filtrados, listaUI, inputTexto, inputHidden);
            });

            // 4. Fechar a lista ao clicar fora deste container específico
            document.addEventListener('click', (e) => {
                if (!container.contains(e.target)) {
                    listaUI.classList.add('hidden');
                }
            });

            console.log(`✅ Busca configurada para: ${nomeTabela}`);

        } catch (err) {
            console.error(`❌ Erro na tabela [${nomeTabela}]:`, err.message);
        }
    });
}

function renderizarListaDinamica(dados, listaUI, inputTexto, inputHidden) {
    listaUI.innerHTML = '';

    if (dados.length === 0) {
        listaUI.innerHTML = '<li class="p-3 text-gray-500 italic text-sm text-center bg-white">Nenhum resultado.</li>';
    } else {
        dados.forEach(item => {
            const li = document.createElement('li');
            li.className = "p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-50 bg-white flex flex-col";
            
            // Lógica de Título Dinâmico
            const principal = item.nome_completo || item.nome || item.descricao || item.title || Object.values(item)[1];
            const secundario = item.cpf || item.tipo_entidade || item.codigo_barras || (item.created_at ? new Date(item.created_at).toLocaleDateString() : "");

            li.innerHTML = `
                <span class="font-bold text-sm text-gray-800">${principal}</span>
                <span class="text-[10px] text-gray-500 uppercase">${secundario}</span>
            `;
            
            // Ação ao clicar: preenche os inputs específicos que passamos por parâmetro
            li.onclick = () => {
                inputTexto.value = principal;
                if (inputHidden) inputHidden.value = item.id;
                listaUI.classList.add('hidden');
                console.log(`📌 Selecionado em [${inputHidden.name}]:`, item.id);
            };
            
            listaUI.appendChild(li);
        });
    }

    listaUI.classList.remove('hidden');
}

// Inicializa o sistema
document.addEventListener('DOMContentLoaded', inicializarComponentesBusca);
