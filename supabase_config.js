// ==========================================
// ESCOPO GLOBAL DA APLICAÇÃO (supabase_config.js)
// ==========================================

// ── Conexão Supabase ──────────────────────────────────────────────────
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkY3Vxa3N3dGh0bWNibGdkYmV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MTY5NjcsImV4cCI6MjEwMjI5Mjk2N30.HmCBnM9Qqosc4YrHbM1bpwFkhOZCvKfbD2QBYYC3Vog';
const supabaseUrl = 'https://qdcuqkswthtmcblgdbeu.supabase.co';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ── FIX BUG 2: est_supabase estava comentado — definido aqui ──────────
const est_supabase = _supabase;
