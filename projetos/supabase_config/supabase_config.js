import { createClient } from '@supabase/supabase-js';

// As chaves são lidas do ambiente. 
// No Vite/Webpack, use import.meta.env ou process.env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Erro de configuração: Variáveis de ambiente do Supabase não encontradas.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
