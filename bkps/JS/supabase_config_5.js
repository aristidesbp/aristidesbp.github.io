// config/supabase_config.js

// Substitua pelos seus dados reais do painel do Supabase (Project Settings > API)
const _supabaseUrl = 'https://uugmutvhsnssfmlqwlpo.supabase.co';
const _supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1Z211dHZoc25zc2ZtbHF3bHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MTM5MTAsImV4cCI6MjA5MDI4OTkxMH0.LTeRj7Or4_swJ-gAwurvahOZi8wd3ZLUrwvZw5no_r4';

// Inicializa o cliente globalmente
const supabase = supabase.createClient(_supabaseUrl, _supabaseKey);

// Função utilitária global para logout (usada na navbar)
function sairDaConta() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "../../index.html"; // Ajuste o caminho conforme necessário
}

console.log("✅ Conexão Supabase configurada.");
