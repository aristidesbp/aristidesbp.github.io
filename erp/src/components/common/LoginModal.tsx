import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  X,
  UserCheck,
  KeyRound,
  Sparkles,
} from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, loginStaff, currentUser, logoutStaff } = useApp();

  const [email, setEmail] = useState('admin@erpabp.com');
  const [password, setPassword] = useState('123456');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isLoginModalOpen) return null;

  const quickRoles: { role: UserRole; label: string; desc: string; icon: string; email: string }[] = [
    {
      role: 'admin',
      label: 'Administrador ERP',
      desc: 'Acesso total a todos os módulos e configurações',
      icon: '👑',
      email: 'admin@erpabp.com',
    },
    {
      role: 'caixa',
      label: 'Operador de Caixa (PDV)',
      desc: 'Frente de Caixa, Emissão de Cupons e Sangria',
      icon: '🛒',
      email: 'caixa@erpabp.com',
    },
    {
      role: 'gerente',
      label: 'Gerente / Estoque',
      desc: 'Gestão de Estoque, Produtos, NF-e e Relatórios',
      icon: '📦',
      email: 'gerente@erpabp.com',
    },
    {
      role: 'cliente',
      label: 'Cliente / Comprador',
      desc: 'Pedidos e Delivery na Loja Virtual',
      icon: '👤',
      email: 'cliente@erpabp.com',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Por favor, informe e-mail e senha.');
      return;
    }
    setIsSubmitting(true);
    try {
      const success = await loginStaff(email, password, selectedRole);
      if (success) {
        closeLoginModal();
      } else {
        setErrorMessage('Credenciais inválidas. Verifique seu e-mail e senha.');
      }
    } catch {
      setErrorMessage('Erro ao realizar login. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectQuickRole = (r: (typeof quickRoles)[0]) => {
    setSelectedRole(r.role);
    setEmail(r.email);
    setPassword('123456');
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-6 text-white relative">
          <button
            onClick={closeLoginModal}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-2xl shadow-inner">
              🔐
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Portal do Funcionário & Multi-Usuário</h2>
              <p className="text-xs text-emerald-100 font-medium">ERP_ABP - Autenticação Corporativa SaaS</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* If user is already logged in */}
          {currentUser ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto shadow-md">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{currentUser.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{currentUser.email}</p>
                <span className="inline-block mt-2 bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full">
                  Nível de Acesso: {currentUser.role}
                </span>
              </div>
              <div className="pt-2 flex gap-3">
                <button
                  onClick={closeLoginModal}
                  className="flex-1 bg-emerald-600 text-white font-bold py-2.5 rounded-xl hover:bg-emerald-700 transition text-xs"
                >
                  Continuar Trabalhando
                </button>
                <button
                  onClick={() => {
                    logoutStaff();
                    setErrorMessage('');
                  }}
                  className="px-4 bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 font-bold py-2.5 rounded-xl hover:bg-red-200 transition text-xs"
                >
                  Sair da Conta
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Quick Role Selection Cards */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Selecione o Perfil para Acesso Rápido
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {quickRoles.map((r) => {
                    const isSelected = selectedRole === r.role;
                    return (
                      <button
                        key={r.role}
                        type="button"
                        onClick={() => handleSelectQuickRole(r)}
                        className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg">{r.icon}</span>
                          {isSelected && <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                        </div>
                        <div className="mt-2">
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                            {r.label}
                          </h4>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">{r.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                {errorMessage && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-xs font-bold text-red-600 dark:text-red-400">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    E-mail Corporativo
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="usuario@empresa.com.br"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Senha de Segurança
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl transition shadow-lg shadow-emerald-600/20 active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isSubmitting ? 'Autenticando...' : 'Autenticar Acesso ERP'}</span>
                </button>
              </form>

              {/* Encryption Footer Note */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium opacity-80 pt-2 border-t border-slate-100 dark:border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Criptografia de Sessão Local & Supabase RLS ativa.</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
