
        const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
        let html5QrCode = null;

        function abrirMenu() {
            document.getElementById('sidebar-menu').classList.remove('-translate-x-full');
            document.getElementById('menu-overlay').classList.remove('hidden');
        }

        function fecharMenu() {
            document.getElementById('sidebar-menu').classList.add('-translate-x-full');
            document.getElementById('menu-overlay').classList.add('hidden');
        }

        function alternarAba(abaAtiva) {
            const form = document.getElementById('aba-formulario');
            const lista = document.getElementById('aba-listagem');
            const btnForm = document.getElementById('btn-aba-formulario');
            const btnLista = document.getElementById('btn-aba-listagem');

            const classesVerde = ['bg-emerald-500', 'text-white', 'hover:bg-emerald-600'];
            const classesCinza = ['bg-slate-200', 'text-slate-700', 'hover:bg-slate-300'];

            btnForm.classList.remove(...classesVerde, ...classesCinza);
            btnLista.classList.remove(...classesVerde, ...classesCinza);

            if (abaAtiva === 'formulario') {
                form.classList.remove('hidden');
                lista.classList.add('hidden');
                btnForm.classList.add(...classesVerde);
                btnLista.classList.add(...classesCinza);
            } else {
                form.classList.add('hidden');
                lista.classList.remove('hidden');
                btnLista.classList.add(...classesVerde);
                btnForm.classList.add(...classesCinza);
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

            btn.innerText = 'Autenticando...';
            btn.disabled = true;

            const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
            
            if (error) {
                alert("Erro ao fazer login: Verifique seu e-mail e senha.");
                btn.innerText = 'Entrar no Sistema';
                btn.disabled = false;
            } else {
                document.getElementById('login-email').value = '';
                document.getElementById('login-senha').value = '';
                btn.innerText = 'Entrar no Sistema';
                btn.disabled = false;
                verificar_login(); 
            }
        }

        async function sairDaConta() {
            await _supabase.auth.signOut();
            document.getElementById('lista-produtos').innerHTML = '';
            fecharMenu();
            verificar_login();
        }

        document.addEventListener('DOMContentLoaded', () => {
            verificar_login();
            configurarDropZone('drop-foto', 'f-foto', 'nome-foto');
        });

        async function init() {
            loadCategoriasUnicas();
            loadDashboard();
            loadProdutos();
        }

        function configurarDropZone(dropId, inputId, txtId) {
            const dropZone = document.getElementById(dropId);
            const inputElement = document.getElementById(inputId);

            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('dragover');
            });

            dropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
                
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    inputElement.files = e.dataTransfer.files;
                    mostrarNomeArquivo(inputElement, txtId);
                }
            });
        }

        function mostrarNomeArquivo(input, idCampoTexto) {
            const campoTexto = document.getElementById(idCampoTexto);
            if (input.files && input.files.length > 0) {
                campoTexto.innerHTML = `<i class="fas fa-check"></i> ${input.files[0].name}`;
            } else {
                campoTexto.innerHTML = '';
            }
        }

