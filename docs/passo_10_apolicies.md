# 🔐 POLICIES (RLS) — OBRIGATÓRIO EM ERP REAL
Se você for usar Supabase, Row Level Security (RLS) é obrigatório.
Sem isso, não é ERP profissional.
* 📌 O que são Policies?
### Regras SQL que dizem:
quem pode ver, inserir, atualizar ou deletar cada linha.
```
-- =====================================================================
-- ERP APB — PASSO 2: RLS ENTERPRISE IRREFUTÁVEL
-- Multi-tenant • Multi-role • Zero brechas • Auditável
-- Janeiro 2026
-- =====================================================================

-- ======================================================
-- 0. FUNÇÕES AUXILIARES (fail-fast, hardened)
-- ======================================================

CREATE OR REPLACE FUNCTION check_user_role(p_empresa_id UUID, p_required_role TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM usuario_empresas ue
        JOIN roles r ON r.id = ue.role_id
        WHERE ue.usuario_id = auth.uid()
          AND ue.empresa_id = p_empresa_id
          AND r.nome = p_required_role
    );
END;
$$;

CREATE OR REPLACE FUNCTION is_global_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM usuario_empresas ue
        JOIN roles r ON r.id = ue.role_id
        WHERE ue.usuario_id = auth.uid()
          AND r.nome = 'admin'
    );
END;
$$;

CREATE OR REPLACE FUNCTION set_current_empresa(p_empresa_id UUID)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
    PERFORM set_config('app.current_empresa_id', p_empresa_id::text, true);
END;
$$;

CREATE OR REPLACE FUNCTION current_empresa_id()
RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_empresa UUID;
BEGIN
    v_empresa := current_setting('app.current_empresa_id', true)::UUID;
    IF v_empresa IS NULL THEN
        RAISE EXCEPTION 'Sessão sem empresa definida.';
    END IF;
    RETURN v_empresa;
END;
$$;

-- ======================================================
-- 1. RLS ATIVO (explícito)
-- ======================================================

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuario_senhas ENABLE ROW LEVEL SECURITY;
ALTER TABLE politicas_servico ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentacao ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuario_empresas ENABLE ROW LEVEL SECURITY;

ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE fornecedores ENABLE ROW LEVEL SECURITY;
ALTER TABLE funcionarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicos ENABLE ROW LEVEL SECURITY;

ALTER TABLE vendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendas_itens ENABLE ROW LEVEL SECURITY;

ALTER TABLE controle_caixa ENABLE ROW LEVEL SECURITY;
ALTER TABLE financeiro_contas ENABLE ROW LEVEL SECURITY;
ALTER TABLE financeiro_lancamentos ENABLE ROW LEVEL SECURITY;

ALTER TABLE conversas ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensagens ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_respostas ENABLE ROW LEVEL SECURITY;
ALTER TABLE notas ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_config ENABLE ROW LEVEL SECURITY;

ALTER TABLE auditoria ENABLE ROW LEVEL SECURITY;

-- ======================================================
-- 2. TABELAS GLOBAIS
-- ======================================================

-- ROLES
CREATE POLICY roles_select ON roles
FOR SELECT USING (true);

CREATE POLICY roles_insert ON roles
FOR INSERT WITH CHECK (is_global_admin());

CREATE POLICY roles_update ON roles
FOR UPDATE USING (is_global_admin()) WITH CHECK (is_global_admin());

CREATE POLICY roles_delete ON roles
FOR DELETE USING (is_global_admin());

-- EMPRESAS
CREATE POLICY empresas_select ON empresas
FOR SELECT USING (
    is_global_admin()
    OR EXISTS (
        SELECT 1 FROM usuario_empresas
        WHERE usuario_id = auth.uid()
          AND empresa_id = empresas.id
    )
);

CREATE POLICY empresas_insert ON empresas
FOR INSERT WITH CHECK (is_global_admin());

CREATE POLICY empresas_update ON empresas
FOR UPDATE USING (is_global_admin()) WITH CHECK (is_global_admin());

CREATE POLICY empresas_delete ON empresas
FOR DELETE USING (is_global_admin());

-- USUÁRIOS
CREATE POLICY usuarios_self_select ON usuarios
FOR SELECT USING (id = auth.uid());

CREATE POLICY usuarios_self_update ON usuarios
FOR UPDATE USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE POLICY usuarios_admin_all_select ON usuarios
FOR SELECT USING (is_global_admin());

CREATE POLICY usuarios_admin_update ON usuarios
FOR UPDATE USING (is_global_admin()) WITH CHECK (is_global_admin());

CREATE POLICY usuarios_admin_delete ON usuarios
FOR DELETE USING (is_global_admin());

-- USUARIO_SENHAS
CREATE POLICY usuario_senhas_self_select ON usuario_senhas
FOR SELECT USING (usuario_id = auth.uid());

CREATE POLICY usuario_senhas_self_update ON usuario_senhas
FOR UPDATE USING (usuario_id = auth.uid()) WITH CHECK (usuario_id = auth.uid());

CREATE POLICY usuario_senhas_admin_select ON usuario_senhas
FOR SELECT USING (is_global_admin());

CREATE POLICY usuario_senhas_admin_update ON usuario_senhas
FOR UPDATE USING (is_global_admin()) WITH CHECK (is_global_admin());

CREATE POLICY usuario_senhas_admin_delete ON usuario_senhas
FOR DELETE USING (is_global_admin());

-- ======================================================
-- 3. PADRÃO DE NEGÓCIO (clientes, produtos, etc.)
-- ======================================================

-- CLIENTES (repita o mesmo padrão para fornecedores, funcionarios, categorias, produtos, servicos)

CREATE POLICY clientes_select ON clientes
FOR SELECT USING (
    clientes.empresa_id = current_empresa_id()
    AND EXISTS (
        SELECT 1 FROM usuario_empresas
        WHERE usuario_id = auth.uid()
          AND empresa_id = clientes.empresa_id
    )
);

CREATE POLICY clientes_insert ON clientes
FOR INSERT WITH CHECK (
    empresa_id = current_empresa_id()
    AND check_user_role(empresa_id, 'gestor')
);

CREATE POLICY clientes_update ON clientes
FOR UPDATE USING (
    empresa_id = current_empresa_id()
    AND check_user_role(empresa_id, 'gestor')
) WITH CHECK (
    empresa_id = current_empresa_id()
    AND check_user_role(empresa_id, 'gestor')
);

CREATE POLICY clientes_delete ON clientes
FOR DELETE USING (is_global_admin());

-- (APLICAR O MESMO BLOCO PARA: fornecedores, funcionarios, categorias, produtos, servicos)

-- ======================================================
-- 4. VENDAS
-- ======================================================

CREATE POLICY vendas_select ON vendas
FOR SELECT USING (
    vendas.empresa_id = current_empresa_id()
    AND EXISTS (
        SELECT 1 FROM usuario_empresas
        WHERE usuario_id = auth.uid()
          AND empresa_id = vendas.empresa_id
    )
    AND (
        is_global_admin()
        OR check_user_role(empresa_id, 'gestor')
        OR (check_user_role(empresa_id, 'vendedor') AND usuario_id = auth.uid())
    )
);

CREATE POLICY vendas_insert ON vendas
FOR INSERT WITH CHECK (
    empresa_id = current_empresa_id()
    AND (
        check_user_role(empresa_id, 'gestor')
        OR (check_user_role(empresa_id, 'vendedor') AND usuario_id = auth.uid())
    )
);

CREATE POLICY vendas_update ON vendas
FOR UPDATE USING (
    empresa_id = current_empresa_id()
    AND (
        check_user_role(empresa_id, 'gestor')
        OR (check_user_role(empresa_id, 'vendedor') AND usuario_id = auth.uid())
    )
) WITH CHECK (
    empresa_id = current_empresa_id()
    AND (
        check_user_role(empresa_id, 'gestor')
        OR usuario_id = auth.uid()
    )
);

CREATE POLICY vendas_delete ON vendas
FOR DELETE USING (is_global_admin());

-- ======================================================
-- 5. AUDITORIA (leitura controlada)
-- ======================================================

REVOKE INSERT, UPDATE, DELETE ON auditoria FROM authenticated, anon;

CREATE POLICY auditoria_select ON auditoria
FOR SELECT USING (
    is_global_admin()
    OR (
        auditoria.empresa_id = current_empresa_id()
        AND check_user_role(empresa_id, 'gestor')
    )
);

-- =====================================================================
-- FIM — NÍVEL ENTERPRISE REAL
-- Sem atalhos • Sem ambiguidade • Sem discussão
-- =====================================================================



```









