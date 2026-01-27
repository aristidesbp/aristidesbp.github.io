# 🧱 Criar o projeto no Supabase
## Criar conta e projeto
* Acesse: https://supabase.com
* Crie uma conta
* Clique em New Project
## Escolha:
* Nome do projeto
* Senha do banco
* Região
# 🧨 RESET TOTAL DO SUPABASE (DADOS + AUTH + STORAGE)
@ 👉 Isso é o mais próximo possível de um banco novo.
``` 
-- Apagar tabelas públicas
do $$
declare
  r record;
begin
  for r in (select tablename from pg_tables where schemaname = 'public') loop
    execute 'drop table if exists public.' || quote_ident(r.tablename) || ' cascade';
  end loop;
end $$;
```

# CRIANDO TABELAS NO SUPABASE
* Vá em Table Editor
* Clique em New Table
* Nome da tabela: usuarios 
### TABELA USUARIO 
```
| Coluna     | Tipo      | Observação                  |
| ---------- | --------- | --------------------------- |
| id         | int8      | Primary key, auto increment |
| created_at | timestamp | default now()               |
| nome       | text      | obrigatório                 |
| email      | text      | obrigatório                 |
```
# SQL PARA CRIAR TABELA USUARIOS:
```
create table public.usuarios (
  id bigint generated always as identity primary key,
  nome text not null,
  email text not null unique,
  created_at timestamp with time zone default now()
);
```

# Liberar acesso público (IMPORTANTE)
* Vá em Authentication → Policie
```
## CRIAR 4 APOLICES:         ## EXEMPLO (UPDATE)
* SELECT → Allow public      * Policy UPDATE
* INSERT → Allow public.     * Role: defalt...(public)
* UPDATE → Allow public.     * USING: true
* DELETE → Allow public.     * WITH CHECK: true
                              * Salvar
```
## 🧠 USING e WITH CHECK ?
* USING => Quem pode ATUALIZAR a linha;
* WITH CHECK => Que dados podem ser salvos após o UPDATE;
*  Se qualquer um pode editar qualquer linha, ambos ficam "true";
*  Isso é necessário para funcionar no GitHub Pages (front-end puro);

## 🧠 Regras mentais importantes (grave isso)
* ❌ RLS ativado + policy sem USING = bloqueia tudo
* ✅ USING (true) = acesso liberado
* anon key ≠ bypass de segurança
* Policy manda mais que a chave
  
## 🔒 Quando NÃO usar true
* Só para contexto futuro:
 ```
| Situação                 | USING correto                   |
| ------------------------ | ------------------------------- |
| Apenas usuários logados  | `auth.role() = 'authenticated'` |
| Apenas dono do registro  | `user_id = auth.uid()`          |
| Público total (seu caso) | `true`                          |
 ```
Você pegou os três pilares fundamentais, mas no ecossistema do Supabase
(e do PostgreSQL), existem variações estratégicas dessas regras que são
o que separam um sistema amador de um ERP Profissional. Para Profissional, 
além desses três, existem mais 2 conceitos cruciais que você precisa 
dominar para garantir a escalabilidade do projeto.

