/* =========================================================
   🛍️ MÓDULO VITRINE (LOJA ONLINE COM SEGURANÇA VIA VIEW)
   ========================================================= */

let carrinhoVitrine = [];

/**
 * Desenha o ecrã principal da loja para o cliente
 */
function desenharModuloVitrinePublica() {
    // Esconde os botões flutuantes de administração quando estamos na loja
    const containerFerramentas = document.querySelector('div[style*="z-index: 10000"]');
    if (containerFerramentas) containerFerramentas.style.display = 'none';

    const logoHTML = dadosEmpresaGlobal.foto_url 
        ? `<img src="${escaparHTML(dadosEmpresaGlobal.foto_url)}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid var(--accent-neon);">`
        : `🛍️`;

    appRoot.innerHTML = `
        <div style="max-width: 900px; margin: 0 auto; padding-top: 2vh;">
            
            <!-- Cabeçalho da Loja -->
            <div class="card" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 15px 22px; max-width: 100%;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    ${logoHTML}
                    <div>
                        <h2 style="margin: 0; color: var(--accent-neon);">${escaparHTML(dadosEmpresaGlobal.nome_completo || 'Nossa Loja')}</h2>
                        <span style="font-size: 0.85em; color: var(--text-muted);">Faça o seu pedido online</span>
                    </div>
                </div>
                
                <!-- Resumo do Carrinho no Cabeçalho -->
                <button id="btn-ver-carrinho" class="btn-neon" style="width: auto; margin: 0; position: relative;">
                    🛒 Carrinho (<span id="vitrine-qtd-carrinho">0</span>)
                </button>
            </div>

            <!-- Filtros e Pesquisa -->
            <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
                <input type="text" id="vitrine-busca" placeholder="🔍 Pesquisar produtos..." style="flex: 2; min-width: 200px; margin-bottom: 0;">
                <select id="vitrine-categoria" style="flex: 1; min-width: 150px; margin-bottom: 0;">
                    <option value="">Todas as Categorias</option>
                </select>
                <button class="btn-secundario" style="width: auto; margin: 0; padding: 0 15px;" onclick="voltarAoERP()">⬅️ Voltar ao ERP</button>
            </div>

            <!-- Grelha de Produtos -->
            <div id="vitrine-lista-produtos" class="vitrine-grid">
                <p style="text-align:center; color: var(--text-muted); width: 100%; grid-column: 1 / -1;">⏳ A carregar catálogo seguro...</p>
            </div>
        </div>

        <!-- MODAL DO CARRINHO (Escondido por padrão) -->
        <div id="modal-carrinho" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 99999; justify-content: center; align-items: center; padding: 15px;">
            <div class="card" style="width: 100%; max-width: 500px; max-height: 90vh; overflow-y: auto; position: relative;">
                <h3 style="color: var(--accent-neon); margin-top: 0; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">🛒 O seu Carrinho</h3>
                
                <div id="vitrine-itens-carrinho" style="min-height: 100px; margin-bottom: 20px;">
                    <!-- Itens entram aqui -->
                </div>

                <div style="border-top: 1px solid var(--border-color); padding-top: 15px; margin-bottom: 15px;">
                    <label>Como deseja receber?</label>
                    <select id="vitrine-tipo-entrega" style="margin-bottom: 10px;">
                        <option value="recolha">🏪 Levantar na Loja</option>
                        <option value="entrega">🛵 Entrega ao Domicílio</option>
                    </select>
                    
                    <textarea id="vitrine-morada" placeholder="Digite a sua morada completa com ponto de referência..." style="display: none; margin-bottom: 10px;" rows="2"></textarea>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <strong style="font-size: 1.2em;">Total:</strong>
                    <strong style="font-size: 1.5em; color: var(--success-color);" id="vitrine-total-carrinho">R$ 0,00</strong>
                </div>

                <button id="btn-enviar-pedido" class="btn-sucesso" style="font-size: 1.1em; padding: 14px;">📱 Enviar Pedido por WhatsApp</button>
                <button class="btn-secundario" onclick="document.getElementById('modal-carrinho').style.display='none'">Continuar a Comprar</button>
            </div>
        </div>
    `;

    // Eventos
    document.getElementById('vitrine-busca').addEventListener('input', dispararBuscaVitrine);
    document.getElementById('vitrine-categoria').addEventListener('change', dispararBuscaVitrine);
    document.getElementById('btn-ver-carrinho').addEventListener('click', () => {
        document.getElementById('modal-carrinho').style.display = 'flex';
        renderizarItensCarrinho();
    });
    document.getElementById('vitrine-tipo-entrega').addEventListener('change', (e) => {
        document.getElementById('vitrine-morada').style.display = e.target.value === 'entrega' ? 'block' : 'none';
    });
    document.getElementById('btn-enviar-pedido').addEventListener('click', finalizarPedidoWhatsApp);

    carregarFiltrosVitrine();
    carregarProdutosVitrine();
    atualizarBadgeCarrinho();
}

