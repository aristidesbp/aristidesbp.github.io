🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# PROJETO ERP
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# Supabase
```
# verificar versao do linux:
cat /etc/os-release
```
```
# verificar versao do docker e status do servico:
docker --version && sudo systemctl status docker --no-pager
```
```
# baixar e instalar a supabase cli diretamente em /usr/local/bin:
curl -fsSL https://raw.githubusercontent.com/supabase/cli/main/install.sh | sudo sh -s -- -b /usr/local/bin

# verificar se a instalacao foi concluida com sucesso:
supabase --version
```
```
# criar pasta para o backend local e entrar nela:
mkdir -p ~/supabase-local && cd ~/supabase-local

# inicializar a estrutura do supabase:
supabase init
```
```
# iniciar a stack completa de conteineres do supabase local:
supabase start
```
```
# iniciar a stack completa de conteineres do supabase local:
supabase start
```


## Criar conta e projeto
* Acesse: https://supabase.com
* Crie uma conta
* Clique em New Project
* 
## Escolha:(exemplo)
* Nome do projeto: erp_abp
* Senha do banco: ***********
* Região: brasil

# CRIAR TABELA
```
CREATE TABLE public.equipamentos_ti (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    nome text NOT NULL,
    preco numeric NOT NULL,
    especificacoes jsonb DEFAULT '{}'::jsonb,
    foto_url text DEFAULT NULL,
    esta_ativo boolean DEFAULT true,
    criado_em timestamp with time zone DEFAULT now()
);

```
# CRIAR STORAGE E SUAS POLITICAS
```
-- Criacao do bucket de fotos
INSERT INTO storage.buckets (id, name, public)
VALUES ('equipamentos_fotos', 'equipamentos_fotos', true)
ON CONFLICT (id) DO NOTHING;

-- Politicas de acesso para usuarios autenticados
CREATE POLICY "Apenas autenticados leem fotos" 
ON storage.objects FOR SELECT TO authenticated 
USING (bucket_id = 'equipamentos_fotos');

CREATE POLICY "Apenas autenticados sobem fotos" 
ON storage.objects FOR INSERT TO authenticated 
WITH CHECK (bucket_id = 'equipamentos_fotos');

CREATE POLICY "Apenas autenticados apagam fotos" 
ON storage.objects FOR DELETE TO authenticated 
USING (bucket_id = 'equipamentos_fotos');
```
# RLS_TABELA EQUIPAMENTOS
```
ALTER TABLE public.equipamentos_ti ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Apenas autenticados leem equipamentos ativos" 
ON public.equipamentos_ti 
FOR SELECT 
TO authenticated 
USING (esta_ativo = true);

CREATE POLICY "Apenas autenticados inserem equipamentos" 
ON public.equipamentos_ti 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Apenas autenticados atualizam equipamentos" 
ON public.equipamentos_ti 
FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Apenas autenticados deletam equipamentos" 
ON public.equipamentos_ti 
FOR DELETE 
TO authenticated 
USING (true);
```

# RPC  (Remote Procedure Call, Chamada de Procedimento Remoto).
* É uma técnica que permite ao seu aplicativo (frontend/cliente) invocar e executar uma função que reside fisicamente em outro servidor (backend/banco de dados) como se fosse uma função local.

## No ecossistema do Supabase/PostgreSQL, funciona da seguinte forma:
**Função no Servidor:**
Em vez de mandar comandos diretos (INSERT, UPDATE) do frontend, você cria a função dentro do banco de dados (as funções PL/pgSQL).

**Chamada Segura:**
O frontend dispara apenas uma linha de comando, como supabase.rpc('adicionar_equipamento_seguro', { dados }).

**Regra de Negócio Blindada:**
O processamento, as validações de dados e a segurança rodam dentro do Postgres com privilégios controlados, impedindo que usuários mal-intencionados alterem regras via console do navegador (DevTools).




