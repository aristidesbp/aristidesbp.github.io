
import React from 'react';
import { AppView, UserConfig } from '../types';
import Navigation from '../components/Navigation';
import { db } from '../services/db';

interface SettingsProps {
  setView: (view: AppView) => void;
  config: UserConfig;
  onUpdateConfig: (newConfig: Partial<UserConfig>) => void;
  onSave: () => void;
}

const Settings: React.FC<SettingsProps> = ({ setView, config, onUpdateConfig, onSave }) => {

  const handleExport = async () => {
    try {
      const accounts = await db.getAll('accounts');
      const entities = await db.getAll('entities');
      const installments = await db.getAll('installments');
      const data = { accounts, entities, installments, exportDate: new Date().toISOString() };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nexus_backup_${new Date().getTime()}.json`;
      a.click();
    } catch (err) {
      alert('Erro ao exportar dados');
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.accounts) for (const acc of data.accounts) await db.put('accounts', acc);
        if (data.entities) for (const ent of data.entities) await db.put('entities', ent);
        if (data.installments) for (const inst of data.installments) await db.put('installments', inst);
        
        alert('Dados importados com sucesso!');
        onSave();
      } catch (err) {
        alert('Erro ao processar arquivo de backup.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display">
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span onClick={() => setView('dashboard')} className="material-symbols-outlined text-[#111418] dark:text-white cursor-pointer">arrow_back_ios</span>
            <h1 className="text-xl font-bold">Configurações</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-[10px] font-bold text-green-600 dark:text-green-400">CONECTADO</span>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-8 pb-32">
        <section className="space-y-3">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">MANUTENÇÃO DE DADOS</h2>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-50 dark:border-gray-800 ios-shadow flex flex-col gap-3">
            <label className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-semibold cursor-pointer active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-xl">upload_file</span>
              Importar JSON
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
            <button
              onClick={handleExport}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-semibold active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-xl">download_for_offline</span>
              Exportar JSON
            </button>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">CONFIGURAÇÃO SUPABASE</h2>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-50 dark:border-gray-800 ios-shadow space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide ml-1">URL Supabase</label>
              <input
                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 py-3 text-sm"
                placeholder="https://xyz.supabase.co"
                value={config.supabaseUrl}
                onChange={e => onUpdateConfig({ supabaseUrl: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide ml-1">Anon Key</label>
              <input
                type="password"
                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 py-3 text-sm"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={config.supabaseAnonKey}
                onChange={e => onUpdateConfig({ supabaseAnonKey: e.target.value })}
              />
            </div>
            <button className="w-full bg-primary text-white font-bold py-3.5 rounded-xl active:scale-95 transition-transform mt-2">
              Sincronizar Agora
            </button>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">PREFERÊNCIAS</h2>
          <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-50 dark:border-gray-800 ios-shadow divide-y divide-gray-100 dark:divide-gray-800">
            <div onClick={() => setView('tutorial')} className="flex items-center justify-between p-4 active:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">help</span>
                </div>
                <span className="text-base font-medium">Tutorial Supabase</span>
              </div>
              <span className="material-symbols-outlined text-gray-400">chevron_right</span>
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-orange-500 text-xl">dark_mode</span>
                </div>
                <span className="text-base font-medium">Modo Escuro</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={config.darkMode}
                  onChange={e => onUpdateConfig({ darkMode: e.target.checked })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        <div className="text-center pt-4 pb-10">
           <p className="text-[11px] text-gray-400 uppercase tracking-tight">
             Nexus Finance Manager v2.4.0 (Build 102)<br/>
             Desenvolvedor: Aristides B Pontes
           </p>
        </div>
      </main>

      <Navigation currentView="settings" setView={setView} />
    </div>
  );
};

export default Settings;
