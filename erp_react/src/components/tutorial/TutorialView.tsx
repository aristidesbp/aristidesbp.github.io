import React, { useState } from 'react';
import {
  BookOpen,
  Terminal,
  Globe,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  FileCheck,
  Database,
  Layers,
  Shield,
  Rocket,
  Search,
  FolderTree,
  Cpu,
  ChevronRight,
  Sparkles,
  ExternalLink,
  MessageSquare,
  ShoppingCart,
  Store,
  Coins,
  Building2,
  Lock,
  Receipt,
  Truck,
  Package,
  Wallet,
  Bot,
  FileText,
} from 'lucide-react';

export const TutorialView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const sectionsIndex = [
    { id: 'visao-geral', title: '1. Visão Geral e Propósito SaaS', icon: Sparkles },
    { id: 'planejamento', title: '2. Planejamento Estratégico & Recursos', icon: Rocket },
    { id: 'ciclo-vida', title: '3. Ciclo de Vida (7 Fases Operacionais)', icon: Layers },
    { id: 'seguranca-rbac', title: '4. Segurança & Controle de Acesso (RBAC)', icon: Shield },
    { id: 'regras-negocio', title: '5. Regras de Negócio e Convenções', icon: CheckCircle2 },
    { id: 'arquitetura-pastas', title: '6. Arquitetura e Estrutura de Pastas', icon: FolderTree },
    { id: 'script-sql', title: '7. Script SQL Completo do Supabase', icon: Database },
    { id: 'manual-dev', title: '8. Manual do Dev: Expansão em 6 Passos', icon: Code2 },
    { id: 'roadmap', title: '9. Roadmap de Evolução Futura (Fases 1-4)', icon: Coins },
    { id: 'deploy-dist', title: '10. Execução, Criação da Pasta Dist & GitHub Pages', icon: Terminal },
  ];

  const supabaseSqlScript = `-- ==============================================================================
-- SCRIPT COMPLETO DE CONFIGURAÇÃO DO BANCO DE DADOS SUPABASE (SaaS ERP ABP)
-- Copie e cole este script no Editor SQL do seu painel Supabase (SQL Editor)
-- ==============================================================================

-- 1. EXTENSÃO PARA UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABELA DE ENTIDADES (Clientes, Fornecedores, Colaboradores)
CREATE TABLE IF NOT EXISTS public.entidades (
    id TEXT PRIMARY KEY DEFAULT ('ent_' || gen_random_uuid()),
    store_id TEXT NOT NULL DEFAULT 'tenant_default',
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    nome_completo TEXT NOT NULL,
    cpf_cnpj TEXT,
    cpf TEXT,
    data_nascimento DATE,
    email TEXT,
    telefone TEXT,
    tipo_entidade TEXT NOT NULL DEFAULT 'cliente', -- 'cliente', 'fornecedor', 'colaborador'
    status_entidade TEXT NOT NULL DEFAULT 'ativo', -- 'ativo', 'inativo'
    tipo_acesso TEXT DEFAULT 'cliente',
    avaliacao INTEGER DEFAULT 5,
    bio TEXT,
    avatar_url TEXT,
    limite_credito NUMERIC(10,2) DEFAULT 0.00,
    saldo_devedor NUMERIC(10,2) DEFAULT 0.00,
    cep TEXT,
    logradouro TEXT,
    numero TEXT,
    complemento TEXT,
    bairro TEXT,
    cidade TEXT,
    estado VARCHAR(2),
    foto_url TEXT,
    cargo_role TEXT,
    senha_acesso TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. TABELA DE PRODUTOS (Estoque)
CREATE TABLE IF NOT EXISTS public.produtos (
    id TEXT PRIMARY KEY DEFAULT ('prod_' || gen_random_uuid()),
    store_id TEXT NOT NULL DEFAULT 'tenant_default',
    nome TEXT NOT NULL,
    codigo_barras TEXT,
    categoria TEXT DEFAULT 'Geral',
    unidade TEXT DEFAULT 'UN',
    unidade_medida TEXT DEFAULT 'UN',
    preco_custo NUMERIC(10,2) DEFAULT 0.00,
    preco_venda NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    quantidade_estoque INTEGER NOT NULL DEFAULT 0,
    estoque_minimo INTEGER DEFAULT 5,
    descricao TEXT,
    foto_url TEXT,
    ncm TEXT,
    cest TEXT,
    cfop_entrada TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. TABELA DE VENDAS (PDV e E-commerce)
CREATE TABLE IF NOT EXISTS public.vendas (
    id TEXT PRIMARY KEY DEFAULT ('venda_' || gen_random_uuid()),
    store_id TEXT NOT NULL DEFAULT 'tenant_default',
    entidade_id TEXT REFERENCES public.entidades(id) ON DELETE SET NULL,
    entidade_nome TEXT,
    valor_total NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    desconto NUMERIC(10,2) DEFAULT 0.00,
    valor_liquido NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    forma_pagamento TEXT NOT NULL DEFAULT 'Dinheiro',
    status TEXT NOT NULL DEFAULT 'concluida', -- 'concluida', 'cancelada'
    origem TEXT DEFAULT 'pdv', -- 'pdv', 'ecommerce'
    is_entrega BOOLEAN DEFAULT false,
    status_entrega TEXT, -- 'novo', 'preparando', 'caminho', 'entregue', 'cancelado'
    cliente_nome TEXT,
    cliente_telefone TEXT,
    cliente_endereco TEXT,
    observacoes_entrega TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. TABELA DE ITENS DA VENDA
CREATE TABLE IF NOT EXISTS public.itens_venda (
    id TEXT PRIMARY KEY DEFAULT ('item_' || gen_random_uuid()),
    venda_id TEXT NOT NULL REFERENCES public.vendas(id) ON DELETE CASCADE,
    produto_id TEXT REFERENCES public.produtos(id) ON DELETE SET NULL,
    produto_nome TEXT,
    codigo_barras TEXT,
    unidade TEXT,
    quantidade INTEGER NOT NULL DEFAULT 1,
    preco_unitario NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    subtotal NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. TABELA DE FINANÇAS (Contas a Pagar e Receber)
CREATE TABLE IF NOT EXISTS public.financas (
    id TEXT PRIMARY KEY DEFAULT ('fin_' || gen_random_uuid()),
    store_id TEXT NOT NULL DEFAULT 'tenant_default',
    entidade_id TEXT REFERENCES public.entidades(id) ON DELETE SET NULL,
    entidade_nome TEXT,
    descricao TEXT NOT NULL,
    tipo TEXT NOT NULL DEFAULT 'despesa', -- 'receita', 'despesa'
    categoria TEXT DEFAULT 'Geral',
    valor_total NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    num_parcelas INTEGER DEFAULT 1,
    status_lancamento TEXT DEFAULT 'aberto', -- 'aberto', 'finalizado', 'cancelado'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. TABELA DE PARCELAS
CREATE TABLE IF NOT EXISTS public.parcelas (
    id TEXT PRIMARY KEY DEFAULT ('parc_' || gen_random_uuid()),
    financa_id TEXT NOT NULL REFERENCES public.financas(id) ON DELETE CASCADE,
    num_parcela INTEGER NOT NULL DEFAULT 1,
    total_parcelas INTEGER DEFAULT 1,
    valor_parcela NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    status TEXT NOT NULL DEFAULT 'pendente', -- 'pendente', 'pago', 'atrasado', 'cancelado'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 8. ÍNDICES DE DESEMPENHO E MULTI-TENANCY
CREATE INDEX IF NOT EXISTS idx_entidades_store ON public.entidades(store_id);
CREATE INDEX IF NOT EXISTS idx_entidades_email ON public.entidades(email);
CREATE INDEX IF NOT EXISTS idx_produtos_store ON public.produtos(store_id);
CREATE INDEX IF NOT EXISTS idx_produtos_codigo ON public.produtos(codigo_barras);
CREATE INDEX IF NOT EXISTS idx_vendas_store ON public.vendas(store_id);
CREATE INDEX IF NOT EXISTS idx_vendas_created ON public.vendas(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_financas_store ON public.financas(store_id);

-- 9. CONFIGURAÇÃO DE SEGURANÇA (Row Level Security - RLS)
ALTER TABLE public.entidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itens_venda ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parcelas ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS PERMISSIVAS PARA CHAVE ANON
CREATE POLICY "Acesso Livre Anon Entidades" ON public.entidades FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso Livre Anon Produtos" ON public.produtos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso Livre Anon Vendas" ON public.vendas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso Livre Anon ItensVenda" ON public.itens_venda FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso Livre Anon Financas" ON public.financas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso Livre Anon Parcelas" ON public.parcelas FOR ALL USING (true) WITH CHECK (true);`;

  const shouldShow = (id: string) => {
    if (activeSection !== 'all' && activeSection !== id) return false;
    if (searchFilter.trim() !== '') {
      return id.toLowerCase().includes(searchFilter.toLowerCase());
    }
    return true;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-4 z-10">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-2xl shadow-inner">
            📚
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Manual Completo & Planejamento SaaS
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Oficial
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Guia Técnico, Regras de Negócio, Arquitetura, Script SQL, Manual do Dev, Criação da Pasta Dist & GitHub Pages
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 z-10 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Pesquisar tópico..."
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* ÍNDICE INTERATIVO (Table of Contents) */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 dark:text-white">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span>Índice Geral do Documento & Atalhos de Navegação</span>
          </div>
          <button
            onClick={() => setActiveSection('all')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
              activeSection === 'all'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Exibir Tudo
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {sectionsIndex.map((sec) => {
            const Icon = sec.icon;
            const isSelected = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`p-2.5 rounded-xl text-left border text-xs font-bold transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-sm'
                    : 'bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <Icon className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="truncate">{sec.title}</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 1: VISÃO GERAL */}
      {shouldShow('visao-geral') && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
                1. Visão Geral e Propósito do Sistema SaaS Ecosystem
              </h2>
              <p className="text-xs text-slate-400">Padrão arquitetural e pilares fundamentais</p>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            O <strong>ERP_ABP SaaS Ecosystem</strong> é uma solução completa de gestão comercial projetada para operação híbrida (<em>Offline-First</em> com sincronização em nuvem) e modelo <strong>SaaS Multi-Tenant</strong>. Ele une a agilidade necessária no ambiente físico de supermercados e lojas a uma experiência moderna de vendas virtuais e CRM.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <h4 className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-500" /> Autenticação SaaS & Multi-Tenant
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Cada empresa/loja possui seu identificador único <code className="font-mono text-emerald-600 font-bold">store_id</code> e <code className="font-mono font-bold">user_id</code>. Dados totalmente isolados no Supabase e no IndexedDB local.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <h4 className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-500" /> Controle de Acesso por Perfil (RBAC)
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Acesso dinâmico por perfil (<code className="font-mono">admin</code>, <code className="font-mono">caixa</code>, <code className="font-mono">gerente</code>, <code className="font-mono">estoquista</code>, <code className="font-mono">cliente</code>).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <h4 className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-teal-500" /> Operação Híbrida Offline-First
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Funciona 100% sem internet gravando no IndexedDB. Sincroniza automaticamente com o Supabase quando a rede é reestabelecida.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <h4 className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                <Receipt className="w-4 h-4 text-amber-500" /> Códigos Rastreáveis SITE-#
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Todas as vendas do PDV e pedidos do e-commerce geram cupons e comprovantes padronizados com o prefixo <code className="font-mono text-amber-600 font-bold">SITE-#</code>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: PLANEJAMENTO ESTRATÉGICO & RECURSOS IMPLEMENTADOS */}
      {shouldShow('planejamento') && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
                2. Planejamento Estratégico & Recursos Implementados
              </h2>
              <p className="text-xs text-slate-400">Histórico de desenvolvimento e unificação de plataformas</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <div className="p-4 bg-slate-950 text-slate-200 rounded-xl space-y-2 border border-slate-800">
              <h3 className="font-black text-emerald-400 text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4" /> 2.1 Tela de Login & Autenticação SaaS (SaaSLoginScreen.tsx)
              </h3>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li><strong>Acesso Obrigatório Inicial:</strong> Bloqueia visualizações não autorizadas exigindo autenticação.</li>
                <li><strong>Campo E-mail e Senha:</strong> Com botão de alternância de visibilidade (ícone <code className="font-mono text-emerald-400">Eye / EyeOff</code>).</li>
                <li><strong>Entrar com Google:</strong> Integração com OAuth Supabase e fallback.</li>
                <li><strong>Cadastro de Novos Tenants:</strong> Permite o onboarding imediato de novas empresas com nome, proprietário e perfil.</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-950 text-slate-200 rounded-xl space-y-2 border border-slate-800">
              <h3 className="font-black text-emerald-400 text-sm flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> 2.2 WhatsApp CRM Integrado (CustomerChatView.tsx)
              </h3>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li><strong>Sincronização Automática:</strong> Clientes, Fornecedores e Colaboradores viram contatos no chat.</li>
                <li><strong>Link Direto WhatsApp Web (wa.me):</strong> Envio de mensagens oficiais com texto pré-formatado.</li>
                <li><strong>Automação n8n IA & Anexos:</strong> Suporte a auto-respostas e envio de cards de produtos.</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-950 text-slate-200 rounded-xl space-y-2 border border-slate-800">
              <h3 className="font-black text-emerald-400 text-sm flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" /> 2.3 Vitrine Compartilhada E-Commerce & Marketplace (EcommerceView.tsx)
              </h3>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li><strong>Vitrine Unificada:</strong> Exibe itens de todos os parceiros do ecossistema SaaS.</li>
                <li><strong>Checkout Mercado Pago:</strong> Pagamento via PIX com QR Code dinâmico, Cartão e Boleto.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: CICLO DE VIDA DO SISTEMA */}
      {shouldShow('ciclo-vida') && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-500 border border-teal-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
                3. Ciclo de Vida do Sistema (7 Fases Operacionais)
              </h2>
              <p className="text-xs text-slate-400">Do onboarding ao fechamento de caixa e auditoria</p>
            </div>
          </div>

          <div className="p-4 bg-slate-950 font-mono text-emerald-400 text-xs rounded-xl overflow-x-auto border border-slate-800">
            [1. Onboarding & Cadastro SaaS] ──&gt; [2. Entrada de Estoque / XML NF-e] ──&gt; [3. Abertura do Turno de Caixa]<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼<br />
            [6. Fechamento de Caixa &amp; Audit] &lt;── [5. Gestão de Entregas / Delivery] &lt;── [4. Processamento Venda (PDV/Site)]<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Sincronização em Nuvem (Offline/Supabase)]
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-extrabold text-slate-900 dark:text-white block mb-1">1. Onboarding & Tenant</span>
              <p className="text-slate-500 dark:text-slate-400">Criacao do <code className="font-mono">store_id</code> e atualizacao dinamica do titulo da aba para a loja.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-extrabold text-slate-900 dark:text-white block mb-1">2. Importacao XML NF-e</span>
              <p className="text-slate-500 dark:text-slate-400">Extrai fornecedor, cadastra produtos e calcula margem de lucro automaticamente.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-extrabold text-slate-900 dark:text-white block mb-1">3. Abertura do Turno de Caixa</span>
              <p className="text-slate-500 dark:text-slate-400">Fundo de troco inicial, sangrias e controle do operador ativo.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-extrabold text-slate-900 dark:text-white block mb-1">4. Vendas (PDV &amp; Site)</span>
              <p className="text-slate-500 dark:text-slate-400">Bipagem barcode, descontos, Mercado Pago e abatimento imediato do estoque.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-extrabold text-slate-900 dark:text-white block mb-1">5. Central de Entregas</span>
              <p className="text-slate-500 dark:text-slate-400">Acompanhamento do status (Pendente ➔ Preparo ➔ Saiu ➔ Entregue).</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-extrabold text-slate-900 dark:text-white block mb-1">6. Offline &amp; Sync</span>
              <p className="text-slate-500 dark:text-slate-400">Grava no IndexedDB e descarrega a fila no Supabase ao reconectar.</p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: SEGURANÇA & RBAC */}
      {shouldShow('seguranca-rbac') && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
                4. Segurança, Autenticação SaaS e Controle de Acesso (RBAC)
              </h2>
              <p className="text-xs text-slate-400">Mapeamento estrito de permissões por perfil</p>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
            <span className="text-amber-400 font-bold block mb-2">// Permissões de Módulo em src/types/index.ts:</span>
            <pre className="overflow-x-auto text-emerald-400">
{`export const ROLE_TAB_PERMISSIONS: Record<UserRole, string[]> = {
  admin: [
    'ecommerce', 'deliveries', 'chat', 'dashboard', 'pdv',
    'sales_history', 'inventory', 'entities', 'financial',
    'reports', 'settings', 'tutorial',
  ],
  caixa: ['ecommerce', 'pdv', 'sales_history', 'deliveries'],
  gerente: ['ecommerce', 'deliveries', 'inventory', 'entities', 'reports', 'pdv', 'sales_history'],
  estoquista: ['ecommerce', 'inventory', 'deliveries'],
  cliente: ['ecommerce', 'chat'],
};`}
            </pre>
          </div>
        </div>
      )}

      {/* SECTION 5: REGRAS DE NEGÓCIO */}
      {shouldShow('regras-negocio') && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
                5. Regras de Negócio Detalhadas e Convenções Globais
              </h2>
              <p className="text-xs text-slate-400">Diretrizes obrigatórias de codificação e fluxo</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">1. Isolamento Multi-Loja</h4>
              <p className="text-slate-500 dark:text-slate-400">Toda entidade grava <code className="font-mono">store_id</code>. Consultas aplicam filtro automático no <code className="font-mono">AppContext</code>.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">2. Codificação Padronizada SITE-#</h4>
              <p className="text-slate-500 dark:text-slate-400">A função <code className="font-mono">formatSiteOrderCode()</code> converte IDs em identificadores maiúsculos estilo <code className="font-mono">SITE-9A4F2C</code>.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">3. Nomeação de Comprovantes TXT</h4>
              <p className="text-slate-500 dark:text-slate-400">Arquivos baixados seguem rigorosamente: <code className="font-mono text-[10px]">Comprovante_[Loja]_[SITE-#]_[Data_Hora].txt</code>.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">4. Formatação Monetária</h4>
              <p className="text-slate-500 dark:text-slate-400">Valores exibidos passam por <code className="font-mono">formatCurrency()</code> gerando padrão brasileiro <code className="font-mono">R$ 0,00</code>.</p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: ARQUITETURA E PASTA DE ARQUIVOS */}
      {shouldShow('arquitetura-pastas') && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <FolderTree className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
                6. Arquitetura, Stack Tecnológica & Estrutura de Arquivos
              </h2>
              <p className="text-xs text-slate-400">Mapa completo dos diretórios e tecnologias</p>
            </div>
          </div>

          <div className="p-4 bg-slate-950 font-mono text-xs text-slate-300 rounded-xl border border-slate-800 overflow-x-auto">
            <pre className="text-emerald-400">
{`/
├── index.html               # Entrypoint HTML principal
├── package.json             # Scripts (dev, build, preview) e dependências
├── vite.config.ts           # Configuração Vite com base: './' para GitHub Pages
├── README.md                # Manual de referência completo
├── planejamento.md          # Planejamento estratégico do SaaS Ecosystem
└── src/
    ├── App.tsx              # Componente Raiz e Roteamento de Abas/RBAC
    ├── main.tsx             # Ponto de montagem React 19
    ├── types/index.ts       # Central de interfaces e tipos TypeScript
    ├── context/AppContext.tsx# Estado Global e Motor de Regras
    ├── lib/
    │   ├── offlineDb.ts     # Banco Local IndexedDB (8 ObjectStores)
    │   ├── sanitizer.ts     # Utilitários de higienização e formatação
    │   ├── supabase.ts      # Cliente Supabase & Detecção de Rede
    │   └── syncService.ts   # Sincronizador Bidirecional
    └── components/
        ├── common/SaaSLoginScreen.tsx  # Tela de Login SaaS
        ├── chat/CustomerChatView.tsx    # WhatsApp CRM
        ├── ecommerce/EcommerceView.tsx  # Vitrine Virtual Compartilhada
        ├── pdv/POSView.tsx             # Frente de Caixa PDV
        ├── reports/ReportsView.tsx     # Central de Relatórios
        └── tutorial/TutorialView.tsx   # Central de Manual do Sistema`}
            </pre>
          </div>
        </div>
      )}

      {/* SECTION 7: SCRIPT SQL DO SUPABASE */}
      {shouldShow('script-sql') && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
                  7. Script SQL Completo do Supabase (Tabelas e RLS)
                </h2>
                <p className="text-xs text-slate-400">Copie e execute no Editor SQL do seu painel Supabase</p>
              </div>
            </div>

            <button
              onClick={() => handleCopy(supabaseSqlScript, 'sql-script')}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              {copiedId === 'sql-script' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Script SQL</span>
                </>
              )}
            </button>
          </div>

          <div className="relative">
            <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl text-xs font-mono max-h-96 overflow-y-auto border border-slate-800 leading-relaxed">
              {supabaseSqlScript}
            </pre>
          </div>
        </div>
      )}

      {/* SECTION 8: MANUAL DO DEV */}
      {shouldShow('manual-dev') && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
                8. Manual do Desenvolvedor: Guia de Expansão em 6 Passos
              </h2>
              <p className="text-xs text-slate-400">Como adicionar novos módulos e campos no ecossistema</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-black text-emerald-600 dark:text-emerald-400 text-xs uppercase block mb-1">Passo 1</span>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Atualizar Interface TypeScript</h4>
              <p className="text-slate-500 dark:text-slate-400">Adicione o novo campo ou interface em <code className="font-mono">src/types/index.ts</code>.</p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-black text-emerald-600 dark:text-emerald-400 text-xs uppercase block mb-1">Passo 2</span>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Atualizar Schema IndexedDB</h4>
              <p className="text-slate-500 dark:text-slate-400">Edite <code className="font-mono">src/lib/offlineDb.ts</code> para registrar ObjectStore ou campos.</p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-black text-emerald-600 dark:text-emerald-400 text-xs uppercase block mb-1">Passo 3</span>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Estado no AppContext.tsx</h4>
              <p className="text-slate-500 dark:text-slate-400">Crie o estado reativo e exponha a função CRUD no contexto global.</p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-black text-emerald-600 dark:text-emerald-400 text-xs uppercase block mb-1">Passo 4</span>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Motor de Sync</h4>
              <p className="text-slate-500 dark:text-slate-400">Atualize <code className="font-mono">src/lib/syncService.ts</code> para enviar os novos dados ao Supabase.</p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-black text-emerald-600 dark:text-emerald-400 text-xs uppercase block mb-1">Passo 5</span>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Criar a View/Componente</h4>
              <p className="text-slate-500 dark:text-slate-400">Construa o componente na pasta <code className="font-mono">src/components/</code> com Tailwind.</p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-black text-emerald-600 dark:text-emerald-400 text-xs uppercase block mb-1">Passo 6</span>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Registrar Rota e Aba</h4>
              <p className="text-slate-500 dark:text-slate-400">Inclua a aba em <code className="font-mono">Navigation.tsx</code> e a renderização em <code className="font-mono">App.tsx</code>.</p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 9: ROADMAP FUTURO */}
      {shouldShow('roadmap') && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
                9. Roadmap de Evolução Futura (Fases 1 a 4)
              </h2>
              <p className="text-xs text-slate-400">Planejamento de expansão estratégica do ecossistema</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 bg-slate-950 text-slate-200 rounded-xl border border-slate-800 space-y-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-400 uppercase">Fase 1</span>
              <h4 className="font-extrabold text-white text-sm">ABP Coin & Carteira Digital</h4>
              <p className="text-slate-400">Cashback e pagamentos P2P com saldo em ABP Coins diretamente no ERP.</p>
            </div>

            <div className="p-4 bg-slate-950 text-slate-200 rounded-xl border border-slate-800 space-y-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-indigo-500/20 text-indigo-400 uppercase">Fase 2</span>
              <h4 className="font-extrabold text-white text-sm">Multi-Lojas & Filiais no Mesmo Login</h4>
              <p className="text-slate-400">Alternância imediata entre filiais no HeaderBar com gestão consolidada.</p>
            </div>

            <div className="p-4 bg-slate-950 text-slate-200 rounded-xl border border-slate-800 space-y-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 uppercase">Fase 3</span>
              <h4 className="font-extrabold text-white text-sm">WhatsApp Business Cloud API Oficial</h4>
              <p className="text-slate-400">Envio massivo de notificações de entrega sem risco de bloqueios.</p>
            </div>

            <div className="p-4 bg-slate-950 text-slate-200 rounded-xl border border-slate-800 space-y-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-500/20 text-blue-400 uppercase">Fase 4</span>
              <h4 className="font-extrabold text-white text-sm">Emissão Fiscal SEFAZ (NFC-e / NF-e)</h4>
              <p className="text-slate-400">Integração com parceiros fiscais para transmissão automática de cupons fiscais.</p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 10: CRIAÇÃO DA PASTA DIST, EXECUÇÃO E DEPLOY GITHUB PAGES */}
      {shouldShow('deploy-dist') && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
                10. Execução Local, Criação da Pasta DIST e Deploy no GitHub Pages
              </h2>
              <p className="text-xs text-slate-400">Instruções para compilação estática e solução definitiva da Tela Branca</p>
            </div>
          </div>

          {/* ALERT BOX */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-black text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Por que a "Tela Branca" ocorre e por que precisamos da pasta DIST?</span>
            </div>
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              O GitHub Pages é um servidor de hospedagem estática e <strong>não consegue interpretar TypeScript (.tsx)</strong> em tempo de execução. Ao rodar <code className="bg-amber-200/80 dark:bg-amber-900/80 px-1 py-0.5 rounded font-mono font-bold">npm run build</code>, o Vite compila o projeto React gerando a pasta <code className="bg-amber-200/80 dark:bg-amber-900/80 px-1.5 py-0.5 rounded font-mono font-bold">dist/</code> contendo o arquivo <code className="font-mono font-bold">index.html</code> e os scripts minificados em <code className="font-mono font-bold">assets/</code>.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Step 1 */}
            <div className="space-y-1.5">
              <h4 className="font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                1. Execução Local no Linux (Ubuntu, Mint, Debian, etc.)
              </h4>
              <div className="relative group">
                <pre className="bg-slate-950 text-slate-100 p-3.5 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800">
                  # Instalar dependencias e rodar servidor local{'\n'}
                  npm install{'\n'}
                  npm run dev
                </pre>
                <button
                  onClick={() => handleCopy('npm install\nnpm run dev', 'cmd-dev')}
                  className="absolute right-2.5 top-2.5 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition flex items-center gap-1"
                >
                  {copiedId === 'cmd-dev' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Step 2: Creating Dist */}
            <div className="space-y-1.5">
              <h4 className="font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                2. Criar a Pasta DIST (Compilação Estática)
              </h4>
              <p className="text-slate-600 dark:text-slate-300">
                Execute o comando de build para gerar a pasta <code className="font-mono font-bold text-emerald-500">dist/</code> na raiz do projeto:
              </p>
              <div className="relative group">
                <pre className="bg-slate-950 text-emerald-400 p-3.5 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800">
                  npm run build
                </pre>
                <button
                  onClick={() => handleCopy('npm run build', 'cmd-build')}
                  className="absolute right-2.5 top-2.5 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition flex items-center gap-1"
                >
                  {copiedId === 'cmd-build' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Step 3: Deploying Gh-pages */}
            <div className="space-y-1.5">
              <h4 className="font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                3. Publicar o Conteúdo da Pasta DIST no GitHub Pages
              </h4>
              <div className="relative group">
                <pre className="bg-slate-950 text-slate-100 p-3.5 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800">
                  # Publicação via comando automatizado:{'\n'}
                  npx gh-pages -d dist
                </pre>
                <button
                  onClick={() => handleCopy('npx gh-pages -d dist', 'cmd-ghpages')}
                  className="absolute right-2.5 top-2.5 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition flex items-center gap-1"
                >
                  {copiedId === 'cmd-ghpages' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
