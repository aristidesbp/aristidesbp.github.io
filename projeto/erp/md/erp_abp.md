
# BANCO DE DADOS:
## APAGAR TODO BANCO DE DADOS:
```
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO anon;
GRANT ALL ON SCHEMA public TO authenticated;
GRANT ALL ON SCHEMA public TO service_role;
```
## CRIAR BANCO DE DADOS:

```
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

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

CREATE TABLE public.entidades (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  usuario_id uuid DEFAULT auth.uid(),
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
  status text DEFAULT 'ativo'
    CHECK (status IN ('ativo', 'desativado')),
  acesso text DEFAULT 'cliente'
    CHECK (acesso IN ('master', 'funcionario', 'comprador', 'cliente')),
  senha_acesso text,
  relacionamento text DEFAULT 'cliente'
    CHECK (relacionamento IN ('cliente', 'funcionario', 'fornecedor', 'terceirizado', 'outros')),
  arquivos_url jsonb DEFAULT '[]'::jsonb,
  observacoes text,
  avaliacao integer DEFAULT 5
    CHECK (avaliacao BETWEEN 0 AND 10),
  permissoes jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone
    DEFAULT timezone('utc', now()),
  CONSTRAINT entidades_pkey PRIMARY KEY (id),
  CONSTRAINT entidades_usuario_id_fkey
    FOREIGN KEY (usuario_id)
    REFERENCES auth.users(id)
);

CREATE TABLE public.produtos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  usuario_id uuid,
  nome text NOT NULL,
  sku text,
  categoria_prod text,
  preco_custo numeric,
  preco_venda numeric,
  estoque_atual integer DEFAULT 0,
  estoque_minimo integer DEFAULT 0,
  marca text,
  descricao text,
  entidade_id bigint,
  codigo_de_barras text,
  data_vencimento date,
  imagem_url text,
  data_compra date,
  numero_nota text,
  CONSTRAINT produtos_pkey PRIMARY KEY (id),
  CONSTRAINT produtos_entidade_id_fkey FOREIGN KEY (entidade_id) REFERENCES public.entidades(id),
  CONSTRAINT produtos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES auth.users(id)
);


CREATE TABLE public.controle_caixa (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  usuario_id uuid,
  data_abertura timestamp with time zone DEFAULT now(),
  data_fechamento timestamp with time zone,
  valor_inicial numeric DEFAULT 0,
  valor_final numeric,
  status text DEFAULT 'Aberto'::text,
  total_sistema_dinheiro numeric DEFAULT 0,
  total_sistema_pix numeric DEFAULT 0,
  total_sistema_cartao numeric DEFAULT 0,
  CONSTRAINT controle_caixa_pkey PRIMARY KEY (id),
  CONSTRAINT controle_caixa_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES auth.users(id)
);


CREATE TABLE public.financeiro (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  usuario_id uuid,
  tipo text NOT NULL CHECK (tipo = ANY (ARRAY['pagar'::text, 'receber'::text])),
  descricao text NOT NULL,
  valor numeric NOT NULL DEFAULT 0.00,
  data_vencimento date NOT NULL DEFAULT CURRENT_DATE,
  data_pagamento date,
  status text DEFAULT 'pendente'::text CHECK (status = ANY (ARRAY['pendente'::text, 'pago'::text])),
  entidade_id bigint,
  categoria text,
  forma_pagamento text,
  observacoes text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT financeiro_pkey PRIMARY KEY (id),
  CONSTRAINT financeiro_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES auth.users(id),
  CONSTRAINT financeiro_entidade_id_fkey FOREIGN KEY (entidade_id) REFERENCES public.entidades(id)
);


CREATE TABLE public.tarefas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  content text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT notes_pkey PRIMARY KEY (id),
  CONSTRAINT notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);


CREATE TABLE public.produtos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  usuario_id uuid,
  nome text NOT NULL,
  sku text,
  categoria_prod text,
  preco_custo numeric,
  preco_venda numeric,
  estoque_atual integer DEFAULT 0,
  estoque_minimo integer DEFAULT 0,
  marca text,
  descricao text,
  entidade_id bigint,
  codigo_de_barras text,
  data_vencimento date,
  imagem_url text,
  data_compra date,
  numero_nota text,
  CONSTRAINT produtos_pkey PRIMARY KEY (id),
  CONSTRAINT produtos_entidade_id_fkey FOREIGN KEY (entidade_id) REFERENCES public.entidades(id),
  CONSTRAINT produtos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES auth.users(id)
);

CREATE TABLE public.vendas_itens (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  venda_id uuid,
  produto_id uuid,
  quantidade integer,
  preco_unitario numeric,
  total_item numeric,
  CONSTRAINT vendas_itens_pkey PRIMARY KEY (id),
  CONSTRAINT vendas_itens_venda_id_fkey FOREIGN KEY (venda_id) REFERENCES public.vendas(id),
  CONSTRAINT vendas_itens_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produtos(id)
);

CREATE TABLE public.vendas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  usuario_id uuid,
  entidade_id bigint,
  total_bruto numeric,
  desconto numeric DEFAULT 0,
  total_liquido numeric,
  forma_pagto text,
  status text DEFAULT 'Finalizada'::text,
  caixa_id uuid,
  CONSTRAINT vendas_pkey PRIMARY KEY (id),
  CONSTRAINT vendas_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES auth.users(id),
  CONSTRAINT vendas_entidade_id_fkey FOREIGN KEY (entidade_id) REFERENCES public.entidades(id),
  CONSTRAINT vendas_caixa_id_fkey FOREIGN KEY (caixa_id) REFERENCES public.controle_caixa(id)
);

```






