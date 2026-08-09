import React from 'react';
import { MenuItem, CartItem } from '../types';
import { Plus, Minus, Flame, Edit3 } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  cartItem?: CartItem;
  onUpdateQuantity: (item: MenuItem, change: number) => void;
  onOpenNotesModal?: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  cartItem,
  onUpdateQuantity,
  onOpenNotesModal,
}) => {
  const qty = cartItem ? cartItem.quantity : 0;

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-xs hover:shadow-md transition-all duration-200 border border-[#dcc1b6]/60 flex gap-3.5 relative overflow-hidden group">
      {/* Product Image */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-[#f4ece8] border border-[#dcc1b6]/40">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            // Fallback image if unsplash URL fails
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80';
          }}
        />
        {item.isPopular && (
          <span className="absolute top-1 left-1 bg-[#c2410c] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-xs">
            <Flame className="w-2.5 h-2.5" /> Destaque
          </span>
        )}
      </div>

      {/* Item Details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-1">
            <h3 className="font-bold text-sm sm:text-base text-[#1e1b19] leading-snug truncate">
              {item.name}
            </h3>
          </div>
          <p className="text-xs text-[#55433a] mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {cartItem?.notes && (
            <div className="mt-1.5 flex items-center gap-1 text-[11px] text-[#712c00] bg-[#fff8f5] px-2 py-0.5 rounded border border-[#ffb693]/50 italic">
              <Edit3 className="w-3 h-3 text-[#c2410c]" />
              <span className="truncate">Obs: {cartItem.notes}</span>
            </div>
          )}
        </div>

        {/* Footer: Price & Quantity Controls */}
        <div className="flex items-center justify-between mt-3 pt-1">
          <span className="font-extrabold text-sm sm:text-base text-[#ac3400]">
            {formatBRL(item.price)}
          </span>

          <div className="flex items-center gap-2">
            {qty > 0 ? (
              <div className="flex items-center gap-2 bg-[#f4ece8] rounded-full p-1 border border-[#dcc1b6]">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item, -1)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-[#712c00] hover:bg-[#712c00] hover:text-white transition-colors cursor-pointer active:scale-95 shadow-xs"
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <span className="text-xs font-bold text-[#1e1b19] w-4 text-center">
                  {qty}
                </span>

                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item, 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-[#712c00] text-white hover:bg-[#ac3400] transition-colors cursor-pointer active:scale-95 shadow-xs"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onUpdateQuantity(item, 1)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#712c00] hover:bg-[#ac3400] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar</span>
              </button>
            )}

            {qty > 0 && onOpenNotesModal && (
              <button
                type="button"
                onClick={() => onOpenNotesModal(item)}
                className="p-1.5 text-[#887269] hover:text-[#712c00] hover:bg-[#f4ece8] rounded-full transition-colors"
                title="Adicionar observação"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
