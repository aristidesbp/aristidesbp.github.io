    
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12eHd4cHdnb3VraGlucWZ1cHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMDE5MzAsImV4cCI6MjA5ODU3NzkzMH0.vudMl-45gMMEg6EJpM8BZa0rC6k7YiAdqtxuUUB_OWM';
        const supabaseUrl = 'https://mvxwxpwgoukhinqfuppz.supabase.co';
        const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

        let produtosVitrine = [];
        let carrinho = [];

        document.addEventListener('DOMContentLoaded', () => {
            carregarProdutosVitrine();
        });

        async function carregarProdutosVitrine() {
            const { data, error } = await _supabase.from('produtos').select('*').gt('quantidade_estoque', 0);
            if (error) return;
            produtosVitrine = data || [];
            popularCategorias(produtosVitrine);
            renderizarVitrine(produtosVitrine);
            renderizarPromocoes(produtosVitrine);
        }

        function popularCategorias(lista) {
            const select = document.getElementById('filtro-categoria');
            const categorias = [...new Set(lista.map(p => p.categoria).filter(Boolean))];
            select.innerHTML = '<option value="">Todas Categorias</option>' + categorias.map(cat => `<option value="${cat}">${cat}</option>`).join('');
        }

        function renderizarVitrine(lista) {
            const grid = document.getElementById('grid-vitrine-produtos');
            if (!grid) return;
            if (lista.length === 0) {
                grid.innerHTML = '<p class="col-span-full text-center text-slate-400 py-8 text-sm">Nenhum item encontrado.</p>';
                return;
            }
            grid.innerHTML = lista.map(p => {
                const img = p.foto_url ? `<img src="${p.foto_url}" class="w-full h-36 object-cover">` : `<div class="w-full h-36 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400"><span class="material-symbols-outlined text-3xl">fastfood</span></div>`;
                return `
                    <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
                        ${img}
                        <div class="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <span class="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600">${p.categoria || 'Geral'}</span>
                                <h3 class="font-bold text-sm text-slate-800 dark:text-white mt-1.5 leading-snug">${p.nome}</h3>
                                <p class="text-[10px] text-slate-400 mt-0.5">Código: ${p.codigo_barras || p.id.substring(0,6)}</p>
                            </div>
                            <div class="mt-3 pt-3 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                                <span class="font-black text-red-600 text-sm">R$ ${parseFloat(p.preco_venda || 0).toFixed(2)}</span>
                                <button onclick="adicionarAoCarrinho('${p.id}')" class="bg-red-600 hover:bg-red-700 text-white p-2 rounded-xl transition flex items-center justify-center shadow-md shadow-red-600/20">
                                    <span class="material-symbols-outlined text-xs">add</span>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function renderizarPromocoes(lista) {
            const secao = document.getElementById('secao-promocoes');
            const grid = document.getElementById('grid-promocoes');
            const promos = lista.slice(0, 4);
            if (promos.length === 0) {
                secao.classList.add('hidden');
                return;
            }
            secao.classList.remove('hidden');
            grid.innerHTML = promos.map(p => `
                <div onclick="adicionarAoCarrinho('${p.id}')" class="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl p-4 text-white shadow-lg shadow-red-600/10 cursor-pointer hover:scale-[1.02] transition flex items-center justify-between">
                    <div>
                        <span class="bg-white/20 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">Oferta Especial</span>
                        <h4 class="font-bold text-sm mt-1">${p.nome}</h4>
                        <span class="font-black text-base mt-1 block">R$ ${parseFloat(p.preco_venda || 0).toFixed(2)}</span>
                    </div>
                    <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span class="material-symbols-outlined text-sm">local_fire_department</span>
                    </div>
                </div>
            `).join('');
        }

        function filtrarVitrine() {
            const termo = document.getElementById('busca-vitrine').value.toLowerCase();
            const catSelecionada = document.getElementById('filtro-categoria').value;
            const filtrados = produtosVitrine.filter(p => {
                const matchTexto = p.nome.toLowerCase().includes(termo) || (p.categoria && p.categoria.toLowerCase().includes(termo));
                const matchCat = catSelecionada ? p.categoria === catSelecionada : true;
                return matchTexto && matchCat;
            });
            renderizarVitrine(filtrados);
        }

        function filtrarPorPromocao() {
            document.getElementById('busca-vitrine').value = '';
            renderizarVitrine(produtosVitrine.slice(0, 4));
        }

        async function buscarCep() {
            const cepInput = document.getElementById('input-cep').value.replace(/\D/g, '');
            if (cepInput.length !== 8) {
                alert("CEP inválido. Digite 8 dígitos.");
                return;
            }
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cepInput}/json/`);
                const data = await response.json();
                if (data.erro) {
                    alert("CEP não encontrado.");
                    return;
                }
                const enderecoCompleto = `${data.logradouro}, - Bairro: ${data.bairro} - ${data.localidade}/${data.uf}`;
                document.getElementById('input-endereco').value = enderecoCompleto;
            } catch (err) {
                console.error("Erro ao buscar CEP:", err);
                alert("Não foi possível buscar o CEP automaticamente.");
            }
        }

        function ativarLeitorCamera() {
            alert("Recurso de leitura de código de barras via câmera acionado.");
        }

        
