# 🧨 RESET TOTAL DO SUPABASE (DADOS + AUTH + STORAGE)
* 👉 Isso é o mais próximo possível de um banco novo.
``` 
-- Apagar tabelas públicas
do $$
declare
  r record;
begin
  for r in (select tablename from pg_tables where schemaname = 'public') loop
    execute 'drop table if exists public.' || quote_ident(r.tablename) || ' cascade';
  end loop;
end $$;
```
# tutorial completo, do zero, didático, direto ao ponto, pensado para rodar 100% no front-end usando Supabase + GitHub Pages:
## A ideia é:
👉 GitHub Pages hospeda o site
👉 Supabase vira o banco de dados + API
👉 HTML + CSS + JavaScript puro

# 🎯 O que você vai construir
* Um CRUD completo:
* Create → criar registros
* Read → listar registros
* Update → editar registros
* Delete → excluir registros
### Tudo rodando em uma página HTML.

# 🧱 1. Criar o projeto no Supabase
## 1.1 Criar conta e projeto
* Acesse: https://supabase.com
* Crie uma conta
* Clique em New Project
## Escolha:
* Nome do projeto
* Senha do banco
* Região

# 1.2 Criar a tabela No Supabase:
* Vá em Table Editor
* Clique em New Table
* Nome da tabela: usuarios
## Crie as colunas:
```
| Coluna     | Tipo      | Observação                  |
| ---------- | --------- | --------------------------- |
| id         | int8      | Primary key, auto increment |
| created_at | timestamp | default now()               |
| nome       | text      | obrigatório                 |
| email      | text      | obrigatório                 |
```









