/**
 * js/listar_financeiro.js
 * Gerencia a listagem e navegação do módulo Financeiro - ERP ABP
 */

(function() {
    // 1. Configuração de Navegação e Cliques
    const configurarNavegacao = () => {
        
        // Botão de Adicionar (+) - Redireciona para cadastro limpo
        const btnAdd = document.querySelector('button .material-symbols-outlined[class*="text-white"]')?.closest('button');
        if (btnAdd) {
            btnAdd.addEventListener('click', () => {
                window.location.href = 'cadastrar_financeiro.html';
            });
        }

        // Botões de Editar (>) em cada card de parcela
        const cardsParcela = document.querySelectorAll('main .flex.items-center.gap-4.p-4');
        cardsParcela.forEach(card => {
            const btnEdit = card.querySelector('.material-symbols-outlined:contains("chevron_right")')?.closest('button') 
                          || card.querySelector('.ml-auto button');
            
            if (btnEdit) {
                btnEdit.addEventListener('click', () => {
                    // Nota: Em uma implementação real, passaríamos o ID via URL, ex: cadastrar_financeiro.html?id=123
                    window.location.href = 'cadastrar_financeiro.html';
                });
            }
        });

        // Botão Exportar PDF (Ação teórica)
        const btnPdf = document.querySelector('.material-symbols-outlined:contains("picture_as_pdf")')?.closest('button');
        if (btnPdf) {
            btnPdf.addEventListener('click', () => alert("Gerando relatório PDF..."));
        }
    };

    // 2. Carregar Dados do Supabase (Opcional - para popular a lista)
    const carregarParcelas = async () => {
        // Aqui entrará a lógica para buscar os dados da tabela 'financeiro'
        // e calcular os totais de Entradas e Saídas mostrados no topo.
        console.log("Financeiro: Pronto para carregar dados do Supabase.");
    };

    // Inicialização
    if (document.readyState === 'complete') {
        configurarNavegacao();
        carregarParcelas();
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            configurarNavegacao();
            carregarParcelas();
        });
    }
})();
