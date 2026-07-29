import { createClient, SupabaseClient } from '@supabase/supabase-js';

const env = (import.meta as any).env || {};
export const DEFAULT_SUPABASE_URL =
  env.VITE_SUPABASE_URL || 'https://mvxwxpwgoukhinqfuppz.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY =
  env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12eHd4cHdnb3VraGlucWZ1cHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMDE5MzAsImV4cCI6MjA5ODU3NzkzMH0.vudMl-45gMMEg6EJpM8BZa0rC6k7YiAdqtxuUUB_OWM';

export function getStoredSupabaseUrl(): string {
  return localStorage.getItem('erp_abp_supabase_url') || DEFAULT_SUPABASE_URL;
}

export function getStoredSupabaseAnonKey(): string {
  return localStorage.getItem('erp_abp_supabase_anon_key') || DEFAULT_SUPABASE_ANON_KEY;
}

let supabaseInstance: SupabaseClient = createClient(
  getStoredSupabaseUrl(),
  getStoredSupabaseAnonKey(),
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const val = (supabaseInstance as any)[prop];
    return typeof val === 'function' ? val.bind(supabaseInstance) : val;
  },
});

export function reinitSupabaseClient(url: string, anonKey: string): SupabaseClient {
  const cleanUrl = url.trim() || DEFAULT_SUPABASE_URL;
  const cleanKey = anonKey.trim() || DEFAULT_SUPABASE_ANON_KEY;
  localStorage.setItem('erp_abp_supabase_url', cleanUrl);
  localStorage.setItem('erp_abp_supabase_anon_key', cleanKey);

  supabaseInstance = createClient(cleanUrl, cleanKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
  return supabaseInstance;
}

/**
 * Check if current connection to Supabase is active
 */
export async function checkSupabaseConnection(customClient?: SupabaseClient): Promise<boolean> {
  try {
    const client = customClient || supabaseInstance;
    const { error } = await client.from('produtos').select('id', { count: 'exact', head: true });
    return !error;
  } catch {
    return false;
  }
}

