import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDateTimeBR } from '../../lib/sanitizer';
import { Product, PaymentMethod, CartItem, EcommerceOrder } from '../../types';
import {
  Store,
  ShoppingBag,
  Search,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  Truck,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  PackageCheck,
  User,
  X,
  CreditCard,
} from 'lucide-react';

export const EcommerceView: React.FC = () => {
  const {
    products,
    ecommerceOrders,
    createEcommerceOrder,
    updateEcommerceOrderStatus,
    storeConfig,
  } = useApp();

  const [viewMode, setViewMode] = useState<'storefront' | 'admin'>('storefront');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Online Store Cart State
  const [storeCart, setStoreCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Customer Checkout Form
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [custPayment, setCustPayment] = useState<PaymentMethod>('PIX');
  const [custObs, setCustAddressObs] = useState('');
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  const categories = Array.from(new Set(products.map((p) => p.categoria || 'Geral')));

  const availableProducts = products.filter((p) => p.quantidade_estoque > 0);

  const filteredProducts = availableProducts.filter((p) => {
    const matchesSearch = p.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? p.categoria === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const cartSubtotal = storeCart.reduce((acc, item) => acc + item.subtotal, 0);
  const deliveryFee = cartSubtotal > 100 ? 0 : 8.5; // Free delivery over R$100
  const cartTotal = cartSubtotal + deliveryFee;

  const handleAddToCart = (product: Product) => {
    setStoreCart((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id);
      if (idx >= 0) {
        const updated = [...prev];
        const newQty = updated[idx].quantity + 1;
        updated[idx] = {
          ...updated[idx],
          quantity: newQty,
          subtotal: newQty * product.preco_venda,
        };
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          unitPrice: product.preco_venda,
          subtotal: product.preco_venda,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setStoreCart((prev) =>
      prev
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
        .filter(Boolean) as CartItem[]
    );
  };

  const handlePlaceOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim() || !custPhone.trim() || !custAddress.trim()) {
      alert('Preencha seu Nome, Telefone e Endereço de Entrega.');
      return;
    }

    if (storeCart.length === 0) {
      alert('Sua sacola de compras está vazia.');
      return;
    }

    await createEcommerceOrder({
      cliente_nome: custName,
      cliente_telefone: custPhone,
      cliente_endereco: custAddress,
      itens: storeCart,
      subtotal: cartSubtotal,
      taxa_entrega: deliveryFee,
      total: cartTotal,
      forma_pagamento: custPayment,
      observacoes: custObs,
    });

    setIsCheckoutSuccess(true);
    setStoreCart([]);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header Mode Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 dark:text-white text-lg">
              Loja Virtual & Delivery do Supermercado
            </h2>
            <p className="text-xs text-slate-400">Catálogo online para pedidos de clientes e gestão de entregas</p>
          </div>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setViewMode('storefront')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              viewMode === 'storefront'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Loja Virtual (Visão do Cliente)
          </button>
          <button
            onClick={() => setViewMode('admin')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              viewMode === 'admin'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" /> Pedidos Recebidos ({ecommerceOrders.length})
          </button>
        </div>
      </div>

      {/* MODE 1: PUBLIC STOREFRONT FOR ONLINE CUSTOMERS */}
      {viewMode === 'storefront' && (
        <div className="space-y-6">
          {/* Store Banner */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-md flex justify-between items-center">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full">
                Entrega Rápida Supermercado
              </span>
              <h3 className="text-2xl font-black mt-2">{storeConfig.store_name} Online</h3>
              <p className="text-xs text-emerald-100 mt-1">
                Frete Grátis para compras acima de R$ 100,00 • Entrega expressa na sua casa
              </p>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-white text-emerald-800 font-extrabold px-4 py-3 rounded-xl shadow-lg hover:bg-emerald-50 transition flex items-center gap-2 text-xs relative"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <span>Sacola ({storeCart.reduce((a, b) => a + b.quantity, 0)})</span>
              {storeCart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {storeCart.length}
                </span>
              )}
            </button>
          </div>

          {/* Search & Categories */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar produtos no mercado..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium outline-none"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === ''
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Todas
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                    selectedCategory === c
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {p.categoria || 'Geral'}
                  </span>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-xs mt-1 line-clamp-2">
                    {p.nome}
                  </h4>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="font-black text-sm text-emerald-600 dark:text-emerald-400 font-mono">
                    {formatCurrency(p.preco_venda)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(p)}
                    className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-xs transition"
                    title="Adicionar à Sacola"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODE 2: ADMIN OPERATOR DELIVERY MANAGEMENT */}
      {viewMode === 'admin' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">
              Gerenciamento de Pedidos E-Commerce / Delivery
            </h3>

            {ecommerceOrders.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Truck className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="font-bold text-sm">Nenhum pedido delivery recebido ainda.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {ecommerceOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                      <div>
                        <span className="font-mono font-bold text-slate-800 dark:text-white text-sm">
                          Pedido #{order.id.slice(-6).toUpperCase()}
                        </span>
                        <span className="text-xs text-slate-400 ml-2">
                          {formatDateTimeBR(order.created_at)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateEcommerceOrderStatus(order.id, e.target.value as EcommerceOrder['status'])
                          }
                          className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-white"
                        >
                          <option value="novo">🟡 Novo Pedido</option>
                          <option value="separando">🔵 Separando / Embalando</option>
                          <option value="em_transito">🚚 Em Trânsito / Entrega</option>
                          <option value="entregue">🟢 Entregue / Concluído</option>
                          <option value="cancelado">🔴 Cancelado</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
                      <div>
                        <p>
                          <strong>Cliente:</strong> {order.cliente_nome}
                        </p>
                        <p>
                          <strong>Telefone:</strong> {order.cliente_telefone}
                        </p>
                        <p>
                          <strong>Endereço:</strong> {order.cliente_endereco}
                        </p>
                      </div>

                      <div className="text-right">
                        <p>
                          <strong>Itens:</strong> {order.itens.length} produto(s)
                        </p>
                        <p>
                          <strong>Pagamento:</strong> {order.forma_pagamento}
                        </p>
                        <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                          Total: {formatCurrency(order.total)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Online Customer Drawer Cart / Checkout Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-600" /> Sacola de Compras
                </h3>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutSuccess(false);
                  }}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isCheckoutSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                  <h4 className="font-black text-xl text-slate-900 dark:text-white">Pedido Enviado com Sucesso!</h4>
                  <p className="text-xs text-slate-500">
                    O supermercado recebeu seu pedido e iniciou a separação dos itens. Obrigado pela preferência!
                  </p>
                  <button
                    onClick={() => {
                      setIsCheckoutSuccess(false);
                      setIsCartOpen(false);
                    }}
                    className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl"
                  >
                    Voltar à Loja
                  </button>
                </div>
              ) : storeCart.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="font-bold text-sm">Sua sacola está vazia.</p>
                </div>
              ) : (
                <div className="space-y-4 my-4">
                  {/* Cart Items List */}
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-48 overflow-y-auto">
                    {storeCart.map((item) => (
                      <div key={item.product.id} className="py-2 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white">{item.product.nome}</p>
                          <p className="text-slate-400">{formatCurrency(item.unitPrice)} cada</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateCartQty(item.product.id, -1)}
                            className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 font-bold"
                          >
                            -
                          </button>
                          <span className="font-bold">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateCartQty(item.product.id, 1)}
                            className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 font-bold"
                          >
                            +
                          </button>
                          <span className="font-mono font-bold text-slate-900 dark:text-white ml-2">
                            {formatCurrency(item.subtotal)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Totals */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal produtos:</span>
                      <span>{formatCurrency(cartSubtotal)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Taxa de Entrega:</span>
                      <span>{deliveryFee === 0 ? 'GRÁTIS' : formatCurrency(deliveryFee)}</span>
                    </div>
                    <div className="flex justify-between font-black text-sm text-emerald-600 dark:text-emerald-400 pt-1 border-t">
                      <span>TOTAL PEDIDO:</span>
                      <span>{formatCurrency(cartTotal)}</span>
                    </div>
                  </div>

                  {/* Customer Form */}
                  <form onSubmit={handlePlaceOrderSubmit} className="space-y-3 pt-2">
                    <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider">
                      Dados para Entrega
                    </h4>
                    <input
                      type="text"
                      value={custName}
                      onChange={(e) => setCustName(e.target.value)}
                      placeholder="Seu Nome Completo *"
                      required
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                    />
                    <input
                      type="text"
                      value={custPhone}
                      onChange={(e) => setCustPhone(e.target.value)}
                      placeholder="Telefone / WhatsApp *"
                      required
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono"
                    />
                    <textarea
                      value={custAddress}
                      onChange={(e) => setCustAddress(e.target.value)}
                      placeholder="Endereço de Entrega (Rua, Número, Bairro) *"
                      required
                      rows={2}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                    />

                    <select
                      value={custPayment}
                      onChange={(e) => setCustPayment(e.target.value as PaymentMethod)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
                    >
                      <option value="PIX">Pagamento via PIX</option>
                      <option value="Dinheiro">Dinheiro na Entrega</option>
                      <option value="Cartão de Crédito">Cartão de Crédito na Entrega</option>
                      <option value="Cartão de Débito">Cartão de Débito na Entrega</option>
                    </select>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 rounded-xl shadow-lg transition text-xs"
                    >
                      FINALIZAR & ENVIAR PEDIDO
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
