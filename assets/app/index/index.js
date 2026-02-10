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
                        window.location.href = 'listar_tarefas';
                        break;
                    case 'notas':
                        window.location.href = 'listar_notas.html';
                        break;
                    case 'entidades':
                        window.location.href = 'listar_entidades.html';
                        break;
                    case 'financeiro':
                        window.location.href = 'listar_financeiro.html';
                        break;
                    case 'bancos':
                        window.location.href = 'listar_bancos.html;
                        break;
                    case 'produtos':
                        window.location.href = 'listar_produtos.html';
                        break;
                    case 'pdv':
                        window.location.href = 'pdv.html';
                        break;
                    case 'vendas':
                        window.location.href = 'listar_vendas.html';
                        break;
                    case 'e-commerce':
                        window.location.href = 'loja.html';
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
