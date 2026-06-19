// ==========================================
// ARQUIVO: config/supabase_config.js
// OBJETIVO: Conexão global e utilitários
// ==========================================

// 1. Chaves de Acesso (Substitua pelas suas)
const SUPABASE_URL = 'SUA_URL_AQUI';
const SUPABASE_ANON_KEY = 'SUA_CHAVE_AQUI';

// 2. Inicializa o Supabase globalmente
// Usamos window para garantir que outros arquivos JS consigam enxergar essa variável
window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 3. Função Global de Logout 
async function sairDaConta() {
    try {
        // Destrói a sessão no servidor do Supabase
        await window.supabase.auth.signOut();
    } catch (erro) {
        console.error("Erro ao deslogar no servidor:", erro);
    } finally {
        // Limpa o navegador e expulsa o usuário para a tela inicial
        localStorage.clear();
        sessionStorage.clear();
        window.location.replace("../../index.html"); 
    }
}

console.log("✅ Conexão Supabase configurada com sucesso.");
```
