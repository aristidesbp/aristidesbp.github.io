/**
 * Aristidesbp Digital Solutions - Cart Logic
 * Gerencia o carrinho, renderiza o resumo e prepara o formulário.
 */

class CartController {
    constructor() {
        this.cart = [];
        this.cartContainer = document.querySelector('.space-y-4.mb-8'); // Container do resumo
        this.totalElement = document.querySelector('.text-2xl.font-black.text-primary');
        this.itemCountBadge = document.querySelector('.bg-primary/20.text-primary');
        
        this.init();
    }

    init() {
        // Escuta cliques nos botões de adicionar
        document.querySelectorAll('[data-name]').forEach(button => {
            button.addEventListener('click', (e) => {
                const name = button.getAttribute('data-name');
                const price = parseFloat(button.getAttribute('data-price'));
                this.addItem(name, price);
            });
        });

        // Botão Finalizar
        const checkoutBtn = document.querySelector('button.bg-primary.hover\\:bg-primary\\/90.text-white');
        checkoutBtn.addEventListener('click', () => this.sendToWhatsApp());
    }

    addItem(name, price) {
        const existingItem = this.cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ name, price, quantity: 1 });
        }
        this.renderCart();
    }

    removeItem(name) {
        this.cart = this.cart.filter(item => item.name !== name);
        this.renderCart();
    }

    updateQuantity(name, delta) {
        const item = this.cart.find(item => item.name === name);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) return this.removeItem(name);
        }
        this.renderCart();
    }

    renderCart() {
        // Limpa o container atual
        this.cartContainer.innerHTML = '';
        let total = 0;

        this.cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            const itemHtml = `
                <div class="flex justify-between items-start text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                    <div>
                        <p class="dark:text-white text-slate-900 font-bold">${item.name}</p>
                        <div class="flex items-center gap-2 mt-1">
                            <button onclick="cart.updateQuantity('${item.name}', -1)" class="size-5 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center">-</button>
                            <span class="text-xs font-medium">${item.quantity}x</span>
                            <button onclick="cart.updateQuantity('${item.name}', 1)" class="size-5 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center">+</button>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="dark:text-white text-slate-900 font-bold">R$ ${subtotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                        <button onclick="cart.removeItem('${item.name}')" class="text-[10px] text-red-500 font-bold uppercase">Remover</button>
                    </div>
                </div>
            `;
            this.cartContainer.insertAdjacentHTML('beforeend', itemHtml);
        });

        // Atualiza Totais e Badges
        this.totalElement.innerText = `R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
        this.itemCountBadge.innerText = `${this.cart.reduce((acc, i) => acc + i.quantity, 0)} itens`;
        
        // Se o carrinho estiver vazio
        if (this.cart.length === 0) {
            this.cartContainer.innerHTML = '<p class="text-center text-slate-400 text-xs py-4">Seu carrinho está vazio.</p>';
        }
    }

    sendToWhatsApp() {
        const nome = document.getElementById('cliente_nome').value;
        const email = document.getElementById('cliente_email').value;
        const obs = document.getElementById('cliente_obs').value;

        if (!nome || this.cart.length === 0) {
            alert("Por favor, selecione ao menos um serviço e preencha seu nome.");
            return;
        }

        let mensagem = `*Novo Pedido - Aristidesbp Digital Solutions*%0A%0A`;
        mensagem += `*Cliente:* ${nome}%0A`;
        mensagem += `*Email:* ${email}%0A`;
        mensagem += `*Obs:* ${obs}%0A%0A`;
        mensagem += `*Resumo do Pedido:*%0A`;

        this.cart.forEach(item => {
            mensagem += `- ${item.quantity}x ${item.name} (R$ ${item.price})%0A`;
        });

        mensagem += `%0A*Total: ${this.totalElement.innerText}*`;

        const fone = "5591999999999"; // Substitua pelo seu WhatsApp
        window.open(`https://wa.me/${fone}?text=${mensagem}`, '_blank');
    }
}

// Inicializa globalmente para os botões inline (onclick) funcionarem
const cart = new CartController();

