# ERP_ABP — Gestão & PDV

Sistema ERP web para pequenos negócios: cadastro de entidades (clientes, fornecedores,
colaboradores), controle de estoque, financeiro com parcelamento e frente de caixa (PDV)
com cupom térmico, leitura de código de barras e sincronização com Supabase.

- **Fonte da verdade:** Supabase (PostgREST)
- **Offline:** IndexedDB (cache de leitura + fila de escritas pendentes)
- **Primeiro acesso:** usuário `admin` / senha `admin`

---

## 1. Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | TanStack Start v1 (React 19 + TanStack Router) |
| Build | Vite 7 |
| Estilos | Tailwind CSS v4 (`src/styles.css`) |
| Ícones | lucide-react |
| Banco de dados | Supabase / PostgreSQL via API REST (PostgREST) |
| Cache offline | IndexedDB (wrapper próprio, sem dependências) |
| Código de barras | html5-qrcode (câmera) + leitores USB (modo teclado) |
| Linguagem | TypeScript (modo estrito) |

---

## 2. Estrutura de pastas

```text
src/
  routes/
    __root.tsx            Shell HTML, providers e boundaries de erro/404
    index.tsx             Rota "/" (ssr: false) que monta o ERP
  components/
    ErpApp.tsx            Shell do app: sessão, abas, carregamento e status online
    LoginModal.tsx        Tela de login (usuário/senha)
    Header.tsx            Cabeçalho: busca global, tema, usuário, logout
    Sidebar.tsx           Navegação entre módulos
    BarcodeScannerModal.tsx  Leitura de código de barras pela câmera
    ThermalReceipt.tsx    Cupom não fiscal 80mm para impressão
  views/
    WelcomeView.tsx       Dashboard com KPIs e atalhos
    PdvView.tsx           Frente de caixa, carrinho, sangria, histórico
    EstoqueView.tsx       Produtos, estoque mínimo, importação de XML NF-e
    FinanceiroView.tsx    Lançamentos, parcelas, baixas e anexos
    EntidadesView.tsx     Clientes/fornecedores/colaboradores (busca de CEP)
    ConfiguracoesView.tsx Credenciais Supabase, permissões, senha e backup
    DocumentacaoView.tsx  Documentação exibida dentro do sistema
  lib/
    supabase.ts           Cliente Supabase (URL/chave configuráveis em runtime)
    idb.ts                IndexedDB: cache por tabela + outbox
    storage.ts            Camada de dados (Supabase primeiro, IndexedDB de fallback)
    auth.ts               Login, hash SHA-256, sessão e troca de senha
  types/erp.ts            Tipos de domínio
```

---

## 3. Configuração do Supabase

As credenciais padrão já estão em `src/lib/supabase.ts` e podem ser trocadas em
**Configurações → Conexão do Banco de Dados** (salvas em `localStorage` e aplicadas ao recarregar).

```
API URL:  https://cbsfujkzozgcnkjahvoj.supabase.co
Anon Key: chave pública (publishable) — pode ficar no código
```

### Criação das tabelas (execute no SQL Editor do Supabase)

