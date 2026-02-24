
 /**
 * Nome do arquivo: pagamento.js
 * Objetivo: Enviar os dados do carrinho para a função de checkout e redirecionar para o pagamento.
 */

async function processarPagamento() {
    const functionUrl = 'https://eisruaetsqrratemqswv.functions.supabase.co/checkout';
    
    // Verifica o total do carrinho (variável global do carrinho.js)
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    
    if (total <= 0) return alert("Selecione um serviço primeiro.");
    
    const nome = document.getElementById('cliente_nome').value;
    const email = document.getElementById('cliente_email').value;
    
    if(!nome || !email) return alert("Preencha seu nome e e-mail para continuar.");

    const btn = document.getElementById('btnPagar');
    btn.disabled = true;
    const originalText = btn.innerText;
    
    // Animação de carregamento
    btn.innerHTML = `<div class="flex items-center justify-center gap-2"><div class="loading-spinner"></div> PROCESSANDO...</div>`;

    try {
        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome, 
                email, 
                total,
                itens: carrinho.map(i => ({ nome: i.nome, preco: i.preco, qtd: 1 }))
            })
        });

        if (!response.ok) throw new Error('Erro na comunicação com o servidor de checkout.');

        const data = await response.json();

        // init_point é a URL gerada pelo Mercado Pago via Edge Function
        if (data.init_point) {
            window.location.href = data.init_point;
        } else {
            throw new Error('Ponto de início de pagamento não recebido.');
        }
    } catch (e) {
        alert("Erro ao conectar com o servidor de pagamento. Tente novamente.");
        console.error("Erro no Checkout:", e);
        
        // Restaura o botão em caso de erro
        btn.disabled = false;
        btn.innerText = originalText;
    }
}   

