/**
 * Nome do arquivo: buscar_universal.js
 * Objetivo: Sistema de busca dinâmica com interface de Dropdown flutuante.
 * Funcionalidade: Suporte a busca universal, múltiplos componentes e visual profissional.
 * * Exemplo de HTML esperado:
    <div class="componente-busca" data-tabela="entidades" style="position: relative;">
        <label>Cliente:</label>
        <div style="display: flex; gap: 5px;">
            <input type="text" class="input-busca-texto" placeholder="Digite para buscar...">
            <button type="button" class="btn-disparar-busca"><i class="fas fa-search"></i></button>
            <input type="hidden" class="id-selecionado-hidden" name="cliente_id">
        </div>
        <ul class="lista-resultados-suspensa hidden"></ul>
    </div>
 */

async function inicializarComponentesBusca() {
    const componentes = document.querySelectorAll('.componente-busca');

    componentes.forEach(async (container) => {
        const nomeTabela = container.getAttribute('data-tabela');
        const inputTexto = container.querySelector('.input-busca-texto');
        const btnBusca = container.querySelector('.btn-disparar-busca');
        const listaUI = container.querySelector('.lista-resultados-suspensa');
        const inputHidden = container.querySelector('.id-selecionado-hidden');

        if (!nomeTabela || !inputTexto || !btnBusca || !listaUI) {
            console.warn("⚠️ Componente de busca incompleto detectado.");
            return;
        }

        let cacheDados = [];

        try {
            // Carrega os dados da tabela
            const { data, error } = await window.supabaseClient
                .from(nomeTabela)
                .select('*');

            if (error) throw error;
            cacheDados = data || [];

            const executarBusca = () => {
                const termo = inputTexto.value.trim().toLowerCase();
                
                // Filtro universal em todas as colunas
                const filtrados = (termo === "") 
                    ? cacheDados 
                    : cacheDados.filter(reg => 
                        Object.values(reg).some(v => String(v).toLowerCase().includes(termo))
                    );
                
                renderizarListaDinamica(filtrados, listaUI, inputTexto, inputHidden);
            };

            // Clique no botão
            btnBusca.addEventListener('click', (e) => {
                e.stopPropagation();
                executarBusca();
            });

            // Tecla ENTER
            inputTexto.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    executarBusca();
                }
            });

            // Fechar ao clicar fora
            document.addEventListener('click', (e) => {
                if (!container.contains(e.target)) {
                    listaUI.classList.add('hidden');
                }
            });

            console.log(`✅ Busca configurada para: [${nomeTabela}]`);

        } catch (err) {
            console.error(`❌ Erro na tabela [${nomeTabela}]:`, err.message);
        }
    });
}

/**
 * Renderiza a lista com estilo de Dropdown flutuante
 */
function renderizarListaDinamica(dados, listaUI, inputTexto, inputHidden) {
    listaUI.innerHTML = '';

    // Estilização forçada via JS para garantir o visual de "alerta/janela"
    Object.assign(listaUI.style, {
        position: 'absolute',
        top: '100%',
        left: '0',
        right: '0',
        zIndex: '1000',
        backgroundColor: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        maxHeight: '250px',
        overflowY: 'auto',
        marginTop: '4px',
        padding: '0',
        listStyle: 'none'
    });

    if (dados.length === 0) {
        listaUI.innerHTML = '<li style="padding: 1rem; color: #718096; font-style: italic; text-align: center;">Nenhum resultado encontrado.</li>';
    } else {
        dados.forEach(item => {
            const li = document.createElement('li');
            // Estilo do item da lista
            Object.assign(li.style, {
                padding: '0.75rem 1rem',
                borderBottom: '1px solid #f7fafc',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'background-color 0.2s'
            });

            li.onmouseover = () => li.style.backgroundColor = '#f0fff4';
            li.onmouseout = () => li.style.backgroundColor = 'white';

            const principal = item.nome_completo || item.nome || item.descricao || item.title || Object.values(item)[1];
            const secundario = item.cpf || item.tipo_entidade || item.codigo_barras || (item.created_at ? new Date(item.created_at).toLocaleDateString() : "");

            li.innerHTML = `
                <span style="font-weight: bold; font-size: 0.875rem; color: #2d3748;">${principal}</span>
                <span style="font-size: 0.75rem; color: #718096; text-transform: uppercase;">${secundario}</span>
            `;
            
            li.onclick = () => {
                inputTexto.value = principal;
                if (inputHidden) inputHidden.value = item.id;
                listaUI.classList.add('hidden');
            };
            
            listaUI.appendChild(li);
        });
    }

    listaUI.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', inicializarComponentesBusca);
