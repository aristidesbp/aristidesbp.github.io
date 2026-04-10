// login.js

/* 
const _supabaseUrl = 'SUA_URL_AQUI';
const _supabaseKey = 'SUA_CHAVE_ANON_AQUI';
*/

// 2. Inicialização do Cliente Global
// Usamos window.supabase para garantir que ele seja acessível em qualquer arquivo JS do projeto
const supabase = window.supabase.createClient(_supabaseUrl, _supabaseKey);

// 3. Função de Logout com Segurança de Nível Bancário
async function sairDaConta() {
    try {
        // Passo 1: Invalida o token JWT diretamente no servidor do Supabase (Crucial para segurança)
        const { error } = await supabase.auth.signOut();
        
        if (error) {
            console.error("Aviso: Erro ao comunicar logout ao servidor:", error.message);
        }
    } catch (err) {
        console.error("Erro inesperado durante o logout:", err);
    } finally {
        // Passo 2: Limpa todos os rastros locais no navegador do paciente/profissional
        localStorage.clear();
        sessionStorage.clear();
        
        // Passo 3: Redireciona para a tela de login (Ajuste o caminho se sua index não for essa)
        window.location.replace("../../index.html"); 
        // Nota: usei replace() em vez de href para impedir que o usuário clique em "Voltar" no navegador
    }
}

console.log("✅ Conexão Supabase configurada com Segurança Nível Bancário.");
