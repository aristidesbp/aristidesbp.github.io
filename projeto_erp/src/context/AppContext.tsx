import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Product,
  Entity,
  Sale,
  Finance,
  Installment,
  EcommerceOrder,
  CartItem,
  StoreConfig,
  PaymentMethod,
  SaleItem,
} from '../types';
import { initialDataLoad, flushSyncQueue, syncSaveProduct, syncDeleteProduct } from '../lib/syncService';
import {
  idbSaveProduct,
  idbSaveEntity,
  idbDeleteEntity,
  idbSaveSale,
  idbSaveFinance,
  idbSaveInstallments,
  idbSaveEcommerceOrder,
  idbGetAllEcommerceOrders,
  idbSaveSettings,
  idbGetSettings,
  idbAddToSyncQueue,
  idbGetSyncQueue,
} from '../lib/offlineDb';
import { checkSupabaseConnection, supabase } from '../lib/supabase';

interface AppContextType {
  isOnline: boolean;
  isLoading: boolean;
  syncPendingCount: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Products
  products: Product[];
  saveProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  
  // Entities
  entities: Entity[];
  saveEntity: (entity: Entity) => Promise<void>;
  deleteEntity: (id: string) => Promise<void>;
  
  // PDV / Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  setCartDiscount: (discount: number) => void;
  cartTotal: number;
  selectedEntityId: string | null;
  setSelectedEntityId: (id: string | null) => void;
  selectedPaymentMethod: PaymentMethod;
  setSelectedPaymentMethod: (method: PaymentMethod) => void;
  processSale: () => Promise<Sale | null>;

  // Sales & History
  sales: Sale[];
  cancelSale: (saleId: string) => Promise<void>;

  // Financials
  finances: Finance[];
  installments: Installment[];
  saveFinance: (finance: Finance, installments: Installment[]) => Promise<void>;
  payInstallment: (installmentId: string, paymentDate?: string) => Promise<void>;
  processSangria: (valor: number, motivo: string) => Promise<void>;

  // E-Commerce
  ecommerceOrders: EcommerceOrder[];
  createEcommerceOrder: (order: Omit<EcommerceOrder, 'id' | 'created_at' | 'status'>) => Promise<EcommerceOrder>;
  updateEcommerceOrderStatus: (orderId: string, status: EcommerceOrder['status']) => Promise<void>;

  // Store Configuration
  storeConfig: StoreConfig;
  updateStoreConfig: (config: StoreConfig) => Promise<void>;

  // Offline Sync Trigger
  triggerSync: () => Promise<{ synced: number; errors: number }>;
}

