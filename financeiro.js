
/* =========================================================
   🟥 BLOCO 5: MÓDULO FINANCEIRO E MÓDULO PDV (FRENTE DE CAIXA) 🟥
   ========================================================= */

let paginaAtualFin = 0;
const ITENS_PAG_FIN = 15;

function desenharModuloFinanceiro() {
    paginaAtualFin = 0;
    appRoot.innerHTML = `
        <div class="card" style="margin-top: 4vh; max-width: 850px;">
            <div class="titulo" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <span>💰 Gestão Financeira</span>
                <button id="btn-novo-fin" class="btn-neon" style="width: auto; padding: 8px 12px; margin: 0;">➕ Lançar Título</button>
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap;">
                <select id="fin-tipo" style="flex: 1; min-width: 130px; margin-bottom: 0;">
                    <option value="">Todos os Movimentos</option>
                    <option value="entrada">Entradas (Receitas)</option>
                    <option value="saida">Saídas (Despesas)</option>
                </select>
                <select id="fin-status" style="flex: 1; min-width: 130px; margin-bottom: 0;">
                    <option value="">Todos os Status</option>
                    <option value="pendente">Pendentes</option>
                    <option value="quitada">Quitadas</option>
                </select>
                <input type="text" id="fin-busca" placeholder="🔍 Buscar por Descrição..." style="flex: 2; min-width: 180px; margin-bottom: 0;">
            </div>

            <div id="fin-lista-container" style="display:flex; flex-direction:column; gap:10px; margin-top:15px;">
                <p style="text-align:center; color: var(--text-muted);">⏳ A carregar financeiro...</p>
            </div>
            
            <div id="fin-paginacao" style="display: none; justify-content: center; align-items: center; gap: 15px; margin-top: 20px;">
                <button id="btn-fin-ant" class="btn-secundario" style="width: auto;">⬅️ Anterior</button>
                <strong id="texto-fin-paginacao" style="color: var(--text-main);">Página 1</strong>
                <button id="btn-fin-prox" class="btn-secundario" style="width: auto;">Próxima ➡️</button>
            </div>
        </div>
    `;

    document.getElementById('btn-novo-fin').addEventListener('click', () => desenharModuloCadastrarFinanceiro());

    const dispararBusca = () => { paginaAtualFin = 0; carregarListaFinanceiro(); };
    document.getElementById('fin-busca').addEventListener('input', () => setTimeout(dispararBusca, 400));
    document.getElementById('fin-tipo').addEventListener('change', dispararBusca);
    document.getElementById('fin-status').addEventListener('change', dispararBusca);

    document.getElementById('btn-fin-ant').addEventListener('click', () => { if (paginaAtualFin > 0) { paginaAtualFin--; carregarListaFinanceiro(); } });
    document.getElementById('btn-fin-prox').addEventListener('click', () => { paginaAtualFin++; carregarListaFinanceiro(); });

    carregarListaFinanceiro();
}

