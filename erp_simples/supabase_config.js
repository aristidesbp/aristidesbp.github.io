// ── Conexão Supabase ──────────────────────────────────────────────────
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZ3JudHBld254d2JuaXduZnp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxMTI5MDUsImV4cCI6MjEwMTY4ODkwNX0.btByekk8xTGMyyIlddPKbpy2QSZh3KkXLY5Q8PYGbXE';


const supabaseUrl = 'https://epgrntpewnxwbniwnfzw.supabase.co';





const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ── FIX BUG 2: est_supabase estava comentado — definido aqui ──────────
const est_supabase = _supabase;

let usuarioLogadoId = null;
let paginaAtual = 1;
const itensPorPagina = 10;
let totalRegistros = 0;