/* =========================================================
   🚚 MÓDULO DE ENTREGAS (DELIVERY)
   ========================================================= */

// Variável para controlar a páginação (igual aos outros módulos)
let paginaAtualEntregas = 0;
const ITENS_PAG_ENTREGAS = 15;

/**
 * Desenha o ecrã principal com a lista de entregas
 */
function desenharModuloEntregas() {
    paginaAtualEntregas = 0;
    
    appRoot.innerHTML = `
        <div class="card" style="margin-top: 4vh; max-width: 850px;">
            <div class="titulo" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <span>🛵 Gestão de Entregas</span>
                <button id="btn-nova-entrega" class="btn-neon" style="width: auto; padding: 8px 12px; margin: 0;">➕ Nova Entrega</button>
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap;">
                <select id="filtro-status-entrega" style="flex: 1; min-width: 150px; margin-bottom: 0;">
                    <option value="">Todos os Status</option>
                    <option value="pendente">⏳ Pendentes</option>
                    <option value="em_rota">🚀 Em Rota</option>
                    <option value="entregue">✅ Entregues</option>
                </select>
                <button class="btn-secundario" style="width: auto; margin-bottom: 0; padding: 0 15px;" onclick="iniciarApp()">🏠 Voltar ao Menu</button>
            </div>

            <div id="lista-entregas-container" style="display:flex; flex-direction:column; gap:10px; margin-top:15px;">
                <p style="text-align:center; color: var(--text-muted);">⏳ A carregar entregas...</p>
            </div>
        </div>
    `;

    // Evento para abrir o ecrã de Nova Entrega
    document.getElementById('btn-nova-entrega').addEventListener('click', desenharModuloNovaEntrega);
    
    // Evento para filtrar a lista quando o utilizador muda o status no select
    document.getElementById('filtro-status-entrega').addEventListener('change', () => {
        paginaAtualEntregas = 0;
        carregarListaEntregas();
    });

    // Carrega a lista ao abrir o módulo
    carregarListaEntregas();
}

/**
 * Consulta a base de dados e cria os cartões das entregas
 */
async function carregarListaEntregas() {
    const container = document.getElementById('lista-entregas-container');
    if (!container) return;

    const statusFiltro = document.getElementById('filtro-status-entrega').value;

    container.innerHTML = "<p style='text-align:center; color: var(--text-muted);'>⏳ A consultar Supabase...</p>";

    try {
        // Faz um JOIN para buscar os dados da venda e o nome do entregador
        let query = clienteSupabase
            .from('log_entregas')
            .select(`
                *,
                pdv_vendas ( numero_pedido, total_liquido ),
                entidades ( nome_completo )
            `)
            .order('created_at', { ascending: false })
            .limit(50); // Limite de 50 para simplificar, mas podes paginar depois

        if (statusFiltro) {
            query = query.eq('status_entrega', statusFiltro);
        }

        const { data, error } = await query;
        if (error) throw error;

        container.innerHTML = "";
        
        if (!data || data.length === 0) {
            container.innerHTML = "<p style='text-align:center; color: var(--text-muted);'>Nenhuma entrega encontrada.</p>";
            return;
        }

        // Para cada entrega, vamos criar um "cartão" visual
        data.forEach(entrega => {
            const card = document.createElement('div');
            // Estilização baseada nas cores do teu sistema
            let corBorda = 'var(--border-color)';
            if (entrega.status_entrega === 'pendente') corBorda = 'var(--warning-color)';
            if (entrega.status_entrega === 'em_rota') corBorda = 'var(--info-color)';
            if (entrega.status_entrega === 'entregue') corBorda = 'var(--success-color)';

            card.style.cssText = `background: var(--input-bg); border-left: 5px solid ${corBorda}; padding: 14px; border-radius: 8px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;`;
            
            const pedidoNumero = entrega.pdv_vendas ? entrega.pdv_vendas.numero_pedido : 'N/D';
            const nomeEntregador = entrega.entidades ? entrega.entidades.nome_completo : 'Sem Entregador';
            const morada = entrega.endereco_entrega || 'Morada não informada';

            // HTML interno do cartão
            card.innerHTML = `
                <div style="flex-grow: 1; min-width: 200px;">
                    <strong style="color: var(--text-main); font-size: 1.1em;">Pedido #${pedidoNumero}</strong>
                    <span class="badge-status" style="background: ${corBorda}; color:#fff; margin-left: 8px;">${entrega.status_entrega.toUpperCase()}</span>
                    <br>
                    <span style="color: var(--text-muted); font-size: 0.85em;">🛵 Entregador: ${escaparHTML(nomeEntregador)}</span><br>
                    <span style="color: var(--text-muted); font-size: 0.85em;">📍 Morada: ${escaparHTML(morada)}</span>
                </div>
            `;

            // Lógica dos Botões de Ação (Avançar o status da entrega)
            const areaBotoes = document.createElement('div');
            areaBotoes.style.display = 'flex';
            areaBotoes.style.gap = '8px';

            if (entrega.status_entrega === 'pendente') {
                const btnRota = document.createElement('button');
                btnRota.textContent = "🚀 Enviar p/ Rota";
                btnRota.className = "btn-secundario";
                btnRota.style.cssText = "width: auto; padding: 8px 12px; margin: 0; color: var(--info-color); border-color: var(--info-color);";
                btnRota.onclick = () => atualizarStatusEntrega(entrega.id, 'em_rota');
                areaBotoes.appendChild(btnRota);
            } 
            else if (entrega.status_entrega === 'em_rota') {
                const btnConcluir = document.createElement('button');
                btnConcluir.textContent = "✅ Confirmar Entrega";
                btnConcluir.className = "btn-sucesso";
                btnConcluir.style.cssText = "width: auto; padding: 8px 12px; margin: 0;";
                btnConcluir.onclick = () => atualizarStatusEntrega(entrega.id, 'entregue');
                areaBotoes.appendChild(btnConcluir);
            }

            card.appendChild(areaBotoes);
            container.appendChild(card);
        });

    } catch (e) {
        tratarErroSupabase(e, "Carregar Entregas");
    }
}

