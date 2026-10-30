
/* =========================================================
   🟥 BLOCO 2: NÚCLEO SPA, SEGURANÇA BANCÁRIA E CONFIGURAÇÕES 🟥
   ========================================================= */

/* --- 1. CONFIGURAÇÃO DO SUPABASE --- */
const SUPABASE_URL = 'https://tthzclsajjzftjombmlu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0aHpjbHNhamp6ZnRqb21ibWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwMTYzNDEsImV4cCI6MjEwODU5MjM0MX0.jzf2Mr74d9jx4LHz0OxjZJ5G7Y9kaVSIneYOxm8mot4';

let clienteSupabase = null;
if (typeof supabase !== 'undefined') {
    clienteSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    console.error("Biblioteca do Supabase não foi carregada.");
}

// Estado Global dos Dados da Empresa (usado no PDV, Cupão e Vitrine)
let dadosEmpresaGlobal = {
    id: null,
    nome_completo: 'Minha Loja ERP',
    numero_documento: '',
    telefone: '91992420981',
    email: '',
    endereco_completo: '',
    foto_url: '',
    margem_padrao_xml: 30, // 30% de margem padrão ao importar XML
    chave_pix: ''
};

/* --- 2. ESCUDO DE SEGURANÇA BANCÁRIA (ANTI-XSS) E TOASTS --- */

/**
 * Limpa textos vindos do utilizador ou do banco para impedir ataques de código malicioso (XSS).
 */
