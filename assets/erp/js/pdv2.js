/*pdv_js*/

        // CONFIGURAÇÕES SUPABASE (Substituir pelas suas credenciais)
        const supabaseUrl = 'SUA_URL_AQUI';
        const supabaseKey = 'SUA_KEY_AQUI';
        const supabase = supabase.createClient(supabaseUrl, supabaseKey);

        let produtosAtuais = [];
        let carrinho = [];

        // Inicialização
        window.onload = () => {
            carregarProdutos();
            carregarClientes();
        };

        // Atalhos de teclado
        window.addEventListener('keydown', (e) => {
            if(e.key === 'F2') finalizarVenda();
            if(e.key === 'F4') document.getElementById('busca-produto').focus();
        });

        async function carregarProdutos() {
            // No mundo real, buscaria da tabela 'public.produtos'
            // Mock de dados para demonstração conforme seu schema
            produtosAtuais = [
                { id: '1', nome: 'Coca-Cola 2L', preco_venda: 12.50, codigo_de_barras: '789123', estoque_atual: 50 },
                { id: '2', nome: 'Arroz 5kg', preco_venda: 29.90, codigo_de_barras: '789456', estoque_atual: 20 },
                { id: '3', nome: 'Feijão Preto 1kg', preco_venda: 8.90, codigo_de_barras: '789789', estoque_atual: 15 }
            ];
            renderizarProdutos(produtosAtuais);
        }

        async function carregarClientes() {
            // Buscaria da tabela 'public.entidades' onde tipo_entidade = 'cliente'
            const select = document.getElementById('select-cliente');
            // Mock
            const clientes = [{id: '101', nome_completo: 'João Silva'}];
            clientes.forEach(c => {
                let opt = document.createElement('option');
                opt.value = c.id;
                opt.textContent = c.nome_completo;
                select.appendChild(opt);
            });
        }

        function renderizarProdutos(lista) {
            const grid = document.getElementById('grid-produtos');
            grid.innerHTML = lista.map(p => `
                <div onclick="adicionarAoCarrinho('${p.id}')" class="product-card bg-white p-4 rounded-lg shadow cursor-pointer hover:border-blue-500 border-2 border-transparent">
                    <div class="h-24 bg-gray-100 rounded mb-2 flex items-center justify-center text-gray-400">
                        <i class="fas fa-box text-3xl"></i>
                    </div>
                    <h3 class="font-bold text-sm h-10 overflow-hidden">${p.nome}</h3>
                    <p class="text-blue-600 font-black mt-2">R$ ${p.preco_venda.toFixed(2)}</p>
                    <p class="text-[10px] text-gray-400 mt-1">ESTOQUE: ${p.estoque_atual}</p>
                </div>
            `).join('');
        }

        function adicionarAoCarrinho(id) {
            const produto = produtosAtuais.find(p => p.id === id);
            const itemNoCarrinho = carrinho.find(item => item.id === id);

            if (itemNoCarrinho) {
                itemNoCarrinho.quantidade++;
            } else {
                carrinho.push({ ...produto, quantidade: 1 });
            }
            atualizarInterfaceCarrinho();
        }

        function removerDoCarrinho(index) {
            carrinho.splice(index, 1);
            atualizarInterfaceCarrinho();
        }

        function atualizarInterfaceCarrinho() {
            const container = document.getElementById('carrinho-itens');
            if (carrinho.length === 0) {
                container.innerHTML = '<div class="text-center text-gray-400 mt-10">Carrinho vazio</div>';
                document.getElementById('total-venda').textContent = 'R$ 0,00';
                return;
            }

            container.innerHTML = carrinho.map((item, index) => `
                <div class="flex justify-between items-center bg-gray-50 p-2 rounded border-l-4 border-blue-500">
                    <div>
                        <p class="text-sm font-bold">${item.nome}</p>
                        <p class="text-xs text-gray-500">${item.quantidade}x R$ ${item.preco_venda.toFixed(2)}</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-bold">R$ ${(item.quantidade * item.preco_venda).toFixed(2)}</span>
                        <button onclick="removerDoCarrinho(${index})" class="text-red-500"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `).join('');

            const total = carrinho.reduce((sum, item) => sum + (item.quantidade * item.preco_venda), 0);
            document.getElementById('total-venda').textContent = `R$ ${total.toFixed(2)}`;
            document.getElementById('subtotal').textContent = `R$ ${total.toFixed(2)}`;
        }

        async function finalizarVenda() {
            if (carrinho.length === 0) return alert("Carrinho vazio!");
            
            document.getElementById('loading-overlay').style.display = 'flex';
            
            const total = carrinho.reduce((sum, item) => sum + (item.quantidade * item.preco_venda), 0);
            const clienteId = document.getElementById('select-cliente').value;
            const metodo = document.getElementById('metodo-pagamento').value;

            try {
                // 1. Inserir na tabela 'public.vendas' conforme seu schema
                /* const { data: venda, error: errorVenda } = await supabase.from('vendas').insert({
                    entidade_id: clienteId || null,
                    total_venda: total,
                    metodo_pagamento: metodo
                }).select().single();
                */

                // 2. Inserir itens na 'venda_itens' e atualizar estoque...
                // Simulação de sucesso:
                setTimeout(() => {
                    gerarReciboPDF(total, metodo);
                    alert("Venda realizada com sucesso!");
                    carrinho = [];
                    atualizarInterfaceCarrinho();
                    document.getElementById('loading-overlay').style.display = 'none';
                }, 1500);

            } catch (err) {
                console.error(err);
                document.getElementById('loading-overlay').style.display = 'none';
            }
        }

        function gerarReciboPDF(total, metodo) {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({ unit: 'mm', format: [80, 150] }); // Formato cupom térmico
            
            doc.setFontSize(10);
            doc.text("ERP ABP - SISTEMAS", 40, 10, { align: "center" });
            doc.text("--------------------------------", 40, 15, { align: "center" });
            
            let y = 25;
            carrinho.forEach(item => {
                doc.text(`${item.quantidade}x ${item.nome.substring(0,15)}`, 5, y);
                doc.text(`R$ ${(item.quantidade * item.preco_venda).toFixed(2)}`, 75, y, { align: "right" });
                y += 5;
            });

            doc.text("--------------------------------", 40, y + 5, { align: "center" });
            doc.setFont("helvetica", "bold");
            doc.text(`TOTAL: R$ ${total.toFixed(2)}`, 5, y + 15);
            doc.text(`PAGAMENTO: ${metodo}`, 5, y + 20);
            
            doc.save(`venda_${Date.now()}.pdf`);
        }

        function filtrarProdutos() {
            const termo = document.getElementById('busca-produto').value.toLowerCase();
            const filtrados = produtosAtuais.filter(p => 
                p.nome.toLowerCase().includes(termo) || 
                p.codigo_de_barras.includes(termo)
            );
            renderizarProdutos(filtrados);
        }

        function novoPedido() {
            if(confirm("Deseja cancelar o pedido atual?")) {
                carrinho = [];
                atualizarInterfaceCarrinho();
                document.getElementById('busca-produto').focus();
            }
        }

