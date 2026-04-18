// ==========================================
// ARQUIVO: config/supabase_config.js
// OBJETIVO: Conexão global e utilitários
// ==========================================

// 1. Chaves de Acesso (Substitua pelas suas)
const SUPABASE_URL = 'https://wyusolfkxrnwijwjusnv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dXNvbGZreHJud2lqd2p1c252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NzU0MTMsImV4cCI6MjA5MTA1MTQxM30.RJ0GOHHP4rB40CH0x8JZ1FWAzNcakSprgUwOBtOUVbA';

// 2. Inicializa o Supabase globalmente
// Usamos window para garantir que outros arquivos JS consigam enxergar essa variável
window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 3. Função Global de Logout (Segurança Nível Bancário)
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
