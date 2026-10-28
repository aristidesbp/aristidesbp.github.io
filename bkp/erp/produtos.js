

/* =========================================================
   🟥 BLOCO 4: MÓDULO DE PRODUTOS, LIXEIRA E IMPORTADOR XML (NF-e) 🟥
   ========================================================= */

let paginaAtualProd = 0;
let exibindoLixeiraProd = false;

function desenharModuloProdutos() {
    paginaAtualProd = 0;
    exibindoLixeiraProd = false;
    
    appRoot.innerHTML = `
        <div class="card" style="margin-top: 4vh; max-width: 850px;">
            <div class="titulo" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <span id="prod-titulo-painel">📦 Catálogo de Produtos</span>
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                    <button id="btn-importar-xml" class="btn-secundario" style="width: auto; padding: 8px 12px; margin: 0; border-color: var(--accent-neon); color: var(--accent-neon);">📥 Importar XML</button>
                    <button id="btn-ver-lixeira-prod" class="btn-secundario" style="width: auto; padding: 8px 12px; margin: 0;">👁️ Lixeira</button>
                    <button id="btn-esvaziar-lixeira-prod" class="btn-perigo" style="display: none; width: auto; padding: 8px 12px; margin: 0;">🧹 Purgar</button>
                    <button id="btn-novo-produto" class="btn-neon" style="width: auto; padding: 8px 12px; margin: 0;">➕ Novo</button>
                </div>
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap;">
                <input type="text" id="prod-busca" placeholder="🔍 Buscar por Nome, EAN ou SKU..." style="flex: 2; min-width: 200px; margin-bottom: 0;">
                <button type="button" id="btn-scan-busca-prod" style="background: var(--info-color); color: white; border: none; border-radius: 8px; padding: 0 14px; cursor: pointer; font-size: 1.1em;">📷</button>
                <div style="display: flex; align-items: center; gap: 5px; flex: 1; min-width: 110px;">
                    <label style="margin:0; white-space: nowrap;">Qtd. Pág:</label>
                    <input type="number" id="prod-itens-por-pagina" value="15" min="1" max="100" style="margin:0; padding: 10px;">
                </div>
            </div>

            <div id="prod-lista-container" style="display:flex; flex-direction:column; gap:10px; margin-top:15px;">
                <p style="text-align:center; color: var(--text-muted);">⏳ A carregar catálogo...</p>
            </div>
            
            <div id="prod-paginacao" style="display: none; justify-content: center; align-items: center; gap: 15px; margin-top: 20px;">
                <button id="btn-prod-ant" class="btn-secundario" style="width: auto;">⬅️ Anterior</button>
                <strong id="texto-prod-paginacao" style="color: var(--text-main);">Página 1</strong>
                <button id="btn-prod-prox" class="btn-secundario" style="width: auto;">Próxima ➡️</button>
            </div>
        </div>
    `;

    document.getElementById('btn-novo-produto').addEventListener('click', () => desenharModuloCadastrarProduto());
    document.getElementById('btn-importar-xml').addEventListener('click', () => desenharModuloImportarXml());

    document.getElementById('btn-ver-lixeira-prod').addEventListener('click', () => {
        exibindoLixeiraProd = !exibindoLixeiraProd;
        paginaAtualProd = 0;
        document.getElementById('prod-busca').value = '';
        
        const btnVer = document.getElementById('btn-ver-lixeira-prod');
        const btnNovo = document.getElementById('btn-novo-produto');
        const btnXml = document.getElementById('btn-importar-xml');
        const btnEsvaziar = document.getElementById('btn-esvaziar-lixeira-prod');
        const titulo = document.getElementById('prod-titulo-painel');

        if (exibindoLixeiraProd) {
            btnVer.textContent = "📦 Ver Catálogo";
            btnVer.className = "btn-neon";
            titulo.textContent = "🗑️ Lixeira de Produtos";
            btnNovo.style.display = "none";
            btnXml.style.display = "none";
            btnEsvaziar.style.display = "block";
            carregarListaProdutosLixeira();
        } else {
            btnVer.textContent = "👁️ Lixeira";
            btnVer.className = "btn-secundario";
            titulo.textContent = "📦 Catálogo de Produtos";
            btnNovo.style.display = "block";
            btnXml.style.display = "block";
            btnEsvaziar.style.display = "none";
            carregarListaProdutosAtivos();
        }
    });

    document.getElementById('btn-esvaziar-lixeira-prod').addEventListener('click', esvaziarLixeiraProdutosDefinitivo);

    let timerBusca;
    const dispararBuscaProd = () => {
        clearTimeout(timerBusca);
        paginaAtualProd = 0;
        timerBusca = setTimeout(() => {
            exibindoLixeiraProd ? carregarListaProdutosLixeira() : carregarListaProdutosAtivos();
        }, 400);
    };

    document.getElementById('prod-busca').addEventListener('input', dispararBuscaProd);
    document.getElementById('prod-itens-por-pagina').addEventListener('change', dispararBuscaProd);

    document.getElementById('btn-scan-busca-prod').addEventListener('click', () => {
        abrirScannerGlobal((codigoLido) => {
            document.getElementById('prod-busca').value = codigoLido;
            dispararBuscaProd();
        });
    });

    document.getElementById('btn-prod-ant').addEventListener('click', () => { if (paginaAtualProd > 0) { paginaAtualProd--; dispararBuscaProd(); } });
    document.getElementById('btn-prod-prox').addEventListener('click', () => { paginaAtualProd++; dispararBuscaProd(); });

    carregarListaProdutosAtivos();
}

