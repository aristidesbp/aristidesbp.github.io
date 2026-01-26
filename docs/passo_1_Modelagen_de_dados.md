
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
 ├─ data_nascimento (text)
 ├─ email (text)
 ├─ senha_hash (text)
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
# 🔹 PARTE 2 — 🧱 BANCO DE DADOS NO SUPABASE 
* 👉 Compatível com PostgreSQL / Supabase
  
## usuarios.sql
```
create table public.usuarios (
  id bigint generated by default as identity not null,
  created_at timestamp with time zone not null default now(),
  user_auth_users_id uuid null,
  nome text null,
  cpf text null,
  data_nascimento text null,
  email text null,
  senha_hash text null,
  contato text null,
  endereco text null,
  avata_url text null,
  constraint usuarios_pkey primary key (id),
  constraint usuarios_user_auth_users_id_fkey foreign KEY (user_auth_users_id) references auth.users (id)
) TABLESPACE pg_default;
```


# FUNCTION TRIGGER (prompt)
```
crie uma função trigger para ser implementada no Supabase com o seguinte objetivo:
A cada novo usuario que for criado no schema auth, deve ser criado o mesmo usuario no schema public na tabela abaixo.

create table public.usuarios (
  id bigint generated by default as identity not null,
  created_at timestamp with time zone not null default now(),
  user_auth_users_id uuid null,
  nome text null,
  cpf text null,
  data_nascimento text null,
  email text null,
  senha_hash text null,
  contato text null,
  endereco text null,
  avata_url text null,
  constraint usuarios_pkey primary key (id),
  constraint usuarios_user_auth_users_id_fkey foreign KEY (user_auth_users_id) references auth.users (id)
) TABLESPACE pg_default;
```
# FUNCTION TRIGGER (resposta)
```
-- 1. Criação da função que será disparada
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.usuarios (user_auth_users_id, email, nome)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name' -- Captura o nome se enviado via metadata
  );
  return new;
end;
$$;

-- 2. Criação do Trigger propriamente dito
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```
















