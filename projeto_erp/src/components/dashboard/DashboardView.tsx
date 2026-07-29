import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDateTimeBR } from '../../lib/sanitizer';
import {
  DollarSign,
  ShoppingCart,
  AlertTriangle,
  TrendingUp,
  CreditCard,
  ShoppingBag,
  ArrowUpRight,
  ShieldCheck,
  Award,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { sales, products, ecommerceOrders, setActiveTab } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];

  // Today Sales
  const todaySales = sales.filter((s) => s.created_at.startsWith(todayStr) && s.status === 'concluida');
  const totalSalesToday = todaySales.reduce((acc, s) => acc + s.valor_liquido, 0);

  // Month Sales
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthSales = sales.filter((s) => {
    const d = new Date(s.created_at);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear && s.status === 'concluida';
  });
  const totalSalesMonth = monthSales.reduce((acc, s) => acc + s.valor_liquido, 0);

  // Ticket Médio
  const ticketMedio = todaySales.length > 0 ? totalSalesToday / todaySales.length : 0;

  // Stock Alerts
  const lowStockProducts = products.filter((p) => p.quantidade_estoque <= p.estoque_minimo);

  // E-commerce Pending Orders
  const pendingOrders = ecommerceOrders.filter((o) => o.status === 'novo');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 flex items-center justify-center pointer-events-none">
          <ShoppingBag className="w-96 h-96 -mr-20" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-4 h-4 text-emerald-200" />
            <span>Sistema para Supermercados & Atacados</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Painel Executivo de Vendas & Operações
          </h2>
          <p className="text-emerald-100 text-sm mt-2 font-medium">
            Acompanhamento em tempo real das frentes de caixa (PDV), estoque local e e-commerce de delivery.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => setActiveTab('pdv')}
              className="bg-white text-emerald-800 font-extrabold px-5 py-3 rounded-2xl hover:bg-emerald-50 transition shadow-lg flex items-center gap-2 text-sm"
            >
              <ShoppingCart className="w-4 h-4 text-emerald-600" />
              <span>Abrir Frente de Caixa (PDV)</span>
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className="bg-emerald-800/60 hover:bg-emerald-800 text-white font-bold px-5 py-3 rounded-2xl transition border border-white/20 flex items-center gap-2 text-sm"
            >
              <AlertTriangle className="w-4 h-4 text-amber-300" />
              <span>Conferir Estoque ({lowStockProducts.length} alertas)</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Vendas de Hoje */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vendas de Hoje</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {formatCurrency(totalSalesToday)}
            </h3>
            <p className="text-xs text-slate-500 mt-1">{todaySales.length} transações concluídas</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Faturamento Mês */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Faturamento Mês</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {formatCurrency(totalSalesMonth)}
            </h3>
            <p className="text-xs text-slate-500 mt-1">{monthSales.length} cupons emitidos</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Ticket Médio */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ticket Médio (Hoje)</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {formatCurrency(ticketMedio)}
            </h3>
            <p className="text-xs text-slate-500 mt-1">Média por cliente no caixa</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        {/* Alertas de Estoque */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Alertas de Estoque</p>
            <h3
              className={`text-2xl font-black mt-1 ${
                lowStockProducts.length > 0 ? 'text-amber-500 animate-pulse' : 'text-slate-900 dark:text-white'
              }`}
            >
              {lowStockProducts.length} Produtos
            </h3>
            <p className="text-xs text-slate-500 mt-1">Abaixo do estoque mínimo</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ultimas Vendas Realizadas */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Últimas Vendas Emitidas</h3>
              <p className="text-xs text-slate-400">Transações recentes do PDV e Delivery</p>
            </div>
            <button
              onClick={() => setActiveTab('sales_history')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              Ver Todas <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {sales.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="font-bold">Nenhuma venda registrada ainda.</p>
              <p className="text-xs">Abra a Frente de Caixa para realizar a primeira venda.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="text-xs uppercase text-slate-400 border-b border-slate-100 dark:border-slate-800">
                    <th className="py-2">Código / Data</th>
                    <th className="py-2">Cliente</th>
                    <th className="py-2">Pagamento</th>
                    <th className="py-2 text-right">Valor Líquido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {sales.slice(0, 5).map((sale) => (
                    <tr key={sale.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3">
                        <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                          #{sale.id.slice(-6).toUpperCase()}
                        </span>
                        <span className="block text-[11px] text-slate-400">
                          {formatDateTimeBR(sale.created_at)}
                        </span>
                      </td>
                      <td className="py-3 font-medium text-slate-700 dark:text-slate-300">
                        {sale.entidade_nome || 'Consumidor Final'}
                      </td>
                      <td className="py-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {sale.forma_pagamento}
                        </span>
                      </td>
                      <td className="py-3 text-right font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                        {formatCurrency(sale.valor_liquido)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pedidos Delivery & Alertas Estoque */}
        <div className="space-y-6">
          {/* E-Commerce Orders Widget */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-600" />
                <span>Pedidos Delivery E-Commerce</span>
              </h3>
              {pendingOrders.length > 0 && (
                <span className="bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full animate-pulse">
                  {pendingOrders.length} Novos
                </span>
              )}
            </div>

            {ecommerceOrders.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">Nenhum pedido delivery no momento.</p>
            ) : (
              <div className="space-y-3">
                {ecommerceOrders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-slate-800 dark:text-white text-xs">{order.cliente_nome}</p>
                      <p className="text-[11px] text-slate-400">{order.itens.length} itens • {formatCurrency(order.total)}</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('ecommerce')}
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold text-xs hover:bg-emerald-500 transition"
                    >
                      Gerenciar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Low Stock Warning */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Produtos Críticos em Estoque</span>
            </div>
            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-amber-700 dark:text-amber-400">
                ✅ Todos os produtos possuem estoque suficiente!
              </p>
            ) : (
              <div className="space-y-2">
                {lowStockProducts.slice(0, 4).map((p) => (
                  <div key={p.id} className="flex justify-between items-center text-xs">
                    <span className="font-medium text-amber-900 dark:text-amber-200 truncate max-w-[180px]">
                      {p.nome}
                    </span>
                    <span className="font-mono font-bold text-amber-700 dark:text-amber-400">
                      {p.quantidade_estoque} {p.unidade} (Mín: {p.estoque_minimo})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
