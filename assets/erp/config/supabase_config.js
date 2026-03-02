
// NO SETINS DO PROJETO 
//Data API:
const supabaseUrl = 'https://vrsiiwuifapobeiguldf.supabase.co';
// Legacy anon, service_role API keys:
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyc2lpd3VpZmFwb2JlaWd1bGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NjM0MTgsImV4cCI6MjA4ODAzOTQxOH0.F5eLwudxDdlRrQJF2IEJ_P5YoaKL98_qSkgr8faots0';
// Inicializa o cliente Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
// Exporta para ser usado em outros scripts
window.supabaseClient = _supabase; 
