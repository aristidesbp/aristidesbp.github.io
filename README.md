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
# FASE 2:Vamos fazer isso do jeito certo, seguro e profissional, usando Supabase Auth (não login “caseiro”).
## A partir de agora:
* 🔐 Login seguro
* 👁️ Olho para mostrar/ocultar senha
* 🔁 Esqueci minha senha (real, por e-mail)
* 🆕 Novo cadastro
* 📄 CRUD protegido (somente usuário logado)
* 🌐 Compatível com GitHub Pages

## 🧠 ARQUITETURA FINAL
```
GitHub Pages (HTML + JS)
        ↓
Supabase Auth (login, cadastro, reset)
        ↓
Supabase Database (CRUD com RLS)

```
# 1️⃣ CONFIGURAÇÃO NO SUPABASE (OBRIGATÓRIO)
## Ativar Auth por e-mail
* Supabase → Authentication → Providers
* Ative Email
* Desative SMS (se quiser simplicidade)
  
# URL de redirecionamento (reset de senha)
* Supabase → Authentication → URL Configuration
```
 Adicione: https://SEU-USUARIO.github.io/SEU-REPO/
```
## Isso permite:
* Reset de senha
* Login funcionando no GitHub Pages

## SEGURANÇA DO BANCO (RLS REAL)
* Vamos proteger os dados por usuário autenticado.
* Ajustar tabela usuarios
```
alter table usuarios
add column auth_id uuid;
create unique index on usuarios(auth_id);
```
## Política segura (usuários só veem seus dados)
```
alter table usuarios enable row level security;

create policy "Usuário vê só seus dados"
on usuarios
for all
using (auth.uid() = auth_id)
with check (auth.uid() = auth_id);
```
👉 Agora ninguém acessa dados sem login.

# NOVA TELA: LOGIN + CADASTRO + RESET
👉 Arquivo único: index.html
Copie TUDO abaixo.
```
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Login</title>

<style>
body {
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 60px auto;
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
  color: blue;
  text-decoration: underline;
}
</style>
</head>
<body>

<h2 id="titulo">Login</h2>

<input id="email" type="email" placeholder="Email" required>

<div class="senha">
  <input id="senha" type="password" placeholder="Senha" required>
  <span onclick="toggleSenha()">👁️</span>
</div>

<button id="btnAcao" onclick="login()">Entrar</button>

<p>
  <a onclick="mostrarCadastro()">Criar conta</a> |
  <a onclick="resetSenha()">Esqueci minha senha</a>
</p>

<!-- Supabase CDN -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script>
/* ================================
   CONFIGURAÇÃO
================================ */
const dbsupabase = supabase.createClient(
  'https://SEU-PROJETO.supabase.co',
  'SUA-ANON-KEY'
)

/* ================================
   FUNÇÕES DE UI
================================ */
function toggleSenha() {
  const input = document.getElementById('senha')
  input.type = input.type === 'password' ? 'text' : 'password'
}

/* ================================
   LOGIN
================================ */
async function login() {
  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value

  const { error } = await dbsupabase.auth.signInWithPassword({
    email: email,
    password: senha
  })

  if (error) {
    alert(error.message)
    return
  }

  window.location.href = 'dashboard.html'
}

/* ================================
   RESET DE SENHA
================================ */
async function resetSenha() {
  const email = document.getElementById('email').value

  if (!email) {
    alert('Digite seu email')
    return
  }

  const { error } = await dbsupabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin
  })

  if (error) {
    alert(error.message)
    return
  }

  alert('Email de recuperação enviado!')
}

/* ================================
   TELA DE CADASTRO
================================ */
function mostrarCadastro() {
  document.getElementById('titulo').innerText = 'Cadastro'
  const btn = document.getElementById('btnAcao')
  btn.innerText = 'Cadastrar'
  btn.onclick = cadastrar
}

/* ================================
   CADASTRO SEGURO
================================ */
async function cadastrar() {
  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value

  const { data, error } = await dbsupabase.auth.signUp({
    email: email,
    password: senha
  })

  if (error) {
    alert(error.message)
    return
  }

  // cria vínculo seguro no banco
  await dbsupabase.from('usuarios').insert({
    email: email,
    nome: email.split('@')[0],
    auth_id: data.user.id
  })

  alert('Cadastro realizado! Verifique seu email.')
}
</script>

</body>
</html>

```
4️⃣ TELA PROTEGIDA (CRUD / DASHBOARD)
🧩 dashboard.html
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Dashboard</title>
</head>
<body>

<h1>Área protegida</h1>
<button onclick="logout()">Sair</button>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
const supabase = supabase.createClient(
  'https://SEU-PROJETO.supabase.co',
  'SUA-ANON-KEY'
)

async function check() {
  const { data } = await supabase.auth.getUser()
  if (!data.user) location.href = 'index.html'
}
check()

async function logout() {
  await supabase.auth.signOut()
  location.href = 'index.html'
}
</script>

</body>
</html>
```

# O QUE VOCÊ GANHOU AQUI 🚀
* ✅ Login real (Supabase Auth)
* ✅ Cadastro seguro
* ✅ Reset de senha funcional
* ✅ Olhinho da senha
* ✅ CRUD protegido por usuário
* ✅ GitHub Pages compatível
* ✅ Padrão profissional (igual SaaS real)
























