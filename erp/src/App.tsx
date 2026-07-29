import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { HeaderBar, SidebarNav } from './components/common/Navigation';
import { LoginModal } from './components/common/LoginModal';
import { DashboardView } from './components/dashboard/DashboardView';
import { POSView } from './components/pdv/POSView';
import { SalesHistoryView } from './components/pdv/SalesHistoryView';
import { InventoryView } from './components/inventory/InventoryView';
import { EntitiesView } from './components/entities/EntitiesView';
import { FinancialView } from './components/financial/FinancialView';
import { EcommerceView } from './components/ecommerce/EcommerceView';
import { DeliveriesView } from './components/deliveries/DeliveriesView';
import { CustomerChatView } from './components/chat/CustomerChatView';
import { SettingsView } from './components/settings/SettingsView';
import { ReportsView } from './components/reports/ReportsView';
import { TutorialView } from './components/tutorial/TutorialView';
import { Lock, ShieldAlert, ArrowLeft } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab, isLoading, currentUser, openLoginModal } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPublicTab = activeTab === 'ecommerce';
  const isAccessRestricted = !isPublicTab && !currentUser;

  const tabNames: Record<string, string> = {
    deliveries: 'Controle de Entregas',
    chat: 'Chat WhatsApp & n8n IA',
    dashboard: 'Visão Geral ERP',
    pdv: 'Frente de Caixa (PDV)',
    sales_history: 'Histórico de Vendas',
    inventory: 'Estoque & Produtos',
    entities: 'Clientes & Fornecedores',
    financial: 'Financeiro & Caixas',
    reports: 'Relatórios & Extratos',
    settings: 'Configurações',
    tutorial: 'Tutorial & GitHub Pages',
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-extrabold text-sm tracking-wider uppercase">Iniciando ERP_ABP Supermercado...</p>
        <p className="text-xs text-slate-400">Carregando banco local IndexedDB e nuvem Supabase</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <HeaderBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="flex flex-1 w-full relative">
        <SidebarNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden min-w-0">
          {isAccessRestricted ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 text-center shadow-xl space-y-6 max-w-lg mx-auto my-12 animate-in zoom-in-95">
              <div className="w-20 h-20 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-md">
                <ShieldAlert className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Acesso Restrito ao Módulo ERP
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  O módulo <strong className="text-slate-900 dark:text-white">{tabNames[activeTab] || activeTab}</strong> é de acesso exclusivo para funcionários autenticados (Admin, Operador de Caixa, Gerente ou Estoquista).
                </p>
              </div>
              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  onClick={openLoginModal}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" /> Entrar com Conta de Funcionário
                </button>
                <button
                  onClick={() => setActiveTab('ecommerce')}
                  className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Voltar para a Loja Virtual (Público)
                </button>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'ecommerce' && <EcommerceView />}
              {activeTab === 'deliveries' && <DeliveriesView />}
              {activeTab === 'chat' && <CustomerChatView />}
              {activeTab === 'dashboard' && <DashboardView />}
              {activeTab === 'pdv' && <POSView />}
              {activeTab === 'sales_history' && <SalesHistoryView />}
              {activeTab === 'inventory' && <InventoryView />}
              {activeTab === 'entities' && <EntitiesView />}
              {activeTab === 'financial' && <FinancialView />}
              {activeTab === 'reports' && <ReportsView />}
              {activeTab === 'settings' && <SettingsView />}
              {activeTab === 'tutorial' && <TutorialView />}
            </>
          )}
        </main>
      </div>

      <LoginModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
