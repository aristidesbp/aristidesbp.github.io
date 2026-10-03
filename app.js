/*🟥
APP.JS - SINGLE PAGE APPLICATION (SPA) COM ROTEAMENTO DE MÓDULOS (V3 - ERP 10K)
🟥*/

/*🟥 PARTE 1: CONSOLE ESPELHO E CONFIGURAÇÃO 🟥*/ 
const consoleContainer = document.createElement('div');
consoleContainer.style.cssText = `position: fixed; bottom: 60px; left: 10px; right: 10px; height: 300px; background: rgba(0, 0, 0, 0.9); color: #00ff00; font-family: monospace; font-size: 12px; padding: 10px; overflow-y: scroll; z-index: 9999; display: none; border-radius: 5px; box-shadow: 0px -2px 10px rgba(0,0,0,0.5);`;
const toggleBtn = document.createElement('button');
toggleBtn.textContent = '🛠️ Console';
toggleBtn.style.cssText = `position: fixed; bottom: 10px; right: 10px; padding: 10px 15px; background: #2980b9; color: white; border: none; border-radius: 5px; font-weight: bold; z-index: 10000; box-shadow: 0px 2px 5px rgba(0,0,0,0.3);`;
document.body.appendChild(consoleContainer);
document.body.appendChild(toggleBtn);
toggleBtn.addEventListener('click', () => { consoleContainer.style.display = consoleContainer.style.display === 'none' ? 'block' : 'none'; });

const originalLog = console.log;
const originalError = console.error;
function espelharNoEcra(tipo, cor, argumentos) {
    const linha = document.createElement('div');
    linha.style.color = cor; linha.style.marginBottom = '5px'; linha.style.borderBottom = '1px solid #333';
    const textoMensagem = Array.from(argumentos).map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg).join(' ');
    linha.textContent = `[${tipo}] ${textoMensagem}`;
    consoleContainer.appendChild(linha);
    consoleContainer.scrollTop = consoleContainer.scrollHeight;
}
console.log = function(...args) { originalLog.apply(console, args); espelharNoEcra('LOG', '#00ff00', args); };
console.error = function(...args) { originalError.apply(console, args); espelharNoEcra('ERRO', '#ff4444', args); };

// Configuração Supabase
const SUPABASE_URL = 'https://gxbderrxvplxzwvantkn.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4YmRlcnJ4dnBseHp3dmFudGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMTA2MjcsImV4cCI6MjEwNTc4NjYyN30.3YbSndiN-OBFZcOish7MWOu9sO6byPsWDQV74_XbjC4';
let clienteSupabase;
if (typeof supabase !== 'undefined') {
    clienteSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

/*🟥 PARTE 2 e 3: GESTOR DE ROTAS E LOGIN 🟥*/ 
const appRoot = document.getElementById('app-root');

async function iniciarApp() {
    const { data: { session } } = await clienteSupabase.auth.getSession();
    if (session) desenharMenuPrincipal(session.user.email);
    else desenharLogin();
}

function desenharLogin() {
    appRoot.innerHTML = `
        <div class="card">
            <div class="titulo">⚡ Acesso ao ERP</div>
            <div id="area-login">
                <label>E-mail</label><input type="email" id="login-email" placeholder="seu@email.com">
                <label>Senha</label><input type="password" id="login-senha" placeholder="••••••••">
                <button id="btn-entrar" class="btn-neon">Entrar</button>
                <button id="btn-ir-registo" class="btn-secundario">Criar Nova Conta</button>
            </div>
            <div id="area-registo" style="display: none;">
                <label>Novo E-mail</label><input type="email" id="reg-email" placeholder="novo@email.com">
                <label>Criar Senha</label><input type="password" id="reg-senha" placeholder="Mínimo 6 caracteres">
                <button id="btn-registar" class="btn-neon">Concluir Registo</button>
                <button id="btn-voltar-login" class="btn-secundario">Voltar ao Login</button>
            </div>
        </div>
    `;

    document.getElementById('btn-ir-registo').onclick = () => { document.getElementById('area-login').style.display = 'none'; document.getElementById('area-registo').style.display = 'block'; };
    document.getElementById('btn-voltar-login').onclick = () => { document.getElementById('area-registo').style.display = 'none'; document.getElementById('area-login').style.display = 'block'; };

    document.getElementById('btn-entrar').onclick = async () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-senha').value;
        if(!email || !password) return alert("Preencha todos os campos.");
        const { error } = await clienteSupabase.auth.signInWithPassword({ email, password });
        if (error) alert("Erro: " + error.message);
        else iniciarApp(); 
    };

    document.getElementById('btn-registar').onclick = async () => {
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-senha').value;
        if(!email || !password) return alert("Preencha todos os campos.");
        const { error } = await clienteSupabase.auth.signUp({ email, password });
        if (error) alert("Erro: " + error.message);
        else { alert("Conta criada! Pode fazer login."); document.getElementById('btn-voltar-login').click(); }
    };
}

