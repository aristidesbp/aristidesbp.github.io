-- =========================================================================
-- CONTROLE DE ENUMS E EXTENSÕES
-- =========================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================================
-- 1. TABELA: ENTIDADES (Clientes, Fornecedores, Parceiros)
-- =========================================================================
CREATE TABLE public.entidades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    nome TEXT NOT NULL,
    tipo TEXT CHECK (tipo IN ('Cliente', 'Fornecedor', 'Parceiro')) NOT NULL,
    documento TEXT,
    email TEXT,
    telefone TEXT,
    data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE public.entidades ENABLE ROW LEVEL SECURITY;

-- Políticas RLS - Entidades
CREATE POLICY "Usuários podem gerenciar suas próprias entidades" 
ON public.entidades 
FOR ALL 
TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- =========================================================================
-- 2. TABELA: FINANCEIRO (Transações e Uploads)
-- =========================================================================
CREATE TABLE public.financeiro (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    entidade_id UUID REFERENCES public.entidades(id) ON DELETE SET NULL,
    descricao TEXT NOT NULL,
    valor NUMERIC(15, 2) NOT NULL,
    tipo TEXT CHECK (tipo IN ('Receita', 'Despesa')) NOT NULL,
    categoria TEXT NOT NULL,
    data_vencimento DATE NOT NULL,
    status TEXT CHECK (status IN ('Pago', 'Pendente', 'Atrasado')) NOT NULL,
    comprovante_url TEXT,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE public.financeiro ENABLE ROW LEVEL SECURITY;

-- Políticas RLS - Financeiro
CREATE POLICY "Usuários podem gerenciar seu financeiro" 
ON public.financeiro 
FOR ALL 
TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- =========================================================================
-- 3. TABELA: TAREFAS (Gestão de Atividades)
-- =========================================================================
CREATE TABLE public.tarefas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    entidade_id UUID REFERENCES public.entidades(id) ON DELETE SET NULL,
    titulo TEXT NOT NULL,
    descricao TEXT,
    prioridade TEXT CHECK (prioridade IN ('Baixa', 'Média', 'Alta')) NOT NULL,
    status TEXT CHECK (status IN ('A Fazer', 'Em Progresso', 'Concluída')) NOT NULL,
    data_limite DATE,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE public.tarefas ENABLE ROW LEVEL SECURITY;

-- Políticas RLS - Tarefas
CREATE POLICY "Usuários podem gerenciar suas próprias tarefas" 
ON public.tarefas 
FOR ALL 
TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- =========================================================================
-- CONFIGURAÇÃO DO STORAGE (BUCKET: COMPROVANTES)
-- =========================================================================
-- Certifique-se de criar o bucket 'comprovantes' no painel do Supabase antes.
-- Políticas para o Storage
CREATE POLICY "Acesso privado aos comprovantes do usuário"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'comprovantes' AND (storage.foldername(name))[1] = auth.uid()::text)
WITH CHECK (bucket_id = 'comprovantes' AND (storage.foldername(name))[1] = auth.uid()::text);
