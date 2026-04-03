/**
* ARQUIVO: src/model/supabase_config.js
* FUNÇÃO: Cria e exporta a conexão única com o Supabase.
* Importado por TODOS os models do sistema.
*/
// Importa a função createClient da biblioteca oficial
// esm.sh permite usar pacotes npm direto no navegador
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// Placeholders substituídos pelo GitHub Actions no build
const SUPABASE_URL = '__SUPABASE_URL__';
const SUPABASE_KEY = '__SUPABASE_KEY__';
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
auth: {
persistSession: true, // Mantém login após fechar o navegador
autoRefreshToken: true, // Renova o token antes de expirar
detectSessionInUrl: true // Para o fluxo de recuperação de senha
}
});
