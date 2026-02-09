/**
 * js/index.js
 * Gerencia a navegação dos cards do Menu Principal - ERP ABP
 */

(function() {
    // Função para configurar os redirecionamentos
    const configurarCards = () => {
        // Seleciona todos os cards de módulos (grid e o card de ajustes)
        const cards = document.querySelectorAll('main .grid > div, main .col-span-2');

        cards.forEach(card => {
            // Busca o título dentro do card para definir o destino
            const tituloElemento = card.querySelector('h2');
            if (!tituloElemento) return;

            const titulo = tituloElemento.innerText.trim().toLowerCase();

            card.addEventListener('click', () => {
                switch (titulo) {
                    case 'tarefas':
                        window.location.href = 'tarefas.html';
                        break;
                    case 'entidades':
                        window.location.href = 'entidades.html';
                        break;
                    case 'financeiro':
                        window.location.href = 'financeiro.html';
                        break;
                    case 'bancos':
                        window.location.href = 'bancos.html';
                        break;
                    case 'produtos':
                        window.location.href = 'produtos.html';
                        break;
                    case 'pdv':
                        window.location.href = 'pdv.html';
                        break;
                    case 'vendas':
                        window.location.href = 'vendas.html';
                        break;
                    case 'e-commerce':
                        window.location.href = 'ecommerce.html';
                        break;
                    case 'ajustes':
                        window.location.href = 'ajustes.html';
                        break;
                    default:
                        console.warn('Rota não definida para:', titulo);
                }
            });
        });
    };

    // Inicializa a configuração após o carregamento do DOM
    if (document.readyState === 'complete') {
        configurarCards();
    } else {
        window.addEventListener('DOMContentLoaded', configurarCards);
    }
})();
