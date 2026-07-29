import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDateTimeBR } from '../../lib/sanitizer';
import { Sale } from '../../types';
import { ReceiptModal } from '../common/ReceiptModal';
import { Printer, XCircle, Search, History, ShoppingBag } from 'lucide-react';

export const SalesHistoryView: React.FC = () => {
  const { sales, cancelSale, storeConfig } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSaleForReceipt, setSelectedSaleForReceipt] = useState<Sale | null>(null);

  const filteredSales = sales.filter((s) => {
    const idMatch = s.id.toLowerCase().includes(searchTerm.toLowerCase());
    const customerMatch = (s.entidade_nome || '').toLowerCase().includes(searchTerm.toLowerCase());
    return idMatch || customerMatch;
  });

  const handleCancel = async (saleId: string) => {
    if (confirm('Deseja realmente cancelar esta venda? O estoque dos produtos será reeditado automaticamente.')) {
      await cancelSale(saleId);
      alert('Venda cancelada e estoque restaurado com sucesso!');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 dark:text-white text-lg">Histórico de Vendas & Cupons</h2>
            <p className="text-xs text-slate-400">Reimpressão de 2ª via e estornos de cupons emitidos</p>
          </div>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por Código da Venda ou Cliente..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {filteredSales.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="font-bold text-sm">Nenhuma venda encontrada no histórico.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="text-xs uppercase text-slate-400 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800">
                  <th className="p-4">Cupom ID</th>
                  <th className="p-4">Data / Hora</th>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Pagamento</th>
                  <th className="p-4 text-right">Total</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredSales.map((sale) => {
                  const isCanceled = sale.status === 'cancelada';
                  return (
                    <tr
                      key={sale.id}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition ${
                        isCanceled ? 'opacity-50 bg-red-50/20 dark:bg-red-950/10' : ''
                      }`}
                    >
                      <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                        #{sale.id.slice(-6).toUpperCase()}
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300 text-xs">
                        {formatDateTimeBR(sale.created_at)}
                      </td>
                      <td className="p-4 font-medium text-slate-800 dark:text-slate-200">
                        {sale.entidade_nome || 'Consumidor Final'}
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {sale.forma_pagamento}
                        </span>
                      </td>
                      <td className="p-4 text-right font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                        {formatCurrency(sale.valor_liquido)}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            isCanceled
                              ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300'
                              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                          }`}
                        >
                          {isCanceled ? 'CANCELADA' : 'CONCLUÍDA'}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedSaleForReceipt(sale)}
                            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-600 dark:text-slate-300 rounded-xl transition shadow-xs"
                            title="Imprimir 2ª Via do Cupom"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                          {!isCanceled && (
                            <button
                              onClick={() => handleCancel(sale.id)}
                              className="p-2 bg-red-50 dark:bg-red-950/30 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition shadow-xs"
                              title="Cancelar Venda & Reverter Estoque"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Thermal Ticket Receipt Modal */}
      <ReceiptModal
        sale={selectedSaleForReceipt}
        storeConfig={storeConfig}
        isOpen={!!selectedSaleForReceipt}
        onClose={() => setSelectedSaleForReceipt(null)}
      />
    </div>
  );
};
