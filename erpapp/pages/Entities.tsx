
import React, { useState } from 'react';
import { AppView, Entity } from '../types';
import Navigation from '../components/Navigation';

interface EntitiesProps {
  setView: (view: AppView) => void;
  entities: Entity[];
  onEditEntity: (ent: Entity) => void;
}

const Entities: React.FC<EntitiesProps> = ({ setView, entities, onEditEntity }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntities = entities.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display">
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span onClick={() => setView('dashboard')} className="material-symbols-outlined text-[#111418] dark:text-white cursor-pointer">arrow_back_ios</span>
            <h1 className="text-[#111418] dark:text-white text-xl font-bold tracking-tight">Entidades</h1>
          </div>
          <button className="p-2 text-[#111418] dark:text-white">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
        <div className="px-4 pb-4">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-gray-400">search</span>
            <input
              className="w-full h-11 pl-10 pr-4 bg-gray-100 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/50 placeholder:text-gray-500"
              placeholder="Pesquisar por nome ou empresa..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="px-4 pb-32 pt-4">
        <div className="space-y-3">
          {filteredEntities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <span className="material-symbols-outlined text-6xl mb-4 text-gray-200">group_off</span>
              <p>Nenhuma entidade encontrada.</p>
            </div>
          ) : filteredEntities.map(entity => (
            <div
              key={entity.id}
              onClick={() => onEditEntity(entity)}
              className="flex items-center gap-4 bg-white dark:bg-gray-900 p-3 rounded-xl ios-shadow border border-gray-50 dark:border-gray-800 active:bg-gray-50 dark:active:bg-gray-800 transition-colors cursor-pointer"
            >
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-12 w-12 shrink-0 bg-gray-200 border border-gray-100 dark:border-gray-700"
                style={{ backgroundImage: `url(${entity.photo || `https://api.dicebear.com/7.x/initials/svg?seed=${entity.name}`})` }}
              ></div>
              <div className="flex flex-col flex-1 min-w-0">
                <p className="text-[#111418] dark:text-white text-base font-semibold leading-tight truncate">{entity.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs truncate">{entity.company || entity.category || 'Sem categoria'}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {entity.phone && <span className="material-symbols-outlined text-[#25D366] text-lg">chat</span>}
                  <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <button
        onClick={() => onEditEntity({ id: crypto.randomUUID(), name: '', email: '', phone: '', category: 'Cliente' } as any)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-all z-30"
      >
        <span className="material-symbols-outlined text-3xl">person_add</span>
      </button>

      <Navigation currentView="entities" setView={setView} />
    </div>
  );
};

export default Entities;
