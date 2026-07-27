// ==========================================
// MÓDULO DE ESTOQUE (estoque.js)
// ==========================================

let est_html5QrCode = null;

// Inicialização do módulo de estoque
async function est_init() {
    est_loadCategoriasUnicas();
    est_loadDashboard();
    est_loadProdutos();
    est_configurarDropZone();
}

// Alternância entre sub-abas do estoque (Listagem vs Formulário)
function est_alternarSubAba(subAba) {
    const painelForm  = document.getElementById('est-painel-formulario');
    const painelLista = document.getElementById('est-painel-listagem');
    const btnForm     = document.getElementById('est-btn-formulario');
    const btnLista    = document.getElementById('est-btn-listagem');

    const ativo   = ['bg-emerald-500','text-white','hover:bg-emerald-600'];
    const inativo = ['bg-slate-200','text-slate-700','hover:bg-slate-300'];

    if (!btnForm || !btnLista || !painelForm || !painelLista) return;

    btnForm.classList.remove(...ativo, ...inativo);
    btnLista.classList.remove(...ativo, ...inativo);

    if (subAba === 'formulario') {
        painelForm.classList.remove('hidden');
        painelLista.classList.add('hidden');
        btnForm.classList.add(...ativo);
        btnLista.classList.add(...inativo);
    } else {
        painelForm.classList.add('hidden');
        painelLista.classList.remove('hidden');
        btnLista.classList.add(...ativo);
        btnForm.classList.add(...inativo);
    }
}

// Configuração da zona de arrastar e soltar (Drag and Drop) para imagens de produtos
function est_configurarDropZone() {
    const dropZone = document.getElementById('est-drop-foto');
    const inputEl  = document.getElementById('est-f-foto');
    if (!dropZone || !inputEl) return;
    
    dropZone.addEventListener('dragover',  e => { e.preventDefault(); dropZone.classList.add('bg-slate-100'); });
    dropZone.addEventListener('dragleave', e => { e.preventDefault(); dropZone.classList.remove('bg-slate-100'); });
    dropZone.addEventListener('drop', e => {
        e.preventDefault();
        dropZone.classList.remove('bg-slate-100');
        if (e.dataTransfer.files?.length > 0) {
            inputEl.files = e.dataTransfer.files;
            est_mostrarNomeArquivo(inputEl, 'est-nome-foto');
        }
    });
}

// Exibe o nome do arquivo anexado na interface
function est_mostrarNomeArquivo(input, idCampoTexto) {
    const campoTexto = document.getElementById(idCampoTexto);
    if (!campoTexto) return;
    if (input.files?.length > 0) {
        campoTexto.innerHTML = `<i class="fas fa-check"></i> ${input.files[0].name}`;
    } else {
        campoTexto.innerHTML = '';
    }
}

// Carrega categorias únicas cadastradas na tabela de produtos
async function est_loadCategoriasUnicas() {
    const { data } = await _supabase.from('produtos').select('categoria');
    if (!data) return;
    const categorias = [...new Set(data.map(item => item.categoria).filter(c => c))];
    const datalist   = document.getElementById('est-lista-categorias');
    const selectFiltro = document.getElementById('est-filtro-categoria');
    
    if (datalist) datalist.innerHTML = '';
    if (selectFiltro) selectFiltro.innerHTML = '<option value="">Todas</option>';
    
    categorias.forEach(cat => {
        if (datalist) datalist.innerHTML += `<option value="${cat}">`;
        if (selectFiltro) selectFiltro.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
}

// Inicia a leitura de código de barras via câmera
function est_iniciarLeituraCamera() {
    const container = document.getElementById('est-camera-container');
    if (!container) return;
    container.classList.remove('hidden');
    est_html5QrCode = new Html5Qrcode("est-camera-preview");
    est_html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: { width: 300, height: 150 } }, decodedText => {
        const campoBarras = document.getElementById('est-f-barras');
        if (campoBarras) campoBarras.value = decodedText;
        est_pararCamera();
    }).catch(() => {
        alert("Não foi possível acessar a câmera. Verifique as permissões.");
        container.classList.add('hidden');
    });
}