# RPC_ADICIONAR_EQUIPAMENTO (FUNCTION NO SUPABASE)
```
CREATE OR REPLACE FUNCTION public.adicionar_equipamento_seguro(
    p_nome text,
    p_preco numeric,
    p_especificacoes jsonb,
    p_foto_url text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_novo_id uuid;
BEGIN
    IF p_nome IS NULL OR length(trim(p_nome)) < 3 THEN
        RAISE EXCEPTION 'Erro de Segurança: O nome do equipamento deve ter pelo menos 3 caracteres.';
    END IF;

    IF p_preco <= 0 THEN
        RAISE EXCEPTION 'Erro de Segurança: O preço deve ser maior que zero.';
    END IF;

    INSERT INTO public.equipamentos_ti (nome, preco, especificacoes, foto_url, esta_ativo)
    VALUES (trim(p_nome), p_preco, p_especificacoes, p_foto_url, true)
    RETURNING id INTO v_novo_id;

    RETURN v_novo_id;
END;
$$;

```

# RPC_ATUALIZAR_EQUIPAMENTO (FUNCTION NO SUPABASE)
```
CREATE OR REPLACE FUNCTION public.atualizar_equipamento_seguro(
    p_id uuid,
    p_novo_nome text,
    p_novo_preco numeric,
    p_foto_url text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF p_novo_nome IS NULL OR length(trim(p_novo_nome)) < 3 THEN
        RAISE EXCEPTION 'Erro de Segurança: O nome do equipamento deve ter pelo menos 3 caracteres.';
    END IF;

    IF p_novo_preco <= 0 THEN
        RAISE EXCEPTION 'Erro de Segurança: O preço deve ser maior que zero.';
    END IF;

    UPDATE public.equipamentos_ti
    SET 
        nome = trim(p_novo_nome),
        preco = p_novo_preco,
        foto_url = p_foto_url
    WHERE id = p_id AND esta_ativo = true;
END;
$$;
```

# RPC_DESATIVAR_EQUIPAMENTO (FUNCTION NO SUPABASE)
```
CREATE OR REPLACE FUNCTION public.desativar_equipamento_seguro(
    p_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.equipamentos_ti
    SET esta_ativo = false
    WHERE id = p_id;
END;
$$;

```

# RPC_LIMPAR_LIXEIRA (FUNCTION NO SUPABASE)
```
CREATE OR REPLACE FUNCTION public.limpar_lixeira_seguro()
RETURNS TABLE(url_da_foto text)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    DELETE FROM public.equipamentos_ti
    WHERE esta_ativo = false
    RETURNING foto_url;
END;
$$;

```
# RPC_LISTAR_LIXEIRA (FUNCTION NO SUPABASE)

```
-- =======================================================================================
-- RPC: LISTAR LIXEIRA (Visualizar itens ocultos)
-- =======================================================================================
CREATE OR REPLACE FUNCTION public.listar_lixeira_seguro()
RETURNS TABLE (
    id uuid,
    nome text,
    preco numeric,
    foto_url text,
    criado_em timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Busca todos os equipamentos que estão inativos (Soft Delete)
    RETURN QUERY
    SELECT e.id, e.nome, e.preco, e.foto_url, e.criado_em
    FROM public.equipamentos_ti e
    WHERE e.esta_ativo = false
    ORDER BY e.criado_em DESC;
END;
$$;
```

# RPC_RESTAURAR_EQUIPAMENTO (FUNCTION NO SUPABASE)

```
-- =======================================================================================
-- RPC: RESTAURAR EQUIPAMENTO (Desfaz o Soft Delete)
-- =======================================================================================
CREATE OR REPLACE FUNCTION public.restaurar_equipamento_seguro(
    p_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Atualiza o status do equipamento de volta para 'true' (Ativo)
    UPDATE public.equipamentos_ti
    SET esta_ativo = true
    WHERE id = p_id;
END;
$$;
```

# RPC_OUCULTAR_MULTIPOS (FUNCTION NO SUPABASE)

