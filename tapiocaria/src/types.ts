export type CategoryId = 'todos' | 'tradicionais' | 'especiais' | 'doces' | 'bebidas';

export interface CategoryOption {
  id: CategoryId;
  name: string;
  icon: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Exclude<CategoryId, 'todos'>;
  image: string;
  isPopular?: boolean;
  isGlutenFree?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export type PaymentMethod = 'PIX' | 'Cartão de Crédito/Débito' | 'Dinheiro';
export type DeliveryType = 'delivery' | 'pickup';

export interface DeliveryInfo {
  name: string;
  phone: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  deliveryType: DeliveryType;
  paymentMethod: PaymentMethod;
  changeFor: string; // Troco para R$
  orderNotes: string;
}
