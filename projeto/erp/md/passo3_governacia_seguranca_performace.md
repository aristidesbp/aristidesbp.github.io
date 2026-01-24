

# 🔐 1️⃣ POLICIES (RLS) — OBRIGATÓRIO EM ERP REAL
Se você for usar Supabase, Row Level Security (RLS) é obrigatório.
Sem isso, não é ERP profissional.
* 📌 O que são Policies?
### Regras SQL que dizem:
quem pode ver, inserir, atualizar ou deletar cada linha.

## 🔑 Exemplo real — Usuários só veem a si mesmos
```
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuario ve seu proprio cadastro"
ON usuarios
FOR SELECT
USING (id = auth.uid());
```
## 🔑 Exemplo — Admin vê tudo
```
CREATE POLICY "Admin acesso total usuarios"
ON usuarios
FOR ALL
USING (
  EXISTS (
    SELECT 1
    FROM usuario_senhas us
    JOIN roles r ON r.id = us.role_id
    WHERE us.usuario_id = auth.uid()
      AND r.nome = 'admin'
      AND us.ativa = true
  )
);

```
# 🔐 2️⃣ POLICIES PARA MÓDULOS (EXEMPLOS ESSENCIAIS)
## Clientes (vendas e admin)

```
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vendas e Admin veem clientes"
ON clientes
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM usuario_senhas us
    JOIN roles r ON r.id = us.role_id
    WHERE us.usuario_id = auth.uid()
      AND r.nome IN ('admin','vendas')
      AND us.ativa = true
  )
);
```
## Financeiro (somente financeiro e admin)
```
ALTER TABLE financeiro_lancamentos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Financeiro restrito"
ON financeiro_lancamentos
FOR ALL
USING (
  EXISTS (
    SELECT 1
    FROM usuario_senhas us
    JOIN roles r ON r.id = us.role_id
    WHERE us.usuario_id = auth.uid()
      AND r.nome IN ('admin','financeiro')
      AND us.ativa = true
  )
);
```
# ⚙️ 3️⃣ FUNÇÕES SQL (RECOMENDADO)
ERPs profissionais não fazem tudo via CRUD direto.

## Exemplo: criar venda com transação
```
CREATE OR REPLACE FUNCTION criar_venda(
  p_cliente UUID,
  p_usuario UUID,
  p_itens JSONB
)
RETURNS UUID AS $$
DECLARE
  v_venda_id UUID;
BEGIN
  INSERT INTO vendas (cliente_id, usuario_id, status)
  VALUES (p_cliente, p_usuario, 'aberta')
  RETURNING id INTO v_venda_id;

  INSERT INTO vendas_itens (venda_id, produto_id, quantidade, preco_unitario)
  SELECT v_venda_id,
         (item->>'produto_id')::UUID,
         (item->>'quantidade')::INT,
         (item->>'preco')::NUMERIC
  FROM jsonb_array_elements(p_itens) item;

  RETURN v_venda_id;
END;
$$ LANGUAGE plpgsql;
```
# ⚡ 4️⃣ ÍNDICES (PERFORMANCE)
Sem isso, ERP morre quando cresce.
```
CREATE INDEX idx_clientes_cpf ON clientes(cpf_cnpj);
CREATE INDEX idx_vendas_data ON vendas(data_venda);
CREATE INDEX idx_financeiro_data ON financeiro_lancamentos(data_lancamento);
CREATE INDEX idx_mensagens_conversa ON mensagens(conversa_id);
```
# 🧾 5️⃣ AUDITORIA/SEGURANÇA  (MUITO IMPORTANTE)
ERP sem auditoria não vende.

# Tabela de auditoria
```
CREATE TABLE auditoria (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID,
    tabela TEXT,
    acao TEXT,
    dados_anteriores JSONB,
    dados_novos JSONB,
    data_evento TIMESTAMP DEFAULT now()
);

```


