const DEFAULT_STORE_CONFIG: StoreConfig = {
  store_name: 'Supermercado ABP',
  cnpj: '12.345.678/0001-99',
  phone: '(11) 98765-4321',
  address: 'Av. Principal, 1000 - Centro, São Paulo - SP',
  receipt_footer: 'Obrigado pela preferência! Volte Sempre!',
  auto_sync: true,
  min_stock_alert: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [syncPendingCount, setSyncPendingCount] = useState<number>(0);

  const [products, setProducts] = useState<Product[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [finances, setFinances] = useState<Finance[]>([]);
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [ecommerceOrders, setEcommerceOrders] = useState<EcommerceOrder[]>([]);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartDiscount, setCartDiscount] = useState<number>(0);
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('Dinheiro');

  // Store Config
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(DEFAULT_STORE_CONFIG);

  // Load Initial Data
  const loadInitialData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await initialDataLoad();
      setIsOnline(data.isOnline);
      setProducts(data.products);
      setEntities(data.entities);
      setSales(data.sales);
      setFinances(data.finances);
      setInstallments(data.installments);

      const savedOrders = await idbGetAllEcommerceOrders();
      setEcommerceOrders(savedOrders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));

      const savedConfig = await idbGetSettings();
      if (savedConfig) setStoreConfig(savedConfig);

      const queue = await idbGetSyncQueue();
      setSyncPendingCount(queue.length);
    } catch (err) {
      console.error('Error loading initial data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();

    const handleOnline = () => {
      setIsOnline(true);
      triggerSync();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [loadInitialData]);

  // Sync Trigger
  const triggerSync = async () => {
    const onlineStatus = await checkSupabaseConnection();
    setIsOnline(onlineStatus);
    if (!onlineStatus) return { synced: 0, errors: 0 };

    const res = await flushSyncQueue();
    const queue = await idbGetSyncQueue();
    setSyncPendingCount(queue.length);

    if (res.syncedCount > 0) {
      await loadInitialData();
    }
    return { synced: res.syncedCount, errors: res.errorsCount };
  };

  // Product Actions
  const saveProduct = async (product: Product) => {
    await syncSaveProduct(product, isOnline);
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = product;
        return next;
      }
      return [product, ...prev];
    });
  };

  const deleteProduct = async (id: string) => {
    await syncDeleteProduct(id, isOnline);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Entity Actions
  const saveEntity = async (entity: Entity) => {
    await idbSaveEntity(entity);
    if (isOnline) {
      await supabase.from('entidades').upsert([entity]);
    } else {
      await idbAddToSyncQueue({
        id: `ent_${Date.now()}_${Math.random()}`,
        table_name: 'entidades',
        action: 'update',
        data: entity,
        timestamp: Date.now(),
      });
    }
    setEntities((prev) => {
      const idx = prev.findIndex((e) => e.id === entity.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = entity;
        return next;
      }
      return [entity, ...prev];
    });
  };

  const deleteEntity = async (id: string) => {
    await idbDeleteEntity(id);
    if (isOnline) {
      await supabase.from('entidades').delete().eq('id', id);
    } else {
      await idbAddToSyncQueue({
        id: `del_ent_${Date.now()}`,
        table_name: 'entidades',
        action: 'delete',
        data: { id },
        timestamp: Date.now(),
      });
    }
    setEntities((prev) => prev.filter((e) => e.id !== id));
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.subtotal, 0);
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((i) => i.product.id === product.id);
      if (existingIdx >= 0) {
        const updated = [...prevCart];
        const newQty = updated[existingIdx].quantity + quantity;
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
          subtotal: newQty * product.preco_venda,
        };
        return updated;
      }
      return [
        ...prevCart,
        {
          product,
          quantity,
          unitPrice: product.preco_venda,
          subtotal: quantity * product.preco_venda,
        },
      ];
    });
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              subtotal: newQty * item.unitPrice,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setCartDiscount(0);
    setSelectedEntityId(null);
  };

  // Process POS Sale
  const processSale = async (): Promise<Sale | null> => {
    if (cart.length === 0) return null;

    const saleId = `venda_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const nowIso = new Date().toISOString();

    const selectedEntity = entities.find((e) => e.id === selectedEntityId);

    const saleItems: SaleItem[] = cart.map((item) => ({
      id: `item_${Date.now()}_${Math.random()}`,
      venda_id: saleId,
      produto_id: item.product.id,
      produto_nome: item.product.nome,
      codigo_barras: item.product.codigo_barras,
      unidade: item.product.unidade,
      quantidade: item.quantity,
      preco_unitario: item.unitPrice,
      subtotal: item.subtotal,
    }));

    const newSale: Sale = {
      id: saleId,
      entidade_id: selectedEntityId,
      entidade_nome: selectedEntity ? selectedEntity.nome_completo : 'Consumidor Final',
      valor_total: cartSubtotal,
      desconto: cartDiscount,
      valor_liquido: cartTotal,
      forma_pagamento: selectedPaymentMethod,
      status: 'concluida',
      origem: 'pdv',
      created_at: nowIso,
      itens: saleItems,
    };

    // Save Sale to IndexedDB
    await idbSaveSale(newSale);

    // Deduct Product Quantities
    for (const item of cart) {
      const updatedStock = Math.max(0, item.product.quantidade_estoque - item.quantity);
      const updatedProd: Product = {
        ...item.product,
        quantidade_estoque: updatedStock,
      };
      await saveProduct(updatedProd);
    }

    // Auto-create financial revenue record for POS sale
    const financeId = `fin_venda_${Date.now()}`;
    const newFinance: Finance = {
      id: financeId,
      entidade_id: selectedEntityId,
      entidade_nome: newSale.entidade_nome,
      descricao: `Venda PDV #${saleId.slice(-6).toUpperCase()} (${selectedPaymentMethod})`,
      tipo: 'receita',
      categoria: 'Vendas',
      valor_total: cartTotal,
      num_parcelas: 1,
      status_lancamento: 'finalizado',
      created_at: nowIso,
    };

    const newInstallment: Installment = {
      id: `parc_${financeId}_1`,
      financa_id: financeId,
      num_parcela: 1,
      total_parcelas: 1,
      valor_parcela: cartTotal,
      data_vencimento: nowIso.split('T')[0],
      data_pagamento: nowIso.split('T')[0],
      status: 'pago',
    };

    await idbSaveFinance(newFinance);
    await idbSaveInstallments([newInstallment]);

    // Push to Supabase if online
    if (isOnline) {
      try {
        await supabase.from('vendas').insert([{
          id: newSale.id,
          entidade_id: newSale.entidade_id,
          valor_total: newSale.valor_liquido,
          desconto: newSale.desconto,
          forma_pagamento: newSale.forma_pagamento,
          status: newSale.status,
          created_at: newSale.created_at,
        }]);

        for (const item of saleItems) {
          await supabase.from('itens_venda').insert([{
            venda_id: newSale.id,
            produto_id: item.produto_id,
            quantidade: item.quantidade,
            preco_unitario: item.preco_unitario,
            subtotal: item.subtotal,
          }]);
        }

        await supabase.from('financas').insert([{
          id: newFinance.id,
          entidade_id: newFinance.entidade_id,
          descricao: newFinance.descricao,
          valor_total: newFinance.valor_total,
          tipo: newFinance.tipo,
          categoria: newFinance.categoria,
          num_parcelas: 1,
          status_lancamento: 'finalizado',
        }]);

        await supabase.from('parcelas').insert([{
          id: newInstallment.id,
          financa_id: newInstallment.financa_id,
          num_parcela: 1,
          valor_parcela: newInstallment.valor_parcela,
          data_vencimento: newInstallment.data_vencimento,
          data_pagamento: newInstallment.data_pagamento,
          status: 'pago',
        }]);
      } catch (err) {
        console.warn('Network issue saving sale to remote; saved locally.', err);
      }
    } else {
      await idbAddToSyncQueue({
        id: `sale_q_${Date.now()}`,
        table_name: 'vendas',
        action: 'insert',
        data: {
          id: newSale.id,
          entidade_id: newSale.entidade_id,
          valor_total: newSale.valor_liquido,
          desconto: newSale.desconto,
          forma_pagamento: newSale.forma_pagamento,
          status: newSale.status,
          created_at: newSale.created_at,
        },
        timestamp: Date.now(),
      });
    }

    setSales((prev) => [newSale, ...prev]);
    setFinances((prev) => [newFinance, ...prev]);
    setInstallments((prev) => [newInstallment, ...prev]);

    clearCart();
    return newSale;
  };

  // Cancel Sale & Restore Stock
  const cancelSale = async (saleId: string) => {
    const sale = sales.find((s) => s.id === saleId);
    if (!sale) return;

    // Restore stock if sale items exist
    if (sale.itens) {
      for (const item of sale.itens) {
        const prod = products.find((p) => p.id === item.produto_id);
        if (prod) {
          await saveProduct({
            ...prod,
            quantidade_estoque: prod.quantidade_estoque + item.quantidade,
          });
        }
      }
    }

    const updatedSale: Sale = { ...sale, status: 'cancelada' };
    await idbSaveSale(updatedSale);

    if (isOnline) {
      await supabase.from('vendas').update({ status: 'cancelada' }).eq('id', saleId);
    }

    setSales((prev) => prev.map((s) => (s.id === saleId ? updatedSale : s)));
  };

  // Financial Actions
  const saveFinance = async (finance: Finance, newInstallments: Installment[]) => {
    await idbSaveFinance(finance);
    await idbSaveInstallments(newInstallments);

    if (isOnline) {
      await supabase.from('financas').upsert([finance]);
      await supabase.from('parcelas').upsert(newInstallments);
    } else {
      await idbAddToSyncQueue({
        id: `fin_${Date.now()}`,
        table_name: 'financas',
        action: 'insert',
        data: finance,
        timestamp: Date.now(),
      });
    }

    setFinances((prev) => [finance, ...prev.filter((f) => f.id !== finance.id)]);
    setInstallments((prev) => [
      ...newInstallments,
      ...prev.filter((i) => i.financa_id !== finance.id),
    ]);
  };

  const payInstallment = async (installmentId: string, paymentDate?: string) => {
    const inst = installments.find((i) => i.id === installmentId);
    if (!inst) return;

    const today = paymentDate || new Date().toISOString().split('T')[0];
    const updated: Installment = {
      ...inst,
      status: 'pago',
      data_pagamento: today,
    };

    await idbSaveInstallments([updated]);

    if (isOnline) {
      await supabase
        .from('parcelas')
        .update({ status: 'pago', data_pagamento: today })
        .eq('id', installmentId);
    }

    setInstallments((prev) => prev.map((i) => (i.id === installmentId ? updated : i)));
  };

  const processSangria = async (valor: number, motivo: string) => {
    const nowIso = new Date().toISOString();
    const today = nowIso.split('T')[0];
    const finId = `sangria_${Date.now()}`;

    const newFinance: Finance = {
      id: finId,
      descricao: `Sangria de Caixa: ${motivo}`,
      tipo: 'despesa',
      categoria: 'Sangria',
      valor_total: valor,
      num_parcelas: 1,
      status_lancamento: 'finalizado',
      created_at: nowIso,
    };

    const newInst: Installment = {
      id: `parc_${finId}_1`,
      financa_id: finId,
      num_parcela: 1,
      total_parcelas: 1,
      valor_parcela: valor,
      data_vencimento: today,
      data_pagamento: today,
      status: 'pago',
    };

    await saveFinance(newFinance, [newInst]);
  };

  // E-Commerce Actions
  const createEcommerceOrder = async (
    orderData: Omit<EcommerceOrder, 'id' | 'created_at' | 'status'>
  ): Promise<EcommerceOrder> => {
    const newOrder: EcommerceOrder = {
      ...orderData,
      id: `ord_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      status: 'novo',
      created_at: new Date().toISOString(),
    };

    await idbSaveEcommerceOrder(newOrder);
    setEcommerceOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateEcommerceOrderStatus = async (
    orderId: string,
    status: EcommerceOrder['status']
  ) => {
    const order = ecommerceOrders.find((o) => o.id === orderId);
    if (!order) return;

    const updated = { ...order, status };
    await idbSaveEcommerceOrder(updated);

    // If order is delivered, deduct stock and convert to completed sale
    if (status === 'entregue' && order.status !== 'entregue') {
      for (const item of order.itens) {
        const prod = products.find((p) => p.id === item.product.id);
        if (prod) {
          await saveProduct({
            ...prod,
            quantidade_estoque: Math.max(0, prod.quantidade_estoque - item.quantity),
          });
        }
      }
    }

    setEcommerceOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
  };

  // Store Configuration
  const updateStoreConfig = async (newConfig: StoreConfig) => {
    setStoreConfig(newConfig);
    await idbSaveSettings(newConfig);
  };

  return (
    <AppContext.Provider
      value={{
        isOnline,
        isLoading,
        syncPendingCount,
        activeTab,
        setActiveTab,
        products,
        saveProduct,
        deleteProduct,
        entities,
        saveEntity,
        deleteEntity,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartDiscount,
        setCartDiscount,
        cartTotal,
        selectedEntityId,
        setSelectedEntityId,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        processSale,
        sales,
        cancelSale,
        finances,
        installments,
        saveFinance,
        payInstallment,
        processSangria,
        ecommerceOrders,
        createEcommerceOrder,
        updateEcommerceOrderStatus,
        storeConfig,
        updateStoreConfig,
        triggerSync,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
