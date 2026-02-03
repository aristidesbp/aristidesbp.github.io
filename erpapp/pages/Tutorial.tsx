
import React from 'react';
import { AppView } from '../types';

interface TutorialProps {
  setView: (view: AppView) => void;
}

const Tutorial: React.FC<TutorialProps> = ({ setView }) => {
  const codeBlock = `CREATE TABLE transactions (
  id bigserial PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  amount numeric NOT NULL,
  description text,
  due_date date NOT NULL,
  type text CHECK (type IN ('entrada', 'saida')),
  created_at timestamptz DEFAULT now()
);`;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark font-display">
      <header className="sticky top-0 z-20 flex items-center bg-white dark:bg-background-dark p-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => setView('settings')} className="text-primary flex size-10 items-center justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10">Tutorial Supabase</h2>
      </header>

      <main className="p-4 space-y-8 pb-10">
        <section>
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary">person_add</span>
            <h3 className="text-lg font-bold">1. Abrir Conta</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">Acesse o site oficial do Supabase e crie sua conta gratuita.</p>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-sm">
             <span className="material-symbols-outlined text-sm">open_in_new</span>
             Ir para Supabase.com
          </button>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary">terminal</span>
            <h3 className="text-lg font-bold">2. Configuração SQL</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">Copie o código abaixo e execute no SQL Editor do seu projeto Supabase.</p>
          
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto border border-gray-800">
            <pre className="text-green-400 text-xs leading-relaxed">{codeBlock}</pre>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(codeBlock);
              alert('Copiado!');
            }}
            className="mt-2 text-primary text-xs font-bold px-3 py-1 bg-primary/10 rounded"
          >
            COPIAR CÓDIGO
          </button>
        </section>

        <section>
           <h3 className="text-lg font-bold mb-2">3. Obter Credenciais</h3>
           <p className="text-gray-500 text-sm">
             Vá em <b>Settings > API</b> no Supabase para copiar a <b>Project URL</b> e a <b>Anon Key</b>, e cole-as na tela de Ajustes do aplicativo.
           </p>
        </section>
      </main>
    </div>
  );
};

export default Tutorial;
