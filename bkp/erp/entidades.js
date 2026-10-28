       
/* =========================================================
   🟥 BLOCO 3: MÓDULO DE ENTIDADES (CLIENTES/FORNECEDORES) E LIXEIRA 🟥
   ========================================================= */

let paginaAtualEnt = 0;
let exibindoLixeiraEnt = false;

function desenharModuloClientes() {
    paginaAtualEnt = 0;
    exibindoLixeiraEnt = false;
    
    appRoot.innerHTML = `
        <div class="card" style="margin-top: 5vh; max-width: 850px;">
            <div class="titulo" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <span id="ent-titulo-painel">🏢 Gestão de Entidades</span>
                <div style="display: flex; gap: 8px;">
                    <button id="btn-ver-lixeira-ent" class="btn-secundario" style="width: auto; padding: 8px 14px; margin: 0;">👁️ Ver Lixeira</button>
                    <button id="btn-esvaziar-lixeira-ent" class="btn-perigo" style="display: none; width: auto; padding: 8px 14px; margin: 0;">🧹 Esvaziar Lixeira</button>
                    <button id="btn-nova-entidade" class="btn-neon" style="width: auto; padding: 8px 14px; margin: 0;">➕ Novo</button>
                </div>
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap;">
                <select id="ent-filtro-tipo" style="flex: 1; min-width: 130px; margin-bottom: 0;">
                    <option value="">Todos os Tipos</option>
                    <option value="cliente">Clientes</option>
                    <option value="fornecedor">Fornecedores</option>
                    <option value="funcionario">Funcionários</option>
                    <option value="entregador">Entregadores</option>
                    <option value="empresa">Empresas</option>
                </select>
                <input type="text" id="ent-busca" placeholder="🔍 Buscar por Nome ou Documento..." style="flex: 2; min-width: 200px; margin-bottom: 0;">
                <div style="display: flex; align-items: center; gap: 5px; flex: 1; min-width: 110px;">
                    <label style="margin:0; white-space: nowrap;">Qtd. Pág:</label>
                    <input type="number" id="ent-itens-por-pagina" value="15" min="1" max="100" style="margin:0; padding: 10px;">
                </div>
            </div>

            <div id="ent-lista-container" style="display:flex; flex-direction:column; gap:10px; margin-top:15px;">
                <p style="text-align:center; color: var(--text-muted);">⏳ A carregar registos...</p>
            </div>
            
            <div id="ent-paginacao" style="display: none; justify-content: center; align-items: center; gap: 15px; margin-top: 20px;">
                <button id="btn-ent-ant" class="btn-secundario" style="width: auto;">⬅️ Anterior</button>
                <strong id="texto-ent-paginacao" style="color: var(--text-main);">Página 1</strong>
                <button id="btn-ent-prox" class="btn-secundario" style="width: auto;">Próxima ➡️</button>
            </div>
        </div>
    `;

    document.getElementById('btn-nova-entidade').addEventListener('click', () => desenharModuloEntidadesCadastro());

    document.getElementById('btn-ver-lixeira-ent').addEventListener('click', () => {
        exibindoLixeiraEnt = !exibindoLixeiraEnt;
        paginaAtualEnt = 0;
        document.getElementById('ent-busca').value = '';
        
        const btnVer = document.getElementById('btn-ver-lixeira-ent');
        const btnNovo = document.getElementById('btn-nova-entidade');
        const btnEsvaziar = document.getElementById('btn-esvaziar-lixeira-ent');
        const titulo = document.getElementById('ent-titulo-painel');

        if (exibindoLixeiraEnt) {
            btnVer.textContent = "🏢 Ver Ativos";
            btnVer.className = "btn-neon";
            titulo.textContent = "🗑️ Lixeira de Entidades";
            btnNovo.style.display = "none";
            btnEsvaziar.style.display = "block";
            carregarListaEntidadesLixeira();
        } else {
            btnVer.textContent = "👁️ Ver Lixeira";
            btnVer.className = "btn-secundario";
            titulo.textContent = "🏢 Gestão de Entidades";
            btnNovo.style.display = "block";
            btnEsvaziar.style.display = "none";
            carregarListaEntidadesAtivas();
        }
    });

    document.getElementById('btn-esvaziar-lixeira-ent').addEventListener('click', esvaziarLixeiraEntidadesDefinitivo);

    let timerBusca;
    const dispararBusca = () => {
        clearTimeout(timerBusca);
        paginaAtualEnt = 0;
        timerBusca = setTimeout(() => {
            exibindoLixeiraEnt ? carregarListaEntidadesLixeira() : carregarListaEntidadesAtivas();
        }, 400);
    };

    document.getElementById('ent-busca').addEventListener('input', dispararBusca);
    document.getElementById('ent-filtro-tipo').addEventListener('change', dispararBusca);
    document.getElementById('ent-itens-por-pagina').addEventListener('change', dispararBusca);

    document.getElementById('btn-ent-ant').addEventListener('click', () => { if (paginaAtualEnt > 0) { paginaAtualEnt--; dispararBusca(); } });
    document.getElementById('btn-ent-prox').addEventListener('click', () => { paginaAtualEnt++; dispararBusca(); });

    carregarListaEntidadesAtivas();
}

