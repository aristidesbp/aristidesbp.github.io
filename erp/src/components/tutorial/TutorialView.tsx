import React, { useState } from 'react';
import {
  BookOpen,
  Terminal,
  Globe,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Github,
  Cpu,
  Folder,
  ArrowRight,
  HelpCircle,
  ExternalLink,
  Code2,
  FileCheck,
} from 'lucide-react';

export const TutorialView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header Controls */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 dark:text-white text-lg">
              Tutorial: Execução Local & GitHub Pages
            </h2>
            <p className="text-xs text-slate-400">
              Passo a passo para testar no Linux localmente e resolver a tela branca no GitHub Pages
            </p>
          </div>
        </div>

        <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold px-3 py-1.5 rounded-full text-xs border border-indigo-200 dark:border-indigo-800 hidden sm:inline-block">
          Guia de Deploy & Testes
        </span>
      </div>

      {/* ALERT BOX: EXPLAINING THE "WHITE SCREEN" ISSUE */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2.5 text-amber-900 dark:text-amber-200 font-black text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>Por que a "Tela Branca" ocorreu no GitHub Pages? (Entenda o Motivo)</span>
        </div>
        <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed font-medium">
          O navegador Web (Chrome, Firefox, Edge) <strong>não consegue executar arquivos TypeScript (.tsx)</strong> e pacotes React sem compilação prévia. Ao enviar o código-fonte direto para o repositório sem compilar, o GitHub Pages serve o arquivo <code className="bg-amber-200/60 dark:bg-amber-900/60 px-1.5 py-0.5 rounded font-mono">index.html</code> que tenta carregar <code className="bg-amber-200/60 dark:bg-amber-900/60 px-1.5 py-0.5 rounded font-mono">/src/main.tsx</code>, resultando em erro <strong>404 (Not Found)</strong> e tela em branco.
        </p>
        <div className="pt-2 flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200 border-t border-amber-200 dark:border-amber-800/60">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Solução: Para publicar no GitHub Pages, basta gerar a pasta build (<code className="font-mono">dist</code>) executando <code className="bg-amber-200/80 dark:bg-amber-900/80 px-1.5 py-0.5 rounded font-mono">npm run build</code>!</span>
        </div>
      </div>

      {/* TUTORIAL SECTION 1: LINUX LOCAL TESTING */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center font-bold">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              1. Como Testar no Modo Local no Linux (Ubuntu, Mint, Debian, etc.)
            </h3>
            <p className="text-xs text-slate-400">Execute e teste o projeto em seu próprio computador local</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Step 1 */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Passo 1: Instalar o Node.js e Git no Linux
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Abra o terminal do seu Linux (Ctrl + Alt + T) e certifique-se de ter o Node.js (v18+) instalado:
            </p>
            <div className="relative group">
              <pre className="bg-slate-950 text-slate-100 p-3.5 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800">
                sudo apt update && sudo apt install -y nodejs npm git
              </pre>
              <button
                onClick={() => handleCopy('sudo apt update && sudo apt install -y nodejs npm git', 'cmd1')}
                className="absolute right-2.5 top-2.5 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition flex items-center gap-1"
              >
                {copiedId === 'cmd1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Passo 2: Baixar ou Clonar o Repositório do Projeto
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Navegue até a pasta onde deseja salvar o projeto e clone o repositório:
            </p>
            <div className="relative group">
              <pre className="bg-slate-950 text-slate-100 p-3.5 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800">
                git clone https://github.com/aristidesbp/aristidesbp.github.io.git{'\n'}
                cd aristidesbp.github.io
              </pre>
              <button
                onClick={() => handleCopy('git clone https://github.com/aristidesbp/aristidesbp.github.io.git\ncd aristidesbp.github.io', 'cmd2')}
                className="absolute right-2.5 top-2.5 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition flex items-center gap-1"
              >
                {copiedId === 'cmd2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Passo 3: Instalar as Dependências do Projeto
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Execute o comando para baixar todas as bibliotecas do React, Tailwind, Lucide, etc.:
            </p>
            <div className="relative group">
              <pre className="bg-slate-950 text-slate-100 p-3.5 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800">
                npm install
              </pre>
              <button
                onClick={() => handleCopy('npm install', 'cmd3')}
                className="absolute right-2.5 top-2.5 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition flex items-center gap-1"
              >
                {copiedId === 'cmd3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Passo 4: Iniciar o Servidor de Desenvolvimento Local
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Rode o comando do Vite para abrir o ERP localmente:
            </p>
            <div className="relative group">
              <pre className="bg-slate-950 text-slate-100 p-3.5 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800">
                npm run dev
              </pre>
              <button
                onClick={() => handleCopy('npm run dev', 'cmd4')}
                className="absolute right-2.5 top-2.5 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition flex items-center gap-1"
              >
                {copiedId === 'cmd4' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">
              🎉 Pronto! Acesse no navegador em: <span className="underline font-mono">http://localhost:3000</span>
            </p>
          </div>
        </div>
      </div>

      {/* TUTORIAL SECTION 2: GITHUB PAGES PUBLISHING */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              2. Como Publicar e Testar no GitHub Pages sem Tela Branca
            </h3>
            <p className="text-xs text-slate-400">Gerando os arquivos estáticos compilados em HTML, JS e CSS</p>
          </div>
        </div>

        {/* Method A: Direct Command Public Build */}
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Configuração do Arquivo vite.config.ts (Já efetuada!)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              O arquivo <code className="font-mono font-bold text-slate-700 dark:text-slate-300">vite.config.ts</code> já está configurado com <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded font-mono text-emerald-600 dark:text-emerald-400">base: './'</code> para que os links estáticos funcionem em qualquer subpasta do GitHub Pages.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Opção A: Publicação Rápida via comando gh-pages (Recomendado)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              No terminal da pasta do seu projeto, execute os seguintes passos:
            </p>

            <div className="relative group">
              <pre className="bg-slate-950 text-slate-100 p-3.5 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800">
                # 1. Compilar o projeto React para a pasta dist{'\n'}
                npm run build{'\n'}
                {'\n'}
                # 2. Publicar o conteúdo compilado na branch gh-pages do seu repositório{'\n'}
                npx gh-pages -d dist
              </pre>
              <button
                onClick={() => handleCopy('npm run build\nnpx gh-pages -d dist', 'cmd5')}
                className="absolute right-2.5 top-2.5 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition flex items-center gap-1"
              >
                {copiedId === 'cmd5' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Opção B: Publicar Manualmente enviando a pasta dist para o GitHub
            </h4>
            <ol className="list-decimal list-inside text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
              <li>
                Execute no terminal: <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-bold">npm run build</code>
              </li>
              <li>
                Isso criará uma pasta chamada <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-bold">dist</code> contendo o arquivo <code className="font-mono">index.html</code> e a pasta <code className="font-mono">assets</code> com todo o código empacotado.
              </li>
              <li>
                Copie o conteúdo de dentro da pasta <code className="font-mono font-bold">dist</code> para a raiz do seu repositório do GitHub (ou envie diretamente para o repositório em <code className="font-mono">https://github.com/aristidesbp/aristidesbp.github.io</code>).
              </li>
              <li>
                Nas configurações do seu repositório no GitHub (<strong>Settings → Pages</strong>), selecione a Branch <code className="font-mono font-bold">main</code> ou <code className="font-mono font-bold">gh-pages</code> e a pasta <code className="font-mono font-bold">/ (root)</code>.
              </li>
              <li>
                Aguarde 1 a 2 minutos e recarregue o link <a href="https://aristidesbp.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline font-bold inline-flex items-center gap-1">https://aristidesbp.github.io/ <ExternalLink className="w-3 h-3" /></a>. O sistema carregará com 100% de performance!
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* SUMMARY CHECKLIST CARD */}
      <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl shadow-md space-y-3">
        <div className="flex items-center gap-2 text-indigo-300 font-extrabold text-sm">
          <FileCheck className="w-5 h-5 text-emerald-400" />
          <span>Resumo dos Comandos Essenciais no Terminal Linux</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white/10 rounded-xl space-y-1">
            <span className="font-bold text-amber-300 block">🖥️ Para rodar em desenvolvimento:</span>
            <code className="font-mono bg-black/40 px-2 py-1 rounded block text-emerald-300">npm run dev</code>
          </div>

          <div className="p-3 bg-white/10 rounded-xl space-y-1">
            <span className="font-bold text-amber-300 block">🚀 Para gerar o site final para GitHub:</span>
            <code className="font-mono bg-black/40 px-2 py-1 rounded block text-emerald-300">npm run build</code>
          </div>
        </div>
      </div>
    </div>
  );
};