/*🟥 PARTE 4: ECRÃ DO MENU PRINCIPAL (CENTRO DE COMANDO ERP 10K) 🟥*/ 
function desenharMenuPrincipal(emailDoOperador) {
    appRoot.innerHTML = `
        <header>
            <div class="logo-area">
                <span class="logo-icon">⚡</span> 
                <div>
                    <div>ERP Supermercado</div>
                    <div style="font-size: 0.7em; color: var(--text-muted); font-weight: normal;">${emailDoOperador}</div>
                </div>
            </div>
            <div class="header-actions">
                <button id="btn-tema" class="icon-btn" title="Alterar Tema">🌓</button>
                <button id="btn-sair" class="icon-btn" title="Sair do Sistema" style="color: var(--danger-color);">🚪</button>
            </div>
        </header>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 15px;">
            <!-- Módulos Ativos -->
            <div class="card" id="card-produtos" style="text-align: center; cursor: pointer; padding: 20px;">
                <div style="font-size: 3em; margin-bottom: 10px;">📦</div>
                <h3 style="color: var(--accent-neon); margin: 0 0 5px 0;">Catálogo</h3>
                <p style="font-size: 0.8em; color: var(--text-muted); margin: 0;">Produtos e Balança</p>
            </div>

            <div class="card" id="card-entidades" style="text-align: center; cursor: pointer; padding: 20px;">
                <div style="font-size: 3em; margin-bottom: 10px;">🏢</div>
                <h3 style="color: var(--accent-neon); margin: 0 0 5px 0;">Entidades</h3>
                <p style="font-size: 0.8em; color: var(--text-muted); margin: 0;">Pessoas e Fidelidade</p>
            </div>

            <!-- Módulos da Próxima Fase -->
            <div class="card disabled" onclick="mostrarToast('Módulo PDV em desenvolvimento!', 'info')" style="text-align: center; padding: 20px;">
                <div style="font-size: 3em; margin-bottom: 10px;">🛒</div>
                <h3 style="color: var(--text-main); margin: 0 0 5px 0;">Frente de Caixa</h3>
                <p style="font-size: 0.8em; color: var(--text-muted); margin: 0;">Vendas e Turnos</p>
            </div>

            <div class="card disabled" onclick="mostrarToast('Módulo Financeiro em desenvolvimento!', 'info')" style="text-align: center; padding: 20px;">
                <div style="font-size: 3em; margin-bottom: 10px;">💰</div>
                <h3 style="color: var(--text-main); margin: 0 0 5px 0;">Financeiro</h3>
                <p style="font-size: 0.8em; color: var(--text-muted); margin: 0;">Fiado e Relatórios</p>
            </div>
            
            <div class="card disabled" onclick="mostrarToast('Módulo de Entregas em desenvolvimento!', 'info')" style="text-align: center; padding: 20px;">
                <div style="font-size: 3em; margin-bottom: 10px;">🚚</div>
                <h3 style="color: var(--text-main); margin: 0 0 5px 0;">Logística</h3>
                <p style="font-size: 0.8em; color: var(--text-muted); margin: 0;">Gestão de Frota</p>
            </div>
        </div>
        
        <div id="toast-container" style="position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;"></div>
    `;

    document.getElementById('btn-tema').onclick = () => document.body.classList.toggle('light-theme');
    document.getElementById('btn-sair').onclick = async () => {
        if(confirm("Deseja encerrar a sessão?")) { await clienteSupabase.auth.signOut(); iniciarApp(); }
    };

    document.getElementById('card-produtos').onclick = () => desenharModuloProdutos(emailDoOperador);
    document.getElementById('card-entidades').onclick = () => desenharModuloEntidades(emailDoOperador);
}

/*🟥 PARTE 5: MÓDULO DE PRODUTOS 🟥*/
const estadoProdutos = { exibindoLixeira: false, arquivoParaUpload: null, idEmEdicao: null };

