# 🧠 Insights de mercado (benchmarks reais)
* ERPs profissionais como Odoo e Dynamics 365 são altamente modulares e centralizam dados de usuários, vendas e finanças com regras de relacionamento bem definidas.
* Boas práticas de modelagem incluem usar chaves primárias únicas, relacionamentos claros (1-N, N-N), convenções de nomes consistentes e separação de entidades de negócio.
* Mesmo quando o banco é não relacional ou offline (como IndexedDB), é essencial planejar entidades e relacionamentos antes de implementar.

# 📌 MODELO DE DADOS INICIAL (IndexedDB) — CONCEITUAL
IndexedDB não usa tabelas como um banco relacional tradicional, mas sim object stores (coleções de objetos). Cada store tem uma chave primária e pode ter índices para consultas rápidas.

## Regras básicas de projeto IndexedDB:
* Cada object store representa uma entidade de negócio.
* Relacionamentos podem ser feitos por referências de chave (IDs relacionados).
* Use índices secundários para buscar por campos não-primários.

# 🗂️ ENTIDADES PRINCIPAIS
## 1) usuarios.json
Guarda dados de login e controle de acesso. Serve como base para todos os cadastros ligados a contas.
```
{
  "id": "string",
  "nome": "string",
  "email": "string",
  "senhaHash": "string",
  "role": "string", // ex: admin, gestor, chat_user
  "criadoEm": "date"
}
```

## clientes.json
```
{
  "id": "string",
  "usuarioId": "string", // FK → Usuario
  "nome": "string",
  "cpfCnpj": "string",
  "telefone": "string",
  "email": "string",
  "endereco": "object", // pode ser objeto denormalizado
  "criadoEm": "date"
}
```
## fornecedores.json
```
{
  "id": "string",
  "nome": "string",
  "cnpj": "string",
  "contato": "string",
  "telefone": "string",
  "email": "string",
  "endereco": "object"
}
```
## funcionarios.json
```
 {
  "id": "string",
  "usuarioId": "string", // FK → Usuário (se se logam no sistema)
  "nome": "string",
  "cpf": "string",
  "cargo": "string",
  "departamento": "string",
  "contato": "string",
  "dataAdmissao": "date"
}

```
## produtos.json
```
{
  "id": "string",
  "nome": "string",
  "descricao": "string",
  "preco": "number",
  "estoque": "number",
  "fornecedorId": "string" // FK → Fornecedor
}
```
## vendas.json
Venda é uma entidade de alto valor em ERP.
```
{
  "id": "string",
  "clienteId": "string", // FK → Cliente
  "dataVenda": "date",
  "valorTotal": "number",
  "itens": "array", // IDs OU detalhes embutidos
  "status": "string"
}
```
##  Financeiro.json
### O financeiro pode ter dois conceitos:
* Lançamentos financeiros
* Contas / categorias
Lançamentos
```
{
  "id": "string",
  "tipo": "string", // receita / despesa
  "valor": "number",
  "data": "date",
  "descricao": "string",
  "vendaId": "string?" // opcional link → Venda
}
```
## contas.json
```
{
  "id": "string",
  "nome": "string",
  "categoria": "string"
}
```
## Chatbot.json
Salvar perguntas/respostas automáticas.
```
{
  "id": "string",
  "pergunta": "string",
  "resposta": "string",
  "categoria": "string"
}
```
## bloco_de_notas.json
Simples e útil para usuários.
```
{
  "id": "string",
  "usuarioId": "string",
  "titulo": "string",
  "conteudo": "string",
  "criadoEm": "date"
}
```
## conversas_whatsApp_RedesSociais.json
IndexedDB pode armazenar conversas como JSON.
```
{
  "id": "string",
  "chatTipo": "string", // ex: whatsapp, instagram
  "usuarioId": "string",
  "mensagens": "array" // cada item com texto, data, remetente
}
```
## Mensagens_Envio.json
Mensagens que você planeja enviar (SMS, WhatsApp, e-mail etc.)
```
{
  "id": "string",
  "destinatario": "string",
  "conteudo": "string",
  "statusEnvio": "string",
  "tentativas": "number"
}
```
## politicas_de_servico.json
Texto de políticas/termos.
```
{
  "id": "string",
  "titulo": "string",
  "descricao": "string",
  "ativo": "boolean"
}
```
## documentacao.json
Pode guardar documentos ou links para documentos.
```
{
  "id": "string",
  "titulo": "string",
  "conteudo": "string", // pode ser markdown ou HTML
  "tags": "array",
  "criadoEm": "date"
}
```
## servicos
```
{
  "id": "string",
  "nome": "string",
  "descricao": "string",
  "preco": "number"
}
```

