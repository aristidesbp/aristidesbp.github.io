// Configuração do Supabase
const supabaseUrl = 'https://wyusolfkxrnwijwjusnv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dXNvbGZreHJud2lqd2p1c252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NzU0MTMsImV4cCI6MjA5MTA1MTQxM30.RJ0GOHHP4rB40CH0x8JZ1FWAzNcakSprgUwOBtOUVbA'; 
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

let entidadesCache = [];
let html5QrCode = null;

// ====================================================================
// CONTROLE DO MENU HAMBÚRGUER E ABAS
// ====================================================================
function abrirMenu() {
    document.getElementById('sidebar-menu').classList.remove('-translate-x-full');
    document.getElementById('menu-overlay').classList.remove('hidden');
}

function fecharMenu() {
    document.getElementById('sidebar-menu').classList.add('-translate-x-full');
    document.getElementById('menu-overlay').classList.add('hidden');
}

function alternarAba(abaAtiva) {
    const form = document.getElementById('aba-formulario');
    const lista = document.getElementById('aba-listagem');
    const btnForm = document.getElementById('btn-aba-formulario');
    const btnLista = document.getElementById('btn-aba-listagem');

    const classesVerde = ['bg-emerald-500', 'text-white', 'hover:bg-emerald-600'];
    const classesCinza = ['bg-slate-200', 'text-slate-700', 'hover:bg-slate-300'];

    btnForm.classList.remove(...classesVerde, ...classesCinza);
    btnLista.classList.remove(...classesVerde, ...classesCinza);

    if (abaAtiva === 'formulario') {
        form.classList.remove('hidden');
        lista.classList.add('hidden');
        btnForm.classList.add(...classesVerde);
        btnLista.classList.add(...classesCinza);
    } else {
        form.classList.add('hidden');
        lista.classList.remove('hidden');
        btnLista.classList.add(...classesVerde);
        btnForm.classList.add(...classesCinza);
    }
}

// ====================================================================
// AUTENTICAÇÃO E CONTROLE DE TELAS
// ====================================================================
async function verificar_login() {
    const { data: { session } } = await _supabase.auth.getSession();
    const telaLogin = document.getElementById('tela-login');
    const telaSistema = document.getElementById('tela-sistema');

    if (!session) {
        telaLogin.classList.remove('hidden');
        telaLogin.classList.add('flex');
        telaSistema.classList.add('hidden');
    } else {
        telaLogin.classList.add('hidden');
        telaLogin.classList.remove('flex');
        telaSistema.classList.remove('hidden');
        init(); 
    }
}

async function fazerLogin() {
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;
    const btn = document.getElementById('btn-login');
    
    if(!email || !senha) return alert("Por favor, preencha e-mail e senha.");

    btn.innerText = 'Autenticando...';
    btn.disabled = true;

    const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
    
    if (error) {
        alert("Erro ao fazer login: Verifique seu e-mail e senha.");
        btn.innerText = 'Entrar no Sistema';
        btn.disabled = false;
    } else {
        document.getElementById('login-email').value = '';
        document.getElementById('login-senha').value = '';
        btn.innerText = 'Entrar no Sistema';
        btn.disabled = false;
        verificar_login(); 
    }
}

async function sairDaConta() {
    await _supabase.auth.signOut();
    document.getElementById('lista-parcelas').innerHTML = '';
    document.getElementById('dash-receita').innerText = 'R$ 0,00';
    document.getElementById('dash-despesa').innerText = 'R$ 0,00';
    document.getElementById('dash-pendente').innerText = 'R$ 0,00';
    fecharMenu();
    verificar_login();
}

// ====================================================================
// INICIALIZAÇÃO E ARRASTAR/SOLTAR
// ====================================================================
document.addEventListener('DOMContentLoaded', () => {
    verificar_login();
    configurarDropZone('drop-boleto', 'f-boleto', 'nome-boleto');
    configurarDropZone('drop-comprovante', 'f-comprovante', 'nome-comprovante');
});

async function init() {
    loadEntidades();
    loadCategoriasUnicas();
    loadDashboard();
    loadParcelas();
}

function configurarDropZone(dropId, inputId, txtId) {
    const dropZone = document.getElementById(dropId);
    const inputElement = document.getElementById(inputId);

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            inputElement.files = e.dataTransfer.files;
            mostrarNomeArquivo(inputElement, txtId);
        }
    });
}

