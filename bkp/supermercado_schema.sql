-- =====================================================================
-- SUPERMERCADO: ERP (loja física) + VITRINE (e-commerce) + PORTAL DO CLIENTE
-- PostgreSQL / Supabase.  ⚠ RECRIA TUDO DO ZERO: apaga os dados existentes.
-- =====================================================================
-- MODELO DE ACESSO
--  • Cadastro público (auth.signUp) vira CLIENTE automaticamente (trigger).
--    Ninguém consegue se promover a funcionário pelo app.
--  • Funcionário = linha em `funcionarios`, criada por um admin, com cargo:
--      admin · gerente · caixa · estoquista · financeiro · atendente_sac · entregador
--  • Regras críticas (venda, estoque, pedido, baixa financeira) rodam em
--    funções RPC no banco, dentro de transação. O front NUNCA grava total,
--    preço ou estoque: o servidor recalcula.
--  • Visitante (anon) só enxerga as VIEWS da vitrine. Nenhuma tabela.
-- Depois de rodar, leia "PÓS-INSTALAÇÃO" no final do arquivo.
-- =====================================================================

-- =====================================================================
-- 0. LIMPEZA (objetos antigos e novos)
-- =====================================================================
drop trigger if exists on_auth_user_created on auth.users;

drop policy if exists sm_produtos_ins on storage.objects;
drop policy if exists sm_produtos_upd on storage.objects;
drop policy if exists sm_produtos_del on storage.objects;
drop policy if exists sm_sac_sel      on storage.objects;
drop policy if exists sm_sac_ins      on storage.objects;
drop policy if exists sm_fiscal_sel   on storage.objects;
drop policy if exists sm_fiscal_ins   on storage.objects;
drop policy if exists sm_fiscal_upd   on storage.objects;

drop view if exists vitrine, vitrine_produtos, vitrine_categorias, loja_publica,
  vitrine_zonas_entrega, v_titulos_cliente, v_estoque_baixo cascade;

drop table if exists
  -- modelo antigo
  entidades, pdv_vendas, pdv_itens_venda, fin_pagamentos_venda, fin_contas,
  log_entregas, auditoria_produtos,
  -- modelo novo
  reclamacao_mensagens, reclamacoes, notas_fiscais, fin_baixas, fin_titulos,
  entrega_codigos, entrega_eventos, entregas, est_movimentacoes,
  venda_status_hist, venda_pagamentos, venda_itens, vendas,
  pdv_movimentos_caixa, pdv_turnos, pdv_terminais, zonas_entrega,
  compras_itens, compras, produtos, categorias, fornecedores,
  enderecos_cliente, clientes, rh_contratos, funcionarios, config_loja, auditoria
cascade;

do $$
declare r record;
begin
  for r in
    select p.oid::regprocedure as f
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = any (array[
      'adicionar_produto_seguro','atualizar_produto_seguro',
      'cargo_atual','tem_cargo','meu_cliente_id','meu_funcionario_id',
      'eh_minha_venda','eh_minha_entrega','preco_atual','set_updated_at',
      'handle_new_user','proteger_cliente','proteger_produto','mov_estoque',
      'proteger_titulo','baixa_titulo','registrar_auditoria','hist_status_venda',
      'evento_entrega','definir_protocolo','reclamacao_status',
      'reclamacao_mensagem_nova','_cancelar_venda','confirmar_pagamento_online',
      'criar_pedido_ecommerce','cancelar_meu_pedido','atualizar_status_pedido',
      'cancelar_venda','atualizar_status_entrega','atualizar_posicao_entrega',
      'abrir_turno','fechar_turno','finalizar_venda_pdv','buscar_produtos_pdv',
      'importar_compra_nfe','abrir_reclamacao','avaliar_reclamacao'])
  loop
    execute format('drop function if exists %s cascade', r.f);
  end loop;
end $$;

-- Busca rápida por nome (ILIKE). Se já existir em outro schema, é reaproveitada.
create extension if not exists pg_trgm;

-- =====================================================================
-- 1. TABELAS
-- =====================================================================

-- Configuração da loja (linha única)
create table config_loja (
  id boolean primary key default true check (id),
  nome_fantasia text not null default 'Meu Supermercado',
  razao_social text, cnpj text,
  telefone text, whatsapp text, email text,
  endereco_completo text, logo_url text,
  chave_pix text,
  horario_funcionamento jsonb,
  loja_aberta_ecommerce boolean not null default true,
  pedido_minimo_ecommerce numeric(12,2) not null default 0 check (pedido_minimo_ecommerce >= 0),
  permite_estoque_negativo boolean not null default false,
  margem_padrao_xml numeric(5,2) not null default 30 check (margem_padrao_xml >= 0),
  prazo_fiado_dias integer not null default 30 check (prazo_fiado_dias > 0),
  updated_at timestamptz not null default now()
);

-- Funcionários (acesso administrativo por cargo)
create table funcionarios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete restrict,
  nome_completo text not null check (length(nome_completo) between 1 and 200),
  cpf text unique check (cpf ~ '^\d{11}$'),
  telefone text, foto_url text,
  cargo text not null check (cargo in
    ('admin','gerente','caixa','estoquista','financeiro','atendente_sac','entregador')),
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table rh_contratos (
  id uuid primary key default gen_random_uuid(),
  funcionario_id uuid not null references funcionarios(id) on delete cascade,
  salario_base numeric(12,2) check (salario_base >= 0),
  regime text check (regime in ('clt','pj','temporario','estagio')),
  carga_horaria_semanal smallint check (carga_horaria_semanal between 1 and 80),
  data_admissao date not null,
  data_demissao date,
  observacao text,
  created_at timestamptz not null default now()
);

-- Clientes (com conta no app = user_id preenchido; cliente de balcão = sem user_id)
create table clientes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete set null,
  tipo_pessoa char(1) not null default 'F' check (tipo_pessoa in ('F','J')),
  nome_completo text not null check (length(nome_completo) between 1 and 200),
  documento text unique check (documento ~ '^(\d{11}|\d{14})$'),
  email text, telefone text, data_nascimento date,
  limite_credito numeric(12,2) not null default 0 check (limite_credito >= 0),
  ativo boolean not null default true,
  aceitou_termos_em timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table enderecos_cliente (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null references clientes(id) on delete cascade,
  apelido text not null default 'Casa',
  cep text check (cep ~ '^\d{8}$'),
  logradouro text not null, numero text not null default 'S/N',
  complemento text, bairro text not null, cidade text not null,
  uf char(2) not null, referencia text,
  latitude numeric(9,6), longitude numeric(9,6),
  padrao boolean not null default false,
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);