async function carregarListaProdutosAtivos() {
    const container = document.getElementById('prod-lista-container');
    if (!container) return;

    const termo = document.getElementById('prod-busca').value.trim();
    const limite = parseInt(document.getElementById('prod-itens-por-pagina').value) || 15;

    container.innerHTML = "<p style='text-align:center; color: var(--text-muted);'>⏳ A consultar Supabase...</p>";
    const inicio = paginaAtualProd * limite;
    const fim = inicio + limite - 1;

    try {
        let query = clienteSupabase
            .from('produtos')
            .select('*', { count: 'exact' })
            .eq('esta_ativo', true)
            .order('nome', { ascending: true })
            .range(inicio, fim);

        if (termo) {
            query = query.or(`nome.ilike.%${termo}%,codigo_barras.ilike.%${termo}%,sku.ilike.%${termo}%`);
        }

        const { data, count, error } = await query;
        if (error) throw error;

        atualizarPaginacaoProdutos(count, limite);
        container.innerHTML = "";

        if (!data || data.length === 0) {
            container.innerHTML = "<p style='text-align:center; color: var(--text-muted);'>Nenhum produto encontrado no catálogo.</p>";
            return;
        }

        data.forEach(prod => renderizarCartaoProduto(prod, container, false));
    } catch (e) {
        tratarErroSupabase(e, "Listar Produtos");
        container.innerHTML = "<p style='text-align:center; color: var(--danger-color);'>❌ Erro ao carregar produtos.</p>";
    }
}

async function carregarListaProdutosLixeira() {
    const container = document.getElementById('prod-lista-container');
    if (!container) return;

    const termo = document.getElementById('prod-busca').value.trim();
    const limite = parseInt(document.getElementById('prod-itens-por-pagina').value) || 15;

    container.innerHTML = "<p style='text-align:center; color: var(--text-muted);'>⏳ A abrir lixeira...</p>";
    const inicio = paginaAtualProd * limite;
    const fim = inicio + limite - 1;

    try {
        let query = clienteSupabase
            .from('produtos')
            .select('*', { count: 'exact' })
            .eq('esta_ativo', false)
            .order('nome', { ascending: true })
            .range(inicio, fim);

        if (termo) query = query.ilike('nome', `%${termo}%`);

        const { data, count, error } = await query;
        if (error) throw error;

        atualizarPaginacaoProdutos(count, limite);
        container.innerHTML = "";

        if (!data || data.length === 0) {
            container.innerHTML = "<p style='text-align:center; color: var(--text-muted);'>A lixeira de produtos está vazia.</p>";
            return;
        }

        data.forEach(prod => renderizarCartaoProduto(prod, container, true));
    } catch (e) {
        tratarErroSupabase(e, "Lixeira Produtos");
        container.innerHTML = "<p style='text-align:center; color: var(--danger-color);'>❌ Erro ao consultar lixeira.</p>";
    }
}