// Para a leitura de código de barras pela câmera
function est_pararCamera() {
    const container = document.getElementById('est-camera-container');
    if (est_html5QrCode) {
        est_html5QrCode.stop().then(() => {
            if (container) container.classList.add('hidden');
        }).catch(() => {
            if (container) container.classList.add('hidden');
        });
    } else {
        if (container) container.classList.add('hidden');
    }
}

// Processa arquivo XML de NF-e para importação de estoque
async function est_processarXML(input) {
    const file = input.files[0];
    if (!file) return;
    const btnImport = document.getElementById('est-btn-importar-xml') || {};
    const textoOriginal = btnImport.innerHTML || '';
    if (btnImport.innerHTML !== undefined) { 
        btnImport.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Lendo XML...'; 
        btnImport.disabled = true; 
    }

    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            const xmlDoc = new DOMParser().parseFromString(e.target.result, "text/xml");
            const itens  = xmlDoc.getElementsByTagName("det");
            if (itens.length === 0) { alert("Nenhum produto encontrado neste XML."); return; }

            let novos = 0, atualizados = 0;
            for (let i = 0; i < itens.length; i++) {
                const prod = itens[i].getElementsByTagName("prod")[0];
                if (!prod) continue;
                const nome  = prod.getElementsByTagName("xProd")[0]?.textContent || "";
                let ean     = prod.getElementsByTagName("cEAN")[0]?.textContent || "";
                if (ean === "SEM GTIN") ean = null;
                const custo = parseFloat(prod.getElementsByTagName("vUnCom")[0]?.textContent || 0);
                const qtd   = parseInt(parseFloat(prod.getElementsByTagName("qCom")[0]?.textContent || 0));

                let q = _supabase.from('produtos').select('*');
                q = ean ? q.eq('codigo_barras', ean) : q.eq('nome', nome);
                const { data: existente } = await q.maybeSingle();

                if (existente) {
                    await _supabase.from('produtos').update({
                        quantidade_estoque: parseInt(existente.quantidade_estoque || 0) + qtd, 
                        preco_custo: custo
                    }).eq('id', existente.id);
                    atualizados++;
                } else {
                    await _supabase.from('produtos').insert([{
                        nome, 
                        codigo_barras: ean, 
                        preco_custo: custo, 
                        preco_venda: custo * 1.3, 
                        quantidade_estoque: qtd, 
                        estoque_minimo: 5, 
                        categoria: 'Geral'
                    }]);
                    novos++;
                }
            }
            alert(`NF-e importada!\n✅ Novos: ${novos}\n🔄 Atualizados: ${atualizados}`);
            input.value = '';
            est_loadProdutos(); 
            est_loadDashboard();
        } catch(err) {
            alert("Erro ao processar XML: " + err.message);
        } finally {
            if (btnImport.innerHTML !== undefined) { 
                btnImport.innerHTML = textoOriginal; 
                btnImport.disabled = false; 
            }
        }
    };
    reader.readAsText(file);
}

// Atualiza os contadores do Dashboard de Estoque
async function est_loadDashboard() {
    const { data: produtos } = await _supabase.from('produtos').select('*');
    if (!produtos) return;
    let totalCadastrados = produtos.length, estoqueBaixo = 0, totalItens = 0;
    produtos.forEach(p => {
        const est = parseInt(p.quantidade_estoque || 0);
        const min = parseInt(p.estoque_minimo || 0);
        totalItens += est;
        if (est <= min) estoqueBaixo++;
    });
    
    const elTot = document.getElementById('est-dash-total-produtos');
    const elBaixo = document.getElementById('est-dash-estoque-baixo');
    const elItens = document.getElementById('est-dash-total-itens');

    if (elTot) elTot.innerText = totalCadastrados;
    if (elBaixo) elBaixo.innerText = estoqueBaixo;
    if (elItens) elItens.innerText = totalItens;
}