function mostrarNomeArquivo(input, idCampoTexto) {
    const campoTexto = document.getElementById(idCampoTexto);
    if (input.files && input.files.length > 0) {
        campoTexto.innerHTML = `<i class="fas fa-check"></i> ${input.files[0].name}`;
    } else {
        campoTexto.innerHTML = '';
    }
}

// ====================================================================
// FUNÇÕES DO SISTEMA E CRUD
// ====================================================================
function ajustarLabelsValor() {
    const tipo = document.getElementById('f-tipo-calculo').value;
    document.getElementById('label-valor').innerText = tipo === 'total' ? 'Valor Total (R$)' : 'Valor da Parcela (R$)';
}

async function loadEntidades() {
    const { data } = await _supabase.from('entidades').select('id, nome_completo');
    if(data) entidadesCache = data;
}

async function loadCategoriasUnicas() {
    const { data } = await _supabase.from('financas').select('categoria');
    if (!data) return;
    
    const categorias = [...new Set(data.map(item => item.categoria).filter(c => c))];
    
    const datalist = document.getElementById('lista-categorias');
    const selectFiltro = document.getElementById('filtro-categoria');
    
    datalist.innerHTML = '';
    selectFiltro.innerHTML = '<option value="">Todas</option>';
    
    categorias.forEach(cat => {
        datalist.innerHTML += `<option value="${cat}">`;
        selectFiltro.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
}

const inputBusca = document.getElementById('f-entidade-busca');
const listaDropdown = document.getElementById('lista-entidades');
const inputId = document.getElementById('f-entidade-id');

inputBusca.addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    listaDropdown.innerHTML = '';
    if (!termo) { listaDropdown.classList.add('hidden'); inputId.value = ''; return; }

    const filtradas = entidadesCache.filter(ent => ent.nome_completo.toLowerCase().includes(termo));
    if (filtradas.length > 0) {
        listaDropdown.classList.remove('hidden');
        filtradas.forEach(ent => {
            const li = document.createElement('li');
            li.className = 'p-3 hover:bg-slate-100 cursor-pointer text-sm border-b last:border-b-0';
            li.innerHTML = `<i class="fas fa-user-circle text-slate-400 mr-2"></i>${ent.nome_completo}`;
            li.onclick = () => {
                inputBusca.value = ent.nome_completo;
                inputId.value = ent.id;
                listaDropdown.classList.add('hidden');
            };
            listaDropdown.appendChild(li);
        });
    } else { listaDropdown.classList.add('hidden'); inputId.value = ''; }
});

function iniciarLeituraCamera() {
    const container = document.getElementById('camera-container');
    container.classList.remove('hidden');
    html5QrCode = new Html5Qrcode("camera-preview");
    const config = { fps: 10, qrbox: { width: 300, height: 150 } };
    html5QrCode.start({ facingMode: "environment" }, config, (decodedText) => {
        document.getElementById('f-barras').value = decodedText;
        pararCamera();
    }).catch(() => { alert("Verifique as permissões da câmera."); container.classList.add('hidden'); });
}

function pararCamera() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => { document.getElementById('camera-container').classList.add('hidden'); });
    } else { document.getElementById('camera-container').classList.add('hidden'); }
}

async function loadDashboard() {
    const { data: parcelas } = await _supabase.from('parcelas').select('*, financas(tipo)');
    if(!parcelas) return;
    let receita = 0, despesa = 0, pendente = 0;
    parcelas.forEach(p => {
        const valor = parseFloat(p.valor_parcela || 0);
        if (p.status === 'pago') { p.financas.tipo === 'receita' ? receita += valor : despesa += valor; }
        else { pendente += valor; }
    });
    document.getElementById('dash-receita').innerText = `R$ ${receita.toLocaleString('pt-br', {minimumFractionDigits: 2})}`;
    document.getElementById('dash-despesa').innerText = `R$ ${despesa.toLocaleString('pt-br', {minimumFractionDigits: 2})}`;
    document.getElementById('dash-pendente').innerText = `R$ ${pendente.toLocaleString('pt-br', {minimumFractionDigits: 2})}`;
}