async function carregarListaEntidadesAtivas() {
    const container = document.getElementById('ent-lista-container');
    if (!container) return;

    const termo = document.getElementById('ent-busca').value.trim();
    const tipo = document.getElementById('ent-filtro-tipo').value;
    const limite = parseInt(document.getElementById('ent-itens-por-pagina').value) || 15;

    container.innerHTML = "<p style='text-align:center; color: var(--text-muted);'>⏳ A consultar Supabase...</p>";
    
    const inicio = paginaAtualEnt * limite;
    const fim = inicio + limite - 1;

    try {
        let query = clienteSupabase
            .from('entidades')
            .select('*', { count: 'exact' })
            .neq('status', 'lixeira')
            .order('nome_completo', { ascending: true })
            .range(inicio, fim);

        if (tipo) query = query.eq('tipo', tipo);
        if (termo) query = query.or(`nome_completo.ilike.%${termo}%,numero_documento.ilike.%${termo}%`);

        const { data, count, error } = await query;
        if (error) throw error;

        atualizarPaginacaoEntidades(count, limite);
        container.innerHTML = "";

        if (!data || data.length === 0) {
            container.innerHTML = "<p style='text-align:center; color: var(--text-muted);'>Nenhuma entidade encontrada.</p>";
            return;
        }

        data.forEach(ent => renderizarCartaoEntidade(ent, container, false));
    } catch (erro) {
        tratarErroSupabase(erro, "Listar Entidades");
        container.innerHTML = "<p style='text-align:center; color: var(--danger-color);'>❌ Erro ao carregar dados.</p>";
    }
}

async function carregarListaEntidadesLixeira() {
    const container = document.getElementById('ent-lista-container');
    if (!container) return;

    const termo = document.getElementById('ent-busca').value.trim();
    const tipo = document.getElementById('ent-filtro-tipo').value;
    const limite = parseInt(document.getElementById('ent-itens-por-pagina').value) || 15;

    container.innerHTML = "<p style='text-align:center; color: var(--text-muted);'>⏳ A abrir lixeira...</p>";
    
    const inicio = paginaAtualEnt * limite;
    const fim = inicio + limite - 1;

    try {
        let query = clienteSupabase
            .from('entidades')
            .select('*', { count: 'exact' })
            .eq('status', 'lixeira')
            .order('nome_completo', { ascending: true })
            .range(inicio, fim);

        if (tipo) query = query.eq('tipo', tipo);
        if (termo) query = query.or(`nome_completo.ilike.%${termo}%,numero_documento.ilike.%${termo}%`);

        const { data, count, error } = await query;
        if (error) throw error;

        atualizarPaginacaoEntidades(count, limite);
        container.innerHTML = "";

        if (!data || data.length === 0) {
            container.innerHTML = "<p style='text-align:center; color: var(--text-muted);'>A lixeira está vazia.</p>";
            return;
        }

        data.forEach(ent => renderizarCartaoEntidade(ent, container, true));
    } catch (erro) {
        tratarErroSupabase(erro, "Lixeira Entidades");
        container.innerHTML = "<p style='text-align:center; color: var(--danger-color);'>❌ Erro ao consultar lixeira.</p>";
    }
}

