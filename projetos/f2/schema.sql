-- ============================================================================
-- FINANCEIRO ERP ABP - SCHEMA SQL
-- Criação de tabelas, índices, RLS e policies
-- ============================================================================

-- ============================================================================
-- 1. TABELA PRINCIPAL: financeiro
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.financeiro (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Informações principais
    descricao TEXT NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('receita', 'despesa')),
    categoria TEXT DEFAULT 'Geral',
    status_lancamento TEXT DEFAULT 'aberto' CHECK (status_lancamento IN ('aberto', 'finalizado', 'cancelado')),
    
    -- Valores
    valor_total DECIMAL(10,2) NOT NULL CHECK (valor_total > 0),
    num_parcelas INTEGER DEFAULT 1 CHECK (num_parcelas > 0),
    
    -- Datas
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    
    -- Contato
    telefone TEXT,
    email TEXT,
    
    -- Código de barras / Linha digitável
    codigo_barra TEXT,
    
    -- URLs de arquivos no Storage
    boleto_url TEXT,
    comprovante_url TEXT,
    audio_obs_url TEXT,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 2. ÍNDICES PARA PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_financeiro_user_id ON public.financeiro(user_id);
CREATE INDEX IF NOT EXISTS idx_financeiro_tipo ON public.financeiro(tipo);
CREATE INDEX IF NOT EXISTS idx_financeiro_categoria ON public.financeiro(categoria);
CREATE INDEX IF NOT EXISTS idx_financeiro_data_vencimento ON public.financeiro(data_vencimento);
CREATE INDEX IF NOT EXISTS idx_financeiro_status ON public.financeiro(status_lancamento);
CREATE INDEX IF NOT EXISTS idx_financeiro_user_data ON public.financeiro(user_id, data_vencimento);

-- ============================================================================
-- 3. ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE public.financeiro ENABLE ROW LEVEL SECURITY;

-- Política: Usuário vê apenas seus próprios registros
CREATE POLICY IF NOT EXISTS "Usuário vê seus próprios lançamentos" 
    ON public.financeiro 
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Política: Usuário insere apenas seus próprios registros
CREATE POLICY IF NOT EXISTS "Usuário insere seus próprios lançamentos" 
    ON public.financeiro 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Política: Usuário atualiza apenas seus próprios registros
CREATE POLICY IF NOT EXISTS "Usuário atualiza seus próprios lançamentos" 
    ON public.financeiro 
    FOR UPDATE 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Política: Usuário deleta apenas seus próprios registros
CREATE POLICY IF NOT EXISTS "Usuário deleta seus próprios lançamentos" 
    ON public.financeiro 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- ============================================================================
-- 4. STORAGE - BUCKET 'comprovantes'
-- ============================================================================

-- Criar bucket (se já existir, não faz nada)
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES (
    'comprovantes',
    'comprovantes',
    true,
    true,
    52428800,  -- 50MB
    ARRAY[
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'application/pdf',
        'audio/webm',
        'audio/mpeg',
        'audio/wav'
    ]
)
ON CONFLICT (id) DO NOTHING;

-- Política: Qualquer um pode ler arquivos públicos
CREATE POLICY IF NOT EXISTS "Ler arquivos do bucket comprovantes"
    ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'comprovantes');

-- Política: Usuários autenticados podem fazer upload
CREATE POLICY IF NOT EXISTS "Upload de arquivos autenticados"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'comprovantes');

-- Política: Usuários podem atualizar seus próprios arquivos
CREATE POLICY IF NOT EXISTS "Atualizar próprios arquivos"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'comprovantes' AND auth.uid() = owner)
    WITH CHECK (bucket_id = 'comprovantes' AND auth.uid() = owner);

-- Política: Usuários podem deletar seus próprios arquivos
CREATE POLICY IF NOT EXISTS "Deletar próprios arquivos"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'comprovantes' AND auth.uid() = owner);

-- ============================================================================
-- 5. FUNÇÃO PARA ATUALIZAR TIMESTAMP
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_financeiro_updated_at
    BEFORE UPDATE ON public.financeiro
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FIM DO SCHEMA
-- ============================================================================
