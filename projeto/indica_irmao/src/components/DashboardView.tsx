import React, { useState } from 'react';
import { LayoutDashboard, MessageSquare, Heart, Plus, Edit, Trash2, Send, Calendar, Star, DollarSign, Phone, Trash } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Categoria, Servico, Avaliacao, UsuarioEspelho, ChatThread, Mensagem } from '../types';
import { Button, Card, Badge, Avatar, Dialog } from './ui';
import { StarRating } from './ui/StarRating';

interface DashboardViewProps {
  initialTab: 'ads' | 'favorites' | 'messages';
  categories: Categoria[];
  services: Servico[];
  reviews: Avaliacao[];
  currentUser: UsuarioEspelho;
  favoritedIds: number[];
  chatThreads: ChatThread[];
  onToggleFavorite: (serviceId: number) => void;
  onNavigateToService: (serviceId: number) => void;
  onAddService: (newService: Omit<Servico, 'id' | 'created_at'>) => void;
  onDeleteService: (serviceId: number) => void;
  onSendMessage: (receiverId: number, text: string, serviceId: number | null) => void;
}

export default function DashboardView({
  initialTab = 'ads',
  categories,
  services,
  reviews,
  currentUser,
  favoritedIds,
  chatThreads,
  onToggleFavorite,
  onNavigateToService,
  onAddService,
  onDeleteService,
  onSendMessage,
}: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'ads' | 'favorites' | 'messages'>(initialTab);
  
  // Create / Edit Service Modal state
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceCategory, setServiceCategory] = useState<number>(categories[0]?.id || 1);
  const [servicePrice, setServicePrice] = useState<number>(100);
  const [servicePriceDetail, setServicePriceDetail] = useState('');
  const [servicePhotoUrl, setServicePhotoUrl] = useState('');
  const [serviceWhatsapp, setServiceWhatsapp] = useState('');

  // Active Chat states
  const [activeThreadIndex, setActiveThreadIndex] = useState<number | null>(chatThreads.length > 0 ? 0 : null);
  const [messageText, setMessageText] = useState('');

  // Sourced Services uploaded by Current User
  const myServices = services.filter((s) => s.criado_por_usuario === currentUser.id);

  // Sourced Favorite Services
  const myFavorites = services.filter((s) => favoritedIds.includes(s.id));

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    onAddService({
      titulo: serviceTitle,
      descricao: serviceDesc,
      categoria: Number(serviceCategory),
      preco_estimado: Number(servicePrice),
      preco_detalhe: servicePriceDetail,
      foto_url: servicePhotoUrl || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
      criado_por_usuario: currentUser.id,
      terceiro: false,
      eu_mesmo: true,
      whatsapp: serviceWhatsapp,
    });
    
    // Clear state
    setServiceTitle('');
    setServiceDesc('');
    setServiceCategory(categories[0]?.id || 1);
    setServicePrice(100);
    setServicePriceDetail('');
    setServicePhotoUrl('');
    setServiceWhatsapp('');
    setIsServiceModalOpen(false);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || activeThreadIndex === null) return;
    const thread = chatThreads[activeThreadIndex];
    onSendMessage(thread.otherUser.id, messageText, thread.lastMessage.servico_id);
    setMessageText('');
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#059669] uppercase tracking-wider">Painel do Membro</span>
            <h1 className="text-3xl font-black text-[#1E293B] tracking-tight mt-1">Sua Área Protegida</h1>
            <p className="text-slate-500 text-sm mt-1">Gerencie seus anúncios, contatos e serviços favoritos.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsServiceModalOpen(true)} className="flex items-center gap-2 font-bold shadow-md bg-[#059669] hover:bg-[#047857]">
              <Plus size={16} />
              <span>Anunciar Novo Serviço</span>
            </Button>
          </div>
        </div>

        {/* Outer Dashboard Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT: Sidebar navigation */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-4">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
                <Avatar src={currentUser.avatar_url} fallback={currentUser.nome_completo} size="md" className="border-2 border-emerald-500" />
                <div className="text-left">
                  <span className="block text-sm font-bold text-[#1E293B]">{currentUser.nome_completo}</span>
                  <span className="block text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Parceiro Comunitário</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setActiveTab('ads')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === 'ads'
                      ? 'bg-[#059669] text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard size={18} />
                    <span>Meus Anúncios</span>
                  </div>
                  <Badge variant={activeTab === 'ads' ? 'secondary' : 'primary'} className="text-[10px]">
                    {myServices.length}
                  </Badge>
                </button>

                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === 'favorites'
                      ? 'bg-[#059669] text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Heart size={18} />
                    <span>Favoritos</span>
                  </div>
                  <Badge variant={activeTab === 'favorites' ? 'secondary' : 'primary'} className="text-[10px]">
                    {myFavorites.length}
                  </Badge>
                </button>

                <button
                  onClick={() => setActiveTab('messages')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === 'messages'
                      ? 'bg-[#059669] text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare size={18} />
                    <span>Mensagens</span>
                  </div>
                  <Badge variant={activeTab === 'messages' ? 'secondary' : 'primary'} className="text-[10px]">
                    {chatThreads.length}
                  </Badge>
                </button>
              </div>
            </Card>

            <Card className="p-4 bg-emerald-50/50 border border-emerald-100">
              <h4 className="text-xs font-black text-[#1E293B] uppercase tracking-wider mb-2">Dica de Sucesso ⛪</h4>
              <p className="text-xs text-slate-500 leading-normal">
                Insira o seu número do WhatsApp correto com o DDD do seu estado para que os irmãos entrem em contato direto sem intermediários!
              </p>
            </Card>
          </div>

          {/* RIGHT: Content area based on selected tab */}
          <div className="lg:col-span-3">
            
            {/* TAB 1: MEUS ANÚNCIOS */}
            {activeTab === 'ads' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#1E293B]">Meus Anúncios Publicados</h2>
                  <span className="text-xs text-slate-400">Total de {myServices.length} serviços cadastrados</span>
                </div>

                {myServices.length === 0 ? (
                  <Card className="p-12 text-center max-w-md mx-auto">
                    <LayoutDashboard size={40} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="font-bold text-base text-[#1E293B]">Você ainda não anunciou</h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Publique suas habilidades e serviços comunitários para que os irmãos da igreja e vizinhos do condomínio te encontrem!
                    </p>
                    <Button onClick={() => setIsServiceModalOpen(true)} className="mt-5 text-xs font-bold flex items-center gap-1.5 mx-auto">
                      <Plus size={14} />
                      <span>Anunciar Meu Primeiro Serviço</span>
                    </Button>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myServices.map((service) => (
                      <Card key={service.id} className="flex flex-col h-full group hover:shadow-md transition-shadow">
                        <div className="aspect-video relative bg-slate-50 overflow-hidden">
                          <img
                            src={service.foto_url || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80'}
                            alt={service.titulo}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge variant="primary" className="bg-white text-[#059669]">
                              {categories.find((c) => c.id === service.categoria)?.tipo_de_categoria || 'Serviço'}
                            </Badge>
                          </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <h3 className="font-bold text-lg text-[#1E293B] group-hover:text-[#059669] transition-colors line-clamp-1">
                              {service.titulo}
                            </h3>
                            <p className="text-slate-500 text-xs line-clamp-2 mt-1">
                              {service.descricao}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                            <div>
                              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide">Preço Base</span>
                              <span className="font-bold text-[#059669] text-base">R$ {service.preco_estimado?.toFixed(2)}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onNavigateToService(service.id)}
                                className="text-xs py-1 px-2.5 h-8 font-semibold"
                              >
                                Ver Detalhes
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onDeleteService(service.id)}
                                className="text-xs text-red-600 hover:bg-red-50 hover:border-red-200 py-1 px-2 h-8"
                                title="Excluir Serviço"
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: FAVORITOS */}
            {activeTab === 'favorites' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#1E293B]">Meus Favoritos</h2>
                  <span className="text-xs text-slate-400">Total de {myFavorites.length} salvos</span>
                </div>

                {myFavorites.length === 0 ? (
                  <Card className="p-12 text-center max-w-md mx-auto">
                    <Heart size={40} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="font-bold text-base text-[#1E293B]">Nenhum favorito ainda</h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Favorite anúncios interessantes para que fiquem guardados em sua conta para fácil acesso posterior.
                    </p>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myFavorites.map((service) => (
                      <Card key={service.id} className="flex flex-col h-full group hover:shadow-md transition-shadow">
                        <div className="aspect-video relative bg-slate-50 overflow-hidden">
                          <img
                            src={service.foto_url || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80'}
                            alt={service.titulo}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3">
                            <button
                              onClick={() => onToggleFavorite(service.id)}
                              className="bg-white p-1.5 rounded-full shadow hover:scale-105 transition-transform"
                            >
                              <Heart size={16} className="fill-red-500 text-red-500" />
                            </button>
                          </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <h3 className="font-bold text-lg text-[#1E293B] group-hover:text-[#059669] transition-colors line-clamp-1">
                              {service.titulo}
                            </h3>
                            <p className="text-slate-500 text-xs line-clamp-2 mt-1">
                              {service.descricao}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                            <div>
                              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide font-mono">Médio</span>
                              <span className="font-bold text-[#059669] text-base">R$ {service.preco_estimado?.toFixed(2)}</span>
                            </div>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onNavigateToService(service.id)}
                              className="text-xs py-1 px-2.5 h-8 font-semibold"
                            >
                              Ver Detalhes
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: CHAT INTERNO (WHATSAPP WEB INTERFACE) */}
            {activeTab === 'messages' && (
              <Card className="h-[600px] grid grid-cols-1 md:grid-cols-3 rounded-2xl overflow-hidden border border-slate-100 bg-white">
                
                {/* Conversations column (Left) */}
                <div className="md:col-span-1 border-r border-slate-100 flex flex-col bg-slate-50/50">
                  <div className="p-4 border-b border-slate-100 bg-white">
                    <h3 className="font-bold text-[#1E293B] text-base">Conversas Recentes</h3>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    {chatThreads.length === 0 ? (
                      <div className="p-8 text-center text-slate-400 text-xs italic">
                        Nenhum chat ativo no momento. Solicite orçamentos para iniciar um papo!
                      </div>
                    ) : (
                      chatThreads.map((thread, index) => {
                        const isActive = activeThreadIndex === index;
                        return (
                          <div
                            key={index}
                            onClick={() => setActiveThreadIndex(index)}
                            className={`p-4 border-b border-slate-50 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors ${
                              isActive ? 'bg-emerald-50/50 border-l-4 border-emerald-600' : ''
                            }`}
                          >
                            <Avatar src={thread.otherUser.avatar_url} fallback={thread.otherUser.nome_completo || 'P'} size="md" />
                            <div className="flex-1 min-w-0 text-left">
                              <div className="flex justify-between items-center mb-0.5">
                                <span className="block text-sm font-bold text-[#1E293B] truncate">
                                  {thread.otherUser.nome_completo}
                                </span>
                                <span className="text-[9px] text-slate-400">
                                  {new Date(thread.lastMessage.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className={`text-xs truncate ${isActive ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                                {thread.lastMessage.texto}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Active chat screen (Right) */}
                <div className="md:col-span-2 flex flex-col h-full bg-slate-50/20">
                  {activeThreadIndex === null || chatThreads.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/20">
                      <MessageSquare size={36} className="text-slate-300 mb-3" />
                      <h4 className="font-bold text-sm text-[#1E293B]">Sua Caixa de Entrada</h4>
                      <p className="text-xs text-slate-500 mt-1">Selecione um chat à esquerda para enviar mensagens.</p>
                    </div>
                  ) : (
                    <>
                      {/* Chat Header */}
                      <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={chatThreads[activeThreadIndex].otherUser.avatar_url}
                            fallback={chatThreads[activeThreadIndex].otherUser.nome_completo || 'P'}
                            size="md"
                          />
                          <div className="text-left">
                            <span className="block text-sm font-bold text-[#1E293B]">
                              {chatThreads[activeThreadIndex].otherUser.nome_completo}
                            </span>
                            <span className="block text-[10px] text-emerald-600 font-bold">
                              Online agora
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Chat Balons Area */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
                        {chatThreads[activeThreadIndex].messages.map((msg) => {
                          const isMe = msg.sender_id === currentUser.id;
                          return (
                            <div
                              key={msg.id}
                              className={`max-w-[75%] p-3.5 rounded-2xl text-sm ${
                                isMe
                                  ? 'bg-[#059669] text-white rounded-tr-none self-end text-right'
                                  : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 self-start text-left'
                              }`}
                            >
                              <p className="leading-relaxed whitespace-pre-wrap">{msg.texto}</p>
                              <span className={`block text-[8px] mt-1 ${isMe ? 'text-emerald-100' : 'text-slate-400'}`}>
                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Chat Input form */}
                      <form onSubmit={handleSendChat} className="p-4 bg-white border-t border-slate-100">
                        <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-1.5 border border-slate-100">
                          <input
                            type="text"
                            required
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder="Digite sua mensagem de fé e orçamento..."
                            className="flex-1 bg-transparent border-none text-xs text-[#1E293B] focus:ring-0 placeholder:text-slate-400 py-2"
                          />
                          <button
                            type="submit"
                            className="bg-[#059669] hover:bg-[#047857] text-white p-2.5 rounded-lg flex items-center justify-center transition-colors shadow-sm shrink-0"
                          >
                            <Send size={14} />
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>

              </Card>
            )}

          </div>

        </div>

      </div>

      {/* CREATE SERVICE DIALOG / MODAL FORM */}
      <Dialog
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        title="Anunciar Meu Serviço"
      >
        <form onSubmit={handleCreateService} className="space-y-4 text-left">
          <p className="text-xs text-slate-500 leading-normal">
            Preencha os dados do serviço abaixo com capricho. Ele ficará listado imediatamente na vitrine pública.
          </p>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">Título do Serviço</label>
            <input
              type="text"
              required
              value={serviceTitle}
              onChange={(e) => setServiceTitle(e.target.value)}
              placeholder="Ex: Reforma de Jardins e Áreas Verdes"
              className="w-full text-xs rounded-lg border border-slate-200 p-2.5 focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">Descrição do Serviço</label>
            <textarea
              required
              value={serviceDesc}
              onChange={(e) => setServiceDesc(e.target.value)}
              placeholder="Descreva suas habilidades, o que está incluso no serviço e sua experiência."
              className="w-full text-xs rounded-lg border border-slate-200 p-2.5 focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Categoria</label>
              <select
                value={serviceCategory}
                onChange={(e) => setServiceCategory(Number(e.target.value))}
                className="w-full text-xs rounded-lg border border-slate-200 p-2.5 focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.tipo_de_categoria}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Valor Estimado (R$)</label>
              <input
                type="number"
                required
                value={servicePrice}
                onChange={(e) => setServicePrice(Number(e.target.value))}
                className="w-full text-xs rounded-lg border border-slate-200 p-2.5 focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">Detalhe do Preço</label>
            <input
              type="text"
              value={servicePriceDetail}
              onChange={(e) => setServicePriceDetail(e.target.value)}
              placeholder="Ex: Por hora, por cômodo, orçamento grátis"
              className="w-full text-xs rounded-lg border border-slate-200 p-2.5 focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">Foto Ilustrativa (URL)</label>
            <input
              type="url"
              value={servicePhotoUrl}
              onChange={(e) => setServicePhotoUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full text-xs rounded-lg border border-slate-200 p-2.5 focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">Seu Whatsapp de Contato</label>
            <input
              type="tel"
              required
              value={serviceWhatsapp}
              onChange={(e) => setServiceWhatsapp(e.target.value)}
              placeholder="Ex: 5511999999999"
              className="w-full text-xs rounded-lg border border-slate-200 p-2.5 focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-50">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsServiceModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" size="sm">
              Publicar Anúncio
            </Button>
          </div>
        </form>
      </Dialog>

    </div>
  );
}
