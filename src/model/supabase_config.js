// src/models/supabase_config.js
const _supabaseUrl = 'SUA_URL_DO_SUPABASE'; // Project Settings > API
const _supabaseKey = 'SUA_ANON_KEY';       // Project Settings > API

// Inicializa o cliente Supabase
const supabase = supabase.createClient(_supabaseUrl, _supabaseKey);

console.log("✅ Conexão Supabase configurada.");
