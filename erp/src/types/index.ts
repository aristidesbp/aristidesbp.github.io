export type EntityType = 'cliente' | 'fornecedor' | 'colaborador';
export type EntityStatus = 'ativo' | 'inativo';

export interface Entity {
  id: string;
  nome_completo: string;
  cpf_cnpj?: string;
  data_nascimento?: string;
  email?: string;
  telefone?: string;
  tipo_entidade: EntityType;
  status_entidade: EntityStatus;
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
  created_at?: string;
}

export type ProductUnit = 'UN' | 'KG' | 'CX' | 'L' | 'M' | 'PCT' | 'G';

export interface Product {
  id: string;
  nome: string;
  codigo_barras?: string;
  categoria: string;
  unidade: ProductUnit;
  preco_custo: number;
  preco_venda: number;
  quantidade_estoque: number;
  estoque_minimo: number;
  descricao?: string;
  foto_url?: string;
  ativo?: boolean;
  created_at?: string;
}

export type PaymentMethod = 'Dinheiro' | 'PIX' | 'Cartão de Crédito' | 'Cartão de Débito' | 'Fiado';

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
}

export interface StoreConfig {
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
