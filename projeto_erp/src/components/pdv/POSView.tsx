import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../lib/sanitizer';
import { Product, PaymentMethod, Sale } from '../../types';
import { ScannerModal } from '../common/ScannerModal';
import { ReceiptModal } from '../common/ReceiptModal';
import {
  Barcode,
  Camera,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  UserCheck,
  CreditCard,
  DollarSign,
  ArrowDownCircle,
  Receipt,
  Search,
  CheckCircle,
} from 'lucide-react';

export const POSView: React.FC = () => {
  const {
    products,
    entities,
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
    processSangria,
    storeConfig,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [cashGiven, setCashGiven] = useState<string>('');
  const [lastProcessedSale, setLastProcessedSale] = useState<Sale | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // Sangria Modal State
  const [isSangriaOpen, setIsSangriaOpen] = useState(false);
  const [sangriaValue, setSangriaValue] = useState('');
  const [sangriaReason, setSangriaReason] = useState('');

  const barcodeBufferRef = useRef<string>('');
  const lastKeyTimeRef = useRef<number>(0);

  // USB Barcode Scanner Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events if focused on input fields
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT')
      ) {
        return;
      }

      const currentTime = Date.now();
      if (currentTime - lastKeyTimeRef.current > 100) {
        barcodeBufferRef.current = '';
      }
      lastKeyTimeRef.current = currentTime;

      if (e.key === 'Enter') {
        if (barcodeBufferRef.current.length >= 3) {
          handleBarcodeScanned(barcodeBufferRef.current);
        }
        barcodeBufferRef.current = '';
      } else if (e.key.length === 1) {
        barcodeBufferRef.current += e.key;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [products]);

  const handleBarcodeScanned = (code: string) => {
    const cleanCode = code.trim();

    // Check for quantity multiplier pattern, e.g., "3*789123456"
    let qty = 1;
    let targetCode = cleanCode;

    if (cleanCode.includes('*')) {
      const parts = cleanCode.split('*');
      if (parts.length === 2 && !isNaN(Number(parts[0]))) {
        qty = Math.max(1, parseInt(parts[0]));
        targetCode = parts[1].trim();
      }
    }

    const matchedProduct = products.find(
      (p) => p.codigo_barras === targetCode || p.id === targetCode
    );

    if (matchedProduct) {
      addToCart(matchedProduct, qty);
    } else {
      alert(`Produto com código [${targetCode}] não foi encontrado no estoque.`);
    }
  };

  const categories = Array.from(new Set(products.map((p) => p.categoria || 'Geral')));

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.codigo_barras && p.codigo_barras.includes(searchTerm));
    const matchesCategory = selectedCategory ? p.categoria === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleFinalizeSale = async () => {
    if (cart.length === 0) {
      alert('Selecione ao menos um produto no carrinho antes de finalizar.');
      return;
    }

    const sale = await processSale();
    if (sale) {
      setLastProcessedSale(sale);
      setIsReceiptOpen(true);
      setCashGiven('');
    }
  };

  const handleSangriaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(sangriaValue);
    if (isNaN(val) || val <= 0 || !sangriaReason.trim()) {
      alert('Informe um valor válido e a justificativa para a sangria.');
      return;
    }

    await processSangria(val, sangriaReason);
    alert(`Sangria de ${formatCurrency(val)} realizada com sucesso!`);
    setIsSangriaOpen(false);
    setSangriaValue('');
    setSangriaReason('');
  };

  const trocoCalculated = selectedPaymentMethod === 'Dinheiro' && cashGiven
    ? Math.max(0, parseFloat(cashGiven) - cartTotal)
    : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 dark:text-white text-lg">Frente de Caixa (PDV)</h2>
            <p className="text-xs text-slate-400">Leitura de código por scanner USB ou Câmera</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            onClick={() => setIsScannerOpen(true)}
            className="flex-1 sm:flex-none bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-2 text-xs"
          >
            <Camera className="w-4 h-4 text-emerald-400" /> Câmera Scanner
          </button>
          <button
            onClick={() => setIsSangriaOpen(true)}
            className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-2 text-xs shadow-sm"
          >
            <ArrowDownCircle className="w-4 h-4" /> Sangria de Caixa
          </button>
        </div>
      </div>

      {/* Main POS Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Product Search Catalog (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchTerm) {
                    handleBarcodeScanned(searchTerm);
                    setSearchTerm('');
                  }
                }}
                placeholder="Buscar produto por Nome ou Código de Barras... (Pressione Enter)"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            {/* Categories Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === ''
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Todas Categoria ({products.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto p-1">
            {filteredProducts.map((product) => {
              const outOfStock = product.quantidade_estoque <= 0;
              return (
                <button
                  key={product.id}
                  onClick={() => !outOfStock && addToCart(product)}
                  disabled={outOfStock}
                  className={`p-3 bg-white dark:bg-slate-900 border rounded-2xl text-left transition flex flex-col justify-between shadow-xs relative group ${
                    outOfStock
                      ? 'opacity-40 border-slate-200 dark:border-slate-800 cursor-not-allowed'
                      : 'border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:shadow-md'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block truncate">
                      {product.categoria || 'Geral'}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs mt-0.5 line-clamp-2">
                      {product.nome}
                    </h4>
                    {product.codigo_barras && (
                      <span className="text-[10px] font-mono text-slate-400 block mt-1">
                        {product.codigo_barras}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400 font-mono">
                      {formatCurrency(product.preco_venda)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      {product.quantidade_estoque} {product.unidade}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Cart & Total Payment (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-lg space-y-4">
            {/* Customer Selector */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Cliente Opcional
              </label>
              <select
                value={selectedEntityId || ''}
                onChange={(e) => setSelectedEntityId(e.target.value || null)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 dark:text-white outline-none"
              >
                <option value="">Consumidor Final (Não Identificado)</option>
                {entities.map((ent) => (
                  <option key={ent.id} value={ent.id}>
                    {ent.nome_completo} ({ent.tipo_entidade})
                  </option>
                ))}
              </select>
            </div>

            {/* Cart Table */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <div className="bg-slate-100 dark:bg-slate-800 px-3 py-2 text-[11px] font-bold text-slate-500 uppercase flex justify-between">
                <span>Itens ({cart.length})</span>
                <button onClick={clearCart} className="text-red-500 hover:underline text-[10px]">
                  Esvaziar
                </button>
              </div>

              <div className="max-h-52 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 p-2">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs">
                    Carrinho vazio. Adicione produtos ao lado.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="py-2 flex items-center justify-between text-xs gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 dark:text-white truncate">{item.product.nome}</p>
                        <p className="text-[10px] text-slate-400">
                          {formatCurrency(item.unitPrice)} x {item.quantity} {item.product.unidade}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, -1)}
                          className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold px-1 min-w-[20px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, 1)}
                          className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right min-w-[65px]">
                        <span className="font-mono font-bold text-slate-900 dark:text-white">
                          {formatCurrency(item.subtotal)}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Forma de Pagamento
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(
                  ['Dinheiro', 'PIX', 'Cartão de Crédito', 'Cartão de Débito', 'Fiado'] as PaymentMethod[]
                ).map((method) => (
                  <button
                    key={method}
                    onClick={() => setSelectedPaymentMethod(method)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                      selectedPaymentMethod === method
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{method}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cash Given & Troco */}
            {selectedPaymentMethod === 'Dinheiro' && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-600 dark:text-slate-300">Valor Recebido (R$):</span>
                  <input
                    type="number"
                    value={cashGiven}
                    onChange={(e) => setCashGiven(e.target.value)}
                    placeholder="0,00"
                    className="w-24 p-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-right font-mono font-bold text-xs"
                  />
                </div>
                {trocoCalculated > 0 && (
                  <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Troco a Devolver:</span>
                    <span className="font-mono font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(trocoCalculated)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Discount Control */}
            <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>Desconto Adicional (R$):</span>
              <input
                type="number"
                value={cartDiscount || ''}
                onChange={(e) => setCartDiscount(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="w-20 p-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-right font-bold text-xs"
              />
            </div>

            {/* Total Panel */}
            <div className="p-4 bg-slate-900 rounded-2xl text-white space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Subtotal:</span>
                <span>{formatCurrency(cartSubtotal)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-xs text-red-400">
                  <span>Desconto:</span>
                  <span>- {formatCurrency(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                <span className="font-extrabold text-sm text-emerald-400">TOTAL A PAGAR:</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {formatCurrency(cartTotal)}
                </span>
              </div>
            </div>

            {/* Action Finalize Button */}
            <button
              onClick={handleFinalizeSale}
              disabled={cart.length === 0}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-600/30 transition text-base flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-6 h-6" />
              <span>FINALIZAR & EMITIR CUPOM</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sangria Modal */}
      {isSangriaOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <ArrowDownCircle className="w-5 h-5 text-red-500" />
              <span>Executar Sangria de Caixa</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              A sangria registra a retirada de espécie do caixa e lança uma despesa automaticamente no financeiro.
            </p>

            <form onSubmit={handleSangriaSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Valor Retirado (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={sangriaValue}
                  onChange={(e) => setSangriaValue(e.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Justificativa / Motivo *
                </label>
                <input
                  type="text"
                  value={sangriaReason}
                  onChange={(e) => setSangriaReason(e.target.value)}
                  placeholder="Ex: Depósito bancário ou transporte de valores"
                  required
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition"
                >
                  Confirmar Sangria
                </button>
                <button
                  type="button"
                  onClick={() => setIsSangriaOpen(false)}
                  className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-4 py-3 rounded-xl"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Barcode Camera Scanner Modal */}
      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleBarcodeScanned}
      />

      {/* XSS-Protected Printable Thermal Ticket Receipt Modal */}
      <ReceiptModal
        sale={lastProcessedSale}
        storeConfig={storeConfig}
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
      />
    </div>
  );
};