create table fornecedores (
  id uuid primary key default gen_random_uuid(),
  razao_social text not null, nome_fantasia text,
  cnpj text unique check (cnpj ~ '^\d{14}$'),
  email text, telefone text, contato text, endereco_completo text,
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table categorias (
  id uuid primary key default gen_random_uuid(),
  nome text not null unique,
  slug text not null unique,
  categoria_pai_id uuid references categorias(id) on delete set null,
  ordem integer not null default 0,
  ativo boolean not null default true
);

create table produtos (
  id uuid primary key default gen_random_uuid(),
  codigo_barras text, sku text, codigo_fornecedor text,
  nome text not null check (length(nome) between 1 and 200),
  descricao text, marca text,
  categoria_id uuid references categorias(id) on delete set null,
  fornecedor_id uuid references fornecedores(id) on delete set null,
  foto_url text,
  unidade text not null default 'UN' check (unidade in ('UN','KG','G','L','ML','CX','PCT','FD','DZ')),
  vendido_por_peso boolean not null default false,
  preco_custo numeric(12,2) not null default 0 check (preco_custo >= 0),
  preco_venda numeric(12,2) not null default 0 check (preco_venda >= 0),
  preco_promocional numeric(12,2) check (preco_promocional >= 0),
  promo_inicio timestamptz, promo_fim timestamptz,
  estoque_atual numeric(12,3) not null default 0,   -- só muda via est_movimentacoes
  estoque_minimo numeric(12,3) not null default 0 check (estoque_minimo >= 0),
  local_estoque text, local_loja text,
  ncm text check (ncm ~ '^\d{8}$'), cest text, cfop_padrao text,
  origem_mercadoria smallint check (origem_mercadoria between 0 and 8),
  aliquota_icms numeric(5,2),
  especificacoes jsonb,
  ativo boolean not null default true,
  visivel_vitrine boolean not null default true,
  destaque boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint promo_menor_que_venda check (preco_promocional is null or preco_promocional <= preco_venda)
);
create unique index ux_produtos_ean on produtos (codigo_barras) where codigo_barras is not null;
create unique index ux_produtos_sku on produtos (sku) where sku is not null;
create index ix_produtos_categoria on produtos (categoria_id);
create index ix_produtos_forn_cod on produtos (fornecedor_id, codigo_fornecedor);
create index ix_produtos_vitrine on produtos (destaque desc, nome) where ativo and visivel_vitrine;
create index ix_produtos_nome_trgm on produtos using gin (nome gin_trgm_ops);

-- Compras de fornecedor (entrada de mercadoria / XML da NF-e)
create table compras (
  id uuid primary key default gen_random_uuid(),
  fornecedor_id uuid not null references fornecedores(id),
  chave_nfe text not null unique check (chave_nfe ~ '^\d{44}$'),   -- impede importar a mesma nota 2x
  numero_nf text, serie text, data_emissao date,
  data_recebimento date not null default current_date,
  valor_total numeric(12,2) not null default 0,
  observacao text,
  usuario_id uuid default auth.uid(),
  created_at timestamptz not null default now()
);
create table compras_itens (
  id uuid primary key default gen_random_uuid(),
  compra_id uuid not null references compras(id) on delete cascade,
  produto_id uuid not null references produtos(id),
  descricao_nf text,
  quantidade numeric(12,3) not null check (quantidade > 0),
  custo_unitario numeric(12,2) not null check (custo_unitario >= 0),
  subtotal numeric(12,2) not null check (subtotal >= 0)
);
create index ix_compras_itens_compra on compras_itens (compra_id);

-- Caixa (PDV)
create table pdv_terminais (
  id uuid primary key default gen_random_uuid(),
  codigo text not null unique, descricao text,
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);
create table pdv_turnos (
  id uuid primary key default gen_random_uuid(),
  terminal_id uuid not null references pdv_terminais(id),
  operador_id uuid not null references funcionarios(id),
  saldo_abertura numeric(12,2) not null default 0 check (saldo_abertura >= 0),
  saldo_esperado numeric(12,2), saldo_informado numeric(12,2), diferenca numeric(12,2),
  status text not null default 'aberto' check (status in ('aberto','fechado')),
  aberto_em timestamptz not null default now(),
  fechado_em timestamptz
);
create unique index ux_turno_aberto_terminal on pdv_turnos (terminal_id) where status = 'aberto';
create unique index ux_turno_aberto_operador on pdv_turnos (operador_id) where status = 'aberto';
create table pdv_movimentos_caixa (
  id uuid primary key default gen_random_uuid(),
  turno_id uuid not null references pdv_turnos(id) on delete cascade,
  tipo text not null check (tipo in ('sangria','suprimento')),
  valor numeric(12,2) not null check (valor > 0),
  motivo text,
  usuario_id uuid default auth.uid(),
  created_at timestamptz not null default now()
);

-- Entrega: áreas atendidas e taxa
create table zonas_entrega (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  bairros text[] not null default '{}',
  taxa_entrega numeric(12,2) not null default 0 check (taxa_entrega >= 0),
  pedido_minimo numeric(12,2) not null default 0 check (pedido_minimo >= 0),
  prazo_estimado_min integer not null default 60 check (prazo_estimado_min > 0),
  ativo boolean not null default true
);

-- Vendas: PDV e e-commerce na mesma tabela (canal)
create table vendas (
  id uuid primary key default gen_random_uuid(),
  numero_pedido bigint generated always as identity unique,
  canal text not null check (canal in ('pdv','ecommerce')),
  status text not null check (status in ('aguardando_pagamento','paga','em_separacao','pronto',
    'em_rota','entregue','concluida','cancelada','devolvida')),
  cliente_id uuid references clientes(id),
  turno_id uuid references pdv_turnos(id),
  operador_id uuid references funcionarios(id),
  tipo_entrega text not null default 'balcao' check (tipo_entrega in ('balcao','retirada','entrega')),
  total_bruto numeric(12,2) not null default 0 check (total_bruto >= 0),
  total_desconto numeric(12,2) not null default 0 check (total_desconto >= 0),
  taxa_entrega numeric(12,2) not null default 0 check (taxa_entrega >= 0),
  total_liquido numeric(12,2) not null default 0 check (total_liquido >= 0),
  observacao text,
  cancelada_em timestamptz, motivo_cancelamento text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint pdv_exige_turno check (canal <> 'pdv' or turno_id is not null),
  constraint ecom_exige_cliente check (canal <> 'ecommerce' or cliente_id is not null)
);
create index ix_vendas_cliente on vendas (cliente_id, created_at desc);
create index ix_vendas_status on vendas (status);
create index ix_vendas_turno on vendas (turno_id);
create index ix_vendas_operador on vendas (operador_id);

create table venda_itens (
  id uuid primary key default gen_random_uuid(),
  venda_id uuid not null references vendas(id) on delete cascade,
  produto_id uuid not null references produtos(id),
  descricao text not null, codigo_barras text, unidade text,
  quantidade numeric(12,3) not null check (quantidade > 0),
  preco_unitario numeric(12,2) not null check (preco_unitario >= 0),
  custo_unitario numeric(12,2) not null default 0,
  subtotal numeric(12,2) not null check (subtotal >= 0)
);
create index ix_venda_itens_venda on venda_itens (venda_id);
create index ix_venda_itens_produto on venda_itens (produto_id);

create table venda_pagamentos (
  id uuid primary key default gen_random_uuid(),
  venda_id uuid not null references vendas(id) on delete cascade,
  metodo text not null check (metodo in ('dinheiro','pix','debito','credito','vale_alimentacao',
    'fiado','cartao_online','dinheiro_entrega','cartao_entrega')),
  valor numeric(12,2) not null check (valor > 0),
  troco numeric(12,2) not null default 0 check (troco >= 0),
  parcelas smallint not null default 1 check (parcelas between 1 and 24),
  status text not null default 'confirmado' check (status in ('pendente','confirmado','falhou','estornado')),
  gateway_id text,
  created_at timestamptz not null default now()
);
create index ix_venda_pag_venda on venda_pagamentos (venda_id);

create table venda_status_hist (
  id uuid primary key default gen_random_uuid(),
  venda_id uuid not null references vendas(id) on delete cascade,
  status_anterior text, status_novo text not null,
  usuario_id uuid, observacao text,
  created_at timestamptz not null default now()
);
create index ix_venda_hist_venda on venda_status_hist (venda_id, created_at);

-- Razão de estoque (imutável). produtos.estoque_atual é derivado daqui.
create table est_movimentacoes (
  id uuid primary key default gen_random_uuid(),
  produto_id uuid not null references produtos(id),
  tipo text not null check (tipo in ('compra','venda','devolucao_cliente','ajuste','perda','inventario')),
  quantidade numeric(12,3) not null check (quantidade <> 0),       -- delta com sinal
  saldo_apos numeric(12,3),
  venda_id uuid references vendas(id),
  compra_id uuid references compras(id),
  observacao text,
  usuario_id uuid default auth.uid(),
  created_at timestamptz not null default now(),
  constraint sinal_coerente check (
    (tipo in ('venda','perda') and quantidade < 0) or
    (tipo in ('compra','devolucao_cliente') and quantidade > 0) or
    tipo in ('ajuste','inventario'))
);
create index ix_mov_produto on est_movimentacoes (produto_id, created_at desc);

-- Entregas e acompanhamento
create table entregas (
  id uuid primary key default gen_random_uuid(),
  venda_id uuid not null unique references vendas(id) on delete cascade,
  entregador_id uuid references funcionarios(id),
  endereco jsonb not null,                                    -- cópia do endereço no momento do pedido
  status text not null default 'pendente' check (status in ('pendente','separando',
    'aguardando_entregador','em_rota','entregue','falhou','cancelada')),
  taxa_entrega numeric(12,2) not null default 0,
  previsao_entrega timestamptz,
  saiu_em timestamptz, entregue_em timestamptz,
  nome_recebedor text, observacao text,
  ultima_latitude numeric(9,6), ultima_longitude numeric(9,6), posicao_atualizada_em timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index ix_entregas_entregador on entregas (entregador_id, status);
create table entrega_eventos (
  id uuid primary key default gen_random_uuid(),
  entrega_id uuid not null references entregas(id) on delete cascade,
  status text not null, descricao text,
  usuario_id uuid,
  created_at timestamptz not null default now()
);
create index ix_entrega_ev on entrega_eventos (entrega_id, created_at);
-- Código que o cliente informa ao entregador. Tabela separada: o entregador não consegue lê-lo.
create table entrega_codigos (
  entrega_id uuid primary key references entregas(id) on delete cascade,
  codigo text not null
);

-- Financeiro: contas a receber (clientes/boletos/fiado) e a pagar (fornecedores)
create table fin_titulos (
  id uuid primary key default gen_random_uuid(),
  tipo text not null check (tipo in ('receber','pagar')),
  cliente_id uuid references clientes(id),
  fornecedor_id uuid references fornecedores(id),
  venda_id uuid references vendas(id),
  compra_id uuid references compras(id),
  descricao text not null, categoria text,
  numero_documento text,
  parcela smallint not null default 1, total_parcelas smallint not null default 1,
  valor_nominal numeric(12,2) not null check (valor_nominal > 0),
  juros_multa numeric(12,2) not null default 0 check (juros_multa >= 0),
  valor_pago numeric(12,2) not null default 0 check (valor_pago >= 0),
  data_emissao date not null default current_date,
  data_vencimento date not null,
  data_pagamento date,
  status text not null default 'aberto' check (status in ('aberto','parcial','pago','cancelado')),
  forma_pagamento text,
  boleto_linha_digitavel text, boleto_codigo_barras text, boleto_url text,
  nosso_numero text, pix_copia_cola text,
  criado_por uuid default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint partes_coerentes check (
    (tipo = 'receber' and fornecedor_id is null) or (tipo = 'pagar' and cliente_id is null))
);
create index ix_fin_cliente on fin_titulos (cliente_id, status);
create index ix_fin_venc on fin_titulos (data_vencimento) where status in ('aberto','parcial');
create table fin_baixas (
  id uuid primary key default gen_random_uuid(),
  titulo_id uuid not null references fin_titulos(id),
  valor numeric(12,2) not null check (valor > 0),
  data_pagamento date not null default current_date,
  metodo text, observacao text,
  usuario_id uuid default auth.uid(),
  created_at timestamptz not null default now()
);
create index ix_baixas_titulo on fin_baixas (titulo_id);

-- Notas fiscais (a emissão na SEFAZ é feita por um provedor/Edge Function; aqui fica o registro)
create table notas_fiscais (
  id uuid primary key default gen_random_uuid(),
  venda_id uuid references vendas(id),
  compra_id uuid references compras(id),
  tipo text not null check (tipo in ('nfce','nfe','nfe_entrada')),
  serie text, numero text,
  chave_acesso text unique check (chave_acesso ~ '^\d{44}$'),
  protocolo text,
  status text not null default 'pendente' check (status in
    ('pendente','autorizada','cancelada','rejeitada','contingencia')),
  valor_total numeric(12,2),
  emitida_em timestamptz,
  xml_path text, pdf_path text,                                -- caminhos no bucket privado documentos-fiscais
  motivo_rejeicao text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint nota_tem_origem check (venda_id is not null or compra_id is not null)
);
create index ix_notas_venda on notas_fiscais (venda_id);

-- SAC / "Reclame Aqui" interno
create table reclamacoes (
  id uuid primary key default gen_random_uuid(),
  numero bigint generated always as identity unique,
  protocolo text unique,
  cliente_id uuid not null references clientes(id),
  venda_id uuid references vendas(id),
  entrega_id uuid references entregas(id),
  tipo text not null default 'reclamacao' check (tipo in
    ('reclamacao','sugestao','elogio','duvida','troca_devolucao')),
  assunto text not null check (length(assunto) between 3 and 200),
  descricao text not null check (length(descricao) between 3 and 5000),
  status text not null default 'aberta' check (status in
    ('aberta','em_analise','aguardando_cliente','resolvida','fechada')),
  prioridade text not null default 'normal' check (prioridade in ('baixa','normal','alta','urgente')),
  responsavel_id uuid references funcionarios(id),
  prazo_resposta timestamptz not null default now() + interval '5 days',
  resolvida_em timestamptz,
  avaliacao_nota smallint check (avaliacao_nota between 1 and 5),
  avaliacao_comentario text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index ix_recl_cliente on reclamacoes (cliente_id, created_at desc);
create index ix_recl_status on reclamacoes (status, prazo_resposta);
create table reclamacao_mensagens (
  id uuid primary key default gen_random_uuid(),
  reclamacao_id uuid not null references reclamacoes(id) on delete cascade,
  autor_tipo text not null check (autor_tipo in ('cliente','funcionario')),
  autor_id uuid not null default auth.uid(),
  mensagem text not null check (length(mensagem) between 1 and 5000),
  interna boolean not null default false,                      -- nota interna: o cliente não vê
  anexos text[] not null default '{}',
  created_at timestamptz not null default now(),
  constraint cliente_nao_escreve_interna check (not (interna and autor_tipo = 'cliente'))
);
create index ix_recl_msg on reclamacao_mensagens (reclamacao_id, created_at);

-- Auditoria (só o banco escreve)
create table auditoria (
  id bigint generated always as identity primary key,
  tabela text not null, registro_id text, acao text not null,
  dados_antigos jsonb, dados_novos jsonb,
  usuario_id uuid,
  created_at timestamptz not null default now()
);
create index ix_auditoria_tab on auditoria (tabela, registro_id, created_at desc);

-- =====================================================================
-- 2. FUNÇÕES AUXILIARES DE PERMISSÃO
-- =====================================================================
create function cargo_atual() returns text
language sql stable security definer set search_path = public as $$
  select cargo from public.funcionarios where user_id = auth.uid() and ativo limit 1
$$;

-- admin passa em qualquer verificação
create function tem_cargo(variadic p_cargos text[]) returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(public.cargo_atual() = 'admin' or public.cargo_atual() = any (p_cargos), false)
$$;

create function meu_cliente_id() returns uuid
language sql stable security definer set search_path = public as $$
  select id from public.clientes where user_id = auth.uid() limit 1
$$;

create function meu_funcionario_id() returns uuid
language sql stable security definer set search_path = public as $$
  select id from public.funcionarios where user_id = auth.uid() and ativo limit 1
$$;

-- Evitam recursão entre políticas (vendas <-> entregas)
create function eh_minha_venda(p_venda_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.vendas
                 where id = p_venda_id and cliente_id = public.meu_cliente_id())
$$;

create function eh_minha_entrega(p_entrega_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.entregas e join public.vendas v on v.id = e.venda_id
                 where e.id = p_entrega_id and v.cliente_id = public.meu_cliente_id())
$$;

-- Preço vigente (promoção dentro da janela de datas)
create function preco_atual(p public.produtos) returns numeric
language sql stable as $$
  select case
    when p.preco_promocional is not null
     and (p.promo_inicio is null or p.promo_inicio <= now())
     and (p.promo_fim is null or p.promo_fim >= now())
    then p.preco_promocional else p.preco_venda end
$$;

-- =====================================================================
-- 3. TRIGGERS
-- =====================================================================
create function set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;

-- Todo novo usuário do Auth vira CLIENTE. O cargo NUNCA vem de metadata do usuário.
create function handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  v_doc text := regexp_replace(coalesce(new.raw_user_meta_data->>'documento',''), '\D', '', 'g');
  v_nome text;
begin
  if v_doc !~ '^(\d{11}|\d{14})$' or exists (select 1 from clientes where documento = v_doc) then
    v_doc := null;
  end if;
  v_nome := left(coalesce(
    nullif(trim(new.raw_user_meta_data->>'nome'), ''),
    nullif(trim(new.raw_user_meta_data->>'full_name'), ''),
    nullif(trim(new.raw_user_meta_data->>'name'), ''),
    split_part(coalesce(new.email, 'cliente'), '@', 1)), 200);
  insert into clientes (user_id, nome_completo, email, telefone, documento, tipo_pessoa, aceitou_termos_em)
  values (new.id, v_nome, new.email, left(new.raw_user_meta_data->>'telefone', 30), v_doc,
          case when length(coalesce(v_doc,'')) = 14 then 'J' else 'F' end,
          case when new.raw_user_meta_data->>'aceitou_termos' = 'true' then now() end);
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Cliente não altera o próprio limite de crédito, status ou vínculo
create function proteger_cliente() returns trigger language plpgsql as $$
begin
  if auth.uid() is not null and not public.tem_cargo('admin','gerente','financeiro') then
    if new.limite_credito is distinct from old.limite_credito
       or new.ativo is distinct from old.ativo
       or new.user_id is distinct from old.user_id then
      raise exception 'Sem permissão para alterar limite de crédito, status ou vínculo do cliente';
    end if;
  end if;
  return new;
end $$;
create trigger trg_cliente_protege before update on clientes
  for each row execute function proteger_cliente();

-- Estoque só muda via est_movimentacoes (profundidade de trigger >= 2)
create function proteger_produto() returns trigger language plpgsql as $$
begin
  if auth.uid() is not null and pg_trigger_depth() < 2 then
    if tg_op = 'INSERT' then
      new.estoque_atual := 0;
    elsif new.estoque_atual is distinct from old.estoque_atual then
      raise exception 'O estoque só pode ser alterado por movimentações (entrada, ajuste, perda...)';
    end if;
  end if;
  return new;
end $$;
create trigger trg_produto_protege before insert or update on produtos
  for each row execute function proteger_produto();

-- Movimentação de estoque: trava a linha do produto, aplica o delta e bloqueia saldo negativo
create function mov_estoque() returns trigger
language plpgsql security definer set search_path = public as $$
declare v_saldo numeric; v_neg boolean;
begin
  select permite_estoque_negativo into v_neg from config_loja limit 1;
  update produtos set estoque_atual = estoque_atual + new.quantidade
   where id = new.produto_id returning estoque_atual into v_saldo;
  if not found then raise exception 'Produto não encontrado'; end if;
  if v_saldo < 0 and new.quantidade < 0 and not coalesce(v_neg, false) then
    raise exception 'Estoque insuficiente para "%"', (select nome from produtos where id = new.produto_id);
  end if;
  new.saldo_apos := v_saldo;
  return new;
end $$;
create trigger trg_mov_estoque before insert on est_movimentacoes
  for each row execute function mov_estoque();

-- Título: ninguém edita valor pago/pagamento na mão; só via fin_baixas
create function proteger_titulo() returns trigger language plpgsql as $$
begin
  if auth.uid() is not null and pg_trigger_depth() < 2 then
    if new.valor_pago is distinct from old.valor_pago
       or new.data_pagamento is distinct from old.data_pagamento
       or (new.status is distinct from old.status and new.status in ('pago','parcial')) then
      raise exception 'Pagamentos devem ser registrados em fin_baixas';
    end if;
  end if;
  return new;
end $$;
create trigger trg_titulo_protege before update on fin_titulos
  for each row execute function proteger_titulo();

create function baixa_titulo() returns trigger
language plpgsql security definer set search_path = public as $$
declare t fin_titulos%rowtype; v_saldo numeric;
begin
  select * into t from fin_titulos where id = new.titulo_id for update;
  if not found then raise exception 'Título não encontrado'; end if;
  if t.status in ('pago','cancelado') then raise exception 'Título já está %', t.status; end if;
  v_saldo := t.valor_nominal + t.juros_multa - t.valor_pago;
  if new.valor > v_saldo then
    raise exception 'Valor excede o saldo do título (saldo R$ %)', to_char(v_saldo, 'FM999999990.00');
  end if;
  update fin_titulos set
    valor_pago = valor_pago + new.valor,
    status = case when valor_pago + new.valor >= valor_nominal + juros_multa then 'pago' else 'parcial' end,
    data_pagamento = case when valor_pago + new.valor >= valor_nominal + juros_multa
                          then new.data_pagamento else null end
  where id = t.id;
  return new;
end $$;
create trigger trg_baixa before insert on fin_baixas
  for each row execute function baixa_titulo();

-- Auditoria genérica
create function registrar_auditoria() returns trigger
language plpgsql security definer set search_path = public as $$
declare v_old jsonb; v_new jsonb;
begin
  if tg_op in ('UPDATE','DELETE') then v_old := to_jsonb(old); end if;
  if tg_op in ('INSERT','UPDATE') then v_new := to_jsonb(new); end if;
  if tg_op = 'UPDATE' and (v_new - 'updated_at') = (v_old - 'updated_at') then return null; end if;
  insert into auditoria (tabela, registro_id, acao, dados_antigos, dados_novos, usuario_id)
  values (tg_table_name, coalesce(v_new->>'id', v_old->>'id'), tg_op, v_old, v_new, auth.uid());
  return null;
end $$;

-- Histórico de status da venda
create function hist_status_venda() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    insert into venda_status_hist (venda_id, status_novo, usuario_id) values (new.id, new.status, auth.uid());
  elsif new.status is distinct from old.status then
    insert into venda_status_hist (venda_id, status_anterior, status_novo, usuario_id)
    values (new.id, old.status, new.status, auth.uid());
  end if;
  return null;
end $$;
create trigger trg_hist_venda after insert or update of status on vendas
  for each row execute function hist_status_venda();

-- Linha do tempo da entrega + sincroniza o status da venda
create function evento_entrega() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' or new.status is distinct from old.status then
    insert into entrega_eventos (entrega_id, status, descricao, usuario_id)
    values (new.id, new.status, case new.status
      when 'pendente' then 'Pedido recebido'
      when 'separando' then 'Pedido em separação'
      when 'aguardando_entregador' then 'Pedido pronto, aguardando entregador'
      when 'em_rota' then 'Saiu para entrega'
      when 'entregue' then 'Pedido entregue'
      when 'falhou' then 'Tentativa de entrega sem sucesso'
      when 'cancelada' then 'Entrega cancelada' end, auth.uid());
    if new.status in ('em_rota','entregue') then
      update vendas set status = new.status
       where id = new.venda_id and status not in ('cancelada','devolvida');
    end if;
  end if;
  return null;
end $$;
create trigger trg_evento_entrega after insert or update of status on entregas
  for each row execute function evento_entrega();

-- SAC
create function definir_protocolo() returns trigger language plpgsql as $$
begin new.protocolo := 'SAC-' || lpad(new.numero::text, 6, '0'); return new; end $$;
create trigger trg_protocolo before insert on reclamacoes
  for each row execute function definir_protocolo();

create function reclamacao_status() returns trigger language plpgsql as $$
begin
  if new.status in ('resolvida','fechada') and old.status not in ('resolvida','fechada') then
    new.resolvida_em := now();
  elsif new.status not in ('resolvida','fechada') then
    new.resolvida_em := null;
  end if;
  return new;
end $$;
create trigger trg_recl_status before update on reclamacoes
  for each row execute function reclamacao_status();

create function reclamacao_mensagem_nova() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  update reclamacoes set updated_at = now(),
    status = case
      when new.autor_tipo = 'cliente' and status in ('aguardando_cliente','resolvida') then 'em_analise'
      when new.autor_tipo = 'funcionario' and not new.interna and status = 'aberta' then 'em_analise'
      else status end
  where id = new.reclamacao_id;
  return null;
end $$;
create trigger trg_recl_msg after insert on reclamacao_mensagens
  for each row execute function reclamacao_mensagem_nova();

-- updated_at
do $$
declare t text;
begin
  foreach t in array array['config_loja','funcionarios','clientes','fornecedores','produtos',
    'vendas','entregas','fin_titulos','notas_fiscais','reclamacoes'] loop
    execute format('create trigger trg_updated_at before update on public.%I
                    for each row execute function public.set_updated_at()', t);
  end loop;
end $$;

-- auditoria (produtos: só campos sensíveis, para não registrar cada baixa de estoque)
create trigger trg_audit_produtos
  after insert or delete or update of nome, preco_venda, preco_custo, preco_promocional,
    promo_inicio, promo_fim, ativo, visivel_vitrine, ncm, codigo_barras on produtos
  for each row execute function registrar_auditoria();
do $$
declare t text;
begin
  foreach t in array array['funcionarios','rh_contratos','fin_titulos','config_loja','clientes'] loop
    execute format('create trigger trg_audit after insert or update or delete on public.%I
                    for each row execute function public.registrar_auditoria()', t);
  end loop;
end $$;

-- =====================================================================
-- 4. FUNÇÕES DE NEGÓCIO (RPC). Todas validam quem chama.
-- =====================================================================

-- Uso interno: cancela e devolve o estoque. Não exposta ao app.
create function _cancelar_venda(p_venda_id uuid, p_motivo text, p_forcar boolean default false)
returns void language plpgsql security definer set search_path = public as $$
declare v vendas%rowtype; i record;
begin
  select * into v from vendas where id = p_venda_id for update;
  if not found then raise exception 'Pedido não encontrado'; end if;
  if v.status in ('cancelada','devolvida') then raise exception 'Pedido já cancelado'; end if;
  if v.status in ('em_rota','entregue','concluida') and not p_forcar then
    raise exception 'Pedido com status "%" não pode ser cancelado aqui', v.status;
  end if;
  for i in select produto_id, quantidade from venda_itens where venda_id = v.id order by produto_id loop
    insert into est_movimentacoes (produto_id, tipo, quantidade, venda_id, observacao)
    values (i.produto_id, 'devolucao_cliente', i.quantidade, v.id, 'Cancelamento do pedido #' || v.numero_pedido);
  end loop;
  update vendas set status = 'cancelada', cancelada_em = now(), motivo_cancelamento = left(p_motivo, 500)
   where id = v.id;
  update entregas set status = 'cancelada' where venda_id = v.id and status not in ('entregue','cancelada');
  update venda_pagamentos set status = case when status = 'confirmado' then 'estornado' else 'falhou' end
   where venda_id = v.id;
  update fin_titulos set status = 'cancelado'
   where venda_id = v.id and valor_pago = 0 and status = 'aberto';
end $$;

-- Webhook do gateway (somente service_role)
create function confirmar_pagamento_online(p_venda_id uuid, p_gateway_id text default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  update venda_pagamentos set status = 'confirmado', gateway_id = coalesce(p_gateway_id, gateway_id)
   where venda_id = p_venda_id and status = 'pendente' and metodo in ('pix','cartao_online');
  update vendas set status = 'paga' where id = p_venda_id and status = 'aguardando_pagamento';
end $$;

-- E-commerce: cria o pedido. Preço, frete, estoque e total são calculados AQUI.
-- p_itens = [{"produto_id":"uuid","quantidade":2}, ...]
create function criar_pedido_ecommerce(
  p_itens jsonb, p_tipo_entrega text, p_endereco_id uuid default null,
  p_forma_pagamento text default 'pix', p_observacao text default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_cli uuid := public.meu_cliente_id();
  v_cfg config_loja%rowtype; v_end enderecos_cliente%rowtype; v_zona zonas_entrega%rowtype;
  v_prod produtos%rowtype; v_item record;
  v_venda_id uuid; v_numero bigint; v_status text; v_snap jsonb; v_entrega_id uuid;
  v_bruto numeric(12,2) := 0; v_frete numeric(12,2) := 0; v_total numeric(12,2);
  v_preco numeric(12,2); v_sub numeric(12,2);
begin
  if v_cli is null then raise exception 'Entre na sua conta para comprar'; end if;
  if not exists (select 1 from clientes where id = v_cli and ativo) then raise exception 'Cadastro inativo'; end if;
  if jsonb_typeof(p_itens) is distinct from 'array' or jsonb_array_length(p_itens) = 0 then
    raise exception 'Carrinho vazio'; end if;
  if jsonb_array_length(p_itens) > 200 then raise exception 'Carrinho com itens demais'; end if;
  if p_tipo_entrega not in ('retirada','entrega') then raise exception 'Tipo de entrega inválido'; end if;
  -- "dinheiro_entrega"/"cartao_entrega" significam pagar na entrega ou na retirada
  if p_forma_pagamento not in ('pix','cartao_online','dinheiro_entrega','cartao_entrega') then
    raise exception 'Forma de pagamento inválida'; end if;
  select * into v_cfg from config_loja limit 1;
  if not found or not v_cfg.loja_aberta_ecommerce then raise exception 'Loja online fechada no momento'; end if;

  if p_tipo_entrega = 'entrega' then
    select * into v_end from enderecos_cliente where id = p_endereco_id and cliente_id = v_cli and ativo;
    if not found then raise exception 'Endereço de entrega inválido'; end if;
    select * into v_zona from zonas_entrega z
     where z.ativo and exists (select 1 from unnest(z.bairros) b where lower(trim(b)) = lower(trim(v_end.bairro)))
     order by z.taxa_entrega limit 1;
    if not found then raise exception 'Ainda não entregamos no bairro %', v_end.bairro; end if;
    v_frete := v_zona.taxa_entrega;
    v_snap := jsonb_build_object(
      'destinatario', (select nome_completo from clientes where id = v_cli),
      'telefone', (select telefone from clientes where id = v_cli),
      'cep', v_end.cep, 'logradouro', v_end.logradouro, 'numero', v_end.numero,
      'complemento', v_end.complemento, 'bairro', v_end.bairro, 'cidade', v_end.cidade,
      'uf', v_end.uf, 'referencia', v_end.referencia,
      'latitude', v_end.latitude, 'longitude', v_end.longitude);
  end if;

  v_status := case when p_forma_pagamento in ('pix','cartao_online') then 'aguardando_pagamento' else 'em_separacao' end;
  insert into vendas (canal, status, cliente_id, tipo_entrega, observacao)
  values ('ecommerce', v_status, v_cli, p_tipo_entrega, left(p_observacao, 500))
  returning id, numero_pedido into v_venda_id, v_numero;

  -- ordena por produto para evitar deadlock entre pedidos simultâneos
  for v_item in
    select produto_id as pid, sum(quantidade) as qtd
    from jsonb_to_recordset(p_itens) as x(produto_id uuid, quantidade numeric)
    group by produto_id order by produto_id
  loop
    if v_item.qtd is null or v_item.qtd <= 0 or v_item.qtd > 999 then raise exception 'Quantidade inválida'; end if;
    select * into v_prod from produtos where id = v_item.pid and ativo and visivel_vitrine;
    if not found then raise exception 'Um dos produtos não está mais disponível'; end if;
    if not v_prod.vendido_por_peso and v_item.qtd <> trunc(v_item.qtd) then
      raise exception 'Quantidade fracionada inválida para "%"', v_prod.nome; end if;
    v_preco := public.preco_atual(v_prod);
    v_sub := round(v_item.qtd * v_preco, 2);
    insert into venda_itens (venda_id, produto_id, descricao, codigo_barras, unidade,
                             quantidade, preco_unitario, custo_unitario, subtotal)
    values (v_venda_id, v_prod.id, v_prod.nome, v_prod.codigo_barras, v_prod.unidade,
            v_item.qtd, v_preco, v_prod.preco_custo, v_sub);
    insert into est_movimentacoes (produto_id, tipo, quantidade, venda_id, observacao)
    values (v_prod.id, 'venda', -v_item.qtd, v_venda_id, 'Pedido online #' || v_numero);
    v_bruto := v_bruto + v_sub;
  end loop;

  if v_bruto < greatest(v_cfg.pedido_minimo_ecommerce, coalesce(v_zona.pedido_minimo, 0)) then
    raise exception 'Pedido mínimo não atingido';
  end if;
  v_total := v_bruto + v_frete;
  update vendas set total_bruto = v_bruto, taxa_entrega = v_frete, total_liquido = v_total where id = v_venda_id;
  insert into venda_pagamentos (venda_id, metodo, valor, status)
  values (v_venda_id, p_forma_pagamento, v_total, 'pendente');

  if p_tipo_entrega = 'entrega' then
    insert into entregas (venda_id, endereco, taxa_entrega, previsao_entrega, status)
    values (v_venda_id, v_snap, v_frete, now() + make_interval(mins => v_zona.prazo_estimado_min),
            case when v_status = 'em_separacao' then 'separando' else 'pendente' end)
    returning id into v_entrega_id;
    insert into entrega_codigos (entrega_id, codigo)
    values (v_entrega_id, lpad((floor(random() * 10000))::int::text, 4, '0'));
  end if;

  return jsonb_build_object('id', v_venda_id, 'numero_pedido', v_numero, 'total', v_total, 'status', v_status);
end $$;

create function cancelar_meu_pedido(p_venda_id uuid, p_motivo text default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.eh_minha_venda(p_venda_id) then raise exception 'Pedido não encontrado'; end if;
  if not exists (select 1 from vendas where id = p_venda_id and canal = 'ecommerce'
                 and status in ('aguardando_pagamento','paga','em_separacao')) then
    raise exception 'Este pedido não pode mais ser cancelado pelo app. Fale com o atendimento.';
  end if;
  perform public._cancelar_venda(p_venda_id, coalesce(p_motivo, 'Cancelado pelo cliente'));
end $$;

-- Equipe: avança o pedido do e-commerce
create function atualizar_status_pedido(p_venda_id uuid, p_status text, p_observacao text default null)
returns void language plpgsql security definer set search_path = public as $$
declare v vendas%rowtype;
begin
  if not public.tem_cargo('admin','gerente','estoquista','atendente_sac') then
    raise exception 'Sem permissão'; end if;
  select * into v from vendas where id = p_venda_id for update;
  if not found then raise exception 'Pedido não encontrado'; end if;
  if v.canal <> 'ecommerce' then raise exception 'Para vendas do PDV use cancelar_venda'; end if;
  if (v.status || '>' || p_status) <> all (array[
      'aguardando_pagamento>paga','aguardando_pagamento>cancelada','paga>em_separacao','paga>cancelada',
      'em_separacao>pronto','em_separacao>cancelada','pronto>concluida','pronto>cancelada']) then
    raise exception 'Transição inválida: % → %', v.status, p_status; end if;
  if p_status = 'concluida' and v.tipo_entrega <> 'retirada' then
    raise exception 'Pedidos com entrega são concluídos pelo entregador'; end if;
  if p_status = 'cancelada' then
    perform public._cancelar_venda(v.id, coalesce(p_observacao, 'Cancelado pela loja'));
    return;
  end if;
  update vendas set status = p_status where id = v.id;
  if p_status in ('paga','concluida') then
    update venda_pagamentos set status = 'confirmado' where venda_id = v.id and status = 'pendente';
  end if;
  if p_status = 'em_separacao' then
    update entregas set status = 'separando' where venda_id = v.id;
  elsif p_status = 'pronto' then
    update entregas set status = 'aguardando_entregador' where venda_id = v.id;
  end if;
end $$;

create function cancelar_venda(p_venda_id uuid, p_motivo text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.tem_cargo('admin','gerente') then raise exception 'Somente gerente/admin'; end if;
  if coalesce(trim(p_motivo), '') = '' then raise exception 'Informe o motivo'; end if;
  perform public._cancelar_venda(p_venda_id, p_motivo, true);
end $$;

-- Entregador / gerente: avança a entrega. "entregue" exige o código do cliente (gerente dispensa).
create function atualizar_status_entrega(p_entrega_id uuid, p_status text, p_codigo text default null,
  p_nome_recebedor text default null, p_observacao text default null)
returns void language plpgsql security definer set search_path = public as $$
declare e entregas%rowtype; v_func uuid := public.meu_funcionario_id();
        v_gestor boolean := public.tem_cargo('admin','gerente');
begin
  if not (v_gestor or public.tem_cargo('entregador')) then raise exception 'Sem permissão'; end if;
  select * into e from entregas where id = p_entrega_id for update;
  if not found then raise exception 'Entrega não encontrada'; end if;
  if not v_gestor and e.entregador_id is not null and e.entregador_id <> v_func then
    raise exception 'Entrega atribuída a outro entregador'; end if;
  if (e.status || '>' || p_status) <> all (array[
      'aguardando_entregador>em_rota','em_rota>entregue','em_rota>falhou','falhou>em_rota']) then
    raise exception 'Transição inválida: % → %', e.status, p_status; end if;
  if p_status = 'entregue' and not v_gestor
     and p_codigo is distinct from (select codigo from entrega_codigos where entrega_id = e.id) then
    raise exception 'Código de confirmação inválido'; end if;
  update entregas set
    status = p_status,
    entregador_id = coalesce(entregador_id, case when not v_gestor then v_func end),
    saiu_em = case when p_status = 'em_rota' and saiu_em is null then now() else saiu_em end,
    entregue_em = case when p_status = 'entregue' then now() else entregue_em end,
    nome_recebedor = case when p_status = 'entregue' then left(p_nome_recebedor, 120) else nome_recebedor end,
    observacao = coalesce(left(p_observacao, 500), observacao)
  where id = e.id;
  if p_status = 'entregue' then
    update venda_pagamentos set status = 'confirmado' where venda_id = e.venda_id and status = 'pendente';
  end if;
end $$;

create function atualizar_posicao_entrega(p_entrega_id uuid, p_lat numeric, p_lng numeric)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_lat not between -90 and 90 or p_lng not between -180 and 180 then raise exception 'Coordenadas inválidas'; end if;
  update entregas set ultima_latitude = p_lat, ultima_longitude = p_lng, posicao_atualizada_em = now()
   where id = p_entrega_id and status = 'em_rota' and entregador_id = public.meu_funcionario_id();
  if not found then raise exception 'Entrega não está em rota com você'; end if;
end $$;

-- Caixa
create function abrir_turno(p_terminal_id uuid, p_saldo_abertura numeric default 0)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_func uuid := public.meu_funcionario_id(); v_id uuid;
begin
  if v_func is null or not public.tem_cargo('admin','gerente','caixa') then raise exception 'Sem permissão'; end if;
  if not exists (select 1 from pdv_terminais where id = p_terminal_id and ativo) then
    raise exception 'Terminal inválido'; end if;
  insert into pdv_turnos (terminal_id, operador_id, saldo_abertura)
  values (p_terminal_id, v_func, greatest(coalesce(p_saldo_abertura, 0), 0)) returning id into v_id;
  return v_id;
exception when unique_violation then
  raise exception 'Já existe turno aberto neste terminal ou para este operador';
end $$;

create function fechar_turno(p_turno_id uuid, p_saldo_informado numeric)
returns jsonb language plpgsql security definer set search_path = public as $$
declare t pdv_turnos%rowtype; v_din numeric; v_sup numeric; v_san numeric; v_esp numeric;
begin
  if not public.tem_cargo('admin','gerente','caixa') then raise exception 'Sem permissão'; end if;
  select * into t from pdv_turnos where id = p_turno_id for update;
  if not found or t.status <> 'aberto' then raise exception 'Turno inválido ou já fechado'; end if;
  if t.operador_id <> public.meu_funcionario_id() and not public.tem_cargo('admin','gerente') then
    raise exception 'Este turno pertence a outro operador'; end if;
  select coalesce(sum(p.valor - p.troco), 0) into v_din
    from venda_pagamentos p join vendas v on v.id = p.venda_id
   where v.turno_id = t.id and p.metodo = 'dinheiro' and v.status <> 'cancelada';
  select coalesce(sum(valor) filter (where tipo = 'suprimento'), 0),
         coalesce(sum(valor) filter (where tipo = 'sangria'), 0)
    into v_sup, v_san from pdv_movimentos_caixa where turno_id = t.id;
  v_esp := t.saldo_abertura + v_din + v_sup - v_san;
  update pdv_turnos set status = 'fechado', fechado_em = now(), saldo_esperado = v_esp,
         saldo_informado = p_saldo_informado, diferenca = p_saldo_informado - v_esp
   where id = t.id;
  return jsonb_build_object('saldo_esperado', v_esp, 'saldo_informado', p_saldo_informado,
                            'diferenca', p_saldo_informado - v_esp);
end $$;

-- Busca do PDV (código de barras exato, SKU ou nome). Termo é escapado: não há injeção de filtro.
create function buscar_produtos_pdv(p_termo text, p_limite integer default 20)
returns table (produto_id uuid, nome text, codigo_barras text, sku text, unidade text,
               vendido_por_peso boolean, preco numeric, estoque_atual numeric)
language sql stable security definer set search_path = public as $$
  select p.id, p.nome, p.codigo_barras, p.sku, p.unidade, p.vendido_por_peso,
         public.preco_atual(p), p.estoque_atual
  from public.produtos p
  where public.tem_cargo('admin','gerente','caixa','estoquista')
    and p.ativo and length(trim(p_termo)) > 0
    and (p.codigo_barras = trim(p_termo) or p.sku = trim(p_termo)
         or p.nome ilike '%' || replace(replace(replace(trim(p_termo), '\', '\\'), '%', '\%'), '_', '\_') || '%')
  order by (p.codigo_barras = trim(p_termo)) desc nulls last, p.nome
  limit least(greatest(p_limite, 1), 50)
$$;

-- PDV: finaliza a venda inteira numa transação.
-- p_itens      = [{"produto_id":"uuid","quantidade":1}]
-- p_pagamentos = [{"metodo":"dinheiro","valor":50},{"metodo":"pix","valor":20}]
-- p_entrega    = {"taxa":8,"endereco":{"logradouro":"..","numero":"..","bairro":".."}}  (opcional)
create function finalizar_venda_pdv(p_turno_id uuid, p_itens jsonb, p_pagamentos jsonb,
  p_cliente_id uuid default null, p_desconto numeric default 0, p_entrega jsonb default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_func uuid := public.meu_funcionario_id();
  v_turno pdv_turnos%rowtype; v_cfg config_loja%rowtype; v_cli clientes%rowtype;
  v_prod produtos%rowtype; v_item record; v_pag record;
  v_venda_id uuid; v_numero bigint; v_entrega_id uuid;
  v_bruto numeric(12,2) := 0; v_frete numeric(12,2) := 0; v_desc numeric(12,2) := coalesce(p_desconto, 0);
  v_total numeric(12,2); v_pago numeric(12,2) := 0; v_dinheiro numeric(12,2) := 0;
  v_fiado numeric(12,2) := 0; v_troco numeric(12,2); v_devedor numeric(12,2);
  v_preco numeric(12,2); v_sub numeric(12,2);
begin
  if v_func is null or not public.tem_cargo('admin','gerente','caixa') then
    raise exception 'Sem permissão para operar o caixa'; end if;
  select * into v_turno from pdv_turnos where id = p_turno_id and status = 'aberto' and operador_id = v_func;
  if not found then raise exception 'Turno inválido, fechado ou de outro operador'; end if;
  if jsonb_typeof(p_itens) is distinct from 'array' or jsonb_array_length(p_itens) = 0 then
    raise exception 'Venda sem itens'; end if;
  if jsonb_typeof(p_pagamentos) is distinct from 'array' then raise exception 'Pagamentos inválidos'; end if;
  if v_desc < 0 then raise exception 'Desconto inválido'; end if;
  if v_desc > 0 and not public.tem_cargo('admin','gerente') then
    raise exception 'Desconto exige autorização de gerente'; end if;
  select * into v_cfg from config_loja limit 1;
  if p_cliente_id is not null then
    select * into v_cli from clientes where id = p_cliente_id and ativo for update;
    if not found then raise exception 'Cliente não encontrado ou inativo'; end if;
  end if;
  if p_entrega is not null then
    v_frete := greatest(coalesce((p_entrega->>'taxa')::numeric, 0), 0);
    if jsonb_typeof(p_entrega->'endereco') is distinct from 'object' then
      raise exception 'Endereço de entrega obrigatório'; end if;
  end if;

  insert into vendas (canal, status, cliente_id, turno_id, operador_id, tipo_entrega)
  values ('pdv', 'concluida', v_cli.id, v_turno.id, v_func,
          case when p_entrega is null then 'balcao' else 'entrega' end)
  returning id, numero_pedido into v_venda_id, v_numero;

  for v_item in
    select produto_id as pid, sum(quantidade) as qtd
    from jsonb_to_recordset(p_itens) as x(produto_id uuid, quantidade numeric)
    group by produto_id order by produto_id
  loop
    if v_item.qtd is null or v_item.qtd <= 0 or v_item.qtd > 9999 then raise exception 'Quantidade inválida'; end if;
    select * into v_prod from produtos where id = v_item.pid and ativo;
    if not found then raise exception 'Produto inexistente ou inativo'; end if;
    v_preco := public.preco_atual(v_prod);
    v_sub := round(v_item.qtd * v_preco, 2);
    insert into venda_itens (venda_id, produto_id, descricao, codigo_barras, unidade,
                             quantidade, preco_unitario, custo_unitario, subtotal)
    values (v_venda_id, v_prod.id, v_prod.nome, v_prod.codigo_barras, v_prod.unidade,
            v_item.qtd, v_preco, v_prod.preco_custo, v_sub);
    insert into est_movimentacoes (produto_id, tipo, quantidade, venda_id, observacao)
    values (v_prod.id, 'venda', -v_item.qtd, v_venda_id, 'Venda PDV #' || v_numero);
    v_bruto := v_bruto + v_sub;
  end loop;

  if v_desc > v_bruto then raise exception 'Desconto maior que o total da venda'; end if;
  v_total := v_bruto - v_desc + v_frete;

  for v_pag in select * from jsonb_to_recordset(p_pagamentos) as x(metodo text, valor numeric, parcelas integer) loop
    if v_pag.metodo not in ('dinheiro','pix','debito','credito','vale_alimentacao','fiado')
       or v_pag.valor is null or v_pag.valor <= 0 then raise exception 'Pagamento inválido'; end if;
    v_pago := v_pago + v_pag.valor;
    if v_pag.metodo = 'dinheiro' then v_dinheiro := v_dinheiro + v_pag.valor; end if;
    if v_pag.metodo = 'fiado' then v_fiado := v_fiado + v_pag.valor; end if;
  end loop;
  if v_pago < v_total then
    raise exception 'Pagamento insuficiente (faltam R$ %)', to_char(v_total - v_pago, 'FM999999990.00'); end if;
  v_troco := v_pago - v_total;
  if v_troco > v_dinheiro then raise exception 'Troco só pode ser devolvido em dinheiro'; end if;

  if v_fiado > 0 then
    if v_cli.id is null then raise exception 'Fiado exige cliente identificado'; end if;
    select coalesce(sum(valor_nominal + juros_multa - valor_pago), 0) into v_devedor
      from fin_titulos where cliente_id = v_cli.id and tipo = 'receber' and status in ('aberto','parcial');
    if v_devedor + v_fiado > v_cli.limite_credito then
      raise exception 'Limite de crédito excedido (disponível R$ %)',
        to_char(greatest(v_cli.limite_credito - v_devedor, 0), 'FM999999990.00'); end if;
    insert into fin_titulos (tipo, cliente_id, venda_id, descricao, valor_nominal, data_vencimento, forma_pagamento)
    values ('receber', v_cli.id, v_venda_id, 'Fiado: venda #' || v_numero, v_fiado,
            current_date + coalesce(v_cfg.prazo_fiado_dias, 30), 'fiado');
  end if;

  for v_pag in select * from jsonb_to_recordset(p_pagamentos) as x(metodo text, valor numeric, parcelas integer) loop
    insert into venda_pagamentos (venda_id, metodo, valor, troco, parcelas, status)
    values (v_venda_id, v_pag.metodo, v_pag.valor,
            case when v_pag.metodo = 'dinheiro' then v_troco else 0 end,
            greatest(coalesce(v_pag.parcelas, 1), 1),
            case when v_pag.metodo = 'fiado' then 'pendente' else 'confirmado' end);
  end loop;
  -- o troco é registrado na primeira linha de dinheiro; se houver duas, corrige para uma só
  if (select count(*) from venda_pagamentos where venda_id = v_venda_id and metodo = 'dinheiro') > 1 then
    update venda_pagamentos set troco = 0 where venda_id = v_venda_id and metodo = 'dinheiro';
    update venda_pagamentos set troco = v_troco
     where id = (select id from venda_pagamentos where venda_id = v_venda_id and metodo = 'dinheiro'
                 order by created_at, id limit 1);
  end if;

  update vendas set total_bruto = v_bruto, total_desconto = v_desc, taxa_entrega = v_frete,
                    total_liquido = v_total where id = v_venda_id;

  if p_entrega is not null then
    insert into entregas (venda_id, endereco, taxa_entrega)
    values (v_venda_id, p_entrega->'endereco', v_frete) returning id into v_entrega_id;
    insert into entrega_codigos (entrega_id, codigo)
    values (v_entrega_id, lpad((floor(random() * 10000))::int::text, 4, '0'));
  end if;

  return jsonb_build_object('id', v_venda_id, 'numero_pedido', v_numero, 'total', v_total, 'troco', v_troco);
end $$;

-- Compras: importa a NF-e do fornecedor de forma atômica e sem duplicar a nota.
-- p_fornecedor = {"cnpj":"..","nome":".."}
-- p_itens = [{"sku":"","ean":"","nome":"","ncm":"","unidade":"UN","quantidade":10,"custo_unitario":3.5}]
create function importar_compra_nfe(p_fornecedor jsonb, p_chave text, p_numero text, p_serie text,
  p_emissao date, p_itens jsonb, p_gerar_titulo boolean default false, p_vencimento date default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_chave text := regexp_replace(coalesce(p_chave, ''), '\D', '', 'g');
  v_cnpj text := regexp_replace(coalesce(p_fornecedor->>'cnpj', ''), '\D', '', 'g');
  v_forn uuid; v_compra uuid; v_cfg config_loja%rowtype; v_it record;
  v_prod uuid; v_ean text; v_un text;
  v_total numeric(12,2) := 0; v_sub numeric(12,2); v_novos integer := 0; v_n integer := 0;
begin
  if not public.tem_cargo('admin','gerente','estoquista') then raise exception 'Sem permissão'; end if;
  if length(v_chave) <> 44 then raise exception 'Chave de acesso inválida (44 dígitos)'; end if;
  if exists (select 1 from compras where chave_nfe = v_chave) then raise exception 'Esta nota já foi importada'; end if;
  if length(v_cnpj) <> 14 then raise exception 'CNPJ do fornecedor inválido'; end if;
  if jsonb_typeof(p_itens) is distinct from 'array' or jsonb_array_length(p_itens) = 0 then
    raise exception 'Nota sem itens'; end if;
  select * into v_cfg from config_loja limit 1;

  insert into fornecedores (razao_social, cnpj)
  values (left(coalesce(p_fornecedor->>'nome', 'Fornecedor ' || v_cnpj), 200), v_cnpj)
  on conflict (cnpj) do update set updated_at = now() returning id into v_forn;
  insert into compras (fornecedor_id, chave_nfe, numero_nf, serie, data_emissao)
  values (v_forn, v_chave, p_numero, p_serie, p_emissao) returning id into v_compra;

  for v_it in select * from jsonb_to_recordset(p_itens)
      as x(sku text, ean text, nome text, ncm text, unidade text, quantidade numeric, custo_unitario numeric)
  loop
    if v_it.quantidade is null or v_it.quantidade <= 0 or v_it.custo_unitario is null or v_it.custo_unitario < 0 then
      raise exception 'Item inválido na nota: %', coalesce(v_it.nome, '?'); end if;
    v_ean := case when v_it.ean ~ '^\d{8,14}$' then v_it.ean end;          -- ignora "SEM GTIN"
    v_un := case when upper(v_it.unidade) in ('UN','KG','G','L','ML','CX','PCT','FD','DZ') then upper(v_it.unidade)
                 when upper(v_it.unidade) = 'LT' then 'L' else 'UN' end;
    v_prod := null;
    if v_ean is not null then select id into v_prod from produtos where codigo_barras = v_ean; end if;
    if v_prod is null and v_it.sku is not null then
      select id into v_prod from produtos where fornecedor_id = v_forn and codigo_fornecedor = v_it.sku limit 1;
    end if;
    if v_prod is null then
      -- produto novo nasce OCULTO na vitrine até a equipe revisar
      insert into produtos (nome, codigo_barras, codigo_fornecedor, ncm, unidade, vendido_por_peso,
                            preco_custo, preco_venda, fornecedor_id, visivel_vitrine)
      values (left(coalesce(v_it.nome, 'Produto sem nome'), 200), v_ean, v_it.sku,
              case when v_it.ncm ~ '^\d{8}$' then v_it.ncm end, v_un, v_un = 'KG',
              round(v_it.custo_unitario, 2),
              round(v_it.custo_unitario * (1 + coalesce(v_cfg.margem_padrao_xml, 30) / 100), 2),
              v_forn, false)
      returning id into v_prod;
      v_novos := v_novos + 1;
    else
      update produtos set preco_custo = round(v_it.custo_unitario, 2),
             fornecedor_id = coalesce(fornecedor_id, v_forn) where id = v_prod;
    end if;
    v_sub := round(v_it.quantidade * v_it.custo_unitario, 2);
    insert into compras_itens (compra_id, produto_id, descricao_nf, quantidade, custo_unitario, subtotal)
    values (v_compra, v_prod, v_it.nome, v_it.quantidade, round(v_it.custo_unitario, 2), v_sub);
    insert into est_movimentacoes (produto_id, tipo, quantidade, compra_id, observacao)
    values (v_prod, 'compra', v_it.quantidade, v_compra, 'NF ' || coalesce(p_numero, v_chave));
    v_total := v_total + v_sub; v_n := v_n + 1;
  end loop;

  update compras set valor_total = v_total where id = v_compra;
  if p_gerar_titulo and v_total > 0 then
    insert into fin_titulos (tipo, fornecedor_id, compra_id, descricao, numero_documento, valor_nominal, data_vencimento)
    values ('pagar', v_forn, v_compra, 'Compra NF ' || coalesce(p_numero, ''), p_numero, v_total,
            coalesce(p_vencimento, current_date + 30));
  end if;
  return jsonb_build_object('compra_id', v_compra, 'itens', v_n, 'produtos_novos', v_novos, 'total', v_total);
end $$;

-- SAC
create function abrir_reclamacao(p_tipo text, p_assunto text, p_descricao text, p_venda_id uuid default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare v_cli uuid := public.meu_cliente_id(); v_id uuid; v_prot text;
begin
  if v_cli is null then raise exception 'Entre na sua conta'; end if;
  if p_venda_id is not null and not public.eh_minha_venda(p_venda_id) then
    raise exception 'Pedido não encontrado'; end if;
  if (select count(*) from reclamacoes where cliente_id = v_cli and created_at > now() - interval '1 hour') >= 5 then
    raise exception 'Muitas solicitações em pouco tempo. Tente novamente mais tarde.'; end if;
  insert into reclamacoes (cliente_id, venda_id, tipo, assunto, descricao)
  values (v_cli, p_venda_id, p_tipo, trim(p_assunto), trim(p_descricao))
  returning id, protocolo into v_id, v_prot;
  return jsonb_build_object('id', v_id, 'protocolo', v_prot);
end $$;

create function avaliar_reclamacao(p_id uuid, p_nota smallint, p_comentario text default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  update reclamacoes set avaliacao_nota = p_nota, avaliacao_comentario = left(p_comentario, 1000), status = 'fechada'
   where id = p_id and cliente_id = public.meu_cliente_id() and status in ('resolvida','fechada');
  if not found then raise exception 'Só é possível avaliar uma reclamação resolvida'; end if;
end $$;

-- =====================================================================
-- 5. RLS: ligado em TODAS as tabelas; sem política = negado
-- =====================================================================
do $$
declare t text;
begin
  foreach t in array array['config_loja','funcionarios','rh_contratos','clientes','enderecos_cliente',
    'fornecedores','categorias','produtos','compras','compras_itens','pdv_terminais','pdv_turnos',
    'pdv_movimentos_caixa','zonas_entrega','vendas','venda_itens','venda_pagamentos','venda_status_hist',
    'est_movimentacoes','entregas','entrega_eventos','entrega_codigos','fin_titulos','fin_baixas',
    'notas_fiscais','reclamacoes','reclamacao_mensagens','auditoria'] loop
    execute format('alter table public.%I enable row level security', t);
  end loop;
end $$;

-- config_loja
create policy cfg_sel on config_loja for select to authenticated
  using ((select public.tem_cargo('admin','gerente','financeiro')));
create policy cfg_upd on config_loja for update to authenticated
  using ((select public.tem_cargo('admin'))) with check ((select public.tem_cargo('admin')));

-- funcionarios / rh
create policy func_self on funcionarios for select to authenticated using (user_id = (select auth.uid()));
create policy func_sel on funcionarios for select to authenticated
  using ((select public.tem_cargo('admin','gerente')));
create policy func_adm on funcionarios for all to authenticated
  using ((select public.tem_cargo('admin'))) with check ((select public.tem_cargo('admin')));
create policy rh_all on rh_contratos for all to authenticated
  using ((select public.tem_cargo('admin','financeiro'))) with check ((select public.tem_cargo('admin','financeiro')));

-- clientes
create policy cli_self_sel on clientes for select to authenticated using (user_id = (select auth.uid()));
create policy cli_self_upd on clientes for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy cli_staff_sel on clientes for select to authenticated
  using ((select public.tem_cargo('admin','gerente','caixa','financeiro','atendente_sac')));
create policy cli_staff_ins on clientes for insert to authenticated
  with check ((select public.tem_cargo('admin','gerente','caixa','atendente_sac')));
create policy cli_staff_upd on clientes for update to authenticated
  using ((select public.tem_cargo('admin','gerente','financeiro','atendente_sac')))
  with check ((select public.tem_cargo('admin','gerente','financeiro','atendente_sac')));
create policy end_self on enderecos_cliente for all to authenticated
  using (cliente_id = (select public.meu_cliente_id())) with check (cliente_id = (select public.meu_cliente_id()));
create policy end_staff_sel on enderecos_cliente for select to authenticated
  using ((select public.tem_cargo('admin','gerente','atendente_sac','caixa')));
create policy end_staff_all on enderecos_cliente for all to authenticated
  using ((select public.tem_cargo('admin','gerente','atendente_sac')))
  with check ((select public.tem_cargo('admin','gerente','atendente_sac')));

-- catálogo e compras
create policy forn_all on fornecedores for all to authenticated
  using ((select public.tem_cargo('admin','gerente','estoquista','financeiro')))
  with check ((select public.tem_cargo('admin','gerente','estoquista','financeiro')));
create policy cat_sel on categorias for select to authenticated using (true);
create policy cat_all on categorias for all to authenticated
  using ((select public.tem_cargo('admin','gerente','estoquista')))
  with check ((select public.tem_cargo('admin','gerente','estoquista')));
create policy prod_sel on produtos for select to authenticated
  using ((select public.tem_cargo('admin','gerente','estoquista','financeiro')));
create policy prod_ins on produtos for insert to authenticated
  with check ((select public.tem_cargo('admin','gerente','estoquista')));
create policy prod_upd on produtos for update to authenticated
  using ((select public.tem_cargo('admin','gerente','estoquista')))
  with check ((select public.tem_cargo('admin','gerente','estoquista')));
create policy compras_sel on compras for select to authenticated
  using ((select public.tem_cargo('admin','gerente','estoquista','financeiro')));
create policy compras_it_sel on compras_itens for select to authenticated
  using ((select public.tem_cargo('admin','gerente','estoquista','financeiro')));
create policy mov_sel on est_movimentacoes for select to authenticated
  using ((select public.tem_cargo('admin','gerente','estoquista')));
create policy mov_ins on est_movimentacoes for insert to authenticated
  with check ((select public.tem_cargo('admin','gerente','estoquista'))
              and tipo in ('ajuste','perda','inventario')
              and venda_id is null and compra_id is null
              and usuario_id = (select auth.uid()));

-- caixa
create policy term_sel on pdv_terminais for select to authenticated
  using ((select public.tem_cargo('admin','gerente','caixa')));
create policy term_all on pdv_terminais for all to authenticated
  using ((select public.tem_cargo('admin','gerente'))) with check ((select public.tem_cargo('admin','gerente')));
create policy turno_sel on pdv_turnos for select to authenticated
  using ((select public.tem_cargo('admin','gerente','financeiro')) or operador_id = (select public.meu_funcionario_id()));
create policy movcx_sel on pdv_movimentos_caixa for select to authenticated
  using (exists (select 1 from pdv_turnos t where t.id = turno_id));
create policy movcx_ins on pdv_movimentos_caixa for insert to authenticated
  with check (usuario_id = (select auth.uid())
    and exists (select 1 from pdv_turnos t where t.id = turno_id and t.status = 'aberto'
                and t.operador_id = (select public.meu_funcionario_id())));

-- entrega: áreas
create policy zona_sel on zonas_entrega for select to authenticated using (true);
create policy zona_all on zonas_entrega for all to authenticated
  using ((select public.tem_cargo('admin','gerente'))) with check ((select public.tem_cargo('admin','gerente')));

-- vendas (somente leitura direta; escrita só pelas RPCs)
create policy vendas_cli on vendas for select to authenticated using (cliente_id = (select public.meu_cliente_id()));
create policy vendas_staff on vendas for select to authenticated
  using ((select public.tem_cargo('admin','gerente','financeiro','atendente_sac')));
create policy vendas_estoq on vendas for select to authenticated
  using (canal = 'ecommerce' and (select public.tem_cargo('estoquista')));
create policy vendas_caixa on vendas for select to authenticated
  using (operador_id = (select public.meu_funcionario_id()));
create policy vendas_entreg on vendas for select to authenticated
  using ((select public.tem_cargo('entregador')) and exists (select 1 from entregas e where e.venda_id = vendas.id));
create policy itens_sel on venda_itens for select to authenticated
  using (exists (select 1 from vendas v where v.id = venda_itens.venda_id));
create policy pag_sel on venda_pagamentos for select to authenticated
  using (exists (select 1 from vendas v where v.id = venda_pagamentos.venda_id));
create policy hist_sel on venda_status_hist for select to authenticated
  using (exists (select 1 from vendas v where v.id = venda_status_hist.venda_id));

-- entregas
create policy ent_cli on entregas for select to authenticated using ((select public.eh_minha_venda(venda_id)));
create policy ent_staff on entregas for select to authenticated
  using ((select public.tem_cargo('admin','gerente','atendente_sac','estoquista')));
create policy ent_entreg on entregas for select to authenticated
  using ((select public.tem_cargo('entregador'))
         and (entregador_id = (select public.meu_funcionario_id())
              or (entregador_id is null and status = 'aguardando_entregador')));
create policy ent_upd on entregas for update to authenticated
  using ((select public.tem_cargo('admin','gerente'))) with check ((select public.tem_cargo('admin','gerente')));
create policy ev_sel on entrega_eventos for select to authenticated
  using (exists (select 1 from entregas e where e.id = entrega_eventos.entrega_id));
create policy cod_cli on entrega_codigos for select to authenticated
  using ((select public.eh_minha_entrega(entrega_id)));

-- financeiro
create policy tit_fin on fin_titulos for select to authenticated
  using ((select public.tem_cargo('admin','gerente','financeiro')));
create policy tit_cli on fin_titulos for select to authenticated
  using (tipo = 'receber' and cliente_id = (select public.meu_cliente_id()));
create policy tit_aten on fin_titulos for select to authenticated
  using (tipo = 'receber' and (select public.tem_cargo('caixa','atendente_sac')));
create policy tit_ins on fin_titulos for insert to authenticated
  with check ((select public.tem_cargo('admin','gerente','financeiro')));
create policy tit_upd on fin_titulos for update to authenticated
  using ((select public.tem_cargo('admin','gerente','financeiro')))
  with check ((select public.tem_cargo('admin','gerente','financeiro')));
create policy baixa_sel on fin_baixas for select to authenticated
  using (exists (select 1 from fin_titulos t where t.id = fin_baixas.titulo_id));
create policy baixa_ins on fin_baixas for insert to authenticated
  with check ((select public.tem_cargo('admin','gerente','financeiro')) and usuario_id = (select auth.uid()));

-- notas fiscais
create policy nf_staff on notas_fiscais for select to authenticated
  using ((select public.tem_cargo('admin','gerente','financeiro','atendente_sac')));
create policy nf_cli on notas_fiscais for select to authenticated
  using (venda_id is not null and (select public.eh_minha_venda(venda_id)));
create policy nf_ins on notas_fiscais for insert to authenticated
  with check ((select public.tem_cargo('admin','gerente','financeiro')));
create policy nf_upd on notas_fiscais for update to authenticated
  using ((select public.tem_cargo('admin','gerente','financeiro')))
  with check ((select public.tem_cargo('admin','gerente','financeiro')));

-- SAC
create policy recl_cli on reclamacoes for select to authenticated using (cliente_id = (select public.meu_cliente_id()));
create policy recl_staff on reclamacoes for select to authenticated
  using ((select public.tem_cargo('admin','gerente','atendente_sac')));
create policy recl_upd on reclamacoes for update to authenticated
  using ((select public.tem_cargo('admin','gerente','atendente_sac')))
  with check ((select public.tem_cargo('admin','gerente','atendente_sac')));
create policy msg_cli on reclamacao_mensagens for select to authenticated
  using (not interna and exists (select 1 from reclamacoes r where r.id = reclamacao_id));
create policy msg_staff on reclamacao_mensagens for select to authenticated
  using ((select public.tem_cargo('admin','gerente','atendente_sac')));
create policy msg_ins_cli on reclamacao_mensagens for insert to authenticated
  with check (autor_tipo = 'cliente' and autor_id = (select auth.uid()) and not interna
    and exists (select 1 from reclamacoes r where r.id = reclamacao_id
                and r.cliente_id = (select public.meu_cliente_id()) and r.status <> 'fechada'));
create policy msg_ins_staff on reclamacao_mensagens for insert to authenticated
  with check (autor_tipo = 'funcionario' and autor_id = (select auth.uid())
    and (select public.tem_cargo('admin','gerente','atendente_sac')));

-- auditoria
create policy aud_sel on auditoria for select to authenticated
  using ((select public.tem_cargo('admin','gerente')));

-- =====================================================================
-- 6. VIEWS PÚBLICAS (vitrine) E DE APOIO
--    As views públicas rodam com os privilégios do dono, de propósito: expõem
--    só colunas seguras (sem custo, sem estoque exato). O linter do Supabase
--    avisa "security definer view": é esperado aqui.
-- =====================================================================
create view vitrine_produtos as
select p.id, p.nome, p.descricao, p.marca, p.categoria_id, c.nome as categoria_nome,
       p.foto_url, p.unidade, p.vendido_por_peso, p.preco_venda,
       public.preco_atual(p) as preco_atual,
       public.preco_atual(p) < p.preco_venda as em_promocao,
       (p.estoque_atual > 0 or coalesce((select permite_estoque_negativo from config_loja limit 1), false)) as disponivel,
       p.destaque, p.especificacoes
from produtos p left join categorias c on c.id = p.categoria_id
where p.ativo and p.visivel_vitrine and (c.id is null or c.ativo);

create view vitrine_categorias as
select id, nome, slug, categoria_pai_id, ordem from categorias where ativo;

create view loja_publica as
select nome_fantasia, telefone, whatsapp, endereco_completo, logo_url, horario_funcionamento,
       loja_aberta_ecommerce, pedido_minimo_ecommerce, chave_pix
from config_loja;

create view vitrine_zonas_entrega as
select nome, bairros, taxa_entrega, pedido_minimo, prazo_estimado_min from zonas_entrega where ativo;

-- Portal do cliente: contas a receber com situação (respeita o RLS de quem consulta)
create view v_titulos_cliente with (security_invoker = true) as
select t.*,
  case when t.status in ('aberto','parcial') and t.data_vencimento < current_date
       then 'vencido' else t.status end as situacao,
  (t.valor_nominal + t.juros_multa - t.valor_pago) as saldo,
  greatest(current_date - t.data_vencimento, 0) as dias_atraso
from fin_titulos t where t.tipo = 'receber';

create view v_estoque_baixo with (security_invoker = true) as
select id, nome, codigo_barras, estoque_atual, estoque_minimo, fornecedor_id
from produtos where ativo and estoque_atual <= estoque_minimo;

-- =====================================================================
-- 7. STORAGE (buckets e políticas)
--    produtos: fotos públicas | sac-anexos: privado | documentos-fiscais: privado
--    Caminhos: sac-anexos/<auth.uid>/arquivo · documentos-fiscais/<cliente_id>/arquivo
-- =====================================================================
insert into storage.buckets (id, name, public) values
  ('produtos','produtos',true), ('sac-anexos','sac-anexos',false), ('documentos-fiscais','documentos-fiscais',false)
on conflict (id) do nothing;

create policy sm_produtos_ins on storage.objects for insert to authenticated
  with check (bucket_id = 'produtos' and (select public.tem_cargo('admin','gerente','estoquista')));
create policy sm_produtos_upd on storage.objects for update to authenticated
  using (bucket_id = 'produtos' and (select public.tem_cargo('admin','gerente','estoquista')));
create policy sm_produtos_del on storage.objects for delete to authenticated
  using (bucket_id = 'produtos' and (select public.tem_cargo('admin','gerente','estoquista')));
create policy sm_sac_sel on storage.objects for select to authenticated
  using (bucket_id = 'sac-anexos' and ((storage.foldername(name))[1] = (select auth.uid())::text
         or (select public.tem_cargo('admin','gerente','atendente_sac'))));
create policy sm_sac_ins on storage.objects for insert to authenticated
  with check (bucket_id = 'sac-anexos' and ((storage.foldername(name))[1] = (select auth.uid())::text
         or (select public.tem_cargo('admin','gerente','atendente_sac'))));
create policy sm_fiscal_sel on storage.objects for select to authenticated
  using (bucket_id = 'documentos-fiscais' and ((storage.foldername(name))[1] = (select public.meu_cliente_id())::text
         or (select public.tem_cargo('admin','gerente','financeiro','atendente_sac'))));
create policy sm_fiscal_ins on storage.objects for insert to authenticated
  with check (bucket_id = 'documentos-fiscais' and (select public.tem_cargo('admin','gerente','financeiro')));
create policy sm_fiscal_upd on storage.objects for update to authenticated
  using (bucket_id = 'documentos-fiscais' and (select public.tem_cargo('admin','gerente','financeiro')));

-- =====================================================================
-- 8. PRIVILÉGIOS: fechado por padrão
-- =====================================================================
alter default privileges in schema public revoke all on tables from anon;
alter default privileges in schema public revoke all on sequences from anon;
alter default privileges in schema public revoke all on functions from anon;
alter default privileges revoke execute on functions from public;

revoke all on all tables    in schema public from anon;
revoke all on all sequences in schema public from anon;
revoke all on all functions in schema public from public, anon, authenticated;

-- visitantes: só a vitrine (funções chamadas dentro de uma view rodam com o privilégio de quem consulta)
grant select on vitrine_produtos, vitrine_categorias, loja_publica, vitrine_zonas_entrega to anon, authenticated;
grant execute on function preco_atual(produtos) to anon, authenticated;

-- históricos imutáveis: nem o app nem a equipe alteram ou apagam (erro explícito, não "0 linhas")
revoke update, delete, truncate on est_movimentacoes, auditoria, venda_status_hist,
  entrega_eventos, fin_baixas from authenticated;
-- tabelas gravadas somente pelas RPCs: o app nem insere nem altera direto
revoke insert, update, delete, truncate on vendas, venda_itens, venda_pagamentos,
  entrega_codigos, compras, compras_itens, auditoria from authenticated;
revoke delete, truncate on fin_titulos, notas_fiscais, reclamacoes, reclamacao_mensagens,
  clientes, produtos, funcionarios from authenticated;

-- logados: apenas as funções que o app pode chamar (o RLS e as próprias funções filtram por cargo)
do $$
declare r record;
begin
  for r in
    select p.oid::regprocedure as f
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = any (array[
      'cargo_atual','tem_cargo','meu_cliente_id','meu_funcionario_id','eh_minha_venda','eh_minha_entrega',
      'criar_pedido_ecommerce','cancelar_meu_pedido','atualizar_status_pedido','cancelar_venda',
      'atualizar_status_entrega','atualizar_posicao_entrega','abrir_turno','fechar_turno',
      'finalizar_venda_pdv','buscar_produtos_pdv','importar_compra_nfe','abrir_reclamacao','avaliar_reclamacao'])
  loop
    execute format('grant execute on function %s to authenticated', r.f);
  end loop;
end $$;
-- _cancelar_venda e confirmar_pagamento_online: só service_role (webhook do gateway)

-- Realtime: acompanhamento de pedido/entrega e chat do SAC (respeita o RLS)
do $$
declare t text;
begin
  foreach t in array array['vendas','entregas','entrega_eventos','reclamacao_mensagens'] loop
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception when duplicate_object or undefined_object then null;
    end;
  end loop;
end $$;

-- =====================================================================
-- 9. DADOS INICIAIS
-- =====================================================================
insert into config_loja (id) values (true) on conflict do nothing;
insert into categorias (nome, slug, ordem) values
  ('Mercearia','mercearia',1), ('Hortifruti','hortifruti',2), ('Açougue e Peixaria','acougue',3),
  ('Padaria','padaria',4), ('Laticínios e Frios','laticinios-frios',5), ('Bebidas','bebidas',6),
  ('Congelados','congelados',7), ('Limpeza','limpeza',8), ('Higiene e Beleza','higiene',9), ('Pet','pet',10)
on conflict do nothing;
insert into pdv_terminais (codigo, descricao) values ('CAIXA-01','Caixa 1') on conflict do nothing;
-- Exemplo de zona de entrega:
-- insert into zonas_entrega (nome, bairros, taxa_entrega, pedido_minimo, prazo_estimado_min)
-- values ('Centro e arredores', array['Centro','Nazaré','Batista Campos'], 8.00, 40.00, 60);

-- =====================================================================
-- PÓS-INSTALAÇÃO
-- 1) Crie sua conta pelo app (ou Auth > Users > Add user). Depois, no SQL Editor,
--    torne-se o primeiro admin (troque o e-mail):
--      insert into funcionarios (user_id, nome_completo, cargo)
--      select id, 'Administrador', 'admin' from auth.users where email = 'SEU@EMAIL.COM';
-- 2) Novos funcionários: convide pelo Auth (Invite user / Edge Function com service_role)
--    e então, logado como admin, insira em `funcionarios` o user_id e o cargo.
--    Para desligar alguém, use ativo = false (o vínculo com Auth é protegido contra exclusão).
-- 3) Auth > Providers > Email: mantenha "Confirm email" LIGADO e ative CAPTCHA
--    (Auth > Attack Protection), pois o cadastro público é aberto aos clientes.
-- 4) Integrações externas (fora do banco): emissão de NFC-e/NF-e (via provedor fiscal),
--    PIX/cartão/boleto (via gateway). Uma Edge Function com service_role grava
--    notas_fiscais / fin_titulos e chama confirmar_pagamento_online(venda, gateway_id).
-- 5) Cliente de balcão que depois cria conta: o vínculo (clientes.user_id) deve ser feito
--    por um admin/gerente, nunca automaticamente por e-mail.
-- =====================================================================
