let fin_entidadesCache    = [];
let fin_html5QrCode       = null;
let fin_listenerSetup     = false; // evita registrar addEventListener múltiplas vezes

async function fin_init() {
    fin_loadEntidades();
    fin_loadCategoriasUnicas();
    fin_loadDashboard();
    fin_loadParcelas();
    fin_configurarDropZone('fin-drop-boleto','fin-f-boleto','fin-nome-boleto');
    fin_configurarDropZone('fin-drop-comprovante','fin-f-comprovante','fin-nome-comprovante');
    // Autocomplete de entidades (registra só uma vez)
    if (!fin_listenerSetup) {
        const inputBusca   = document.getElementById('fin-f-entidade-busca');
        const listaDropdown = document.getElementById('fin-lista-entidades');
        const inputId      = document.getElementById('fin-f-entidade-id');
        if (inputBusca) {
            inputBusca.addEventListener('input', e => {
                const termo = e.target.value.toLowerCase();
                listaDropdown.innerHTML = '';
                if (!termo) { listaDropdown.classList.add('hidden'); inputId.value=''; return; }
                const filtradas = fin_entidadesCache.filter(ent => ent.nome_completo.toLowerCase().includes(termo));
                if (filtradas.length > 0) {
                    listaDropdown.classList.remove('hidden');
                    filtradas.forEach(ent => {
                        const li = document.createElement('li');
                        li.className = 'p-3 hover:bg-slate-100 cursor-pointer text-sm border-b last:border-b-0 dark:hover:bg-slate-700';
                        li.innerHTML = `<i class="fas fa-user-circle text-slate-400 mr-2"></i>${ent.nome_completo}`;
                        li.onclick = () => { inputBusca.value = ent.nome_completo; inputId.value = ent.id; listaDropdown.classList.add('hidden'); };
                        listaDropdown.appendChild(li);
                    });
                } else { listaDropdown.classList.add('hidden'); inputId.value=''; }
            });
            fin_listenerSetup = true;
        }
    }
}

function fin_alternarSubAba(subAba) {
    const form   = document.getElementById('fin-aba-formulario');
    const lista  = document.getElementById('fin-aba-listagem');
    const btnF   = document.getElementById('fin-btn-aba-formulario');
    const btnL   = document.getElementById('fin-btn-aba-listagem');
    const verde  = ['bg-primary','text-white','hover:brightness-105'];
    const cinza  = ['bg-slate-200','text-slate-700','hover:bg-slate-300'];
    btnF.classList.remove(...verde,...cinza); btnL.classList.remove(...verde,...cinza);
    if (subAba === 'formulario') {
        form.classList.remove('hidden'); lista.classList.add('hidden');
        btnF.classList.add(...verde);   btnL.classList.add(...cinza);
    } else {
        form.classList.add('hidden');   lista.classList.remove('hidden');
        btnL.classList.add(...verde);   btnF.classList.add(...cinza);
    }
}

function fin_ajustarLabelsValor() {
    const tipo = document.getElementById('fin-f-tipo-calculo').value;
    document.getElementById('fin-label-valor').innerText = tipo === 'total' ? 'Valor Total (R$) *' : 'Valor da Parcela (R$) *';
}

async function fin_loadEntidades() {
    const { data } = await _supabase.from('entidades').select('id, nome_completo');
    if (data) fin_entidadesCache = data;
}

async function fin_loadCategoriasUnicas() {
    const { data } = await _supabase.from('financas').select('categoria');
    if (!data) return;
    const cats = [...new Set(data.map(i => i.categoria).filter(c => c))];
    const dl   = document.getElementById('fin-lista-categorias');
    const sel  = document.getElementById('fin-filtro-categoria');
    dl.innerHTML  = '';
    sel.innerHTML = '<option value="">Todas</option>';
    cats.forEach(c => { dl.innerHTML += `<option value="${c}">`; sel.innerHTML += `<option value="${c}">${c}</option>`; });
}

async function fin_loadDashboard() {
    const { data: parcelas } = await _supabase.from('parcelas').select('*, financas(tipo)');
    if (!parcelas) return;
    let receita=0, despesa=0, pendente=0;
    parcelas.forEach(p => {
        const v = parseFloat(p.valor_parcela||0);
        if (p.status==='pago') { p.financas?.tipo==='receita' ? receita+=v : despesa+=v; }
        else { pendente+=v; }
    });
    const fmt = n => `R$ ${n.toLocaleString('pt-br',{minimumFractionDigits:2})}`;
    document.getElementById('fin-dash-receita').innerText  = fmt(receita);
    document.getElementById('fin-dash-despesa').innerText  = fmt(despesa);
    document.getElementById('fin-dash-pendente').innerText = fmt(pendente);
}