function escaparHTML(texto) {
    if (texto === null || texto === undefined) return '';
    return String(texto)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Mostra uma notificação flutuante bonita no canto superior direito.
 * @param {string} mensagem - O texto a exibir.
 * @param {string} tipo - 'sucesso', 'erro', 'info' ou 'aviso'.
 */
function mostrarToast(mensagem, tipo = 'sucesso') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    
    let icone = '✅';
    if (tipo === 'erro') icone = '❌';
    if (tipo === 'info') icone = 'ℹ️';
    if (tipo === 'aviso') icone = '⚠️';

    toast.innerHTML = `<span>${icone}</span> <span>${escaparHTML(mensagem)}</span>`;
    container.appendChild(toast);

    // Remove o aviso automaticamente após 4 segundos
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(120%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

/**
 * Traduz erros técnicos do banco de dados para mensagens claras em português.
 */
function tratarErroSupabase(erro, contexto = 'Operação') {
    console.error(`[Erro em ${contexto}]:`, erro);
    const msg = (erro && erro.message) ? erro.message.toLowerCase() : String(erro).toLowerCase();

    if (msg.includes('foreign key constraint')) {
        mostrarToast('Não é possível apagar este registo porque ele está vinculado a vendas, produtos ou lançamentos financeiros. Use a opção de enviar para a Lixeira!', 'aviso');
    } else if (msg.includes('duplicate key') || msg.includes('unique constraint')) {
        mostrarToast('Já existe um registo cadastrado com este Código, Documento ou E-mail.', 'aviso');
    } else if (msg.includes('invalid login credentials')) {
        mostrarToast('E-mail ou palavra-passe incorretos. Tente novamente.', 'erro');
    } else if (msg.includes('jwt expired') || msg.includes('not authenticated')) {
        mostrarToast('A sua sessão expirou por segurança. Faça login novamente.', 'aviso');
        iniciarApp();
    } else {
        mostrarToast(`${contexto}: Ocorreu uma falha de comunicação (${erro.message || 'Erro desconhecido'}).`, 'erro');
    }
}

/* --- 3. BARRA FLUTUANTE DE FERRAMENTAS E CONSOLE MOBILE --- */
const ferramentasContainer = document.createElement('div');
ferramentasContainer.style.cssText = `position: fixed; bottom: 10px; right: 10px; display: flex; gap: 8px; z-index: 10000; flex-wrap: wrap;`;

const btnMenuGlobal = document.createElement('button');
btnMenuGlobal.textContent = '🏠 Menu';
btnMenuGlobal.style.cssText = `padding: 10px 14px; background: var(--success-color); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.4); display: none;`;
btnMenuGlobal.onclick = () => iniciarApp();

const btnVitrineGlobal = document.createElement('button');
btnVitrineGlobal.textContent = '🛍️ Loja';
btnVitrineGlobal.style.cssText = `padding: 10px 14px; background: var(--info-color); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.4);`;
btnVitrineGlobal.onclick = () => {
    if (typeof desenharModuloVitrinePublica === 'function') {
        desenharModuloVitrinePublica();
    } else {
        mostrarToast('A carregar módulo da loja...', 'info');
    }
};

const btnSairGlobal = document.createElement('button');
btnSairGlobal.textContent = '🚪 Sair';
btnSairGlobal.style.cssText = `padding: 10px 14px; background: var(--danger-color); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.4); display: none;`;

const btnTemaGlobal = document.createElement('button');
btnTemaGlobal.textContent = '🌓 Tema';
btnTemaGlobal.style.cssText = `padding: 10px 14px; background: #334155; color: white; border: 1px solid #475569; border-radius: 8px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.4);`;
btnTemaGlobal.onclick = () => document.body.classList.toggle('light-theme');

const toggleBtn = document.createElement('button');
toggleBtn.textContent = '🛠️ Log';
toggleBtn.style.cssText = `padding: 10px 14px; background: #475569; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.4);`;

const consoleContainer = document.createElement('div');
consoleContainer.style.cssText = `position: fixed; bottom: 65px; left: 10px; right: 10px; height: 260px; background: rgba(0, 0, 0, 0.92); color: #00ff00; font-family: monospace; font-size: 12px; padding: 12px; overflow-y: scroll; z-index: 9999; display: none; border-radius: 10px; border: 1px solid #333; box-shadow: 0 -4px 15px rgba(0,0,0,0.6);`;

ferramentasContainer.appendChild(btnMenuGlobal);
ferramentasContainer.appendChild(btnVitrineGlobal);
ferramentasContainer.appendChild(btnSairGlobal);
ferramentasContainer.appendChild(btnTemaGlobal);
ferramentasContainer.appendChild(toggleBtn);

document.body.appendChild(consoleContainer);
document.body.appendChild(ferramentasContainer);

toggleBtn.addEventListener('click', () => {
    consoleContainer.style.display = consoleContainer.style.display === 'none' ? 'block' : 'none';
});

const originalLog = console.log;
const originalError = console.error;
function espelharNoEcra(tipo, cor, argumentos) {
    const linha = document.createElement('div');
    linha.style.color = cor;
    linha.style.marginBottom = '4px';
    linha.style.borderBottom = '1px solid #222';
    linha.textContent = `[${new Date().toLocaleTimeString()} - ${tipo}]${Array.from(argumentos).map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ')}`;
    consoleContainer.appendChild(linha);
    consoleContainer.scrollTop = consoleContainer.scrollHeight;
}
console.log = function(...args) { originalLog.apply(console, args); espelharNoEcra('LOG', '#10b981', args); };
console.error = function(...args) { originalError.apply(console, args); espelharNoEcra('ERRO', '#ef4444', args); };

console.log("🚀 ERP Pro Iniciado com Segurança Bancária Ativa.");

/* --- 4. COMPRESSOR DE IMAGENS WEBP E NOMES SEGUROS --- */
function comprimirParaWebP(file, maxWidthHeight = 800) {
    return new Promise((resolve, reject) => {
        if (!file) return reject(new Error("Nenhum ficheiro fornecido."));
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                let width = img.width;
                let height = img.height;
                if (width > height) {
                    if (width > maxWidthHeight) { height = Math.round(height * (maxWidthHeight / width)); width = maxWidthHeight; }
                } else {
                    if (height > maxWidthHeight) { width = Math.round(width * (maxWidthHeight / height)); height = maxWidthHeight; }
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    if (blob) {
                        const novoNome = file.name.replace(/\.[^/.]+$/, ".webp");
                        resolve(new File([blob], novoNome, { type: 'image/webp' }));
                    } else {
                        reject(new Error("Falha ao converter imagem para WebP."));
                    }
                }, 'image/webp', 0.8);
            };
            img.onerror = () => reject(new Error("Formato de imagem inválido."));
        };
        reader.onerror = () => reject(new Error("Erro ao ler ficheiro."));
    });
}

function gerarNomeSeguroArquivo(prefixo) {
    let nomeLimpo = (prefixo || 'arq').normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    nomeLimpo = nomeLimpo.replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    return `${nomeLimpo}-${Date.now()}.webp`;
}

/* --- 5. SCANNER GLOBAL DE CÓDIGO DE BARRAS E QR CODE --- */
let scannerGlobalInstancia = null;
let scannerCallbackDestino = null;