```sql
-- =========================================================
-- ERP_ABP — schema completo
-- =========================================================
create extension if not exists "pgcrypto";

-- ---------- USUÁRIOS DO SISTEMA ----------
create table if not exists public.usuarios (
  id          uuid primary key default gen_random_uuid(),
  username    text not null unique,
  senha_hash  text not null,               -- SHA-256 hexadecimal da senha
  nome        text not null default 'Usuário',
  papel       text not null default 'operador',  -- admin | operador
  ativo       boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ---------- ENTIDADES ----------
create table if not exists public.entidades (
  id               uuid primary key default gen_random_uuid(),
  nome_completo    text not null,
  cpf              text,
  data_nascimento  date,
  email            text,
  telefone         text,
  tipo_entidade    text not null default 'cliente',  -- cliente | fornecedor | colaborador
  status_entidade  text not null default 'ativo',    -- ativo | inativo
  cep              text,
  logradouro       text,
  numero           text,
  bairro           text,
  cidade           text,
  estado           text,
  foto_url         text,
  created_at       timestamptz not null default now()
);

-- ---------- PRODUTOS ----------
create table if not exists public.produtos (
  id                  uuid primary key default gen_random_uuid(),
  nome                text not null,
  descricao           text,
  codigo_barras       text,
  preco_custo         numeric(12,2) not null default 0,
  preco_venda         numeric(12,2) not null default 0,
  quantidade_estoque  integer not null default 0,
  estoque_minimo      integer not null default 5,
  categoria           text not null default 'Geral',
  foto_url            text,
  created_at          timestamptz not null default now()
);
create index if not exists produtos_codigo_barras_idx on public.produtos (codigo_barras);

-- ---------- FINANÇAS ----------
create table if not exists public.financas (
  id                uuid primary key default gen_random_uuid(),
  entidade_id       uuid references public.entidades(id) on delete set null,
  descricao         text not null,
  valor_total       numeric(12,2) not null default 0,
  tipo              text not null,                    -- receita | despesa
  num_parcelas      integer not null default 1,
  categoria         text not null default 'Geral',
  status_lancamento text not null default 'aberto',   -- aberto | finalizado | cancelado
  created_at        timestamptz not null default now()
);

-- ---------- PARCELAS ----------
create table if not exists public.parcelas (
  id               uuid primary key default gen_random_uuid(),
  financa_id       uuid not null references public.financas(id) on delete cascade,
  num_parcela      integer not null default 1,
  valor_parcela    numeric(12,2) not null default 0,
  data_vencimento  date not null,
  data_pagamento   date,
  status           text not null default 'pendente',  -- pendente | pago | atrasado
  codigo_barra     text,
  boleto_url       text,
  comprovante_url  text,
  created_at       timestamptz not null default now()
);
create index if not exists parcelas_financa_idx on public.parcelas (financa_id);

-- ---------- VENDAS (PDV) ----------
create table if not exists public.vendas (
  id              uuid primary key default gen_random_uuid(),
  entidade_id     uuid references public.entidades(id) on delete set null,
  valor_total     numeric(12,2) not null default 0,
  desconto        numeric(12,2) not null default 0,
  forma_pagamento text not null default 'Dinheiro',
  status          text not null default 'concluida',  -- concluida | pendente | cancelada
  created_at      timestamptz not null default now()
);

create table if not exists public.itens_venda (
  id             uuid primary key default gen_random_uuid(),
  venda_id       uuid not null references public.vendas(id) on delete cascade,
  produto_id     uuid references public.produtos(id) on delete set null,
  quantidade     integer not null default 1,
  preco_unitario numeric(12,2) not null default 0,
  subtotal       numeric(12,2) not null default 0,
  created_at     timestamptz not null default now()
);
create index if not exists itens_venda_venda_idx on public.itens_venda (venda_id);

-- =========================================================
-- GRANTS (obrigatório: PostgREST não concede por padrão)
-- =========================================================
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on
  public.usuarios, public.entidades, public.produtos,
  public.financas, public.parcelas, public.vendas, public.itens_venda
  to anon, authenticated;
grant all on
  public.usuarios, public.entidades, public.produtos,
  public.financas, public.parcelas, public.vendas, public.itens_venda
  to service_role;

-- =========================================================
-- RLS
-- O app usa a chave pública (anon) e autenticação própria pela tabela
-- `usuarios`. Por isso as políticas liberam acesso ao papel anon.
-- Em produção multiusuário, troque por Supabase Auth + policies por auth.uid().
-- =========================================================
alter table public.usuarios   enable row level security;
alter table public.entidades  enable row level security;
alter table public.produtos   enable row level security;
alter table public.financas   enable row level security;
alter table public.parcelas   enable row level security;
alter table public.vendas     enable row level security;
alter table public.itens_venda enable row level security;

do $$
declare t text;
begin
  foreach t in array array['usuarios','entidades','produtos','financas','parcelas','vendas','itens_venda']
  loop
    execute format('drop policy if exists "erp_abp_full_access" on public.%I', t);
    execute format(
      'create policy "erp_abp_full_access" on public.%I for all to anon, authenticated using (true) with check (true)', t);
  end loop;
end $$;

-- =========================================================
-- USUÁRIO PADRÃO: admin / admin  (SHA-256 de "admin")
-- =========================================================
insert into public.usuarios (username, senha_hash, nome, papel)
values ('admin',
        '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
        'Administrador', 'admin')
on conflict (username) do nothing;
```

