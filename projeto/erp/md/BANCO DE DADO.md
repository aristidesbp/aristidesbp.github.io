
# BANCO DE DADOS:

```
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

```
```

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

```
```
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
  status text DEFAULT 'ativo'::text CHECK (status = ANY (ARRAY['ativo'::text, 'desativado'::text])),
  acesso text DEFAULT 'cliente'::text CHECK (acesso = ANY (ARRAY['master'::text, 'funcionario'::text, 'comprador'::text, 'cliente'::text])),
  senha_acesso text,
  relacionamento text DEFAULT 'cliente'::text CHECK (relacionamento = ANY (ARRAY['cliente'::text, 'funcionario'::text, 'fornecedor'::text, 'terceirizado'::text, 'outros'::text])),
  arquivos_url ARRAY,
  observacoes text,
  avaliacao integer DEFAULT 5 CHECK (avaliacao >= 0 AND avaliacao <= 10),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  permissoes ARRAY,
  CONSTRAINT entidades_pkey PRIMARY KEY (id),
  CONSTRAINT clientes_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES auth.users(id)
);

```
```
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

```
```
CREATE TABLE public.notes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  content text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT notes_pkey PRIMARY KEY (id),
  CONSTRAINT notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

```
```
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

```
```
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
```
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
```
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
```
