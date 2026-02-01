// Importa o cliente do arquivo de configuração que você já possui
// Certifique-se de que o config_supabase.js exporta o objeto 'supabase'
import { supabase } from './config_supabase.js';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('user_login').value;
    const password = document.getElementById('user_password').value;
    const btn = document.getElementById('btnLogin');

    // UI State: Loading
    const originalBtnText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="animate-spin material-symbols-outlined">sync</span> AUTENTICANDO...`;

    try {
        // 1. Autenticação com Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (authError) throw authError;

        // 2. Busca o perfil para saber o Cargo (Role-Based Redirect)
        const { data: perfil, error: perfilError } = await supabase
            .from('perfis')
            .select('cargo')
            .eq('id', authData.user.id)
            .single();

        if (perfilError) throw perfilError;

        // 3. Lógica de Redirecionamento baseada no Contrato de Backend
        // Toasts de sucesso podem ser invocados aqui
        redirecionarPorCargo(perfil.cargo);

    } catch (error) {
        console.error('Erro no login:', error.message);
        // UI State: Erro (Toast ou Alerta)
        alert('Falha na autenticação: ' + error.message);
        btn.disabled = false;
        btn.innerHTML = originalBtnText;
    }
});

function redirecionarPorCargo(cargo) {
    switch (cargo) {
        case 'Administrador':
        case 'Gerente':
            window.location.href = 'dashboard_de_gestão_administrativa.html';
            break;
        case 'Operador':
            window.location.href = 'pdv_-_frente_de_caixa_otimizado.html';
            break;
        case 'Repositor':
            window.location.href = 'controle_de_produtos_e_estoque.html';
            break;
        default:
            window.location.href = 'login.html';
    }
}