async function carregarListaFinanceiro() {
    const container = document.getElementById('fin-lista-container');
    if (!container) return;

    const tipo = document.getElementById('fin-tipo').value;
    const status = document.getElementById('fin-status').value;
    const termo = document.getElementById('fin-busca').value.trim();

    container.innerHTML = "<p style='text-align:center; color: var(--text-muted);'>⏳ A consultar Supabase...</p>";
    const inicio = paginaAtualFin * ITENS_PAG_FIN;
    const fim = inicio + ITENS_PAG_FIN - 1;

    try {
        let query = clienteSupabase
            .from('fin_contas')
            .select('*, entidades(nome_completo)', { count: 'exact' })
            .order('data_vencimento', { ascending: true })
            .range(inicio, fim);

        if (tipo) query = query.eq('tipo_conta', tipo);
        if (status) query = query.eq('status_conta', status);
        if (termo) query = query.ilike('descricao', `%${termo}%`);

        const { data, count, error } = await query;
        if (error) throw error;

        const paginas = Math.ceil(count / ITENS_PAG_FIN) || 1;
        document.getElementById('texto-fin-paginacao').textContent = `Página ${paginaAtualFin + 1} de ${paginas}`;
        document.getElementById('btn-fin-ant').disabled = paginaAtualFin === 0;
        document.getElementById('btn-fin-prox').disabled = (paginaAtualFin + 1) >= paginas;
        document.getElementById('fin-paginacao').style.display = count > 0 ? "flex" : "none";

        container.innerHTML = "";
        if (!data || data.length === 0) {
            container.innerHTML = "<p style='text-align:center; color: var(--text-muted);'>Nenhum registo financeiro encontrado.</p>";
            return;
        }

        data.forEach(fin => {
            const isEntrada = fin.tipo_conta === 'entrada' || fin.tipo_conta === 'receita';
            const cor = isEntrada ? 'var(--success-color)' : 'var(--danger-color)';
            const sinal = isEntrada ? '+' : '-';
            const valor = parseFloat(fin.valor_nominal || 0).toFixed(2);
            const nomeEntidade = fin.entidades ? fin.entidades.nome_completo : 'Geral';

            const card = document.createElement('div');
            card.style.cssText = `background: var(--input-bg); border-left: 5px solid ${cor}; padding: 14px; border-radius: 8px; display:flex; align-items:center; gap: 14px; flex-wrap:wrap;`;
            card.innerHTML = `
                <div style="flex-grow: 1; min-width: 200px;">
                    <strong style="color: var(--text-main); font-size: 1.05em;">${escaparHTML(fin.descricao)}</strong> <span style="font-size:0.8em; color:var(--text-muted);">(${fin.numero_parcela || 1}/${fin.total_parcelas || 1})</span><br>
                    <span style="color: var(--text-muted); font-size: 0.85em;">Entidade: ${escaparHTML(nomeEntidade)}</span><br>
                    <div style="margin-top: 6px; display:flex; gap: 10px; align-items:center; flex-wrap:wrap;">
                        <span style="color: ${cor}; font-weight:bold; font-size: 1.1em;">${sinal} R$ ${valor}</span>
                        <span class="badge-status" style="background: ${fin.status_conta === 'quitada' ? 'var(--success-color)' : 'var(--warning-color)'}; color:#fff;">${fin.status_conta}</span>
                        <span style="color: var(--text-muted); font-size: 0.82em;">📅 Venc: ${fin.data_vencimento ? fin.data_vencimento.split('-').reverse().join('/') : '-'}</span>
                    </div>
                </div>
            `;

            const btnGerir = document.createElement('button');
            btnGerir.textContent = "✏️ Gerir";
            btnGerir.className = "btn-secundario";
            btnGerir.style.cssText = "width: auto; padding: 8px 12px; font-size: 0.85em;";
            btnGerir.onclick = () => desenharModuloCadastrarFinanceiro(fin.id);
            card.appendChild(btnGerir);

            container.appendChild(card);
        });
    } catch (e) {
        tratarErroSupabase(e, "Listar Financeiro");
    }
}