function desenharModuloProdutos(emailDoOperador) {
    appRoot.innerHTML = `
        <header>
            <div class="logo-area">
                <button id="btn-voltar-menu" class="icon-btn" style="margin-right: 10px;">⬅️</button>
                <div><div>📦 Catálogo</div><div style="font-size: 0.7em; color: var(--text-muted); font-weight: normal;">${emailDoOperador}</div></div>
            </div>
        </header>

        <div class="tabs-menu">
            <button id="aba-btn-cadastro" class="tab-btn active">📝 Formulário</button>
            <button id="aba-btn-lista" class="tab-btn">🛒 Inventário</button>
        </div>

        <div id="aba-conteudo-cadastro" class="tab-content active card">
            <h2 id="titulo-formulario" class="titulo">Cadastrar Novo Produto</h2>
            
            <label style="border-bottom: 1px solid var(--border-color); padding-bottom: 5px; margin-bottom: 10px; color: var(--accent-neon); display: block;">📸 Imagem do Produto</label>
            <div style="text-align: center; margin-bottom: 15px;"><img id="img-preview" src="https://via.placeholder.com/200?text=Sem+Foto" style="max-width: 200px; max-height: 200px; border-radius: 8px; border: 2px dashed var(--border-color); object-fit: cover;"></div>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <label for="prod-imagem-camera" class="btn-neon" style="text-align: center; flex: 1; cursor: pointer; margin-bottom: 0;">📷 Câmera</label>
                <input type="file" id="prod-imagem-camera" accept="image/*" capture="environment" style="display: none;">
                <label for="prod-imagem-galeria" class="btn-secundario" style="text-align: center; flex: 1; cursor: pointer; margin-bottom: 0;">📁 Galeria</label>
                <input type="file" id="prod-imagem-galeria" accept="image/*" style="display: none;">
            </div>
            <p id="info-foto" style="font-size: 0.8em; color: var(--text-muted); text-align: center; margin-top: -10px; margin-bottom: 15px;">Nenhuma imagem selecionada</p>

            <label style="border-bottom: 1px solid var(--border-color); padding-bottom: 5px; margin-bottom: 10px; color: var(--accent-neon); display: block;">⚖️ Integração Balança e Códigos</label>
            <div style="display: flex; gap: 15px; align-items: center; margin-bottom: 15px; background: var(--bg-color); padding: 15px; border-radius: 8px; border: 1px solid var(--border-color); flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 10px; width: 100%;">
                    <input type="checkbox" id="prod-pesavel" style="width: 25px; height: 25px; margin: 0; cursor: pointer;">
                    <label for="prod-pesavel" style="margin: 0; cursor: pointer; font-size:1.1em; color: var(--accent-neon);">Vendido a Granel / Pesável?</label>
                </div>
                <div style="flex: 1; min-width: 150px;">
                    <label>Código Interno Balança (Ex: 0045)</label>
                    <input type="text" id="prod-codigo-balanca" placeholder="0000" style="margin: 0;" maxlength="6">
                </div>
            </div>

            <label>EAN (Código de Barras Industrial)</label>
            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <input type="text" id="prod-ean" placeholder="Ex: 7891025109884" style="margin-bottom: 0; flex: 1;">
                <button id="btn-scan-ean" class="btn-neon" style="width: auto; margin-bottom: 0; padding: 0 20px;">📷</button>
            </div>

            <label style="border-bottom: 1px solid var(--border-color); padding-bottom: 5px; margin-bottom: 10px; color: var(--accent-neon); display: block;">📦 Dados Gerais</label>
            <label>Nome do Produto *</label>
            <input type="text" id="prod-nome" placeholder="Ex: Picanha Fatiada">
            <label>Descrição</label>
            <textarea id="prod-descricao" rows="2" style="width: 100%; padding: 12px; margin-bottom: 15px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-main);"></textarea>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 15px;">
                <div><label>Preço Custo</label><input type="number" id="prod-custo" placeholder="0.00" step="0.01"></div>
                <div><label>Preço Venda *</label><input type="number" id="prod-preco" placeholder="0.00" step="0.01"></div>
                <div><label>Estoque Atual</label><input type="number" id="prod-estoque" value="0"></div>
                <div><label>Estoque Mín.</label><input type="number" id="prod-estoque-min" value="0"></div>
            </div>

            <button id="btn-salvar-produto" class="btn-neon" style="width: 100%; padding: 15px; margin-top: 15px; font-size: 1.1em;">💾 Salvar Produto</button>
            <button id="btn-cancelar-edicao" class="btn-secundario" style="width: 100%; padding: 15px; margin-top: 10px; display: none; font-size: 1.1em;">❌ Cancelar Edição</button>
        </div>

        <div id="aba-conteudo-lista" class="tab-content card">
            <div id="status-lixeira" style="background-color: #d1ecf1; color: #0c5460; padding: 10px; border-radius: 5px; font-weight: bold; margin-bottom: 15px; display: none;">Lixeira de Produtos 🗑️</div>
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 15px;">
                <h2 id="titulo-lista" style="margin: 0;">Inventário 📦</h2>
                <button id="btn-ver-lixeira" class="btn-secundario" style="width:auto;">👁️ Lixeira</button>
                <button id="btn-limpar-lixeira" style="display: none; background: #fd7e14; color: white; border: none; padding: 10px 15px; border-radius: 4px; font-weight: bold; cursor: pointer;">🧹 Esvaziar</button>
            </div>
            <div style="display: flex; gap: 5px; margin-bottom: 15px; width: 100%;">
                <input type="text" id="input-busca-lista" placeholder="🔍 Nome, EAN ou Balança..." style="flex-grow: 1; padding: 12px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-color); color: var(--text-main);">
                <button type="button" id="btn-buscar-lista" class="btn-neon" style="width: auto; margin-bottom: 0;">Buscar</button>
            </div>
            <div id="lista-produtos-dinamica"></div>
        </div>
        <div id="toast-container" style="position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;"></div>
    `;

    document.getElementById('btn-voltar-menu').onclick = () => desenharMenuPrincipal(emailDoOperador);
    document.getElementById('aba-btn-cadastro').onclick = () => alternarAba('cadastro');
    document.getElementById('aba-btn-lista').onclick = () => { alternarAba('lista'); carregarListagemProdutos(); };
    document.getElementById('btn-scan-ean').onclick = () => abrirLeitorCodigoBarras('prod-ean');

    const atualizarFoto = (e) => {
        if (e.target.files.length > 0) {
            estadoProdutos.arquivoParaUpload = e.target.files[0];
            document.getElementById('info-foto').textContent = '✅ ' + estadoProdutos.arquivoParaUpload.name;
            document.getElementById('img-preview').src = URL.createObjectURL(estadoProdutos.arquivoParaUpload);
        }
    };
    document.getElementById('prod-imagem-camera').addEventListener('change', atualizarFoto);
    document.getElementById('prod-imagem-galeria').addEventListener('change', atualizarFoto);

    document.getElementById('btn-salvar-produto').onclick = submeterFormularioProduto;
    document.getElementById('btn-cancelar-edicao').onclick = () => { limparFormularioProdutos(); alternarAba('lista'); };
}