const scannerModalHTML = `
    <div id="modal-scanner-global" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 10000; flex-direction: column; align-items: center; justify-content: center; padding: 15px;">
        <h3 style="color: #fff; margin-bottom: 15px; text-align: center;">📷 Aponte a câmara para o Código de Barras / QR</h3>
        <div id="leitor-scanner-global" style="width: 100%; max-width: 480px; background: #000; border-radius: 12px; overflow: hidden; border: 2px solid var(--accent-neon);"></div>
        <button onclick="fecharScannerGlobal()" class="btn-perigo" style="max-width: 260px; margin-top: 20px;">❌ Cancelar Leitura</button>
    </div>
`;
document.body.insertAdjacentHTML('beforeend', scannerModalHTML);

function abrirScannerGlobal(callback) {
    scannerCallbackDestino = callback;
    const modal = document.getElementById('modal-scanner-global');
    modal.style.display = 'flex';

    if (!scannerGlobalInstancia) {
        scannerGlobalInstancia = new Html5Qrcode("leitor-scanner-global");
    }

    scannerGlobalInstancia.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 110 } },
        (codigoLido) => {
            fecharScannerGlobal();
            mostrarToast(`Código lido: ${codigoLido}`, 'info');
            if (scannerCallbackDestino) scannerCallbackDestino(codigoLido);
        },
        () => {}
    ).catch((err) => {
        mostrarToast("Não foi possível aceder à câmara. Verifique as permissões do navegador.", "erro");
        fecharScannerGlobal();
    });
}

function fecharScannerGlobal() {
    const modal = document.getElementById('modal-scanner-global');
    if (scannerGlobalInstancia) {
        scannerGlobalInstancia.stop().then(() => { modal.style.display = 'none'; }).catch(() => { modal.style.display = 'none'; });
    } else {
        modal.style.display = 'none';
    }
}

/* --- 6. CARREGAMENTO AUTOMÁTICO DOS DADOS DA EMPRESA --- */
async function carregarConfiguracoesEmpresa() {
    try {
        // Carrega preferências locais complementares (Margem XML e PIX)
        const configLocal = localStorage.getItem('erp_config_complementar');
        if (configLocal) {
            const parsed = JSON.parse(configLocal);
            dadosEmpresaGlobal.margem_padrao_xml = parseFloat(parsed.margem_padrao_xml) || 30;
            dadosEmpresaGlobal.chave_pix = parsed.chave_pix || '';
        }

        // Busca os dados oficiais da empresa na tabela 'entidades' (tipo = 'empresa')
        const { data, error } = await clienteSupabase
            .from('entidades')
            .select('*')
            .eq('tipo', 'empresa')
            .neq('status', 'lixeira')
            .limit(1)
            .maybeSingle();

        if (data && !error) {
            dadosEmpresaGlobal.id = data.id;
            dadosEmpresaGlobal.nome_completo = data.nome_completo || 'Minha Loja ERP';
            dadosEmpresaGlobal.numero_documento = data.numero_documento || '';
            dadosEmpresaGlobal.telefone = data.telefone || '5591999999999';
            dadosEmpresaGlobal.email = data.email || '';
            dadosEmpresaGlobal.endereco_completo = data.endereco_completo || '';
            dadosEmpresaGlobal.foto_url = data.foto_url || '';
        }
    } catch (e) {
        console.log("Aviso: Dados da empresa ainda não configurados.");
    }
}

/* --- 7. ROTEAMENTO PRINCIPAL E AUTENTICAÇÃO --- */
const appRoot = document.getElementById('app-root');

async function iniciarApp() {
    await carregarConfiguracoesEmpresa();

    // Se o link tiver #vitrine, abre diretamente a Loja Online para o cliente!
    if (window.location.hash === '#vitrine' && typeof desenharModuloVitrinePublica === 'function') {
        desenharModuloVitrinePublica();
        return;
    }

    const { data: { session } } = await clienteSupabase.auth.getSession();
    if (session) {
        btnMenuGlobal.style.display = 'block';
        btnSairGlobal.style.display = 'block';
        desenharMenuPrincipal(session.user.email);
    } else {
        btnMenuGlobal.style.display = 'none';
        btnSairGlobal.style.display = 'none';
        desenharLogin();
    }
}

