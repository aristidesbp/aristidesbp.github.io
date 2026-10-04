/* [INÍCIO: NAVBAR GLOBAL E GUARDA DE SEGURANÇA] */
(function() {
    // Escuta o carregamento da página sem interromper outros scripts
    document.addEventListener('DOMContentLoaded', async () => {
        
        // 1. Constrói o HTML do Cabeçalho com o botão de Logout (🚪)
        const headerHTML = `
            <header style="background-color: var(--bg-color); padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100; border-bottom: 1px solid var(--border-color); transition: background-color 0.3s; color: var(--text-main);">
                <div style="display: flex; align-items: center; gap: 10px; font-size: 1.2em; font-weight: bold;">
                    <img id="nav-logo-empresa" src="" alt="Logo" style="width: 35px; height: 35px; border-radius: 50%; object-fit: cover; display: none; border: 2px solid var(--accent-neon);">
                    <span id="nav-nome-empresa">⚡ A carregar...</span>
                </div>
                <div style="display: flex; gap: 15px; align-items: center;">
                    <button onclick="document.body.classList.toggle('light-theme'); localStorage.setItem('temaBevDistro', document.body.classList.contains('light-theme') ? 'light' : 'dark');" title="Alterar Tema" style="background: none; border: none; color: var(--text-main); font-size: 1.5em; cursor: pointer; padding: 0; transition: opacity 0.2s;">🌓</button>
                    <button onclick="window.location.href='menu.html'" title="Ir para o Menu Principal" style="background: none; border: none; color: var(--text-main); font-size: 1.5em; cursor: pointer; padding: 0; transition: opacity 0.2s;">🏠</button>
                    <button id="btn-nav-sair" title="Sair do Sistema" style="background: none; border: none; color: var(--danger-color); font-size: 1.5em; cursor: pointer; padding: 0; transition: opacity 0.2s;">🚪</button>
                </div>
            </header>
        `;

        // Injeta o cabeçalho no início do ecrã
        document.body.insertAdjacentHTML('afterbegin', headerHTML);

        // 2. Lógica Segura de Logout (Destrói o token e expulsa)
        document.getElementById('btn-nav-sair').addEventListener('click', async () => {
            if(confirm("Deseja mesmo sair do sistema?")) {
                if (typeof clienteSupabase !== 'undefined') {
                    await clienteSupabase.auth.signOut();
                }
                localStorage.removeItem('biometriaAtiva');
                window.location.href = 'login.html';
            }
        });

        // 3. ZERO TRUST: Validação de Sessão Front-end
        try {
            if (typeof clienteSupabase === 'undefined') {
                console.error("Auditoria: Ficheiro supabase_config.js ausente.");
                window.location.href = 'login.html';
                return; 
            }

            // Pede ao servidor para validar o bilhete de identidade do utilizador
            const { data: { session }, error: erroSessao } = await clienteSupabase.auth.getSession();
            
            // SE NÃO EXISTE SESSÃO, EXPULSA IMEDIATAMENTE
            if (erroSessao || !session) {
                console.warn("Acesso não autorizado. A redirecionar para login.");
                window.location.href = 'login.html';
                return; 
            }

            // 4. Injeção Dinâmica dos Dados do Perfil
            const { data: perfil, error: erroPerfil } = await clienteSupabase
                .from('profiles')
                .select('nome, foto_avatar')
                .eq('id', session.user.id)
                .single();

            const navNome = document.getElementById('nav-nome-empresa');
            const navLogo = document.getElementById('nav-logo-empresa');

            if (!erroPerfil && perfil) {
                if (perfil.nome) {
                    navNome.textContent = perfil.nome; // Texto protegido contra XSS
                } else {
                    navNome.textContent = "Empresa (Sem Nome)";
                }

                if (perfil.foto_avatar) {
                    navLogo.src = perfil.foto_avatar;
                    navLogo.style.display = "inline-block";
                }
            } else {
                navNome.textContent = "⚡ ERP BevDistro";
            }
        } catch (error) {
            console.error("Auditoria: Falha geral de segurança no cabeçalho.", error);
            window.location.href = 'login.html';
        }
    });
})();
/* [FIM: NAVBAR GLOBAL E GUARDA DE SEGURANÇA] */
