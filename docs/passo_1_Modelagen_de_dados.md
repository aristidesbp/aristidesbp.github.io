
# 📌 RELACIONAMENTOS (CONCEITUAIS)
## Mesmo em IndexedDB (não relacional), pense como se fosse relacional:
* Usuário → Clientes/Funcionários/Fornecedores/Tercerisados → um usuário pode ter zero ou muitos Clientes/Funcionários/Fornecedores/Tercerisados registrados.
* Venda → Cliente → cada venda pertence a um cliente.
* Produto → Fornecedor → cada produto tem um fornecedor.
* Financeiro → Venda → opcionalmente vincula lançamentos a vendas.
* Relacionamentos N-N podem ser modelados por stores de junction ou arrays de IDs.

# 🔹 PARTE 1 — DIAGRAMA CONCEITUAL (ER) — VISÃO PROFISSIONAL

```
USUARIOS
 ├─ id (PK)
 ├─ criadoEm (timestamp)
 ├─ user_auth_users_id (uui) //criar espelho
 ├─ nome (text)
 ├─ cpf (text)
 ├─ data_nascimento (timestamp)
 ├─ email (text)
 ├─ senhaHash (text)
 ├─ contato (text)
 ├─ cep (text)
 ├─ endereco (text)
 └─ avata_url(text)
      │
      ├───────────────|─────────────────────┐
      │               │                     |
CLIENTES          FUNCIONARIOS           CATEGORIA
 ├─ id (PK)        ├─ id (PK)              ├─ id (PK)
 ├─ criadoEm       ├─ criadoEm             ├─ criadoEm 
 ├─ usuarioId (FK) ├─ usuarioId (FK)       ├─ usuarioId (FK)
 ├─ status         ├─ status               ├─ status 
 ├─ avata_url      ├─ avata_url            ├─ foto_url 
 ├─ nome           ├─ nome                 └─ categorias
 ├─ cpfCnpj        ├─ cpf                     |
 ├─ contato        ├─ contato                 ▼
 ├─ email          ├─ email               SUB_CATEGORIA
 ├─ cep            ├─ cep                  ├─ id (PK)
 ├─ endereco       ├─ endereco             ├─ criadoEm 
 ├─ status         ├─ status               ├─ usuarioId (FK)
 └─ senha          ├─ cargo                ├─ status 
                   ├─ departamento         ├─ foto_url        
                   └─ senha                └─ sub_categorias


FORNECEDORES
 ├─ id (PK)
 ├─ criadoEm 
 ├─ usuarioId (FK)
 ├─ status
 ├─ avata_url
 ├─ nome
 ├─ cnpj
 ├─ inscricao_estadual
 ├─ inscricao_municipal
 ├─ cep
 ├─ endereco  
 ├─ senha  
 ├─ email  
 └─ contato

      │
      ▼

PRODUTOS
 ├─ id (PK)
 ├─ criadoEm 
 ├─ usuarioId (FK)
 ├─ status
 ├─ foto_url
 ├─ fornecedorId (FK)
 ├─ nota_fiscal
 ├─ titulo
 ├─ descricao
 ├─ categoriaID (FK)
 ├─ sub_categoriaID (FK)
 ├─ preco_compra
 ├─ preco_venda
 ├─ data_compra
 ├─ data_vencimento
 ├─ codigo_barras
 ├─ estoque
 └─ estoque_minimo

      │
      ▼

SERVICOS
 ├─ id (PK)
 ├─ criadoEm 
 ├─ usuarioId (FK)
 ├─ status
 ├─ titulo
 ├─ descricao
 ├─ categoriaID (FK)
 ├─ sub_categoriaID (FK)
 ├─ preco
 ├─ preco_estimado (tipo text/ diaria/hora)
 ├─ foto_url
 └─ estoque_minimo

 AGENDAR_SERVICOS
 ├─ id (PK)
 ├─ criadoEm 
 ├─ usuarioId (FK)
 ├─ status
 ├─ servicoId (FK)
 ├─ clienteId (FK)
 ├─ data
 ├─ hora
 └─ estoque_minimo

      │
      ▼

AVALIACOES
 ├─ id (PK)
 ├─ criadoEm 
 ├─ usuarioId (FK)
 ├─ status
 ├─ clienteId (FK)
 ├─ produtoId (FK)
 ├─ servicosId (FK)
 ├─ nota
 └─ comentario

      │
      ▼

FAVORITOS
 ├─ id (PK)
 ├─ criadoEm 
 ├─ usuarioId (FK)
 ├─ status
 ├─ clienteId (FK)
 ├─ fornecedoresId (FK)
 ├─ produtoId (FK)
 ├─ servicosId (FK)
 ├─ nota
 └─ comentario

      │
      ▼

FORMAS_DE_PAGAMENTO
 ├─ id (PK)
 ├─ criadoEm 
 ├─ usuarioId (FK)
 ├─ status
 ├─ dataVenda
 ├─ tipo (pix, credito, dinheiro)
 ├─ modo (parcelado, avista)
 └─ valorTotal

      │
      ▼

VENDAS
 ├─ id (PK)
 ├─ criadoEm 
 ├─ usuarioId (FK)
 ├─ status
 ├─ clienteId (FK)
 ├─ f_pagamentoId (FK)
 ├─ dataVenda
 ├─ valorTotal
 └─ status

      │
      ▼

ITENS_VENDA
 ├─ id (PK)
 ├─ criadoEm 
 ├─ usuarioId (FK)
 ├─ status
 ├─ vendaId (FK)
 ├─ produtoId (FK)
 ├─ quantidade
 └─ precoUnitario


FINANCEIRO
 ├─ id (PK)
 ├─ criadoEm 
 ├─ usuarioId (FK)
 ├─ tipo (receita/despesa)
 ├─ valor
 ├─ parcelas
 ├─ data_vencimento
 ├─ data_pagamento
 ├─ descricao
 └─ vendaId (FK opcional)

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
# 🔹 PARTE 2 — CRIAR TABELAS NO SUPABASE — (APENAS AS TABELAS)

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
  
```
-- ==========================================
-- ERP ABP PROFISSIONAL - SCRIPT DE CRIAÇÃO
-- ==========================================