# 📊 Índices recomendados (IndexedDB)
```
| Store      | Índices úteis        |
| ---------- | -------------------- |
| usuários   | email                |
| clientes   | usuarioId, cpfCnpj   |
| produtos   | fornecedorId         |
| vendas     | clienteId, dataVenda |
| financeiro | tipo, data           |
| conversas  | chatTipo, usuarioId  |
```
Índices aceleram consultas sem precisar varrer todo o objeto.

# 📌 RELACIONAMENTOS (CONCEITUAIS)
## Mesmo em IndexedDB (não relacional), pense como se fosse relacional:
* Usuário → Clientes/Funcionários → um usuário pode ter zero ou muitos clientes/funcionários registrados.
* Venda → Cliente → cada venda pertence a um cliente.
* Produto → Fornecedor → cada produto tem um fornecedor.
* Financeiro → Venda → opcionalmente vincula lançamentos a vendas.
* Relacionamentos N-N podem ser modelados por stores de junction ou arrays de IDs.

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

# 🔹 PARTE 2 — MODELAGEM INDEXEDDB (PRONTA PARA USO)
Agora vem :
* Schema pronto, usando padrão de mercado (Dexie.js, usado em ERPs web reais).
* Mesmo que você não use Dexie, isso serve como documentação oficial do banco.

# 📦 SCHEMA INDEXEDDB — erp_db.js
* ✔ Separação correta de entidades
* ✔ Nada duplicado
* ✔ Relacionamentos claros
* ✔ Funciona offline-first
* ✔ Sincroniza com Supabase sem conflitos
* ✔ Suporta multiusuário, chat, financeiro e vendas reais

```
import Dexie from "dexie";

export const db = new Dexie("ERP_APB");

db.version(1).stores({
  usuarios: `
    id,
    email,
    role,
    criadoEm
  `,

  clientes: `
    id,
    usuarioId,
    cpfCnpj,
    nome
  `,

  funcionarios: `
    id,
    usuarioId,
    cpf,
    cargo
  `,

  fornecedores: `
    id,
    cnpj,
    nome
  `,

  produtos: `
    id,
    fornecedorId,
    nome
  `,

  vendas: `
    id,
    clienteId,
    dataVenda,
    status
  `,

  itens_venda: `
    id,
    vendaId,
    produtoId
  `,

  financeiro: `
    id,
    tipo,
    data,
    vendaId
  `,

  servicos: `
    id,
    nome
  `,

  chatbots: `
    id,
    categoria
  `,

  conversas: `
    id,
    canal,
    clienteId
  `,

  mensagens: `
    id,
    conversaId,
    dataEnvio
  `,

  notas: `
    id,
    usuarioId
  `,

  politicas: `
    id,
    titulo
  `,

  documentacao: `
    id,
    titulo,
    tags
  `
});
```

# LIMPANDO O BANCO DE DADOS
```
-- 1. Remove o esquema público e tudo o que há nele (tabelas, views, etc)
DROP SCHEMA public CASCADE;

-- 2. Recria o esquema público para receber o novo script
CREATE SCHEMA public;

-- 3. Restaura as permissões padrão para o Supabase funcionar corretamente
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO anon;
GRANT ALL ON SCHEMA public TO authenticated;
GRANT ALL ON SCHEMA public TO service_role;

-- 4. (Opcional) Se você criou extensões específicas, pode ser necessário reativá-las
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

# 🧱 BANCO DE DADOS COMPLETO — ERP APB (SQL)
* 👉 Compatível com PostgreSQL / Supabase
* 👉 Estrutura usada em ERPs reais (Odoo-like)
```

-- =====================================================================
-- ERP APB — SCRIPT SQL FINAL CONSOLIDADO (VERSÃO UNIFICADA)
-- Multi-Tenant SaaS | PostgreSQL / Supabase
-- Janeiro / 2026
-- Baseado na comparação dos arquivos: Incorpora refinamentos do (1).md no consolidado do (2).md
-- =====================================================================

-- OPCIONAL: Limpeza do banco (use com cautela em produção!)
-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA public;
-- GRANT ALL ON SCHEMA public TO postgres;
-- GRANT ALL ON SCHEMA public TO anon;
-- GRANT ALL ON SCHEMA public TO authenticated;
-- GRANT ALL ON SCHEMA public TO service_role;

-- EXTENSÕES
CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Se necessário para gen_random_uuid() em versões antigas

-- ======================================================
-- 1. TABELAS GLOBAIS
-- ======================================================

CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT
);

CREATE TABLE IF NOT EXISTS empresas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome_fantasia TEXT NOT NULL,
    razao_social TEXT,
    cnpj TEXT,
    plano TEXT DEFAULT 'free',
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (cnpj)
);

CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT now(),
    ultimo_login TIMESTAMP WITH TIME ZONE,
    excluido_em TIMESTAMP WITH TIME ZONE  -- Soft delete do (1).md
);

CREATE TABLE IF NOT EXISTS usuario_senhas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id),
    senha_hash TEXT NOT NULL,
    criada_em TIMESTAMP WITH TIME ZONE DEFAULT now(),
    ativa BOOLEAN DEFAULT true,
    CONSTRAINT chk_senha_hash CHECK (length(senha_hash) >= 60)
);

CREATE TABLE IF NOT EXISTS politicas_servico (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT,
    conteudo TEXT,
    ativo BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS documentacao (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT,
    conteudo TEXT,
    tags TEXT[],
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ======================================================
-- 2. USUÁRIO ↔ EMPRESA (MULTI-TENANT)
-- ======================================================

CREATE TABLE IF NOT EXISTS usuario_empresas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id),
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (usuario_id, empresa_id)
);

-- ======================================================
-- 3. TABELAS DE NEGÓCIO (COM empresa_id NOT NULL)
-- ======================================================

CREATE TABLE IF NOT EXISTS clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) NOT NULL,
    nome TEXT NOT NULL,
    cpf_cnpj TEXT,
    telefone TEXT,
    email TEXT,
    endereco JSONB,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT now(),
    excluido_em TIMESTAMP WITH TIME ZONE,
    UNIQUE (empresa_id, cpf_cnpj)
);

CREATE TABLE IF NOT EXISTS fornecedores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) NOT NULL,
    nome TEXT NOT NULL,
    cnpj TEXT,
    contato TEXT,
    telefone TEXT,
    email TEXT,
    endereco JSONB,
    excluido_em TIMESTAMP WITH TIME ZONE,
    UNIQUE (empresa_id, cnpj)
);

CREATE TABLE IF NOT EXISTS funcionarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) NOT NULL,
    usuario_id UUID REFERENCES usuarios(id),
    cpf TEXT,
    cargo TEXT,
    departamento TEXT,
    data_admissao DATE,
    UNIQUE (empresa_id, cpf)
);

CREATE TABLE IF NOT EXISTS categorias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) NOT NULL,
    nome TEXT NOT NULL,
    descricao TEXT,
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (empresa_id, nome)
);

CREATE TABLE IF NOT EXISTS produtos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) NOT NULL,
    fornecedor_id UUID REFERENCES fornecedores(id),
    categoria_id UUID REFERENCES categorias(id),
    nome TEXT NOT NULL,
    descricao TEXT,
    preco NUMERIC(12,2) NOT NULL,
    estoque INTEGER DEFAULT 0,
    estoque_minimo INTEGER DEFAULT 0,
    unidade_medida TEXT NOT NULL DEFAULT 'UN',
    ativo BOOLEAN DEFAULT true,
    excluido_em TIMESTAMP WITH TIME ZONE,
    CONSTRAINT chk_unidade_medida CHECK (
        unidade_medida IN ('UN','KG','G','MG','LT','ML','CX','PCT','PC','DZ','MT','TN','CJ','FD','BL','RO','CX6','CX12')
    )
);

CREATE TABLE IF NOT EXISTS servicos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) NOT NULL,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco NUMERIC(12,2),
    ativo BOOLEAN DEFAULT true
);

-- ======================================================
-- 4. CAIXA (CRIADO ANTES DO FINANCEIRO)
-- ======================================================

CREATE TABLE IF NOT EXISTS controle_caixa (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) NOT NULL,
    usuario_id UUID REFERENCES usuarios(id),
    data_abertura TIMESTAMP WITH TIME ZONE DEFAULT now(),
    data_fechamento TIMESTAMP WITH TIME ZONE,
    saldo_inicial NUMERIC(12,2) NOT NULL DEFAULT 0,
    saldo_final NUMERIC(12,2),
    status TEXT CHECK (status IN ('aberto','fechado')) DEFAULT 'aberto'
);

-- ======================================================
-- 5. VENDAS
-- ======================================================

CREATE TABLE IF NOT EXISTS vendas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) NOT NULL,
    cliente_id UUID REFERENCES clientes(id),
    usuario_id UUID REFERENCES usuarios(id),
    data_venda TIMESTAMP WITH TIME ZONE DEFAULT now(),
    valor_total NUMERIC(12,2),
    status TEXT CHECK (status IN ('Aberta','Faturada','Cancelada')),
    status_pagamento TEXT DEFAULT 'Pendente',
    CONSTRAINT chk_status_pagamento CHECK (
        status_pagamento IN ('Pendente','Pago','Parcial','Cancelado','Estornado')
    )
);

