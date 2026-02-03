CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.usuarios (
    id, 
    nome_completo, 
    email, 
    status, 
    acesso, 
    relacionamento
  )
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'nome_completo', 'Usuário Novo'), -- Fallback caso o nome não venha no metadata
    NEW.email, 
    'ativo', 
    'cliente', 
    'cliente'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
