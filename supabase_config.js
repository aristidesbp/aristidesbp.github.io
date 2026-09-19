/* ======= CONFIGURAÇÕES INICIAIS ================= */
// [INÍCIO: CONFIGURAÇÃO SUPABASE]
// Marca o início lógico do bloco responsável por fazer a conexão matriz com o banco de dados.

const SUPABASE_URL = 'https://ctdkeqltveymtqmtspyu.supabase.co';
// Define e trava via declaração constante (const) a URL do projeto. Este é o servidor destino de todas as requisições, a porta de acesso ao Supabase.

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0ZGtlcWx0dmV5bXRxbXRzcHl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzMjk1NTUsImV4cCI6MjEwMzkwNTU1NX0.ka_jrnDtrOhfPr7_TAl63Z7nyRZeocy2rrkHSLQBOe4';
// Define a chave criptográfica anônima/pública. Ela apenas diz "eu sei onde fica o projeto", sem conceder permissões absolutas administrativas.

const clienteSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// Executa o motor (SDK do banco). Funde a URL e a KEY em uma instância unificada que fica arquivada dentro de 'clienteSupabase'. Essa variável será invocada sempre que uma página quiser salvar ou ler algo no banco.
// [FIM: CONFIGURAÇÃO SUPABASE]
