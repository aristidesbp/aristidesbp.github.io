import React, { useState, useEffect, useCallback } from 'react';
import { storageService, checkSchema } from '../lib/storage';
import { getCurrentUser, logout, onAuthChange, type SessionUser } from '../lib/auth';
import { getEmpresa, empresaLabel, type EmpresaConfig } from '../lib/empresa';

import type { Entidade, Produto, Financa, Parcela, Venda } from '../types/erp';
import { Header } from './Header';
import { Sidebar, type ActiveTab } from './Sidebar';
import { LoginModal } from './LoginModal';

import { WelcomeView } from '../views/WelcomeView';
import { EntidadesView } from '../views/EntidadesView';
import { EstoqueView } from '../views/EstoqueView';
import { FinanceiroView } from '../views/FinanceiroView';
import { PdvView } from '../views/PdvView';
import { ConfiguracoesView } from '../views/ConfiguracoesView';
import { DocumentacaoView } from '../views/DocumentacaoView';

const tabTitles: Record<ActiveTab, string> = {
  bem_vindo: 'Início & Visão Geral',
  pdv: 'Frente de Caixa (PDV)',
  estoque: 'Estoque & Produtos',
  financeiro: 'Controle Financeiro',
  entidades: 'Entidades & Clientes',
  configuracoes: 'Configurações',
  documentacao: 'Documentação do Sistema',
};

export default function ErpApp() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [empresa, setEmpresa] = useState<EmpresaConfig>(() => getEmpresa());

  const [activeTab, setActiveTab] = useState<ActiveTab>('bem_vindo');
  const [isOpenMobileSidebar, setIsOpenMobileSidebar] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [online, setOnline] = useState(true);
  const [pending, setPending] = useState(0);
  const [missingTables, setMissingTables] = useState<string[]>([]);

  const [entidades, setEntidades] = useState<Entidade[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [financas, setFinancas] = useState<Financa[]>([]);
  const [parcelas, setParcelas] = useState<Parcela[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Tema (lido apenas no cliente, evitando divergência de hidratação)
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    setIsDarkMode(
      stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches,
    );
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Status de conexão
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  const reloadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [entData, prodData, finParData, vendData] = await Promise.all([
        storageService.getEntidades(),
        storageService.getProdutos(),
        storageService.getFinancasWithParcelas(),
        storageService.getVendas(),
      ]);
      setEntidades(entData);
      setProdutos(prodData);
      setFinancas(finParData.financas);
      setParcelas(finParData.parcelas);
      setVendas(vendData);
      setPending(await storageService.pendingOperations());
    } catch (err) {
      console.warn('[ERP] Erro ao recarregar dados:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) void checkSchema().then((r) => setMissingTables(r.missing));
  }, [user]);

  useEffect(() => {
    if (user) void reloadData();
    else setIsLoading(false);
  }, [user, reloadData]);

  // Reenvia operações pendentes quando a conexão volta
  useEffect(() => {
    if (online && user) {
      void storageService.flushOutbox().then((sent) => {
        if (sent > 0) void reloadData();
      });
    }
  }, [online, user, reloadData]);

  // Sessão do Auth do Supabase
  useEffect(() => {
    void getCurrentUser().then((u) => {
      setUser(u);
      setAuthChecked(true);
    });
    return onAuthChange((u) => setUser(u));
  }, []);

  // Identidade da empresa (título da página e cabeçalho)
  useEffect(() => {
    const sync = () => setEmpresa(getEmpresa());
    window.addEventListener('erp-empresa-updated', sync);
    return () => window.removeEventListener('erp-empresa-updated', sync);
  }, []);

  useEffect(() => {
    document.title = `${empresaLabel(empresa)} — ${empresa.slogan || 'Gestão & PDV'}`;
  }, [empresa]);

  const handleLogout = () => {
    void logout();
    setUser(null);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LoginModal onSuccess={(logged) => setUser(logged)} />;
  }


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setIsOpenMobileSidebar(false);
        }}
        isOpenMobile={isOpenMobileSidebar}
        onCloseMobile={() => setIsOpenMobileSidebar(false)}
      />

      <Header
        onToggleMobileSidebar={() => setIsOpenMobileSidebar(!isOpenMobileSidebar)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        userEmail={user.username}
        userName={user.nome}
        onLogout={handleLogout}
        searchTerm={globalSearchTerm}
        onSearchChange={(term) => setGlobalSearchTerm(term)}
        activeTabTitle={tabTitles[activeTab]}
      />

      <main className="lg:ml-[260px] pt-24 pb-12 px-4 sm:px-8 max-w-7xl mx-auto">
        {online && missingTables.length > 0 && (
          <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-bold text-red-600 dark:text-red-400">
            Banco de dados incompleto no Supabase. Tabelas ausentes: {missingTables.join(', ')}.
            Execute o script SQL do README (seção “Criação das tabelas”) no SQL Editor do seu projeto
            Supabase. Enquanto isso, o sistema opera com o cache local (IndexedDB).
          </div>
        )}

        {!online && (
          <div className="mb-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs font-bold text-amber-600 dark:text-amber-400">
            Modo offline — os dados exibidos vêm do cache local (IndexedDB).
            {pending > 0 && ` ${pending} operação(ões) aguardando sincronização.`}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400 space-y-3">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-bold uppercase tracking-wider">
              Carregando dados do ERP_ABP...
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'bem_vindo' && (
              <WelcomeView
                entidades={entidades}
                produtos={produtos}
                financas={financas}
                parcelas={parcelas}
                vendas={vendas}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'entidades' && (
              <EntidadesView
                entidades={entidades}
                onSaveEntidade={async (d) => {
                  await storageService.saveEntidade(d);
                  await reloadData();
                }}
                onDeleteEntidades={async (ids) => {
                  await storageService.deleteEntidades(ids);
                  await reloadData();
                }}
              />
            )}

            {activeTab === 'estoque' && (
              <EstoqueView
                produtos={produtos}
                onSaveProduto={async (d) => {
                  await storageService.saveProduto(d);
                  await reloadData();
                }}
                onDeleteProdutos={async (ids) => {
                  await storageService.deleteProdutos(ids);
                  await reloadData();
                }}
              />
            )}

            {activeTab === 'financeiro' && (
              <FinanceiroView
                financas={financas}
                parcelas={parcelas}
                entidades={entidades}
                onSaveLancamento={async (p) => {
                  await storageService.saveLancamentoFinanceiro(p);
                  await reloadData();
                }}
                onDeleteParcelas={async (ids) => {
                  await storageService.deleteParcelas(ids);
                  await reloadData();
                }}
              />
            )}

            {activeTab === 'pdv' && (
              <PdvView
                produtos={produtos}
                entidades={entidades}
                vendas={vendas}
                onRegisterVenda={async (p) => {
                  await storageService.registerVenda(p);
                  await reloadData();
                }}
                onRegisterSangria={async (valor, motivo) => {
                  await storageService.registerSangria(valor, motivo);
                  await reloadData();
                }}
                onDeleteVenda={async (id) => {
                  await storageService.deleteVenda(id);
                  await reloadData();
                }}
              />
            )}

            {activeTab === 'configuracoes' && (
              <ConfiguracoesView onRefreshData={reloadData} username={user.username} />
            )}

            {activeTab === 'documentacao' && <DocumentacaoView />}
          </>
        )}
      </main>
    </div>
  );
}
