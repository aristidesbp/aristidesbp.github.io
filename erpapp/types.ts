
export type TransactionType = 'entrada' | 'saida';

export interface BankAccount {
  id: string;
  name: string;
  type: string;
  balance: number;
  agency?: string;
  accountNumber?: string;
  nickname?: string;
  color?: string;
}

export interface Entity {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  category: string;
  relationship: string;
  company: string;
  accessLevel: string;
  photo?: string;
  notes?: string;
}

export interface Installment {
  id: string;
  dueDate: string;
  payDate?: string;
  amount: number;
  qty: number;
  type: TransactionType;
  description: string;
  category: string;
  barcode?: string;
  entityId?: string;
  notes?: string;
  status: 'pendente' | 'pago' | 'atrasado' | 'agendado';
}

export interface UserConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  darkMode: boolean;
  autoSync: boolean;
  language: string;
  termsAccepted: boolean;
}

export type AppView = 'login' | 'terms' | 'dashboard' | 'entities' | 'installments' | 'settings' | 'accounts' | 'entity-form' | 'installment-form' | 'account-form' | 'tutorial';