async function desenharModuloCadastrarFinanceiro(idEdicao = null) {
    appRoot.innerHTML = `
        <div class="card" style="margin-top: 4vh; max-width: 700px;">
            <div class="titulo">${idEdicao ? '✏️ Editar Lançamento' : '💰 Novo Lançamento Financeiro'}</div>
            
            <form id="form-financeiro">
                <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px;">
                    <div style="flex: 1; min-width: 140px;">
                        <label>Tipo de Movimento *</label>
                        <select id="fin-tipo-conta" required>
                            <option value="saida">🔴 Saída (Despesa / A Pagar)</option>
                            <option value="entrada">🟢 Entrada (Receita / A Receber)</option>
                        </select>
                    </div>
                    <div style="flex: 1; min-width: 140px;">
                        <label>Status *</label>
                        <select id="fin-status-conta" required>
                            <option value="pendente">⏳ Pendente</option>
                            <option value="quitada">✅ Quitada</option>
                        </select>
                    </div>
                </div>

                <label>Descrição *</label>
                <input type="text" id="fin-desc" required placeholder="Ex: Conta de Luz / Compra de Mercadoria">

                <label>Entidade Vinculada</label>
                <select id="fin-entidade"><option value="">Selecione...</option></select>

                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 120px;">
                        <label>Valor Nominal (R$) *</label>
                        <input type="number" id="fin-valor" step="0.01" required placeholder="0.00">
                    </div>
                    <div style="flex: 1; min-width: 120px;">
                        <label>Qtd. Parcelas *</label>
                        <input type="number" id="fin-parcelas" min="1" max="60" value="1" required ${idEdicao ? 'disabled' : ''}>
                    </div>
                    <div style="flex: 1; min-width: 140px;">
                        <label>Data Vencimento *</label>
                        <input type="date" id="fin-vencimento" required>
                    </div>
                </div>

                <button type="submit" id="btn-salvar-fin" class="btn-neon" style="margin-top: 15px;">💾 Salvar Lançamento</button>
                <button type="button" class="btn-secundario" onclick="desenharModuloFinanceiro()">❌ Cancelar</button>
            </form>
        </div>
    `;

    try {
        const { data: ents } = await clienteSupabase.from('entidades').select('id, nome_completo, tipo').neq('status', 'lixeira').order('nome_completo');
        const sel = document.getElementById('fin-entidade');
        if (ents) ents.forEach(e => sel.innerHTML += `<option value="${e.id}">${escaparHTML(e.nome_completo)} (${e.tipo})</option>`);
    } catch(e) {}

    if (idEdicao) {
        document.getElementById('btn-salvar-fin').textContent = "⏳ A carregar...";
        const { data, error } = await clienteSupabase.from('fin_contas').select('*').eq('id', idEdicao).single();
        if (data && !error) {
            document.getElementById('fin-tipo-conta').value = data.tipo_conta || 'saida';
            document.getElementById('fin-status-conta').value = data.status_conta || 'pendente';
            document.getElementById('fin-desc').value = data.descricao || '';
            document.getElementById('fin-entidade').value = data.entidade_id || '';
            document.getElementById('fin-valor').value = data.valor_nominal || '';
            document.getElementById('fin-parcelas').value = data.total_parcelas || 1;
            document.getElementById('fin-vencimento').value = data.data_vencimento || '';
        }
        document.getElementById('btn-salvar-fin').textContent = "💾 Atualizar Lançamento";
    }

    document.getElementById('form-financeiro').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('btn-salvar-fin');
        btn.textContent = "⏳ A gravar...";
        btn.disabled = true;

        try {
            const tipo = document.getElementById('fin-tipo-conta').value;
            const status = document.getElementById('fin-status-conta').value;
            const desc = document.getElementById('fin-desc').value.trim();
            const entidadeId = document.getElementById('fin-entidade').value || null;
            const valorTotal = parseFloat(document.getElementById('fin-valor').value) || 0;
            const qtdParcelas = parseInt(document.getElementById('fin-parcelas').value) || 1;
            let dataBase = document.getElementById('fin-vencimento').value;

            if (idEdicao) {
                const { error } = await clienteSupabase.from('fin_contas').update({
                    tipo_conta: tipo,
                    status_conta: status,
                    descricao: desc,
                    entidade_id: entidadeId,
                    valor_nominal: valorTotal,
                    data_vencimento: dataBase
                }).eq('id', idEdicao);
                if (error) throw error;
            } else {
                let arrayLancamentos = [];
                const valorParcela = valorTotal / qtdParcelas;
                for (let i = 1; i <= qtdParcelas; i++) {
                    let d = new Date(dataBase + 'T12:00:00');
                    d.setMonth(d.getMonth() + (i - 1));
                    arrayLancamentos.push({
                        tipo_conta: tipo,
                        status_conta: status,
                        descricao: qtdParcelas > 1 ? `${desc} (${i}/${qtdParcelas})` : desc,
                        entidade_id: entidadeId,
                        valor_nominal: valorParcela,
                        data_emissao: new Date().toISOString().split('T')[0],
                        data_vencimento: d.toISOString().split('T')[0],
                        numero_parcela: i,
                        total_parcelas: qtdParcelas
                    });
                }
                const { error } = await clienteSupabase.from('fin_contas').insert(arrayLancamentos);
                if (error) throw error;
            }

            mostrarToast("Lançamento financeiro gravado com sucesso!", "sucesso");
            desenharModuloFinanceiro();
        } catch (erro) {
            tratarErroSupabase(erro, "Salvar Financeiro");
            btn.textContent = "💾 Salvar Lançamento";
            btn.disabled = false;
        }
    });
}


/* =========================================================
   MÓDULO PDV (FRENTE DE CAIXA + CONTROLO DE TURNO)
   ========================================================= */
let turnoAtivoGlobal = null;
let carrinhoPdv = [];

