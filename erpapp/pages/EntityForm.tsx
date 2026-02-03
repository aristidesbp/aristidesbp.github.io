
import React, { useState } from 'react';
import { AppView, Entity } from '../types';
import { db } from '../services/db';

interface EntityFormProps {
  setView: (view: AppView) => void;
  onSave: () => void;
  initialData?: Entity;
}

const EntityForm: React.FC<EntityFormProps> = ({ setView, onSave, initialData }) => {
  const [formData, setFormData] = useState<Entity>(initialData || {
    id: crypto.randomUUID(),
    name: '',
    email: '',
    phone: '',
    document: '',
    category: 'Cliente',
    relationship: 'Externo',
    company: '',
    accessLevel: 'Usuário Padrão',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return alert('O nome é obrigatório');
    await db.put('entities', formData);
    onSave();
    setView('entities');
  };

  const handleDelete = async () => {
    if (window.confirm('Deseja excluir este contato?')) {
      await db.delete('entities', formData.id);
      onSave();
      setView('entities');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display pb-10">
      <header className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => setView('entities')} className="text-primary flex size-10 items-center justify-center">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10">{initialData ? 'Editar Perfil' : 'Novo Cadastro'}</h2>
      </header>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div className="flex flex-col items-center py-4">
          <div className="relative group">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-28 w-28 border-4 border-white dark:border-gray-800 shadow-xl bg-gray-200"
              style={{ backgroundImage: `url(${formData.photo || `https://api.dicebear.com/7.x/initials/svg?seed=${formData.name || 'Nexus'}`})` }}
            ></div>
            <button type="button" className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg active:scale-90 transition-transform">
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-50 dark:border-gray-800 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-gray-400 ml-1">Nome Completo *</label>
            <input
              required
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl h-14 px-4 font-semibold"
              placeholder="Digite o nome"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-gray-400 ml-1">E-mail</label>
            <input
              type="email"
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl h-14 px-4 font-semibold"
              placeholder="exemplo@email.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">Telefone</label>
              <input
                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl h-14 px-4 font-semibold"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">Categoria</label>
              <select
                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl h-14 px-4 font-bold"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Cliente">Cliente</option>
                <option value="Fornecedor">Fornecedor</option>
                <option value="Parceiro">Parceiro</option>
                <option value="Colaborador">Colaborador</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-gray-400 ml-1">Empresa</label>
            <input
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl h-14 px-4 font-semibold"
              placeholder="Razão Social"
              value={formData.company}
              onChange={e => setFormData({ ...formData, company: e.target.value })}
            />
          </div>
        </div>

        <div className="pt-6 space-y-3">
          <button type="submit" className="w-full bg-primary text-white h-14 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-transform">
            {initialData ? 'Atualizar Perfil' : 'Salvar Cadastro'}
          </button>
          {initialData && (
            <button type="button" onClick={handleDelete} className="w-full bg-red-50 dark:bg-red-900/10 text-red-500 h-14 rounded-2xl font-bold active:scale-95 transition-transform">
              Remover Contato
            </button>
          )}
          <button type="button" onClick={() => setView('entities')} className="w-full py-2 text-gray-400 font-bold">
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EntityForm;
