
// NO SETINS DO PROJETO 
//Data API:
const supabaseUrl = 'https://zxkaxteprwxijriycvdx.supabase.co/rest/v1/';
// Legacy anon, service_role API keys:
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4a2F4dGVwcnd4aWpyaXljdmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODIxMTEsImV4cCI6MjA5ODA1ODExMX0.ffOiXvjJujp4eL2scf1NiMT9A0CtwIAHilbX3T_AMrc';
// Inicializa o cliente Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
// Exporta para ser usado em outros scripts
window.supabaseClient = _supabase; 
