import React from 'react';
import { LayoutDashboard, Users, Package, DollarSign, ShoppingCart, Settings, X, ShieldCheck, BookOpen } from 'lucide-react';

export type ActiveTab = 'bem_vindo' | 'entidades' | 'estoque' | 'financeiro' | 'pdv' | 'configuracoes' | 'documentacao';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile
}) => {
  const menuItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'bem_vindo', label: 'Início & Visão Geral', icon: LayoutDashboard },
    { id: 'pdv', label: 'Frente de Caixa (PDV)', icon: ShoppingCart, badge: 'PDV' },
    { id: 'estoque', label: 'Estoque & Produtos', icon: Package },
    { id: 'financeiro', label: 'Controle Financeiro', icon: DollarSign },
    { id: 'entidades', label: 'Entidades & Clientes', icon: Users },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
    { id: 'documentacao', label: 'Documentação do Sistema', icon: BookOpen, badge: 'DOCS' }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <aside
        className={`fixed h-full w-[260px] left-0 top-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col py-6 z-[60] transition-transform duration-300 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header Branding */}
        <div className="px-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg text-slate-900 dark:text-white leading-none">
                ERP_ABP
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400 mt-1 block">
                Gestão & Marketplace
              </span>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] uppercase font-extrabold tracking-wider text-slate-400 mb-2">
            Módulos do Sistema
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 group ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                  }`}
                />
                <span className="truncate flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="px-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 space-y-1">
          <p className="font-bold text-slate-700 dark:text-slate-300">ERP_ABP v2.5</p>
          <p>Dev: Aristides BP</p>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            Supabase Synchronized
          </p>
        </div>
      </aside>
    </>
  );
};
