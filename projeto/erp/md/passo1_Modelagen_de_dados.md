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

# 🛠️ Atualização da Tabela de Produtos
```
-- 1. Adiciona a coluna unidade_medida à tabela de produtos
ALTER TABLE produtos 
ADD COLUMN unidade_medida TEXT NOT NULL DEFAULT 'UN';

-- 2. Adiciona uma restrição para aceitar apenas siglas padrão de mercado
-- Você pode expandir esta lista conforme a necessidade do ERP
ALTER TABLE produtos 
ADD CONSTRAINT chk_unidade_medida 
CHECK (unidade_medida IN ('UN', 'KG', 'LT', 'CX', 'MT', 'PC', 'DZ', 'GR'));

-- 3. (Opcional) Adicionar comentário para documentação no banco
COMMENT ON COLUMN produtos.unidade_medida IS 'Unidade de medida comercial (ex: UN, KG, LT)';
```

## 💡 Por que fizemos assim?
 Integridade: O uso do CHECK impede que alguém insira "Unidade" ou "Quilo" por extenso, o que quebraria relatórios e exportações de XML para notas fiscais.
* Valor Padrão: Definimos 'UN' como padrão (DEFAULT) para evitar erros em registros já existentes ou novos cadastros rápidos.
* Escalabilidade: Caso o cliente precise de "Toneladas (TN)" no futuro, basta um comando ALTER TABLE para atualizar a constraint.


# 📦 1. Controle de Estoque Mínimo
Adicionamos o campo à tabela de produtos para permitir que o Dashboard identifique itens que precisam de reposição.
```
-- Adiciona estoque_minimo para controle de reposição
ALTER TABLE produtos 
ADD COLUMN estoque_minimo INTEGER DEFAULT 0;

-- Opcional: Criar uma View para facilitar o alerta no Dashboard
CREATE VIEW view_alerta_estoque AS
SELECT id, nome, estoque, estoque_minimo
FROM produtos
WHERE estoque <= estoque_minimo AND ativo = true;
```

# 💳 2. Métodos de Pagamento (Financeiro)
Expandimos a tabela de lançamentos para rastrear a origem do dinheiro, essencial para o fechamento de caixa.
```
-- Adiciona a coluna com restrição de valores (Check Constraint)
ALTER TABLE financeiro_lancamentos 
ADD COLUMN metodo_pagamento TEXT;

ALTER TABLE financeiro_lancamentos 
ADD CONSTRAINT chk_metodo_pagamento 
CHECK (metodo_pagamento IN ('Dinheiro', 'Pix', 'Cartão de Crédito', 'Cartão de Débito', 'Boleto', 'Transferência'));

-- Comentário para clareza
COMMENT ON COLUMN financeiro_lancamentos.metodo_pagamento IS 'Forma de recebimento ou pagamento da transação';
```

# 🛒 3. Status de Pagamento na Venda
Isso cria a ponte necessária entre o setor de Vendas e o Financeiro, permitindo saber se um pedido faturado já foi liquidado.
```
-- Adiciona status_pagamento à tabela de vendas
ALTER TABLE vendas 
ADD COLUMN status_pagamento TEXT DEFAULT 'Pendente';

ALTER TABLE vendas 
ADD CONSTRAINT chk_status_pagamento 
CHECK (status_pagamento IN ('Pendente', 'Pago', 'Parcial', 'Cancelado', 'Estornado'));
```

# 🛡️ 1. Tabela de Auditoria (Estrutura)
Conforme planejado no Passo 3, mas implementando agora a tabela para que ela já exista no banco.
```
CREATE TABLE auditoria (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID, -- Quem fez a alteração
    tabela TEXT NOT NULL,
    acao TEXT NOT NULL, -- INSERT, UPDATE, DELETE
    dados_anteriores JSONB,
    dados_novos JSONB,
    data_evento TIMESTAMP DEFAULT now()
);

COMMENT ON TABLE auditoria IS 'Registro histórico de todas as alterações manuais no ERP';
```

🗑️ 2. Implementação do Soft Delete (Não exclusão física)
Para um ERP profissional, é perigoso deletar um cliente ou produto que já tem histórico de vendas. Adicione estas colunas às tabelas principais:
```
-- Adicionando controle de exclusão lógica
ALTER TABLE clientes ADD COLUMN excluido_em TIMESTAMP;
ALTER TABLE produtos ADD COLUMN excluido_em TIMESTAMP;
ALTER TABLE fornecedores ADD COLUMN excluido_em TIMESTAMP;
ALTER TABLE usuarios ADD COLUMN excluido_em TIMESTAMP;

```



## 📑 1. Categorias de Produtos (categories)
```
CREATE TABLE categorias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT,
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMP DEFAULT now()
);

-- Adicionando a FK na tabela de produtos para vincular à categoria
ALTER TABLE produtos ADD COLUMN categoria_id UUID REFERENCES categorias(id);
```

## 🏪 2. Controle de Caixa (cash_register)
Garante a segurança do PDV, registrando a abertura e o fechamento diário realizado pelos operadores.
```
CREATE TABLE controle_caixa (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id), -- Operador que abriu o caixa
    data_abertura TIMESTAMP DEFAULT now(),
    data_fechamento TIMESTAMP,
    saldo_inicial NUMERIC(10,2) NOT NULL DEFAULT 0,
    saldo_final NUMERIC(10,2),
    status TEXT CHECK (status IN ('aberto', 'fechado')) DEFAULT 'aberto'
);
```
## 📱 3. Configurações de Integração (whatsapp_config)
Espaço seguro para armazenar as credenciais da Evolution API e os tokens necessários para automação
Essencial para organizar a vitrine do seu E-commerce e facilitar filtros no PDV.
```
CREATE TABLE whatsapp_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    instancia_nome TEXT NOT NULL, -- Nome da instância na Evolution API
    apikey TEXT NOT NULL, -- Token de segurança
    url_base TEXT NOT NULL, -- URL do servidor Evolution
    ativo BOOLEAN DEFAULT true,
    ultima_sincronizacao TIMESTAMP
);
```



## Sugestões de Ajustes Rápidos (faça antes de criar policies RLS)
```
-- Correções / melhorias recomendadas (resumo)

-- 1. Completar itens_venda
ALTER TABLE vendas_itens
    ADD COLUMN quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    ADD COLUMN preco_unitario NUMERIC(10,2) NOT NULL,
    ADD COLUMN subtotal NUMERIC(10,2) GENERATED ALWAYS AS (quantidade * preco_unitario) STORED;

-- 2. Vincular lançamentos financeiros ao caixa (opcional, mas muito útil)
ALTER TABLE financeiro_lancamentos
    ADD COLUMN caixa_id UUID REFERENCES controle_caixa(id);

-- 3. Adicionar tenant (se for escalar para multi-empresa)
ALTER TABLE ... -- fazer em todas as tabelas de negócio
    ADD COLUMN empresa_id UUID REFERENCES empresas(id);

-- 4. Melhorar rastreabilidade
ALTER TABLE usuarios
    ADD COLUMN ultimo_login TIMESTAMP;

ALTER TABLE auditoria
    ADD COLUMN ip TEXT,
    ADD COLUMN user_agent TEXT;
```

## 1. Relacionamento na Auditoria
Na tabela auditoria, o campo usuario_id deve ser uma Foreign Key para garantir que você saiba exatamente quem fez a alteração.
SQL

```
-- Sugestão de ajuste:
ALTER TABLE auditoria 
ADD CONSTRAINT fk_auditoria_usuario 
FOREIGN KEY (usuario_id) REFERENCES usuarios(id);
```






