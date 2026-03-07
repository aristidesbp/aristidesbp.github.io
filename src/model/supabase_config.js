
// SUPABASE_CONFIG.JS
const supabaseUrl = 'https://rdcfehshnzjkwajxdmnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkY2ZlaHNobnpqa3dhanhkbW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4ODMwNzEsImV4cCI6MjA4ODQ1OTA3MX0.aEsdWG4EvndJ0j_1zkTQNeQDUyZ6VMiviRH4QIKlR14';
// Inicializa o cliente Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
// Exporta para ser usado em outros scripts
window.supabaseClient = _supabase; 
