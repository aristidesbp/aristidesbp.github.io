
import React from 'react';

interface TermsProps {
  onAccept: () => void;
  onRefuse: () => void;
}

const Terms: React.FC<TermsProps> = ({ onAccept, onRefuse }) => {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-background-dark overflow-hidden font-display">
      <header className="flex items-center p-4 pb-2 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10 bg-white dark:bg-background-dark">
        <button onClick={onRefuse} className="text-[#111418] dark:text-white flex size-12 items-center justify-start">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-12">Termos de Uso</h2>
      </header>

      <main className="flex-1 overflow-y-auto px-4">
        <div className="max-w-xl mx-auto">
          <h3 className="text-2xl font-bold pt-6 pb-1">Termos de Uso do Aplicativo</h3>
          <p className="text-[#617589] dark:text-gray-400 text-sm pb-6">Atualizado em: 15 de Outubro de 2024</p>

          <section className="mb-6">
            <h4 className="text-lg font-bold pb-2">1. Aceitação dos Termos</h4>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              Ao acessar e utilizar este aplicativo, você concorda expressamente com os termos e condições aqui descritos.
            </p>
          </section>

          <section className="mb-6">
            <h4 className="text-lg font-bold pb-2">2. Responsabilidade pelos Dados</h4>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-3">
              Todas as informações são armazenadas exclusivamente de duas formas:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-base text-gray-700 dark:text-gray-300">
              <li><strong>Localmente:</strong> Via IndexedDB no seu navegador.</li>
              <li><strong>Conta Própria:</strong> Na sua conta pessoal do Supabase.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h4 className="text-lg font-bold pb-2">3. Privacidade</h4>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              A arquitetura do software foi desenhada para priorizar sua privacidade, assegurando que o controle sobre as informações financeiras permaneça inteiramente sob posse do usuário final.
            </p>
          </section>
        </div>
      </main>

      <footer className="p-4 pb-10 space-y-3 bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800 shadow-lg">
        <button onClick={onAccept} className="w-full h-12 rounded-xl bg-primary text-white font-bold text-base active:opacity-80">
          Aceitar e Continuar
        </button>
        <button onClick={onRefuse} className="w-full h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 font-semibold text-base active:bg-gray-50 dark:active:bg-gray-800">
          Recusar
        </button>
      </footer>
    </div>
  );
};

export default Terms;
