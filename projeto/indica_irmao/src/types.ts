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
  
  // Joined fields
  categorias?: Categoria;
  usuario_espelho?: UsuarioEspelho;
}

export interface Favorito {
  id: number;
  created_at: string;
  usuario_id: number;
  servico_id: number;
  servico?: Servico;
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

export interface Mensagem {
  id: number;
  created_at: string;
  sender_id: number; // usuario_espelho ID
  receiver_id: number; // usuario_espelho ID
  texto: string;
  servico_id: number | null;
}

export interface ChatThread {
  otherUser: UsuarioEspelho;
  lastMessage: Mensagem;
  messages: Mensagem[];
}
