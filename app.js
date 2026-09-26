
/*🟥
APP.JS - SINGLE PAGE APPLICATION (SPA) COM ROTEAMENTO DE MÓDULOS
🟥*/


/*🟥
PARTE 1: CONSOLE ESPELHO E CONFIGURAÇÃO (Mantidos intactos)
🟥*/ 

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
const SUPABASE_URL = 'https://gxbderrxvplxzwvantkn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4YmRlcnJ4dnBseHp3dmFudGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMTA2MjcsImV4cCI6MjEwNTc4NjYyN30.3YbSndiN-OBFZcOish7MWOu9sO6byPsWDQV74_XbjC4';
let clienteSupabase;
if (typeof supabase !== 'undefined') {
    clienteSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}



/*🟥
PARTE 2: GESTOR CENTRAL DE ROTAS
🟥*/ 

const appRoot = document.getElementById('app-root');

async function iniciarApp() {
    // Valida a sessão. Se estiver logado, vai para o Menu Principal. Se não, vai para o Login.
    const { data: { session } } = await clienteSupabase.auth.getSession();
    if (session) {
        desenharMenuPrincipal(session.user.email);
    } else {
        desenharLogin();
    }
}


/*🟥
PARTE 3: ECRÃ DE LOGIN
*🟥/ 

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

    document.getElementById('btn-ir-registo').onclick = () => {
        document.getElementById('area-login').style.display = 'none';
        document.getElementById('area-registo').style.display = 'block';
    };
    document.getElementById('btn-voltar-login').onclick = () => {
        document.getElementById('area-registo').style.display = 'none';
        document.getElementById('area-login').style.display = 'block';
    };

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

/*🟥
PARTE 4: ECRÃ DO MENU PRINCIPAL (CENTRO DE COMANDO)
🟥*/ 


function desenharMenuPrincipal(emailDoOperador) {
    // Desenha o cabeçalho e os cartões de navegação usando CSS Grid flexível
    appRoot.innerHTML = `
        <header>
            <div class="logo-area">
                <span class="logo-icon">⚡</span> 
                <div>
                    <div>Centro de Comando</div>
                    <div style="font-size: 0.7em; color: var(--text-muted); font-weight: normal;">${emailDoOperador}</div>
                </div>
            </div>
            <div class="header-actions">
                <button id="btn-tema" class="icon-btn" title="Alterar Tema">🌓</button>
                <button id="btn-sair" class="icon-btn" title="Sair do Sistema" style="color: var(--danger-color);">🚪</button>
            </div>
        </header>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
            <!-- Cartão Módulo Produtos -->
            <div class="card" id="card-produtos" style="text-align: center; cursor: pointer; padding: 20px;">
                <div style="font-size: 3em; margin-bottom: 10px;">📦</div>
                <h3 style="color: var(--accent-neon); margin: 0 0 5px 0;">Produtos</h3>
                <p style="font-size: 0.8em; color: var(--text-muted); margin: 0;">Gestão de Estoque</p>
            </div>

            <!-- Cartão Módulo Entidades -->
            <div class="card" id="card-entidades" style="text-align: center; cursor: pointer; padding: 20px;">
                <div style="font-size: 3em; margin-bottom: 10px;">🏢</div>
                <h3 style="color: var(--accent-neon); margin: 0 0 5px 0;">Entidades</h3>
                <p style="font-size: 0.8em; color: var(--text-muted); margin: 0;">Clientes e Fornecedores</p>
            </div>
        </div>
    `;

    // Eventos do Cabeçalho
    document.getElementById('btn-tema').onclick = () => document.body.classList.toggle('light-theme');
    document.getElementById('btn-sair').onclick = async () => {
        if(confirm("Deseja encerrar a sessão?")) {
            await clienteSupabase.auth.signOut();
            iniciarApp(); 
        }
    };

    // Navegação para os Módulos Específicos
    document.getElementById('card-produtos').onclick = () => desenharModuloProdutos(emailDoOperador);
    document.getElementById('card-entidades').onclick = () => desenharModuloEntidades(emailDoOperador);
}
































/*🟥 
5. MÓDULO DE PRODUTOS (Formulário, Busca Inteligente, Listagem Avançada e Soft Delete)
🟥*/ 