async function carregarListagemProdutos() {
    const divLista = document.getElementById('lista-produtos-dinamica');
    if (!divLista) return;
    const termoBusca = document.getElementById('input-busca-lista') ? document.getElementById('input-busca-lista').value.trim() : '';
    divLista.innerHTML = '<p style="text-align:center; color:var(--text-muted);">A procurar...</p>';

    let query = clienteSupabase.from('produtos').select('*').order('created_at', { ascending: false });
    if (estadoProdutos.exibindoLixeira) query = query.not('deleted_at', 'is', null);
    else query = query.is('deleted_at', null);

    if (termoBusca) query = query.or(`nome.ilike.%${termoBusca}%,ean.ilike.%${termoBusca}%,codigo_balanca.ilike.%${termoBusca}%`);

    const { data, error } = await query;
    divLista.innerHTML = ''; 

    if (error) return divLista.innerHTML = '<p style="text-align:center; color:#dc3545;">Erro ao buscar dados.</p>';
    if (!data || data.length === 0) return divLista.innerHTML = '<p style="text-align:center; color:var(--text-muted);">Nenhum produto encontrado.</p>';

    const btnLimpar = document.getElementById('btn-limpar-lixeira');
    if(btnLimpar) btnLimpar.style.display = estadoProdutos.exibindoLixeira ? "inline-block" : "none";

    data.forEach(p => {
        const item = document.createElement('div');
        item.style.cssText = 'padding: 15px; border-bottom: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 12px;';

        const linhaInfo = document.createElement('div');
        linhaInfo.style.cssText = 'display: flex; align-items: center; gap: 12px; width: 100%;';

        const img = document.createElement('img');
        img.src = p.imagem_url ? p.imagem_url : 'https://via.placeholder.com/60?text=Sem+Foto';
        img.style.cssText = 'width: 60px; height: 60px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-color); flex-shrink: 0;';
        linhaInfo.appendChild(img);

        const divTextos = document.createElement('div');
        divTextos.style.cssText = 'flex-grow: 1; display: flex; flex-direction: column; justify-content: center; gap: 4px; overflow: hidden;';

        const divTopo = document.createElement('div');
        divTopo.style.cssText = 'display: flex; flex-wrap: wrap; gap: 6px; align-items: center;';
        
        const titulo = document.createElement('strong');
        titulo.textContent = p.nome;
        titulo.style.cssText = 'font-size: 1.05em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;';
        divTopo.appendChild(titulo);

        const badgeEstoque = document.createElement('span');
        badgeEstoque.textContent = p.is_pesavel ? `Est: ${p.estoque_atual} Kg` : `Est: ${p.estoque_atual}`;
        badgeEstoque.style.cssText = 'padding: 2px 6px; border-radius: 4px; font-size: 0.75em; color: white; font-weight: bold; background: ' + (p.estoque_atual <= p.estoque_minimo ? '#dc3545' : '#17a2b8');
        divTopo.appendChild(badgeEstoque);
        
        if(p.is_pesavel && p.codigo_balanca) {
            const badgeBalanca = document.createElement('span');
            badgeBalanca.textContent = `⚖️ Cód: ${p.codigo_balanca}`;
            badgeBalanca.style.cssText = 'padding: 2px 6px; border-radius: 4px; font-size: 0.75em; background: #6f42c1; color: white; font-weight: bold;';
            divTopo.appendChild(badgeBalanca);
        }

        divTextos.appendChild(divTopo);

        const spanPreco = document.createElement('span');
        spanPreco.textContent = `R$ ${parseFloat(p.preco || 0).toFixed(2)}${p.is_pesavel ? ' /Kg' : ''}`;
        spanPreco.style.cssText = 'color: var(--accent-neon); font-weight: bold; font-size: 1.1em;';
        divTextos.appendChild(spanPreco);

        linhaInfo.appendChild(divTextos);
        item.appendChild(linhaInfo);

        const linhaBotoes = document.createElement('div');
        linhaBotoes.style.cssText = 'display: flex; gap: 10px; width: 100%; margin-top: 4px;';
        
        if (estadoProdutos.exibindoLixeira) {
            const btnRestaurar = document.createElement('button');
            btnRestaurar.textContent = '♻️ Restaurar';
            btnRestaurar.style.cssText = 'flex: 1; background: #20c997; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer;';
            btnRestaurar.onclick = () => restaurarProduto(p.id);
            linhaBotoes.appendChild(btnRestaurar);
        } else {
            const btnEditar = document.createElement('button');
            btnEditar.textContent = '✏️ Editar';
            btnEditar.style.cssText = 'flex: 1; background: #ffc107; color: #212529; border: none; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer;';
            btnEditar.onclick = () => prepararEdicaoProduto(p);
            
            const btnDeletar = document.createElement('button');
            btnDeletar.textContent = '🗑️ Ocultar';
            btnDeletar.style.cssText = 'flex: 1; background: #dc3545; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer;';
            btnDeletar.onclick = () => deletarProduto(p.id);

            linhaBotoes.appendChild(btnEditar);
            linhaBotoes.appendChild(btnDeletar);
        }

        item.appendChild(linhaBotoes);
        divLista.appendChild(item);
    });
}

async function submeterFormularioProduto() {
    const nome = document.getElementById('prod-nome').value.trim();
    const preco = parseFloat(document.getElementById('prod-preco').value);
    const btnSalvar = document.getElementById('btn-salvar-produto');
    
    if(!nome || isNaN(preco)) return mostrarToast("Nome e Preço são obrigatórios!", "erro");
    
    btnSalvar.textContent = 'A processar...'; btnSalvar.disabled = true;

    try {
        let novaImagemUrl = null;
        if (estadoProdutos.arquivoParaUpload) {
            btnSalvar.textContent = "A enviar foto...";
            novaImagemUrl = await comprimirEUploadImagem(estadoProdutos.arquivoParaUpload, 'storage_produtos', 'prod_' + Date.now() + '.jpg');
        }

        const payload = {
            nome: nome,
            descricao: document.getElementById('prod-descricao').value.trim() || null,
            preco: preco,
            preco_custo: parseFloat(document.getElementById('prod-custo').value) || 0,
            estoque_atual: parseFloat(document.getElementById('prod-estoque').value) || 0,
            estoque_minimo: parseFloat(document.getElementById('prod-estoque-min').value) || 0,
            ean: document.getElementById('prod-ean').value.trim() || null,
            is_pesavel: document.getElementById('prod-pesavel').checked,
            codigo_balanca: document.getElementById('prod-codigo-balanca').value.trim() || null
        };
        if (novaImagemUrl) payload.imagem_url = novaImagemUrl;

        if (estadoProdutos.idEmEdicao) {
            const { error } = await clienteSupabase.from('produtos').update(payload).eq('id', estadoProdutos.idEmEdicao);
            if (error) throw error;
            mostrarToast("Atualizado com sucesso!");
        } else {
            const { error } = await clienteSupabase.from('produtos').insert([payload]);
            if (error) throw error;
            mostrarToast("Cadastrado com sucesso!");
        }

        limparFormularioProdutos(); alternarAba('lista'); carregarListagemProdutos();
    } catch (erro) {
        console.error(erro); mostrarToast("Erro ao processar.", "erro");
    } finally {
        btnSalvar.textContent = '💾 Salvar Produto'; btnSalvar.disabled = false;
    }
}

