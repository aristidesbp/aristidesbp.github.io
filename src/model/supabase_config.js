// src/model/supabase_config.js

// Dados do painel do Supabase (Project Settings > API)
const supabaseUrl = 'https://slfwwtokaktjrorotajh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZnd3dG9rYWt0anJvcm90YWpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0MDI0NzYsImV4cCI6MjA4OTk3ODQ3Nn0.Ji2Y7Hg3cj6MAHDhQcZp8eFGrIVoA-5RzX6wZ7d4HU8';

// Inicializa o cliente globalmente
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Torna o cliente acessível globalmente de forma explícita para o projeto
window.supabaseClient = supabaseClient;

// Função utilitária global para logout
function sairDaConta() {
    supabaseClient.auth.signOut().then(() => {
        window.location.href = 'login.html';
    });
}