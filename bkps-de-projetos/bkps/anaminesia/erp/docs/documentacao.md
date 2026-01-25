
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# ORDEM CRONOLÓGICA DO PROJETO APB.
## Criar paginas html:
* Criar páginas HTML completas;
* Os formulários devem alimentar variáveis;
* Utilizar variáveis de arquivos externos do crud.js;
* Invocar o arquivo  conexao_supabe_navbar.js;
* O index.html será utilizado como menu (card_links_paginas);

# CRIAR BANCO DE DADOS E TABELAS:
* criar tabelas individuais (otimizar com chave estrangeira);
* Usar localStorag (Brawser), indexedb, para armazenar dados;
* crud_supabase.js  manda dados tratados do Brawser para supabase; 
* sincronizar_dbs.js (compara os dois brancos e cadastro que não for repetido);

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
# NAVBAR

```
// Funções de Autenticação e Segurança
async function validarAcesso() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session) window.location.href = 'login.html';
}

async function sairDaConta() {
    if(confirm("Sair?")) {
        await _supabase.auth.signOut();
        window.location.href = 'login.html';
    }
}






/** ##### NAVBAR COMPONENTE - ERP ABP ####### */
(function() {
const styles = `


<style>
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: white;
            padding: 15px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
        }

        .nav-buttons {
            display: flex;
            gap: 15px;
        }

        .btn-nav {
            background: #ef4444;
            color: white;
            padding: 8px 15px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 14px;
            border: none;
            cursor: pointer;
            transition: 0.3s;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-nav:hover {
            background: #dc2626;
            transform: scale(1.05);
        }

        .btn-home {
            background: #3ecf8e !important; /* Verde padrão do seu ERP */
        }

        /* Ajuste para o conteúdo não ficar embaixo da navbar fixa */
        body {
            padding-top: 80px;
        }
    </style>



`; const navbarHtml = `


<div class="navbar">
        <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
            <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
        </div>
        <div class="nav-buttons">
            <a href="adm.html" class="btn-nav btn-home"><i class="fas fa-home"></i> Início</a>
            <button class="btn-nav" onclick="sairDaConta()">
                <i class="fas fa-sign-out-alt"></i> Sair
            </button>
        </div>
    </div>`;



//  Inserir no início do Body
document.head.insertAdjacentHTML('beforeend', styles);
document.body.insertAdjacentHTML('afterbegin', navbarHtml);
})();



/** Função global para Deslogar do supabase */
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


```
 # segurança reforçada 
 ```
/**
 * =======================================================
 *  ERP ABP - GUARD GLOBAL
 *  Segurança + Navbar + Controle de Sessão
 *  Arquivo ÚNICO | Reutilizável | Defensivo
 * =======================================================
 */

(() => {
    "use strict";

    // Evita execução duplicada
    if (window.__ERP_GUARD_LOADED__) return;
    window.__ERP_GUARD_LOADED__ = true;

    // ---------------------------------------------------
    // VERIFICA SUPABASE
    // ---------------------------------------------------
    if (typeof window._supabase === "undefined") {
        console.error("Supabase não encontrado.");
        window.location.replace("login.html");
        return;
    }

    // ---------------------------------------------------
    // CONFIGURAÇÃO CENTRAL
    // ---------------------------------------------------
    const CONFIG = Object.freeze({
        LOGIN_PAGE: "login.html",
        HOME_PAGE: "adm.html",
        APP_NAME: "ERP ABP"
    });

    // ---------------------------------------------------
    // VALIDA SESSÃO
    // ---------------------------------------------------
    async function validarSessao() {
        try {
            const { data, error } = await _supabase.auth.getSession();
            if (error || !data || !data.session) {
                throw new Error("Sessão inválida");
            }
            return data.session;
        } catch (e) {
            window.location.replace(CONFIG.LOGIN_PAGE);
            return null;
        }
    }

    // ---------------------------------------------------
    // LOGOUT
    // ---------------------------------------------------
    async function logout() {
        if (!confirm("Deseja sair do sistema?")) return;

        try {
            await _supabase.auth.signOut();
        } catch (_) {
            // Falha silenciosa proposital
        } finally {
            window.location.replace(CONFIG.LOGIN_PAGE);
        }
    }

    // ---------------------------------------------------
    // NAVBAR
    // ---------------------------------------------------
    function renderNavbar() {
        if (document.querySelector(".erp-navbar")) return;

        const style = `
            <style>
                .erp-navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    background: #fff;
                    padding: 15px 25px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 2px 10px rgba(0,0,0,.1);
                    z-index: 9999;
                }
                .erp-navbar .btn {
                    background: #ef4444;
                    color: #fff;
                    border: none;
                    padding: 8px 14px;
                    border-radius: 6px;
                    font-weight: bold;
                    cursor: pointer;
                }
                .erp-navbar .home {
                    background: #3ecf8e;
                }
                body.erp-guard {
                    padding-top: 80px;
                }
            </style>
        `;

        const html = `
            <div class="erp-navbar">
                <strong>${CONFIG.APP_NAME}</strong>
                <div>
                    <a href="${CONFIG.HOME_PAGE}" class="btn home">Início</a>
                    <button class="btn" id="erpLogout">Sair</button>
                </div>
            </div>
        `;

        document.head.insertAdjacentHTML("beforeend", style);
        document.body.insertAdjacentHTML("afterbegin", html);
        document.body.classList.add("erp-guard");

        document
            .getElementById("erpLogout")
            ?.addEventListener("click", logout);
    }

    // ---------------------------------------------------
    // INICIALIZAÇÃO
    // ---------------------------------------------------
    document.addEventListener("DOMContentLoaded", async () => {
        const session = await validarSessao();
        if (!session) return;
        renderNavbar();
    });

})();

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  
# 01
# CRIANDO BANCO DE DADOS NO SUPABASE
https://supabase.com
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥  


## CRIANDO TABELA USUARIOS VIA SQL
```
create table public.usuarios (
  id bigint generated by default as identity not null,
  created_at timestamp with time zone not null default now(),
  user_id uuid null,
  nome_completo text null,
  bio text null,
  avatar_url text null,
  constraint usuarios_pkey primary key (id),
  constraint usuarios_user_id_fkey foreign KEY (user_id) references auth.users (id)
) TABLESPACE pg_default;
```

## FUNCTION TRIGGER
``` 
-- 1. Criar a função que insere os dados na tabela public.usuarios
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.usuarios (user_id, nome_completo, avatar_url)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', -- Tenta pegar o nome dos metadados (ex: Google Login)
    new.raw_user_meta_data->>'avatar_url' -- Tenta pegar a foto dos metadados
  );
  return new;