function renderizarCartaoProduto(prod, container, isLixeira) {
    const card = document.createElement('div');
    card.style.cssText = `background: var(--input-bg); border: 1px solid var(--border-color); padding: 14px; border-radius: 10px; display:flex; align-items:center; gap: 14px; flex-wrap: wrap;`;
    
    const foto = prod.foto_url || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>';
    const preco = parseFloat(prod.preco_venda || 0).toFixed(2);
    
    const info = document.createElement('div');
    info.style.flexGrow = '1';
    info.style.minWidth = '200px';
    info.innerHTML = `
        <strong style="font-size: 1.05em; color: var(--text-main);">${escaparHTML(prod.nome)}</strong><br>
        <span class="badge-status" style="background: var(--success-color); color: #fff;">R$ ${preco}</span>
        <span class="badge-status" style="background: var(--info-color); color: #fff; margin-left: 5px;">Qtd: ${prod.estoque_atual || 0}</span>
        <span style="color: var(--text-muted); font-size: 0.82em; display:block; margin-top:4px;">EAN: ${escaparHTML(prod.codigo_barras || 'S/N')} | Cat: ${escaparHTML(prod.categoria || 'Geral')}</span>
    `;

    const acoes = document.createElement('div');
    acoes.style.display = 'flex';
    acoes.style.gap = '6px';
    acoes.style.flexWrap = 'wrap';

    if (isLixeira) {
        const btnRest = document.createElement('button');
        btnRest.textContent = "♻️ Restaurar";
        btnRest.style.cssText = "width: auto; padding: 8px 12px; font-size: 0.85em; background: var(--success-color); color: #fff; border:none; border-radius:6px; cursor:pointer;";
        btnRest.onclick = () => restaurarProduto(prod.id);
        acoes.appendChild(btnRest);
    } else {
        const btnEdit = document.createElement('button');
        btnEdit.textContent = "✏️ Editar";
        btnEdit.className = "btn-secundario";
        btnEdit.style.cssText = "width: auto; padding: 8px 10px; font-size: 0.85em;";
        btnEdit.onclick = () => desenharModuloCadastrarProduto(prod.id);

        const btnOcultar = document.createElement('button');
        btnOcultar.textContent = "🗑️ Ocultar";
        btnOcultar.className = "btn-perigo";
        btnOcultar.style.cssText = "width: auto; padding: 8px 10px; font-size: 0.85em;";
        btnOcultar.onclick = () => enviarProdutoParaLixeira(prod.id, prod.nome);

        acoes.appendChild(btnEdit);
        acoes.appendChild(btnOcultar);
    }

    card.innerHTML = `<img src="${escaparHTML(foto)}" style="width: 55px; height: 55px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border-color);">`;
    card.appendChild(info);
    card.appendChild(acoes);
    container.appendChild(card);
}

function atualizarPaginacaoProdutos(total, limite) {
    const paginas = Math.ceil(total / limite) || 1;
    document.getElementById('texto-prod-paginacao').textContent = `Página ${paginaAtualProd + 1} de ${paginas}`;
    document.getElementById('btn-prod-ant').disabled = paginaAtualProd === 0;
    document.getElementById('btn-prod-prox').disabled = (paginaAtualProd + 1) >= paginas;
    document.getElementById('prod-paginacao').style.display = total > 0 ? "flex" : "none";
}

async function enviarProdutoParaLixeira(id, nome) {
    if (!confirm(`Deseja enviar '${nome}' para a lixeira?`)) return;
    try {
        const { error } = await clienteSupabase.from('produtos').update({ esta_ativo: false }).eq('id', id);
        if (error) throw error;
        mostrarToast("Produto enviado para a lixeira.", "sucesso");
        carregarListaProdutosAtivos();
    } catch (e) {
        tratarErroSupabase(e, "Ocultar Produto");
    }
}

async function restaurarProduto(id) {
    try {
        const { error } = await clienteSupabase.from('produtos').update({ esta_ativo: true }).eq('id', id);
        if (error) throw error;
        mostrarToast("Produto restaurado para o catálogo!", "sucesso");
        carregarListaProdutosLixeira();
    } catch (e) {
        tratarErroSupabase(e, "Restaurar Produto");
    }
}

