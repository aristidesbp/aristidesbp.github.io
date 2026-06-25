
// NO SETINS DO PROJETO 
//Data API:
const supabaseUrl = 'https://ewbymweduemrufejwzwh.supabase.co';
// Legacy anon, service_role API keys:
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3Ynltd2VkdWVtcnVmZWp3endoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMDg2NjUsImV4cCI6MjA5Nzg4NDY2NX0.5UP1OJg9INBoLL6STSe-Gh33N7Gmt0B7bcU-mgwpFIw';
// Inicializa o cliente Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
// Exporta para ser usado em outros scripts
window.supabaseClient = _supabase; 
