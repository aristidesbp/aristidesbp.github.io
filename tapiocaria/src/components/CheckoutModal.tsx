import React, { useState } from 'react';
import { CartItem, DeliveryInfo, PaymentMethod, DeliveryType } from '../types';
import { RESTAURANT_INFO } from '../data/menu';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Send,
  MapPin,
  CreditCard,
  Banknote,
  QrCode,
  Store,
  Truck,
  User,
  Phone,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (menuItemId: string, change: number) => void;
  onRemoveItem: (menuItemId: string) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  // Local state for delivery details
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    name: '',
    phone: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: 'Ananindeua / Belém',
    deliveryType: 'delivery',
    paymentMethod: 'PIX',
    changeFor: '',
    orderNotes: '',
  });

  const [formError, setFormError] = useState<string | null>(null);

  // If modal is closed, return null so there is NO backdrop or overlay anywhere on screen!
  if (!isOpen) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );
  const deliveryFee = deliveryInfo.deliveryType === 'delivery' ? 5.0 : 0.0;
  const grandTotal = subtotal + deliveryFee;

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleInputChange = (
    field: keyof DeliveryInfo,
    value: string | PaymentMethod | DeliveryType
  ) => {
    setDeliveryInfo((prev) => ({ ...prev, [field]: value }));
    if (formError) setFormError(null);
  };

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!deliveryInfo.name.trim()) {
      setFormError('Por favor, informe seu nome completo.');
      return;
    }

    if (deliveryInfo.deliveryType === 'delivery') {
      if (!deliveryInfo.address.trim()) {
        setFormError('Por favor, informe o nome da rua/avenida.');
        return;
      }
      if (!deliveryInfo.number.trim()) {
        setFormError('Por favor, informe o número da residência.');
        return;
      }
      if (!deliveryInfo.neighborhood.trim()) {
        setFormError('Por favor, informe o bairro para entrega.');
        return;
      }
    }

    if (
      deliveryInfo.paymentMethod === 'Dinheiro' &&
      deliveryInfo.changeFor &&
      parseFloat(deliveryInfo.changeFor.replace(',', '.')) < grandTotal
    ) {
      setFormError(
        `O valor para troco deve ser maior que o total do pedido (${formatBRL(grandTotal)}).`
      );
      return;
    }

    // Build WhatsApp Message
    let msg = `*🛍️ NOVO PEDIDO - ${RESTAURANT_INFO.name.toUpperCase()}*\n`;
    msg += `-----------------------------------\n`;
    msg += `👤 *Cliente:* ${deliveryInfo.name}\n`;
    if (deliveryInfo.phone) msg += `📞 *Telefone:* ${deliveryInfo.phone}\n`;

    msg += `📍 *Tipo:* ${
      deliveryInfo.deliveryType === 'delivery'
        ? 'ENTREGA EM DOMICÍLIO'
        : 'RETIRADA NO BALCÃO'
    }\n`;

    if (deliveryInfo.deliveryType === 'delivery') {
      msg += `🏠 *Endereço:* ${deliveryInfo.address}, Nº ${deliveryInfo.number}\n`;
      if (deliveryInfo.complement)
        msg += `🏢 *Compl:* ${deliveryInfo.complement}\n`;
      msg += `🏘️ *Bairro:* ${deliveryInfo.neighborhood}\n`;
    }

    msg += `💳 *Pagamento:* ${deliveryInfo.paymentMethod}\n`;
    if (
      deliveryInfo.paymentMethod === 'Dinheiro' &&
      deliveryInfo.changeFor
    ) {
      msg += `💵 *Troco para:* R$ ${deliveryInfo.changeFor}\n`;
    }

    msg += `-----------------------------------\n`;
    msg += `📋 *ITENS DO PEDIDO:*\n\n`;

    cart.forEach((item, index) => {
      const itemSub = item.menuItem.price * item.quantity;
      msg += `${index + 1}. *${item.quantity}x ${item.menuItem.name}* - ${formatBRL(
        itemSub
      )}\n`;
      if (item.notes) {
        msg += `   ↳ _Obs: ${item.notes}_\n`;
      }
    });

    msg += `-----------------------------------\n`;
    msg += `Subtotal: ${formatBRL(subtotal)}\n`;
    if (deliveryInfo.deliveryType === 'delivery') {
      msg += `Taxa de Entrega: ${formatBRL(deliveryFee)}\n`;
    }
    msg += `💰 *TOTAL FINAL: ${formatBRL(grandTotal)}*\n`;

    if (deliveryInfo.orderNotes) {
      msg += `-----------------------------------\n`;
      msg += `📝 *Observação do Pedido:* ${deliveryInfo.orderNotes}\n`;
    }

    msg += `-----------------------------------\n`;
    msg += `_Enviado através do Cardápio Digital_`;

    const encodedText = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* 
        CRITICAL FIX FOR USER ISSUE ("tela preta transparente que impede"):
        1. Explicit z-index layering (backdrop is z-40, drawer panel is z-50).
        2. Backdrop is ONLY rendered when isOpen is true.
        3. Backdrop click cleanly closes modal.
        4. Drawer panel has relative z-50 and pointer-events-auto so input fields are 100% interactive.
      */}

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-xs z-40 transition-opacity duration-300 pointer-events-auto"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col justify-end max-w-xl mx-auto h-[92vh] pointer-events-none">
        <div className="bg-[#fff8f5] w-full rounded-t-3xl shadow-2xl flex flex-col h-full pointer-events-auto border-t-2 border-[#712c00]/20 overflow-hidden relative z-50">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#dcc1b6] flex justify-between items-center bg-white sticky top-0 z-10 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#712c00] text-white rounded-xl">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-lg sm:text-xl text-[#712c00]">
                  Seu Pedido
                </h2>
                <p className="text-xs text-[#887269]">
                  {totalItems} {totalItems === 1 ? 'item selecionado' : 'itens selecionados'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-xs text-[#c2410c] hover:bg-[#ffdad6] px-2.5 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Esvaziar</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#f4ece8] text-[#55433a] transition-colors cursor-pointer"
                aria-label="Fechar resumo do pedido"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content - Scrollable Form */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
            
            {/* Error Message if Validation Fails */}
            {formError && (
              <div className="bg-[#ffdad6] text-[#93000a] p-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border border-[#ba1a1a]/20 animate-shake">
                <AlertCircle className="w-5 h-5 shrink-0 text-[#ba1a1a]" />
                <span>{formError}</span>
              </div>
            )}

            {/* Empty Cart Warning */}
            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 bg-[#f4ece8] text-[#887269] rounded-full flex items-center justify-center mx-auto">
                  <Trash2 className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-base text-[#1e1b19]">
                  Sua sacola está vazia
                </h3>
                <p className="text-xs text-[#887269] max-w-xs mx-auto">
                  Adicione tapiocas e bebidas do cardápio para continuar com seu pedido.
                </p>
              </div>
            ) : (
              <>
                {/* 1. Items List */}
                <div className="bg-white p-4 rounded-2xl border border-[#dcc1b6]/60 shadow-2xs space-y-3">
                  <h3 className="text-xs font-bold text-[#712c00] uppercase tracking-wider flex items-center justify-between border-b border-[#f4ece8] pb-2">
                    <span>Itens Escolhidos</span>
                    <span className="text-[#887269]">{totalItems} un.</span>
                  </h3>

                  <div className="divide-y divide-[#f4ece8] space-y-2 pt-1">
                    {cart.map((item) => {
                      const itemSubtotal = item.menuItem.price * item.quantity;
                      return (
                        <div
                          key={item.menuItem.id}
                          className="pt-2 flex items-start justify-between gap-3 text-sm"
                        >
                          <div className="flex-1 min-w-0">
                            <span className="font-bold text-[#1e1b19] block truncate">
                              {item.menuItem.name}
                            </span>
                            <span className="text-xs text-[#887269]">
                              {formatBRL(item.menuItem.price)} cada
                            </span>
                            {item.notes && (
                              <span className="block text-[11px] text-[#c2410c] italic mt-0.5">
                                Obs: {item.notes}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <div className="flex items-center gap-1 bg-[#f4ece8] rounded-lg p-0.5 border border-[#dcc1b6]/50">
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(item.menuItem.id, -1)
                                }
                                className="w-6 h-6 flex items-center justify-center bg-white rounded text-[#712c00] hover:bg-[#712c00] hover:text-white transition-colors cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-[#1e1b19] px-1.5">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(item.menuItem.id, 1)
                                }
                                className="w-6 h-6 flex items-center justify-center bg-[#712c00] rounded text-white hover:bg-[#ac3400] transition-colors cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-extrabold text-sm text-[#712c00] min-w-[60px] text-right">
                              {formatBRL(itemSubtotal)}
                            </span>

                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.menuItem.id)}
                              className="text-[#887269] hover:text-[#ba1a1a] p-1 transition-colors"
                              title="Remover item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Tipo de Pedido (Entrega vs Retirada) */}
                <div className="bg-white p-4 rounded-2xl border border-[#dcc1b6]/60 shadow-2xs space-y-3">
                  <h3 className="text-xs font-bold text-[#712c00] uppercase tracking-wider">
                    Como deseja receber?
                  </h3>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleInputChange('deliveryType', 'delivery')}
                      className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                        deliveryInfo.deliveryType === 'delivery'
                          ? 'border-[#712c00] bg-[#fff8f5] text-[#712c00] shadow-xs'
                          : 'border-[#dcc1b6]/60 bg-white text-[#887269] hover:border-[#712c00]/40'
                      }`}
                    >
                      <Truck className="w-4 h-4" />
                      <span>Entrega (R$ 5,00)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleInputChange('deliveryType', 'pickup')}
                      className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                        deliveryInfo.deliveryType === 'pickup'
                          ? 'border-[#712c00] bg-[#fff8f5] text-[#712c00] shadow-xs'
                          : 'border-[#dcc1b6]/60 bg-white text-[#887269] hover:border-[#712c00]/40'
                      }`}
                    >
                      <Store className="w-4 h-4" />
                      <span>Retirar na Loja</span>
                    </button>
                  </div>
                </div>

                {/* 3. Formulário de Dados do Cliente - FULLY EDITABLE INPUTS */}
                <form id="checkout-form" onSubmit={handleSendOrder} className="space-y-4">
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#dcc1b6]/60 shadow-2xs space-y-3.5">
                    <h3 className="text-xs font-bold text-[#712c00] uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-4 h-4 text-[#c2410c]" />
                      <span>Dados do Cliente</span>
                    </h3>

                    {/* Nome Completo */}
                    <div>
                      <label className="block text-xs font-bold text-[#55433a] mb-1">
                        Nome Completo <span className="text-[#ba1a1a]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={deliveryInfo.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Ex: João da Silva"
                          className="w-full bg-[#faf2ee] hover:bg-[#f4ece8] focus:bg-white border border-[#dcc1b6] focus:border-[#712c00] focus:ring-2 focus:ring-[#712c00]/20 rounded-xl p-3 text-sm text-[#1e1b19] placeholder-[#887269] outline-none transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Telefone / WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold text-[#55433a] mb-1">
                        Telefone / WhatsApp
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={deliveryInfo.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="(91) 98888-8888"
                          className="w-full bg-[#faf2ee] hover:bg-[#f4ece8] focus:bg-white border border-[#dcc1b6] focus:border-[#712c00] focus:ring-2 focus:ring-[#712c00]/20 rounded-xl p-3 text-sm text-[#1e1b19] placeholder-[#887269] outline-none transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Endereço de Entrega (Apenas se Delivery) */}
                    {deliveryInfo.deliveryType === 'delivery' && (
                      <div className="space-y-3 pt-2 border-t border-[#f4ece8]">
                        <h4 className="text-xs font-bold text-[#712c00] uppercase tracking-wider flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#c2410c]" />
                          <span>Endereço de Entrega</span>
                        </h4>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="col-span-2">
                            <label className="block text-xs font-bold text-[#55433a] mb-1">
                              Rua / Avenida <span className="text-[#ba1a1a]">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={deliveryInfo.address}
                              onChange={(e) =>
                                handleInputChange('address', e.target.value)
                              }
                              placeholder="Rua das Flores"
                              className="w-full bg-[#faf2ee] hover:bg-[#f4ece8] focus:bg-white border border-[#dcc1b6] focus:border-[#712c00] focus:ring-2 focus:ring-[#712c00]/20 rounded-xl p-3 text-sm text-[#1e1b19] placeholder-[#887269] outline-none transition-all font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#55433a] mb-1">
                              Nº <span className="text-[#ba1a1a]">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={deliveryInfo.number}
                              onChange={(e) =>
                                handleInputChange('number', e.target.value)
                              }
                              placeholder="123"
                              className="w-full bg-[#faf2ee] hover:bg-[#f4ece8] focus:bg-white border border-[#dcc1b6] focus:border-[#712c00] focus:ring-2 focus:ring-[#712c00]/20 rounded-xl p-3 text-sm text-[#1e1b19] placeholder-[#887269] outline-none transition-all font-medium text-center"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-bold text-[#55433a] mb-1">
                              Bairro <span className="text-[#ba1a1a]">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={deliveryInfo.neighborhood}
                              onChange={(e) =>
                                handleInputChange('neighborhood', e.target.value)
                              }
                              placeholder="Centro"
                              className="w-full bg-[#faf2ee] hover:bg-[#f4ece8] focus:bg-white border border-[#dcc1b6] focus:border-[#712c00] focus:ring-2 focus:ring-[#712c00]/20 rounded-xl p-3 text-sm text-[#1e1b19] placeholder-[#887269] outline-none transition-all font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#55433a] mb-1">
                              Complemento
                            </label>
                            <input
                              type="text"
                              value={deliveryInfo.complement}
                              onChange={(e) =>
                                handleInputChange('complement', e.target.value)
                              }
                              placeholder="Apto 102, Bloco B"
                              className="w-full bg-[#faf2ee] hover:bg-[#f4ece8] focus:bg-white border border-[#dcc1b6] focus:border-[#712c00] focus:ring-2 focus:ring-[#712c00]/20 rounded-xl p-3 text-sm text-[#1e1b19] placeholder-[#887269] outline-none transition-all font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 4. Forma de Pagamento */}
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#dcc1b6]/60 shadow-2xs space-y-3">
                    <h3 className="text-xs font-bold text-[#712c00] uppercase tracking-wider">
                      Forma de Pagamento na Entrega
                    </h3>

                    <div className="space-y-2">
                      <label className="flex items-center p-3 border border-[#dcc1b6] rounded-xl cursor-pointer hover:bg-[#fff8f5] transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="PIX"
                          checked={deliveryInfo.paymentMethod === 'PIX'}
                          onChange={() => handleInputChange('paymentMethod', 'PIX')}
                          className="w-4 h-4 text-[#712c00] focus:ring-[#712c00]"
                        />
                        <span className="ml-3 font-semibold text-sm text-[#1e1b19] flex items-center gap-2">
                          <QrCode className="w-4 h-4 text-[#c2410c]" /> PIX (Chave enviada no WhatsApp)
                        </span>
                      </label>

                      <label className="flex items-center p-3 border border-[#dcc1b6] rounded-xl cursor-pointer hover:bg-[#fff8f5] transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="Cartão de Crédito/Débito"
                          checked={
                            deliveryInfo.paymentMethod === 'Cartão de Crédito/Débito'
                          }
                          onChange={() =>
                            handleInputChange('paymentMethod', 'Cartão de Crédito/Débito')
                          }
                          className="w-4 h-4 text-[#712c00] focus:ring-[#712c00]"
                        />
                        <span className="ml-3 font-semibold text-sm text-[#1e1b19] flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#c2410c]" /> Cartão (Máquina no Local)
                        </span>
                      </label>

                      <label className="flex items-center p-3 border border-[#dcc1b6] rounded-xl cursor-pointer hover:bg-[#fff8f5] transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="Dinheiro"
                          checked={deliveryInfo.paymentMethod === 'Dinheiro'}
                          onChange={() =>
                            handleInputChange('paymentMethod', 'Dinheiro')
                          }
                          className="w-4 h-4 text-[#712c00] focus:ring-[#712c00]"
                        />
                        <span className="ml-3 font-semibold text-sm text-[#1e1b19] flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-[#c2410c]" /> Dinheiro em Espécie
                        </span>
                      </label>
                    </div>

                    {/* Campo de Troco se Dinheiro */}
                    {deliveryInfo.paymentMethod === 'Dinheiro' && (
                      <div className="pt-2 animate-fadeIn">
                        <label className="block text-xs font-bold text-[#55433a] mb-1">
                          Precisa de troco para quanto? (R$)
                        </label>
                        <input
                          type="text"
                          value={deliveryInfo.changeFor}
                          onChange={(e) =>
                            handleInputChange('changeFor', e.target.value)
                          }
                          placeholder="Ex: 50,00"
                          className="w-full bg-[#faf2ee] hover:bg-[#f4ece8] focus:bg-white border border-[#dcc1b6] focus:border-[#712c00] focus:ring-2 focus:ring-[#712c00]/20 rounded-xl p-3 text-sm text-[#1e1b19] placeholder-[#887269] outline-none transition-all font-medium"
                        />
                      </div>
                    )}
                  </div>

                  {/* 5. Observações do Pedido */}
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#dcc1b6]/60 shadow-2xs space-y-2">
                    <label className="block text-xs font-bold text-[#712c00] uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#c2410c]" />
                      <span>Observações Gerais do Pedido</span>
                    </label>
                    <textarea
                      rows={2}
                      value={deliveryInfo.orderNotes}
                      onChange={(e) =>
                        handleInputChange('orderNotes', e.target.value)
                      }
                      placeholder="Ex: Entregar com cuidado, campainha quebrada..."
                      className="w-full bg-[#faf2ee] hover:bg-[#f4ece8] focus:bg-white border border-[#dcc1b6] focus:border-[#712c00] focus:ring-2 focus:ring-[#712c00]/20 rounded-xl p-3 text-sm text-[#1e1b19] placeholder-[#887269] outline-none transition-all font-medium resize-none"
                    />
                  </div>
                </form>

                {/* Resumo Financeiro */}
                <div className="bg-[#eee7e3] p-4 rounded-2xl border border-[#dcc1b6] space-y-1.5 text-xs text-[#55433a]">
                  <div className="flex justify-between">
                    <span>Subtotal dos itens:</span>
                    <span className="font-semibold text-[#1e1b19]">
                      {formatBRL(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de Entrega:</span>
                    <span className="font-semibold text-[#1e1b19]">
                      {deliveryInfo.deliveryType === 'delivery'
                        ? formatBRL(deliveryFee)
                        : 'Grátis (Retirada)'}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-[#712c00] pt-2 border-t border-[#dcc1b6]">
                    <span>Total do Pedido:</span>
                    <span>{formatBRL(grandTotal)}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer CTA Button */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#dcc1b6] bg-white sticky bottom-0 z-10 shadow-lg">
              <button
                type="submit"
                form="checkout-form"
                className="w-full bg-[#25D366] hover:bg-[#1fbc5a] active:bg-[#128C7E] text-white font-extrabold text-base py-4 px-6 rounded-2xl shadow-lg flex items-center justify-center space-x-2 transition transform active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Enviar Pedido via WhatsApp</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
