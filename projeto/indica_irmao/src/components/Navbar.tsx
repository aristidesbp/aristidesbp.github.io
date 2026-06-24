import { Search, LogIn, LogOut, Database, User, ShieldAlert } from 'lucide-react';
import { Button, Avatar, Badge } from './ui';
import { isSupabaseConfigured } from '../lib/supabase';

interface NavbarProps {
  currentUser: { id: number; nome_completo: string; avatar_url: string | null } | null;
  currentView: string;
  onNavigate: (view: string, serviceId?: number) => void;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export default function Navbar({
  currentUser,
  currentView,
  onNavigate,
  onOpenAuth,
  onLogout,
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#059669] to-[#34D399] text-white shadow-md">
                <span className="text-xl font-black">II</span>
              </div>
              <div className="text-left">
                <span className="block text-lg font-black tracking-tight text-[#1E293B]">
                  Indicar Irmão
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-[#059669] -mt-1">
                  Comunidade
                </span>
              </div>
            </button>

            {/* Menu Links */}
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => onNavigate('home')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  currentView === 'home'
                    ? 'bg-emerald-50 text-[#059669]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                Início
              </button>
              {currentUser && (
                <>
                  <button
                    onClick={() => onNavigate('dashboard_ads')}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      currentView === 'dashboard_ads'
                        ? 'bg-emerald-50 text-[#059669]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    Meus Anúncios
                  </button>
                  <button
                    onClick={() => onNavigate('dashboard_favorites')}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      currentView === 'dashboard_favorites'
                        ? 'bg-emerald-50 text-[#059669]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    Favoritos
                  </button>
                  <button
                    onClick={() => onNavigate('dashboard_messages')}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      currentView === 'dashboard_messages'
                        ? 'bg-emerald-50 text-[#059669]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    Mensagens
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Database state indicator & Profile */}
          <div className="flex items-center gap-4">
            
            {/* Supabase Connection Status Tag */}
            <div className="hidden sm:flex items-center">
              {isSupabaseConfigured ? (
                <Badge variant="primary" className="flex items-center gap-1.5 py-1 px-2.5">
                  <Database size={12} className="text-[#059669]" />
                  <span>Supabase Conectado</span>
                </Badge>
              ) : (
                <Badge variant="amber" className="flex items-center gap-1.5 py-1 px-2.5 cursor-pointer hover:opacity-80" onClick={onOpenAuth} title="Clique para detalhes de conexão">
                  <ShieldAlert size={12} className="text-[#F59E0B]" />
                  <span>Modo Simulado / Local</span>
                </Badge>
              )}
            </div>

            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="hidden lg:block text-right">
                  <span className="block text-sm font-semibold text-[#1E293B]">
                    {currentUser.nome_completo}
                  </span>
                  <span className="block text-xs text-slate-500">
                    Membro Ativo
                  </span>
                </div>
                
                {/* User avatar dropdown / click to navigate dashboard */}
                <button 
                  onClick={() => onNavigate('dashboard_ads')}
                  className="focus:outline-none hover:ring-2 hover:ring-[#059669] rounded-full transition-all"
                >
                  <Avatar 
                    src={currentUser.avatar_url} 
                    fallback={currentUser.nome_completo}
                    size="md" 
                  />
                </button>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onLogout}
                  className="text-slate-500 hover:text-red-600"
                  title="Sair da Conta"
                >
                  <LogOut size={18} />
                </Button>
              </div>
            ) : (
              <Button onClick={onOpenAuth} className="flex items-center gap-1.5">
                <LogIn size={16} />
                <span>Entrar</span>
              </Button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