function prepararEdicaoProduto(produto) {
    estadoProdutos.idEmEdicao = produto.id;
    document.getElementById('prod-nome').value = produto.nome || '';
    document.getElementById('prod-descricao').value = produto.descricao || '';
    document.getElementById('prod-preco').value = produto.preco || '';
    document.getElementById('prod-custo').value = produto.preco_custo || '';
    document.getElementById('prod-estoque').value = produto.estoque_atual || '0';
    document.getElementById('prod-estoque-min').value = produto.estoque_minimo || '0';
    document.getElementById('prod-ean').value = produto.ean || '';
    
    document.getElementById('prod-pesavel').checked = produto.is_pesavel || false;
    document.getElementById('prod-codigo-balanca').value = produto.codigo_balanca || '';

    document.getElementById('img-preview').src = produto.imagem_url ? produto.imagem_url : 'https://via.placeholder.com/200?text=Sem+Foto';
    document.getElementById('titulo-formulario').textContent = '✏️ Editando: ' + produto.nome;
    document.getElementById('btn-salvar-produto').textContent = '🔄 Atualizar Produto';
    document.getElementById('btn-cancelar-edicao').style.display = 'block';
    estadoProdutos.arquivoParaUpload = null;
    alternarAba('cadastro');
}

function limparFormularioProdutos() {
    estadoProdutos.idEmEdicao = null; estadoProdutos.arquivoParaUpload = null;
    ['prod-nome', 'prod-descricao', 'prod-preco', 'prod-custo', 'prod-ean', 'prod-codigo-balanca'].forEach(id => { document.getElementById(id).value = ''; });
    document.getElementById('prod-estoque').value = '0'; document.getElementById('prod-estoque-min').value = '0';
    document.getElementById('prod-pesavel').checked = false;
    document.getElementById('img-preview').src = 'https://via.placeholder.com/200?text=Sem+Foto';
    document.getElementById('titulo-formulario').textContent = 'Cadastrar Novo Produto';
    document.getElementById('btn-salvar-produto').textContent = '💾 Salvar Produto';
    document.getElementById('btn-cancelar-edicao').style.display = 'none';
}

async function deletarProduto(id) {
    if(confirm("Mover para a lixeira?")) {
        const { error } = await clienteSupabase.from('produtos').update({ deleted_at: new Date().toISOString() }).eq('id', id);
        if(!error) { mostrarToast("Movido para a lixeira!"); carregarListagemProdutos(); }
    }
}

async function restaurarProduto(id) {
    const { error } = await clienteSupabase.from('produtos').update({ deleted_at: null }).eq('id', id);
    if(!error) { mostrarToast("Restaurado com sucesso!"); carregarListagemProdutos(); }
}

document.addEventListener('click', async function(e) {
    if (e.target && e.target.id === 'btn-ver-lixeira') {
        estadoProdutos.exibindoLixeira = !estadoProdutos.exibindoLixeira;
        document.getElementById('titulo-lista').textContent = estadoProdutos.exibindoLixeira ? '🗑️ Lixeira de Produtos' : 'Inventário 📦';
        document.getElementById('status-lixeira').style.display = estadoProdutos.exibindoLixeira ? 'block' : 'none';
        e.target.textContent = estadoProdutos.exibindoLixeira ? '📦 Ver Ativos' : '👁️ Lixeira';
        carregarListagemProdutos();
    }
    if (e.target && e.target.id === 'btn-limpar-lixeira') {
        if(confirm("Apagar itens da lixeira e as suas fotos permanentemente?")) {
            const btn = e.target; btn.textContent = "A limpar..."; btn.disabled = true;
            try {
                const { data } = await clienteSupabase.from('produtos').select('imagem_url').not('deleted_at', 'is', null).not('imagem_url', 'is', null);
                if (data && data.length > 0) {
                    const arquivos = data.map(p => p.imagem_url.split('/').pop());
                    await clienteSupabase.storage.from('storage_produtos').remove(arquivos);
                }
                await clienteSupabase.from('produtos').delete().not('deleted_at', 'is', null);
                mostrarToast("Lixeira esvaziada!"); carregarListagemProdutos();
            } catch(err) { mostrarToast("Erro ao limpar.", "erro"); }
            finally { btn.textContent = "🧹 Esvaziar"; btn.disabled = false; }
        }
    }
});


/*🟥 PARTE 6: MÓDULO DE ENTIDADE  




/*🟥 PARTE 6: MÓDULO DE ENTIDADES 🟥*/
const estadoEntidades = { exibindoLixeira: false, arquivoParaUpload: null, idEmEdicao: null };

