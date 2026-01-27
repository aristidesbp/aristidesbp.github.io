✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
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

# 🔑 Pegar as chaves do Supabase
## Vá em Settings
*  DATA API/Project URL/copiar
*  API Keis/anon public key/copiar
*  Altentication/url config/ coloque o endereço de onde está hospedado
### Exemplo:
* URL: https://xxxxx.supabase.co
* EY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
* NO HTML/JS COLE EM [CONFIGURAÇÃO DO SUPABASE]
  
# LOGIN do jeito certo, seguro e profissional, usando Supabase Auth (login proficional).
# 🧠 ARQUITETURA FINAL DO LOGIN
* Autenticação → Supabase Auth
* Senhas → hash + sal (automático)
* Identidade → auth.users
* Dados do app → public.usuarios
* Segurança → RLS + policies
* Automação → trigger
  
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

✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅1️
# 1️⃣ CRIANDO TABELAS NO SUPABASE
* Vá em Table Editor
* Clique em New Table
* Nome da tabela: usuarios

# TABELA DE PERFIL DO USUÁRIO
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
# ATIVAR RLS
```
alter table public.usuarios enable row level security;
```
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
```
-- ==========================================
-- 1. TABELA DE PERFIS (ESTENDE O AUTH.USERS)
-- ==========================================
CREATE TABLE public.usuarios (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  nome_completo TEXT,
  avatar_url TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

-- Política: Usuário só lê e edita seu próprio perfil
CREATE POLICY "Usuários podem ver seu próprio perfil" 
ON public.usuarios FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil" 
ON public.usuarios FOR UPDATE USING (auth.uid() = id);

-- ==========================================
-- 2. TABELA DE ENTIDADES (NOTAS/CLIENTES)
-- ==========================================
CREATE TABLE public.entidades (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  titulo TEXT NOT NULL,
  conteudo TEXT,
  categoria TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.entidades ENABLE ROW LEVEL SECURITY;

-- Política: Segurança total por usuario_id
CREATE POLICY "Acesso total às próprias entidades" 
ON public.entidades FOR ALL USING (auth.uid() = usuario_id);

-- ==========================================
-- 3. TABELA DE PRODUTOS
-- ==========================================
CREATE TABLE public.produtos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nome TEXT NOT NULL,
  preco DECIMAL(10,2) DEFAULT 0,
  estoque INTEGER DEFAULT 0,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acesso total aos próprios produtos" 
ON public.produtos FOR ALL USING (auth.uid() = usuario_id);

-- ==========================================
-- 4. TABELA FINANCEIRO
-- ==========================================
CREATE TABLE public.financeiro (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  descricao TEXT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  tipo TEXT CHECK (tipo IN ('receita', 'despesa')),
  data_movimento DATE DEFAULT CURRENT_DATE,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.financeiro ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acesso total ao próprio financeiro" 
ON public.financeiro FOR ALL USING (auth.uid() = usuario_id);

-- ==========================================
-- 5. TRIGGER AUTOMÁTICA (O CORAÇÃO DO LOGIN)
-- ==========================================
-- Esta função cria o perfil na tabela 'public.usuarios' 
-- assim que o usuário confirma o e-mail no Auth.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.usuarios (id, email, nome_completo)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Gatilho que dispara após o Insert no Auth
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# 2️⃣ POLICIES
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

  
#  POLICIES DE SEGURANÇA (ESSENCIAIS)
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

✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# 3️⃣ TRIGGER AUTOMÁTICA (PADRÃO PROFISSIONAL)
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

# CRIAR O TRIGGER
```
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();
```
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# 4️⃣ (OPCIONAL) CONTROLE DE USUÁRIO ATIVO
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
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# 5️⃣ (OPCIONAL) LOG DE LOGIN (AUDITORIA)
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


 



✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
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
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# ENTIDADES/ PRODUTO/FINACEIRO/ NOTAS
# ✅ ORDEM CORRETA DE EXECUÇÃO
* 1️⃣ Criar tabelas e paginas
* 2️⃣ Ativar RLS
* 3️⃣ Criar policies
* 4️⃣ Criar function
* 5️⃣ Criar trigger


# TABELAS
```
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.entidades (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  usuario_id uuid,
  nome_completo text NOT NULL,
  cpf text,
  data_nascimento date,
  email text,
  telefone text,
  senha_acesso text,
  acesso text DEFAULT 'cliente'::text,
  relacionamento text DEFAULT 'cliente'::text,
  status text DEFAULT 'ativo'::text,
  avaliacao integer DEFAULT 5,
  cep text,
  logradouro text,
  numero text,
  bairro text,
  cidade text,
  estado text,
  arquivos_url ARRAY DEFAULT '{}'::text[],
  observacoes text,
  CONSTRAINT entidades_pkey PRIMARY KEY (id),
  CONSTRAINT entidades_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES auth.users(id)
);
CREATE TABLE public.financeiro (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  usuario_id uuid,
  descricao text NOT NULL,
  tipo text CHECK (tipo = ANY (ARRAY['receita'::text, 'despesa'::text])),
  valor numeric NOT NULL DEFAULT 0,
  data_vencimento date,
  status text DEFAULT 'pendente'::text,
  entidade_id uuid,
  observacoes text,
  CONSTRAINT financeiro_pkey PRIMARY KEY (id),
  CONSTRAINT financeiro_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES auth.users(id),
  CONSTRAINT financeiro_entidade_id_fkey FOREIGN KEY (entidade_id) REFERENCES public.entidades(id)
);
CREATE TABLE public.produtos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  usuario_id uuid,
  nome text NOT NULL,
  codigo_de_barras text,
  imagem_url text,
  categoria_prod text,
  data_compra date,
  numero_nota text,
  entidade_id uuid,
  preco_custo numeric DEFAULT 0,
  preco_venda numeric NOT NULL,
  estoque_atual integer DEFAULT 0,
  estoque_minimo integer DEFAULT 0,
  CONSTRAINT produtos_pkey PRIMARY KEY (id),
  CONSTRAINT produtos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES auth.users(id),
  CONSTRAINT produtos_entidade_id_fkey FOREIGN KEY (entidade_id) REFERENCES public.entidades(id)
);

