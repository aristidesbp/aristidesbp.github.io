import React, { useState } from 'react';
import { Produto , ProdutoInput} from '../types/erp';
import { BarcodeScannerModal } from '../components/BarcodeScannerModal';
import {
  Package,
  PlusCircle,
  List,
  Upload,
  Camera,
  Search,
  Trash2,
  Edit,
  Save,
  X,
  AlertTriangle,
  FileCode2,
  Barcode,
  Image as ImageIcon
} from 'lucide-react';

interface EstoqueViewProps {
  produtos: Produto[];
  onSaveProduto: (produto: ProdutoInput) => Promise<void>;
  onDeleteProdutos: (ids: string[]) => Promise<void>;
}

export const EstoqueView: React.FC<EstoqueViewProps> = ({
  produtos,
  onSaveProduto,
  onDeleteProdutos
}) => {
  const [subAba, setSubAba] = useState<'listagem' | 'formulario'>('listagem');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('Geral');
  const [estoqueMinimo, setEstoqueMinimo] = useState(5);
  const [precoCusto, setPrecoCusto] = useState(0);
  const [precoVenda, setPrecoVenda] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Unique categories for datalist and filter dropdown
  const categoriasUnicas = Array.from(
    new Set(produtos.map((p) => p.categoria).filter(Boolean))
  );

  // Stats
  const totalCadastrados = produtos.length;
  const estoqueBaixo = produtos.filter((p) => p.quantidade_estoque <= p.estoque_minimo).length;
  const totalItens = produtos.reduce((acc, p) => acc + p.quantidade_estoque, 0);

  // Filtered List
  const filteredList = produtos.filter((p) => {
    const matchesSearch =
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.codigo_barras && p.codigo_barras.includes(searchTerm));
    const matchesCat = filterCategoria ? p.categoria === filterCategoria : true;
    return matchesSearch && matchesCat;
  });

  const handleOpenFormNew = () => {
    setEditingId(null);
    setNome('');
    setCategoria('Geral');
    setEstoqueMinimo(5);
    setPrecoCusto(0);
    setPrecoVenda(0);
    setQuantidade(0);
    setDescricao('');
    setCodigoBarras('');
    setFotoUrl('');
    setSubAba('formulario');
  };

  const handleEdit = (p: Produto) => {
    setEditingId(p.id);
    setNome(p.nome);
    setCategoria(p.categoria || 'Geral');
    setEstoqueMinimo(p.estoque_minimo || 5);
    setPrecoCusto(p.preco_custo || 0);
    setPrecoVenda(p.preco_venda || 0);
    setQuantidade(p.quantidade_estoque || 0);
    setDescricao(p.descricao || '');
    setCodigoBarras(p.codigo_barras || '');
    setFotoUrl(p.foto_url || '');
    setSubAba('formulario');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || precoVenda <= 0) {
      alert('Informe o Nome do produto e um Preço de Venda válido!');
      return;
    }

    setIsSaving(true);
    try {
      await onSaveProduto({
        id: editingId || undefined,
        nome,
        categoria,
        estoque_minimo: Number(estoqueMinimo),
        preco_custo: Number(precoCusto),
        preco_venda: Number(precoVenda),
        quantidade_estoque: Number(quantidade),
        descricao,
        codigo_barras: codigoBarras,
        foto_url: fotoUrl
      });
      alert('Produto gravado com sucesso!');
      setSubAba('listagem');
    } catch (err: any) {
      alert('Erro ao gravar produto: ' + err.message);
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
      alert('Selecione ao menos um produto para excluir.');
      return;
    }
    if (confirm(`Excluir ${selectedIds.length} produto(s) do estoque?`)) {
      await onDeleteProdutos(selectedIds);
      setSelectedIds([]);
      alert('Produtos removidos com sucesso!');
    }
  };

  // Process NFe XML Upload
  const handleProcessXmlNfe = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(event.target?.result as string, 'text/xml');
        const detNodes = xmlDoc.getElementsByTagName('det');

        if (detNodes.length === 0) {
          alert('Nenhum produto encontrado neste arquivo XML de NF-e.');
          return;
        }

        let importadosCount = 0;
        for (let i = 0; i < detNodes.length; i++) {
          const prodNode = detNodes[i]?.getElementsByTagName('prod')[0];
          if (!prodNode) continue;

          const xProd = prodNode.getElementsByTagName('xProd')[0]?.textContent || '';
          let cEAN = prodNode.getElementsByTagName('cEAN')[0]?.textContent || '';
          if (cEAN === 'SEM GTIN') cEAN = '';

          const vUnCom = parseFloat(prodNode.getElementsByTagName('vUnCom')[0]?.textContent || '0');
          const qCom = parseInt(prodNode.getElementsByTagName('qCom')[0]?.textContent || '0', 10);

          if (xProd) {
            await onSaveProduto({
              nome: xProd,
              codigo_barras: cEAN,
              preco_custo: vUnCom,
              preco_venda: Number((vUnCom * 1.35).toFixed(2)),
              quantidade_estoque: qCom,
              estoque_minimo: 5,
              categoria: 'Importado NFe'
            });
            importadosCount++;
          }
        }

        alert(`XML da NF-e processado com sucesso!\n${importadosCount} produto(s) integrados ao estoque.`);
        setSubAba('listagem');
      } catch (err: any) {
        alert('Erro ao processar o XML: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between border-l-4 border-l-emerald-500">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Produtos Cadastrados
            </p>
            <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              {totalCadastrados}
            </h3>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between border-l-4 border-l-amber-500">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Estoque Mínimo Crítico
            </p>
            <h3 className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
              {estoqueBaixo}
            </h3>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-600 rounded-2xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between border-l-4 border-l-blue-500">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Itens em Estoque
            </p>
            <h3 className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
              {totalItens}
            </h3>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl">
            <List className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Action Sub-navigation buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSubAba('listagem')}
          className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
            subAba === 'listagem'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
          }`}
        >
          <List className="w-4 h-4" />
          <span>Ver Produtos</span>
        </button>

        <button
          onClick={handleOpenFormNew}
          className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
            subAba === 'formulario'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Novo Produto</span>
        </button>

        <label className="flex-1 min-w-[150px] py-3 px-4 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-600/20 transition">
          <FileCode2 className="w-4 h-4" />
          <span>Importar NF-e (XML)</span>
          <input
            type="file"
            accept=".xml"
            onChange={handleProcessXmlNfe}
            className="hidden"
          />
        </label>
      </div>

      {/* SUB-PAINEL: FORMULÁRIO */}
      {subAba === 'formulario' && (
        <form
          onSubmit={handleSave}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-500" />
              <span>{editingId ? 'Editar Produto' : 'Cadastro de Produto'}</span>
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
                Nome do Produto *
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Camiseta Polo ou Café 500g"
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Categoria
              </label>
              <input
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                list="lista-categorias-datalist"
                placeholder="Geral"
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              />
              <datalist id="lista-categorias-datalist">
                {categoriasUnicas.map((cat, i) => (
                  <option key={i} value={cat} />
                ))}
              </datalist>
            </div>

            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
              <label className="block text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                Estoque Mínimo *
              </label>
              <input
                type="number"
                value={estoqueMinimo}
                onChange={(e) => setEstoqueMinimo(Number(e.target.value))}
                min={0}
                className="w-full p-2 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-900/50 rounded-xl font-bold text-sm text-blue-600 dark:text-blue-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Preço de Custo (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={precoCusto}
                onChange={(e) => setPrecoCusto(Number(e.target.value))}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Preço de Venda (R$) *
              </label>
              <input
                type="number"
                step="0.01"
                value={precoVenda}
                onChange={(e) => setPrecoVenda(Number(e.target.value))}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-emerald-600 dark:text-emerald-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Quantidade Atual *
              </label>
              <input
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Código de Barras / EAN / SKU
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={codigoBarras}
                    onChange={(e) => setCodigoBarras(e.target.value)}
                    placeholder="7891234567890"
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

            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Descrição Detalhada
              </label>
              <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Detalhes, especificações ou observações do produto"
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
              <span>{editingId ? 'Atualizar Produto' : 'Gravar Produto'}</span>
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
          {/* Filters Bar */}
          <div className="p-6 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar produto por nome ou código de barras..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterCategoria}
                onChange={(e) => setFilterCategoria(e.target.value)}
                className="py-2.5 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none text-slate-800 dark:text-slate-200"
              >
                <option value="">Todas as Categorias</option>
                {categoriasUnicas.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

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
                  <th className="p-3">Produto / Categoria</th>
                  <th className="p-3">Código Barras</th>
                  <th className="p-3">Custo</th>
                  <th className="p-3">Venda</th>
                  <th className="p-3 text-center">Estoque</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>

              <tbody className="text-xs divide-y divide-slate-100 dark:divide-slate-800">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400 font-bold">
                      Nenhum produto cadastrado no estoque.
                    </td>
                  </tr>
                ) : (
                  filteredList.map((p) => {
                    const isSelected = selectedIds.includes(p.id);
                    const isZero = p.quantidade_estoque === 0;
                    const isLow = p.quantidade_estoque <= p.estoque_minimo && !isZero;

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
                          <p className="font-bold text-slate-900 dark:text-white text-sm">{p.nome}</p>
                          <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-bold">
                            {p.categoria || 'Geral'}
                          </span>
                        </td>

                        <td className="p-3 font-mono text-slate-500 dark:text-slate-400">
                          {p.codigo_barras || '-'}
                        </td>

                        <td className="p-3 font-medium text-slate-600 dark:text-slate-300">
                          R$ {p.preco_custo.toFixed(2)}
                        </td>

                        <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400 font-mono text-sm">
                          R$ {p.preco_venda.toFixed(2)}
                        </td>

                        <td className="p-3 text-center font-bold text-slate-900 dark:text-white text-sm">
                          {p.quantidade_estoque}
                          <span className="block text-[10px] font-normal text-slate-400">
                            mín: {p.estoque_minimo}
                          </span>
                        </td>

                        <td className="p-3 text-center">
                          {isZero ? (
                            <span className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-600 font-bold text-[10px] uppercase">
                              ZERADO
                            </span>
                          ) : isLow ? (
                            <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 font-bold text-[10px] uppercase">
                              ESTOQUE BAIXO
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 font-bold text-[10px] uppercase">
                              EM ESTOQUE
                            </span>
                          )}
                        </td>

                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleEdit(p)}
                            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-700 dark:text-slate-200 rounded-lg transition"
                            title="Editar Produto"
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
