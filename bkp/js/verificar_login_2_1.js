/**  Estrutura do verificar_login.js **/

/*********************************************************/

/* 1⁰ vamos focar na função de Verificação de Sessão. O comando básico do Supabase é: supabase.auth.getSession()*/

async function checarAutenticacao() {
/*Esta função garante que apenas usuários logados acessem a página atual*/

const { data: { session }, error } = await window.supabaseClient.auth.getSession();
/*Buscamos a sessão atual do cliente configurado no supabase_config.js*/

if (error || !session) {
console.log("Acesso negado: Usuário não autenticado.");    
/*2. Se houver erro ou se a sessão estiver vazia (null), o usuário não está logado*/
  
window.location.href = "login.html";
/*Redireciona para o login.html na raiz, conforme nossa estrutura*/
        
} else {
console.log("Acesso autorizado para:", session.user.email);}
/*Se a sessão existir, permitimos que ele continue na página*/
        
}/*ficha a function checarAutenticacao()*/

checarAutenticacao();
/*Executamos a verificação imediatamente ao carregar o script*/

/*********************************************************/
/*função para o botão sair da conta*/

async function sairDaConta() {
if(confirm("Deseja realmente sair do sistema?")) {
try { /*crie a função, pede para confirmar se ele realmente quer sair do sistema*/

if (typeof _supabase !== 'undefined') {
await _supabase.auth.signOut();}
/*Verifica se o cliente supabase existe antes de tentar deslogar:*/

            window.location.href = 'login.html';
        } catch (error) {
            console.error("Erro ao sair:", error);
            window.location.href = 'login.html';
        }
    }
        }   



