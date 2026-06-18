// src/model/supabase_config.js

// Dados do painel do Supabase (Project Settings > API)
const supabaseUrl = 'https://flbcktmujsjxukmtqriq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsYmNrdG11anNqeHVrbXRxcmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4ODA3NjIsImV4cCI6MjA5MDQ1Njc2Mn0.kigBNnujASjlkFcm5xGOqauz6zrgFGVu_rdQJuJkxnE';

// Inicializa o cliente globalmente
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Torna o cliente acessível globalmente de forma explícita para o projeto
window.supabaseClient = supabaseClient;

// Função utilitária global para logout
function sairDaConta() {
    supabaseClient.auth.signOut().then(() => {
        window.location.href = 'login.html';
    });
}
