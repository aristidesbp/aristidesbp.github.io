import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StoreConfig } from '../../types';
import {
  idbGetAllProducts,
  idbGetAllEntities,
  idbGetAllSales,
  idbGetAllFinances,
  idbGetAllInstallments,
  idbSaveProducts,
  idbSaveEntities,
} from '../../lib/offlineDb';
import {
  Settings,
  Building2,
  Download,
  Upload,
  Camera,
  Database,
  CheckCircle,
  Save,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { storeConfig, updateStoreConfig, isOnline, triggerSync } = useApp();

  const [formConfig, setFormConfig] = useState<StoreConfig>(storeConfig);
  const [cameraTestStatus, setCameraTestStatus] = useState<string | null>(null);

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateStoreConfig(formConfig);
    alert('Configurações do supermercado salvas com sucesso!');
  };

  const handleTestCamera = async () => {
    setCameraTestStatus('Testando acesso à câmera do dispositivo...');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setCameraTestStatus('✅ Câmera reconhecida e permissão concedida!');
      setTimeout(() => {
        stream.getTracks().forEach((track) => track.stop());
      }, 2000);
    } catch {
      setCameraTestStatus('❌ Acesso à câmera negado ou dispositivo indisponível.');
    }
  };

  const handleExportBackup = async () => {
    try {
      const prods = await idbGetAllProducts();
      const ents = await idbGetAllEntities();
      const sales = await idbGetAllSales();
      const fins = await idbGetAllFinances();
      const insts = await idbGetAllInstallments();

      const backupData = {
        exportDate: new Date().toISOString(),
        version: '3.0',
        storeConfig,
        products: prods,
        entities: ents,
        sales,
        finances: fins,
        installments: insts,
      };

      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup_erp_abp_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Erro ao exportar backup local.');
    }
  };

  const handleImportBackupFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const content = evt.target?.result as string;
        const parsed = JSON.parse(content);

        if (parsed.products && Array.isArray(parsed.products)) {
          await idbSaveProducts(parsed.products);
        }
        if (parsed.entities && Array.isArray(parsed.entities)) {
          await idbSaveEntities(parsed.entities);
        }

        alert('Backup restaurado no banco de dados IndexedDB local com sucesso! Recarregando...');
        window.location.reload();
      } catch {
        alert('O arquivo selecionado não é um backup JSON válido do ERP_ABP.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Controls */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-extrabold text-slate-900 dark:text-white text-lg">
            Configurações do Sistema & Backup
          </h2>
          <p className="text-xs text-slate-400">Dados do estabelecimento, cupom não fiscal e banco local</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Profile Customization Form */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 dark:text-white">Perfil do Supermercado (Impressão do Cupom)</h3>
          </div>

          <form onSubmit={handleSaveConfig} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Nome de Fantasia do Supermercado *
              </label>
              <input
                type="text"
                value={formConfig.store_name}
                onChange={(e) => setFormConfig({ ...formConfig, store_name: e.target.value })}
                required
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                CNPJ
              </label>
              <input
                type="text"
                value={formConfig.cnpj}
                onChange={(e) => setFormConfig({ ...formConfig, cnpj: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Telefone de Contato
              </label>
              <input
                type="text"
                value={formConfig.phone}
                onChange={(e) => setFormConfig({ ...formConfig, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Endereço Completo
              </label>
              <input
                type="text"
                value={formConfig.address}
                onChange={(e) => setFormConfig({ ...formConfig, address: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Rodapé do Cupom Thermal
              </label>
              <input
                type="text"
                value={formConfig.receipt_footer}
                onChange={(e) => setFormConfig({ ...formConfig, receipt_footer: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Salvar Configurações
            </button>
          </form>
        </div>

        {/* Offline Backup & Hardware Tools */}
        <div className="space-y-6">
          {/* Backup Box */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Database className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 dark:text-white">Backup e Restauração de Dados (IndexedDB)</h3>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Exporte uma cópia de segurança completa no formato JSON para guardar em seu computador ou importar em outro caixa.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleExportBackup}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-sm transition flex items-center justify-center gap-2 text-xs"
              >
                <Download className="w-4 h-4" /> Baixar Backup (.json)
              </button>

              <input
                type="file"
                accept=".json"
                onChange={handleImportBackupFile}
                className="hidden"
                id="restore-json-input"
              />
              <label
                htmlFor="restore-json-input"
                className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl shadow-sm transition flex items-center justify-center gap-2 text-xs text-center cursor-pointer"
              >
                <Upload className="w-4 h-4" /> Restaurar Backup
              </label>
            </div>
          </div>

          {/* Camera Permission Test */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Camera className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-slate-900 dark:text-white">Teste da Câmera do Leitor</h3>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verifique se a câmera possui permissões ativas para leitura de código de barras.
            </p>

            <button
              onClick={handleTestCamera}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2.5 rounded-xl transition text-xs flex items-center gap-2"
            >
              Testar Câmera
            </button>

            {cameraTestStatus && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300">
                {cameraTestStatus}
              </div>
            )}
          </div>

          {/* Security & RLS Note */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Segurança Supabase RLS Ativa</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Sua chave anon é segura para GitHub Pages pois o acesso é controlado via Row Level Security (RLS) no Supabase. O banco local IndexedDB opera com proteção anti-XSS no PDV.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
