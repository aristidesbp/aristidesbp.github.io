// supabase_config.js

const SUPABASE_ANON_KEY = 'api_key';
const SUPABASE_URL = 'data_api';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_key);

console.log("✅ conectado com o arquivo supabase/supabase_config.js");
