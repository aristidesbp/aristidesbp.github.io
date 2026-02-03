
import React, { useState, useEffect, useCallback } from 'react';
import { db } from './services/db';
import { AppView, UserConfig, BankAccount, Entity, Installment } from './types';
import Login from './pages/Login';
import Terms from './pages/Terms';
import Dashboard from './pages/Dashboard';
import Entities from './pages/Entities';
import EntityForm from './pages/EntityForm';
import Installments from './pages/Installments';
import InstallmentForm from './pages/InstallmentForm';
import Accounts from './pages/Accounts';
import AccountForm from './pages/AccountForm';
import Settings from './pages/Settings';
import Tutorial from './pages/Tutorial';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('login');
  const [isReady, setIsReady] = useState(false);
  const [config, setConfig] = useState<UserConfig>({
    supabaseUrl: '',
    supabaseAnonKey: '',
    darkMode: false,
    autoSync: true,
    language: 'pt-BR',
    termsAccepted: false
  });

  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [installments, setInstallments] = useState<Installment[]>([]);

  const [editingAccount, setEditingAccount] = useState<BankAccount | undefined>();
  const [editingEntity, setEditingEntity] = useState<Entity | undefined>();
  const [editingInstallment, setEditingInstallment] = useState<Installment | undefined>();

  const loadData = useCallback(async () => {
    try {
      await db.init();
      const loadedConfig = await db.getConfig();
      if (loadedConfig) setConfig(prev => ({ ...prev, ...loadedConfig }));

      const [loadedAccounts, loadedEntities, loadedInstallments] = await Promise.all([
        db.getAll<BankAccount>('accounts'),
        db.getAll<Entity>('entities'),
        db.getAll<Installment>('installments')
      ]);

      setAccounts(loadedAccounts);
      setEntities(loadedEntities);
      setInstallments(loadedInstallments);
      setIsReady(true);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setIsReady(true);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', config.darkMode);
  }, [config.darkMode]);

  const updateConfig = async (newConfig: Partial<UserConfig>) => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);
    await db.setConfig(updated);
  };

  const handleNavigate = (newView: AppView) => {
    // Reset editing states when changing views normally
    if (!newView.includes('-form')) {
      setEditingAccount(undefined);
      setEditingEntity(undefined);
      setEditingInstallment(undefined);
    }
    setView(newView);
  };

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-primary font-bold tracking-widest text-xs uppercase">Carregando Nexus...</p>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (view) {
      case 'login': return <Login onLogin={() => handleNavigate(config.termsAccepted ? 'dashboard' : 'terms')} />;
      case 'terms': return <Terms onAccept={async () => { await updateConfig({ termsAccepted: true }); handleNavigate('dashboard'); }} onRefuse={() => handleNavigate('login')} />;
      case 'dashboard': return <Dashboard 
        setView={handleNavigate} 
        accounts={accounts} 
        installments={installments} 
        onEditInstallment={(i) => { setEditingInstallment(i); setView('installment-form'); }}
        onEditAccount={(a) => { setEditingAccount(a); setView('account-form'); }}
      />;
      case 'entities': return <Entities 
        setView={handleNavigate} 
        entities={entities} 
        onEditEntity={(e) => { setEditingEntity(e); setView('entity-form'); }} 
      />;
      case 'entity-form': return <EntityForm setView={handleNavigate} onSave={loadData} initialData={editingEntity} />;
      case 'installments': return <Installments 
        setView={handleNavigate} 
        installments={installments} 
        onEditInstallment={(i) => { setEditingInstallment(i); setView('installment-form'); }} 
      />;
      case 'installment-form': return <InstallmentForm setView={handleNavigate} onSave={loadData} entities={entities} initialData={editingInstallment} />;
      case 'accounts': return <Accounts 
        setView={handleNavigate} 
        accounts={accounts} 
        onEditAccount={(a) => { setEditingAccount(a); setView('account-form'); }} 
      />;
      case 'account-form': return <AccountForm setView={handleNavigate} onSave={loadData} initialData={editingAccount} />;
      case 'settings': return <Settings setView={handleNavigate} config={config} onUpdateConfig={updateConfig} onSave={loadData} />;
      case 'tutorial': return <Tutorial setView={handleNavigate} />;
      default: return <Dashboard setView={handleNavigate} accounts={accounts} installments={installments} onEditInstallment={() => {}} onEditAccount={() => {}} />;
    }
  };

  return (
    <div className="max-w-[480px] mx-auto min-h-screen shadow-2xl relative overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors duration-300">
      {renderView()}
    </div>
  );
};

export default App;
