/**
 * supabase_config.js
 * Configuração central e inicialização do cliente Supabase.
 */

const SUPABASE_URL = 'https://luanoblszirvzqidhecr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_jqhEnUuuEF4-zxKbgupuTQ_n-7h-qTp';

// Inicializa o cliente Supabase globalmente
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("ERP ABP: Supabase configurado com sucesso.");