async function gerarLancamentoCompleto() {
    const btn = document.getElementById('btn-salvar');
    btn.disabled = true; btn.innerText = 'Salvando...';

    try {
        const desc = document.getElementById('f-desc').value;
        const tipoCalculo = document.getElementById('f-tipo-calculo').value;
        const valorInput = parseFloat(document.getElementById('f-valor').value);
        const tipo = document.getElementById('f-tipo').value;
        const categoria = document.getElementById('f-categoria').value || 'Geral';
        const statusLancamento = document.getElementById('f-status').value;
        const qtd = parseInt(document.getElementById('f-parcelas').value);
        const recorrenciaVal = document.getElementById('f-recorrencia').value;
        const dataVenc = document.getElementById('f-vencimento').value;
        const dataPagamentoForm = document.getElementById('f-data-pagamento').value;
        const entidade = document.getElementById('f-entidade-id').value || null;
        const barras = document.getElementById('f-barras').value;
        
        const fileBoleto = document.getElementById('f-boleto').files[0];
        const fileComprovante = document.getElementById('f-comprovante').files[0];
        
        const editandoId = document.getElementById('f-editando-id').value;
        const financaId = document.getElementById('f-editando-financa-id').value;

        if(!desc || !valorInput || !dataVenc) throw new Error("Preencha Descrição, Valor e Data de Vencimento!");

        let valorTotal, valorParcela;
        if (tipoCalculo === 'total') {
            valorTotal = parseFloat(valorInput);
            valorParcela = parseFloat((valorTotal / qtd).toFixed(2));
        } else {
            valorParcela = parseFloat(valorInput);
            valorTotal = parseFloat((valorParcela * qtd).toFixed(2));
        }

        let boletoUrl = null;
        let comprovanteUrl = null;

        if (fileBoleto) {
            const fileName = `bol_${Date.now()}_${fileBoleto.name}`;
            const { error } = await _supabase.storage.from('comprovantes').upload(`public/${fileName}`, fileBoleto);
            if(!error) boletoUrl = _supabase.storage.from('comprovantes').getPublicUrl(`public/${fileName}`).data.publicUrl;
        }

        if (fileComprovante) {
            const fileName = `comp_${Date.now()}_${fileComprovante.name}`;
            const { error } = await _supabase.storage.from('comprovantes').upload(`public/${fileName}`, fileComprovante);
            if(!error) comprovanteUrl = _supabase.storage.from('comprovantes').getPublicUrl(`public/${fileName}`).data.publicUrl;
        }

        if (editandoId) {
            await _supabase.from('financas').update({
                descricao: desc, tipo: tipo, categoria: categoria, status_lancamento: statusLancamento, entidade_id: entidade
            }).eq('id', financaId);

            const payloadUpdate = {
                valor_parcela: valorParcela,
                data_vencimento: dataVenc,
                status: dataPagamentoForm ? 'pago' : 'pendente',
                data_pagamento: dataPagamentoForm || null,
                codigo_barra: barras
            };
            if (boletoUrl) payloadUpdate.boleto_url = boletoUrl;
            if (comprovanteUrl) payloadUpdate.comprovante_url = comprovanteUrl;

            const { error: errUpdate } = await _supabase.from('parcelas').update(payloadUpdate).eq('id', editandoId);
            if (errUpdate) throw errUpdate;

            alert("Parcela atualizada com sucesso!");
        } else {
            const { data: financa, error: errF } = await _supabase.from('financas').insert([{
                descricao: desc, valor_total: valorTotal, tipo, categoria, status_lancamento: statusLancamento, num_parcelas: qtd, entidade_id: entidade
            }]).select().single();
            if(errF) throw errF;

            let parcelas = [];
            for(let i = 1; i <= qtd; i++) {
                let venc = new Date(dataVenc + 'T12:00:00'); 
                if (recorrenciaVal === 'diario') {
                    venc.setDate(venc.getDate() + (i - 1));
                } else {
                    venc.setMonth(venc.getMonth() + ((i - 1) * parseInt(recorrenciaVal))); 
                }
                
                parcelas.push({
                    financa_id: financa.id,
                    num_parcela: i,
                    valor_parcela: valorParcela,
                    data_vencimento: venc.toISOString().split('T')[0],
                    status: dataPagamentoForm ? 'pago' : 'pendente',
                    data_pagamento: dataPagamentoForm || null,
                    codigo_barra: barras,
                    boleto_url: boletoUrl,
                    comprovante_url: comprovanteUrl
                });
            }

            const { error: errP } = await _supabase.from('parcelas').insert(parcelas);
            if(errP) throw errP;

            alert("Lançamento salvo!");
        }
        
        cancelarEdicao();
        loadParcelas();
        loadDashboard();
        alternarAba('listagem');
        btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Gravar Lançamento';

    } catch (error) {
        alert(error.message);
        btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Gravar Lançamento';
    }
}

function limparFiltros() {
    document.getElementById('filtro-busca').value = '';
    document.getElementById('filtro-categoria').value = '';
    document.getElementById('filtro-inicio').value = '';
    document.getElementById('filtro-fim').value = '';
    loadParcelas();
}

