
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
  const [editingItem, setEditingItem] = useState<any>(null);

  const loadData = useCallback(async () => {
    try {
      await db.init();
      const loadedConfig = await db.getConfig();
      if (loadedConfig) setConfig(prev => ({ ...prev, ...loadedConfig }));

      const [accs, ents, insts] = await Promise.all([
        db.getAll<BankAccount>('accounts'),
        db.getAll<Entity>('entities'),
        db.getAll<Installment>('installments')
      ]);

      setAccounts(accs);
      setEntities(ents);
      setInstallments(insts);
      setIsReady(true);
    } catch (error) {
      console.error("Falha ao inicializar banco local:", error);
      setIsReady(true);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', config.darkMode);
  }, [config.darkMode]);

  // Atualiza o título da aba do navegador dinamicamente
  useEffect(() => {
    const titles: Record<string, string> = {
      dashboard: 'Início | Nexus',
      entities: 'Pessoas | Nexus',
      installments: 'Fluxo | Nexus',
      accounts: 'Contas | Nexus',
      settings: 'Ajustes | Nexus',
      login: 'Login | Nexus'
    };
    document.title = titles[view] || 'Nexus Finance Manager';
  }, [view]);

  const handleNavigate = (newView: AppView, item: any = null) => {
    setEditingItem(item);
    setView(newView);
    window.scrollTo(0, 0);
  };

  const updateConfig = async (newConfig: Partial<UserConfig>) => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);
    await db.setConfig(updated);
  };

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="size-16 border-[3px] border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-xl">account_balance_wallet</span>
            </div>
          </div>
          <p className="text-primary font-bold tracking-[0.3em] text-[10px] uppercase animate-pulse">Sincronizando Nexus</p>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (view) {
      case 'login': return <Login onLogin={() => handleNavigate(config.termsAccepted ? 'dashboard' : 'terms')} />;
      case 'terms': return <Terms onAccept={async () => { await updateConfig({ termsAccepted: true }); handleNavigate('dashboard'); }} onRefuse={() => handleNavigate('login')} />;
      case 'dashboard': return <Dashboard setView={handleNavigate} accounts={accounts} installments={installments} />;
      case 'entities': return <Entities setView={handleNavigate} entities={entities} onEditEntity={(ent) => handleNavigate('entity-form', ent)} />;
      case 'entity-form': return <EntityForm setView={handleNavigate} onSave={loadData} initialData={editingItem} />;
      case 'installments': return <Installments setView={handleNavigate} installments={installments} onEditInstallment={(inst) => handleNavigate('installment-form', inst)} />;
      case 'installment-form': return <InstallmentForm setView={handleNavigate} onSave={loadData} entities={entities} initialData={editingItem} />;
      case 'accounts': return <Accounts setView={handleNavigate} accounts={accounts} onEditAccount={(acc) => handleNavigate('account-form', acc)} />;
      case 'account-form': return <AccountForm setView={handleNavigate} onSave={loadData} initialData={editingItem} />;
      case 'settings': return <Settings setView={handleNavigate} config={config} onUpdateConfig={updateConfig} onSave={loadData} />;
      case 'tutorial': return <Tutorial setView={handleNavigate} />;
      default: return <Dashboard setView={handleNavigate} accounts={accounts} installments={installments} />;
    }
  };

  return (
    <div className="max-w-[480px] mx-auto min-h-screen shadow-2xl relative overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors duration-300">
      {renderView()}
    </div>
  );
};

export default App;
