
import React, { useState } from 'react';
import { AppView, Installment, Entity } from '../types';
import { db } from '../services/db';

interface InstallmentFormProps {
  setView: (view: AppView) => void;
  onSave: () => void;
  entities: Entity[];
  initialData?: Installment;
}

const InstallmentForm: React.FC<InstallmentFormProps> = ({ setView, onSave, entities, initialData }) => {
  const [formData, setFormData] = useState<Installment>(initialData || {
    id: crypto.randomUUID(),
    description: '',
    amount: 0,
    dueDate: new Date().toISOString().split('T')[0],
    type: 'saida',
    qty: 1,
    category: 'Geral',
    status: 'pendente'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return alert('Campos obrigatórios: Descrição e Valor');
    await db.put('installments', formData);
    onSave();
    setView('installments');
  };

  const handleDelete = async () => {
    if (window.confirm('Deseja excluir este lançamento?')) {
      await db.delete('installments', formData.id);
      onSave();
      setView('installments');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display pb-40">
      <header className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => setView('installments')} className="text-primary flex size-10 items-center justify-center">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10">{initialData ? 'Editar Parcela' : 'Novo Lançamento'}</h2>
      </header>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-50 dark:border-gray-800 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-gray-400 ml-1">Descrição</label>
            <input
              required
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl h-14 px-4 font-semibold text-lg"
              placeholder="Ex: Compra de materiais"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">Valor</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">R$</span>
                <input
                  required
                  type="number"
                  step="0.01"
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl h-14 pl-10 pr-4 font-bold text-lg"
                  value={formData.amount || ''}
                  onChange={e => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">Vencimento</label>
              <input
                required
                type="date"
                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl h-14 px-4 font-semibold"
                value={formData.dueDate}
                onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-50 dark:border-gray-800 space-y-4">
           <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">Fluxo</label>
              <select
                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl h-14 px-4 font-bold"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value as any })}
              >
                <option value="entrada">Entrada (+)</option>
                <option value="saida">Saída (-)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">Status</label>
              <select
                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl h-14 px-4 font-bold"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
              >
                <option value="pendente">Pendente</option>
                <option value="pago">Pago / Recebido</option>
                <option value="atrasado">Atrasado</option>
                <option value="agendado">Agendado</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-gray-400 ml-1">Entidade</label>
            <select
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl h-14 px-4 font-semibold"
              value={formData.entityId || ''}
              onChange={e => setFormData({ ...formData, entityId: e.target.value })}
            >
              <option value="">Nenhum relacionamento</option>
              {entities.map(en => (
                <option key={en.id} value={en.id}>{en.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto z-50 p-6 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 space-y-3">
          <button type="submit" className="w-full bg-primary text-white h-14 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-transform">
            {initialData ? 'Salvar Alterações' : 'Confirmar Lançamento'}
          </button>
          {initialData && (
            <button type="button" onClick={handleDelete} className="w-full border-2 border-red-100 text-red-500 h-14 rounded-2xl font-bold active:scale-95 transition-transform">
              Excluir Registro
            </button>
          )}
          <button type="button" onClick={() => setView('installments')} className="w-full text-gray-400 font-bold py-2">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default InstallmentForm;