/**
 * Função utilitária para repor o botão flutuante ao sair da vitrine e voltar ao ERP logado
 */
function voltarAoERP() {
    const containerFerramentas = document.querySelector('div[style*="z-index: 10000"]');
    if (containerFerramentas) containerFerramentas.style.display = 'flex';
    iniciarApp();
}

/**
 * Procura as categorias únicas na View para preencher o filtro
 */
async function carregarFiltrosVitrine() {
    try {
        const { data } = await clienteSupabase.from('vitrine').select('categoria');
        if (data) {
            // Extrai categorias únicas que não sejam nulas
            const categorias = [...new Set(data.map(i => i.categoria).filter(c => c))];
            const select = document.getElementById('vitrine-categoria');
            categorias.forEach(c => select.innerHTML += `<option value="${c}">${escaparHTML(c)}</option>`);
        }
    } catch (e) { console.error("Erro ao carregar categorias", e); }
}

let timerBuscaVitrine;
function dispararBuscaVitrine() {
    clearTimeout(timerBuscaVitrine);
    timerBuscaVitrine = setTimeout(carregarProdutosVitrine, 400);
}

/**
 * Carrega os produtos exclusivamente a partir da VIEW 'vitrine'
 */
async function carregarProdutosVitrine() {
    const container = document.getElementById('vitrine-lista-produtos');
    const termo = document.getElementById('vitrine-busca').value.trim();
    const categoria = document.getElementById('vitrine-categoria').value;

    container.innerHTML = "<p style='text-align:center; color: var(--text-muted); width: 100%; grid-column: 1 / -1;'>⏳ A consultar catálogo seguro...</p>";

    try {
        let query = clienteSupabase.from('vitrine').select('*').order('nome', { ascending: true });

        if (termo) query = query.ilike('nome', `%${termo}%`);
        if (categoria) query = query.eq('categoria', categoria);

        const { data, error } = await query;
        if (error) throw error;

        container.innerHTML = "";
        
        if (!data || data.length === 0) {
            container.innerHTML = "<p style='text-align:center; color: var(--text-muted); width: 100%; grid-column: 1 / -1;'>Nenhum produto encontrado na loja.</p>";
            return;
        }

        data.forEach(prod => {
            const foto = prod.foto_url || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>';
            const preco = parseFloat(prod.preco_venda || 0).toFixed(2);
            
            // Usa as classes CSS da tua style.css
            const card = document.createElement('div');
            card.className = "vitrine-card";
            card.innerHTML = `
                <div>
                    <img src="${escaparHTML(foto)}" style="width: 100%; height: 140px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                    <div style="font-weight: bold; color: var(--text-main); font-size: 1.05em; margin-bottom: 5px; line-height: 1.2;">${escaparHTML(prod.nome)}</div>
                    <div style="color: var(--text-muted); font-size: 0.85em; margin-bottom: 10px;">${escaparHTML(prod.unidade_comercial || 'UN')}</div>
                </div>
                <div>
                    <div style="font-size: 1.3em; font-weight: bold; color: var(--success-color); margin-bottom: 10px;">R$ ${preco}</div>
                    <button class="btn-neon" style="padding: 8px;" onclick="adicionarProdutoVitrine('${prod.id}', '${escaparHTML(prod.nome)}', ${prod.preco_venda})">🛒 Adicionar</button>
                </div>
            `;
            container.appendChild(card);
        });

    } catch (e) {
        console.error(e);
        container.innerHTML = "<p style='text-align:center; color: var(--danger-color); width: 100%; grid-column: 1 / -1;'>❌ Erro ao carregar vitrine.</p>";
    }
}

/**
 * Lógica do Carrinho de Compras da Vitrine
 */
window.adicionarProdutoVitrine = function(id, nome, preco) {
    const existente = carrinhoVitrine.find(p => p.id === id);
    if (existente) {
        existente.quantidade += 1;
        existente.subtotal = existente.quantidade * existente.preco;
    } else {
        carrinhoVitrine.push({ id, nome, preco, quantidade: 1, subtotal: preco });
    }
    atualizarBadgeCarrinho();
    mostrarToast(`${nome} adicionado ao carrinho!`, 'sucesso');
};

function atualizarBadgeCarrinho() {
    const totalItens = carrinhoVitrine.reduce((acc, item) => acc + item.quantidade, 0);
    const badge = document.getElementById('vitrine-qtd-carrinho');
    if (badge) badge.textContent = totalItens;
}

