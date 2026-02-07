CREATE TABLE entidades (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
  nome_completo TEXT NOT NULL,
  cpf TEXT,
  data_nascimento DATE,
  genero TEXT,
  estado_civil TEXT,
  tipo_entidade TEXT,
  status_entidade TEXT,
  tipo_acesso TEXT,
  email TEXT,
  telefone TEXT,
  senha_acesso TEXT,
  cep TEXT,
  logradouro TEXT,
  numero TEXT,
  bairro TEXT,
  cidade TEXT,
  estado TEXT,
  avaliacao INTEGER DEFAULT 5,
  observacoes TEXT,
  arquivos_url TEXT[], -- Array para suportar múltiplos links
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Ativar RLS
ALTER TABLE entidades ENABLE ROW LEVEL SECURITY;

-- Política para cada usuário ver apenas seus clientes/entidades
CREATE POLICY "Gerenciar suas próprias entidades" 
ON entidades FOR ALL 
USING (auth.uid() = user_id);
