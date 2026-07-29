import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDateBR } from '../../lib/sanitizer';
import { Finance, Installment, FinanceType } from '../../types';
import {
  DollarSign,
  Plus,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Calendar,
  Layers,
  FileCheck,
} from 'lucide-react';

export const FinancialView: React.FC = () => {
  const { finances, installments, saveFinance, payInstallment, entities } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // New Transaction State
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [finType, setFinType] = useState<FinanceType>('despesa');
  const [category, setCategory] = useState('Geral');
  const [numInstallments, setNumInstallments] = useState(1);
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedEntityId, setSelectedEntityId] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  // Calculated Financial Metrics
  let totalReceitasPagas = 0;
  let totalDespesasPagas = 0;
  let totalPendentes = 0;

  installments.forEach((inst) => {
    const parentFin = finances.find((f) => f.id === inst.financa_id);
    const val = inst.valor_parcela;

    if (inst.status === 'pago') {
      if (parentFin?.tipo === 'receita') totalReceitasPagas += val;
      else totalDespesasPagas += val;
    } else {
      totalPendentes += val;
    }
  });

  // Filter Installments
  const filteredInstallments = installments.filter((inst) => {
    const parentFin = finances.find((f) => f.id === inst.financa_id);
    const descMatch = (parentFin?.descricao || '').toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = selectedType ? parentFin?.tipo === selectedType : true;

    let isOverdue = inst.status === 'pendente' && inst.data_vencimento < todayStr;
    let statusMatch = true;
    if (selectedStatus === 'pago') statusMatch = inst.status === 'pago';
    else if (selectedStatus === 'pendente') statusMatch = inst.status === 'pendente' && !isOverdue;
    else if (selectedStatus === 'atrasado') statusMatch = isOverdue;

    return descMatch && typeMatch && statusMatch;
  });

  const handleCreateFinanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valTotal = parseFloat(amount);
    if (!desc.trim() || isNaN(valTotal) || valTotal <= 0) {
      alert('Preencha a Descrição e o Valor Total do lançamento.');
      return;
    }

    const finId = `fin_${Date.now()}`;
    const selectedEnt = entities.find((e) => e.id === selectedEntityId);

    const newFinance: Finance = {
      id: finId,
      entidade_id: selectedEntityId || null,
      entidade_nome: selectedEnt ? selectedEnt.nome_completo : 'Geral',
      descricao: desc,
      tipo: finType,
      categoria: category || 'Geral',
      valor_total: valTotal,
      num_parcelas: numInstallments,
      status_lancamento: 'aberto',
      created_at: new Date().toISOString(),
    };

    const valParcela = valTotal / numInstallments;
    const generatedInsts: Installment[] = [];

    for (let i = 1; i <= numInstallments; i++) {
      const vDate = new Date(dueDate + 'T12:00:00');
      vDate.setMonth(vDate.getMonth() + (i - 1));

      generatedInsts.push({
        id: `parc_${finId}_${i}`,
        financa_id: finId,
        num_parcela: i,
        total_parcelas: numInstallments,
        valor_parcela: parseFloat(valParcela.toFixed(2)),
        data_vencimento: vDate.toISOString().split('T')[0],
        status: 'pendente',
      });
    }

    await saveFinance(newFinance, generatedInsts);
    alert('Lançamento financeiro registrado!');
    setIsFormOpen(false);
    setDesc('');
    setAmount('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 dark:text-white text-lg">
              Financeiro, Contas & Fluxo de Caixa
            </h2>
            <p className="text-xs text-slate-400">Controle de Contas a Pagar, Receber e Parcelamentos</p>
          </div>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2 text-xs shadow-sm"
        >
          <Plus className="w-4 h-4" /> Novo Lançamento
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 border-l-4 border-l-emerald-500 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Receitas Pagas</p>
          <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
            {formatCurrency(totalReceitasPagas)}
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 border-l-4 border-l-red-500 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Despesas Pagas</p>
          <h3 className="text-2xl font-black text-red-600 dark:text-red-400 mt-1 font-mono">
            {formatCurrency(totalDespesasPagas)}
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 border-l-4 border-l-amber-500 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Previsão Pendente</p>
          <h3 className="text-2xl font-black text-amber-500 mt-1 font-mono">
            {formatCurrency(totalPendentes)}
          </h3>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar descrição de conta..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none"
        >
          <option value="">Todas as Operações</option>
          <option value="receita">Receitas (Entradas)</option>
          <option value="despesa">Despesas (Saídas)</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none"
        >
          <option value="">Todos os Status</option>
          <option value="pendente">Pendentes</option>
          <option value="pago">Quitadas / Pagas</option>
          <option value="atrasado">Em Atraso</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {filteredInstallments.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <DollarSign className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="font-bold text-sm">Nenhum lançamento financeiro encontrado.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="text-xs uppercase text-slate-400 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800">
                  <th className="p-4">Vencimento</th>
                  <th className="p-4">Descrição</th>
                  <th className="p-4 text-center">Parcela</th>
                  <th className="p-4 text-right">Valor Parcela</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredInstallments.map((inst) => {
                  const parentFin = finances.find((f) => f.id === inst.financa_id);
                  const isPaid = inst.status === 'pago';
                  const isOverdue = !isPaid && inst.data_vencimento < todayStr;
                  const isReceita = parentFin?.tipo === 'receita';

                  return (
                    <tr key={inst.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td className="p-4">
                        <span className="font-bold text-slate-900 dark:text-white block font-mono">
                          {formatDateBR(inst.data_vencimento)}
                        </span>
                        {inst.data_pagamento && (
                          <span className="text-[10px] text-emerald-600 block">
                            Pago em: {formatDateBR(inst.data_pagamento)}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-800 dark:text-slate-200">
                          {parentFin?.descricao || 'Sem descrição'}
                        </div>
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded font-medium">
                          {parentFin?.categoria || 'Geral'} • {parentFin?.entidade_nome || 'Geral'}
                        </span>
                      </td>
                      <td className="p-4 text-center font-bold text-slate-600 dark:text-slate-300">
                        {inst.num_parcela}/{inst.total_parcelas || parentFin?.num_parcelas || 1}
                      </td>
                      <td
                        className={`p-4 text-right font-extrabold font-mono ${
                          isReceita ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {formatCurrency(inst.valor_parcela)}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            isPaid
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                              : isOverdue
                              ? 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300 animate-pulse'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                          }`}
                        >
                          {isPaid ? 'QUITADA' : isOverdue ? 'EM ATRASO' : 'PENDENTE'}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        {!isPaid ? (
                          <button
                            onClick={() => payInstallment(inst.id)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-xs transition flex items-center justify-center gap-1 mx-auto"
                          >
                            <CheckCircle className="w-3.5 h-3.5" /> Quitar
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium">--</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* New Finance Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl my-8">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Registrar Lançamento Financeiro</h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFinanceSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Descrição da Conta *
                </label>
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Ex: Aluguel da loja, Fatura Energia, Compra de Bebidas"
                  required
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Tipo de Operação
                  </label>
                  <select
                    value={finType}
                    onChange={(e) => setFinType(e.target.value as FinanceType)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold"
                  >
                    <option value="despesa">Despesa (Saída)</option>
                    <option value="receita">Receita (Entrada)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Valor Total (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    required
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Nº de Parcelas
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="36"
                    value={numInstallments}
                    onChange={(e) => setNumInstallments(parseInt(e.target.value) || 1)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    1ª Data Vencimento
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Vincular Cliente / Fornecedor
                </label>
                <select
                  value={selectedEntityId}
                  onChange={(e) => setSelectedEntityId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium"
                >
                  <option value="">Geral / Sem vínculo</option>
                  {entities.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.nome_completo} ({e.tipo_entidade})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-emerald-600/20"
                >
                  Gravar Lançamento
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-5 py-3 rounded-xl"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
