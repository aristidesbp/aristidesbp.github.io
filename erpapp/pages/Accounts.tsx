
import React from 'react';
import { AppView, BankAccount } from '../types';
import Navigation from '../components/Navigation';

interface AccountsProps {
  setView: (view: AppView) => void;
  accounts: BankAccount[];
  onEditAccount: (acc: BankAccount) => void;
}

const Accounts: React.FC<AccountsProps> = ({ setView, accounts, onEditAccount }) => {
  const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display">
      <header className="sticky top-0 z-20 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <span onClick={() => setView('dashboard')} className="material-symbols-outlined text-[#111418] dark:text-white cursor-pointer">arrow_back_ios</span>
          <h2 className="text-[#111418] dark:text-white text-xl font-bold">Patrimônio</h2>
        </div>
        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full">
          <span className="material-symbols-outlined">account_balance_wallet</span>
        </button>
      </header>

      <main className="p-4 space-y-6 pb-32">
        <div className="rounded-3xl shadow-lg shadow-primary/10 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="p-6">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Saldo Consolidado</p>
            <p className="text-primary text-3xl font-extrabold">R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="material-symbols-outlined text-green-500 text-sm">verified</span>
              <p className="text-gray-500 text-xs font-medium">{accounts.length} Instituições financeiras</p>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Suas Contas</h3>
          </div>

          <div className="space-y-3">
            {accounts.length === 0 ? (
               <div className="p-10 text-center bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 text-gray-400">
                 Nenhuma conta vinculada.
               </div>
            ) : accounts.map(acc => (
              <div key={acc.id} onClick={() => onEditAccount(acc)} className="flex items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-3xl ios-shadow border border-gray-50 dark:border-gray-800 active:scale-[0.98] transition-all cursor-pointer group">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center rounded-2xl size-12 shadow-inner" style={{ backgroundColor: acc.color ? acc.color + '20' : '#137fec20' }}>
                    <span className="material-symbols-outlined text-2xl" style={{ color: acc.color || '#137fec' }}>account_balance</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-sm font-bold truncate">{acc.nickname || acc.name}</p>
                    <p className="text-gray-400 text-[11px] font-medium">{acc.type}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-base font-extrabold">R$ {acc.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  <span className="material-symbols-outlined text-gray-200 group-hover:text-primary transition-colors text-lg">arrow_forward</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <button
        onClick={() => onEditAccount({ id: crypto.randomUUID(), name: '', type: 'Conta Corrente', balance: 0, color: '#137fec' } as any)}
        className="fixed bottom-24 right-6 size-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all transform active:scale-95 z-30"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      <Navigation currentView="dashboard" setView={setView} />
    </div>
  );
};

export default Accounts;