end;
$$;

-- 2. Criar o gatilho (trigger) que dispara após um novo registro em auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

```

# CRIAR APOLICE 
```
-- Cria a política que permite ao usuário gerenciar apenas os seus fornecedores
CREATE POLICY "Acesso total aos próprios fornecedores" 
ON public.fornecedores 
FOR ALL 
USING (auth.uid() = usuario_id);
```

# POPULAR TABELA USUARIOS

```
insert into public.usuarios (nome_completo, bio, avatar_url) values
('João da Silva', 'Usuário padrão do sistema', null),
('Maria Oliveira', 'Perfil de testes internos', null),
('Carlos Pereira', 'Cliente cadastrado manualmente', null),
('Ana Souza', 'Usuária ativa da plataforma', null),
('Lucas Fernandes', 'Conta criada para homologação', null),
('Juliana Costa', 'Usuária administrativa', null),
('Rafael Martins', 'Perfil comercial', null),
('Patrícia Almeida', 'Usuária visitante', null),
('Bruno Rocha', 'Conta de demonstração', null),
('Fernanda Lima', 'Usuária comum do sistema', null);
```

# CRIANDO UMA VISUALIZAÇÃO COM VIEWS

## PROMPT PARA CRIAR VIEWS:
```
Crie uma view chamada "v_sevicos_destaque" que liste os serviços com o nome
da categoria e detalhes do autor que esta na tabela de usuarios. Alem disso, 
caucule a media das notas (use ) se nao houver) e o total de avaliçoes recebidas por cada serviço.
Conforme o schema do banco de dados que vou te passar abaixo:

Obs: Ja acrescente with (security_invoker) logo depois do nome da view, para criar uma segurança.

[cole aqui o schema fica em: menu lateral/ Database/ no canto superior direi opção Copy as SQL]
```

# CRIAR TABELAS PROJETO ERP
```
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.clientes (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  usuario_id uuid,
  nome_completo text NOT NULL,
  cpf text,
  data_nascimento date,
  email text,
  telefone text,
  rg text,
  cep text,
  logradouro text,
  numero text,
  bairro text,
  cidade text,
  estado text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT clientes_pkey PRIMARY KEY (id),
  CONSTRAINT clientes_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES auth.users(id)
);
CREATE TABLE public.fornecedores (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  usuario_id uuid,
  razao_social text NOT NULL,
  nome_fantasia text,
  cnpj text,
  inscricao_estadual text,
  email text,
  telefone text,
  cep text,
  logradouro text,
  numero text,
  bairro text,
  cidade text,
  estado text,
  CONSTRAINT fornecedores_pkey PRIMARY KEY (id),
  CONSTRAINT fornecedores_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES auth.users(id)
);
CREATE TABLE public.notes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  content text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT notes_pkey PRIMARY KEY (id),
  CONSTRAINT notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.usuarios (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid NOT NULL UNIQUE,
  email text NOT NULL UNIQUE,
  nivel_acesso text DEFAULT 'cliente'::text CHECK (nivel_acesso = ANY (ARRAY['master'::text, 'funcionario'::text, 'cliente'::text, 'fornecedor'::text])),
  status text DEFAULT 'ativo'::text CHECK (status = ANY (ARRAY['ativo'::text, 'inativo'::text])),
  CONSTRAINT usuarios_pkey PRIMARY KEY (id),
  CONSTRAINT usuarios_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
```



# INDEX
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>SISTEMA ERP ABP - Inicio</title>

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- CONEXAO -->
    <script>
// Configurações do Supabase

const SUPABASE_URL = 'SUA_URL_AQUI';
const SUPABASE_KEY = 'SUA_CHAVE_ANON_AQUI';

// Inicializa o cliente globalmente
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Bloqueia o acesso se não estiver logado
 */
async function validarAcesso() {
    const { data: { session } } = await _supabase.auth.getSession();

    if (!session) {
        // Verifica se a página está na raiz ou em subpasta para ajustar o caminho do login
        const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : '';
        window.location.href = pathPrefix + 'login.html';
    }
    return session;
}

// Executa automaticamente ao carregar o script
validarAcesso();

   </script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

   <style>
   /* Remove inconsistências de box model */
* {
    box-sizing: border-box;
}

/* Estilo base do corpo da página */
body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background: #f1f5f9;
    padding-top: 80px;
}

/* Container central do conteúdo */
.content {
    max-width: 1100px;
    margin: auto;
    padding: 20px;
}

/* Grade responsiva dos cards */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

/* Estilo dos cards clicáveis */
.card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    text-decoration: none;
    color: #334155;
    text-align: center;
    border: 1px solid #e2e8f0;
    transition: 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* Efeito visual ao passar o mouse */
.card:hover {
    transform: translateY(-5px);
    border-color: #3ecf8e;
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

/* Ícones dos cards */
.card i {
    font-size: 45px;
    color: #3ecf8e;
    margin-bottom: 15px;
}

/* Título dos cards */
.card h3 {
    margin: 10px 0;
}

/* Texto auxiliar dos cards */
.card p {
    font-size: 0.9em;
    color: #64748b;
}
   </style>
</head>
<body>

    <div class="content">
        
        <div class="grid">

            <a href="bloco_de_notas.html" class="card">
                <i class="fas fa-sticky-note"></i>
                <h3>Bloco de Notas</h3>
                <p>Anote e organize suas ideias na nuvem.</p>
            </a>

            <a href="clientes.html" class="card">
                <i class="fas fa-users"></i>
                <h3>Gestão de Clientes</h3>
                <p>Cadastro e gerenciamento completo de clientes.</p>
            </a>

            <a href="fornecedores.html" class="card">
                <i class="fas fa-users"></i>
                <h3>fornecedores</h3>
                <p>Gerencie dados e contatos dos fornecedores</p>
            </a>


            <a href="financeiro.html" class="card">
                <i class="fas fa-sticky-note"></i>
                <h3>Financeiro</h3>
                <p>Contas a pagar/receber/relatorios</p>
            </a>
            

        </div>
        
    </div>

<script src="js/navbar.js"></script>

<script>
// URL do projeto Supabase
const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';

// Chave pública (publishable) para uso no frontend
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';

// Cria o cliente Supabase
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Função responsável por verificar se o usuário está autenticado
async function checkUser() {
    // Obtém a sessão atual
    const { data: { session } } = await _supabase.auth.getSession();

    // Se não existir sessão, redireciona para o login
    if (!session) {
        window.location.href = 'login.html';
    }
}

// Executa a verificação após o carregamento da página
document.addEventListener('DOMContentLoaded', () => {
    checkUser();
});

</script>

</body>
</html>
```
# LOGIN
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <!-- Codificação de caracteres -->
    <meta charset="UTF-8">

    <!-- Responsividade para dispositivos móveis -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Título da aba -->
    <title>Login - SISTEMA ERP ABP</title>

    <!-- SDK do Supabase (frontend) -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

    <!-- CSS específico da tela de login -->
    <style>
    /* Variáveis globais de cores */
:root {
    --primary: #3ecf8e;
    --dark: #1e293b;
    --bg: #0f172a;
}

/* Estilo base da página */
body {
    font-family: 'Segoe UI', sans-serif;
    background-color: var(--bg);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

/* Card central de login */
.login-card {
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    width: 100%;
    max-width: 400px;
    text-align: center;
}

/* Título principal */
h1 {
    color: var(--dark);
    margin-bottom: 5px;
    font-size: 24px;
}

/* Subtítulo */
h2 {
    color: #64748b;
    margin-bottom: 25px;
    font-size: 16px;
    font-weight: normal;
}

/* Container dos inputs */
.input-container {
    position: relative;
    margin-bottom: 15px;
}

/* Campos de entrada */
input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 16px;
}

/* Botão para mostrar/ocultar senha */
.toggle-password {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    background: none;
    border: none;
    font-size: 18px;
    color: #666;
}

/* Botão principal */
button.main-btn {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 6px;
    background-color: var(--primary);
    color: white;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
}

/* Hover do botão */
button.main-btn:hover {
    background-color: #34b27b;
}

/* Links extras */
.extra-links {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 14px;
}

/* Estilo dos links */
.link {
    color: #4a90e2;
    text-decoration: none;
    cursor: pointer;
    font-weight: 500;
}

/* Botão de voltar */
.btn-back {
    background: #e2e8f0;
    color: #475569;
    padding: 8px 12px;
    border-radius: 6px;
    border: none;
    margin-bottom: 20px;
    cursor: pointer;
    display: none;
}
    </style>
</head>
<body>

    <!-- Card central de autenticação -->
    <div class="login-card">

        <!-- Botão de retorno (usado em recuperação/cadastro) -->
        <button id="btn-back" class="btn-back" onclick="toggleMode()">
            ← Voltar para o Login
        </button>

        <!-- Título principal -->
        <h1>SISTEMA ERP ABP</h1>

        <!-- Subtítulo dinâmico -->
        <h2 id="form-subtitle">Faça login para acessar o ERP</h2>

        <!-- Campo de e-mail -->
        <div class="input-container" id="email-group">
            <input type="email" id="email" placeholder="Seu e-mail">
        </div>

        <!-- Campo de senha -->
        <div class="input-container" id="pass-group">
            <input type="password" id="password" placeholder="Sua senha">

            <!-- Botão para alternar visibilidade da senha -->
            <button type="button" class="toggle-password" onclick="toggleVisibility()">
                👁️
            </button>
        </div>

        <!-- Botão principal (login / cadastro / salvar senha) -->
        <button class="main-btn" id="btn-auth" onclick="handleAuth()">
            Entrar
        </button>

        <!-- Links auxiliares -->
        <div class="extra-links">
            <span id="link-forgot" class="link" onclick="forgotPassword()">
                Esqueci minha senha
            </span>

    <h3>DESENVOLVEDOR: ARISTIDES BP</h3>
    <h3>CONTATO: +55 91 99242-0981</h3>
            
        </div>
    </div>

    
    
    <!-- Script principal do login -->
    <script>

const SUPABASE_URL = 'SUA_URL_AQUI';
const SUPABASE_KEY = 'SUA_CHAVE_ANON_AQUI';

// Criação do cliente Supabase
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Alterna a visibilidade da senha
 */
function toggleVisibility() {
    const passInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');

    passInput.type = passInput.type === 'password' ? 'text' : 'password';
    toggleBtn.innerText = passInput.type === 'password' ? '👁️' : '🙈';
}

/**
 * Apenas Login
 */
async function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { error } = await _supabase.auth.signInWithPassword({ email, password });

    if (error) alert("Erro: " + error.message);
    else window.location.href = 'index.html';
}

