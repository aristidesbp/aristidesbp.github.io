-- =====================================================================
-- ERP APB — PASSO 4: FUNÇÕES CRÍTICAS (REGRAS DE NEGÓCIO ATÔMICAS)
-- Versão reforçada — Janeiro / 2026
-- =====================================================================

-- ======================================================
-- 1. FINALIZAR VENDA (com transação + validação segura)
-- ======================================================
CREATE OR REPLACE FUNCTION fn_finalizar_venda(
    p_venda_id UUID,
    p_metodo_pagamento TEXT DEFAULT 'Dinheiro'
)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
    v_venda RECORD;
    v_lancamento RECORD;
    v_empresa_id UUID;
BEGIN
    -- Início da transação explícita
    BEGIN
        -- 1. Lock pessimista + valida empresa do usuário atual
        SELECT * INTO v_venda 
        FROM vendas 
        WHERE id = p_venda_id 
          AND empresa_id = current_empresa_id()
        FOR UPDATE;

        IF NOT FOUND THEN
            RAISE EXCEPTION 'Venda não encontrada ou pertence a outra empresa.';
        END IF;

        IF v_venda.status = 'Faturada' THEN
            RAISE EXCEPTION 'Venda já foi faturada.';
        END IF;

        -- 2. Atualiza venda → dispara triggers (estoque + financeiro)
        UPDATE vendas
        SET status = 'Faturada',
            status_pagamento = 'Pago',
            data_venda = now()
        WHERE id = p_venda_id;

        -- 3. Busca o lançamento recém-criado pelo trigger
        SELECT * INTO v_lancamento
        FROM financeiro_lancamentos
        WHERE venda_id = p_venda_id
          AND tipo = 'receita'
          AND descricao LIKE 'Receita gerada pela Venda%'
        ORDER BY data_lancamento DESC
        LIMIT 1;

        IF NOT FOUND THEN
            RAISE EXCEPTION 'Lançamento financeiro automático não encontrado.';
        END IF;

        -- 4. Atualiza apenas esse lançamento
        UPDATE financeiro_lancamentos
        SET metodo_pagamento = p_metodo_pagamento
        WHERE id = v_lancamento.id;

        RETURN jsonb_build_object(
            'success', true,
            'message', 'Venda finalizada com sucesso',
            'venda_id', p_venda_id,
            'valor_total', v_venda.valor_total,
            'lancamento_id', v_lancamento.id
        );

    EXCEPTION WHEN OTHERS THEN
        RETURN jsonb_build_object(
            'success', false,
            'message', SQLERRM,
            'code', SQLSTATE
        );
    END;
END;
$$;


-- ======================================================
-- 2. ABRIR CAIXA (com validação de permissão)
-- ======================================================
CREATE OR REPLACE FUNCTION fn_abrir_caixa(
    p_saldo_inicial NUMERIC DEFAULT 0
)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
    v_caixa_id UUID;
    v_empresa_id UUID := current_empresa_id();
BEGIN
    -- Verifica permissão (exemplo: gestor ou admin)
    IF NOT check_user_role(v_empresa_id, 'gestor') 
       AND NOT check_user_role(v_empresa_id, 'admin') THEN
        RAISE EXCEPTION 'Usuário sem permissão para abrir caixa.';
    END IF;

    IF EXISTS (
        SELECT 1 FROM controle_caixa
        WHERE empresa_id = v_empresa_id
          AND usuario_id = auth.uid()
          AND status = 'aberto'
    ) THEN
        RAISE EXCEPTION 'Já existe um caixa aberto para este usuário.';
    END IF;

    INSERT INTO controle_caixa (
        empresa_id, usuario_id, saldo_inicial, status
    ) VALUES (
        v_empresa_id, auth.uid(), p_saldo_inicial, 'aberto'
    ) RETURNING id INTO v_caixa_id;

    RETURN jsonb_build_object(
        'success', true,
        'caixa_id', v_caixa_id,
        'message', 'Caixa aberto com sucesso'
    );
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'message', SQLERRM);
END;
$$;


-- ======================================================
-- 3. CANCELAR VENDA (com estorno separado)
-- ======================================================
CREATE OR REPLACE FUNCTION fn_cancelar_venda(p_venda_id UUID)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
    v_venda RECORD;
BEGIN
    SELECT * INTO v_venda 
    FROM vendas 
    WHERE id = p_venda_id 
      AND empresa_id = current_empresa_id()
    FOR UPDATE;

    IF NOT FOUND OR v_venda.status = 'Cancelada' THEN
        RAISE EXCEPTION 'Venda não encontrada, pertence a outra empresa ou já cancelada.';
    END IF;

    -- Atualiza status (dispara devolução de estoque via trigger)
    UPDATE vendas 
    SET status = 'Cancelada', 
        status_pagamento = 'Cancelado'
    WHERE id = p_venda_id;

    -- Cria estorno separado (melhor prática contábil)
    INSERT INTO financeiro_lancamentos (
        empresa_id, tipo, valor, data_lancamento, descricao, venda_id, metodo_pagamento
    ) VALUES (
        v_venda.empresa_id, 'despesa', v_venda.valor_total, CURRENT_DATE,
        'Estorno da Venda: ' || p_venda_id::text, p_venda_id, 'Estorno'
    );

    RETURN jsonb_build_object(
        'success', true,
        'message', 'Venda cancelada e estorno gerado com sucesso'
    );
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'message', SQLERRM);
END;
$$;


-- =====================================================================
-- FIM DO PASSO 4 — Versão atômica e mais segura
-- Recomendações:
-- • Testar cenários concorrentes (duas finalizações simultâneas)
-- • Adicionar trigger para impedir novos lançamentos em caixa fechado
-- • Próximo: funções de fechamento de caixa e relatórios
-- =====================================================================