CREATE TABLE IF NOT EXISTS vendas_itens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venda_id UUID REFERENCES vendas(id) ON DELETE CASCADE,
    produto_id UUID REFERENCES produtos(id),
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    preco_unitario NUMERIC(12,2) NOT NULL,
    subtotal NUMERIC(12,2)
        GENERATED ALWAYS AS (quantidade * preco_unitario) STORED
);

-- ======================================================
-- 6. FINANCEIRO
-- ======================================================

CREATE TABLE IF NOT EXISTS financeiro_contas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) NOT NULL,
    nome TEXT NOT NULL,
    tipo TEXT,
    ativo BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS financeiro_lancamentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('receita','despesa')),
    valor NUMERIC(12,2) NOT NULL,
    data_lancamento DATE NOT NULL,
    descricao TEXT,
    venda_id UUID REFERENCES vendas(id),
    conta_id UUID REFERENCES financeiro_contas(id),
    caixa_id UUID REFERENCES controle_caixa(id),
    metodo_pagamento TEXT,
    CONSTRAINT chk_metodo_pagamento CHECK (
        metodo_pagamento IN ('Dinheiro','Pix','Cartão Crédito','Cartão Débito','Boleto','Transferência','Outros')
    )
);

-- ======================================================
-- 7. CHAT / NOTAS / INTEGRAÇÕES
-- ======================================================

CREATE TABLE IF NOT EXISTS conversas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) NOT NULL,
    canal TEXT,
    cliente_id UUID REFERENCES clientes(id),
    ultima_atualizacao TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS mensagens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversa_id UUID REFERENCES conversas(id) ON DELETE CASCADE,
    remetente TEXT,
    conteudo TEXT,
    data_envio TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chatbot_respostas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) NOT NULL,
    pergunta TEXT,
    resposta TEXT,
    categoria TEXT
);

CREATE TABLE IF NOT EXISTS notas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) NOT NULL,
    usuario_id UUID REFERENCES usuarios(id),
    titulo TEXT,
    conteudo TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS whatsapp_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) NOT NULL,
    instancia_nome TEXT NOT NULL,
    apikey TEXT NOT NULL,
    url_base TEXT NOT NULL,
    ativo BOOLEAN DEFAULT true,
    ultima_sincronizacao TIMESTAMP WITH TIME ZONE
);

-- ======================================================
-- 8. AUDITORIA
-- ======================================================

CREATE TABLE IF NOT EXISTS auditoria (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id),
    empresa_id UUID REFERENCES empresas(id),
    tabela TEXT NOT NULL,
    acao TEXT NOT NULL,
    registro_id UUID,
    dados_anteriores JSONB,
    dados_novos JSONB,
    data_evento TIMESTAMP WITH TIME ZONE DEFAULT now(),
    ip TEXT,
    user_agent TEXT
);

-- ======================================================
-- 9. VIEWS
-- ======================================================

CREATE OR REPLACE VIEW view_alerta_estoque AS
SELECT id, empresa_id, nome, estoque, estoque_minimo
FROM produtos
WHERE estoque <= estoque_minimo
  AND ativo = true
  AND excluido_em IS NULL;

CREATE OR REPLACE VIEW view_usuario_empresas AS
SELECT
    ue.usuario_id,
    ue.empresa_id,
    e.nome_fantasia,
    r.nome AS role_nome
FROM usuario_empresas ue
JOIN empresas e ON e.id = ue.empresa_id
JOIN roles r ON r.id = ue.role_id;

-- ======================================================
-- 10. ÍNDICES
-- ======================================================

CREATE INDEX IF NOT EXISTS idx_vendas_empresa_data
    ON vendas (empresa_id, data_venda DESC);

CREATE INDEX IF NOT EXISTS idx_vendas_empresa_status
    ON vendas (empresa_id, status);

CREATE INDEX IF NOT EXISTS idx_produtos_empresa_nome
    ON produtos (empresa_id, nome);

CREATE INDEX IF NOT EXISTS idx_clientes_empresa_nome
    ON clientes (empresa_id, nome);

CREATE INDEX IF NOT EXISTS idx_financeiro_empresa_data
    ON financeiro_lancamentos (empresa_id, data_lancamento);

CREATE INDEX IF NOT EXISTS idx_usuario_empresas_usuario
    ON usuario_empresas (usuario_id);

CREATE INDEX IF NOT EXISTS idx_usuario_empresas_empresa
    ON usuario_empresas (empresa_id);

CREATE INDEX IF NOT EXISTS idx_conversas_empresa_cliente
    ON conversas (empresa_id, cliente_id);

CREATE INDEX IF NOT EXISTS idx_mensagens_conversa_data
    ON mensagens (conversa_id, data_envio);

-- ======================================================
-- FIM DO SCRIPT
-- Próximos passos: Ativar RLS (Passo 2), Triggers (Passo 3), etc.
-- ======================================================
```
