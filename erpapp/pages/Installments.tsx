
import React, { useState } from 'react';
import { AppView, Installment } from '../types';
import Navigation from '../components/Navigation';

interface InstallmentsProps {
  setView: (view: AppView) => void;
  installments: Installment[];
  onEditInstallment: (inst: Installment) => void;
}

const Installments: React.FC<InstallmentsProps> = ({ setView, installments, onEditInstallment }) => {
  const [filter, setFilter] = useState<'Todas' | 'Entradas' | 'Saídas'>('Todas');

  const filtered = installments.filter(inst => {
    if (filter === 'Entradas') return inst.type === 'entrada';
    if (filter === 'Saídas') return inst.type === 'saida';
    return true;
  }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const totalIn = installments.filter(i => i.type === 'entrada').reduce((acc, curr) => acc + curr.amount, 0);
  const totalOut = installments.filter(i => i.type === 'saida').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display">
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span onClick={() => setView('dashboard')} className="material-symbols-outlined text-[#111418] dark:text-white cursor-pointer">arrow_back_ios</span>
            <h1 className="text-xl font-bold tracking-tight">Fluxo de Caixa</h1>
          </div>
          <button className="p-2 text-[#111418] dark:text-white">
            <span className="material-symbols-outlined">calendar_month</span>
          </button>
        </div>
        <div className="flex gap-2 px-4 pb-4 overflow-x-auto hide-scrollbar">
          {(['Todas', 'Entradas', 'Saídas'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex h-9 shrink-0 items-center justify-center rounded-xl px-5 text-xs font-bold transition-all ${
                filter === f 
                ? 'bg-primary text-white shadow-md shadow-primary/20' 
                : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-500'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 pb-48 pt-4">
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-20">receipt_long</span>
              <p>Nenhum lançamento encontrado.</p>
            </div>
          ) : filtered.map(inst => (
            <div
              key={inst.id}
              onClick={() => onEditInstallment(inst)}
              className="flex items-center gap-4 bg-white dark:bg-gray-900 p-3.5 rounded-2xl ios-shadow border border-gray-50 dark:border-gray-800 active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className={`rounded-2xl h-12 w-12 shrink-0 flex items-center justify-center ${
                inst.type === 'entrada' ? 'bg-green-50 dark:bg-green-900/20 text-green-500' : 'bg-red-50 dark:bg-red-900/20 text-red-500'
              }`}>
                <span className="material-symbols-outlined">{inst.type === 'entrada' ? 'trending_up' : 'trending_down'}</span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <p className="text-[#111418] dark:text-white text-sm font-bold leading-tight truncate">{inst.description}</p>
                <p className="text-gray-500 dark:text-gray-400 text-[11px] mt-0.5">Venc: {new Date(inst.dueDate).toLocaleDateString('pt-BR')}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <p className={`text-sm font-extrabold ${inst.type === 'saida' ? 'text-red-500' : 'text-green-600'}`}>
                    {inst.type === 'saida' ? '-' : '+'} R$ {inst.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <div className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase mt-1 ${
                    inst.status === 'pago' ? 'bg-green-100 text-green-700' : 
                    inst.status === 'atrasado' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {inst.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Summary Footer Overlay */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-30 flex gap-2">
        <div className="flex-1 flex flex-col items-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-2.5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl">
          <span className="text-gray-400 text-[9px] font-bold uppercase">Entradas</span>
          <span className="text-green-600 dark:text-green-400 text-sm font-extrabold">R$ {totalIn.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="flex-1 flex flex-col items-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-2.5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl">
          <span className="text-gray-400 text-[9px] font-bold uppercase">Saídas</span>
          <span className="text-red-600 dark:text-red-400 text-sm font-extrabold">R$ {totalOut.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
        <button 
          onClick={() => onEditInstallment({ id: crypto.randomUUID(), description: '', amount: 0, dueDate: new Date().toISOString().split('T')[0], type: 'saida', status: 'pendente', qty: 1, category: '' } as any)}
          className="size-12 bg-primary text-white rounded-2xl shadow-lg flex items-center justify-center active:scale-95 transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-2xl">add</span>
        </button>
      </div>

      <Navigation currentView="installments" setView={setView} />
    </div>
  );
};

export default Installments;