async function desenharModuloPDV() {
    appRoot.innerHTML = `
        <div class="card" style="margin-top: 4vh; max-width: 600px; text-align: center;">
            <div class="titulo">🛒 Verificando Caixa (Turno)</div>
            <p style="color: var(--text-muted);">A validar abertura de caixa com o Supabase...</p>
        </div>
    `;

    try {
        const { data: { user } } = await clienteSupabase.auth.getUser();
        // Verifica se existe turno aberto para o operador
        const { data: turno, error } = await clienteSupabase
            .from('pdv_turnos')
            .select('*')
            .eq('operador_id', user.id)
            .eq('status', 'aberto')
            .maybeSingle();

        if (turno) {
            turnoAtivoGlobal = turno;
            desenharTelaCaixaOperacao();
        } else {
            desenharTelaAberturaCaixa(user.id);
        }
    } catch (e) {
        tratarErroSupabase(e, "Verificar Turno PDV");
    }
}

function desenharTelaAberturaCaixa(userId) {
    appRoot.innerHTML = `
        <div class="card" style="margin-top: 8vh; max-width: 450px;">
            <div class="titulo">🔓 Abertura de Caixa</div>
            <p style="text-align: center; color: var(--text-muted); font-size: 0.9em; margin-bottom: 20px;">
                Informe o valor de troco inicial na gaveta para iniciar as vendas.
            </p>

            <label>Saldo de Abertura / Troco (R$) *</label>
            <input type="number" id="pdv-troco-inicial" step="0.01" value="50.00" placeholder="0.00">

            <button id="btn-abrir-caixa" class="btn-neon">⚡ Abrir Caixa com 1 Clique</button>
            <button type="button" class="btn-secundario" onclick="iniciarApp()">⬅️ Voltar ao Menu</button>
        </div>
    `;

    document.getElementById('btn-abrir-caixa').addEventListener('click', async () => {
        const saldo = parseFloat(document.getElementById('pdv-troco-inicial').value) || 0;
        const btn = document.getElementById('btn-abrir-caixa');
        btn.textContent = "⏳ A abrir...";
        btn.disabled = true;

        try {
            // Cria ou deteta terminal padrão
            let { data: term } = await clienteSupabase.from('pdv_terminais').select('id').limit(1).maybeSingle();
            let terminalId = term ? term.id : null;

            if (!terminalId) {
                const { data: novoTerm, error: errTerm } = await clienteSupabase
                    .from('pdv_terminais')
                    .insert([{ codigo_terminal: 'CAIXA-01', descricao_localizacao: 'Loja Principal', ativo: true }])
                    .select('id')
                    .single();
                if (errTerm) throw errTerm;
                terminalId = novoTerm.id;
            }

            const { data: novoTurno, error: errTurno } = await clienteSupabase
                .from('pdv_turnos')
                .insert([{
                    terminal_id: terminalId,
                    operador_id: userId,
                    saldo_abertura: saldo,
                    status: 'aberto'
                }])
                .select('*')
                .single();

            if (errTurno) throw errTurno;

            turnoAtivoGlobal = novoTurno;
            mostrarToast("Caixa aberto com sucesso!", "sucesso");
            desenharTelaCaixaOperacao();
        } catch (e) {
            tratarErroSupabase(e, "Abertura de Caixa");
            btn.textContent = "⚡ Abrir Caixa com 1 Clique";
            btn.disabled = false;
        }
    });
}








