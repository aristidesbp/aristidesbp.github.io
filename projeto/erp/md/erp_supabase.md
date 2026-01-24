
# 🔹 PARTE 1 — DIAGRAMA CONCEITUAL (ER) — VISÃO PROFISSIONAL
Mesmo usando IndexedDB, ERP sério pensa relacionalmente.
```
USUARIOS
 ├─ id (PK)
 ├─ nome
 ├─ email
 ├─ senhaHash
 ├─ role
 └─ criadoEm
      │
      ├───────────────┐
      │               │
CLIENTES          FUNCIONARIOS
 ├─ id (PK)        ├─ id (PK)
 ├─ usuarioId (FK) ├─ usuarioId (FK)
 ├─ nome           ├─ nome
 ├─ cpfCnpj        ├─ cpf
 ├─ contato        ├─ cargo
 └─ endereco       └─ departamento

FORNECEDORES
 ├─ id (PK)
 ├─ nome
 ├─ cnpj
 └─ contato
      │
      ▼
PRODUTOS
 ├─ id (PK)
 ├─ fornecedorId (FK)
 ├─ nome
 ├─ preco
 └─ estoque
      │
      ▼
VENDAS
 ├─ id (PK)
 ├─ clienteId (FK)
 ├─ dataVenda
 ├─ valorTotal
 └─ status
      │
      ▼
ITENS_VENDA
 ├─ id (PK)
 ├─ vendaId (FK)
 ├─ produtoId (FK)
 ├─ quantidade
 └─ precoUnitario

FINANCEIRO
 ├─ id (PK)
 ├─ tipo (receita/despesa)
 ├─ valor
 ├─ data
 ├─ descricao
 └─ vendaId (FK opcional)

SERVICOS
 ├─ id (PK)
 ├─ nome
 ├─ preco
 └─ descricao

CHATBOTS
 ├─ id (PK)
 ├─ pergunta
 ├─ resposta
 └─ categoria

CONVERSAS
 ├─ id (PK)
 ├─ canal (whatsapp, insta…)
 ├─ clienteId (FK)
 └─ ultimaAtualizacao

MENSAGENS
 ├─ id (PK)
 ├─ conversaId (FK)
 ├─ remetente
 ├─ conteudo
 └─ dataEnvio

NOTAS
 ├─ id (PK)
 ├─ usuarioId (FK)
 ├─ titulo
 └─ conteudo

POLITICAS
 ├─ id (PK)
 ├─ titulo
 └─ conteudo

DOCUMENTACAO
 ├─ id (PK)
 ├─ titulo
 ├─ conteudo
 └─ tags
```


# 🧱 BANCO DE DADOS COMPLETO — ERP APB (SQL)
* 👉 Compatível com PostgreSQL / Supabase
* 👉 Estrutura usada em ERPs reais (Odoo-like)

# 🔐 1️⃣ USUÁRIOS, PAPÉIS E SENHAS (BASE DE SEGURANÇA)
## Papéis (níveis de acesso)
### Exemplos:
* admin
* financeiro
* vendas
* suporte
* operador

## roles.sql
```
/*NIVES DE ACESSO (admin,financeiro,vendas,suporte,operador)*/
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT
);
```
## usuarios.sql
```
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMP DEFAULT now()
);
```
## usuario_senhas.sql  (Tipos de Senha, nível de acesso)
```
/* Permite várias senhas por usuário (ex: senha admin, senha financeira)*/
CREATE TABLE usuario_senhas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id),
    senha_hash TEXT NOT NULL,
    criada_em TIMESTAMP DEFAULT now(),
    ativa BOOLEAN DEFAULT true
);
```
# 🧑‍💼 2️⃣ FUNCIONÁRIOS, CLIENTES E FORNECEDORES
## funcionarios.sql
```
CREATE TABLE funcionarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id),
    cpf TEXT UNIQUE,
    cargo TEXT,
    departamento TEXT,
    data_admissao DATE
);

```

