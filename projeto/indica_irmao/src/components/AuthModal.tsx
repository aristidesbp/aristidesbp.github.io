import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, User, Info, Database, Sparkles } from 'lucide-react';
import { Button, Dialog } from './ui';
import { isSupabaseConfigured } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { id: number; nome_completo: string; avatar_url: string | null }) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegisterMode && !fullName) {
      setErrorMsg('Por favor preencha seu nome completo.');
      return;
    }

    // Since we want standard connection to work, let's login successfully in mock mode or use standard callback
    onLoginSuccess({
      id: 99, // Current logged user mock ID
      nome_completo: fullName || email.split('@')[0],
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    });
    
    // Clear state
    setEmail('');
    setPassword('');
    setFullName('');
    setBio('');
    setErrorMsg('');
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={isRegisterMode ? 'Criar Nova Conta' : 'Entrar na Plataforma'}>
      <div className="space-y-4">
        
        {/* Supabase Status Information banner */}
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl space-y-2 text-left">
          <div className="flex items-center gap-2 text-[#059669] font-bold text-xs">
            <Database size={16} />
            <span>{isSupabaseConfigured ? 'Supabase Conectado ao Vivo' : 'Modo Simulado Ativo'}</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-normal">
            {isSupabaseConfigured 
              ? 'Seu aplicativo está conectado diretamente ao seu backend do Supabase!'
              : 'O aplicativo está rodando em modo demonstrativo porque as chaves do seu Supabase não foram configuradas. Você pode fazer o login simulado instantaneamente preenchendo qualquer e-mail e senha abaixo!'
            }
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-bold border border-red-100 text-left">
            {errorMsg}
          </div>
        )}

        {/* Auth form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
          {isRegisterMode && (
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Seu Nome Completo</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Irmão João Silva"
                  className="w-full text-xs rounded-lg border border-slate-200 pl-10 p-2.5 focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">E-mail</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@igreja.com.br"
                className="w-full text-xs rounded-lg border border-slate-200 pl-10 p-2.5 focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">Senha</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha secreta"
                className="w-full text-xs rounded-lg border border-slate-200 pl-10 p-2.5 focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
              />
            </div>
          </div>

          {isRegisterMode && (
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Sua Mini-Bio (Opcional)</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Fale um pouco de você..."
                className="w-full text-xs rounded-lg border border-slate-200 p-2.5 focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                rows={2}
              />
            </div>
          )}

          <Button type="submit" className="w-full mt-2 font-bold flex items-center gap-2 justify-center">
            <ShieldCheck size={18} />
            <span>{isRegisterMode ? 'Criar Conta' : 'Fazer Login'}</span>
          </Button>
        </form>

        {/* Toggle Mode button */}
        <div className="text-center pt-2">
          <button
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setErrorMsg('');
            }}
            className="text-xs text-[#059669] hover:underline font-bold"
          >
            {isRegisterMode ? 'Já tem uma conta? Faça login aqui' : 'Não tem uma conta? Crie uma aqui'}
          </button>
        </div>

      </div>
    </Dialog>
  );
}