function desenharTelaCaixaOperacao() {
    carrinhoPdv = [];
    appRoot.innerHTML = `
        <div class="card" style="margin-top: 2vh; max-width: 900px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; margin-bottom:15px; border-bottom:1px solid var(--border-color); padding-bottom:10px;">
                <span class="titulo" style="margin:0;">🛒 Frente de Caixa (PDV)</span>
                <div style="display:flex; gap:8px;">
                    <button id="btn-fechar-turno" class="btn-perigo" style="width:auto; padding:6px 12px; font-size:0.85em;">🔒 Fechar Caixa</button>
                    <button class="btn-secundario" style="width:auto; padding:6px 12px; font-size:0.85em;" onclick="iniciarApp()">🏠 Menu</button>
                </div>
            </div>

            <div style="display: flex; gap: 10px; margin-bottom: 15px; flex-wrap: wrap;">
                <input type="text" id="pdv-busca-prod" placeholder="🔍 Pesquisar produto por Nome ou Código de Barras..." style="flex: 2; margin-bottom:0;">
                <button type="button" id="btn-scan-pdv" style="background: var(--info-color); color: white; border: none; border-radius: 8px; padding: 0 16px; cursor: pointer; font-size: 1.2em;">📷</button>
            </div>

            <div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 15px; flex-wrap: wrap;">
                <!-- Lista de Itens no Carrinho -->
                <div style="background: rgba(0,0,0,0.15); border: 1px solid var(--border-color); border-radius: 10px; padding: 12px; min-height: 250px; max-height: 350px; overflow-y: auto;">
                    <h4 style="margin-top:0; color: var(--accent-neon);">Carrinho de Compras</h4>
                    <div id="pdv-carrinho-itens">
                        <p style="text-align:center; color: var(--text-muted); margin-top: 40px;">Carrinho vazio. Bipe um produto ou pesquise acima.</p>
                    </div>
                </div>

                <!-- Resumo e Pagamento -->
                <div style="background: rgba(0,0,0,0.15); border: 1px solid var(--border-color); border-radius: 10px; padding: 15px; display:flex; flex-direction:column; justify-content:space-between;">
                    <div>
                        <h4 style="margin-top:0; color: var(--accent-neon);">Resumo do Pagamento</h4>
                        <div style="font-size: 1.8em; font-weight: bold; color: var(--success-color); margin-bottom: 15px; text-align: right;" id="pdv-total-geral">R$ 0,00</div>
                        


<!-- Seleção e Criação de Cliente -->
                        <div style="display:flex; justify-content:space-between; align-items:flex-end; gap:5px; margin-bottom: 10px;">
                            <div style="flex-grow: 1;">
                                <label style="margin-bottom: 2px;">Cliente / Entidade</label>
                                <select id="pdv-cliente" style="margin-bottom: 0;">
                                    <option value="">Consumidor Final (Sem Registo)</option>
                                </select>
                            </div>
                            <button id="btn-pdv-novo-cliente" class="btn-secundario" style="width: auto; padding: 12px; margin-bottom: 0;" title="Registar Novo Cliente">➕</button>
                        </div>

                        <!-- Opção de Delivery Automático -->
                        <div style="background: rgba(0,0,0,0.15); padding: 10px; border-radius: 8px; margin-bottom: 10px; border: 1px dashed var(--border-color);">
                            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--accent-neon); font-weight: bold; margin: 0;">
                                <input type="checkbox" id="pdv-is-entrega" style="width: 18px; height: 18px; margin: 0; cursor: pointer;">
                                🛵 Enviar para Entrega?
                            </label>
                            <textarea id="pdv-endereco-entrega" placeholder="Morada completa e ponto de referência..." rows="2" style="display: none; margin-top: 10px; margin-bottom: 0;"></textarea>
                        </div>
                        
                        <!-- Formas de Pagamento Atualizadas -->
                        <label>Forma de Pagamento *</label>
                        <select id="pdv-forma-pgto" style="margin-bottom: 10px;">
                            <option value="dinheiro">💵 Dinheiro</option>
                            <option value="mercado_pago_credito">💳 Mercado Pago (Cartão de Crédito)</option>
                            <option value="mercado_pago_debito">💳 Mercado Pago (Cartão de Débito)</option>
                            <option value="mercado_pago_parcelado">💳 Mercado Pago (Parcelado)</option>
                        </select>

                        <label>Valor Recebido (R$)</label>
                        <input type="number" id="pdv-valor-recebido" step="0.01" placeholder="0.00">



                       





                    </div>

                    <div>
                        <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-weight:bold;">
                            <span>Troco:</span>
                            <span id="pdv-troco-calc" style="color: var(--warning-color);">R$ 0,00</span>
                        </div>
                        <button id="btn-finalizar-venda" class="btn-sucesso" style="padding: 14px; font-size: 1.1em;">✅ Finalizar Venda</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Eventos do PDV
    const inputBusca = document.getElementById('pdv-busca-prod');
    inputBusca.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const termo = inputBusca.value.trim();
            if (termo) {
                await adicionarProdutoCarrinhoPdv(termo);
                inputBusca.value = '';
            }
        }
    });

    document.getElementById('btn-scan-pdv').addEventListener('click', () => {
        abrirScannerGlobal(async (codigo) => {
            await adicionarProdutoCarrinhoPdv(codigo);
        });
    });



document.getElementById('pdv-valor-recebido').addEventListener('input', calcularTrocoPdv);
    document.getElementById('btn-finalizar-venda').addEventListener('click', finalizarVendaPdv);
    document.getElementById('btn-fechar-turno').addEventListener('click', fecharTurnoPdv);

    // 1. Mostrar/esconder o campo de morada quando marcar a opção de entrega
    document.getElementById('pdv-is-entrega').addEventListener('change', (e) => {
        document.getElementById('pdv-endereco-entrega').style.display = e.target.checked ? 'block' : 'none';
    });

    // 2. Função para consultar a tabela de entidades e listar no PDV
    async function carregarClientesPdv() {
        const select = document.getElementById('pdv-cliente');
        try {
            const { data } = await clienteSupabase.from('entidades').select('id, nome_completo').eq('tipo', 'cliente').neq('status', 'lixeira').order('nome_completo');
            select.innerHTML = '<option value="">Consumidor Final (Sem Registo)</option>';
            if (data) data.forEach(c => select.innerHTML += `<option value="${c.id}">${escaparHTML(c.nome_completo)}</option>`);
        } catch (e) { console.error(e); }
    }
    carregarClientesPdv(); // Executa assim que a tela abre

    // 3. Botão para criar um cliente rápido sem sair do ecrã do Caixa
    document.getElementById('btn-pdv-novo-cliente').addEventListener('click', async () => {
        const nome = prompt("Nome completo do novo cliente:");
        if (!nome) return; // Se cancelar, não faz nada
        const telefone = prompt("Telemóvel / WhatsApp (Opcional):");
        
        try {
            const { data, error } = await clienteSupabase.from('entidades')
                .insert([{ tipo: 'cliente', nome_completo: nome, telefone: telefone || '', status: 'ativo' }])
                .select('id, nome_completo').single();
                
            if (error) throw error;
            mostrarToast("Cliente cadastrado com sucesso!", "sucesso");
            await carregarClientesPdv(); // Recarrega a lista
            document.getElementById('pdv-cliente').value = data.id; // Já deixa o novo cliente selecionado para a venda
        } catch (e) {
            tratarErroSupabase(e, "Criar Cliente Rápido");
        }
    });


}

async function adicionarProdutoCarrinhoPdv(termo) {
    try {
        const { data, error } = await clienteSupabase
            .from('produtos')
            .select('*')
            .eq('esta_ativo', true)
            .or(`codigo_barras.eq.${termo},sku.eq.${termo},nome.ilike.%${termo}%`)
            .limit(1)
            .maybeSingle();

        if (error || !data) {
            mostrarToast("Produto não encontrado no catálogo.", "aviso");
            return;
        }

        const existente = carrinhoPdv.find(p => p.id === data.id);
        if (existente) {
            existente.quantidade += 1;
            existente.subtotal = existente.quantidade * existente.preco_venda;
        } else {
            carrinhoPdv.push({
                id: data.id,
                nome: data.nome,
                preco_venda: parseFloat(data.preco_venda || 0),
                quantidade: 1,
                subtotal: parseFloat(data.preco_venda || 0),
                estoque_atual: parseFloat(data.estoque_atual || 0)
            });
        }

        renderizarCarrinhoPdv();
        mostrarToast(`${data.nome} adicionado.`, "sucesso");
    } catch (e) {
        tratarErroSupabase(e, "Adicionar ao Carrinho");
    }
}

function renderizarCarrinhoPdv() {
    const container = document.getElementById('pdv-carrinho-itens');
    if (!container) return;

    if (carrinhoPdv.length === 0) {
        container.innerHTML = `<p style='text-align:center; color: var(--text-muted); margin-top: 40px;'>Carrinho vazio. Bipe um produto ou pesquise acima.</p>`;
        document.getElementById('pdv-total-geral').textContent = "R$ 0,00";
        return;
    }

    let html = '';
    let totalGeral = 0;

    carrinhoPdv.forEach((item, index) => {
        totalGeral += item.subtotal;
        html += `
            <div style="background: var(--input-bg); border: 1px solid var(--border-color); padding: 8px 12px; border-radius: 8px; margin-bottom: 8px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <strong style="font-size: 0.95em; color: var(--text-main);">${escaparHTML(item.nome)}</strong><br>
                    <span style="font-size: 0.82em; color: var(--text-muted);">${item.quantidade}x R$ ${item.preco_venda.toFixed(2)} = <strong>R$ ${item.subtotal.toFixed(2)}</strong></span>
                </div>
                <div style="display:flex; gap:5px;">
                    <button onclick="alterarQtdCarrinho(${index}, 1)" style="background:var(--info-color); color:#fff; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;">➕</button>
                    <button onclick="alterarQtdCarrinho(${index}, -1)" style="background:var(--warning-color); color:#000; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;">➖</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    document.getElementById('pdv-total-geral').textContent = `R$ ${totalGeral.toFixed(2)}`;
    calcularTrocoPdv();
}