function renderizarCartaoEntidade(ent, container, isLixeira) {
    const card = document.createElement('div');
    card.style.cssText = `background: var(--input-bg); border: 1px solid var(--border-color); padding: 14px; border-radius: 10px; display:flex; align-items:center; gap: 14px; flex-wrap: wrap;`;
    
    const foto = ent.foto_url || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
    
    const info = document.createElement('div');
    info.style.flexGrow = '1';
    info.style.minWidth = '200px';
    info.innerHTML = `
        <strong style="font-size: 1.05em; color: var(--text-main);">${escaparHTML(ent.nome_completo)}</strong><br>
        <span class="badge-status" style="background: var(--info-color); color: #fff;">${escaparHTML(ent.tipo || 'N/A')}</span>
        <span style="color: var(--text-muted); font-size: 0.85em; margin-left: 6px;">Doc: ${escaparHTML(ent.numero_documento || 'S/N')}</span>
    `;

    const acoes = document.createElement('div');
    acoes.style.display = 'flex';
    acoes.style.gap = '6px';
    acoes.style.flexWrap = 'wrap';

    if (isLixeira) {
        const btnRest = document.createElement('button');
        btnRest.textContent = "♻️ Restaurar";
        btnRestaurarClasse = "btn-sucesso";
        btnRest.style.cssText = "width: auto; padding: 8px 12px; font-size: 0.85em; background: var(--success-color); color: #fff; border:none; border-radius:6px; cursor:pointer;";
        btnRest.onclick = () => restaurarEntidade(ent.id);
        acoes.appendChild(btnRest);
    } else {
        if (ent.telefone) {
            let fone = ent.telefone.replace(/\D/g, '');
            if (fone.length >= 10 && !fone.startsWith('55')) fone = '55' + fone;
            const btnWpp = document.createElement('a');
            btnWpp.href = `https://wa.me/${fone}`;
            btnWpp.target = "_blank";
            btnWpp.innerHTML = "💬 WPP";
            btnWpp.style.cssText = "background: #25D366; color: white; padding: 8px 10px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 0.85em; display: flex; align-items: center;";
            acoes.appendChild(btnWpp);
        }

        const btnCard = document.createElement('button');
        btnCard.innerHTML = "🪪 Cartão";
        btnCard.className = "btn-secundario";
        btnCard.style.cssText = "width: auto; padding: 8px 10px; font-size: 0.85em;";
        btnCard.onclick = () => imprimirCarteirinha(ent);

        const btnEdit = document.createElement('button');
        btnEdit.textContent = "✏️ Editar";
        btnEdit.className = "btn-secundario";
        btnEdit.style.cssText = "width: auto; padding: 8px 10px; font-size: 0.85em;";
        btnEdit.onclick = () => desenharModuloEntidadesCadastro(ent.id);

        const btnOcultar = document.createElement('button');
        btnOcultar.textContent = "🗑️ Ocultar";
        btnOcultar.className = "btn-perigo";
        btnOcultar.style.cssText = "width: auto; padding: 8px 10px; font-size: 0.85em;";
        btnOcultar.onclick = () => enviarEntidadeParaLixeira(ent.id, ent.nome_completo);

        acoes.appendChild(btnCard);
        acoes.appendChild(btnEdit);
        acoes.appendChild(btnOcultar);
    }

    card.innerHTML = `
        <img src="${escaparHTML(foto)}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%; border: 1px solid var(--border-color);">
    `;
    card.appendChild(info);
    card.appendChild(acoes);
    container.appendChild(card);
}