function desenharModuloEntidades(emailDoOperador) {
    appRoot.innerHTML = `
        <header>
            <div class="logo-area">
                <button id="btn-voltar-menu-ent" class="icon-btn" style="margin-right: 10px;">⬅️</button>
                <div><div>🏢 Entidades</div><div style="font-size: 0.7em; color: var(--text-muted); font-weight: normal;">${emailDoOperador}</div></div>
            </div>
        </header>

        <div class="tabs-menu">
            <button id="aba-btn-cadastro-ent" class="tab-btn active">📝 Registar</button>
            <button id="aba-btn-lista-ent" class="tab-btn">👥 Contactos</button>
        </div>

        <div id="aba-conteudo-cadastro-ent" class="tab-content active card">
            <h2 id="titulo-formulario-ent" class="titulo">Nova Entidade</h2>
            
            <label style="border-bottom: 1px solid var(--border-color); padding-bottom: 5px; margin-bottom: 10px; color: var(--accent-neon); display: block;">📸 Foto / Avatar</label>
            <div style="text-align: center; margin-bottom: 15px;"><img id="ent-img-preview" src="https://via.placeholder.com/150?text=Sem+Foto" style="width: 150px; height: 150px; border-radius: 50%; border: 3px solid var(--accent-neon); object-fit: cover;"></div>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <label for="ent-avatar-camera" class="btn-neon" style="flex:1; text-align:center; cursor:pointer; margin:0;">📷 Câmera</label>
                <input type="file" id="ent-avatar-camera" accept="image/*" capture="environment" style="display: none;">
                <label for="ent-avatar-galeria" class="btn-secundario" style="flex:1; text-align:center; cursor:pointer; margin:0;">📁 Galeria</label>
                <input type="file" id="ent-avatar-galeria" accept="image/*" style="display: none;">
            </div>

            <label style="border-bottom: 1px solid var(--border-color); padding-bottom: 5px; margin-bottom: 10px; color: var(--accent-neon); display: block;">👤 Dados Principais</label>
            <label>Tipo de Contacto *</label>
            <select id="ent-tipo" style="width: 100%; padding: 12px; margin-bottom: 15px; border-radius: 8px; background: var(--bg-color); color: var(--text-main); border: 1px solid var(--border-color); outline: none;">
                <option value="cliente">Cliente</option>
                <option value="fornecedor">Fornecedor</option>
                <option value="funcionario">Funcionário</option>
                <option value="colaborador">Colaborador</option>
                <option value="entregador">Entregador</option> <!-- NOVO -->
            </select>

            <label>Código do Crachá / Cartão Fidelidade</label>
            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <input type="text" id="ent-codigo-barras" placeholder="Digitalizar ou digitar..." style="margin-bottom: 0; flex: 1;">
                <button id="btn-scan-cracha" class="btn-neon" style="width: auto; margin-bottom: 0; padding: 0 20px;">📷</button>
            </div>

            <label>Nome Completo / Empresa *</label>
            <input type="text" id="ent-nome" placeholder="Ex: João Silva">
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 15px;">
                <div><label>Documento</label><input type="text" id="ent-documento"></div>
                <div><label>Telefone</label><input type="text" id="ent-telefone"></div>
            </div>
            
            <button id="btn-salvar-entidade" class="btn-neon" style="width: 100%; padding: 15px; font-size: 1.1em;">💾 Salvar Entidade</button>
            <button id="btn-cancelar-edicao-ent" class="btn-secundario" style="width: 100%; padding: 15px; margin-top: 10px; display: none; font-size: 1.1em;">❌ Cancelar Edição</button>
        </div>

        <div id="aba-conteudo-lista-ent" class="tab-content card">
            <div id="status-lixeira-ent" style="background-color: #d1ecf1; color: #0c5460; padding: 10px; border-radius: 5px; font-weight: bold; margin-bottom: 15px; display: none;">Lixeira de Entidades 🗑️</div>
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 15px;">
                <h2 id="titulo-lista-ent" style="margin: 0;">Contactos 👥</h2>
                <button id="btn-ver-lixeira-ent" class="btn-secundario" style="width:auto;">👁️ Lixeira</button>
                <button id="btn-limpar-lixeira-ent" style="display: none; background: #fd7e14; color: white; border: none; padding: 10px 15px; border-radius: 4px; font-weight: bold; cursor: pointer;">🧹 Esvaziar</button>
            </div>
            <div style="display: flex; gap: 5px; margin-bottom: 15px; width: 100%;">
                <input type="text" id="input-busca-ent" placeholder="🔍 Nome, Doc ou Crachá..." style="flex-grow: 1; padding: 12px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-color); color: var(--text-main);">
                <button type="button" id="btn-buscar-lista-ent" class="btn-neon" style="width: auto; margin-bottom: 0;">Buscar</button>
            </div>
            <div id="lista-entidades-dinamica"></div>
        </div>
        <div id="toast-container" style="position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;"></div>
    `;

    document.getElementById('btn-voltar-menu-ent').onclick = () => desenharMenuPrincipal(emailDoOperador);
    document.getElementById('aba-btn-cadastro-ent').onclick = () => alternarAbaEnt('cadastro');
    document.getElementById('aba-btn-lista-ent').onclick = () => { alternarAbaEnt('lista'); carregarListagemEntidades(); };
    document.getElementById('btn-scan-cracha').onclick = () => abrirLeitorCodigoBarras('ent-codigo-barras');

    const atualizarAvatar = (e) => {
        if (e.target.files.length > 0) {
            estadoEntidades.arquivoParaUpload = e.target.files[0];
            document.getElementById('ent-img-preview').src = URL.createObjectURL(estadoEntidades.arquivoParaUpload);
        }
    };
    document.getElementById('ent-avatar-camera').addEventListener('change', atualizarAvatar);
    document.getElementById('ent-avatar-galeria').addEventListener('change', atualizarAvatar);

    document.getElementById('btn-salvar-entidade').onclick = submeterFormularioEntidade;
    document.getElementById('btn-cancelar-edicao-ent').onclick = () => { limparFormularioEntidade(); alternarAbaEnt('lista'); };
    carregarListagemEntidades();
}

function alternarAbaEnt(aba) {
    document.getElementById('aba-btn-cadastro-ent').classList.toggle('active', aba === 'cadastro');
    document.getElementById('aba-btn-lista-ent').classList.toggle('active', aba === 'lista');
    document.getElementById('aba-conteudo-cadastro-ent').classList.toggle('active', aba === 'cadastro');
    document.getElementById('aba-conteudo-lista-ent').classList.toggle('active', aba === 'lista');
}