```
-- =======================================================================================
-- RPC: OCULTAR MÚLTIPLOS EQUIPAMENTOS (Soft Delete em Lote)
-- =======================================================================================
-- O parâmetro "p_ids uuid[]" significa que ele aceita uma LISTA (Array) de IDs.

CREATE OR REPLACE FUNCTION public.ocultar_multiplos_equipamentos_seguro(
    p_ids uuid[]
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Atualiza para inativo todos os itens cujo ID esteja dentro da lista fornecida
    UPDATE public.equipamentos_ti
    SET esta_ativo = false
    WHERE id = ANY(p_ids);
END;
$$;


```
# RPC_auditoria_equipamentos

```
-- =======================================================================================
-- AUDITORIA: TABELA E GATILHOS (TRIGGERS)
-- =======================================================================================

-- 1. Cria a tabela que guardará o histórico de cada ação
CREATE TABLE public.auditoria_equipamentos (
    id_auditoria uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    equipamento_id uuid,
    acao text NOT NULL, -- Vai registrar se foi INSERT, UPDATE ou DELETE
    dados_antigos jsonb, -- Guarda a foto de como o dado era antes
    dados_novos jsonb,   -- Guarda a foto de como o dado ficou
    usuario_id uuid,     -- Salva o ID do usuário que estava logado
    data_hora timestamp with time zone DEFAULT now()
);

-- 2. Cria a função de gatilho que o PostgreSQL vai disparar automaticamente
CREATE OR REPLACE FUNCTION public.registrar_auditoria()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Se alguém apagar (Hard Delete), salva os dados antigos
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO public.auditoria_equipamentos (equipamento_id, acao, dados_antigos, usuario_id)
        VALUES (OLD.id, 'DELETE', row_to_json(OLD)::jsonb, auth.uid());
        RETURN OLD;
    
    -- Se alguém atualizar (Update / Soft Delete), salva o antes e o depois
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO public.auditoria_equipamentos (equipamento_id, acao, dados_antigos, dados_novos, usuario_id)
        VALUES (NEW.id, 'UPDATE', row_to_json(OLD)::jsonb, row_to_json(NEW)::jsonb, auth.uid());
        RETURN NEW;
    
    -- Se alguém criar (Insert), salva os dados novos
    ELSIF (TG_OP = 'INSERT') THEN
        INSERT INTO public.auditoria_equipamentos (equipamento_id, acao, dados_novos, usuario_id)
        VALUES (NEW.id, 'INSERT', row_to_json(NEW)::jsonb, auth.uid());
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$;

-- 3. Atrela o gatilho à tabela de equipamentos
CREATE TRIGGER trigger_auditoria_equipamentos
AFTER INSERT OR UPDATE OR DELETE ON public.equipamentos_ti
FOR EACH ROW EXECUTE FUNCTION public.registrar_auditoria();

```
# atualização dos campos da tabela
```
-- =======================================================================================
-- 1. ADICIONAR NOVOS CAMPOS DO XML NA TABELA EQUIPAMENTOS_TI
-- =======================================================================================
ALTER TABLE public.equipamentos_ti
ADD COLUMN codigo_produto text,
ADD COLUMN ean text,
ADD COLUMN ncm text,
ADD COLUMN cest text,
ADD COLUMN cfop text,
ADD COLUMN unidade_comercial text,
ADD COLUMN quantidade numeric DEFAULT 1,
ADD COLUMN valor_total numeric;


-- =======================================================================================
-- 2. NOVA RPC: INSERIR MÚLTIPLOS PRODUTOS EM LOTE (Para a importação do XML)
-- =======================================================================================
CREATE OR REPLACE FUNCTION public.inserir_equipamentos_lote_seguro(
    p_itens jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    item jsonb;
BEGIN
    -- Faz um loop em cada produto extraído do XML pelo Frontend
    FOR item IN SELECT * FROM jsonb_array_elements(p_itens)
    LOOP
        INSERT INTO public.equipamentos_ti (
            nome, 
            preco, 
            codigo_produto, 
            ean, 
            ncm, 
            cest, 
            cfop, 
            unidade_comercial, 
            quantidade, 
            valor_total, 
            esta_ativo
        ) VALUES (
            item->>'nome',
            (item->>'preco')::numeric,
            item->>'codigo_produto',
            item->>'ean',
            item->>'ncm',
            item->>'cest',
            item->>'cfop',
            item->>'unidade_comercial',
            (item->>'quantidade')::numeric,
            (item->>'valor_total')::numeric,
            true
        );
    END LOOP;
END;
$$;
```
# atualizando as rpc de crud
```
-- =======================================================================================
-- ATUALIZAÇÃO DA RPC: ADICIONAR EQUIPAMENTO (Agora com campos fiscais)
-- =======================================================================================
CREATE OR REPLACE FUNCTION public.adicionar_equipamento_seguro(
    p_nome text,
    p_preco numeric,
    p_foto_url text DEFAULT NULL,
    p_codigo_produto text DEFAULT NULL,
    p_ean text DEFAULT NULL,
    p_ncm text DEFAULT NULL,
    p_cest text DEFAULT NULL,
    p_cfop text DEFAULT NULL,
    p_unidade_comercial text DEFAULT NULL,
    p_quantidade numeric DEFAULT 1,
    p_valor_total numeric DEFAULT 0
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_novo_id uuid;
BEGIN
    IF p_nome IS NULL OR length(trim(p_nome)) < 3 THEN
        RAISE EXCEPTION 'Erro de Segurança: O nome do equipamento deve ter pelo menos 3 caracteres.';
    END IF;

    INSERT INTO public.equipamentos_ti (
        nome, preco, foto_url, codigo_produto, ean, ncm, cest, cfop, unidade_comercial, quantidade, valor_total, esta_ativo
    )
    VALUES (
        trim(p_nome), p_preco, p_foto_url, p_codigo_produto, p_ean, p_ncm, p_cest, p_cfop, p_unidade_comercial, p_quantidade, p_valor_total, true
    )
    RETURNING id INTO v_novo_id;

    RETURN v_novo_id;
END;
$$;


-- =======================================================================================
-- ATUALIZAÇÃO DA RPC: ATUALIZAR EQUIPAMENTO (Agora com campos fiscais)
-- =======================================================================================
CREATE OR REPLACE FUNCTION public.atualizar_equipamento_seguro(
    p_id uuid,
    p_novo_nome text,
    p_novo_preco numeric,
    p_foto_url text DEFAULT NULL,
    p_codigo_produto text DEFAULT NULL,
    p_ean text DEFAULT NULL,
    p_ncm text DEFAULT NULL,
    p_cest text DEFAULT NULL,
    p_cfop text DEFAULT NULL,
    p_unidade_comercial text DEFAULT NULL,
    p_quantidade numeric DEFAULT 1,
    p_valor_total numeric DEFAULT 0
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF p_novo_nome IS NULL OR length(trim(p_novo_nome)) < 3 THEN
        RAISE EXCEPTION 'Erro de Segurança: O nome do equipamento deve ter pelo menos 3 caracteres.';
    END IF;

    UPDATE public.equipamentos_ti
    SET 
        nome = trim(p_novo_nome),
        preco = p_novo_preco,
        foto_url = p_foto_url,
        codigo_produto = p_codigo_produto,
        ean = p_ean,
        ncm = p_ncm,
        cest = p_cest,
        cfop = p_cfop,
        unidade_comercial = p_unidade_comercial,
        quantidade = p_quantidade,
        valor_total = p_valor_total
    WHERE id = p_id AND esta_ativo = true;
END;
$$;


```
# corrigindo erro de cadastros
```
-- =======================================================================================
-- CORREÇÃO DA RPC: ATUALIZAR EQUIPAMENTO (Padronização dos nomes dos parâmetros)
-- =======================================================================================
CREATE OR REPLACE FUNCTION public.atualizar_equipamento_seguro(
    p_id uuid,
    p_nome text,
    p_preco numeric,
    p_foto_url text DEFAULT NULL,
    p_codigo_produto text DEFAULT NULL,
    p_ean text DEFAULT NULL,
    p_ncm text DEFAULT NULL,
    p_cest text DEFAULT NULL,
    p_cfop text DEFAULT NULL,
    p_unidade_comercial text DEFAULT NULL,
    p_quantidade numeric DEFAULT 1,
    p_valor_total numeric DEFAULT 0
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Verifica a segurança do nome
    IF p_nome IS NULL OR length(trim(p_nome)) < 3 THEN
        RAISE EXCEPTION 'Erro de Segurança: O nome do equipamento deve ter pelo menos 3 caracteres.';
    END IF;

    -- Atualiza os dados no banco
    UPDATE public.equipamentos_ti
    SET 
        nome = trim(p_nome),
        preco = p_preco,
        foto_url = p_foto_url,
        codigo_produto = p_codigo_produto,
        ean = p_ean,
        ncm = p_ncm,
        cest = p_cest,
        cfop = p_cfop,
        unidade_comercial = p_unidade_comercial,
        quantidade = p_quantidade,
        valor_total = p_valor_total
    WHERE id = p_id AND esta_ativo = true;
END;
$$;

-- Atualiza a memória de cache do Supabase para ele reconhecer a mudança instantaneamente
NOTIFY pgrst, 'reload schema';

```
# ajeitando o codigo do editar
```
-- =======================================================================================
-- PASSO 1: LIMPEZA (Destruir versões antigas que estão a causar conflito)
-- =======================================================================================
-- Elimina a primeira versão da função (que tinha apenas 4 parâmetros)
DROP FUNCTION IF EXISTS public.atualizar_equipamento_seguro(uuid, text, numeric, text);

-- Elimina a versão atual para garantir que é recriada do zero sem conflitos de cache
DROP FUNCTION IF EXISTS public.atualizar_equipamento_seguro(uuid, text, numeric, text, text, text, text, text, text, text, numeric, numeric);


-- =======================================================================================
-- PASSO 2: RECRIAR A RPC DE FORMA DEFINITIVA
-- =======================================================================================
CREATE OR REPLACE FUNCTION public.atualizar_equipamento_seguro(
    p_id uuid,
    p_nome text,
    p_preco numeric,
    p_foto_url text DEFAULT NULL,
    p_codigo_produto text DEFAULT NULL,
    p_ean text DEFAULT NULL,
    p_ncm text DEFAULT NULL,
    p_cest text DEFAULT NULL,
    p_cfop text DEFAULT NULL,
    p_unidade_comercial text DEFAULT NULL,
    p_quantidade numeric DEFAULT 1,
    p_valor_total numeric DEFAULT 0
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Trava de segurança: O nome não pode estar vazio ou ser muito curto
    IF p_nome IS NULL OR length(trim(p_nome)) < 3 THEN
        RAISE EXCEPTION 'Erro de Segurança: O nome do equipamento deve ter pelo menos 3 caracteres.';
    END IF;

    -- Atualiza todos os campos no banco de dados baseando-se no ID (p_id)
    UPDATE public.equipamentos_ti
    SET 
        nome = trim(p_nome),
        preco = p_preco,
        foto_url = p_foto_url,
        codigo_produto = p_codigo_produto,
        ean = p_ean,
        ncm = p_ncm,
        cest = p_cest,
        cfop = p_cfop,
        unidade_comercial = p_unidade_comercial,
        quantidade = p_quantidade,
        valor_total = p_valor_total
    WHERE id = p_id AND esta_ativo = true;
END;
$$;

-- =======================================================================================
-- PASSO 3: ATUALIZAR CACHE DA API
-- =======================================================================================
-- Obriga o Supabase (PostgREST) a reler as funções, evitando o erro "Could not find the function"
NOTIFY pgrst, 'reload schema';
```

