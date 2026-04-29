import { createClient } from '@supabase/supabase-js';

// As chaves são lidas do ambiente. 
// No Vite/Webpack, use import.meta.env ou process.env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Erro de configuração: Variáveis de ambiente do Supabase não encontradas.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
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
