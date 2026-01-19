/** ############################################################################## */
/** ############################################################################## */
/** ############################################################################## */
// Funções de Autenticação e Segurança

async function validarAcesso() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session) window.location.href = 'login.html';
}

async function sairDaConta() {
    if(confirm("Sair?")) {
        await _supabase.auth.signOut();
        window.location.href = 'login.html';
    }
}


/** ############################################################################## */
/** ############################################################################## */
/** ############################################################################## */
/** NAVBAR COMPONENTE - ERP ABP */

(function() {

    // 1. Constate que define o CSS da Navbar
    const styles = `
    <style>
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: white;
            padding: 15px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
        }

        .nav-buttons {
            display: flex;
            gap: 15px;
        }

        .btn-nav {
            background: #ef4444;
            color: white;
            padding: 8px 15px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 14px;
            border: none;
            cursor: pointer;
            transition: 0.3s;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-nav:hover {
            background: #dc2626;
            transform: scale(1.05);
        }

        .btn-home {
            background: #3ecf8e !important; /* Verde padrão do seu ERP */
        }

        /* Ajuste para o conteúdo não ficar embaixo da navbar fixa */
        body {
            padding-top: 80px;
        }
    </style>`;

    
    // 2. Constate que define a Estrutura HTML da Navbar
    const navbarHtml = `
    <div class="navbar">
        <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
            <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
        </div>
        <div class="nav-buttons">
            <a href="index.html" class="btn-nav btn-home"><i class="fas fa-home"></i> Início</a>
            <button class="btn-nav" onclick="sairDaConta()">
                <i class="fas fa-sign-out-alt"></i> Sair
            </button>
        </div>
    </div>`;




    
    // 3. Inserir no início do Body (responsavel pro criar a pagina)
    document.head.insertAdjacentHTML('beforeend', styles);
    document.body.insertAdjacentHTML('afterbegin', navbarHtml);
})();


/** ############################################################################## */
/** ############################################################################## */
/** ############################################################################## */
/** Função global para Deslogar (sair do sistema/ ir para pagina de login) */


async function sairDaConta() {
    if(confirm("Deseja realmente sair do sistema?")) {
        try {
            // Verifica se o cliente supabase existe antes de tentar deslogar
            if (typeof _supabase !== 'undefined') {
                await _supabase.auth.signOut();
            }
            window.location.href = 'login.html';
        } catch (error) {
            console.error("Erro ao sair:", error);
            window.location.href = 'login.html';
        }
    }
}
