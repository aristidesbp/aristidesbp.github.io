
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
    
if (document.readyState === 'loading') {
/* Verifica se o navegador ainda está carregando e parseando o documento HTML inicial */
document.addEventListener('DOMContentLoaded', initNavbar);
/* Caso ainda esteja carregando, aguarda o HTML ser totalmente processado para então executar a função 'initNavbar' */
} else {
/* Entra nesta condição caso o HTML já tenha sido completamente carregado e esteja pronto */
initNavbar();
/* Executa a função 'initNavbar' imediatamente, pois o DOM já está disponível */
}
/* Fecha a condicional "else" de verificação do estado de carregamento do documento */
})();
/* Fecha e executa imediatamente a função anônima que envolve todo o código (IIFE) */




