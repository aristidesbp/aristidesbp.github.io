
import React, { useState, useEffect } from 'react';
import { AppView, BankAccount } from '../types';
import { db } from '../services/db';

interface AccountFormProps {
  setView: (view: AppView) => void;
  onSave: () => void;
  initialData?: BankAccount;
}

const AccountForm: React.FC<AccountFormProps> = ({ setView, onSave, initialData }) => {
  const [formData, setFormData] = useState<BankAccount>(initialData || {
    id: crypto.randomUUID(),
    name: '',
    type: 'Conta Corrente',
    balance: 0,
    agency: '',
    accountNumber: '',
    nickname: '',
    color: '#137fec'
  });

  const banks = [
    { name: 'Nubank', color: '#8a05be', label: 'NU' },
    { name: 'Itaú', color: '#ff7800', label: 'Itaú' },
    { name: 'Bradesco', color: '#cc092f', label: 'Brad' },
    { name: 'Santander', color: '#ec0000', label: 'Sant' },
    { name: 'BB', color: '#fcf800', label: 'BB' },
    { name: 'Inter', color: '#ff7a00', label: 'Inter' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return alert('O nome do banco é obrigatório');
    await db.put('accounts', formData);
    onSave();
    setView('accounts');
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta conta?')) {
      await db.delete('accounts', formData.id);
      onSave();
      setView('accounts');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark font-display pb-32">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 flex items-center border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => setView('accounts')} className="text-primary flex items-center">
          <span className="material-symbols-outlined">chevron_left</span>
          <span className="font-medium">Voltar</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold pr-10">{initialData ? 'Editar Conta' : 'Nova Conta'}</h1>
      </header>

      <main className="px-4 py-6 space-y-6">
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase text-gray-400">Atalho de Bancos</label>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar py-2">
            {banks.map(bank => (
              <button
                key={bank.name}
                type="button"
                onClick={() => setFormData({ ...formData, name: bank.name, color: bank.color })}
                className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-all border-2 ${formData.name === bank.name ? 'border-primary scale-110 shadow-primary/20' : 'border-transparent opacity-60'}`}
                style={{ backgroundColor: bank.color }}
              >
                <span className={`font-bold text-[10px] ${bank.name === 'BB' ? 'text-blue-900' : 'text-white'}`}>{bank.label}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold ml-1">Instituição *</label>
            <input
              required
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 h-14 px-4 focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder="Ex: Banco do Brasil"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold ml-1">Saldo Atual *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">R$</span>
              <input
                required
                type="number"
                step="0.01"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 h-14 pl-12 pr-4 font-bold text-lg outline-none"
                placeholder="0,00"
                value={formData.balance || ''}
                onChange={e => setFormData({ ...formData, balance: parseFloat(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold ml-1">Agência</label>
              <input
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 h-14 px-4 outline-none"
                placeholder="0000"
                value={formData.agency}
                onChange={e => setFormData({ ...formData, agency: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold ml-1">Conta</label>
              <input
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 h-14 px-4 outline-none"
                placeholder="00000-0"
                value={formData.accountNumber}
                onChange={e => setFormData({ ...formData, accountNumber: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold ml-1">Apelido (Opcional)</label>
            <input
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 h-14 px-4 outline-none"
              placeholder="Ex: Minha Reserva"
              value={formData.nickname}
              onChange={e => setFormData({ ...formData, nickname: e.target.value })}
            />
          </div>

          <div className="pt-6 space-y-3">
            <button type="submit" className="w-full h-14 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-transform">
              {initialData ? 'Atualizar Dados' : 'Criar Conta'}
            </button>
            {initialData && (
              <button type="button" onClick={handleDelete} className="w-full h-14 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-2xl font-bold text-lg active:scale-95 transition-transform">
                Excluir Conta
              </button>
            )}
            <button type="button" onClick={() => setView('accounts')} className="w-full h-12 text-gray-500 font-medium">
              Cancelar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AccountForm;