function atualizarPaginacaoEntidades(total, limite) {
    const paginas = Math.ceil(total / limite) || 1;
    document.getElementById('texto-ent-paginacao').textContent = `Página ${paginaAtualEnt + 1} de ${paginas}`;
    document.getElementById('btn-ent-ant').disabled = paginaAtualEnt === 0;
    document.getElementById('btn-ent-prox').disabled = (paginaAtualEnt + 1) >= paginas;
    document.getElementById('ent-paginacao').style.display = total > 0 ? "flex" : "none";
}

async function enviarEntidadeParaLixeira(id, nome) {
    if (!confirm(`Deseja enviar '${nome}' para a lixeira?`)) return;
    try {
        const { error } = await clienteSupabase.from('entidades').update({ status: 'lixeira' }).eq('id', id);
        if (error) throw error;
        mostrarToast("Entidade enviada para a lixeira.", "sucesso");
        carregarListaEntidadesAtivas();
    } catch (e) {
        tratarErroSupabase(e, "Ocultar Entidade");
    }
}

async function restaurarEntidade(id) {
    try {
        const { error } = await clienteSupabase.from('entidades').update({ status: 'ativo' }).eq('id', id);
        if (error) throw error;
        mostrarToast("Entidade restaurada com sucesso!", "sucesso");
        carregarListaEntidadesLixeira();
    } catch (e) {
        tratarErroSupabase(e, "Restaurar Entidade");
    }
}

async function esvaziarLixeiraEntidadesDefinitivo() {
    if (!confirm("AVISO: Esta ação irá apagar definitivamente todas as entidades na lixeira e as respetivas fotos. Deseja continuar?")) return;
    try {
        const { data: itensLixeira } = await clienteSupabase.from('entidades').select('foto_url').eq('status', 'lixeira');
        
        const { error } = await clienteSupabase.from('entidades').delete().eq('status', 'lixeira');
        if (error) throw error;

        if (itensLixeira && itensLixeira.length > 0) {
            const fotosParaRemover = itensLixeira
                .filter(i => i.foto_url)
                .map(i => decodeURIComponent(i.foto_url.split('/').pop().split('?')[0]));
            if (fotosParaRemover.length > 0) {
                await clienteSupabase.storage.from('foto_entidades').remove(fotosParaRemover);
            }
        }

        mostrarToast("Lixeira de entidades purgada definitivamente.", "sucesso");
        carregarListaEntidadesLixeira();
    } catch (e) {
        tratarErroSupabase(e, "Purgar Lixeira");
    }
}

function imprimirCarteirinha(ent) {
    const codigo = ent.numero_documento || ent.id.split('-')[0].toUpperCase();
    const urlBarra = `https://bwipjs-api.metafloor.com/?bcid=code128&text=${encodeURIComponent(codigo)}&scale=3&includetext`;
    const foto = ent.foto_url || 'https://via.placeholder.com/150/cccccc/666666?text=Foto';

    const w = window.open('', '', 'width=600,height=600');
    w.document.write(`
        <!DOCTYPE html><html><head><meta charset="UTF-8"><title>Cartão - ${escaparHTML(ent.nome_completo)}</title>
        <style>
            body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f4f4f4; }
            .cartao { width: 320px; background: #fff; border-radius: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.2); padding: 25px; text-align: center; border: 2px solid #333; }
            .topo { background: #0284c7; color: white; padding: 10px; margin: -25px -25px 20px -25px; font-weight: bold; text-transform: uppercase; font-size: 1em; border-top-left-radius: 12px; border-top-right-radius: 12px;}
            .foto { width: 110px; height: 110px; border-radius: 50%; object-fit: cover; border: 3px solid #0284c7; margin-bottom: 12px; }
            .nome { font-size: 1.2em; font-weight: bold; margin: 0 0 5px 0; text-transform: uppercase; color: #1e293b; }
            .info { font-size: 0.88em; color: #64748b; margin: 4px 0; }
            .barcode { margin-top: 15px; padding-top: 12px; border-top: 1px dashed #cbd5e1; }
            img.bc { max-width: 90%; max-height: 60px; }
            @media print { body { background: #fff; } .cartao { box-shadow: none; border: 1px solid #000; } }
        </style></head><body>
        <div class="cartao">
            <div class="topo">Cartão de Identificação - ${escaparHTML(ent.tipo)}</div>
            <img src="${escaparHTML(foto)}" class="foto">
            <h2 class="nome">${escaparHTML(ent.nome_completo)}</h2>
            <div class="info">☎️ ${escaparHTML(ent.telefone || 'Sem contacto')}</div>
            <div class="info">📧 ${escaparHTML(ent.email || 'Sem e-mail')}</div>
            <div class="barcode">
                <div style="font-size:0.75em; color:#64748b; margin-bottom:4px;">Documento / ID:</div>
                <img src="${urlBarra}" class="bc">
            </div>
        </div>
        <script>setTimeout(() => { window.print(); }, 1200);<\/script></body></html>
    `);
    w.document.close();
}