async function loadCategoriasUnicas() {
            const { data } = await _supabase.from('produtos').select('categoria');
            if (!data) return;
            
            const categorias = [...new Set(data.map(item => item.categoria).filter(c => c))];
            
            const datalist = document.getElementById('lista-categorias');
            const selectFiltro = document.getElementById('filtro-categoria');
            
            datalist.innerHTML = '';
            selectFiltro.innerHTML = '<option value="">Todas</option>';
            
            categorias.forEach(cat => {
                datalist.innerHTML += `<option value="${cat}">`;
                selectFiltro.innerHTML += `<option value="${cat}">${cat}</option>`;
            });
        }

        function iniciarLeituraCamera() {
            const container = document.getElementById('camera-container');
            container.classList.remove('hidden');
            html5QrCode = new Html5Qrcode("camera-preview");
            const config = { fps: 10, qrbox: { width: 300, height: 150 } };
            html5QrCode.start({ facingMode: "environment" }, config, (decodedText) => {
                document.getElementById('f-barras').value = decodedText;
                pararCamera();
            }).catch(() => { alert("Verifique as permissões da câmera."); container.classList.add('hidden'); });
        }

        function pararCamera() {
            if (html5QrCode) {
                html5QrCode.stop().then(() => { document.getElementById('camera-container').classList.add('hidden'); });
            } else { document.getElementById('camera-container').classList.add('hidden'); }
        }

        // LÓGICA NOVA: FUNÇÃO QUE PROCESSA O ARQUIVO XML
        async function processarXML(input) {
            const file = input.files[0];
            if (!file) return;

            // Muda o estado do botão para mostrar que está carregando
            const btnImport = document.getElementById('btn-importar-xml');
            const textoOriginalBtn = btnImport.innerHTML;
            btnImport.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Lendo XML...';
            btnImport.disabled = true;

            const reader = new FileReader();
            reader.onload = async function(e) {
                try {
                    const text = e.target.result;
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(text, "text/xml");

                    // A NF-e guarda os produtos dentro da tag <det>
                    const itens = xmlDoc.getElementsByTagName("det");
                    
                    if (itens.length === 0) {
                        alert("Nenhum produto encontrado neste arquivo XML.");
                        return;
                    }

                    let novosCadastrados = 0;
                    let estoquesAtualizados = 0;

                    // Percorre todos os produtos do XML
                    for (let i = 0; i < itens.length; i++) {
                        const det = itens[i];
                        const prod = det.getElementsByTagName("prod")[0];

                        if (!prod) continue;

                        // Extraindo os dados das tags do XML
                        const nomeXML = prod.getElementsByTagName("xProd")[0]?.textContent || "";
                        let eanXML = prod.getElementsByTagName("cEAN")[0]?.textContent || "";
                        if (eanXML === "SEM GTIN") eanXML = null; // Trata os itens que vêm sem código de barras

                        const precoCustoXML = parseFloat(prod.getElementsByTagName("vUnCom")[0]?.textContent || 0);
                        const quantidadeXML = parseInt(parseFloat(prod.getElementsByTagName("qCom")[0]?.textContent || 0));
                        
                        const ncmXML = prod.getElementsByTagName("NCM")[0]?.textContent || null;
                        const cestXML = prod.getElementsByTagName("CEST")[0]?.textContent || null;
                        const unidadeXML = prod.getElementsByTagName("uCom")[0]?.textContent || null;
                        const cfopXML = prod.getElementsByTagName("CFOP")[0]?.textContent || null;

                        // Passo 1: Vamos buscar no banco se o produto já existe usando o código de barras
                        let query = _supabase.from('produtos').select('*');
                        
                        if (eanXML) {
                            query = query.eq('codigo_barras', eanXML);
                        } else {
                            query = query.eq('nome', nomeXML); // Se não tiver barras, tenta pelo nome exato
                        }

                        const { data: prodExistente, error: errBusca } = await query.maybeSingle();

                        if (prodExistente) {
                            // Produto JÁ EXISTE: Vamos apenas somar o estoque e atualizar o preço de custo novo
                            const estoqueSomado = parseInt(prodExistente.quantidade_estoque || 0) + quantidadeXML;
                            
                            await _supabase.from('produtos').update({
                                quantidade_estoque: estoqueSomado,
                                preco_custo: precoCustoXML
                            }).eq('id', prodExistente.id);
                            
                            estoquesAtualizados++;
                        } else {
                            // Produto NÃO EXISTE: Vamos cadastrar um novinho!
                            await _supabase.from('produtos').insert([{
                                nome: nomeXML,
                                codigo_barras: eanXML,
                                preco_custo: precoCustoXML,
                                // Colocamos uma margem inicial automática de 30% em cima do custo como sugestão
                                preco_venda: precoCustoXML * 1.30, 
                                quantidade_estoque: quantidadeXML,
                                estoque_minimo: 5,
                                categoria: 'Geral', // Você pode organizar depois
                                ncm: ncmXML,
                                cest: cestXML,
                                unidade_medida: unidadeXML,
                                cfop_entrada: cfopXML
                            }]);
                            
                            novosCadastrados++;
                        }
                    }

                    alert(`NF-e Importada com sucesso!\n✅ Novos produtos cadastrados: ${novosCadastrados}\n🔄 Produtos com estoque atualizado: ${estoquesAtualizados}`);
                    
                    // Limpa o input file e atualiza a tela
                    input.value = ""; 
                    loadProdutos();
                    loadDashboard();

                } catch (err) {
                    console.error(err);
                    alert("Ocorreu um erro ao processar o XML: " + err.message);
                } finally {
                    // Restaura o botão
                    btnImport.innerHTML = textoOriginalBtn;
                    btnImport.disabled = false;
                }
            };
            
            // Lê o arquivo como texto para que o DOMParser consiga interpretar o XML
            reader.readAsText(file);
        }

