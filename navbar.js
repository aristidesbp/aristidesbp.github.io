/* [INÍCIO: CABECALHO GLOBAL ISOLADO] */
(function() {
    // Escuta o carregamento da página sem interromper outros scripts
    document.addEventListener('DOMContentLoaded', async () => {
        
        // 1. Constrói o HTML do Cabeçalho com estilos inline de segurança para não quebrar
        const headerHTML = `
            <header style="background-color: var(--bg-color); padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100; border-bottom: 1px solid var(--border-color); transition: background-color 0.3s; color: var(--text-main);">
                <div style="display: flex; align-items: center; gap: 10px; font-size: 1.2em; font-weight: bold;">
                    <img id="nav-logo-empresa" src="" alt="Logo" style="width: 35px; height: 35px; border-radius: 50%; object-fit: cover; display: none; border: 2px solid var(--accent-neon);">
                    <span id="nav-nome-empresa">⚡ A carregar...</span>
                </div>
                <div style="display: flex; gap: 15px; align-items: center;">
                    <button onclick="document.body.classList.toggle('light-theme'); localStorage.setItem('temaBevDistro', document.body.classList.contains('light-theme') ? 'light' : 'dark');" title="Alterar Tema" style="background: none; border: none; color: var(--text-main); font-size: 1.5em; cursor: pointer; padding: 0; transition: opacity 0.2s;">🌓</button>
                    <button onclick="window.location.href='menu.html'" title="Ir para o Menu Principal" style="background: none; border: none; color: var(--text-main); font-size: 1.5em; cursor: pointer; padding: 0; transition: opacity 0.2s;">🏠</button>
                </div>
            </header>
        `;

        // 2. Injeta o cabeçalho no exato início do <body> da página
        document.body.insertAdjacentHTML('afterbegin', headerHTML);

        // 3. Lógica Segura para buscar a Foto e Nome da Empresa
        try {
            // Se o supabase não existir nesta página, aborta silenciosamente para não causar erros
            if (typeof clienteSupabase === 'undefined') return; 

            // Confirma a sessão (Zero Trust)
            const { data: { session }, error: erroSessao } = await clienteSupabase.auth.getSession();
            if (erroSessao || !session) return; 

            // Faz o Fetch dos dados na tabela profiles
            const { data: perfil, error: erroPerfil } = await clienteSupabase
                .from('profiles')
                .select('nome, foto_avatar')
                .eq('id', session.user.id)
                .single();

            const navNome = document.getElementById('nav-nome-empresa');
            const navLogo = document.getElementById('nav-logo-empresa');

            if (!erroPerfil && perfil) {
                if (perfil.nome) {
                    navNome.textContent = perfil.nome; // Anti-XSS ativado
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
            console.error("Auditoria: Falha isolada no cabeçalho global.", error);
            document.getElementById('nav-nome-empresa').textContent = "⚡ ERP BevDistro";
        }
    });
})();
/* [FIM: CABECALHO GLOBAL ISOLADO] */