async function desenharModuloEntidadesCadastro(idEdicao = null) {
    appRoot.innerHTML = `
        <div class="card" style="margin-top: 4vh; max-width: 600px;">
            <div class="titulo">${idEdicao ? '✏️ Editar Entidade' : '🏢 Nova Entidade'}</div>
            
            <form id="form-entidade">
                <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; margin-bottom: 20px; padding: 15px; border: 1px dashed var(--border-color); border-radius: 10px;">
                    <img id="ent-img-preview" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>" style="width: 110px; height: 110px; object-fit: cover; border-radius: 50%; border: 2px solid var(--accent-neon); background: var(--input-bg);">
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;">
                        <label for="ent-foto-arquivo" style="background: var(--info-color); color: white; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 0.88em; font-weight: bold; margin: 0;">📂 Ficheiro</label>
                        <input type="file" id="ent-foto-arquivo" accept="image/*" style="display:none;">
                        <label for="ent-foto-camera" style="background: var(--warning-color); color: #000; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 0.88em; font-weight: bold; margin: 0;">📸 Tirar Foto</label>
                        <input type="file" id="ent-foto-camera" accept="image/*" capture="environment" style="display:none;">
                    </div>
                </div>

                <label>Tipo de Relação *</label>
                <select id="ent-tipo" required>
                    <option value="cliente">Cliente</option>
                    <option value="fornecedor">Fornecedor</option>
                    <option value="funcionario">Funcionário</option>
                    <option value="entregador">Entregador</option>
                    <option value="empresa">Empresa</option>
                </select>

                <label>Nome Completo / Razão Social *</label>
                <input type="text" id="ent-nome" required placeholder="Ex: Nome da pessoa ou empresa">

                <div style="display: flex; gap: 10px;">
                    <div style="flex: 1;">
                        <label>Tipo Doc.</label>
                        <select id="ent-tipo-doc">
                            <option value="CPF">CPF</option>
                            <option value="CNPJ">CNPJ</option>
                            <option value="RG">RG</option>
                        </select>
                    </div>
                    <div style="flex: 2;">
                        <label>Número do Documento</label>
                        <input type="text" id="ent-documento" placeholder="000.000.000-00">
                    </div>
                </div>

                <div style="display: flex; gap: 10px;">
                    <div style="flex: 1;">
                        <label>Telemóvel / WhatsApp</label>
                        <input type="text" id="ent-telefone" placeholder="(91) 90000-0000">
                    </div>
                    <div style="flex: 1;">
                        <label>E-mail</label>
                        <input type="email" id="ent-email" placeholder="email@exemplo.com">
                    </div>
                </div>

                <label>Endereço Completo</label>
                <input type="text" id="ent-endereco" placeholder="Rua, Número, Bairro, Cidade">

                <button type="submit" id="btn-salvar-ent" class="btn-neon" style="margin-top: 15px;">💾 Salvar Entidade</button>
                <button type="button" class="btn-secundario" onclick="desenharModuloClientes()">❌ Cancelar</button>
            </form>
        </div>
    `;

    let urlFotoAntiga = null;
    let ficheiroNovo = null;

    const lerPreview = (e) => {
        const file = e.target.files[0];
        if (file) {
            ficheiroNovo = file;
            const r = new FileReader();
            r.onload = ev => document.getElementById('ent-img-preview').src = ev.target.result;
            r.readAsDataURL(file);
        }
    };
    document.getElementById('ent-foto-arquivo').addEventListener('change', lerPreview);
    document.getElementById('ent-foto-camera').addEventListener('change', lerPreview);

    if (idEdicao) {
        document.getElementById('btn-salvar-ent').textContent = "⏳ A carregar...";
        const { data, error } = await clienteSupabase.from('entidades').select('*').eq('id', idEdicao).single();
        if (data && !error) {
            document.getElementById('ent-tipo').value = data.tipo || 'cliente';
            document.getElementById('ent-nome').value = data.nome_completo || '';
            document.getElementById('ent-tipo-doc').value = data.tipo_documento || 'CPF';
            document.getElementById('ent-documento').value = data.numero_documento || '';
            document.getElementById('ent-telefone').value = data.telefone || '';
            document.getElementById('ent-email').value = data.email || '';
            document.getElementById('ent-endereco').value = data.endereco_completo || '';
            if (data.foto_url) {
                urlFotoAntiga = data.foto_url;
                document.getElementById('ent-img-preview').src = data.foto_url;
            }
        }
        document.getElementById('btn-salvar-ent').textContent = "💾 Atualizar Entidade";
    }

    document.getElementById('form-entidade').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('btn-salvar-ent');
        btn.textContent = "⏳ A gravar...";
        btn.disabled = true;

        let urlFinalFoto = urlFotoAntiga;
        let novoNomeArq = null;

        try {
            if (ficheiroNovo) {
                const imgComp = await comprimirParaWebP(ficheiroNovo, 600);
                novoNomeArq = gerarNomeSeguroArquivo(document.getElementById('ent-nome').value);
                const { error: upErr } = await clienteSupabase.storage.from('foto_entidades').upload(novoNomeArq, imgComp);
                if (upErr) throw upErr;
                urlFinalFoto = clienteSupabase.storage.from('foto_entidades').getPublicUrl(novoNomeArq).data.publicUrl;
            }

            const payload = {
                tipo: document.getElementById('ent-tipo').value,
                nome_completo: document.getElementById('ent-nome').value.trim(),
                tipo_documento: document.getElementById('ent-tipo-doc').value,
                numero_documento: document.getElementById('ent-documento').value.trim(),
                telefone: document.getElementById('ent-telefone').value.trim(),
                email: document.getElementById('ent-email').value.trim(),
                endereco_completo: document.getElementById('ent-endereco').value.trim(),
                foto_url: urlFinalFoto,
                status: 'ativo'
            };

            if (idEdicao) {
                const { error } = await clienteSupabase.from('entidades').update(payload).eq('id', idEdicao);
                if (error) throw error;
                if (urlFotoAntiga && novoNomeArq && urlFotoAntiga !== urlFinalFoto) {
                    const velho = decodeURIComponent(urlFotoAntiga.split('/').pop().split('?')[0]);
                    await clienteSupabase.storage.from('foto_entidades').remove([velho]);
                }
            } else {
                const { error } = await clienteSupabase.from('entidades').insert([payload]);
                if (error) throw error;
            }

            mostrarToast("Entidade gravada com sucesso!", "sucesso");
            desenharModuloClientes();
        } catch (erro) {
            if (novoNomeArq) await clienteSupabase.storage.from('foto_entidades').remove([novoNomeArq]);
            tratarErroSupabase(erro, "Salvar Entidade");
            btn.textContent = "💾 Salvar Entidade";
            btn.disabled = false;
        }
    });
}

// fim entidades