// Salva ou atualiza um produto completo no Supabase
async function est_salvarProdutoCompleto() {
    const btn = document.getElementById('est-btn-salvar');
    if (btn) { btn.disabled = true; btn.innerText = 'Salvando...'; }
    try {
        const nome       = document.getElementById('est-f-nome').value;
        const categoria  = document.getElementById('est-f-categoria').value || 'Geral';
        const estoqueMin = parseInt(document.getElementById('est-f-estoque-minimo').value) || 0;
        const precoCusto = parseFloat(document.getElementById('est-f-custo').value) || 0;
        const precoVenda = parseFloat(document.getElementById('est-f-venda').value);
        const quantidade = parseInt(document.getElementById('est-f-quantidade').value) || 0;
        const descricao  = document.getElementById('est-f-descricao').value;
        const barras     = document.getElementById('est-f-barras').value;
        const fileFoto   = document.getElementById('est-f-foto').files[0];
        const editandoId = document.getElementById('est-f-editando-id').value;

        if (!nome || isNaN(precoVenda)) throw new Error("Preencha o Nome e o Preço de Venda!");

        let fotoUrl = null;
        if (fileFoto) {
            const fileName = `prod_${Date.now()}_${fileFoto.name}`;
            const { error } = await _supabase.storage.from('comprovantes').upload(`public/${fileName}`, fileFoto);
            if (!error) {
                fotoUrl = _supabase.storage.from('comprovantes').getPublicUrl(`public/${fileName}`).data.publicUrl;
            }
        }

        const dados = { 
            nome, 
            categoria, 
            estoque_minimo: estoqueMin, 
            preco_custo: precoCusto, 
            preco_venda: precoVenda, 
            quantidade_estoque: quantidade, 
            descricao, 
            codigo_barras: barras || null 
        };
        if (fotoUrl) dados.foto_url = fotoUrl;

        if (editandoId) {
            const { error } = await _supabase.from('produtos').update(dados).eq('id', editandoId);
            if (error) throw error;
            alert("Produto atualizado!");
        } else {
            const { error } = await _supabase.from('produtos').insert([dados]);
            if (error) throw error;
            alert("Produto cadastrado!");
        }

        est_cancelarEdicao();
        est_loadProdutos();
        est_loadDashboard();
        est_alternarSubAba('listagem');
    } catch(error) {
        alert(error.message);
    } finally {
        if (btn) { 
            btn.disabled = false; 
            btn.innerHTML = '<i class="fas fa-save"></i> Gravar Produto'; 
        }
    }
}

// Limpa os campos de filtro da listagem
function est_limparFiltros() {
    const filtroBusca = document.getElementById('est-filtro-busca');
    const filtroCat = document.getElementById('est-filtro-categoria');
    if (filtroBusca) filtroBusca.value = '';
    if (filtroCat) filtroCat.value = '';
    est_loadProdutos();
}

