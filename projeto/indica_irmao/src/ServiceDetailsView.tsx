import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Heart, CheckCircle, Share2, Send, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';
import { Categoria, Servico, Avaliacao, UsuarioEspelho } from '../types';
import { StarRating } from './ui/StarRating';
import { Button, Card, Badge, Avatar } from './ui';

interface ServiceDetailsViewProps {
  serviceId: number;
  categories: Categoria[];
  services: Servico[];
  reviews: Avaliacao[];
  currentUser: UsuarioEspelho | null;
  favoritedIds: number[];
  onToggleFavorite: (serviceId: number) => void;
  onNavigateBack: () => void;
  onStartChat: (provider: UsuarioEspelho, serviceId: number) => void;
  onAddReview: (serviceId: number, rating: number, comment: string) => void;
}

export default function ServiceDetailsView({
  serviceId,
  categories,
  services,
  reviews,
  currentUser,
  favoritedIds,
  onToggleFavorite,
  onNavigateBack,
  onStartChat,
  onAddReview,
}: ServiceDetailsViewProps) {
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const service = services.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="p-8 text-center max-w-md mx-auto">
        <h3 className="text-lg font-bold text-slate-800">Serviço não encontrado</h3>
        <Button onClick={onNavigateBack} className="mt-4">
          Voltar para Home
        </Button>
      </div>
    );
  }

  const provider = service.usuario_espelho;
  const serviceReviews = reviews.filter((r) => r.servico_id === serviceId);
  const isFavorited = favoritedIds.includes(serviceId);

  // Compute average score
  const avgScore = serviceReviews.length > 0
    ? parseFloat((serviceReviews.reduce((sum, r) => sum + r.nota, 0) / serviceReviews.length).toFixed(1))
    : 5.0;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    onAddReview(serviceId, newRating, newComment);
    setNewComment('');
    setNewRating(5);
    setSuccessMsg('Avaliação adicionada com sucesso!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const shareService = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link do serviço copiado para a área de transferência! Compartilhe com seus amigos e irmãos da igreja.');
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back and Share buttons */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" size="sm" onClick={onNavigateBack} className="flex items-center gap-2">
            <ArrowLeft size={16} />
            <span>Voltar para Vitrine</span>
          </Button>
          <Button variant="outline" size="sm" onClick={shareService} className="flex items-center gap-2">
            <Share2 size={16} />
            <span>Compartilhar</span>
          </Button>
        </div>

        {/* Double Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: Photo Gallery, Title, Description, Reviews */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Main Cover Image */}
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 relative shadow-sm border border-slate-100">
              <img
                src={service.foto_url || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&auto=format&fit=crop&q=80'}
                alt={service.titulo}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="primary" className="bg-white/90 backdrop-blur text-sm py-1.5 px-3 shadow-md border-none">
                  {categories.find((c) => c.id === service.categoria)?.tipo_de_categoria || 'Serviço'}
                </Badge>
              </div>
            </div>

            {/* Title & Stats */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                {service.eu_mesmo && (
                  <Badge variant="secondary" className="bg-emerald-50 text-[#059669] font-bold">
                    Profissional Indicado
                  </Badge>
                )}
                {service.whatsapp && (
                  <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50/20">
                    WhatsApp Disponível
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-black text-[#1E293B] tracking-tight">
                {service.titulo}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 py-2 border-y border-slate-100">
                <div className="flex items-center gap-1.5">
                  <StarRating rating={Math.round(avgScore)} size={16} />
                  <span className="font-bold text-[#1E293B] ml-1">{avgScore}</span>
                  <span>({serviceReviews.length} avaliações)</span>
                </div>
                {service.preco_estimado && (
                  <div>
                    Valor estimado: <span className="font-black text-[#059669] text-base">R$ {service.preco_estimado.toFixed(2)}</span>
                    {service.preco_detalhe && <span className="text-xs text-slate-400"> ({service.preco_detalhe})</span>}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="pt-2">
                <h3 className="font-bold text-lg text-[#1E293B] mb-2">Sobre este Serviço</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {service.descricao || 'Este prestador ainda não preencheu uma descrição completa, mas você pode contatá-lo para tirar todas as dúvidas e solicitar orçamentos personalizados.'}
                </p>
              </div>

              {/* Benefits list */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle size={18} className="text-[#059669] shrink-0" />
                  <span>Trabalho comunitário confiável</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle size={18} className="text-[#059669] shrink-0" />
                  <span>Preços transparentes</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle size={18} className="text-[#059669] shrink-0" />
                  <span>Conversa direta por chat ou WhatsApp</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle size={18} className="text-[#059669] shrink-0" />
                  <span>Garantia de atendimento acolhedor</span>
                </div>
              </div>

            </div>

            {/* Social Proof (Reviews) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-bold text-xl text-[#1E293B]">
                Recomendações dos Vizinhos ({serviceReviews.length})
              </h3>

              <div className="space-y-4">
                {serviceReviews.length === 0 ? (
                  <p className="text-slate-400 text-sm italic">Este serviço ainda não tem avaliações escritas. Seja o primeiro a recomendar!</p>
                ) : (
                  serviceReviews.map((review) => (
                    <div key={review.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Avatar
                            src={review.usuario_espelho?.avatar_url}
                            fallback={review.usuario_espelho?.nome_completo || 'V'}
                            size="sm"
                          />
                          <div>
                            <span className="block text-sm font-bold text-[#1E293B]">
                              {review.usuario_espelho?.nome_completo || 'Irmão da Igreja'}
                            </span>
                            <span className="block text-[10px] text-slate-400">
                              Membro
                            </span>
                          </div>
                        </div>
                        <StarRating rating={review.nota} size={14} />
                      </div>
                      <p className="text-slate-600 text-sm italic">
                        "{review.comentario}"
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Add review form */}
              {currentUser ? (
                <form onSubmit={handleSubmitReview} className="pt-6 border-t border-slate-100 space-y-4">
                  <h4 className="font-bold text-sm text-[#1E293B]">Escreva sua recomendação</h4>
                  
                  {successMsg && (
                    <div className="bg-emerald-50 text-[#059669] p-3 rounded-lg text-sm font-bold border border-emerald-100">
                      {successMsg}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500 font-medium">Sua nota:</span>
                    <StarRating rating={newRating} interactive onChange={setNewRating} size={24} />
                  </div>

                  <div className="space-y-1">
                    <textarea
                      required
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Conte para os vizinhos como foi o serviço deste prestador..."
                      className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="flex items-center gap-1.5">
                    <Send size={16} />
                    <span>Enviar Recomendação</span>
                  </Button>
                </form>
              ) : (
                <p className="text-slate-400 text-xs italic bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  Faça login para escrever uma recomendação para este serviço.
                </p>
              )}

            </div>

          </div>

          {/* RIGHT (Sticky): Provider Details & CTAs */}
          <div className="space-y-6 lg:sticky lg:top-24">
            
            <Card className="p-6 space-y-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="relative">
                  <Avatar
                    src={provider?.avatar_url}
                    fallback={provider?.nome_completo || 'Prestador'}
                    size="lg"
                    className="border-2 border-emerald-500"
                  />
                  <div className="absolute bottom-0 right-0 bg-[#059669] text-white p-1 rounded-full border-2 border-white flex items-center justify-center shadow" title="Prestador verificado">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.9L10 1.154 17.834 4.9a1 1 0 01.596.907v4.613c0 4.14-2.522 7.82-6.32 9.23l-.11.04-.11-.04c-3.798-1.41-6.32-5.09-6.32-9.23V5.807a1 1 0 01.596-.907zM10 11.14l2.42-2.42a1 1 0 011.414 1.414l-3.13 3.13a1 1 0 01-1.414 0L7.14 11.13a1 1 0 111.414-1.414L10 11.14z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-xl text-[#1E293B]">
                    {provider?.nome_completo || 'Irmão da Igreja'}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
                    Prestador do Bairro
                  </span>
                </div>

                <p className="text-xs text-slate-500 italic px-2">
                  "{provider?.bio || 'Membro dedicado da nossa comunidade de fé, disposto a oferecer o melhor trabalho.'}"
                </p>
              </div>

              {/* Provider details summary */}
              <div className="border-y border-slate-50 py-4 text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total de Serviços:</span>
                  <span className="font-bold text-slate-700">32 concluídos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tempo de resposta:</span>
                  <span className="font-bold text-slate-700">Menos de 2 horas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Localização:</span>
                  <span className="font-bold text-[#059669]">Bairro da Igreja</span>
                </div>
              </div>

              {/* Contact buttons */}
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => provider && onStartChat(provider, serviceId)}
                  className="w-full h-12 rounded-xl flex items-center justify-center gap-2 bg-gradient-to-r from-[#059669] to-[#34D399] border-none text-white text-sm font-bold shadow-md hover:opacity-95"
                >
                  <MessageSquare size={18} />
                  <span>Chamar no Chat Interno</span>
                </Button>

                {service.whatsapp && (
                  <a
                    href={`https://wa.me/${service.whatsapp}?text=Ola!%20Vi%20seu%20anuncio%20"${encodeURIComponent(service.titulo)}"%20no%20app%20Indicar%20Irmao.%20Poderia%20me%20atender?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 border border-[#059669] hover:bg-emerald-50 text-[#059669] rounded-xl flex items-center justify-center gap-2 transition-colors font-bold text-sm"
                  >
                    <PhoneCall size={18} />
                    <span>Chamar no WhatsApp</span>
                  </a>
                )}

                <button
                  onClick={() => onToggleFavorite(serviceId)}
                  className={`w-full h-11 border rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-colors ${
                    isFavorited
                      ? 'border-red-100 bg-red-50 text-red-600 hover:bg-red-100'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Heart size={18} className={isFavorited ? 'fill-red-600 text-red-600' : ''} />
                  <span>{isFavorited ? 'Remover dos Favoritos' : 'Favoritar Anúncio'}</span>
                </button>
              </div>

            </Card>

            {/* Quality seal info card */}
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3 shadow-sm">
              <svg className="w-8 h-8 text-[#059669] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <h4 className="font-bold text-[#1E293B] text-sm">Garantia Comunitária</h4>
                <p className="text-xs text-slate-500 mt-1 leading-normal">
                  Todos os prestadores têm verificação de endereço e recomendação de membros ativos, promovendo total segurança em sua contratação.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
