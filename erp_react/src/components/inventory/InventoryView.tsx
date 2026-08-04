import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../lib/sanitizer';
import { Product, ProductUnit } from '../../types';
import { parseNFeXml, NFeParsedData } from '../../lib/nfeParser';
import {
  Package,
  Plus,
  FileSpreadsheet,
  FileJson,
  Search,
  Edit2,
  Trash2,
  AlertTriangle,
  Barcode,
  X,
  Upload,
  CheckCircle2,
} from 'lucide-react';

export const InventoryView: React.FC = () => {
  const { products, saveProduct, deleteProduct, saveFinance } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  // XML NF-e Import Modal State
  const [isNfeModalOpen, setIsNfeModalOpen] = useState(false);
  const [parsedNFe, setParsedNFe] = useState<NFeParsedData | null>(null);

  const categories = Array.from(new Set(products.map((p) => p.categoria || 'Geral')));

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.codigo_barras && p.codigo_barras.includes(searchTerm));
    const matchesCategory = selectedCategory ? p.categoria === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleOpenForm = (prod?: Product) => {
    if (prod) {
      setEditingProduct(prod);
    } else {
      setEditingProduct({
        id: `prod_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        nome: '',
        codigo_barras: '',
        categoria: 'Geral',
        unidade: 'UN',
        preco_custo: 0,
        preco_venda: 0,
        quantidade_estoque: 0,
        estoque_minimo: 5,
        descricao: '',
      });
    }
    setIsFormOpen(true);
  };

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.nome || editingProduct.preco_venda === undefined) {
      alert('Preencha o Nome e o Preço de Venda do produto.');
      return;
    }

    const fullProduct: Product = {
      id: editingProduct.id || `prod_${Date.now()}`,
      nome: editingProduct.nome,
      codigo_barras: editingProduct.codigo_barras || '',
      categoria: editingProduct.categoria || 'Geral',
      unidade: (editingProduct.unidade as ProductUnit) || 'UN',
      unidade_medida: editingProduct.unidade || 'UN',
      preco_custo: Number(editingProduct.preco_custo) || 0,
      preco_venda: Number(editingProduct.preco_venda) || 0,
      quantidade_estoque: Number(editingProduct.quantidade_estoque) || 0,
      estoque_minimo: Number(editingProduct.estoque_minimo) || 5,
      descricao: editingProduct.descricao || '',
      foto_url: editingProduct.foto_url || '',
      ncm: editingProduct.ncm || '',
      cest: editingProduct.cest || '',
      cfop_entrada: editingProduct.cfop_entrada || '',
    };

    await saveProduct(fullProduct);
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja realmente excluir este produto do estoque?')) {
      await deleteProduct(id);
    }
  };

  // Handle JSON File Import for Products
  const handleJsonFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const content = evt.target?.result as string;
        const parsed = JSON.parse(content);
        let itemsToImport: any[] = [];

        if (Array.isArray(parsed)) {
          itemsToImport = parsed;
        } else if (parsed.products && Array.isArray(parsed.products)) {
          itemsToImport = parsed.products;
        } else if (parsed.items && Array.isArray(parsed.items)) {
          itemsToImport = parsed.items;
        }

        if (itemsToImport.length === 0) {
          alert('Nenhum produto válido encontrado no arquivo JSON selecionado.');
          return;
        }

        let importedCount = 0;
        for (const item of itemsToImport) {
          if (!item.nome && !item.name) continue;

          const prod: Product = {
            id: item.id || `prod_${Date.now()}_${Math.random().toString().slice(-4)}`,
            nome: item.nome || item.name || 'Produto Sem Nome',
            codigo_barras: item.codigo_barras || item.barcode || item.ean || '',
            categoria: item.categoria || item.category || 'Geral',
            unidade: (item.unidade || item.unit || 'UN') as ProductUnit,
            preco_custo: Number(item.preco_custo ?? item.costPrice ?? 0),
            preco_venda: Number(item.preco_venda ?? item.price ?? item.salePrice ?? 0),
            quantidade_estoque: Number(item.quantidade_estoque ?? item.quantity ?? item.stock ?? 0),
            estoque_minimo: Number(item.estoque_minimo ?? item.minStock ?? 5),
            descricao: item.descricao || item.description || '',
          };

          await saveProduct(prod);
          importedCount++;
        }

        alert(`Importação JSON Concluída com Sucesso!\n${importedCount} produtos foram processados e salvos no estoque.`);
      } catch (err: any) {
        alert('Erro ao importar arquivo JSON: ' + (err.message || 'Formato de arquivo inválido.'));
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Handle XML NF-e File Select
  const handleXmlFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const xmlContent = evt.target?.result as string;
        const parsedData = parseNFeXml(xmlContent);
        setParsedNFe(parsedData);
      } catch (err: any) {
        alert(err.message || 'Erro ao ler arquivo XML.');
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmNFeImport = async () => {
    if (!parsedNFe) return;

    let addedCount = 0;
    let updatedCount = 0;

    for (const item of parsedNFe.products) {
      const existing = products.find(
        (p) => (item.barcode && p.codigo_barras === item.barcode) || p.nome === item.name
      );

      if (existing) {
        await saveProduct({
          ...existing,
          preco_custo: item.costPrice,
          quantidade_estoque: existing.quantidade_estoque + item.quantity,
        });
        updatedCount++;
      } else {
        const newProd: Product = {
          id: `prod_nfe_${Date.now()}_${Math.random().toString().slice(-4)}`,
          nome: item.name,
          codigo_barras: item.barcode,
          categoria: 'Geral',
          unidade: item.unit,
          preco_custo: item.costPrice,
          preco_venda: item.suggestedSalePrice,
          quantidade_estoque: item.quantity,
          estoque_minimo: 5,
        };
        await saveProduct(newProd);
        addedCount++;
      }
    }

    // Auto-create Accounts Payable record for the supplier invoice
    if (parsedNFe.totalInvoiceAmount > 0) {
      const finId = `fin_nfe_${Date.now()}`;
      await saveFinance(
        {
          id: finId,
          descricao: `NF-e #${parsedNFe.invoiceNumber} - ${parsedNFe.supplierName}`,
          tipo: 'despesa',
          categoria: 'Fornecedores',
          valor_total: parsedNFe.totalInvoiceAmount,
          num_parcelas: 1,
          status_lancamento: 'aberto',
          created_at: new Date().toISOString(),
        },
        [
          {
            id: `parc_${finId}_1`,
            financa_id: finId,
            num_parcela: 1,
            total_parcelas: 1,
            valor_parcela: parsedNFe.totalInvoiceAmount,
            data_vencimento: parsedNFe.issueDate || new Date().toISOString().split('T')[0],
            status: 'pendente',
          },
        ]
      );
    }

    alert(
      `NF-e Processada com Sucesso!\n- ${addedCount} novos produtos cadastrados\n- ${updatedCount} estoques atualizados\n- Lançamento de Contas a Pagar gerado no Financeiro.`
    );

    setIsNfeModalOpen(false);
    setParsedNFe(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 dark:text-white text-lg">
              Estoque & Cadastro de Produtos
            </h2>
            <p className="text-xs text-slate-400">Total de {products.length} itens cadastrados no supermercado</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <input
            type="file"
            accept=".json"
            onChange={handleJsonFileUpload}
            className="hidden"
            id="import-json-products-input"
          />
          <label
            htmlFor="import-json-products-input"
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-2 text-xs shadow-sm cursor-pointer"
          >
            <FileJson className="w-4 h-4" /> Importar via JSON
          </label>
          <button
            onClick={() => setIsNfeModalOpen(true)}
            className="flex-1 sm:flex-none bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-2 text-xs shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4" /> Importar NF-e (XML)
          </button>
          <button
            onClick={() => handleOpenForm()}
            className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-2 text-xs shadow-sm"
          >
            <Plus className="w-4 h-4" /> Novo Produto
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por Nome do produto ou Código de Barras EAN..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none"
        >
          <option value="">Todas as Categorias</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Package className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="font-bold text-sm">Nenhum produto encontrado.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="text-xs uppercase text-slate-400 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800">
                  <th className="p-4">Código / Produto</th>
                  <th className="p-4">Categoria</th>
                  <th className="p-4 text-right">Preço Custo</th>
                  <th className="p-4 text-right">Preço Venda</th>
                  <th className="p-4 text-center">Estoque Atual</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredProducts.map((p) => {
                  const isLow = p.quantidade_estoque <= p.estoque_minimo && p.quantidade_estoque > 0;
                  const isZero = p.quantidade_estoque <= 0;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td className="p-4">
                        <div className="font-bold text-slate-900 dark:text-white">{p.nome}</div>
                        {p.codigo_barras ? (
                          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                            <Barcode className="w-3 h-3 text-slate-400" />
                            <span>{p.codigo_barras}</span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">Sem código EAN</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {p.categoria || 'Geral'}
                        </span>
                      </td>
                      <td className="p-4 text-right font-medium text-slate-500 font-mono">
                        {formatCurrency(p.preco_custo)}
                      </td>
                      <td className="p-4 text-right font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                        {formatCurrency(p.preco_venda)}
                      </td>
                      <td className="p-4 text-center font-bold">
                        <span className="font-mono">{p.quantidade_estoque}</span>{' '}
                        <span className="text-xs text-slate-400 font-normal">{p.unidade}</span>
                        <span className="block text-[10px] text-slate-400">mín: {p.estoque_minimo}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            isZero
                              ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300 animate-pulse'
                              : isLow
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                          }`}
                        >
                          {isZero ? 'ZERADO' : isLow ? 'ESTOQUE BAIXO' : 'NORMAL'}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenForm(p)}
                            className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-600 hover:text-white rounded-xl transition"
                            title="Editar Produto"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-2 bg-red-50 dark:bg-red-950/30 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition"
                            title="Excluir Produto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isFormOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl animate-in zoom-in-95 my-8">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {editingProduct.nome ? 'Editar Produto' : 'Cadastrar Novo Produto'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Nome do Produto *
                  </label>
                  <input
                    type="text"
                    value={editingProduct.nome || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, nome: e.target.value })}
                    placeholder="Ex: Arroz Tipo 1 - 5kg"
                    required
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Código de Barras (EAN-13 / SKU)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.codigo_barras || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, codigo_barras: e.target.value })}
                    placeholder="7891234567890"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Categoria
                  </label>
                  <input
                    type="text"
                    value={editingProduct.categoria || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoria: e.target.value })}
                    placeholder="Ex: Alimentos, Bebidas, Limpeza"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Unidade de Medida
                  </label>
                  <select
                    value={editingProduct.unidade || 'UN'}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, unidade: e.target.value as ProductUnit })
                    }
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold"
                  >
                    <option value="UN">UN - Unidade</option>
                    <option value="KG">KG - Quilograma</option>
                    <option value="CX">CX - Caixa</option>
                    <option value="L">L - Litro</option>
                    <option value="PCT">PCT - Pacote</option>
                    <option value="G">G - Grama</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Estoque Mínimo (Alerta)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.estoque_minimo ?? 5}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, estoque_minimo: parseInt(e.target.value) || 0 })
                    }
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Preço de Custo (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.preco_custo ?? ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, preco_custo: parseFloat(e.target.value) || 0 })
                    }
                    placeholder="0.00"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Preço de Venda (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.preco_venda ?? ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, preco_venda: parseFloat(e.target.value) || 0 })
                    }
                    placeholder="0.00"
                    required
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-bold text-emerald-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Quantidade em Estoque Atual *
                  </label>
                  <input
                    type="number"
                    value={editingProduct.quantidade_estoque ?? 0}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, quantidade_estoque: parseInt(e.target.value) || 0 })
                    }
                    required
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold"
                  />
                </div>

                {/* Fiscal Fields */}
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    NCM (Classificação Fiscal)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.ncm || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, ncm: e.target.value })}
                    placeholder="Ex: 1006.30.21"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    CEST (Subst. Tributária)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.cest || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, cest: e.target.value })}
                    placeholder="Ex: 17.001.00"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono"
                  />
                </div>

                <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                      CFOP de Entrada
                    </label>
                    <input
                      type="text"
                      value={editingProduct.cfop_entrada || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, cfop_entrada: e.target.value })}
                      placeholder="Ex: 5102"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                      URL da Foto / Imagem
                    </label>
                    <input
                      type="url"
                      value={editingProduct.foto_url || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, foto_url: e.target.value })}
                      placeholder="https://..."
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Descrição Detalhada do Produto
                  </label>
                  <textarea
                    rows={2}
                    value={editingProduct.descricao || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, descricao: e.target.value })}
                    placeholder="Informaçoes nutricionais, peso líquido, diferenciais do produto..."
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-emerald-600/20"
                >
                  Salvar Produto
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

      {/* XML NF-e Import Modal */}
      {isNfeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl animate-in zoom-in-95 my-8">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Importação Automática de NF-e (XML)
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsNfeModalOpen(false);
                  setParsedNFe(null);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!parsedNFe ? (
              <div className="p-8 border-2 border-dashed border-purple-500/30 rounded-2xl text-center bg-purple-50/20 dark:bg-purple-950/20">
                <Upload className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h4 className="font-bold text-slate-800 dark:text-white">Selecione o arquivo .xml da NF-e</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                  O sistema cadastrará novos produtos, dará entrada no estoque, atualizará os preços de custo e criará um registro de Contas a Pagar no Financeiro.
                </p>
                <input
                  type="file"
                  accept=".xml"
                  onChange={handleXmlFileUpload}
                  className="hidden"
                  id="xml-input-file"
                />
                <label
                  htmlFor="xml-input-file"
                  className="mt-4 inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg cursor-pointer transition text-xs"
                >
                  Carregar Arquivo XML
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  <p>
                    <strong>Fornecedor:</strong> {parsedNFe.supplierName} ({parsedNFe.supplierCnpj})
                  </p>
                  <p>
                    <strong>Nota Fiscal:</strong> #{parsedNFe.invoiceNumber} • Data: {parsedNFe.issueDate}
                  </p>
                  <p className="text-purple-600 dark:text-purple-400 font-bold text-sm pt-1">
                    Valor Total da Nota: {formatCurrency(parsedNFe.totalInvoiceAmount)}
                  </p>
                </div>

                <div className="max-h-60 overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-800 text-slate-500 border-b">
                        <th className="p-2">Item</th>
                        <th className="p-2 text-center">Qtd</th>
                        <th className="p-2 text-right">Custo Un.</th>
                        <th className="p-2 text-right">Sugestão Venda</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {parsedNFe.products.map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-2 font-bold">{item.name}</td>
                          <td className="p-2 text-center">
                            {item.quantity} {item.unit}
                          </td>
                          <td className="p-2 text-right font-mono">{formatCurrency(item.costPrice)}</td>
                          <td className="p-2 text-right font-mono font-bold text-emerald-600">
                            {formatCurrency(item.suggestedSalePrice)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleConfirmNFeImport}
                    className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Confirmar Entrada no Estoque & Financeiro</span>
                  </button>
                  <button
                    onClick={() => setParsedNFe(null)}
                    className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-4 py-3 rounded-xl"
                  >
                    Escolher Outro
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
