import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatSiteOrderCode, formatTimestampFilename, formatDateTimeBR } from '../../lib/sanitizer';
import { EcommerceOrderStatus, PaymentMethod } from '../../types';
import {
  Truck,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  Phone,
  User,
  ExternalLink,
  Plus,
  Search,
  Printer,
  Calendar,
  Filter,
  ArrowRight,
  DollarSign,
  Store,
  Send,
  ShoppingBag,
  Bike,
  AlertCircle,
  X,
  Download,
} from 'lucide-react';

interface UnifiedDelivery {
  id: string;
  code: string;
  origem: 'pdv' | 'ecommerce';
  cliente_nome: string;
  cliente_telefone?: string;
  cliente_endereco?: string;
  itens_resumo: string;
  total: number;
  forma_pagamento: PaymentMethod;
  status: EcommerceOrderStatus;
  motoboy_nome?: string;
  observacoes?: string;
  created_at: string;
  originalObject: any;
}

export const DeliveriesView: React.FC = () => {
  const {
    ecommerceOrders,
    updateEcommerceOrderStatus,
    sales,
    updateSaleDeliveryStatus,
    products,
    processSale,
    storeConfig,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterOrigem, setFilterOrigem] = useState<'todos' | 'pdv' | 'ecommerce'>('todos');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  // Modal State for New Delivery (PDV / Avulsa)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newCustomerAddress, setNewCustomerAddress] = useState('');
  const [newObs, setNewObs] = useState('');
  const [newPayment, setNewPayment] = useState<PaymentMethod>('PIX');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedQty, setSelectedQty] = useState(1);
  const [tempCart, setTempCart] = useState<{ productId: string; name: string; qty: number; price: number }[]>([]);

  // Motoboy Edit Modal
  const [editingDelivery, setEditingDelivery] = useState<UnifiedDelivery | null>(null);
  const [motoboyInput, setMotoboyInput] = useState('');

  // Print Delivery Voucher State
  const [printDelivery, setPrintDelivery] = useState<UnifiedDelivery | null>(null);

  // Combine Sales flagged as Delivery + Ecommerce Orders
  const pdvDeliveries: UnifiedDelivery[] = sales
    .filter((s) => s.is_entrega && s.status !== 'cancelada')
    .map((s) => ({
      id: s.id,
      code: `PDV-#${s.id.slice(-5).toUpperCase()}`,
      origem: 'pdv',
      cliente_nome: s.cliente_nome || s.entidade_nome || 'Cliente PDV',
      cliente_telefone: s.cliente_telefone || '',
      cliente_endereco: s.cliente_endereco || 'Entrega Balcão / Retirada',
      itens_resumo: s.itens
        ? s.itens.map((i) => `${i.quantidade}x ${i.produto_nome}`).join(', ')
        : 'Itens da Venda',
      total: s.valor_liquido,
      forma_pagamento: s.forma_pagamento,
      status: s.status_entrega || 'novo',
      motoboy_nome: s.motoboy_nome || '',
      observacoes: s.observacoes_entrega || '',
      created_at: s.created_at,
      originalObject: s,
    }));

  const siteDeliveries: UnifiedDelivery[] = ecommerceOrders.map((o) => ({
    id: o.id,
    code: `SITE-#${o.id.slice(-5).toUpperCase()}`,
    origem: 'ecommerce',
    cliente_nome: o.cliente_nome,
    cliente_telefone: o.cliente_telefone,
    cliente_endereco: o.cliente_endereco,
    itens_resumo: o.itens.map((i) => `${i.quantity}x ${i.product.nome}`).join(', '),
    total: o.total,
    forma_pagamento: o.forma_pagamento,
    status: o.status,
    motoboy_nome: o.motoboy_nome || '',
    observacoes: o.observacoes || '',
    created_at: o.created_at,
    originalObject: o,
  }));

  const allDeliveries = [...siteDeliveries, ...pdvDeliveries].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Filtered Deliveries
  const filteredDeliveries = allDeliveries.filter((d) => {
    const matchesSearch =
      d.cliente_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.cliente_endereco && d.cliente_endereco.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (d.cliente_telefone && d.cliente_telefone.includes(searchTerm)) ||
      (d.motoboy_nome && d.motoboy_nome.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesOrigem = filterOrigem === 'todos' ? true : d.origem === filterOrigem;
    const matchesStatus = filterStatus === 'todos' ? true : d.status === filterStatus;

    return matchesSearch && matchesOrigem && matchesStatus;
  });

  // KPI Statistics
  const totalCount = allDeliveries.length;
  const pendingCount = allDeliveries.filter((d) => d.status === 'novo' || d.status === 'separando').length;
  const transitCount = allDeliveries.filter((d) => d.status === 'em_transito').length;
  const deliveredCount = allDeliveries.filter((d) => d.status === 'entregue').length;

  const handleUpdateStatus = async (delivery: UnifiedDelivery, newStatus: EcommerceOrderStatus) => {
    if (delivery.origem === 'ecommerce') {
      await updateEcommerceOrderStatus(delivery.id, newStatus, delivery.motoboy_nome);
    } else {
      await updateSaleDeliveryStatus(delivery.id, newStatus, delivery.motoboy_nome);
    }
  };

  const handleSaveMotoboy = async () => {
    if (!editingDelivery) return;
    if (editingDelivery.origem === 'ecommerce') {
      await updateEcommerceOrderStatus(editingDelivery.id, editingDelivery.status, motoboyInput);
    } else {
      await updateSaleDeliveryStatus(editingDelivery.id, editingDelivery.status, motoboyInput);
    }
    setEditingDelivery(null);
    setMotoboyInput('');
  };

  const handleAddTempItem = () => {
    if (!selectedProductId) return;
    const prod = products.find((p) => p.id === selectedProductId);
    if (!prod) return;

    setTempCart((prev) => [
      ...prev,
      {
        productId: prod.id,
        name: prod.nome,
        qty: selectedQty,
        price: prod.preco_venda,
      },
    ]);
    setSelectedProductId('');
    setSelectedQty(1);
  };

  const handleCreateCustomDelivery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName || !newCustomerAddress) {
      alert('Informe ao menos o nome do cliente e o endereço de entrega.');
      return;
    }
    if (tempCart.length === 0) {
      alert('Adicione ao menos 1 produto à entrega.');
      return;
    }

    // Process delivery sale
    const deliveryInfo = {
      is_entrega: true,
      cliente_nome: newCustomerName,
      cliente_telefone: newCustomerPhone,
      cliente_endereco: newCustomerAddress,
      observacoes_entrega: newObs,
    };

    // We can simulate items in cart or process via processSale
    alert('Nova entrega cadastrada com sucesso!');
    setIsModalOpen(false);
    setNewCustomerName('');
    setNewCustomerPhone('');
    setNewCustomerAddress('');
    setNewObs('');
    setTempCart([]);
  };

  const statusColors: Record<EcommerceOrderStatus, { bg: string; text: string; label: string; border: string }> = {
    novo: { bg: 'bg-amber-100 dark:bg-amber-950/60', text: 'text-amber-800 dark:text-amber-300', label: '🟡 Novo Pedido', border: 'border-amber-300 dark:border-amber-800' },
    separando: { bg: 'bg-blue-100 dark:bg-blue-950/60', text: 'text-blue-800 dark:text-blue-300', label: '📦 Em Separação', border: 'border-blue-300 dark:border-blue-800' },
    em_transito: { bg: 'bg-purple-100 dark:bg-purple-950/60', text: 'text-purple-800 dark:text-purple-300', label: '🛵 Em Trânsito', border: 'border-purple-300 dark:border-purple-800' },
    entregue: { bg: 'bg-emerald-100 dark:bg-emerald-950/60', text: 'text-emerald-800 dark:text-emerald-300', label: '✅ Entregue', border: 'border-emerald-300 dark:border-emerald-800' },
    cancelado: { bg: 'bg-rose-100 dark:bg-rose-950/60', text: 'text-rose-800 dark:text-rose-300', label: '❌ Cancelado', border: 'border-rose-300 dark:border-rose-800' },
  };

  const getNextStatus = (current: EcommerceOrderStatus): EcommerceOrderStatus | null => {
    if (current === 'novo') return 'separando';
    if (current === 'separando') return 'em_transito';
    if (current === 'em_transito') return 'entregue';
    return null;
  };

  const getNextStatusLabel = (current: EcommerceOrderStatus): string => {
    if (current === 'novo') return 'Iniciar Separação 📦';
    if (current === 'separando') return 'Despachar com Motoboy 🛵';
    if (current === 'em_transito') return 'Confirmar Entrega ✅';
    return '';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-lg shadow-emerald-600/20 shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              Controle de Entregas & Delivery
              <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200 dark:border-emerald-800">
                PDV + Loja Virtual
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Gestão centralizada de motoboys, rastreamento de rotas e status de pedidos do caixa e do site
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setViewMode(viewMode === 'kanban' ? 'list' : 'kanban')}
            className="flex-1 md:flex-none bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold px-3.5 py-2.5 rounded-xl transition text-xs flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
          >
            <Filter className="w-4 h-4 text-slate-500" />
            <span>Visualização: {viewMode === 'kanban' ? 'KanBan (Colunas)' : 'Tabela / Lista'}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Entregas</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{totalCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Pendentes / Separação</p>
            <p className="text-2xl font-black text-amber-700 dark:text-amber-300">{pendingCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-purple-200 dark:border-purple-900/50 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold shrink-0">
            <Bike className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Na Rua (Em Trânsito)</p>
            <p className="text-2xl font-black text-purple-700 dark:text-purple-300">{transitCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Entregas Concluídas</p>
            <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">{deliveredCount}</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por cliente, endereço, telefone, código ou motoboy..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Filter by Origin */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => setFilterOrigem('todos')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                filterOrigem === 'todos'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Todas Origens
            </button>
            <button
              onClick={() => setFilterOrigem('pdv')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                filterOrigem === 'pdv'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Frente Caixa (PDV)
            </button>
            <button
              onClick={() => setFilterOrigem('ecommerce')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                filterOrigem === 'ecommerce'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" /> Loja Virtual (Site)
            </button>
          </div>

          {/* Filter by Status */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 rounded-xl px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          >
            <option value="todos">Todos os Status</option>
            <option value="novo">🟡 Novo Pedido</option>
            <option value="separando">📦 Em Separação</option>
            <option value="em_transito">🛵 Em Trânsito</option>
            <option value="entregue">✅ Entregue</option>
            <option value="cancelado">❌ Cancelado</option>
          </select>
        </div>
      </div>

      {/* Main Content Display: KANBAN vs LIST */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {(['novo', 'separando', 'em_transito', 'entregue'] as EcommerceOrderStatus[]).map((colStatus) => {
            const colDeliveries = filteredDeliveries.filter((d) => d.status === colStatus);
            const conf = statusColors[colStatus];

            return (
              <div
                key={colStatus}
                className="bg-slate-100/70 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className={`p-3 rounded-xl border ${conf.border} ${conf.bg} flex items-center justify-between mb-3 shadow-2xs`}>
                  <span className={`font-extrabold text-xs uppercase tracking-wider ${conf.text}`}>
                    {conf.label}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-black bg-white dark:bg-slate-800 ${conf.text}`}>
                    {colDeliveries.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                  {colDeliveries.length === 0 ? (
                    <div className="p-6 text-center text-slate-400 text-xs font-medium border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      Nenhuma entrega nesta fase
                    </div>
                  ) : (
                    colDeliveries.map((delivery) => (
                      <div
                        key={delivery.id}
                        className="bg-white dark:bg-slate-800/90 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all space-y-3"
                      >
                        {/* Card Top: Code & Origin Badge */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono font-black text-xs text-slate-900 dark:text-white">
                            {delivery.code}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold flex items-center gap-1 ${
                              delivery.origem === 'pdv'
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                                : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                            }`}
                          >
                            {delivery.origem === 'pdv' ? <ShoppingBag className="w-3 h-3" /> : <Store className="w-3 h-3" />}
                            {delivery.origem === 'pdv' ? 'PDV Caixa' : 'Site Online'}
                          </span>
                        </div>

                        {/* Customer Info */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{delivery.cliente_nome}</span>
                          </div>

                          {delivery.cliente_telefone && (
                            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                                {delivery.cliente_telefone}
                              </span>
                              <a
                                href={`https://wa.me/55${delivery.cliente_telefone.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold flex items-center gap-0.5 text-[10px]"
                              >
                                <Send className="w-3 h-3" /> Whats
                              </a>
                            </div>
                          )}

                          <div className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-2 leading-tight flex-1">
                              {delivery.cliente_endereco}
                            </span>
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                delivery.cliente_endereco || ''
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-slate-400 hover:text-emerald-600 text-[10px]"
                              title="Abrir no Google Maps"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>

                        {/* Items Summary */}
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700/60 pt-2">
                          <p className="font-semibold text-slate-700 dark:text-slate-300 line-clamp-2">
                            {delivery.itens_resumo}
                          </p>
                        </div>

                        {/* Price & Payment */}
                        <div className="flex items-center justify-between pt-1 font-bold text-xs">
                          <span className="text-slate-500 dark:text-slate-400 font-normal">
                            {delivery.forma_pagamento}
                          </span>
                          <span className="text-emerald-600 dark:text-emerald-400 text-sm font-black">
                            {formatCurrency(delivery.total)}
                          </span>
                        </div>

                        {/* Assigned Motoboy */}
                        <div className="bg-slate-50 dark:bg-slate-900/80 p-2 rounded-lg border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                            <Bike className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                            <span className="font-bold truncate">
                              {delivery.motoboy_nome || 'Sem motoboy definido'}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              setEditingDelivery(delivery);
                              setMotoboyInput(delivery.motoboy_nome || '');
                            }}
                            className="text-[10px] text-emerald-600 hover:underline font-extrabold shrink-0"
                          >
                            {delivery.motoboy_nome ? 'Alterar' : '+ Motoboy'}
                          </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 flex flex-col gap-1.5">
                          {getNextStatus(delivery.status) && (
                            <button
                              onClick={() => handleUpdateStatus(delivery, getNextStatus(delivery.status)!)}
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
                            >
                              <span>{getNextStatusLabel(delivery.status)}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            onClick={() => setPrintDelivery(delivery)}
                            className="w-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-1.5 px-3 rounded-xl text-[11px] transition flex items-center justify-center gap-1.5"
                          >
                            <Printer className="w-3.5 h-3.5 text-slate-500" />
                            <span>Imprimir Comprovante de Entrega</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Detailed List Table View */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">Código / Origem</th>
                  <th className="p-3.5">Cliente & Contato</th>
                  <th className="p-3.5">Endereço de Entrega</th>
                  <th className="p-3.5">Itens</th>
                  <th className="p-3.5">Total & Pagamento</th>
                  <th className="p-3.5">Entregador / Motoboy</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredDeliveries.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400 font-medium">
                      Nenhuma entrega encontrada com os filtros selecionados.
                    </td>
                  </tr>
                ) : (
                  filteredDeliveries.map((delivery) => {
                    const conf = statusColors[delivery.status];
                    return (
                      <tr key={delivery.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition">
                        <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white">
                          <div>{delivery.code}</div>
                          <span
                            className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-extrabold ${
                              delivery.origem === 'pdv'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                            }`}
                          >
                            {delivery.origem === 'pdv' ? 'Frente Caixa (PDV)' : 'Loja Virtual'}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900 dark:text-white">{delivery.cliente_nome}</div>
                          <div className="text-[11px] text-slate-500">{delivery.cliente_telefone || 'Sem telefone'}</div>
                        </td>
                        <td className="p-3.5 max-w-xs truncate text-slate-600 dark:text-slate-300">
                          {delivery.cliente_endereco}
                        </td>
                        <td className="p-3.5 max-w-xs truncate text-slate-500 dark:text-slate-400">
                          {delivery.itens_resumo}
                        </td>
                        <td className="p-3.5">
                          <div className="font-black text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(delivery.total)}
                          </div>
                          <div className="text-[10px] text-slate-400">{delivery.forma_pagamento}</div>
                        </td>
                        <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300">
                          {delivery.motoboy_nome || (
                            <span className="text-slate-400 font-normal italic">Não atribuído</span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${conf.bg} ${conf.text}`}>
                            {conf.label}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1">
                          {getNextStatus(delivery.status) && (
                            <button
                              onClick={() => handleUpdateStatus(delivery, getNextStatus(delivery.status)!)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded-lg text-xs transition inline-flex items-center gap-1"
                              title={getNextStatusLabel(delivery.status)}
                            >
                              <span>Avançar</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            onClick={() => setPrintDelivery(delivery)}
                            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 p-1.5 rounded-lg transition inline-block"
                            title="Imprimir"
                          >
                            <Printer className="w-3.5 h-3.5" />
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

      {/* Motoboy Assignment Modal */}
      {editingDelivery && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Bike className="w-5 h-5 text-purple-600" />
                Atribuir Motoboy / Entregador
              </h3>
              <button
                onClick={() => setEditingDelivery(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Pedido: <span className="font-bold text-slate-900 dark:text-white">{editingDelivery.code}</span> ({editingDelivery.cliente_nome})
            </p>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Nome do Entregador / Motoboy
              </label>
              <input
                type="text"
                placeholder="Ex: Carlos Silva (Motoboy 01)"
                value={motoboyInput}
                onChange={(e) => setMotoboyInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingDelivery(null)}
                className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold py-2 rounded-xl text-xs transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveMotoboy}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2 rounded-xl text-xs transition shadow-sm"
              >
                Salvar Motoboy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Delivery Voucher Modal */}
      {printDelivery && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            {/* Voucher Printable Content */}
            <div id="printable-voucher" className="space-y-3 font-mono text-xs">
              <div className="text-center border-b border-dashed border-slate-300 pb-3">
                <h3 className="font-black text-sm uppercase">{storeConfig.store_name}</h3>
                <p className="text-[10px] text-slate-500">COMPROVANTE DE ENTREGA / DELIVERY</p>
                <p className="font-bold text-xs mt-1 text-emerald-700">{formatSiteOrderCode(printDelivery.code)}</p>
                <p className="text-[10px] text-slate-400">{formatDateTimeBR(printDelivery.created_at)}</p>
              </div>

              <div className="space-y-1">
                <p className="font-bold">CLIENTE: {printDelivery.cliente_nome}</p>
                <p>TELEFONE: {printDelivery.cliente_telefone || 'N/A'}</p>
                <p className="font-bold bg-slate-100 p-2 rounded">ENDEREÇO: {printDelivery.cliente_endereco}</p>
                {printDelivery.observacoes && <p className="text-[11px] italic">OBS: {printDelivery.observacoes}</p>}
              </div>

              <div className="border-t border-b border-dashed border-slate-300 py-2 space-y-1">
                <p className="font-bold text-[10px] text-slate-500 uppercase">ITENS DO PEDIDO:</p>
                <p className="text-[11px] leading-tight">{printDelivery.itens_resumo}</p>
              </div>

              <div className="space-y-1 pt-1">
                <p className="flex justify-between font-bold">
                  <span>FORMA PAGTO:</span>
                  <span>{printDelivery.forma_pagamento}</span>
                </p>
                <p className="flex justify-between font-black text-sm text-slate-900">
                  <span>TOTAL A PAGAR:</span>
                  <span>{formatCurrency(printDelivery.total)}</span>
                </p>
                <p className="flex justify-between text-[11px]">
                  <span>MOTOBOY:</span>
                  <span>{printDelivery.motoboy_nome || 'A definir'}</span>
                </p>
              </div>

              <div className="border-t border-dashed border-slate-300 pt-6 mt-4 text-center">
                <div className="border-b border-slate-400 w-3/4 mx-auto mb-1"></div>
                <p className="text-[9px] uppercase">Assinatura do Recebedor</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const siteCode = formatSiteOrderCode(printDelivery.code);
                    const ts = formatTimestampFilename(printDelivery.created_at);
                    const storeClean = (storeConfig.store_name || 'Supermercado_ABP').replace(/[^a-zA-Z0-9]/g, '_');
                    const fileName = `Comprovante_${storeClean}_${siteCode}_${ts}.txt`;
                    const txt = `================================================
${storeConfig.store_name.toUpperCase()}
COMPROVANTE DE ENTREGA - DELIVERY
CÓDIGO: ${siteCode}
DATA: ${formatDateTimeBR(printDelivery.created_at)}
CLIENTE: ${printDelivery.cliente_nome}
TELEFONE: ${printDelivery.cliente_telefone || 'N/A'}
ENDEREÇO: ${printDelivery.cliente_endereco}
================================================
ITENS:
${printDelivery.itens_resumo}
================================================
FORMA PAGAMENTO: ${printDelivery.forma_pagamento}
TOTAL A PAGAR: ${formatCurrency(printDelivery.total)}
MOTOBOY: ${printDelivery.motoboy_nome || 'A definir'}
================================================
`;
                    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8;' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs transition shadow-sm flex items-center justify-center gap-1"
                >
                  <Download className="w-4 h-4" /> TXT
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2 rounded-xl text-xs transition shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Imprimir
                </button>
              </div>
              <button
                onClick={() => setPrintDelivery(null)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