/**
 * Envio de e-mail para recuperação de senha
 */
async function forgotPassword() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite seu e-mail.");

    const { error } = await _supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.href
    });

    if (error) alert(error.message);
    else alert("Link de recuperação enviado!");
}

/**
 * Detecta se o usuário chegou por link de recuperação
 */
async function checkRecovery() {
    const hash = window.location.hash;

    if (hash && (hash.includes("type=recovery") || hash.includes("access_token="))) {
        document.getElementById('form-subtitle').innerText = "🔑 Defina sua nova senha";
        document.getElementById('email-group').style.display = 'none';
        document.getElementById('btn-auth').innerText = "Salvar Nova Senha";
        document.getElementById('btn-auth').onclick = updatePassword;
        document.getElementById('link-forgot').style.display = 'none';
    }
}

/**
 * Atualiza a senha do usuário
 */
async function updatePassword() {
    const newPassword = document.getElementById('password').value;

    if (newPassword.length < 6) {
        return alert("Mínimo 6 caracteres.");
    }

    const { error } = await _supabase.auth.updateUser({ password: newPassword });

    if (error) alert(error.message);
    else {
        alert("Senha atualizada!");
        window.location.hash = "";
        window.location.reload();
    }
}

// Executa verificação de recuperação ao carregar a página
window.onload = checkRecovery;
    </script>