async function fin_gerarLancamentoCompleto() {
    const btn = document.getElementById('fin-btn-salvar');
    btn.disabled=true; btn.innerText='Salvando...';
    try {
        const desc          = document.getElementById('fin-f-desc').value;
        const tipoCalculo   = document.getElementById('fin-f-tipo-calculo').value;
        const valorInput    = parseFloat(document.getElementById('fin-f-valor').value);
        const tipo          = document.getElementById('fin-f-tipo').value;
        const categoria     = document.getElementById('fin-f-categoria').value || 'Geral';
        const statusLanc    = document.getElementById('fin-f-status').value;
        const qtd           = parseInt(document.getElementById('fin-f-parcelas').value);
        const recorrencia   = document.getElementById('fin-f-recorrencia').value;
        const dataVenc      = document.getElementById('fin-f-vencimento').value;
        const dataPag       = document.getElementById('fin-f-data-pagamento').value;
        const entidade      = document.getElementById('fin-f-entidade-id').value || null;
        const barras        = document.getElementById('fin-f-barras').value;
        const fileBoleto    = document.getElementById('fin-f-boleto').files[0];
        const fileComp      = document.getElementById('fin-f-comprovante').files[0];
        const editandoId    = document.getElementById('fin-f-editando-id').value;
        const financaId     = document.getElementById('fin-f-editando-financa-id').value;

        if (!desc || !valorInput || !dataVenc) throw new Error("Preencha Descrição, Valor e Data de Vencimento!");

        let valorTotal, valorParcela;
        if (tipoCalculo==='total') { valorTotal=valorInput; valorParcela=(valorTotal/qtd).toFixed(2); }
        else { valorParcela=valorInput; valorTotal=(valorParcela*qtd).toFixed(2); }

        let boletoUrl=null, comprovanteUrl=null;
        const uploadFile = async (file, prefix) => {
            const fn = `${prefix}_${Date.now()}_${file.name}`;
            const { error } = await _supabase.storage.from('comprovantes').upload(`public/${fn}`, file);
            return error ? null : _supabase.storage.from('comprovantes').getPublicUrl(`public/${fn}`).data.publicUrl;
        };
        if (fileBoleto) boletoUrl    = await uploadFile(fileBoleto,'bol');
        if (fileComp)   comprovanteUrl = await uploadFile(fileComp,'comp');

        if (editandoId) {
            await _supabase.from('financas').update({ descricao:desc, tipo, categoria, status_lancamento:statusLanc, entidade_id:entidade }).eq('id',financaId);
            const upd = { valor_parcela:valorParcela, data_vencimento:dataVenc, status:dataPag?'pago':'pendente', data_pagamento:dataPag||null, codigo_barra:barras };
            if (boletoUrl)      upd.boleto_url      = boletoUrl;
            if (comprovanteUrl) upd.comprovante_url = comprovanteUrl;
            const { error } = await _supabase.from('parcelas').update(upd).eq('id',editandoId);
            if (error) throw error;
            alert("Parcela atualizada!");
        } else {
            const { data: fin, error: errF } = await _supabase.from('financas').insert([{
                descricao:desc, valor_total:valorTotal, tipo, categoria, status_lancamento:statusLanc, num_parcelas:qtd, entidade_id:entidade
            }]).select().single();
            if (errF) throw errF;
            const parcelas = [];
            for (let i=1; i<=qtd; i++) {
                let venc = new Date(dataVenc+'T12:00:00');
                if (recorrencia==='diario') venc.setDate(venc.getDate()+(i-1));
                else venc.setMonth(venc.getMonth()+((i-1)*parseInt(recorrencia)));
                parcelas.push({ financa_id:fin.id, num_parcela:i, valor_parcela:valorParcela, data_vencimento:venc.toISOString().split('T')[0], status:dataPag?'pago':'pendente', data_pagamento:dataPag||null, codigo_barra:barras, boleto_url:boletoUrl, comprovante_url:comprovanteUrl });
            }
            const { error: errP } = await _supabase.from('parcelas').insert(parcelas);
            if (errP) throw errP;
            alert("Lançamento salvo!");
        }
        fin_cancelarEdicao();
        fin_loadParcelas();
        fin_loadDashboard();
        fin_alternarSubAba('listagem');
    } catch(error) { alert(error.message); }
    finally { btn.disabled=false; btn.innerHTML='<i class="fas fa-save"></i> Gravar Lançamento'; }
}

