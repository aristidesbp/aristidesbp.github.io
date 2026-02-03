
import React from 'react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const items = [
    { id: 'login', icon: 'logout', label: 'Sair' },
    { id: 'entities', icon: 'group', label: 'Entidades' },
    { id: 'installments', icon: 'payments', label: 'Parcelas' },
    { id: 'dashboard', icon: 'dashboard', label: 'Painel' },
    { id: 'settings', icon: 'settings', label: 'Ajustes' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 h-20 flex items-center justify-between px-2 z-50 pb-safe">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id as AppView)}
          className={`flex flex-1 flex-col items-center gap-1 transition-all active:scale-95 ${
            currentView === item.id ? 'text-primary' : 'text-gray-400'
          }`}
        >
          <span className={`material-symbols-outlined ${currentView === item.id ? 'fill-[1]' : ''}`}>
            {item.icon}
          </span>
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