</body>
</html>

```
# BLOCO_DE_NOTAS
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Bloco de Notas - ERP ABP</title>

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<!-- CONEXAO -->
    <script>
// Configurações do Supabase

const SUPABASE_URL = 'SUA_URL_AQUI';
const SUPABASE_KEY = 'SUA_CHAVE_ANON_AQUI';

// Inicializa o cliente globalmente
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Bloqueia o acesso se não estiver logado
 */
async function validarAcesso() {
    const { data: { session } } = await _supabase.auth.getSession();

    if (!session) {
        // Verifica se a página está na raiz ou em subpasta para ajustar o caminho do login
        const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : '';
        window.location.href = pathPrefix + 'login.html';
    }
    return session;
}

// Executa automaticamente ao carregar o script
validarAcesso();

   </script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

    <link rel="stylesheet" href="css/bloco_de_notas.css">
    <style>
/* Variáveis globais */
:root {
    --primary: #3ecf8e;
    --dark: #0f172a;
}

/* Reset básico */
* {
    box-sizing: border-box;
}

/* Estilo base da página */
body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background: #f1f5f9;
    padding-top: 90px;
}

/* Container do bloco de notas */
.container {
    max-width: 700px;
    margin: auto;
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

/* Inputs e textarea */
textarea,
input {
    width: 100%;
    margin-bottom: 15px;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
}

/* Botão de salvar/atualizar */
.btn-save {
    background: var(--primary);
    color: white;
    padding: 15px;
    border: none;
    cursor: pointer;
    width: 100%;
    font-weight: bold;
    border-radius: 8px;
    font-size: 16px;
    transition: 0.3s;
}

.btn-save:hover {
    filter: brightness(1.1);
}

/* Nota individual */
.note {
    border-bottom: 1px solid #f1f1f1;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

/* Conteúdo da nota */
.note-content strong {
    color: #1e293b;
    font-size: 1.1em;
    display: block;
    margin-bottom: 5px;
}

.note-content p {
    color: #64748b;
    margin: 0;
    line-height: 1.5;
    white-space: pre-wrap;
}

/* Ações da nota */
.actions {
    display: flex;
    gap: 8px;
}

.actions button {
    padding: 8px 12px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 14px;
}

/* Área de busca e exportação */
.search-box {
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 20px;
}

/* Botão de exportação */
.export-btn {
    width: 100%;
    background: #2c3e50;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 10px;
    font-weight: bold;
}
    </style>
</head>
<body>

    <div class="container">

        <h2>Minhas Notas</h2>

        <input type="hidden" id="note-id">

        <input type="text" id="title" placeholder="Título da nota...">

        <textarea id="content" rows="4" placeholder="Escreva algo importante..."></textarea>

        <button class="btn-save" id="btn-save" onclick="saveNote()">
            Salvar Nota
        </button>

        <div class="search-box">
            <label>PESQUISAR OU EXPORTAR</label>

            <input
                type="text"
                id="search"
                placeholder="🔍 Digite para buscar..."
                onkeyup="filterNotes()"
            >

            <button class="export-btn" onclick="exportAllToPDF()">
                <i class="fas fa-file-pdf"></i> Exportar Notas para PDF
            </button>
        </div>

        <div id="notes-list"></div>
    </div>

    <script src="js/navbar.js"></script>

    <script>
/**
 * js/bloco_de_notas.js
 * Depende de: js/conexao.js (que fornece a variável _supabase)
 */

// Armazena todas as notas carregadas localmente para busca rápida
let allNotes = [];

/**
 * Carrega as notas do banco (Iniciado automaticamente ao carregar a página)
 */
async function loadNotes() {
    // Busca todas as notas ordenadas pela data de criação
    const { data: notes, error } = await _supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Erro ao carregar notas:", error.message);
        return;
    }

    allNotes = notes || [];
    renderNotes(allNotes);
}

/**
 * Renderiza as notas na tela (HTML dinâmico)
 */
function renderNotes(notes) {
    document.getElementById('notes-list').innerHTML =
        notes.map(n => `
            <div class="note">
                <div class="note-content">
                    <strong>${n.title}</strong>
                    <p>${n.content}</p>
                </div>
                <div class="actions">
                    <button style="background:#f1c40f"
                        onclick="prepareEdit('${n.id}', \`${n.title}\`, \`${n.content}\`)">
                        <i class="fas fa-edit"></i>
                    </button>

                    <button style="background:#e74c3c"
                        onclick="deleteNote('${n.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('') ||
        '<p style="text-align:center;color:#94a3b8;margin-top:20px;">Nenhuma nota encontrada.</p>';
}

