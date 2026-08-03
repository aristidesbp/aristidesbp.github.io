

// ── Drop Zone de Foto (Entidades) ─────────────────────────────────────
function configurarDropZone(dropId, inputId, txtId) {
    const dropZone = document.getElementById(dropId);
    const inputEl  = document.getElementById(inputId);
    if (!dropZone || !inputEl) return;
    dropZone.addEventListener('dragover',  e => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', e => { e.preventDefault(); dropZone.classList.remove('dragover'); });
    dropZone.addEventListener('drop', e => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files?.length > 0) {
            inputEl.files = e.dataTransfer.files;
            mostrarNomeArquivo(inputEl, txtId);
        }
    });
}

function mostrarNomeArquivo(input, idCampoTexto) {
    const campoTexto = document.getElementById(idCampoTexto);
    if (input.files?.length > 0) {
        campoTexto.style.display = 'inline-flex';
        campoTexto.innerHTML = `<span class="material-symbols-outlined text-sm">verified</span> ${input.files[0].name}`;
    } else {
        campoTexto.style.display = 'none';
        campoTexto.innerHTML = '';
    }
}

// ── Busca de CEP ──────────────────────────────────────────────────────
async function buscarCEP(cep) {
    const limpo = cep.replace(/\D/g,'');
    if (limpo.length !== 8) return;
    try {
        const res  = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
        const data = await res.json();
        if (!data.erro) {
            document.getElementById('f-logradouro').value = data.logradouro;
            document.getElementById('f-bairro').value     = data.bairro;
            document.getElementById('f-cidade').value     = data.localidade;
            document.getElementById('f-estado').value     = data.uf;
            document.getElementById('f-numero').focus();
        }
    } catch(e) { console.error("CEP fetch error"); }
}

// ── Dashboard de Entidades ────────────────────────────────────────────
async function loadDashboard() {
    const { data } = await _supabase.from('entidades').select('tipo_entidade,status_entidade');
    if (!data) return;
    let clientes=0, fornecedores=0, inativos=0;
    data.forEach(e => {
        if (e.status_entidade==='inativo') inativos++;
        if (e.tipo_entidade==='cliente')   clientes++;
        if (e.tipo_entidade==='fornecedor') fornecedores++;
    });
    document.getElementById('dash-clientes').innerText    = clientes;
    document.getElementById('dash-fornecedores').innerText = fornecedores;
    document.getElementById('dash-inativos').innerText    = inativos;
}

// ── Paginação ─────────────────────────────────────────────────────────
function mudarPagina(direcao) {
    const nova = paginaAtual + direcao;
    const total = Math.ceil(totalRegistros / itensPorPagina);
    if (nova >= 1 && (totalRegistros === 0 || nova <= total)) {
        paginaAtual = nova;
        loadEntidades();
    }
}

// ── PDF ───────────────────────────────────────────────────────────────
function gerarPDF() {
    alert("Preparando PDF das entidades filtradas para download.");
}