window.alterarQtdCarrinho = function(index, delta) {
    carrinhoPdv[index].quantidade += delta;
    if (carrinhoPdv[index].quantidade <= 0) {
        carrinhoPdv.splice(index, 1);
    } else {
        carrinhoPdv[index].subtotal = carrinhoPdv[index].quantidade * carrinhoPdv[index].preco_venda;
    }
    renderizarCarrinhoPdv();
};

function calcularTrocoPdv() {
    const total = carrinhoPdv.reduce((acc, item) => acc + item.subtotal, 0);
    const recebido = parseFloat(document.getElementById('pdv-valor-recebido')?.value) || 0;
    const troco = recebido - total;
    const elTroco = document.getElementById('pdv-troco-calc');
    if (elTroco) {
        elTroco.textContent = troco >= 0 ? `R$ ${troco.toFixed(2)}` : "R$ 0,00 (Falta Dinheiro)";
    }
}

async function finalizarVendaPdv() {
    if (carrinhoPdv.length === 0) return mostrarToast("O carrinho está vazio.", "aviso");

    const totalGeral = carrinhoPdv.reduce((acc, item) => acc + item.subtotal, 0);
    const formaPgto = document.getElementById('pdv-forma-pgto').value;
    const valorRecebido = parseFloat(document.getElementById('pdv-valor-recebido').value) || totalGeral;


    // NOVO CÓDIGO (Adicionar imediatamente ABAIXO das linhas superiores e ACIMA das linhas inferiores)
    const clienteId = document.getElementById('pdv-cliente').value || null;
    const isEntrega = document.getElementById('pdv-is-entrega').checked;
    const enderecoEntrega = document.getElementById('pdv-endereco-entrega').value.trim();

    // Validação de segurança: Obriga a digitar a morada se pedir entrega
    if (isEntrega && !enderecoEntrega) {
        return mostrarToast("Por favor, digite a morada completa para a entrega.", "aviso");
    }


    if (valorRecebido < totalGeral) {
        return mostrarToast("O valor recebido é inferior ao total da compra.", "aviso");
    }

    const btn = document.getElementById('btn-finalizar-venda');
    btn.textContent = "⏳ A processar venda...";
    btn.disabled = true;

    try {
        // 1. Cria o registo da venda



      // NOVO CÓDIGO
        const { data: venda, error: errVenda } = await clienteSupabase
            .from('pdv_vendas')
            .insert([{
                turno_id: turnoAtivoGlobal.id,
                cliente_id: clienteId, // Injeta o ID do cliente selecionado
                total_bruto: totalGeral,
                total_desconto: 0,
                total_liquido: totalGeral,
                status: 'concluida',
                forma_pagamento: formaPgto
            }])
            .select('id, numero_pedido')
            .single();





        if (errVenda) throw errVenda;

        // 2. Insere os itens da venda e dá baixa no stock
        for (const item of carrinhoPdv) {
            await clienteSupabase.from('pdv_itens_venda').insert([{
                venda_id: venda.id,
                produto_id: item.id,
                quantidade: item.quantidade,
                preco_unitario: item.preco_venda,
                subtotal: item.subtotal
            }]);

            // Atualiza stock do produto
            const novoEstoque = item.estoque_atual - item.quantidade;
            await clienteSupabase.from('produtos').update({ estoque_atual: novoEstoque }).eq('id', item.id);
        }

        // 3. Regista o pagamento no financeiro de vendas
        const troco = valorRecebido - totalGeral;
        await clienteSupabase.from('fin_pagamentos_venda').insert([{
            venda_id: venda.id,
            turno_id: turnoAtivoGlobal.id,
            metodo: formaPgto,
            valor_pago: valorRecebido,
            troco: troco
        }]);

        // 4. Cria título no Contas a Receber (fin_contas)
        await clienteSupabase.from('fin_contas').insert([{
            tipo_conta: 'entrada',
            status_conta: 'quitada',
            descricao: `Venda PDV #${venda.id.split('-')[0].toUpperCase()}`,
            valor_nominal: totalGeral,
            valor_pago: totalGeral,
            data_emissao: new Date().toISOString().split('T')[0],
            data_vencimento: new Date().toISOString().split('T')[0],
            data_pagamento: new Date().toISOString().split('T')[0],
            numero_parcela: 1,
            total_parcelas: 1
        }]);

// NOVO CÓDIGO (Adicionar imediatamente ABAIXO das linhas superiores e ACIMA das linhas inferiores)
        // 5. Automação de Delivery: Se a opção de entrega foi marcada, cria o log
        if (isEntrega) {
            await clienteSupabase.from('log_entregas').insert([{
                venda_id: venda.id,
                endereco_entrega: enderecoEntrega,
                status_entrega: 'pendente'
            }]);
        }


        mostrarToast("Venda finalizada com sucesso!", "sucesso");
        imprimirCupomTermico(venda.id, totalGeral, valorRecebido, troco, formaPgto);
        desenharTelaCaixaOperacao();
    } catch (e) {
        tratarErroSupabase(e, "Finalizar Venda");
        btn.textContent = "✅ Finalizar Venda";
        btn.disabled = false;
    }
}

