# banco de dados 
```

-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.entidades (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  nome_completo text NOT NULL,
  cpf text,
  data_nascimento date,
  genero text,
  estado_civil text,
  tipo_entidade text,
  status_entidade text,
  tipo_acesso text,
  email text,
  telefone text,
  senha_acesso text,
  cep text,
  logradouro text,
  numero text,
  bairro text,
  cidade text,
  estado text,
  avaliacao integer DEFAULT 5,
  observacoes text,
  arquivos_url ARRAY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT entidades_pkey PRIMARY KEY (id),
  CONSTRAINT entidades_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.financeiro (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  entidade_id uuid,
  tipo text CHECK (tipo = ANY (ARRAY['Pagar'::text, 'Receber'::text, 'pagar'::text, 'receber'::text])),
  descricao text NOT NULL,
  categoria text,
  forma_pagamento text,
  data_vencimento date,
  data_pagamento date,
  valor numeric DEFAULT 0,
  status text CHECK (status = ANY (ARRAY['Pendente'::text, 'Pago'::text, 'pendente'::text, 'pago'::text])),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT financeiro_pkey PRIMARY KEY (id),
  CONSTRAINT financeiro_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT financeiro_entidade_id_fkey FOREIGN KEY (entidade_id) REFERENCES public.entidades(id)
);
CREATE TABLE public.notes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  title text NOT NULL,
  content text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT notes_pkey PRIMARY KEY (id),
  CONSTRAINT notes_user_id_fkey1 FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.pedidos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  cliente_nome text,
  total numeric,
  status text DEFAULT 'pendente'::text,
  itens jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT pedidos_pkey PRIMARY KEY (id)
);
CREATE TABLE public.produtos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  nome text NOT NULL,
  codigo_de_barras text,
  marca text,
  sku text,
  categoria_prod text,
  entidade_id uuid,
  descricao text,
  data_vencimento date,
  preco_custo numeric DEFAULT 0,
  preco_venda numeric DEFAULT 0,
  estoque_atual integer DEFAULT 0,
  estoque_minimo integer DEFAULT 5,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  data_compra date,
  imagem_url text,
  CONSTRAINT produtos_pkey PRIMARY KEY (id),
  CONSTRAINT produtos_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT produtos_entidade_id_fkey FOREIGN KEY (entidade_id) REFERENCES public.entidades(id)
);
CREATE TABLE public.tarefas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  title text NOT NULL,
  content text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  entidade text,
  tarefa_descricao text,
  status text DEFAULT 'pendente'::text,
  observacao text,
  CONSTRAINT tarefas_pkey PRIMARY KEY (id),
  CONSTRAINT notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.venda_itens (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  venda_id uuid,
  produto_id uuid,
  quantidade integer NOT NULL,
  preco_unitario numeric NOT NULL,
  CONSTRAINT venda_itens_pkey PRIMARY KEY (id),
  CONSTRAINT venda_itens_venda_id_fkey FOREIGN KEY (venda_id) REFERENCES public.vendas(id),
  CONSTRAINT venda_itens_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produtos(id)
);
CREATE TABLE public.vendas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  entidade_id uuid,
  total_venda numeric NOT NULL,
  metodo_pagamento text,
  data_venda timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT vendas_pkey PRIMARY KEY (id),
  CONSTRAINT vendas_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT vendas_entidade_id_fkey FOREIGN KEY (entidade_id) REFERENCES public.entidades(id)
);
```