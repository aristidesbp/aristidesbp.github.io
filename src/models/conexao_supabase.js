// conexao_supabase.js
const supabaseUrl = 'https://eisruaetsqrratemqswv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc3J1YWV0c3FycmF0ZW1xc3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDI4OTAsImV4cCI6MjA4NTM3ODg5MH0.Rb-nu9zBL7TNWoGNYHvETWMfbqO1NF7UID4TdSYyKS4';

// Inicializa o cliente Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
// Exporta para ser usado em outros scripts
window.supabaseClient = _supabase;

