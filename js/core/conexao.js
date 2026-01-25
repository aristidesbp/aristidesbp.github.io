// js/core/conexao.js
// Conexão centralizada com Supabase + IndexedDB (Dexie) para ERP ABP
// Importe este arquivo onde precisar de supabase ou db local

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@4.0.10/+esm';

// ======================================================
// CONFIGURAÇÕES GLOBAIS (centralizadas aqui)
// ======================================================
const CONFIG = {
  supabase: {
    url: 'https://ueaprmzmlkfrbmibdnro.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYXBybXptbGtmcmJtaWJkbnJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzNTg3OTQsImV4cCI6MjA4NDkzNDc5NH0.Nl_W2v3JN_uQLfz4eAqV3goDVFernnGi2A7L9kszX3w',
    // publishableKey: 'sb_publishable_-Nye7GbsiabsCzPlWqJ8ew_6VBY7ScT', // opcional, se precisar
  },
  app: {
    name: 'ERP ABP',
    version: '0.1.0',
    environment: 'development', // mude para 'production' depois
    debug: true
  }
};

// ======================================================
// CLIENTE SUPABASE (global e singleton)
// ======================================================
export const supabase = createClient(
  CONFIG.supabase.url,
  CONFIG.supabase.anonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      storage: localStorage, // ou sessionStorage se preferir
    },
    db: {
      schema: 'public'
    }
  }
);

// ======================================================
// INDEXEDDB - Dexie (para offline-first)
// ======================================================
export const db = new Dexie('erp_abp_db');

// Definição do schema IndexedDB (espelhando as tabelas principais do Supabase)
// Adicione mais stores conforme precisar (clientes, produtos, vendas, etc.)
db.version(1).stores({
  usuarios: '++id, auth_user_id, email, nome, [empresa_id+ativo]',
  empresas: '++id, nome_fantasia, plano, ativo',
  usuario_empresas: '[usuario_id+empresa_id], role_id, ativo',
  clientes: '++id, empresa_id, nome, cpf_cnpj, [empresa_id+ativo]',
  produtos: '++id, empresa_id, nome, estoque, [empresa_id+ativo]',
  vendas: '++id, empresa_id, cliente_id, status, data_venda, [empresa_id+status]',
  vendas_itens: '++id, venda_id, produto_id',
  financeiro_lancamentos: '++id, empresa_id, tipo, data_lancamento, [empresa_id+tipo]',
  pendingSync: '++id, table, action, data, timestamp', // fila de sincronização
  session: 'key, value' // para armazenar sessão temporária offline
});

// Abre o banco e trata erros iniciais
db.open().catch(err => {
  console.error('Erro ao abrir IndexedDB:', err);
});

// ======================================================
// FUNÇÕES AUXILIARES
// ======================================================

// Obtém o usuário atual (Supabase Auth)
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Obtém a empresa atual da sessão (ou null)
export function getCurrentEmpresaId() {
  return localStorage.getItem('current_empresa_id') || null;
}

// Define a empresa atual na sessão (chamado após login ou seleção)
export function setCurrentEmpresaId(empresaId) {
  if (empresaId) {
    localStorage.setItem('current_empresa_id', empresaId);
    // Opcional: sincronizar com Supabase config se precisar
  } else {
    localStorage.removeItem('current_empresa_id');
  }
}

// Verifica se está online
export function isOnline() {
  return navigator.onLine;
}

// Placeholder para sincronização futura (outbox pattern)
export async function syncPendingActions() {
  if (!isOnline()) return;
  
  const pendings = await db.pendingSync.toArray();
  if (pendings.length === 0) return;
  
  console.log(`Sincronizando ${pendings.length} ações pendentes...`);
  
  for (const action of pendings) {
    try {
      // Exemplo: se for INSERT em clientes
      if (action.table === 'clientes' && action.action === 'insert') {
        const { error } = await supabase.from('clientes').insert(action.data);
        if (!error) {
          await db.pendingSync.delete(action.id);
        }
      }
      // Adicione handlers para update, delete, etc.
    } catch (err) {
      console.error('Erro na sync:', err);
    }
  }
}

// Inicialização automática ao carregar
async function init() {
  if (CONFIG.app.debug) {
    console.log(`${CONFIG.app.name} v${CONFIG.app.version} - Conexão inicializada`);
  }
  
  // Tenta restaurar sessão
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    if (CONFIG.app.debug) console.log('Sessão restaurada:', data.session.user.email);
  }
  
  // Verifica empresa atual
  const empresaId = getCurrentEmpresaId();
  if (empresaId) {
    if (CONFIG.app.debug) console.log('Empresa atual:', empresaId);
  }
}

init().catch(console.error);

// Exporta tudo o que for útil
export default {
  supabase,
  db,
  getCurrentUser,
  getCurrentEmpresaId,
  setCurrentEmpresaId,
  isOnline,
  syncPendingActions
};
