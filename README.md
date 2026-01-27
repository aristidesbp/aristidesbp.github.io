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

# 📌 Próximos passos naturais (quando você quiser)
* 🔐 Proteger o index.html (só entra logado)
* 📄 Criar CRUD por usuário (ex: apólices)
* 🧱 Separar admin vs usuário comum
* 🔁 Criar logout global
* 📱 Transformar em PWA
* 🎨 Melhorar layout (Tailwind / UI)