function renderizarItensCarrinho() {
    const container = document.getElementById('vitrine-itens-carrinho');
    if (carrinhoVitrine.length === 0) {
        container.innerHTML = "<p style='text-align:center; color: var(--text-muted);'>O seu carrinho está vazio.</p>";
        document.getElementById('vitrine-total-carrinho').textContent = "R$ 0,00";
        document.getElementById('btn-enviar-pedido').disabled = true;
        return;
    }

    document.getElementById('btn-enviar-pedido').disabled = false;
    let html = '';
    let totalGeral = 0;

    carrinhoVitrine.forEach((item, index) => {
        totalGeral += item.subtotal;
        html += `
            <div style="background: var(--input-bg); border: 1px solid var(--border-color); padding: 10px; border-radius: 8px; margin-bottom: 8px; display:flex; justify-content:space-between; align-items:center;">
                <div style="flex-grow: 1;">
                    <strong style="font-size: 0.95em; color: var(--text-main);">${item.nome}</strong><br>
                    <span style="font-size: 0.85em; color: var(--text-muted);">R$ ${item.preco.toFixed(2)}</span>
                </div>
                <div style="display:flex; align-items: center; gap:10px;">
                    <div style="display:flex; gap:5px; background: rgba(0,0,0,0.2); padding: 4px; border-radius: 6px;">
                        <button onclick="alterarQtdVitrine(${index}, -1)" style="background:var(--warning-color); color:#000; border:none; width: 25px; height: 25px; border-radius:4px; font-weight:bold; cursor:pointer;">-</button>
                        <span style="width: 20px; text-align: center; font-weight: bold; line-height: 25px;">${item.quantidade}</span>
                        <button onclick="alterarQtdVitrine(${index}, 1)" style="background:var(--info-color); color:#fff; border:none; width: 25px; height: 25px; border-radius:4px; font-weight:bold; cursor:pointer;">+</button>
                    </div>
                    <strong style="min-width: 70px; text-align: right;">R$ ${item.subtotal.toFixed(2)}</strong>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    document.getElementById('vitrine-total-carrinho').textContent = `R$ ${totalGeral.toFixed(2)}`;
}

window.alterarQtdVitrine = function(index, delta) {
    carrinhoVitrine[index].quantidade += delta;
    if (carrinhoVitrine[index].quantidade <= 0) {
        carrinhoVitrine.splice(index, 1);
    } else {
        carrinhoVitrine[index].subtotal = carrinhoVitrine[index].quantidade * carrinhoVitrine[index].preco;
    }
    renderizarItensCarrinho();
    atualizarBadgeCarrinho();
};

/**
 * Compila o pedido num texto formatado e envia para o WhatsApp da Empresa
 */
function finalizarPedidoWhatsApp() {
    const telefoneEmpresa = dadosEmpresaGlobal.telefone;
    if (!telefoneEmpresa) {
        return mostrarToast("Erro: O telefone da empresa não está configurado no sistema.", "erro");
    }

    const tipoEntrega = document.getElementById('vitrine-tipo-entrega').value;
    const morada = document.getElementById('vitrine-morada').value.trim();

    if (tipoEntrega === 'entrega' && !morada) {
        return mostrarToast("Por favor, digite a sua morada para a entrega.", "aviso");
    }

    let texto = `*NOVO PEDIDO ONLINE* 🛍️\n\n`;
    let total = 0;

    carrinhoVitrine.forEach(item => {
        texto += `▪️ ${item.quantidade}x ${item.nome} - R$ ${item.subtotal.toFixed(2)}\n`;
        total += item.subtotal;
    });

    texto += `\n*Total a pagar:* R$ ${total.toFixed(2)}\n`;
    texto += `*Modo:* ${tipoEntrega === 'recolha' ? '🏪 Levantar na Loja' : '🛵 Entrega ao Domicílio'}\n`;
    
    if (tipoEntrega === 'entrega') {
        texto += `*Morada:* ${morada}\n`;
    }

    // Se tiver chave PIX cadastrada, manda junto
    if (dadosEmpresaGlobal.chave_pix) {
        texto += `\n*Chave PIX para pagamento:* ${dadosEmpresaGlobal.chave_pix}`;
    }

    const url = `https://wa.me/${telefoneEmpresa}?text=${encodeURIComponent(texto)}`;
    
    // Limpa o carrinho e envia
    carrinhoVitrine = [];
    document.getElementById('modal-carrinho').style.display = 'none';
    atualizarBadgeCarrinho();
    
    window.open(url, '_blank');
}