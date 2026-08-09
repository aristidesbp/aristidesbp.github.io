import React, { useState } from 'react';
import { storageService } from '../lib/storage';
import { changePassword } from '../lib/auth';
import { getEmpresa, saveEmpresa, type EmpresaConfig } from '../lib/empresa';
import {
  Settings,
  Camera,
  FolderOpen,
  Download,
  Upload,
  Receipt,
  CheckCircle,
  FileJson,
  Contact,
  ShieldCheck,
  Save,
  Building2,
} from 'lucide-react';

interface ConfiguracoesViewProps {
  onRefreshData: () => Promise<void>;
  username: string;
}

export const ConfiguracoesView: React.FC<ConfiguracoesViewProps> = ({ onRefreshData, username }) => {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [senhaStatus, setSenhaStatus] = useState('');

  const [empresa, setEmpresa] = useState<EmpresaConfig>(() => getEmpresa());
  const [empresaStatus, setEmpresaStatus] = useState('');

  const handleSaveEmpresa = () => {
    saveEmpresa(empresa);
    setEmpresaStatus('✅ Dados da empresa salvos. O sistema foi atualizado.');
  };

  const handleChangePassword = async () => {
    if (novaSenha.length < 6) {
      setSenhaStatus('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (novaSenha !== confirmaSenha) {
      setSenhaStatus('As senhas não conferem.');
      return;
    }
    const ok = await changePassword(novaSenha);
    setSenhaStatus(
      ok ? 'Senha alterada com sucesso no Auth do Supabase.' : 'Falha ao alterar a senha.',
    );
    if (ok) {
      setNovaSenha('');
      setConfirmaSenha('');
    }
  };

  const [cameraStatus, setCameraStatus] = useState<string>('');
  const [contactStatus, setContactStatus] = useState<string>('');
  const [downloadPath, setDownloadPath] = useState<string>(
    localStorage.getItem('erp_abp_download_path') || '/Download/ERP_System'
  );



  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setCameraStatus('✅ Permissão da câmera concedida com sucesso!');
    } catch (err: any) {
      setCameraStatus('❌ Erro/Acesso negado à câmera: ' + err.message);
    }
  };

  const requestContactsPermission = async () => {
    if ('contacts' in navigator && 'select' in (navigator as any).contacts) {
      setContactStatus('✅ API de Contatos disponível no navegador.');
    } else {
      setContactStatus('ℹ️ Leitura direta de contatos não suportada neste navegador.');
    }
  };

  const handleSaveDownloadPath = () => {
    localStorage.setItem('erp_abp_download_path', downloadPath);
    alert('Caminho de download salvo com sucesso!');
  };

  const handleExportBackup = async () => {
    const jsonStr = await storageService.exportBackupJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_erp_abp_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const content = evt.target?.result as string;
      const success = await storageService.importBackupJSON(content);
      if (success) {
        await onRefreshData();
        alert('Backup importado com sucesso! Dados sincronizados.');
      } else {
        alert('Falha ao importar backup. Verifique se o arquivo JSON é válido.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-500" />
            <span>Configurações do Sistema & Permissões</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Gerencie permissões do dispositivo, diretório de downloads e segurança do banco de dados.
          </p>
        </div>

        {/* Dados da Empresa */}
        <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-500" />
              <span>Dados da Empresa (Identidade do Sistema)</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Estes dados personalizam o sistema para o proprietário: título da página, cabeçalho,
              tela de login e cupons impressos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 pt-1">
            {(
              [
                ['nome', 'Razão Social'],
                ['fantasia', 'Nome Fantasia (título do sistema)'],
                ['cnpj', 'CNPJ / CPF'],
                ['telefone', 'Telefone'],
                ['email', 'E-mail'],
                ['cidade', 'Cidade / UF'],
                ['endereco', 'Endereço'],
                ['slogan', 'Slogan / Subtítulo'],
              ] as [keyof EmpresaConfig, string][]
            ).map(([field, label]) => (
              <div key={String(field)}>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  {label}
                </label>
                <input
                  type="text"
                  value={empresa[field]}
                  onChange={(e) => setEmpresa({ ...empresa, [field]: e.target.value })}
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={handleSaveEmpresa}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md shadow-emerald-600/20"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar Dados da Empresa</span>
            </button>
          </div>

          {empresaStatus && (
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-200/60 dark:bg-slate-800 p-2.5 rounded-xl mt-2">
              {empresaStatus}
            </p>
          )}
        </div>


        {/* 1. Camera Permission */}
        <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-500" />
                <span>Permissão de Câmera</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Necessária para leitura de código de barras via webcam ou câmera do dispositivo.
              </p>
            </div>
            <button
              onClick={requestCameraPermission}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 shadow-md shadow-emerald-600/20"
            >
              <Camera className="w-4 h-4" />
              <span>Testar / Solicitar Câmera</span>
            </button>
          </div>
          {cameraStatus && (
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
              {cameraStatus}
            </p>
          )}
        </div>

        {/* 2. Contacts Permission */}
        <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Contact className="w-4 h-4 text-blue-500" />
                <span>Permissão de Agenda de Contatos</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Permite a busca rápida de contatos para cadastros de clientes e fornecedores.
              </p>
            </div>
            <button
              onClick={requestContactsPermission}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 shadow-md shadow-blue-600/20"
            >
              <Contact className="w-4 h-4" />
              <span>Solicitar Contatos</span>
            </button>
          </div>
          {contactStatus && (
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-200/60 dark:bg-slate-800 p-2.5 rounded-xl">
              {contactStatus}
            </p>
          )}
        </div>

        {/* 3. Downloads Path */}
        <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-amber-500" />
              <span>Pasta Padrão para Downloads & Relatórios</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Defina o diretório onde relatórios em PDF e backups serão organizados.
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={downloadPath}
              onChange={(e) => setDownloadPath(e.target.value)}
              placeholder="/Download/ERP_System"
              className="flex-1 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-white outline-none"
            />
            <button
              onClick={handleSaveDownloadPath}
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 rounded-xl text-xs font-bold transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Salvar</span>
            </button>
          </div>
        </div>

        {/* 3.5 Segurança / senha */}
        <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Segurança da Conta ({username})</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Altere a senha de acesso deste usuário diretamente no Auth do Supabase.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="Nova senha"
              className="flex-1 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white outline-none"
            />
            <input
              type="password"
              value={confirmaSenha}
              onChange={(e) => setConfirmaSenha(e.target.value)}
              placeholder="Confirmar nova senha"
              className="flex-1 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white outline-none"
            />
            <button
              onClick={handleChangePassword}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Alterar senha</span>
            </button>
          </div>
          {senhaStatus && (
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-200/60 dark:bg-slate-800 p-2.5 rounded-xl">
              {senhaStatus}
            </p>
          )}
        </div>

        {/* 4. Backup & Restore */}
        <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <FileJson className="w-4 h-4 text-purple-500" />
              <span>Backup & Restauração Completa de Dados (JSON)</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Exporte uma cópia completa de todos os seus dados ou restaure a partir de um arquivo JSON.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleExportBackup}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Backup Completo (.json)</span>
            </button>

            <label className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-600/20">
              <Upload className="w-4 h-4" />
              <span>Restaurar Backup (JSON)</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
          <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>
            Todas as alterações são sincronizadas com a base Supabase e mantidas em cache local seguro.
          </span>
        </div>
      </div>
    </div>
  );
};
