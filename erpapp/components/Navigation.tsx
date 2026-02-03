
import React from 'react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const items = [
    { id: 'dashboard', icon: 'home', label: 'Início' },
    { id: 'installments', icon: 'receipt_long', label: 'Fluxo' },
    { id: 'entities', icon: 'groups', label: 'Pessoas' },
    { id: 'accounts', icon: 'wallet', label: 'Contas' },
    { id: 'settings', icon: 'settings', label: 'Ajustes' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[440px] h-18 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-[32px] border border-white/20 dark:border-gray-800 shadow-2xl flex items-center justify-around px-2 z-[100] ios-shadow">
      {items.map((item) => {
        const isActive = currentView === item.id || (item.id === 'installments' && currentView === 'installment-form') || (item.id === 'accounts' && currentView === 'account-form') || (item.id === 'entities' && currentView === 'entity-form');
        return (
          <button
            key={item.id}
            onClick={() => setView(item.id as AppView)}
            className={`flex flex-col items-center justify-center gap-1 size-14 rounded-2xl transition-all active:scale-90 ${
              isActive ? 'text-primary bg-primary/5' : 'text-gray-400'
            }`}
          >
            <span className={`material-symbols-outlined text-[24px] ${isActive ? 'fill-[1]' : ''}`}>
              {item.icon}
            </span>
            <span className="text-[9px] font-black uppercase tracking-tighter">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;
