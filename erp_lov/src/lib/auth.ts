import { supabase } from './supabase';

export interface SessionUser {
  id: string;
  username: string;
  nome: string;
  papel: string;
}

/**
 * Autenticação 100% baseada no Auth do Supabase (auth.users).
 * Não existe mais usuário "admin" local nem tabela `usuarios`:
 * o usuário precisa existir no Auth do projeto Supabase do cliente.
 */
function toSessionUser(user: {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, unknown> | null;
}): SessionUser {
  const meta = (user.user_metadata ?? {}) as Record<string, string | undefined>;
  const email = user.email ?? '';
  return {
    id: user.id,
    username: email,
    nome: meta['nome'] || meta['full_name'] || email.split('@')[0] || 'Usuário',
    papel: meta['papel'] || 'usuario',
  };
}

export interface LoginResult {
  user: SessionUser | null;
  error?: string;
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return null;
    return toSessionUser(data.user);
  } catch {
    return null;
  }
}

export async function login(emailRaw: string, password: string): Promise<LoginResult> {
  const email = emailRaw.trim().toLowerCase();
  if (!email || !password) return { user: null, error: 'Informe e-mail e senha.' };

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) {
      return {
        user: null,
        error:
          error?.message === 'Invalid login credentials'
            ? 'E-mail ou senha inválidos. O usuário precisa existir no Auth do Supabase.'
            : error?.message || 'Não foi possível autenticar.',
      };
    }
    return { user: toSessionUser(data.user) };
  } catch (err) {
    return {
      user: null,
      error:
        'Falha de conexão com o Supabase. Verifique a URL e a Anon Key informadas. ' +
        ((err as Error)?.message ?? ''),
    };
  }
}

export async function changePassword(novaSenha: string): Promise<boolean> {
  try {
    const { error } = await supabase.auth.updateUser({ password: novaSenha });
    return !error;
  } catch {
    return false;
  }
}

export function onAuthChange(cb: (user: SessionUser | null) => void) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    cb(session?.user ? toSessionUser(session.user) : null);
  });
  return () => data.subscription.unsubscribe();
}

export async function logout(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch {
    /* ignore */
  }
}
