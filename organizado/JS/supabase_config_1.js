
// NO SETINS DO PROJETO 
//Data API:
const supabaseUrl = 'https://mtppqykuydvfepvrybbh.supabase.co';


// Legacy anon, service_role API keys:
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10cHBxeWt1eWR2ZmVwdnJ5YmJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4OTMxMDYsImV4cCI6MjA5NjQ2OTEwNn0.jeIAkpDxXDr_WlbpNso1kk5HsFVcgWjHHj9EFY6vnC4';


// Inicializa o cliente Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
// Exporta para ser usado em outros scripts
window.supabaseClient = _supabase; 
