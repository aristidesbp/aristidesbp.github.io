# ARISTIDESBP

Profissional focado em desenvolvimento de soluções web modernas, com atenção à organização, clareza de código e experiência do usuário. Atuo desde a concepção da ideia até a implementação, sempre buscando boas práticas, performance e escalabilidade.  | Analista de Sistemas |Desenvolvedor Web Full stack | Trafego Pago |

---
## 📌 CONTATOS
* 📧 **Email:** [aristidesbp@gmail.com](mailto:aristidesbp@gmail.com)
* 📱 **WhatsApp:** +55 (91) 99242-0981
* 🌐 **GitHub:** [ENTRAR](https://github.com/aristidesbp)

---
### ERP ABP 
Acesse a aplicação de gerenciamento integrada ao ecossistema Supabase.
🌐 [Financeiro](https://aristidesbp.github.io/financeiro.html)

---
## 📚 LINKS PARA ESTUDOS
* 🌐 **HTML:** [w3schools.com](https://w3schools.com)
* 🎨 **CSS:** [codecademy.com](https://codecademy.com)
* ⚡ **JavaScript:** [freecodecamp.org](https://freecodecamp.org)
* ⚛️ **React:** [react.dev](https://react.dev)
* 🐍 **Python:** [learnpython.org](https://learnpython.org)
* ☕ **Java:** [sololearn.com](https://sololearn.com)
* 🐘 **PHP:** [php.net](https://php.net)
* 🛡️ **Cybersecurity:** [tryhackme.com](https://tryhackme.com)
* ⚙️ **C:** [learn-c.org](https://learn-c.org)
* 🛠️ **C++:** [learncpp.com](https://learncpp.com)
* ☁️ **AWS:** [skillbuilder.aws](https://skillbuilder.aws)
* 🤖 **IA/ML:** [coursera.org](https://coursera.org)
* 🌿 **Git:** [learngitbranching.js.org](https://learngitbranching.js.org)
* 📊 **SQL:** [sqlbolt.com](https://sqlbolt.com)
* 📊 **SUPABASE:** [https://sqlbolt.com](https://www.youtube.com/watch?v=9Hj4eZE7n00&list=PL4ZwkMMhwaqIem09eRINhc2fjfaM_t2OO))
  



🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# PROJETOS COM O SUPABASE E GITHUB_PAGES (todos os arquivos estao na pasta raiz)
```
# Vamos criar uma  arquitetura full-stack (frontend e backend) para a plataforma
"AristidesBP", um marketplace de serviços comunitário, onde pessoas de
uma mesma comunidade possam oferecer produtos e serviços, com sertor administrativo completo.

* Hospedagem: github-pages
* Banco de dados com o Supabase
* ERP para controle de seu negocio (entidades,produtos,serviços,financeiro,pdv,tarefas).

# PAGINAS:
index.html(Vitrine de Serviços - Pública/Híbrida):
A) Hero Section: Título grande "Encontre profissionais de confiança na sua regiao", 
com uma barra de busca centralizada grande (Input com ícone
de lupa) e filtros rápidos (Pills/Badges) para categorias (Reformas,
Aulas, Culinária).
* Grid de Destaques: Utilize a (View SQL v_servicos_destaque & View SQL v_produtos_destaque) para renderizar
cards.
* Componente do Card: Deve conter a foto do serviço/produto (aspect-ratio 16/9),
foto do prestador (avatar circular pequeno), título, preço estimado e,
obrigatoriamente, a média de estrelas (ícone ⭐ + nota) que vem da View.
Floating Action Button (Mobile): Um botão flutuante para "Anunciar" no
canto inferior direito.

B). Detalhes do Serviço (/servico/:id - Onde :id é Int8):
Layout de Coluna Dupla (Desktop):
* Esquerda: Galeria de fotos do serviço e descrição detalhada.
* Direita (Sticky): Card do perfil do prestador (tabela profiles) com botão
"Chamar no Chat" (CTA Primário) e botão "Favoritar" (ícone de coração
outline/fill).
* Seção de Prova Social: Lista de comentários vindos da tabela avaliacoes,
exibindo nome do vizinho e a nota dada.

C). Dashboard do Usuário (Área Protegida):
* Sidebar ou Menu Superior: Links para "Meus Anúncios", "Favoritos" e
"Mensagens".
* Meus Anúncios: Tabela ou Lista de cards mostrando os serviços que o
usuário cadastrou (tabela servicos), com opções de Editar/Excluir.
* Chat Interno: Interface tipo WhatsApp Web. Lista de conversas à esquerda
e área de chat à direita. Deve ler da tabela mensagens.
Requisitos Arquiteturais e de Dados:
- Conexão Supabase: O projeto DEVE respeitar o schema existente onde os IDs
são numéricos (int8), não UUIDs nas rotas (ex: /servico/42).
- Autenticação: Telas de Login/Registro limpas e centralizadas, usando o
componente Auth do Supabase.
* Componentização:
Use Card, Badge, Avatar, Button e Dialog do Shadcn/UI.
Crie um componente StarRating reutilizável para exibir as notas.
Linguagem: O código-fonte gerado deve usar TypeScript e Tailwind CSS.


```


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

## Criar conta e projeto
* Acesse: https://supabase.com
* Crie uma conta
* Clique em New Project
* 
## Escolha:(exemplo)
* Nome do projeto: erp_abp
* Senha do banco: ***********
* Região: brasil

--- 

## Configurar

* Authentication/URL Configuration & Redirect URLs: coloque a url do seu site (http://aristidesbp.github.io)
* Authentication/Users: voçẽ pode criar um novo usuario.


# SQL DA PRIMEIRA TABELA "entidades" (USUARIO ESPELHO / COMPLETO e FUNCIONANDO)
``` 
-- =========================================================================
-- SCRIPT EXEMPLO DE CRIAÇÃO DE TABELA/FUNCTION/APOLICIE
-- =========================================================================

-- CRIAR TABELA: entidades
-- Depende apenas do esquema 'auth.users' nativo do Supabase.

CREATE TABLE public.entidades (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    user_id uuid NOT NULL, -- Alterado para NOT NULL assumindo que todo espelho precisa de um auth válido
    nome_completo text,
    avatar_url text,
    bio text,
  cpf text,
  data_nascimento date,
  email text,
  telefone text,
  tipo_acesso text DEFAULT 'cliente'::text,
  tipo_entidade text DEFAULT 'cliente'::text,
  status_entidade text DEFAULT 'ativo'::text,
  avaliacao integer DEFAULT 5,
  cep text,
  logradouro text,
  numero text,
  bairro text,
  cidade text,
  estado character varying,

    
    CONSTRAINT entidades_pkey PRIMARY KEY (id),
    CONSTRAINT entidades_user_id_fkey FOREIGN KEY (user_id) 
        REFERENCES auth.users(id) ON DELETE CASCADE
);



-- =========================================================================
-- FUNÇÃO TRIGGER PARA SINCRONIZAÇÃO DE USUÁRIOS (AUTH -> PUBLIC)
-- =========================================================================

-- 1. Criação ou atualização da função que será executada pelo gatilho
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger 
LANGUAGE plpgsql
-- SECURITY DEFINER garante que a função execute com privilégios de superusuário,
-- contornando restrições de permissão do usuário anônimo durante o cadastro.
SECURITY DEFINER
-- Boa prática de segurança: define explicitamente o search_path para evitar ataques de injeção
SET search_path = public
AS $$
BEGIN
    -- Insere o novo usuário na tabela espelho
    -- Os operadores ->> extraem o texto de chaves específicas dentro do JSONB de metadados do Supabase
    INSERT INTO public.entidades (
        user_id, 
        nome_completo, 
        avatar_url, 
        bio
       
    )
    VALUES (
        new.id,
        coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'), -- Tenta ler 'full_name' ou 'name'
        new.raw_user_meta_data->>'avatar_url',
        NULL -- Bio inicia nula para o usuário preencher posteriormente na plataforma
    );

    -- O retorno 'new' é obrigatório em triggers do tipo AFTER INSERT
    RETURN new;
END;
$$;

-- 2. Criação do gatilho (Trigger) associado à tabela auth.users
-- Garante que nenhum gatilho duplicado com o mesmo nome seja criado
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW 
    EXECUTE FUNCTION public.handle_new_user();


-- =========================================================================
-- CONFIGURAÇÃO DE SEGURANÇA (RLS) VIA SQL - TABELA: entidades
-- =========================================================================

-- 1. Garante que o Row Level Security está ativado na tabela
ALTER TABLE public.entidades ENABLE ROW LEVEL SECURITY;

-- 2. Remove a política antiga se ela já existir para evitar conflitos de duplicação
DROP POLICY IF EXISTS "User Propietario" ON public.entidades;

-- 3. Criação da política de acesso estrita
CREATE POLICY "User Propietario" 
ON public.entidades
AS PERMISSIVE
FOR ALL -- Aplica-se a SELECT, INSERT, UPDATE e DELETE
TO authenticated -- Aplica-se apenas a usuários logados no sistema
USING (
    -- Linhas existentes só podem ser lidas/modificadas se o ID do autor for igual ao ID do usuário logado
    user_id = auth.uid()
) 
WITH CHECK (
    -- Novas inserções ou atualizações só são permitidas se o ID gravado for idêntico ao ID do usuário logado
    user_id = auth.uid()
);

``` 


# EXEMPLO DE SQL PARA CRIAR TABELAS 
```
-- =========================================================================
-- SCRIPT DE CRIAÇÃO DE TABELAS E RELACIONAMENTOS (SUPABASE / POSTGRESQL)
-- =========================================================================

--  TABELA: categorias
-- Criada primeiro por não possuir chaves estrangeiras pendentes.
CREATE TABLE public.categorias (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    tipo_de_categoria text NOT NULL,
    
    CONSTRAINT categorias_pkey PRIMARY KEY (id)
);

-- TABELA: entidades (FEITA ANTERIORMENTE)
-- Depende apenas do esquema 'auth.users' nativo do Supabase.


-- TABELA: servicos
-- Depende de 'categorias' e 'entidades'.
-- OBSERVAÇÃO: 'double precision' -> 'numeric(10,2)' para evitar erros de ponto flutuante em valores monetários.
CREATE TABLE public.servicos (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    titulo text NOT NULL,
    descricao text, 
    categoria bigint,
    preco_estimado numeric(10, 2), 
    preco_detalhe text,
    foto_url text,
    criado_por_usuario bigint,
    terceiro boolean DEFAULT false,
    eu_mesmo boolean DEFAULT true,
    whatsapp text, 
    
    CONSTRAINT servicos_pkey PRIMARY KEY (id),
    CONSTRAINT servicos_categoria_fkey FOREIGN KEY (categoria) 
        REFERENCES public.categorias(id) ON DELETE SET NULL,
    CONSTRAINT servicos_criado_por_usuario_fkey FOREIGN KEY (criado_por_usuario) 
        REFERENCES public.entidades(id) ON DELETE CASCADE
);

-- 4. TABELA: favoritos
-- Depende de 'entidades' e 'servicos'.
CREATE TABLE public.favoritos (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    usuario_id bigint NOT NULL,
    servico_id bigint NOT NULL,
    
    CONSTRAINT favoritos_pkey PRIMARY KEY (id),
    CONSTRAINT favoritos_usuario_id_fkey FOREIGN KEY (usuario_id) 
        REFERENCES public.entidades(id) ON DELETE CASCADE,
    CONSTRAINT favoritos_servico_id_fkey FOREIGN KEY (servico_id) 
        REFERENCES public.servicos(id) ON DELETE CASCADE
);

-- 5. TABELA: avaliacoes
-- Depende de 'servicos' e 'entidades'.
-- ADIÇÃO: Constraint CHECK para garantir que a nota fique em um intervalo padrão (1 a 5).
CREATE TABLE public.avaliacoes (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    servico_id bigint NOT NULL,
    author_id bigint NOT NULL, -- Mantido padrão de nomenclatura, corrigido de autor_id para manter consistência caso necessário
    nota smallint NOT NULL,
    comentario text,
    
    CONSTRAINT avaliacoes_pkey PRIMARY KEY (id),
    CONSTRAINT avaliacoes_servico_id_fkey FOREIGN KEY (servico_id) 
        REFERENCES public.servicos(id) ON DELETE CASCADE,
    CONSTRAINT avaliacoes_autor_id_fkey FOREIGN KEY (author_id) 
        REFERENCES public.entidades(id) ON DELETE CASCADE,
    CONSTRAINT avaliacoes_nota_check CHECK (nota >= 1 AND nota <= 5)
);

CREATE TABLE public.financas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  entidade_id bigint, -- ALTERADO DE uuid PARA bigint PARA COMBINAR COM public.entidades(id)
  descricao text NOT NULL,
  valor_total numeric NOT NULL,
  tipo text CHECK (tipo = ANY (ARRAY['receita'::text, 'despesa'::text])),
  num_parcelas integer DEFAULT 1,
  categoria text DEFAULT 'Geral'::text,
  status_lancamento text DEFAULT 'aberto'::text CHECK (status_lancamento = ANY (ARRAY['aberto'::text, 'finalizado'::text, 'cancelado'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  
  CONSTRAINT financas_pkey PRIMARY KEY (id),
  CONSTRAINT financas_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT financas_entidade_id_fkey FOREIGN KEY (entidade_id) REFERENCES public.entidades(id)
);

CREATE TABLE public.parcelas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  financa_id uuid,
  num_parcela integer NOT NULL,
  valor_parcela numeric NOT NULL,
  data_vencimento date NOT NULL,
  data_pagamento date,
  status text DEFAULT 'pendente'::text CHECK (status = ANY (ARRAY['pendente'::text, 'pago'::text, 'atrasado'::text])),
  codigo_barra text,
  boleto_url text,
  comprovante_url text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT parcelas_pkey PRIMARY KEY (id),
  CONSTRAINT parcelas_financa_id_fkey FOREIGN KEY (financa_id) REFERENCES public.financas(id)
);

CREATE TABLE public.produtos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  nome text NOT NULL,
  descricao text,
  codigo_barras text UNIQUE,
  preco_custo numeric DEFAULT 0.00,
  preco_venda numeric NOT NULL,
  quantidade_estoque integer DEFAULT 0,
  estoque_minimo integer DEFAULT 5,
  categoria text DEFAULT 'Geral'::text,
  foto_url text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT produtos_pkey PRIMARY KEY (id),
  CONSTRAINT produtos_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

CREATE TABLE public.movimentacoes_estoque (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  produto_id uuid,
  tipo text CHECK (tipo = ANY (ARRAY['entrada'::text, 'saida'::text])),
  quantidade integer NOT NULL,
  motivo text DEFAULT 'venda'::text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT movimentacoes_estoque_pkey PRIMARY KEY (id),
  CONSTRAINT movimentacoes_estoque_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT movimentacoes_estoque_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produtos(id)
);

CREATE TABLE public.vendas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  entidade_id bigint, -- ALTERADO DE uuid PARA bigint PARA COMBINAR COM public.entidades(id)
  valor_total numeric NOT NULL,
  desconto numeric DEFAULT 0.00,
  forma_pagamento text,
  status text DEFAULT 'concluida'::text CHECK (status = ANY (ARRAY['pendente'::text, 'concluida'::text, 'cancelada'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT vendas_pkey PRIMARY KEY (id),
  CONSTRAINT vendas_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT vendas_entidade_id_fkey FOREIGN KEY (entidade_id) REFERENCES public.entidades(id)
);

CREATE TABLE public.itens_venda (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  venda_id uuid,
  produto_id uuid,
  quantidade integer NOT NULL,
  preco_unitario numeric NOT NULL,
  subtotal numeric NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT itens_venda_pkey PRIMARY KEY (id),
  CONSTRAINT itens_venda_venda_id_fkey FOREIGN KEY (venda_id) REFERENCES public.vendas(id),
  CONSTRAINT itens_venda_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produtos(id)
);
```
# EXEMPLO DE COMO CRIAR AS FUNÇÕES
```
-- =========================================================================
-- 1. TRIGGER: CRIAÇÃO AUTOMÁTICA DE ENTIDADE (AUTH -> PUBLIC.ENTIDADES)
-- =========================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.entidades (user_id, nome_completo, avatar_url, bio)
    VALUES (
        new.id,
        coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
        new.raw_user_meta_data->>'avatar_url',
        NULL
    );
    RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW 
    EXECUTE FUNCTION public.handle_new_user();


-- =========================================================================
-- 2. TRIGGER: BAIXA DE ESTOQUE E HISTÓRICO (ITENS_VENDA -> PRODUTOS/MOVIMENTAÇÕES)
-- =========================================================================

CREATE OR REPLACE FUNCTION public.handle_item_venda_inserido()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id uuid;
BEGIN
    -- 1. Reduz a quantidade do produto no estoque
    UPDATE public.produtos
    SET quantidade_estoque = quantidade_estoque - NEW.quantidade
    WHERE id = NEW.produto_id;

    -- Extrai o user_id da venda correspondente para gravar no histórico de estoque
    SELECT user_id INTO v_user_id FROM public.vendas WHERE id = NEW.venda_id;

    -- 2. Salva a movimentação no histórico
    INSERT INTO public.movimentacoes_estoque (user_id, produto_id, tipo, quantidade, motivo)
    VALUES (coalesce(v_user_id, auth.uid()), NEW.produto_id, 'saida', NEW.quantidade, 'venda');

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_item_venda_inserted ON public.itens_venda;
CREATE TRIGGER on_item_venda_inserted
    AFTER INSERT ON public.itens_venda
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_item_venda_inserido();


-- =========================================================================
-- 3. TRIGGER: LANÇAMENTO FINANCEIRO AUTOMÁTICO (VENDAS -> FINANCAS)
-- =========================================================================

CREATE OR REPLACE FUNCTION public.handle_venda_concluida()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Se o status da venda for concluído, insere na tabela de finanças
    IF NEW.status = 'concluida' THEN
        INSERT INTO public.financas (user_id, entidade_id, descricao, valor_total, tipo, categoria, status_lancamento)
        VALUES (
            NEW.user_id, 
            NEW.entidade_id, 
            'Venda PDV #' || substr(NEW.id::text, 1, 8), -- Nome descritivo com os 8 primeiros caracteres do UUID
            NEW.valor_total, 
            'receita', 
            'Vendas', 
            'finalizado'
        );
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_venda_concluida ON public.vendas;
CREATE TRIGGER on_venda_concluida
    AFTER INSERT OR UPDATE ON public.vendas
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_venda_concluida();


-- =========================================================================
-- 4. EVENT TRIGGER: ATIVAÇÃO AUTOMÁTICA DE RLS PARA NOVAS TABELAS
-- =========================================================================

CREATE OR REPLACE FUNCTION public.rls_auto_enable_procedure()
RETURNS event_trigger
LANGUAGE plpgsql
AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     END IF;
  END LOOP;
END;
$$;

-- Nota: Event Triggers globais requerem remoção prévia se existirem
DROP EVENT TRIGGER IF EXISTS rls_auto_enable;

CREATE EVENT TRIGGER rls_auto_enable
  ON ddl_command_end
  WHEN TAG IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
  EXECUTE FUNCTION public.rls_auto_enable_procedure();

```

# EXEMPLO DE COMO APAGAR UMA FUNÇÃO

```
-- =========================================================================
-- SCRIPT PARA REMOÇÃO DE FUNÇÃO DE EVENT TRIGGER
-- =========================================================================

-- O argumento 'CASCADE' garante que o Event Trigger associado a esta função 
-- também seja removido, evitando erros de objetos dependentes.
DROP FUNCTION IF EXISTS public.rls_auto_enable() CASCADE;
```


# EXEMPLO DE PROMPT PARA CRIAR VIEWS
```
Crie uma view chamada ver_servicos_destacados, ela deve listar os serviçõs com o nome da categoria e os detalhes do autor que esta na tabela de  "usuarios_espelho". Alem disso, deve calcular a media das notas (use 0 se nao houver) eo total de avaliações recebidas por cada serviço.

conforme o schema abaixo:

-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.categorias (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  tipo_de_categoria text NOT NULL,
  CONSTRAINT categorias_pkey PRIMARY KEY (id)
);
CREATE TABLE public.entidades (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid NOT NULL,
  nome_completo text,
  bio text,
  avatar_url text,
  CONSTRAINT entidades_pkey PRIMARY KEY (id),
  CONSTRAINT entidades_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.servicos (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  titulo text NOT NULL,
  descricao text,
  categoria bigint,
  preco_estimado numeric,
  preco_detalhe text,
  foto_url text,
  criado_por_usuario bigint,
  terceiro boolean DEFAULT false,
  eu_mesmo boolean DEFAULT true,
  whatsapp text,
  CONSTRAINT servicos_pkey PRIMARY KEY (id),
  CONSTRAINT servicos_categoria_fkey FOREIGN KEY (categoria) REFERENCES public.categorias(id),
  CONSTRAINT servicos_criado_por_usuario_fkey FOREIGN KEY (criado_por_usuario) REFERENCES public.entidades(id)
);
CREATE TABLE public.favoritos (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  usuario_id bigint NOT NULL,
  servico_id bigint NOT NULL,
  CONSTRAINT favoritos_pkey PRIMARY KEY (id),
  CONSTRAINT favoritos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.entidades(id),
  CONSTRAINT favoritos_servico_id_fkey FOREIGN KEY (servico_id) REFERENCES public.servicos(id)
);
CREATE TABLE public.avaliacoes (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  servico_id bigint NOT NULL,
  author_id bigint NOT NULL,
  nota smallint NOT NULL CHECK (nota >= 1 AND nota <= 5),
  comentario text,
  CONSTRAINT avaliacoes_pkey PRIMARY KEY (id),
  CONSTRAINT avaliacoes_servico_id_fkey FOREIGN KEY (servico_id) REFERENCES public.servicos(id),
  CONSTRAINT avaliacoes_autor_id_fkey FOREIGN KEY (author_id) REFERENCES public.entidades(id)
);


```
# RESPOSTA
```
-- =========================================================================
-- CRIAÇÃO DA VIEW: ver_servicos_destacados
-- =========================================================================

CREATE OR REPLACE VIEW public.ver_servicos_destacados with (security_invoker) AS
SELECT 
    -- Dados primários do Serviço
    s.id AS servico_id,
    s.created_at AS servico_criado_em,
    s.titulo AS servico_titulo,
    s.descricao AS servico_descricao,
    s.preco_estimado,
    s.preco_detalhe,
    s.foto_url AS servico_foto_url,
    s.terceiro,
    s.eu_mesmo,
    s.whatsapp,

    -- Dados relacionados da Categoria
    c.id AS categoria_id,
    c.tipo_de_categoria AS categoria_nome,

    -- Dados relacionados do Autor (entidades)
    u.id AS autor_id,
    u.nome_completo AS autor_nome,
    u.bio AS autor_bio,
    u.avatar_url AS autor_avatar_url,

    -- Métricas Agregadas de Avaliações
    -- COALESCE substitui o valor nulo por 0 se não houver registros.
    -- ROUND limita a média a duas casas decimais.
    coalesce(round(avg(a.nota), 2), 0.00) AS avaliacao_media,
    coalesce(count(a.id), 0) AS total_avaliacoes

FROM public.servicos s
LEFT JOIN public.categorias c ON s.categoria = c.id
LEFT JOIN public.entidades u ON s.criado_por_usuario = u.id
LEFT JOIN public.avaliacoes a ON s.id = a.servico_id

-- Agrupamento obrigatório devido ao uso de AVG e COUNT.
-- É necessário incluir todas as colunas não agregadas que estão no SELECT.
GROUP BY 
    s.id, 
    c.id, 
    u.id;
```

# srl apolicies
```
-- =========================================================================
-- 1. POLÍTICAS: CATEGORIAS (Leitura geral, escrita bloqueada via API)
-- =========================================================================
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Leitura Geral Categorias" ON public.categorias;

CREATE POLICY "Leitura Geral Categorias" ON public.categorias
FOR SELECT TO authenticated USING ( true );


-- =========================================================================
-- 2. POLÍTICAS: SERVIÇOS (Leitura geral, modificação apenas do criador)
-- =========================================================================
ALTER TABLE public.servicos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Leitura Geral Servicos" ON public.servicos;
DROP POLICY IF EXISTS "Modificacao Criador Servicos" ON public.servicos;

CREATE POLICY "Leitura Geral Servicos" ON public.servicos
FOR SELECT TO authenticated USING ( true );

-- Nota: Como 'criado_por_usuario' aponta para public.entidades(id) [bigint], 
-- precisamos validar através do user_id correspondente daquela entidade.
CREATE POLICY "Modificacao Criador Servicos" ON public.servicos
FOR ALL TO authenticated
USING ( criado_por_usuario IN (SELECT id FROM public.entidades WHERE user_id = auth.uid()) )
WITH CHECK ( criado_por_usuario IN (SELECT id FROM public.entidades WHERE user_id = auth.uid()) );


-- =========================================================================
-- 3. POLÍTICAS: FAVORITOS (Isolamento total por usuário)
-- =========================================================================
ALTER TABLE public.favoritos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Gerenciamento Favoritos Proprietario" ON public.favoritos;

CREATE POLICY "Gerenciamento Favoritos Proprietario" ON public.favoritos
FOR ALL TO authenticated
USING ( usuario_id IN (SELECT id FROM public.entidades WHERE user_id = auth.uid()) )
WITH CHECK ( usuario_id IN (SELECT id FROM public.entidades WHERE user_id = auth.uid()) );


-- =========================================================================
-- 4. POLÍTICAS: AVALIAÇÕES (Leitura geral, escrita apenas do autor)
-- =========================================================================
ALTER TABLE public.avaliacoes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Leitura Geral Avaliacoes" ON public.avaliacoes;
DROP POLICY IF EXISTS "Escrita Autor Avaliacoes" ON public.avaliacoes;

CREATE POLICY "Leitura Geral Avaliacoes" ON public.avaliacoes
FOR SELECT TO authenticated USING ( true );

CREATE POLICY "Escrita Autor Avaliacoes" ON public.avaliacoes
FOR ALL TO authenticated
USING ( author_id IN (SELECT id FROM public.entidades WHERE user_id = auth.uid()) )
WITH CHECK ( author_id IN (SELECT id FROM public.entidades WHERE user_id = auth.uid()) );


-- =========================================================================
-- 5. POLÍTICAS: FINANÇAS E PARCELAS (Isolamento estrito por user_id)
-- =========================================================================
ALTER TABLE public.financas ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Financas Privadas" ON public.financas;
CREATE POLICY "Financas Privadas" ON public.financas
FOR ALL TO authenticated USING ( user_id = auth.uid() ) WITH CHECK ( user_id = auth.uid() );

ALTER TABLE public.parcelas ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Parcelas Privadas" ON public.parcelas;
-- As parcelas herdam a segurança da tabela de finanças através de um sub-select
CREATE POLICY "Parcelas Privadas" ON public.parcelas
FOR ALL TO authenticated 
USING ( financa_id IN (SELECT id FROM public.financas WHERE user_id = auth.uid()) )
WITH CHECK ( financa_id IN (SELECT id FROM public.financas WHERE user_id = auth.uid()) );


-- =========================================================================
-- 6. POLÍTICAS: PRODUTOS E MOVIMENTAÇÕES DE ESTOQUE (Isolamento por user_id)
-- =========================================================================
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Produtos Privados" ON public.produtos;
CREATE POLICY "Produtos Privados" ON public.produtos
FOR ALL TO authenticated USING ( user_id = auth.uid() ) WITH CHECK ( user_id = auth.uid() );

ALTER TABLE public.movimentacoes_estoque ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Estoque Privado" ON public.movimentacoes_estoque;
CREATE POLICY "Estoque Privado" ON public.movimentacoes_estoque
FOR ALL TO authenticated USING ( user_id = auth.uid() ) WITH CHECK ( user_id = auth.uid() );


-- =========================================================================
-- 7. POLÍTICAS: VENDAS E ITENS DE VENDA (Isolamento por user_id)
-- =========================================================================
ALTER TABLE public.vendas ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Vendas Privadas" ON public.vendas;
CREATE POLICY "Vendas Privadas" ON public.vendas
FOR ALL TO authenticated USING ( user_id = auth.uid() ) WITH CHECK ( user_id = auth.uid() );

ALTER TABLE public.itens_venda ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Itens Venda Privados" ON public.itens_venda;
-- Os itens de venda validam se a venda-mãe pertence ao usuário logado
CREATE POLICY "Itens Venda Privados" ON public.itens_venda
FOR ALL TO authenticated 
USING ( venda_id IN (SELECT id FROM public.vendas WHERE user_id = auth.uid()) )
WITH CHECK ( venda_id IN (SELECT id FROM public.vendas WHERE user_id = auth.uid()) );
```


# INSERINDO DADOS EM USUARIOS
```
INSERT INTO public.entidades (id, nome, role)
VALUES (
  'COLE-AQUI-O-UUID-DO-USUARIO', -- O ID que você copiou
  'Nome do Usuário',              -- Nome que aparecerá no sistema
  'psicopedagoga'                 -- Pode ser: 'psicopedagoga', 'supervisor' ou 'paciente'
)
ON CONFLICT (id) DO UPDATE 
SET role = EXCLUDED.role, nome = EXCLUDED.nome;  
 
```

# UPDATE
```
UPDATE public.entidades
SET 
    nome = 'Novo Nome Corrigido',
    role = 'supervisor' -- Pode alterar para o cargo desejado
WHERE id = 'COLE-AQUI-O-UUID-DO-USUARIO';
```

#  LIST (Listar / Select)
* Existem duas formas principais de listar: ver todos os usuários ou buscar um específico.
###  A) Listar TODOS os usuários do sistema:
```
SELECT id, nome, role, created_at
FROM public.entidades
ORDER BY created_at DESC; -- Mostra os mais recentes primeiro
```
### Listar APENAS os pacientes (Filtrando por cargo):
```
SELECT nome, role 
FROM public.entidades
WHERE role = 'paciente';
```

## DELETAR 
```
-- DELETE (Excluir / Apagar)
-- Apagar um usuário específico do sistema pelo seu ID
DELETE FROM public.entidades
WHERE id = 'COLE-AQUI-O-UUID-DO-USUARIO';

-- ⚠️ ATENÇÃO: Nunca rode um DELETE sem o "WHERE", 
-- ou ele apagará TODOS os usuários da tabela inteira!
```


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
## constantes.js (funcionado)
```  
const supabaseKey = 'sua_anon_key';   
const supabaseUrl = 'Sua_url';    

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# financeiro.html
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Financeiro Completo - ERP ABP</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
    <script src="constantes.js"></script>
    
    <style>
        :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; }
        body { font-family: 'Inter', sans-serif; background: var(--bg); }
        .card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        
        .status-pago { background: #d1fae5; color: #065f46; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 12px; }
        .status-pendente { background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 12px; }
        .status-atrasado { background: #fee2e2; color: #991b1b; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 12px; animation: pulse 2s infinite; }
        
        .highlight-parcelas { border: 2px solid #3b82f6 !important; background-color: #eff6ff !important; box-shadow: 0 0 10px rgba(59, 130, 246, 0.2); }
        .highlight-label { color: #1d4ed8; font-weight: 900; }

        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        
        label { font-size: 13px; font-weight: bold; color: #475569; margin-bottom: 4px; display: block; }
        input[type="text"], input[type="number"], input[type="date"], input[type="email"], input[type="password"], select { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; }
        input[type="checkbox"] { width: auto; transform: scale(1.2); cursor: pointer; }
        
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

        /* Estilo para a zona de Drop */
        .drop-zone { border: 2px dashed #cbd5e1; border-radius: 6px; padding: 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; background-color: #f8fafc; }
        .drop-zone:hover { background-color: #f1f5f9; border-color: #94a3b8; }
        .drop-zone.dragover { border-color: #3ecf8e; background-color: #ecfdf5; }
    </style>
</head>
<body>

    <div id="tela-login" class="hidden min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full mx-4 border-t-4 border-emerald-500">
            <div class="text-center mb-8">
                <i class="fas fa-wallet text-5xl text-emerald-500 mb-3"></i>
                <h2 class="text-2xl font-bold text-slate-800">ERP Financeiro</h2>
                <p class="text-slate-500 text-sm mt-1">Faça login para acessar suas contas</p>
            </div>
            
            <div class="space-y-4">
                <div>
                    <label class="text-sm font-bold text-slate-700">E-mail</label>
                    <input type="email" id="login-email" placeholder="seu@email.com" onkeyup="if(event.key === 'Enter') document.getElementById('login-senha').focus()">
                </div>
                <div>
                    <label class="text-sm font-bold text-slate-700">Senha</label>
                    <input type="password" id="login-senha" placeholder="••••••••" onkeyup="if(event.key === 'Enter') fazerLogin()">
                </div>
                <button id="btn-login" onclick="fazerLogin()" class="w-full bg-emerald-500 text-white font-bold py-3 rounded hover:bg-emerald-600 transition shadow-lg mt-2">
                    Entrar no Sistema
                </button>
            </div>
        </div>
    </div>

    <div id="tela-sistema" class="hidden">
        
        <nav class="bg-white p-4 shadow-md flex justify-between items-center fixed top-0 left-0 w-full z-40">
            <div class="flex items-center gap-4">
                <button onclick="abrirMenu()" class="text-slate-600 hover:text-emerald-500 text-2xl focus:outline-none px-2">
                    <i class="fas fa-bars"></i>
                </button>
                <h1 class="font-bold text-xl text-slate-800 hidden sm:block"><i class="fas fa-wallet text-emerald-500"></i> Financeiro ERP ABP</h1>
            </div>
            <button onclick="sairDaConta()" class="text-slate-500 hover:text-red-500 transition font-bold text-sm flex items-center gap-2">
                <span class="hidden sm:inline">Sair</span> <i class="fas fa-sign-out-alt"></i>
            </button>
        </nav>

        <div id="sidebar-menu" class="fixed inset-y-0 left-0 w-64 bg-slate-800 text-white transform -translate-x-full transition-transform duration-300 z-50 shadow-2xl">
            <div class="p-6 border-b border-slate-700 flex justify-between items-center">
                <h2 class="text-xl font-bold"><i class="fas fa-wallet text-emerald-500"></i> Menu</h2>
                <button onclick="fecharMenu()" class="text-slate-400 hover:text-white focus:outline-none"><i class="fas fa-times text-2xl"></i></button>
            </div>
            <ul class="p-4 space-y-2 font-medium">
                <li><a href="#" onclick="alternarAba('listagem'); fecharMenu();" class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-list w-6"></i> Lançamentos</a></li>
                <li><a href="#" onclick="alternarAba('formulario'); fecharMenu();" class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-plus-circle w-6"></i> Novo Lançamento</a></li>
                
                
                 <!-- Nova Seção: Outras Páginas do ERP -->
                <span class="text-xs text-slate-500 uppercase tracking-wider block pl-3 pt-4">Módulos</span>
                <li><a href="financeiro.html"class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-cash-register w-6"></i> Financeiro</a></li>
                <li><a href="pdv.html"       class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-cash-register w-6"></i> PDV Frente de Caixa</a></li>
                <li><a href="produtos.html"  class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-chart-pie w-6"></i> Estoque </a></li>
                <li><a href="clientes.html"  class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-users w-6"></i> Clientes / Entidades</a></li>
                
                
                <li><hr class="border-slate-700 my-4"></li>
                <li><a href="#" onclick="sairDaConta()" class="block p-3 text-red-400 rounded hover:bg-slate-700 transition"><i class="fas fa-sign-out-alt w-6"></i> Sair do Sistema</a></li>
            </ul>
        </div>
        <div id="menu-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden" onclick="fecharMenu()"></div>

        <div class="container mx-auto px-4 pb-10 pt-24">
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div class="card border-l-4 border-emerald-500">
                    <p class="text-gray-500 text-sm">Receitas (Pagas)</p>
                    <h2 id="dash-receita" class="text-2xl font-bold text-emerald-600">R$ 0,00</h2>
                </div>
                <div class="card border-l-4 border-red-500">
                    <p class="text-gray-500 text-sm">Despesas (Pagas)</p>
                    <h2 id="dash-despesa" class="text-2xl font-bold text-red-600">R$ 0,00</h2>
                </div>
                <div class="card border-l-4 border-amber-500">
                    <p class="text-gray-500 text-sm">Previsão (Pendentes)</p>
                    <h2 id="dash-pendente" class="text-2xl font-bold text-amber-600">R$ 0,00</h2>
                </div>
            </div>

            <div class="flex gap-4 mb-6">
                <button onclick="alternarAba('listagem')" id="btn-aba-listagem" class="flex-1 bg-emerald-500 text-white hover:bg-emerald-600 font-bold py-3 rounded transition shadow">
                    <i class="fas fa-list"></i> Ver Lançamentos
                </button>
                <button onclick="alternarAba('formulario')" id="btn-aba-formulario" class="flex-1 bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold py-3 rounded transition shadow">
                    <i class="fas fa-plus-circle"></i> Novo Lançamento
                </button>
            </div>

            <div class="card mb-8 hidden" id="aba-formulario">
                <h3 class="font-bold text-lg mb-4 border-b pb-2 text-slate-800"><i class="fas fa-plus-circle"></i> Novo Lançamento</h3>
                
                <input type="hidden" id="f-editando-id">
                <input type="hidden" id="f-editando-financa-id">

                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div class="md:col-span-2"><label>Descrição da Conta *</label><input type="text" id="f-desc" placeholder="Ex: Aluguel, Internet, Venda"></div>
                    
                    <div>
                        <label>Tipo de Valor</label>
                        <select id="f-tipo-calculo" onchange="ajustarLabelsValor()">
                            <option value="total">Valor Total</option>
                            <option value="parcela">Valor da Parcela</option>
                        </select>
                    </div>
                    
                    <div><label id="label-valor">Valor Total (R$) *</label><input type="number" id="f-valor" step="0.01" placeholder="0.00"></div>
                    
                    <div><label>Tipo de Operação</label>
                        <select id="f-tipo">
                            <option value="despesa">Despesa (Saída)</option>
                            <option value="receita">Receita (Entrada)</option>
                        </select>
                    </div>

                    <div>
                        <label>Categoria</label>
                        <input type="text" id="f-categoria" list="lista-categorias" placeholder="Digite ou escolha..." value="Geral">
                        <datalist id="lista-categorias"></datalist>
                    </div>

                    <div><label>Status do Lançamento</label>
                        <select id="f-status">
                            <option value="aberto">Aberto</option>
                            <option value="finalizado">Finalizado</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>

                    <div class="relative md:col-span-1">
                        <label>Entidade / Cliente</label>
                        <input type="text" id="f-entidade-busca" placeholder="Buscar..." autocomplete="off">
                        <input type="hidden" id="f-entidade-id">
                        <ul id="lista-entidades" class="absolute z-10 w-full bg-white border border-slate-200 shadow-lg rounded max-h-40 overflow-y-auto hidden custom-scroll"></ul>
                    </div>
                    
                    <div>
                        <label>Frequência / Recorrência</label>
                        <select id="f-recorrencia">
                            <option value="1">Mensal</option>
                            <option value="3">Trimestral</option>
                            <option value="6">Semestral</option>
                            <option value="12">Anual</option>
                            <option value="diario">Diário</option> 
                        </select>
                    </div>

                    <div class="p-2 rounded highlight-parcelas">
                        <label class="highlight-label"><i class="fas fa-layer-group"></i> N° de Parcelas *</label>
                        <input type="number" id="f-parcelas" value="1" min="1" class="border-blue-300 font-bold text-blue-700">
                    </div>

                    <div><label>Data Vencimento *</label><input type="date" id="f-vencimento"></div>
                    
                    <div><label>Data de Pagamento</label><input type="date" id="f-data-pagamento"></div>

                    <div class="md:col-span-4">
                        <label><i class="fas fa-barcode"></i> Código de Barras / Linha Digitável</label>
                        <div class="flex gap-2">
                            <input type="text" id="f-barras" placeholder="Cole ou leia o código de barras" class="flex-1">
                            <button onclick="iniciarLeituraCamera()" type="button" class="bg-slate-800 text-white px-4 rounded hover:bg-slate-700 transition flex items-center gap-2">
                                <i class="fas fa-camera"></i> Ler Código
                            </button>
                        </div>
                        
                        <div id="camera-container" class="hidden mt-3 relative border-2 border-dashed border-slate-300 p-2 rounded bg-slate-50">
                            <div id="camera-preview" class="w-full max-w-sm mx-auto overflow-hidden rounded"></div>
                            <button onclick="pararCamera()" type="button" class="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex justify-center items-center hover:bg-red-600 shadow-lg z-10">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>

                    <div class="md:col-span-2">
                        <label><i class="fas fa-file-invoice"></i> Anexar Boleto</label>
                        <div class="drop-zone" id="drop-boleto" onclick="document.getElementById('f-boleto').click()">
                            <i class="fas fa-cloud-upload-alt text-2xl text-slate-400 mb-2"></i>
                            <p class="text-xs text-slate-500">Clique ou arraste o arquivo aqui</p>
                            <input type="file" id="f-boleto" accept="image/*,.pdf" class="hidden" onchange="mostrarNomeArquivo(this, 'nome-boleto')">
                            <p id="nome-boleto" class="text-[11px] font-bold text-emerald-600 mt-2 truncate"></p>
                        </div>
                    </div>

                    <div class="md:col-span-2">
                        <label><i class="fas fa-receipt"></i> Anexar Comprovante</label>
                        <div class="drop-zone" id="drop-comprovante" onclick="document.getElementById('f-comprovante').click()">
                            <i class="fas fa-cloud-upload-alt text-2xl text-slate-400 mb-2"></i>
                            <p class="text-xs text-slate-500">Clique ou arraste o arquivo aqui</p>
                            <input type="file" id="f-comprovante" accept="image/*,.pdf" class="hidden" onchange="mostrarNomeArquivo(this, 'nome-comprovante')">
                            <p id="nome-comprovante" class="text-[11px] font-bold text-emerald-600 mt-2 truncate"></p>
                        </div>
                    </div>
                </div>
                
                <div class="flex gap-4 mt-6">
                    <button onclick="gerarLancamentoCompleto()" id="btn-salvar" class="flex-1 bg-emerald-500 text-white font-bold py-3 rounded hover:bg-emerald-600 transition shadow-lg">
                        <i class="fas fa-save"></i> Gravar Lançamento
                    </button>
                    <button onclick="cancelarEdicao()" id="btn-cancelar" class="hidden bg-slate-500 text-white font-bold py-3 px-6 rounded hover:bg-slate-600 transition shadow-lg">
                        Cancelar
                    </button>
                </div>
            </div>

            <div class="card" id="aba-listagem">
                <div class="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 class="font-bold text-slate-800"><i class="fas fa-list"></i> Controle de Parcelas</h3>
                    <button onclick="excluirSelecionados()" class="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition text-sm">
                        <i class="fas fa-trash"></i> Excluir Selecionados
                    </button>
                </div>

                <div class="bg-slate-50 p-4 rounded mb-4 flex flex-wrap gap-4 items-end border border-slate-200">
                    <div class="flex-1 min-w-[200px]">
                        <label class="text-xs">Pesquisar Descrição</label>
                        <input type="text" id="filtro-busca" placeholder="Ex: Aluguel..." onkeyup="if(event.key === 'Enter') loadParcelas()">
                    </div>
                    <div>
                        <label class="text-xs">Filtrar Categoria</label>
                        <select id="filtro-categoria" onchange="loadParcelas()">
                            <option value="">Todas</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-xs">Data Início</label>
                        <input type="date" id="filtro-inicio" onchange="loadParcelas()">
                    </div>
                    <div>
                        <label class="text-xs">Data Fim</label>
                        <input type="date" id="filtro-fim" onchange="loadParcelas()">
                    </div>
                    <div class="flex gap-2">
                        <button onclick="loadParcelas()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow transition">
                            <i class="fas fa-search"></i> Filtrar
                        </button>
                        <button onclick="limparFiltros()" class="bg-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-400 transition">
                            Limpar
                        </button>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-100 text-slate-600 text-xs uppercase border-b-2 border-slate-200">
                                <th class="p-3 w-10 text-center"><input type="checkbox" id="check-all" onclick="toggleTodosChecks(this)"></th>
                                <th class="p-3">Datas (Venc. / Pag.)</th>
                                <th class="p-3">Descrição / Anexos</th>
                                <th class="p-3">Nº Parcela</th>
                                <th class="p-3">Valor (R$)</th>
                                <th class="p-3 text-center">Status</th>
                                <th class="p-3 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="lista-parcelas" class="text-sm"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div> 


    <script>
// Configuração do Supabase      
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

        let entidadesCache = [];
        let html5QrCode = null;

//====================================================================
        // CONTROLE DO MENU HAMBÚRGUER E ABAS
        // ====================================================================
        function abrirMenu() {
            document.getElementById('sidebar-menu').classList.remove('-translate-x-full');
            document.getElementById('menu-overlay').classList.remove('hidden');
        }

        function fecharMenu() {
            document.getElementById('sidebar-menu').classList.add('-translate-x-full');
            document.getElementById('menu-overlay').classList.add('hidden');
        }

        function alternarAba(abaAtiva) {
            const form = document.getElementById('aba-formulario');
            const lista = document.getElementById('aba-listagem');
            const btnForm = document.getElementById('btn-aba-formulario');
            const btnLista = document.getElementById('btn-aba-listagem');

            const classesVerde = ['bg-emerald-500', 'text-white', 'hover:bg-emerald-600'];
            const classesCinza = ['bg-slate-200', 'text-slate-700', 'hover:bg-slate-300'];

            btnForm.classList.remove(...classesVerde, ...classesCinza);
            btnLista.classList.remove(...classesVerde, ...classesCinza);

            if (abaAtiva === 'formulario') {
                form.classList.remove('hidden');
                lista.classList.add('hidden');
                btnForm.classList.add(...classesVerde);
                btnLista.classList.add(...classesCinza);
            } else {
                form.classList.add('hidden');
                lista.classList.remove('hidden');
                btnLista.classList.add(...classesVerde);
                btnForm.classList.add(...classesCinza);
            }
        }

        // ====================================================================
        // AUTENTICAÇÃO E CONTROLE DE TELAS
        // ====================================================================
        async function verificar_login() {
            const { data: { session } } = await _supabase.auth.getSession();
            const telaLogin = document.getElementById('tela-login');
            const telaSistema = document.getElementById('tela-sistema');

            if (!session) {
                telaLogin.classList.remove('hidden');
                telaLogin.classList.add('flex');
                telaSistema.classList.add('hidden');
            } else {
                telaLogin.classList.add('hidden');
                telaLogin.classList.remove('flex');
                telaSistema.classList.remove('hidden');
                init(); 
            }
        }

        async function fazerLogin() {
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;
            const btn = document.getElementById('btn-login');
            
            if(!email || !senha) return alert("Por favor, preencha e-mail e senha.");

            btn.innerText = 'Autenticando...';
            btn.disabled = true;

            const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
            
            if (error) {
                alert("Erro ao fazer login: Verifique seu e-mail e senha.");
                btn.innerText = 'Entrar no Sistema';
                btn.disabled = false;
            } else {
                document.getElementById('login-email').value = '';
                document.getElementById('login-senha').value = '';
                btn.innerText = 'Entrar no Sistema';
                btn.disabled = false;
                verificar_login(); 
            }
        }

        async function sairDaConta() {
            await _supabase.auth.signOut();
            document.getElementById('lista-parcelas').innerHTML = '';
            document.getElementById('dash-receita').innerText = 'R$ 0,00';
            document.getElementById('dash-despesa').innerText = 'R$ 0,00';
            document.getElementById('dash-pendente').innerText = 'R$ 0,00';
            fecharMenu();
            verificar_login();
        }

        
// ========================================================
// INICIALIZAÇÃO E ARRASTAR/SOLTAR
// ========================================================
        
   document.addEventListener('DOMContentLoaded', () => {
            verificar_login();
            configurarDropZone('drop-boleto', 'f-boleto', 'nome-boleto');
            configurarDropZone('drop-comprovante', 'f-comprovante', 'nome-comprovante');
        });

        async function init() {
            loadEntidades();
            loadCategoriasUnicas();
            loadDashboard();
            loadParcelas();
        }

        function configurarDropZone(dropId, inputId, txtId) {
            const dropZone = document.getElementById(dropId);
            const inputElement = document.getElementById(inputId);

            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('dragover');
            });

            dropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
                
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    inputElement.files = e.dataTransfer.files;
                    mostrarNomeArquivo(inputElement, txtId);
                }
            });
        }

        function mostrarNomeArquivo(input, idCampoTexto) {
            const campoTexto = document.getElementById(idCampoTexto);
            if (input.files && input.files.length > 0) {
                campoTexto.innerHTML = `<i class="fas fa-check"></i> ${input.files[0].name}`;
            } else {
                campoTexto.innerHTML = '';
            }
        }

        
    // ====================================================================
        // FUNÇÕES DO SISTEMA E CRUD
        // ====================================================================
        function ajustarLabelsValor() {
            const tipo = document.getElementById('f-tipo-calculo').value;
            document.getElementById('label-valor').innerText = tipo === 'total' ? 'Valor Total (R$)' : 'Valor da Parcela (R$)';
        }

        async function loadEntidades() {
            const { data } = await _supabase.from('entidades').select('id, nome_completo');
            if(data) entidadesCache = data;
        }

        async function loadCategoriasUnicas() {
            const { data } = await _supabase.from('financas').select('categoria');
            if (!data) return;
            
            const categorias = [...new Set(data.map(item => item.categoria).filter(c => c))];
            
            const datalist = document.getElementById('lista-categorias');
            const selectFiltro = document.getElementById('filtro-categoria');
            
            datalist.innerHTML = '';
            selectFiltro.innerHTML = '<option value="">Todas</option>';
            
            categorias.forEach(cat => {
                datalist.innerHTML += `<option value="${cat}">`;
                selectFiltro.innerHTML += `<option value="${cat}">${cat}</option>`;
            });
        }

        const inputBusca = document.getElementById('f-entidade-busca');
        const listaDropdown = document.getElementById('lista-entidades');
        const inputId = document.getElementById('f-entidade-id');

        inputBusca.addEventListener('input', (e) => {
            const termo = e.target.value.toLowerCase();
            listaDropdown.innerHTML = '';
            if (!termo) { listaDropdown.classList.add('hidden'); inputId.value = ''; return; }

            const filtradas = entidadesCache.filter(ent => ent.nome_completo.toLowerCase().includes(termo));
            if (filtradas.length > 0) {
                listaDropdown.classList.remove('hidden');
                filtradas.forEach(ent => {
                    const li = document.createElement('li');
                    li.className = 'p-3 hover:bg-slate-100 cursor-pointer text-sm border-b last:border-b-0';
                    li.innerHTML = `<i class="fas fa-user-circle text-slate-400 mr-2"></i>${ent.nome_completo}`;
                    li.onclick = () => {
                        inputBusca.value = ent.nome_completo;
                        inputId.value = ent.id;
                        listaDropdown.classList.add('hidden');
                    };
                    listaDropdown.appendChild(li);
                });
            } else { listaDropdown.classList.add('hidden'); inputId.value = ''; }
        });

        function iniciarLeituraCamera() {
            const container = document.getElementById('camera-container');
            container.classList.remove('hidden');
            html5QrCode = new Html5Qrcode("camera-preview");
            const config = { fps: 10, qrbox: { width: 300, height: 150 } };
            html5QrCode.start({ facingMode: "environment" }, config, (decodedText) => {
                document.getElementById('f-barras').value = decodedText;
                pararCamera();
            }).catch(() => { alert("Verifique as permissões da câmera."); container.classList.add('hidden'); });
        }

        function pararCamera() {
            if (html5QrCode) {
                html5QrCode.stop().then(() => { document.getElementById('camera-container').classList.add('hidden'); });
            } else { document.getElementById('camera-container').classList.add('hidden'); }
        }

        async function loadDashboard() {
            const { data: parcelas } = await _supabase.from('parcelas').select('*, financas(tipo)');
            if(!parcelas) return;
            let receita = 0, despesa = 0, pendente = 0;
            parcelas.forEach(p => {
                const valor = parseFloat(p.valor_parcela || 0);
                if (p.status === 'pago') { p.financas.tipo === 'receita' ? receita += valor : despesa += valor; }
                else { pendente += valor; }
            });
            document.getElementById('dash-receita').innerText = `R$ ${receita.toLocaleString('pt-br', {minimumFractionDigits: 2})}`;
            document.getElementById('dash-despesa').innerText = `R$ ${despesa.toLocaleString('pt-br', {minimumFractionDigits: 2})}`;
            document.getElementById('dash-pendente').innerText = `R$ ${pendente.toLocaleString('pt-br', {minimumFractionDigits: 2})}`;
        }

        async function gerarLancamentoCompleto() {
            const btn = document.getElementById('btn-salvar');
            btn.disabled = true; btn.innerText = 'Salvando...';

            try {
                const desc = document.getElementById('f-desc').value;
                const tipoCalculo = document.getElementById('f-tipo-calculo').value;
                const valorInput = parseFloat(document.getElementById('f-valor').value);
                const tipo = document.getElementById('f-tipo').value;
                const categoria = document.getElementById('f-categoria').value || 'Geral';
                const statusLancamento = document.getElementById('f-status').value;
                const qtd = parseInt(document.getElementById('f-parcelas').value);
                const recorrenciaVal = document.getElementById('f-recorrencia').value;
                const dataVenc = document.getElementById('f-vencimento').value;
                const dataPagamentoForm = document.getElementById('f-data-pagamento').value;
                const entidade = document.getElementById('f-entidade-id').value || null;
                const barras = document.getElementById('f-barras').value;
                
                const fileBoleto = document.getElementById('f-boleto').files[0];
                const fileComprovante = document.getElementById('f-comprovante').files[0];
                
                const editandoId = document.getElementById('f-editando-id').value;
                const financaId = document.getElementById('f-editando-financa-id').value;

                if(!desc || !valorInput || !dataVenc) throw new Error("Preencha Descrição, Valor e Data de Vencimento!");

                let valorTotal, valorParcela;
                if (tipoCalculo === 'total') {
                    valorTotal = valorInput;
                    valorParcela = (valorTotal / qtd).toFixed(2);
                } else {
                    valorParcela = valorInput;
                    valorTotal = (valorParcela * qtd).toFixed(2);
                }

                let boletoUrl = null;
                let comprovanteUrl = null;

                if (fileBoleto) {
                    const fileName = `bol_${Date.now()}_${fileBoleto.name}`;
                    const { error } = await _supabase.storage.from('comprovantes').upload(`public/${fileName}`, fileBoleto);
                    if(!error) boletoUrl = _supabase.storage.from('comprovantes').getPublicUrl(`public/${fileName}`).data.publicUrl;
                }

                if (fileComprovante) {
                    const fileName = `comp_${Date.now()}_${fileComprovante.name}`;
                    const { error } = await _supabase.storage.from('comprovantes').upload(`public/${fileName}`, fileComprovante);
                    if(!error) comprovanteUrl = _supabase.storage.from('comprovantes').getPublicUrl(`public/${fileName}`).data.publicUrl;
                }

                if (editandoId) {
                    await _supabase.from('financas').update({
                        descricao: desc, tipo: tipo, categoria: categoria, status_lancamento: statusLancamento, entidade_id: entidade
                    }).eq('id', financaId);

                    const payloadUpdate = {
                        valor_parcela: valorParcela,
                        data_vencimento: dataVenc,
                        status: dataPagamentoForm ? 'pago' : 'pendente',
                        data_pagamento: dataPagamentoForm || null,
                        codigo_barra: barras
                    };
                    if (boletoUrl) payloadUpdate.boleto_url = boletoUrl;
                    if (comprovanteUrl) payloadUpdate.comprovante_url = comprovanteUrl;

                    const { error: errUpdate } = await _supabase.from('parcelas').update(payloadUpdate).eq('id', editandoId);
                    if (errUpdate) throw errUpdate;

                    alert("Parcela atualizada com sucesso!");
                } else {
                    const { data: financa, error: errF } = await _supabase.from('financas').insert([{
                        descricao: desc, valor_total: valorTotal, tipo, categoria, status_lancamento: statusLancamento, num_parcelas: qtd, entidade_id: entidade
                    }]).select().single();
                    if(errF) throw errF;

                    let parcelas = [];
                    for(let i = 1; i <= qtd; i++) {
                        let venc = new Date(dataVenc + 'T12:00:00'); 
                        if (recorrenciaVal === 'diario') {
                            venc.setDate(venc.getDate() + (i - 1));
                        } else {
                            venc.setMonth(venc.getMonth() + ((i - 1) * parseInt(recorrenciaVal))); 
                        }
                        
                        parcelas.push({
                            financa_id: financa.id,
                            num_parcela: i,
                            valor_parcela: valorParcela,
                            data_vencimento: venc.toISOString().split('T')[0],
                            status: dataPagamentoForm ? 'pago' : 'pendente',
                            data_pagamento: dataPagamentoForm || null,
                            codigo_barra: barras,
                            boleto_url: boletoUrl,
                            comprovante_url: comprovanteUrl
                        });
                    }

                    const { error: errP } = await _supabase.from('parcelas').insert(parcelas);
                    if(errP) throw errP;

                    alert("Lançamento salvo!");
                }
                
                // Em vez de recarregar a página, podemos simplesmente voltar para a lista
                cancelarEdicao();
                loadParcelas();
                loadDashboard();
                alternarAba('listagem');
                btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Gravar Lançamento';

            } catch (error) {
                alert(error.message);
                btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Gravar Lançamento';
            }
        }

        function limparFiltros() {
            document.getElementById('filtro-busca').value = '';
            document.getElementById('filtro-categoria').value = '';
            document.getElementById('filtro-inicio').value = '';
            document.getElementById('filtro-fim').value = '';
            loadParcelas();
        }


        async function loadParcelas() {
            const busca = document.getElementById('filtro-busca').value;
            const categoria = document.getElementById('filtro-categoria').value;
            const dataInicio = document.getElementById('filtro-inicio').value;
            const dataFim = document.getElementById('filtro-fim').value;

            let query = _supabase.from('parcelas').select('*, financas!inner(descricao, tipo, categoria)').order('data_vencimento', { ascending: true });

            if (busca) query = query.ilike('financas.descricao', `%${busca}%`);
            if (categoria) query = query.eq('financas.categoria', categoria);
            if (dataInicio) query = query.gte('data_vencimento', dataInicio);
            if (dataFim) query = query.lte('data_vencimento', dataFim);

            const { data, error } = await query;
            if (error) { console.error("Erro ao carregar parcelas:", error.message); return; }
            
            const tbody = document.getElementById('lista-parcelas');
            const hoje = new Date().toISOString().split('T')[0];

            tbody.innerHTML = data.map(p => {
                let statusClass = p.status === 'pago' ? 'status-pago' : 'status-pendente';
                let statusTxt = p.status.toUpperCase();
                if(p.status === 'pendente' && p.data_vencimento < hoje) { statusClass = 'status-atrasado'; statusTxt = 'ATRASADO'; }

                const dtVenc = new Date(p.data_vencimento + 'T12:00:00').toLocaleDateString('pt-br');
                const dtPag = p.data_pagamento ? new Date(p.data_pagamento + 'T12:00:00').toLocaleDateString('pt-br') : '--/--/----';

                const iconeBoleto = p.boleto_url ? `<a href="${p.boleto_url}" target="_blank" class="text-blue-500 hover:text-blue-700 ml-2 bg-blue-50 px-2 py-1 rounded text-xs"><i class="fas fa-file-invoice"></i> Boleto</a>` : '';
                const iconeComp = p.comprovante_url ? `<a href="${p.comprovante_url}" target="_blank" class="text-emerald-500 hover:text-emerald-700 ml-2 bg-emerald-50 px-2 py-1 rounded text-xs"><i class="fas fa-receipt"></i> Recibo</a>` : '';
                const txtBarras = p.codigo_barra ? `<div class="text-gray-400 font-mono text-[10px] mt-1 break-all bg-slate-50 p-1 rounded"><i class="fas fa-barcode"></i> ${p.codigo_barra}</div>` : '';

                return `
                <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td class="p-3 text-center">
                        <input type="checkbox" class="check-parcela" value="${p.id}">
                    </td>
                    <td class="p-3">
                        <div class="text-slate-800 font-bold"><i class="far fa-calendar-alt text-slate-400"></i> ${dtVenc}</div>
                        <div class="text-xs text-slate-500 mt-1"><i class="fas fa-check text-emerald-400"></i> ${dtPag}</div>
                    </td>
                    <td class="p-3">
                        <div class="font-bold text-slate-700 mb-1">${p.financas.descricao} <span class="text-[10px] font-normal bg-gray-200 text-gray-600 px-1 rounded ml-1">${p.financas.categoria || 'Geral'}</span></div>
                        <div class="flex gap-1 mb-1">${iconeBoleto}${iconeComp}</div>
                        ${txtBarras}
                    </td>
                    <td class="p-3 font-bold text-slate-600">${p.num_parcela} / ${p.financas.num_parcelas}</td>
                    <td class="p-3 font-bold ${p.financas.tipo === 'receita' ? 'text-emerald-600' : 'text-red-600'}">
                        R$ ${parseFloat(p.valor_parcela).toFixed(2)}
                    </td>
                    <td class="p-3 text-center"><span class="${statusClass}">${statusTxt}</span></td>
                    <td class="p-3 text-center">
                        <button onclick="prepararEdicao('${p.id}')" class="bg-blue-100 text-blue-600 px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition text-sm">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                    </td>
                </tr>`;
            }).join('');
        }

        async function prepararEdicao(id) {
            const { data: p } = await _supabase.from('parcelas').select('*, financas(*)').eq('id', id).single();
            if (p) {
                document.getElementById('f-editando-id').value = p.id;
                document.getElementById('f-editando-financa-id').value = p.financas.id;
                
                document.getElementById('f-desc').value = p.financas.descricao;
                document.getElementById('f-tipo').value = p.financas.tipo;
                document.getElementById('f-categoria').value = p.financas.categoria || 'Geral';
                document.getElementById('f-status').value = p.financas.status_lancamento || 'aberto';
                
                document.getElementById('f-tipo-calculo').value = 'parcela';
                ajustarLabelsValor();
                document.getElementById('f-valor').value = p.valor_parcela;
                document.getElementById('f-parcelas').value = 1;
                document.getElementById('f-parcelas').disabled = true; 
                document.getElementById('f-recorrencia').disabled = true;
                
                document.getElementById('f-vencimento').value = p.data_vencimento;
                document.getElementById('f-data-pagamento').value = p.data_pagamento || '';
                document.getElementById('f-barras').value = p.codigo_barra || '';
                
                document.getElementById('btn-salvar').innerHTML = '<i class="fas fa-sync-alt"></i> Atualizar Parcela';
                document.getElementById('btn-cancelar').classList.remove('hidden');
                
                // Muda para a aba de formulário automaticamente ao clicar em editar
                alternarAba('formulario');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        function cancelarEdicao() {
            document.getElementById('f-editando-id').value = '';
            document.getElementById('f-editando-financa-id').value = '';
            document.getElementById('f-parcelas').disabled = false;
            document.getElementById('f-recorrencia').disabled = false;
            document.getElementById('btn-salvar').innerHTML = '<i class="fas fa-save"></i> Gravar Lançamento';
            document.getElementById('btn-cancelar').classList.add('hidden');
            
            document.getElementById('f-desc').value = '';
            document.getElementById('f-valor').value = '';
            document.getElementById('f-categoria').value = 'Geral';
            document.getElementById('f-vencimento').value = '';
            document.getElementById('f-data-pagamento').value = '';
            document.getElementById('f-barras').value = '';
            
            document.getElementById('nome-boleto').innerHTML = '';
            document.getElementById('nome-comprovante').innerHTML = '';
            document.getElementById('f-boleto').value = '';
            document.getElementById('f-comprovante').value = '';
        }

        function toggleTodosChecks(source) {
            const checkboxes = document.querySelectorAll('.check-parcela');
            checkboxes.forEach(cb => cb.checked = source.checked);
        }

        async function excluirSelecionados() {
            const selecionados = Array.from(document.querySelectorAll('.check-parcela:checked')).map(cb => cb.value);
            if (selecionados.length === 0) return alert("Selecione ao menos uma parcela para excluir.");

            if (confirm(`Atenção: Deseja realmente excluir ${selecionados.length} parcela(s)?`)) {
                const { error } = await _supabase.from('parcelas').delete().in('id', selecionados);
                if (!error) {
                    alert('Excluído com sucesso!');
                    loadParcelas();
                    loadDashboard();
                } else {
                    alert('Erro ao excluir: ' + error.message);
                }
            }
        }
    </script>
</body>

<!--
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.entidades (
  user_id uuid,
  nome_completo text NOT NULL,
  cpf text,
  data_nascimento date,
  email text,
  telefone text,
  cep text,
  logradouro text,
  numero text,
  bairro text,
  cidade text,
  estado character varying,
  foto_url text,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  tipo_acesso text DEFAULT 'cliente'::text,
  tipo_entidade text DEFAULT 'cliente'::text,
  status_entidade text DEFAULT 'ativo'::text,
  avaliacao integer DEFAULT 5,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT entidades_pkey PRIMARY KEY (id),
  CONSTRAINT entidades_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.financas (
  entidade_id uuid,
  descricao text NOT NULL,
  valor_total numeric NOT NULL,
  tipo text CHECK (tipo = ANY (ARRAY['receita'::text, 'despesa'::text])),
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  num_parcelas integer DEFAULT 1,
  categoria text DEFAULT 'Geral'::text,
  status_lancamento text DEFAULT 'aberto'::text CHECK (status_lancamento = ANY (ARRAY['aberto'::text, 'finalizado'::text, 'cancelado'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT financas_pkey PRIMARY KEY (id),
  CONSTRAINT financas_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT financas_entidade_id_fkey FOREIGN KEY (entidade_id) REFERENCES public.entidades(id)
);
CREATE TABLE public.parcelas (
  financa_id uuid,
  num_parcela integer NOT NULL,
  valor_parcela numeric NOT NULL,
  data_vencimento date NOT NULL,
  data_pagamento date,
  codigo_barra text,
  boleto_url text,
  comprovante_url text,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  status text DEFAULT 'pendente'::text CHECK (status = ANY (ARRAY['pendente'::text, 'pago'::text, 'atrasado'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT parcelas_pkey PRIMARY KEY (id),
  CONSTRAINT parcelas_financa_id_fkey FOREIGN KEY (financa_id) REFERENCES public.financas(id)
);

-->
</html>

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# pdv
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDV Frente de Caixa - ERP ABP</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
    <script src="constantes.js"></script>
    
    <style>
        :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; }
        body { font-family: 'Inter', sans-serif; background: var(--bg); }
        .card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        
        .status-receita { background: #d1fae5; color: #065f46; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 12px; }
        .status-despesa { background: #fee2e2; color: #991b1b; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 12px; }
        
        label { font-size: 13px; font-weight: bold; color: #475569; margin-bottom: 4px; display: block; }
        input[type="text"], input[type="number"], input[type="date"], input[type="email"], input[type="password"], select, textarea { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; }
        
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    </style>
</head>
<body>

    <div id="tela-login" class="hidden min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full mx-4 border-t-4 border-emerald-500">
            <div class="text-center mb-8">
                <i class="fas fa-cash-register text-5xl text-emerald-500 mb-3"></i>
                <h2 class="text-2xl font-bold text-slate-800">ERP PDV</h2>
                <p class="text-slate-500 text-sm mt-1">Faça login para operar o Caixa</p>
            </div>
            
            <div class="space-y-4">
                <div>
                    <label class="text-sm font-bold text-slate-700">E-mail</label>
                    <input type="email" id="login-email" placeholder="seu@email.com" onkeyup="if(event.key === 'Enter') document.getElementById('login-senha').focus()">
                </div>
                <div>
                    <label class="text-sm font-bold text-slate-700">Senha</label>
                    <input type="password" id="login-senha" placeholder="••••••••" onkeyup="if(event.key === 'Enter') fazerLogin()">
                </div>
                <button id="btn-login" onclick="fazerLogin()" class="w-full bg-emerald-500 text-white font-bold py-3 rounded hover:bg-emerald-600 transition shadow-lg mt-2">
                    Entrar no Caixa
                </button>
            </div>
        </div>
    </div>

    <div id="tela-sistema" class="hidden">
        
        <nav class="bg-white p-4 shadow-md flex justify-between items-center fixed top-0 left-0 w-full z-40">
            <div class="flex items-center gap-4">
                <button onclick="abrirMenu()" class="text-slate-600 hover:text-emerald-500 text-2xl focus:outline-none px-2">
                    <i class="fas fa-bars"></i>
                </button>
                <h1 class="font-bold text-xl text-slate-800 hidden sm:block"><i class="fas fa-cash-register text-emerald-500"></i> Frente de Caixa PDV</h1>
            </div>
            <button onclick="sairDaConta()" class="text-slate-500 hover:text-red-500 transition font-bold text-sm flex items-center gap-2">
                <span class="hidden sm:inline">Fechar Caixa</span> <i class="fas fa-sign-out-alt"></i>
            </button>
        </nav>

        <div id="sidebar-menu" class="fixed inset-y-0 left-0 w-64 bg-slate-800 text-white transform -translate-x-full transition-transform duration-300 z-50 shadow-2xl">
            <div class="p-6 border-b border-slate-700 flex justify-between items-center">
                <h2 class="text-xl font-bold"><i class="fas fa-cash-register text-emerald-500"></i> Menu PDV</h2>
                <button onclick="fecharMenu()" class="text-slate-400 hover:text-white focus:outline-none"><i class="fas fa-times text-2xl"></i></button>
            </div>
            <ul class="p-4 space-y-2 font-medium">
                <li><a href="#" onclick="alternarAba('pdv'); fecharMenu();" class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-shopping-cart w-6"></i> Frente de Caixa</a></li>
                <li><a href="#" onclick="alternarAba('sangria'); fecharMenu();" class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-money-bill-wave w-6"></i> Sangria de Caixa</a></li>
                
                     <!-- Nova Seção: Outras Páginas do ERP -->
                <span class="text-xs text-slate-500 uppercase tracking-wider block pl-3 pt-4">Módulos</span>
                <li><a href="financeiro.html"class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-cash-register w-6"></i> Financeiro</a></li>
                <li><a href="pdv.html"       class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-cash-register w-6"></i> PDV Frente de Caixa</a></li>
                <li><a href="produtos.html"  class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-chart-pie w-6"></i> Estoque </a></li>
                <li><a href="clientes.html"  class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-users w-6"></i> Clientes / Entidades</a></li>
                
                <li><hr class="border-slate-700 my-4"></li>
                <li><a href="#" onclick="sairDaConta()" class="block p-3 text-red-400 rounded hover:bg-slate-700 transition"><i class="fas fa-sign-out-alt w-6"></i> Sair / Fechar Caixa</a></li>
            </ul>
        </div>
        <div id="menu-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden" onclick="fecharMenu()"></div>

        <div class="container mx-auto px-4 pb-10 pt-24">
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div class="card border-l-4 border-emerald-500">
                    <p class="text-gray-500 text-sm">Vendas Concluídas (Hoje)</p>
                    <h2 id="dash-vendas-hoje" class="text-2xl font-bold text-emerald-600">R$ 0,00</h2>
                </div>
                <div class="card border-l-4 border-red-500">
                    <p class="text-gray-500 text-sm">Total de Sangrias (Hoje)</p>
                    <h2 id="dash-sangrias-hoje" class="text-2xl font-bold text-red-600">R$ 0,00</h2>
                </div>
                <div class="card border-l-4 border-blue-500">
                    <p class="text-gray-500 text-sm">Itens no Carrinho Atual</p>
                    <h2 id="dash-itens-carrinho" class="text-2xl font-bold text-blue-600">0</h2>
                </div>
            </div>

            <div class="flex gap-4 mb-6">
                <button onclick="alternarAba('pdv')" id="btn-aba-pdv" class="flex-1 bg-emerald-500 text-white hover:bg-emerald-600 font-bold py-3 rounded transition shadow">
                    <i class="fas fa-shopping-cart"></i> Frente de Caixa (Vender)
                </button>
                <button onclick="alternarAba('sangria')" id="btn-aba-sangria" class="flex-1 bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold py-3 rounded transition shadow">
                    <i class="fas fa-money-bill-wave"></i> Realizar Sangria / Histórico
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6" id="aba-pdv">
                
                <div class="lg:col-span-2 space-y-6">
                    <div class="card">
                        <h3 class="font-bold text-lg mb-4 text-slate-800"><i class="fas fa-search-plus"></i> BIPAR OU BUSCAR PRODUTO</h3>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div class="md:col-span-2">
                                <label>Pesquisar ou Selecionar Produto</label>
                                <select id="pdv-select-produto" onchange="adicionarDoSelect()">
                                    <option value="">Selecione um produto para adicionar...</option>
                                </select>
                            </div>
                            <div>
                                <button onclick="iniciarLeituraCamera()" class="w-full bg-slate-800 text-white p-2.5 rounded hover:bg-slate-700 transition flex items-center justify-center gap-2 font-bold text-sm">
                                    <i class="fas fa-camera"></i> Ler Cód. Barras
                                </button>
                            </div>
                        </div>

                        <div id="camera-container" class="hidden mt-4 relative border-2 border-dashed border-slate-300 p-2 rounded bg-slate-50">
                            <div id="camera-preview" class="w-full max-w-sm mx-auto overflow-hidden rounded"></div>
                            <button onclick="pararCamera()" class="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex justify-center items-center hover:bg-red-600 shadow-lg z-10">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>

                    <div class="card">
                        <h3 class="font-bold text-slate-800 mb-4"><i class="fas fa-shopping-basket"></i> Itens da Venda</h3>
                        <div class="overflow-x-auto">
                            <table class="w-full text-left border-collapse">
                                <thead>
                                    <tr class="bg-slate-100 text-slate-600 text-xs uppercase border-b-2 border-slate-200">
                                        <th class="p-3">Item / Código</th>
                                        <th class="p-3 text-center" style="width: 130px;">Qtd</th>
                                        <th class="p-3 text-right">Unitário</th>
                                        <th class="p-3 text-right">Subtotal</th>
                                        <th class="p-3 text-center">Remover</th>
                                    </tr>
                                </thead>
                                <tbody id="carrinho-corpo" class="text-sm">
                                    </tbody>
                            </table>
                            <div id="carrinho-vazio" class="text-center text-slate-400 py-8">
                                <i class="fas fa-shopping-cart text-4xl mb-2 block"></i>
                                Carrinho de compras vazio.
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-1">
                    <div class="card sticky top-24 bg-slate-900 text-white">
                        <h3 class="font-bold text-lg mb-4 border-b border-slate-700 pb-2 text-emerald-400"><i class="fas fa-calculator"></i> FECHAMENTO DA VENDA</h3>
                        
                        <div class="space-y-4">
                            <div>
                                <label class="text-slate-300">Cliente / Entidade Opcional</label>
                                <select id="pdv-cliente" class="bg-slate-800 border-slate-700 text-white">
                                    <option value="">Consumidor Final (Não identificado)</option>
                                </select>
                            </div>

                            <div>
                                <label class="text-slate-300">Desconto Total (R$)</label>
                                <input type="number" id="pdv-desconto" value="0.00" step="0.01" min="0" oninput="recalcularTotais()" class="bg-slate-800 border-slate-700 text-white">
                            </div>

                            <div>
                                <label class="text-slate-300">Forma de Pagamento *</label>
                                <select id="pdv-forma-pagamento" class="bg-slate-800 border-slate-700 text-white font-bold text-emerald-400">
                                    <option value="Dinheiro">Dinheiro (Espécie)</option>
                                    <option value="PIX">PIX / Transferência</option>
                                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                                    <option value="Cartão de Débito">Cartão de Débito</option>
                                </select>
                            </div>

                            <div class="border-t border-slate-700 pt-4 mt-2">
                                <div class="flex justify-between text-sm text-slate-400">
                                    <span>Subtotal:</span>
                                    <span id="resumo-subtotal">R$ 0,00</span>
                                </div>
                                <div class="flex justify-between text-sm text-red-400">
                                    <span>Desconto:</span>
                                    <span id="resumo-desconto">- R$ 0,00</span>
                                </div>
                                <div class="flex justify-between items-center mt-2 border-t border-dashed border-slate-700 pt-2">
                                    <span class="font-bold text-lg text-slate-200">TOTAL A PAGAR:</span>
                                    <span id="resumo-total" class="text-3xl font-extrabold text-emerald-400">R$ 0,00</span>
                                </div>
                            </div>

                            <button onclick="finalizarVendaPDV()" class="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-extrabold py-4 rounded transition shadow-lg text-base mt-4 flex items-center justify-center gap-2">
                                <i class="fas fa-check-circle text-xl"></i> CONFIRMAR E EMITIR (F8)
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="space-y-6 hidden" id="aba-sangria">
                <div class="card">
                    <h3 class="font-bold text-lg mb-4 text-slate-800"><i class="fas fa-hand-holding-usd text-red-500"></i> Executar Sangria de Caixa (Retirada Urgente)</h3>
                    <p class="text-xs text-slate-500 mb-4">A sangria gera automaticamente um lançamento de <strong>Despesa (Saída)</strong> já finalizado na sua tabela financeira.</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                            <label>Valor da Retirada (R$) *</label>
                            <input type="number" id="sangria-valor" step="0.01" placeholder="0.00">
                        </div>
                        <div class="md:col-span-2">
                            <label>Motivo / Justificativa da Saída *</label>
                            <input type="text" id="sangria-motivo" placeholder="Ex: Sangria para depósito bancário, Troco ou Compra emergencial">
                        </div>
                    </div>
                    <button onclick="salvarSangria()" class="mt-4 bg-red-500 text-white font-bold py-2.5 px-6 rounded hover:bg-red-600 transition shadow">
                        <i class="fas fa-arrow-down"></i> Confirmar Saída / Sangria
                    </button>
                </div>

                <div class="card">
                    <h3 class="font-bold text-slate-800 mb-4"><i class="fas fa-history"></i> Últimas Movimentações Financeiras do Caixa (Hoje)</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-slate-100 text-slate-600 text-xs uppercase border-b-2 border-slate-200">
                                    <th class="p-3">Horário</th>
                                    <th class="p-3">Descrição da Operação</th>
                                    <th class="p-3">Categoria</th>
                                    <th class="p-3 text-center">Tipo</th>
                                    <th class="p-3 text-right">Valor Total</th>
                                </tr>
                            </thead>
                            <tbody id="lista-fluxo-caixa" class="text-sm">
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <script>
        // Configuração do Supabase (Mesma dos arquivos anteriores) 
        const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

        let html5QrCode = null;
        let produtosCache = [];
        let carrinho = [];

        function abrirMenu() {
            document.getElementById('sidebar-menu').classList.remove('-translate-x-full');
            document.getElementById('menu-overlay').classList.remove('hidden');
        }

        function fecharMenu() {
            document.getElementById('sidebar-menu').classList.add('-translate-x-full');
            document.getElementById('menu-overlay').classList.add('hidden');
        }

        function alternarAba(abaAtiva) {
            const pdv = document.getElementById('aba-pdv');
            const sangria = document.getElementById('aba-sangria');
            const btnPdv = document.getElementById('btn-aba-pdv');
            const btnSangria = document.getElementById('btn-aba-sangria');

            const classesVerde = ['bg-emerald-500', 'text-white', 'hover:bg-emerald-600'];
            const classesCinza = ['bg-slate-200', 'text-slate-700', 'hover:bg-slate-300'];

            btnPdv.classList.remove(...classesVerde, ...classesCinza);
            btnSangria.classList.remove(...classesVerde, ...classesCinza);

            if (abaAtiva === 'pdv') {
                pdv.classList.remove('hidden');
                sangria.classList.add('hidden');
                btnPdv.add(...classesVerde);
                btnSangria.add(...classesCinza);
            } else {
                pdv.classList.add('hidden');
                sangria.classList.remove('hidden');
                btnSangria.add(...classesVerde);
                btnPdv.add(...classesCinza);
                loadHistoricoCaixa();
            }
        }

        async function verificar_login() {
            const { data: { session } } = await _supabase.auth.getSession();
            const telaLogin = document.getElementById('tela-login');
            const telaSistema = document.getElementById('tela-sistema');

            if (!session) {
                telaLogin.classList.remove('hidden');
                telaLogin.classList.add('flex');
                telaSistema.classList.add('hidden');
            } else {
                telaLogin.classList.add('hidden');
                telaLogin.classList.remove('flex');
                telaSistema.classList.remove('hidden');
                init(); 
            }
        }

        async function fazerLogin() {
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;
            const btn = document.getElementById('btn-login');
            
            if(!email || !senha) return alert("Por favor, preencha e-mail e senha.");

            btn.innerText = 'Autenticando Caixa...';
            btn.disabled = true;

            const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
            
            if (error) {
                alert("Erro ao fazer login no PDV.");
                btn.innerText = 'Entrar no Caixa';
                btn.disabled = false;
            } else {
                document.getElementById('login-email').value = '';
                document.getElementById('login-senha').value = '';
                btn.innerText = 'Entrar no Caixa';
                btn.disabled = false;
                verificar_login(); 
            }
        }

        async function sairDaConta() {
            await _supabase.auth.signOut();
            fecharMenu();
            verificar_login();
        }

        document.addEventListener('DOMContentLoaded', () => {
            verificar_login();
            
            // Atalho de Teclado F8 para Finalizar Venda rápido
            window.addEventListener('keydown', (e) => {
                if(e.key === 'F8') {
                    e.preventDefault();
                    finalizarVendaPDV();
                }
            });
        });

        async function init() {
            await fetchProdutosPDV();
            await fetchEntidadesPDV();
            await loadDashboardPDV();
        }

        // Busca produtos ativos em estoque para o Caixa
        async function fetchProdutosPDV() {
            const { data, error } = await _supabase.from('produtos').select('*').order('nome', { ascending: true });
            if (!error && data) {
                produtosCache = data;
                const select = document.getElementById('pdv-select-produto');
                select.innerHTML = '<option value="">Selecione um produto para adicionar...</option>';
                data.forEach(p => {
                    select.innerHTML += `<option value="${p.id}">${p.nome} - R$ ${parseFloat(p.preco_venda).toFixed(2)} (Estoque: ${p.quantidade_estoque})</option>`;
                });
            }
        }

        // Busca clientes para associação na venda
        async function fetchEntidadesPDV() {
            const { data, error } = await _supabase.from('entidades').select('id, nome_completo').order('nome_completo', { ascending: true });
            if (!error && data) {
                const select = document.getElementById('pdv-cliente');
                select.innerHTML = '<option value="">Consumidor Final (Não identificado)</option>';
                data.forEach(e => {
                    select.innerHTML += `<option value="${e.id}">${e.nome_completo}</option>`;
                });
            }
        }

        // Leitor de código de barras por câmera (Idêntico ao original)
        function iniciarLeituraCamera() {
            const container = document.getElementById('camera-container');
            container.classList.remove('hidden');
            html5QrCode = new Html5Qrcode("camera-preview");
            const config = { fps: 10, qrbox: { width: 280, height: 140 } };
            
            html5QrCode.start({ facingMode: "environment" }, config, (decodedText) => {
                adicionarPorCodigoBarras(decodedText);
                pararCamera();
            }).catch(() => { 
                alert("Permissão de câmera negada ou dispositivo não encontrado."); 
                container.classList.add('hidden'); 
            });
        }

        function pararCamera() {
            if (html5QrCode) {
                html5QrCode.stop().then(() => { document.getElementById('camera-container').classList.add('hidden'); });
            } else { document.getElementById('camera-container').classList.add('hidden'); }
        }

        // Adiciona item se bipado pelo código de barras
        function adicionarPorCodigoBarras(codigo) {
            const prod = produtosCache.find(p => p.codigo_barras === codigo.trim());
            if (prod) {
                adicionarAoCarrinho(prod);
            } else {
                alert(`Produto com código [${codigo}] não foi localizado no estoque.`);
            }
        }

        function adicionarDoSelect() {
            const select = document.getElementById('pdv-select-produto');
            if(!select.value) return;
            const prod = produtosCache.find(p => p.id === select.value);
            if(prod) adicionarAoCarrinho(prod);
            select.value = ''; // Reseta
        }

        // Gerenciamento Interno do Carrinho
        function adicionarAoCarrinho(produto) {
            const itemExistente = carrinho.find(item => item.id === produto.id);
            if (itemExistente) {
                itemExistente.quantidade += 1;
            } else {
                carrinho.push({ ...produto, quantidade: 1 });
            }
            renderCarrinho();
        }

        function alterarQuantidade(id, delta) {
            const item = carrinho.find(i => i.id === id);
            if (item) {
                item.quantidade += delta;
                if(item.quantidade <= 0) {
                    carrinho = carrinho.filter(i => i.id !== id);
                }
                renderCarrinho();
            }
        }

        function removerDoCarrinho(id) {
            carrinho = carrinho.filter(i => i.id !== id);
            renderCarrinho();
        }

        function renderCarrinho() {
            const tbody = document.getElementById('carrinho-corpo');
            const vazio = document.getElementById('carrinho-vazio');
            
            document.getElementById('dash-itens-carrinho').innerText = carrinho.reduce((acc, curr) => acc + curr.quantidade, 0);

            if(carrinho.length === 0) {
                tbody.innerHTML = '';
                vazio.classList.remove('hidden');
                recalcularTotais();
                return;
            }
            
            vazio.classList.add('hidden');
            tbody.innerHTML = carrinho.map(item => {
                const sub = item.preco_venda * item.quantidade;
                const cod = item.codigo_barras ? `[${item.codigo_barras}]` : '(Sem código)';
                return `
                <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td class="p-3">
                        <div class="font-bold text-slate-700">${item.nome}</div>
                        <span class="text-xs text-slate-400 font-mono">${cod}</span>
                    </td>
                    <td class="p-3">
                        <div class="flex items-center justify-center gap-1">
                            <button onclick="alterarQuantidade('${item.id}', -1)" class="bg-slate-200 text-slate-700 px-2 py-1 rounded hover:bg-slate-300 font-bold text-xs">-</button>
                            <span class="font-bold px-2 text-slate-800">${item.quantidade}</span>
                            <button onclick="alterarQuantidade('${item.id}', 1)" class="bg-slate-200 text-slate-700 px-2 py-1 rounded hover:bg-slate-300 font-bold text-xs">+</button>
                        </div>
                    </td>
                    <td class="p-3 text-right font-medium text-slate-600">R$ ${parseFloat(item.preco_venda).toFixed(2)}</td>
                    <td class="p-3 text-right font-bold text-slate-800">R$ ${sub.toFixed(2)}</td>
                    <td class="p-3 text-center">
                        <button onclick="removerDoCarrinho('${item.id}')" class="text-red-500 hover:text-red-700 text-base"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>`;
            }).join('');

            recalcularTotais();
        }

        function recalcularTotais() {
            const subtotal = carrinho.reduce((acc, item) => acc + (item.preco_venda * item.quantidade), 0);
            const desconto = parseFloat(document.getElementById('pdv-desconto').value) || 0;
            const total = Math.max(0, subtotal - desconto);

            document.getElementById('resumo-subtotal').innerText = `R$ ${subtotal.toFixed(2)}`;
            document.getElementById('resumo-desconto').innerText = `- R$ ${desconto.toFixed(2)}`;
            document.getElementById('resumo-total').innerText = `R$ ${total.toFixed(2)}`;
        }

        // SALVAR VENDA COMPLETA (Lança no PDV e espelha no Financeiro)
        async function finalizarVendaPDV() {
            if (carrinho.length === 0) return alert("Adicione ao menos um produto no carrinho para vender!");
            
            const totalFinal = Math.max(0, carrinho.reduce((acc, item) => acc + (item.preco_venda * item.quantidade), 0) - (parseFloat(document.getElementById('pdv-desconto').value) || 0));
            const clienteId = document.getElementById('pdv-cliente').value;
            const formaPagto = document.getElementById('pdv-forma-pagamento').value;
            const desconto = parseFloat(document.getElementById('pdv-desconto').value) || 0;

            if (confirm(`Deseja confirmar o recebimento e finalizar esta venda no valor de R$ ${totalFinal.toFixed(2)}?`)) {
                try {
                    // 1. Registra no módulo de Vendas (Cabeçalho do Pedido)
                    const { data: venda, error: errVenda } = await _supabase.from('vendas').insert([{
                        entidade_id: clienteId || null,
                        valor_total: totalFinal,
                        desconto: desconto,
                        forma_pagamento: formaPagto,
                        status: 'concluida'
                    }]).select().single();

                    if(errVenda) throw errVenda;

                    // 2. Registra os Itens vinculados à venda
                    const insertItens = carrinho.map(item => ({
                        venda_id: venda.id,
                        produto_id: item.id,
                        quantidade: item.quantidade,
                        preco_unitario: item.preco_venda,
                        subtotal: item.preco_venda * item.quantidade
                    }));

                    const { error: errItens } = await _supabase.from('itens_venda').insert(insertItens);
                    if(errItens) throw errItens;

                    // 3. REGISTRA NO FINANCEIRO (Como Receita Concluída)
                    const { data: fin, error: errFin } = await _supabase.from('financas').insert([{
                        entidade_id: clienteId || null,
                        descricao: `Venda PDV - Cupom #${venda.id.substring(0,8)} (${formaPagto})`,
                        valor_total: totalFinal,
                        tipo: 'receita',
                        num_parcelas: 1,
                        categoria: 'Vendas',
                        status_lancamento: 'finalizado'
                    }]).select().single();

                    if(errFin) throw errFin;

                    // 4. Cria parcela de quitação automática para não quebrar fluxo do Financeiro
                    await _supabase.from('parcelas').insert([{
                        financa_id: fin.id,
                        num_parcela: 1,
                        valor_parcela: totalFinal,
                        data_vencimento: new Date().toISOString().split('T')[0],
                        data_pagamento: new Date().toISOString().split('T')[0],
                        status: 'pago'
                    }]);

                    alert("Venda registrada e integrada ao financeiro com sucesso!");
                    carrinho = [];
                    document.getElementById('pdv-desconto').value = '0.00';
                    renderCarrinho();
                    init(); // Atualiza estoque do cache e dashboards

                } catch (error) {
                    alert("Erro no processo de venda: " + error.message);
                }
            }
        }

        // SALVAR SANGRIA DE CAIXA (Lança no Financeiro como Despesa)
        async function salvarSangria() {
            const valor = parseFloat(document.getElementById('sangria-valor').value);
            const motivo = document.getElementById('sangria-motivo').value.trim();

            if(isNaN(valor) || valor <= 0 || !motivo) {
                return alert("Por favor, preencha o valor correto e a justificativa da sangria.");
            }

            if (confirm(`Confirma a retirada/sangria física de R$ ${valor.toFixed(2)} do caixa?`)) {
                try {
                    // Registra a saída diretamente no financeiro (Tipo despesa)
                    const { data: fin, error: errFin } = await _supabase.from('financas').insert([{
                        descricao: `Sangria Caixa: ${motivo}`,
                        valor_total: valor,
                        tipo: 'despesa',
                        num_parcelas: 1,
                        categoria: 'Sangria',
                        status_lancamento: 'finalizado'
                    }]).select().single();

                    if(errFin) throw errFin;

                    // Vincula a parcela como Paga (Saída de dinheiro imediata)
                    await _supabase.from('parcelas').insert([{
                        financa_id: fin.id,
                        num_parcela: 1,
                        valor_parcela: valor,
                        data_vencimento: new Date().toISOString().split('T')[0],
                        data_pagamento: new Date().toISOString().split('T')[0],
                        status: 'pago'
                    }]);

                    alert("Sangria registrada como saída financeira!");
                    document.getElementById('sangria-valor').value = '';
                    document.getElementById('sangria-motivo').value = '';
                    
                    await loadDashboardPDV();
                    await loadHistoricoCaixa();

                } catch (error) {
                    alert("Erro ao salvar sangria: " + error.message);
                }
            }
        }

        // Atualização dos Indicadores de hoje superiores
        async function loadDashboardPDV() {
            const hoje = new Date().toISOString().split('T')[0];
            
            // Busca finanças do dia atual para vendas e sangrias
            const { data: finDia } = await _supabase.from('financas')
                .select('*')
                .gte('created_at', `${hoje}T00:00:00Z`);

            let totalVendas = 0;
            let totalSangrias = 0;

            if(finDia) {
                finDia.forEach(f => {
                    if (f.categoria === 'Vendas' && f.tipo === 'receita') totalVendas += parseFloat(f.valor_total || 0);
                    if (f.categoria === 'Sangria' && f.tipo === 'despesa') totalSangrias += parseFloat(f.valor_total || 0);
                });
            }

            document.getElementById('dash-vendas-hoje').innerText = `R$ ${totalVendas.toFixed(2)}`;
            document.getElementById('dash-sangrias-hoje').innerText = `R$ ${totalSangrias.toFixed(2)}`;
        }

        // Carrega o histórico da tabela de fluxo na aba 2
        async function loadHistoricoCaixa() {
            const hoje = new Date().toISOString().split('T')[0];
            const { data } = await _supabase.from('financas')
                .select('*')
                .or("categoria.eq.Vendas,categoria.eq.Sangria")
                .gte('created_at', `${hoje}T00:00:00Z`)
                .order('created_at', { ascending: false });

            const tbody = document.getElementById('lista-fluxo-caixa');
            if(!data || data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="p-4 text-center text-slate-400">Nenhuma transação efetuada hoje.</td></tr>';
                return;
            }

            tbody.innerHTML = data.map(f => {
                const hora = new Date(f.created_at).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
                const statusClass = f.tipo === 'receita' ? 'status-receita' : 'status-despesa';
                const statusTxt = f.tipo === 'receita' ? 'ENTRADA' : 'SANGRIA / SAÍDA';
                const corValor = f.tipo === 'receita' ? 'text-emerald-600' : 'text-red-600';

                return `
                <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td class="p-3 font-medium text-slate-500">${hora}</td>
                    <td class="p-3 font-bold text-slate-700">${f.descricao}</td>
                    <td class="p-3 text-slate-500">${f.categoria}</td>
                    <td class="p-3 text-center"><span class="${statusClass}">${statusTxt}</span></td>
                    <td class="p-3 text-right font-extrabold ${corValor}">R$ ${parseFloat(f.valor_total).toFixed(2)}</td>
                </tr>`;
            }).join('');
        }
    </script>
</body>
</html>
```



🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# produtos
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Controle de Estoque e Produtos - ERP ABP</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
    <script src="constantes.js"></script>
    
    <style>
        :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; }
        body { font-family: 'Inter', sans-serif; background: var(--bg); }
        .card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        
        /* Mantendo os mesmos estilos visuais de status para o Estoque */
        .status-pago { background: #d1fae5; color: #065f46; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 12px; }
        .status-pendente { background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 12px; }
        .status-atrasado { background: #fee2e2; color: #991b1b; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 12px; animation: pulse 2s infinite; }
        
        .highlight-parcelas { border: 2px solid #3b82f6 !important; background-color: #eff6ff !important; box-shadow: 0 0 10px rgba(59, 130, 246, 0.2); }
        .highlight-label { color: #1d4ed8; font-weight: 900; }

        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        
        label { font-size: 13px; font-weight: bold; color: #475569; margin-bottom: 4px; display: block; }
        input[type="text"], input[type="number"], input[type="date"], input[type="email"], input[type="password"], select, textarea { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; }
        input[type="checkbox"] { width: auto; transform: scale(1.2); cursor: pointer; }
        
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

        .drop-zone { border: 2px dashed #cbd5e1; border-radius: 6px; padding: 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; background-color: #f8fafc; }
        .drop-zone:hover { background-color: #f1f5f9; border-color: #94a3b8; }
        .drop-zone.dragover { border-color: #3ecf8e; background-color: #ecfdf5; }
    </style>
</head>
<body>

    <div id="tela-login" class="hidden min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full mx-4 border-t-4 border-emerald-500">
            <div class="text-center mb-8">
                <i class="fas fa-boxes text-5xl text-emerald-500 mb-3"></i>
                <h2 class="text-2xl font-bold text-slate-800">ERP Estoque</h2>
                <p class="text-slate-500 text-sm mt-1">Faça login para acessar os Produtos</p>
            </div>
            
            <div class="space-y-4">
                <div>
                    <label class="text-sm font-bold text-slate-700">E-mail</label>
                    <input type="email" id="login-email" placeholder="seu@email.com" onkeyup="if(event.key === 'Enter') document.getElementById('login-senha').focus()">
                </div>
                <div>
                    <label class="text-sm font-bold text-slate-700">Senha</label>
                    <input type="password" id="login-senha" placeholder="••••••••" onkeyup="if(event.key === 'Enter') fazerLogin()">
                </div>
                <button id="btn-login" onclick="fazerLogin()" class="w-full bg-emerald-500 text-white font-bold py-3 rounded hover:bg-emerald-600 transition shadow-lg mt-2">
                    Entrar no Sistema
                </button>
            </div>
        </div>
    </div>

    <div id="tela-sistema" class="hidden">
        
        <nav class="bg-white p-4 shadow-md flex justify-between items-center fixed top-0 left-0 w-full z-40">
            <div class="flex items-center gap-4">
                <button onclick="abrirMenu()" class="text-slate-600 hover:text-emerald-500 text-2xl focus:outline-none px-2">
                    <i class="fas fa-bars"></i>
                </button>
                <h1 class="font-bold text-xl text-slate-800 hidden sm:block"><i class="fas fa-boxes text-emerald-500"></i> Produtos e Estoque ERP ABP</h1>
            </div>
            <button onclick="sairDaConta()" class="text-slate-500 hover:text-red-500 transition font-bold text-sm flex items-center gap-2">
                <span class="hidden sm:inline">Sair</span> <i class="fas fa-sign-out-alt"></i>
            </button>
        </nav>

        <div id="sidebar-menu" class="fixed inset-y-0 left-0 w-64 bg-slate-800 text-white transform -translate-x-full transition-transform duration-300 z-50 shadow-2xl">
            <div class="p-6 border-b border-slate-700 flex justify-between items-center">
                <h2 class="text-xl font-bold"><i class="fas fa-boxes text-emerald-500"></i> Menu</h2>
                <button onclick="fecharMenu()" class="text-slate-400 hover:text-white focus:outline-none"><i class="fas fa-times text-2xl"></i></button>
            </div>
            <ul class="p-4 space-y-2 font-medium">
                <li><a href="#" onclick="alternarAba('listagem'); fecharMenu();" class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-list w-6"></i> Lista de Produtos</a></li>
                <li><a href="#" onclick="alternarAba('formulario'); fecharMenu();" class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-plus-circle w-6"></i> Cadastrar Produto</a></li>
                
                     <!-- Nova Seção: Outras Páginas do ERP -->
                <span class="text-xs text-slate-500 uppercase tracking-wider block pl-3 pt-4">Módulos</span>
                <li><a href="financeiro.html"class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-cash-register w-6"></i> Financeiro</a></li>
                <li><a href="pdv.html"       class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-cash-register w-6"></i> PDV Frente de Caixa</a></li>
                <li><a href="produtos.html"  class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-chart-pie w-6"></i> Estoque </a></li>
                <li><a href="clientes.html"  class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-users w-6"></i> Clientes / Entidades</a></li>
                
                <li><hr class="border-slate-700 my-4"></li>
                <li><a href="#" onclick="sairDaConta()" class="block p-3 text-red-400 rounded hover:bg-slate-700 transition"><i class="fas fa-sign-out-alt w-6"></i> Sair do Sistema</a></li>
            </ul>
        </div>
        <div id="menu-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden" onclick="fecharMenu()"></div>

        <div class="container mx-auto px-4 pb-10 pt-24">
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div class="card border-l-4 border-emerald-500">
                    <p class="text-gray-500 text-sm">Produtos Cadastrados</p>
                    <h2 id="dash-total-produtos" class="text-2xl font-bold text-emerald-600">0</h2>
                </div>
                <div class="card border-l-4 border-amber-500">
                    <p class="text-gray-500 text-sm">Alertas de Estoque Baixo</p>
                    <h2 id="dash-estoque-baixo" class="text-2xl font-bold text-amber-600">0</h2>
                </div>
                <div class="card border-l-4 border-blue-500">
                    <p class="text-gray-500 text-sm">Total de Itens em Estoque</p>
                    <h2 id="dash-total-itens" class="text-2xl font-bold text-blue-600">0</h2>
                </div>
            </div>

            <div class="flex gap-4 mb-6">
                <button onclick="alternarAba('listagem')" id="btn-aba-listagem" class="flex-1 bg-emerald-500 text-white hover:bg-emerald-600 font-bold py-3 rounded transition shadow">
                    <i class="fas fa-list"></i> Ver Produtos
                </button>
                <button onclick="alternarAba('formulario')" id="btn-aba-formulario" class="flex-1 bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold py-3 rounded transition shadow">
                    <i class="fas fa-plus-circle"></i> Novo Produto
                </button>
            </div>

            <div class="card mb-8 hidden" id="aba-formulario">
                <h3 class="font-bold text-lg mb-4 border-b pb-2 text-slate-800"><i class="fas fa-plus-circle"></i> Informações do Produto</h3>
                
                <input type="hidden" id="f-editando-id">

                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div class="md:col-span-2">
                        <label>Nome do Produto *</label>
                        <input type="text" id="f-nome" placeholder="Ex: Camiseta Polo Preta G">
                    </div>
                    
                    <div>
                        <label>Categoria</label>
                        <input type="text" id="f-categoria" list="lista-categorias" placeholder="Digite ou escolha..." value="Geral">
                        <datalist id="lista-categorias"></datalist>
                    </div>

                    <div class="p-2 rounded highlight-parcelas">
                        <label class="highlight-label"><i class="fas fa-exclamation-triangle"></i> Estoque Mínimo *</label>
                        <input type="number" id="f-estoque-minimo" value="5" min="0" class="border-blue-300 font-bold text-blue-700">
                    </div>

                    <div>
                        <label>Preço de Custo (R$)</label>
                        <input type="number" id="f-custo" step="0.01" placeholder="0.00" value="0.00">
                    </div>
                    
                    <div>
                        <label>Preço de Venda (R$) *</label>
                        <input type="number" id="f-venda" step="0.01" placeholder="0.00">
                    </div>

                    <div>
                        <label>Quantidade Atual em Estoque *</label>
                        <input type="number" id="f-quantidade" value="0" min="0">
                    </div>

                    <div class="md:col-span-2">
                        <label>Descrição Opcional</label>
                        <input type="text" id="f-descricao" placeholder="Detalhes, tamanho, marca...">
                    </div>

                    <div class="md:col-span-4">
                        <label><i class="fas fa-barcode"></i> Código de Barras / SKU</label>
                        <div class="flex gap-2">
                            <input type="text" id="f-barras" placeholder="Cole ou leia o código de barras do produto" class="flex-1">
                            <button onclick="iniciarLeituraCamera()" type="button" class="bg-slate-800 text-white px-4 rounded hover:bg-slate-700 transition flex items-center gap-2">
                                <i class="fas fa-camera"></i> Ler Código
                            </button>
                        </div>
                        
                        <div id="camera-container" class="hidden mt-3 relative border-2 border-dashed border-slate-300 p-2 rounded bg-slate-50">
                            <div id="camera-preview" class="w-full max-w-sm mx-auto overflow-hidden rounded"></div>
                            <button onclick="pararCamera()" type="button" class="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex justify-center items-center hover:bg-red-600 shadow-lg z-10">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>

                    <div class="md:col-span-4">
                        <label><i class="fas fa-image"></i> Foto do Produto</label>
                        <div class="drop-zone" id="drop-foto" onclick="document.getElementById('f-foto').click()">
                            <i class="fas fa-cloud-upload-alt text-2xl text-slate-400 mb-2"></i>
                            <p class="text-xs text-slate-500">Clique ou arraste a imagem do produto aqui</p>
                            <input type="file" id="f-foto" accept="image/*" class="hidden" onchange="mostrarNomeArquivo(this, 'nome-foto')">
                            <p id="nome-foto" class="text-[11px] font-bold text-emerald-600 mt-2 truncate"></p>
                        </div>
                    </div>
                </div>
                
                <div class="flex gap-4 mt-6">
                    <button onclick="salvarProdutoCompleto()" id="btn-salvar" class="flex-1 bg-emerald-500 text-white font-bold py-3 rounded hover:bg-emerald-600 transition shadow-lg">
                        <i class="fas fa-save"></i> Gravar Produto
                    </button>
                    <button onclick="cancelarEdicao()" id="btn-cancelar" class="hidden bg-slate-500 text-white font-bold py-3 px-6 rounded hover:bg-slate-600 transition shadow-lg">
                        Cancelar
                    </button>
                </div>
            </div>

            <div class="card" id="aba-listagem">
                <div class="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 class="font-bold text-slate-800"><i class="fas fa-list"></i> Itens em Estoque</h3>
                    <button onclick="excluirSelecionados()" class="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition text-sm">
                        <i class="fas fa-trash"></i> Excluir Selecionados
                    </button>
                </div>

                <div class="bg-slate-50 p-4 rounded mb-4 flex flex-wrap gap-4 items-end border border-slate-200">
                    <div class="flex-1 min-w-[200px]">
                        <label class="text-xs">Pesquisar Nome ou Código</label>
                        <input type="text" id="filtro-busca" placeholder="Ex: Camiseta, Código..." onkeyup="if(event.key === 'Enter') loadProdutos()">
                    </div>
                    <div>
                        <label class="text-xs">Filtrar Categoria</label>
                        <select id="filtro-categoria" onchange="loadProdutos()">
                            <option value="">Todas</option>
                        </select>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="loadProdutos()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow transition">
                            <i class="fas fa-search"></i> Filtrar
                        </button>
                        <button onclick="limparFiltros()" class="bg-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-400 transition">
                            Limpar
                        </button>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-100 text-slate-600 text-xs uppercase border-b-2 border-slate-200">
                                <th class="p-3 w-10 text-center"><input type="checkbox" id="check-all" onclick="toggleTodosChecks(this)"></th>
                                <th class="p-3">Foto / Código</th>
                                <th class="p-3">Produto / Categoria</th>
                                <th class="p-3">Preço Custo</th>
                                <th class="p-3">Preço Venda</th>
                                <th class="p-3 text-center">Estoque Atual</th>
                                <th class="p-3 text-center">Status</th>
                                <th class="p-3 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="lista-produtos" class="text-sm"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div> 

    <script>
        // Configuração do Supabase (Mesma do Original)
        const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

        let html5QrCode = null;

        function abrirMenu() {
            document.getElementById('sidebar-menu').classList.remove('-translate-x-full');
            document.getElementById('menu-overlay').classList.remove('hidden');
        }

        function fecharMenu() {
            document.getElementById('sidebar-menu').classList.add('-translate-x-full');
            document.getElementById('menu-overlay').classList.add('hidden');
        }

        function alternarAba(abaAtiva) {
            const form = document.getElementById('aba-formulario');
            const lista = document.getElementById('aba-listagem');
            const btnForm = document.getElementById('btn-aba-formulario');
            const btnLista = document.getElementById('btn-aba-listagem');

            const classesVerde = ['bg-emerald-500', 'text-white', 'hover:bg-emerald-600'];
            const classesCinza = ['bg-slate-200', 'text-slate-700', 'hover:bg-slate-300'];

            btnForm.classList.remove(...classesVerde, ...classesCinza);
            btnLista.classList.remove(...classesVerde, ...classesCinza);

            if (abaAtiva === 'formulario') {
                form.classList.remove('hidden');
                lista.classList.add('hidden');
                btnForm.classList.add(...classesVerde);
                btnLista.classList.add(...classesCinza);
            } else {
                form.classList.add('hidden');
                lista.classList.remove('hidden');
                btnLista.classList.add(...classesVerde);
                btnForm.classList.add(...classesCinza);
            }
        }

        async function verificar_login() {
            const { data: { session } } = await _supabase.auth.getSession();
            const telaLogin = document.getElementById('tela-login');
            const telaSistema = document.getElementById('tela-sistema');

            if (!session) {
                telaLogin.classList.remove('hidden');
                telaLogin.classList.add('flex');
                telaSistema.classList.add('hidden');
            } else {
                telaLogin.classList.add('hidden');
                telaLogin.classList.remove('flex');
                telaSistema.classList.remove('hidden');
                init(); 
            }
        }

        async function fazerLogin() {
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;
            const btn = document.getElementById('btn-login');
            
            if(!email || !senha) return alert("Por favor, preencha e-mail e senha.");

            btn.innerText = 'Autenticando...';
            btn.disabled = true;

            const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
            
            if (error) {
                alert("Erro ao fazer login: Verifique seu e-mail e senha.");
                btn.innerText = 'Entrar no Sistema';
                btn.disabled = false;
            } else {
                document.getElementById('login-email').value = '';
                document.getElementById('login-senha').value = '';
                btn.innerText = 'Entrar no Sistema';
                btn.disabled = false;
                verificar_login(); 
            }
        }

        async function sairDaConta() {
            await _supabase.auth.signOut();
            document.getElementById('lista-produtos').innerHTML = '';
            fecharMenu();
            verificar_login();
        }

        document.addEventListener('DOMContentLoaded', () => {
            verificar_login();
            configurarDropZone('drop-foto', 'f-foto', 'nome-foto');
        });

        async function init() {
            loadCategoriasUnicas();
            loadDashboard();
            loadProdutos();
        }

        function configurarDropZone(dropId, inputId, txtId) {
            const dropZone = document.getElementById(dropId);
            const inputElement = document.getElementById(inputId);

            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('dragover');
            });

            dropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
                
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    inputElement.files = e.dataTransfer.files;
                    mostrarNomeArquivo(inputElement, txtId);
                }
            });
        }

        function mostrarNomeArquivo(input, idCampoTexto) {
            const campoTexto = document.getElementById(idCampoTexto);
            if (input.files && input.files.length > 0) {
                campoTexto.innerHTML = `<i class="fas fa-check"></i> ${input.files[0].name}`;
            } else {
                campoTexto.innerHTML = '';
            }
        }

        async function loadCategoriasUnicas() {
            const { data } = await _supabase.from('produtos').select('categoria');
            if (!data) return;
            
            const categorias = [...new Set(data.map(item => item.categoria).filter(c => c))];
            
            const datalist = document.getElementById('lista-categorias');
            const selectFiltro = document.getElementById('filtro-categoria');
            
            datalist.innerHTML = '';
            selectFiltro.innerHTML = '<option value="">Todas</option>';
            
            categorias.forEach(cat => {
                datalist.innerHTML += `<option value="${cat}">`;
                selectFiltro.innerHTML += `<option value="${cat}">${cat}</option>`;
            });
        }

        // Câmera do Leitor (Código intacto e adaptado ao campo f-barras)
        function iniciarLeituraCamera() {
            const container = document.getElementById('camera-container');
            container.classList.remove('hidden');
            html5QrCode = new Html5Qrcode("camera-preview");
            const config = { fps: 10, qrbox: { width: 300, height: 150 } };
            html5QrCode.start({ facingMode: "environment" }, config, (decodedText) => {
                document.getElementById('f-barras').value = decodedText;
                pararCamera();
            }).catch(() => { alert("Verifique as permissões da câmera."); container.classList.add('hidden'); });
        }

        function pararCamera() {
            if (html5QrCode) {
                html5QrCode.stop().then(() => { document.getElementById('camera-container').classList.add('hidden'); });
            } else { document.getElementById('camera-container').classList.add('hidden'); }
        }

        // Atualização do Dashboard de Estoque
        async function loadDashboard() {
            const { data: produtos } = await _supabase.from('produtos').select('*');
            if(!produtos) return;
            
            let totalCadastrados = produtos.length;
            let estoqueBaixo = 0;
            let totalItens = 0;

            produtos.forEach(p => {
                let estoque = parseInt(p.quantidade_estoque || 0);
                let minimo = parseInt(p.estoque_minimo || 0);
                totalItens += estoque;
                if(estoque <= minimo) estoqueBaixo++;
            });

            document.getElementById('dash-total-produtos').innerText = totalCadastrados;
            document.getElementById('dash-estoque-baixo').innerText = estoqueBaixo;
            document.getElementById('dash-total-itens').innerText = totalItens;
        }

        // Gravar/Atualizar Produto
        async function salvarProdutoCompleto() {
            const btn = document.getElementById('btn-salvar');
            btn.disabled = true; btn.innerText = 'Salvando...';

            try {
                const nome = document.getElementById('f-nome').value;
                const categoria = document.getElementById('f-categoria').value || 'Geral';
                const estoqueMinimo = parseInt(document.getElementById('f-estoque-minimo').value) || 0;
                const precoCusto = parseFloat(document.getElementById('f-custo').value) || 0;
                const precoVenda = parseFloat(document.getElementById('f-venda').value);
                const quantidade = parseInt(document.getElementById('f-quantidade').value) || 0;
                const descricao = document.getElementById('f-descricao').value;
                const barras = document.getElementById('f-barras').value;
                const fileFoto = document.getElementById('f-foto').files[0];
                const editandoId = document.getElementById('f-editando-id').value;

                if(!nome || isNaN(precoVenda)) throw new Error("Preencha o Nome e o Preço de Venda do produto!");

                let fotoUrl = null;
                if (fileFoto) {
                    const fileName = `prod_${Date.now()}_${fileFoto.name}`;
                    const { error } = await _supabase.storage.from('comprovantes').upload(`public/${fileName}`, fileFoto);
                    if(!error) fotoUrl = _supabase.storage.from('comprovantes').getPublicUrl(`public/${fileName}`).data.publicUrl;
                }

                const dadosProduto = {
                    nome, categoria, estoque_minimo: estoqueMinimo, preco_custo: precoCusto,
                    preco_venda: precoVenda, quantidade_estoque: quantidade, descricao, codigo_barras: barras || null
                };

                if (fotoUrl) dadosProduto.foto_url = fotoUrl;

                if (editandoId) {
                    const { error } = await _supabase.from('produtos').update(dadosProduto).eq('id', editandoId);
                    if (error) throw error;
                    alert("Produto atualizado com sucesso!");
                } else {
                    const { error } = await _supabase.from('produtos').insert([dadosProduto]);
                    if (error) throw error;
                    alert("Produto cadastrado com sucesso!");
                }
                
                cancelarEdicao();
                loadProdutos();
                loadDashboard();
                alternarAba('listagem');
            } catch (error) {
                alert(error.message);
            } finally {
                btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Gravar Produto';
            }
        }

        function limparFiltros() {
            document.getElementById('filtro-busca').value = '';
            document.getElementById('filtro-categoria').value = '';
            loadProdutos();
        }

        // Renderizar a Tabela com Status Dinâmico de Estoque
        async function loadProdutos() {
            const busca = document.getElementById('filtro-busca').value;
            const categoria = document.getElementById('filtro-categoria').value;

            let query = _supabase.from('produtos').select('*').order('nome', { ascending: true });

            if (busca) {
                // Filtra por nome ou pelo código de barras lido
                query = query.or(`nome.ilike.%${busca}%,codigo_barras.ilike.%${busca}%`);
            }
            if (categoria) query = query.eq('categoria', categoria);

            const { data, error } = await query;
            if (error) return;
            
            const tbody = document.getElementById('lista-produtos');

            tbody.innerHTML = data.map(p => {
                let estoque = parseInt(p.quantidade_estoque || 0);
                let minimo = parseInt(p.estoque_minimo || 0);
                
                let statusClass = 'status-pago';
                let statusTxt = 'EM ESTOQUE';
                
                if (estoque === 0) {
                    statusClass = 'status-atrasado';
                    statusTxt = 'ZERADO';
                } else if (estoque <= minimo) {
                    statusClass = 'status-pendente';
                    statusTxt = 'ESTOQUE BAIXO';
                }

                const imgHtml = p.foto_url ? `<img src="${p.foto_url}" class="w-10 h-10 object-cover rounded shadow-sm inline-block mr-2">` : `<div class="w-10 h-10 bg-slate-200 rounded flex items-center justify-center text-slate-400 inline-block mr-2 text-xs"><i class="fas fa-box"></i></div>`;
                const codBarras = p.codigo_barras ? `<span class="text-xs font-mono text-slate-400 block"><i class="fas fa-barcode"></i> ${p.codigo_barras}</span>` : '<span class="text-xs text-slate-300 block">Sem código</span>';

                return `
                <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td class="p-3 text-center">
                        <input type="checkbox" class="check-parcela" value="${p.id}">
                    </td>
                    <td class="p-3 flex items-center">
                        ${imgHtml}
                        <div>${codBarras}</div>
                    </td>
                    <td class="p-3">
                        <div class="font-bold text-slate-700">${p.nome}</div>
                        <span class="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">${p.categoria || 'Geral'}</span>
                    </td>
                    <td class="p-3 font-bold text-slate-600">R$ ${parseFloat(p.preco_custo || 0).toFixed(2)}</td>
                    <td class="p-3 font-bold text-emerald-600">R$ ${parseFloat(p.preco_venda || 0).toFixed(2)}</td>
                    <td class="p-3 font-bold text-center text-slate-700">${estoque} <span class="text-xs text-slate-400 font-normal block">mín: ${minimo}</span></td>
                    <td class="p-3 text-center"><span class="${statusClass}">${statusTxt}</span></td>
                    <td class="p-3 text-center">
                        <button onclick="prepararEdicao('${p.id}')" class="bg-blue-100 text-blue-600 px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition text-sm">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                    </td>
                </tr>`;
            }).join('');
        }

        async function prepararEdicao(id) {
            const { data: p } = await _supabase.from('produtos').select('*').eq('id', id).single();
            if (p) {
                document.getElementById('f-editando-id').value = p.id;
                document.getElementById('f-nome').value = p.nome;
                document.getElementById('f-categoria').value = p.categoria || 'Geral';
                document.getElementById('f-estoque-minimo').value = p.estoque_minimo;
                document.getElementById('f-custo').value = p.preco_custo;
                document.getElementById('f-venda').value = p.preco_venda;
                document.getElementById('f-quantidade').value = p.quantidade_estoque;
                document.getElementById('f-descricao').value = p.descricao || '';
                document.getElementById('f-barras').value = p.codigo_barras || '';
                
                document.getElementById('btn-salvar').innerHTML = '<i class="fas fa-sync-alt"></i> Atualizar Produto';
                document.getElementById('btn-cancelar').classList.remove('hidden');
                
                alternarAba('formulario');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        function cancelarEdicao() {
            document.getElementById('f-editando-id').value = '';
            document.getElementById('btn-salvar').innerHTML = '<i class="fas fa-save"></i> Gravar Produto';
            document.getElementById('btn-cancelar').classList.add('hidden');
            
            document.getElementById('f-nome').value = '';
            document.getElementById('f-categoria').value = 'Geral';
            document.getElementById('f-estoque-minimo').value = '5';
            document.getElementById('f-custo').value = '0.00';
            document.getElementById('f-venda').value = '';
            document.getElementById('f-quantidade').value = '0';
            document.getElementById('f-descricao').value = '';
            document.getElementById('f-barras').value = '';
            document.getElementById('f-foto').value = '';
            document.getElementById('nome-foto').innerHTML = '';
        }

        function toggleTodosChecks(source) {
            const checkboxes = document.querySelectorAll('.check-parcela');
            checkboxes.forEach(cb => cb.checked = source.checked);
        }

        async function excluirSelecionados() {
            const selecionados = Array.from(document.querySelectorAll('.check-parcela:checked')).map(cb => cb.value);
            if (selecionados.length === 0) return alert("Selecione ao menos um produto para excluir.");

            if (confirm(`Atenção: Deseja realmente excluir ${selecionados.length} produto(s)?`)) {
                const { error } = await _supabase.from('produtos').delete().in('id', selecionados);
                if (!error) {
                    alert('Excluído com sucesso!');
                    loadProdutos();
                    loadDashboard();
                } else {
                    alert('Erro ao excluir: ' + error.message);
                }
            }
        }
    </script>
</body>
</html>
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# entidades
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Controle de Entidades - ERP ABP</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="constantes.js"></script>
    
    <style>
        :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; }
        body { font-family: 'Inter', sans-serif; background: var(--bg); }
        .card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        
        .status-ativo { background: #d1fae5; color: #065f46; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 12px; }
        .status-inativo { background: #fee2e2; color: #991b1b; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 12px; }
        
        label { font-size: 13px; font-weight: bold; color: #475569; margin-bottom: 4px; display: block; }
        input[type="text"], input[type="number"], input[type="date"], input[type="email"], input[type="password"], select { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; }
        input[type="checkbox"] { width: auto; transform: scale(1.2); cursor: pointer; }
        
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

        /* ADICIONADO: Estilos da zona de Drop idênticos ao do financeiro */
        .drop-zone { border: 2px dashed #cbd5e1; border-radius: 6px; padding: 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; background-color: #f8fafc; }
        .drop-zone:hover { background-color: #f1f5f9; border-color: #94a3b8; }
        .drop-zone.dragover { border-color: #3ecf8e; background-color: #ecfdf5; }
    </style>
</head>
<body>

    <div id="tela-login" class="hidden min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full mx-4 border-t-4 border-emerald-500">
            <div class="text-center mb-8">
                <i class="fas fa-users text-5xl text-emerald-500 mb-3"></i>
                <h2 class="text-2xl font-bold text-slate-800">ERP Entidades</h2>
                <p class="text-slate-500 text-sm mt-1">Faça login para acessar o cadastro</p>
            </div>
            <div class="space-y-4">
                <div>
                    <label class="text-sm font-bold text-slate-700">E-mail</label>
                    <input type="email" id="login-email" placeholder="seu@email.com" onkeyup="if(event.key === 'Enter') document.getElementById('login-senha').focus()">
                </div>
                <div>
                    <label class="text-sm font-bold text-slate-700">Senha</label>
                    <input type="password" id="login-senha" placeholder="••••••••" onkeyup="if(event.key === 'Enter') fazerLogin()">
                </div>
                <button id="btn-login" onclick="fazerLogin()" class="w-full bg-emerald-500 text-white font-bold py-3 rounded hover:bg-emerald-600 transition shadow-lg mt-2">
                    Entrar no Sistema
                </button>
            </div>
        </div>
    </div>

    <div id="tela-sistema" class="hidden">
        
        <nav class="bg-white p-4 shadow-md flex justify-between items-center fixed top-0 left-0 w-full z-40">
            <div class="flex items-center gap-4">
                <button onclick="abrirMenu()" class="text-slate-600 hover:text-emerald-500 text-2xl focus:outline-none px-2">
                    <i class="fas fa-bars"></i>
                </button>
                <h1 class="font-bold text-xl text-slate-800 hidden sm:block"><i class="fas fa-users text-emerald-500"></i> Controle de Entidades</h1>
            </div>
            <button onclick="sairDaConta()" class="text-slate-500 hover:text-red-500 transition font-bold text-sm flex items-center gap-2">
                <span class="hidden sm:inline">Sair</span> <i class="fas fa-sign-out-alt"></i>
            </button>
        </nav>

        <div id="sidebar-menu" class="fixed inset-y-0 left-0 w-64 bg-slate-800 text-white transform -translate-x-full transition-transform duration-300 z-50 shadow-2xl">
            <div class="p-6 border-b border-slate-700 flex justify-between items-center">
                <h2 class="text-xl font-bold"><i class="fas fa-bars text-emerald-500"></i> Menu</h2>
                <button onclick="fecharMenu()" class="text-slate-400 hover:text-white focus:outline-none"><i class="fas fa-times text-2xl"></i></button>
            </div>
            <ul class="p-4 space-y-2 font-medium">
                <li><a href="#" onclick="alternarAba('listagem'); fecharMenu();" class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-list w-6"></i> Ver Entidades</a></li>
                <li><a href="#" onclick="alternarAba('formulario'); fecharMenu();" class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-plus-circle w-6"></i> Nova Entidade</a></li>
                
                <span class="text-xs text-slate-500 uppercase tracking-wider block pl-3 pt-4">Módulos</span>
                <li><a href="financeiro.html" class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-wallet w-6"></i> Financeiro</a></li>
                <li><a href="pdv.html" class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-cash-register w-6"></i> PDV Frente de Caixa</a></li>
                <li><a href="produtos.html" class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-boxes w-6"></i> Estoque</a></li>
                <li><a href="entidades.html" class="block p-3 bg-slate-700 rounded transition"><i class="fas fa-users w-6"></i> Entidades</a></li>
                
                <li><hr class="border-slate-700 my-4"></li>
                <li><a href="#" onclick="sairDaConta()" class="block p-3 text-red-400 rounded hover:bg-slate-700 transition"><i class="fas fa-sign-out-alt w-6"></i> Sair do Sistema</a></li>
            </ul>
        </div>
        <div id="menu-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden" onclick="fecharMenu()"></div>

        <div class="container mx-auto px-4 pb-10 pt-24">
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div class="card border-l-4 border-emerald-500">
                    <p class="text-gray-500 text-sm">Total de Clientes</p>
                    <h2 id="dash-clientes" class="text-2xl font-bold text-emerald-600">0</h2>
                </div>
                <div class="card border-l-4 border-blue-500">
                    <p class="text-gray-500 text-sm">Total de Fornecedores</p>
                    <h2 id="dash-fornecedores" class="text-2xl font-bold text-blue-600">0</h2>
                </div>
                <div class="card border-l-4 border-amber-500">
                    <p class="text-gray-500 text-sm">Entidades Inativas</p>
                    <h2 id="dash-inativos" class="text-2xl font-bold text-amber-600">0</h2>
                </div>
            </div>

            <div class="flex gap-4 mb-6">
                <button onclick="alternarAba('listagem')" id="btn-aba-listagem" class="flex-1 bg-emerald-500 text-white hover:bg-emerald-600 font-bold py-3 rounded transition shadow">
                    <i class="fas fa-list"></i> Ver Entidades
                </button>
                <button onclick="alternarAba('formulario')" id="btn-aba-formulario" class="flex-1 bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold py-3 rounded transition shadow">
                    <i class="fas fa-plus-circle"></i> Nova Entidade
                </button>
            </div>

            <div class="card mb-8 hidden" id="aba-formulario">
                <h3 class="font-bold text-lg mb-4 border-b pb-2 text-slate-800"><i class="fas fa-user-plus"></i> Cadastro de Entidade</h3>
                
                <input type="hidden" id="f-editando-id">

                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="md:col-span-2">
                        <label>Nome Completo / Razão Social *</label>
                        <input type="text" id="f-nome" placeholder="Ex: João da Silva ou Empresa LTDA">
                    </div>
                    <div>
                        <label>CPF / CNPJ</label>
                        <input type="text" id="f-cpf" placeholder="000.000.000-00">
                    </div>
                    <div>
                        <label>Data de Nascimento</label>
                        <input type="date" id="f-nascimento">
                    </div>

                    <div>
                        <label>E-mail</label>
                        <input type="email" id="f-email" placeholder="exemplo@email.com">
                    </div>
                    <div>
                        <label>Telefone</label>
                        <input type="text" id="f-telefone" placeholder="(00) 00000-0000">
                    </div>
                    <div>
                        <label>Tipo de Entidade</label>
                        <select id="f-tipo-entidade">
                            <option value="cliente">Cliente</option>
                            <option value="fornecedor">Fornecedor</option>
                            <option value="colaborador">Colaborador</option>
                        </select>
                    </div>
                    <div>
                        <label>Status</label>
                        <select id="f-status">
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                        </select>
                    </div>

                    <div>
                        <label>CEP</label>
                        <input type="text" id="f-cep" placeholder="00000-000" onblur="buscarCEP(this.value)">
                    </div>
                    <div class="md:col-span-2">
                        <label>Logradouro (Rua/Avenida)</label>
                        <input type="text" id="f-logradouro" placeholder="Rua das Flores">
                    </div>
                    <div>
                        <label>Número</label>
                        <input type="text" id="f-numero" placeholder="123">
                    </div>

                    <div>
                        <label>Bairro</label>
                        <input type="text" id="f-bairro" placeholder="Centro">
                    </div>
                    <div class="md:col-span-2">
                        <label>Cidade</label>
                        <input type="text" id="f-cidade" placeholder="Sua Cidade">
                    </div>
                    <div>
                        <label>Estado (UF)</label>
                        <input type="text" id="f-estado" placeholder="SP" maxlength="2">
                    </div>
                    
                    <div class="md:col-span-4">
                        <label><i class="fas fa-image"></i> Foto de Perfil</label>
                        <div class="drop-zone" id="drop-foto" onclick="document.getElementById('f-foto').click()">
                            <i class="fas fa-cloud-upload-alt text-2xl text-slate-400 mb-2"></i>
                            <p class="text-xs text-slate-500">Clique ou arraste a imagem de perfil aqui</p>
                            <input type="file" id="f-foto" accept="image/*" class="hidden" onchange="mostrarNomeArquivo(this, 'nome-foto')">
                            <p id="nome-foto" class="text-[11px] font-bold text-emerald-600 mt-2 truncate"></p>
                        </div>
                    </div>
                </div>
                
                <div class="flex gap-4 mt-6">
                    <button onclick="salvarEntidade()" id="btn-salvar" class="flex-1 bg-emerald-500 text-white font-bold py-3 rounded hover:bg-emerald-600 transition shadow-lg">
                        <i class="fas fa-save"></i> Gravar Registro
                    </button>
                    <button onclick="cancelarEdicao()" id="btn-cancelar" class="hidden bg-slate-500 text-white font-bold py-3 px-6 rounded hover:bg-slate-600 transition shadow-lg">
                        Cancelar
                    </button>
                </div>
            </div>

            <div class="card" id="aba-listagem">
                <div class="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 class="font-bold text-slate-800"><i class="fas fa-users"></i> Entidades Cadastradas</h3>
                    <button onclick="excluirSelecionados()" class="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition text-sm">
                        <i class="fas fa-trash"></i> Excluir Selecionados
                    </button>
                </div>

                <div class="bg-slate-50 p-4 rounded mb-4 flex flex-wrap gap-4 items-end border border-slate-200">
                    <div class="flex-1 min-w-[250px]">
                        <label class="text-xs">Buscar por Nome</label>
                        <input type="text" id="filtro-busca" placeholder="Digite o nome..." onkeyup="if(event.key === 'Enter') loadEntidades()">
                    </div>
                    <div>
                        <label class="text-xs">Filtrar por Perfil</label>
                        <select id="filtro-tipo" onchange="loadEntidades()">
                            <option value="">Todos os Tipos</option>
                            <option value="cliente">Cliente</option>
                            <option value="fornecedor">Fornecedor</option>
                            <option value="colaborador">Colaborador</option>
                        </select>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="loadEntidades()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow transition">
                            <i class="fas fa-search"></i> Filtrar
                        </button>
                        <button onclick="limparFiltros()" class="bg-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-400 transition">
                            Limpar
                        </button>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-100 text-slate-600 text-xs uppercase border-b-2 border-slate-200">
                                <th class="p-3 w-10 text-center"><input type="checkbox" id="check-all" onclick="toggleTodosChecks(this)"></th>
                                <th class="p-3">Perfil</th>
                                <th class="p-3">Nome / Contato</th>
                                <th class="p-3">CPF/CNPJ</th>
                                <th class="p-3">Localização</th>
                                <th class="p-3 text-center">Status</th>
                                <th class="p-3 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="lista-entidades" class="text-sm"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div> 

    <script>
        const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
        let usuarioLogadoId = null; // Guardará o ID do utilizador autenticado

        // CONTROLE DO MENU E ABAS
        function abrirMenu() {
            document.getElementById('sidebar-menu').classList.remove('-translate-x-full');
            document.getElementById('menu-overlay').classList.remove('hidden');
        }
        function fecharMenu() {
            document.getElementById('sidebar-menu').classList.add('-translate-x-full');
            document.getElementById('menu-overlay').classList.add('hidden');
        }

        function alternarAba(abaAtiva) {
            const form = document.getElementById('aba-formulario');
            const lista = document.getElementById('aba-listagem');
            const btnForm = document.getElementById('btn-aba-formulario');
            const btnLista = document.getElementById('btn-aba-listagem');

            const classesVerde = ['bg-emerald-500', 'text-white', 'hover:bg-emerald-600'];
            const classesCinza = ['bg-slate-200', 'text-slate-700', 'hover:bg-slate-300'];

            btnForm.classList.remove(...classesVerde, ...classesCinza);
            btnLista.classList.remove(...classesVerde, ...classesCinza);

            if (abaAtiva === 'formulario') {
                form.classList.remove('hidden');
                lista.classList.add('hidden');
                btnForm.classList.add(...classesVerde);
                btnLista.classList.add(...classesCinza);
            } else {
                form.classList.add('hidden');
                lista.classList.remove('hidden');
                btnLista.classList.add(...classesVerde);
                btnForm.classList.add(...classesCinza);
            }
        }

        // SEGURANÇA E AUTENTICAÇÃO
        async function verificar_login() {
            const { data: { session } } = await _supabase.auth.getSession();
            const telaLogin = document.getElementById('tela-login');
            const telaSistema = document.getElementById('tela-sistema');

            if (!session) {
                telaLogin.classList.remove('hidden');
                telaLogin.classList.add('flex');
                telaSistema.classList.add('hidden');
                usuarioLogadoId = null;
            } else {
                telaLogin.classList.add('hidden');
                telaLogin.classList.remove('flex');
                telaSistema.classList.remove('hidden');
                usuarioLogadoId = session.user.id; // Define o id obtido da sessão
                init(); 
            }
        }

        async function fazerLogin() {
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;
            const btn = document.getElementById('btn-login');
            
            if(!email || !senha) return alert("Por favor, preencha e-mail e senha.");
            btn.innerText = 'Autenticando...';
            btn.disabled = true;

            const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
            if (error) {
                alert("Erro ao fazer login!");
                btn.innerText = 'Entrar no Sistema';
                btn.disabled = false;
            } else {
                verificar_login(); 
            }
        }

        async function sairDaConta() {
            await _supabase.auth.signOut();
            fecharMenu();
            verificar_login();
        }

        // Inicialização com os Event Listeners para a Drop Zone
        document.addEventListener('DOMContentLoaded', () => {
            verificar_login();
            configurarDropZone('drop-foto', 'f-foto', 'nome-foto');
        });

        function init() {
            loadDashboard();
            loadEntidades();
        }

        // CONFIGURAÇÃO DRAG AND DROP (Igual ao módulo financeiro)
        function configurarDropZone(dropId, inputId, txtId) {
            const dropZone = document.getElementById(dropId);
            const inputElement = document.getElementById(inputId);

            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('dragover');
            });

            dropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
                
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    inputElement.files = e.dataTransfer.files;
                    mostrarNomeArquivo(inputElement, txtId);
                }
            });
        }

        function mostrarNomeArquivo(input, idCampoTexto) {
            const campoTexto = document.getElementById(idCampoTexto);
            if (input.files && input.files.length > 0) {
                campoTexto.innerHTML = `<i class="fas fa-check"></i> ${input.files[0].name}`;
            } else {
                campoTexto.innerHTML = '';
            }
        }

        // CONSUMO DE CEP
        async function buscarCEP(cep) {
            const limpo = cep.replace(/\D/g, '');
            if(limpo.length !== 8) return;
            try {
                const response = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
                const data = await response.json();
                if(!data.erro) {
                    document.getElementById('f-logradouro').value = data.logradouro;
                    document.getElementById('f-bairro').value = data.bairro;
                    document.getElementById('f-cidade').value = data.localidade;
                    document.getElementById('f-estado').value = data.uf;
                    document.getElementById('f-numero').focus();
                }
            } catch(e) { console.error("Erro ao buscar CEP"); }
        }

        // OPERAÇÕES DO DASHBOARD
        async function loadDashboard() {
            const { data } = await _supabase.from('entidades').select('tipo_entidade, status_entidade');
            if(!data) return;

            let clientes = 0, fornecedores = 0, inativos = 0;
            data.forEach(e => {
                if(e.status_entidade === 'inativo') inativos++;
                if(e.tipo_entidade === 'cliente') clientes++;
                if(e.tipo_entidade === 'fornecedor') fornecedores++;
            });

            document.getElementById('dash-clientes').innerText = clientes;
            document.getElementById('dash-fornecedores').innerText = fornecedores;
            document.getElementById('dash-inativos').innerText = inativos;
        }

        // INSERT & UPDATE com Storage Upload integrado!
        async function salvarEntidade() {
            const btn = document.getElementById('btn-salvar');
            btn.disabled = true; btn.innerText = 'Salvando...';

            try {
                const id = document.getElementById('f-editando-id').value;
                const nome = document.getElementById('f-nome').value;
                const cpf = document.getElementById('f-cpf').value;
                const nascimento = document.getElementById('f-nascimento').value || null;
                const email = document.getElementById('f-email').value;
                const telefone = document.getElementById('f-telefone').value;
                const tipo = document.getElementById('f-tipo-entidade').value;
                const status = document.getElementById('f-status').value;
                const cep = document.getElementById('f-cep').value;
                const logradouro = document.getElementById('f-logradouro').value;
                const numero = document.getElementById('f-numero').value;
                const bairro = document.getElementById('f-bairro').value;
                const cidade = document.getElementById('f-cidade').value;
                const estado = document.getElementById('f-estado').value;
                
                // Arquivo da foto selecionado na Drop Zone
                const fileFoto = document.getElementById('f-foto').files[0];

                if(!nome) throw new Error("O nome completo é obrigatório!");

                let fotoUrlFinal = null;

                // Processamento do Upload da Imagem para o bucket 'comprovantes'
                if (fileFoto) {
                    const fileName = `avatar_${Date.now()}_${fileFoto.name}`;
                    const { error: uploadError } = await _supabase.storage
                        .from('comprovantes')
                        .upload(`public/${fileName}`, fileFoto);
                    
                    if(!uploadError) {
                        fotoUrlFinal = _supabase.storage.from('comprovantes').getPublicUrl(`public/${fileName}`).data.publicUrl;
                    } else {
                        console.error("Erro no upload da foto: ", uploadError.message);
                    }
                }

                // Montagem do payload estruturado conforme o seu Banco de Dados
                const payload = {
                    nome_completo: nome, cpf, data_nascimento: nascimento, email, telefone,
                    tipo_entidade: tipo, status_entidade: status, cep, logradouro, numero,
                    bairro, cidade, estado, user_id: usuarioLogadoId
                };

                // Se uma nova foto foi enviada, anexa ao payload
                if(fotoUrlFinal) {
                    payload.foto_url = fotoUrlFinal;
                }

                if(id) {
                    const { error } = await _supabase.from('entidades').update(payload).eq('id', id);
                    if(error) throw error;
                    alert("Registro atualizado com sucesso!");
                } else {
                    const { error } = await _supabase.from('entidades').insert([payload]);
                    if(error) throw error;
                    alert("Entidade gravada com sucesso!");
                }

                cancelarEdicao();
                init();
                alternarAba('listagem');
            } catch(error) {
                alert(error.message);
            } finally {
                btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Gravar Registro';
            }
        }

        // READ / LISTAGEM COM FILTROS
        async function loadEntidades() {
            const busca = document.getElementById('filtro-busca').value;
            const tipo = document.getElementById('filtro-tipo').value;

            let query = _supabase.from('entidades').select('*').order('nome_completo', { ascending: true });

            if(busca) query = query.ilike('nome_completo', `%${busca}%`);
            if(tipo) query = query.eq('tipo_entidade', tipo);

            const { data, error } = await query;
            if(error) return;

            const tbody = document.getElementById('lista-entidades');
            tbody.innerHTML = data.map(e => {
                const statusClass = e.status_entidade === 'ativo' ? 'status-ativo' : 'status-inativo';
                const imgUrl = e.foto_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
                
                return `
                <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td class="p-3 text-center"><input type="checkbox" class="check-entidade" value="${e.id}"></td>
                    <td class="p-3 font-bold text-xs uppercase text-slate-500">
                        <span class="bg-slate-200 px-2 py-1 rounded">${e.tipo_entidade}</span>
                    </td>
                    <td class="p-3 flex items-center gap-3">
                        <img src="${imgUrl}" class="w-8 h-8 rounded-full border shadow-sm object-cover">
                        <div>
                            <div class="font-bold text-slate-800">${e.nome_completo}</div>
                            <div class="text-xs text-slate-400">${e.email || 'Sem e-mail'} | ${e.telefone || 'Sem fone'}</div>
                        </div>
                    </td>
                    <td class="p-3 font-mono text-slate-600">${e.cpf || '---'}</td>
                    <td class="p-3 text-xs text-slate-600">${e.cidade || '---'}-${e.estado || ''}</td>
                    <td class="p-3 text-center"><span class="${statusClass}">${e.status_entidade.toUpperCase()}</span></td>
                    <td class="p-3 text-center">
                        <button onclick="prepararEdicao('${e.id}')" class="bg-blue-100 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-500 hover:text-white transition text-sm">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                    </td>
                </tr>`;
            }).join('');
        }

        // PREPARAR ATUALIZAÇÃO
        async function prepararEdicao(id) {
            const { data: e } = await _supabase.from('entidades').select('*').eq('id', id).single();
            if(e) {
                document.getElementById('f-editando-id').value = e.id;
                document.getElementById('f-nome').value = e.nome_completo;
                document.getElementById('f-cpf').value = e.cpf || '';
                document.getElementById('f-nascimento').value = e.data_nascimento || '';
                document.getElementById('f-email').value = e.email || '';
                document.getElementById('f-telefone').value = e.telefone || '';
                document.getElementById('f-tipo-entidade').value = e.tipo_entidade;
                document.getElementById('f-status').value = e.status_entidade;
                document.getElementById('f-cep').value = e.cep || '';
                document.getElementById('f-logradouro').value = e.logradouro || '';
                document.getElementById('f-numero').value = e.numero || '';
                document.getElementById('f-bairro').value = e.bairro || '';
                document.getElementById('f-cidade').value = e.cidade || '';
                document.getElementById('f-estado').value = e.estado || '';
                
                // Limpa o input de arquivo ao carregar para edição
                document.getElementById('f-foto').value = '';
                document.getElementById('nome-foto').innerHTML = e.foto_url ? '<span class="text-blue-500"><i class="fas fa-image"></i> Possui foto cadastrada</span>' : '';

                document.getElementById('btn-salvar').innerHTML = '<i class="fas fa-sync-alt"></i> Atualizar Registro';
                document.getElementById('btn-cancelar').classList.remove('hidden');
                alternarAba('formulario');
            }
        }

        // RESET FORMULÁRIO
        function cancelarEdicao() {
            document.getElementById('f-editando-id').value = '';
            document.getElementById('btn-salvar').innerHTML = '<i class="fas fa-save"></i> Gravar Registro';
            document.getElementById('btn-cancelar').classList.add('hidden');
            
            const inputs = document.querySelectorAll('#aba-formulario input, #aba-formulario select');
            inputs.forEach(i => { if(i.id !== 'btn-salvar' && i.id !== 'btn-cancelar') i.value = ''; });
            document.getElementById('f-tipo-entidade').value = 'cliente';
            document.getElementById('f-status').value = 'ativo';
            document.getElementById('nome-foto').innerHTML = '';
        }

        // DELETE
        function toggleTodosChecks(source) {
            document.querySelectorAll('.check-entidade').forEach(cb => cb.checked = source.checked);
        }

        async function excluirSelecionados() {
            const selecionados = Array.from(document.querySelectorAll('.check-entidade:checked')).map(cb => cb.value);
            if(selecionados.length === 0) return alert("Selecione ao menos um item.");

            if(confirm(`Excluir permanentemente ${selecionados.length} entidades?`)) {
                const { error } = await _supabase.from('entidades').delete().in('id', selecionados);
                if(!error) { alert("Removidos com sucesso!"); init(); }
                else { alert("Erro ao deletar: " + error.message); }
            }
        }

        function limparFiltros() {
            document.getElementById('filtro-busca').value = '';
            document.getElementById('filtro-tipo').value = '';
            loadEntidades();
        }
    </script>
</body>
</html>
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥      🟥🟥🟥    🟥🟥    🟥🟥  🟥  🟥🟥  🟥🟥          🟥🟥
🟥🟥  🟥🟥  🟥  🟥🟥  🟥  🟥  🟥  🟥  🟥🟥  🟥🟥  🟥🟥🟥🟥🟥🟥
🟥🟥  🟥🟥  🟥  🟥🟥  🟥  🟥🟥    🟥  🟥🟥  🟥🟥  🟥🟥🟥🟥🟥🟥
🟥🟥      🟥🟥  🟥🟥  🟥  🟥🟥🟥  🟥  🟥🟥  🟥🟥🟥      🟥🟥🟥
🟥🟥  🟥🟥  🟥  🟥🟥  🟥  🟥🟥🟥  🟥  🟥🟥  🟥🟥🟥🟥🟥🟥  🟥🟥
🟥🟥  🟥🟥  🟥  🟥🟥  🟥  🟥🟥🟥  🟥  🟥🟥  🟥🟥🟥🟥🟥🟥  🟥🟥
🟥🟥      🟥🟥🟥    🟥🟥  🟥🟥🟥  🟥        🟥🟥         🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥


![imagem gamer master](assets/png/yaml_json.png)

# Poque uso JSON & YAML nos meus prompt de comando?
A traves de testes de jogos RPG interativos com IA (gratuitas), constatei que  ao atigir media de 20.000 a 25.000 caracteres elea começa a esquescer e mandar mensagens equivocadas, por isso decidi fazer um chekliste para ela revisar sempre antes de continuar com a aventura na tentativa de criar uma memoria persistente atraves de Ancoragem de Atenção.

Ancoragem de Atenção: Modelos de linguagem (LLMs) são excelentes em reconhecer padrões estruturados. Quando você força a IA a reescrever ou ler um JSON com chaves fixas ("historico_tarefas_concluidas", "localizacao_atual"), você está obrigando o mecanismo de atenção da IA a focar e atualizar esses pontos específicos.

Compactação de Contexto: Em vez de a IA ter que reler 10 páginas de conversa confusa para saber onde o personagem está, ela lê apenas as poucas linhas do último JSON resumido. É um "Save State" de videogame.

### Comparação de Formatos de Dados para Engenharia de Prompt que utlizo para memoria persistente

| Formato | Foco Principal | Vantagens | Desvantagens | Consumo de Tokens |
| :--- | :--- | :--- | :--- | :--- |
| **JSON** | Intercâmbio de dados entre sistemas (APIs). | * Rigidez absoluta.<br>* Padrão universal na web.<br>* Suporte nativo em qualquer linguagem. | * Sintaxe verbosa (muitas aspas, chaves e vírgulas).<br>* Fácil de quebrar por erro humano.<br>* Difícil de ler/escrever manualmente em chats. | **Alto** (Sintaxe consome espaço precioso). |
| **YAML** | Arquivos de configuração e dados legíveis. | * Extremamente limpo (sem chaves ou vírgulas).<br>* Economiza espaço (tokens).<br>* Altamente legível por humanos e IAs. | * Depende estritamente de espaços (identação).<br>* Um espaço errado pode mudar a hierarquia do dado.<br>* Menos tolerante a tabs acidentais. | **Baixo/Médio** (Focado apenas no conteúdo essencial). |
| **Markdown** | Formatação de documentos e textos ricos. | * Imune a erros de sintaxe (não quebra o chat).<br>* Perfeito para instruções, regras e descrições textuais.<br>* Visualmente agradável para o usuário. | * Ruim para armazenar dados matemáticos estruturados.<br>* A IA pode variar a formatação ao longo do tempo.<br>* Não serve como "banco de dados" rígido. | **Baixo** (Usa poucos caracteres especiais). |



# As 4 Regras de Ouro do JSON
* Tudo começa e termina com Chaves { }: Elas representam o objeto principal.
* Chaves sempre usam Aspas Duplas "": Nunca use aspas simples '' e nunca deixe a chave sem aspas.
* Certo: "nome": "Aristides"   , Errado: 'nome': "Aristides" ou nome: "Aristides"
* Separadores Obrigatórios:  Use dois pontos (:) para separar a chave do valor. Use vírgula (,) para separar um par de dados do próximo.

**Observação:** A Última Linha NUNCA tem vírgula: Se não houver mais nada depois daquele dado, colocar uma vírgula quebra o código.

## Tipos de Dados Permitidos o JSON só aceita estes tipos de valores:
* Texto (String): Sempre entre aspas duplas. "profissao": "Mestre de RPG"
* Número (Number): Fora das aspas. "nivel": 1 ou "peso": 75.5
* Booleano (Boolean): true ou false (letras minúsculas e sem aspas). "ativo": true
* Nulo (Null): null (sem aspas). "modificador": null
* Objeto (Object): Outro grupo de chaves {} lá dentro.
* Lista (Array): Uma lista de coisas dentro de colchetes [].

## A Diferença Crucial: Chaves {} vs Colchetes []
## Este é o erro mais comum. Memorize isto:
* { } CHAVES (Objeto): Guarda pares de "chave": "valor". Exige que você dê um nome para cada informação.
* [ ] COLCHETES (Array/Lista): Guarda apenas uma lista de valores diretos, separados por vírgula. Não tem chaves internas para cada item.


## exemplo
```json
{
  "nome_do_jogo": "RPG de Mesa",
  "atributos_do_jogador": {    
    "forca": 10,
    "agilidade": 12
  },
  "itens_na_mochila": [
    "Espada",
    "Escudo",
    "Pocao de Cura"
  ]
}
```

# ARQUIVO YAML (regras fundamentais)
 *Criar um arquivo YAML é muito simples porque você não precisa gerenciar chaves {} ou vírgulas. Você só precisa dominar a identação (os espaços no início da linha).

## As Regras de Espaçamento (Identação)
* No YAML, a hierarquia é definida por espaços. Se um dado está "dentro" de outro, ele deve ter 2 espaços de recuo.
* PROIBIDO usar a tecla TAB: O YAML aceita apenas espaços puros (aperte a barra de espaço duas vezes). O TAB quebra o arquivo.
* Use dois pontos : seguido de obrigatoriamente um espaço para separar a chave do valor.

##  Os Elementos Básicos do YAML
### A) Variável Simples (Texto ou Número)
Apenas a chave, dois pontos, um espaço e o valor. Não precisa de aspas (a menos que o texto tenha caracteres muito estranhos).
```
EXEMPLO DE VARIAVERIAVEIS (Texto ou Número):
  nome_do_mestre: aristidesbp
  nivel_dificuldade: 5
  jogo_ativo: true
```
### B) Objetos (Dados aninhados)
Para colocar dados dentro de um grupo (Dados aninhados), quebre a linha e dê 2 espaços de recuo.
```
jogador_aristides:
  nivel: 1
  vida: 100/100
  sono: 0/100
```
### C) Listas (Arrays)
Para fazer uma lista de coisas simples, use o hífen - seguido de um espaço.

```
itens_aristides:
  - 1 porção de cura
  - 1 pergaminho do terremoto
  - 2 porções de previsões
```



🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# JOGANDO COM IA
  
```
{
  "diretrizes": true,
  "como_voce_deve_se_comportar": "Se torne aristidesbp, um mestre de um jogo de RPG de mesa, criando aventuras imersivas e emocionantes, também administrando as mecânicas do jogo",
  "tarefa": "ABSOLUTAMENTE sempre No início de TODAS as suas mensagens, você copiar obrigatoriamente a FICHA DO STATUS DO GRUPO E AS REGRAS de forma completas dentro de uma caixa de texto em formato json descrita abaixo",
  "FICHA_STATUS_DO_GRUPO": [
    { "DIA": "1" },
    { "HORARIO": "00:00h" },
    { "MISSÃO_ATUAL": "objetivo da missão, quem é o patrocinador, recompensa" },
    { "RESUMO_DA_MISSAO": "Resumo dos fatos e objetivo atual para manter o contexto, sempre atualizados" },
    { "LOCALIZAÇÃO_ATUAL": "descrição do cenário atual e NPCs presentes relevantes para CONTEXTO E CONTINUAÇAO DA HISTORIA" }
  ],
  "jogador_aristides": [
    { "nivel": "01" },
    { "sono": "valor_atual/valor_maximo" },
    { "fome": "valor_atual/valor_maximo" },
    { "habilidade": "valor_atual/valor_maximo" },
    { "inteligencia": "valor_atual/valor_maximo" },
    { "vida": "valor_atual/valor_maximo" }
  ],
  "itens_aristides": [
    "1 porção de cura(regenera 50% da energia total, uso individual)",
    "1 pergaminho do terremoto (dando em área,-4 de energia)",
    "1 pergaminho fortuna (individual, regenera 50% da sorte, acrescenta +1 ao nível máximo de sorte)",
    "2 porções de previsões (comida regenera 100% da fome)"
  ],
  "REGRAS": [
    { "ESTRUTURAÇÃO_DO_FEEDBACK": "Não jogue por mim. Narre o parágrafo atual, apresente 3 sugestões ao jogador de forma numerada" },
    { "imparcialidade": "não puxe o saco, seja realista e coerente com a história, não facilitar ou salvar os jogadores" },
    { "narrativas": "faça narrativas logo após o arquivo json, use no máximo 900 caracteres para o usuário poder escutar, devem ser imersivas, emocionais e detalhadas." },
    { "MISSÃO": "uma por vez, os jogadores devem concluir ou escolher abandonar a missão antes de aceitar a outra." },
    { "HORA_E_DIA": "1 dia = 24 horas (cada interação do jogador equivalem a 30 minutos)" },
    { "FOME_E_SONO": "(aumentam +1 cada para cada hora que passa, se atingirem 100, desmaia -5 de energia)=0%;" },
    { "CRIANDO_PERSONAGEM_MONSTROS_DESAFIOS_NPC": "Jogue um dado de 6 lados (1d6), some 6 ao número que tirar esse será o total de HABILIDADE MAXIMA. Jogar 2d6 some 12 ao número, será o total maximo de ENERGIA. Há também o de SORTE. Jogue um 1d6, some 6 para obter o total." },
    { "desafios": "criar uma ficha aleatória igual a dos jogadores para cada monstro ou npc ou desafio, apresentá-la ao personagem antes de confrontos e testes" },
    { "TESTES_E_COMBATES": "(ambos rolam: 2d6 + valor_do_atributo_testado) quem tirar o maior valor vence. Em caso de combate subtrair -2 ENERGIA no oponente que perdeu" },
    { "habilidade": "testar para todo esforço físico, subtrair -1 do valor atual (fadiga)" },
    { "inteligencia": "testar sempre que o personagem usar para persuadir, criar algo, descobrir..., subtrair -1 do valor atual (fadiga)" },
    { "INICIANDO_JOGO": "PERGUNTE PARA O USUARIO QUAL o nome dos jogadores E O TIPO DE AVENTURA ELE QUER JOGAR" },
    { "combates": "sempre mostrar as fichas de todos os envolvidos e rolagem dos dados, pois assim os jogadores poderam analizar se deve fugir ou continuar" }
  ]
}

```


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# ASSITENTE DE SUPORTE

```

{
"prontuário_das_conversas": true,
"protocolo_anti_cache": "Para mitigar a perda de contexto em conversas longas, você deve ler o pronuario (arquivo json) do usuário no turno anterior e verificar se o passo foi solucionado.",
"atualização_do_prontuario":"No INICIO de TODAS as mensagens, sem exceção, você deve gerar um bloco de código JSON, copiar todos os itens passados e adicionar o resumo da converssa atual,o obejetivo e criar um prontuario das conversas para que nao esquessamos oque ja foi feito ou realizado",
"prontuario": [
{ "item": 1,"resumo_da_conversa": "ususario pediu para Analisar o problema antes de responder. Faça quantas perguntas precisar ao usuário até compreender o cenário perfeitamente." },
{ "item": 2,"resumo_da_conversa": "usuario pediu para Nunca envie blocos gigantes de código ou várias tarefas de uma vez. Envie apenas UMA única tarefa clara por vez, explique o porquê e AGUARDE o feedback/resultado do usuário antes de sugerir o próximo passo."},
]

"proxima_tarefa_pendente": "...",

}

```


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
#  TERMINAL LINUX PARA CELULAR ANDROID (TERMUX)
 
## Download do aplicativo direto no git
* Acesse o link oficial no Github não use da Play Store!
* em caso de dúvida peço ajuda ao genini (Ia do google, ou outra da sua escolha)
[TERMUX](https://github.com/termux/termux-app/releases)


```
# Quando coloca o "jogo da velha" na frente de um texto, ele se torna comentário no TERMUX!!!
# Por esse motivo você pode copiar os códigos mesmo com comentários que vai funcionar!
```
```
# comando para atualizar o termux:
pkg update && pkg upgrade -y
```
```
# comando para autorizar o uso de pastas do celular
termux-setup-storage
```
```
## INSTALE AS FERRAMENTAS BÁSICAS PARA A PROGRAMAÇÃO:
pkg install git -y
pkg install nano -y
pkg install openssh -y
pkg install curl -y
pkg install tree -y
```
```
# ver as pastas ocultas (-a) do diretorio
ls -a
```
```
# ver pastas e arquivos
tree
```
```
# ir para o diretorio
cd nome_do_diretorio
```
```
# voltar para pasta anterior
cd ..
```
```
# voltar para pasta raiz
cd
```
```
# comando para criar pasta
mkdir novo_projeto
```
``` 
nano teste.txt 
# abre o arquivo teste.txt 
# obs: ele cria caso não exista
# Ctrl+S  para salvar
# Crtl+X  para sair
```
```
mv teste.txt ./repositorios_git 
# mover pasta ou arquivo (./pasta_destino)
```
```
# limpar atela
clear
```
```
# como apagar pasta/arquivos/projetos
rm -rf nome_da_pasta
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
#  TERMUX+ GIT+ GITHUB
```
# verificar se o git está instalado 
git --version
```
```
# vá para pasta onde ficará o repositório
cd storage/downloads
```
```
# Lista todas as configurações ativas: 
git config --list
```
```
# Configurar a pasta como segura (evita erros de segurança)
git config --global --add safe.directory "$(pwd)"                     
```
```
# Configurar nome de usuário
git config --global user.name "nome_do_usuario"
```
```
# Configurar email do GitHub
git config --global user.email "seu@email.com"
```
```
# verificar se tem chave SSH
ls -a ~/.ssh
```
```
# criar uma chave SSH
# Aperte [Enter] (deixe tudo em branco).
ssh-keygen -t ed25519 -C "email_cadastrado"
```
```
# exibir o código que você deve copiar e colar no GitHub:
cat ~/.ssh/id_ed25519.pub
```

* Copie todo esse código que apareceu (começando em ssh-ed25519 até o final do seu e-mail) e adicione-o em **Settings > SSH and GPG keys > New SSH key** no seu GitHub.
* exemplo: ssh-ed255...atkeWeHiX0 aristidesbp@gmail.com
* após salvar tem que confirmar por email.
ssh criado use este comando no termux:
```
# testar a conexão:
# Digite a palavra "yes" e aperte Enter.
# DEVE APARECER:
# Hi aristidesbp! You've successfully authenticated, but GitHub does not provide shell access.
ssh -T git@github.com
```
```
# iniciar o agente de chaves e registrar nova chave:
eval "$(ssh-agent -s)" && ssh-add ~/.ssh/id_ed25519
```
```
# Altere a URL do repositório de HTTPS para SSH com o comando:
git remote set-url origin git@github.com:aristidesbp/aristidesbp.github.io.git
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
#  GITHUB : BAIXAR E ENVIAR ARQUIVOS 

```
# clonar um repositório
# exemplo:
git clone https://github.com/aristidesbp/aristidesbp.github.io.git
```
```
# entrar na pasta
cd aristidesbp.github.io
```
```
# dar permissão
git config --global --add safe.directory "$(pwd)"
```
```
# testar
git status 
```
```
# Inicializa o repositório Git local (caso não tenha vindo com o clone)
git init
```
```
# BAIXAR ATUALIZAÇÃO DO SITE:
git pull origin main

```
---
# ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
# APAGAR ARQUIVO LOCAL E COLAR O REPOSITÓRIO 
```
# 1. Sincroniza as informações com o GitHub 
git fetch origin
# 2. APAGA seus arquivos locais para ficarem idênticos ao servidor
git reset --hard origin/main
```
# ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
---
# 🖱️🗃️ FAÇA SUAS ALTERAÇOES !!!!!
```
# VERIFICAR STATUS DO REPOSITORIO LOCAL:
git status

```
```
# ADICIONAR REPOSITÓRIOS À LISTA:
git add .

```
```
# SALVAR PONTO DE ALTERAÇÃO:
git commit -m "DESCRIÇÃO_chekPointe"

```
```
# MANDAR ALTERAÇÕES PARA O REPOSITÓRIO:
git push origin main

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# COMO BAIXAR MIDIAS COM TERMUX 
```
pkg update && pkg upgrade
pkg install python ffmpeg
python3 -m pip install --upgrade yt-dlp

```
```
yt-dlp -f "bestvideo[height<=720]+bestaudio/best[height<=720]" "url_link"

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
#  SERVIDOR PYTHON 
# Passo 1: Instalar o Python3
 * Se você já instalou o Termux  (CONFIGUROU E ATUALIZOU)
 * Navegue até a pasta onde seus arquivos estão 


python3 -m http.server 8080
```
* Ele inicia um servidor web simples na porta 8080:
* caso queira encerrar o processo basta apertar Ctr+C;

**Como Acessar o Site no Navegador**
Abra o navegador do seu celular (Chrome, Firefox, etc.).

## [localhost CLIQUE AQUI](http://localhost:8080)
```
http://localhost:8080
```

## ⚠️ Observações importantes
O servidor só funciona enquanto o Termux estiver aberto
A porta 8080 pode ser trocada por outra, ex:
Copiar código
```
python -m http.server 3000
```
Aí o endereço vira:
* http://localhost:3000

## ✅ Se quiser acessar de outro dispositivo na mesma rede Wi-Fi
```
# Descubra o IP do celular no Termux:
```
ip addr show wlan0
```
Vai aparecer algo como:
* inet 192.168.1.105
No navegador do outro dispositivo, acesse:
* http://192.168.1.105:8080

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# COMO INSTALAR SISTEMA OPERACIONAL LINUX NO ANDROIDE
## instalar linux (terminal basico)
```
# instalador do Linux
pkg install proot-distro
```
```
# verificar iso disponível
proot-distro list
```
```
# instalar ubuntu
proot-distro ubuntu
```
```
# entrar no Ubuntu
proot-distro login ubuntu
```
```
# atualizar 
apt update && apt upgrade -y
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# COMO TER UMA IA OFFLINE NO CELULAR (Termux + Linux + Ollama)
## instalar buscador
```
# instalando o buscador
apt install curl -y
```
```
# instalando Ollama 
curl a-fsSl http://ollama.com/install
```
```
# abrir lista
ollama list
```
```
# baixar modelo
ollama run qwen2.5-coder:7b
```
```
# baixar modelo de linguagem básico
ollama run phi3
```
```
# baixar modelo de linguagem para programação
ollama run deepsek-code:1.36
```
```
ollama serve
```
* ess código vai ficar rodando em segundo plano,
* arraste para direita e abra uma "NEW SESSION"


## em uma nova Session
```
# entrar no Ubuntu
proot-distro login ubuntu
```


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
#  python3 organizar.py
```

import os
import shutil


def achatar_e_categorizar_por_tipo(pasta_origem, pasta_destino):
    """Varre as subpastas e apenas COPIA os arquivos para a pasta de destino,

    separando-os exclusivamente por suas extensões (tipos).
    """
    pasta_origem = os.path.abspath(pasta_origem)
    pasta_destino = os.path.abspath(pasta_destino)

    if not os.path.exists(pasta_destino):
        os.makedirs(pasta_destino)

    arquivos_copiados = 0

    for pasta_atual, subpastas, arquivos in os.walk(pasta_origem):
        pasta_atual_abs = os.path.abspath(pasta_atual)

        # Ignora pastas ocultas e lixeiras do sistema (.git, .Trash, etc)
        if any(
            parte.startswith(".") for parte in pasta_atual_abs.split(os.sep)
        ):
            continue

        # Evita que o script leia a própria pasta de destino
        if pasta_atual_abs.startswith(pasta_destino):
            continue

        for nome_arquivo in arquivos:
            # Ignora o próprio script e arquivos ocultos do sistema
            if nome_arquivo == "organizar.py" or nome_arquivo.startswith("."):
                continue

            caminho_origem = os.path.join(pasta_atual, nome_arquivo)
            nome_puro, extensao = os.path.splitext(nome_arquivo)

            # 1. Classifica EXCLUSIVAMENTE pelo tipo (ex: HTML, CSS, JS)
            if extensao:

            nome_subpasta_tipo = extensao.replace(".", "").lower()

            else:
                nome_subpasta_tipo = "SEM_EXTENSAO"

            # 2. Define a pasta do tipo (ex: ./bkps/HTML)
            caminho_pasta_tipo = os.path.join(pasta_destino, nome_subpasta_tipo)

            if not os.path.exists(caminho_pasta_tipo):
                os.makedirs(caminho_pasta_tipo)

            # 3. Define o caminho final do arquivo direto dentro da pasta do tipo
            caminho_destino_final = os.path.join(
                caminho_pasta_tipo, nome_arquivo
            )

            # 4. Tratamento de duplicatas com nomes iguais dentro da mesma pasta de tipo
            contador = 1
            while os.path.exists(caminho_destino_final):
                novo_nome = f"{nome_puro}_{contador}{extensao}"
                caminho_destino_final = os.path.join(
                    caminho_pasta_tipo, novo_nome
                )
                contador += 1

            try:
                # Copia o arquivo mantendo o original intacto na pasta de origem
                shutil.copy2(caminho_origem, caminho_destino_final)
                arquivos_copiados += 1
                nome_final_exibicao = os.path.basename(caminho_destino_final)
                print(
                    f"[{arquivos_copiados}] Copiado: {nome_arquivo} -> bkps/{nome_subpasta_tipo}/{nome_final_exibicao}"
                )
            except Exception as erro:
                print(f"Erro ao copiar {nome_arquivo}: {erro}")

    if arquivos_copiados == 0:
        print("\n[AVISO]: Nenhum arquivo real encontrado para copiar!")


# --- ÁREA DE EXECUÇÃO ---
ORIGEM = "."
DESTINO = "./organizado"

if __name__ == "__main__":
    print("Iniciando cópia organizada apenas por Tipo (Extensão)...")
    achatar_e_categorizar_por_tipo(ORIGEM, DESTINO)
    print("Processo concluído!")

```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
#  python limpar_duplicados.py

```
import hashlib
import os


def calcular_hash(caminho_arquivo):
    """Calcula a 'impressão digital' (hash SHA-256) do arquivo para garantir

    que o conteúdo é identico.
    """
    hasher = hashlib.sha256()
    # Lê o arquivo em blocos para não travar a memória do celular se o arquivo for grande
    with open(caminho_arquivo, "rb") as f:
        while bloco := f.read(4096):
            hasher.update(bloco)
    return hasher.hexdigest()


def buscar_e_limpar_duplicados(pasta_origem):
    """Identifica arquivos idênticos pelo conteúdo e pergunta antes de apagar."""
    pasta_origem = os.path.abspath(pasta_origem)

    # Dicionário para guardar { hash_do_arquivo: [lista_de_caminhos_com_esse_hash] }
    registro_hashes = {}

    print(" Analisando arquivos em busca de conteúdo idêntico...")

    for pasta_atual, subpastas, arquivos in os.walk(pasta_origem):
        pasta_atual_abs = os.path.abspath(pasta_atual)

        # Ignora pastas ocultas e lixeiras
        if any(
            parte.startswith(".") for parte in pasta_atual_abs.split(os.sep)
        ):
            continue

        for nome_arquivo in arquivos:
            if nome_arquivo == "organizar.py" or nome_arquivo.startswith("."):
                continue

            caminho_completo = os.path.join(pasta_atual, nome_arquivo)

            try:
                # Calcula a impressão digital do arquivo
                hash_arquivo = calcular_hash(caminho_completo)

                # Se o hash já existe, encontramos uma duplicata
                if hash_arquivo in registro_hashes:
                    registro_hashes[hash_arquivo].append(caminho_completo)
                else:
                    # Se for a primeira vez que vemos esse hash, registra como o 'original'
                    registro_hashes[hash_arquivo] = [caminho_completo]
            except Exception as e:
                print(f"Não foi possível ler {nome_arquivo}: {e}")

    # Filtrar apenas os hashes que possuem mais de 1 arquivo (ou seja, têm duplicatas)
    duplicatas_detectadas = {
        hash_f: caminhos
        for hash_f, caminhos in registro_hashes.items()
        if len(caminhos) > 1
    }

    if not duplicatas_detectadas:
        print("\n Excelente! Nenhum arquivo idêntico foi encontrado.")
        return

    # Lista na tela as duplicatas encontradas
    print(f"\n Foram encontrados {len(duplicatas_detectadas)} grupos de arquivos idênticos:\n")
    
    arquivos_para_deletar = []

    for i, (hash_f, caminhos) in enumerate(duplicatas_detectadas.items(), 1):
        original = caminhos[0]
        copias = caminhos[1:]
        
        print(f"Grupo {i}:")
        print(f"  [MANTER] -> {os.path.relpath(original)}")
        for copia in copias:
            print(f"  [APAGAR] -> {os.path.relpath(copia)}")
            arquivos_para_deletar.append(copia)
        print("-" * 40)

    print(f"\nNo total, {len(arquivos_para_deletar)} cópias repetidas serão apagadas.")
    
    # INTERAÇÃO: Pergunta ao usuário no Termux se pode deletar
    resposta = input("Deseja apagar essas duplicatas agora? (s/n): ").strip().lower()

    if resposta == 's':
        print("\nApagando arquivos duplicados...")
        deletados = 0
        for caminho in arquivos_para_deletar:
            try:
                os.remove(caminho)
                print(f"Deletado com sucesso: {os.path.basename(caminho)}")
                deletados += 1
            except Exception as e:
                print(f"Erro ao deletar {os.path.basename(caminho)}: {e}")
        print(f"\nPronto! {deletados} arquivos inúteis foram removidos.")
    else:
        print("\nAção cancelada. Nenhum arquivo foi alterado.")


# --- ÁREA DE EXECUÇÃO ---
# Varre a pasta atual onde o Termux está aberto
ORIGEM = "."

if __name__ == "__main__":
    buscar_e_limpar_duplicados(ORIGEM)


```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# extrair.py

```
import os
import shutil


def achatar_diretorio_e_limpar(pasta_principal):
    """Move todos os arquivos das subpastas para a pasta principal,

    evitando duplicatas ao renomear arquivos repetidos, e deleta as pastas vazias.
    """
    pasta_principal = os.path.abspath(pasta_principal)
    arquivos_movidos = 0

    print("Fase 1: Movendo arquivos para a raiz...")
    print("-" * 50)

    # 1. Primeira Varredura: Mover os arquivos
    for pasta_atual, subpastas, arquivos in os.walk(
        pasta_principal, topdown=False
    ):
        pasta_atual_abs = os.path.abspath(pasta_atual)

        # Ignora pastas ocultas do sistema (.git, etc.)
        if any(
            parte.startswith(".") for parte in pasta_atual_abs.split(os.sep)
        ):
            continue

        # Se já estamos na pasta principal raiz, não fazemos nada com os arquivos daqui
        if pasta_atual_abs == pasta_principal:
            continue

        for nome_arquivo in arquivos:
            # Ignora o próprio script e arquivos ocultos
            if (
                nome_arquivo == "desfazer_organizacao.py"
                or nome_arquivo.startswith(".")
            ):
                continue

            caminho_origem = os.path.join(pasta_atual, nome_arquivo)
            nome_puro, extensao = os.path.splitext(nome_arquivo)

            # Define o destino inicial (direto na raiz)
            caminho_destino_final = os.path.join(pasta_principal, nome_arquivo)

            # Tratamento de duplicatas: se o arquivo já existe na raiz, renomeia
            contador = 1
            while os.path.exists(caminho_destino_final):
                novo_nome = f"{nome_puro}_{contador}{extensao}"
                caminho_destino_final = os.path.join(pasta_principal, novo_nome)
                contador += 1

            try:
                # Move o arquivo para a raiz
                shutil.move(caminho_origem, caminho_destino_final)
                arquivos_movidos += 1
                nome_final_exibicao = os.path.basename(caminho_destino_final)
                print(f"[{arquivos_movidos}] Movido: {nome_final_exibicao}")
            except Exception as erro:
                print(f"Erro ao mover {nome_arquivo}: {erro}")

    print("-" * 50)
    print(f"Total de arquivos movidos para a raiz: {arquivos_movidos}")
    print("-" * 50)

    # 2. Segunda Varredura: Apagar as subpastas que agora estão vazias
    print("\nFase 2: Removendo pastas vazias...")
    pastas_removidas = 0

    for pasta_atual, subpastas, arquivos in os.walk(
        pasta_principal, topdown=False
    ):
        pasta_atual_abs = os.path.abspath(pasta_atual)

        # Ignora pastas ocultas do sistema
        if any(
            parte.startswith(".") for parte in pasta_atual_abs.split(os.sep)
        ):
            continue

        # Nunca deleta a própria pasta principal
        if pasta_atual_abs == pasta_principal:
            continue

        # Verifica se a pasta está realmente vazia (sem arquivos e sem subpastas)
        if (
            not os.listdir(pasta_atual)
            and pasta_atual_abs != pasta_principal
        ):
            try:
                os.rmdir(pasta_atual)
                pastas_removidas += 1
                print(f"Pasta removida: {os.path.basename(pasta_atual)}")
            except Exception as erro:
                print(f"Não foi possível remover a pasta {pasta_atual}: {erro}")

    print("-" * 50)
    print(f"Total de pastas vazias deletadas: {pastas_removidas}")


# --- ÁREA DE EXECUÇÃO ---
# "." significa o diretório atual onde o script está rodando
DIRETORIO_ATUAL = "."

if __name__ == "__main__":
    print("Iniciando processo de achatamento e limpeza...")
    achatar_diretorio_e_limpar(DIRETORIO_ATUAL)
    print("\nProcesso concluído com sucesso!")

```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
## login.html (funcionando)
```
<!DOCTYPE html>
<html class="dark" lang="pt-BR">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - ERP ABP</title>

    
    <!-- CONEXÃO SUPABASE -->
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="supabase_config.js"></script>

    
    <!-- STYLE -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <!-- FIM DO STYLE -->

    
    <script>
     //iciciando a conexao
        const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        
        // Exporta para ser usado em outros scripts
        window.supabaseClient = _supabase;
    </script>
    <!-- FIM DO CONEXÃO SUPABASE -->

</head>

<body class="bg-slate-950 text-white flex items-center justify-center min-h-screen p-4">


    <!-- FORMULÁRIO -->
    <div class="glass p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <div class="text-center mb-8">
            <h1 class="text-3xl font-black tracking-tighter text-blue-500">ERP ABP</h1>
            <p class="text-slate-400 text-sm">Acesse sua conta para gerenciar seus PDFs</p>
        </div>
        <!--
        <button onclick="loginComGoogle()" class="w-full py-3 mb-6 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
            <img src="https://www.google.com/favicon.ico" class="w-4 h-4" alt="Google icon"> 
            Entrar com Gmail
        </button>
-->
        <div class="relative mb-6 text-center border-b border-slate-800">
            <span
                class="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-slate-950 px-2 text-xs text-slate-500 uppercase tracking-widest">ou
                e-mail</span>
        </div>

        <div class="space-y-4">
            <div>
                <label class="block text-xs font-bold mb-1 text-slate-400 uppercase">E-mail</label>
                <input type="email" id="email" placeholder="seu@email.com"
                    class="w-full bg-slate-900 border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
            </div>

            <div class="relative">
                <label class="block text-xs font-bold mb-1 text-slate-400 uppercase">Senha</label>
                <input type="password" id="password" placeholder="••••••••"
                    class="w-full bg-slate-900 border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                <button type="button" onclick="alternarSenha()"
                    class="absolute right-3 top-8 text-slate-500 hover:text-white">
                    🔒
                </button>
            </div>

            <div class="text-right">
                <button onclick="solicitarRecuperacao()" class="text-xs text-blue-400 hover:underline">Esqueceu a
                    senha?</button>
            </div>

            <div class="flex gap-3 pt-2">
                <button onclick="realizarLogin()"
                    class="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20">
                    ENTRAR
                </button>
                <button onclick="confirmarCadastro()"
                    class="flex-1 py-3 border border-slate-700 hover:bg-slate-800 text-white font-bold rounded-xl transition-all">
                    CADASTRAR
                </button>
            </div>
        </div>
    </div>
    <!-- FIM DO FORMULÁRIO -->

    <script>
        
        /**
     * Nome do arquivo: alternar_senha.js
     * Objetivo: Alternar a visibilidade do campo de senha entre texto e asteriscos.
     */

        function alternarSenha() {
            // Busca o elemento de entrada pelo ID
            const campo = document.getElementById('password');

            if (campo) {
                // Se for password, vira text (visível). Se for text, vira password (oculto).
                campo.type = campo.type === 'password' ? 'text' : 'password';
            }
        }

    </script>
    <script>
        /**
         * Nome do arquivo: login_google.js
         * Objetivo: Realizar autenticação social utilizando o provedor Google via OAuth.
         */

        async function loginComGoogle() {
            const { data, error } = await window.supabaseClient.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    // Redireciona para o painel do ERP dentro do repositório
                    redirectTo: window.location.origin + '/assets/erp/index.html'
                }
            });

            if (error) {
                console.error("Erro no login Google:", error.message);
                alert("Erro ao conectar com Google: " + error.message);
            }
        }
    </script>
    <script>
        /**
     * Nome do arquivo: realizar_cadastro.js
     * Objetivo: Criar uma nova conta de usuário no sistema.
     */

        async function realizarCadastro() {
            const email = document.getElementById('email').value;
            const senha = document.getElementById('password').value;

            if (!email || !senha) {
                alert("Preencha e-mail e senha primeiro!");
                return;
            }

            // Cria o usuário no Supabase. 
            // Nota: Se o 'Confirm Email' estiver ativo no painel, o user precisa validar o e-mail antes de logar.
            const { data, error } = await window.supabaseClient.auth.signUp({
                email,
                password: senha
            });

            if (error) {
                alert("Erro no cadastro: " + error.message);
            } else {
                alert("Conta criada com sucesso! Verifique seu e-mail ou tente fazer login.");
            }
        }
    </script>
    <script>
        /**
         * Função de apoio para evitar cadastros acidentais (UX)
         */
        function confirmarCadastro() {
            const email = document.getElementById('email').value;
            if (!email) return alert("Digite um e-mail!");

            if (confirm(`Deseja criar uma conta para: ${email}?`)) {
                realizarCadastro();
            }
        }
    </script>
    <script>
        /**
       * Nome do arquivo: realizar_login.js
       * Objetivo: Autenticar o usuário utilizando e-mail e senha no Supabase Auth.
       */

        async function realizarLogin() {
            const email = document.getElementById('email').value;
            const senha = document.getElementById('password').value;

            // Validação básica de campos vazios
            if (!email || !senha) {
                alert("Ops! Você esqueceu de preencher o e-mail ou a senha. ✍️");
                return;
            }

            try {
                // Chamada oficial ao método de Sign In do Supabase
                const { data, error } = await window.supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: senha,
                });

                if (error) {
                    console.error("Erro na autenticação:", error.message);
                    alert("Erro ao entrar: " + error.message);
                } else {
                    console.log("Bem-vindo de volta!", data.user.email);
                    // Redireciona para o painel principal após o sucesso
                    window.location.href = 'index.html';
                }
            } catch (err) {
                console.error("Ocorreu um erro inesperado no sistema:", err);
            }
        }  
    </script>
    <script>
        /**
     * Nome do arquivo: recuperar_senha.js
     * Objetivo: Enviar e-mail de recuperação e atualizar a senha do usuário logado.
     */

        async function solicitarRecuperacao() {
            const email = document.getElementById('email').value;
            if (!email) return alert("Digite seu e-mail.");

            // O Supabase envia um link que redireciona o usuário para a página de redefinição
            const { error } = await window.supabaseClient.auth.resetPasswordForEmail(email, {
                redirectTo: 'redefinir_senha.html',
            });

            if (error) alert(error.message);
            else alert("Link enviado! Verifique sua caixa de entrada.");
        }

        async function salvarNovaSenha() {
            const novaSenha = document.getElementById('novaSenha').value;
            if (novaSenha.length < 6) return alert("A senha deve ter no mínimo 6 caracteres.");

            // Atualiza os dados do usuário que clicou no link de recuperação
            const { error } = await window.supabaseClient.auth.updateUser({ password: novaSenha });

            if (error) {
                alert("Erro ao atualizar: " + error.message);
            } else {
                alert("Senha atualizada com sucesso!");
                window.location.href = 'index.html';
            }
        }
    </script>
</body>

</html>

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# index.html
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SISTEMA ERP ABP - Inicio</title>
    
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
<!-- <link rel="stylesheet" href="css/index.css"> -->
 <style>   
     /* index.css */
        /* Configurações Gerais */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f7f6;
            margin: 0;
            padding-top: 80px; /* Espaço para a navbar fixa */
        }

        /* Grid de Cards */
        .content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .card {
            background: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            text-decoration: none;
            color: #333;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 1px solid #e2e8f0;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px rgba(0,0,0,0.1);
            border-color: #3ecf8e;
        }

        .card i {
            font-size: 2.5rem;
            color: #3ecf8e;
            margin-bottom: 15px;
        }

        .card h3 {
            font-size: 1.1rem;
            margin: 0;
        }

        /* Navbar Styles */
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
            box-sizing: border-box;
        }

        .nav-buttons {
            display: flex;
            gap: 15px;
        }

        .btn-nav {
            background: #ef4444;
            color: white !important;
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

        .btn-home {
            background: #3ecf8e !important;
        }
  
</style>


</head>
<body>
<!-- navbar -->
    <div class="navbar">
        <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
            <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
        </div>
        <div class="nav-buttons">
            <a href="index.html" class="btn-nav btn-home"><i class="fas fa-home"></i> Início</a>
            <button class="btn-nav" onclick="sairDaConta()">
                <i class="fas fa-sign-out-alt"></i> Sair
            </button>
        </div>
    </div>
<!-- fim navbar -->

<div class="content">      
<div class="grid">

<!-- cardes do menu-->

    <a href="testes.html" class="card">
                <i class="fas fa-shopping-basket"></i>
                <h3>testes</h3>
    </a>
    
    
    <a href="entidades.html" class="card">
    <i class="fas fa-users"></i>
    <h3>Gestão de Entidades</h3>
    </a>

    <a href="financeiro.html" class="card">
    <i class="fas fa-hand-holding-usd"></i>
    <h3>Financeiro</h3>
    </a>

    <a href="produtos.html" class="card">
    <i class="fas fa-box"></i>
    <h3>Produtos</h3>
    </a>
    
 

            
            <a href="vitrine.html" class="card">
                <i class="fas fa-shopping-basket"></i>
                <h3>vitrine</h3>
            </a>
            
            <a href="pdv.html" class="card">
                <i class="fas fa-shopping-basket"></i>
                <h3>pdv</h3>
            </a>
            
             
<!-- fim cardes do menu-->         
</div>        
</div>

<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
</body>
</html>

```


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# tarefas.html (funcionando)
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TAREFAS - ERP ABP</title>

    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"> 
    
    <script src="https://unpkg.com/html5-qrcode"></script>

    <style>
        :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; --danger: #ef4444; }
        body { margin: 0; font-family: 'Inter', sans-serif; background: var(--bg); }
        .container { max-width: 1100px; margin: auto; padding: 20px; padding-top: 85px; }
        .card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; }
        .section-title { color: var(--primary); font-size: 14px; text-transform: uppercase; margin: 20px 0 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; font-weight: bold; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
        label { display: block; margin-bottom: 5px; font-size: 13px; color: #64748b; font-weight: bold; }
        input, select, textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
        
        .btn-add { background: var(--primary); color: white; padding: 15px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 20px; transition: 0.3s; }
        .btn-cancel { background: #64748b; color: white; margin-top: 10px; border: none; padding: 10px; border-radius: 6px; cursor: pointer; display: none; width: 100%; }
        
        .barcode-group { display: flex; gap: 5px; }
        .btn-scan { background: var(--dark); color: white; padding: 0 15px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; }

        #reader { width: 100%; max-width: 400px; margin: 10px auto; border-radius: 8px; overflow: hidden; display: none; }

        .tag { padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase; display: inline-block; margin-top: 4px;}
        .tag-pendente { background: #fef3c7; color: #92400e; }
        .tag-realizada { background: #dcfce7; color: #166534; }
        .tag-data { background: #e0f2fe; color: #0284c7; }
        .navbar { position: fixed; top: 0; left: 0; width: 100%; background: white; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; }
    </style>

    <!-- 1. Carrega a biblioteca do Supabase primeiro -->
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    
    <!-- 2. Carrega sua configuração centralizada (Certifique-se que o caminho está correto) -->
    <script src="supabase_config.js"></script>

    <script>
        // Inicializa o cliente usando as constantes do supabase_config.js
        const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

        let recordedAudioBlob = null;
        let mediaRecorder;
        let audioChunks = [];
        let html5QrCode;

        async function verificar_login() {
            const { data: { session } } = await _supabase.auth.getSession();
            if (!session) {
                document.getElementById('tela-login').style.display = 'flex';
                document.getElementById('tela-sistema').style.display = 'none';
            } else {
                document.getElementById('tela-login').style.display = 'none';
                document.getElementById('tela-sistema').style.display = 'block';
                loadtarefas(); 
            }
        }

        async function fazerLogin() {
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;
            const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
            if (error) alert("Erro: " + error.message);
            else verificar_login();
        }

        document.addEventListener('DOMContentLoaded', verificar_login);
    </script>
</head>
<body>

    <div id="tela-login" class="flex justify-center items-center h-screen bg-slate-900" style="display: none;">
        <div class="bg-white p-10 rounded-xl w-full max-w-sm text-center border-t-4 border-emerald-500">
            <h2 class="text-2xl font-bold mb-6 text-slate-800">ERP ABP</h2>
            <input type="email" id="login-email" placeholder="E-mail" class="mb-4">
            <input type="password" id="login-senha" placeholder="Senha" class="mb-6">
            <button class="bg-emerald-500 text-white w-full p-3 rounded font-bold" onclick="fazerLogin()">Entrar</button>
        </div>
    </div>

    <div id="tela-sistema" style="display: none;">
        <div class="navbar">
            <div class="font-bold text-slate-800 text-xl"><i class="fas fa-tasks text-emerald-500"></i> Gestão de Exercícios</div>
            <button class="text-red-500 font-bold" onclick="_supabase.auth.signOut().then(() => verificar_login());">Sair</button>
        </div>

        <div class="container">
            <div class="card">
                <h3 id="form-title" class="text-xl font-bold mb-4">Nova Atividade</h3>
                <input type="hidden" id="edit-id">

                <div class="section-title">Informações Básicas</div>
                <div class="form-grid">
                    <div style="grid-column: span 2;"><label>Título do Exercício *</label><input type="text" id="titulo"></div>
                    <div><label>Categoria</label><input type="text" id="categoria" placeholder="Ex: Matemática, Cognitivo..."></div>
                    <div>
                        <label>Código de Barras</label>
                        <div class="barcode-group">
                            <input type="text" id="codigo_de_barras" placeholder="Digite ou leia">
                            <button type="button" class="btn-scan" onclick="startScanner()" title="Abrir Câmera">
                                <i class="fas fa-barcode"></i>
                            </button>
                        </div>
                    </div>
                    <div><label>Data Prazo</label><input type="date" id="data_prazo"></div>
                    <div>
                        <label>Status</label>
                        <select id="status_exercicio">
                            <option value="pendente">Pendente</option>
                            <option value="realizada">Realizada</option>
                        </select>
                    </div>
                </div>

                <div id="reader"></div>
                <button id="btn-stop-scanner" class="bg-red-500 text-white p-2 rounded w-full mb-4 font-bold" style="display:none;" onclick="stopScanner()">Fechar Câmera</button>

                <div class="section-title">Conteúdo do Exercício</div>
                <textarea id="descricao" placeholder="Digite o enunciado aqui..."></textarea>

                <div class="section-title">Mídias e Notas</div>
                <div class="form-grid">
                    <div>
                        <label>Foto da Resolução</label>
                        <input type="file" id="foto_resolucao" accept="image/*" capture="environment">
                    </div>
                    <div>
                        <label>Gravar Áudio</label>
                        <button class="w-full border-2 border-dashed p-3 rounded bg-slate-50 text-slate-500 font-bold" id="btn-audio" onclick="toggleGravação()"><i class="fas fa-microphone"></i> Gravar Leitura</button>
                        <audio id="audio-preview" controls style="display:none; width:100%; margin-top:10px; height:35px;"></audio>
                    </div>
                    <div style="grid-column: 1 / -1;">
                        <label>Observações do Responsável</label>
                        <textarea id="observacoes" placeholder="Relate dificuldades ou progressos..."></textarea>
                    </div>
                </div>

                <button class="btn-add" id="btn-save" onclick="handleSave()">Salvar Registro</button>
                <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
            </div>

            <div class="card">
                <input type="text" id="inputBusca" placeholder="Pesquisar exercícios..." onkeyup="filtrarTabela()" class="mb-4">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-50 text-slate-500 text-xs uppercase border-b">
                                <th class="p-4">Atividade / Categoria</th>
                                <th class="p-4">Código</th>
                                <th class="p-4">Status</th>
                                <th class="p-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="exercises-list"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script>
        // --- FUNÇÕES DO SCANNER ---
        function startScanner() {
            const readerDiv = document.getElementById('reader');
            const stopBtn = document.getElementById('btn-stop-scanner');
            readerDiv.style.display = 'block';
            stopBtn.style.display = 'block';
            html5QrCode = new Html5Qrcode("reader");
            const config = { fps: 10, qrbox: { width: 250, height: 150 } };
            html5QrCode.start({ facingMode: "environment" }, config, (decodedText) => {
                document.getElementById('codigo_de_barras').value = decodedText;
                stopScanner();
            }).catch(err => console.error(err));
        }

        function stopScanner() {
            if (html5QrCode) {
                html5QrCode.stop().then(() => {
                    document.getElementById('reader').style.display = 'none';
                    document.getElementById('btn-stop-scanner').style.display = 'none';
                });
            }
        }

        // --- ÁUDIO ---
        async function toggleGravação() {
            const btn = document.getElementById('btn-audio');
            const preview = document.getElementById('audio-preview');
            if (mediaRecorder && mediaRecorder.state === "recording") {
                mediaRecorder.stop();
                btn.innerHTML = '<i class="fas fa-microphone"></i> Gravar Novo Áudio';
            } else {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder = new MediaRecorder(stream);
                audioChunks = [];
                mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
                mediaRecorder.onstop = () => {
                    recordedAudioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    preview.src = URL.createObjectURL(recordedAudioBlob);
                    preview.style.display = 'block';
                };
                mediaRecorder.start();
                btn.innerHTML = '<i class="fas fa-stop-circle text-red-500"></i> Parar Gravação';
            }
        }

        // --- CRUD ---
        async function loadtarefas() {
            const { data, error } = await _supabase.from('tarefas').select('*').order('created_at', { ascending: false });
            if (error) { console.error(error); return; }
            const tbody = document.getElementById('exercises-list');
            tbody.innerHTML = data.map(e => {
                let prazo = e.data_prazo ? new Date(e.data_prazo).toLocaleDateString('pt-BR') : 'Sem prazo';
                return `
                <tr class="border-t">
                    <td class="p-4">
                        <span class="font-bold text-slate-800">${e.titulo}</span><br>
                        <span class="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold">${e.categoria || 'Geral'}</span>
                        <span class="tag tag-data"><i class="far fa-calendar-alt"></i> ${prazo}</span>
                    </td>
                    <td class="p-4 font-mono text-sm text-slate-400">${e.codigo_de_barras || '-'}</td>
                    <td class="p-4"><span class="tag tag-${e.status_exercicio}">${e.status_exercicio}</span></td>
                    <td class="p-4 text-center">
                        <button class="text-blue-500 mr-4" onclick="editFull('${e.id}')"><i class="fas fa-edit"></i></button>
                        <button class="text-red-500" onclick="deleteExercicio('${e.id}')"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>`}).join('');
        }

        async function handleSave() {
            const btn = document.getElementById('btn-save');
            btn.disabled = true; btn.innerText = "Salvando...";
            try {
                const id = document.getElementById('edit-id').value;
                const { data: { user } } = await _supabase.auth.getUser();
                const payload = {
                    titulo: document.getElementById('titulo').value,
                    descricao: document.getElementById('descricao').value,
                    categoria: document.getElementById('categoria').value,
                    codigo_de_barras: document.getElementById('codigo_de_barras').value,
                    data_prazo: document.getElementById('data_prazo').value || null,
                    status_exercicio: document.getElementById('status_exercicio').value,
                    observacoes: document.getElementById('observacoes').value,
                    user_id: user.id
                };
                
                // Storage handling (simplificado)
                const inputFoto = document.getElementById('foto_resolucao');
                if (inputFoto.files[0]) {
                    const fileName = `res_${Date.now()}.jpg`;
                    await _supabase.storage.from('resolucoes').upload(`public/${fileName}`, inputFoto.files[0]);
                    payload.foto_url = _supabase.storage.from('resolucoes').getPublicUrl(`public/${fileName}`).data.publicUrl;
                }

                const { error } = id ? await _supabase.from('tarefas').update(payload).eq('id', id) : await _supabase.from('tarefas').insert([payload]);
                if (error) throw error;
                resetForm(); loadtarefas();
            } catch (e) { alert(e.message); }
            finally { btn.disabled = false; btn.innerText = "Salvar Registro"; }
        }

        async function editFull(id) {
            const { data } = await _supabase.from('tarefas').select('*').eq('id', id).single();
            if (data) {
                document.getElementById('edit-id').value = data.id;
                document.getElementById('titulo').value = data.titulo;
                document.getElementById('descricao').value = data.descricao;
                document.getElementById('categoria').value = data.categoria || '';
                document.getElementById('codigo_de_barras').value = data.codigo_de_barras || '';
                document.getElementById('data_prazo').value = data.data_prazo || '';
                document.getElementById('status_exercicio').value = data.status_exercicio;
                document.getElementById('observacoes').value = data.observacoes || '';
                document.getElementById('form-title').innerText = "Editando Atividade";
                document.getElementById('btn-cancel').style.display = "block";
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        async function deleteExercicio(id) {
            if (confirm("Excluir?")) { await _supabase.from('tarefas').delete().eq('id', id); loadtarefas(); }
        }

        function resetForm() {
            document.getElementById('edit-id').value = '';
            document.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
            document.getElementById('status_exercicio').value = 'pendente';
            document.getElementById('form-title').innerText = "Nova Atividade";
            document.getElementById('btn-cancel').style.display = "none";
            recordedAudioBlob = null;
            document.getElementById('audio-preview').style.display = 'none';
        }

        function filtrarTabela() {
            const termo = document.getElementById('inputBusca').value.toLowerCase();
            document.querySelectorAll('#exercises-list tr').forEach(tr => {
                tr.style.display = tr.innerText.toLowerCase().includes(termo) ? '' : 'none';
            });
        }
    </script>
</body>
    <!--
    -- ============================================================================
-- SCRIPT: MÓDULO TAREFAS (GESTÃO DE EXERCÍCIOS)
-- ============================================================================

-- 1. Criação da Tabela com suporte a RLS e Identidade do Usuário
CREATE TABLE IF NOT EXISTS public.tarefas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    titulo TEXT NOT NULL,
    descricao TEXT,
    categoria TEXT,
    codigo_de_barras TEXT,
    data_prazo DATE,
    observacoes TEXT,
    foto_url TEXT,
    audio_url TEXT,
    status_exercicio TEXT DEFAULT 'pendente' CHECK (status_exercicio IN ('pendente', 'realizada')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.tarefas ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de Segurança: O usuário só vê e edita o que é DELE
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Usuários podem gerenciar suas próprias tarefas') THEN
        CREATE POLICY "Usuários podem gerenciar suas próprias tarefas" 
        ON public.tarefas 
        FOR ALL 
        USING (auth.uid() = user_id) 
        WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

-- 4. Configuração de Buckets para Mídias (Fotos e Áudios)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resolucoes', 'resolucoes', true) 
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('audios', 'audios', true) 
ON CONFLICT (id) DO NOTHING;

-- 5. Políticas de Storage: Permitir upload apenas para usuários autenticados
-- Nota: 'public' no bucket permite leitura anônima via URL, mas o upload exige login.
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Upload autenticado em mídias') THEN
        CREATE POLICY "Upload autenticado em mídias" 
        ON storage.objects FOR INSERT 
        WITH CHECK (auth.role() = 'authenticated');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Leitura pública de mídias') THEN
        CREATE POLICY "Leitura pública de mídias" 
        ON storage.objects FOR SELECT 
        USING (bucket_id IN ('resolucoes', 'audios'));
    END IF;
END $$;
    
    -->
</html>
```




