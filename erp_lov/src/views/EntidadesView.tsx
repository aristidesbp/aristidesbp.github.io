import React, { useState } from 'react';
import { Entidade, TipoEntidade, StatusEntidade , EntidadeInput} from '../types/erp';
import {
  Users,
  Search,
  Plus,
  Trash2,
  FileText,
  Mail,
  MessageCircle,
  Edit,
  Save,
  X,
  Upload,
  MapPin,
  Building,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  UserCheck
} from 'lucide-react';

interface EntidadesViewProps {
  entidades: Entidade[];
  onSaveEntidade: (entidade: EntidadeInput) => Promise<void>;
  onDeleteEntidades: (ids: string[]) => Promise<void>;
}

export const EntidadesView: React.FC<EntidadesViewProps> = ({
  entidades,
  onSaveEntidade,
  onDeleteEntidades
}) => {
  const [subAba, setSubAba] = useState<'listagem' | 'formulario'>('listagem');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipoEntidade, setTipoEntidade] = useState<TipoEntidade>('cliente');
  const [statusEntidade, setStatusEntidade] = useState<StatusEntidade>('ativo');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);

  // Stats
  const totalClientes = entidades.filter((e) => e.tipo_entidade === 'cliente').length;
  const totalFornecedores = entidades.filter((e) => e.tipo_entidade === 'fornecedor').length;
  const totalInativos = entidades.filter((e) => e.status_entidade === 'inativo').length;

  // Filtered List
  const filteredList = entidades.filter((e) => {
    const matchesSearch =
      e.nome_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.cpf && e.cpf.includes(searchTerm)) ||
      (e.email && e.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTipo = filterTipo ? e.tipo_entidade === filterTipo : true;
    return matchesSearch && matchesTipo;
  });

  // Pagination
  const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // CEP Auto Lookup
  const handleBuscarCep = async (cepValue: string) => {
    const cleanCep = cepValue.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;

    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setLogradouro(data.logradouro || '');
        setBairro(data.bairro || '');
        setCidade(data.localidade || '');
        setEstado(data.uf || '');
      }
    } catch (e) {
      console.warn('ViaCEP Lookup Error', e);
    } finally {
      setCepLoading(false);
    }
  };

  const handleOpenFormNew = () => {
    setEditingId(null);
    setNomeCompleto('');
    setCpf('');
    setNascimento('');
    setEmail('');
    setTelefone('');
    setTipoEntidade('cliente');
    setStatusEntidade('ativo');
    setCep('');
    setLogradouro('');
    setNumero('');
    setBairro('');
    setCidade('');
    setEstado('');
    setFotoUrl('');
    setSubAba('formulario');
  };

  const handleEdit = (item: Entidade) => {
    setEditingId(item.id);
    setNomeCompleto(item.nome_completo || '');
    setCpf(item.cpf || '');
    setNascimento(item.data_nascimento || '');
    setEmail(item.email || '');
    setTelefone(item.telefone || '');
    setTipoEntidade(item.tipo_entidade || 'cliente');
    setStatusEntidade(item.status_entidade || 'ativo');
    setCep(item.cep || '');
    setLogradouro(item.logradouro || '');
    setNumero(item.numero || '');
    setBairro(item.bairro || '');
    setCidade(item.cidade || '');
    setEstado(item.estado || '');
    setFotoUrl(item.foto_url || '');
    setSubAba('formulario');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeCompleto.trim()) {
      alert('Informe o Nome Completo ou Razão Social!');
      return;
    }

    setIsSaving(true);
    try {
      await onSaveEntidade({
        id: editingId || undefined,
        nome_completo: nomeCompleto,
        cpf,
        data_nascimento: nascimento,
        email,
        telefone,
        tipo_entidade: tipoEntidade,
        status_entidade: statusEntidade,
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        foto_url: fotoUrl
      });
      alert('Entidade registrada com sucesso!');
      setSubAba('listagem');
    } catch (err: any) {
      alert('Erro ao salvar entidade: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedList.map((item) => item.id));
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
      alert('Selecione pelo menos um registro para excluir.');
      return;
    }
    if (confirm(`Deseja excluir ${selectedIds.length} entidade(s)?`)) {
      await onDeleteEntidades(selectedIds);
      setSelectedIds([]);
      alert('Registros excluídos com sucesso!');
    }
  };

  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const rowsHtml = filteredList
      .map(
        (e) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ccc;">${e.nome_completo}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ccc;">${e.tipo_entidade.toUpperCase()}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ccc;">${e.cpf || '-'}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ccc;">${e.telefone || '-'}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ccc;">${e.email || '-'}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ccc;">${e.cidade || ''}/${e.estado || ''}</td>
      </tr>
    `
      )
      .join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Relatório de Entidades - ERP_ABP</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            h1 { font-size: 18px; color: #006c45; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
            th { background: #f0f0f0; text-align: left; padding: 8px; }
          </style>
        </head>
        <body>
          <h1>ERP_ABP - Relatório Geral de Entidades</h1>
          <p>Gerado em: ${new Date().toLocaleString('pt-BR')}</p>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>CPF/CNPJ</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Cidade/UF</th>
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Clientes
            </p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {totalClientes}
            </h3>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Fornecedores
            </p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {totalFornecedores}
            </h3>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl">
            <Building className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Inativos
            </p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {totalInativos}
            </h3>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-600 rounded-2xl">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Sub-navigation buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setSubAba('listagem')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
            subAba === 'listagem'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Ver Entidades Cadastradas</span>
        </button>

        <button
          onClick={handleOpenFormNew}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
            subAba === 'formulario'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Nova Entidade</span>
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
              <Users className="w-5 h-5 text-emerald-500" />
              <span>
                {editingId ? 'Editar Registro de Entidade' : 'Novo Cadastro de Entidade'}
              </span>
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
                Nome Completo / Razão Social *
              </label>
              <input
                type="text"
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
                placeholder="Ex: Maria das Dores ou Soluções Ltda"
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                CPF / CNPJ
              </label>
              <input
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Data Nasc. / Fundação
              </label>
              <input
                type="date"
                value={nascimento}
                onChange={(e) => setNascimento(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cliente@email.com"
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Telefone / WhatsApp
              </label>
              <input
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(91) 98888-7777"
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Tipo de Categoria
              </label>
              <select
                value={tipoEntidade}
                onChange={(e) => setTipoEntidade(e.target.value as TipoEntidade)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              >
                <option value="cliente">Cliente</option>
                <option value="fornecedor">Fornecedor</option>
                <option value="colaborador">Colaborador</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Status
              </label>
              <select
                value={statusEntidade}
                onChange={(e) => setStatusEntidade(e.target.value as StatusEntidade)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>CEP</span>
                {cepLoading && <span className="text-[10px] text-emerald-500">Buscando...</span>}
              </label>
              <input
                type="text"
                value={cep}
                onChange={(e) => {
                  setCep(e.target.value);
                  handleBuscarCep(e.target.value);
                }}
                placeholder="66000-000"
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Endereço
              </label>
              <input
                type="text"
                value={logradouro}
                onChange={(e) => setLogradouro(e.target.value)}
                placeholder="Av. Presidente Vargas"
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Número
              </label>
              <input
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                placeholder="Nº ou Apto"
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Bairro
              </label>
              <input
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Bairro Central"
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Cidade
              </label>
              <input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                placeholder="Belém"
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                UF (Estado)
              </label>
              <input
                type="text"
                value={estado}
                onChange={(e) => setEstado(e.target.value.toUpperCase())}
                maxLength={2}
                placeholder="PA"
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2 text-sm"
            >
              <Save className="w-4 h-4" />
              <span>{editingId ? 'Atualizar Entidade' : 'Gravar Cadastro'}</span>
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

      {/* SUB-PAINEL: LISTAGEM */}
      {subAba === 'listagem' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden space-y-4">
          {/* Filter Bar */}
          <div className="p-6 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Pesquisar por nome, CPF/CNPJ, e-mail..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterTipo}
                onChange={(e) => {
                  setFilterTipo(e.target.value);
                  setCurrentPage(1);
                }}
                className="py-2.5 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none text-slate-800 dark:text-slate-200"
              >
                <option value="">Todas as Categorias</option>
                <option value="cliente">Clientes</option>
                <option value="fornecedor">Fornecedores</option>
                <option value="colaborador">Colaboradores</option>
              </select>

              <button
                onClick={handleExportPDF}
                className="py-2.5 px-4 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                title="Exportar em PDF"
              >
                <FileText className="w-4 h-4 text-emerald-500" />
                <span>PDF</span>
              </button>

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

          {/* Cards Grid */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {paginatedList.length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-400 font-bold text-xs">
                Nenhuma entidade encontrada.
              </div>
            ) : (
              paginatedList.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                const isClient = item.tipo_entidade === 'cliente';
                const whatsappUrl = item.telefone
                  ? `https://wa.me/55${item.telefone.replace(/\D/g, '')}`
                  : null;

                return (
                  <div
                    key={item.id}
                    className={`bg-slate-50 dark:bg-slate-800/80 border rounded-2xl p-4 transition-all relative flex flex-col justify-between hover:shadow-md ${
                      isSelected
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'border-slate-200/80 dark:border-slate-700/80'
                    }`}
                  >
                    <div className="absolute top-3 right-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(item.id)}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 font-extrabold flex items-center justify-center shrink-0">
                          {item.nome_completo.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 pr-6">
                          <span className="text-[9px] uppercase font-extrabold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            {item.tipo_entidade}
                          </span>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate mt-0.5">
                            {item.nome_completo}
                          </h4>
                        </div>
                      </div>

                      <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 mb-4 font-mono">
                        {item.cpf && <p>Doc: {item.cpf}</p>}
                        {item.telefone && <p>Tel: {item.telefone}</p>}
                        {item.email && <p className="truncate">Mail: {item.email}</p>}
                        {item.cidade && (
                          <p className="flex items-center gap-1 font-sans text-[11px] text-slate-400 mt-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {item.cidade}/{item.estado}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action icons */}
                    <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {whatsappUrl && (
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-emerald-500/10 text-emerald-600 rounded-lg hover:bg-emerald-500/20 transition"
                            title="WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {item.email && (
                          <a
                            href={`mailto:${item.email}`}
                            className="p-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition"
                            title="Enviar E-mail"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 bg-slate-200 dark:bg-slate-700 hover:bg-emerald-600 hover:text-white text-slate-700 dark:text-slate-200 rounded-lg transition"
                        title="Editar"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>
              Mostrando {paginatedList.length} de {filteredList.length} registro(s)
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-bold">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
