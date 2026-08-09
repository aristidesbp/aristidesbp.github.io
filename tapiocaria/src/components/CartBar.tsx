import React from 'react';
import { ShoppingBag, ChevronUp } from 'lucide-react';

interface CartBarProps {
  itemCount: number;
  totalPrice: number;
  onOpenCheckout: () => void;
}

export const CartBar: React.FC<CartBarProps> = ({
  itemCount,
  totalPrice,
  onOpenCheckout,
}) => {
  if (itemCount === 0) return null;

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none">
      <div className="max-w-xl mx-auto pointer-events-auto">
        <button
          type="button"
          onClick={onOpenCheckout}
          className="w-full bg-[#712c00] hover:bg-[#853400] active:bg-[#5d1900] text-white p-3.5 sm:p-4 rounded-2xl shadow-xl flex justify-between items-center transition-all transform active:scale-[0.99] cursor-pointer border border-[#ffb693]/30"
        >
          <div className="flex items-center space-x-3">
            <div className="relative bg-white/10 p-2 rounded-xl">
              <ShoppingBag className="w-6 h-6 text-white" />
              <span className="absolute -top-2 -right-2 bg-[#c2410c] text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#712c00]">
                {itemCount}
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] text-white/80 font-medium uppercase tracking-wider">
                Ver Sacola de Pedidos
              </span>
              <span className="font-extrabold text-base sm:text-lg text-white">
                {formatBRL(totalPrice)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm">
            <span>Avançar</span>
            <ChevronUp className="w-4 h-4 animate-bounce" />
          </div>
        </button>
      </div>
    </div>
  );
};