# migrando para produtos

```
-- =======================================================================================
-- 1. RENOMEAR A TABELA PRINCIPAL E O GATILHO DE AUDITORIA
-- =======================================================================================
ALTER TABLE IF EXISTS public.equipamentos_ti RENAME TO produtos;

-- =======================================================================================
-- 2. ADICIONAR OS NOVOS CAMPOS DE CONTROLO DE INVENTÁRIO E LOGÍSTICA
-- =======================================================================================
ALTER TABLE public.produtos
ADD COLUMN IF NOT EXISTS fornecedor text,
ADD COLUMN IF NOT EXISTS preco_custo numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS estoque_minimo numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS origem text,
ADD COLUMN IF NOT EXISTS local_estoque text,
ADD COLUMN IF NOT EXISTS local_loja text,
ADD COLUMN IF NOT EXISTS tipo_embalagem text,
ADD COLUMN IF NOT EXISTS categoria text,
ADD COLUMN IF NOT EXISTS peso_liquido numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS dimensoes text,
ADD COLUMN IF NOT EXISTS data_compra date,
ADD COLUMN IF NOT EXISTS data_vencimento date;

-- Nota de Engenharia: 
-- A coluna 'preco' será o "Preço de Venda"
-- A coluna 'quantidade' será o "Estoque Atual"

-- =======================================================================================
-- 3. ATUALIZAR POLÍTICAS DE SEGURANÇA (RLS) PARA A NOVA TABELA
-- =======================================================================================
-- Removemos as políticas antigas para manter o painel limpo
DROP POLICY IF EXISTS "Apenas autenticados leem equipamentos ativos" ON public.produtos;
DROP POLICY IF EXISTS "Apenas autenticados inserem equipamentos" ON public.produtos;
DROP POLICY IF EXISTS "Apenas autenticados atualizam equipamentos" ON public.produtos;
DROP POLICY IF EXISTS "Apenas autenticados deletam equipamentos" ON public.produtos;

-- Recriamos as políticas com os nomes corretos
CREATE POLICY "Apenas autenticados leem produtos ativos" ON public.produtos FOR SELECT TO authenticated USING (esta_ativo = true);
CREATE POLICY "Apenas autenticados inserem produtos" ON public.produtos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Apenas autenticados atualizam produtos" ON public.produtos FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Apenas autenticados deletam produtos" ON public.produtos FOR DELETE TO authenticated USING (true);

-- =======================================================================================
-- 4. ELIMINAR RPCS ANTIGAS (Limpeza de Backend)
-- =======================================================================================
DROP FUNCTION IF EXISTS public.desativar_equipamento_seguro(uuid);
DROP FUNCTION IF EXISTS public.restaurar_equipamento_seguro(uuid);
DROP FUNCTION IF EXISTS public.limpar_lixeira_seguro();
DROP FUNCTION IF EXISTS public.listar_lixeira_seguro();
DROP FUNCTION IF EXISTS public.ocultar_multiplos_equipamentos_seguro(uuid[]);
DROP FUNCTION IF EXISTS public.inserir_equipamentos_lote_seguro(jsonb);

-- =======================================================================================
-- 5. CRIAR AS NOVAS RPCS (Preparadas para suportar todos os dados comerciais)
-- =======================================================================================

-- 5.1. ADICIONAR PRODUTO
CREATE OR REPLACE FUNCTION public.adicionar_produto_seguro(
    p_nome text,
    p_preco numeric, 
    p_foto_url text DEFAULT NULL,
    p_codigo_produto text DEFAULT NULL,
    p_ean text DEFAULT NULL,
    p_ncm text DEFAULT NULL,
    p_cest text DEFAULT NULL,
    p_cfop text DEFAULT NULL,
    p_unidade_comercial text DEFAULT NULL,
    p_quantidade numeric DEFAULT 1, 
    p_valor_total numeric DEFAULT 0,
    p_fornecedor text DEFAULT NULL,
    p_preco_custo numeric DEFAULT 0,
    p_estoque_minimo numeric DEFAULT 0,
    p_origem text DEFAULT NULL,
    p_local_estoque text DEFAULT NULL,
    p_local_loja text DEFAULT NULL,
    p_tipo_embalagem text DEFAULT NULL,
    p_categoria text DEFAULT NULL,
    p_peso_liquido numeric DEFAULT 0,
    p_dimensoes text DEFAULT NULL,
    p_data_compra date DEFAULT NULL,
    p_data_vencimento date DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_novo_id uuid;
BEGIN
    IF p_nome IS NULL OR length(trim(p_nome)) < 3 THEN
        RAISE EXCEPTION 'Erro de Segurança: O nome do produto deve ter pelo menos 3 caracteres.';
    END IF;

    INSERT INTO public.produtos (
        nome, preco, foto_url, codigo_produto, ean, ncm, cest, cfop, unidade_comercial, quantidade, valor_total,
        fornecedor, preco_custo, estoque_minimo, origem, local_estoque, local_loja, tipo_embalagem, categoria,
        peso_liquido, dimensoes, data_compra, data_vencimento, esta_ativo
    )
    VALUES (
        trim(p_nome), p_preco, p_foto_url, p_codigo_produto, p_ean, p_ncm, p_cest, p_cfop, p_unidade_comercial, p_quantidade, p_valor_total,
        p_fornecedor, p_preco_custo, p_estoque_minimo, p_origem, p_local_estoque, p_local_loja, p_tipo_embalagem, p_categoria,
        p_peso_liquido, p_dimensoes, p_data_compra, p_data_vencimento, true
    )
    RETURNING id INTO v_novo_id;

    RETURN v_novo_id;
END;
$$;

-- 5.2. ATUALIZAR PRODUTO
CREATE OR REPLACE FUNCTION public.atualizar_produto_seguro(
    p_id uuid,
    p_nome text,
    p_preco numeric,
    p_foto_url text DEFAULT NULL,
    p_codigo_produto text DEFAULT NULL,
    p_ean text DEFAULT NULL,
    p_ncm text DEFAULT NULL,
    p_cest text DEFAULT NULL,
    p_cfop text DEFAULT NULL,
    p_unidade_comercial text DEFAULT NULL,
    p_quantidade numeric DEFAULT 1,
    p_valor_total numeric DEFAULT 0,
    p_fornecedor text DEFAULT NULL,
    p_preco_custo numeric DEFAULT 0,
    p_estoque_minimo numeric DEFAULT 0,
    p_origem text DEFAULT NULL,
    p_local_estoque text DEFAULT NULL,
    p_local_loja text DEFAULT NULL,
    p_tipo_embalagem text DEFAULT NULL,
    p_categoria text DEFAULT NULL,
    p_peso_liquido numeric DEFAULT 0,
    p_dimensoes text DEFAULT NULL,
    p_data_compra date DEFAULT NULL,
    p_data_vencimento date DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF p_nome IS NULL OR length(trim(p_nome)) < 3 THEN
        RAISE EXCEPTION 'Erro de Segurança: O nome do produto deve ter pelo menos 3 caracteres.';
    END IF;

    UPDATE public.produtos
    SET 
        nome = trim(p_nome),
        preco = p_preco,
        foto_url = p_foto_url,
        codigo_produto = p_codigo_produto,
        ean = p_ean,
        ncm = p_ncm,
        cest = p_cest,
        cfop = p_cfop,
        unidade_comercial = p_unidade_comercial,
        quantidade = p_quantidade,
        valor_total = p_valor_total,
        fornecedor = p_fornecedor,
        preco_custo = p_preco_custo,
        estoque_minimo = p_estoque_minimo,
        origem = p_origem,
        local_estoque = p_local_estoque,
        local_loja = p_local_loja,
        tipo_embalagem = p_tipo_embalagem,
        categoria = p_categoria,
        peso_liquido = p_peso_liquido,
        dimensoes = p_dimensoes,
        data_compra = p_data_compra,
        data_vencimento = p_data_vencimento
    WHERE id = p_id AND esta_ativo = true;
END;
$$;

-- 5.3. DESATIVAR PRODUTO (Soft Delete)
CREATE OR REPLACE FUNCTION public.desativar_produto_seguro(p_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    UPDATE public.produtos SET esta_ativo = false WHERE id = p_id;
END;
$$;

-- 5.4. RESTAURAR PRODUTO
CREATE OR REPLACE FUNCTION public.restaurar_produto_seguro(p_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    UPDATE public.produtos SET esta_ativo = true WHERE id = p_id;
END;
$$;

-- 5.5. LIMPAR LIXEIRA DE PRODUTOS
CREATE OR REPLACE FUNCTION public.limpar_lixeira_produtos_seguro()
RETURNS TABLE(url_da_foto text) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    RETURN QUERY DELETE FROM public.produtos WHERE esta_ativo = false RETURNING foto_url;
END;
$$;

-- 5.6. LISTAR LIXEIRA DE PRODUTOS
CREATE OR REPLACE FUNCTION public.listar_lixeira_produtos_seguro()
RETURNS TABLE (id uuid, nome text, preco numeric, foto_url text, criado_em timestamp with time zone) 
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    RETURN QUERY SELECT p.id, p.nome, p.preco, p.foto_url, p.criado_em FROM public.produtos p WHERE p.esta_ativo = false ORDER BY p.criado_em DESC;
END;
$$;

-- 5.7. OCULTAR MÚLTIPLOS PRODUTOS
CREATE OR REPLACE FUNCTION public.ocultar_multiplos_produtos_seguro(p_ids uuid[])
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    UPDATE public.produtos SET esta_ativo = false WHERE id = ANY(p_ids);
END;
$$;

-- 5.8. INSERIR EM LOTE (Para o leitor de XML)
CREATE OR REPLACE FUNCTION public.inserir_produtos_lote_seguro(p_itens jsonb)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE item jsonb;
BEGIN
    FOR item IN SELECT * FROM jsonb_array_elements(p_itens)
    LOOP
        INSERT INTO public.produtos (
            nome, preco, codigo_produto, ean, ncm, cest, cfop, unidade_comercial, quantidade, valor_total, esta_ativo
        ) VALUES (
            item->>'nome', (item->>'preco')::numeric, item->>'codigo_produto', item->>'ean', item->>'ncm', item->>'cest', 
            item->>'cfop', item->>'unidade_comercial', (item->>'quantidade')::numeric, (item->>'valor_total')::numeric, true
        );
    END LOOP;
END;
$$;

-- =======================================================================================
-- 6. RECARREGAR O CACHE DO SUPABASE
-- =======================================================================================
NOTIFY pgrst, 'reload schema';

```
# preço de venda e custo

```
-- =======================================================================================
-- ATUALIZAÇÃO DA RPC: INSERIR PRODUTOS EM LOTE (Agora com Preço de Custo e Venda)
-- =======================================================================================
CREATE OR REPLACE FUNCTION public.inserir_produtos_lote_seguro(p_itens jsonb)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE item jsonb;
BEGIN
    FOR item IN SELECT * FROM jsonb_array_elements(p_itens)
    LOOP
        INSERT INTO public.produtos (
            nome, preco_custo, preco, codigo_produto, ean, ncm, cest, cfop, unidade_comercial, quantidade, valor_total, esta_ativo
        ) VALUES (
            item->>'nome', 
            (item->>'preco_custo')::numeric, 
            (item->>'preco_venda')::numeric, 
            item->>'codigo_produto', 
            item->>'ean', 
            item->>'ncm', 
            item->>'cest', 
            item->>'cfop', 
            item->>'unidade_comercial', 
            (item->>'quantidade')::numeric, 
            (item->>'valor_total')::numeric, 
            true
        );
    END LOOP;
END;
$$;

-- Recarrega o cache do Supabase
NOTIFY pgrst, 'reload schema';

``


















