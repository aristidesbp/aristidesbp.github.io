
import React from 'react';
import { AppView, BankAccount, Installment } from '../types';
import Navigation from '../components/Navigation';

interface DashboardProps {
  setView: (view: AppView) => void;
  accounts: BankAccount[];
  installments: Installment[];
  onEditInstallment: (inst: Installment) => void;
  onEditAccount: (acc: BankAccount) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView, accounts, installments, onEditInstallment, onEditAccount }) => {
  const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);
  const pendingInstallments = installments.filter(i => i.status === 'pendente' || i.status === 'atrasado');
  
  const totalIn = installments.filter(i => i.type === 'entrada' && i.status === 'pago').reduce((acc, curr) => acc + curr.amount, 0);
  const totalOut = installments.filter(i => i.type === 'saida' && i.status === 'pago').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-28 font-display">
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">NEXUS ERP</span>
            <h1 className="text-xl font-bold tracking-tight">Painel Geral</h1>
          </div>
          <button className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full">
            <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">notifications</span>
          </button>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Total Balance Card */}
        <div className="bg-primary p-6 rounded-3xl shadow-lg shadow-primary/20 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-7xl">payments</span>
          </div>
          <p className="text-white/80 text-sm font-medium mb-1">Saldo Total Disponível</p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold opacity-80">R$</span>
            <h2 className="text-3xl font-bold tracking-tight">
              {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h2>
          </div>
          <div className="mt-4 flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full border border-white/10">
            <span className="material-symbols-outlined text-xs">account_balance_wallet</span>
            <span className="text-xs font-medium">{accounts.length} Contas conectadas</span>
          </div>
        </div>

        {/* Bank Accounts Row */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Minhas Contas</h3>
            <button onClick={() => setView('accounts')} className="text-xs font-bold text-primary">VER TODAS</button>
          </div>
          <div className="flex overflow-x-auto gap-3 hide-scrollbar pb-2">
            <div onClick={() => { onEditAccount({ id: crypto.randomUUID(), name: '', type: 'Conta Corrente', balance: 0, color: '#137fec' } as any); }} className="flex-none w-32 bg-dashed bg-white dark:bg-gray-900 p-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all">
                <span className="material-symbols-outlined text-gray-400">add</span>
                <span className="text-[10px] font-bold text-gray-400">NOVA</span>
            </div>
            {accounts.map(acc => (
              <div key={acc.id} onClick={() => onEditAccount(acc)} className="flex-none w-40 bg-white dark:bg-gray-900 p-4 rounded-2xl ios-shadow border border-gray-50 dark:border-gray-800 active:scale-95 transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center`} style={{ backgroundColor: acc.color || '#137fec' }}>
                    <span className="material-symbols-outlined text-lg text-white">account_balance</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase truncate">{acc.name}</span>
                </div>
                <p className="text-sm font-bold truncate">R$ {acc.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mini Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl ios-shadow border border-gray-50 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-lg">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-xl">arrow_downward</span>
              </div>
              <p className="text-xs font-semibold text-gray-500">Ganhos (Mês)</p>
            </div>
            <p className="text-lg font-bold text-green-600">R$ {totalIn.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl ios-shadow border border-gray-50 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-red-100 dark:bg-red-900/30 p-1.5 rounded-lg">
                <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-xl">arrow_upward</span>
              </div>
              <p className="text-xs font-semibold text-gray-500">Gastos (Mês)</p>
            </div>
            <p className="text-lg font-bold text-red-600">R$ {totalOut.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Upcoming Payments */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-bold">Próximos Vencimentos</h3>
            <button onClick={() => setView('installments')} className="text-sm font-semibold text-primary">Ver todos</button>
          </div>
          <div className="space-y-2">
            {pendingInstallments.length === 0 ? (
              <div className="text-center py-10 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                <span className="material-symbols-outlined text-gray-300 text-4xl mb-2">check_circle</span>
                <p className="text-gray-400 text-sm">Tudo em dia!</p>
              </div>
            ) : pendingInstallments.slice(0, 5).map(inst => (
              <div key={inst.id} onClick={() => onEditInstallment(inst)} className="flex items-center gap-4 bg-white dark:bg-gray-900 p-3.5 rounded-2xl ios-shadow border border-gray-50 dark:border-gray-800 active:scale-[0.98] transition-all cursor-pointer">
                <div className={`rounded-full h-11 w-11 shrink-0 flex items-center justify-center ${inst.type === 'entrada' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                  <span className="material-symbols-outlined">{inst.type === 'entrada' ? 'add_circle' : 'remove_circle'}</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{inst.description}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-normal">Vence em {new Date(inst.dueDate).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${inst.type === 'saida' ? 'text-red-500' : 'text-green-500'}`}>
                    R$ {inst.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    inst.status === 'atrasado' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {inst.status}
                  </span>
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
