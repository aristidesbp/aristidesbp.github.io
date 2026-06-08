
// NO SETINS DO PROJETO 
//Data API:
const supabaseUrl = 'https://gdfjukkoykrvdbyqilkc.supabase.co';
// Legacy anon, service_role API keys:
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkZmp1a2tveWtydmRieXFpbGtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTkxNjcsImV4cCI6MjA5NTM3NTE2N30.ww96XC4kn3L0rjPRkL6U5I2WBMYlSp5SAafZtJfYncI';
// Inicializa o cliente Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
// Exporta para ser usado em outros scripts
window.supabaseClient = _supabase; 
