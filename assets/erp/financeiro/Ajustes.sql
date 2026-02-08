-- 1. Remover a política antiga para recriar do jeito certo
DROP POLICY IF EXISTS "Gerenciar financeiro próprio" ON financeiro;

-- 2. Criar a política completa (Leitura + Escrita)
CREATE POLICY "Gerenciar financeiro próprio" 
ON financeiro FOR ALL 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 3. IMPORTANTE: Ajustar as Constraints para aceitarem minúsculos (evita erro de acesso negado por violação de regra)
ALTER TABLE financeiro DROP CONSTRAINT IF EXISTS financeiro_tipo_check;
ALTER TABLE financeiro ADD CONSTRAINT financeiro_tipo_check 
CHECK (tipo IN ('Pagar', 'Receber', 'pagar', 'receber'));

ALTER TABLE financeiro DROP CONSTRAINT IF EXISTS financeiro_status_check;
ALTER TABLE financeiro ADD CONSTRAINT financeiro_status_check 
CHECK (status IN ('Pendente', 'Pago', 'pendente', 'pago'));

