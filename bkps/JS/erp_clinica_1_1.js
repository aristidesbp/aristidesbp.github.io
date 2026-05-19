// 1. Configuração do Supabase
const supabaseUrl = 'https://wyusolfkxrnwijwjusnv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dXNvbGZreHJud2lqd2p1c252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NzU0MTMsImV4cCI6MjA5MTA1MTQxM30.RJ0GOHHP4rB40CH0x8JZ1FWAzNcakSprgUwOBtOUVbA'; 
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

const app = {
    user: null,
    profile: null,

    init: async function() {
        // 1. VERIFICAÇÃO DE SESSÃO ATIVA (Persistência)
        const { data: { session } } = await _supabase.auth.getSession();
        
        if (session) {
            this.setupUser(session.user);
        }

        // Ouvinte de mudanças de estado (Login/Logout/Refresh)
        _supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                this.setupUser(session.user);
            } else if (event === 'SIGNED_OUT') {
                location.reload();
            }
        });
    },

    login: async function() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const { error } = await _supabase.auth.signInWithPassword({ email, password });
        if (error) alert("Erro de acesso: " + error.message);
    },

    setupUser: async function(user) {
        this.user = user;
        const { data: profile } = await _supabase
            .from('clinica_perfis')
            .select('*')
            .eq('id', user.id)
            .single();
        
        this.profile = profile;
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-system').classList.remove('hidden');
        document.getElementById('user-name').innerText = profile.nome;
        this.showSection('dash');
    },

    showSection: function(sec) {
        document.querySelectorAll('.tab-content').forEach(s => s.classList.add('hidden'));
        document.getElementById('sec-' + sec).classList.remove('hidden');
        
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        // Adicionar lógica para marcar o link atual como active
    },

    // COMPARTILHAMENTO UNIVERSAL
    share: async function() {
        const email = document.getElementById('share-email').value;
        const tipo = document.getElementById('share-type').value;

        const { error } = await _supabase.from('clinica_compartilhamento').insert({
            remetente_id: this.user.id,
            destinatario_email: email,
            titulo: `Novo arquivo enviado: ${tipo}`,
            tipo_arquivo: tipo,
            mensagem: "Documento enviado via ERP Clínica Segura"
        });

        if (!error) alert("Compartilhado com sucesso!");
    },

    logout: async () => await _supabase.auth.signOut()
};

app.init();
