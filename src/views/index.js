/**
 * Objeto Carrinho - Gerencia o estado dos serviços selecionados
 */
const carrinho = (function() {
    // Estado privado do carrinho
    let estado = {
        itens: {},
        total: 0,
        quantidade: 0
    };

    // Função interna para formatar moeda
    const formatarMoeda = (valor) => {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };

    return {
        adicionar: function(id, nome, preco) {
            if (estado.itens[id]) {
                estado.itens[id].qtd += 1;
            } else {
                estado.itens[id] = { nome, preco, qtd: 1 };
            }
            this.atualizar();
        },

        remover: function(id) {
            delete estado.itens[id];
            this.atualizar();
        },

        atualizar: function() {
            const listaHtml = document.getElementById('lista-carrinho');
            const totalHtml = document.getElementById('total-carrinho');
            const contadorHtml = document.getElementById('contador-itens');
            
            let htmlGerado = '';
            estado.total = 0;
            estado.quantidade = 0;

            const chaves = Object.keys(estado.itens);

            if (chaves.length === 0) {
                listaHtml.innerHTML = '<p class="text-slate-500 text-sm text-center py-4">Nenhum serviço selecionado</p>';
                totalHtml.innerText = 'R$ 0,00';
                contadorHtml.innerText = '0 ITENS';
                return;
            }

            chaves.forEach(id => {
                const item = estado.itens[id];
                const subtotal = item.preco * item.qtd;
                estado.total += subtotal;
                estado.quantidade += item.qtd;

                htmlGerado += `
                    <div class="item-carrinho flex justify-between items-center bg-slate-800/20 p-3 rounded-lg border border-slate-700/50">
                        <div>
                            <p class="text-sm font-bold dark:text-white">${item.nome} (x${item.qtd})</p>
                            <button onclick="carrinho.remover(${id})" class="text-[10px] text-red-400 font-bold uppercase hover:text-red-300">Remover</button>
                        </div>
                        <span class="text-sm font-black text-primary">${formatarMoeda(subtotal)}</span>
                    </div>
                `;
            });

            listaHtml.innerHTML = htmlGerado;
            totalHtml.innerText = formatarMoeda(estado.total);
            contadorHtml.innerText = `${estado.quantidade} ${estado.quantidade === 1 ? 'ITEM' : 'ITENS'}`;
        }
    };
})();

// Configuração inicial do tema (opcional se quiser forçar dark mode via JS)
document.documentElement.classList.add('dark');