async function loadParcelas() {
    const busca = document.getElementById('filtro-busca').value;
    const categoria = document.getElementById('filtro-categoria').value;
    const dataInicio = document.getElementById('filtro-inicio').value;
    const dataFim = document.getElementById('filtro-fim').value;

    let query = _supabase.from('parcelas').select('*, financas!inner(descricao, tipo, categoria)').order('data_vencimento', { ascending: true });

    if (busca) query = query.ilike('financas.descricao', `%${busca}%`);
    if (categoria) query = query.eq('financas.categoria', categoria);
    if (dataInicio) query = query.gte('data_vencimento', dataInicio);
    if (dataFim) query = query.lte('data_vencimento', dataFim);

    const { data, error } = await query;
    if (error) { console.error("Erro ao carregar parcelas:", error.message); return; }
    
    const tbody = document.getElementById('lista-parcelas');
    const hoje = new Date().toISOString().split('T')[0];

    tbody.innerHTML = data.map(p => {
        let statusClass = p.status === 'pago' ? 'status-pago' : 'status-pendente';
        let statusTxt = p.status.toUpperCase();
        if(p.status === 'pendente' && p.data_vencimento < hoje) { statusClass = 'status-atrasado'; statusTxt = 'ATRASADO'; }

        const dtVenc = new Date(p.data_vencimento + 'T12:00:00').toLocaleDateString('pt-br');
        const dtPag = p.data_pagamento ? new Date(p.data_pagamento + 'T12:00:00').toLocaleDateString('pt-br') : '--/--/----';

        const iconeBoleto = p.boleto_url ? `<a href="${p.boleto_url}" target="_blank" class="text-blue-500 hover:text-blue-700 ml-2 bg-blue-50 px-2 py-1 rounded text-xs"><i class="fas fa-file-invoice"></i> Boleto</a>` : '';
        const iconeComp = p.comprovante_url ? `<a href="${p.comprovante_url}" target="_blank" class="text-emerald-500 hover:text-emerald-700 ml-2 bg-emerald-50 px-2 py-1 rounded text-xs"><i class="fas fa-receipt"></i> Recibo</a>` : '';
        const txtBarras = p.codigo_barra ? `<div class="text-gray-400 font-mono text-[10px] mt-1 break-all bg-slate-50 p-1 rounded"><i class="fas fa-barcode"></i> ${p.codigo_barra}</div>` : '';

        return `
        <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
            <td class="p-3 text-center">
                <input type="checkbox" class="check-parcela" value="${p.id}">
            </td>
            <td class="p-3">
                <div class="text-slate-800 font-bold"><i class="far fa-calendar-alt text-slate-400"></i> ${dtVenc}</div>
                <div class="text-xs text-slate-500 mt-1"><i class="fas fa-check text-emerald-400"></i> ${dtPag}</div>
            </td>
            <td class="p-3">
                <div class="font-bold text-slate-700 mb-1">${p.financas.descricao} <span class="text-[10px] font-normal bg-gray-200 text-gray-600 px-1 rounded ml-1">${p.financas.categoria || 'Geral'}</span></div>
                <div class="flex gap-1 mb-1">${iconeBoleto}${iconeComp}</div>
                ${txtBarras}
            </td>
            <td class="p-3 font-bold text-slate-600">${p.num_parcela} / ${p.financas.num_parcelas}</td>
            <td class="p-3 font-bold ${p.financas.tipo === 'receita' ? 'text-emerald-600' : 'text-red-600'}">
                R$ ${parseFloat(p.valor_parcela).toFixed(2)}
            </td>
            <td class="p-3 text-center"><span class="${statusClass}">${statusTxt}</span></td>
            <td class="p-3 text-center">
                <button onclick="prepararEdicao('${p.id}')" class="bg-blue-100 text-blue-600 px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition text-sm">
                    <i class="fas fa-edit"></i> Editar
                </button>
            </td>
        </tr>`;
    }).join('');
}

