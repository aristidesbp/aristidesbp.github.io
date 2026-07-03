## src/model/supabase_config.js
```
// config/supabase_config.js
// Substitua pelos seus dados reais do painel do Supabase (Project Settings > API)
const _supabaseUrl = 'url_ProjectID';
const _supabaseKey = 'anon_key;

// Inicializa o cliente globalmente
const supabase = supabase.createClient(_supabaseUrl, _supabaseKey);

// Função utilitária global para logout (usada na navbar)
function sairDaConta() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "../../index.html"; // Ajuste o caminho conforme necessário
}
console.log("✅ Conexão Supabase configurada.");
```
