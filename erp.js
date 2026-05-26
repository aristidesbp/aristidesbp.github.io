// =========================================================================
// CONFIGURAÇÃO DO SUPABASE
// =========================================================================
const SUPABASE_URL = "https://gdfjukkoykrvdbyqilkc.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkZmp1a2tveWtydmRieXFpbGtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTkxNjcsImV4cCI6MjA5NTM3NTE2N30.ww96XC4kn3L0rjPRkL6U5I2WBMYlSp5SAafZtJfYncI";

const supabase = SUPABASE_JS.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Cache local de entidades para preenchimento de seletores estruturais
let cacheEntidades = [];

// =========================================================================
// INICIALIZAÇÃO E CONTROLE DE TELAS (SPA)
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    inicializarRoteamentoSPA();
    configurarModais();
    verificarSessao();
    configurarFormularios();
});

function verificarSessao() {
    const session = supabase.auth.session ? supabase.auth.session() : null; 
    // Compatibilidade com diferentes versões do SDK do Supabase:
    supabase.auth.getSession().then(({ data }) => {
        const sessionActive = data.session;
        if (sessionActive) {
            renderizarTelaSistema(sessionActive.user);
        } else {
            renderizarTelaAuth();
        }
    });

    // Ouvir mudanças de autenticação
    supabase.auth.onAuthStateChange((event, sessionChanged) => {
        if (sessionChanged) {
            renderizarTelaSistema(sessionChanged.user);
        } else {
            renderizarTelaAuth();
        }
    });
}

function renderizarTelaAuth() {
    document.getElementById("auth-screen").classList.remove("hidden");
    document.getElementById("app-screen").classList.add("hidden");
}

function renderizarTelaSistema(user) {
    document.getElementById("auth-screen").classList.add("hidden");
    document.getElementById("app-screen").classList.remove("hidden");
    document.getElementById("user-display").innerText = `Logado como: ${user.email}`;
    
    // Atualiza todos os dados
    carregarDadosModulo();
}

// Alternância de abas da SPA
function inicializarRoteamentoSPA() {
    const botoes = document.querySelectorAll(".nav-btn");
    const secoes = document.querySelectorAll(".tab-content");

    botoes.forEach(btn => {
        btn.addEventListener("click", () => {
            botoes.forEach(b => b.classList.remove("bg-blue-600", "text-white"));
            botoes.forEach(b => b.classList.add("text-gray-400", "hover:bg-gray-700"));
            
            btn.classList.remove("text-gray-400", "hover:bg-gray-700");
            btn.classList.add("bg-blue-600", "text-white");

            const targetId = btn.getAttribute("data-target");
            secoes.forEach(sec => {
                if (sec.id === targetId) {
                    sec.classList.remove("hidden");
                } else {
                    sec.classList.add("hidden");
                }
            });
        });
    });
}

// Gerenciamento global de abertura/fechamento de modais
function configurarModais() {
    document.querySelectorAll(".open-modal-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-modal");
            document.getElementById(modalId).classList.remove("hidden");
        });
    });

    document.querySelectorAll(".close-modal-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-modal");
            document.getElementById(modalId).classList.add("hidden");
            limparFormulario(modalId);
        });
    });
}

function limparFormulario(modalId) {
    if (modalId === 'modal-financeiro') {
        document.getElementById("form-financeiro").reset();
        document.getElementById("fin-id").value = "";
        document.getElementById("modal-financeiro-title").innerText = "Nova Transação";
    } else if (modalId === 'modal-tarefa') {
        document.getElementById("form-tarefas").reset();
        document.getElementById("tar-id").value = "";
        document.getElementById("modal-tarefa-title").innerText = "Nova Tarefa";
    } else if (modalId === 'modal-entidade') {
        document.getElementById("form-entidades").reset();
        document.getElementById("ent-id").value = "";
        document.getElementById("modal-entidade-title").innerText = "Nova Entidade";
    }
}

