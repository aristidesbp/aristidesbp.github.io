import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StoreConfig, MercadoPagoConfig } from '../../types';
import {
  idbGetAllProducts,
  idbGetAllEntities,
  idbGetAllSales,
  idbGetAllFinances,
  idbGetAllInstallments,
  idbSaveProducts,
  idbSaveEntities,
  idbClearAllData,
} from '../../lib/offlineDb';
import {
  getStoredSupabaseUrl,
  getStoredSupabaseAnonKey,
  reinitSupabaseClient,
  checkSupabaseConnection,
  DEFAULT_SUPABASE_URL,
  DEFAULT_SUPABASE_ANON_KEY,
} from '../../lib/supabase';
import {
  getMercadoPagoConfig,
  saveMercadoPagoConfig,
  testMercadoPagoCredentials,
} from '../../lib/mercadoPagoService';
import {
  Settings,
  Building2,
  Download,
  Upload,
  Camera,
  Database,
  Save,
  ShieldCheck,
  RefreshCw,
  Cloud,
  Globe,
  Key,
  RotateCcw,
  Trash2,
  AlertTriangle,
  Zap,
  CreditCard,
  QrCode,
  FileText,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { storeConfig, updateStoreConfig, isOnline, triggerSync } = useApp();

  const [formConfig, setFormConfig] = useState<StoreConfig>(storeConfig);
  const [cameraTestStatus, setCameraTestStatus] = useState<string | null>(null);

  // Supabase Configuration State
  const [supabaseUrl, setSupabaseUrl] = useState(getStoredSupabaseUrl());
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(getStoredSupabaseAnonKey());
  const [supabaseConnectionStatus, setSupabaseConnectionStatus] = useState<string | null>(null);
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isClearingDb, setIsClearingDb] = useState(false);

  // Mercado Pago Configuration State
  const [mpConfig, setMpConfig] = useState<MercadoPagoConfig>(getMercadoPagoConfig());
  const [mpTestStatus, setMpTestStatus] = useState<string | null>(null);
  const [isTestingMp, setIsTestingMp] = useState(false);

  const handleSaveMpConfig = () => {
    saveMercadoPagoConfig(mpConfig);
    alert('Configurações do Mercado Pago salvas com sucesso!');
  };

  const handleTestMpCredentials = async () => {
    setIsTestingMp(true);
    setMpTestStatus('Testando credenciais e conectando ao Mercado Pago...');
    const res = await testMercadoPagoCredentials(mpConfig.access_token);
    setIsTestingMp(false);
    if (res.success) {
      setMpTestStatus(`✅ ${res.message}`);
    } else {
      setMpTestStatus(`❌ ${res.message}`);
    }
  };

  const handleClearDatabase = async () => {
    try {
      setIsClearingDb(true);
      await idbClearAllData();
      alert('Banco de dados local (IndexedDB) resetado com sucesso! Todos os dados locais foram apagados.');
      window.location.reload();
    } catch (err: any) {
      alert('Erro ao apagar banco de dados local: ' + (err.message || 'Erro inesperado.'));
    } finally {
      setIsClearingDb(false);
      setIsClearModalOpen(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateStoreConfig(formConfig);
    alert('Configurações do supermercado salvas com sucesso!');
  };

  const handleTestAndConnectSupabase = async () => {
    setIsTestingSupabase(true);
    setSupabaseConnectionStatus('Conectando e validando credenciais com o Supabase...');
    try {
      const tempClient = reinitSupabaseClient(supabaseUrl, supabaseAnonKey);
      const isConnected = await checkSupabaseConnection(tempClient);
      if (isConnected) {
        setSupabaseConnectionStatus('✅ Conexão estabelecida com sucesso com o Supabase!');
        triggerSync().catch(() => {});
      } else {
        setSupabaseConnectionStatus(
          '❌ Não foi possível conectar ao Supabase. Verifique a URL e a Chave Anônima (anon_key).'
        );
      }
    } catch {
      setSupabaseConnectionStatus('❌ Erro de rede ou URL do Supabase inválida.');
    } finally {
      setIsTestingSupabase(false);
    }
  };

  const handleResetSupabase = () => {
    setSupabaseUrl(DEFAULT_SUPABASE_URL);
    setSupabaseAnonKey(DEFAULT_SUPABASE_ANON_KEY);
    reinitSupabaseClient(DEFAULT_SUPABASE_URL, DEFAULT_SUPABASE_ANON_KEY);
    setSupabaseConnectionStatus('🔄 Credenciais do Supabase restauradas para o padrão do sistema.');
    triggerSync().catch(() => {});
  };

  const handleTestCamera = async () => {
    setCameraTestStatus('Testando acesso à câmera do dispositivo...');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      setCameraTestStatus('✅ Câmera reconhecida e permissão concedida!');
      setTimeout(() => {
        stream.getTracks().forEach((track) => track.stop());
      }, 2000);
    } catch {
      setCameraTestStatus('❌ Acesso à câmera negado ou dispositivo indisponível.');
    }
  };

  const handleExportBackup = async (format: 'json' | 'xml' | 'sql' = 'json') => {
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

      const dateStr = new Date().toISOString().split('T')[0];
      let content = '';
      let mimeType = 'application/json';
      let extension = 'json';

      if (format === 'json') {
        content = JSON.stringify(backupData, null, 2);
        mimeType = 'application/json';
        extension = 'json';
      } else if (format === 'xml') {
        content = generateXmlBackup(backupData);
        mimeType = 'application/xml';
        extension = 'xml';
      } else if (format === 'sql') {
        content = generateSqlBackup(backupData);
        mimeType = 'text/plain';
        extension = 'sql';
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup_erp_abp_${dateStr}.${extension}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Erro ao exportar backup local.');
    }
  };

  const generateXmlBackup = (data: any) => {
    const esc = (val: any) => {
      if (val === null || val === undefined) return '';
      return String(val)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    const arrayToXml = (arr: any[], tagSingular: string) => {
      return arr
        .map((item) => {
          const inner = Object.keys(item)
            .map((k) => `<${k}>${esc(item[k])}</${k}>`)
            .join('\n      ');
          return `    <${tagSingular}>\n      ${inner}\n    </${tagSingular}>`;
        })
        .join('\n');
    };

    return `<?xml version="1.0" encoding="UTF-8"?>
<erp_abp_backup date="${data.exportDate}" version="${data.version}">
  <storeConfig>
    <store_name>${esc(data.storeConfig.store_name)}</store_name>
    <cnpj>${esc(data.storeConfig.cnpj)}</cnpj>
    <phone>${esc(data.storeConfig.phone)}</phone>
    <address>${esc(data.storeConfig.address)}</address>
    <receipt_footer>${esc(data.storeConfig.receipt_footer)}</receipt_footer>
  </storeConfig>

  <products>
${arrayToXml(data.products || [], 'product')}
  </products>

  <entities>
${arrayToXml(data.entities || [], 'entity')}
  </entities>

  <sales>
${arrayToXml(data.sales || [], 'sale')}
  </sales>

  <finances>
${arrayToXml(data.finances || [], 'finance')}
  </entities>
</erp_abp_backup>`;
  };

  const generateSqlBackup = (data: any) => {
    const esc = (val: any) => {
      if (val === null || val === undefined) return 'NULL';
      if (typeof val === 'number' || typeof val === 'boolean') return String(val);
      return `'${String(val).replace(/'/g, "''")}'`;
    };

    let sql = `-- ==========================================================\n`;
    sql += `-- ERP_ABP Supermercado - Backup de Banco de Dados (SQL)\n`;
    sql += `-- Data de Exportacao: ${new Date().toLocaleString('pt-BR')}\n`;
    sql += `-- Versao do Sistema: ${data.version}\n`;
    sql += `-- ==========================================================\n\n`;

    // Products Table
    if (data.products && data.products.length > 0) {
      sql += `-- TABLE: produtos\n`;
      sql += `CREATE TABLE IF NOT EXISTS produtos (\n`;
      sql += `  id VARCHAR(255) PRIMARY KEY,\n`;
      sql += `  nome VARCHAR(255) NOT NULL,\n`;
      sql += `  codigo_barras VARCHAR(100),\n`;
      sql += `  categoria VARCHAR(100),\n`;
      sql += `  unidade VARCHAR(20),\n`;
      sql += `  preco_custo DECIMAL(10,2),\n`;
      sql += `  preco_venda DECIMAL(10,2),\n`;
      sql += `  quantidade_estoque DECIMAL(10,2),\n`;
      sql += `  estoque_minimo DECIMAL(10,2),\n`;
      sql += `  descricao TEXT\n`;
      sql += `);\n\n`;

      data.products.forEach((p: any) => {
        sql += `INSERT INTO produtos (id, nome, codigo_barras, categoria, unidade, preco_custo, preco_venda, quantidade_estoque, estoque_minimo, descricao) VALUES (${esc(p.id)}, ${esc(p.nome)}, ${esc(p.codigo_barras)}, ${esc(p.categoria)}, ${esc(p.unidade)}, ${p.preco_custo || 0}, ${p.preco_venda || 0}, ${p.quantidade_estoque || 0}, ${p.estoque_minimo || 0}, ${esc(p.descricao)});\n`;
      });
      sql += `\n`;
    }

    // Entities Table
    if (data.entities && data.entities.length > 0) {
      sql += `-- TABLE: entidades\n`;
      sql += `CREATE TABLE IF NOT EXISTS entidades (\n`;
      sql += `  id VARCHAR(255) PRIMARY KEY,\n`;
      sql += `  tipo VARCHAR(50),\n`;
      sql += `  nome VARCHAR(255),\n`;
      sql += `  cpf_cnpj VARCHAR(50),\n`;
      sql += `  telefone VARCHAR(50),\n`;
      sql += `  email VARCHAR(255),\n`;
      sql += `  endereco TEXT\n`;
      sql += `);\n\n`;

      data.entities.forEach((e: any) => {
        sql += `INSERT INTO entidades (id, tipo, nome, cpf_cnpj, telefone, email, endereco) VALUES (${esc(e.id)}, ${esc(e.tipo)}, ${esc(e.nome)}, ${esc(e.cpf_cnpj)}, ${esc(e.telefone)}, ${esc(e.email)}, ${esc(e.endereco)});\n`;
      });
      sql += `\n`;
    }

    // Sales Table
    if (data.sales && data.sales.length > 0) {
      sql += `-- TABLE: vendas\n`;
      sql += `CREATE TABLE IF NOT EXISTS vendas (\n`;
      sql += `  id VARCHAR(255) PRIMARY KEY,\n`;
      sql += `  valor_total DECIMAL(10,2),\n`;
      sql += `  desconto DECIMAL(10,2),\n`;
      sql += `  valor_liquido DECIMAL(10,2),\n`;
      sql += `  forma_pagamento VARCHAR(50),\n`;
      sql += `  status VARCHAR(50),\n`;
      sql += `  created_at TIMESTAMP\n`;
      sql += `);\n\n`;

      data.sales.forEach((s: any) => {
        sql += `INSERT INTO vendas (id, valor_total, desconto, valor_liquido, forma_pagamento, status, created_at) VALUES (${esc(s.id)}, ${s.valor_total || 0}, ${s.desconto || 0}, ${s.valor_liquido || 0}, ${esc(s.forma_pagamento)}, ${esc(s.status)}, ${esc(s.created_at)});\n`;
      });
      sql += `\n`;
    }

    // Finances Table
    if (data.finances && data.finances.length > 0) {
      sql += `-- TABLE: financas\n`;
      sql += `CREATE TABLE IF NOT EXISTS financas (\n`;
      sql += `  id VARCHAR(255) PRIMARY KEY,\n`;
      sql += `  descricao VARCHAR(255),\n`;
      sql += `  tipo VARCHAR(50),\n`;
      sql += `  categoria VARCHAR(100),\n`;
      sql += `  valor_total DECIMAL(10,2),\n`;
      sql += `  status_lancamento VARCHAR(50),\n`;
      sql += `  created_at TIMESTAMP\n`;
      sql += `);\n\n`;

      data.finances.forEach((f: any) => {
        sql += `INSERT INTO financas (id, descricao, tipo, categoria, valor_total, status_lancamento, created_at) VALUES (${esc(f.id)}, ${esc(f.descricao)}, ${esc(f.tipo)}, ${esc(f.categoria)}, ${f.valor_total || 0}, ${esc(f.status_lancamento)}, ${esc(f.created_at)});\n`;
      });
      sql += `\n`;
    }

    return sql;
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
            Configurações do Sistema, Supabase & Backup
          </h2>
          <p className="text-xs text-slate-400">Dados do estabelecimento, chaves da nuvem e banco local</p>
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

        {/* Cloud Sync & Hardware Tools */}
        <div className="space-y-6">
          {/* Supabase Cloud Connection Box */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Sincronização & Conexão Supabase
                </h3>
              </div>
              <span
                className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                  isOnline
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
                    : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800'
                }`}
              >
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Configure a <strong>URL do Projeto</strong> e a <strong>Chave Anônima (anon_key)</strong> do seu banco Supabase para manter os dados sincronizados em tempo real.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" /> URL do Supabase (url)
                </label>
                <input
                  type="text"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  placeholder="https://sua-instancia.supabase.co"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-slate-400" /> Chave Anônima (anon_key)
                </label>
                <textarea
                  value={supabaseAnonKey}
                  onChange={(e) => setSupabaseAnonKey(e.target.value)}
                  rows={2}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              {supabaseConnectionStatus && (
                <div
                  className={`p-3 rounded-xl text-xs font-bold ${
                    supabaseConnectionStatus.includes('✅')
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : supabaseConnectionStatus.includes('❌')
                      ? 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                      : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                  }`}
                >
                  {supabaseConnectionStatus}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleTestAndConnectSupabase}
                  disabled={isTestingSupabase}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2.5 px-4 rounded-xl transition text-xs shadow-sm flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isTestingSupabase ? 'animate-spin' : ''}`} />
                  <span>{isTestingSupabase ? 'Testando Conexão...' : 'Fazer Conexão Supabase'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetSupabase}
                  className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl transition text-xs flex items-center justify-center gap-1.5"
                  title="Restaurar Chaves Padrão"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar Padrão</span>
                </button>
              </div>
            </div>
          </div>

          {/* Backup Box */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Database className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 dark:text-white">Backup e Restauração de Dados (Multi-Formatos)</h3>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Exporte uma cópia de segurança completa no formato de sua preferência (JSON, XML ou SQL) para guardar em seu computador ou migrar dados.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Baixar Cópia de Backup:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleExportBackup('json')}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-2.5 px-3 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 text-xs"
                >
                  <Download className="w-3.5 h-3.5" /> JSON (.json)
                </button>
                <button
                  type="button"
                  onClick={() => handleExportBackup('xml')}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-extrabold py-2.5 px-3 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 text-xs"
                >
                  <Download className="w-3.5 h-3.5" /> XML (.xml)
                </button>
                <button
                  type="button"
                  onClick={() => handleExportBackup('sql')}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-2.5 px-3 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 text-xs"
                >
                  <Download className="w-3.5 h-3.5" /> SQL (.sql)
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Restaurar Backup Local (JSON):
              </label>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackupFile}
                className="hidden"
                id="restore-json-input"
              />
              <label
                htmlFor="restore-json-input"
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 rounded-xl shadow-xs transition flex items-center justify-center gap-2 text-xs text-center cursor-pointer"
              >
                <Upload className="w-4 h-4" /> Selecionar Arquivo de Backup (.json)
              </label>
            </div>
          </div>

          {/* Mercado Pago Integration Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 rounded-xl">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    Integração de Pagamentos Mercado Pago
                  </h3>
                  <p className="text-xs text-slate-500">
                    Insira suas chaves de acesso para ativar PIX, Cartão e Boleto
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 rounded-full text-[10px] font-black uppercase text-sky-700 dark:text-sky-300">
                Pronto para Chaves
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Access Token (Chave de Acesso Mercado Pago):
                </label>
                <input
                  type="password"
                  value={mpConfig.access_token}
                  onChange={(e) => setMpConfig({ ...mpConfig, access_token: e.target.value })}
                  placeholder="EX: APP_USR-xxxxxxxxxxxx-xxxxxx... ou TEST-xxxxxxxxxxxx..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Chave privada obtida em: Mercado Pago Developers &gt; Suas Aplicações &gt; Credenciais.
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Public Key (Chave Pública):
                </label>
                <input
                  type="text"
                  value={mpConfig.public_key}
                  onChange={(e) => setMpConfig({ ...mpConfig, public_key: e.target.value })}
                  placeholder="EX: APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx ou TEST-..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Ambiente Mercado Pago:
                  </label>
                  <select
                    value={mpConfig.sandbox_mode ? 'sandbox' : 'production'}
                    onChange={(e) => setMpConfig({ ...mpConfig, sandbox_mode: e.target.value === 'sandbox' })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-bold text-slate-800 dark:text-white"
                  >
                    <option value="sandbox">🟡 Sandbox (Modo Testes / Cartões Teste)</option>
                    <option value="production">🟢 Produção (Cobranças Reais)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Nome na Fatura (Statement Descriptor):
                  </label>
                  <input
                    type="text"
                    value={mpConfig.statement_descriptor}
                    onChange={(e) => setMpConfig({ ...mpConfig, statement_descriptor: e.target.value })}
                    placeholder="EX: SUPERMERCADO ABP"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs uppercase text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Methods Toggles */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Métodos de Pagamento Habilitados:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer text-xs font-bold">
                    <input
                      type="checkbox"
                      checked={mpConfig.pix_enabled}
                      onChange={(e) => setMpConfig({ ...mpConfig, pix_enabled: e.target.checked })}
                      className="rounded text-sky-600"
                    />
                    <QrCode className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>PIX Instantâneo</span>
                  </label>

                  <label className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer text-xs font-bold">
                    <input
                      type="checkbox"
                      checked={mpConfig.credit_card_enabled}
                      onChange={(e) => setMpConfig({ ...mpConfig, credit_card_enabled: e.target.checked })}
                      className="rounded text-sky-600"
                    />
                    <CreditCard className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Cartão de Crédito</span>
                  </label>

                  <label className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer text-xs font-bold">
                    <input
                      type="checkbox"
                      checked={mpConfig.boleto_enabled}
                      onChange={(e) => setMpConfig({ ...mpConfig, boleto_enabled: e.target.checked })}
                      className="rounded text-sky-600"
                    />
                    <FileText className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Boleto Bancário</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleSaveMpConfig}
                  className="w-full sm:flex-1 bg-sky-600 hover:bg-sky-500 text-white font-extrabold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-xs"
                >
                  <Save className="w-4 h-4" /> Salvar Configurações Mercado Pago
                </button>

                <button
                  type="button"
                  onClick={handleTestMpCredentials}
                  disabled={isTestingMp}
                  className="w-full sm:flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs"
                >
                  {isTestingMp ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-sky-400" />
                  ) : (
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  )}
                  <span>Testar Credenciais MP</span>
                </button>
              </div>

              {mpTestStatus && (
                <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                  {mpTestStatus}
                </div>
              )}
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

          {/* Danger Zone: Clear Local Database */}
          <div className="bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-900/50 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-rose-200 dark:border-rose-900/50">
              <Trash2 className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <h3 className="font-extrabold text-rose-900 dark:text-rose-300">Zona de Perigo: Apagar Banco Local</h3>
            </div>

            <p className="text-xs text-rose-700 dark:text-rose-400 leading-relaxed">
              Apaga permanentemente todas as tabelas locais do IndexedDB neste navegador (produtos, vendas, clientes, financeiro e configurações de caixa).
            </p>

            <button
              type="button"
              onClick={() => setIsClearModalOpen(true)}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-extrabold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-xs"
            >
              <Trash2 className="w-4 h-4" /> Apagar Dados do Banco Local (IndexedDB)
            </button>
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

      {/* Confirmation Modal for Database Deletion */}
      {isClearModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-500">
              <div className="p-3 bg-rose-100 dark:bg-rose-950/60 rounded-2xl">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                  Apagar Banco de Dados Local?
                </h4>
                <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">Ação irreversível!</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Tem certeza que deseja apagar <strong>todos os registros salvos localmente</strong> no seu navegador (IndexedDB)? Recomendamos fazer o download de um backup em JSON antes de prosseguir.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsClearModalOpen(false)}
                disabled={isClearingDb}
                className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-3 rounded-xl text-xs transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleClearDatabase}
                disabled={isClearingDb}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-extrabold py-3 rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                {isClearingDb ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Sim, Apagar Tudo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