async function prepararEdicao(id) {
    const { data: p } = await _supabase.from('parcelas').select('*, financas(*)').eq('id', id).single();
    if (p) {
        document.getElementById('f-editando-id').value = p.id;
        document.getElementById('f-editando-financa-id').value = p.financas.id;
        
        document.getElementById('f-desc').value = p.financas.descricao;
        document.getElementById('f-tipo').value = p.financas.tipo;
        document.getElementById('f-categoria').value = p.financas.categoria || 'Geral';
        document.getElementById('f-status').value = p.financas.status_lancamento || 'aberto';
        
        document.getElementById('f-tipo-calculo').value = 'parcela';
        ajustarLabelsValor();
        document.getElementById('f-valor').value = p.valor_parcela;
        document.getElementById('f-parcelas').value = 1;
        document.getElementById('f-parcelas').disabled = true; 
        document.getElementById('f-recorrencia').disabled = true;
        
        document.getElementById('f-vencimento').value = p.data_vencimento;
        document.getElementById('f-data-pagamento').value = p.data_pagamento || '';
        document.getElementById('f-barras').value = p.codigo_barra || '';
        
        document.getElementById('btn-salvar').innerHTML = '<i class="fas fa-sync-alt"></i> Atualizar Parcela';
        document.getElementById('btn-cancelar').classList.remove('hidden');
        
        alternarAba('formulario');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function cancelarEdicao() {
    document.getElementById('f-editando-id').value = '';
    document.getElementById('f-editando-financa-id').value = '';
    document.getElementById('f-parcelas').disabled = false;
    document.getElementById('f-recorrencia').disabled = false;
    document.getElementById('btn-salvar').innerHTML = '<i class="fas fa-save"></i> Gravar Lançamento';
    document.getElementById('btn-cancelar').classList.add('hidden');
    
    document.getElementById('f-desc').value = '';
    document.getElementById('f-valor').value = '';
    document.getElementById('f-categoria').value = 'Geral';
    document.getElementById('f-vencimento').value = '';
    document.getElementById('f-data-pagamento').value = '';
    document.getElementById('f-barras').value = '';
    
    document.getElementById('nome-boleto').innerHTML = '';
    document.getElementById('nome-comprovante').innerHTML = '';
    document.getElementById('f-boleto').value = '';
    document.getElementById('f-comprovante').value = '';
    
    document.getElementById('f-entidade-id').value = '';
    document.getElementById('f-entidade-busca').value = '';
}

function toggleTodosChecks(source) {
    const checkboxes = document.querySelectorAll('.check-parcela');
    checkboxes.forEach(cb => cb.checked = source.checked);
}

async function excluirSelecionados() {
    const selecionados = Array.from(document.querySelectorAll('.check-parcela:checked')).map(cb => cb.value);
    if (selecionados.length === 0) return alert("Selecione ao menos uma parcela para excluir.");

    if (confirm(`Atenção: Deseja realmente excluir ${selecionados.length} parcela(s)?`)) {
        const { error } = await _supabase.from('parcelas').delete().in('id', selecionados);
        if (!error) {
            alert('Excluído com sucesso!');
            loadParcelas();
            loadDashboard();
        } else {
            alert('Erro ao excluir: ' + error.message);
        }
    }
}

// ====================================================================
// CONTROLE DE INSTALAÇÃO DO PWA E COMPARTILHAMENTO (SHARE TARGET)
// ====================================================================

// 1. Registro do Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(() => console.log('Service Worker Registrado.'));
}

// 2. Botão de Instalação do APP
let eventoInstalacao;
const btnInstalar = document.getElementById('btn-instalar');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    eventoInstalacao = e;
    btnInstalar.classList.remove('hidden');
});

btnInstalar.addEventListener('click', async () => {
    if (eventoInstalacao) {
        eventoInstalacao.prompt();
        const { outcome } = await eventoInstalacao.userChoice;
        if (outcome === 'accepted') {
            btnInstalar.classList.add('hidden');
        }
        eventoInstalacao = null;
    }
});

window.addEventListener('appinstalled', () => {
    btnInstalar.classList.add('hidden');
    eventoInstalacao = null;
});

// 3. Captura do Arquivo via Menu "Compartilhar" do Celular
window.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('shared') === 'true') {
        try {
            alternarAba('formulario');
            const cache = await caches.open('share-target-cache');
            const response = await cache.match('/shared-file');
            
            if (response) {
                const blob = await response.blob();
                const file = new File([blob], "comprovante_compartilhado.jpg", { type: blob.type });
                
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                
                const inputComprovante = document.getElementById('f-comprovante');
                inputComprovante.files = dataTransfer.files;
                
                mostrarNomeArquivo(inputComprovante, 'nome-comprovante');
                
                await cache.delete('/shared-file');
                window.history.replaceState({}, document.title, "/index.html");
            }
        } catch (err) {
            console.error('Erro ao processar arquivo compartilhado:', err);
        }
    }
});