async function esvaziarLixeiraProdutosDefinitivo() {
    if (!confirm("AVISO: Esta ação irá apagar definitivamente os produtos inativos e as respetivas fotos do servidor. Deseja continuar?")) return;
    try {
        const { data: fotos } = await clienteSupabase.from('produtos').select('foto_url').eq('esta_ativo', false);
        const { error } = await clienteSupabase.from('produtos').delete().eq('esta_ativo', false);
        if (error) throw error;

        if (fotos && fotos.length > 0) {
            const arr = fotos.filter(f => f.foto_url).map(f => decodeURIComponent(f.foto_url.split('/').pop().split('?')[0]));
            if (arr.length > 0) await clienteSupabase.storage.from('foto_produtos').remove(arr);
        }

        mostrarToast("Lixeira de produtos purgada com sucesso.", "sucesso");
        carregarListaProdutosLixeira();
    } catch (e) {
        tratarErroSupabase(e, "Purgar Lixeira Produtos");
    }
}

/* --- FORMULÁRIO DE CADASTRO DE PRODUTO --- */
async function desenharModuloCadastrarProduto(idEdicao = null) {
    appRoot.innerHTML = `
        <div class="card" style="margin-top: 3vh; max-width: 850px;">
            <div class="titulo">${idEdicao ? '✏️ Editar Produto' : '📦 Novo Produto'}</div>
            
            <form id="form-produto">
                <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; margin-bottom: 20px; padding: 15px; border: 1px dashed var(--border-color); border-radius: 10px;">
                    <img id="prod-img-preview" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'><path d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/></svg>" style="width: 110px; height: 110px; object-fit: cover; border-radius: 10px; border: 2px solid var(--accent-neon); background: var(--input-bg);">
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;">
                        <label for="prod-foto-arquivo" style="background: var(--info-color); color: white; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 0.88em; font-weight: bold; margin: 0;">📂 Ficheiro</label>
                        <input type="file" id="prod-foto-arquivo" accept="image/*" style="display:none;">
                        <label for="prod-foto-camera" style="background: var(--warning-color); color: #000; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 0.88em; font-weight: bold; margin: 0;">📸 Tirar Foto</label>
                        <input type="file" id="prod-foto-camera" accept="image/*" capture="environment" style="display:none;">
                    </div>
                </div>




                <div style="background: rgba(0,0,0,0.1); border: 1px solid var(--border-color); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); margin-bottom: 10px; padding-bottom: 10px;">
                        <h4 style="margin: 0; color: var(--accent-neon);">📑 Identificação e Categoria</h4>
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--success-color); font-weight: bold; margin: 0;">
                            <input type="checkbox" id="prod-visivel-vitrine" style="width: 20px; height: 20px; margin: 0; cursor: pointer;" checked>
                            Exibir na Vitrine Online
                        </label>
                    </div>
                    
                    <label>Nome do Produto *</label>
                    <input type="text" id="prod-nome" required placeholder="Ex: Arroz Tio João 1kg">
                    
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 160px;">
                            <label>Categoria</label>
                            <input type="text" id="prod-categoria" placeholder="Ex: Mercearia">
                        </div>
                        <div style="flex: 1; min-width: 180px;">
                            <label>Fornecedor Principal</label>
                            <select id="prod-fornecedor"><option value="">A carregar fornecedores...</option></select>
                        </div>
                    </div>
                </div>
                
                <div style="background: rgba(0,0,0,0.1); border: 1px solid var(--border-color); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <h4 style="margin-top:0; color: var(--accent-neon);">💰 Preços e Stock</h4>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 120px;">
                            <label>Preço de Custo (R$)</label>
                            <input type="number" id="prod-custo" step="0.01" placeholder="0.00">
                        </div>
                        <div style="flex: 1; min-width: 120px;">
                            <label>Preço de Venda (R$) *</label>
                            <input type="number" id="prod-venda" step="0.01" required placeholder="0.00">
                        </div>
                        <div style="flex: 1; min-width: 120px;">
                            <label>Stock Atual *</label>
                            <input type="number" id="prod-estoque" step="0.01" value="0" required>
                        </div>
                    </div>
                </div>

                <div style="background: rgba(0,0,0,0.1); border: 1px solid var(--border-color); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <h4 style="margin-top:0; color: var(--accent-neon);">🧾 Códigos e Dados Fiscais</h4>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <div style="flex: 2; min-width: 200px;">
                            <label>Código de Barras (EAN)</label>
                            <div style="display: flex; gap: 5px;">
                                <input type="text" id="prod-ean" style="margin: 0;" placeholder="Ex: 7891000100103">
                                <button type="button" id="btn-scan-prod" style="background: var(--info-color); color: white; border: none; border-radius: 6px; padding: 0 12px; cursor: pointer;">📷</button>
                            </div>
                        </div>
                        <div style="flex: 1; min-width: 130px;">
                            <label>SKU / Ref Interna</label>
                            <input type="text" id="prod-sku">
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
                        <div style="flex: 1; min-width: 70px;">
                            <label>Unid. <small>(Max 4)</small></label>
                            <input type="text" id="prod-unid" value="UN" maxlength="4">
                        </div>
                        <div style="flex: 1; min-width: 90px;">
                            <label>NCM <small>(Max 8)</small></label>
                            <input type="text" id="prod-ncm" maxlength="8">
                        </div>
                        <div style="flex: 1; min-width: 90px;">
                            <label>CEST <small>(Max 7)</small></label>
                            <input type="text" id="prod-cest" maxlength="7">
                        </div>
                        <div style="flex: 1; min-width: 70px;">
                            <label>CFOP <small>(Max 4)</small></label>
                            <input type="text" id="prod-cfop" maxlength="4">
                        </div>
                    </div>
                </div>


                                <!-- NOVO BLOCO: Controlo de Vitrine -->
                <div style="background: rgba(0,229,255,0.05); border: 1px solid var(--accent-neon); padding: 15px; border-radius: 8px; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" id="prod-visivel-vitrine" checked style="width: 22px; height: 22px; margin: 0; cursor: pointer;">
                    <div>
                        <label for="prod-visivel-vitrine" style="margin: 0; color: var(--accent-neon); cursor: pointer;">Exibir na Loja Online?</label>
                        <span style="font-size: 0.8em; color: var(--text-muted);">Desmarca se o produto for exclusivo do PDV físico.</span>
                    </div>
                </div>
                <!-- FIM DO NOVO BLOCO -->


                

                <button type="submit" id="btn-salvar-prod" class="btn-neon">💾 Salvar Produto</button>
                <button type="button" class="btn-secundario" onclick="desenharModuloProdutos()">❌ Cancelar</button>
            </form>
        </div>
    `;

    try {
        const { data: forn } = await clienteSupabase.from('entidades').select('id, nome_completo').eq('tipo', 'fornecedor').neq('status', 'lixeira');
        const sel = document.getElementById('prod-fornecedor');
        sel.innerHTML = '<option value="">Sem fornecedor específico</option>';
        if (forn) forn.forEach(f => sel.innerHTML += `<option value="${f.id}">${escaparHTML(f.nome_completo)}</option>`);
    } catch(e) {}

    let fotoAntiga = null;
    let ficheiroNovo = null;

    const lerImg = (e) => {
        const f = e.target.files[0];
        if (f) {
            ficheiroNovo = f;
            const r = new FileReader();
            r.onload = ev => document.getElementById('prod-img-preview').src = ev.target.result;
            r.readAsDataURL(f);
        }
    };
    document.getElementById('prod-foto-arquivo').addEventListener('change', lerImg);
    document.getElementById('prod-foto-camera').addEventListener('change', lerImg);

    document.getElementById('btn-scan-prod').addEventListener('click', () => {
        abrirScannerGlobal(c => document.getElementById('prod-ean').value = c);
    });





    // (A) Código para preencher o checkbox ao Editar um produto
    if (idEdicao) {
        document.getElementById('btn-salvar-prod').textContent = "⏳ A carregar...";
        const { data, error } = await clienteSupabase.from('produtos').select('*').eq('id', idEdicao).single();
        if (data && !error) {
            document.getElementById('prod-nome').value = data.nome || '';
            document.getElementById('prod-categoria').value = data.categoria || '';
            document.getElementById('prod-fornecedor').value = data.fornecedor_id || '';
            document.getElementById('prod-custo').value = data.preco_custo || '';
            document.getElementById('prod-venda').value = data.preco_venda || '';
            document.getElementById('prod-estoque').value = data.estoque_atual || 0;
            document.getElementById('prod-ean').value = data.codigo_barras || '';
            document.getElementById('prod-sku').value = data.sku || '';
            document.getElementById('prod-unid').value = data.unidade_comercial || 'UN';
            document.getElementById('prod-ncm').value = data.ncm || '';
            document.getElementById('prod-cest').value = data.cest || '';
            document.getElementById('prod-cfop').value = data.cfop_padrao || '';
            
            // ✅ Atribui o estado do checkbox vindo da base de dados
            document.getElementById('prod-visivel-vitrine').checked = data.visivel_vitrine === true;

            if (data.foto_url) {
                fotoAntiga = data.foto_url;
                document.getElementById('prod-img-preview').src = data.foto_url;
            }
        }
        document.getElementById('btn-salvar-prod').textContent = "💾 Atualizar Produto";
    }

    // (B) Código atualizado para Salvar e forçar o estado da Vitrine
    document.getElementById('form-produto').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('btn-salvar-prod');
        btn.textContent = "⏳ A gravar...";
        btn.disabled = true;

        let urlFoto = fotoAntiga;
        let novoArq = null;
        // ✅ Capturar o valor do checkbox
        const isVisivel = document.getElementById('prod-visivel-vitrine').checked;

        try {
            if (ficheiroNovo) {
                const imgComp = await comprimirParaWebP(ficheiroNovo, 600);
                novoArq = gerarNomeSeguroArquivo(document.getElementById('prod-nome').value);
                const { error: upErr } = await clienteSupabase.storage.from('foto_produtos').upload(novoArq, imgComp);
                if (upErr) throw upErr;
                urlFoto = clienteSupabase.storage.from('foto_produtos').getPublicUrl(novoArq).data.publicUrl;
            }

            const payload = {
                p_nome: document.getElementById('prod-nome').value.trim(),
                p_preco: parseFloat(document.getElementById('prod-venda').value) || 0,
                p_foto_url: urlFoto,
                p_codigo_produto: document.getElementById('prod-sku').value.trim() || null,
                p_ean: document.getElementById('prod-ean').value.trim() || null,
                p_ncm: document.getElementById('prod-ncm').value.trim() || null,
                p_cest: document.getElementById('prod-cest').value.trim() || null,
                p_cfop: document.getElementById('prod-cfop').value.trim() || null,
                p_unidade_comercial: document.getElementById('prod-unid').value.trim() || 'UN',
                p_quantidade: parseFloat(document.getElementById('prod-estoque').value) || 0,
                p_preco_custo: parseFloat(document.getElementById('prod-custo').value) || 0,
                p_categoria: document.getElementById('prod-categoria').value.trim() || null,
                p_fornecedor: document.getElementById('prod-fornecedor').value || null
            };

            // ✅ Truque Monolítico: Como a função RPC não foi criada para receber o "visivel_vitrine", 
            // fazemos um update imediato à tabela após a criação/edição.
            if (idEdicao) {
                payload.p_id = idEdicao;
                const { error } = await clienteSupabase.rpc('atualizar_produto_seguro', payload);
                if (error) throw error;
                
                await clienteSupabase.from('produtos').update({ visivel_vitrine: isVisivel }).eq('id', idEdicao);
            } else {
                // Recupera o ID gerado pelo novo produto
                const { data: novoId, error } = await clienteSupabase.rpc('adicionar_produto_seguro', payload);
                if (error) throw error;
                
                await clienteSupabase.from('produtos').update({ visivel_vitrine: isVisivel }).eq('id', novoId);
            }

            mostrarToast("Produto guardado com sucesso!", "sucesso");
            desenharModuloProdutos();
        } catch (erro) {
            if (novoArq) await clienteSupabase.storage.from('foto_produtos').remove([novoArq]);
            tratarErroSupabase(erro, "Salvar Produto");
            btn.textContent = "💾 Salvar Produto";
            btn.disabled = false;
        }
    });
    
}


    
/* --- MÓDULO INTELIGENTE DE IMPORTAÇÃO DE XML (NF-e) --- */
function desenharModuloImportarXml() {
    appRoot.innerHTML = `
        <div class="card" style="margin-top: 5vh; max-width: 650px;">
            <div class="titulo">📥 Importar Nota Fiscal (XML)</div>
            <p style="color: var(--text-muted); font-size: 0.9em; text-align: center; margin-top: -10px; margin-bottom: 20px;">
                Carrega o ficheiro <strong>.xml</strong> da NF-e para dar entrada automática no stock, atualizar custos e cadastrar o fornecedor.
            </p>

            <div style="border: 2px dashed var(--accent-neon); padding: 30px; border-radius: 12px; text-align: center; background: rgba(0,0,0,0.15); margin-bottom: 20px;">
                <input type="file" id="input-arquivo-xml" accept=".xml" style="display: none;">
                <label for="input-arquivo-xml" class="btn-neon" style="display: inline-block; width: auto; padding: 12px 25px; cursor: pointer; margin: 0;">📂 Selecionar Ficheiro XML</label>
                <p id="xml-nome-arquivo" style="margin-top: 15px; color: var(--text-muted); font-size: 0.9em;">Nenhum ficheiro selecionado</p>
            </div>

            <div id="xml-preview-container" style="display: none; margin-bottom: 20px;">
                <h4 style="color: var(--accent-neon); border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">Resumo da Nota Detetada</h4>
                <p><strong>Emitente / Fornecedor:</strong> <span id="xml-resumo-forn">-</span></p>
                <p><strong>CNPJ:</strong> <span id="xml-resumo-cnpj">-</span></p>
                <p><strong>Chave da Nota:</strong> <span id="xml-resumo-chave" style="font-size: 0.85em; word-break: break-all;">-</span></p>
                <p><strong>Itens Encontrados:</strong> <span id="xml-resumo-qtd">0</span> produtos</p>
                
                <button id="btn-processar-xml" class="btn-sucesso" style="margin-top: 15px;">🚀 Confirmar e Importar Produtos para o Stock</button>
            </div>

            <button type="button" class="btn-secundario" onclick="desenharModuloProdutos()">⬅️ Voltar ao Catálogo</button>
        </div>
    `;

    let dadosXmlProcessados = null;

    document.getElementById('input-arquivo-xml').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        document.getElementById('xml-nome-arquivo').textContent = file.name;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(event.target.result, "text/xml");

                // 1. Ler dados do Emitente (Fornecedor)
                const emit = xmlDoc.getElementsByTagName("emit")[0] || xmlDoc.getElementsByTagName("TNFE.emit")[0];
                if (!emit) throw new Error("Estrutura de emitente não encontrada no XML.");

                const nomeForn = emit.getElementsByTagName("xNome")[0]?.textContent || "Fornecedor Desconhecido";
                const cnpjForn = emit.getElementsByTagName("CNPJ")[0]?.textContent || "";

                // 2. Ler Chave da NFe
                const infNFe = xmlDoc.getElementsByTagName("infNFe")[0];
                const chaveNFe = infNFe ? infNFe.getAttribute("Id") : "";

                // 3. Ler Itens (Produtos)
                const dets = xmlDoc.getElementsByTagName("det");
                if (dets.length === 0) throw new Error("Nenhum item detetado na nota fiscal.");

                let itensArray = [];
                for (let i = 0; i < dets.length; i++) {
                    const prod = dets[i].getElementsByTagName("prod")[0];
                    const cProd = prod.getElementsByTagName("cProd")[0]?.textContent || '';
                    const cEAN = prod.getElementsByTagName("cEAN")[0]?.textContent || '';
                    const xProd = prod.getElementsByTagName("xProd")[0]?.textContent || 'Produto sem nome';
                    const NCM = prod.getElementsByTagName("NCM")[0]?.textContent || '';
                    const CFOP = prod.getElementsByTagName("CFOP")[0]?.textContent || '';
                    const uCom = prod.getElementsByTagName("uCom")[0]?.textContent || 'UN';
                    const qCom = parseFloat(prod.getElementsByTagName("qCom")[0]?.textContent || 1);
                    const vUnCom = parseFloat(prod.getElementsByTagName("vUnCom")[0]?.textContent || 0);

                    // Calcula preço de venda aplicando a margem cadastrada nas configurações da empresa
                    const margem = (dadosEmpresaGlobal.margem_padrao_xml || 30) / 100;
                    const precoVendaSugerido = vUnCom * (1 + margem);

                    itensArray.push({
                        sku: cProd,
                        ean: (cEAN && cEAN !== 'SEM GTIN') ? cEAN : null,
                        nome: xProd,
                        ncm: NCM,
                        cfop: CFOP,
                        unidade: uCom,
                        quantidade: qCom,
                        preco_custo: vUnCom,
                        preco_venda: parseFloat(precoVendaSugerido.toFixed(2))
                    });
                }

                dadosXmlProcessados = {
                    fornecedor: { nome: nomeForn, cnpj: cnpjForn },
                    chave: chaveNFe,
                    itens: itensArray
                };

                document.getElementById('xml-resumo-forn').textContent = nomeForn;
                document.getElementById('xml-resumo-cnpj').textContent = cnpjForn;
                document.getElementById('xml-resumo-chave').textContent = chaveNFe;
                document.getElementById('xml-resumo-qtd').textContent = itensArray.length;
                document.getElementById('xml-preview-container').style.display = 'block';

                mostrarToast("XML lido com sucesso! Verifique o resumo.", "sucesso");
            } catch (err) {
                tratarErroSupabase(err, "Leitura do XML");
            }
        };
        reader.readAsText(file);
    });

    document.getElementById('btn-processar-xml')?.addEventListener('click', async () => {
        if (!dadosXmlProcessados) return;
        const btn = document.getElementById('btn-processar-xml');
        btn.textContent = "⏳ A importar para o stock...";
        btn.disabled = true;

        try {
            // 1. Verifica ou cadastra o fornecedor automaticamente
            let fornecedorId = null;
            if (dadosXmlProcessados.fornecedor.cnpj) {
                const { data: fornExistente } = await clienteSupabase
                    .from('entidades')
                    .select('id')
                    .eq('numero_documento', dadosXmlProcessados.fornecedor.cnpj)
                    .maybeSingle();

                if (fornExistente) {
                    fornecedorId = fornExistente.id;
                } else {
                    const { data: novoForn, error: errForn } = await clienteSupabase
                        .from('entidades')
                        .insert([{
                            tipo: 'fornecedor',
                            nome_completo: dadosXmlProcessados.fornecedor.nome,
                            tipo_documento: 'CNPJ',
                            numero_documento: dadosXmlProcessados.fornecedor.cnpj,
                            status: 'ativo'
                        }])
                        .select('id')
                        .single();
                    if (!errForn && novoForn) fornecedorId = novoForn.id;
                }
            }

            // 2. Processa cada item do XML usando a função RPC existente no Supabase
            let itensImportados = 0;
            for (const item of dadosXmlProcessados.itens) {
                // Tenta encontrar produto existente por EAN ou SKU
                let produtoExistente = null;
                if (item.ean) {
                    const { data } = await clienteSupabase.from('produtos').select('*').eq('codigo_barras', item.ean).maybeSingle();
                    produtoExistente = data;
                }
                if (!produtoExistente && item.sku) {
                    const { data } = await clienteSupabase.from('produtos').select('*').eq('sku', item.sku).maybeSingle();
                    produtoExistente = data;
                }

                if (produtoExistente) {
                    // Produto existe: atualiza stock somando a quantidade e atualiza custos
                    const novoEstoque = parseFloat(produtoExistente.estoque_atual || 0) + item.quantidade;
                    await clienteSupabase.rpc('atualizar_produto_seguro', {
                        p_id: produtoExistente.id,
                        p_nome: produtoExistente.nome,
                        p_preco: produtoExistente.preco_venda,
                        p_codigo_produto: produtoExistente.sku,
                        p_ean: produtoExistente.codigo_barras,
                        p_ncm: produtoExistente.ncm,
                        p_unidade_comercial: produtoExistente.unidade_comercial,
                        p_quantidade: novoEstoque,
                        p_preco_custo: item.preco_custo,
                        p_fornecedor: fornecedorId
                    });
                } else {
                    // Produto novo: insere utilizando a função RPC segura
                    await clienteSupabase.rpc('adicionar_produto_seguro', {
                        p_nome: item.nome,
                        p_preco: item.preco_venda,
                        p_codigo_produto: item.sku,
                        p_ean: item.ean,
                        p_ncm: item.ncm,
                        p_unidade_comercial: item.unidade,
                        p_quantidade: item.quantidade,
                        p_preco_custo: item.preco_custo,
                        p_fornecedor: fornecedorId
                    });
                }
                itensImportados++;
            }

            mostrarToast(`Importação concluída! ${itensImportados} produtos processados com sucesso.`, "sucesso");
            desenharModuloProdutos();
        } catch (erro) {
            tratarErroSupabase(erro, "Processar XML");
            btn.textContent = "🚀 Confirmar e Importar Produtos para o Stock";
            btn.disabled = false;
        }
    });
}