async function carregarListagemEntidades() {
    const divLista = document.getElementById('lista-entidades-dinamica');
    if (!divLista) return;
    const termoBusca = document.getElementById('input-busca-ent').value.trim();
    divLista.innerHTML = '<p style="text-align:center; color:var(--text-muted);">A carregar...</p>';

    let query = clienteSupabase.from('entidades').select('*').order('created_at', { ascending: false });
    if (estadoEntidades.exibindoLixeira) query = query.not('deleted_at', 'is', null);
    else query = query.is('deleted_at', null);

    if (termoBusca) query = query.or(`nome.ilike.%${termoBusca}%,documento.ilike.%${termoBusca}%,codigo_barras.ilike.%${termoBusca}%`);

    const { data, error } = await query;
    divLista.innerHTML = '';
    if (error) return divLista.innerHTML = '<p style="text-align:center; color:#dc3545;">Erro na busca.</p>';
    if (!data || data.length === 0) return divLista.innerHTML = '<p style="text-align:center; color:var(--text-muted);">Nenhuma entidade.</p>';

    const btnLimpar = document.getElementById('btn-limpar-lixeira-ent');
    if(btnLimpar) btnLimpar.style.display = estadoEntidades.exibindoLixeira ? "inline-block" : "none";

    data.forEach(ent => {
        const item = document.createElement('div');
        item.style.cssText = 'padding: 15px; border-bottom: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 10px;';

        const linhaInfo = document.createElement('div');
        linhaInfo.style.cssText = 'display: flex; align-items: center; gap: 12px; width: 100%;';

        const img = document.createElement('img');
        img.src = ent.avatar_url ? ent.avatar_url : 'https://via.placeholder.com/60?text=👤';
        img.style.cssText = 'width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-color); flex-shrink: 0;';
        linhaInfo.appendChild(img);

        const divTextos = document.createElement('div');
        divTextos.style.cssText = 'flex-grow: 1; display: flex; flex-direction: column; min-width: 0; overflow: hidden;';

        const divTopo = document.createElement('div');
        divTopo.style.cssText = 'display: flex; align-items: center; gap: 8px; flex-wrap: wrap;';
        
        const nomeStr = document.createElement('strong');
        nomeStr.textContent = ent.nome;
        nomeStr.style.cssText = 'font-size: 1.1em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;';
        divTopo.appendChild(nomeStr);

        const badgeTipo = document.createElement('span');
        badgeTipo.textContent = ent.tipo.toUpperCase();
        badgeTipo.style.cssText = 'padding: 2px 6px; border-radius: 4px; font-size: 0.7em; background: var(--border-color); color: var(--text-main);';
        divTopo.appendChild(badgeTipo);

        // Renderiza a Badge de Fidelidade
        if (ent.pontos_fidelidade > 0) {
            const badgeFidelidade = document.createElement('span');
            badgeFidelidade.className = 'badge-fidelidade';
            badgeFidelidade.textContent = `🌟 ${ent.pontos_fidelidade} pts`;
            divTopo.appendChild(badgeFidelidade);
        }

        divTextos.appendChild(divTopo);

        let infos = [];
        if (ent.telefone) infos.push(`📞 ${ent.telefone}`);
        if (ent.codigo_barras) infos.push(`🪪 ${ent.codigo_barras}`);
        
        const subInfo = document.createElement('span');
        subInfo.textContent = infos.join(' | ');
        subInfo.style.cssText = 'font-size: 0.85em; color: var(--text-muted); margin-top: 4px;';
        divTextos.appendChild(subInfo);

        linhaInfo.appendChild(divTextos);
        item.appendChild(linhaInfo);

        const zonaBotoes = document.createElement('div');
        zonaBotoes.style.cssText = 'display: flex; gap: 10px; width: 100%; margin-top: 5px;';
        if (estadoEntidades.exibindoLixeira) {
            const btnRestaurar = document.createElement('button');
            btnRestaurar.textContent = '♻️ Restaurar';
            btnRestaurar.style.cssText = 'flex: 1; background: #20c997; color: white; border: none; padding: 8px; border-radius: 6px; font-weight: bold; cursor: pointer;';
            btnRestaurar.onclick = async () => { await clienteSupabase.from('entidades').update({ deleted_at: null }).eq('id', ent.id); carregarListagemEntidades(); };
            zonaBotoes.appendChild(btnRestaurar);
        } else {
            const btnEditar = document.createElement('button');
            btnEditar.textContent = '✏️ Editar';
            btnEditar.style.cssText = 'flex: 1; background: #ffc107; color: #212529; border: none; padding: 8px; border-radius: 6px; font-weight: bold; cursor: pointer;';
            btnEditar.onclick = () => prepararEdicaoEntidade(ent);
            
            const btnOcultar = document.createElement('button');
            btnOcultar.textContent = '🗑️ Ocultar';
            btnOcultar.style.cssText = 'flex: 1; background: #dc3545; color: white; border: none; padding: 8px; border-radius: 6px; font-weight: bold; cursor: pointer;';
            btnOcultar.onclick = async () => { await clienteSupabase.from('entidades').update({ deleted_at: new Date().toISOString() }).eq('id', ent.id); carregarListagemEntidades(); };
            zonaBotoes.appendChild(btnEditar); zonaBotoes.appendChild(btnOcultar);
        }
        item.appendChild(zonaBotoes);
        divLista.appendChild(item);
    });
}

async function submeterFormularioEntidade() {
    const nome = document.getElementById('ent-nome').value.trim();
    const btnSalvar = document.getElementById('btn-salvar-entidade');
    if(!nome || nome.length < 3) return mostrarToast("Nome deve ter mín. 3 letras.", "erro");
    btnSalvar.textContent = 'A processar...'; btnSalvar.disabled = true;

    try {
        let novaImagemUrl = null;
        if (estadoEntidades.arquivoParaUpload) {
            btnSalvar.textContent = "A enviar avatar...";
            novaImagemUrl = await comprimirEUploadImagem(estadoEntidades.arquivoParaUpload, 'storage_entidades', 'avatar_' + Date.now() + '.jpg');
        }

        const payload = {
            tipo: document.getElementById('ent-tipo').value,
            nome: nome,
            codigo_barras: document.getElementById('ent-codigo-barras').value.trim() || null,
            documento: document.getElementById('ent-documento').value.trim() || null,
            telefone: document.getElementById('ent-telefone').value.trim() || null
        };
        if (novaImagemUrl) payload.avatar_url = novaImagemUrl;

        if (estadoEntidades.idEmEdicao) {
            await clienteSupabase.from('entidades').update(payload).eq('id', estadoEntidades.idEmEdicao);
            mostrarToast("Entidade atualizada!");
        } else {
            await clienteSupabase.from('entidades').insert([payload]);
            mostrarToast("Entidade cadastrada!");
        }
        limparFormularioEntidade(); document.getElementById('aba-btn-lista-ent').click();
    } catch (erro) { console.error(erro); mostrarToast("Erro.", "erro"); } 
    finally { btnSalvar.textContent = '💾 Salvar Entidade'; btnSalvar.disabled = false; }
}