> Se a tabela `usuarios` estiver vazia, o próprio app cria o `admin/admin`
> automaticamente no primeiro login.

---

## 4. Regras de negócio

### Autenticação
- Login por **usuário + senha** contra `public.usuarios`; a senha trafega apenas como
  hash **SHA-256** (Web Crypto) e nunca é armazenada em claro.
- Primeiro acesso: `admin` / `admin`. Se não houver o registro, ele é criado no login.
- Usuário com `ativo = false` é bloqueado.
- A sessão fica em `localStorage` (`erp_abp_session`). Trocar a senha em
  **Configurações → Segurança da Conta** atualiza o hash no Supabase.
- Sem conexão, o login usa as últimas credenciais válidas em cache (ou `admin/admin`).

### Sincronização (Supabase = fonte da verdade)
1. Toda **leitura** consulta o Supabase; o resultado sobrescreve o cache IndexedDB.
2. Se a leitura falhar (offline, falha de rede, tabela ausente), o app usa o cache.
3. Toda **escrita** vai ao Supabase. Falhando, é gravada na fila `outbox` do IndexedDB.
4. A fila é reenviada automaticamente ao voltar a conexão e antes de cada recarga de dados.
5. IDs são UUIDs gerados no cliente, garantindo que o registro criado offline mantenha
   a mesma identidade após a sincronização.

### Estoque
- Produto possui `preco_custo`, `preco_venda`, `quantidade_estoque` e `estoque_minimo`.
- `quantidade_estoque <= estoque_minimo` marca o produto como **estoque crítico**
  e ele aparece nos alertas do dashboard.
- Importação de XML de NF-e cria/atualiza produtos a partir das tags `prod`.
- Cada venda no PDV **debita** a quantidade vendida (nunca abaixo de zero).

### Financeiro
- Um **lançamento** (`financas`) é receita ou despesa e gera N **parcelas**.
- Cálculo: `tipoCalculo = 'total'` divide o valor pelo número de parcelas;
  `'parcela'` multiplica o valor pelo número de parcelas.
- Recorrência: `diario` (+1 dia por parcela) ou passo em meses (`1`, `2`, `3`…).
- Parcela com `data_pagamento` preenchida fica `pago`; vencida e não paga é exibida
  como **atrasada**.
- Parcela aceita código de barras do boleto, URL do boleto e comprovante.

### PDV (frente de caixa)
- Itens entram por busca, clique ou leitura de código de barras (câmera ou leitor USB).
- Total = soma dos itens − desconto, nunca negativo.
- Ao fechar a venda o sistema grava, em sequência: `vendas` → `itens_venda` →
  baixa de estoque → `financas` (receita `Vendas`, finalizada) → `parcelas` (quitada,
  com o cupom HTML anexado em `comprovante_url`).
- **Sangria**: gera despesa finalizada na categoria `Sangria`, já quitada.
- Cupom não fiscal 80mm pronto para impressora térmica.

### Entidades
- Tipos: `cliente`, `fornecedor`, `colaborador`; status `ativo`/`inativo`.
- Endereço preenchido automaticamente pelo CEP (API ViaCEP).
- Excluir uma entidade mantém vendas e lançamentos (o vínculo vira nulo).

### Backup
- **Exportar**: JSON com todas as coleções do cache local.
- **Restaurar**: faz `upsert` dos registros no Supabase e atualiza o cache.

---

## 5. Executando

```bash
bun install
bun run dev     # http://localhost:8080
bun run build   # build de produção
```

Login inicial: **admin / admin**.

---

## 6. Solução de problemas

| Sintoma | Causa provável | Solução |
|---|---|---|
| Faixa vermelha "Banco de dados incompleto" | Tabelas não criadas | Rodar o SQL da seção 3 |
| `Could not find the table ... schema cache` | Idem | Idem |
| Dados não aparecem mesmo com tabelas criadas | RLS sem policy para `anon` | Rodar o bloco de policies |
| Faixa amarela "Modo offline" | Sem internet | Os dados sincronizam sozinhos ao reconectar |
| Login recusado | Senha alterada | Redefinir `senha_hash` em `usuarios` (SHA-256) |
