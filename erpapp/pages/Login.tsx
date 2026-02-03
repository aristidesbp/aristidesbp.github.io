
import React from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#1a190a] font-brand transition-colors duration-300">
      <header className="flex items-center justify-center p-4 pt-8">
        <div className="flex items-center gap-2 bg-[#f0f0eb] dark:bg-[#2d2c18] px-4 py-1.5 rounded-full border border-[#e6e6db] dark:border-[#3d3c2a]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <p className="text-[#8c8b5f] dark:text-[#a1a07d] text-xs font-bold leading-normal tracking-[0.05em] uppercase">CONNECTED</p>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-6 pt-12">
        <div className="text-center mb-10">
          <h1 className="text-[#181811] dark:text-white tracking-tight text-[40px] font-bold leading-tight">Login</h1>
          <p className="text-[#8c8b5f] dark:text-[#a1a07d] mt-2 text-base">Bem-vindo de volta!</p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col w-full">
            <p className="text-[#181811] dark:text-[#e6e6db] text-sm font-semibold leading-normal pb-2 ml-1">Email</p>
            <div className="flex w-full items-stretch rounded-xl shadow-sm">
              <div className="text-[#8c8b5f] dark:text-[#a1a07d] flex border border-[#e6e6db] dark:border-[#3d3c2a] bg-white dark:bg-[#23220f] items-center justify-center pl-4 rounded-l-xl border-r-0">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 rounded-r-xl text-[#181811] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#e6e6db] dark:border-[#3d3c2a] bg-white dark:bg-[#23220f] h-14 p-[15px] border-l-0 text-base"
                placeholder="seu@email.com"
                type="email"
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <p className="text-[#181811] dark:text-[#e6e6db] text-sm font-semibold leading-normal pb-2 ml-1">Senha</p>
            <div className="flex w-full items-stretch rounded-xl shadow-sm">
              <div className="text-[#8c8b5f] dark:text-[#a1a07d] flex border border-[#e6e6db] dark:border-[#3d3c2a] bg-white dark:bg-[#23220f] items-center justify-center pl-4 rounded-l-xl border-r-0">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 text-[#181811] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#e6e6db] dark:border-[#3d3c2a] bg-white dark:bg-[#23220f] h-14 p-[15px] border-x-0 text-base"
                placeholder="••••••••"
                type="password"
              />
              <button className="text-[#8c8b5f] dark:text-[#a1a07d] flex border border-[#e6e6db] dark:border-[#3d3c2a] bg-white dark:bg-[#23220f] items-center justify-center pr-4 rounded-r-xl border-l-0" type="button">
                <span className="material-symbols-outlined text-[20px]">visibility</span>
              </button>
            </div>
          </div>

          <div className="pt-6 space-y-4">
            <button
              onClick={onLogin}
              className="w-full flex items-center justify-center rounded-full h-14 bg-secondary text-[#181811] text-lg font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
            >
              Entrar
            </button>
            <button
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-3 rounded-full h-14 border border-[#dadce0] dark:border-[#3d3c2a] bg-white dark:bg-[#2d2c18] text-[#3c4043] dark:text-[#e6e6db] text-base font-medium active:scale-95 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
              </svg>
              <span>Entrar com Google</span>
            </button>
          </div>

          <div className="flex justify-center pt-2">
            <button className="text-[#8c8b5f] dark:text-[#a1a07d] text-sm font-medium hover:text-[#181811] dark:hover:text-primary transition-colors">
              Esqueci minha senha
            </button>
          </div>
        </div>
      </main>

      <footer className="pb-10 pt-6 px-6 text-center">
        <p className="text-[#8c8b5f] dark:text-[#a1a07d] text-base">
          Não tem uma conta?
          <button className="text-[#181811] dark:text-secondary font-bold ml-1 hover:underline">Criar conta</button>
        </p>
      </footer>
    </div>
  );
};

export default Login;