/**
 * Salva ou atualiza uma nota (CRUD - Create/Update)
 */
async function saveNote() {
    const id = document.getElementById('note-id').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (!title || !content) {
        return alert("Preencha título e conteúdo!");
    }

    // Obtém o usuário logado através da conexão ativa
    const { data: { user } } = await _supabase.auth.getUser();

    if (id) {
        // Modo Edição (Update)
        await _supabase.from('notes')
            .update({ title, content })
            .eq('id', id);
    } else {
        // Modo Novo (Insert)
        await _supabase.from('notes')
            .insert([{ title, content, user_id: user.id }]);
    }

    resetForm();
    loadNotes();
}

/**
 * Prepara o formulário para edição (Preenche os campos)
 */
function prepareEdit(id, title, content) {
    document.getElementById('note-id').value = id;
    document.getElementById('title').value = title;
    document.getElementById('content').value = content;
    document.getElementById('btn-save').innerText = "Atualizar Nota";

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Reseta o formulário para o estado original
 */
function resetForm() {
    document.getElementById('note-id').value = '';
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('btn-save').innerText = "Salvar Nota";
}

/**
 * Exclui uma nota do banco (CRUD - Delete)
 */
async function deleteNote(id) {
    if (confirm("Deseja excluir esta nota?")) {
        await _supabase.from('notes').delete().eq('id', id);
        loadNotes();
    }
}

/**
 * Filtra as notas carregadas pelo texto digitado na pesquisa
 */
function filterNotes() {
    const q = document.getElementById('search').value.toLowerCase();

    const filtered = allNotes.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    );

    renderNotes(filtered);
}

