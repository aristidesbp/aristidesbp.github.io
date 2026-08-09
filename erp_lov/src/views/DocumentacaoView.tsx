import React, { useState } from 'react';
import {
  BookOpen,
  Database,
  Layers,
  Code2,
  CheckCircle2,
  Key,
  Copy,
  Check,
  Server,
  Zap,
  ShieldCheck,
  ShoppingCart,
  Package,
  DollarSign,
  Users,
  Settings,
  HelpCircle,
  FileCode2,
  Terminal
} from 'lucide-react';

export const DocumentacaoView: React.FC = () => {
  const [copiedSql, setCopiedSql] = useState(false);
  const [activeTab, setActiveTab] = useState<'arquitetura' | 'modulos' | 'supabase_guide' | 'sql_schema'>('arquitetura');

  const supabaseSqlSchema = `-- SCRIPT DE CRIAÇÃO DAS TABELAS NO SUPABASE (ERP_ABP)
-- Acesse o Painel do Supabase > SQL Editor e execute o código abaixo:

-- 1. TABELA DE ENTIDADES (Clientes, Fornecedores, Colaboradores)
CREATE TABLE IF NOT EXISTS public.entidades (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_completo TEXT NOT NULL,
  tipo TEXT CHECK (tipo IN ('Cliente', 'Fornecedor', 'Colaborador')),
  documento TEXT,
  email TEXT,
  telefone TEXT,
  cep TEXT,
  logradouro TEXT,
  numero TEXT,
  bairro TEXT,
  cidade TEXT,
  estado TEXT,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABELA DE PRODUTOS (Estoque)
CREATE TABLE IF NOT EXISTS public.produtos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo_barras TEXT UNIQUE,
  nome TEXT NOT NULL,
  categoria TEXT,
  preco_custo NUMERIC(10,2) DEFAULT 0.00,
  preco_venda NUMERIC(10,2) DEFAULT 0.00,
  quantidade_estoque INTEGER DEFAULT 0,
  estoque_minimo INTEGER DEFAULT 5,
  unidade TEXT DEFAULT 'UN',
  imagem_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABELA DE FINANÇAS (Contas a Pagar / A Receber)
CREATE TABLE IF NOT EXISTS public.financas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  descricao TEXT NOT NULL,
  tipo TEXT CHECK (tipo IN ('Receita', 'Despesa')),
  valor_total NUMERIC(10,2) NOT NULL,
  numero_parcelas INTEGER DEFAULT 1,
  entidade_id UUID REFERENCES public.entidades(id) ON DELETE SET NULL,
  categoria TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABELA DE PARCELAS
CREATE TABLE IF NOT EXISTS public.parcelas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  financa_id UUID REFERENCES public.financas(id) ON DELETE CASCADE,
  numero_parcela INTEGER NOT NULL,
  valor_parcela NUMERIC(10,2) NOT NULL,
  data_vencimento DATE NOT NULL,
  data_pagamento TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'Pendente' CHECK (status IN ('Pendente', 'Pago', 'Atrasado')),
  forma_pagamento TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABELA DE VENDAS (PDV)
CREATE TABLE IF NOT EXISTS public.vendas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cliente_id UUID REFERENCES public.entidades(id) ON DELETE SET NULL,
  valor_total NUMERIC(10,2) NOT NULL,
  desconto NUMERIC(10,2) DEFAULT 0.00,
  forma_pagamento TEXT NOT NULL,
  cupom_html TEXT,
  items JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DICA DE SEGURANÇA (RLS - Row Level Security)
ALTER TABLE public.entidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parcelas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendas ENABLE ROW LEVEL SECURITY;

-- Permite leitura e escrita para chaves anon públicas (ou ajuste conforme suas políticas)
CREATE POLICY "Permitir Acesso Anonimo Entidades" ON public.entidades FOR ALL USING (true);
CREATE POLICY "Permitir Acesso Anonimo Produtos" ON public.produtos FOR ALL USING (true);
CREATE POLICY "Permitir Acesso Anonimo Financas" ON public.financas FOR ALL USING (true);
CREATE POLICY "Permitir Acesso Anonimo Parcelas" ON public.parcelas FOR ALL USING (true);
CREATE POLICY "Permitir Acesso Anonimo Vendas" ON public.vendas FOR ALL USING (true);
`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(supabaseSqlSchema);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <BookOpen className="w-64 h-64 text-emerald-400" />
        </div>

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 text-xs font-extrabold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Documentação Técnica do Sistema</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Manual do Desenvolvedor & Arquitetura ERP_ABP
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Consulte a especificação completa de todos os módulos desenvolvidos, o funcionamento do motor híbrido de dados (Supabase + LocalStorage) e os métodos para conceder acesso total ao seu projeto Supabase.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('arquitetura')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeTab === 'arquitetura'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>1. Arquitetura & Como Funciona</span>
        </button>

        <button
          onClick={() => setActiveTab('modulos')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeTab === 'modulos'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>2. Módulos & Recursos</span>
        </button>

        <button
          onClick={() => setActiveTab('supabase_guide')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeTab === 'supabase_guide'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>3. Como Dar Acesso ao Supabase</span>
        </button>

        <button
          onClick={() => setActiveTab('sql_schema')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeTab === 'sql_schema'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>4. Script SQL do Banco</span>
        </button>
      </div>

      {/* TAB 1: ARQUITETURA */}
      {activeTab === 'arquitetura' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-500" />
              <span>Conceito do Motor de Dados Híbrido (Offline-First + Cloud Supabase)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center">
                  <Server className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  1. Sincronização Nuvem (Supabase REST API)
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  O sistema envia todas as requisições de criação, atualização e exclusão diretamente para as tabelas PostgreSQL no Supabase. Se a conexão com o servidor responder com sucesso, o registro é salvo na nuvem instantaneamente para sincronização entre dispositivos.
                </p>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                <div className="w-10 h-10 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  2. Fallback Inteligente (Cache Local)
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Caso a conexão falhe, faltem tabelas ou o usuário esteja offline, o assistente inteligente armazena localmente no <code className="text-emerald-600 font-mono">localStorage</code> do navegador. O operador nunca perde vendas, registros financeiros ou produtos cadastrados.
                </p>
              </div>
            </div>

            <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-3 font-mono text-xs">
              <h4 className="font-bold text-emerald-400 flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                <span>Stack de Tecnologias Utilizadas</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>React 18 + TypeScript (Vite Engine)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tailwind CSS (Estilização Utilitária)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Supabase JS Client (@supabase/supabase-js)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lucide React (Ícones Vetoriais)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Barcode Detector API & HTML5 Video Scanner</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>DOMParser XML para NFe / DANFE / CTe</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MÓDULOS */}
      {activeTab === 'modulos' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Module 1: PDV */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white text-base">
                    Frente de Caixa (PDV)
                  </h4>
                  <span className="text-xs text-slate-500">Módulo de Vendas Diretas</span>
                </div>
              </div>
              <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-800">
                <li className="pt-2">✓ Leitura instantânea de código de barras via câmera do dispositivo ou leitor físico USB.</li>
                <li className="pt-2">✓ Fechamento ágil por atalho de teclado (<code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 rounded">F8</code>).</li>
                <li className="pt-2">✓ Impressão de cupom não fiscal/comprovante térmico formatado (58mm/80mm).</li>
                <li className="pt-2">✓ Controle completo de Sangria de Caixa com baixa automática no módulo financeiro.</li>
                <li className="pt-2">✓ Histórico de vendas com opção de estorno e emissão de 2ª via de comprovante.</li>
              </ul>
            </div>

            {/* Module 2: Estoque */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white text-base">
                    Estoque & Produtos
                  </h4>
                  <span className="text-xs text-slate-500">Gestão do Catálogo</span>
                </div>
              </div>
              <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-800">
                <li className="pt-2">✓ Importação automática em lote de produtos via XML de NFe (extrai nome, EAN, preço e fornecedor).</li>
                <li className="pt-2">✓ Cálculo automático de margem de lucro (%) com base no preço de custo e preço de venda.</li>
                <li className="pt-2">✓ Alerta de estoque crítico quando a quantidade atinge o limite mínimo.</li>
                <li className="pt-2">✓ Cadastro completo com fotos, categorias e código de barras único.</li>
              </ul>
            </div>

            {/* Module 3: Financeiro */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-500/10 text-purple-600 rounded-2xl">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white text-base">
                    Controle Financeiro
                  </h4>
                  <span className="text-xs text-slate-500">Contas a Pagar e A Receber</span>
                </div>
              </div>
              <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-800">
                <li className="pt-2">✓ Lançamentos financeiros com parcelamento automático em até 48 vezes.</li>
                <li className="pt-2">✓ Baixa de pagamentos individual por parcela com registro de forma de pagamento.</li>
                <li className="pt-2">✓ Emissão de Carnê de Pagamento impresso por parcela ou lote completo.</li>
                <li className="pt-2">✓ Filtros avançados por período, status (Pendente, Pago, Atrasado) e tipo.</li>
              </ul>
            </div>

            {/* Module 4: Entidades */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/10 text-amber-600 rounded-2xl">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white text-base">
                    Entidades & Cadastros
                  </h4>
                  <span className="text-xs text-slate-500">Clientes, Fornecedores e Colaboradores</span>
                </div>
              </div>
              <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-800">
                <li className="pt-2">✓ Busca automática de endereço pelo CEP via API ViaCEP.</li>
                <li className="pt-2">✓ Validação e formatação de documentos (CPF / CNPJ / Telefone).</li>
                <li className="pt-2">✓ Integração nativa com a agenda de contatos do dispositivo (Contacts API).</li>
                <li className="pt-2">✓ Filtros rápidos e vínculo direto com compras, vendas e lançamentos.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SUPABASE GUIDE */}
      {activeTab === 'supabase_guide' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-emerald-500" />
              <span>Como Fornecer Acesso ao Projeto Supabase</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Entenda como você pode me conceder permissão para gerenciar o seu banco de dados Supabase.
            </p>
          </div>

          <div className="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-2">
              <h4 className="font-bold text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Método 1: Enviar as Chaves de API no Chat / Configurações (Recomendado)</span>
              </h4>
              <p>
                Você pode simplesmente me fornecer a <strong>API URL</strong> e a <strong>Anon Key</strong> (ou a <strong>Service Role Key</strong> para controle administrativo completo). Com essas credenciais configuradas na aba de <strong className="text-slate-900 dark:text-white">Configurações</strong> do aplicativo, eu consigo ler, criar, atualizar e excluir qualquer registro via API diretamente!
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-2 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Server className="w-4 h-4 text-blue-500" />
                <span>Método 2: Executar Scripts SQL no Painel do Supabase</span>
              </h4>
              <p>
                Caso queira criar ou alterar a estrutura de tabelas, índices ou regras de segurança (RLS), você pode abrir o painel do Supabase (<code className="font-mono text-emerald-600">supabase.com</code>), ir em <strong>SQL Editor</strong> e colar o código SQL fornecido na aba ao lado (<strong className="text-slate-900 dark:text-white">Script SQL do Banco</strong>).
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-2 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500" />
                <span>Método 3: Convidar Membro de Equipe no Dashboard do Supabase</span>
              </h4>
              <p>
                Se você deseja adicionar um e-mail de acesso na sua organização do Supabase:
              </p>
              <ol className="list-decimal pl-5 space-y-1 font-mono text-[11px]">
                <li>Acesse <strong>supabase.com/dashboard</strong> e selecione o seu projeto.</li>
                <li>Vá no menu lateral em <strong>Project Settings &gt; Members</strong>.</li>
                <li>Clique em <strong>Invite Member</strong> e insira o e-mail desejado.</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SQL SCHEMA */}
      {activeTab === 'sql_schema' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-500" />
                <span>Script SQL para Criação do Banco de Dados no Supabase</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Copie o script abaixo e rode no SQL Editor do seu Supabase para criar a estrutura completa das tabelas do ERP.
              </p>
            </div>

            <button
              onClick={handleCopySql}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition flex items-center gap-2 shrink-0 shadow-md shadow-emerald-600/20"
            >
              {copiedSql ? (
                <>
                  <Check className="w-4 h-4" />
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

          <div className="relative bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto max-h-[500px] overflow-y-auto border border-slate-800">
            <pre className="whitespace-pre">{supabaseSqlSchema}</pre>
          </div>
        </div>
      )}
    </div>
  );
};
