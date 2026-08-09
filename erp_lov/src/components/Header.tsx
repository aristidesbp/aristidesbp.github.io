import React from 'react';
import { Search, Moon, Sun, Bell, Menu, User, LogOut } from 'lucide-react';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  userEmail?: string;
  userName?: string;
  userAvatar?: string;
  onLogout: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeTabTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileSidebar,
  isDarkMode,
  onToggleDarkMode,
  userEmail = 'admin@erpabp.com',
  userName = 'Aristides BP',
  userAvatar,
  onLogout,
  searchTerm,
  onSearchChange,
  activeTabTitle
}) => {
  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-260px)] z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-20 px-4 sm:px-8 transition-all flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
          title="Menu Mobile"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h2 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>ERP_ABP</span>
            <span className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              {activeTabTitle}
            </span>
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        {/* Global Search */}
        <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-200/80 dark:border-slate-700/80 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
          <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Busca Global (produtos, clientes...)"
            className="bg-transparent border-none outline-none text-xs text-slate-800 dark:text-white placeholder:text-slate-400 w-48 lg:w-64"
          />
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDarkMode}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            title="Alternar Tema"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            title="Notificações"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
          </button>

          {/* User Account Capsule */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold flex items-center justify-center border border-emerald-500/20 overflow-hidden shrink-0">
              {userAvatar ? (
                <img src={userAvatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[120px]">
                {userName}
              </p>
              <p className="text-[10px] text-slate-400 truncate max-w-[120px]">{userEmail}</p>
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition"
              title="Sair da conta"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
