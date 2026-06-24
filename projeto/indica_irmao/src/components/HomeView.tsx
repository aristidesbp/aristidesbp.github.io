import { useState } from 'react';
import { Search, Plus, Star, MapPin, Tag, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Categoria, Servico, Avaliacao } from '../types';
import { StarRating } from './ui/StarRating';
import { Badge, Card, Avatar } from './ui';

interface HomeViewProps {
  categories: Categoria[];
  services: Servico[];
  reviews: Avaliacao[];
  onSelectService: (serviceId: number) => void;
  onNavigateToAnnounce: () => void;
}

export default function HomeView({
  categories,
  services,
  reviews,
  onSelectService,
  onNavigateToAnnounce,
}: HomeViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // Calculate dynamic rating average for a service
  const getServiceRating = (serviceId: number) => {
    const serviceReviews = reviews.filter((r) => r.servico_id === serviceId);
    if (serviceReviews.length === 0) return { avg: 5.0, count: 0 }; // Default high rating for new items
    const sum = serviceReviews.reduce((acc, curr) => acc + curr.nota, 0);
    return {
      avg: parseFloat((sum / serviceReviews.length).toFixed(1)),
      count: serviceReviews.length,
    };
  };

  // Filter services by category and search query
  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategoryId === null || service.categoria === selectedCategoryId;
    const matchesSearch =
      service.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.descricao &&
        service.descricao.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (service.preco_detalhe &&
        service.preco_detalhe.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#059669] to-[#34D399] text-white">
        <div className="absolute inset-0 bg-grid-white/[0.08] bg-[size:20px_20px]" />
        
        {/* Glow circles */}
        <div className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white drop-shadow-sm"
          >
            Encontre profissionais de confiança na nossa comunidade
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 text-lg text-emerald-50 max-w-2xl mx-auto font-medium"
          >
            Conecte-se com irmãos, vizinhos e prestadores de serviços recomendados de forma totalmente transparente e segura.
          </motion.p>

          {/* Centered Large Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="flex items-center bg-white rounded-2xl p-2.5 shadow-xl border border-slate-100 focus-within:ring-4 focus-within:ring-[#059669]/20 transition-all">
              <Search className="ml-4 text-slate-400" size={22} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busque por Jardinagem, Aulas, Pintura, Bolos..."
                className="w-full border-none focus:ring-0 bg-transparent text-[#1E293B] px-4 py-2 font-medium placeholder:text-slate-400"
              />
              <button className="bg-[#059669] hover:bg-[#047857] text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 shrink-0">
                Buscar
              </button>
            </div>
          </motion.div>

          {/* Quick Filter Pills / Categories */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto"
          >
            <button
              onClick={() => setSelectedCategoryId(null)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all border ${
                selectedCategoryId === null
                  ? 'bg-white text-[#059669] border-white shadow-md scale-105'
                  : 'bg-emerald-700/30 text-emerald-100 border-emerald-500/30 hover:bg-emerald-700/50'
              }`}
            >
              Todos os Serviços
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all border ${
                  selectedCategoryId === cat.id
                    ? 'bg-white text-[#059669] border-white shadow-md scale-105'
                    : 'bg-emerald-700/30 text-emerald-100 border-emerald-500/30 hover:bg-emerald-700/50'
                }`}
              >
                {cat.tipo_de_categoria}
              </button>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Grid of Destaques */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-[#1E293B] flex items-center gap-2">
              Serviços em Destaque 🌟
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Profissionais recomendados e bem avaliados pela comunidade.
            </p>
          </div>
          {filteredServices.length > 0 && (
            <span className="text-xs font-bold text-[#059669] bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
              {filteredServices.length} resultados encontrados
            </span>
          )}
        </div>

        {filteredServices.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center max-w-md mx-auto shadow-sm">
            <Tag size={40} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-[#1E293B]">Nenhum serviço disponível</h3>
            <p className="text-slate-500 text-sm mt-2">
              Tente alterar os termos da busca ou selecionar outra categoria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategoryId(null);
              }}
              className="mt-5 text-[#059669] text-sm font-bold hover:underline"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const rating = getServiceRating(service.id);
              
              return (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group cursor-pointer"
                  onClick={() => onSelectService(service.id)}
                >
                  {/* Service Cover Photo */}
                  <div className="aspect-video relative overflow-hidden bg-slate-50">
                    <img
                      src={
                        service.foto_url ||
                        'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80'
                      }
                      alt={service.titulo}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Floating average score stars */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md border border-slate-100">
                      <Star size={14} className="fill-[#F59E0B] text-[#F59E0B]" />
                      <span className="text-xs font-black text-[#1E293B]">
                        {rating.avg}
                      </span>
                      {rating.count > 0 && (
                        <span className="text-[10px] text-slate-500 font-medium">
                          ({rating.count})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {/* Service category badge */}
                        <Badge variant="primary" className="text-[10px]">
                          {categories.find((c) => c.id === service.categoria)
                            ?.tipo_de_categoria || 'Serviço'}
                        </Badge>
                        {service.eu_mesmo && (
                          <Badge variant="secondary" className="text-[10px] bg-slate-100 border-none">
                            Indicação Direta
                          </Badge>
                        )}
                      </div>

                      <h3 className="font-bold text-lg text-[#1E293B] group-hover:text-[#059669] transition-colors line-clamp-1">
                        {service.titulo}
                      </h3>
                      
                      <p className="text-slate-500 text-sm line-clamp-2 mt-1 leading-relaxed">
                        {service.descricao || 'Sem descrição detalhada disponível.'}
                      </p>
                    </div>

                    {/* Bottom row: provider detail and price */}
                    <div className="pt-4 border-t border-slate-50 mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Avatar
                          src={service.usuario_espelho?.avatar_url}
                          fallback={service.usuario_espelho?.nome_completo || 'Prestador'}
                          size="sm"
                        />
                        <div className="text-left">
                          <span className="block text-xs font-bold text-slate-700 truncate max-w-[110px]">
                            {service.usuario_espelho?.nome_completo || 'Irmão Indicado'}
                          </span>
                          <span className="block text-[10px] text-slate-400">
                            Prestador
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                          Estimado
                        </span>
                        <span className="text-base font-black text-[#059669]">
                          {service.preco_estimado
                            ? `R$ ${service.preco_estimado.toFixed(2)}`
                            : 'A combinar'}
                        </span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      {/* Floating Action Button for Mobile / Quick announce */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNavigateToAnnounce}
        className="fixed bottom-6 right-6 z-30 bg-gradient-to-r from-[#059669] to-[#34D399] text-white p-4 rounded-full shadow-lg hover:shadow-xl flex items-center gap-2 group border border-emerald-500/20"
      >
        <Plus size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold text-sm whitespace-nowrap">
          Anunciar Serviço
        </span>
      </motion.button>

    </div>
  );
}
