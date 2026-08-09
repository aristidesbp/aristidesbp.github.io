import React from 'react';
import { CATEGORIES } from '../data/menu';
import { CategoryId } from '../types';
import { Search, X } from 'lucide-react';

interface CategoryNavProps {
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="sticky top-0 z-30 bg-[#fff8f5]/95 backdrop-blur-md border-b border-[#dcc1b6] shadow-xs py-3 px-4 transition-all">
      <div className="max-w-xl mx-auto space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#887269]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por tapioca, sabor ou bebida..."
            className="w-full bg-[#f4ece8] hover:bg-[#eee7e3] focus:bg-white text-sm text-[#1e1b19] placeholder-[#887269] rounded-xl pl-9 pr-8 py-2 border border-[#dcc1b6]/60 focus:border-[#712c00] focus:ring-2 focus:ring-[#712c00]/20 transition-all outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#887269] hover:text-[#712c00] rounded-full"
              aria-label="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex space-x-2 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap pb-0.5">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id && !searchQuery;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  if (searchQuery) onSearchChange('');
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#712c00] text-white shadow-md scale-105'
                    : 'bg-[#eee7e3] text-[#55433a] hover:bg-[#e9e1dd] hover:text-[#712c00]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
