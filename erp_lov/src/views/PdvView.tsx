import React, { useState, useEffect } from 'react';
import { Produto, Entidade, ItemCarrinho, Venda, FormaPagamento } from '../types/erp';
import { BarcodeScannerModal } from '../components/BarcodeScannerModal';
import { ThermalReceipt } from '../components/ThermalReceipt';
import {
  ShoppingCart,
  Search,
  Camera,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  ArrowDownCircle,
  History,
  Printer,
  DollarSign,
  User,
  Calculator,
  AlertCircle,
  X
} from 'lucide-react';

interface PdvViewProps {
  produtos: Produto[];
  entidades: Entidade[];
  vendas: Venda[];
  onRegisterVenda: (params: any) => Promise<void>;
  onRegisterSangria: (valor: number, motivo: string) => Promise<void>;
  onDeleteVenda: (vendaId: string) => Promise<void>;
}

export const PdvView: React.FC<PdvViewProps> = ({
  produtos,
  entidades,
  vendas,
  onRegisterVenda,
  onRegisterSangria,
  onDeleteVenda
}) => {
  const [subAba, setSubAba] = useState<'caixa' | 'sangria' | 'historico'>('caixa');
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [desconto, setDesconto] = useState(0);
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>('Dinheiro');
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // Sangria state
  const [sangriaValor, setSangriaValor] = useState(0);
  const [sangriaMotivo, setSangriaMotivo] = useState('');

  // Print Receipt Modal
  const [vendaParaImprimir, setVendaParaImprimir] = useState<{
    venda: Partial<Venda>;
    carrinho: ItemCarrinho[];
  } | null>(null);

  // Exclusão de venda (confirmação por digitação)
  const [vendaParaExcluir, setVendaParaExcluir] = useState<Venda | null>(null);
  const [confirmTexto, setConfirmTexto] = useState('');
  const [excluindo, setExcluindo] = useState(false);


  // Keyboard shortcut: F8 to finish sale
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F8') {
        e.preventDefault();
        handleFinalizarVenda();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [carrinho, desconto, clienteId, formaPagamento]);

  // Calculated totals
  const subtotalCarrinho = carrinho.reduce(
    (acc, item) => acc + item.preco_venda * item.quantidadeCarrinho,
    0
  );
  const totalPagar = Math.max(0, subtotalCarrinho - desconto);
  const totalItensCarrinho = carrinho.reduce((acc, item) => acc + item.quantidadeCarrinho, 0);

  // Stats
  const hojeStr = new Date().toISOString().split('T')[0] as string;
  const vendasHoje = vendas.filter((v) => v.created_at?.startsWith(hojeStr));
  const totalVendasHoje = vendasHoje.reduce((acc, v) => acc + Number(v.valor_total || 0), 0);

  const handleAddProdutoToCarrinho = (produto: Produto) => {
    setCarrinho((prev) => {
      const index = prev.findIndex((p) => p.id === produto.id);
      if (index >= 0) {
        const updated = [...prev];
        const found = updated[index];
        if (found) found.quantidadeCarrinho += 1;
        return updated;
      }
      return [...prev, { ...produto, quantidadeCarrinho: 1 }];
    });
    setSearchTerm('');
  };

  const handleBarcodeScanned = (scannedCode: string) => {
    const found = produtos.find(
      (p) => p.codigo_barras && p.codigo_barras.trim() === scannedCode.trim()
    );
    if (found) {
      handleAddProdutoToCarrinho(found);
    } else {
      alert(`Produto com código [${scannedCode}] não encontrado no estoque.`);
    }
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCarrinho((prev) =>
      prev
        .map((p) => {
          if (p.id === id) {
            const newQty = p.quantidadeCarrinho + delta;
            return newQty > 0 ? { ...p, quantidadeCarrinho: newQty } : null;
          }
          return p;
        })
        .filter(Boolean) as ItemCarrinho[]
    );
  };

  const handleRemoveFromCarrinho = (id: string) => {
    setCarrinho((prev) => prev.filter((p) => p.id !== id));
  };

  const handleFinalizarVenda = async () => {
    if (carrinho.length === 0) {
      alert('Adicione produtos ao carrinho antes de finalizar!');
      return;
    }

    if (
      !confirm(
        `Confirmar recebimento de R$ ${totalPagar.toFixed(2)} via ${formaPagamento}?`
      )
    ) {
      return;
    }

    // Generate Cupom HTML
    const clienteObj = entidades.find((e) => e.id === clienteId);
    const dataHoraStr = new Date().toLocaleString('pt-BR');
    const idCurto = 'VD' + Date.now().toString().slice(-6);

    const itensHtml = carrinho
      .map(
        (i) => `
      <tr>
        <td style="padding: 2px 0;">${i.nome}</td>
        <td style="text-align: center;">${i.quantidadeCarrinho}</td>
        <td style="text-align: right;">R$ ${(i.preco_venda * i.quantidadeCarrinho).toFixed(2)}</td>
      </tr>
    `
      )
      .join('');

    const cupomHtmlCompleto = `
      <div style="font-family: monospace; width: 280px; padding: 10px; margin: 0 auto; color: #000; background: #fff; font-size: 11px;">
        <h3 style="text-align: center; margin: 0 0 4px 0;">ERP_ABP</h3>
        <p style="text-align: center; font-size: 10px; margin: 0 0 8px 0;">Comprovante de Venda</p>
        <p style="margin: 2px 0;">Data: ${dataHoraStr}</p>
        <p style="margin: 2px 0;">Nº Venda: #${idCurto}</p>
        <p style="margin: 2px 0;">Pagamento: ${formaPagamento}</p>
        ${clienteObj ? `<p style="margin: 2px 0;">Cliente: ${clienteObj.nome_completo}</p>` : ''}
        <hr style="border: dashed 1px #000; margin: 6px 0;">
        <table style="width: 100%; font-size: 10px;">
          <thead>
            <tr style="border-bottom: 1px solid #000;">
              <th style="text-align: left;">Item</th>
              <th style="text-align: center;">Qtd</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>${itensHtml}</tbody>
        </table>
        <hr style="border: dashed 1px #000; margin: 6px 0;">
        <div style="display: flex; justify-content: space-between;"><span>Subtotal:</span> <span>R$ ${subtotalCarrinho.toFixed(2)}</span></div>
        <div style="display: flex; justify-content: space-between;"><span>Desconto:</span> <span>- R$ ${desconto.toFixed(2)}</span></div>
        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 13px; margin-top: 4px;"><span>TOTAL:</span> <span>R$ ${totalPagar.toFixed(2)}</span></div>
        <p style="text-align: center; font-size: 9px; margin-top: 12px;">Obrigado pela preferência!</p>
      </div>
    `;

    try {
      await onRegisterVenda({
        clienteId: clienteId || undefined,
        carrinho,
        desconto,
        formaPagamento,
        cupomHtml: cupomHtmlCompleto
      });

      // Show receipt modal and trigger print
      setVendaParaImprimir({
        venda: {
          id: idCurto,
          valor_total: totalPagar,
          desconto,
          forma_pagamento: formaPagamento
        },
        carrinho
      });

      // Clear POS state
      setCarrinho([]);
      setDesconto(0);
      setClienteId('');

      alert('Venda concluída com sucesso! Estoque e financeiro atualizados.');
    } catch (err: any) {
      alert('Erro ao registrar venda: ' + err.message);
    }
  };

  const handlePrintCupom = () => {
    window.print();
  };

  const handleExecutarSangria = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sangriaValor <= 0 || !sangriaMotivo.trim()) {
      alert('Informe o valor e a justificativa da sangria!');
      return;
    }

    if (!confirm(`Confirmar sangria de caixa de R$ ${sangriaValor.toFixed(2)}?`)) return;

    try {
      await onRegisterSangria(sangriaValor, sangriaMotivo);
      alert('Sangria realizada com sucesso e registrada nas despesas!');
      setSangriaValor(0);
      setSangriaMotivo('');
    } catch (err: any) {
      alert('Erro ao registrar sangria: ' + err.message);
    }
  };

  const filteredSearchProducts = produtos.filter((p) => {
    if (!searchTerm.trim()) return false;
    return (
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.codigo_barras && p.codigo_barras.includes(searchTerm))
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Vendas Concluídas (Hoje)
            </span>
            <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            R$ {totalVendasHoje.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Itens no Carrinho
            </span>
            <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl">
              <ShoppingCart className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
            {totalItensCarrinho} item(ns)
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Vendas Realizadas
            </span>
            <div className="p-3 bg-purple-500/10 text-purple-600 rounded-2xl">
              <History className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">
            {vendas.length} venda(s)
          </h3>
        </div>
      </div>

      {/* Sub-navigation */}
      <div className="flex gap-3">
        <button
          onClick={() => setSubAba('caixa')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
            subAba === 'caixa'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Frente de Caixa (Vender)</span>
        </button>

        <button
          onClick={() => setSubAba('sangria')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
            subAba === 'sangria'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
          }`}
        >
          <ArrowDownCircle className="w-4 h-4" />
          <span>Sangria / Caixa Diário</span>
        </button>

        <button
          onClick={() => setSubAba('historico')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
            subAba === 'historico'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Histórico de Vendas</span>
        </button>
      </div>

      {/* SUB-PAINEL 1: FRENTE DE CAIXA */}
      {subAba === 'caixa' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products & Cart Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search / Barcode Input */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-500" />
                <span>Bipar Código de Barras ou Pesquisar Produto</span>
              </h3>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && filteredSearchProducts[0]) {
                        handleAddProdutoToCarrinho(filteredSearchProducts[0]);
                      }
                    }}
                    placeholder="Digite o nome do produto ou bipar código..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  onClick={() => setIsScannerOpen(true)}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-4 rounded-xl font-bold text-xs flex items-center gap-2 transition"
                >
                  <Camera className="w-4 h-4" />
                  <span>Ler Câmera</span>
                </button>
              </div>

              {/* Instant Search Dropdown */}
              {filteredSearchProducts.length > 0 && (
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl max-h-48 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
                  {filteredSearchProducts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleAddProdutoToCarrinho(p)}
                      className="w-full text-left p-3 hover:bg-emerald-50 dark:hover:bg-slate-700/60 transition flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">{p.nome}</span>
                        <span className="text-slate-400 block">
                          Estoque: {p.quantidade_estoque} | EAN: {p.codigo_barras || '-'}
                        </span>
                      </div>
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                        R$ {p.preco_venda.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shopping Cart Table */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-emerald-500" />
                  <span>Itens no Carrinho</span>
                </span>
                <span className="text-xs font-mono font-bold text-emerald-600">
                  {carrinho.length} tipo(s) de item
                </span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      <th className="p-2">Item / Código</th>
                      <th className="p-2 text-center">Qtd</th>
                      <th className="p-2 text-right">Unitário</th>
                      <th className="p-2 text-right">Subtotal</th>
                      <th className="p-2 text-center">Ação</th>
                    </tr>
                  </thead>

                  <tbody className="text-xs divide-y divide-slate-100 dark:divide-slate-800">
                    {carrinho.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-400 font-bold">
                          Carrinho vazio. Bipe ou busque um produto para começar a venda.
                        </td>
                      </tr>
                    ) : (
                      carrinho.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="p-2">
                            <p className="font-bold text-slate-900 dark:text-white">{item.nome}</p>
                            <span className="text-[10px] font-mono text-slate-400">
                              {item.codigo_barras || 'Sem Cód'}
                            </span>
                          </td>

                          <td className="p-2">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => handleUpdateQty(item.id, -1)}
                                className="p-1 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded hover:bg-slate-300"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-bold text-sm px-2">
                                {item.quantidadeCarrinho}
                              </span>
                              <button
                                onClick={() => handleUpdateQty(item.id, 1)}
                                className="p-1 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded hover:bg-slate-300"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </td>

                          <td className="p-2 text-right font-medium text-slate-600 dark:text-slate-300">
                            R$ {item.preco_venda.toFixed(2)}
                          </td>

                          <td className="p-2 text-right font-bold text-slate-900 dark:text-white font-mono">
                            R$ {(item.preco_venda * item.quantidadeCarrinho).toFixed(2)}
                          </td>

                          <td className="p-2 text-center">
                            <button
                              onClick={() => handleRemoveFromCarrinho(item.id)}
                              className="p-1 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* POS Summary Sidebar */}
          <div className="space-y-4">
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 space-y-4 sticky top-24">
              <h3 className="font-extrabold text-base text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-3">
                <Calculator className="w-5 h-5" />
                <span>Fechamento da Venda</span>
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Cliente Vinculado (Opcional)
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={clienteId}
                    onChange={(e) => setClienteId(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-medium text-white outline-none"
                  >
                    <option value="">Consumidor Final (Não identificado)</option>
                    {entidades.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.nome_completo}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Desconto Total (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={desconto}
                  onChange={(e) => setDesconto(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Forma de Pagamento *
                </label>
                <select
                  value={formaPagamento}
                  onChange={(e) => setFormaPagamento(e.target.value as FormaPagamento)}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-extrabold text-emerald-400 outline-none"
                >
                  <option value="Dinheiro">Dinheiro (Espécie)</option>
                  <option value="PIX">PIX / QR Code</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Cartão de Débito">Cartão de Débito</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span>R$ {subtotalCarrinho.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-400">
                  <span>Desconto:</span>
                  <span>- R$ {desconto.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-dashed border-slate-700">
                  <span className="font-extrabold text-sm uppercase text-slate-200">
                    Total Final:
                  </span>
                  <span className="text-3xl font-black text-emerald-400">
                    R$ {totalPagar.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleFinalizarVenda}
                disabled={carrinho.length === 0}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-slate-950 font-black py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Confirmar & Emitir (F8)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-PAINEL 2: SANGRIA */}
      {subAba === 'sangria' && (
        <div className="space-y-6">
          <form
            onSubmit={handleExecutarSangria}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
          >
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <ArrowDownCircle className="w-5 h-5 text-red-500" />
              <span>Executar Sangria de Caixa (Retirada)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              A sangria registra a saída de dinheiro do gaveteiro e lança automaticamente uma despesa finalizada no controle financeiro.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Valor da Retirada (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={sangriaValor}
                  onChange={(e) => setSangriaValor(Number(e.target.value))}
                  placeholder="100.00"
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-red-600 outline-none"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Justificativa / Motivo *
                </label>
                <input
                  type="text"
                  value={sangriaMotivo}
                  onChange={(e) => setSangriaMotivo(e.target.value)}
                  placeholder="Ex: Sangria para depósito no banco ou troco excedente"
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium outline-none text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-red-600/20 transition flex items-center justify-center gap-2 text-sm"
            >
              <ArrowDownCircle className="w-4 h-4" />
              <span>Confirmar Sangria de Caixa</span>
            </button>
          </form>
        </div>
      )}

      {/* SUB-PAINEL 3: HISTÓRICO DE VENDAS */}
      {subAba === 'historico' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-500" />
            <span>Histórico Geral de Vendas Realizadas</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="p-3">ID / Data</th>
                  <th className="p-3">Pagamento</th>
                  <th className="p-3 text-right">Desconto</th>
                  <th className="p-3 text-right">Total</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>

              <tbody className="text-xs divide-y divide-slate-100 dark:divide-slate-800">
                {vendas.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400 font-bold">
                      Nenhuma venda registrada até o momento.
                    </td>
                  </tr>
                ) : (
                  vendas.map((v) => {
                    const dataFmt = v.created_at
                      ? new Date(v.created_at).toLocaleString('pt-BR')
                      : '-';
                    const idCurto = (v.id || '').substring(0, 8).toUpperCase();

                    return (
                      <tr key={v.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-3 font-mono">
                          <span className="font-bold text-slate-900 dark:text-white">
                            #{idCurto}
                          </span>
                          <span className="block text-[10px] text-slate-400 font-sans">
                            {dataFmt}
                          </span>
                        </td>

                        <td className="p-3 font-bold text-slate-700 dark:text-slate-300">
                          {v.forma_pagamento}
                        </td>

                        <td className="p-3 text-right font-medium text-red-500">
                          R$ {v.desconto.toFixed(2)}
                        </td>

                        <td className="p-3 text-right font-extrabold text-emerald-600 dark:text-emerald-400 text-sm font-mono">
                          R$ {v.valor_total.toFixed(2)}
                        </td>

                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => {
                                setVendaParaImprimir({
                                  venda: v,
                                  carrinho: []
                                });
                                setTimeout(() => window.print(), 300);
                              }}
                              className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-bold transition flex items-center gap-1"
                              title="Reimprimir 2ª via do cupom"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>2ª Via</span>
                            </button>

                            <button
                              onClick={() => {
                                setConfirmTexto('');
                                setVendaParaExcluir(v);
                              }}

                              className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition"
                              title="Excluir Venda"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
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
        onScan={handleBarcodeScanned}
      />

      {/* Printable Receipt Window Modal */}
      {vendaParaImprimir && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl relative">
            <button
              onClick={() => setVendaParaImprimir(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <ThermalReceipt
              venda={vendaParaImprimir.venda}
              carrinho={vendaParaImprimir.carrinho}
            />

            <div className="flex gap-2 pt-2">
              <button
                onClick={handlePrintCupom}
                className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition flex items-center justify-center gap-2 text-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Cupom</span>
              </button>
              <button
                onClick={() => setVendaParaImprimir(null)}
                className="px-4 bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs hover:bg-slate-300"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmação de exclusão de venda */}
      {vendaParaExcluir && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-red-600 dark:text-red-400">
              Estornar / Excluir venda #{vendaParaExcluir.id.substring(0, 8).toUpperCase()}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Esta ação é irreversível. O estoque dos produtos será devolvido e o lançamento
              financeiro da venda (receita e parcela) será excluído automaticamente.
            </p>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Para confirmar, digite <span className="text-red-500">EXCLUIR</span> abaixo:
            </p>
            <input
              autoFocus
              value={confirmTexto}
              onChange={(e) => setConfirmTexto(e.target.value)}
              placeholder="EXCLUIR"
              className="w-full p-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-bold tracking-wider outline-none focus:border-red-500"
            />
            <div className="flex gap-2 pt-1">
              <button
                disabled={confirmTexto.trim().toUpperCase() !== 'EXCLUIR' || excluindo}
                onClick={async () => {
                  setExcluindo(true);
                  try {
                    await onDeleteVenda(vendaParaExcluir.id);
                    setVendaParaExcluir(null);
                    setConfirmTexto('');
                  } finally {
                    setExcluindo(false);
                  }
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-xs transition"
              >
                {excluindo ? 'Excluindo...' : 'Confirmar exclusão'}
              </button>
              <button
                onClick={() => {
                  setVendaParaExcluir(null);
                  setConfirmTexto('');
                }}
                className="px-4 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold py-3 rounded-xl text-xs hover:bg-slate-300 dark:hover:bg-slate-700"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