/**
 * Função responsável por mudar o status da entrega na base de dados
 */
async function atualizarStatusEntrega(entregaId, novoStatus) {
    try {
        const payload = { status_entrega: novoStatus };
        
        // Se mudou para em rota, regista a hora de saída
        if (novoStatus === 'em_rota') {
            payload.data_hora_saida = new Date().toISOString();
        }
        // Se mudou para entregue, regista a hora de chegada
        if (novoStatus === 'entregue') {
            payload.data_hora_entrega = new Date().toISOString();
        }

        const { error } = await clienteSupabase
            .from('log_entregas')
            .update(payload)
            .eq('id', entregaId);

        if (error) throw error;
        
        mostrarToast("Status da entrega atualizado!", "sucesso");
        carregarListaEntregas(); // Recarrega a lista para mostrar a alteração

    } catch (e) {
        tratarErroSupabase(e, "Atualizar Status da Entrega");
    }
}

/**
 * Desenha o formulário para registar uma nova entrega
 */
async function desenharModuloNovaEntrega() {
    appRoot.innerHTML = `
        <div class="card" style="margin-top: 5vh; max-width: 500px;">
            <div class="titulo">🛵 Registar Nova Entrega</div>
            
            <form id="form-nova-entrega">
                <label>Selecionar Pedido (Venda) *</label>
                <select id="entrega-venda-id" required>
                    <option value="">A carregar pedidos recentes...</option>
                </select>

                <label>Selecionar Entregador *</label>
                <select id="entrega-entregador-id" required>
                    <option value="">A carregar entregadores...</option>
                </select>

                <label>Morada de Entrega Completa *</label>
                <textarea id="entrega-endereco" rows="3" required placeholder="Rua, Número, Bairro, Ponto de Referência..."></textarea>

                <button type="submit" id="btn-salvar-entrega" class="btn-neon" style="margin-top: 15px;">💾 Salvar Entrega</button>
                <button type="button" class="btn-secundario" onclick="desenharModuloEntregas()">❌ Cancelar</button>
            </form>
        </div>
    `;

    try {
        // 1. Preenche o select de Vendas (Trazemos as 30 últimas vendas concluídas)
        const { data: vendas } = await clienteSupabase
            .from('pdv_vendas')
            .select('id, numero_pedido')
            .eq('status', 'concluida')
            .order('created_at', { ascending: false })
            .limit(30);
            
        const selectVenda = document.getElementById('entrega-venda-id');
        selectVenda.innerHTML = '<option value="">Escolha um Pedido...</option>';
        if (vendas) {
            vendas.forEach(v => {
                selectVenda.innerHTML += `<option value="${v.id}">Pedido #${v.numero_pedido}</option>`;
            });
        }

        // 2. Preenche o select de Entregadores (Busca na tabela 'entidades' onde tipo = 'entregador')
        const { data: entregadores } = await clienteSupabase
            .from('entidades')
            .select('id, nome_completo')
            .eq('tipo', 'entregador')
            .neq('status', 'lixeira');
            
        const selectEntregador = document.getElementById('entrega-entregador-id');
        selectEntregador.innerHTML = '<option value="">Escolha um Entregador...</option>';
        if (entregadores) {
            entregadores.forEach(e => {
                selectEntregador.innerHTML += `<option value="${e.id}">${escaparHTML(e.nome_completo)}</option>`;
            });
        }

    } catch (e) {
        console.error("Erro ao carregar dados do formulário:", e);
    }

    // 3. O que acontece quando clicas no botão de Salvar
    document.getElementById('form-nova-entrega').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = document.getElementById('btn-salvar-entrega');
        btn.textContent = "⏳ A gravar...";
        btn.disabled = true;

        const payload = {
            venda_id: document.getElementById('entrega-venda-id').value,
            entregador_id: document.getElementById('entrega-entregador-id').value,
            endereco_entrega: document.getElementById('entrega-endereco').value.trim(),
            status_entrega: 'pendente' // Status inicial padrão
        };

        try {
            const { error } = await clienteSupabase.from('log_entregas').insert([payload]);
            if (error) throw error;
            
            mostrarToast("Entrega registada com sucesso!", "sucesso");
            desenharModuloEntregas(); // Volta para a lista principal
            
        } catch (erro) {
            tratarErroSupabase(erro, "Registar Entrega");
            btn.textContent = "💾 Salvar Entrega";
            btn.disabled = false;
        }
    });
}