/**
 * Exporta todas as notas presentes na lista para um arquivo PDF
 */
async function exportAllToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Meu Bloco de Notas - ERP ABP", 10, 10);

    let y = 20;

    allNotes.forEach((n, i) => {
        doc.setFont(undefined, 'bold');
        doc.text(`${i + 1}. ${n.title}`, 10, y);
        doc.setFont(undefined, 'normal');
        doc.text(n.content, 10, y + 7);
        y += 25;
    });

    doc.save("minhas-notas.pdf");
}

/**
 * Inicializa os dados assim que o documento estiver pronto
 * A trava de segurança já foi executada no conexao.js
 */
document.addEventListener('DOMContentLoaded', loadNotes);



</script>

</body>
</html>

```



# CLIENTES/FORNECEDORES
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clientes - ERP ABP</title>

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
    // Configurações do Supabase
const SUPABASE_URL = 'https://kjhjeaiwjilkgocwvbwi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WP3TF2GTMMWCS1tCYzQSjA_syIKLyIX';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function validarAcesso() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session) {
        const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : '';
        window.location.href = pathPrefix + 'login.html';
    }
    return session;
}
validarAcesso();
    </script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

    <style>
/* Variáveis globais de cores */
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
    padding-top: 85px;
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

input:focus, select:focus, textarea:focus {
    border-color: var(--primary);
    outline: none;
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

.btn-edit { color: #3b82f6; cursor: pointer; font-size: 18px; background: none; border: none; }
.btn-del { color: #ef4444; cursor: pointer; font-size: 18px; background: none; border: none; }

/* NAVBAR FIXA */
.navbar {
    position: fixed; top: 0; left: 0; width: 100%; background: white;
    padding: 15px 25px; display: flex; justify-content: space-between;
    align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000;
}
.btn-nav {
    background: #ef4444; color: white; padding: 8px 15px; border-radius: 6px;
    font-weight: bold; font-size: 14px; border: none; cursor: pointer;
    text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
}
    </style>
</head>
<body>

<div class="navbar">
    <div style="font-weight: bold; color: #0f172a;">ERP ABP</div>
    <div class="nav-buttons">
        <a href="index.html" style="text-decoration: none; color: #64748b; margin-right: 20px; font-weight: bold;">Voltar</a>
        <button class="btn-nav" onclick="sairDaConta()"><i class="fas fa-sign-out-alt"></i> Sair</button>
    </div>
</div>

    <div class="container">
        <div class="card">
            <h3 id="form-title">Novo Cadastro de Usuário / Entidade</h3>
            <input type="hidden" id="edit-id">

            <div class="section-title">Informações Pessoais e Acesso</div>
            <div class="form-grid">
                <div><label>Nome Completo *</label><input type="text" id="nome_completo"></div>
                <div><label>CPF</label><input type="text" id="cpf"></div>
                <div><label>Data Nascimento</label><input type="date" id="data_nascimento"></div>
                <div><label>E-mail</label><input type="email" id="email"></div>
                <div><label>Telefone</label><input type="text" id="telefone"></div>
                <div><label>Senha de Acesso</label><input type="password" id="senha_acesso" placeholder="Senha interna"></div>
                
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
                <div style="grid-column: span 2;"><label>URL de Arquivos (Fotos/Documentos)</label><input type="text" id="arquivos_url" placeholder="Link da foto ou documento"></div>
                <div style="grid-column: span 2;"><label>Observações</label><textarea id="observacoes" rows="2"></textarea></div>
            </div>

            <button class="btn-add" id="btn-save" onclick="handleSave()">Salvar Cadastro</button>
            <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Nome / Relacionamento</th>
                        <th>CPF / Contato</th>
                        <th>Acesso / Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="clients-list"></tbody>
            </table>
        </div>
    </div>

    <script>
async function sairDaConta() {
    if(confirm("Deseja realmente sair?")) {
        await _supabase.auth.signOut();
        window.location.href = 'login.html';
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

async function loadClients() {
    const { data, error } = await _supabase.from('clientes').select('*').order('nome_completo');
    if (error) return;

    const list = document.getElementById('clients-list');
    list.innerHTML = (data || []).map(c => `
        <tr>
            <td><b>${c.nome_completo}</b><br><small>${c.relacionamento.toUpperCase()}</small></td>
            <td>${c.cpf || '-'}<br><small>${c.email || ''}</small></td>
            <td>${c.acesso}<br><small style="color:${c.status === 'ativo' ? 'green' : 'red'}">${c.status}</small></td>
            <td>
                <button class="btn-edit" onclick="editFull('${c.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-del" onclick="deleteClient('${c.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('') || '<tr><td colspan="4" style="text-align:center">Nenhum registro.</td></tr>';
}