function adicionarAoCarrinho(id) {
            const produto = produtosVitrine.find(p => p.id === id);
            if (!produto) return;
            const itemExistente = carrinho.find(i => i.id === id);
            if (itemExistente) {
                if (itemExistente.qtd < produto.quantidade_estoque) itemExistente.qtd++;
                else alert("Estoque máximo atingido.");
            } else {
                carrinho.push({ ...produto, qtd: 1 });
            }
            atualizarContadorCarrinho();
        }

        
function atualizarContadorCarrinho() {
            const totalItens = carrinho.reduce((sum, item) => sum + item.qtd, 0);
            document.getElementById('contador-carrinho').innerText = totalItens;
        }

        function abrirCarrinho() {
            const lista = document.getElementById('lista-itens-carrinho');
            if (carrinho.length === 0) {
                lista.innerHTML = '<p class="text-center text-slate-400 py-4 text-xs">Sua sacola está vazia.</p>';
                document.getElementById('carrinho-total').innerText = 'R$ 0,00';
            } else {
                let totalGeral = 0;
                lista.innerHTML = carrinho.map(item => {
                    const subtotal = item.preco_venda * item.qtd;
                    totalGeral += subtotal;
                    const codigoProd = item.codigo_barras || item.id.substring(0, 6);
                    return `
                        <div class="flex items-center justify-between bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                            <div>
                                <h4 class="font-bold text-xs text-slate-800 dark:text-white">${item.nome}</h4>
                                <span class="text-[10px] text-slate-400">Cód: ${codigoProd} | R$ ${parseFloat(item.preco_venda).toFixed(2)} x ${item.qtd}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="font-black text-xs text-red-600">R$ ${subtotal.toFixed(2)}</span>
                                <button onclick="removerDoCarrinho('${item.id}')" class="text-slate-400 hover:text-red-500 p-1">
                                    <span class="material-symbols-outlined text-sm">delete</span>
                                </button>
                            </div>
                        </div>
                    `;
                }).join('');
                document.getElementById('carrinho-total').innerText = `R$ ${totalGeral.toFixed(2)}`;
            }
            document.getElementById('modal-carrinho').classList.remove('hidden');
        }

        function fecharCarrinho() {
            document.getElementById('modal-carrinho').classList.add('hidden');
        }

        function removerDoCarrinho(id) {
            carrinho = carrinho.filter(i => i.id !== id);
            atualizarContadorCarrinho();
            abrirCarrinho();
        }

        function montarTextoPedido() {
            const whatsapp = document.getElementById('input-whatsapp').value.trim();
            const cpf = document.getElementById('input-cpf').value.trim();
            const cep = document.getElementById('input-cep').value.trim();
            const endereco = document.getElementById('input-endereco').value.trim();
            const pagamento = document.getElementById('input-pagamento').value;
            const obs = document.getElementById('input-obs').value.trim();

            if (!whatsapp || !cpf || !cep || !endereco) {
                alert("Por favor, preencha o WhatsApp, CPF, CEP e o Endereço de entrega.");
                return null;
            }

            const codigoPedido = 'PED-' + Math.random().toString(36).substring(2, 8).toUpperCase();
            let texto = `=== PEDIDO ERP_ABP ===\n`;
            texto += `CÓDIGO: ${codigoPedido}\n`;
            texto += `WHATSAPP: ${whatsapp}\n`;
            texto += `CPF: ${cpf}\n`;
            texto += `CEP: ${cep}\n`;
            texto += `ENDEREÇO: ${endereco}\n`;
            texto += `PAGAMENTO: ${pagamento}\n`;
            texto += `OBSERVAÇÃO: ${obs || 'Nenhuma'}\n\n`;
            texto += `--- ITENS DO PEDIDO ---\n`;

            let totalGeral = 0;
            carrinho.forEach(item => {
                const sub = item.preco_venda * item.qtd;
                totalGeral += sub;
                const cod = item.codigo_barras || item.id.substring(0, 6);
                texto += `[Cód: ${cod}] ${item.qtd}x ${item.nome} - R$ ${sub.toFixed(2)}\n`;
            });

            texto += `\nVALOR TOTAL: R$ ${totalGeral.toFixed(2)}\n`;
            return { texto, whatsapp };
        }

        function finalizarCompraWhatsApp() {
            const dados = montarTextoPedido();
            if (!dados) return;

            window.open(`https://api.whatsapp.com/send?phone=${dados.whatsapp}&text=${encodeURIComponent(dados.texto)}`, '_blank');
            carrinho = [];
            atualizarContadorCarrinho();
            fecharCarrinho();
        }

        function baixarArquivoPedido() {
            const dados = montarTextoPedido();
            if (!dados) return;

            const blob = new Blob([dados.texto], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `pedido-${Math.random().toString(36).substring(2, 8)}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            alert("Arquivo TXT gerado com sucesso! Faça o upload deste arquivo no painel ADM para automatizar a compra e agendamento.");
            carrinho = [];
            atualizarContadorCarrinho();
            fecharCarrinho();
        }
    
