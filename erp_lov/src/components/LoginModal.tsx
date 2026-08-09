import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Database,
  Save,
  RefreshCw,
} from 'lucide-react';
import { login, type SessionUser } from '../lib/auth';
import { saveCredentials, supabase } from '../lib/supabase';

import { getEmpresa, empresaLabel } from '../lib/empresa';

interface LoginModalProps {
  onSuccess: (user: SessionUser) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onSuccess }) => {
  const empresa = getEmpresa();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');

  const [supabaseStatus, setSupabaseStatus] = useState('');

  const handleSaveCredentials = () => {
    if (!supabaseUrl.trim() || !supabaseKey.trim()) {
      setSupabaseStatus('❌ Informe a URL da API e a Anon Key.');
      return;
    }
    saveCredentials(supabaseUrl, supabaseKey);
    setSupabaseStatus('✅ Credenciais salvas! Recarregando aplicação...');
    setTimeout(() => window.location.reload(), 900);
  };

  const handleTestConnection = async () => {
    setSupabaseStatus('⏳ Testando conexão com o Supabase...');
    try {
      const { error } = await supabase
        .from('entidades')
        .select('count', { count: 'exact', head: true });
      if (error && error.code !== 'PGRST116') {
        setSupabaseStatus(`ℹ️ API acessível (${error.message || 'verifique as tabelas'})`);
      } else {
        setSupabaseStatus('✅ Conexão com o Supabase estabelecida e ativa!');
      }
    } catch (err) {
      setSupabaseStatus('❌ Erro de conexão: ' + ((err as Error)?.message ?? ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    const result = await login(email, password);
    setLoading(false);
    if (result.user) onSuccess(result.user);
    else setErrorMessage(result.error || 'Não foi possível autenticar.');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-6">
        {/* Acesso */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/30">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">{empresaLabel(empresa)}</h1>
              <p className="text-xs text-slate-400">{empresa.slogan}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                E-mail (usuário do Auth)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@empresa.com"
                  autoComplete="email"
                  className="w-full pl-9 pr-3 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Senha
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-9 pr-10 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <p className="text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
            >
              <span>{loading ? 'Autenticando...' : 'Entrar'}</span>
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              O acesso é validado pelo Auth do seu projeto Supabase. Cadastre os usuários em
              Authentication → Users.
            </p>
          </form>
        </div>

        {/* Conexão do banco */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-4">
          <div>
            <h2 className="font-bold text-sm text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-500" />
              <span>Conexão do Banco de Dados Supabase</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              URL da API e Chave de Acesso Pública (Anon Key) sincronizados.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              API URL
            </label>
            <input
              type="text"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              placeholder="https://seu-projeto.supabase.co"
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              API Key (Anon Key)
            </label>
            <input
              type="password"
              value={supabaseKey}
              onChange={(e) => setSupabaseKey(e.target.value)}
              autoComplete="off"
              placeholder="Cole aqui a Anon Key do seu projeto"
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white outline-none focus:border-emerald-500"
            />

          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleSaveCredentials}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar Credenciais</span>
            </button>
            <button
              onClick={handleTestConnection}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Testar Conexão</span>
            </button>
          </div>

          {supabaseStatus && (
            <p className="text-xs font-semibold text-slate-300 bg-slate-800 p-2.5 rounded-xl">
              {supabaseStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
