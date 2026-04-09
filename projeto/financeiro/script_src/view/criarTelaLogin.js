function criarTelaLogin() {
    const loginHtml = `
        <div id="tela_login" class="hidden min-h-screen flex items-center justify-center">
            <div class="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full mx-4 border-t-4 border-emerald-500">
                <div class="text-center mb-8">
                    <i class="fas fa-wallet text-5xl text-emerald-500 mb-3"></i>
                    <h2 class="text-2xl font-bold text-slate-800">ERP Financeiro</h2>
                    <p class="text-slate-500 text-sm mt-1">Faça login para acessar suas contas</p>
                </div>
                
                <div class="space-y-4">
                    <div>
                        <label class="text-sm font-bold text-slate-700">E-mail</label>
                        <input type="email" id="login-email" placeholder="seu@email.com" onkeyup="if(event.key === 'Enter') document.getElementById('login-senha').focus()">
                    </div>
                    <div>
                        <label class="text-sm font-bold text-slate-700">Senha</label>
                        <input type="password" id="login-senha" placeholder="••••••••" onkeyup="if(event.key === 'Enter') fazerLogin()">
                    </div>
                    <button id="btn-login" onclick="fazerLogin()" class="w-full bg-emerald-500 text-white font-bold py-3 rounded hover:bg-emerald-600 transition shadow-lg mt-2">
                        Entrar no Sistema
                    </button>
                </div>
            </div>
        </div>
    `;

    return loginHtml;
}

// Como usar a função:
document.body.insertAdjacentHTML('beforeend', criarTelaLogin());

