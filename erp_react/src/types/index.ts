export type UserRole = 'admin' | 'gerente' | 'caixa' | 'estoquista' | 'cliente';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar_url?: string;
  store_id?: string;
  store_name?: string;
}

export interface RegisteredUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  store_id: string;
  store_name: string;
  created_at?: string;
}

export const ROLE_TAB_PERMISSIONS: Record<UserRole, string[]> = {
  admin: [
    'ecommerce',
    'deliveries',
    'chat',
    'dashboard',
    'pdv',
    'sales_history',
    'inventory',
    'entities',
    'financial',
    'reports',
    'settings',
    'tutorial',
  ],
  gerente: [
    'ecommerce',
    'deliveries',
    'chat',
    'dashboard',
    'pdv',
    'sales_history',
    'inventory',
    'entities',
    'financial',
    'reports',
    'tutorial',
  ],
  caixa: [
    'ecommerce',
    'pdv',
    'sales_history',
    'deliveries',
    'chat',
    'tutorial',
  ],
  estoquista: [
    'ecommerce',
    'inventory',
    'deliveries',
    'tutorial',
  ],
  cliente: [
    'ecommerce',
    'chat',
    'tutorial',
  ],
};

export type EntityType = 'cliente' | 'fornecedor' | 'colaborador';
export type EntityStatus = 'ativo' | 'inativo';

export interface Entity {
  id: string;
  nome_completo: string;
  cpf_cnpj?: string;
  cpf?: string;
  data_nascimento?: string;
  email?: string;
  telefone?: string;
  tipo_entidade: EntityType;
  status_entidade: EntityStatus;
  tipo_acesso?: string;
  avaliacao?: number;
  bio?: string;
  avatar_url?: string;
  limite_credito?: number;
  saldo_devedor?: number;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  foto_url?: string;
  cargo_role?: UserRole;
  senha_acesso?: string;
  store_id?: string;
  created_at?: string;
}

export type ProductUnit = 'UN' | 'KG' | 'CX' | 'L' | 'M' | 'PCT' | 'G';

export interface Product {
  id: string;
  nome: string;
  codigo_barras?: string;
  categoria: string;
  unidade: ProductUnit;
  unidade_medida?: string;
  preco_custo: number;
  preco_venda: number;
  quantidade_estoque: number;
  estoque_minimo: number;
  descricao?: string;
  foto_url?: string;
  ncm?: string;
  cest?: string;
  cfop_entrada?: string;
  ativo?: boolean;
  store_id?: string;
  created_at?: string;
}

export type PaymentMethod =
  | 'Dinheiro'
  | 'PIX'
  | 'Cartão de Crédito'
  | 'Cartão de Débito'
  | 'Fiado'
  | 'Mercado Pago PIX'
  | 'Mercado Pago Cartão'
  | 'Mercado Pago Boleto';

export interface CartItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Sale {
  id: string;
  entidade_id?: string | null;
  entidade_nome?: string;
  valor_total: number;
  desconto: number;
  valor_liquido: number;
  forma_pagamento: PaymentMethod;
  status: 'concluida' | 'cancelada';
  origem: 'pdv' | 'ecommerce';
  created_at: string;
  itens?: SaleItem[];
  store_id?: string;
  // Delivery details
  is_entrega?: boolean;
  status_entrega?: EcommerceOrderStatus;
  cliente_nome?: string;
  cliente_telefone?: string;
  cliente_endereco?: string;
  motoboy_nome?: string;
  observacoes_entrega?: string;
}

export interface SaleItem {
  id?: string;
  venda_id?: string;
  produto_id: string;
  produto_nome: string;
  codigo_barras?: string;
  unidade?: string;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
}

export type FinanceType = 'receita' | 'despesa';
export type FinanceStatus = 'aberto' | 'finalizado' | 'cancelado';

export interface Finance {
  id: string;
  entidade_id?: string | null;
  entidade_nome?: string;
  descricao: string;
  tipo: FinanceType;
  categoria: string;
  valor_total: number;
  num_parcelas: number;
  status_lancamento: FinanceStatus;
  created_at?: string;
  parcelas?: Installment[];
  store_id?: string;
}

export type InstallmentStatus = 'pendente' | 'pago' | 'atrasado';

export interface Installment {
  id: string;
  financa_id: string;
  num_parcela: number;
  total_parcelas?: number;
  valor_parcela: number;
  data_vencimento: string;
  data_pagamento?: string | null;
  status: InstallmentStatus;
  codigo_barra?: string;
  boleto_url?: string;
  comprovante_url?: string;
  comprovante_idb_id?: string;
}

export type EcommerceOrderStatus = 'novo' | 'separando' | 'em_transito' | 'entregue' | 'cancelado';

export interface EcommerceOrder {
  id: string;
  cliente_nome: string;
  cliente_telefone: string;
  cliente_endereco: string;
  itens: CartItem[];
  subtotal: number;
  taxa_entrega: number;
  total: number;
  forma_pagamento: PaymentMethod;
  status: EcommerceOrderStatus;
  observacoes?: string;
  created_at: string;
  motoboy_nome?: string;
  store_id?: string;
}

export interface StoreConfig {
  store_id?: string;
  store_name: string;
  cnpj: string;
  phone: string;
  address: string;
  receipt_footer: string;
  auto_sync: boolean;
  min_stock_alert: boolean;
}

export interface SyncQueueItem {
  id: string;
  table_name: 'produtos' | 'entidades' | 'vendas' | 'itens_venda' | 'financas' | 'parcelas';
  action: 'insert' | 'update' | 'delete';
  data: any;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  chat_id: string;
  sender: 'customer' | 'store' | 'bot_n8n';
  sender_name?: string;
  text: string;
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  media_url?: string;
  product_attachment?: Product;
  n8n_processed?: boolean;
}

export interface CustomerChat {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_avatar?: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  status: 'online' | 'offline';
  ai_enabled: boolean;
  messages: ChatMessage[];
  n8n_session_id?: string;
}

export interface N8nWebhookConfig {
  webhook_url: string;
  api_key?: string;
  auto_respond_ai: boolean;
  webhook_status: 'idle' | 'success' | 'error';
  last_payload?: any;
}

export interface MercadoPagoConfig {
  public_key: string;
  access_token: string;
  sandbox_mode: boolean;
  pix_enabled: boolean;
  credit_card_enabled: boolean;
  boleto_enabled: boolean;
  statement_descriptor: string;
}