async function loadDashboard() {
            const { data: produtos } = await _supabase.from('produtos').select('*');
            if(!produtos) return;
            
            let totalCadastrados = produtos.length;
            let estoqueBaixo = 0;
            let totalItens = 0;

            produtos.forEach(p => {
                let estoque = parseInt(p.quantidade_estoque || 0);
                let minimo = parseInt(p.estoque_minimo || 0);
                totalItens += estoque;
                if(estoque <= minimo) estoqueBaixo++;
            });

            document.getElementById('dash-total-produtos').innerText = totalCadastrados;
            document.getElementById('dash-estoque-baixo').innerText = estoqueBaixo;
            document.getElementById('dash-total-itens').innerText = totalItens;
        }

        async function salvarProdutoCompleto() {
            const btn = document.getElementById('btn-salvar');
            btn.disabled = true; btn.innerText = 'Salvando...';

            try {
                const nome = document.getElementById('f-nome').value;
                const categoria = document.getElementById('f-categoria').value || 'Geral';
                const estoqueMinimo = parseInt(document.getElementById('f-estoque-minimo').value) || 0;
                const precoCusto = parseFloat(document.getElementById('f-custo').value) || 0;
                const precoVenda = parseFloat(document.getElementById('f-venda').value);
                const quantidade = parseInt(document.getElementById('f-quantidade').value) || 0;
                const descricao = document.getElementById('f-descricao').value;
                const barras = document.getElementById('f-barras').value;
                const fileFoto = document.getElementById('f-foto').files[0];
                const editandoId = document.getElementById('f-editando-id').value;

                if(!nome || isNaN(precoVenda)) throw new Error("Preencha o Nome e o Preço de Venda do produto!");

                let fotoUrl = null;
                if (fileFoto) {
                    const fileName = `prod_${Date.now()}_${fileFoto.name}`;
                    const { error } = await _supabase.storage.from('comprovantes').upload(`public/${fileName}`, fileFoto);
                    if(!error) fotoUrl = _supabase.storage.from('comprovantes').getPublicUrl(`public/${fileName}`).data.publicUrl;
                }

                const dadosProduto = {
                    nome, categoria, estoque_minimo: estoqueMinimo, preco_custo: precoCusto,
                    preco_venda: precoVenda, quantidade_estoque: quantidade, descricao, codigo_barras: barras || null
                };

                if (fotoUrl) dadosProduto.foto_url = fotoUrl;

                if (editandoId) {
                    const { error } = await _supabase.from('produtos').update(dadosProduto).eq('id', editandoId);
                    if (error) throw error;
                    alert("Produto atualizado com sucesso!");
                } else {
                    const { error } = await _supabase.from('produtos').insert([dadosProduto]);
                    if (error) throw error;
                    alert("Produto cadastrado com sucesso!");
                }
                
                cancelarEdicao();
                loadProdutos();
                loadDashboard();
                alternarAba('listagem');
            } catch (error) {
                alert(error.message);
            } finally {
                btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Gravar Produto';
            }
        }

        function limparFiltros() {
            document.getElementById('filtro-busca').value = '';
            document.getElementById('filtro-categoria').value = '';
            loadProdutos();
        }

        async function loadProdutos() {
            const busca = document.getElementById('filtro-busca').value;
            const categoria = document.getElementById('filtro-categoria').value;

            let query = _supabase.from('produtos').select('*').order('nome', { ascending: true });

            if (busca) {
                query = query.or(`nome.ilike.%${busca}%,codigo_barras.ilike.%${busca}%`);
            }
            if (categoria) query = query.eq('categoria', categoria);

            const { data, error } = await query;
            if (error) return;
            
            const tbody = document.getElementById('lista-produtos');

            tbody.innerHTML = data.map(p => {
                let estoque = parseInt(p.quantidade_estoque || 0);
                let minimo = parseInt(p.estoque_minimo || 0);
                
                let statusClass = 'status-pago';
                let statusTxt = 'EM ESTOQUE';
                
                if (estoque === 0) {
                    statusClass = 'status-atrasado';
                    statusTxt = 'ZERADO';
                } else if (estoque <= minimo) {
                    statusClass = 'status-pendente';
                    statusTxt = 'ESTOQUE BAIXO';
                }

                const imgHtml = p.foto_url ? `<img src="${p.foto_url}" class="w-10 h-10 object-cover rounded shadow-sm inline-block mr-2">` : `<div class="w-10 h-10 bg-slate-200 rounded flex items-center justify-center text-slate-400 inline-block mr-2 text-xs"><i class="fas fa-box"></i></div>`;
                const codBarras = p.codigo_barras ? `<span class="text-xs font-mono text-slate-400 block"><i class="fas fa-barcode"></i> ${p.codigo_barras}</span>` : '<span class="text-xs text-slate-300 block">Sem código</span>';

                return `
                <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td class="p-3 text-center">
                        <input type="checkbox" class="check-parcela" value="${p.id}">
                    </td>
                    <td class="p-3 flex items-center">
                        ${imgHtml}
                        <div>${codBarras}</div>
                    </td>
                    <td class="p-3">
                        <div class="font-bold text-slate-700">${p.nome}</div>
                        <span class="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">${p.categoria || 'Geral'}</span>
                    </td>
                    <td class="p-3 font-bold text-slate-600">R$ ${parseFloat(p.preco_custo || 0).toFixed(2)}</td>
                    <td class="p-3 font-bold text-emerald-600">R$ ${parseFloat(p.preco_venda || 0).toFixed(2)}</td>
                    <td class="p-3 font-bold text-center text-slate-700">${estoque} <span class="text-xs text-slate-400 font-normal block">mín: ${minimo}</span></td>
                    <td class="p-3 text-center"><span class="${statusClass}">${statusTxt}</span></td>
                    <td class="p-3 text-center">
                        <button onclick="prepararEdicao('${p.id}')" class="bg-blue-100 text-blue-600 px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition text-sm">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                    </td>
                </tr>`;
            }).join('');
        }

        async function prepararEdicao(id) {
            const { data: p } = await _supabase.from('produtos').select('*').eq('id', id).single();
            if (p) {
                document.getElementById('f-editando-id').value = p.id;
                document.getElementById('f-nome').value = p.nome;
                document.getElementById('f-categoria').value = p.categoria || 'Geral';
                document.getElementById('f-estoque-minimo').value = p.estoque_minimo;
                document.getElementById('f-custo').value = p.preco_custo;
                document.getElementById('f-venda').value = p.preco_venda;
                document.getElementById('f-quantidade').value = p.quantidade_estoque;
                document.getElementById('f-descricao').value = p.descricao || '';
                document.getElementById('f-barras').value = p.codigo_barras || '';
                
                document.getElementById('btn-salvar').innerHTML = '<i class="fas fa-sync-alt"></i> Atualizar Produto';
                document.getElementById('btn-cancelar').classList.remove('hidden');
                
                alternarAba('formulario');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        function cancelarEdicao() {
            document.getElementById('f-editando-id').value = '';
            document.getElementById('btn-salvar').innerHTML = '<i class="fas fa-save"></i> Gravar Produto';
            document.getElementById('btn-cancelar').classList.add('hidden');
            
            document.getElementById('f-nome').value = '';
            document.getElementById('f-categoria').value = 'Geral';
            document.getElementById('f-estoque-minimo').value = '5';
            document.getElementById('f-custo').value = '0.00';
            document.getElementById('f-venda').value = '';
            document.getElementById('f-quantidade').value = '0';
            document.getElementById('f-descricao').value = '';
            document.getElementById('f-barras').value = '';
            document.getElementById('f-foto').value = '';
            document.getElementById('nome-foto').innerHTML = '';
        }

        function toggleTodosChecks(source) {
            const checkboxes = document.querySelectorAll('.check-parcela');
            checkboxes.forEach(cb => cb.checked = source.checked);
        }

        async function excluirSelecionados() {
            const selecionados = Array.from(document.querySelectorAll('.check-parcela:checked')).map(cb => cb.value);
            if (selecionados.length === 0) return alert("Selecione ao menos um produto para excluir.");

            if (confirm(`Atenção: Deseja realmente excluir ${selecionados.length} produto(s)?`)) {
                const { error } = await _supabase.from('produtos').delete().in('id', selecionados);
                if (!error) {
                    alert('Excluído com sucesso!');
                    loadProdutos();
                    loadDashboard();
                } else {
                    alert('Erro ao excluir: ' + error.message);
                }
            }
        }

