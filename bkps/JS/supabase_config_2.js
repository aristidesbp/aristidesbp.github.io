
// SUPABASE_CONFIG.JS
const supabaseUrl = 'https://jnvfdnyzharfiwptmmcs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpudmZkbnl6aGFyZml3cHRtbWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1ODUyMjYsImV4cCI6MjA4OTE2MTIyNn0.kK4d5lyNSZtvP-rOwRNZ2p0fYD3auXQh-zvgzKNWxh0';
// Inicializa o cliente Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
// Exporta para ser usado em outros scripts
window.supabaseClient = _supabase; 
