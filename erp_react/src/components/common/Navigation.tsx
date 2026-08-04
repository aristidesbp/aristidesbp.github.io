import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ROLE_TAB_PERMISSIONS } from '../../types';
import {
  LayoutDashboard,
  ShoppingCart,
  History,
  Package,
  Users,
  DollarSign,
  Store,
  Truck,
  Settings,
  Wifi,
  WifiOff,
  RefreshCw,
  Moon,
  Sun,
  Menu,
  X,
  Building2,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
  Lock,
  MessageSquare,
  FileText,
} from 'lucide-react';

export interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
}

export const HeaderBar: React.FC<
  NavigationProps & {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
  }
> = ({
  isCollapsed,
  setIsCollapsed,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const {
    isOnline,
    syncPendingCount,
    triggerSync,
    storeConfig,
    currentUser,
    openLoginModal,
    logoutStaff,
  } = useApp();

  const [isSyncing, setIsSyncing] = useState(false);
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setDarkMode(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  const handleSyncClick = async () => {
    setIsSyncing(true);
    try {
      const res = await triggerSync();
      if (res.synced > 0) {
        alert(`Sincronização concluída! ${res.synced} registro(s) enviados para a nuvem.`);
      } else {
        alert('O banco de dados local já está atualizado!');
      }
    } catch {
      alert('Erro durante a sincronização. O sistema continuará operando offline.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 transition-colors shrink-0">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Abrir Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-slate-200 dark:border-slate-700"
            title={isCollapsed ? 'Expandir Menu' : 'Recolher Menu'}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          {/* Store Brand Header */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black shadow-md shadow-emerald-600/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                {storeConfig.store_name}
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Gestão ERP & Delivery Supermercado
              </p>
            </div>
          </div>
        </div>

        {/* Right Header Status Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Online / Offline Status Badge */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-xs ${
              isOnline
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                <span className="hidden md:inline">Supabase Online</span>
                <span className="md:hidden">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                <span>Modo Offline</span>
              </>
            )}
          </div>

          {/* Sync Pending Trigger */}
          {syncPendingCount > 0 && (
            <button
              onClick={handleSyncClick}
              disabled={isSyncing}
              className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-2.5 py-1 rounded-full text-xs transition shadow animate-bounce"
              title="Sincronizar Dados"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{syncPendingCount}</span>
            </button>
          )}

          {/* Employee Login / Profile Status */}
          {currentUser ? (
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 pl-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="text-left hidden sm:block">
                <p className="font-extrabold text-xs text-slate-900 dark:text-white leading-tight">
                  {currentUser.name}
                </p>
                <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  {currentUser.role}
                </p>
              </div>
              <button
                onClick={logoutStaff}
                className="p-1.5 hover:bg-red-100 dark:hover:bg-red-950/50 text-red-600 dark:text-red-400 rounded-lg transition"
                title="Sair do Sistema"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Entrar / Login ERP</span>
              <span className="sm:hidden">Login</span>
            </button>
          )}

          {/* Dark Mode Switcher */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            title="Alternar Tema Escuro/Claro"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export const SidebarNav: React.FC<
  NavigationProps & {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
  }
> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const { currentUser, openLoginModal } = useApp();

  const publicNavItems = [
    { id: 'ecommerce', label: 'Loja Virtual & Delivery', icon: Store, requiresAuth: false },
  ];

  const allAdminNavItems = [
    { id: 'deliveries', label: 'Controle de Entregas', icon: Truck, requiresAuth: true },
    { id: 'chat', label: 'Chat WhatsApp & n8n IA', icon: MessageSquare, requiresAuth: true },
    { id: 'dashboard', label: 'Visão Geral ERP', icon: LayoutDashboard, requiresAuth: true },
    { id: 'pdv', label: 'Frente de Caixa (PDV)', icon: ShoppingCart, requiresAuth: true },
    { id: 'sales_history', label: 'Histórico de Vendas', icon: History, requiresAuth: true },
    { id: 'inventory', label: 'Estoque & Produtos', icon: Package, requiresAuth: true },
    { id: 'entities', label: 'Clientes & Fornecedores', icon: Users, requiresAuth: true },
    { id: 'financial', label: 'Financeiro & Caixas', icon: DollarSign, requiresAuth: true },
    { id: 'reports', label: 'Relatórios & Extratos', icon: FileText, requiresAuth: true },
    { id: 'settings', label: 'Configurações', icon: Settings, requiresAuth: true },
    { id: 'tutorial', label: 'Tutorial & Manual SaaS', icon: BookOpen, requiresAuth: true },
  ];

  const allowedTabs = currentUser
    ? ROLE_TAB_PERMISSIONS[currentUser.role] || []
    : ['deliveries', 'chat', 'dashboard', 'pdv', 'sales_history', 'inventory', 'entities', 'financial', 'reports', 'settings', 'tutorial'];

  const adminNavItems = allAdminNavItems.filter((item) => allowedTabs.includes(item.id));

  const handleNavItemClick = (item: { id: string; requiresAuth?: boolean }) => {
    if (item.requiresAuth && !currentUser) {
      setActiveTab(item.id);
      openLoginModal();
    } else {
      setActiveTab(item.id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navigation Overlay for Mobile */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Collapsible Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-14 left-0 z-40 h-[calc(100vh-3.5rem)] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300 shrink-0 ${
          mobileMenuOpen
            ? 'translate-x-0 w-64'
            : `-translate-x-full lg:translate-x-0 ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}`
        }`}
      >
        {/* Mobile Header in Drawer */}
        <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between lg:hidden">
          <span className="font-bold text-xs text-slate-800 dark:text-white uppercase tracking-wider">
            Menu ERP_ABP
          </span>
          <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card inside Sidebar (Expanded mode) */}
        {!isCollapsed && (
          <div className="p-3 m-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">
              {currentUser ? currentUser.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                {currentUser ? currentUser.name : 'Visitante'}
              </p>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                {currentUser ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold uppercase">{currentUser.role}</span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400">Modo Público (Sem Login)</span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 p-2 space-y-4 overflow-y-auto">
          {/* Public Storefront Section */}
          <div>
            {!isCollapsed && (
              <p className="px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Loja Virtual (Público)
              </p>
            )}
            <div className="space-y-1">
              {publicNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavItemClick(item)}
                    title={item.label}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs transition-all ${
                      isCollapsed ? 'justify-center px-0' : ''
                    } ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    {!isCollapsed && <span className="truncate flex-1 text-left">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ERP Admin Section */}
          <div>
            {!isCollapsed && (
              <div className="px-3 pb-1.5 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <span>Área Administrativa ERP</span>
                {!currentUser && <Lock className="w-3 h-3 text-amber-500" />}
              </div>
            )}
            <div className="space-y-1">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const isLocked = item.requiresAuth && !currentUser;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavItemClick(item)}
                    title={item.label + (isLocked ? ' (Requer Login)' : '')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs transition-all relative ${
                      isCollapsed ? 'justify-center px-0' : ''
                    } ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    {!isCollapsed && (
                      <>
                        <span className="truncate flex-1 text-left">{item.label}</span>
                        {isLocked && (
                          <Lock className="w-3.5 h-3.5 text-amber-500 opacity-80 shrink-0" />
                        )}
                      </>
                    )}
                    {isCollapsed && isLocked && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Footer info box */}
        {!isCollapsed && (
          <div className="p-3 m-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-400">
            <p className="font-bold text-slate-700 dark:text-slate-300">ERP_ABP v3.0 Pro</p>
            <p className="text-[10px]">Banco: IndexedDB + Supabase</p>
          </div>
        )}
      </aside>
    </>
  );
};

export const Navigation: React.FC<NavigationProps> = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <HeaderBar {...props} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <SidebarNav {...props} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
    </>
  );
};
