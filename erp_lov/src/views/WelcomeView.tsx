import React from 'react';
import { Entidade, Produto, Financa, Parcela, Venda } from '../types/erp';
import { ActiveTab } from '../components/Sidebar';
import {
  TrendingUp,
  Package,
  AlertTriangle,
  Users,
  ShoppingCart,
  PlusCircle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  DollarSign
} from 'lucide-react';

interface WelcomeViewProps {
  entidades: Entidade[];
  produtos: Produto[];
  financas: Financa[];
  parcelas: Parcela[];
  vendas: Venda[];
  onNavigateTab: (tab: ActiveTab) => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  entidades,
  produtos,
  financas,
  parcelas,
  vendas,
  onNavigateTab
}) => {
  const hojeStr = new Date().toISOString().split('T')[0] as string;

  // Calculated Metrics
  const totalClientes = entidades.filter((e) => e.tipo_entidade === 'cliente').length;
  const totalFornecedores = entidades.filter((e) => e.tipo_entidade === 'fornecedor').length;

  const estoqueBaixoCount = produtos.filter((p) => p.quantidade_estoque <= p.estoque_minimo).length;
  const totalItensEstoque = produtos.reduce((acc, p) => acc + p.quantidade_estoque, 0);

  const receitasPagas = parcelas
    .filter((p) => p.status === 'pago' && p.financas?.tipo === 'receita')
    .reduce((acc, p) => acc + Number(p.valor_parcela || 0), 0);

  const despesasPagas = parcelas
    .filter((p) => p.status === 'pago' && p.financas?.tipo === 'despesa')
    .reduce((acc, p) => acc + Number(p.valor_parcela || 0), 0);

  const pendentesTotal = parcelas
    .filter((p) => p.status !== 'pago')
    .reduce((acc, p) => acc + Number(p.valor_parcela || 0), 0);

  const vendasHoje = vendas.filter((v) => v.created_at?.startsWith(hojeStr));
  const totalVendasHoje = vendasHoje.reduce((acc, v) => acc + Number(v.valor_total || 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold mb-3 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Sistema ERP & Marketplace Comunitário Ativo</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Bem-vindo ao ERP_ABP
          </h1>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Controle completo de vendas no PDV, cadastro de produtos com leitura de código de barras, gestão de entidades, lançamentos financeiros e exportação de relatórios.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => onNavigateTab('pdv')}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition shadow-lg shadow-emerald-500/20"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Abrir Frente de Caixa (PDV)</span>
            </button>
            <button
              onClick={() => onNavigateTab('estoque')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition border border-white/10"
            >
              <Package className="w-4 h-4" />
              <span>Cadastrar Novo Produto</span>
            </button>
          </div>
        </div>

        {/* Background glow effects */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sales Today */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Vendas no PDV (Hoje)
            </span>
            <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            R$ {totalVendasHoje.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            {vendasHoje.length} venda(s) registrada(s)
          </p>
        </div>

        {/* Critical Stock */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Estoque Crítico
            </span>
            <div className="p-2 bg-amber-500/10 text-amber-600 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {estoqueBaixoCount} produto(s)
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            Total em estoque: {totalItensEstoque} unidade(s)
          </p>
        </div>

        {/* Receitas Pagas */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-l-teal-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Receitas Pagas
            </span>
            <div className="p-2 bg-teal-500/10 text-teal-600 rounded-xl">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-2">
            R$ {receitasPagas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">Despesas pagas: R$ {despesasPagas.toFixed(2)}</p>
        </div>

        {/* Total Customers */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Entidades Ativas
            </span>
            <div className="p-2 bg-blue-500/10 text-blue-600 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {entidades.length} cadastradas
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            {totalClientes} Clientes | {totalFornecedores} Fornecedores
          </p>
        </div>
      </div>

      {/* Quick Action Navigation Grid & Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Shortcuts */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-500" />
            <span>Atalhos de Acesso Rápido aos Módulos</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => onNavigateTab('pdv')}
              className="p-4 bg-slate-50 hover:bg-emerald-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 text-left transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 bg-emerald-500 text-white rounded-xl shadow-md group-hover:scale-105 transition">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase">PDV Caixa</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Frente de Caixa</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Realize vendas, bipando produtos por código de barras, aplique descontos e emita cupons.
              </p>
            </button>

            <button
              onClick={() => onNavigateTab('estoque')}
              className="p-4 bg-slate-50 hover:bg-emerald-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 text-left transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 bg-blue-500 text-white rounded-xl shadow-md group-hover:scale-105 transition">
                  <Package className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-blue-600 uppercase">Estoque</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Gestão de Estoque</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Cadastre e edite produtos, acompanhe estoques mínimos e importe notas XML NF-e.
              </p>
            </button>

            <button
              onClick={() => onNavigateTab('financeiro')}
              className="p-4 bg-slate-50 hover:bg-emerald-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 text-left transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 bg-teal-500 text-white rounded-xl shadow-md group-hover:scale-105 transition">
                  <DollarSign className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-teal-600 uppercase">Financeiro</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Lançamentos & Parcelas</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Controle receitas e despesas, gere parcelamentos automáticos e anexe boletos.
              </p>
            </button>

            <button
              onClick={() => onNavigateTab('entidades')}
              className="p-4 bg-slate-50 hover:bg-emerald-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 text-left transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow-md group-hover:scale-105 transition">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-amber-600 uppercase">Entidades</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Clientes & Fornecedores</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Cadastre pessoas físicas/jurídicas com busca de CEP automática via ViaCEP API.
              </p>
            </button>
          </div>
        </div>

        {/* Low Stock Warning Sidebar Widget */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Alertas de Estoque</span>
              </h3>
              <button
                onClick={() => onNavigateTab('estoque')}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Ver Todos
              </button>
            </div>

            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
              {produtos.filter((p) => p.quantidade_estoque <= p.estoque_minimo).length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">
                  Nenhum produto em nível crítico de estoque!
                </p>
              ) : (
                produtos
                  .filter((p) => p.quantidade_estoque <= p.estoque_minimo)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-bold text-slate-900 dark:text-white truncate">{p.nome}</p>
                        <p className="text-[10px] text-slate-500">Mínimo: {p.estoque_minimo}</p>
                      </div>
                      <span className="font-extrabold px-2 py-1 bg-amber-500 text-white rounded-lg text-[10px] shrink-0">
                        {p.quantidade_estoque} unid
                      </span>
                    </div>
                  ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Atualizado em tempo real
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
