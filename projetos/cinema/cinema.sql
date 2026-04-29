-- Tabela de Filmes
CREATE TABLE public.filmes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titulo TEXT NOT NULL,
    categoria TEXT,
    capa_url TEXT, -- URL da imagem da capa
    video_url TEXT NOT NULL, -- URL do vídeo no Storage
    sinopse TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.filmes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Acesso público aos filmes" ON public.filmes FOR SELECT USING (true);

-- Criar Bucket para os vídeos
INSERT INTO storage.buckets (id, name, public) VALUES ('filmes', 'filmes', true) ON CONFLICT (id) DO NOTHING;



CREATE POLICY "Permitir delete público" ON public.filmes FOR DELETE USING (true);

-- 1. Permissão para qualquer um inserir filmes (caso não use login)
CREATE POLICY "Permitir inserção pública" 
ON public.filmes FOR INSERT 
WITH CHECK (true);

-- 2. Permissão para qualquer um deletar filmes
CREATE POLICY "Permitir exclusão pública" 
ON public.filmes FOR DELETE 
USING (true);

-- 3. Caso você queira que APENAS usuários logados possam inserir/deletar:
-- DROP POLICY "Permitir inserção pública" ON public.filmes;
-- CREATE POLICY "Permitir inserção autenticada" ON public.filmes 
-- FOR INSERT WITH CHECK (auth.role() = 'authenticated');


-- Liberar uploads no storage para o bucket 'filmes'
CREATE POLICY "Liberar Upload" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'filmes');

CREATE POLICY "Liberar Delete" ON storage.objects 
FOR DELETE USING (bucket_id = 'filmes');
