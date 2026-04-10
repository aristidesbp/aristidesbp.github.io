// erp_clinica.js
// 1. Configuração do Supabase
const SUPABASE_URL = 'https://wyusolfkxrnwijwjusnv.supabase.co'; // Substitua pela sua URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dXNvbGZreHJud2lqd2p1c252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NzU0MTMsImV4cCI6MjA5MTA1MTQxM30.RJ0GOHHP4rB40CH0x8JZ1FWAzNcakSprgUwOBtOUVbA'; 
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUserProfile = null;

// ============================================================================
// SISTEMA DE SESSÃO E AUTENTICAÇÃO (Persistência)
// ============================================================================

// Dispara toda vez que a página carrega ou o status do auth muda
supabase.auth.onAuthStateChange((event, session) => {
    console.log("Auth Event:", event);
    if (session) {
        carregarPerfil(session.user.id);
    } else {
        mostrarTelaLogin();
    }
});

async function realizarLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-senha').value;
    
    if(!email || !password) return alert("Preencha todos os campos.");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("Erro: " + error.message);
    // onAuthStateChange cuidará do resto se der sucesso.
}

async function realizarLogout() {
    await supabase.auth.signOut();
}

async function carregarPerfil(userId) {
    const { data: perfil, error } = await supabase
        .from('clinica_perfis')
        .select('*')
        .eq('id', userId)
        .single();

    if (error || !perfil) {
        console.error("Erro ao carregar perfil:", error);
        return alert("Perfil clínico não encontrado.");
    }

    currentUserProfile = perfil;
    
    // Atualiza a UI
    document.getElementById('user-display').innerText = `Olá, ${perfil.nome} (${perfil.role})`;
    
    // Mostra o app e esconde login
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('app-screen').classList.remove('hidden');

    // Controle de Acesso no Menu
    if(perfil.role === 'paciente') {
        document.getElementById('menu-staff').classList.add('hidden');
        navegar('compartilhamento'); // Paciente vai direto para arquivos dele
    } else {
        document.getElementById('menu-staff').classList.remove('hidden');
        navegar('dash');
    }
}

function mostrarTelaLogin() {
    currentUserProfile = null;
    document.getElementById('auth-screen').classList.remove('hidden');
    document.getElementById('app-screen').classList.add('hidden');
}

// ============================================================================
// NAVEGAÇÃO SPA (Single Page Application)
// ============================================================================
function navegar(moduloId) {
    // Esconde todas as seções
    document.querySelectorAll('main section').forEach(sec => sec.classList.add('hidden'));
    
    // Remove classe 'active' do menu
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

    // Mostra a seção desejada
    const targetSection = document.getElementById(`mod-${moduloId}`);
    if(targetSection) targetSection.classList.remove('hidden');

    // Marca o menu clicado (gambiarra simples via textContent/click event handler)
    if(event && event.target.classList.contains('nav-item')){
        event.target.classList.add('active');
    }

    // Carrega dados específicos da aba
    if(moduloId === 'compartilhamento') carregarHistoricoCompartilhamento();
}

// ============================================================================
// MÓDULO DE COMPARTILHAMENTO UNIVERSAL
// ============================================================================
async function enviarCompartilhamento() {
    const email = document.getElementById('share-email').value;
    const tipo = document.getElementById('share-tipo').value;
    const titulo = document.getElementById('share-titulo').value;
    const rawPayload = document.getElementById('share-payload').value;

    if(!email || !titulo) return alert("E-mail e Título são obrigatórios.");

    let payloadJson = null;
    let urlTexto = null;

    // Se for JSON (formulário estilo Google Forms), converte e valida
    if (tipo === 'json_form') {
        try {
            payloadJson = JSON.parse(rawPayload);
        } catch (e) {
            return alert("O conteúdo precisa ser um formato JSON válido para formulários.");
        }
    } else {
        // Se for PDF ou Link, salva como texto puro
        urlTexto = rawPayload;
    }

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from('clinica_compartilhamento').insert([{
        remetente_id: user.id,
        email_destino: email,
        tipo_conteudo: tipo,
        titulo: titulo,
        payload: payloadJson,
        url_arquivo: urlTexto
    }]);

    if (error) {
        alert("Erro de segurança ou inserção: " + error.message);
    } else {
        alert("Conteúdo enviado com sucesso!");
        document.getElementById('share-titulo').value = '';
        document.getElementById('share-payload').value = '';
        carregarHistoricoCompartilhamento();
    }
}

async function carregarHistoricoCompartilhamento() {
    const lista = document.getElementById('lista-compartilhamentos');
    lista.innerHTML = '<p class="text-sm text-slate-500"><i class="fas fa-spinner fa-spin"></i> Sincronizando com servidor...</p>';

    // A política RLS garante que o Psico veja tudo que enviou, e o paciente veja só o que é dele.
    const { data, error } = await supabase
        .from('clinica_compartilhamento')
        .select('*, remetente_id(nome)') // Faz um join para pegar o nome de quem enviou
        .order('created_at', { ascending: false });

    if (error) {
        lista.innerHTML = `<p class="text-red-500">Erro: ${error.message}</p>`;
        return;
    }

    if (data.length === 0) {
        lista.innerHTML = '<p class="text-sm text-slate-500">Nenhum compartilhamento encontrado.</p>';
        return;
    }

    lista.innerHTML = data.map(item => `
        <div class="p-3 border rounded-lg bg-slate-50 hover:bg-white transition flex justify-between items-center">
            <div>
                <h4 class="font-bold text-sm text-indigo-700">${item.titulo}</h4>
                <p class="text-xs text-slate-500">Para: ${item.email_destino} | Tipo: ${item.tipo_conteudo.replace('_', ' ')}</p>
            </div>
            <button class="text-indigo-500 hover:text-indigo-800" title="Ver Detalhes">
                <i class="fas fa-eye"></i>
            </button>
        </div>
    `).join('');
}
