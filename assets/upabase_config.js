/**
 * supabase_config.js
 * Configuração central e inicialização do cliente Supabase.
 */

const SUPABASE_URL = 'https://luanoblszirvzqidhecr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1YW5vYmxzemlydnpxaWRoZWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMTEzMTgsImV4cCI6MjA4NTY4NzMxOH0.9clHxZCsq9dVx_DTwjNER6GIe7bla3QGKUOWZukWrBo';

// Inicializa o cliente Supabase globalmente
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("ERP ABP: Supabase configurado com sucesso.");
