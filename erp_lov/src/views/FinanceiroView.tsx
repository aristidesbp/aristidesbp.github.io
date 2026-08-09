import React, { useState } from 'react';
import { Financa, Parcela, Entidade } from '../types/erp';
import { BarcodeScannerModal } from '../components/BarcodeScannerModal';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  List,
  PlusCircle,
  Search,
  Trash2,
  Edit,
  Save,
  X,
  FileText,
  Receipt,
  Camera,
  Barcode,
  Calendar,
  Layers
} from 'lucide-react';

interface FinanceiroViewProps {
  financas: Financa[];
  parcelas: Parcela[];
  entidades: Entidade[];
  onSaveLancamento: (params: any) => Promise<void>;
  onDeleteParcelas: (ids: string[]) => Promise<void>;
}

export const FinanceiroView: React.FC<FinanceiroViewProps> = ({
  financas,
  parcelas,
  entidades,
  onSaveLancamento,
  onDeleteParcelas
}) => {
  const [subAba, setSubAba] = useState<'listagem' | 'formulario'>('listagem');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // Form State
  const [editingParcelaId, setEditingParcelaId] = useState<string | null>(null);
  const [editingFinancaId, setEditingFinancaId] = useState<string | null>(null);
  const [descricao, setDescricao] = useState('');
  const [tipoCalculo, setTipoCalculo] = useState<'total' | 'parcela'>('total');
  const [valorInput, setValorInput] = useState(0);
  const [tipo, setTipo] = useState<'receita' | 'despesa'>('despesa');
  const [categoria, setCategoria] = useState('Geral');
  const [statusLancamento, setStatusLancamento] = useState<'aberto' | 'finalizado' | 'cancelado'>('aberto');
  const [entidadeId, setEntidadeId] = useState('');
  const [recorrencia, setRecorrencia] = useState('1');
  const [numParcelas, setNumParcelas] = useState(1);
  const [dataVencimento, setDataVencimento] = useState(new Date().toISOString().split('T')[0]);
  const [dataPagamento, setDataPagamento] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [boletoUrl, setBoletoUrl] = useState('');
  const [comprovanteUrl, setComprovanteUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Metrics
  const receitasPagas = parcelas
    .filter((p) => p.status === 'pago' && p.financas?.tipo === 'receita')
    .reduce((acc, p) => acc + Number(p.valor_parcela || 0), 0);

  const despesasPagas = parcelas
    .filter((p) => p.status === 'pago' && p.financas?.tipo === 'despesa')
    .reduce((acc, p) => acc + Number(p.valor_parcela || 0), 0);

  const pendentesTotal = parcelas
    .filter((p) => p.status !== 'pago')
    .reduce((acc, p) => acc + Number(p.valor_parcela || 0), 0);

  // Categories
  const categoriasUnicas = Array.from(
    new Set(financas.map((f) => f.categoria).filter(Boolean))
  );

  // Filtered Parcelas
  const hojeStr = new Date().toISOString().split('T')[0];
  const filteredList = parcelas.filter((p) => {
    const desc = p.financas?.descricao || '';
    const matchesSearch = desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategoria ? p.financas?.categoria === filterCategoria : true;
    const matchesInicio = dataInicio ? p.data_vencimento >= dataInicio : true;
    const matchesFim = dataFim ? p.data_vencimento <= dataFim : true;
    return matchesSearch && matchesCat && matchesInicio && matchesFim;
  });

  const handleOpenFormNew = () => {
    setEditingParcelaId(null);
    setEditingFinancaId(null);
    setDescricao('');
    setTipoCalculo('total');
    setValorInput(0);
    setTipo('despesa');
    setCategoria('Geral');
    setStatusLancamento('aberto');
    setEntidadeId('');
    setRecorrencia('1');
    setNumParcelas(1);
    setDataVencimento(new Date().toISOString().split('T')[0]);
    setDataPagamento('');
    setCodigoBarras('');
    setBoletoUrl('');
    setComprovanteUrl('');
    setSubAba('formulario');
  };

  const handleEditParcela = (p: Parcela) => {
    setEditingParcelaId(p.id);
    setEditingFinancaId(p.financa_id);
    setDescricao(p.financas?.descricao || '');
    setTipo(p.financas?.tipo || 'despesa');
    setCategoria(p.financas?.categoria || 'Geral');
    setStatusLancamento(p.financas?.status_lancamento || 'aberto');
    setTipoCalculo('parcela');
    setValorInput(p.valor_parcela);
    setNumParcelas(1);
    setDataVencimento(p.data_vencimento);
    setDataPagamento(p.data_pagamento || '');
    setCodigoBarras(p.codigo_barra || '');
    setBoletoUrl(p.boleto_url || '');
    setComprovanteUrl(p.comprovante_url || '');
    setSubAba('formulario');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricao.trim() || valorInput <= 0 || !dataVencimento) {
      alert('Informe Descrição, Valor e Data de Vencimento!');
      return;
    }

    setIsSaving(true);
    try {
      await onSaveLancamento({
        financaId: editingFinancaId || undefined,
        parcelaId: editingParcelaId || undefined,
        descricao,
        valor: Number(valorInput),
        tipo,
        categoria,
        statusLancamento,
        numParcelas: Number(numParcelas),
        tipoCalculo,
        recorrencia,
        dataVencimento,
        dataPagamento: dataPagamento || undefined,
        entidadeId: entidadeId || undefined,
        codigoBarras,
        boletoUrl,
        comprovanteUrl
      });
      alert('Lançamento salvo com sucesso!');
      setSubAba('listagem');
    } catch (err: any) {
      alert('Erro ao salvar lançamento: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredList.map((p) => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) {
      alert('Selecione ao menos uma parcela.');
      return;
    }
    if (confirm(`Excluir ${selectedIds.length} parcela(s)?`)) {
      await onDeleteParcelas(selectedIds);
      setSelectedIds([]);
      alert('Parcela(s) excluída(s) com sucesso!');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Receitas (Pagas)
            </span>
            <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
            R$ {receitasPagas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-l-red-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Despesas (Pagas)
            </span>
            <div className="p-3 bg-red-500/10 text-red-600 rounded-2xl">
              <TrendingDown className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-red-600 dark:text-red-400 mt-2">
            R$ {despesasPagas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Previsão (Pendentes)
            </span>
            <div className="p-3 bg-amber-500/10 text-amber-600 rounded-2xl">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-2">
            R$ {pendentesTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h3>
        </div>
      </div>

      {/* Action Sub-navigation buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setSubAba('listagem')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
            subAba === 'listagem'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
          }`}
        >
          <List className="w-4 h-4" />
          <span>Ver Lançamentos & Parcelas</span>
        </button>

        <button
          onClick={handleOpenFormNew}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
            subAba === 'formulario'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Novo Lançamento Financeiro</span>
        </button>
      </div>

      {/* SUB-PAINEL: FORMULÁRIO */}
      {subAba === 'formulario' && (
        <form
          onSubmit={handleSave}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              <span>{editingParcelaId ? 'Editar Parcela' : 'Novo Lançamento Financeiro'}</span>
            </h3>
            <button
              type="button"
              onClick={() => setSubAba('listagem')}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Descrição da Conta *
              </label>
              <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Ex: Aluguel do Salão, Conta de Luz, Compra Estoque"
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Tipo de Cálculo
              </label>
              <select
                value={tipoCalculo}
                onChange={(e) => setTipoCalculo(e.target.value as 'total' | 'parcela')}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              >
                <option value="total">Valor Total</option>
                <option value="parcela">Valor da Parcela</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                {tipoCalculo === 'total' ? 'Valor Total (R$) *' : 'Valor Parcela (R$) *'}
              </label>
              <input
                type="number"
                step="0.01"
                value={valorInput}
                onChange={(e) => setValorInput(Number(e.target.value))}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-emerald-600 dark:text-emerald-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Tipo de Operação
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as 'receita' | 'despesa')}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              >
                <option value="despesa">Despesa (Saída -)</option>
                <option value="receita">Receita (Entrada +)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Categoria
              </label>
              <input
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                list="fin-lista-categorias-datalist"
                placeholder="Geral"
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              />
              <datalist id="fin-lista-categorias-datalist">
                {categoriasUnicas.map((cat, i) => (
                  <option key={i} value={cat} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Entidade Vinculada
              </label>
              <select
                value={entidadeId}
                onChange={(e) => setEntidadeId(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              >
                <option value="">Consumidor / Não Especificado</option>
                {entidades.map((ent) => (
                  <option key={ent.id} value={ent.id}>
                    {ent.nome_completo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Status do Lançamento
              </label>
              <select
                value={statusLancamento}
                onChange={(e) => setStatusLancamento(e.target.value as any)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              >
                <option value="aberto">Aberto</option>
                <option value="finalizado">Finalizado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Recorrência
              </label>
              <select
                value={recorrencia}
                disabled={Boolean(editingParcelaId)}
                onChange={(e) => setRecorrencia(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white disabled:opacity-50"
              >
                <option value="1">Mensal</option>
                <option value="3">Trimestral</option>
                <option value="6">Semestral</option>
                <option value="12">Anual</option>
                <option value="diario">Diário</option>
              </select>
            </div>

            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
              <label className="block text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                Nº de Parcelas *
              </label>
              <input
                type="number"
                value={numParcelas}
                disabled={Boolean(editingParcelaId)}
                onChange={(e) => setNumParcelas(Number(e.target.value))}
                min={1}
                className="w-full p-2 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-900/50 rounded-xl font-bold text-sm text-blue-600 dark:text-blue-300 outline-none disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Data Vencimento *
              </label>
              <input
                type="date"
                value={dataVencimento}
                onChange={(e) => setDataVencimento(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Data Pagamento
              </label>
              <input
                type="date"
                value={dataPagamento}
                onChange={(e) => setDataPagamento(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Linha Digitável / Código de Barras
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={codigoBarras}
                    onChange={(e) => setCodigoBarras(e.target.value)}
                    placeholder="237933812860083013528560000633071890000250000"
                    className="w-full pl-9 pr-3 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsScannerOpen(true)}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-4 rounded-xl font-bold text-xs flex items-center gap-2 transition"
                >
                  <Camera className="w-4 h-4" />
                  <span>Ler Câmera</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2 text-sm"
            >
              <Save className="w-4 h-4" />
              <span>{editingParcelaId ? 'Atualizar Parcela' : 'Gravar Lançamento'}</span>
            </button>

            <button
              type="button"
              onClick={() => setSubAba('listagem')}
              className="px-6 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-3.5 rounded-xl hover:bg-slate-300 transition text-sm"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* SUB-PAINEL: LISTAGEM DE PARCELAS */}
      {subAba === 'listagem' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden space-y-4">
          {/* Filters Bar */}
          <div className="p-6 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar por descrição..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={filterCategoria}
                onChange={(e) => setFilterCategoria(e.target.value)}
                className="py-2.5 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none text-slate-800 dark:text-slate-200"
              >
                <option value="">Todas as Categoria</option>
                {categoriasUnicas.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <input
                  type="date"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  className="py-2 bg-transparent text-xs outline-none text-slate-800 dark:text-white"
                />
                <span className="text-slate-400 text-xs">até</span>
                <input
                  type="date"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                  className="py-2 bg-transparent text-xs outline-none text-slate-800 dark:text-white"
                />
              </div>

              <button
                onClick={handleDeleteSelected}
                disabled={selectedIds.length === 0}
                className="py-2.5 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-40"
              >
                <Trash2 className="w-4 h-4" />
                <span>Excluir ({selectedIds.length})</span>
              </button>
            </div>
          </div>

          {/* Table view */}
          <div className="overflow-x-auto px-6 pb-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="p-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={
                        selectedIds.length === filteredList.length && filteredList.length > 0
                      }
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                  </th>
                  <th className="p-3">Vencimento / Pagamento</th>
                  <th className="p-3">Descrição / Anexos</th>
                  <th className="p-3">Nº Parcela</th>
                  <th className="p-3">Valor (R$)</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>

              <tbody className="text-xs divide-y divide-slate-100 dark:divide-slate-800">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400 font-bold">
                      Nenhuma parcela encontrada.
                    </td>
                  </tr>
                ) : (
                  filteredList.map((p) => {
                    const isSelected = selectedIds.includes(p.id);
                    const isPaid = p.status === 'pago';
                    const isOverdue = p.status !== 'pago' && p.data_vencimento < String(hojeStr);
                    const isReceita = p.financas?.tipo === 'receita';

                    const dtVenc = new Date(p.data_vencimento + 'T12:00:00').toLocaleDateString(
                      'pt-BR'
                    );
                    const dtPag = p.data_pagamento
                      ? new Date(p.data_pagamento + 'T12:00:00').toLocaleDateString('pt-BR')
                      : '-';

                    return (
                      <tr
                        key={p.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                      >
                        <td className="p-3 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(p.id)}
                            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                          />
                        </td>

                        <td className="p-3">
                          <p className="font-bold text-slate-900 dark:text-white">{dtVenc}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Pag: {dtPag}</p>
                        </td>

                        <td className="p-3">
                          <p className="font-bold text-slate-800 dark:text-slate-200">
                            {p.financas?.descricao || 'Sem Descrição'}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-bold">
                              {p.financas?.categoria || 'Geral'}
                            </span>
                            {p.comprovante_url && (
                              <a
                                href={p.comprovante_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1"
                              >
                                <Receipt className="w-3 h-3" />
                                <span>Recibo/Cupom</span>
                              </a>
                            )}
                          </div>
                          {p.codigo_barra && (
                            <p className="text-[10px] font-mono text-slate-400 truncate max-w-xs mt-1">
                              {p.codigo_barra}
                            </p>
                          )}
                        </td>

                        <td className="p-3 font-bold text-slate-600 dark:text-slate-300">
                          {p.num_parcela} / {p.financas?.num_parcelas || 1}
                        </td>

                        <td
                          className={`p-3 font-bold text-sm font-mono ${
                            isReceita
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {isReceita ? '+' : '-'} R$ {p.valor_parcela.toFixed(2)}
                        </td>

                        <td className="p-3 text-center">
                          {isPaid ? (
                            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 font-extrabold text-[10px] uppercase">
                              PAGO
                            </span>
                          ) : isOverdue ? (
                            <span className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-600 font-extrabold text-[10px] uppercase animate-pulse">
                              ATRASADO
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 font-extrabold text-[10px] uppercase">
                              PENDENTE
                            </span>
                          )}
                        </td>

                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleEditParcela(p)}
                            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-700 dark:text-slate-200 rounded-lg transition"
                            title="Editar Parcela"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Barcode Scanner Modal */}
      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScan={(scannedCode) => setCodigoBarras(scannedCode)}
      />
    </div>
  );
};