function prepararEdicaoEntidade(ent) {
    estadoEntidades.idEmEdicao = ent.id;
    document.getElementById('ent-tipo').value = ent.tipo || 'cliente';
    document.getElementById('ent-nome').value = ent.nome || '';
    document.getElementById('ent-codigo-barras').value = ent.codigo_barras || '';
    document.getElementById('ent-documento').value = ent.documento || '';
    document.getElementById('ent-telefone').value = ent.telefone || '';
    document.getElementById('ent-img-preview').src = ent.avatar_url ? ent.avatar_url : 'https://via.placeholder.com/150?text=Sem+Foto';
    document.getElementById('titulo-formulario-ent').textContent = '✏️ Editando: ' + ent.nome;
    document.getElementById('btn-cancelar-edicao-ent').style.display = 'block';
    estadoEntidades.arquivoParaUpload = null;
    document.getElementById('aba-btn-cadastro-ent').click();
}

function limparFormularioEntidade() {
    estadoEntidades.idEmEdicao = null; estadoEntidades.arquivoParaUpload = null;
    ['ent-nome', 'ent-codigo-barras', 'ent-documento', 'ent-telefone'].forEach(id => { document.getElementById(id).value = ''; });
    document.getElementById('ent-img-preview').src = 'https://via.placeholder.com/150?text=Sem+Foto';
    document.getElementById('titulo-formulario-ent').textContent = 'Nova Entidade';
    document.getElementById('btn-cancelar-edicao-ent').style.display = 'none';
}

document.addEventListener('click', async function(e) {
    if (e.target && e.target.id === 'btn-ver-lixeira-ent') {
        estadoEntidades.exibindoLixeira = !estadoEntidades.exibindoLixeira;
        document.getElementById('titulo-lista-ent').textContent = estadoEntidades.exibindoLixeira ? '🗑️ Lixeira Entidades' : 'Contactos 👥';
        document.getElementById('status-lixeira-ent').style.display = estadoEntidades.exibindoLixeira ? 'block' : 'none';
        carregarListagemEntidades();
    }
    if (e.target && e.target.id === 'btn-limpar-lixeira-ent') {
        if(confirm("Apagar definitivamente da lixeira?")) {
            const btn = e.target; btn.textContent = "A limpar..."; btn.disabled = true;
            try {
                const { data } = await clienteSupabase.from('entidades').select('avatar_url').not('deleted_at', 'is', null).not('avatar_url', 'is', null);
                if (data && data.length > 0) await clienteSupabase.storage.from('storage_entidades').remove(data.map(e => e.avatar_url.split('/').pop()));
                await clienteSupabase.from('entidades').delete().not('deleted_at', 'is', null);
                mostrarToast("Esvaziada!"); carregarListagemEntidades();
            } catch (err) {} finally { btn.textContent = "🧹 Esvaziar"; btn.disabled = false; }
        }
    }
});


        /*🟥 UPLOAD E SCANNER GLOBAIS 🟥*/
async function comprimirEUploadImagem(arquivoOriginal, nomeBucket, caminhoNomeArquivo) {
    if (!arquivoOriginal) return null;
    const blobComprimido = await new Promise((resolve) => {
        const leitor = new FileReader();
        leitor.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                let w = img.width, h = img.height;
                if (w > h && w > 800) { h *= 800 / w; w = 800; } else if (h > 800) { w *= 800 / h; h = 800; }
                canvas.width = w; canvas.height = h;
                canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.7); 
            };
            img.src = e.target.result;
        };
        leitor.readAsDataURL(arquivoOriginal);
    });
    const { error } = await clienteSupabase.storage.from(nomeBucket).upload(caminhoNomeArquivo, blobComprimido, { cacheControl: '3600', upsert: true });
    if (error) return null;
    return clienteSupabase.storage.from(nomeBucket).getPublicUrl(caminhoNomeArquivo).data.publicUrl;
}

const scannerModal = document.createElement('div');
scannerModal.style.cssText = `display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 10001; flex-direction: column; justify-content: center; align-items: center;`;
scannerModal.innerHTML = `<h3 style="color: white; margin-bottom: 20px;">Aponte para o Código</h3><div id="area-leitor-camera" style="width: 100%; max-width: 400px; background: white; border-radius: 8px; margin-bottom: 20px;"></div><button id="btn-fechar-scanner" style="padding: 12px 25px; background: #dc3545; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">❌ Cancelar</button>`;
document.body.appendChild(scannerModal);
let instanciaLeitor = null;

function abrirLeitorCodigoBarras(idDoInputDestino) {
    if (typeof Html5Qrcode === 'undefined') return alert("Erro: Biblioteca Html5Qrcode ausente.");
    scannerModal.style.display = 'flex';
    instanciaLeitor = new Html5Qrcode("area-leitor-camera");
    instanciaLeitor.start({ facingMode: "environment" }, { fps: 10, qrbox: { width: 250, height: 120 } }, (codigo) => {
        document.getElementById(idDoInputDestino).value = codigo; fecharScanner();
    }, () => {}).catch(() => { alert("Erro de câmara."); fecharScanner(); });
}
document.getElementById('btn-fechar-scanner').addEventListener('click', fecharScanner);
function fecharScanner() { if (instanciaLeitor) { instanciaLeitor.stop().then(() => scannerModal.style.display = 'none'); } else scannerModal.style.display = 'none'; }

function alternarAba(aba) {
    document.getElementById('aba-btn-cadastro').classList.toggle('active', aba === 'cadastro');
    document.getElementById('aba-btn-lista').classList.toggle('active', aba === 'lista');
    document.getElementById('aba-conteudo-cadastro').classList.toggle('active', aba === 'cadastro');
    document.getElementById('aba-conteudo-lista').classList.toggle('active', aba === 'lista');
}
function mostrarToast(mensagem, tipo = 'sucesso') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`; toast.textContent = mensagem;
    document.getElementById('toast-container').appendChild(toast);
    setTimeout(() => toast.classList.add('mostrar'), 10);
    setTimeout(() => { toast.classList.remove('mostrar'); setTimeout(() => toast.remove(), 300); }, 3000);
}

iniciarApp();