# O Conceito de "Admin" ou "Nível de Acesso"
No seu ERP, não basta estar logado; alguns usuários poderão ver tudo, 
enquanto outros apenas o que lhes cabe.
## Situação:
" Apenas gerentes podem excluir produtos".
* O USING: (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin'.
* Isso permite que você use a própria autenticação do
  Supabase para guardar se o usuário é um "Vendedor" ou "Dono", sem
  precisar de tabelas extras complexas no início.
  
# Diferença entre SELECT e UPDATE (Controle de Fluxo)
Muitas vezes, a regra para ver é diferente da regra para mudar.

## A Situação:
* "Todos na empresa podem ver os clientes, mas apenas o criador pode editar".
## A Estratégia:
* Para o SELECT: Você usaria auth.role() = 'authenticated'.
* Para o UPDATE: Você usaria user_id = auth.uid().
* Isso evita que um funcionário altere acidentalmente os dados de outro,
  mantendo a integridade do banco.
  
# 🔑 2. Pegar as chaves do Supabase
## Vá em Settings
*  DATA API/Project URL/copiar
*  API Keis/anon public key/copiar
*  Altentication/url config/ coloque o endereço de onde está hospedado
### Exemplo:
* URL: https://xxxxx.supabase.co
* EY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
* NO HTML/JS COLE EM [CONFIGURAÇÃO DO SUPABASE]
    
# TAREFA 2: Criar (index.html)
```<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>CRUD Supabase</title>
  <style>
body {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 40px auto;
}

form input, form button {
  padding: 8px;
  margin: 5px 0;
  width: 100%;
}

li {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
}
</style>
</head>
<body>

  <h1>CRUD com Supabase</h1>

  <form id="form">
    <input type="hidden" id="id">
    <input type="text" id="nome" placeholder="Nome" required>
    <input type="email" id="email" placeholder="Email" required>
    <button type="submit">Salvar</button>
  </form>

  <ul id="lista"></ul>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>


    
<script>
// CONFIGURAÇÃO DO SUPABASE
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kcHZzcG53em9zdnBuaXljYXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MjkwNDksImV4cCI6MjA4NTAwNTA0OX0.hYgXJXn3CuvNJkbDyVkJNq6xREV-1OSohB1hhoetibk'
const supabaseUrl = 'https://ndpvspnwzosvpniycapc.supabase.co'

const db = supabase.createClient(supabaseUrl, supabaseKey)


// LISTAR
async function listar() {
  const { data, error } = await db
    .from('usuarios')
    .select('*')
    .order('id', { ascending: false })

  const lista = document.getElementById('lista')
  lista.innerHTML = ''

  data.forEach(user => {
    const li = document.createElement('li')
    li.innerHTML = `
      ${user.nome} - ${user.email}
      <div>
        <button onclick="editar(${user.id}, '${user.nome}', '${user.email}')">Editar</button>
        <button onclick="deletar(${user.id})">Excluir</button>
      </div>
    `
    lista.appendChild(li)
  })
}

listar()


// CRIAR E ATUALIZAR
document.getElementById('form').addEventListener('submit', async e => {
  e.preventDefault()

  const id = document.getElementById('id').value
  const nome = document.getElementById('nome').value
  const email = document.getElementById('email').value

  if (id) {
    await db
      .from('usuarios')
      .update({ nome, email })
      .eq('id', id)
  } else {
    await db
      .from('usuarios')
      .insert([{ nome, email }])
  }

  e.target.reset()
  document.getElementById('id').value = ''
  listar()
})


// EDITAR
function editar(id, nome, email) {
  document.getElementById('id').value = id
  document.getElementById('nome').value = nome
  document.getElementById('email').value = email
}


// DELETAR
async function deletar(id) {
  await db
    .from('usuarios')
    .delete()
    .eq('id', id)

  listar()
}

</script>
</body>
</html>
```
# PARABÉNS VOCÊ JÁ TEM O SEU PRIMEIRO CRUD🥳🥳
# FASE 2:Vamos fazer isso do jeito certo, seguro e profissional, usando Supabase Auth (login proficional).
* criar novo projeto, ou apagar anterior
# 🧠 ARQUITETURA FINAL DO LOGIN
* Autenticação → Supabase Auth
* Senhas → hash + sal (automático)
* Identidade → auth.users
* Dados do app → public.usuarios
* Segurança → RLS + policies
* Automação → trigger

# 1️⃣ TABELA DE PERFIL DO USUÁRIO
```
create table public.usuarios (
  id bigint generated always as identity primary key,
  auth_id uuid not null unique,
  nome text not null,
  email text not null unique,
  ativo boolean default true,
  created_at timestamp with time zone default now()
);
```
# 2️⃣ ATIVAR RLS
```
alter table public.usuarios enable row level security;
```
# 3️⃣ POLICIES DE SEGURANÇA (ESSENCIAIS)
* 🔐 Inserir apenas o próprio usuário
```
create policy "insert own profile"
on public.usuarios
for insert
with check (auth.uid() = auth_id);
```
# 👁️ Ler apenas o próprio perfil
```
create policy "select own profile"
on public.usuarios
for select
using (auth.uid() = auth_id);
```
# ✏️ Atualizar apenas o próprio perfil
```
create policy "update own profile"
on public.usuarios
for update
using (auth.uid() = auth_id);
```
# 4️⃣ TRIGGER AUTOMÁTICA (PADRÃO PROFISSIONAL)
* 🔥 ESSA É A PARTE MAIS IMPORTANTE
* Cria o registro automaticamente após o cadastro no Auth.
```
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.usuarios (
    auth_id,
    email,
    nome
  )
  values (
    new.id,
    new.email,
    split_part(new.email, '@', 1)
  );

  return new;
end;
$$ language plpgsql security definer;
```

# 5️⃣ CRIAR O TRIGGER
```
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();
```

# 6️⃣ (OPCIONAL) CONTROLE DE USUÁRIO ATIVO
* Permite bloquear acesso sem deletar conta.
```
create or replace function public.is_user_active()
returns boolean as $$
  select exists (
    select 1
    from public.usuarios
    where auth_id = auth.uid()
    and ativo = true
  );
$$ language sql stable;
```
# Uso futuro em policies:
```
using (auth.uid() = auth_id and is_user_active());
```
# 7️⃣ (OPCIONAL) LOG DE LOGIN (AUDITORIA)
```
create table public.login_logs (
  id bigint generated always as identity primary key,
  auth_id uuid not null,
  ip text,
  user_agent text,
  created_at timestamp with time zone default now()
);

```
```
alter table public.login_logs enable row level security;

create policy "user sees own logs"
on public.login_logs
for select
using (auth.uid() = auth_id);
```

# ✅ ORDEM CORRETA DE EXECUÇÃO
* 1️⃣ Criar tabela usuarios
* 2️⃣ Ativar RLS
* 3️⃣ Criar policies
* 4️⃣ Criar function
* 5️⃣ Criar trigger

# 🧠 O QUE VOCÊ GANHOU COM ISSO
* ✔️ Senhas nunca passam pelo seu código
* ✔️ Hash + salt automáticos
* ✔️ Login por token JWT
* ✔️ Reset de senha seguro
* ✔️ Sessão validada por auth.uid()
* ✔️ Banco blindado contra acesso indevido
* ✔️ Padrão SaaS real (produção)

# 🧠 O QUE NÃO EXISTE (E NÃO DEVE EXISTIR)
* ❌ SQL de login
* ❌ SELECT com senha
* ❌ Função de autenticação
* ❌ Hash manual
* ❌ Campo password
* ❌ Tabela de credenciais
* 👉 Login NÃO é feito em SQL
* 👉 Login é 100% Supabase Auth
* O banco só valida identidade via auth.uid().

## login.html
```
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Login</title>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
body {
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 80px auto;
}

h2 {
  text-align: center;
}

input, button {
  width: 100%;
  padding: 10px;
  margin: 6px 0;
}

.senha {
  position: relative;
}

.senha span {
  position: absolute;
  right: 10px;
  top: 12px;
  cursor: pointer;
}

a {
  cursor: pointer;
  color: #0066cc;
  text-decoration: underline;
}

p {
  text-align: center;
}
</style>
</head>
<body>

<h2 id="titulo">Login</h2>

<input id="email" type="email" placeholder="Email" required>

<div class="senha">
  <input id="senha" type="password" placeholder="Senha (mín. 6 caracteres)" required>
  <span onclick="toggleSenha()">👁️</span>
</div>

<button id="btnAcao" onclick="login()">Entrar</button>

<p>
  <a onclick="mostrarCadastro()">Criar conta</a> |
  <a onclick="resetSenha()">Esqueci minha senha</a>
</p>

<!-- Supabase JS -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script>
/* ===============================
   SUPABASE CONFIG
================================ */
const dbsupabase = supabase.createClient(
  'https://tlhxtsanevvbpbyedmgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsaHh0c2FuZXZ2YnBieWVkbWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MTg0ODQsImV4cCI6MjA4NTA5NDQ4NH0.E7ZplcLusSKK78ME-aO12mwOKEw1XV1FYmWx7GYP_sU'
)

/* ===============================
   UI
================================ */
function toggleSenha() {
  const input = document.getElementById('senha')
  input.type = input.type === 'password' ? 'text' : 'password'
}

/* ===============================
   LOGIN
================================ */
async function login() {
  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value

  const { error } = await dbsupabase.auth.signInWithPassword({
    email,
    password: senha
  })

  if (error) {
    alert(error.message)
    return
  }

  window.location.href = 'index.html'
}

/* ===============================
   RESET DE SENHA
================================ */
async function resetSenha() {
  const email = document.getElementById('email').value

  if (!email) {
    alert('Digite seu email')
    return
  }

  const { error } = await dbsupabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://aristidesbp.github.io'
  })

  if (error) {
    alert(error.message)
    return
  }

  alert('Email de recuperação enviado!')
}

/* ===============================
   TROCAR PARA CADASTRO
================================ */
function mostrarCadastro() {
  document.getElementById('titulo').innerText = 'Cadastro'
  const btn = document.getElementById('btnAcao')
  btn.innerText = 'Cadastrar'
  btn.onclick = cadastrar
}

/* ===============================
   CADASTRO
================================ */
async function cadastrar() {
  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value

  if (senha.length < 6) {
    alert('A senha deve ter no mínimo 6 caracteres')
    return
  }

  const { error } = await dbsupabase.auth.signUp({
    email,
    password: senha
  })

  if (error) {
    alert(error.message)
    return
  }

  alert('Cadastro realizado! Verifique seu email (se exigido).')
}
</script>

</body>
</html>

```

# 📌 PROJETO ERP ABP
# CONEXAO.JS
```
(function() {
    // 1. Configurações de Conexão (Chaves de 21/01/2026)
    const supabaseUrl = 'https://tlhxtsanevvbpbyedmgv.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsaHh0c2FuZXZ2YnBieWVkbWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MTg0ODQsImV4cCI6MjA4NTA5NDQ4NH0.E7ZplcLusSKK78ME-aO12mwOKEw1XV1FYmWx7GYP_sU';
    
    // Inicializa o cliente globalmente para uso nos outros scripts do ERP
    window.db = supabase.createClient(supabaseUrl, supabaseKey);

    // 2. Injeção de CSS Padrão (Layout Integridade)
    const style = document.createElement('style');
    style.textContent = `
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding-top: 60px; background: #f4f7f6; }
        .navbar { position: fixed; top: 0; width: 100%; height: 60px; background: #2c3e50; color: white; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; box-sizing: border-box; z-index: 1000; }
        .nav-brand { font-weight: bold; font-size: 1.2rem; }
        .nav-links button { background: transparent; border: 1px solid white; color: white; padding: 5px 15px; cursor: pointer; border-radius: 4px; margin-left: 10px; transition: 0.3s; }
        .nav-links button:hover { background: white; color: #2c3e50; }
        .container { padding: 20px; max-width: 1200px; margin: auto; }
    `;
    document.head.appendChild(style);

    // 3. Segurança de Sessão e Injeção de Navbar
    window.checkSession = async () => {
        const { data: { session } } = await db.auth.getSession();
        
        // Se não estiver logado e não estiver na página de login, redireciona
        if (!session && !window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
            return;
        }

        if (session) {
            injectNavbar();
        }
    };

    function injectNavbar() {
        if (document.getElementById('main-nav')) return;

        const nav = document.createElement('nav');
        nav.id = 'main-nav';
        nav.className = 'navbar';
        nav.innerHTML = `
            <div class="nav-brand">ERP ABP Profissional</div>
            <div class="nav-links">
                <button onclick="location.href='index.html'">Home</button>
                <button onclick="location.href='entidades.html'">Entidades</button>
                <button onclick="logout()">Sair</button>
            </div>
        `;
        document.body.prepend(nav);
    }

    window.logout = async () => {
        await db.auth.signOut();
        window.location.href = 'login.html';
    };

    // Executa a verificação ao carregar
    document.addEventListener('DOMContentLoaded', checkSession);
})();
```
# Estrutura do Banco de Dados (SQL Profissional)
```
-- 1. Tabela de Perfis vinculada ao Auth
create table public.usuarios (
  id uuid references auth.users on delete cascade primary key,
  nome text not null,
  email text not null unique,
  nivel_acesso text default 'user', -- 'admin' ou 'user'
  created_at timestamp with time zone default now()
);

-- 2. Tabela de Entidades (Clientes/Fornecedores)
create table public.entidades (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users not null,
  nome_razao text not null,
  documento text,
  tipo text check (tipo in ('cliente', 'fornecedor', 'ambos')),
  created_at timestamp with time zone default now()
);

-- 3. Ativar RLS (Segurança de Linha)
alter table public.usuarios enable row level security;
alter table public.entidades enable row level security;

-- 4. Policies: Usuário só vê seus próprios dados
create policy "Usuários veem apenas seus perfis" on public.usuarios
  for select using (auth.uid() = id);

create policy "Usuários gerenciam suas próprias entidades" on public.entidades
  for all using (auth.uid() = user_id);
```
# INDEX.HTML
```
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - ERP ABP Profissional</title>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="conexao.js"></script>
</head>
<body>
    <div class="container">
        <header>
            <h1>Painel de Controle</h1>
            <p id="welcome-msg">Carregando informações...</p>
        </header>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 30px;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border-left: 5px solid #3498db;">
                <h3>Total Entidades</h3>
                <p id="count-entidades" style="font-size: 2rem; font-weight: bold; margin: 0;">0</p>
            </div>
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border-left: 5px solid #2ecc71;">
                <h3>Saldo Financeiro</h3>
                <p id="total-financeiro" style="font-size: 2rem; font-weight: bold; margin: 0;">R$ 0,00</p>
            </div>
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border-left: 5px solid #e67e22;">
                <h3>Produtos em Estoque</h3>
                <p id="count-produtos" style="font-size: 2rem; font-weight: bold; margin: 0;">0</p>
            </div>
        </div>

        <div style="margin-top: 40px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <h3>Visão Geral Financeira (Entradas vs Saídas)</h3>
            <canvas id="financeChart" height="100"></canvas>
        </div>
    </div>

    <script>
    (function() {
        // Aguarda a conexão do Supabase estar pronta
        document.addEventListener('DOMContentLoaded', async () => {
            // Verifica sessão via conexao.js
            const { data: { session } } = await db.auth.getSession();
            if (!session) return;

            document.getElementById('welcome-msg').innerText = `Bem-vindo, ${session.user.email}`;

            loadDashboardData();
        });

        async function loadDashboardData() {
            try {
                // 1. Contagem de Entidades
                const { count: countEntidades } = await db
                    .from('entidades')
                    .select('*', { count: 'exact', head: true });
                document.getElementById('count-entidades').innerText = countEntidades || 0;

                // 2. Contagem de Produtos
                const { count: countProdutos } = await db
                    .from('produtos')
                    .select('*', { count: 'exact', head: true });
                document.getElementById('count-produtos').innerText = countProdutos || 0;

                // 3. Resumo Financeiro Simulado (Integrar com sua tabela financeiro depois)
                renderChart();
                
            } catch (error) {
                console.error("Erro ao carregar dashboard:", error);
            }
        }

        function renderChart() {
            const ctx = document.getElementById('financeChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
                    datasets: [{
                        label: 'Fluxo de Caixa',
                        data: [1200, 1900, 3000, 2500, 4200],
                        borderColor: '#2c3e50',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'top' } }
                }
            });
        }
    })();
    </script>
</body>
</html>
```
# ENTIDADES.JS
```
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entidades - ERP ABP Profissional</title>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="conexao.js"></script>
    <style>
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px; }
        .grid-form { display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 10px; align-items: end; }
        input, select { padding: 10px; border: 1px solid #ddd; border-radius: 4px; outline: none; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; background: white; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
        th { background-color: #2c3e50; color: white; }
        .btn-add { background: #27ae60; color: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 4px; }
        .btn-del { background: #c0392b; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Gestão de Entidades (Clientes/Fornecedores)</h2>

        <div class="card">
            <form id="entidade-form" class="grid-form">
                <div style="display: flex; flex-direction: column;">
                    <label>Nome / Razão Social</label>
                    <input type="text" id="nome" placeholder="Ex: João Silva ou Empresa LTDA" required>
                </div>
                <div style="display: flex; flex-direction: column;">
                    <label>CPF/CNPJ</label>
                    <input type="text" id="documento" placeholder="00.000.000/0000-00" oninput="mascaraDocumento(this)">
                </div>
                <div style="display: flex; flex-direction: column;">
                    <label>Tipo</label>
                    <select id="tipo">
                        <option value="cliente">Cliente</option>
                        <option value="fornecedor">Fornecedor</option>
                        <option value="ambos">Ambos</option>
                    </select>
                </div>
                <button type="submit" class="btn-add">Salvar</button>
            </form>
        </div>

        <div class="card" style="padding: 0;">
            <table id="tabela-entidades">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Documento</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    </tbody>
            </table>
        </div>
    </div>

    <script>
    (function() {
        // --- UTILITÁRIOS DE SEGURANÇA E MÁSCARA ---
        
        // Máscara dinâmica para CPF/CNPJ
        window.mascaraDocumento = (i) => {
            let v = i.value.replace(/\D/g, "");
            if (v.length <= 11) { // CPF
                v = v.replace(/(\={3})(\={3})(\={3})(\={2})/g, "$1.$2.$3-$4");
                i.value = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            } else { // CNPJ
                i.value = v.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
            }
        };

        // Sanitização básica contra Injeção de Código (XSS)
        const limparTexto = (str) => {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        };

        // --- LÓGICA DO CRUD ---

        const carregarEntidades = async () => {
            const { data, error } = await db
                .from('entidades')
                .select('*')
                .order('nome_razao', { ascending: true });

            if (error) return alert("Erro ao carregar: " + error.message);

            const tbody = document.querySelector('#tabela-entidades tbody');
            tbody.innerHTML = data.map(ent => `
                <tr>
                    <td>${limparTexto(ent.nome_razao)}</td>
                    <td>${ent.documento || '---'}</td>
                    <td><span style="text-transform: capitalize">${ent.tipo}</span></td>
                    <td>
                        <button class="btn-del" onclick="deletarEntidade(${ent.id})">Excluir</button>
                    </td>
                </tr>
            `).join('');
        };

        document.getElementById('entidade-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const { data: { user } } = await db.auth.getUser();
            
            const payload = {
                user_id: user.id, // Vincula ao usuário logado (Segurança RLS)
                nome_razao: document.getElementById('nome').value.trim(),
                documento: document.getElementById('documento').value.replace(/\D/g, ""), // Salva apenas números
                tipo: document.getElementById('tipo').value
            };

            const { error } = await db.from('entidades').insert([payload]);

            if (error) {
                alert("Erro ao salvar: " + error.message);
            } else {
                document.getElementById('entidade-form').reset();
                carregarEntidades();
            }
        });

        window.deletarEntidade = async (id) => {
            if (!confirm("Deseja realmente excluir esta entidade?")) return;
            
            const { error } = await db.from('entidades').delete().eq('id', id);
            if (error) alert(error.message);
            else carregarEntidades();
        };

        // Inicialização
        document.addEventListener('DOMContentLoaded', carregarEntidades);
    })();
    </script>
</body>
</html>

```

# (produtos.html)
```
create table public.produtos (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users not null,
  nome text not null,
  sku text, -- Código de barras ou referência
  preco_venda decimal(10,2) default 0.00,
  estoque_atual int default 0,
  created_at timestamp with time zone default now()
);

-- Ativar RLS
alter table public.produtos enable row level security;

-- Criar Policy para o usuário ver/editar apenas seus próprios produtos
create policy "Usuários gerenciam seus próprios produtos" 
on public.produtos for all 
using (auth.uid() = user_id);
```


# (produtos.html)
```
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Produtos - ERP ABP Profissional</title>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="conexao.js"></script>
    <style>
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px; }
        .grid-form { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: 10px; align-items: end; }
        input { padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; background: white; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
        th { background-color: #2c3e50; color: white; }
        .btn-add { background: #27ae60; color: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 4px; }
        .btn-del { background: #c0392b; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Gestão de Produtos / Estoque</h2>

        <div class="card">
            <form id="produto-form" class="grid-form">
                <div style="display: flex; flex-direction: column;">
                    <label>Descrição do Produto</label>
                    <input type="text" id="nome" placeholder="Ex: Cadeira Escritório" required>
                </div>
                <div style="display: flex; flex-direction: column;">
                    <label>SKU/Ref</label>
                    <input type="text" id="sku" placeholder="Cod-001">
                </div>
                <div style="display: flex; flex-direction: column;">
                    <label>Preço Venda</label>
                    <input type="text" id="preco" placeholder="R$ 0,00" oninput="mascaraMoeda(this)">
                </div>
                <div style="display: flex; flex-direction: column;">
                    <label>Estoque</label>
                    <input type="number" id="estoque" value="0" min="0">
                </div>
                <button type="submit" class="btn-add">Salvar</button>
            </form>
        </div>

        <div class="card" style="padding: 0;">
            <table id="tabela-produtos">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>SKU</th>
                        <th>Preço</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>

    <script>
    (function() {
        // --- VALIDAÇÕES E MÁSCARAS ---
        window.mascaraMoeda = (i) => {
            let v = i.value.replace(/\D/g, "");
            v = (v / 100).toFixed(2) + "";
            v = v.replace(".", ",");
            v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
            v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
            i.value = "R$ " + v;
        };

        const sanitizar = (str) => {
            const p = document.createElement('p');
            p.textContent = str;
            return p.innerHTML;
        };

        const parsePreco = (str) => {
            return parseFloat(str.replace("R$ ", "").replace(".", "").replace(",", ".")) || 0;
        };

        // --- LÓGICA CRUD ---
        const listarProdutos = async () => {
            const { data, error } = await db.from('produtos').select('*').order('nome');
            if (error) return console.error(error);

            const tbody = document.querySelector('#tabela-produtos tbody');
            tbody.innerHTML = data.map(p => `
                <tr>
                    <td>${sanitizar(p.nome)}</td>
                    <td>${sanitizar(p.sku || '')}</td>
                    <td>R$ ${p.preco_venda.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                    <td>${p.estoque_atual}</td>
                    <td>
                        <button class="btn-del" onclick="deletarProduto(${p.id})">Excluir</button>
                    </td>
                </tr>
            `).join('');
        };

        document.getElementById('produto-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const { data: { user } } = await db.auth.getUser();

            const payload = {
                user_id: user.id,
                nome: document.getElementById('nome').value.trim(),
                sku: document.getElementById('sku').value.trim(),
                preco_venda: parsePreco(document.getElementById('preco').value),
                estoque_atual: parseInt(document.getElementById('estoque').value)
            };

            const { error } = await db.from('produtos').insert([payload]);
            if (error) alert(error.message);
            else {
                e.target.reset();
                listarProdutos();
            }
        });

        window.deletarProduto = async (id) => {
            if (!confirm("Excluir produto?")) return;
            await db.from('produtos').delete().eq('id', id);
            listarProdutos();
        };

        document.addEventListener('DOMContentLoaded', listarProdutos);
    })();
    </script>
</body>
</html>
```














