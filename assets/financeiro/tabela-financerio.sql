CREATE TABLE financeiro (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
  entidade_id UUID REFERENCES entidades(id) ON DELETE SET NULL,
  tipo TEXT CHECK (tipo IN ('Pagar', 'Receber')),
  descricao TEXT NOT NULL,
  categoria TEXT,
  forma_pagamento TEXT,
  data_vencimento DATE,
  data_pagamento DATE,
  valor DECIMAL(10,2) DEFAULT 0,
  status TEXT CHECK (status IN ('Pendente', 'Pago')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Segurança RLS
ALTER TABLE financeiro ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gerenciar financeiro próprio" 
ON financeiro FOR ALL USING (auth.uid() = user_id);