function desenharModuloProdutos(emailDoOperador) {
    // 1. INJEÇÃO DE CSS ESPECÍFICO PARA A LISTAGEM E TOASTS
    const estilosListagem = `
        <style>
            .info-status { background-color: #d1ecf1; color: #0c5460; padding: 10px; border-radius: 5px; font-weight: bold; margin-bottom: 15px; display: none; }
            .btn-sucesso { background: #28a745; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; } border-radius: 4px; cursor: pointer; font-weight: bold; }
            .btn-alerta { background: #fd7e14; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; }
            .btn-secundario { background: #6c757d; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; }
            .btn-restaurar { background: #20c997; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; }
            
            .area-busca { display: flex; gap: 5px; margin-bottom: 15px; width: 100%; }
            .input-busca { fmain); }
            
            .barra-acoes-lote { background-color: #fff3cd; padding: 10px; border-radius: 5px; margin-bottom: 15px; display: none; align-items: center; justify-content: space-between; border: 1px solid #ffeeba; }
            .chk-item { transform: scale(1.5); margin-right: 15px; cursor: pointer; }
            
            .item-lista { padding: 15px; border-bottom: 1px solid var(--border-color); display: flex; flex-direction: row; gap: 15px; align-items: center;}
            .conteudo-item { display: flex; flex-direction: column; gap: 8px; flex-grow: 1; }
            .cabecalho-painel { display: flex; justify-content: space-between; align-items: center;
            .grupo-botoes-topo { display: flex; gap: 10px; flex-wrap: wrap;}
            .badge-lixeira { background: #dc3545; color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.8em; margin-left: 10px;}
            .badge-estoque { background: #17a2b8; color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.8em; margin-left: 10px;}
            
            #toast-container { position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px; }
            .toast { padding: 15px 20px; border-radius: 5px; color: white; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.2); opacity: 0; transform: translateX(100%); transition: all 0.3s ease; }
            .toast.mostrar { opacity: 1; transform: translateX(0); }
            .toast-sucesso { background-color: #28a745; }
            .toast-erro { background-color: #dc3545; }
        </style>
        <div id="toast-container"></div>
    `;

    appRoot.innerHTML = estilosListagem + `
        <header>
            <div class="logo-area">
                <button id="btn-voltar-menu" class="icon-btn" style="margin-right: 10px;">⬅️</button>
                <div>
                    <div>📦 Produtos</div>
                    <div style="font-size: 0.7em; color: var(--text-muted); font-weight: normal;">${emailDoOperador}</div>
                </div>
            </div>
        </header>

        <div class="tabs-menu">
            <button id="aba-btn-cadastro" class="tab-btn active">📝 Registar</button>
            <button id="aba-btn-lista" class="tab-btn">🛒 Inventário</button>
        </div>

        <!-- ================= ABA 1: CADASTRO ================= -->
        <div id="aba-conteudo-cadastro" class="tab-content active card">
            <div class="titulo">Cadastrar Produto</div>
            
            <label style="border-bottom: 1px solid var(--border-color); padding-bottom: 5px; margin-bottom: 10px; color: var(--accent-neon);">📸 Imagem do Produto</label>
            <div style="text-align: center; margin-bottom: 15px;">
                <img id="img-preview" src="https://via.placeholder.com/200?text=Sem+Foto" style="max-width: 200px; max-height: 200px; border-radius: 8px; border: 2px dashed var(--border-color); object-fit: cover;">
            </div>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <label for="prod-imagem-camera" class="btn-neon" style="text-align: center; flex: 1; cursor: pointer; margin-bottom: 0;">📷 Tirar Foto</label>
                <input type="file" id="prod-imagem-camera" accept="image/*" capture="environment" style="display: none;">
                <label for="prod-imagem-galeria" class="btn-secundario" style="text-align: center; flex: 1; cursor: pointer; margin-bottom: 0;">📁 Galeria</label>
                <input type="file" id="prod-imagem-galeria" accept="image/*" style="display: none;">
            </div>
            <p id="info-foto" style="font-size: 0.8em; color: var(--text-muted); text-align: center; margin-top: -10px; margin-bottom: 15px;">Nenhuma imagem selecionada</p>

            <label style="border-bottom: 1px solid var(--border-color); padding-bottom: 5px; margin-bottom: 10px; color: var(--accent-neon);">🧾 Códigos e Datas</label>
            <label>EAN (Código de Barras)</label>
            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <input type="text" id="prod-ean" placeholder="Ex: 7891025109884" style="margin-bottom: 0;">
                <button id="btn-scan-ean" class="btn-neon" style="width: auto; margin-bottom: 0; padding: 0 20px;" title="Ler Código">📷</button>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 15px;">
                <div><label>Data de Compra</label><input type="date" id="prod-data-compra"></div>
                <div><label>Data de Vencimento</label><input type="date" id="prod-data-vencimento"></div>
            </div>

            <label style="border-bottom: 1px solid var(--border-color); padding-bottom: 5px; margin-bottom: 10px; color: var(--accent-neon);">📦 Dados Gerais</label>
            <label>Nome do Produto *</label>
            <input type="text" id="prod-nome" placeholder="Ex: Cerveja Artesanal 500ml">
            <label>Descrição do Produto</label>
            <textarea id="prod-descricao" rows="3" placeholder="Detalhes adicionais..." style="width: 100%; padding: 12px; margin-bottom: 15px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-main); font-family: inherit; resize: vertical;"></textarea>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 15px;">
                <div><label>Categoria</label><input type="text" id="prod-categoria" placeholder="Ex: Bebidas"></div>
                <div>
                    <label>Fornecedor</label>
                    <input list="lista-fornecedores" id="prod-fornecedor" placeholder="Digite para buscar...">
                    <datalist id="lista-fornecedores"></datalist>
                </div>
            </div>
            <div style="margin-bottom: 15px;">
                <label>Origem</label>
                <select id="prod-origem" style="width: 100%; padding: 12px; border-radius: 8px; background: var(--bg-color); color: var(--text-main); border: 1px solid var(--border-color); outline: none;">
                    <option value="Selecione...">Selecione...</option>
                    <option value="0 - Nacional">0 - Nacional</option>
                    <option value="1 - Estrangeira">1 - Estrangeira</option>
                </select>
            </div>

            <label style="border-bottom: 1px solid var(--border-color); padding-bottom: 5px; margin-bottom: 10px; color: var(--accent-neon);">💰 Preços e Estoque</label>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 15px;">
                <div><label>Preço de Custo (R$)</label><input type="number" id="prod-custo" placeholder="0.00" step="0.01"></div>
                <div><label>Preço de Venda (R$) *</label><input type="number" id="prod-preco" placeholder="0.00" step="0.01"></div>
                <div><label>Estoque Atual</label><input type="number" id="prod-estoque" value="0"></div>
                <div><label>Estoque Mínimo</label><input type="number" id="prod-estoque-min" value="0"></div>
            </div>

            <label style="border-bottom: 1px solid var(--border-color); padding-bottom: 5px; margin-bottom: 10px; color: var(--accent-neon);">🚚 Logística e Armazenamento</label>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 15px;">
                <div><label>Peso (kg)</label><input type="number" id="prod-peso" placeholder="Ex: 1.5" step="0.001"></div>
                <div><label>Dimensões (LxAxP)</label><input type="text" id="prod-dimensoes" placeholder="Ex: 20x15x10 cm"></div>
                <div><label>Localização na Loja</label><input type="text" id="prod-loc-loja" placeholder="Ex: Corredor 3"></div>
                <div><label>Localização no Estoque</label><input type="text" id="prod-loc-estoque" placeholder="Ex: Palete 4"></div>
            </div>

            <button id="btn-salvar-produto" class="btn-neon" style="margin-top: 15px;">💾 Guardar Produto Completo</button>
        </div>

        <!-- ================= ABA 2: LISTAGEM E LIXEIRA ================= -->
        <div id="aba-conteudo-lista" class="tab-content card">
            
            <div id="status-lixeira" class="info-status">Lixeira de Produtos 🗑️ (Itens Ocultos)</div>

            <div class="cabecalho-painel">
                <h2 id="titulo-painel" style="margin: 0;">Lista de Produtos 📦</h2>
                <div class="grupo-botoes-topo">
                    <button id="btn-ver-lixeira" class="btn-secundario">👁️ Ver Lixeira</button>
                    <button id="btn-limpar-lixeira" class="btn-alerta" style="display: none;">🧹 Esvaziar Lixeira</button>
                </div>
            </div>

            <div class="area-busca">
                <input type="text" id="input-busca-lista" class="input-busca" placeholder="🔍 Buscar por Nome ou EAN...">
                <button type="button" id="btn-buscar-lista" class="btn-neon" style="width: auto; margin-bottom: 0;">Buscar</button>
            </div>
            
            <div id="barra-acoes-lote" class="barra-acoes-lote">
                <strong style="color: #856404;" id="texto-contagem-lote">0 itens selecionados</strong>
                <button id="btn-ocultar-lote" class="btn-perigo">🗑️ Ocultar Selecionados</button>
            </div>

            <div id="area-selecionar-todos" style="padding: 10px 15px; background: var(--bg-color); border-radius: 5px; margin-bottom: 15px; display: none; align-items: center; border: 1px solid var(--border-color);">
                <input type="checkbox" id="chk-selecionar-todos" style="transform: scale(1.5); margin-right: 15px; cursor: pointer;">
                <label for="chk-selecionar-todos" style="cursor: pointer; font-weight: bold; user-select: none;">Selecionar todos visíveis</label>
            </div>

            <div id="lista-produtos-dinamica">
                <div style="text-align: center; color: var(--text-muted); padding: 20px;">A carregar dados...</div>
            </div>
        </div>
    `;

    // 
        setTimeout(() => toast.classList.add('mostrar'), 10);
        setTimeout(() => {
            toast.classList.remove('mostrar');
            setTimeout(() => toast.remove(), 300); 
        }, 3000);
    }

    // -------------------------------------------------------------------------
    // MOTOR DE BUSCA E RENDERIZAÇÃO DA LISTA
    // -------------------------------------------------------------------------
    async function carregarListagemProdutos() {
        const divLista = document.getElementById('lista-produtos-dinamica');
        const termoBusca = document.getElementById('input-busca-lista').value.trim();
        divLista.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 20px;">A procurar no banco de dados...</div>';
        
        document.getElementById('barra-acoes-lote').style.display = 'none';
        document.getElementById('chk-selecionar-todos').checked = false;

        // Monta a consulta ao banco de dados baseada no estado da Lixeira
        let query = clienteSupabase.from('produtos').select('*').order('created_at', { ascending: false });

        if (exibindoLixeira) {
            query = query.not('deleted_at', 'is', null); // Busca itensapagados (Soft Delete)
        } else {
            query = query.is('deleted_at', null); // Busca itens ativos
        }

        // Adiciona filtro de busca se o utilizador digitou algo
        if (termoBusca) {
            query = query.or(\`nome.ilike.%\${termoBusca}%,ean.ilike.%\${termoBusca}%\`);
        }

        const { data: produtos, error } = await query;

        divLista.innerHTML = ''; 
        if (error) {
            mostrarToast("Erro ao carregar dados.", "erro");
            return divLista.innerHTML = "<div style='padding:20px;'>Erro de conexão.</div>";
        }
        
        if (!produtos || produtos.length === 0) {
            const msgVazia = exibindoLixeira ? "A lixeira está vazia. 🌟" : "Nenhum resultado encontrado.";
            document.getElementById('area-selecionar-todos').style.display = "none";
            document.getElementById('btn-limpar-lixeira').style.display = "none";
            return divLista.innerHTML = \`<div style='padding:20px; text-align:center;'>\${msgVazia}</div>\`;
        }

        cacheProdutosRenderizados = produtos;

        // Controla visibilidade de botões em lote
        document.getElementById('area-selecionar-todos').style.display = (!exibindoLixeira) ? "flex" : "none";
        document.getElementById('btn-limpar-lixeira').style.display = (exibindoLixeira) ? "inline-block" : "none";

        // Cria o HTML para cada produto retornado
        produtos.forEach((eq) => {
            const divItem = document.createElement('div');
            divItem.className = 'item-lista';

            // Checkbox para seleção em lote (apenas para produtos ativos)
            if (!exibindoLixeira) {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'chk-item';
                checkbox.value = eq.id;
                checkbox.addEventListener('change', atualizarBarraAcoesLote);
                divItem.appendChild(checkbox);
            }

            const divConteudo = document.createElement('div');
            divConteudo.className = 'conteudo-item';

            // Título e Badges
            const divTitulo = document.createElement('div');
            const titulo = document.createElement('strong');
            titulo.textContent = eq.nome; 
            divTitulo.appendChild(titulo);

            const badgeEstoque = document.createElement('span');
            badgeEstoque.className = 'badge-estoque';
            badgeEstoque.textContent = \`Estoque: \${eq.estoque_atual}\`;
            if (eq.estoque_atual <= eq.estoque_minimo) badgeEstoque.style.background = '#dc3545'; // Alerta vermelho
            divTitulo.appendChild(badgeEstoque);

            if (exibindoLixeira) {
                const badge = document.createElement('span');
                badge.className = 'badge-lixeira';
                badge.textContent = ' NA LIXEIRA';
                divTitulo.appendChild(badge);
            }

            // Preço e Categoria
            const precoText = document.createElement('span');
            precoText.style.color = "var(--accent-neon)";
            precoText.style.fontWeight = "bold";
            precoText.textContent = "R$ " + parseFloat(eq.preco || 0).toFixed(2);
            divConteudo.appendChild(divTitulo);
            divConteudo.appendChild(precoText);
            
            if (eq.categoria) {
                const catText = document.createElement('span');
                catText.style.fontSize = "0.85em";
                catText.style.color = "var(--text-muted)";
                catText.textContent = "Categoria: " + eq.categoria;
                divConteudo.appendChild(catText);
            }

            // Miniatura da Imagem
            if (eq.imagem_url) {
                const img = document.createElement('img');
                img.src = eq.imagem_url;
                img.style.maxWidth = "80px";
                img.style.borderRadius = "8px";
                img.style.marginTop = "5px";
                divConteudo.appendChild(img);
            }

            // Botões de Ação Dinâmicos
            const divBotoes = document.createElement('div');
            divBotoes.style.display = 'flex';
            divBotoes.style.gap = '10px';
            divBotoes.style.marginTop = '10px';
            
            if (exibindoLixeira) {
                // Ação: Restaurar da Lixeira
                const btnRestaurar = document.createElement('button');
                btnRestaurar.innerHTML = "♻️ Restaurar";
                btnRestaurar.className = "btn-restaurar";
                btnRestaurar.onclick = async () => {
                    const { error } = await clienteSupabase.from('produtos').update({ deleted_at: null }).eq('id', eq.id);
                    if(!error) { mostrarToast("Produto restaurado!", "sucesso"); carregarListagemProdutos(); }
                    else mostrarToast("Erro ao restaurar", "erro");
                };
                divBotoes.appendChild(btnRestaurar);
            } else {
                // Ação: Ocultar (Soft Delete)
                const btnExcluir = document.createElement('button');
                btnExcluir.innerHTML = "🗑️ Ocultar";
                btnExcluir.className = "btn-perigo";
                btnExcluir.onclick = async () => {
                    if(confirm("Mover este produto para a lixeira?")) {
                        const { error } = await clienteSupabase.from('produtos').update({ deleted_at: new Date().toISOString() }).eq('id', eq.id);
                        if(!error) { mostrarToast("Movido para a lixeira!", "sucesso"); carregarListagemProdutos(); }
                        else mostrarToast("Erro ao excluir", "erro");
                    }
                }; 
                divBotoes.appendChild(btnExcluir);
            }

            divConteudo.appendChild(divBotoes);
            divItem.appendChild(divConteudo);
            divLista.appendChild(divItem);
        });
    }

    // -------------------------------------------------------------------------
    // LÓGICA DE AÇÕES EM LOTE E LIXEIRA
    // -------------------------------------------------------------------------
    function atualizarBarraAcoesLote() {
        const checkboxes = document.querySelectorAll('.chk-item:checked');
        const barraAcoes = document.getElementById('barra-acoes-lote');
        if (checkboxes.length > 0 && !exibindoLixeira) {
            barraAcoes.style.display = 'flex';
            document.getElementById('texto-contagem-lote').textContent = \`\${checkboxes.length} item(ns) selecionado(s)\`;
        } else {
            barraAcoes.style.display = 'none';
        }
    }

    document.getElementById('chk-selecionar-todos').addEventListener('change', (e) => {
        const checkboxes = document.querySelectorAll('.chk-item');
        checkboxes.forEach(chk => chk.checked = e.target.checked);
        atualizarBarraAcoesLote();
    });

    // Ocultar em Lote (Múltiplos Soft Deletes)
    document.getElementById('btn-ocultar-lote').addEventListener('click', async () => {
        const selecionados = Array.from(document.querySelectorAll('.chk-item:checked')).map(cb => cb.value);
        if(selecionados.length === 0) return;
        
        if(confirm(\`Mover \${selecionados.length} produto(s) para a lixeira?\`)) {
            // Usa o operador .in() para atualizar vários IDs de uma vez
            const { error } = await clienteSupabase.from('produtos').update({ deleted_at: new Date().toISOString() }).in('id', selecionados);
            if(!error) {
                mostrarToast(\`\${selecionados.length} itens ocultados!\`, "sucesso");
                document.getElementById('chk-selecionar-todos').checked = false;
                carregarListagemProdutos();
            } else {
                mostrarToast("Erro na exclusão em lote.", "erro");
            }
        }
    });

    // Alternar Visualização da Lixeira
    document.getElementById('btn-ver-lixeira').addEventListener('click', () => {
        exibindoLixeira = !exibindoLixeira;
        const btn = document.getElementById('btn-ver-lixeira');
        const titulo = document.getElementById('titulo-painel');
        const statusLixeira = document.getElementById('status-lixeira');

        if(exibindoLixeira) {
            btn.textContent = "📦 Ver Ativos";
            btn.className = "btn-sucesso";
            titulo.textContent = "Lixeira de Produtos";
            statusLixeira.style.display = "block";
            document.getElementById('input-busca-lista').value = ''; // Limpa busca
        } else {
            btn.textContent = "👁️ Ver Lixeira";
            btn.className = "btn-secundario";
            titulo.textContent = "Lista de Produtos 📦";
            statusLixeira.style.display = "none";
        }
        carregarListagemProdutos();
    });

    // Esvaziar Lixeira Permanentemente (Hard Delete)
    document.getElementById('btn-limpar-lixeira').addEventListener('click', async () => {
        if(confirm("ATENÇÃO: Isto apagará os itens da lixeira permanentemente. Tem a certeza?")) {
            // Deleta do banco de dados onde deleted_at não é nulo
            const { error } = await clienteSupabase.from('produtos').delete().not('deleted_at', 'is', null);
            if(!error) {
                mostrarToast("Lixeira esvaziada com sucesso!", "sucesso");
                carregarListagemProdutos();
            } else {
                mostrarToast("Erro ao esvaziar lixeira.", "erro");
            }
        }
    });

    // Evento do Botão de Busca
    document.getElementById('btn-buscar-lista').addEventListener('click', () => {
        carregarListagemProdutos();
    });

    // -------------------------------------------------------------------------
    // RESTANTE DO CÓDIGO (Cadastro, Dicionário de Fornecedores, Upload) 
    // Mantido intacto da tua versão anterior
    // -------------------------------------------------------------------------
    
    let mapaFornecedores = {}; 
    async function carregarFornecedoresParaDropdown() {
        const datalist = document.getElementById('lista-fornecedores');
        const { data: fornecedores, error } = await clienteSupabase
            .from('entidades').select('id, nome').eq('tipo', 'fornecedor').is('deleted_at', null);
        if (!error && fornecedores) {
            datalist.innerHTML = ''; 
            fornecedores.forEach(f => {
                mapaFornecedores[f.nome] = f.id; 
                const option = document.createElement('option');
                option.value = f.nome; datalist.appendChild(option);
            });
        }
    }
    carregarFornecedoresParaDropdown();

    document.getElementById('btn-voltar-menu').onclick = () => desenharMenuPrincipal(emailDoOperador);
    document.getElementById('aba-btn-cadastro').onclick = () => alternarAba('cadastro');
    document.getElementById('aba-btn-lista').onclick = () => {
        alternarAba('lista');
        carregarListagemProdutos(); 
    };

    document.getElementById('btn-scan-ean').onclick = () => abrirLeitorCodigoBarras('prod-ean');

    let arquivoParaUpload = null;
    const atualizarInfoFoto = (evento) => {
        if (evento.target.files.length > 0) {
            arquivoParaUpload = evento.target.files[0];
            document.getElementById('info-foto').textContent = \`✅ Foto selecionada: \${arquivoParaUpload.name}\`;
            document.getElementById('info-foto').style.color = "var(--accent-neon)";
            document.getElementById('img-preview').src = URL.createObjectURL(arquivoParaUpload);
        }
    };
    document.getElementById('prod-imagem-camera').addEventListener('change', atualizarInfoFoto);
    document.getElementById('prod-imagem-galeria').addEventListener('change', atualizarInfoFoto);

    document.getElementById('btn-salvar-produto').onclick = async () => {
        const nome = document.getElementById('prod-nome').value.trim();
        const preco = parseFloat(document.getElementById('prod-preco').value);
        if(!nome || isNaN(preco)) return alert("Os campos Nome e Preço de Venda são obrigatórios.");

        const btnSalvar = document.getElementById('btn-salvar-produto');
        btnSalvar.textContent = "A processar..."; btnSalvar.disabled = true;

        let imagemUrl = null;
        if (arquivoParaUpload) {
            btnSalvar.textContent = "A comprimir e enviar foto...";
            const nomeArquivo = \`prod_\${Date.now()}_\${Math.floor(Math.random() * 1000)}.jpg\`;
            imagemUrl = await comprimirEUploadImagem(arquivoParaUpload, 'storage_produtos', nomeArquivo);
        }

        btnSalvar.textContent = "A guardar no banco de dados...";
        const nomeFornecedorDigitado = document.getElementById('prod-fornecedor').value.trim();
        const idDoFornecedor = mapaFornecedores[nomeFornecedorDigitado] || null;
        const origemSelecionada = document.getElementById('prod-origem').value;
        
        const payloadDoBanco = { 
            nome: nome, descricao: document.getElementById('prod-descricao').value.trim() || null, 
            fornecedor_id: idDoFornecedor, preco: preco,
            preco_custo: parseFloat(document.getElementById('prod-custo').value) || 0,
            estoque_atual: parseInt(document.getElementById('prod-estoque').value) || 0,
            estoque_minimo: parseInt(document.getElementById('prod-estoque-min').value) || 0,
            ean: document.getElementById('prod-ean').value.trim() || null,
            categoria: document.getElementById('prod-categoria').value.trim() || null,
            origem: origemSelecionada !== 'Selecione...' ? origemSelecionada : null,
            data_compra: document.getElementById('prod-data-compra').value || null,
            data_vencimento: document.getElementById('prod-data-vencimento').value || null,
            peso: parseFloat(document.getElementById('prod-peso').value) || null,
            dimensoes: document.getElementById('prod-dimensoes').value.trim() || null,
            localizacao_loja: document.getElementById('prod-loc-loja').value.trim() || null,
            localizacao_estoque: document.getElementById('prod-loc-estoque').value.trim() || null,
            imagem_url: imagemUrl
        };

        const { error } = await clienteSupabase.from('produtos').insert([payloadDoBanco]);

        if (error) { 
            mostrarToast("Erro ao cadastrar.", "erro"); console.error(error);
        } else {
            mostrarToast("Produto guardado!", "sucesso");
            document.getElementById('prod-nome').value = ''; document.getElementById('prod-descricao').value = ''; 
            document.getElementById('prod-fornecedor').value = ''; document.getElementById('prod-preco').value = '';
            document.getElementById('prod-custo').value = ''; document.getElementById('prod-estoque').value = '0';
            document.getElementById('prod-estoque-min').value = '0'; document.getElementById('prod-ean').value = '';
            document.getElementById('prod-categoria').value = ''; document.getElementById('prod-origem').value = 'Selecione...';
            document.getElementById('prod-data-compra').value = ''; document.getElementById('prod-data-vencimento').value = '';
            document.getElementById('prod-peso').value = ''; document.getElementById('prod-dimensoes').value = '';
            document.getElementById('prod-loc-loja').value = ''; document.getElementById('prod-loc-estoque').value = '';
            arquivoParaUpload = null; document.getElementById('info-foto').textContent = "Nenhuma imagem selecionada";
            document.getElementById('img-preview').src = "https://via.placeholder.com/200?text=Sem+Foto";
            document.getElementById('aba-btn-lista').click();
        }
        btnSalvar.textContent = "💾 Guardar Produto Completo"; btnSalvar.disabled = false;
    };
}







/*🟥
6.[INÍCIO: SUBSTITUIR A FUNÇÃO 'desenharModuloEntidades' EXISTENTE POR ESTE BLOCO]
🟥*/

function desenharModuloEntidades(emailDoOperador) {
    appRoot.innerHTML = `
        <header>
            <div class="logo-area">
                <!-- Botão para regressar ao Centro de Comando -->
                <button id="btn-voltar-menu-ent" class="icon-btn" style="margin-right: 10px;">⬅️</button>
                <div>
                    <div>🏢 Entidades</div>
                    <div style="font-size: 0.7em; color: var(--text-muted); font-weight: normal;">${emailDoOperador}</div>
                </div>
            </div>
        </header>

        <!-- Menu de Abas de Navegação -->
        <div class="tabs-menu">
            <button id="aba-btn-cadastro" class="tab-btn active">📝 Registar</button>
            <button id="aba-btn-lista" class="tab-btn">👥 Contactos</button>
        </div>

        <!-- ABA 1: Formulário de Cadastro -->
        <div id="aba-conteudo-cadastro" class="tab-content active card">
            <div class="titulo">Nova Entidade</div>
            
            <label>Tipo de Contacto *</label>
            <select id="ent-tipo" style="width: 100%; padding: 12px; margin-bottom: 15px; border-radius: 8px; background: var(--bg-color); color: var(--text-main); border: 1px solid var(--border-color); outline: none;">
                <option value="cliente">Cliente</option>
                <option value="fornecedor">Fornecedor</option>
                <option value="funcionario">Funcionário</option>
                <option value="colaborador">Colaborador</option>
            </select>

            <label>Nome Completo / Empresa *</label>
            <input type="text" id="ent-nome" placeholder="Ex: João Silva ou Distribuidora XPTO">
            
            <label>Documento (CPF/CNPJ)</label>
            <input type="text" id="ent-documento" placeholder="Opcional">
            
            <label>Telefone</label>
            <input type="text" id="ent-telefone" placeholder="Opcional">
            
            <label>E-mail</label>
            <input type="email" id="ent-email" placeholder="Opcional">

            <label>Observações</label>
            <textarea id="ent-observacoes" rows="3" placeholder="Detalhes adicionais..."></textarea>
            
            <button id="btn-salvar-entidade" class="btn-neon">Guardar Entidade</button>
        </div>

        <!-- ABA 2: Lista de Entidades -->
        <div id="aba-conteudo-lista" class="tab-content card">
            <div class="titulo">Meus Contactos</div>
            <ul id="lista-entidades">
                <li style="justify-content: center; color: var(--text-muted);">A carregar dados...</li>
            </ul>
        </div>
    `;

    // Evento para voltar ao Menu Principal
    document.getElementById('btn-voltar-menu-ent').onclick = () => desenharMenuPrincipal(emailDoOperador);

    // Lógica das Abas (Reaproveita a função auxiliar que já criámos)
    document.getElementById('aba-btn-cadastro').onclick = () => alternarAba('cadastro');
    document.getElementById('aba-btn-lista').onclick = () => {
        alternarAba('lista');
        carregarListagemEntidades(); // Atualiza a lista sempre que clicas na aba
    };

    // Lógica para Salvar Nova Entidade no Banco de Dados
    document.getElementById('btn-salvar-entidade').onclick = async () => {
        // Captura os valores dos campos
        const tipo = document.getElementById('ent-tipo').value;
        const nome = document.getElementById('ent-nome').value.trim();
        const documento = document.getElementById('ent-documento').value.trim();
        const telefone = document.getElementById('ent-telefone').value.trim();
        const email = document.getElementById('ent-email').value.trim();
        const observacoes = document.getElementById('ent-observacoes').value.trim();
        
        // Validação Mínima: A nossa tabela exige um nome com pelo menos 3 caracteres
        if (!nome || nome.length < 3) return alert("O nome é obrigatório e deve ter pelo menos 3 letras.");

        // Comunicação com o Supabase
        const { error } = await clienteSupabase.from('entidades').insert([{ 
            tipo, nome, documento, telefone, email, observacoes 
        }]);

        if (error) {
            console.error("Erro ao salvar entidade:", error);
            alert("Erro ao cadastrar. Verifica o Console Mobile para detalhes.");
        } else {
            alert("Entidade guardada com sucesso!");
            
            // Limpa os campos após salvar com sucesso
            document.getElementById('ent-nome').value = '';
            document.getElementById('ent-documento').value = '';
            document.getElementById('ent-telefone').value = '';
            document.getElementById('ent-email').value = '';
            document.getElementById('ent-observacoes').value = '';
            
            // Redireciona automaticamente para a aba da lista para melhor usabilidade (UX)
            document.getElementById('aba-btn-lista').click();
        }
    };
}

// [INÍCIO: FUNÇÃO AUXILIAR DE LISTAGEM DE ENTIDADES]
async function carregarListagemEntidades() {
    const listaElement = document.getElementById('lista-entidades');
    listaElement.innerHTML = '<li style="justify-content: center; color: var(--text-muted);">A procurar no banco de dados...</li>';
    
    // Busca as entidades que não foram deletadas, ordenando da mais recente para a mais antiga
    const { data: entidades, error } = await clienteSupabase
        .from('entidades')
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

    listaElement.innerHTML = ''; 

    if (error) {
        console.error("Erro ao listar entidades:", error);
        return listaElement.textContent = "Erro ao carregar dados.";
    }
    
    if (entidades.length === 0) {
        return listaElement.textContent = "Nenhuma entidade cadastrada.";
    }

    // Processo de renderização visual dos contactos
    entidades.forEach(entidade => {
        const li = document.createElement('li');
        // Usamos flexbox em coluna para que os dados fiquem empilhados num cartão agradável
        li.style.flexDirection = 'column'; 
        li.style.alignItems = 'flex-start';

        // 1. Linha do Topo: Nome (Esquerda) e Tipo (Direita em formato de Etiqueta)
        const divTopo = document.createElement('div');
        divTopo.style.display = 'flex';
        divTopo.style.justifyContent = 'space-between';
        divTopo.style.width = '100%';
        divTopo.style.marginBottom = '5px';

        const spanNome = document.createElement('span'); 
        spanNome.textContent = entidade.nome; // BLINDAGEM XSS
        spanNome.style.fontWeight = 'bold';
        
        const spanTipo = document.createElement('span'); 
        spanTipo.textContent = entidade.tipo.toUpperCase();
        spanTipo.style.fontSize = '0.7em';
        spanTipo.style.padding = '4px 8px';
        spanTipo.style.borderRadius = '12px';
        spanTipo.style.backgroundColor = 'var(--border-color)';

        divTopo.appendChild(spanNome);
        divTopo.appendChild(spanTipo);

        // 2. Linha Secundária: Junta o telefone e o documento se existirem
        const divInfo = document.createElement('div');
        divInfo.style.fontSize = '0.85em';
        divInfo.style.color = 'var(--text-muted)';
        
        let infoTexto = [];
        if (entidade.telefone) infoTexto.push(`📞 ${entidade.telefone}`);
        if (entidade.documento) infoTexto.push(`📄 ${entidade.documento}`);
        
        divInfo.textContent = infoTexto.join(' | '); // BLINDAGEM XSS

        // Junta tudo no elemento <li>
        li.appendChild(divTopo);
        if (infoTexto.length > 0) li.appendChild(divInfo);
        
        // Adiciona à lista final no HTML
        listaElement.appendChild(li);
    });
}
//[FIM: BLOCO DE ENTIDADES]


/*🟥
7. Componente: Utilitário de Compressão e Upload de Imagens (Supabase Storage)
🟥*/

/**
 * Função global para comprimir imagens no navegador e enviar para um bucket específico.
 * @param {File} arquivoOriginal - O ficheiro de imagem selecionado no input type="file".
 * @param {String} nomeBucket - O nome do bucket no Supabase (ex: 'storage_produtos').
 * @param {String} caminhoNomeArquivo - O nome que a imagem terá no banco (ex: 'prod_123.jpg').
 * @returns {String|null} - Retorna o URL público da imagem ou null em caso de erro.
 */
async function comprimirEUploadImagem(arquivoOriginal, nomeBucket, caminhoNomeArquivo) {
    if (!arquivoOriginal) return null;

    console.log(`A iniciar compressão para o bucket: ${nomeBucket}...`);

    // 1. Envolvemos a tua lógica de compressão nativa numa Promessa (Promise) para aguardar o resultado
    const blobComprimido = await new Promise((resolve) => {
        const leitor = new FileReader();
        leitor.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const TAMANHO_MAXIMO = 800; // Limite inteligente do teu código antigo
                let largura = img.width;
                let altura = img.height;

                // Cálculo de proporção para redimensionamento
                if (largura > altura && largura > TAMANHO_MAXIMO) {
                    altura *= TAMANHO_MAXIMO / largura;
                    largura = TAMANHO_MAXIMO;
                } else if (altura > TAMANHO_MAXIMO) {
                    largura *= TAMANHO_MAXIMO / altura;
                    altura = TAMANHO_MAXIMO;
                }

                canvas.width = largura;
                canvas.height = altura;
                const contexto = canvas.getContext('2d');
                contexto.drawImage(img, 0, 0, largura, altura);

                // Converte o canvas para um ficheiro Blob (JPEG com 70% de qualidade)
                canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.7); 
            };
            img.src = e.target.result;
        };
        leitor.readAsDataURL(arquivoOriginal);
    });

    console.log("Compressão concluída. A iniciar upload para o Supabase...");

    // 2. Envia o ficheiro comprimido para o Supabase Storage
    const { data, error } = await clienteSupabase.storage
        .from(nomeBucket)
        .upload(caminhoNomeArquivo, blobComprimido, {
            cacheControl: '3600',
            upsert: true // Se já existir uma foto com o mesmo nome, substitui
        });

    if (error) {
        console.error(`Erro no upload para o bucket ${nomeBucket}:`, error);
        alert("Falha ao enviar a imagem. Verifica as regras RLS do teu Storage.");
        return null;
    }

    // 3. Gera e devolve o URL público para guardarmos na tabela do banco de dados
    const { data: linkPublico } = clienteSupabase.storage.from(nomeBucket).getPublicUrl(caminhoNomeArquivo);
    console.log("Upload concluído com sucesso:", linkPublico.publicUrl);
    
    return linkPublico.publicUrl;
}


/*🟥
8. Componente: Leitor de Código de Barras (Interface e Lógica Reutilizável)
🟥*/

// 1. Cria a janela do leitor de forma dinâmica (escondida por defeito) e injeta no corpo da página
const scannerModal = document.createElement('div');
scannerModal.style.cssText = `display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 10001; flex-direction: column; justify-content: center; align-items: center;`;

scannerModal.innerHTML = `
    <h3 style="color: white; margin-bottom: 20px; font-family: sans-serif;">Aponte para o Código</h3>
    <div id="area-leitor-camera" style="width: 100%; max-width: 400px; background: white; border-radius: 8px; overflow: hidden; margin-bottom: 20px;"></div>
    <button id="btn-fechar-scanner" style="padding: 12px 25px; background: #dc3545; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 1.1em; cursor: pointer;">❌ Cancelar</button>
`;
document.body.appendChild(scannerModal);

let instanciaLeitor = null; // Guarda a referência da câmara

/**
 * Abre a câmara e, ao ler um código, injeta o valor diretamente num input à tua escolha.
 * @param {String} idDoInputDestino - O ID do campo HTML onde o código lido vai aparecer (ex: 'prod-ean').
 */
function abrirLeitorCodigoBarras(idDoInputDestino) {
    // Verifica se a biblioteca foi importada no index2.html
    if (typeof Html5Qrcode === 'undefined') {
        return alert("Erro: A biblioteca Html5Qrcode não foi encontrada no index2.html.");
    }

    scannerModal.style.display = 'flex'; // Mostra o ecrã preto
    instanciaLeitor = new Html5Qrcode("area-leitor-camera");

    const configLeitura = { fps: 10, qrbox: { width: 250, height: 120 } };

    // Inicia a câmara traseira
    instanciaLeitor.start(
        { facingMode: "environment" }, 
        configLeitura, 
        (codigoLido) => {
            // SUCESSO: Capturou um código!
            console.log("Código lido:", codigoLido);
            
            // Injeta o valor no campo de formulário que pedimos
            const inputDestino = document.getElementById(idDoInputDestino);
            if (inputDestino) inputDestino.value = codigoLido;

            // Desliga a câmara e fecha a janela
            fecharScanner();
        },
        (erroLeitura) => {
            // Ignoramos erros contínuos (ocorrem a cada frame que não apanha código)
        }
    ).catch((err) => {
        alert("Erro ao aceder à câmara. Verifica as permissões no telemóvel.");
        fecharScanner();
    });
}

// Botão de cancelar no ecrã do scanner
document.getElementById('btn-fechar-scanner').addEventListener('click', fecharScanner);

function fecharScanner() {
    if (instanciaLeitor) {
        instanciaLeitor.stop().then(() => {
            scannerModal.style.display = 'none';
        }).catch(() => {
            scannerModal.style.display = 'none';
        });
    } else {
        scannerModal.style.display = 'none';
    }
}




/*🟥
 FUNÇÕES AUXILIARES DE INTERFACE
🟥*/ 


function alternarAba(abaSelecionada) {
    document.getElementById('aba-btn-cadastro').classList.remove('active');
    document.getElementById('aba-btn-lista').classList.remove('active');
    document.getElementById('aba-conteudo-cadastro').classList.remove('active');
    document.getElementById('aba-conteudo-lista').classList.remove('active');

    if(abaSelecionada === 'cadastro') {
        document.getElementById('aba-btn-cadastro').classList.add('active');
        document.getElementById('aba-conteudo-cadastro').classList.add('active');
    } else {
        document.getElementById('aba-btn-lista').classList.add('active');
        document.getElementById('aba-conteudo-lista').classList.add('active');
    }
}




/*🟥
 Arranca a Aplicação
🟥*/

iniciarApp();
