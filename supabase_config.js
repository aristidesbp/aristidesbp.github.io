
/* ======= CONFIGURAÇÕES INICIAIS ================= */

// [INÍCIO: CONFIGURAÇÃO SUPABASE]
// Marca o início lógico do bloco responsável por fazer a conexão matriz com a base de dados.

const SUPABASE_URL = 'https://gxbderrxvplxzwvantkn.supabase.co';
// Declara uma constante (um valor que não muda) para armazenar o endereço da API do seu projeto Supabase.

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4YmRlcnJ4dnBseHp3dmFudGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMTA2MjcsImV4cCI6MjEwNTc4NjYyN30.3YbSndiN-OBFZcOish7MWOu9sO6byPsWDQV74_XbjC4';
// Declara uma constante para armazenar a sua chave pública, que autoriza o navegador a conversar com o Supabase.

let clienteSupabase;
// Cria uma variável global vazia; ela servirá como um "recipiente" para guardar a nossa conexão ativa mais à frente.

if (typeof supabase !== 'undefined') {
// Inicia um teste lógico: verifica se o objeto 'supabase' existe no navegador (se a biblioteca foi importada corretamente).

    clienteSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    // Chama a função interna do Supabase para criar a conexão usando a URL e a Chave, guardando o resultado no nosso "recipiente".

    console.log("✅ Conexão com o Supabase inicializada com sucesso.");
    // Envia uma mensagem verde e amigável para o console do navegador (tecla F12), confirmando que deu tudo certo.

} else {
// Se o teste lógico lá de cima falhar (a biblioteca não foi encontrada), o programa foge para este bloco alternativo.

    console.error("❌ Erro Crítico: A biblioteca do Supabase não foi carregada. Verifica a tua ligação à internet ou a tag <script> no HTML.");
    // Imprime um alerta vermelho no console, avisando o desenvolvedor que o script do Supabase precisa ser incluído no HTML.

}
// A chave '}' fecha o nosso bloco de teste lógico (o if/else).

// [FIM: CONFIGURAÇÃO SUPABASE]
// Marca o final lógico deste bloco, mantendo o código organizado e modular.
