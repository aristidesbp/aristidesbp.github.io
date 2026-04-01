// Configuração de conexão com o Supabase
const _supabaseUrl = 'https://xjmsksrhdedwrlanpmmi.supabase.co';
const _supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbXNrc3JoZGVkd3JsYW5wbW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNDE5ODQsImV4cCI6MjA5MDYxNzk4NH0.X2S4UZ3WGLoxx9LsNNbJ6-kyM0DAQoTr8wY57O6m4ZA';
const supabase = supabase.createClient(_supabaseUrl, _supabaseKey);

console.log("✅ Conexão Supabase inicializada.");


