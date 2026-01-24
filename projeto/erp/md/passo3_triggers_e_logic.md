```
-- =====================================================================
-- ERP APB — PASSO 3: COMPORTAMENTO AUTOMÁTICO (TRIGGERS & LOGIC)
-- Objetivo: Garantir integridade de estoque, financeiro, auditoria e soft-delete
-- Versão revisada e reforçada — Janeiro / 2026
-- =====================================================================

-- ======================================================
-- 1. FUNÇÃO DE AUDITORIA UNIVERSAL (com IP e user-agent)
-- ======================================================
CREATE OR REPLACE FUNCTION fn_gerar_auditoria()
RETURNS TRIGGER AS $$
DECLARE
    headers jsonb;
BEGIN
    headers := current_setting('request.headers', true)::jsonb;

    -- Evitar logar os próprios inserts automáticos de financeiro (reduz ruído)
    IF TG_TABLE_NAME = 'financeiro_lancamentos' 
       AND TG_OP = 'INSERT' 
       AND NEW.descricao LIKE 'Receita gerada pela Venda:%' THEN
        RETURN NULL;
    END IF;

    INSERT INTO auditoria (
        usuario_id,
        empresa_id,
        tabela,
        acao,
        registro_id,
        dados_anteriores,
        dados_novos,
        data_evento,
        ip,
        user_agent
    )
    VALUES (
        auth.uid(),
        COALESCE(NEW.empresa_id, OLD.empresa_id, current_setting('app.current_empresa_id', true)::uuid),
        TG_TABLE_NAME,
        TG_OP,
        COALESCE(NEW.id, OLD.id),
        CASE WHEN TG_OP = 'INSERT' THEN NULL ELSE to_jsonb(OLD) END,
        CASE WHEN TG_OP = 'DELETE' THEN NULL ELSE to_jsonb(NEW) END,
        now(),
        headers->>'x-forwarded-for',
        headers->>'user-agent'
    );

    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;


-- ======================================================
-- 2. CONTROLE DE ESTOQUE (em nível de ITENS da venda)
-- ======================================================
CREATE OR REPLACE FUNCTION fn_atualizar_estoque_item()
RETURNS TRIGGER AS $$
DECLARE
    delta INTEGER;
    prod RECORD;
    venda_status TEXT;
BEGIN
    -- Determinar variação de quantidade
    IF TG_OP = 'INSERT' THEN 
        delta := NEW.quantidade;
    ELSIF TG_OP = 'UPDATE' THEN 
        delta := NEW.quantidade - OLD.quantidade;
    ELSIF TG_OP = 'DELETE' THEN 
        delta := -OLD.quantidade;
    END IF;

    -- Pegar status da venda associada
    SELECT status INTO venda_status
    FROM vendas
    WHERE id = COALESCE(NEW.venda_id, OLD.venda_id);

    -- Só baixa/devolve estoque se a venda está faturada
    IF venda_status = 'Faturada' THEN
        -- Lock para evitar race conditions
        SELECT * INTO prod 
        FROM produtos 
        WHERE id = COALESCE(NEW.produto_id, OLD.produto_id)
        FOR UPDATE;

        -- Verificação crítica: impede estoque negativo
        IF prod.estoque - delta < 0 THEN
            RAISE EXCEPTION 'Estoque insuficiente para o produto % (tentativa de reduzir % unidades, estoque atual: %)', 
                prod.nome, ABS(delta), prod.estoque;
        END IF;

        UPDATE produtos 
        SET estoque = estoque - delta 
        WHERE id = prod.id;
    END IF;

    RETURN NULL;  -- AFTER trigger
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;


-- ======================================================
-- 3. GERAÇÃO AUTOMÁTICA DE LANÇAMENTO FINANCEIRO (evita duplicatas)
-- ======================================================
CREATE OR REPLACE FUNCTION fn_gerar_financeiro_venda()
RETURNS TRIGGER AS $$
BEGIN
    -- Só gera receita na transição para 'Faturada' e se ainda não existe lançamento
    IF NEW.status = 'Faturada' 
       AND (OLD.status IS NULL OR OLD.status != 'Faturada')
       AND NOT EXISTS (
           SELECT 1 
           FROM financeiro_lancamentos 
           WHERE venda_id = NEW.id 
             AND tipo = 'receita'
       ) THEN
        
        INSERT INTO financeiro_lancamentos (
            empresa_id,
            tipo,
            valor,
            data_lancamento,
            descricao,
            venda_id,
            metodo_pagamento
        ) VALUES (
            NEW.empresa_id,
            'receita',
            NEW.valor_total,
            CURRENT_DATE,
            'Receita gerada pela Venda: ' || NEW.id::text,
            NEW.id,
            'Outros'  -- Pode ser ajustado via trigger futuro ou frontend
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;


-- ======================================================
-- 4. SOFT DELETE (impede exclusão física + seta ativo = false)
-- ======================================================
CREATE OR REPLACE FUNCTION fn_soft_delete()
RETURNS TRIGGER AS $$
BEGIN
    EXECUTE format('
        UPDATE %I
        SET excluido_em = now(),
            ativo = false
        WHERE id = $1
    ', TG_TABLE_NAME) USING OLD.id;
    
    RETURN NULL;  -- Cancela o DELETE real
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;


-- ======================================================
-- 5. APLICAÇÃO DOS TRIGGERS
-- ======================================================

-- Auditoria em tabelas críticas
CREATE OR REPLACE TRIGGER tr_auditoria_produtos 
AFTER INSERT OR UPDATE OR DELETE ON produtos 
FOR EACH ROW EXECUTE FUNCTION fn_gerar_auditoria();

CREATE OR REPLACE TRIGGER tr_auditoria_vendas 
AFTER INSERT OR UPDATE OR DELETE ON vendas 
FOR EACH ROW EXECUTE FUNCTION fn_gerar_auditoria();

CREATE OR REPLACE TRIGGER tr_auditoria_financeiro 
AFTER INSERT OR UPDATE OR DELETE ON financeiro_lancamentos 
FOR EACH ROW EXECUTE FUNCTION fn_gerar_auditoria();

-- Controle de estoque (agora em nível de itens — mais preciso)
DROP TRIGGER IF EXISTS tr_venda_estoque ON vendas;
CREATE OR REPLACE TRIGGER tr_item_estoque 
AFTER INSERT OR UPDATE OF quantidade OR DELETE ON vendas_itens 
FOR EACH ROW EXECUTE FUNCTION fn_atualizar_estoque_item();

-- Geração de lançamento financeiro
CREATE OR REPLACE TRIGGER tr_venda_financeiro 
AFTER UPDATE OF status ON vendas 
FOR EACH ROW EXECUTE FUNCTION fn_gerar_financeiro_venda();

-- Soft Delete em tabelas selecionadas (adicione mais conforme necessário)
CREATE OR REPLACE TRIGGER tr_soft_delete_clientes 
BEFORE DELETE ON clientes 
FOR EACH ROW EXECUTE FUNCTION fn_soft_delete();

CREATE OR REPLACE TRIGGER tr_soft_delete_produtos 
BEFORE DELETE ON produtos 
FOR EACH ROW EXECUTE FUNCTION fn_soft_delete();

CREATE OR REPLACE TRIGGER tr_soft_delete_fornecedores 
BEFORE DELETE ON fornecedores 
FOR EACH ROW EXECUTE FUNCTION fn_soft_delete();

-- =====================================================================
-- FIM DO PASSO 3 — Versão reforçada
-- Recomendações:
-- 1. Testar concorrência (várias vendas simultâneas)
-- 2. Criar índice em auditoria: (empresa_id, data_evento DESC)
-- 3. Próximo: Passo 4 — Funções atômicas (ex: fn_criar_venda completa)
-- =====================================================================
```
