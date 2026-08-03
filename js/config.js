// ==========================================
// ESCOPO GLOBAL DA APLICAÇÃO (app.js)
// ==========================================

// ── Conexão Supabase ──────────────────────────────────────────────────
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12eHd4cHdnb3VraGlucWZ1cHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMDE5MzAsImV4cCI6MjA5ODU3NzkzMH0.vudMl-45gMMEg6EJpM8BZa0rC6k7YiAdqtxuUUB_OWM';
const supabaseUrl = 'https://mvxwxpwgoukhinqfuppz.supabase.co';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ── FIX BUG 2: est_supabase estava comentado — definido aqui ──────────
const est_supabase = _supabase;

let usuarioLogadoId = null;
let paginaAtual = 1;
const itensPorPagina = 10;
let totalRegistros = 0;

// ── Sidebar Mobile ────────────────────────────────────────────────────
function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    const isVisible = sidebar.classList.contains('translate-x-0');
    if (isVisible) {
        sidebar.classList.replace('translate-x-0','-translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    } else {
        sidebar.classList.replace('-translate-x-full','translate-x-0');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// ── Dark Mode ─────────────────────────────────────────────────────────
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    document.getElementById('dark-icon').classList.toggle('hidden', isDark);
    document.getElementById('light-icon').classList.toggle('hidden', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
if (localStorage.getItem('theme')==='dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    document.getElementById('dark-icon').classList.add('hidden');
    document.getElementById('light-icon').classList.remove('hidden');
}

function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('.material-symbols-outlined');
    if (input.type === 'password') { input.type = 'text'; icon.innerText = 'visibility_off'; }
    else { input.type = 'password'; icon.innerText = 'visibility'; }
}

// ── Auth ──────────────────────────────────────────────────────────────
async function verificar_login() {
    const { data: { session } } = await _supabase.auth.getSession();
    const telaLogin = document.getElementById('tela-login');
    const telaSistema = document.getElementById('tela-sistema');
    if (!session) {
        telaLogin.classList.remove('hidden');
        telaSistema.classList.add('hidden');
        usuarioLogadoId = null;
    } else {
        telaLogin.classList.add('hidden');
        telaSistema.classList.remove('hidden');
        usuarioLogadoId = session.user.id;
        document.getElementById('user-display-email').innerText = session.user.email;
        document.getElementById('user-display-name').innerText = session.user.user_metadata?.full_name || 'Usuário ERP';
        if (session.user.user_metadata?.avatar_url) {
            document.getElementById('user-avatar').src = session.user.user_metadata.avatar_url;
        }
        init();
    }
}

async function fazerLogin() {
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;
    const btn = document.getElementById('btn-login');
    if (!email || !senha) return alert("Credenciais obrigatórias.");
    btn.innerText = 'Autenticando...';
    btn.disabled = true;
    const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
    if (error) {
        alert("Falha na autenticação. Verifique suas credenciais.");
        btn.innerText = 'Autenticar Acesso';
        btn.disabled = false;
    } else {
        verificar_login();
    }
}

async function sairDaConta() {
    await _supabase.auth.signOut();
    verificar_login();
}



// ── Inicialização ─────────────────────────────────────────────────────
function init() {
    alternarAba('bem_vindo'); // garante aba inicial correta
    loadDashboard();
    loadEntidades();
}

document.addEventListener('DOMContentLoaded', () => {
    verificar_login();
    configurarDropZone('drop-foto','f-foto','nome-foto');
    // Atalho F8 para finalizar venda PDV
    window.addEventListener('keydown', e => {
        if (e.key === 'F8') { e.preventDefault(); if (typeof pdv_finalizarVenda === 'function') pdv_finalizarVenda(); }
    });
});




//#######################################################################
// ── Navegação entre abas ──────────────────────────────────────────────
// FIX BUG 2: agora dispara est_init() ao entrar no estoque
//#######################################################################
function alternarAba(abaAtiva) {
    const selectAba = document.getElementById('select-aba');
    if (selectAba) selectAba.value = abaAtiva;

    document.querySelectorAll('[id^="aba-"]').forEach(painel => {
        painel.classList.toggle('hidden', painel.id !== `aba-${abaAtiva}`);
    });

    if (abaAtiva === 'estoque')    { est_init(); }
    if (abaAtiva === 'entidades')  { loadDashboard(); loadEntidades(); }
    if (abaAtiva === 'financeiro') { fin_init(); }
    if (abaAtiva === 'pdv')        { pdv_init(); }
    // Se precisar de alguma ação ao abrir configurações, adicione aqui.
}




// ── FIX BUG 1: Sub-abas de Entidades (igual ao estoque) ──────────────
function ent_alternarSubAba(subAba) {
    const painelForm  = document.getElementById('ent-painel-formulario');
    const painelLista = document.getElementById('ent-painel-listagem');
    const btnForm     = document.getElementById('ent-btn-formulario');
    const btnLista    = document.getElementById('ent-btn-listagem');

    const ativo   = ['bg-primary','text-white','hover:brightness-105'];
    const inativo = ['bg-slate-200','text-slate-700','hover:bg-slate-300'];

    btnForm.classList.remove(...ativo,...inativo);
    btnLista.classList.remove(...ativo,...inativo);

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
