/* ======= CONFIGURAÇÕES INICIAIS ================= */
// [INÍCIO: CONFIGURAÇÃO SUPABASE]
// Marca o início lógico do bloco responsável por fazer a conexão matriz com o banco de dados.

const SUPABASE_URL = 'https://vgjgcjhjpfgnpbwzrhei.supabase.co';
// Define e trava via declaração constante (const) a URL do projeto. Este é o servidor destino de todas as requisições, a porta de acesso ao Supabase.

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnamdjamhqcGZnbnBid3pyaGVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NjcyMjksImV4cCI6MjEwNTU0MzIyOX0.MVzECEI_-ZSX1dgLTUt_pvzpUb_eAMi1G3MdubLj56s';
// Define a chave criptográfica anônima/pública. Ela apenas diz "eu sei onde fica o projeto", sem conceder permissões absolutas administrativas.

const clienteSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// Executa o motor (SDK do banco). Funde a URL e a KEY em uma instância unificada que fica arquivada dentro de 'clienteSupabase'. Essa variável será invocada sempre que uma página quiser salvar ou ler algo no banco.
// [FIM: CONFIGURAÇÃO SUPABASE]
