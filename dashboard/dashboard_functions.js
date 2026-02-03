/** * Estrutura do dashboard_functions.js
 * Para começar, vamos focar na função de Carregar Perfil. 
 * O comando básico do Supabase é: supabase.auth.getUser()
 */

// Função que inicializa os dados da dashboard
async function carregarDashboard() {
    // 1. Buscamos os dados do usuário logado
    const { data: { user }, error } = await window.supabaseClient.auth.getUser();

    if (error || !user) {
        console.error("Erro ao obter usuário:", error);
        return;
    }

    // 2. Exibimos o e-mail do usuário na Navbar para personalizar a experiência
    const userEmailElement = document.getElementById('user-email');
    if (userEmailElement) {
        userEmailElement.innerText = user.email;
    }
}

// Função para encerrar a sessão (Logout)
async function logout() {
    const confirmou = confirm("Deseja realmente sair do sistema?");
    if (!confirmou) return;

    const { error } = await window.supabaseClient.auth.signOut();
    
    if (error) {
        alert("Erro ao sair: " + error.message);
    } else {
        // Redireciona para o login após sair
        window.location.href = 'login.html';
    }
}

// Inicia a carga dos dados assim que o script é lido
carregarDashboard();