async function fin_loadParcelas() {
    const busca    = document.getElementById('fin-filtro-busca').value;
    const cat      = document.getElementById('fin-filtro-categoria').value;
    const inicio   = document.getElementById('fin-filtro-inicio').value;
    const fim      = document.getElementById('fin-filtro-fim').value;
    let q = _supabase.from('parcelas').select('*, financas!inner(descricao,tipo,categoria,num_parcelas)').order('data_vencimento',{ascending:true});
    if (busca)  q = q.ilike('financas.descricao',`%${busca}%`);
    if (cat)    q = q.eq('financas.categoria',cat);
    if (inicio) q = q.gte('data_vencimento',inicio);
    if (fim)    q = q.lte('data_vencimento',fim);
    const { data, error } = await q;
    if (error) return;
    const tbody = document.getElementById('fin-lista-parcelas');
    const hoje  = new Date().toISOString().split('T')[0];
    tbody.innerHTML = data.map(p => {
        let sc = p.status==='pago' ? 'status-pago' : 'status-pendente';
        let st = p.status.toUpperCase();
        if (p.status==='pendente' && p.data_vencimento < hoje) { sc='status-atrasado'; st='ATRASADO'; }
        const dtVenc = new Date(p.data_vencimento+'T12:00:00').toLocaleDateString('pt-br');
        const dtPag  = p.data_pagamento ? new Date(p.data_pagamento+'T12:00:00').toLocaleDateString('pt-br') : '--/--/----';
        const iBoleto = p.boleto_url     ? `<a href="${p.boleto_url}" target="_blank" class="text-blue-500 bg-blue-50 px-2 py-1 rounded text-xs"><i class="fas fa-file-invoice"></i> Boleto</a>` : '';
        const iComp   = p.comprovante_url? `<a href="${p.comprovante_url}" target="_blank" class="text-emerald-500 bg-emerald-50 px-2 py-1 rounded text-xs"><i class="fas fa-receipt"></i> Recibo</a>` : '';
        const tBarras = p.codigo_barra   ? `<div class="text-gray-400 font-mono text-[10px] mt-1 break-all bg-slate-50 p-1 rounded"><i class="fas fa-barcode"></i> ${p.codigo_barra}</div>` : '';
        return `<tr class="border-b border-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
          <td class="p-3 text-center"><input type="checkbox" class="fin-check-parcela" value="${p.id}"></td>
          <td class="p-3"><div class="text-slate-800 dark:text-white font-bold">${dtVenc}</div><div class="text-xs text-slate-500 mt-1">${dtPag}</div></td>
          <td class="p-3"><div class="font-bold text-slate-700 dark:text-slate-200 mb-1">${p.financas.descricao} <span class="text-[10px] bg-gray-200 text-gray-600 px-1 rounded">${p.financas.categoria||'Geral'}</span></div><div class="flex gap-1 mb-1">${iBoleto}${iComp}</div>${tBarras}</td>
          <td class="p-3 font-bold text-slate-600 dark:text-slate-300">${p.num_parcela}/${p.financas.num_parcelas}</td>
          <td class="p-3 font-bold ${p.financas.tipo==='receita'?'text-emerald-600':'text-red-600'}">R$ ${parseFloat(p.valor_parcela).toFixed(2)}</td>
          <td class="p-3 text-center"><span class="${sc}">${st}</span></td>
          <td class="p-3 text-center"><button onclick="fin_prepararEdicao('${p.id}')" class="bg-blue-100 text-blue-600 px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition text-sm"><i class="fas fa-edit"></i> Editar</button></td>
        </tr>`;
    }).join('');
}

