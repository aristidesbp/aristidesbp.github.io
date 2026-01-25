
# 1. Ajuste de Esquema (Schema Patch)
Nos arquivos iniciais, a tabela empresas não previa o campo de plano na estrutura de inserção da função, o que causava erro de coluna inexistente.
```
-- Adicionado para evitar erro de 'column plano_ativo does not exist'
ALTER TABLE public.empresas ADD COLUMN IF NOT EXISTS plano_ativo TEXT DEFAULT 'Master';
```

# 2. Elevação de Privilégio da Função (Security Definer)
Este é o ponto mais importante. Suas políticas (Passo 2) impediam que um usuário criasse dados antes de estar logado. A solução foi atualizar a função de cadastro com o "crachá de supervisor".
```
-- O comando SECURITY DEFINER foi a chave para o sucesso.
-- Ele faz a função rodar com permissões de administrador, 
-- ignorando o RLS apenas durante o processo de criação da conta.
CREATE OR REPLACE FUNCTION public.inicializar_novo_cliente(...)
...
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

# 3. Permissões de Inicialização (Grants)
Como o Supabase trabalha com níveis de acesso, tivemos que liberar explicitamente para o "usuário anônimo" a capacidade de interagir com as tabelas de junção apenas no momento do setup.
```
-- Liberado para que o formulário inicial consiga "conversar" com o banco
GRANT INSERT, SELECT ON public.usuario_empresas TO anon;
GRANT INSERT, SELECT ON public.usuarios TO anon;
GRANT INSERT, SELECT ON public.empresas TO anon;

```

# 4. Correção da View de Sessão
Para que o seu Dashboard (Index) mostrasse o nome da empresa corretamente logo após o login, garantimos que a View de vínculo estivesse pronta:
```
-- Garante que o sistema saiba quem é o dono da empresa logada
CREATE OR REPLACE VIEW view_usuario_empresas AS
SELECT 
    ue.usuario_id, 
    e.nome_fantasia, 
    r.nome as role_nome
FROM usuario_empresas ue
JOIN empresas e ON e.id = ue.empresa_id
JOIN roles r ON r.id = ue.role_id;

```
# 💡 O que isso muda no seu projeto?
Esses comandos foram os "ajustes finos" para transformar uma teoria de banco de dados em um sistema funcional via web.

# ⚠️⚠️ OBSERVAÇÃO PARA AS PÁGINAS ABAIXO VOCÊ VAI PRECISAR DA URL DA CHAVE ANON !!!!!⚠️⚠️
# ⚠️⚠️ O PRIMEIRO USUÁRIO DEVE SER CRIADO PELO PAINEL DO SUPERBASE EM USER !!!!!⚠️⚠️


# Tela de login
```

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - ERP ABP</title>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
</head>
<body>
    <div id="login-container">
        <div class="login-card">
            <h1>ERP ABP</h1>
            <p>Acesse sua conta profissional</p>
            <form id="login-form">
                <input type="email" id="email" placeholder="E-mail" required>
                <input type="password" id="password" placeholder="Senha" required>
                <button type="submit" id="btn-entrar">ENTRAR NO SISTEMA</button>
            </form>
            <div id="msg"></div>
        </div>
    </div>

