// =================================================================
// 1. CONEXÃO COM O SUPABASE
// =================================================================
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlcnJ5eXFnbGZuZnhqemVybmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MDQ2MzMsImV4cCI6MjEwMTQ4MDYzM30.x8Jd49NeiuYqm9AReTph-y3KIGN6O8z0CejMhDu6Gpw';
const supabaseUrl = 'https://derryyqglfnfxjzernfc.supabase.co';


// Instância global do cliente Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
const est_supabase = _supabase; // Compatibilidade com módulo de estoque

let usuarioLogadoId = null;
