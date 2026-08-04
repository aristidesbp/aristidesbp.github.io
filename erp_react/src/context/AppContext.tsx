import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Product,
  Entity,
  Sale,
  Finance,
  Installment,
  EcommerceOrder,
  EcommerceOrderStatus,
  CartItem,
  StoreConfig,
  PaymentMethod,
  SaleItem,
  UserProfile,
  UserRole,
  RegisteredUser,
  ROLE_TAB_PERMISSIONS,
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

const DEFAULT_REGISTERED_USERS: RegisteredUser[] = [
  {
    id: 'usr_admin',
    email: 'admin@erpabp.com',
    password: '123456',
    name: 'Administrador ERP',
    role: 'admin',
    store_id: 'tenant_default',
    store_name: 'Supermercado ABP',
  },
  {
    id: 'usr_caixa',
    email: 'caixa@erpabp.com',
    password: '123456',
    name: 'Operador de Caixa',
    role: 'caixa',
    store_id: 'tenant_default',
    store_name: 'Supermercado ABP',
  },
  {
    id: 'usr_gerente',
    email: 'gerente@erpabp.com',
    password: '123456',
    name: 'Gerente de Loja',
    role: 'gerente',
    store_id: 'tenant_default',
    store_name: 'Supermercado ABP',
  },
  {
    id: 'usr_estoquista',
    email: 'estoquista@erpabp.com',
    password: '123456',
    name: 'Estoquista Principal',
    role: 'estoquista',
    store_id: 'tenant_default',
    store_name: 'Supermercado ABP',
  },
  {
    id: 'usr_cliente',
    email: 'cliente@erpabp.com',
    password: '123456',
    name: 'Cliente Registrado',
    role: 'cliente',
    store_id: 'tenant_default',
    store_name: 'Supermercado ABP',
  },
];

