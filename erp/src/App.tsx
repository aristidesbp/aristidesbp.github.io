import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navigation } from './components/common/Navigation';
import { DashboardView } from './components/dashboard/DashboardView';
import { POSView } from './components/pdv/POSView';
import { SalesHistoryView } from './components/pdv/SalesHistoryView';
import { InventoryView } from './components/inventory/InventoryView';
import { EntitiesView } from './components/entities/EntitiesView';
import { FinancialView } from './components/financial/FinancialView';
import { EcommerceView } from './components/ecommerce/EcommerceView';
import { SettingsView } from './components/settings/SettingsView';
import { TutorialView } from './components/tutorial/TutorialView';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab, isLoading } = useApp();

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
      <div className="flex-1 flex flex-col lg:flex-row">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'pdv' && <POSView />}
          {activeTab === 'sales_history' && <SalesHistoryView />}
          {activeTab === 'inventory' && <InventoryView />}
          {activeTab === 'entities' && <EntitiesView />}
          {activeTab === 'financial' && <FinancialView />}
          {activeTab === 'ecommerce' && <EcommerceView />}
          {activeTab === 'settings' && <SettingsView />}
          {activeTab === 'tutorial' && <TutorialView />}
        </main>
      </div>
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
