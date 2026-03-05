
// src/model/supabase_config.js
/**
 * ARQUIVO: src/model/supabase_config.js
 * FUNÇÃO:  Cria e exporta a conexão única com o Supabase.
 *          Este arquivo é importado por TODOS os models.
 *
 * POR QUE UM ARQUIVO SEPARADO?
 * Se as credenciais estivessem em cada arquivo, uma mudança
 * de chave exigiria editar dezenas de arquivos. Aqui, mudamos
 * em um único lugar e tudo funciona.
 */

// Importa a função createClient da biblioteca oficial do Supabase
// O "esm.sh" é um CDN que nos permite usar pacotes npm diretamente
// no navegador, sem precisar de um bundler como Webpack.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Lê as variáveis de ambiente.
// Em produção (GitHub Pages), estes valores serão injetados
// pelo GitHub Actions durante o build.
// Em desenvolvimento local, ficam no arquivo .env
const SUPABASE_URL  = 'https://vrsiiwuifapobeiguldf.supabase.co';   // substituído no build
const SUPABASE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyc2lpd3VpZmFwb2JlaWd1bGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NjM0MTgsImV4cCI6MjA4ODAzOTQxOH0.F5eLwudxDdlRrQJF2IEJ_P5YoaKL98_qSkgr8faots0';   // substituído no build

// Cria o cliente Supabase com configurações de segurança
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
        // Persiste a sessão no localStorage para o usuário
        // não precisar fazer login toda vez que fechar o navegador
        persistSession: true,

        // Renova automaticamente o token JWT antes de expirar.
        // Sem isso, o usuário seria deslogado inesperadamente.
        autoRefreshToken: true,

        // Detecta a sessão na URL (necessário para o fluxo de
        // recuperação de senha via link de e-mail)
        detectSessionInUrl: true,
    }
});