# conexao.js

```
/** ############################################################################## */
/** ERP ABP - GUARD GLOBAL (Versão Final Corrigida - Responsiva)
 * Segurança + SDK Auto-load + Navbar + Controle de Sessão */

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
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error("Falha ao carregar SDK do Supabase"));
            document.head.appendChild(script);
        });
    }

    try {
        await carregarSDK();
        if (!window._supabase) {
            window._supabase = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
        }

        async function validarSessao() {
            try {
                const { data, error } = await _supabase.auth.getSession();
                if (error || !data || !data.session) throw new Error();
                return data.session;
            } catch (e) {
                window.location.replace(CONFIG.LOGIN_PAGE);
                return null;
            }
        }

        async function logout() {
            if (!confirm("Deseja realmente sair do sistema?")) return;
            try { await _supabase.auth.signOut(); } finally { window.location.replace(CONFIG.LOGIN_PAGE); }
        }

        function renderNavbar() {
            if (document.querySelector(".erp-navbar")) return;
            const style = `
                <style>
                    /* Reset básico para a Navbar */
                    .erp-navbar, .erp-navbar * { box-sizing: border-box; }

                    .erp-navbar { 
                        position: fixed; top: 0; left: 0; width: 100%; 
                        background: #fff; padding: 10px 15px; 
                        display: flex; justify-content: space-between; align-items: center; 
                        box-shadow: 0 2px 10px rgba(0,0,0,.1); z-index: 9999; 
                        font-family: sans-serif; 
                    }
                    .erp-navbar .brand { 
                        font-weight: bold; color: #0f172a; font-size: 1.1rem; 
                        display: flex; align-items: center; gap: 5px; 
                        white-space: nowrap;
                    }
                    .erp-navbar .nav-right { display: flex; gap: 8px; flex-wrap: nowrap; }
                    
                    .erp-navbar .btn { 
                        padding: 6px 10px; border-radius: 6px; font-weight: bold; font-size: 12px; border: none; 
                        cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; 
                        gap: 5px; transition: 0.3s; white-space: nowrap; color: white;
                    }
                    .erp-navbar .btn-logout { background: #ef4444; }
                    .erp-navbar .btn-home { background: #3ecf8e; }
                    
                    /* Ajustes para Celular */
                    @media (max-width: 600px) {
                        .erp-navbar { padding: 8px 10px; }
                        .erp-navbar .brand { font-size: 0.9rem; }
                        .erp-navbar .btn span { display: none; } /* Esconde o texto, deixa só o ícone no celular se ficar apertado */
                        .erp-navbar .btn { padding: 8px 12px; font-size: 14px; }
                    }

                    body.erp-guard-active { padding-top: 70px !important; }
                </style>`;

            const html = `
                <div class="erp-navbar">
                    <div class="brand"><span style="color: #3ecf8e;">●</span> ${CONFIG.APP_NAME}</div>
                    <div class="nav-right">
                        <a href="${CONFIG.HUB_PAGE}" class="btn btn-home"><i class="fas fa-external-link-alt"></i> <span>Projetos</span></a>
                        <a href="${CONFIG.HOME_PAGE}" class="btn btn-home"><i class="fas fa-home"></i> <span>Início</span></a>
                        <button class="btn btn-logout" id="btnSair"><i class="fas fa-sign-out-alt"></i> <span>Sair</span></button>
                    </div>
                </div>`;

            document.head.insertAdjacentHTML("beforeend", style);
            document.body.insertAdjacentHTML("afterbegin", html);
            document.body.classList.add("erp-guard-active");
            document.getElementById("btnSair")?.addEventListener("click", logout);
        }

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", async () => {
                const session = await validarSessao();
                if (session) renderNavbar();
            });
        } else {
            const session = await validarSessao();
            if (session) renderNavbar();
        }

    } catch (err) {
        console.error("Erro crítico no Guard:", err);
    }
})();
```

