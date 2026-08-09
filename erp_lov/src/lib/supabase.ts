import { createClient } from '@supabase/supabase-js';

const URL_KEY = 'erp_abp_supabase_url';
const KEY_KEY = 'erp_abp_supabase_key';

const DEFAULT_URL = 'https://cbsfujkzozgcnkjahvoj.supabase.co';
const DEFAULT_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNic2Z1amt6b3pnY25ramFodm9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxODQwODEsImV4cCI6MjEwMTc2MDA4MX0.8s42MDYblfaTn6GiXo9NE8r4EISihjXCUHhtVaPJ4u4';

function local(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export const SUPABASE_URL = local(URL_KEY) || DEFAULT_URL;
export const SUPABASE_ANON_KEY = local(KEY_KEY) || DEFAULT_KEY;

/** Credenciais definidas pelo próprio cliente (modo SaaS). */
export function hasCustomCredentials(): boolean {
  return Boolean(local(URL_KEY) && local(KEY_KEY));
}

/** Salva as credenciais do projeto Supabase do cliente. */
export function saveCredentials(url: string, anonKey: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(URL_KEY, url.trim());
  window.localStorage.setItem(KEY_KEY, anonKey.trim());
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'erp_abp_auth',
  },
});

export function isOnline(): boolean {
  return typeof navigator === 'undefined' ? true : navigator.onLine !== false;
}
