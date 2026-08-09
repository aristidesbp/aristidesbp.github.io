export type TipoEntidade = 'cliente' | 'fornecedor' | 'colaborador';
export type StatusEntidade = 'ativo' | 'inativo';

export interface Entidade {
  id: string;
  user_id?: string | undefined;
  nome_completo: string;
  cpf?: string | undefined;
  data_nascimento?: string | undefined;
  email?: string | undefined;
  telefone?: string | undefined;
  tipo_entidade: TipoEntidade;
  status_entidade: StatusEntidade;
  cep?: string | undefined;
  logradouro?: string | undefined;
  numero?: string | undefined;
  bairro?: string | undefined;
  cidade?: string | undefined;
  estado?: string | undefined;
  foto_url?: string | undefined;
  created_at?: string | undefined;
}

export interface Produto {
  id: string;
  user_id?: string | undefined;
  nome: string;
  descricao?: string | undefined;
  codigo_barras?: string | undefined;
  preco_custo: number;
  preco_venda: number;
  quantidade_estoque: number;
  estoque_minimo: number;
  categoria: string;
  foto_url?: string | undefined;
  created_at?: string | undefined;
}

export type TipoFinanca = 'receita' | 'despesa';
export type StatusFinanca = 'aberto' | 'finalizado' | 'cancelado';
export type StatusParcela = 'pendente' | 'pago' | 'atrasado';

export interface Financa {
  id: string;
  user_id?: string | undefined;
  entidade_id?: string | undefined;
  descricao: string;
  valor_total: number;
  tipo: TipoFinanca;
  num_parcelas: number;
  categoria: string;
  status_lancamento: StatusFinanca;
  created_at?: string | undefined;
  entidades?: Partial<Entidade> | undefined;
}

export interface Parcela {
  id: string;
  financa_id: string;
  num_parcela: number;
  valor_parcela: number;
  data_vencimento: string;
  data_pagamento?: string | null | undefined;
  status: StatusParcela;
  codigo_barra?: string | undefined;
  boleto_url?: string | undefined;
  comprovante_url?: string | undefined;
  created_at?: string | undefined;
  financas?: Financa | undefined;
}

export type FormaPagamento = 'Dinheiro' | 'PIX' | 'Cartão de Crédito' | 'Cartão de Débito';

export interface Venda {
  id: string;
  user_id?: string | undefined;
  entidade_id?: string | null | undefined;
  valor_total: number;
  desconto: number;
  forma_pagamento: FormaPagamento;
  status: 'concluida' | 'pendente' | 'cancelada';
  created_at?: string | undefined;
  entidades?: Partial<Entidade> | undefined;
}

export interface ItemVenda {
  id: string;
  venda_id: string;
  produto_id: string;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
  created_at?: string | undefined;
  produtos?: Partial<Produto> | undefined;
}

export interface ItemCarrinho extends Produto {
  quantidadeCarrinho: number;
}

/** Partial que aceita explicitamente `undefined` (exactOptionalPropertyTypes). */
export type Input<T> = { [K in keyof T]?: T[K] | undefined };
export type EntidadeInput = Input<Entidade>;
export type ProdutoInput = Input<Produto>;
