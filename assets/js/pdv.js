
        // Configuração do Supabase (Mesma dos arquivos anteriores) 
        const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

        let html5QrCode = null;
        let produtosCache = [];
        let carrinho = [];

        function abrirMenu() {
            document.getElementById('sidebar-menu').classList.remove('-translate-x-full');
            document.getElementById('menu-overlay').classList.remove('hidden');
        }

        function fecharMenu() {
            document.getElementById('sidebar-menu').classList.add('-translate-x-full');
            document.getElementById('menu-overlay').classList.add('hidden');
        }

        function alternarAba(abaAtiva) {
            const pdv = document.getElementById('aba-pdv');
            const sangria = document.getElementById('aba-sangria');
            const btnPdv = document.getElementById('btn-aba-pdv');
            const btnSangria = document.getElementById('btn-aba-sangria');

            const classesVerde = ['bg-emerald-500', 'text-white', 'hover:bg-emerald-600'];
            const classesCinza = ['bg-slate-200', 'text-slate-700', 'hover:bg-slate-300'];

            btnPdv.classList.remove(...classesVerde, ...classesCinza);
            btnSangria.classList.remove(...classesVerde, ...classesCinza);

            if (abaAtiva === 'pdv') {
                pdv.classList.remove('hidden');
                sangria.classList.add('hidden');
                btnPdv.add(...classesVerde);
                btnSangria.add(...classesCinza);
            } else {
                pdv.classList.add('hidden');
                sangria.classList.remove('hidden');
                btnSangria.add(...classesVerde);
                btnPdv.add(...classesCinza);
                loadHistoricoCaixa();
            }
        }

        async function verificar_login() {
            const { data: { session } } = await _supabase.auth.getSession();
            const telaLogin = document.getElementById('tela-login');
            const telaSistema = document.getElementById('tela-sistema');

            if (!session) {
                telaLogin.classList.remove('hidden');
                telaLogin.classList.add('flex');
                telaSistema.classList.add('hidden');
            } else {
                telaLogin.classList.add('hidden');
                telaLogin.classList.remove('flex');
                telaSistema.classList.remove('hidden');
                init(); 
            }
        }

        async function fazerLogin() {
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;
            const btn = document.getElementById('btn-login');
            
            if(!email || !senha) return alert("Por favor, preencha e-mail e senha.");

            btn.innerText = 'Autenticando Caixa...';
            btn.disabled = true;

            const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
            
            if (error) {
                alert("Erro ao fazer login no PDV.");
                btn.innerText = 'Entrar no Caixa';
                btn.disabled = false;
            } else {
                document.getElementById('login-email').value = '';
                document.getElementById('login-senha').value = '';
                btn.innerText = 'Entrar no Caixa';
                btn.disabled = false;
                verificar_login(); 
            }
        }

        async function sairDaConta() {
            await _supabase.auth.signOut();
            fecharMenu();
            verificar_login();
        }

        document.addEventListener('DOMContentLoaded', () => {
            verificar_login();
            
            // Atalho de Teclado F8 para Finalizar Venda rápido
            window.addEventListener('keydown', (e) => {
                if(e.key === 'F8') {
                    e.preventDefault();
                    finalizarVendaPDV();
                }
            });
        });

        async function init() {
            await fetchProdutosPDV();
            await fetchEntidadesPDV();
            await loadDashboardPDV();
        }

        // Busca produtos ativos em estoque para o Caixa
        async function fetchProdutosPDV() {
            const { data, error } = await _supabase.from('produtos').select('*').order('nome', { ascending: true });
            if (!error && data) {
                produtosCache = data;
                const select = document.getElementById('pdv-select-produto');
                select.innerHTML = '<option value="">Selecione um produto para adicionar...</option>';
                data.forEach(p => {
                    select.innerHTML += `<option value="${p.id}">${p.nome} - R$ ${parseFloat(p.preco_venda).toFixed(2)} (Estoque: ${p.quantidade_estoque})</option>`;
                });
            }
        }

        // Busca clientes para associação na venda
        async function fetchEntidadesPDV() {
            const { data, error } = await _supabase.from('entidades').select('id, nome_completo').order('nome_completo', { ascending: true });
            if (!error && data) {
                const select = document.getElementById('pdv-cliente');
                select.innerHTML = '<option value="">Consumidor Final (Não identificado)</option>';
                data.forEach(e => {
                    select.innerHTML += `<option value="${e.id}">${e.nome_completo}</option>`;
                });
            }
        }

        // Leitor de código de barras por câmera (Idêntico ao original)
        function iniciarLeituraCamera() {
            const container = document.getElementById('camera-container');
            container.classList.remove('hidden');
            html5QrCode = new Html5Qrcode("camera-preview");
            const config = { fps: 10, qrbox: { width: 280, height: 140 } };
            
            html5QrCode.start({ facingMode: "environment" }, config, (decodedText) => {
                adicionarPorCodigoBarras(decodedText);
                pararCamera();
            }).catch(() => { 
                alert("Permissão de câmera negada ou dispositivo não encontrado."); 
                container.classList.add('hidden'); 
            });
        }

        function pararCamera() {
            if (html5QrCode) {
                html5QrCode.stop().then(() => { document.getElementById('camera-container').classList.add('hidden'); });
            } else { document.getElementById('camera-container').classList.add('hidden'); }
        }

        // Adiciona item se bipado pelo código de barras
        function adicionarPorCodigoBarras(codigo) {
            const prod = produtosCache.find(p => p.codigo_barras === codigo.trim());
            if (prod) {
                adicionarAoCarrinho(prod);
            } else {
                alert(`Produto com código [${codigo}] não foi localizado no estoque.`);
            }
        }

        function adicionarDoSelect() {
            const select = document.getElementById('pdv-select-produto');
            if(!select.value) return;
            const prod = produtosCache.find(p => p.id === select.value);
            if(prod) adicionarAoCarrinho(prod);
            select.value = ''; // Reseta
        }

        // Gerenciamento Interno do Carrinho
        function adicionarAoCarrinho(produto) {
            const itemExistente = carrinho.find(item => item.id === produto.id);
            if (itemExistente) {
                itemExistente.quantidade += 1;
            } else {
                carrinho.push({ ...produto, quantidade: 1 });
            }
            renderCarrinho();
        }

        function alterarQuantidade(id, delta) {
            const item = carrinho.find(i => i.id === id);
            if (item) {
                item.quantidade += delta;
                if(item.quantidade <= 0) {
                    carrinho = carrinho.filter(i => i.id !== id);
                }
                renderCarrinho();
            }
        }

        function removerDoCarrinho(id) {
            carrinho = carrinho.filter(i => i.id !== id);
            renderCarrinho();
        }

        function renderCarrinho() {
            const tbody = document.getElementById('carrinho-corpo');
            const vazio = document.getElementById('carrinho-vazio');
            
            document.getElementById('dash-itens-carrinho').innerText = carrinho.reduce((acc, curr) => acc + curr.quantidade, 0);

            if(carrinho.length === 0) {
                tbody.innerHTML = '';
                vazio.classList.remove('hidden');
                recalcularTotais();
                return;
            }
            
            vazio.classList.add('hidden');
            tbody.innerHTML = carrinho.map(item => {
                const sub = item.preco_venda * item.quantidade;
                const cod = item.codigo_barras ? `[${item.codigo_barras}]` : '(Sem código)';
                return `
                <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td class="p-3">
                        <div class="font-bold text-slate-700">${item.nome}</div>
                        <span class="text-xs text-slate-400 font-mono">${cod}</span>
                    </td>
                    <td class="p-3">
                        <div class="flex items-center justify-center gap-1">
                            <button onclick="alterarQuantidade('${item.id}', -1)" class="bg-slate-200 text-slate-700 px-2 py-1 rounded hover:bg-slate-300 font-bold text-xs">-</button>
                            <span class="font-bold px-2 text-slate-800">${item.quantidade}</span>
                            <button onclick="alterarQuantidade('${item.id}', 1)" class="bg-slate-200 text-slate-700 px-2 py-1 rounded hover:bg-slate-300 font-bold text-xs">+</button>
                        </div>
                    </td>
                    <td class="p-3 text-right font-medium text-slate-600">R$ ${parseFloat(item.preco_venda).toFixed(2)}</td>
                    <td class="p-3 text-right font-bold text-slate-800">R$ ${sub.toFixed(2)}</td>
                    <td class="p-3 text-center">
                        <button onclick="removerDoCarrinho('${item.id}')" class="text-red-500 hover:text-red-700 text-base"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>`;
            }).join('');

            recalcularTotais();
        }

        function recalcularTotais() {
            const subtotal = carrinho.reduce((acc, item) => acc + (item.preco_venda * item.quantidade), 0);
            const desconto = parseFloat(document.getElementById('pdv-desconto').value) || 0;
            const total = Math.max(0, subtotal - desconto);

            document.getElementById('resumo-subtotal').innerText = `R$ ${subtotal.toFixed(2)}`;
            document.getElementById('resumo-desconto').innerText = `- R$ ${desconto.toFixed(2)}`;
            document.getElementById('resumo-total').innerText = `R$ ${total.toFixed(2)}`;
        }

        // SALVAR VENDA COMPLETA (Lança no PDV e espelha no Financeiro)
        async function finalizarVendaPDV() {
            if (carrinho.length === 0) return alert("Adicione ao menos um produto no carrinho para vender!");
            
            const totalFinal = Math.max(0, carrinho.reduce((acc, item) => acc + (item.preco_venda * item.quantidade), 0) - (parseFloat(document.getElementById('pdv-desconto').value) || 0));
            const clienteId = document.getElementById('pdv-cliente').value;
            const formaPagto = document.getElementById('pdv-forma-pagamento').value;
            const desconto = parseFloat(document.getElementById('pdv-desconto').value) || 0;

            if (confirm(`Deseja confirmar o recebimento e finalizar esta venda no valor de R$ ${totalFinal.toFixed(2)}?`)) {
                try {
                    // 1. Registra no módulo de Vendas (Cabeçalho do Pedido)
                    const { data: venda, error: errVenda } = await _supabase.from('vendas').insert([{
                        entidade_id: clienteId || null,
                        valor_total: totalFinal,
                        desconto: desconto,
                        forma_pagamento: formaPagto,
                        status: 'concluida'
                    }]).select().single();

                    if(errVenda) throw errVenda;

                    // 2. Registra os Itens vinculados à venda
                    const insertItens = carrinho.map(item => ({
                        venda_id: venda.id,
                        produto_id: item.id,
                        quantidade: item.quantidade,
                        preco_unitario: item.preco_venda,
                        subtotal: item.preco_venda * item.quantidade
                    }));

                    const { error: errItens } = await _supabase.from('itens_venda').insert(insertItens);
                    if(errItens) throw errItens;

                    // 3. REGISTRA NO FINANCEIRO (Como Receita Concluída)
                    const { data: fin, error: errFin } = await _supabase.from('financas').insert([{
                        entidade_id: clienteId || null,
                        descricao: `Venda PDV - Cupom #${venda.id.substring(0,8)} (${formaPagto})`,
                        valor_total: totalFinal,
                        tipo: 'receita',
                        num_parcelas: 1,
                        categoria: 'Vendas',
                        status_lancamento: 'finalizado'
                    }]).select().single();

                    if(errFin) throw errFin;

                    // 4. Cria parcela de quitação automática para não quebrar fluxo do Financeiro
                    await _supabase.from('parcelas').insert([{
                        financa_id: fin.id,
                        num_parcela: 1,
                        valor_parcela: totalFinal,
                        data_vencimento: new Date().toISOString().split('T')[0],
                        data_pagamento: new Date().toISOString().split('T')[0],
                        status: 'pago'
                    }]);

                    alert("Venda registrada e integrada ao financeiro com sucesso!");
                    carrinho = [];
                    document.getElementById('pdv-desconto').value = '0.00';
                    renderCarrinho();
                    init(); // Atualiza estoque do cache e dashboards

                } catch (error) {
                    alert("Erro no processo de venda: " + error.message);
                }
            }
        }

        // SALVAR SANGRIA DE CAIXA (Lança no Financeiro como Despesa)
        async function salvarSangria() {
            const valor = parseFloat(document.getElementById('sangria-valor').value);
            const motivo = document.getElementById('sangria-motivo').value.trim();

            if(isNaN(valor) || valor <= 0 || !motivo) {
                return alert("Por favor, preencha o valor correto e a justificativa da sangria.");
            }

            if (confirm(`Confirma a retirada/sangria física de R$ ${valor.toFixed(2)} do caixa?`)) {
                try {
                    // Registra a saída diretamente no financeiro (Tipo despesa)
                    const { data: fin, error: errFin } = await _supabase.from('financas').insert([{
                        descricao: `Sangria Caixa: ${motivo}`,
                        valor_total: valor,
                        tipo: 'despesa',
                        num_parcelas: 1,
                        categoria: 'Sangria',
                        status_lancamento: 'finalizado'
                    }]).select().single();

                    if(errFin) throw errFin;

                    // Vincula a parcela como Paga (Saída de dinheiro imediata)
                    await _supabase.from('parcelas').insert([{
                        financa_id: fin.id,
                        num_parcela: 1,
                        valor_parcela: valor,
                        data_vencimento: new Date().toISOString().split('T')[0],
                        data_pagamento: new Date().toISOString().split('T')[0],
                        status: 'pago'
                    }]);

                    alert("Sangria registrada como saída financeira!");
                    document.getElementById('sangria-valor').value = '';
                    document.getElementById('sangria-motivo').value = '';
                    
                    await loadDashboardPDV();
                    await loadHistoricoCaixa();

                } catch (error) {
                    alert("Erro ao salvar sangria: " + error.message);
                }
            }
        }

        // Atualização dos Indicadores de hoje superiores
        async function loadDashboardPDV() {
            const hoje = new Date().toISOString().split('T')[0];
            
            // Busca finanças do dia atual para vendas e sangrias
            const { data: finDia } = await _supabase.from('financas')
                .select('*')
                .gte('created_at', `${hoje}T00:00:00Z`);

            let totalVendas = 0;
            let totalSangrias = 0;

            if(finDia) {
                finDia.forEach(f => {
                    if (f.categoria === 'Vendas' && f.tipo === 'receita') totalVendas += parseFloat(f.valor_total || 0);
                    if (f.categoria === 'Sangria' && f.tipo === 'despesa') totalSangrias += parseFloat(f.valor_total || 0);
                });
            }

            document.getElementById('dash-vendas-hoje').innerText = `R$ ${totalVendas.toFixed(2)}`;
            document.getElementById('dash-sangrias-hoje').innerText = `R$ ${totalSangrias.toFixed(2)}`;
        }

        // Carrega o histórico da tabela de fluxo na aba 2
        async function loadHistoricoCaixa() {
            const hoje = new Date().toISOString().split('T')[0];
            const { data } = await _supabase.from('financas')
                .select('*')
                .or("categoria.eq.Vendas,categoria.eq.Sangria")
                .gte('created_at', `${hoje}T00:00:00Z`)
                .order('created_at', { ascending: false });

            const tbody = document.getElementById('lista-fluxo-caixa');
            if(!data || data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="p-4 text-center text-slate-400">Nenhuma transação efetuada hoje.</td></tr>';
                return;
            }

            tbody.innerHTML = data.map(f => {
                const hora = new Date(f.created_at).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
                const statusClass = f.tipo === 'receita' ? 'status-receita' : 'status-despesa';
                const statusTxt = f.tipo === 'receita' ? 'ENTRADA' : 'SANGRIA / SAÍDA';
                const corValor = f.tipo === 'receita' ? 'text-emerald-600' : 'text-red-600';

                return `
                <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td class="p-3 font-medium text-slate-500">${hora}</td>
                    <td class="p-3 font-bold text-slate-700">${f.descricao}</td>
                    <td class="p-3 text-slate-500">${f.categoria}</td>
                    <td class="p-3 text-center"><span class="${statusClass}">${statusTxt}</span></td>
                    <td class="p-3 text-right font-extrabold ${corValor}">R$ ${parseFloat(f.valor_total).toFixed(2)}</td>
                </tr>`;
            }).join('');
        }

