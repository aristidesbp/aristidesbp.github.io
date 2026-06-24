import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import ServiceDetailsView from './components/ServiceDetailsView';
import DashboardView from './components/DashboardView';
import AuthModal from './components/AuthModal';

import { 
  MOCK_CATEGORIES, 
  MOCK_SERVICES, 
  MOCK_REVIEWS, 
  MOCK_PROFILES, 
  MOCK_CHAT_THREADS 
} from './mockData';

import { Categoria, Servico, Avaliacao, UsuarioEspelho, ChatThread, Mensagem } from './types';
import { supabase, isSupabaseConfigured } from './lib/supabase';

export default function App() {
  // Navigation & View state
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  
  // Auth Modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Core Data state (initialized with mock values as fallbacks)
  const [categories, setCategories] = useState<Categoria[]>(MOCK_CATEGORIES);
  const [services, setServices] = useState<Servico[]>([]);
  const [reviews, setReviews] = useState<Avaliacao[]>(MOCK_REVIEWS);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(MOCK_CHAT_THREADS);
  
  // Current logged in user (starts with mock active user to enable easy feature previewing)
  const [currentUser, setCurrentUser] = useState<UsuarioEspelho | null>({
    id: 99,
    created_at: new Date().toISOString(),
    auth_users_id: 'active-mock-uuid',
    nome_completo: 'Irmão Cristiano Silva',
    bio: 'Membro ativo e desenvolvedor da comunidade.',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  });

  // Persisted Favorites list
  const [favoritedIds, setFavoritedIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorited_services');
    return saved ? JSON.parse(saved) : [1, 3]; // Default values for initial beauty
  });

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorited_services', JSON.stringify(favoritedIds));
  }, [favoritedIds]);

  // Load Data from Supabase if configured, otherwise fall back to mock data
  useEffect(() => {
    async function loadData() {
      if (!isSupabaseConfigured) {
        console.log('Using simulated/local mock data for Indicar Irmão.');
        // Map mock profiles to mock services for rendering
        const mappedMockServices = MOCK_SERVICES.map((service) => {
          const profile = MOCK_PROFILES.find((p) => p.id === service.criado_por_usuario);
          return {
            ...service,
            usuario_espelho: profile || null,
          };
        });
        
        // Add reviews profile maps
        const mappedReviews = MOCK_REVIEWS.map((r) => {
          const profile = MOCK_PROFILES.find((p) => p.id === r.author_id);
          return {
            ...r,
            usuario_espelho: profile || null,
          };
        });

        setServices(mappedMockServices);
        setReviews(mappedReviews);
        return;
      }

      try {
        console.log('Fetching live data from Supabase tables...');
        
        // 1. Fetch categories
        const { data: cats, error: catsError } = await supabase
          .from('categorias')
          .select('*')
          .order('tipo_de_categoria', { ascending: true });

        if (catsError) throw catsError;
        if (cats && cats.length > 0) setCategories(cats);

        // 2. Fetch services with joined user profile and category
        const { data: servs, error: servsError } = await supabase
          .from('servicos')
          .select(`
            *,
            usuario_espelho:criado_por_usuario (*),
            categorias:categoria (*)
          `)
          .order('created_at', { ascending: false });

        if (servsError) throw servsError;
        if (servs) {
          setServices(servs as Servico[]);
        }

        // 3. Fetch reviews/avaliacoes with joined author profiles
        const { data: revs, error: revsError } = await supabase
          .from('avaliacoes')
          .select(`
            *,
            usuario_espelho:author_id (*)
          `)
          .order('created_at', { ascending: false });

        if (revsError) throw revsError;
        if (revs) {
          setReviews(revs as Avaliacao[]);
        }

      } catch (error) {
        console.error('Failed to load data from live Supabase. Falling back to local data gracefully:', error);
        
        // Ultimate fallback to guarantee the app renders fully
        const mappedMockServices = MOCK_SERVICES.map((service) => {
          const profile = MOCK_PROFILES.find((p) => p.id === service.criado_por_usuario);
          return {
            ...service,
            usuario_espelho: profile || null,
          };
        });
        setServices(mappedMockServices);
      }
    }

    loadData();
  }, []);

  // Action: Toggle favorite
  const handleToggleFavorite = (serviceId: number) => {
    setFavoritedIds((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  // Action: Navigate to service detail
  const handleNavigateToService = (serviceId: number) => {
    setSelectedServiceId(serviceId);
    setCurrentView('service_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Action: Add new service
  const handleAddService = async (newService: Omit<Servico, 'id' | 'created_at'>) => {
    const createdId = services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1;
    
    const serviceWithMeta: Servico = {
      ...newService,
      id: createdId,
      created_at: new Date().toISOString(),
      usuario_espelho: currentUser, // Bind active user object
    };

    // If Supabase is live, push it
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('servicos')
          .insert({
            titulo: newService.titulo,
            descricao: newService.descricao,
            categoria: newService.categoria,
            preco_estimado: newService.preco_estimado,
            preco_detalhe: newService.preco_detalhe,
            foto_url: newService.foto_url,
            criado_por_usuario: 1, // Fallback profile ID
            terceiro: newService.terceiro,
            eu_mesmo: newService.eu_mesmo,
            whatsapp: newService.whatsapp,
          })
          .select(`
            *,
            usuario_espelho:criado_por_usuario (*),
            categorias:categoria (*)
          `)
          .single();

        if (error) throw error;
        if (data) {
          setServices((prev) => [data as Servico, ...prev]);
        }
      } catch (err) {
        console.error('Failed to save service on Supabase. Saving locally:', err);
        setServices((prev) => [serviceWithMeta, ...prev]);
      }
    } else {
      setServices((prev) => [serviceWithMeta, ...prev]);
    }
  };

  // Action: Delete service
  const handleDeleteService = async (serviceId: number) => {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('servicos')
          .delete()
          .eq('id', serviceId);

        if (error) throw error;
        setServices((prev) => prev.filter((s) => s.id !== serviceId));
      } catch (err) {
        console.error('Failed to delete on Supabase. Deleting locally:', err);
        setServices((prev) => prev.filter((s) => s.id !== serviceId));
      }
    } else {
      setServices((prev) => prev.filter((s) => s.id !== serviceId));
    }
  };

  // Action: Add service review
  const handleAddReview = async (serviceId: number, rating: number, comment: string) => {
    if (!currentUser) return;
    const createdId = reviews.length > 0 ? Math.max(...reviews.map((r) => r.id)) + 1 : 1;

    const newReview: Avaliacao = {
      id: createdId,
      created_at: new Date().toISOString(),
      servico_id: serviceId,
      author_id: currentUser.id,
      nota: rating,
      comentario: comment,
      usuario_espelho: currentUser,
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('avaliacoes')
          .insert({
            servico_id: serviceId,
            author_id: 1, // Fallback profile ID
            nota: rating,
            comentario: comment,
          })
          .select(`
            *,
            usuario_espelho:author_id (*)
          `)
          .single();

        if (error) throw error;
        if (data) {
          setReviews((prev) => [data as Avaliacao, ...prev]);
        }
      } catch (err) {
        console.error('Failed to save review on Supabase. Saving locally:', err);
        setReviews((prev) => [newReview, ...prev]);
      }
    } else {
      setReviews((prev) => [newReview, ...prev]);
    }
  };

  // Action: Start direct chat with provider
  const handleStartChat = (provider: UsuarioEspelho, serviceId: number) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    // Check if we already have a chat thread with this provider
    const existingIndex = chatThreads.findIndex((t) => t.otherUser.id === provider.id);
    
    if (existingIndex !== -1) {
      setCurrentView('dashboard_messages');
    } else {
      // Start a new thread
      const newThread: ChatThread = {
        otherUser: provider,
        lastMessage: {
          id: Date.now(),
          created_at: new Date().toISOString(),
          sender_id: currentUser.id,
          receiver_id: provider.id,
          texto: 'Olá irmão! Estou interessado no seu serviço publicado na vitrine. Poderia me dar mais informações?',
          servico_id: serviceId,
        },
        messages: [
          {
            id: Date.now(),
            created_at: new Date().toISOString(),
            sender_id: currentUser.id,
            receiver_id: provider.id,
            texto: 'Olá irmão! Estou interessado no seu serviço publicado na vitrine. Poderia me dar mais informações?',
            servico_id: serviceId,
          }
        ]
      };

      setChatThreads((prev) => [newThread, ...prev]);
      setCurrentView('dashboard_messages');
    }
  };

  // Action: Send chat message in WhatsApp-Web-like dashboard
  const handleSendMessage = (receiverId: number, text: string, serviceId: number | null) => {
    if (!currentUser) return;
    
    const newMsg: Mensagem = {
      id: Date.now(),
      created_at: new Date().toISOString(),
      sender_id: currentUser.id,
      receiver_id: receiverId,
      texto: text,
      servico_id: serviceId,
    };

    // Find and update active chat thread
    setChatThreads((prev) =>
      prev.map((thread) => {
        if (thread.otherUser.id === receiverId) {
          return {
            ...thread,
            lastMessage: newMsg,
            messages: [...thread.messages, newMsg],
          };
        }
        return thread;
      })
    );

    // Simulate auto-reply after 2 seconds for a magical conversational flow!
    setTimeout(() => {
      const autoReply: Mensagem = {
        id: Date.now() + 1,
        created_at: new Date().toISOString(),
        sender_id: receiverId,
        receiver_id: currentUser.id,
        texto: 'Amém irmão! Recebi sua mensagem. Assim que eu terminar o serviço em andamento, te respondo em detalhes. Deus te abençoe!',
        servico_id: serviceId,
      };

      setChatThreads((prev) =>
        prev.map((thread) => {
          if (thread.otherUser.id === receiverId) {
            return {
              ...thread,
              lastMessage: autoReply,
              messages: [...thread.messages, autoReply],
            };
          }
          return thread;
        })
      );
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      
      {/* Universal Header Navbar */}
      <Navbar
        currentUser={currentUser}
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={() => {
          setCurrentUser(null);
          setCurrentView('home');
        }}
      />

      {/* Main View Router */}
      <div className="flex-1">
        {currentView === 'home' && (
          <HomeView
            categories={categories}
            services={services}
            reviews={reviews}
            onSelectService={handleNavigateToService}
            onNavigateToAnnounce={() => {
              if (!currentUser) {
                setIsAuthModalOpen(true);
              } else {
                setCurrentView('dashboard_ads');
              }
            }}
          />
        )}

        {currentView === 'service_detail' && selectedServiceId !== null && (
          <ServiceDetailsView
            serviceId={selectedServiceId}
            categories={categories}
            services={services}
            reviews={reviews}
            currentUser={currentUser}
            favoritedIds={favoritedIds}
            onToggleFavorite={handleToggleFavorite}
            onNavigateBack={() => setCurrentView('home')}
            onStartChat={handleStartChat}
            onAddReview={handleAddReview}
          />
        )}

        {currentView.startsWith('dashboard') && currentUser && (
          <DashboardView
            initialTab={
              currentView === 'dashboard_favorites'
                ? 'favorites'
                : currentView === 'dashboard_messages'
                ? 'messages'
                : 'ads'
            }
            categories={categories}
            services={services}
            reviews={reviews}
            currentUser={currentUser}
            favoritedIds={favoritedIds}
            chatThreads={chatThreads}
            onToggleFavorite={handleToggleFavorite}
            onNavigateToService={handleNavigateToService}
            onAddService={handleAddService}
            onDeleteService={handleDeleteService}
            onSendMessage={handleSendMessage}
          />
        )}
      </div>

      {/* Footer banner */}
      <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <span className="block font-black text-white text-lg tracking-tight">Indicar Irmão</span>
            <p className="text-xs text-slate-400 mt-1">Seu marketplace comunitário de confiança. Conectando pessoas de boa fé.</p>
          </div>
          <div className="flex gap-6 text-xs font-semibold">
            <button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">Termos de Uso</button>
            <button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">Políticas de Privacidade</button>
            <button onClick={() => setIsAuthModalOpen(true)} className="hover:text-white transition-colors">Canal de Ajuda</button>
          </div>
        </div>
      </footer>

      {/* Global Auth Dialog Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthModalOpen(false);
        }}
      />

    </div>
  );
}