## clientes.sql
```
CREATE TABLE clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    cpf_cnpj TEXT UNIQUE,
    telefone TEXT,
    email TEXT,
    endereco JSONB,
    criado_em TIMESTAMP DEFAULT now()
);

```

## fornecedores.sql
```
CREATE TABLE fornecedores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    cnpj TEXT UNIQUE,
    contato TEXT,
    telefone TEXT,
    email TEXT,
    endereco JSONB
);

```
# 📦 3️⃣ PRODUTOS E SERVIÇOS
##  produtos.sql
```
CREATE TABLE produtos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fornecedor_id UUID REFERENCES fornecedores(id),
    nome TEXT NOT NULL,
    descricao TEXT,
    preco NUMERIC(10,2) NOT NULL,
    estoque INTEGER DEFAULT 0,
    ativo BOOLEAN DEFAULT true
);

```

## servicos.sql
```
CREATE TABLE servicos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    descricao TEXT,
    preco NUMERIC(10,2),
    ativo BOOLEAN DEFAULT true
);

```
# 🛒 4️⃣ VENDAS (COM ITENS)
## vendas.sql
```
CREATE TABLE vendas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id UUID REFERENCES clientes(id),
    usuario_id UUID REFERENCES usuarios(id),
    data_venda TIMESTAMP DEFAULT now(),
    valor_total NUMERIC(10,2),
    status TEXT
);

```
 ## vendas_itens.sql
```
/*itens das vendas*/
CREATE TABLE vendas_itens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venda_id UUID REFERENCES vendas(id) ON DELETE CASCADE,
    produto_id UUID REFERENCES produtos(id),
    quantidade INTEGER NOT NULL,
    preco_unitario NUMERIC(10,2) NOT NULL
);

```
# 💰 5️⃣ FINANCEIRO (ERP REAL)
## financeiro_lancamentos.sql
```
CREATE TABLE financeiro_lancamentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo TEXT CHECK (tipo IN ('receita','despesa')),
    valor NUMERIC(10,2) NOT NULL,
    data_lancamento DATE NOT NULL,
    descricao TEXT,
    venda_id UUID REFERENCES vendas(id)
);

```
## financeiro_contas.sql
```
CREATE TABLE financeiro_contas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    tipo TEXT,
    ativo BOOLEAN DEFAULT true
);

```

# 💬 6️⃣ CHAT, CONVERSAS E MENSAGENS
Conversas (WhatsApp / Redes)
## conversas.sql
```
CREATE TABLE conversas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    canal TEXT,
    cliente_id UUID REFERENCES clientes(id),
    ultima_atualizacao TIMESTAMP
);

```
## mensagens.sql
```
CREATE TABLE mensagens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversa_id UUID REFERENCES conversas(id) ON DELETE CASCADE,
    remetente TEXT,
    conteudo TEXT,
    data_envio TIMESTAMP DEFAULT now()
);

```
## chatbot_respostas.sql
```
CREATE TABLE chatbot_respostas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pergunta TEXT,
    resposta TEXT,
    categoria TEXT
);
```
## notas.sql
```
CREATE TABLE notas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id),
    titulo TEXT,
    conteudo TEXT,
    criado_em TIMESTAMP DEFAULT now()
);

```
## politicas_servico.sql
```
CREATE TABLE politicas_servico (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT,
    conteudo TEXT,
    ativo BOOLEAN DEFAULT true
);
```

## documentacao.sql
```
CREATE TABLE documentacao (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT,
    conteudo TEXT,
    tags TEXT[],
    criado_em TIMESTAMP DEFAULT now()
);

```
## ✅ STATUS ATUAL DO BANCO (RESUMO)
Você já tem:
* Modelagem sólida (nível mercado)
* Separação de domínios (usuários, vendas, financeiro, chat, docs)
* Suporte a múltiplas senhas por nível
* Pronto para Supabase / PostgreSQL
### 👉 Base estrutural: OK
### Agora entramos na camada de GOVERNANÇA, SEGURANÇA e PERFORMANCE.

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




























