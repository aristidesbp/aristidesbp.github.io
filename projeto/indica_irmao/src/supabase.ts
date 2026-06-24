import { createClient } from '@supabase/supabase-js';

export interface Categoria {
  id: number;
  created_at: string;
  tipo_de_categoria: string;
}

export interface UsuarioEspelho {
  id: number;
  created_at: string;
  auth_users_id: string;
  nome_completo: string | null;
  bio: string | null;
  avatar_url: string | null;
}

export interface Servico {
  id: number;
  created_at: string;
  titulo: string;
  descricao: string | null;
  categoria: number | null;
  preco_estimado: number | null;
  preco_detalhe: string | null;
  foto_url: string | null;
  criado_por_usuario: number | null;
  terceiro: boolean;
  eu_mesmo: boolean;
  whatsapp: string | null;
  
  // Joined fields for easy UI rendering
  categorias?: Categoria;
  usuario_espelho?: UsuarioEspelho;
}

export interface Favorito {
  id: number;
  created_at: string;
  usuario_id: number;
  servico_id: number;
  servicos?: Servico;
}

export interface Avaliacao {
  id: number;
  created_at: string;
  servico_id: number;
  author_id: number;
  nota: number;
  comentario: string | null;
  usuario_espelho?: UsuarioEspelho;
}

// Environment variables
const rawUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').trim();
const supabaseAnonKey = ((import.meta as any).env.VITE_SUPABASE_ANON_KEY || '').trim();

// Initialize client only if variables are available to prevent crash
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://your-supabase-project.supabase.co');

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder-project.supabase.co', 'placeholder-key'); // Fallback to avoid null errors on load
