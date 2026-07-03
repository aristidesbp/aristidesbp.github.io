
     -- ============================================================================
-- 1. CRIAÇÃO DAS TABELAS FINANCEIRAS
-- ============================================================================

-- Tabela Pai: Lançamento Financeiro Geral (O "Cabeçalho" da conta)
CREATE TABLE public.financas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    -- O default auth.uid() preenche automaticamente com o ID de quem está logado
    user_id UUID DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
    entidade_id UUID REFERENCES public.entidades(id) ON DELETE SET NULL, -- Se apagar o cliente, a conta financeira não some
    descricao TEXT NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    tipo TEXT CHECK (tipo IN ('receita', 'despesa')),
    num_parcelas INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela Filha: Parcelas Individuais (As "Linhas" de pagamento)
CREATE TABLE public.parcelas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    financa_id UUID REFERENCES public.financas(id) ON DELETE CASCADE, -- Se apagar o "cabeçalho", apaga as parcelas junto
    num_parcela INTEGER NOT NULL,
    valor_parcela DECIMAL(10,2) NOT NULL,
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'pago', 'atrasado')),
    codigo_barra TEXT,       -- Campo para o leitor de barras
    boleto_url TEXT,         -- Link do boleto salvo no storage
    comprovante_url TEXT,    -- Link do comprovante salvo no storage
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 2. SEGURANÇA DOS DADOS (ROW LEVEL SECURITY - RLS)
-- ============================================================================

ALTER TABLE public.financas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parcelas ENABLE ROW LEVEL SECURITY;

-- Regras para Finanças (Usuário só acessa as contas que ele mesmo criou)
CREATE POLICY "Pessoa ve as proprias financas" ON public.financas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Pessoa insere as proprias financas" ON public.financas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Pessoa atualiza as proprias financas" ON public.financas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Pessoa apaga as proprias financas" ON public.financas FOR DELETE USING (auth.uid() = user_id);

-- Regras para Parcelas (Usuário só acessa parcelas amarradas às suas finanças)
CREATE POLICY "Pessoa ve as proprias parcelas" ON public.parcelas FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.financas WHERE financas.id = parcelas.financa_id AND financas.user_id = auth.uid())
);
CREATE POLICY "Pessoa insere as proprias parcelas" ON public.parcelas FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.financas WHERE financas.id = parcelas.financa_id AND financas.user_id = auth.uid())
);
CREATE POLICY "Pessoa atualiza as proprias parcelas" ON public.parcelas FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.financas WHERE financas.id = parcelas.financa_id AND financas.user_id = auth.uid())
);
CREATE POLICY "Pessoa apaga as proprias parcelas" ON public.parcelas FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.financas WHERE financas.id = parcelas.financa_id AND financas.user_id = auth.uid())
);

-- ============================================================================
-- 3. CRIAÇÃO E SEGURANÇA DO STORAGE (BUCKET 'comprovantes')
-- ============================================================================

-- Cria o bucket 'comprovantes' automaticamente se ele ainda não existir
INSERT INTO storage.buckets (id, name, public)
VALUES ('comprovantes', 'comprovantes', true)
ON CONFLICT (id) DO NOTHING;

-- Aplica as Regras de quem pode mexer nos arquivos
CREATE POLICY "Comprovantes publicos" ON storage.objects FOR SELECT TO public USING ( bucket_id = 'comprovantes' );
CREATE POLICY "Upload de comprovantes" ON storage.objects FOR INSERT TO authenticated WITH CHECK ( bucket_id = 'comprovantes' );
CREATE POLICY "Edicao de comprovantes" ON storage.objects FOR UPDATE TO authenticated USING ( bucket_id = 'comprovantes' AND auth.uid() = owner );
CREATE POLICY "Delecao de comprovantes" ON storage.objects FOR DELETE TO authenticated USING ( bucket_id = 'comprovantes' AND auth.uid() = owner ); 
      
    

-- ============================================================================
-- ATUALIZAÇÃO DA TABELA 'financas'
-- ============================================================================

-- 1. Adiciona o campo 'categoria' com um valor padrão para não quebrar registros antigos
ALTER TABLE public.financas 
ADD COLUMN IF NOT EXISTS categoria TEXT DEFAULT 'Geral';

-- 2. Adiciona o campo 'status_lancamento' com validação (CHECK) para aceitar apenas os 3 status definidos
ALTER TABLE public.financas 
ADD COLUMN IF NOT EXISTS status_lancamento TEXT DEFAULT 'aberto' 
CHECK (status_lancamento IN ('aberto', 'finalizado', 'cancelado'));

-- 3. Os campos 'telefone' e 'email' já existem na tabela financas!
-- Nenhuma alteração necessária para esses campos.

-- ============================================================================
-- (OPCIONAL) ATUALIZAR REGISTROS ANTIGOS
-- Caso você já tenha dados cadastrados e queira garantir que todos tenham a
-- categoria 'Geral' e o status 'aberto' preenchidos (caso o default não aplique nos antigos)
-- ============================================================================

UPDATE public.financas 
SET categoria = 'Geral' 
WHERE categoria IS NULL;

UPDATE public.financas 
SET status_lancamento = 'aberto' 
WHERE status_lancamento IS NULL;

    -- Na tabela financas
ALTER TABLE public.financas
ADD COLUMN IF NOT EXISTS telefone TEXT,
ADD COLUMN IF NOT EXISTS email TEXT;

-- Na tabela parcelas (opcional, para histórico de áudio)
ALTER TABLE public.parcelas
ADD COLUMN IF NOT EXISTS audio_obs_url TEXT;