btnSairGlobal.onclick = async () => {
    if (confirm("Deseja realmente encerrar a sessão com segurança?")) {
        await clienteSupabase.auth.signOut();
        mostrarToast("Sessão encerrada com sucesso.", "info");
        iniciarApp();
    }
};

function desenharLogin() {
    appRoot.innerHTML = `
        <div class="card" style="margin-top: 8vh;">
            <div class="titulo">🔐 ${escaparHTML(dadosEmpresaGlobal.nome_completo)}</div>
            <p style="text-align: center; color: var(--text-muted); font-size: 0.9em; margin-top: -10px; margin-bottom: 20px;">Acesso Restrito ao Sistema ERP</p>
            
            <div id="area-login">
                <label>E-mail Corporativo</label>
                <input type="email" id="login-email" placeholder="seu@email.com">
                
                <label>Palavra-passe</label>
                <div class="input-senha-container">
                    <input type="password" id="login-senha" placeholder="••••••••">
                    <button type="button" class="btn-olho" onclick="alternarVisibilidadeSenha('login-senha', this)">🔒</button>
                </div>

                <button id="btn-entrar" class="btn-neon">Entrar no Sistema</button>
                <button id="btn-ir-registo" class="btn-secundario">Criar Conta de Operador</button>



<button id="btn-login-google" type="button" class="btn-secundario" style="background-color: #ffffff; color: #4285F4; border-color: #4285F4; display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" style="width: 18px; height: 18px;" alt="Google">
                    Entrar com o Google
                </button>



            </div>

            <div id="area-registo" style="display: none;">
                <label>Novo E-mail</label>
                <input type="email" id="reg-email" placeholder="novo@email.com">
                
                <label>Criar Palavra-passe (Mín. 6 caracteres)</label>
                <div class="input-senha-container">
                    <input type="password" id="reg-senha" placeholder="Mínimo 6 caracteres">
                    <button type="button" class="btn-olho" onclick="alternarVisibilidadeSenha('reg-senha', this)">🔒</button>
                </div>

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
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-senha').value;
        if (!email || !password) return mostrarToast("Preencha o e-mail e a palavra-passe.", "aviso");
        
        const btn = document.getElementById('btn-entrar');
        btn.textContent = "⏳ A autenticar...";
        btn.disabled = true;

        const { error } = await clienteSupabase.auth.signInWithPassword({ email, password });
        btn.textContent = "Entrar no Sistema";
        btn.disabled = false;

        if (error) tratarErroSupabase(error, "Login");
        else {
            mostrarToast("Bem-vindo ao sistema!", "sucesso");
            iniciarApp();
        }
    };






// Variável manual de controlo: Coloca como 'true' APENAS DEPOIS de configurares o Google Cloud e o Supabase
    const IS_GOOGLE_LOGIN_ENABLED = true; 

    // Função inteligente para o Login via Google
    document.getElementById('btn-login-google').onclick = async () => {
        
        // 1. A nossa validação anti-ecrã-feio
        if (!IS_GOOGLE_LOGIN_ENABLED) {
            mostrarToast("O login com o Google está indisponível no momento. Por favor, usa o e-mail.", "aviso");
            return; // Interrompe a função aqui, não redireciona!
        }

        // 2. Se estiver ativado, prossegue com o fluxo normal
        const btn = document.getElementById('btn-login-google');
        btn.innerHTML = "⏳ A redirecionar para o Google...";
        btn.disabled = true;

        const { error } = await clienteSupabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });

        if (error) {
            tratarErroSupabase(error, "Login Google");
            btn.innerHTML = `<img src="https://www.svgrepo.com/show/475656/google-color.svg" style="width: 18px; height: 18px;" alt="Google"> Entrar com o Google`;
            btn.disabled = false;
        }
    };














    document.getElementById('btn-registar').onclick = async () => {
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-senha').value;
        if (!email || password.length < 6) return mostrarToast("Informe um e-mail válido e senha com no mínimo 6 dígitos.", "aviso");
        
        const { error } = await clienteSupabase.auth.signUp({ email, password });
        if (error) tratarErroSupabase(error, "Registo");
        else {
            mostrarToast("Conta criada! Verifique o seu e-mail ou faça login.", "sucesso");
            document.getElementById('btn-voltar-login').click();
        }
    };
}

window.alternarVisibilidadeSenha = function(idInput, btnOlho) {
    const input = document.getElementById(idInput);
    if (input.type === 'password') { input.type = 'text'; btnOlho.textContent = '🔓'; }
    else { input.type = 'password'; btnOlho.textContent = '🔒'; }
};


/* --- 8. MENU PRINCIPAL DO SISTEMA --- */
function desenharMenuPrincipal(emailDoOperador) {
    const logoHTML = dadosEmpresaGlobal.foto_url 
        ? `<img src="${escaparHTML(dadosEmpresaGlobal.foto_url)}" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover; border: 2px solid var(--accent-neon); margin-bottom: 10px;">`
        : ``;

    appRoot.innerHTML = `
        <div class="card" style="margin-top: 5vh; max-width: 650px; text-align: center;">
            ${logoHTML}
            <div class="titulo" style="margin-bottom: 5px;">${escaparHTML(dadosEmpresaGlobal.nome_completo)}</div>
            <p style="color: var(--text-muted); font-size: 0.88em; margin-bottom: 20px;">
                Operador ativo: <strong>${escaparHTML(emailDoOperador)}</strong>
            </p>
<div class="grid-menu">



<button class="btn-secundario" style="margin:0; padding: 18px 10px; border-color: var(--accent-neon);" onclick="desenharModuloConfiguracoes()">⚙️ Configurações</button>

<button class="btn-secundario" style="margin:0; padding: 18px 10px;" onclick="desenharModuloClientes()">🏢 Entidades</button>

<button class="btn-secundario" style="margin:0; padding: 18px 10px;" onclick="desenharModuloFinanceiro()">💰 Financeiro</button>
             

<button class="btn-secundario" style="margin:0; padding: 18px 10px;" onclick="desenharModuloProdutos()">📦 Produtos & XML</button>


<button class="btn-neon" style="margin:0; padding: 18px 10px; font-size: 1.05em;" onclick="desenharModuloPDV()">🛒 PDV (Caixa)</button>
               

 
               

 

                  


 <button class="btn-secundario" style="margin:0; padding: 18px 10px;" onclick="desenharModuloEntregas()">🛵 Entregas (Delivery)</button>
                <button class="btn-secundario" style="margin:0; padding: 18px 10px;" onclick="desenharModuloVitrinePublica()">🛍️ Vitrine / Loja</button>
                <button class="btn-secundario" style="margin:0; padding: 18px 10px;" onclick="desenharModuloRelatorios()">📊 Relatórios</button>
               

            </div>
        </div>
    `;
}