// =========================================================================
// OPERAÇÕES DE AUTENTICAÇÃO
// =========================================================================
function configurarFormularios() {
    document.getElementById("btn-login").addEventListener("click", async () => {
        const email = document.getElementById("auth-email").value;
        const password = document.getElementById("auth-password").value;
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert(`Erro no login: ${error.message}`);
    });

    document.getElementById("btn-register").addEventListener("click", async () => {
        const email = document.getElementById("auth-email").value;
        const password = document.getElementById("auth-password").value;
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) alert(`Erro no registro: ${error.message}`);
        else alert("Verifique seu e-mail para confirmação.");
    });

    document.getElementById("btn-logout").addEventListener("click", async () => {
        await supabase.auth.signOut();
    });

    // Submits dos formulários operacionais
    document.getElementById("form-entidades").addEventListener("submit", salvarEntidade);
    document.getElementById("form-financeiro").addEventListener("submit", salvarFinanceiro);
    document.getElementById("form-tarefas").addEventListener("submit", salvarTarefa);
}

// =========================================================================
// ORQUESTRAÇÃO DE CARGA DE DADOS
// =========================================================================
async function carregarDadosModulo() {
    // Entidades precisam ser carregadas primeiro devido aos relacionamentos (Selects)
    await carregarEntidades();
    await carregarFinanceiro();
    await carregarTarefas();
}

function atualizarSelectsEntidades() {
    const finSelect = document.getElementById("fin-entidade-select");
    const tarSelect = document.getElementById("tar-entidade-select");
    
    let htmlOptions = `<option value="">Nenhuma Entidade Vinculada</option>`;
    cacheEntidades.forEach(ent => {
        htmlOptions += `<option value="${ent.id}">${ent.nome} (${ent.tipo})</option>`;
    });

    finSelect.innerHTML = htmlOptions;
    tarSelect.innerHTML = htmlOptions;
}