-- 1. EXTENSÕES (Caso não estejam ativas)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABELA PRINCIPAL: USUARIOS
CREATE TABLE public.usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    criadoEm TIMESTAMPTZ DEFAULT NOW(),
    nome TEXT NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    data_nascimento DATE,
    email TEXT UNIQUE NOT NULL,
    senhaHash TEXT NOT NULL,
    contato TEXT,
    cep VARCHAR(9),
    endereco TEXT,
    avata_url TEXT,
    role TEXT DEFAULT 'user'
);

-- 3. ENTIDADES (Clientes, Funcionários, Fornecedores)
CREATE TABLE public.clientes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    criadoEm TIMESTAMPTZ DEFAULT NOW(),
    usuarioId UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    cpfCnpj VARCHAR(20),
    contato TEXT,
    email TEXT,
    cep VARCHAR(9),
    endereco TEXT,
    status TEXT DEFAULT 'ativo',
    avata_url TEXT,
    senha TEXT -- Para acesso ao portal do cliente
);

CREATE TABLE public.funcionarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    criadoEm TIMESTAMPTZ DEFAULT NOW(),
    usuarioId UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    cpf VARCHAR(14),
    contato TEXT,
    email TEXT,
    cep VARCHAR(9),
    endereco TEXT,
    cargo TEXT,
    departamento TEXT,
    status TEXT DEFAULT 'ativo',
    avata_url TEXT,
    senha TEXT
);

CREATE TABLE public.fornecedores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    criadoEm TIMESTAMPTZ DEFAULT NOW(),
    usuarioId UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    cnpj VARCHAR(20),
    inscricao_estadual TEXT,
    inscricao_municipal TEXT,
    cep VARCHAR(9),
    endereco TEXT,
    email TEXT,
    contato TEXT,
    status TEXT DEFAULT 'ativo',
    avata_url TEXT,
    senha TEXT
);

-- 4. CATEGORIZAÇÃO
CREATE TABLE public.categoria (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    criadoEm TIMESTAMPTZ DEFAULT NOW(),
    usuarioId UUID REFERENCES public.usuarios(id),
    nome TEXT NOT NULL,
    status TEXT DEFAULT 'ativo',
    foto_url TEXT
);

CREATE TABLE public.sub_categoria (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    criadoEm TIMESTAMPTZ DEFAULT NOW(),
    usuarioId UUID REFERENCES public.usuarios(id),
    categoriaId UUID REFERENCES public.categoria(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    status TEXT DEFAULT 'ativo',
    foto_url TEXT
);

-- 5. PRODUTOS E SERVIÇOS
CREATE TABLE public.produtos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    criadoEm TIMESTAMPTZ DEFAULT NOW(),
    usuarioId UUID REFERENCES public.usuarios(id),
    fornecedorId UUID REFERENCES public.fornecedores(id),
    categoriaID UUID REFERENCES public.categoria(id),
    sub_categoriaID UUID REFERENCES public.sub_categoria(id),
    titulo TEXT NOT NULL,
    descricao TEXT,
    preco_compra DECIMAL(10,2),
    preco_venda DECIMAL(10,2),
    estoque INTEGER DEFAULT 0,
    estoque_minimo INTEGER DEFAULT 0,
    codigo_barras TEXT,
    nota_fiscal TEXT,
    data_compra DATE,
    data_vencimento DATE,
    foto_url TEXT,
    status TEXT DEFAULT 'ativo'
);