```

# INDEX.HTML
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SISTEMA ERP ABP - Inicio</title>
    
    <!-- <script src="js/conexao_supabase.js" defer></script> -->
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
   <style>
       /* Reset e Box-sizing conforme seu padrão */
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    background: #f1f5f9;
    /* Removido o padding fixo para deixar o conexao.js (Guard) controlar via classe .erp-guard-active */
}

.content {
    max-width: 1100px;
    margin: auto;
    padding: 20px;
}

.header-area {
    text-align: center;
    margin-bottom: 30px;
}

.header-area h1 {
    color: #1e293b;
    font-size: 1.8rem;
    letter-spacing: -0.5px;
}

/* Grid Responsivo Inteligente */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
}

/* Estilização dos Cards */
.card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    text-decoration: none;
    color: #334155;
    text-align: center;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

.card:hover {
    transform: translateY(-5px);
    border-color: #3ecf8e;
    box-shadow: 0 10px 25px rgba(62, 207, 142, 0.1);
}

.card i {
    font-size: 40px;
    color: #3ecf8e;
    margin-bottom: 15px;
}

.card h3 {
    margin: 10px 0 5px 0;
    font-size: 1.25rem;
    color: #1e293b;
}

.card p {
    font-size: 0.9em;
    color: #64748b;
    line-height: 1.4;
    margin: 0;
}

/* Responsividade Extra para Celulares Pequenos */
@media (max-width: 480px) {
    .grid {
        grid-template-columns: 1fr;
    }
    .card {
        padding: 20px;
    }
}
   </style>
    
    
   
</head>
<body>
 <div class="content">
        <div class="header-area">
            <h1>SISTEMA ERP ABP</h1>
        </div>
     <div class="grid">

 <div class="grid">         
<!-- ################################################################ -->
<!-- ################################################################ -->
<!-- ################################################################ -->
<!-- ################################################################ -->

     
    <a href="bloco_de_notas.html" class="card">
        <i class="fas fa-sticky-note"></i>
        <h3>Bloco de Notas</h3>
        <p>Anote e organize suas ideias na nuvem.</p>
    </a>
    
    <a href="produtos.html" class="card">
        <i class="fas fa-box"></i> <h3>Produtos</h3>
        <p>Gestão de estoque e catálogo.</p> </a>

    <a href="entidades.html" class="card">
        <i class="fas fa-users"></i>
        <h3>Entidades</h3>
        <p>Clientes, Fornecedores e Colaboradores.</p>
    </a>

    <a href="financeiro.html" class="card">
        <i class="fas fa-chart-line"></i> <h3>Financeiro</h3>
        <p>Fluxo de caixa e controle de contas.</p>
    </a>


         
<!-- ################################################################ -->
<!-- ################################################################ -->
<!-- ################################################################ -->
<!-- ################################################################ -->
</div>
        </div>
    </div>
</body>
</html>
```


