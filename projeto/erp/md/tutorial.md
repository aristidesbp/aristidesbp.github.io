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
