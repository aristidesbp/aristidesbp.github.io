/* ======= CONFIGURAÇÕES INICIAIS ================= */
// [INÍCIO: CONFIGURAÇÃO SUPABASE]
// Marca o início lógico do bloco responsável por fazer a conexão matriz com a base de dados.


const SUPABASE_URL = 'https://gxbderrxvplxzwvantkn.supabase.co';
// Define a URL do teu projeto Supabase.

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4YmRlcnJ4dnBseHp3dmFudGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMTA2MjcsImV4cCI6MjEwNTc4NjYyN30.3YbSndiN-OBFZcOish7MWOu9sO6byPsWDQV74_XbjC4';
// Define a chave criptográfica anónima/pública.

// Variável global para armazenar o cliente do Supabase
let clienteSupabase;

// Verificação de segurança: Confirma se o objeto 'supabase' existe no navegador
if (typeof supabase !== 'undefined') {
    clienteSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("✅ Conexão com o Supabase inicializada com sucesso.");
} else {
    console.error("❌ Erro Crítico: A biblioteca do Supabase não foi carregada. Verifica a tua ligação à internet ou a tag <script> no HTML.");
}

// [FIM: CONFIGURAÇÃO SUPABASE]
