import React, { useState } from 'react';
import { MenuItem } from '../types';
import { X, Check } from 'lucide-react';

interface ItemCustomModalProps {
  item: MenuItem | null;
  currentNotes?: string;
  onClose: () => void;
  onSaveNotes: (notes: string) => void;
}

export const ItemCustomModal: React.FC<ItemCustomModalProps> = ({
  item,
  currentNotes = '',
  onClose,
  onSaveNotes,
}) => {
  const [notes, setNotes] = useState(currentNotes);

  if (!item) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveNotes(notes);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity pointer-events-auto"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-[#fff8f5] w-full max-w-md rounded-3xl shadow-2xl p-5 sm:p-6 pointer-events-auto border-2 border-[#712c00]/20 space-y-4 animate-scaleUp">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#c2410c]">
                Observação para a cozinha
              </span>
              <h3 className="text-lg font-extrabold text-[#1e1b19]">
                {item.name}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#f4ece8] text-[#55433a]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#55433a] mb-1.5">
                Alguma preferência ou restrição?
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Pouca manteiga, bem passada, sem queijo coalho..."
                className="w-full bg-white border border-[#dcc1b6] focus:border-[#712c00] focus:ring-2 focus:ring-[#712c00]/20 rounded-xl p-3 text-sm text-[#1e1b19] placeholder-[#887269] outline-none transition-all resize-none"
                autoFocus
              />
            </div>

            <div className="flex gap-2 justify-end pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-[#dcc1b6] text-xs font-bold text-[#55433a] hover:bg-[#f4ece8] transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#712c00] hover:bg-[#853400] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Salvar Observação</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