// =========================================================================
// CRUD: MÓDULO ENTIDADES
// =========================================================================
async function carregarEntidades() {
    const { data, error } = await supabase.from("entidades").select("*").order("nome", { ascending: true });
    if (error) { console.error(error); return; }
    
    cacheEntidades = data || [];
    atualizarSelectsEntidades();

    const tbody = document.getElementById("table-entidades-body");
    tbody.innerHTML = "";

    cacheEntidades.forEach(ent => {
        const tr = document.createElement("tr");
        tr.className = "hover:bg-gray-700/40 transition-colors";
        tr.innerHTML = `
            <td class="p-3 font-medium text-white">${ent.nome}</td>
            <td class="p-3"><span class="px-2 py-0.5 rounded text-xs ${ent.tipo === 'Cliente' ? 'bg-green-900/60 text-green-300' : ent.tipo === 'Fornecedor' ? 'bg-amber-900/60 text-amber-300' : 'bg-blue-900/60 text-blue-300'}">${ent.tipo}</span></td>
            <td class="p-3 text-gray-300">${ent.documento || '-'}</td>
            <td class="p-3 text-gray-300">${ent.email || '-'}</td>
            <td class="p-3 text-gray-300">${ent.telefone || '-'}</td>
            <td class="p-3 text-right space-x-2">
                <button onclick="editarEntidade('${ent.id}')" class="text-blue-400 hover:text-blue-300"><i class="fa-solid fa-pen"></i></button>
                <button onclick="deletarEntidade('${ent.id}')" class="text-red-400 hover:text-red-300"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function salvarEntidade(e) {
    e.preventDefault();
    const id = document.getElementById("ent-id").value;
    const { data: { user } } = await supabase.auth.getUser();

    const payload = {
        user_id: user.id,
        nome: document.getElementById("ent-nome").value,
        tipo: document.getElementById("ent-tipo").value,
        documento: document.getElementById("ent-documento").value,
        email: document.getElementById("ent-email").value,
        telefone: document.getElementById("ent-telefone").value
    };

    let error;
    if (id) {
        ({ error } = await supabase.from("entidades").update(payload).eq("id", id));
    } else {
        ({ error } = await supabase.from("entidades").insert([payload]));
    }

    if (error) alert(`Erro ao salvar entidade: ${error.message}`);
    else {
        document.getElementById("modal-entidade").classList.add("hidden");
        limparFormulario("modal-entidade");
        carregarDadosModulo();
    }
}

function editarEntidade(id) {
    const ent = cacheEntidades.find(e => e.id === id);
    if (!ent) return;

    document.getElementById("ent-id").value = ent.id;
    document.getElementById("ent-nome").value = ent.nome;
    document.getElementById("ent-tipo").value = ent.tipo;
    document.getElementById("ent-documento").value = ent.documento || "";
    document.getElementById("ent-email").value = ent.email || "";
    document.getElementById("ent-telefone").value = ent.telefone || "";

    document.getElementById("modal-entidade-title").innerText = "Editar Entidade";
    document.getElementById("modal-entidade").classList.remove("hidden");
}

async function deletarEntidade(id) {
    if (!confirm("Tem certeza que deseja excluir esta entidade?")) return;
    const { error } = await supabase.from("entidades").delete().eq("id", id);
    if (error) alert(`Erro ao deletar: ${error.message}`);
    else carregarDadosModulo();
}

// =========================================================================
// CRUD: MÓDULO FINANCEIRO
// =========================================================================
async function carregarFinanceiro() {
    const { data, error } = await supabase.from("financeiro").select(`*, entidades(nome)`).order("data_vencimento", { ascending: false });
    if (error) { console.error(error); return; }

    const tbody = document.getElementById("table-financeiro-body");
    tbody.innerHTML = "";

    let receitas = 0; let despesas = 0;

    data.forEach(fin => {
        const valorNum = parseFloat(fin.valor);
        if (fin.tipo === "Receita") receitas += valorNum;
        else despesas += valorNum;

        const tr = document.createElement("tr");
        tr.className = "hover:bg-gray-700/40 transition-colors";
        tr.innerHTML = `
            <td class="p-3 font-medium text-white">${fin.descricao}</td>
            <td class="p-3 text-gray-400">${fin.entidades ? fin.entidades.nome : '-'}</td>
            <td class="p-3 font-semibold ${fin.tipo === 'Receita' ? 'text-green-400' : 'text-red-400'}">${fin.tipo}</td>
            <td class="p-3 font-mono">R$ ${valorNum.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            <td class="p-3 text-gray-300">${fin.data_vencimento}</td>
            <td class="p-3"><span class="px-2 py-0.5 rounded text-xs ${fin.status === 'Pago' ? 'bg-green-900 text-green-300' : fin.status === 'Pendente' ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'}">${fin.status}</span></td>
            <td class="p-3 text-right space-x-2">
                ${fin.comprovante_url ? `<a href="${fin.comprovante_url}" target="_blank" class="text-gray-400 hover:text-white" title="Ver anexo"><i class="fa-solid fa-paperclip"></i></a>` : ''}
                <button onclick="editarFinanceiro('${fin.id}')" class="text-blue-400 hover:text-blue-300"><i class="fa-solid fa-pen"></i></button>
                <button onclick="deletarFinanceiro('${fin.id}')" class="text-red-400 hover:text-red-300"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Renderizar painel de totais
    document.getElementById("fin-receitas").innerText = `R$ ${receitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById("fin-despesas").innerText = `R$ ${despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    const saldo = receitas - despesas;
    const elSaldo = document.getElementById("fin-saldo");
    elSaldo.innerText = `R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    elSaldo.className = `text-2xl font-bold ${saldo >= 0 ? 'text-green-400' : 'text-red-400'}`;
}

async function salvarFinanceiro(e) {
    e.preventDefault();
    const id = document.getElementById("fin-id").value;
    const fileInput = document.getElementById("fin-file");
    const { data: { user } } = await supabase.auth.getUser();

    let comprovanteUrl = null;

    // Tratamento de arquivo anexado
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileExt = file.name.split('.').pop();
        const filePath = `${user.id}/${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage.from('comprovantes').upload(filePath, file);
        if (uploadError) { alert(`Erro no upload: ${uploadError.message}`); return; }

        const { data: urlData } = supabase.storage.from('comprovantes').getPublicUrl(filePath);
        comprovanteUrl = urlData.publicUrl;
    }

    const payload = {
        user_id: user.id,
        descricao: document.getElementById("fin-descricao").value,
        tipo: document.getElementById("fin-tipo").value,
        valor: parseFloat(document.getElementById("fin-valor").value),
        categoria: document.getElementById("fin-categoria").value,
        data_vencimento: document.getElementById("fin-vencimento").value,
        status: document.getElementById("fin-status").value,
        entidade_id: document.getElementById("fin-entidade-select").value || null
    };

    if (comprovanteUrl) payload.comprovante_url = comprovanteUrl;

    let error;
    if (id) {
        ({ error } = await supabase.from("financeiro").update(payload).eq("id", id));
    } else {
        ({ error } = await supabase.from("financeiro").insert([payload]));
    }

    if (error) alert(`Erro ao salvar transação: ${error.message}`);
    else {
        document.getElementById("modal-financeiro").classList.add("hidden");
        limparFormulario("modal-financeiro");
        carregarFinanceiro();
    }
}

async function editarFinanceiro(id) {
    const { data, error } = await supabase.from("financeiro").select("*").eq("id", id).single();
    if (error) return;

    document.getElementById("fin-id").value = data.id;
    document.getElementById("fin-descricao").value = data.descricao;
    document.getElementById("fin-tipo").value = data.tipo;
    document.getElementById("fin-valor").value = data.valor;
    document.getElementById("fin-categoria").value = data.categoria;
    document.getElementById("fin-vencimento").value = data.data_vencimento;
    document.getElementById("fin-status").value = data.status;
    document.getElementById("fin-entidade-select").value = data.entidade_id || "";

    document.getElementById("modal-financeiro-title").innerText = "Editar Transação";
    document.getElementById("modal-financeiro").classList.remove("hidden");
}

async function deletarFinanceiro(id) {
    if (!confirm("Excluir esta transação?")) return;
    const { error } = await supabase.from("financeiro").delete().eq("id", id);
    if (error) alert(error.message);
    else carregarFinanceiro();
}

// =========================================================================
// CRUD: MÓDULO TAREFAS (KANBAN)
// =========================================================================
async function carregarTarefas() {
    const { data, error } = await supabase.from("tarefas").select(`*, entidades(nome)`);
    if (error) { console.error(error); return; }

    const colTodo = document.getElementById("col-todo");
    const colDoing = document.getElementById("col-doing");
    const colDone = document.getElementById("col-done");

    // Limpa os painéis
    colTodo.innerHTML = ""; colDoing.innerHTML = ""; colDone.innerHTML = "";

    data.forEach(tar => {
        const card = document.createElement("div");
        card.className = "kanban-card p-4 rounded border border-gray-700 space-y-2 relative";
        card.innerHTML = `
            <div class="flex justify-between items-start">
                <h4 class="font-bold text-sm text-white">${tar.titulo}</h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded uppercase font-bold ${tar.prioridade === 'Alta' ? 'bg-red-900 text-red-200' : tar.prioridade === 'Média' ? 'bg-amber-900 text-amber-200' : 'bg-gray-700 text-gray-300'}">${tar.prioridade}</span>
            </div>
            <p class="text-xs text-gray-400 line-clamp-2">${tar.descricao || 'Sem descrição'}</p>
            <div class="text-[11px] text-gray-500 flex justify-between items-center pt-2 border-t border-gray-700/60">
                <span><i class="fa-solid fa-user mr-1"></i>${tar.entidades ? tar.entidades.nome : 'Geral'}</span>
                <span><i class="fa-solid fa-calendar mr-1"></i>${tar.data_limite || 'S/D'}</span>
            </div>
            <div class="flex justify-end gap-2 pt-1">
                <button onclick="alterarStatusTarefa('${tar.id}', '${tar.status}', 'voltar')" class="text-xs text-gray-400 hover:text-white" title="Mover para trás"><i class="fa-solid fa-arrow-left"></i></button>
                <button onclick="editarTarefa('${tar.id}')" class="text-xs text-blue-400 hover:text-blue-300"><i class="fa-solid fa-pen"></i></button>
                <button onclick="alterarStatusTarefa('${tar.id}', '${tar.status}', 'avancar')" class="text-xs text-gray-400 hover:text-white" title="Mover para frente"><i class="fa-solid fa-arrow-right"></i></button>
                <button onclick="deletarTarefa('${tar.id}')" class="text-xs text-red-400 hover:text-red-300 pl-2" title="Excluir"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        if (tar.status === "A Fazer") colTodo.appendChild(card);
        else if (tar.status === "Em Progresso") colDoing.appendChild(card);
        else if (tar.status === "Concluída") colDone.appendChild(card);
    });
}

async function salvarTarefa(e) {
    e.preventDefault();
    const id = document.getElementById("tar-id").value;
    const { data: { user } } = await supabase.auth.getUser();

    const payload = {
        user_id: user.id,
        titulo: document.getElementById("tar-titulo").value,
        descricao: document.getElementById("tar-descricao").value,
        prioridade: document.getElementById("tar-prioridade").value,
        status: document.getElementById("tar-status").value,
        data_limite: document.getElementById("tar-datalimite").value || null,
        entidade_id: document.getElementById("tar-entidade-select").value || null
    };

    let error;
    if (id) {
        ({ error } = await supabase.from("tarefas").update(payload).eq("id", id));
    } else {
        ({ error } = await supabase.from("tarefas").insert([payload]));
    }

    if (error) alert(error.message);
    else {
        document.getElementById("modal-tarefa").classList.add("hidden");
        limparFormulario("modal-tarefa");
        carregarTarefas();
    }
}

async function editarTarefa(id) {
    const { data, error } = await supabase.from("tarefas").select("*").eq("id", id).single();
    if (error) return;

    document.getElementById("tar-id").value = data.id;
    document.getElementById("tar-titulo").value = data.titulo;
    document.getElementById("tar-descricao").value = data.descricao || "";
    document.getElementById("tar-prioridade").value = data.prioridade;
    document.getElementById("tar-status").value = data.status;
    document.getElementById("tar-datalimite").value = data.data_limite || "";
    document.getElementById("tar-entidade-select").value = data.entidade_id || "";

    document.getElementById("modal-tarefa-title").innerText = "Editar Tarefa";
    document.getElementById("modal-tarefa").classList.remove("hidden");
}

async function alterarStatusTarefa(id, statusAtual, direcao) {
    const estados = ["A Fazer", "Em Progresso", "Concluída"];
    let index = estados.indexOf(statusAtual);
    
    if (direcao === "avancar" && index < 2) index++;
    else if (direcao === "voltar" && index > 0) index--;
    else return; // Limite atingido

    const { error } = await supabase.from("tarefas").update({ status: estados[index] }).eq("id", id);
    if (error) alert(error.message);
    else carregarTarefas();
}

async function deletarTarefa(id) {
    if (!confirm("Excluir esta tarefa?")) return;
    const { error } = await supabase.from("tarefas").delete().eq("id", id);
    if (error) alert(error.message);
    else carregarTarefas();
}