<script>
(function() {
    const URL = "url do seu projeto";
    const KEY = " cave do seu projeto";

    const supabaseClient = supabase.createClient(URL, KEY);

    // CSS Injetado
    const style = document.createElement('style');
    style.innerHTML = `
        body { margin:0; background:#0f172a; font-family:sans-serif; display:flex; justify-content:center; align-items:center; height:100vh; color:white; }
        .login-card { background:#1e293b; padding:40px; border-radius:12px; width:100%; max-width:350px; text-align:center; box-shadow:0 10px 25px rgba(0,0,0,0.5); }
        h1 { color:#3ecf8e; margin-bottom:10px; }
        input { width:100%; padding:12px; margin:10px 0; border-radius:6px; border:1px solid #334155; background:#0f172a; color:white; box-sizing:border-box; }
        button { width:100%; padding:14px; background:#3ecf8e; border:none; border-radius:6px; font-weight:bold; cursor:pointer; margin-top:10px; }
        #msg { margin-top:15px; font-size:13px; color:#f87171; }
    `;
    document.head.appendChild(style);

    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const msg = document.getElementById('msg');

        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

        if (error) {
            msg.innerText = "Erro: " + error.message;
        } else {
            msg.style.color = "#3ecf8e";
            msg.innerText = "Login realizado! Redirecionando...";
            // Após logar, ele vai para o dashboard
            setTimeout(() => { window.location.href = "index.html"; }, 1500);
        }
    });
})();
</script>
</body>
</html>
```
# index
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - ERP ABP Profissional</title>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div id="app" style="display: none;">
        <nav class="navbar">
            <div class="brand">ERP ABP <span class="badge">PRO</span></div>
            <div class="user-info">
                <span id="user-name">Carregando...</span>
                <button id="btn-logout" class="btn-icon"><i class="fas fa-sign-out-alt"></i></button>
            </div>
        </nav>

        <main class="content">
            <header class="welcome">
                <h2 id="greeting">Olá, Bem-vindo!</h2>
                <p id="empresa-nome">Identificando empresa...</p>
            </header>

            <div class="grid-stats">
                <div class="card stat-card blue">
                    <i class="fas fa-users"></i>
                    <div class="stat-info">
                        <span>Clientes</span>
                        <h3 id="count-clientes">0</h3>
                    </div>
                </div>
                <div class="card stat-card green">
                    <i class="fas fa-box"></i>
                    <div class="stat-info">
                        <span>Produtos</span>
                        <h3 id="count-produtos">0</h3>
                    </div>
                </div>
                <div class="card stat-card orange">
                    <i class="fas fa-dollar-sign"></i>
                    <div class="stat-info">
                        <span>Vendas (Mês)</span>
                        <h3 id="count-vendas">R$ 0,00</h3>
                    </div>
                </div>
            </div>

            <div class="menu-grid">
                <a href="entidades.html" class="menu-item">
                    <i class="fas fa-address-book"></i>
                    <span>Entidades</span>
                </a>
                <a href="produtos.html" class="menu-item">
                    <i class="fas fa-tags"></i>
                    <span>Produtos</span>
                </a>
                <a href="financeiro.html" class="menu-item">
                    <i class="fas fa-chart-line"></i>
                    <span>Financeiro</span>
                </a>
                <a href="vendas.html" class="menu-item">
                    <i class="fas fa-shopping-cart"></i>
                    <span>Vendas</span>
                </a>
            </div>
        </main>
    </div>

<script>
(function() {
    const CONFIG = {
        URL: "URL do seu projeto",
        KEY: "anon chave do seu projeto "
    };

    const supabaseClient = supabase.createClient(CONFIG.URL, CONFIG.KEY);

    // 1. Injeção de CSS Direta (Layout Responsivo para Celular)
    const style = document.createElement('style');
    style.innerHTML = `
        :root { --primary: #3ecf8e; --dark: #0f172a; --card: #1e293b; --text: #f8fafc; }
        body { margin: 0; font-family: sans-serif; background: var(--dark); color: var(--text); }
        .navbar { display: flex; justify-content: space-between; align-items: center; padding: 15px 20px; background: var(--card); border-bottom: 1px solid #334155; }
        .brand { font-weight: bold; color: var(--primary); font-size: 1.2rem; }
        .badge { font-size: 10px; background: #3b82f6; color: white; padding: 2px 6px; border-radius: 4px; }
        .user-info { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; }
        .btn-icon { background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 1.1rem; }
        
        .content { padding: 20px; max-width: 800px; margin: auto; }
        .welcome { margin-bottom: 25px; }
        .welcome h2 { margin: 0; color: var(--primary); }
        .welcome p { margin: 5px 0; color: #94a3b8; font-size: 0.9rem; }

        .grid-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 15px; margin-bottom: 30px; }
        .stat-card { background: var(--card); padding: 15px; border-radius: 12px; display: flex; align-items: center; gap: 15px; border: 1px solid #334155; }
        .stat-card i { font-size: 1.5rem; }
        .stat-card.blue i { color: #3b82f6; }
        .stat-card.green i { color: #10b981; }
        .stat-card.orange i { color: #f59e0b; }
        .stat-info span { font-size: 0.75rem; color: #94a3b8; }
        .stat-info h3 { margin: 0; font-size: 1.1rem; }

        .menu-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
        .menu-item { background: var(--card); padding: 25px 10px; border-radius: 12px; text-decoration: none; color: white; display: flex; flex-direction: column; align-items: center; gap: 10px; border: 1px solid #334155; transition: 0.3s; }
        .menu-item i { font-size: 2rem; color: var(--primary); }
        .menu-item:active { transform: scale(0.95); background: #334155; }
    `;
    document.head.appendChild(style);

    // 2. Lógica de Segurança e Dados
    async function inicializarDashboard() {
        // Verifica se há sessão ativa
        const { data: { session } } = await supabaseClient.auth.getSession();
        
        if (!session) {
            window.location.href = "login.html";
            return;
        }

        // Se chegou aqui, está logado
        document.getElementById('app').style.display = 'block';
        
        // Carrega dados do perfil e empresa (Usando a View do Passo 1)
        const { data: perfil, error } = await supabaseClient
            .from('view_usuario_empresas')
            .select('*')
            .eq('usuario_id', session.user.id)
            .single();

        if (perfil) {
            document.getElementById('user-name').innerText = perfil.role_nome;
            document.getElementById('greeting').innerText = `Olá, Aristides!`;
            document.getElementById('empresa-nome').innerText = `Empresa: ${perfil.nome_fantasia}`;
        }

        // Carregar Contadores (Simulando consulta às tabelas)
        // No futuro, usaremos a View do Passo 5 aqui
        atualizarResumo();
    }

    async function atualizarResumo() {
        // Exemplo de como buscar contagem real (isso respeita o RLS)
        const { count: totalClientes } = await supabaseClient.from('clientes').select('*', { count: 'exact', head: true });
        if(totalClientes !== null) document.getElementById('count-clientes').innerText = totalClientes;
    }

    // Logout
    document.getElementById('btn-logout').addEventListener('click', async () => {
        await supabaseClient.auth.signOut();
        window.location.href = "login.html";
    });

    inicializarDashboard();
})();
</script>
</body>
</html>
```
