async function handleSave() {
    const { data: { user } } = await _supabase.auth.getUser();
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
        // Converte string para array caso tenha algo escrito, ou envia array vazio
        arquivos_url: document.getElementById('arquivos_url').value ? [document.getElementById('arquivos_url').value] : []
    };

    if (!dados.nome_completo) return alert("Nome é obrigatório");

    const { error } = id
        ? await _supabase.from('clientes').update(dados).eq('id', id)
        : await _supabase.from('clientes').insert([dados]);

    if (error) alert("Erro: " + error.message);
    else { resetForm(); loadClients(); }
}

async function editFull(id) {
    const { data, error } = await _supabase.from('clientes').select('*').eq('id', id).single();
    if (error || !data) return;

    Object.keys(data).forEach(k => {
        const el = document.getElementById(k);
        if (el) {
            if (k === 'arquivos_url') el.value = data[k] ? data[k][0] : '';
            else el.value = data[k] || '';
        }
    });

    document.getElementById('edit-id').value = data.id;
    document.getElementById('form-title').innerText = "Editando Registro";
    document.getElementById('btn-save').innerText = "Atualizar Cadastro";
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
    document.getElementById('form-title').innerText = "Novo Cadastro de Usuário / Entidade";
    document.getElementById('btn-save').innerText = "Salvar Cadastro";
    document.getElementById('btn-cancel').style.display = "none";
}

async function deleteClient(id) {
    if (confirm("Excluir definitivamente?")) {
        await _supabase.from('clientes').delete().eq('id', id);
        loadClients();
    }
}

document.addEventListener('DOMContentLoaded', loadClients);
    </script>
</body>
</html>
```