// ── CRUD de Entidades ─────────────────────────────────────────────────
async function salvarEntidade() {
    const btn = document.getElementById('btn-salvar');
    btn.disabled = true; btn.innerText = 'Gravando...';
    try {
        const id         = document.getElementById('f-editando-id').value;
        const nome       = document.getElementById('f-nome').value;
        const cpf        = document.getElementById('f-cpf').value;
        const nascimento = document.getElementById('f-nascimento').value || null;
        const email      = document.getElementById('f-email').value;
        const telefone   = document.getElementById('f-telefone').value;
        const tipo       = document.getElementById('f-tipo-entidade').value;
        const status     = document.getElementById('f-status').value;
        const cep        = document.getElementById('f-cep').value;
        const logradouro = document.getElementById('f-logradouro').value;
        const numero     = document.getElementById('f-numero').value;
        const bairro     = document.getElementById('f-bairro').value;
        const city       = document.getElementById('f-cidade').value;
        const state      = document.getElementById('f-estado').value;
        const fileFoto   = document.getElementById('f-foto').files[0];

        if (!nome) throw new Error("O Nome Completo é obrigatório.");

        let fotoUrlFinal = null;
        if (fileFoto) {
            const fileName = `avatar_${Date.now()}_${fileFoto.name}`;
            const { error: uploadError } = await _supabase.storage.from('comprovantes').upload(`public/${fileName}`, fileFoto);
            if (!uploadError) {
                fotoUrlFinal = _supabase.storage.from('comprovantes').getPublicUrl(`public/${fileName}`).data.publicUrl;
            }
        }

        const payload = {
            nome_completo: nome, cpf, data_nascimento: nascimento, email, telefone,
            tipo_entidade: tipo, status_entidade: status, cep, logradouro, numero,
            bairro, cidade: city, estado: state, user_id: usuarioLogadoId
        };
        if (fotoUrlFinal) payload.foto_url = fotoUrlFinal;

        if (id) {
            const { error } = await _supabase.from('entidades').update(payload).eq('id', id);
            if (error) throw error;
            alert("Registro sincronizado.");
        } else {
            const { error } = await _supabase.from('entidades').insert([payload]);
            if (error) throw error;
            alert("Nova entidade integrada.");
        }

        cancelarEdicao();
        loadDashboard();
        loadEntidades();
        ent_alternarSubAba('listagem');
    } catch(error) {
        alert(error.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<span class="material-symbols-outlined">save</span> Confirmar Registro';
    }
}

async function loadEntidades() {
    const busca = document.getElementById('filtro-busca').value;
    const tipo  = document.getElementById('filtro-tipo').value;

    let countQuery = _supabase.from('entidades').select('*',{count:'exact',head:true});
    if (busca) countQuery = countQuery.ilike('nome_completo',`%${busca}%`);
    if (tipo)  countQuery = countQuery.eq('tipo_entidade', tipo);
    const { count } = await countQuery;
    totalRegistros = count || 0;

    let query = _supabase.from('entidades').select('*').order('nome_completo',{ascending:true});
    if (busca) query = query.ilike('nome_completo',`%${busca}%`);
    if (tipo)  query = query.eq('tipo_entidade', tipo);
    const start = (paginaAtual - 1) * itensPorPagina;
    query = query.range(start, start + itensPorPagina - 1);

    const { data, error } = await query;
    if (error) return;

    const totalPaginas = Math.ceil(totalRegistros / itensPorPagina);
    document.getElementById('page-indicator').innerText    = `Página ${paginaAtual} de ${totalPaginas || 1}`;
    document.getElementById('pagination-info').innerText   = `Mostrando ${data.length} de ${totalRegistros}`;
    document.getElementById('btn-anterior').disabled       = paginaAtual === 1;
    document.getElementById('btn-proximo').disabled        = paginaAtual >= totalPaginas;

    const grid = document.getElementById('lista-entidades-grid');
    if (data.length === 0) {
        grid.innerHTML = '<div class="col-span-full py-20 text-center text-slate-400 font-bold">Nenhum registro encontrado.</div>';
        return;
    }

    grid.innerHTML = data.map(e => {
        const statusColor  = e.status_entidade === 'ativo' ? 'bg-emerald-500' : 'bg-slate-300';
        const imgUrl       = e.foto_url || 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(e.nome_completo);
        const whatsappUrl  = `https://wa.me/${(e.telefone||'').replace(/\D/g,'')}`;
        const mailtoUrl    = `mailto:${e.email}`;
        return `
        <div class="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-5 shadow-sm hover:shadow-premium transition-all duration-300 flex flex-col items-center group relative">
          <div class="absolute top-3 left-3 z-10">
            <input type="checkbox" class="check-entidade w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary bg-white dark:bg-slate-800" value="${e.id}">
          </div>
          <div class="relative mb-4">
            <img src="${imgUrl}" class="w-20 h-20 rounded-2xl object-cover border-4 border-slate-50 dark:border-slate-700 shadow-sm">
            <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-slate-800 ${statusColor}"></div>
          </div>
          <div class="text-center w-full mb-6">
            <span class="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-2">${e.tipo_entidade}</span>
            <h4 class="font-bold text-slate-900 dark:text-white truncate px-2 mb-1" title="${e.nome_completo}">${e.nome_completo}</h4>
            <p class="text-xs text-slate-400 truncate px-4">${e.email || 'Sem e-mail'}</p>
            <p class="text-[11px] text-slate-500 mt-1 font-mono-sm">${e.telefone || '---'}</p>
          </div>
          <div class="flex items-center gap-3 mt-auto pt-4 border-t border-slate-50 dark:border-slate-700 w-full justify-center">
            <button onclick="window.open('${whatsappUrl}','_blank')" class="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center hover:scale-110 transition-transform shadow-sm" title="WhatsApp">
              <span class="material-symbols-outlined text-lg">chat</span>
            </button>
            <a href="${mailtoUrl}" class="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:scale-110 transition-transform shadow-sm" title="E-mail">
              <span class="material-symbols-outlined text-lg">mail</span>
            </a>
            <button onclick="prepararEdicao('${e.id}')" class="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm" title="Editar">
              <span class="material-symbols-outlined text-lg">edit_square</span>
            </button>
          </div>
        </div>`;
    }).join('');
}

async function prepararEdicao(id) {
    const { data: e } = await _supabase.from('entidades').select('*').eq('id', id).single();
    if (e) {
        document.getElementById('f-editando-id').value   = e.id;
        document.getElementById('f-nome').value          = e.nome_completo;
        document.getElementById('f-cpf').value           = e.cpf || '';
        document.getElementById('f-nascimento').value    = e.data_nascimento || '';
        document.getElementById('f-email').value         = e.email || '';
        document.getElementById('f-telefone').value      = e.telefone || '';
        document.getElementById('f-tipo-entidade').value = e.tipo_entidade;
        document.getElementById('f-status').value        = e.status_entidade;
        document.getElementById('f-cep').value           = e.cep || '';
        document.getElementById('f-logradouro').value    = e.logradouro || '';
        document.getElementById('f-numero').value        = e.numero || '';
        document.getElementById('f-bairro').value        = e.bairro || '';
        document.getElementById('f-cidade').value        = e.cidade || '';
        document.getElementById('f-estado').value        = e.estado || '';
        document.getElementById('f-foto').value          = '';

        const fotoTxt = document.getElementById('nome-foto');
        if (e.foto_url) { fotoTxt.style.display='inline-flex'; fotoTxt.innerHTML='<span class="material-symbols-outlined text-sm">image</span> Mídia anexada'; }
        else { fotoTxt.style.display='none'; }

        document.getElementById('btn-salvar').innerHTML = '<span class="material-symbols-outlined">sync</span> Atualizar Registro';
        document.getElementById('btn-cancelar').classList.remove('hidden');

        ent_alternarSubAba('formulario');
    }
}

function cancelarEdicao() {
    document.getElementById('f-editando-id').value = '';
    document.getElementById('btn-salvar').innerHTML = '<span class="material-symbols-outlined">save</span> Confirmar Registro';
    document.getElementById('btn-cancelar').classList.add('hidden');

    document.querySelectorAll('#ent-painel-formulario input, #ent-painel-formulario select').forEach(i => {
        if (i.type !== 'hidden') i.value = '';
    });
    document.getElementById('f-tipo-entidade').value = 'cliente';
    document.getElementById('f-status').value        = 'ativo';
    document.getElementById('nome-foto').style.display = 'none';
    document.getElementById('nome-foto').innerHTML   = '';

    ent_alternarSubAba('listagem');
}

function toggleTodosChecks(source) {
    document.querySelectorAll('.check-entidade').forEach(cb => cb.checked = source.checked);
}

async function excluirSelecionados() {
    const ids = Array.from(document.querySelectorAll('.check-entidade:checked')).map(cb => cb.value);
    if (ids.length === 0) return alert("Selecione registros para excluir.");
    if (confirm(`Confirmar exclusão de ${ids.length} registro(s)?`)) {
        const { error } = await _supabase.from('entidades').delete().in('id', ids);
        if (!error) { alert("Registros excluídos."); paginaAtual=1; loadDashboard(); loadEntidades(); }
        else { alert("Erro: " + error.message); }
    }
}

function limparFiltros() {
    document.getElementById('filtro-busca').value = '';
    document.getElementById('filtro-tipo').value  = '';
    paginaAtual = 1;
    loadEntidades();
}
