import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  KeyRound,
  Sparkles,
  UserPlus,
  Building2,
  User,
  CheckCircle2,
  ShoppingBag,
  MessageSquare,
  BarChart3,
  Coins,
  Store,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

export const SaaSLoginScreen: React.FC = () => {
  const { loginStaff, registerUser, loginWithGoogle } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [email, setEmail] = useState('admin@erpabp.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Register form state
  const [regStoreName, setRegStoreName] = useState('Meu Supermercado SaaS');
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('admin');

  const quickRoles: { role: UserRole; label: string; desc: string; icon: string; email: string }[] = [
    {
      role: 'admin',
      label: 'Administrador SaaS',
      desc: 'Acesso total aos módulos, relatórios e gestão',
      icon: '👑',
      email: 'admin@erpabp.com',
    },
    {
      role: 'caixa',
      label: 'Operador de Caixa (PDV)',
      desc: 'Frente de caixa, sangrias e cupons',
      icon: '🛒',
      email: 'caixa@erpabp.com',
    },
    {
      role: 'gerente',
      label: 'Gerente / Estoque',
      desc: 'Estoque, compras e relatórios',
      icon: '📦',
      email: 'gerente@erpabp.com',
    },
    {
      role: 'cliente',
      label: 'Cliente E-Commerce',
      desc: 'Compras na vitrine compartilhada',
      icon: '👤',
      email: 'cliente@erpabp.com',
    },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Por favor, preencha o e-mail e a senha de acesso.');
      return;
    }

    setIsSubmitting(true);
    try {
      const ok = await loginStaff(email, password, selectedRole);
      if (!ok) {
        setErrorMessage('E-mail ou senha incorretos. Verifique suas credenciais ou crie uma conta.');
      }
    } catch {
      setErrorMessage('Ocorreu um erro ao realizar a autenticação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage('');
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
    } catch {
      setErrorMessage('Erro ao autenticar com a conta do Google.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regFullName.trim()) {
      setErrorMessage('Por favor, informe seu Nome Completo.');
      return;
    }
    if (!regEmail.trim()) {
      setErrorMessage('Por favor, informe seu E-mail.');
      return;
    }
    if (!regPassword) {
      setErrorMessage('Por favor, defina uma senha de acesso.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('As senhas digitadas não coincidem.');
      return;
    }

    setIsSubmitting(true);
    try {
      const tenantId = regRole === 'admin' ? `tenant_${Date.now()}` : 'tenant_default';
      const result = await registerUser({
        name: regFullName.trim(),
        email: regEmail.trim(),
        password: regPassword,
        role: regRole,
        store_id: tenantId,
        store_name: regStoreName.trim() || 'Supermercado ABP',
      });

      if (result.success) {
        setSuccessMessage('Conta cadastrada com sucesso no ecossistema SaaS! Entrando...');
      } else {
        setErrorMessage(result.message || 'Falha ao realizar cadastro.');
      }
    } catch {
      setErrorMessage('Erro no servidor durante o processamento do cadastro.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-slate-950 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      {/* Top Header Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-emerald-600/20">
              ⚡
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                ABP SaaS Ecosystem
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Multiloja & Multi-Tenant
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">
                ERP Completo + WhatsApp CRM + MercadoLivre + iFood + ABP Coin
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Isolamento de Dados Seguro
            </span>
            <span className="flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-400" /> Criptomoeda ABP Coin
            </span>
          </div>
        </div>
      </header>

      {/* Main Login Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 my-auto">
        {/* Left Side: SaaS Ecosystem Highlights */}
        <div className="flex-1 space-y-6 text-left max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Ecossistema Único de Negócios & Vendas</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Sua Empresa no Futuro da <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">Gestão SaaS</span>
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed font-normal">
              Acesse sua conta para gerenciar PDV, estoque, financeiro, WhatsApp CRM, e expor seus produtos na loja virtual unificada que conecta milhares de compradores.
            </p>
          </div>

          {/* Feature Grid Pills */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-white">WhatsApp CRM</h4>
                <p className="text-[11px] text-slate-400 leading-tight">Atendimento direto a todas entidades com n8n IA.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-white">Vitrine Compartilhada</h4>
                <p className="text-[11px] text-slate-400 leading-tight">OLX, MercadoLivre & iFood em um só catálogo.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-white">PDV & Financeiro</h4>
                <p className="text-[11px] text-slate-400 leading-tight">Controle de caixa, relatórios e boletos bancários.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                <Coins className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-white">ABP Coin</h4>
                <p className="text-[11px] text-slate-400 leading-tight">Cashback e pagamentos em criptomoeda própria.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card (Fulfilling User Requirements strictly) */}
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative backdrop-blur-xl">
          {/* Card Header */}
          <div className="text-center space-y-2 pb-4 border-b border-slate-800">
            <h3 className="text-xl font-black text-white">
              {mode === 'login' ? 'Acessar Conta SaaS' : 'Criar Nova Conta SaaS'}
            </h3>
            <p className="text-xs text-slate-400">
              {mode === 'login'
                ? 'Informe suas credenciais para acessar seu painel'
                : 'Cadastre sua empresa no ecossistema multiloja'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-slate-950 p-1 rounded-2xl my-4 border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition ${
                mode === 'login'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Autenticação (Login)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition ${
                mode === 'register'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Criar Conta (Cadastro)
            </button>
          </div>

          {/* Error & Success Banners */}
          {errorMessage && (
            <div className="p-3 mb-4 bg-red-950/60 border border-red-800 rounded-2xl text-xs font-bold text-red-300">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="p-3 mb-4 bg-emerald-950/60 border border-emerald-800 rounded-2xl text-xs font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* LOGIN FORM (Requirements 2) */}
          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Field 1: User Email */}
              <div>
                <label className="text-xs font-extrabold text-slate-300 block mb-1">
                  E-mail do Usuário *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@empresa.com.br"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              {/* Field 2: Password with Eye Toggle Icon */}
              <div>
                <label className="text-xs font-extrabold text-slate-300 block mb-1">
                  Senha do Usuário *
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-200 transition"
                    title={showPassword ? 'Ocultar Senha' : 'Visualizar Senha'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Action Button 1: Submit Login */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl transition shadow-lg shadow-emerald-600/20 active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
              >
                <Lock className="w-4 h-4" />
                <span>{isSubmitting ? 'Autenticando...' : 'Fazer Login no Sistema'}</span>
              </button>

              {/* Divider */}
              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800" />
                </div>
                <span className="relative bg-slate-900 px-3 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  ou acesse com
                </span>
              </div>

              {/* Action Button 2: Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                className="w-full py-3 bg-slate-950 hover:bg-slate-800 text-slate-200 font-extrabold text-xs rounded-xl border border-slate-800 hover:border-slate-700 transition flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.1 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.1-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                  />
                </svg>
                <span>{isGoogleLoading ? 'Conectando...' : 'Entrar com a Conta do Google'}</span>
              </button>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Nome da Empresa / Loja (Tenant) *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={regStoreName}
                    onChange={(e) => setRegStoreName(e.target.value)}
                    placeholder="Ex: Supermercado Central"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Seu Nome Completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="Ex: Roberto Silva"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  E-mail do Usuário *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="roberto@empresa.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Senha *</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Confirmar *</label>
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition shadow-lg shadow-emerald-600/20 active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>{isSubmitting ? 'Cadastrando...' : 'Concluir Cadastro & Entrar'}</span>
              </button>
            </form>
          )}

          {/* Footer Note */}
          <p className="text-[10px] text-slate-500 text-center mt-4">
            Ambiente seguro com criptografia Supabase & suporte offline IndexedDB.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 ERP_ABP SaaS Ecosystem. Todos os direitos reservados.</span>
          <span className="text-emerald-500 font-bold">Unificação WhatsApp, MercadoLivre, iFood, OLX & PDV</span>
        </div>
      </footer>
    </div>
  );
};
