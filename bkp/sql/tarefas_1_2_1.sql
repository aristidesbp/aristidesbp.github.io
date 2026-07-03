
    -- ============================================================================
-- SCRIPT: MÓDULO TAREFAS (GESTÃO DE EXERCÍCIOS)
-- ============================================================================

-- 1. Criação da Tabela com suporte a RLS e Identidade do Usuário
CREATE TABLE IF NOT EXISTS public.tarefas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    titulo TEXT NOT NULL,
    descricao TEXT,
    categoria TEXT,
    codigo_de_barras TEXT,
    data_prazo DATE,
    observacoes TEXT,
    foto_url TEXT,
    audio_url TEXT,
    status_exercicio TEXT DEFAULT 'pendente' CHECK (status_exercicio IN ('pendente', 'realizada')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.tarefas ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de Segurança: O usuário só vê e edita o que é DELE
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Usuários podem gerenciar suas próprias tarefas') THEN
        CREATE POLICY "Usuários podem gerenciar suas próprias tarefas" 
        ON public.tarefas 
        FOR ALL 
        USING (auth.uid() = user_id) 
        WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

-- 4. Configuração de Buckets para Mídias (Fotos e Áudios)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resolucoes', 'resolucoes', true) 
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('audios', 'audios', true) 
ON CONFLICT (id) DO NOTHING;

-- 5. Políticas de Storage: Permitir upload apenas para usuários autenticados
-- Nota: 'public' no bucket permite leitura anônima via URL, mas o upload exige login.
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Upload autenticado em mídias') THEN
        CREATE POLICY "Upload autenticado em mídias" 
        ON storage.objects FOR INSERT 
        WITH CHECK (auth.role() = 'authenticated');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Leitura pública de mídias') THEN
        CREATE POLICY "Leitura pública de mídias" 
        ON storage.objects FOR SELECT 
        USING (bucket_id IN ('resolucoes', 'audios'));
    END IF;
END $$;
    
