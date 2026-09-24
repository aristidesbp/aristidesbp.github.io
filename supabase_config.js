/* ======= CONFIGURAÇÕES INICIAIS ================= */
// [INÍCIO: CONFIGURAÇÃO SUPABASE]
// Marca o início lógico do bloco responsável por fazer a conexão matriz com o banco de dados.

const SUPABASE_URL = 'https://gxbderrxvplxzwvantkn.supabase.co';
// Define e trava via declaração constante (const) a URL do projeto. Este é o servidor destino de todas as requisições, a porta de acesso ao Supabase.

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4YmRlcnJ4dnBseHp3dmFudGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMTA2MjcsImV4cCI6MjEwNTc4NjYyN30.3YbSndiN-OBFZcOish7MWOu9sO6byPsWDQV74_XbjC4';
// Define a chave criptográfica anônima/pública. Ela apenas diz "eu sei onde fica o projeto", sem conceder permissões absolutas administrativas.

const clienteSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// Executa o motor (SDK do banco). Funde a URL e a KEY em uma instância unificada que fica arquivada dentro de 'clienteSupabase'. Essa variável será invocada sempre que uma página quiser salvar ou ler algo no banco.
// [FIM: CONFIGURAÇÃO SUPABASE]
