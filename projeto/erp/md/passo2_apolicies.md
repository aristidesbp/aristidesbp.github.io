# 🔐 POLICIES (RLS) — OBRIGATÓRIO EM ERP REAL
Se você for usar Supabase, Row Level Security (RLS) é obrigatório.
Sem isso, não é ERP profissional.
* 📌 O que são Policies?
### Regras SQL que dizem:
quem pode ver, inserir, atualizar ou deletar cada linha.
```
-- =====================================================================
-- ERP APB — PASSO 2: POLICIES RLS (ROW LEVEL SECURITY)
-- PostgreSQL / Supabase
-- Janeiro / 2026
-- Policies completas para todas as tabelas, garantindo multi-tenant (empresa_id),
-- acesso baseado em roles (via usuario_empresas e roles) e autenticação Supabase (auth.uid()).
-- 
-- ASSUNÇÕES:
-- - Usuário autenticado via Supabase (auth.uid() = usuarios.id)
-- - Sessão configura 'app.current_empresa_id' com a empresa atual do usuário (setada no login)
-- - Roles: 'admin' (acesso total), 'gestor' (full na empresa), 'vendedor' (vendas/clientes), 
--   'financeiro' (financeiro/caixa), 'suporte' (chat/notas), 'chat_user' (apenas chat)
-- - Tabelas globais (sem empresa_id): policies mais amplas (ex: só admins escrevem)
-- - Tabelas com empresa_id: filtro obrigatório por empresa_id = current_setting('app.current_empresa_id')::uuid
-- - Função auxiliar: check_user_role(empresa_id, required_role) verifica se o usuário tem o role na empresa
-- 
-- USO: Execute após o Passo 1. Em produção, teste com usuários reais.
-- =====================================================================

-- ======================================================
-- 0. FUNÇÕES AUXILIARES PARA POLICIES
-- ======================================================

-- Função para verificar se o usuário autenticado tem um role específico na empresa
CREATE OR REPLACE FUNCTION check_user_role(p_empresa_id UUID, p_required_role TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM usuario_empresas ue
        JOIN roles r ON ue.role_id = r.id
        WHERE ue.usuario_id = auth.uid()
          AND ue.empresa_id = p_empresa_id
          AND r.nome = p_required_role
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para verificar se o usuário é admin global (role 'admin' em qualquer empresa)
CREATE OR REPLACE FUNCTION is_global_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM usuario_empresas ue
        JOIN roles r ON ue.role_id = r.id
        WHERE ue.usuario_id = auth.uid()
          AND r.nome = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para obter a empresa atual da sessão
CREATE OR REPLACE FUNCTION current_empresa_id()
RETURNS UUID AS $$
BEGIN
    RETURN current_setting('app.current_empresa_id')::UUID;
EXCEPTION WHEN OTHERS THEN
    RAISE EXCEPTION 'Empresa não configurada na sessão';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ======================================================
-- 1. ATIVAR RLS EM TODAS AS TABELAS
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
ALTER TABLE controle_caixa ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendas_itens ENABLE ROW LEVEL SECURITY;
ALTER TABLE financeiro_contas ENABLE ROW LEVEL SECURITY;
ALTER TABLE financeiro_lancamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversas ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensagens ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_respostas ENABLE ROW LEVEL SECURITY;
ALTER TABLE notas ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE auditoria ENABLE ROW LEVEL SECURITY;

-- ======================================================
-- 2. POLICIES PARA TABELAS GLOBAIS (SEM EMPRESA_ID)
-- ======================================================

-- ROLES: Admins podem tudo; outros só leem
CREATE POLICY roles_admin_policy ON roles
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY roles_read_policy ON roles
    FOR SELECT
    USING (true);  -- Todos podem ler roles (útil para frontend)

-- EMPRESAS: Admins globais gerenciam; usuários veem só as suas via usuario_empresas
CREATE POLICY empresas_admin_policy ON empresas
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY empresas_user_policy ON empresas
    FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM usuario_empresas WHERE empresa_id = empresas.id AND usuario_id = auth.uid()
    ));

-- USUARIOS: Admins gerenciam; usuário vê/edita o próprio
CREATE POLICY usuarios_admin_policy ON usuarios
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY usuarios_self_policy ON usuarios
    FOR ALL
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- USUARIO_SENHAS: Similar a usuarios, mas mais restrito (senhas sensíveis)
CREATE POLICY usuario_senhas_admin_policy ON usuario_senhas
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY usuario_senhas_self_policy ON usuario_senhas
    FOR SELECT, UPDATE
    USING (usuario_id = auth.uid())
    WITH CHECK (usuario_id = auth.uid());

-- POLITICAS_SERVICO: Todos leem; admins escrevem
CREATE POLICY politicas_read_policy ON politicas_servico
    FOR SELECT
    USING (true);

CREATE POLICY politicas_admin_policy ON politicas_servico
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

-- DOCUMENTACAO: Similar a politicas
CREATE POLICY documentacao_read_policy ON documentacao
    FOR SELECT
    USING (true);

CREATE POLICY documentacao_admin_policy ON documentacao
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

-- ======================================================
-- 3. POLICIES PARA USUARIO_EMPRESAS (ASSOCIAÇÃO USUÁRIO-EMPRESA)
-- ======================================================

-- Admins gerenciam associações; usuário vê as próprias
CREATE POLICY usuario_empresas_admin_policy ON usuario_empresas
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY usuario_empresas_self_policy ON usuario_empresas
    FOR SELECT
    USING (usuario_id = auth.uid());

-- ======================================================
-- 4. POLICIES PARA TABELAS DE NEGÓCIO (COM EMPRESA_ID)
-- ======================================================
-- Padrão: Filtro por empresa_id = current_empresa_id()
-- + Verificação de role via check_user_role(empresa_id, 'required_role')

-- CLIENTES: Gestores/vendedores gerenciam; admins full
CREATE POLICY clientes_admin_policy ON clientes
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY clientes_gestor_policy ON clientes
    FOR ALL
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'))
    WITH CHECK (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'));

CREATE POLICY clientes_vendedor_policy ON clientes
    FOR SELECT, INSERT, UPDATE
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'vendedor'))
    WITH CHECK (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'vendedor'));

-- FORNECEDORES: Gestores gerenciam
CREATE POLICY fornecedores_admin_policy ON fornecedores
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY fornecedores_gestor_policy ON fornecedores
    FOR ALL
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'))
    WITH CHECK (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'));

-- FUNCIONARIOS: Gestores gerenciam; admins full
CREATE POLICY funcionarios_admin_policy ON funcionarios
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY funcionarios_gestor_policy ON funcionarios
    FOR ALL
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'))
    WITH CHECK (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'));

-- CATEGORIAS: Gestores gerenciam
CREATE POLICY categorias_admin_policy ON categorias
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY categorias_gestor_policy ON categorias
    FOR ALL
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'))
    WITH CHECK (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'));

-- PRODUTOS: Gestores/vendedores veem/gerenciam (vendedores só leem)
CREATE POLICY produtos_admin_policy ON produtos
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY produtos_gestor_policy ON produtos
    FOR ALL
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'))
    WITH CHECK (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'));

CREATE POLICY produtos_vendedor_policy ON produtos
    FOR SELECT
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'vendedor'));

-- SERVICOS: Similar a produtos
CREATE POLICY servicos_admin_policy ON servicos
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY servicos_gestor_policy ON servicos
    FOR ALL
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'))
    WITH CHECK (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'));

CREATE POLICY servicos_vendedor_policy ON servicos
    FOR SELECT
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'vendedor'));

-- CONTROLE_CAIXA: Financeiro/gestores gerenciam
CREATE POLICY controle_caixa_admin_policy ON controle_caixa
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY controle_caixa_financeiro_policy ON controle_caixa
    FOR ALL
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'financeiro'))
    WITH CHECK (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'financeiro'));

CREATE POLICY controle_caixa_gestor_policy ON controle_caixa
    FOR SELECT
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'));

-- VENDAS: Vendedores/gestores gerenciam (vendedores só próprias vendas?)
CREATE POLICY vendas_admin_policy ON vendas
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY vendas_gestor_policy ON vendas
    FOR ALL
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'))
    WITH CHECK (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'));

CREATE POLICY vendas_vendedor_policy ON vendas
    FOR ALL
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'vendedor') AND usuario_id = auth.uid())
    WITH CHECK (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'vendedor') AND usuario_id = auth.uid());  -- Só próprias

-- VENDAS_ITENS: Herda de vendas (ON DELETE CASCADE, então policy similar)
CREATE POLICY vendas_itens_admin_policy ON vendas_itens
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY vendas_itens_gestor_policy ON vendas_itens
    FOR ALL
    USING (EXISTS (SELECT 1 FROM vendas WHERE id = venda_id AND empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor')))
    WITH CHECK (EXISTS (SELECT 1 FROM vendas WHERE id = venda_id AND empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor')));

CREATE POLICY vendas_itens_vendedor_policy ON vendas_itens
    FOR ALL
    USING (EXISTS (SELECT 1 FROM vendas WHERE id = venda_id AND empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'vendedor') AND usuario_id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM vendas WHERE id = venda_id AND empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'vendedor') AND usuario_id = auth.uid()));

-- FINANCEIRO_CONTAS: Financeiro/gestores
CREATE POLICY financeiro_contas_admin_policy ON financeiro_contas
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY financeiro_contas_financeiro_policy ON financeiro_contas
    FOR ALL
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'financeiro'))
    WITH CHECK (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'financeiro'));

CREATE POLICY financeiro_contas_gestor_policy ON financeiro_contas
    FOR SELECT
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'));

-- FINANCEIRO_LANCAMENTOS: Similar
CREATE POLICY financeiro_lancamentos_admin_policy ON financeiro_lancamentos
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY financeiro_lancamentos_financeiro_policy ON financeiro_lancamentos
    FOR ALL
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'financeiro'))
    WITH CHECK (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'financeiro'));

CREATE POLICY financeiro_lancamentos_gestor_policy ON financeiro_lancamentos
    FOR SELECT
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'));

-- CONVERSAS: Suporte/chat_user gerenciam
CREATE POLICY conversas_admin_policy ON conversas
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY conversas_suporte_policy ON conversas
    FOR ALL
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'suporte'))
    WITH CHECK (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'suporte'));

CREATE POLICY conversas_chat_user_policy ON conversas
    FOR SELECT
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'chat_user'));

-- MENSAGENS: Herda de conversas
CREATE POLICY mensagens_admin_policy ON mensagens
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY mensagens_suporte_policy ON mensagens
    FOR ALL
    USING (EXISTS (SELECT 1 FROM conversas WHERE id = conversa_id AND empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'suporte')))
    WITH CHECK (EXISTS (SELECT 1 FROM conversas WHERE id = conversa_id AND empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'suporte')));

CREATE POLICY mensagens_chat_user_policy ON mensagens
    FOR SELECT
    USING (EXISTS (SELECT 1 FROM conversas WHERE id = conversa_id AND empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'chat_user')));

-- CHATBOT_RESPOSTAS: Gestores/suporte
CREATE POLICY chatbot_respostas_admin_policy ON chatbot_respostas
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY chatbot_respostas_gestor_policy ON chatbot_respostas
    FOR ALL
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'))
    WITH CHECK (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'));

CREATE POLICY chatbot_respostas_suporte_policy ON chatbot_respostas
    FOR SELECT, INSERT, UPDATE
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'suporte'))
    WITH CHECK (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'suporte'));

-- NOTAS: Usuário vê/edita próprias; gestores veem todas
CREATE POLICY notas_admin_policy ON notas
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY notas_self_policy ON notas
    FOR ALL
    USING (empresa_id = current_empresa_id() AND usuario_id = auth.uid())
    WITH CHECK (empresa_id = current_empresa_id() AND usuario_id = auth.uid());

CREATE POLICY notas_gestor_policy ON notas
    FOR SELECT
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'));

-- WHATSAPP_CONFIG: Gestores/suporte
CREATE POLICY whatsapp_config_admin_policy ON whatsapp_config
    FOR ALL
    USING (is_global_admin())
    WITH CHECK (is_global_admin());

CREATE POLICY whatsapp_config_gestor_policy ON whatsapp_config
    FOR ALL
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'))
    WITH CHECK (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'));

CREATE POLICY whatsapp_config_suporte_policy ON whatsapp_config
    FOR SELECT, UPDATE
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'suporte'))
    WITH CHECK (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'suporte'));

-- AUDITORIA: Só admins/gestores leem (sensível)
CREATE POLICY auditoria_admin_policy ON auditoria
    FOR SELECT
    USING (is_global_admin());

CREATE POLICY auditoria_gestor_policy ON auditoria
    FOR SELECT
    USING (empresa_id = current_empresa_id() AND check_user_role(empresa_id, 'gestor'));

-- ======================================================
-- FIM DAS POLICIES
-- Próximos passos: Testar com Supabase auth; implementar set current_setting no login (via função ou trigger).
-- ======================================================


```