function imprimirCupomTermico(vendaId, total, recebido, troco, formaPgto) {
    const w = window.open('', '', 'width=400,height=600');
    let itensHtml = '';
    carrinhoPdv.forEach(i => {
        itensHtml += `<div>${escaparHTML(i.nome)}<br>${i.quantidade}x R$${i.preco_venda.toFixed(2)} ...... R$${i.subtotal.toFixed(2)}</div>`;
    });

    w.document.write(`
        <!DOCTYPE html><html><head><meta charset="UTF-8"><title>Cupom - #${vendaId.split('-')[0]}</title>
        <style>
            body { font-family: monospace; width: 300px; margin: 0 auto; padding: 10px; font-size: 12px; color: #000; }
            .center { text-align: center; }
            .line { border-bottom: 1px dashed #000; margin: 8px 0; }
        </style></head><body>
        <div class="center"><strong>${escaparHTML(dadosEmpresaGlobal.nome_completo)}</strong><br>
        CNPJ: ${escaparHTML(dadosEmpresaGlobal.numero_documento || 'N/D')}<br>
        ${escaparHTML(dadosEmpresaGlobal.endereco_completo)}</div>
        <div class="line"></div>
        <div class="center"><strong>CUPOM NÃO FISCAL</strong></div>
        <div>Data: ${new Date().toLocaleString()}</div>
        <div class="line"></div>
        <div>${itensHtml}</div>
        <div class="line"></div>
        <div><strong>TOTAL: R$ ${total.toFixed(2)}</strong></div>
        <div>Forma Pgto: ${formaPgto.toUpperCase()}</div>
        <div>Valor Recebido: R$ ${recebido.toFixed(2)}</div>
        <div>Troco: R$ ${troco.toFixed(2)}</div>
        <div class="line"></div>
        <div class="center">Obrigado pela preferência!<br>Volte sempre!</div>
        <script>setTimeout(() => { window.print(); window.close(); }, 1000);<\/script></body></html>
    `);
    w.document.close();
}

async function fecharTurnoPdv() {
    if (!confirm("Deseja fechar o turno atual do caixa?")) return;
    try {
        const { error } = await clienteSupabase
            .from('pdv_turnos')
            .update({ status: 'fechado', fechado_em: new Date().toISOString() })
            .eq('id', turnoAtivoGlobal.id);

        if (error) throw error;
        mostrarToast("Caixa fechado com sucesso.", "sucesso");
        turnoAtivoGlobal = null;
        iniciarApp();
    } catch (e) {
        tratarErroSupabase(e, "Fechar Caixa");
    }
}
