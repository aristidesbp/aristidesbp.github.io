// ── Conexão Supabase ──────────────────────────────────────────────────
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12eHd4cHdnb3VraGlucWZ1cHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMDE5MzAsImV4cCI6MjA5ODU3NzkzMH0.vudMl-45gMMEg6EJpM8BZa0rC6k7YiAdqtxuUUB_OWM';

const supabaseUrl = 'https://mvxwxpwgoukhinqfuppz.supabase.co';

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);


const est_supabase = _supabase;

let usuarioLogadoId = null;
let paginaAtual = 1;
const itensPorPagina = 10;
let totalRegistros = 0;
