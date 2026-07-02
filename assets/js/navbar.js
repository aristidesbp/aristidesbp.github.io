/*############################################################################################*/
/*############################################################################################*/
(function () {
/*Cria uma Função Imediatamente Invocada (IIFE) para isolar o escopo e evitar conflitos de variáveis globais: */
function initNavbar() {
/*Declara a função principal que irá construir e renderizar a barra de navegação: */
const container = document.getElementById('navbar');
/*Busca no HTML o elemento que possui o ID 'navbar' onde o menu será inserido: */
if (!container) return;
/* Interrompe a execução caso o elemento 'navbar' não seja encontrado na página: */
if (container.dataset.loaded === 'true') return;
/*Interrompe a execução se a barra de navegação já tiver sido renderizada antes, evitando duplicações: */
container.dataset.loaded = 'true';
/* Marca o elemento com o atributo customizado 'data-loaded="true"' para indicar que ele já foi processado: */
container.innerHTML = `
<!-- container.innerHTML recebe a string de template que define o HTML injetado -->
<div class="navbar">
<!-- cria uma div para empacotar o html, e definir os elementos da classe  : -->
<div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
<!-- cria uma sub-div para empacotar e definir o css do titulo: -->   
<i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP </div>
<!-- define  css , titulo e feichamento do titulo -->  
<div class="nav-buttons">
<!-- cria uma sub-div dentro de navbar da classe "nav-buttons" para empacotar os botoes -->  
<a href="https://aristidesbp.github.io" class="btn-nav btn-home"><i class="fas fa-home"></i> inicio </a>
<!-- cria o botao de inicio ele leva para a pagina inicial -->  
<button class="btn-nav" onclick="sairDaConta()"><i class="fas fa-sign-out-alt"></i> Sair</button>
<!-- cria o botao de sair ele chama a function "sairDaConta()" -->  
</div><!-- feichamento da div class="nav-buttons" -->  
</div><!-- feichamento da div class="navbar" -->  
`; /* Fecha a string de template que define o HTML injetado */
} /* Fecha o escopo da função 'initNavbar' */

    

/*############################################################################################*
/*############################################################################################*/
if (document.readyState === 'loading') {
/* Verifica se o navegador ainda está carregando e parseando o documento HTML inicial */
document.addEventListener('DOMContentLoaded', initNavbar);
/* Caso ainda esteja carregando, aguarda o HTML ser totalmente processado para então executar a função 'initNavbar' */
} else {
/* Entra nesta condição caso o HTML já tenha sido completamente carregado e esteja pronto */
initNavbar();
/* Executa a função 'initNavbar' imediatamente, pois o DOM já está disponível */
}/* Fecha a condicional "else" de verificação do estado de carregamento do documento */
})();/* Fecha e executa imediatamente a função anônima que envolve todo o código (IIFE) */



/*############################################################################################*/
/*############################################################################################*/
/* Estrutura do verificar_login.js. O comando básico do Supabase é: supabase.auth.getSession()*/
async function checarAutenticacao() {
/*cria a função para garantir que apenas usuários logados acessem a página atual*/    
const { data: { session }, error } = await window.supabaseClient.auth.getSession();
/*Buscamos a sessão atual do cliente configurado no supabase_config.js*/
if (error || !session) {
/* Se houver erro ou se a sessão estiver vazia (null), o usuário não está logado*/   
console.log("Acesso negado: Usuário não autenticado.");
/*apresenta mensagem de erro*/
window.location.href = "login.html";
/* Redireciona para o login.html na raiz, conforme nossa estrutura*/   
} else {
/*Se a sessão existir, permitimos que ele continue na página*/
console.log("Acesso autorizado para:", session.user.email);
/*apresenta mensagem de confirmação e inicia a cessao*/    
}/*feichamento do else*/
}/*feichamento da função*/
checarAutenticacao();
/* Executamos a verificação imediatamente ao carregar/chamar/executar a function checarAutenticacao();*/




/*############################################################################################*/
/*############################################################################################*/ 
async function sairDaConta() {
/* Cria uma função assíncrona responsável por realizar o processo de logoff do usuário */    
if(confirm("Deseja realmente sair do sistema?")) {
/* Exibe uma caixa de diálogo nativa do navegador pedindo a confirmação do usuário (Retorna true se clicar em OK) */
try {
/* Inicia um bloco de tratamento de erros para executar o processo de saída com segurança */
if (typeof _supabase !== 'undefined') {
/* Verifica se a instância global do Supabase está definida e disponível no escopo antes de tentar usá-la */    
await _supabase.auth.signOut(); }
/* Executa e aguarda a finalização do encerramento de sessão (logout) na API do Supabase */          
window.location.href = 'login.html';
/* Redireciona o navegador do usuário imediatamente para a página de login após o logout bem-sucedido */       
} catch (error) {
/* Captura qualquer erro ou falha que ocorra durante a execução das instruções contidas dentro do bloco try */       
console.error("Erro ao sair:", error);
/* Registra a mensagem detalhada do erro no console do navegador para fins de depuração técnica */   
window.location.href = 'login.html';
/* Garante o redirecionamento para a página de login por segurança, mesmo se a comunicação com o Supabase falhar */       
}/* Fechamento do bloco catch (error) */   
}/* Fechamento da condicional if de confirmação */
}/* Fechamento da função assíncrona sairDaConta */
