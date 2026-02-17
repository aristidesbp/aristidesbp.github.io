/**
 * Nome do arquivo: buscar_entidades.js
 * Objetivo: Realizar busca manual de entidades (clientes/fornecedores) 
 * filtrando por nome, cpf ou tipo, e exibir lista para seleção.
 */

let cacheEntidades = []; // Armazena os dados para busca rápida

async function inicializarGerenciadorEntidades() {
    try {
        // 1. Busca os dados usando os nomes de colunas REAIS do seu banco de dados
        const { data, error } = await window.supabaseClient
            .from('entidades')
            .select('id, nome_completo, cpf, tipo_entidade') 
            .order('nome_completo', { ascending: true });

        if (error) throw error;
        cacheEntidades = data || [];

        const btnBusca = document.getElementById('btn_buscar_entidade');
        const inputBusca = document.getElementById('busca_entidade');
        const listaUI = document.getElementById('lista_resultados_entidade');

        if (!btnBusca || !inputBusca || !listaUI) {
            console.warn("⚠️ Elementos de busca não encontrados nesta página.");
            return;
        }

        // 2. Gatilho: Clique no botão de busca
        btnBusca.addEventListener('click', () => {
            const termo = inputBusca.value.trim().toLowerCase();
            
            // Se vazio, mostra todos (conforme seu pedido)
            if (termo === "") {
                renderizarListaBusca(cacheEntidades);
            } else {
                // Filtra comparando com os campos corretos: nome_completo, cpf e tipo_entidade
                const filtrados = cacheEntidades.filter(ent => 
                    (ent.nome_completo && ent.nome_completo.toLowerCase().includes(termo)) ||
                    (ent.cpf && ent.cpf.includes(termo)) ||
                    (ent.tipo_entidade && ent.tipo_entidade.toLowerCase().includes(termo))
                );
                renderizarListaBusca(filtrados);
            }
        });

        // 3. Fecha a lista se o usuário clicar fora dela
        document.addEventListener('click', (e) => {
            if (!inputBusca.contains(e.target) && !btnBusca.contains(e.target) && !listaUI.contains(e.target)) {
                listaUI.classList.add('hidden');
            }
        });

        console.log("🚀 Sistema de busca de entidades pronto e mapeado com o banco.");

    } catch (err) {
        console.error("❌ Erro ao inicializar busca de entidades:", err.message);
    }
}

function renderizarListaBusca(dados) {
    const listaUI = document.getElementById('lista_resultados_entidade');
    if (!listaUI) return;

    listaUI.innerHTML = ''; // Limpa resultados anteriores

    if (dados.length === 0) {
        listaUI.innerHTML = '<li class="p-3 text-gray-500 italic text-sm text-center">Nenhuma entidade encontrada.</li>';
    } else {
        dados.forEach(ent => {
            const li = document.createElement('li');
            // Estilização compatível com Tailwind do seu projeto
            li.className = "p-3 hover:bg-emerald-50 cursor-pointer border-b border-gray-100 flex flex-col transition-colors bg-white";
            
            li.innerHTML = `
                <span class="font-bold text-gray-800 text-sm">${ent.nome_completo}</span>
                <div class="flex justify-between mt-1 text-[10px] uppercase tracking-wider font-semibold text-gray-500">
                    <span>CPF: ${ent.cpf || '---'}</span>
                    <span class="text-emerald-600">${ent.tipo_entidade || 'Geral'}</span>
                </div>
            `;
            
            // Ao clicar no item, preenche o campo de texto e o ID oculto para o banco
            li.onclick = () => {
                document.getElementById('busca_entidade').value = ent.nome_completo;
                document.getElementById('entidade_id_selecionada').value = ent.id;
                listaUI.classList.add('hidden');
                console.log("📌 Selecionado:", ent.nome_completo, "(ID:", ent.id, ")");
            };
            
            listaUI.appendChild(li);
        });
    }

    // Torna a lista visível após processar os dados
    listaUI.classList.remove('hidden');
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', inicializarGerenciadorEntidades);