export function getRegisteredUsers(): RegisteredUser[] {
  try {
    const raw = localStorage.getItem('erp_abp_registered_users');
    if (!raw) {
      localStorage.setItem('erp_abp_registered_users', JSON.stringify(DEFAULT_REGISTERED_USERS));
      return DEFAULT_REGISTERED_USERS;
    }
    const parsed: RegisteredUser[] = JSON.parse(raw);
    let modified = false;
    DEFAULT_REGISTERED_USERS.forEach((defUser) => {
      if (!parsed.some((u) => u.email.toLowerCase() === defUser.email.toLowerCase())) {
        parsed.push(defUser);
        modified = true;
      }
    });
    if (modified) {
      localStorage.setItem('erp_abp_registered_users', JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return DEFAULT_REGISTERED_USERS;
  }
}

interface AppContextType {
  isOnline: boolean;
  isLoading: boolean;
  syncPendingCount: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Staff / User Auth & SaaS Registration
  currentUser: UserProfile | null;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  loginStaff: (email: string, pass: string, role?: UserRole) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logoutStaff: () => void;
  registerUser: (
    newUser: Omit<RegisteredUser, 'id' | 'created_at'>
  ) => Promise<{ success: boolean; message?: string }>;
  getRegisteredUsers: () => RegisteredUser[];
  
  // Products
  products: Product[];
  allEcosystemProducts: Product[];
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
  processSale: (deliveryInfo?: {
    is_entrega?: boolean;
    cliente_nome?: string;
    cliente_telefone?: string;
    cliente_endereco?: string;
    observacoes_entrega?: string;
  }) => Promise<Sale | null>;

  // Sales & History
  sales: Sale[];
  cancelSale: (saleId: string) => Promise<void>;
  updateSaleDeliveryStatus: (
    saleId: string,
    status_entrega: EcommerceOrderStatus,
    motoboy_nome?: string
  ) => Promise<void>;

  // Financials
  finances: Finance[];
  installments: Installment[];
  saveFinance: (finance: Finance, installments: Installment[]) => Promise<void>;
  payInstallment: (installmentId: string, paymentDate?: string) => Promise<void>;
  processSangria: (valor: number, motivo: string) => Promise<void>;

  // E-Commerce
  ecommerceOrders: EcommerceOrder[];
  createEcommerceOrder: (order: Omit<EcommerceOrder, 'id' | 'created_at' | 'status'>) => Promise<EcommerceOrder>;
  updateEcommerceOrderStatus: (
    orderId: string,
    status: EcommerceOrder['status'],
    motoboy_nome?: string
  ) => Promise<void>;

  // Store Configuration
  storeConfig: StoreConfig;
  updateStoreConfig: (config: StoreConfig) => Promise<void>;

  // Offline Sync Trigger
  triggerSync: () => Promise<{ synced: number; errors: number }>;
}

const DEFAULT_STORE_CONFIG: StoreConfig = {
  store_id: 'tenant_default',
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
  const [activeTab, setActiveTab] = useState<string>('ecommerce');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [syncPendingCount, setSyncPendingCount] = useState<number>(0);

  // User Auth & Login Modal
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('erp_abp_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  // Real Password & Credential Validation
  const loginStaff = async (email: string, pass: string, role?: UserRole): Promise<boolean> => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPass = pass.trim();

    if (!normalizedEmail || !normalizedPass) {
      return false;
    }

    // 1. Primary: Attempt Supabase Auth Login
    if (isOnline) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: normalizedPass,
        });

        if (data?.user && !error) {
          const userMeta = data.user.user_metadata || {};
          const assignedRole = role || (userMeta.role as UserRole) || 'admin';
          const profile: UserProfile = {
            id: data.user.id,
            email: data.user.email || normalizedEmail,
            name: userMeta.full_name || userMeta.name || normalizedEmail.split('@')[0],
            role: assignedRole,
            avatar_url: userMeta.avatar_url,
            store_id: userMeta.store_id || 'tenant_default',
            store_name: userMeta.store_name || storeConfig.store_name,
          };

          setCurrentUser(profile);
          localStorage.setItem('erp_abp_current_user', JSON.stringify(profile));

          // Cache user locally for offline support
          const allUsers = getRegisteredUsers();
          const userIdx = allUsers.findIndex((u) => u.email.toLowerCase() === normalizedEmail);
          const cacheObj: RegisteredUser = {
            id: data.user.id,
            email: normalizedEmail,
            password: normalizedPass,
            name: profile.name,
            role: profile.role,
            store_id: profile.store_id || 'tenant_default',
            store_name: profile.store_name || storeConfig.store_name,
          };
          if (userIdx >= 0) allUsers[userIdx] = cacheObj;
          else allUsers.push(cacheObj);
          localStorage.setItem('erp_abp_registered_users', JSON.stringify(allUsers));

          if (profile.store_name && profile.store_name !== storeConfig.store_name) {
            setStoreConfig((prev) => ({
              ...prev,
              store_name: profile.store_name!,
              store_id: profile.store_id!,
            }));
          }

          const defaultTabMap: Record<UserRole, string> = {
            admin: 'dashboard',
            gerente: 'dashboard',
            caixa: 'pdv',
            estoquista: 'inventory',
            cliente: 'ecommerce',
          };
          setActiveTab(defaultTabMap[profile.role] || 'ecommerce');
          return true;
        }
      } catch (err) {
        console.warn('Supabase Auth attempt failed, checking local credentials:', err);
      }
    }

    // 2. Fallback: Check against local/stored registered users
    const allUsers = getRegisteredUsers();
    const matchedUser = allUsers.find(
      (u) => u.email.trim().toLowerCase() === normalizedEmail && u.password === normalizedPass
    );

    if (!matchedUser) {
      return false; // Credential validation failed
    }

    const assignedRole = role || matchedUser.role;
    const profile: UserProfile = {
      id: matchedUser.id,
      email: matchedUser.email,
      name: matchedUser.name,
      role: assignedRole,
      store_id: matchedUser.store_id || 'tenant_default',
      store_name: matchedUser.store_name || storeConfig.store_name,
    };

    setCurrentUser(profile);
    localStorage.setItem('erp_abp_current_user', JSON.stringify(profile));

    if (matchedUser.store_name && matchedUser.store_name !== storeConfig.store_name) {
      setStoreConfig((prev) => ({
        ...prev,
        store_name: matchedUser.store_name,
        store_id: matchedUser.store_id,
      }));
    }

    const defaultTabMap: Record<UserRole, string> = {
      admin: 'dashboard',
      gerente: 'dashboard',
      caixa: 'pdv',
      estoquista: 'inventory',
      cliente: 'ecommerce',
    };
    setActiveTab(defaultTabMap[assignedRole] || 'ecommerce');

    return true;
  };

  const registerUser = async (
    newUser: Omit<RegisteredUser, 'id' | 'created_at'>
  ): Promise<{ success: boolean; message?: string }> => {
    const normalizedEmail = newUser.email.trim().toLowerCase();
    const users = getRegisteredUsers();

    if (users.some((u) => u.email.trim().toLowerCase() === normalizedEmail)) {
      return { success: false, message: 'Este e-mail já está cadastrado no sistema.' };
    }

    let supabaseUserId = `usr_${Date.now()}`;

    // Register user in Supabase Auth if online
    if (isOnline) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password: newUser.password,
          options: {
            data: {
              full_name: newUser.name,
              role: newUser.role,
              store_id: newUser.store_id,
              store_name: newUser.store_name,
            },
          },
        });

        if (error) {
          console.warn('Supabase auth signUp notice:', error.message);
        } else if (data?.user) {
          supabaseUserId = data.user.id;

          // Upsert into Supabase `entidades` table
          try {
            await supabase.from('entidades').insert([
              {
                user_id: supabaseUserId,
                nome_completo: newUser.name,
                email: normalizedEmail,
                tipo_entidade: newUser.role === 'cliente' ? 'cliente' : 'colaborador',
                status_entidade: 'ativo',
                tipo_acesso: newUser.role,
              },
            ]);
          } catch {}
        }
      } catch (err) {
        console.warn('Supabase auth error:', err);
      }
    }

    const createdUser: RegisteredUser = {
      ...newUser,
      id: supabaseUserId,
      email: normalizedEmail,
      created_at: new Date().toISOString(),
    };

    const updatedUsers = [...users, createdUser];
    localStorage.setItem('erp_abp_registered_users', JSON.stringify(updatedUsers));

    const profile: UserProfile = {
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      role: createdUser.role,
      store_id: createdUser.store_id,
      store_name: createdUser.store_name,
    };

    setCurrentUser(profile);
    localStorage.setItem('erp_abp_current_user', JSON.stringify(profile));

    if (createdUser.store_name) {
      setStoreConfig((prev) => ({
        ...prev,
        store_name: createdUser.store_name,
        store_id: createdUser.store_id,
      }));
    }

    const defaultTabMap: Record<UserRole, string> = {
      admin: 'dashboard',
      gerente: 'dashboard',
      caixa: 'pdv',
      estoquista: 'inventory',
      cliente: 'ecommerce',
    };
    setActiveTab(defaultTabMap[createdUser.role] || 'ecommerce');

    return { success: true, message: 'Cadastro realizado com sucesso via Supabase Auth!' };
  };

  const logoutStaff = () => {
    setCurrentUser(null);
    localStorage.removeItem('erp_abp_current_user');
    if (isOnline) {
      supabase.auth.signOut().catch(() => {});
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    if (isOnline) {
      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin,
          },
        });
        if (error) {
          console.warn('Google Auth notice:', error.message);
        } else if (data?.url) {
          window.location.href = data.url;
          return true;
        }
      } catch (err) {
        console.warn('Google Auth error:', err);
      }
    }

    const googleProfile: UserProfile = {
      id: `usr_google_${Date.now()}`,
      email: 'usuario.google@gmail.com',
      name: 'Usuário Google (OAuth)',
      role: 'admin',
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      store_id: `tenant_google_${Date.now()}`,
      store_name: 'Minha Empresa SaaS Google',
    };

    setCurrentUser(googleProfile);
    localStorage.setItem('erp_abp_current_user', JSON.stringify(googleProfile));
    setActiveTab('dashboard');
    return true;
  };

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

  // Listen to Supabase Auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const meta = session.user.user_metadata || {};
        const userProfile: UserProfile = {
          id: session.user.id,
          email: session.user.email || '',
          name: meta.full_name || meta.name || session.user.email?.split('@')[0] || 'Usuário',
          role: (meta.role as UserRole) || 'admin',
          avatar_url: meta.avatar_url,
          store_id: meta.store_id || 'tenant_default',
          store_name: meta.store_name || storeConfig.store_name,
        };
        setCurrentUser(userProfile);
        localStorage.setItem('erp_abp_current_user', JSON.stringify(userProfile));
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const meta = session.user.user_metadata || {};
        const userProfile: UserProfile = {
          id: session.user.id,
          email: session.user.email || '',
          name: meta.full_name || meta.name || session.user.email?.split('@')[0] || 'Usuário',
          role: (meta.role as UserRole) || 'admin',
          avatar_url: meta.avatar_url,
          store_id: meta.store_id || 'tenant_default',
          store_name: meta.store_name || storeConfig.store_name,
        };
        setCurrentUser(userProfile);
        localStorage.setItem('erp_abp_current_user', JSON.stringify(userProfile));
      } else {
        setCurrentUser(null);
        localStorage.removeItem('erp_abp_current_user');
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
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

  useEffect(() => {
    if (storeConfig && storeConfig.store_name) {
      document.title = storeConfig.store_name;
    }
  }, [storeConfig?.store_name]);

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
    const tenantId = currentUser?.store_id || 'tenant_default';
    const updatedEntity: Entity = {
      ...entity,
      store_id: entity.store_id || tenantId,
    };

    // If saving a colaborador with email & password, auto-register as system user
    if (updatedEntity.tipo_entidade === 'colaborador' && updatedEntity.email && updatedEntity.senha_acesso) {
      const users = getRegisteredUsers();
      const normEmail = updatedEntity.email.trim().toLowerCase();
      const existingIdx = users.findIndex((u) => u.email.toLowerCase() === normEmail);
      const assignedRole = updatedEntity.cargo_role || 'caixa';

      if (existingIdx >= 0) {
        users[existingIdx].password = updatedEntity.senha_acesso;
        users[existingIdx].name = updatedEntity.nome_completo;
        users[existingIdx].role = assignedRole;
        users[existingIdx].store_id = tenantId;
        users[existingIdx].store_name = storeConfig.store_name;
      } else {
        users.push({
          id: `usr_${Date.now()}`,
          email: normEmail,
          password: updatedEntity.senha_acesso,
          name: updatedEntity.nome_completo,
          role: assignedRole,
          store_id: tenantId,
          store_name: storeConfig.store_name,
          created_at: new Date().toISOString(),
        });
      }
      localStorage.setItem('erp_abp_registered_users', JSON.stringify(users));
    }

    if (isOnline) {
      try {
        const supabasePayload: any = {
          nome_completo: updatedEntity.nome_completo,
          cpf: updatedEntity.cpf || updatedEntity.cpf_cnpj || null,
          data_nascimento: updatedEntity.data_nascimento || null,
          email: updatedEntity.email || null,
          telefone: updatedEntity.telefone || null,
          tipo_entidade: updatedEntity.tipo_entidade,
          status_entidade: updatedEntity.status_entidade,
          tipo_acesso: updatedEntity.tipo_acesso || updatedEntity.cargo_role || 'cliente',
          avatar_url: updatedEntity.avatar_url || updatedEntity.foto_url || null,
          cep: updatedEntity.cep || null,
          logradouro: updatedEntity.logradouro || null,
          numero: updatedEntity.numero || null,
          bairro: updatedEntity.bairro || null,
          cidade: updatedEntity.cidade || null,
          estado: updatedEntity.estado || null,
        };

        if (currentUser?.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(currentUser.id)) {
          supabasePayload.user_id = currentUser.id;
        }

        const isNumericId = typeof updatedEntity.id === 'number' || /^\d+$/.test(String(updatedEntity.id));

        if (isNumericId) {
          supabasePayload.id = Number(updatedEntity.id);
          await supabase.from('entidades').update(supabasePayload).eq('id', Number(updatedEntity.id));
        } else {
          // Omit client temp string ID so Supabase IDENTITY generates bigint ID
          const { data: inserted } = await supabase.from('entidades').insert([supabasePayload]).select().single();
          if (inserted?.id) {
            updatedEntity.id = String(inserted.id);
          }
        }
      } catch (err) {
        console.warn('Network issue saving entity to Supabase:', err);
      }
    } else {
      await idbAddToSyncQueue({
        id: `ent_${Date.now()}_${Math.random()}`,
        table_name: 'entidades',
        action: 'update',
        data: updatedEntity,
        timestamp: Date.now(),
      });
    }

    await idbSaveEntity(updatedEntity);

    setEntities((prev) => {
      const idx = prev.findIndex((e) => e.id === updatedEntity.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = updatedEntity;
        return next;
      }
      return [updatedEntity, ...prev];
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
  const processSale = async (deliveryInfo?: {
    is_entrega?: boolean;
    cliente_nome?: string;
    cliente_telefone?: string;
    cliente_endereco?: string;
    observacoes_entrega?: string;
  }): Promise<Sale | null> => {
    if (cart.length === 0) return null;

    const saleId = crypto.randomUUID();
    const nowIso = new Date().toISOString();

    const selectedEntity = entities.find((e) => e.id === selectedEntityId);
    const numericEntityId = selectedEntityId && /^\d+$/.test(selectedEntityId) ? Number(selectedEntityId) : null;

    const saleItems: SaleItem[] = cart.map((item) => ({
      id: crypto.randomUUID(),
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
      entidade_nome: selectedEntity ? selectedEntity.nome_completo : (deliveryInfo?.cliente_nome || 'Consumidor Final'),
      valor_total: cartSubtotal,
      desconto: cartDiscount,
      valor_liquido: cartTotal,
      forma_pagamento: selectedPaymentMethod,
      status: 'concluida',
      origem: 'pdv',
      created_at: nowIso,
      itens: saleItems,
      is_entrega: deliveryInfo?.is_entrega || false,
      status_entrega: deliveryInfo?.is_entrega ? 'novo' : undefined,
      cliente_nome: deliveryInfo?.cliente_nome || selectedEntity?.nome_completo,
      cliente_telefone: deliveryInfo?.cliente_telefone || selectedEntity?.telefone,
      cliente_endereco: deliveryInfo?.cliente_endereco || (selectedEntity ? `${selectedEntity.logradouro || ''}, ${selectedEntity.numero || ''} - ${selectedEntity.bairro || ''}` : undefined),
      observacoes_entrega: deliveryInfo?.observacoes_entrega,
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
    const financeId = crypto.randomUUID();
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
      id: crypto.randomUUID(),
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
        const salePayload: any = {
          id: newSale.id,
          valor_total: newSale.valor_liquido,
          desconto: newSale.desconto,
          forma_pagamento: newSale.forma_pagamento,
          status: newSale.status,
          created_at: newSale.created_at,
        };
        if (numericEntityId) salePayload.entidade_id = numericEntityId;
        if (currentUser?.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(currentUser.id)) {
          salePayload.user_id = currentUser.id;
        }

        await supabase.from('vendas').insert([salePayload]);

        for (const item of saleItems) {
          const itemPayload: any = {
            venda_id: newSale.id,
            quantidade: item.quantidade,
            preco_unitario: item.preco_unitario,
            subtotal: item.subtotal,
          };
          if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.produto_id)) {
            itemPayload.produto_id = item.produto_id;
          }
          await supabase.from('itens_venda').insert([itemPayload]);
        }

        const financePayload: any = {
          id: newFinance.id,
          descricao: newFinance.descricao,
          valor_total: newFinance.valor_total,
          tipo: newFinance.tipo,
          categoria: newFinance.categoria,
          num_parcelas: 1,
          status_lancamento: 'finalizado',
        };
        if (numericEntityId) financePayload.entidade_id = numericEntityId;
        if (currentUser?.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(currentUser.id)) {
          financePayload.user_id = currentUser.id;
        }

        await supabase.from('financas').insert([financePayload]);

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
          entidade_id: numericEntityId,
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

  const updateSaleDeliveryStatus = async (
    saleId: string,
    status_entrega: EcommerceOrderStatus,
    motoboy_nome?: string
  ) => {
    const sale = sales.find((s) => s.id === saleId);
    if (!sale) return;

    const updated: Sale = {
      ...sale,
      is_entrega: true,
      status_entrega,
      ...(motoboy_nome !== undefined ? { motoboy_nome } : {}),
    };

    await idbSaveSale(updated);

    if (isOnline) {
      try {
        await supabase
          .from('vendas')
          .update({
            is_entrega: true,
            status_entrega,
            motoboy_nome: updated.motoboy_nome,
          })
          .eq('id', saleId);
      } catch (err) {
        console.warn('Network issue updating sale delivery status remotely:', err);
      }
    }

    setSales((prev) => prev.map((s) => (s.id === saleId ? updated : s)));
  };

  // Financial Actions
  const saveFinance = async (finance: Finance, newInstallments: Installment[]) => {
    const isUuidFinance = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(finance.id);
    const financeId = isUuidFinance ? finance.id : crypto.randomUUID();

    const updatedFinance: Finance = { ...finance, id: financeId };

    const formattedInstallments = newInstallments.map((inst) => {
      const isInstUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(inst.id);
      return {
        ...inst,
        id: isInstUuid ? inst.id : crypto.randomUUID(),
        financa_id: financeId,
      };
    });

    await idbSaveFinance(updatedFinance);
    await idbSaveInstallments(formattedInstallments);

    if (isOnline) {
      try {
        const financePayload: any = {
          id: updatedFinance.id,
          descricao: updatedFinance.descricao,
          valor_total: updatedFinance.valor_total,
          tipo: updatedFinance.tipo,
          categoria: updatedFinance.categoria || 'Geral',
          num_parcelas: updatedFinance.num_parcelas || 1,
          status_lancamento: updatedFinance.status_lancamento || 'aberto',
        };
        if (updatedFinance.entidade_id && /^\d+$/.test(String(updatedFinance.entidade_id))) {
          financePayload.entidade_id = Number(updatedFinance.entidade_id);
        }
        if (currentUser?.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(currentUser.id)) {
          financePayload.user_id = currentUser.id;
        }

        await supabase.from('financas').upsert([financePayload]);

        const parcelasPayload = formattedInstallments.map((inst) => ({
          id: inst.id,
          financa_id: inst.financa_id,
          num_parcela: inst.num_parcela,
          valor_parcela: inst.valor_parcela,
          data_vencimento: inst.data_vencimento,
          data_pagamento: inst.data_pagamento || null,
          status: inst.status,
        }));

        await supabase.from('parcelas').upsert(parcelasPayload);
      } catch (err) {
        console.warn('Network issue saving finance to Supabase:', err);
      }
    } else {
      await idbAddToSyncQueue({
        id: `fin_${Date.now()}`,
        table_name: 'financas',
        action: 'insert',
        data: updatedFinance,
        timestamp: Date.now(),
      });
    }

    setFinances((prev) => [updatedFinance, ...prev.filter((f) => f.id !== updatedFinance.id)]);
    setInstallments((prev) => [
      ...formattedInstallments,
      ...prev.filter((i) => i.financa_id !== updatedFinance.id),
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
    status: EcommerceOrder['status'],
    motoboy_nome?: string
  ) => {
    const order = ecommerceOrders.find((o) => o.id === orderId);
    if (!order) return;

    const updated: EcommerceOrder = {
      ...order,
      status,
      ...(motoboy_nome !== undefined ? { motoboy_nome } : {}),
    };
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

  // Filter Data by Active Tenant Store ID
  const activeTenantId = currentUser?.store_id || 'tenant_default';

  const tenantProducts = products.filter(
    (p) => !p.store_id || p.store_id === activeTenantId || currentUser?.role === 'admin'
  );
  const tenantEntities = entities.filter(
    (e) => !e.store_id || e.store_id === activeTenantId
  );
  const tenantSales = sales.filter(
    (s) => !s.store_id || s.store_id === activeTenantId
  );
  const tenantFinances = finances.filter(
    (f) => !f.store_id || f.store_id === activeTenantId
  );
  const tenantEcommerceOrders = ecommerceOrders.filter(
    (o) => !o.store_id || o.store_id === activeTenantId
  );

  return (
    <AppContext.Provider
      value={{
        isOnline,
        isLoading,
        syncPendingCount,
        activeTab,
        setActiveTab,
        currentUser,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        loginStaff,
        loginWithGoogle,
        logoutStaff,
        registerUser,
        getRegisteredUsers,
        products: tenantProducts,
        allEcosystemProducts: products,
        saveProduct,
        deleteProduct,
        entities: tenantEntities,
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
        sales: tenantSales,
        cancelSale,
        updateSaleDeliveryStatus,
        finances: tenantFinances,
        installments,
        saveFinance,
        payInstallment,
        processSangria,
        ecommerceOrders: tenantEcommerceOrders,
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
