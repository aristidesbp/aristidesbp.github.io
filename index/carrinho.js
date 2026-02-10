/**
 * Nome do arquivo: carrinho.js
 * Objetivo: Gerenciar a inclusão de serviços no carrinho e atualizar o resumo de preços.
 */

// Variável global para armazenar os itens
let carrinho = [];

function addServico(btn, nome, preco) {
    // 1. Adiciona o objeto ao array de carrinho
    carrinho.push({ nome, preco });

    // 2. Calcula o novo total
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    
    // 3. Atualiza o elemento de resumo na tela
    const resumoTotal = document.getElementById('resumoTotal');
    if (resumoTotal) {
        resumoTotal.innerText = total.toFixed(2);
    }

    // 4. Feedback Visual no botão (Muda para verde/sucesso)
    btn.classList.remove('bg-primary');
    btn.classList.add('bg-success'); // Classe definida no seu CSS
    btn.innerHTML = `<span class="material-symbols-outlined text-sm">check_circle</span> Adicionado`;
}
