/* ================= CONFIGURAÇÃO CENTRAL DO SUPABASE ================= */
// Substitua as strings abaixo pelas suas chaves reais do projeto Supabase.
const SUPABASE_URL = 'COLE_AQUI_A_SUA_URL_DO_SUPABASE';
const SUPABASE_ANON_KEY = 'COLE_AQUI_A_SUA_ANON_KEY';

// Número do WhatsApp que vai receber os pedidos do E-commerce
const NUMERO_WHATSAPP = '5591992420981'; 

// Cria a instância global de ligação ao banco de dados
const clienteSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
