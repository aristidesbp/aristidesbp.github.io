
import React from 'react';
import { AppView, BankAccount, Installment } from '../types';
import Navigation from '../components/Navigation';

interface DashboardProps {
  setView: (view: AppView, item?: any) => void;
  accounts: BankAccount[];
  installments: Installment[];
}

const Dashboard: React.FC<DashboardProps> = ({ setView, accounts, installments }) => {
  const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);
  const pending = installments.filter(i => i.status !== 'pago');
  
  const totalIn = installments.filter(i => i.type === 'entrada' && i.status === 'pago').reduce((acc, curr) => acc + curr.amount, 0);
  const totalOut = installments.filter(i => i.type === 'saida' && i.status === 'pago').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-28 font-display">
      <header className="px-4 py-6 flex justify-between items-center">
        <div>
          <p className="text-[10px] font-extrabold text-primary uppercase tracking-[0.2em]">Nexus Finance</p>
          <h1 className="text-2xl font-black tracking-tight">Painel</h1>
        </div>
        <button onClick={() => setView('settings')} className="size-10 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-sm">
          <span className="material-symbols-outlined text-gray-400">person</span>
        </button>
      </header>

      <main className="px-4 space-y-6">
        {/* Card de Saldo */}
        <div className="bg-primary p-7 rounded-[32px] text-white shadow-xl shadow-primary/20 relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] size-40 bg-white/10 rounded-full blur-2xl"></div>
          <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">Patrimônio Líquido</p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold opacity-70">R$</span>
            <h2 className="text-4xl font-black tracking-tight">
              {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h2>
          </div>
          <div className="mt-6 flex gap-2">
            <button onClick={() => setView('account-form')} className="flex-1 bg-white/20 hover:bg-white/30 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all">Nova Conta</button>
            <button onClick={() => setView('installment-form')} className="flex-1 bg-white/20 hover:bg-white/30 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all">Novo Lançamento</button>
          </div>
        </div>

        {/* Mini Gráfico/Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl ios-shadow border border-gray-50 dark:border-gray-800">
            <div className="bg-green-100 dark:bg-green-900/20 size-8 rounded-full flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-lg">trending_up</span>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Receitas</p>
            <p className="text-lg font-black text-green-600">R$ {totalIn.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl ios-shadow border border-gray-50 dark:border-gray-800">
            <div className="bg-red-100 dark:bg-red-900/20 size-8 rounded-full flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-lg">trending_down</span>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Despesas</p>
            <p className="text-lg font-black text-red-600">R$ {totalOut.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Contas Rápidas */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest">Instituições</h3>
            <button onClick={() => setView('accounts')} className="text-xs font-bold text-primary">Ver Tudo</button>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {accounts.length === 0 ? (
               <div onClick={() => setView('account-form')} className="flex-none w-36 h-24 bg-dashed border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl flex flex-col items-center justify-center gap-1 cursor-pointer">
                 <span className="material-symbols-outlined text-gray-300">add</span>
                 <span className="text-[9px] font-bold text-gray-400">ADICIONAR</span>
               </div>
            ) : accounts.map(acc => (
              <div key={acc.id} onClick={() => setView('account-form', acc)} className="flex-none w-44 bg-white dark:bg-gray-900 p-4 rounded-3xl shadow-sm border border-gray-50 dark:border-gray-800 active:scale-95 transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-7 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-sm">account_balance</span>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase truncate text-gray-400">{acc.nickname || acc.name}</span>
                </div>
                <p className="text-md font-black">R$ {acc.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Próximas Contas */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest">Agenda Financeira</h3>
          </div>
          <div className="space-y-3">
            {pending.length === 0 ? (
              <div className="py-10 text-center bg-white dark:bg-gray-900 rounded-[32px] border border-gray-50 dark:border-gray-800">
                <span className="material-symbols-outlined text-gray-200 text-5xl mb-2">verified</span>
                <p className="text-gray-400 text-sm font-medium">Nenhuma pendência hoje.</p>
              </div>
            ) : pending.slice(0, 5).map(inst => (
              <div key={inst.id} onClick={() => setView('installment-form', inst)} className="bg-white dark:bg-gray-900 p-4 rounded-3xl flex items-center gap-4 ios-shadow border border-gray-50 dark:border-gray-800 active:bg-gray-50 dark:active:bg-gray-800 transition-all cursor-pointer">
                <div className={`size-12 rounded-2xl flex items-center justify-center ${inst.type === 'entrada' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                  <span className="material-symbols-outlined">{inst.type === 'entrada' ? 'keyboard_double_arrow_up' : 'keyboard_double_arrow_down'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{inst.description}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Vence em {new Date(inst.dueDate).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-black ${inst.type === 'saida' ? 'text-red-500' : 'text-green-600'}`}>
                    R$ {inst.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Navigation currentView="dashboard" setView={setView} />
    </div>
  );
};

export default Dashboard;
