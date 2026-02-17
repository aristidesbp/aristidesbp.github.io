/** navbar.js
<!-- NAVBAR -->
<link rel="stylesheet" href="css/navbar.css">
    <div class="navbar">
        <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
            <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
        </div>
        <div class="nav-buttons">
     <a href="index.html" class="btn-nav btn-home"><i class="fas fa-home"></i> index</a>
            <button class="btn-nav" onclick="sairDaConta()">
                <i class="fas fa-sign-out-alt"></i> Sair
            </button>
        </div>
    </div>
    <script src="js/navbar.js"></script>
<!-- FIM DA NAVBAR -->

*/
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

/*
        async function sairDaConta() {
            if(confirm("Deseja realmente sair do sistema?")) {
                await _supabase.auth.signOut();
                window.location.href = 'login.html';
            }
        }
*/
