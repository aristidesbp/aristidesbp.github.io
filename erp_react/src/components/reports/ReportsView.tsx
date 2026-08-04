import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  formatCurrency,
  formatDateTimeBR,
  formatDateBR,
  formatSiteOrderCode,
  formatTimestampFilename,
} from '../../lib/sanitizer';
import { Sale, Finance, EcommerceOrder, PaymentMethod } from '../../types';
import { ReceiptModal } from '../common/ReceiptModal';
import {
  FileText,
  Calendar,
  Filter,
  Download,
  Printer,
  TrendingUp,
  DollarSign,
  Package,
  Layers,
  CreditCard,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  PieChart,
  ShoppingBag,
  CheckCircle,
  Truck,
  Zap,
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { sales, finances, ecommerceOrders, products, storeConfig } = useApp();

  // Filters state
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeReportTab, setActiveReportTab] = useState<
    'statement' | 'categories' | 'top_products' | 'payments' | 'inventory'
  >('statement');

  // Selected Sale for Receipt Modal
  const [selectedSaleForReceipt, setSelectedSaleForReceipt] = useState<Sale | null>(null);

  // Categories list extracted from products
  const categoriesList = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.categoria || 'Geral'))).sort();
    return cats;
  }, [products]);

  // Quick Preset Handlers
  const handlePreset = (type: 'today' | '7days' | 'month' | '30days' | 'year' | 'all') => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    if (type === 'today') {
      setStartDate(todayStr);
      setEndDate(todayStr);
    } else if (type === '7days') {
      const past = new Date();
      past.setDate(past.getDate() - 7);
      setStartDate(past.toISOString().split('T')[0]);
      setEndDate(todayStr);
    } else if (type === 'month') {
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
      setStartDate(firstDay);
      setEndDate(todayStr);
    } else if (type === '30days') {
      const past = new Date();
      past.setDate(past.getDate() - 30);
      setStartDate(past.toISOString().split('T')[0]);
      setEndDate(todayStr);
    } else if (type === 'year') {
      const firstDayYear = new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0];
      setStartDate(firstDayYear);
      setEndDate(todayStr);
    } else if (type === 'all') {
      setStartDate('');
      setEndDate('');
    }
  };

  // Date filtering helper
  const isDateInRange = (dateIsoStr?: string | null) => {
    if (!dateIsoStr) return true;
    const itemDate = new Date(dateIsoStr);
    if (isNaN(itemDate.getTime())) return true;

    if (startDate) {
      const start = new Date(`${startDate}T00:00:00`);
      if (itemDate < start) return false;
    }

    if (endDate) {
      const end = new Date(`${endDate}T23:59:59`);
      if (itemDate > end) return false;
    }

    return true;
  };

  // Category filter helper on Sales
  const saleMatchesCategory = (sale: Sale) => {
    if (selectedCategory === 'all') return true;
    if (!sale.itens || sale.itens.length === 0) return false;
    return sale.itens.some((item) => {
      const prod = products.find((p) => p.id === item.produto_id || p.nome === item.produto_nome);
      const cat = prod ? prod.categoria : 'Geral';
      return cat.toLowerCase() === selectedCategory.toLowerCase();
    });
  };

  // Filtered Sales
  const filteredSales = useMemo(() => {
    return sales.filter((s) => {
      if (!isDateInRange(s.created_at)) return false;
      if (!saleMatchesCategory(s)) return false;

      if (selectedPaymentMethod !== 'all') {
        if (selectedPaymentMethod === 'Mercado Pago') {
          if (!s.forma_pagamento.startsWith('Mercado Pago')) return false;
        } else if (s.forma_pagamento !== selectedPaymentMethod) {
          return false;
        }
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const idMatch = s.id.toLowerCase().includes(query);
        const codeMatch = formatSiteOrderCode(s.id).toLowerCase().includes(query);
        const customerMatch = (s.entidade_nome || '').toLowerCase().includes(query);
        const itemMatch = (s.itens || []).some((i) => i.produto_nome.toLowerCase().includes(query));
        if (!idMatch && !codeMatch && !customerMatch && !itemMatch) return false;
      }

      return true;
    });
  }, [sales, startDate, endDate, selectedCategory, selectedPaymentMethod, searchQuery, products]);

  // Filtered E-Commerce Orders
  const filteredEcommerceOrders = useMemo(() => {
    return ecommerceOrders.filter((ord) => {
      if (!isDateInRange(ord.created_at)) return false;

      if (selectedCategory !== 'all') {
        const hasCat = ord.itens.some((it) => (it.product.categoria || 'Geral').toLowerCase() === selectedCategory.toLowerCase());
        if (!hasCat) return false;
      }

      if (selectedPaymentMethod !== 'all') {
        if (selectedPaymentMethod === 'Mercado Pago') {
          if (!ord.forma_pagamento.startsWith('Mercado Pago')) return false;
        } else if (ord.forma_pagamento !== selectedPaymentMethod) {
          return false;
        }
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const idMatch = ord.id.toLowerCase().includes(query);
        const codeMatch = formatSiteOrderCode(ord.id).toLowerCase().includes(query);
        const nameMatch = ord.cliente_nome.toLowerCase().includes(query);
        if (!idMatch && !codeMatch && !nameMatch) return false;
      }

      return true;
    });
  }, [ecommerceOrders, startDate, endDate, selectedCategory, selectedPaymentMethod, searchQuery]);

  // Filtered Financial Entries & Exits
  const filteredFinances = useMemo(() => {
    return finances.filter((f) => {
      if (!isDateInRange(f.created_at)) return false;
      if (selectedCategory !== 'all' && f.categoria.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const descMatch = f.descricao.toLowerCase().includes(query);
        const catMatch = f.categoria.toLowerCase().includes(query);
        if (!descMatch && !catMatch) return false;
      }
      return true;
    });
  }, [finances, startDate, endDate, selectedCategory, searchQuery]);

  // Combined Unified Extrato Entries
  const unifiedStatementList = useMemo(() => {
    const list: Array<{
      id: string;
      code: string;
      date: string;
      type: 'venda_pdv' | 'delivery' | 'entrada_financeira' | 'saida_financeira';
      description: string;
      category: string;
      paymentMethod: string;
      amount: number;
      isPositive: boolean;
      originalItem: any;
    }> = [];

    filteredSales.forEach((s) => {
      list.push({
        id: s.id,
        code: formatSiteOrderCode(s.id),
        date: s.created_at,
        type: 'venda_pdv',
        description: `Venda PDV - ${s.entidade_nome || 'Consumidor Final'} (${s.itens?.length || 0} itens)`,
        category: s.itens?.[0] ? (products.find((p) => p.nome === s.itens[0].produto_nome)?.categoria || 'Geral') : 'Geral',
        paymentMethod: s.forma_pagamento,
        amount: s.valor_liquido,
        isPositive: true,
        originalItem: s,
      });
    });

    filteredEcommerceOrders.forEach((ord) => {
      list.push({
        id: ord.id,
        code: formatSiteOrderCode(ord.id),
        date: ord.created_at,
        type: 'delivery',
        description: `Pedido Delivery - ${ord.cliente_nome} (${ord.status})`,
        category: ord.itens?.[0]?.product.categoria || 'Geral',
        paymentMethod: ord.forma_pagamento,
        amount: ord.total,
        isPositive: true,
        originalItem: ord,
      });
    });

    filteredFinances.forEach((f) => {
      list.push({
        id: f.id,
        code: f.id.slice(-8).toUpperCase(),
        date: f.created_at || new Date().toISOString(),
        type: f.tipo === 'receita' ? 'entrada_financeira' : 'saida_financeira',
        description: f.descricao,
        category: f.categoria,
        paymentMethod: 'Caixa / Conta',
        amount: f.valor_total,
        isPositive: f.tipo === 'receita',
        originalItem: f,
      });
    });

    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [filteredSales, filteredEcommerceOrders, filteredFinances, products]);

  // Summaries Calculations
  const totalGrossSales = useMemo(() => {
    const pdvTotal = filteredSales.reduce((acc, s) => acc + s.valor_liquido, 0);
    const deliveryTotal = filteredEcommerceOrders.reduce((acc, o) => acc + o.total, 0);
    return pdvTotal + deliveryTotal;
  }, [filteredSales, filteredEcommerceOrders]);

  const totalSalesCount = filteredSales.length + filteredEcommerceOrders.length;

  const averageTicket = totalSalesCount > 0 ? totalGrossSales / totalSalesCount : 0;

  const totalFinancialInflow = useMemo(() => {
    return filteredFinances.filter((f) => f.tipo === 'receita').reduce((acc, f) => acc + f.valor_total, 0);
  }, [filteredFinances]);

  const totalFinancialOutflow = useMemo(() => {
    return filteredFinances.filter((f) => f.tipo === 'despesa').reduce((acc, f) => acc + f.valor_total, 0);
  }, [filteredFinances]);

  const netStatementBalance = totalGrossSales + totalFinancialInflow - totalFinancialOutflow;

  // Category Breakdown Aggregation
  const categoryBreakdown = useMemo(() => {
    const map: Record<string, { totalRevenue: number; totalQuantity: number; count: number }> = {};

    filteredSales.forEach((s) => {
      (s.itens || []).forEach((item) => {
        const prod = products.find((p) => p.id === item.produto_id || p.nome === item.produto_nome);
        const cat = prod ? prod.categoria || 'Geral' : 'Geral';
        if (!map[cat]) {
          map[cat] = { totalRevenue: 0, totalQuantity: 0, count: 0 };
        }
        map[cat].totalRevenue += item.subtotal;
        map[cat].totalQuantity += item.quantidade;
        map[cat].count += 1;
      });
    });

    filteredEcommerceOrders.forEach((ord) => {
      ord.itens.forEach((it) => {
        const cat = it.product.categoria || 'Geral';
        if (!map[cat]) {
          map[cat] = { totalRevenue: 0, totalQuantity: 0, count: 0 };
        }
        map[cat].totalRevenue += it.quantity * it.product.preco_venda;
        map[cat].totalQuantity += it.quantity;
        map[cat].count += 1;
      });
    });

    return Object.entries(map)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.totalRevenue - a.totalRevenue);
  }, [filteredSales, filteredEcommerceOrders, products]);

  // Top Products Sold Ranking
  const topProductsRanking = useMemo(() => {
    const map: Record<
      string,
      { id: string; name: string; category: string; quantity: number; revenue: number; stock: number }
    > = {};

    filteredSales.forEach((s) => {
      (s.itens || []).forEach((item) => {
        const prod = products.find((p) => p.id === item.produto_id || p.nome === item.produto_nome);
        const key = prod ? prod.id : item.produto_nome;
        if (!map[key]) {
          map[key] = {
            id: key,
            name: item.produto_nome,
            category: prod ? prod.categoria || 'Geral' : 'Geral',
            quantity: 0,
            revenue: 0,
            stock: prod ? prod.quantidade_estoque : 0,
          };
        }
        map[key].quantity += item.quantidade;
        map[key].revenue += item.subtotal;
      });
    });

    filteredEcommerceOrders.forEach((ord) => {
      ord.itens.forEach((it) => {
        const key = it.product.id;
        if (!map[key]) {
          map[key] = {
            id: key,
            name: it.product.nome,
            category: it.product.categoria || 'Geral',
            quantity: 0,
            revenue: 0,
            stock: it.product.quantidade_estoque,
          };
        }
        map[key].quantity += it.quantity;
        map[key].revenue += it.quantity * it.product.preco_venda;
      });
    });

    return Object.values(map).sort((a, b) => b.revenue - a.revenue);
  }, [filteredSales, filteredEcommerceOrders, products]);

  // Payment Method Breakdown
  const paymentMethodBreakdown = useMemo(() => {
    const map: Record<string, { total: number; count: number }> = {};

    filteredSales.forEach((s) => {
      const method = s.forma_pagamento || 'Outro';
      if (!map[method]) map[method] = { total: 0, count: 0 };
      map[method].total += s.valor_liquido;
      map[method].count += 1;
    });

    filteredEcommerceOrders.forEach((ord) => {
      const method = ord.forma_pagamento || 'Outro';
      if (!map[method]) map[method] = { total: 0, count: 0 };
      map[method].total += ord.total;
      map[method].count += 1;
    });

    return Object.entries(map)
      .map(([method, data]) => ({ method, ...data }))
      .sort((a, b) => b.total - a.total);
  }, [filteredSales, filteredEcommerceOrders]);

  // Export CSV Handler
  const exportStatementCSV = () => {
    const timestampStr = formatTimestampFilename(new Date());
    const storeClean = (storeConfig.store_name || 'Supermercado_ABP').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `Extrato_${storeClean}_${timestampStr}.csv`;

    let csv = 'Data/Hora;Código SITE;Tipo;Descrição;Categoria;Forma Pagamento;Valor (R$)\n';
    unifiedStatementList.forEach((item) => {
      const amountStr = item.amount.toFixed(2).replace('.', ',');
      const formattedDate = formatDateTimeBR(item.date);
      csv += `"${formattedDate}";"${item.code}";"${item.type}";"${item.description}";"${item.category}";"${item.paymentMethod}";"${amountStr}"\n`;
    });

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Export TXT Summary Report Handler
  const exportSummaryTXT = () => {
    const timestampStr = formatTimestampFilename(new Date());
    const storeClean = (storeConfig.store_name || 'Supermercado_ABP').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `Relatorio_Vendas_${storeClean}_${timestampStr}.txt`;

    let content = `================================================
RELATÓRIO DE GESTÃO E EXTRATO CONSOLIDADO
${storeConfig.store_name.toUpperCase()}
CNPJ: ${storeConfig.cnpj}
GERADO EM: ${new Date().toLocaleString('pt-BR')}
================================================
PERÍODO FILTRADO: ${startDate ? formatDateBR(startDate) : 'Início'} até ${endDate ? formatDateBR(endDate) : 'Hoje'}
CATEGORIA: ${selectedCategory === 'all' ? 'Todas' : selectedCategory}
FORMA DE PAGAMENTO: ${selectedPaymentMethod === 'all' ? 'Todas' : selectedPaymentMethod}
================================================
RESUMO GERAL DO PERÍODO:
  - Faturamento Total (Vendas): ${formatCurrency(totalGrossSales)}
  - Total de Vendas / Pedidos: ${totalSalesCount}
  - Ticket Médio por Venda: ${formatCurrency(averageTicket)}
  - Entradas de Caixa Diretas: ${formatCurrency(totalFinancialInflow)}
  - Saídas / Despesas: ${formatCurrency(totalFinancialOutflow)}
  - Saldo Líquido Extrato: ${formatCurrency(netStatementBalance)}
================================================
DESEMPENHO POR FORMA DE PAGAMENTO:
`;

    paymentMethodBreakdown.forEach((pm) => {
      const pct = totalGrossSales > 0 ? ((pm.total / totalGrossSales) * 100).toFixed(1) : '0';
      content += `  - ${pm.method}: ${formatCurrency(pm.total)} (${pm.count} transações - ${pct}%)\n`;
    });

    content += `================================================
VENDAS POR CATEGORIA:
`;
    categoryBreakdown.forEach((cat) => {
      const pct = totalGrossSales > 0 ? ((cat.totalRevenue / totalGrossSales) * 100).toFixed(1) : '0';
      content += `  - ${cat.name}: ${formatCurrency(cat.totalRevenue)} (${cat.totalQuantity} itens - ${pct}%)\n`;
    });

    content += `================================================
TOP PRODUTOS MAIS VENDIDOS:
`;
    topProductsRanking.slice(0, 15).forEach((prod, index) => {
      content += `  ${index + 1}. ${prod.name} | Categ: ${prod.category} | Qtd: ${prod.quantity} | Total: ${formatCurrency(prod.revenue)}\n`;
    });

    content += `================================================
FIM DO RELATÓRIO
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Print Full Report
  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center font-bold shadow-sm">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 dark:text-white text-xl">
              Relatórios e Extratos de Gestão
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Controle avançado de faturamento, vendas por categoria, extrato consolidado e comprovantes
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={exportStatementCSV}
            className="flex-1 md:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition shadow-md shadow-emerald-600/20"
          >
            <Download className="w-4 h-4" />
            <span>Exportar CSV</span>
          </button>
          <button
            onClick={exportSummaryTXT}
            className="flex-1 md:flex-initial bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-4 py-2.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition shadow-sm"
          >
            <FileText className="w-4 h-4" />
            <span>Relatório TXT</span>
          </button>
          <button
            onClick={handlePrintReport}
            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold px-3.5 py-2.5 rounded-2xl text-xs flex items-center justify-center gap-1.5 transition"
            title="Imprimir Tela / PDF"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Imprimir</span>
          </button>
        </div>
      </div>

      {/* Filters Control Panel */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <Filter className="w-4 h-4 text-emerald-600" />
            <span>Filtros Globais de Pesquisa</span>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-bold mr-1 text-[11px] hidden sm:inline">Atalhos:</span>
            <button
              onClick={() => handlePreset('today')}
              className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 text-slate-600 dark:text-slate-300 font-bold text-[11px] transition"
            >
              Hoje
            </button>
            <button
              onClick={() => handlePreset('7days')}
              className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 text-slate-600 dark:text-slate-300 font-bold text-[11px] transition"
            >
              7 dias
            </button>
            <button
              onClick={() => handlePreset('month')}
              className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 text-slate-600 dark:text-slate-300 font-bold text-[11px] transition"
            >
              Mês Atual
            </button>
            <button
              onClick={() => handlePreset('30days')}
              className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 text-slate-600 dark:text-slate-300 font-bold text-[11px] transition"
            >
              30 dias
            </button>
            <button
              onClick={() => handlePreset('all')}
              className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 text-slate-600 dark:text-slate-300 font-bold text-[11px] transition"
            >
              Tudo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Date Start */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Data Inicial (De)</label>
            <div className="relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Date End */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Data Final (Até)</label>
            <div className="relative">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Categoria de Produto</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Todas as Categorias</option>
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Forma de Pagamento</label>
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Todas as Formas</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="PIX">PIX</option>
              <option value="Mercado Pago">Mercado Pago (Todos)</option>
              <option value="Mercado Pago PIX">Mercado Pago PIX</option>
              <option value="Mercado Pago Cartão">Mercado Pago Cartão</option>
              <option value="Mercado Pago Boleto">Mercado Pago Boleto</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
              <option value="Cartão de Débito">Cartão de Débito</option>
              <option value="Fiado">Fiado</option>
            </select>
          </div>

          {/* Search Text */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Busca Rápida</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cliente, ID SITE-..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* KPI Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Faturamento */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold mb-3">
            <DollarSign className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Faturamento Total</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {formatCurrency(totalGrossSales)}
          </h3>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1 font-medium">
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-500" />
            <span>{totalSalesCount} vendas/pedidos registrados</span>
          </p>
        </div>

        {/* Saldo de Extrato */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold mb-3">
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saldo Extrato (Caixa)</p>
          <h3
            className={`text-2xl font-black mt-1 ${
              netStatementBalance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600'
            }`}
          >
            {formatCurrency(netStatementBalance)}
          </h3>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
            <span>Entradas vs Saídas no período</span>
          </p>
        </div>

        {/* Ticket Médio */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold mb-3">
            <PieChart className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ticket Médio por Venda</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {formatCurrency(averageTicket)}
          </h3>
          <p className="text-[11px] text-slate-500 mt-2 font-medium">Média calculada sobre {totalSalesCount} pedidos</p>
        </div>

        {/* Categoria Dominante */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold mb-3">
            <Layers className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Categoria</p>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 truncate">
            {categoryBreakdown[0]?.name || 'N/A'}
          </h3>
          <p className="text-[11px] text-slate-500 mt-2 font-medium">
            {categoryBreakdown[0] ? formatCurrency(categoryBreakdown[0].totalRevenue) : 'R$ 0,00'}
          </p>
        </div>
      </div>

      {/* Report Sub-Tabs Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveReportTab('statement')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition shrink-0 ${
            activeReportTab === 'statement'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Extrato Geral & Transações ({unifiedStatementList.length})</span>
        </button>

        <button
          onClick={() => setActiveReportTab('categories')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition shrink-0 ${
            activeReportTab === 'categories'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Vendas por Categoria ({categoryBreakdown.length})</span>
        </button>

        <button
          onClick={() => setActiveReportTab('top_products')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition shrink-0 ${
            activeReportTab === 'top_products'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Produtos Mais Vendidos ({topProductsRanking.length})</span>
        </button>

        <button
          onClick={() => setActiveReportTab('payments')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition shrink-0 ${
            activeReportTab === 'payments'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Formas de Pagamento ({paymentMethodBreakdown.length})</span>
        </button>
      </div>

      {/* Sub-Tab 1: Unified Statement Table */}
      {activeReportTab === 'statement' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <span className="font-extrabold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Extrato Consolidado ({unifiedStatementList.length} registros no período)
            </span>
            <span className="text-xs text-slate-400">Clique para ver comprovantes com SITE-#</span>
          </div>

          {unifiedStatementList.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <FileText className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700" />
              <p className="font-bold text-sm">Nenhuma transação encontrada para os filtros selecionados.</p>
              <p className="text-xs">Tente ampliar as datas ou limpar a busca.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-950/50">
                    <th className="p-3.5 pl-6">Data / Hora</th>
                    <th className="p-3.5">Código (SITE-#)</th>
                    <th className="p-3.5">Origem / Tipo</th>
                    <th className="p-3.5">Descrição / Cliente</th>
                    <th className="p-3.5">Forma Pagto</th>
                    <th className="p-3.5 text-right">Valor (R$)</th>
                    <th className="p-3.5 text-center pr-6">Ação / Cupom</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                  {unifiedStatementList.map((item) => (
                    <tr
                      key={item.id + item.type}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                    >
                      <td className="p-3.5 pl-6 font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {formatDateTimeBR(item.date)}
                      </td>
                      <td className="p-3.5 font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                        {item.code}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        {item.type === 'venda_pdv' && (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold flex items-center gap-1 w-fit">
                            <ShoppingBag className="w-3 h-3" /> Venda PDV
                          </span>
                        )}
                        {item.type === 'delivery' && (
                          <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold flex items-center gap-1 w-fit">
                            <Truck className="w-3 h-3" /> Delivery
                          </span>
                        )}
                        {item.type === 'entrada_financeira' && (
                          <span className="px-2.5 py-1 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-[10px] font-extrabold flex items-center gap-1 w-fit">
                            <ArrowUpRight className="w-3 h-3" /> Entrada
                          </span>
                        )}
                        {item.type === 'saida_financeira' && (
                          <span className="px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-[10px] font-extrabold flex items-center gap-1 w-fit">
                            <ArrowDownRight className="w-3 h-3" /> Saída/Sangria
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white max-w-xs truncate">
                        {item.description}
                      </td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-300 font-medium">
                        <span className="flex items-center gap-1">
                          {item.paymentMethod.startsWith('Mercado Pago') && (
                            <Zap className="w-3 h-3 text-amber-500" />
                          )}
                          {item.paymentMethod}
                        </span>
                      </td>
                      <td
                        className={`p-3.5 text-right font-black whitespace-nowrap ${
                          item.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600'
                        }`}
                      >
                        {item.isPositive ? '+' : '-'} {formatCurrency(item.amount)}
                      </td>
                      <td className="p-3.5 text-center pr-6">
                        {item.type === 'venda_pdv' && (
                          <button
                            onClick={() => setSelectedSaleForReceipt(item.originalItem as Sale)}
                            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-600 dark:text-slate-300 transition"
                            title="Ver / Baixar Comprovante"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Sub-Tab 2: Sales by Category */}
      {activeReportTab === 'categories' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Faturamento por Categoria do Supermercado
              </h3>
              <p className="text-xs text-slate-400">Distribuição do volume de vendas e faturamento bruto</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              {categoryBreakdown.length} categorias
            </span>
          </div>

          <div className="space-y-4">
            {categoryBreakdown.map((cat) => {
              const pct = totalGrossSales > 0 ? (cat.totalRevenue / totalGrossSales) * 100 : 0;
              return (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-emerald-600" />
                      {cat.name}
                    </span>
                    <span className="text-slate-600 dark:text-slate-300">
                      {formatCurrency(cat.totalRevenue)} ({pct.toFixed(1)}%)
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden flex">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, pct)}%` }}
                    />
                  </div>

                  <p className="text-[10px] text-slate-400">
                    {cat.totalQuantity} unidades vendidas em {cat.count} registros
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Top Products Sold */}
      {activeReportTab === 'top_products' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Ranking de Produtos Mais Vendidos
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-950/50">
                  <th className="p-3.5 pl-6"># Posição</th>
                  <th className="p-3.5">Produto</th>
                  <th className="p-3.5">Categoria</th>
                  <th className="p-3.5 text-center">Qtd Vendida</th>
                  <th className="p-3.5 text-right">Faturamento Total</th>
                  <th className="p-3.5 text-center pr-6">Estoque Atual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {topProductsRanking.map((prod, idx) => (
                  <tr key={prod.id + idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="p-3.5 pl-6 font-black text-slate-400">#{idx + 1}</td>
                    <td className="p-3.5 font-extrabold text-slate-900 dark:text-white">{prod.name}</td>
                    <td className="p-3.5 text-slate-500 font-medium">{prod.category}</td>
                    <td className="p-3.5 text-center font-bold text-slate-800 dark:text-slate-200">
                      {prod.quantity}
                    </td>
                    <td className="p-3.5 text-right font-black text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(prod.revenue)}
                    </td>
                    <td className="p-3.5 text-center pr-6">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          prod.stock <= 5
                            ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {prod.stock} un
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Payment Methods Performance */}
      {activeReportTab === 'payments' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Desempenho por Meio de Pagamento
            </h3>
            <p className="text-xs text-slate-400">Participação de cada método no volume financeiro total</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paymentMethodBreakdown.map((pm) => {
              const pct = totalGrossSales > 0 ? (pm.total / totalGrossSales) * 100 : 0;
              return (
                <div
                  key={pm.method}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      {pm.method.startsWith('Mercado Pago') && <Zap className="w-4 h-4 text-amber-500" />}
                      {pm.method}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                      {pct.toFixed(1)}%
                    </span>
                  </div>

                  <p className="text-xl font-black text-slate-900 dark:text-white">
                    {formatCurrency(pm.total)}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">{pm.count} vendas efetuadas</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Receipt Modal Popup */}
      {selectedSaleForReceipt && (
        <ReceiptModal
          sale={selectedSaleForReceipt}
          storeConfig={storeConfig}
          isOpen={!!selectedSaleForReceipt}
          onClose={() => setSelectedSaleForReceipt(null)}
        />
      )}
    </div>
  );
};