CREATE TABLE public.servicos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    criadoEm TIMESTAMPTZ DEFAULT NOW(),
    usuarioId UUID REFERENCES public.usuarios(id),
    categoriaID UUID REFERENCES public.categoria(id),
    sub_categoriaID UUID REFERENCES public.sub_categoria(id),
    titulo TEXT NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2),
    preco_estimado TEXT, -- Ex: "por hora", "diária"
    foto_url TEXT,
    status TEXT DEFAULT 'ativo'
);

-- 6. VENDAS E PAGAMENTOS
CREATE TABLE public.formas_de_pagamento (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    criadoEm TIMESTAMPTZ DEFAULT NOW(),
    usuarioId UUID REFERENCES public.usuarios(id),
    tipo TEXT, -- pix, credito, dinheiro
    modo TEXT, -- parcelado, avista
    valorTotal DECIMAL(10,2),
    status TEXT DEFAULT 'concluido'
);

CREATE TABLE public.vendas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    criadoEm TIMESTAMPTZ DEFAULT NOW(),
    usuarioId UUID REFERENCES public.usuarios(id),
    clienteId UUID REFERENCES public.clientes(id),
    f_pagamentoId UUID REFERENCES public.formas_de_pagamento(id),
    dataVenda TIMESTAMPTZ DEFAULT NOW(),
    valorTotal DECIMAL(10,2),
    status TEXT DEFAULT 'finalizada'
);

CREATE TABLE public.itens_venda (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    criadoEm TIMESTAMPTZ DEFAULT NOW(),
    vendaId UUID REFERENCES public.vendas(id) ON DELETE CASCADE,
    produtoId UUID REFERENCES public.produtos(id),
    quantidade INTEGER NOT NULL,
    precoUnitario DECIMAL(10,2) NOT NULL
);

-- 7. FINANCEIRO E FEEDBACK
CREATE TABLE public.financeiro (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    criadoEm TIMESTAMPTZ DEFAULT NOW(),
    usuarioId UUID REFERENCES public.usuarios(id),
    vendaId UUID REFERENCES public.vendas(id) ON DELETE SET NULL,
    tipo TEXT NOT NULL, -- receita / despesa
    valor DECIMAL(10,2) NOT NULL,
    parcelas INTEGER DEFAULT 1,
    data_vencimento DATE,
    data_pagamento DATE,
    descricao TEXT
);

CREATE TABLE public.avaliacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    criadoEm TIMESTAMPTZ DEFAULT NOW(),
    usuarioId UUID REFERENCES public.usuarios(id),
    clienteId UUID REFERENCES public.clientes(id),
    produtoId UUID REFERENCES public.produtos(id),
    servicosId UUID REFERENCES public.servicos(id),
    nota INTEGER CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT
);

-- 8. COMUNICAÇÃO E UTILITÁRIOS
CREATE TABLE public.conversas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    canal TEXT, -- whatsapp, instagram
    clienteId UUID REFERENCES public.clientes(id),
    ultimaAtualizacao TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.mensagens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversaId UUID REFERENCES public.conversas(id) ON DELETE CASCADE,
    remetente TEXT,
    conteudo TEXT,
    dataEnvio TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.notas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuarioId UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
    titulo TEXT,
    conteudo TEXT,
    criadoEm TIMESTAMPTZ DEFAULT NOW()
);

-- 9. CONTEÚDO E POLÍTICAS
CREATE TABLE public.documentacao (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo TEXT,
    conteudo TEXT,
    tags TEXT[]
);

CREATE TABLE public.politicas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo TEXT,
    conteudo TEXT
);


CREATE TABLE public.agendar_servicos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    criadoEm TIMESTAMPTZ DEFAULT NOW(),
    usuarioId UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
    servicoId UUID REFERENCES public.servicos(id) ON DELETE CASCADE,
    clienteId UUID REFERENCES public.clientes(id) ON DELETE CASCADE,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    status TEXT DEFAULT 'agendado', -- agendado, concluido, cancelado
    estoque_minimo INTEGER DEFAULT 0, -- Mantido conforme sua solicitação de modelagem
    
    -- Opcional: Impedir agendamentos duplicados para o mesmo profissional/serviço no mesmo horário
    CONSTRAINT agendamento_unico UNIQUE (servicoId, data, hora)
);

```




















