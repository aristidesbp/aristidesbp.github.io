
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


