# CONEXAO_SUPABASE.JS
```
/** ############################################################################## */
/** ERP ABP - GUARD GLOBAL (Versão 2.0 - Otimizada)
 * Segurança + SDK Auto-load + RBAC + Real-time Auth State */

(async () => {
    "use strict";

    if (window.__ERP_GUARD_LOADED__) return;
    window.__ERP_GUARD_LOADED__ = true;

    const CONFIG = Object.freeze({
        SUPABASE_URL: 'https://kjhjeaiwjilkgocwvbwi.supabase.co',
        SUPABASE_KEY: 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX',
        LOGIN_PAGE: "login.html",
        HOME_PAGE: "index.html",
        HUB_PAGE: "https://aristidesbp.github.io/",
        APP_NAME: "ERP ABP",
        SDK_URL: "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
    });

    async function carregarSDK() {
        if (window.supabase) return true;
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CONFIG.SDK_URL;
            script.async = true;
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error("Falha ao carregar SDK do Supabase"));
            document.head.appendChild(script);
        });
    }

    try {
        await carregarSDK();
        
        // Inicializa o cliente se não existir
        if (!window._supabase) {
            window._supabase = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
        }

        /**
         * Observador em Tempo Real
         * Redireciona para o login se o usuário deslogar em qualquer aba
         */
        _supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                window.location.replace(CONFIG.LOGIN_PAGE);
            }
        });

        async function obterSessaoAtiva() {
            const { data: { session }, error } = await _supabase.auth.getSession();
            if (error || !session) {
                window.location.replace(CONFIG.LOGIN_PAGE);
                return null;
            }
            return session;
        }

        async function logout() {
            if (!confirm("Deseja realmente sair do sistema?")) return;
            await _supabase.auth.signOut();
            window.location.replace(CONFIG.LOGIN_PAGE);
        }

        function renderNavbar(user) {
            if (document.querySelector(".erp-navbar")) return;

            // Lógica de Nível de Acesso (Exemplo: admin ou authenticated)
            const isAdmin = user.role === 'service_role' || user.app_metadata?.role === 'admin';

            const style = `
                <style>
                    .erp-navbar, .erp-navbar * { box-sizing: border-box; }
                    .erp-navbar { 
                        position: fixed; top: 0; left: 0; width: 100%; 
                        background: #fff; padding: 10px 15px; 
                        display: flex; justify-content: space-between; align-items: center; 
                        box-shadow: 0 2px 10px rgba(0,0,0,.1); z-index: 9999; 
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    }
                    .erp-navbar .brand { 
                        font-weight: bold; color: #0f172a; font-size: 1.1rem; 
                        display: flex; align-items: center; gap: 8px;
                    }
                    .erp-navbar .nav-right { display: flex; gap: 10px; align-items: center; }
                    
                    .erp-navbar .btn { 
                        padding: 8px 12px; border-radius: 6px; font-weight: 600; font-size: 13px; border: none; 
                        cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; 
                        gap: 6px; transition: all 0.2s ease; color: white;
                    }
                    .erp-navbar .btn-logout { background: #ef4444; }
                    .erp-navbar .btn-logout:hover { background: #dc2626; }
                    .erp-navbar .btn-home { background: #3ecf8e; }
                    .erp-navbar .btn-home:hover { background: #34b27b; }
                    .erp-navbar .btn-admin { background: #6366f1; }

                    .user-badge { font-size: 11px; background: #f1f5f9; padding: 4px 8px; border-radius: 20px; color: #64748b; border: 1px solid #e2e8f0; }

                    @media (max-width: 600px) {
                        .erp-navbar .btn span { display: none; }
                        .user-badge { display: none; }
                    }
                    body.erp-guard-active { padding-top: 70px !important; }
                </style>`;

            const html = `
                <nav class="erp-navbar">
                    <div class="brand"><span style="color: #3ecf8e;">●</span> ${CONFIG.APP_NAME}</div>
                    <div class="nav-right">
                        <span class="user-badge">${user.email}</span>
                        ${isAdmin ? `<a href="admin.html" class="btn btn-admin"><i class="fas fa-lock"></i> <span>Painel</span></a>` : ''}
                        <a href="${CONFIG.HUB_PAGE}" class="btn btn-home"><i class="fas fa-external-link-alt"></i> <span>Projetos</span></a>
                        <a href="${CONFIG.HOME_PAGE}" class="btn btn-home"><i class="fas fa-home"></i> <span>Início</span></a>
                        <button class="btn btn-logout" id="btnSair"><i class="fas fa-sign-out-alt"></i> <span>Sair</span></button>
                    </div>
                </nav>`;

            document.head.insertAdjacentHTML("beforeend", style);
            document.body.insertAdjacentHTML("afterbegin", html);
            document.body.classList.add("erp-guard-active");
            document.getElementById("btnSair")?.addEventListener("click", logout);
        }

        // Inicialização
        const inicializar = async () => {
            const session = await obterSessaoAtiva();
            if (session) {
                renderNavbar(session.user);
            }
        };

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", inicializar);
        } else {
            inicializar();
        }

    } catch (err) {
        console.error("Erro crítico no Guard Global:", err);
    }
})();
```

# ENTIDADES.HTML
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão de Entidades - ERP ABP</title>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

    <!-- <script src="conexao_supabase.js"></script> -->
 
    <style>
        :root {
            --primary: #3ecf8e;
            --dark: #0f172a;
            --bg: #f1f5f9;
        }

        * { box-sizing: border-box; }

        body {
            margin: 0;
            font-family: 'Segoe UI', sans-serif;
            background: var(--bg);
            /* O padding-top agora é controlado pelo conexao_supabase.js automaticamente */
        }

        .container {
            max-width: 1100px;
            margin: auto;
            padding: 20px;
        }

        .card {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            margin-bottom: 20px;
        }

        .section-title {
            color: var(--primary);
            font-size: 14px;
            text-transform: uppercase;
            margin: 20px 0 10px;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
            font-weight: bold;
        }

        .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 15px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-size: 13px;
            color: #64748b;
            font-weight: bold;
        }

        input, select, textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
        }

        .password-wrapper {
            position: relative;
            display: flex;
            align-items: center;
        }
        .password-wrapper i {
            position: absolute;
            right: 10px;
            cursor: pointer;
            color: #64748b;
        }

        .btn-add {
            background: var(--primary);
            color: white;
            padding: 15px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            width: 100%;
            margin-top: 20px;
        }

        .btn-cancel {
            background: #64748b;
            color: white;
            margin-top: 10px;
            border: none;
            padding: 10px;
            border-radius: 6px;
            cursor: pointer;
            display: none;
            width: 100%;
        }

        .table-container {
            background: white;
            border-radius: 12px;
            overflow-x: auto;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        table { width: 100%; border-collapse: collapse; min-width: 800px; }
        th { background: #f8fafc; padding: 15px; color: #64748b; font-size: 12px; text-transform: uppercase; }
        td { padding: 15px; border-top: 1px solid #f1f5f9; }

        .btn-edit { color: #3b82f6; cursor: pointer; font-size: 18px; background: none; border: none; margin-right: 10px;}
        .btn-del { color: #ef4444; cursor: pointer; font-size: 18px; background: none; border: none; margin-right: 10px;}
        .btn-wpp { color: #25d366; cursor: pointer; font-size: 18px; background: none; border: none; margin-right: 10px;}
        .btn-mail { color: #ea4335; cursor: pointer; font-size: 18px; background: none; border: none; }

        .export-area {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 15px;
        }

        .btn-export {
            background: #2c3e50;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .btn-export-full { background: #1e293b; }
    </style>
</head>
<body>

<div class="container">
    <div class="card">
        <h3 id="form-title">Novo Cadastro de Entidade</h3>
        <input type="hidden" id="edit-id">

        <div class="section-title">Informações e Acesso</div>
        <div class="form-grid">
            <div><label>Nome Completo / Razão *</label><input type="text" id="nome_completo"></div>
            <div><label>CPF / CNPJ</label><input type="text" id="cpf"></div>
            <div><label>Data Nascimento</label><input type="date" id="data_nascimento"></div>
            <div><label>E-mail</label><input type="email" id="email"></div>
            <div><label>Telefone / WhatsApp *</label><input type="text" id="telefone"></div>
            <div>
                <label>Senha Interna</label>
                <div class="password-wrapper">
                    <input type="password" id="senha_acesso">
                    <i class="fas fa-eye" id="togglePassword" onclick="togglePasswordVisibility()"></i>
                </div>
            </div>
            
            <div>
                <label>Nível de Acesso</label>
                <select id="acesso">
                    <option value="cliente">Cliente</option>
                    <option value="funcionario">Funcionário</option>
                    <option value="comprador">Comprador</option>
                    <option value="master">Master</option>
                </select>
            </div>
            <div>
                <label>Relacionamento</label>
                <select id="relacionamento">
                    <option value="cliente">Cliente</option>
                    <option value="funcionario">Funcionário</option>
                    <option value="fornecedor">Fornecedor</option>
                    <option value="terceirizado">Terceirizado</option>
                    <option value="outros">Outros</option>
                </select>
            </div>
            <div>
                <label>Status</label>
                <select id="status">
                    <option value="ativo">Ativo</option>
                    <option value="desativado">Desativado</option>
                </select>
            </div>
            <div><label>Avaliação (0-10)</label><input type="number" id="avaliacao" min="0" max="10" value="5"></div>
        </div>

        <div class="section-title">Endereço</div>
        <div class="form-grid">
            <div><label>CEP</label><input type="text" id="cep" maxlength="8" onblur="buscaCEP()"></div>
            <div style="grid-column: span 2;"><label>Logradouro</label><input type="text" id="logradouro"></div>
            <div><label>Número</label><input type="text" id="numero"></div>
            <div><label>Bairro</label><input type="text" id="bairro"></div>
            <div><label>Cidade</label><input type="text" id="cidade"></div>
            <div><label>UF</label><input type="text" id="estado" maxlength="2"></div>
        </div>

        <div class="section-title">Complementos</div>
        <div class="form-grid">
            <div style="grid-column: span 2;"><label>URL de Arquivos</label><input type="text" id="arquivos_url"></div>
            <div style="grid-column: span 2;"><label>Observações</label><textarea id="observacoes" rows="2"></textarea></div>
        </div>

        <button class="btn-add" id="btn-save" onclick="handleSave()">Salvar Entidade</button>
        <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
    </div>

    <div class="card" style="margin-bottom: 10px; padding: 15px;">
        <label><i class="fas fa-search"></i> BUSCAR ENTIDADE</label>
        <input type="text" id="inputBusca" placeholder="Digite o nome para filtrar..." onkeyup="filtrarTabela()">
        
        <div class="export-area">
            <button class="btn-export" onclick="exportarPDFListagem()">
                <i class="fas fa-list"></i> Exportar Listagem (PDF)
            </button>
            <button class="btn-export btn-export-full" onclick="exportarPDFFichaCompleta()">
                <i class="fas fa-file-invoice"></i> Exportar Fichas Detalhadas (PDF)
            </button>
        </div>
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Nome / Tipo</th>
                    <th>Telefone / E-mail</th>
                    <th>Acesso / Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="entities-list"></tbody>
        </table>
    </div>
</div>

<script>
let currentData = [];

// Função para mostrar/esconder senha
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('senha_acesso');
    const toggleIcon = document.getElementById('togglePassword');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

async function buscaCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await res.json();
            if (!data.erro) {
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
            }
        } catch { console.error("Erro CEP"); }
    }
}

async function loadEntities() {
    // Usando window._supabase injetado pelo conexao_supabase.js
    const { data, error } = await window._supabase.from('entidades').select('*').order('nome_completo');
    if (error) return;
    currentData = data || [];
    renderTable(currentData);
}

function renderTable(data) {
    const list = document.getElementById('entities-list');
    list.innerHTML = data.map(c => {
        const wppLink = c.telefone && c.telefone.includes('http') ? c.telefone : `https://wa.me/${c.telefone ? c.telefone.replace(/\D/g, '') : ''}`;
        const mailLink = c.email ? `https://mail.google.com/mail/?view=cm&fs=1&to=${c.email}` : '#';

        return `
        <tr>
            <td><b>${c.nome_completo}</b><br><small>${c.relacionamento.toUpperCase()}</small></td>
            <td>${c.telefone || 'Sem contato'}<br><small>${c.email || ''}</small></td>
            <td>${c.acesso}<br><small style="color:${c.status === 'ativo' ? 'green' : 'red'}">${c.status}</small></td>
            <td>
                <button class="btn-edit" title="Editar" onclick="editFull('${c.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-del" title="Excluir" onclick="deleteEntity('${c.id}')"><i class="fas fa-trash"></i></button>
                <a href="${wppLink}" target="_blank" class="btn-wpp" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                <a href="${mailLink}" target="_blank" class="btn-mail" title="Gmail"><i class="fas fa-envelope"></i></a>
            </td>
        </tr>
    `}).join('') || '<tr><td colspan="4" style="text-align:center">Nenhuma entidade encontrada.</td></tr>';
}

function filtrarTabela() {
    const filtro = document.getElementById("inputBusca").value.toLowerCase();
    const linhas = document.getElementById("entities-list").getElementsByTagName("tr");
    for (let i = 0; i < linhas.length; i++) {
        const colunaNome = linhas[i].getElementsByTagName("td")[0];
        if (colunaNome) {
            const txt = colunaNome.textContent || colunaNome.innerText;
            linhas[i].style.display = txt.toLowerCase().includes(filtro) ? "" : "none";
        }
    }
}

function exportarPDFListagem() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Listagem de Entidades - ERP ABP", 14, 15);
    const rows = [];
    document.querySelectorAll("#entities-list tr").forEach(tr => {
        if (tr.style.display !== "none") {
            const cells = tr.querySelectorAll("td");
            if(cells.length > 0) rows.push([cells[0].innerText.replace('\n', ' - '), cells[1].innerText.replace('\n', ' - '), cells[2].innerText.replace('\n', ' - ')]);
        }
    });
    doc.autoTable({ head: [['Entidade / Tipo', 'Contato', 'Acesso / Status']], body: rows, startY: 20 });
    doc.save("listagem_entidades.pdf");
}

function exportarPDFFichaCompleta() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 20;
    const filtro = document.getElementById("inputBusca").value.toLowerCase();
    const dadosFiltrados = currentData.filter(c => c.nome_completo.toLowerCase().includes(filtro));
    doc.setFontSize(16);
    doc.text("FICHAS DETALHADAS DE ENTIDADES", 14, y);
    y += 10;
    dadosFiltrados.forEach((c, index) => {
        if (y > 250) { doc.addPage(); y = 20; }
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text(`${index + 1}. ${c.nome_completo.toUpperCase()}`, 14, y);
        y += 6;
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.text(`Doc: ${c.cpf || 'N/A'} | Nasc: ${c.data_nascimento || 'N/A'}`, 14, y);
        y += 4;
        doc.text(`Email: ${c.email || 'N/A'} | Tel: ${c.telefone || 'N/A'}`, 14, y);
        y += 4;
        doc.text(`End: ${c.logradouro || ''}, ${c.numero || ''} - ${c.bairro || ''}, ${c.cidade || ''}/${c.estado || ''}`, 14, y);
        y += 4;
        doc.text(`Tipo: ${c.relacionamento} | Acesso: ${c.acesso} | Status: ${c.status}`, 14, y);
        y += 4;
        doc.text(`Obs: ${c.observacoes || 'Nenhuma'}`, 14, y);
        y += 5;
        doc.line(14, y, 196, y);
        y += 8;
    });
    doc.save("fichas_entidades.pdf");
}

async function handleSave() {
    const { data: { user } } = await window._supabase.auth.getUser();
    const id = document.getElementById('edit-id').value;
    const dados = {
        usuario_id: user.id,
        nome_completo: document.getElementById('nome_completo').value,
        cpf: document.getElementById('cpf').value,
        data_nascimento: document.getElementById('data_nascimento').value || null,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        senha_acesso: document.getElementById('senha_acesso').value,
        acesso: document.getElementById('acesso').value,
        relacionamento: document.getElementById('relacionamento').value,
        status: document.getElementById('status').value,
        avaliacao: parseInt(document.getElementById('avaliacao').value),
        observacoes: document.getElementById('observacoes').value,
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        arquivos_url: document.getElementById('arquivos_url').value ? [document.getElementById('arquivos_url').value] : []
    };
    if (!dados.nome_completo) return alert("Nome é obrigatório");
    
    const { error } = id ? 
        await window._supabase.from('entidades').update(dados).eq('id', id) : 
        await window._supabase.from('entidades').insert([dados]);
    
    if (error) alert("Erro: " + error.message); else { resetForm(); loadEntities(); }
}

async function editFull(id) {
    const { data, error } = await window._supabase.from('entidades').select('*').eq('id', id).single();
    if (error || !data) return;
    Object.keys(data).forEach(k => {
        const el = document.getElementById(k);
        if (el) el.value = (k === 'arquivos_url' && data[k]) ? data[k][0] : (data[k] || '');
    });
    document.getElementById('edit-id').value = data.id;
    document.getElementById('form-title').innerText = "Editando Entidade";
    document.getElementById('btn-save').innerText = "Atualizar Entidade";
    document.getElementById('btn-cancel').style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
    document.querySelectorAll('input, select, textarea').forEach(i => {
        if(i.id === 'avaliacao') i.value = '5';
        else if(i.tagName === 'SELECT') i.selectedIndex = 0;
        else i.value = '';
    });
    document.getElementById('edit-id').value = '';
    document.getElementById('form-title').innerText = "Novo Cadastro de Entidade";
    document.getElementById('btn-save').innerText = "Salvar Entidade";
    document.getElementById('btn-cancel').style.display = "none";
}

async function deleteEntity(id) {
    if (confirm("Excluir definitivamente?")) {
        await window._supabase.from('entidades').delete().eq('id', id);
        loadEntities();
    }
}

// O Guard global cuida do redirecionamento, basta carregar os dados
document.addEventListener('DOMContentLoaded', () => {
    // Pequeno delay para garantir que o _supabase foi inicializado pelo Guard
    setTimeout(loadEntities, 500);
});
</script>
</body>
</html>
```
# PRODUTOS.HTML
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Produtos - ERP ABP</title>
    
    <script src="https://unpkg.com/html5-qrcode"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <script src="conexao_supabase.js"></script>

    <style>
        :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; --danger: #ef4444; }
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Segoe UI', sans-serif; background: var(--bg); color: #1e293b; }
        
        /* O padding-top é aplicado automaticamente pelo conexao_supabase.js */
        
        .container { max-width: 1250px; margin: auto; padding: 20px; }
        .card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 25px; }
        .section-title { color: var(--primary); font-size: 13px; text-transform: uppercase; margin: 25px 0 12px; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px; font-weight: 800; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
        label { display: block; margin-bottom: 5px; font-size: 13px; color: #64748b; font-weight: 600; }
        input, select { width: 100%; padding: 11px; border: 1px solid #e2e8f0; border-radius: 8px; }
        
        .btn-add { background: var(--primary); color: white; padding: 15px; border: none; border-radius: 8px; cursor: pointer; width: 100%; margin-top: 20px; font-weight: bold; }
        .btn-cancel { background: #94a3b8; color: white; padding: 12px; border: none; border-radius: 8px; width: 100%; margin-top: 10px; cursor: pointer; font-weight: bold; }
        .btn-scan { background: var(--dark); color: white; border: none; padding: 10px 15px; border-radius: 8px; cursor: pointer; }
        
        .table-container { background: white; border-radius: 12px; overflow-x: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        table { width: 100%; border-collapse: collapse; min-width: 900px; }
        th { background: #f8fafc; padding: 15px; font-size: 12px; text-align: left; color: #475569; }
        td { padding: 12px 15px; border-top: 1px solid #f1f5f9; font-size: 14px; }
        
        .img-prod { width: 50px; height: 50px; object-fit: cover; border-radius: 6px; background: #eee; }
        #reader { width: 100%; border-radius: 12px; margin-bottom: 10px; }

        .actions-flex { display: flex; gap: 8px; }
        .btn-action { border: none; border-radius: 6px; padding: 8px; cursor: pointer; color: white; transition: 0.2s; }
        .btn-edit { background-color: var(--dark); }
        .btn-delete { background-color: var(--danger); }
        .btn-action:hover { filter: brightness(1.2); }
    </style>
</head>
<body>

<div class="container">
    <div class="card">
        <h3 id="form-title">Novo Produto</h3>
        <input type="hidden" id="edit-id">
        
        <div class="section-title">Identificação e Foto</div>
        <div class="form-grid">
            <div style="grid-column: span 2;">
                <label>Foto do Produto</label>
                <input type="file" id="foto_produto" accept="image/*" onchange="previewImage(this)">
                <div id="preview-container" style="margin-top:10px; display:none;">
                    <img id="img-preview" src="" style="max-height: 120px; border: 2px solid #3ecf8e; border-radius: 8px;">
                </div>
            </div>
            <div style="grid-column: span 2;">
                <label>Nome do Produto *</label>
                <input type="text" id="nome" placeholder="Ex: Porcelanato 60x60">
            </div>
            <div>
                <label>Código de Barras (EAN)</label>
                <div style="display: flex; gap: 5px;">
                    <input type="text" id="codigo_de_barras" placeholder="0000000000000">
                    <button type="button" class="btn-scan" onclick="abrirScanner()">
                        <i class="fas fa-camera"></i>
                    </button>
                </div>
            </div>
        </div>

        <div id="reader-container" style="display:none;">
            <div id="reader"></div>
            <button class="btn-cancel" onclick="fecharScanner()" style="margin-bottom: 20px;">Fechar Câmera</button>
        </div>

        <div class="section-title">Dados da Compra e Fornecedor</div>
        <div class="form-grid">
            <div><label>Data da Compra</label><input type="date" id="data_compra"></div>
            <div><label>Nº Nota Fiscal</label><input type="text" id="numero_nota"></div>
            <div>
                <label>Fornecedor</label>
                <select id="entidade_id"><option value="">Aguarde...</option></select>
            </div>
            <div><label>Categoria</label><input type="text" id="categoria_prod" list="lista-categorias"></div>
            <datalist id="lista-categorias"></datalist>
        </div>

        <div class="section-title">Preços e Estoque</div>
        <div class="form-grid">
            <div><label>Custo (R$)</label><input type="number" id="preco_custo" step="0.01"></div>
            <div><label>Venda (R$) *</label><input type="number" id="preco_venda" step="0.01"></div>
            <div><label>Estoque Atual</label><input type="number" id="estoque_atual"></div>
            <div><label>Mínimo</label><input type="number" id="estoque_minimo"></div>
        </div>

        <button class="btn-add" id="btn-save" onclick="handleSaveProduto()">Salvar Produto</button>
        <button id="btn-cancel" class="btn-cancel" onclick="resetForm()" style="display:none;">Cancelar Edição</button>
    </div>

    <div class="card">
        <div class="form-grid">
            <div style="grid-column: span 2;">
                <label>Busca Inteligente</label>
                <input type="text" id="inputBusca" onkeyup="filtrarProdutos()" placeholder="Nome, SKU ou EAN...">
            </div>
            <div>
                <label>Filtrar Categoria</label>
                <select id="filtro_categoria" onchange="filtrarProdutos()">
                    <option value="">Todas</option>
                </select>
            </div>
        </div>
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Produto</th>
                    <th>Categoria</th>
                    <th>Estoque</th>
                    <th>Venda</th>
                    <th>Compra / NF</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="produtos-list"></tbody>
        </table>
    </div>
</div>

<script>
(function() {
    "use strict";
    let listaProdutos = [];
    let html5QrCode;

    // Aguarda o Guard Global inicializar o window._supabase
    async function inicializar() {
        if (!window._supabase) {
            setTimeout(inicializar, 500);
            return;
        }
        await loadEntidadesFornecedores();
        await loadProdutos();
    }

    async function loadEntidadesFornecedores() {
        const { data, error } = await window._supabase
            .from('entidades')
            .select('id, nome_completo')
            .eq('relacionamento', 'fornecedor')
            .order('nome_completo');

        if (!error) {
            const select = document.getElementById('entidade_id');
            select.innerHTML = '<option value="">Selecione o Fornecedor...</option>' + 
                data.map(e => `<option value="${e.id}">${e.nome_completo}</option>`).join('');
        }
    }

    async function loadProdutos() {
        const { data, error } = await window._supabase
            .from('produtos')
            .select('*, entidades(nome_completo)')
            .order('nome');

        if (!error) {
            listaProdutos = data || [];
            renderProdutos(listaProdutos);
            atualizarFiltrosCategorias(listaProdutos);
        }
    }

    // --- Lógica de Imagem ---
    window.previewImage = function(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = e => {
                document.getElementById('img-preview').src = e.target.result;
                document.getElementById('preview-container').style.display = 'block';
            }
            reader.readAsDataURL(input.files[0]);
        }
    };

    async function comprimirImagem(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    const MAX_SIZE = 800;
                    if (width > height) { if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; } }
                    else { if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; } }
                    canvas.width = width; canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.7);
                };
            };
        });
    }

    window.handleSaveProduto = async function() {
        try {
            const { data: { user } } = await window._supabase.auth.getUser();
            const id = document.getElementById('edit-id').value;
            const fotoInput = document.getElementById('foto_produto');
            let publicUrl = document.getElementById('img-preview').src;

            if (fotoInput.files && fotoInput.files[0]) {
                const file = fotoInput.files[0];
                const imagemBlob = await comprimirImagem(file);
                const filePath = `fotos/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
                
                const { error: uploadError } = await window._supabase.storage
                    .from('produtos').upload(filePath, imagemBlob);
                if (uploadError) throw uploadError;

                const { data: urlData } = window._supabase.storage
                    .from('produtos').getPublicUrl(filePath);
                publicUrl = urlData.publicUrl;
            }

            const dados = {
                usuario_id: user.id,
                nome: document.getElementById('nome').value,
                codigo_de_barras: document.getElementById('codigo_de_barras').value,
                data_compra: document.getElementById('data_compra').value || null,
                numero_nota: document.getElementById('numero_nota').value,
                categoria_prod: document.getElementById('categoria_prod').value,
                entidade_id: document.getElementById('entidade_id').value || null,
                preco_custo: parseFloat(document.getElementById('preco_custo').value) || 0,
                preco_venda: parseFloat(document.getElementById('preco_venda').value) || 0,
                estoque_atual: parseInt(document.getElementById('estoque_atual').value) || 0,
                estoque_minimo: parseInt(document.getElementById('estoque_minimo').value) || 0,
                imagem_url: publicUrl.startsWith('data:') ? null : publicUrl
            };

            if (!dados.nome || !dados.preco_venda) return alert("Nome e Venda são obrigatórios!");

            const { error } = id ? 
                await window._supabase.from('produtos').update(dados).eq('id', id) : 
                await window._supabase.from('produtos').insert([dados]);

            if (error) throw error;
            resetForm(); loadProdutos();
            alert("Produto salvo!");
        } catch (err) { alert("Erro: " + err.message); }
    };

    window.renderProdutos = function(dados) {
        const list = document.getElementById('produtos-list');
        list.innerHTML = dados.map(p => {
            const estoqueBaixo = p.estoque_atual <= (p.estoque_minimo || 0);
            return `
            <tr>
                <td><img src="${p.imagem_url || 'https://via.placeholder.com/50'}" class="img-prod"></td>
                <td><b>${p.nome}</b></td>
                <td><span style="background:#e2e8f0; padding:2px 8px; border-radius:4px; font-size:12px;">${p.categoria_prod || '-'}</span></td>
                <td style="${estoqueBaixo ? 'color:red; font-weight:bold' : ''}">${p.estoque_atual} un</td>
                <td>R$ ${parseFloat(p.preco_venda).toLocaleString('pt-BR', {minFractionDigits:2})}</td>
                <td><small>NF: ${p.numero_nota || '-'}<br>${p.data_compra || ''}</small></td>
                <td>
                    <div class="actions-flex">
                        <button class="btn-action btn-edit" onclick="window.editProduto('${p.id}')"><i class="fas fa-edit"></i></button>
                        <button class="btn-action btn-delete" onclick="window.deleteProduto('${p.id}')"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>`;
        }).join('') || '<tr><td colspan="7" style="text-align:center">Nenhum produto.</td></tr>';
    };

    window.editProduto = function(id) {
        const p = listaProdutos.find(i => i.id === id);
        if (!p) return;
        document.getElementById('edit-id').value = p.id;
        document.getElementById('nome').value = p.nome;
        document.getElementById('preco_venda').value = p.preco_venda;
        document.getElementById('estoque_atual').value = p.estoque_atual;
        if (p.imagem_url) {
            document.getElementById('img-preview').src = p.imagem_url;
            document.getElementById('preview-container').style.display = 'block';
        }
        document.getElementById('form-title').innerText = "Editando Produto";
        document.getElementById('btn-save').innerText = "Atualizar";
        document.getElementById('btn-cancel').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.resetForm = function() {
        document.getElementById('edit-id').value = '';
        document.querySelectorAll('input, select').forEach(i => i.value = '');
        document.getElementById('img-preview').src = '';
        document.getElementById('preview-container').style.display = 'none';
        document.getElementById('form-title').innerText = "Novo Produto";
        document.getElementById('btn-save').innerText = "Salvar Produto";
        document.getElementById('btn-cancel').style.display = 'none';
    };

    window.deleteProduto = async function(id) {
        if (confirm("Excluir produto?")) {
            await window._supabase.from('produtos').delete().eq('id', id);
            loadProdutos();
        }
    };

    window.abrirScanner = function() {
        document.getElementById('reader-container').style.display = 'block';
        html5QrCode = new Html5Qrcode("reader");
        html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 },
            (text) => { document.getElementById('codigo_de_barras').value = text; fecharScanner(); }
        );
    };

    window.fecharScanner = function() {
        if (html5QrCode) html5QrCode.stop().then(() => { document.getElementById('reader-container').style.display = 'none'; });
    };

    window.filtrarProdutos = function() {
        const busca = document.getElementById('inputBusca').value.toLowerCase();
        const filtrados = listaProdutos.filter(p => p.nome.toLowerCase().includes(busca));
        renderProdutos(filtrados);
    };

    function atualizarFiltrosCategorias(produtos) {
        const categorias = [...new Set(produtos.map(p => p.categoria_prod).filter(Boolean))];
        document.getElementById('lista-categorias').innerHTML = categorias.map(c => `<option value="${c}">`).join('');
    }

    document.addEventListener('DOMContentLoaded', inicializar);
})();
</script>
</body>
</html>
```
# FINANCEIRO.HTML
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão Financeira - ERP ABP</title>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <script src="conexao_supabase.js"></script>
    
    <style>
        :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; --danger: #ef4444; }
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Segoe UI', sans-serif; background: var(--bg); }

        .container { max-width: 1200px; margin: auto; padding: 20px; }
        .card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; }
        
        /* Dashboard de Saldos */
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 25px; }
        .stat-card { padding: 20px; border-radius: 12px; color: white; display: flex; flex-direction: column; }
        .stat-card.receber { background: #10b981; }
        .stat-card.pagar { background: #ef4444; }
        .stat-card.saldo { background: #3b82f6; }
        .stat-value { font-size: 1.5rem; font-weight: bold; margin-top: 5px; }

        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
        label { display: block; margin-bottom: 5px; font-size: 13px; color: #64748b; font-weight: 600; }
        input, select, textarea { width: 100%; padding: 11px; border: 1px solid #e2e8f0; border-radius: 8px; }

        .btn-add { background: var(--primary); color: white; padding: 15px; border: none; border-radius: 8px; cursor: pointer; width: 100%; margin-top: 15px; font-weight: bold; }
        .btn-cancel { background: #94a3b8; color: white; padding: 10px; border: none; border-radius: 8px; width: 100%; margin-top: 10px; cursor: pointer; }

        .table-container { background: white; border-radius: 12px; overflow-x: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        table { width: 100%; border-collapse: collapse; min-width: 900px; }
        th { background: #f8fafc; padding: 15px; font-size: 12px; text-align: left; color: #475569; }
        td { padding: 12px 15px; border-top: 1px solid #f1f5f9; font-size: 14px; }

        .status-badge { padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
        .status-pago { background: #dcfce7; color: #166534; }
        .status-pendente { background: #fef9c3; color: #854d0e; }
        
        .bulk-actions { background: #334155; color: white; padding: 15px; border-radius: 8px; margin-bottom: 15px; display: none; }
    </style>
</head>
<body>

<div class="container">
    <div class="stats-grid">
        <div class="stat-card receber">
            <span>A Receber</span>
            <div class="stat-value" id="total-receber">R$ 0,00</div>
        </div>
        <div class="stat-card pagar">
            <span>A Pagar</span>
            <div class="stat-value" id="total-pagar">R$ 0,00</div>
        </div>
        <div class="stat-card saldo">
            <span>Saldo Previsto</span>
            <div class="stat-value" id="total-saldo">R$ 0,00</div>
        </div>
    </div>

    <div class="card">
        <h3 id="form-title">Lançamento Financeiro</h3>
        <input type="hidden" id="edit-id">
        <div class="form-grid">
            <div><label>Descrição *</label><input type="text" id="descricao" placeholder="Ex: Venda de Piso"></div>
            <div>
                <label>Tipo *</label>
                <select id="tipo">
                    <option value="receita">Receita (+)</option>
                    <option value="despesa">Despesa (-)</option>
                </select>
            </div>
            <div><label>Valor (R$) *</label><input type="number" id="valor" step="0.01"></div>
            <div><label>Vencimento</label><input type="date" id="data_vencimento"></div>
            <div>
                <label>Entidade (Cliente/Fornecedor)</label>
                <select id="entidade_id"><option value="">Carregando...</option></select>
            </div>
            <div>
                <label>Status</label>
                <select id="status">
                    <option value="pendente">Pendente</option>
                    <option value="pago">Pago / Recebido</option>
                </select>
            </div>
            <div style="grid-column: span 2;"><label>Observações</label><textarea id="observacoes" rows="1"></textarea></div>
        </div>
        <button class="btn-add" onclick="handleSaveFinanceiro()">Salvar Lançamento</button>
        <button id="btn-cancel" class="btn-cancel" onclick="resetForm()" style="display:none;">Cancelar Edição</button>
    </div>

    <div id="bulk-area" class="bulk-actions">
        <span id="selected-count">0 selecionados</span>
        <button onclick="deleteSelected()" style="background:red; color:white; border:none; padding:5px 10px; border-radius:4px; margin-left:15px; cursor:pointer;">
            Excluir Selecionados
        </button>
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th width="30"><input type="checkbox" id="select-all" onclick="toggleAll()"></th>
                    <th>Vencimento</th>
                    <th>Descrição / Entidade</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="financeiro-list"></tbody>
        </table>
    </div>
</div>

<script>
    let dadosFinanceiros = [];

    async function inicializar() {
        if (!window._supabase) {
            setTimeout(inicializar, 500);
            return;
        }
        await loadEntidadesSelect();
        await loadFinanceiro();
    }

    async function loadEntidadesSelect() {
        const { data } = await window._supabase.from('entidades').select('id, nome_completo').order('nome_completo');
        if(data) {
            document.getElementById('entidade_id').innerHTML = '<option value="">Selecione...</option>' + 
                data.map(e => `<option value="${e.id}">${e.nome_completo}</option>`).join('');
        }
    }

    async function loadFinanceiro() {
        const { data, error } = await window._supabase
            .from('financeiro')
            .select('*, entidades(nome_completo)')
            .order('data_vencimento', { ascending: true });

        if (!error) {
            dadosFinanceiros = data || [];
            renderFinanceiro(dadosFinanceiros);
            calcularResumo(dadosFinanceiros);
        }
    }

    function calcularResumo(dados) {
        let rec = 0, pag = 0;
        dados.forEach(d => {
            if (d.tipo === 'receita') rec += d.valor;
            else pag += d.valor;
        });
        document.getElementById('total-receber').innerText = `R$ ${rec.toLocaleString('pt-BR', {minFractionDigits:2})}`;
        document.getElementById('total-pagar').innerText = `R$ ${pag.toLocaleString('pt-BR', {minFractionDigits:2})}`;
        document.getElementById('total-saldo').innerText = `R$ ${(rec - pag).toLocaleString('pt-BR', {minFractionDigits:2})}`;
    }

    function renderFinanceiro(dados) {
        const list = document.getElementById('financeiro-list');
        list.innerHTML = dados.map(d => `
            <tr>
                <td><input type="checkbox" class="row-checkbox" value="${d.id}" onclick="updateBulkUI()"></td>
                <td>${d.data_vencimento ? new Date(d.data_vencimento).toLocaleDateString('pt-BR') : '-'}</td>
                <td><b>${d.descricao}</b><br><small>${d.entidades?.nome_completo || 'Geral'}</small></td>
                <td style="color: ${d.tipo === 'receita' ? '#10b981' : '#ef4444'}; font-weight:bold">
                    ${d.tipo === 'receita' ? '+' : '-'} R$ ${d.valor.toLocaleString('pt-BR', {minFractionDigits:2})}
                </td>
                <td><span class="status-badge ${d.status === 'pago' ? 'status-pago' : 'status-pendente'}">${d.status}</span></td>
                <td>
                    <button class="btn-edit" style="border:none; background:none; color:#3b82f6; cursor:pointer;" onclick="editFinanceiro('${d.id}')"><i class="fas fa-edit"></i></button>
                    <button style="border:none; background:none; color:red; cursor:pointer;" onclick="deleteFinanceiro('${d.id}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('') || '<tr><td colspan="6" style="text-align:center">Sem lançamentos.</td></tr>';
    }

    window.handleSaveFinanceiro = async function() {
        const { data: { user } } = await window._supabase.auth.getUser();
        const id = document.getElementById('edit-id').value;
        const dados = {
            usuario_id: user.id,
            descricao: document.getElementById('descricao').value,
            tipo: document.getElementById('tipo').value,
            valor: parseFloat(document.getElementById('valor').value),
            data_vencimento: document.getElementById('data_vencimento').value || null,
            entidade_id: document.getElementById('entidade_id').value || null,
            status: document.getElementById('status').value,
            observacoes: document.getElementById('observacoes').value
        };

        if(!dados.descricao || !dados.valor) return alert("Preencha descrição e valor!");

        const { error } = id ? 
            await window._supabase.from('financeiro').update(dados).eq('id', id) : 
            await window._supabase.from('financeiro').insert([dados]);

        if(!error) { resetForm(); loadFinanceiro(); } else { alert(error.message); }
    };

    window.editFinanceiro = function(id) {
        const d = dadosFinanceiros.find(i => i.id === id);
        if(!d) return;
        document.getElementById('edit-id').value = d.id;
        document.getElementById('descricao').value = d.descricao;
        document.getElementById('tipo').value = d.tipo;
        document.getElementById('valor').value = d.valor;
        document.getElementById('data_vencimento').value = d.data_vencimento;
        document.getElementById('entidade_id').value = d.entidade_id || '';
        document.getElementById('status').value = d.status;
        document.getElementById('observacoes').value = d.observacoes || '';
        
        document.getElementById('form-title').innerText = "Editando Lançamento";
        document.getElementById('btn-cancel').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.resetForm = function() {
        document.getElementById('edit-id').value = '';
        document.querySelectorAll('input, select, textarea').forEach(i => i.value = '');
        document.getElementById('form-title').innerText = "Lançamento Financeiro";
        document.getElementById('btn-cancel').style.display = 'none';
    };

    window.deleteFinanceiro = async function(id) {
        if(confirm("Excluir lançamento?")) {
            await window._supabase.from('financeiro').delete().eq('id', id);
            loadFinanceiro();
        }
    };

    // Lógica Bulk (Massa)
    window.toggleAll = function() {
        const isChecked = document.getElementById('select-all').checked;
        document.querySelectorAll('.row-checkbox').forEach(cb => cb.checked = isChecked);
        updateBulkUI();
    };

    window.updateBulkUI = function() {
        const selected = document.querySelectorAll('.row-checkbox:checked').length;
        document.getElementById('bulk-area').style.display = selected > 0 ? 'block' : 'none';
        document.getElementById('selected-count').innerText = `${selected} selecionado(s)`;
    };

    window.deleteSelected = async function() {
        if(!confirm("Excluir selecionados?")) return;
        const ids = Array.from(document.querySelectorAll('.row-checkbox:checked')).map(cb => cb.value);
        await window._supabase.from('financeiro').delete().in('id', ids);
        loadFinanceiro();
        updateBulkUI();
    };

    document.addEventListener('DOMContentLoaded', inicializar);
</script>
</body>
</html>
```
# ENTIDADES.HTML
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bloco de Notas - ERP ABP</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="conexao_supabase.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="js/notas.js" defer></script>
</head>
<body>
    <div class="container">
        <div class="card">
            <h2><i class="fas fa-sticky-note"></i> Bloco de Notas</h2>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="search" placeholder="Buscar notas..." onkeyup="filterNotes()">
                <button class="btn btn-primary" onclick="exportAllToPDF()"><i class="fas fa-file-pdf"></i> PDF</button>
            </div>
            
            <input type="text" id="noteTitle" placeholder="Título da nota">
            <textarea id="noteContent" rows="4" placeholder="Escreva sua nota aqui..."></textarea>
            <button class="btn btn-primary" style="width: 100%; margin-top: 10px;" onclick="saveNote()">Salvar Nota</button>
        </div>

        <div id="notesList" class="grid"></div>
    </div>
</body>
</html>
```



