export interface EmpresaConfig {
  nome: string;
  fantasia: string;
  cnpj: string;
  telefone: string;
  email: string;
  endereco: string;
  cidade: string;
  slogan: string;
}

const EMPRESA_KEY = 'erp_abp_empresa';

export const EMPRESA_DEFAULT: EmpresaConfig = {
  nome: 'ERP ABP',
  fantasia: 'ERP ABP',
  cnpj: '',
  telefone: '',
  email: '',
  endereco: '',
  cidade: '',
  slogan: 'Gestão, Estoque, Financeiro e PDV',
};

export function getEmpresa(): EmpresaConfig {
  if (typeof window === 'undefined') return EMPRESA_DEFAULT;
  try {
    const raw = window.localStorage.getItem(EMPRESA_KEY);
    return raw ? { ...EMPRESA_DEFAULT, ...(JSON.parse(raw) as Partial<EmpresaConfig>) } : EMPRESA_DEFAULT;
  } catch {
    return EMPRESA_DEFAULT;
  }
}

export function saveEmpresa(empresa: EmpresaConfig): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(EMPRESA_KEY, JSON.stringify(empresa));
  window.dispatchEvent(new CustomEvent('erp-empresa-updated'));
}

export function empresaLabel(empresa: EmpresaConfig): string {
  return empresa.fantasia?.trim() || empresa.nome?.trim() || EMPRESA_DEFAULT.nome;
}