/* --- 9. NOVO MÓDULO: CONFIGURAÇÕES DA EMPRESA --- */
async function desenharModuloConfiguracoes() {
    await carregarConfiguracoesEmpresa();

    const previewLogo = dadosEmpresaGlobal.foto_url || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'><path d='M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z'/></svg>";

    appRoot.innerHTML = `
        <div class="card" style="margin-top: 4vh; max-width: 650px;">
            <div class="titulo">⚙️ Configurações da Empresa</div>
            <p style="color: var(--text-muted); font-size: 0.88em; text-align: center; margin-top: -10px; margin-bottom: 20px;">
                Estes dados aparecem no Cupão do PDV, na Carteirinha e recebem os pedidos da Vitrine Online no WhatsApp.
            </p>

            <form id="form-config-empresa">
                <div style="display: flex; flex-direction: column; align-items: center; gap: 10px; margin-bottom: 20px; padding: 15px; border: 1px dashed var(--border-color); border-radius: 10px;">
                    <img id="cfg-img-preview" src="${escaparHTML(previewLogo)}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%; border: 2px solid var(--accent-neon);">
                    <label for="cfg-foto-input" style="background: var(--info-color); color: #fff; padding: 8px 14px; border-radius: 6px; cursor: pointer; margin: 0;">📂 Alterar Logótipo da Loja</label>
                    <input type="file" id="cfg-foto-input" accept="image/*" style="display: none;">
                </div>

                <label>Nome Fantasia / Nome da Loja *</label>
                <input type="text" id="cfg-nome" required value="${escaparHTML(dadosEmpresaGlobal.nome_completo)}" placeholder="Ex: Mercadinho Bom Preço">

                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 180px;">
                        <label>CNPJ / CPF da Loja</label>
                        <input type="text" id="cfg-doc" value="${escaparHTML(dadosEmpresaGlobal.numero_documento)}" placeholder="00.000.000/0001-00">
                    </div>
                    <div style="flex: 1; min-width: 180px;">
                        <label>WhatsApp de Pedidos (Com DDD) *</label>
                        <input type="text" id="cfg-whatsapp" required value="${escaparHTML(dadosEmpresaGlobal.telefone)}" placeholder="5591988887777">
                    </div>
                </div>

                <label>E-mail Comercial</label>
                <input type="email" id="cfg-email" value="${escaparHTML(dadosEmpresaGlobal.email)}" placeholder="contato@minhaloja.com">

                <label>Endereço Completo da Loja</label>
                <input type="text" id="cfg-endereco" value="${escaparHTML(dadosEmpresaGlobal.endereco_completo)}" placeholder="Av. Principal, 100 - Centro">

                <div style="background: rgba(0,0,0,0.15); border: 1px solid var(--border-color); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h4 style="margin-top: 0; color: var(--accent-neon);">⚙️ Parâmetros de Automação (XML e PDV)</h4>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 160px;">
                            <label>Margem de Lucro Padrão XML (%)</label>
                            <input type="number" id="cfg-margem" step="0.1" value="${dadosEmpresaGlobal.margem_padrao_xml}" style="margin-bottom:0;">
                        </div>
                        <div style="flex: 1; min-width: 180px;">
                            <label>Chave PIX (Exibida no Cupão/Loja)</label>
                            <input type="text" id="cfg-pix" value="${escaparHTML(dadosEmpresaGlobal.chave_pix)}" placeholder="CNPJ, Telemóvel ou E-mail" style="margin-bottom:0;">
                        </div>
                    </div>
                </div>

                <button type="submit" id="btn-salvar-cfg" class="btn-neon">💾 Guardar Configurações</button>
                <button type="button" class="btn-secundario" onclick="iniciarApp()">⬅️ Voltar ao Menu</button>
            </form>
        </div>
    `;

    let novaFotoFile = null;
    document.getElementById('cfg-foto-input').addEventListener('change', (e) => {
        if (e.target.files[0]) {
            novaFotoFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = ev => document.getElementById('cfg-img-preview').src = ev.target.result;
            reader.readAsDataURL(novaFotoFile);
        }
    });

    document.getElementById('form-config-empresa').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('btn-salvar-cfg');
        btn.textContent = "⏳ A guardar...";
        btn.disabled = true;

        try {
            let urlFoto = dadosEmpresaGlobal.foto_url;
            if (novaFotoFile) {
                const imgWebp = await comprimirParaWebP(novaFotoFile, 500);
                const nomeArq = gerarNomeSeguroArquivo('logo-empresa');
                const { error: upErr } = await clienteSupabase.storage.from('foto_entidades').upload(nomeArq, imgWebp);
                if (upErr) throw upErr;
                urlFoto = clienteSupabase.storage.from('foto_entidades').getPublicUrl(nomeArq).data.publicUrl;
            }

            // Salva preferências complementares no navegador
            localStorage.setItem('erp_config_complementar', JSON.stringify({
                margem_padrao_xml: parseFloat(document.getElementById('cfg-margem').value) || 30,
                chave_pix: document.getElementById('cfg-pix').value.trim()
            }));

            const payloadEmpresa = {
                tipo: 'empresa',
                nome_completo: document.getElementById('cfg-nome').value.trim(),
                tipo_documento: 'CNPJ',
                numero_documento: document.getElementById('cfg-doc').value.trim(),
                telefone: document.getElementById('cfg-whatsapp').value.replace(/\D/g, ''),
                email: document.getElementById('cfg-email').value.trim(),
                endereco_completo: document.getElementById('cfg-endereco').value.trim(),
                foto_url: urlFoto,
                status: 'ativo'
            };

            if (dadosEmpresaGlobal.id) {
                const { error } = await clienteSupabase.from('entidades').update(payloadEmpresa).eq('id', dadosEmpresaGlobal.id);
                if (error) throw error;
            } else {
                const { error } = await clienteSupabase.from('entidades').insert([payloadEmpresa]);
                if (error) throw error;
            }

            mostrarToast("Configurações da empresa guardadas com sucesso!", "sucesso");
            iniciarApp();

        
   } catch (erro) {
             tratarErroSupabase(erro, "Configurações da Empresa");
         } finally {
             btn.textContent = "💾 Guardar Configurações";
             btn.disabled = false;
         }
     });
 }
//fim
    
