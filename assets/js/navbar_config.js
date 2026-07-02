/*############################################################################################*/
/* CÓDIGO_O: INICIALIZAÇÃO BLINDADA DO CLIENTE SUPABASE */
/*############################################################################################*/
(function () {
    if (window.supabaseClient) return;

    const _url = 'https://zxkaxteprwxijriycvdx.supabase.co';
    const _key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4a2F4dGVwcnd4aWpyaXljdmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODIxMTEsImV4cCI6MjA5ODA1ODExMX0.ffOiXvjJujp4eL2scf1NiMT9A0CtwIAHilbX3T_AMrc';

    window.supabaseClient = supabase.createClient(_url, _key);
})();

/*############################################################################################*/
/* CÓDIGO 1: VALIDAÇÃO DE ACESSO COM PROTEÇÃO DE TELA (FOUC) */
/*############################################################################################*/
(async function validateAccess() {
    // Bloqueia visualmente a página imediatamente para proteger os dados do ERP
    document.documentElement.style.display = 'none';

    try {
        if (!window.supabaseClient) {
            console.error("Erro: O cliente Supabase não foi carregado.");
            return;
        }

        // 1. Verifica sessão local
        const { data: { session }, error } = await window.supabaseClient.auth.getSession();

        if (error || !session) {
            console.warn("Usuário não autenticado. Ativando tela de login incorporada...");
            exibirTelaLoginIncorporada();
            return;
        }

        // 2. Validação profunda no servidor
        const { data: { user }, error: userError } = await window.supabaseClient.auth.getUser();

        if (userError || !user) {
            console.warn("Sessão inválida no servidor. Ativando tela de login...");
            exibirTelaLoginIncorporada();
            return;
        }

        // Sucesso: Libera o ERP para o usuário logado
        console.log("Acesso autorizado para:", session.user.email);
        document.documentElement.style.display = 'block';

    } catch (err) {
        console.error("Erro crítico no sistema de guarda de acessos:", err);
        exibirTelaLoginIncorporada();
    }
})();

/*############################################################################################*/
/* CÓDIGO 3: FUNÇÃO DE LOGOUT */
/*############################################################################################*/
async function sairDaConta() {
    if (confirm("Deseja realmente sair do sistema?")) {
        try {
            if (window.supabaseClient) {
                await window.supabaseClient.auth.signOut();
            }
            window.location.reload(); // Recarrega a página para acionar o bloqueio de tela instantâneo
        } catch (error) {
            console.error("Erro ao efetuar logout:", error);
            window.location.reload();
        }
    }
}

/*############################################################################################*/
/* CÓDIGO 4 & 5: INICIALIZAÇÃO DA NAVBAR DINÂMICA */
/*############################################################################################*/
(function () {
    function initNavbar() {
        const container = document.getElementById('navbar');
        if (!container || container.dataset.loaded === 'true') return;
        
        container.dataset.loaded = 'true';
        container.innerHTML = `
            <div class="navbar">
                <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
                    <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
                </div>
                <div class="nav-buttons">
                    <a href="https://aristidesbp.github.io" class="btn-nav btn-home"><i class="fas fa-home"></i> Início</a>
                    <button class="btn-nav" onclick="sairDaConta()"><i class="fas fa-sign-out-alt"></i> Sair</button>
                </div>
            </div>
        `;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }
})();

/*############################################################################################*/
/* CÓDIGO 6 & 7: TELA DE LOGIN INCORPORADA E SUAS FUNÇÕES (MODULAR/AUTO-SUFICIENTE) */
/*############################################################################################*/
function exibirTelaLoginIncorporada() {
    const executarInjecao = () => {
        // Altera o display para block para que possamos ver apenas a nossa tela de login injetada
        document.documentElement.style.display = 'block';
        
        // Remove ou esconde qualquer conteúdo que já tenha sido renderizado no body por segurança
        document.body.innerHTML = `
            <div id="auth-container-incorporado" style="
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background-color: #0f172a; display: flex; justify-content: center;
                align-items: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                z-index: 999999; padding: 20px; box-sizing: border-box;
            ">
                <div style="
                    background: #ffffff; padding: 40px 30px; border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.3); width: 100%; max-width: 400px;
                    text-align: center; box-sizing: border-box;
                ">
                    <div style="font-size: 2rem; font-weight: bold; color: #0f172a; margin-bottom: 10px;">
                        <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
                    </div>
                    <p style="color: #64748b; font-size: 0.95rem; margin-bottom: 30px;">Área Restrita - Efetue o seu login</p>
                    
                    <form id="form-login-dinamico" onsubmit="processarLoginDinamico(event)" style="display: flex; flex-direction: column; gap: 20px;">
                        <div style="text-align: left; display: flex; flex-direction: column; gap: 8px;">
                            <label style="font-size: 0.85rem; font-weight: 600; color: #334155;">E-mail</label>
                            <input type="email" id="login-email" required placeholder="seu@email.com" style="
                                padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 6px;
                                font-size: 1rem; outline: none; transition: border 0.2s;
                            " onfocus="this.style.border='1px solid #3ecf8e'" onblur="this.style.border='1px solid #cbd5e1'">
                        </div>
                        
                        <div style="text-align: left; display: flex; flex-direction: column; gap: 8px;">
                            <label style="font-size: 0.85rem; font-weight: 600; color: #334155;">Palavra-passe / Senha</label>
                            <input type="password" id="login-password" required placeholder="••••••••" style="
                                padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 6px;
                                font-size: 1rem; outline: none; transition: border 0.2s;
                            " onfocus="this.style.border='1px solid #3ecf8e'" onblur="this.style.border='1px solid #cbd5e1'">
                        </div>

                        <div id="mensagem-erro-login" style="color: #ef4444; font-size: 0.85rem; text-align: left; display: none;"></div>
                        
                        <button type="submit" id="btn-entrar-dinamico" style="
                            background-color: #3ecf8e; color: white; border: none;
                            padding: 14px; border-radius: 6px; font-size: 1rem; font-weight: bold;
                            cursor: pointer; transition: background 0.2s; margin-top: 10px;
                        " onmouseover="this.style.backgroundColor='#2eb875'" onmouseout="this.style.backgroundColor='#3ecf8e'">
                            Entrar no Sistema
                        </button>
                    </form>
                </div>
            </div>
        `;
    };

    // Garante que o body existe antes de tentar injetar o HTML da interface de login
    if (document.body) {
        executarInjecao();
    } else {
        document.addEventListener('DOMContentLoaded', executarInjecao);
    }
}

// Manipulador do formulário de login injetado
async function processarLoginDinamico(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorContainer = document.getElementById('mensagem-erro-login');
    const btnEntrar = document.getElementById('btn-entrar-dinamico');

    errorContainer.style.display = 'none';
    btnEntrar.disabled = true;
    btnEntrar.innerText = "A autenticar...";

    try {
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) throw error;

        // Login feito com sucesso! Recarrega a página atual para liberar o acesso e construir o ERP
        window.location.reload();

    } catch (err) {
        console.error("Erro na autenticação direta:", err);
        errorContainer.innerText = "Credenciais incorretas ou falha de ligação.";
        errorContainer.style.display = 'block';
        btnEntrar.disabled = false;
        btnEntrar.innerText = "Entrar no Sistema";
    }
}
