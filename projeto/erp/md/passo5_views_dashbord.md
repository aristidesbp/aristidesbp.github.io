-- =====================================================================
-- ERP APB — PASSO 5: VIEWS DE DASHBOARD E RELATÓRIOS (VERSÃO REFORÇADA)
-- Objetivo: Dados seguros, performáticos e multi-tenant para frontend
-- Janeiro / 2026
-- =====================================================================

-- ======================================================
-- 1. VIEW: RESUMO FINANCEIRO (KPIs do mês atual + total)
-- ======================================================
CREATE OR REPLACE VIEW view_dashboard_financeiro AS
SELECT
    empresa_id,
    SUM(CASE WHEN tipo = 'receita' THEN valor ELSE 0 END) FILTER (WHERE data_lancamento >= date_trunc('month', CURRENT_DATE)) AS faturamento_mes,
    SUM(CASE WHEN tipo = 'despesa' THEN valor ELSE 0 END) FILTER (WHERE data_lancamento >= date_trunc('month', CURRENT_DATE)) AS despesas_mes,
    (SUM(CASE WHEN tipo = 'receita' THEN valor ELSE 0 END) -
     SUM(CASE WHEN tipo = 'despesa' THEN valor ELSE 0 END)) AS lucro_liquido_total,
    COUNT(DISTINCT venda_id) FILTER (WHERE venda_id IS NOT NULL) AS total_vendas
FROM financeiro_lancamentos
WHERE excluido_em IS NULL
  AND empresa_id = current_empresa_id()  -- Segurança extra + performance
GROUP BY empresa_id;


-- ======================================================
-- 2. VIEW: VENDAS POR PERÍODO (últimos 30 dias)
-- ======================================================
CREATE OR REPLACE VIEW view_vendas_diarias AS
SELECT
    empresa_id,
    data_venda::DATE AS data,
    COALESCE(SUM(valor_total), 0) AS total_vendido,
    COUNT(id) AS quantidade_pedidos
FROM vendas
WHERE status = 'Faturada'
  AND data_venda >= CURRENT_DATE - INTERVAL '30 days'
  AND empresa_id = current_empresa_id()
GROUP BY empresa_id, data_venda::DATE
ORDER BY data DESC;


-- ======================================================
-- 3. VIEW: TOP 10 PRODUTOS (últimos 90 dias)
-- ======================================================
CREATE OR REPLACE VIEW view_top_produtos AS
SELECT
    v.empresa_id,
    p.nome AS produto_nome,
    SUM(vi.quantidade) AS total_quantidade,
    SUM(vi.preco_unitario * vi.quantidade) AS total_valor
FROM vendas_itens vi
JOIN produtos p ON p.id = vi.produto_id
JOIN vendas v ON v.id = vi.venda_id
WHERE v.status = 'Faturada'
  AND v.data_venda >= CURRENT_DATE - INTERVAL '90 days'
  AND v.empresa_id = current_empresa_id()
GROUP BY v.empresa_id, p.nome
ORDER BY total_valor DESC
LIMIT 10;


-- ======================================================
-- 4. VIEW: ESTOQUE CRÍTICO (já estava boa)
-- ======================================================
CREATE OR REPLACE VIEW view_estoque_critico AS
SELECT
    id,
    empresa_id,
    nome,
    estoque,
    estoque_minimo,
    unidade_medida
FROM produtos
WHERE estoque <= estoque_minimo
  AND ativo = true
  AND excluido_em IS NULL
  AND empresa_id = current_empresa_id()
ORDER BY estoque ASC;


-- ======================================================
-- SEGURANÇA E PERFORMANCE — NÃO ALTERE OWNER!
-- ======================================================
-- As views herdam RLS das tabelas base (SECURITY INVOKER padrão)
-- Não use SECURITY DEFINER nem mude owner para postgres
-- Confie nas policies do Passo 2 + current_empresa_id()

-- Índices recomendados para essas views rodarem rápido
CREATE INDEX IF NOT EXISTS idx_financeiro_empresa_tipo_data 
ON financeiro_lancamentos (empresa_id, tipo, data_lancamento);

CREATE INDEX IF NOT EXISTS idx_vendas_empresa_status_data 
ON vendas (empresa_id, status, data_venda);

CREATE INDEX IF NOT EXISTS idx_vendas_itens_venda_produto 
ON vendas_itens (venda_id, produto_id);

-- =====================================================================
-- FIM DO PASSO 5 — Pronto para dashboard
-- Próximo: 
-- • Funções que aceitam parâmetros (ex.: período customizado)
-- • Materialized views para relatórios pesados
-- • Gráficos no frontend consumindo essas views via Supabase JS
-- =====================================================================
