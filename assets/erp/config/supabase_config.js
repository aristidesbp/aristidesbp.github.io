// config/supabase_config.js

// Substitua pelos seus dados reais do painel do Supabase (Project Settings > API)
const _supabaseUrl = 'https://SUA_URL_AQUI.supabase.co';
const _supabaseKey = 'SUA_KEY_ANON_PUBLIC_AQUI';

// Inicializa o cliente globalmente
const supabase = supabase.createClient(_supabaseUrl, _supabaseKey);

// Função utilitária global para logout (usada na navbar)
function sairDaConta() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "../../index.html"; // Ajuste o caminho conforme necessário
}

console.log("✅ Conexão Supabase configurada.");