// Carrega e renderiza a tabela de produtos com filtros aplicados
async function est_loadProdutos() {
    const busca     = document.getElementById('est-filtro-busca')?.value    || '';
    const categoria = document.getElementById('est-filtro-categoria')?.value || '';

    let query = _supabase.from('produtos').select('*').order('nome', { ascending: true });
    if (busca)     query = query.or(`nome.ilike.%${busca}%,codigo_barras.ilike.%${busca}%`);
    if (categoria) query = query.eq('categoria', categoria);

    const { data, error } = await query;
    if (error) return;

    const tbody = document.getElementById('est-lista-produtos');
    if (!tbody) return;

    tbody.innerHTML = data.map(p => {
        const estoque = parseInt(p.quantidade_estoque || 0);
        const minimo  = parseInt(p.estoque_minimo || 0);
        let statusClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300';
        let statusTxt   = 'EM ESTOQUE';
        if (estoque === 0)       { statusClass = 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300 animate-pulse'; statusTxt = 'ZERADO'; }
        else if (estoque <= minimo){ statusClass = 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300';       statusTxt = 'ESTOQUE BAIXO'; }

        const imgHtml   = p.foto_url
            ? `<img src="${p.foto_url}" class="w-10 h-10 object-cover rounded shadow-sm inline-block mr-2">`
            : `<div class="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center text-slate-400 inline-block mr-2 text-xs"><i class="fas fa-box"></i></div>`;
        const codBarras = p.codigo_barras
            ? `<span class="text-xs font-mono text-slate-400 block"><i class="fas fa-barcode"></i> ${p.codigo_barras}</span>`
            : '<span class="text-xs text-slate-300 dark:text-slate-500 block">Sem código</span>';

        return `
        <tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
          <td class="p-3 text-center"><input type="checkbox" class="est-check-parcela" value="${p.id}"></td>
          <td class="p-3 flex items-center">${imgHtml}<div>${codBarras}</div></td>
          <td class="p-3">
            <div class="font-bold text-slate-700 dark:text-white">${p.nome}</div>
            <span class="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">${p.categoria || 'Geral'}</span>
          </td>
          <td class="p-3 font-bold text-slate-600 dark:text-slate-300">R$ ${parseFloat(p.preco_custo || 0).toFixed(2)}</td>
          <td class="p-3 font-bold text-emerald-600 dark:text-emerald-400 font-mono">R$ ${parseFloat(p.preco_venda || 0).toFixed(2)}</td>
          <td class="p-3 font-bold text-center text-slate-700 dark:text-white">${estoque} <span class="text-xs text-slate-400 font-normal block">mín: ${minimo}</span></td>
          <td class="p-3 text-center"><span class="px-2.5 py-1 rounded text-xs font-bold ${statusClass}">${statusTxt}</span></td>
          <td class="p-3 text-center">
            <button onclick="est_prepararEdicao('${p.id}')" class="bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300 px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition text-sm">
              <i class="fas fa-edit"></i> Editar
            </button>
          </td>
        </tr>`;
    }).join('');
}

// Preenche o formulário para edição de um produto existente
async function est_prepararEdicao(id) {
    const { data: p } = await _supabase.from('produtos').select('*').eq('id', id).single();
    if (p) {
        document.getElementById('est-f-editando-id').value       = p.id;
        document.getElementById('est-f-nome').value              = p.nome;
        document.getElementById('est-f-categoria').value         = p.categoria || 'Geral';
        document.getElementById('est-f-estoque-minimo').value    = p.estoque_minimo;
        document.getElementById('est-f-custo').value             = p.preco_custo;
        document.getElementById('est-f-venda').value             = p.preco_venda;
        document.getElementById('est-f-quantidade').value        = p.quantidade_estoque;
        document.getElementById('est-f-descricao').value         = p.descricao || '';
        document.getElementById('est-f-barras').value            = p.codigo_barras || '';
        
        const btnSalvar = document.getElementById('est-btn-salvar');
        const btnCancelar = document.getElementById('est-btn-cancelar');
        if (btnSalvar) btnSalvar.innerHTML = '<i class="fas fa-sync-alt"></i> Atualizar Produto';
        if (btnCancelar) btnCancelar.classList.remove('hidden');
        
        est_alternarSubAba('formulario');
    }
}

// Reseta o formulário de estoque e cancela o modo de edição
function est_cancelarEdicao() {
    const editandoId = document.getElementById('est-f-editando-id');
    const btnSalvar = document.getElementById('est-btn-salvar');
    const btnCancelar = document.getElementById('est-btn-cancelar');
    
    if (editandoId) editandoId.value = '';
    if (btnSalvar) btnSalvar.innerHTML = '<i class="fas fa-save"></i> Gravar Produto';
    if (btnCancelar) btnCancelar.classList.add('hidden');
    
    document.getElementById('est-f-nome').value           = '';
    document.getElementById('est-f-categoria').value      = 'Geral';
    document.getElementById('est-f-estoque-minimo').value = '5';
    document.getElementById('est-f-custo').value          = '0.00';
    document.getElementById('est-f-venda').value          = '';
    document.getElementById('est-f-quantidade').value     = '0';
    document.getElementById('est-f-descricao').value      = '';
    document.getElementById('est-f-barras').value         = '';
    document.getElementById('est-f-foto').value           = '';
    
    const nomeFoto = document.getElementById('est-nome-foto');
    if (nomeFoto) nomeFoto.innerHTML = '';
}

// Seleciona ou desmarca todos os checkboxes da tabela de estoque
function est_toggleTodosChecks(source) {
    document.querySelectorAll('.est-check-parcela').forEach(cb => cb.checked = source.checked);
}

// Exclui os produtos selecionados por checkbox
async function est_excluirSelecionados() {
    const ids = Array.from(document.querySelectorAll('.est-check-parcela:checked')).map(cb => cb.value);
    if (ids.length === 0) return alert("Selecione ao menos um produto para excluir.");
    if (confirm(`Deseja excluir ${ids.length} produto(s)?`)) {
        const { error } = await _supabase.from('produtos').delete().in('id', ids);
        if (!error) { 
            alert('Excluído com sucesso!'); 
            est_loadProdutos(); 
            est_loadDashboard(); 
        } else { 
            alert('Erro ao excluir: ' + error.message); 
        }
    }
}
