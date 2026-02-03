-- Garante que a extensão de UUID esteja ativa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criação da tabela espelho com verificação de existência
CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
    nome_completo TEXT NOT NULL,
    cpf TEXT UNIQUE,
    data_nascimento DATE,
    email TEXT UNIQUE NOT NULL,
    telefone TEXT,
    senha_acesso TEXT,
    acesso TEXT CHECK (acesso IN ('cliente', 'funcionario', 'comprador', 'master')) DEFAULT 'cliente',
    relacionamento TEXT CHECK (relacionamento IN ('cliente', 'funcionario', 'fornecedor', 'terceirizado', 'outros')) DEFAULT 'cliente',
    status TEXT CHECK (status IN ('ativo', 'desativado')) DEFAULT 'ativo',
    avaliacao INTEGER CHECK (avaliacao >= 0 AND avaliacao <= 10) DEFAULT 5,
    cep TEXT,
    logradouro TEXT,
    numero TEXT,
    bairro TEXT,
    cidade TEXT,
    estado CHAR(2),
    arquivos_url TEXT[] DEFAULT '{}',
    observacoes TEXT,
    usuario_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