async function fin_prepararEdicao(id) {
    const { data: p } = await _supabase.from('parcelas').select('*, financas(*)').eq('id',id).single();
    if (p) {
        document.getElementById('fin-f-editando-id').value          = p.id;
        document.getElementById('fin-f-editando-financa-id').value  = p.financas.id;
        document.getElementById('fin-f-desc').value                 = p.financas.descricao;
        document.getElementById('fin-f-tipo').value                 = p.financas.tipo;
        document.getElementById('fin-f-categoria').value            = p.financas.categoria||'Geral';
        document.getElementById('fin-f-status').value               = p.financas.status_lancamento||'aberto';
        document.getElementById('fin-f-tipo-calculo').value         = 'parcela';
        fin_ajustarLabelsValor();
        document.getElementById('fin-f-valor').value                = p.valor_parcela;
        document.getElementById('fin-f-parcelas').value             = 1;
        document.getElementById('fin-f-parcelas').disabled          = true;
        document.getElementById('fin-f-recorrencia').disabled       = true;
        document.getElementById('fin-f-vencimento').value           = p.data_vencimento;
        document.getElementById('fin-f-data-pagamento').value       = p.data_pagamento||'';
        document.getElementById('fin-f-barras').value               = p.codigo_barra||'';
        document.getElementById('fin-btn-salvar').innerHTML         = '<i class="fas fa-sync-alt"></i> Atualizar Parcela';
        document.getElementById('fin-btn-cancelar').classList.remove('hidden');
        fin_alternarSubAba('formulario');
    }
}

function fin_cancelarEdicao() {
    ['fin-f-editando-id','fin-f-editando-financa-id'].forEach(id => document.getElementById(id).value='');
    document.getElementById('fin-f-parcelas').disabled    = false;
    document.getElementById('fin-f-recorrencia').disabled = false;
    document.getElementById('fin-btn-salvar').innerHTML   = '<i class="fas fa-save"></i> Gravar Lançamento';
    document.getElementById('fin-btn-cancelar').classList.add('hidden');
    ['fin-f-desc','fin-f-valor','fin-f-vencimento','fin-f-data-pagamento','fin-f-barras'].forEach(id => document.getElementById(id).value='');
    document.getElementById('fin-f-categoria').value = 'Geral';
    document.getElementById('fin-nome-boleto').innerHTML      = '';
    document.getElementById('fin-nome-comprovante').innerHTML = '';
}

function fin_toggleTodosChecks(src) { document.querySelectorAll('.fin-check-parcela').forEach(cb => cb.checked=src.checked); }

async function fin_excluirSelecionados() {
    const ids = Array.from(document.querySelectorAll('.fin-check-parcela:checked')).map(cb => cb.value);
    if (!ids.length) return alert("Selecione ao menos uma parcela.");
    if (confirm(`Excluir ${ids.length} parcela(s)?`)) {
        const { error } = await _supabase.from('parcelas').delete().in('id',ids);
        if (!error) { alert('Excluído!'); fin_loadParcelas(); fin_loadDashboard(); }
        else alert('Erro: '+error.message);
    }
}

function fin_limparFiltros() {
    ['fin-filtro-busca','fin-filtro-inicio','fin-filtro-fim'].forEach(id => document.getElementById(id).value='');
    document.getElementById('fin-filtro-categoria').value='';
    fin_loadParcelas();
}

function fin_iniciarLeituraCamera() {
    const c = document.getElementById('fin-camera-container');
    c.classList.remove('hidden');
    fin_html5QrCode = new Html5Qrcode("fin-camera-preview");
    fin_html5QrCode.start({facingMode:"environment"},{fps:10,qrbox:{width:300,height:150}},txt=>{
        document.getElementById('fin-f-barras').value=txt; fin_pararCamera();
    }).catch(()=>{ alert("Verifique as permissões da câmera."); c.classList.add('hidden'); });
}

function fin_pararCamera() {
    if (fin_html5QrCode) fin_html5QrCode.stop().then(()=>document.getElementById('fin-camera-container').classList.add('hidden'));
    else document.getElementById('fin-camera-container').classList.add('hidden');
}

function fin_configurarDropZone(dropId, inputId, txtId) {
    const dz = document.getElementById(dropId);
    const ip = document.getElementById(inputId);
    if (!dz||!ip) return;
    dz.addEventListener('dragover', e=>{e.preventDefault(); dz.classList.add('dragover');});
    dz.addEventListener('dragleave',e=>{e.preventDefault(); dz.classList.remove('dragover');});
    dz.addEventListener('drop',e=>{e.preventDefault(); dz.classList.remove('dragover'); if(e.dataTransfer.files?.length){ip.files=e.dataTransfer.files; fin_mostrarNomeArquivo(ip,txtId);}});
}

function fin_mostrarNomeArquivo(input, idCampo) {
    const el = document.getElementById(idCampo);
    el.innerHTML = input.files?.length ? `<i class="fas fa-check"></i> ${input.files[0].name}` : '';
}
