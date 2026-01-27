# 📘 Dominando o Supabase: Do Zero ao ERP Profissional
# 📂 Índice Programático
## Módulo 1: A Fundação (O Banco de Dados)
1.1 Introdução ao PostgreSQL: Por que ele é o coração do Supabase.
1.2 Modelagem de Dados: Criando tabelas para Entidades, Produtos e Financeiro.
1.3 Relacionamentos: Como conectar tabelas (Chaves Estrangeiras).

## Módulo 2: Segurança e Apólices (RLS)
2.1 O conceito de RLS: O muro de Berlim dos seus dados.
2.2 Apólices de Acesso:
Público Total vs. Usuários Autenticados.
Propriedade de Dados (auth.uid()).
Níveis de Acesso (Admin vs. Usuário).
2.3 Controle de Fluxo: Diferenciando permissões de Leitura (SELECT) e Escrita (INSERT/UPDATE).

## Módulo 3: Inteligência com Triggers e Funções
3.1 Introdução às Functions (PL/pgSQL): Criando lógica dentro do banco.
3.2 Trigger (Gatilhos):
Automatizando o updated_at.
Sincronizando estoque ao realizar uma venda.
Criando perfis de usuário automaticamente após o cadastro.

## Módulo 4: Views e Consultas Avançadas
4.1 Database Views: Como simplificar relatórios financeiros complexos.
4.2 Consultas no Front-end: Filtros, ordenação e paginação eficiente.
Módulo 5: Integração e Interface (O ERP na Prática)
5.1 Conexão Segura: Protegendo chaves e gerenciando sessões.
5.2 Módulo de Dashboard: Gráficos e indicadores em tempo real.
5.3 Deploy Profissional: Hospedagem no GitHub Pages com integridade total.


# REQUISITOS 
* Criar conta no github
* Cirar github page
* Criar conta no Supabase
* Criar ou limpar um projeto do supabase

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
* 
## Crie as colunas:
```
| Coluna     | Tipo      | Observação                  |
| ---------- | --------- | --------------------------- |
| id         | int8      | Primary key, auto increment |
| created_at | timestamp | default now()               |
| nome       | text      | obrigatório                 |
| email      | text      | obrigatório                 |
```
# 1.3 Liberar acesso público (IMPORTANTE)
* Vá em Authentication → Policie
  
## Para a tabela usuarios, crie 4 políticas:
* SELECT → Allow public
* INSERT → Allow public
* UPDATE → Allow public
* DELETE → Allow public
  
### EXEMPLO_1 (SELECT) 
* Policy SELECT
* Role: defalt...(public) 
* USING: true
* Salvar

### EXEMPLO_2 (UPDATE)
* Policy UPDATE
* Role: defalt...(public) 
* USING: true
* WITH CHECK: true
* Salvar

## 🧠 Primeiro: o que é USING e WITH CHECK
#### 🔹 USING : 👉 Quem pode ATUALIZAR a linha
#### 🔹 WITH CHECK: 👉 Que dados podem ser salvos após o UPDATE
*  Se qualquer um pode editar qualquer linha, ambos ficam "true".
*  Isso é necessário para funcionar no GitHub Pages (front-end puro).

## 🧠 Regras mentais importantes (grave isso)
* ❌ RLS ativado + policy sem USING = bloqueia tudo
* ✅ USING (true) = acesso liberado
* anon key ≠ bypass de segurança
* Policy manda mais que a chave
  
## 🔒 Quando NÃO usar true
* Só para contexto futuro:
 ```
| Situação                 | USING correto                   |
| ------------------------ | ------------------------------- |
| Apenas usuários logados  | `auth.role() = 'authenticated'` |
| Apenas dono do registro  | `user_id = auth.uid()`          |
| Público total (seu caso) | `true`                          |
 ```

# 🔑 2. Pegar as chaves do Supabase
## Vá em Settings
*  DATA API/Project URL/copiar
*  API Keis/anon public key/copiar

## Exemplo:
* URL: https://xxxxx.supabase.co
* EY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
* NO HTML/JS COLE EM [CONFIGURAÇÃO DO SUPABASE]
    
# 🧩 3. HTML (index.html)
```<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>CRUD Supabase</title>
  <style>
body {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 40px auto;
}

form input, form button {
  padding: 8px;
  margin: 5px 0;
  width: 100%;
}

li {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
}
</style>
</head>
<body>

  <h1>CRUD com Supabase</h1>

  <form id="form">
    <input type="hidden" id="id">
    <input type="text" id="nome" placeholder="Nome" required>
    <input type="email" id="email" placeholder="Email" required>
    <button type="submit">Salvar</button>
  </form>

  <ul id="lista"></ul>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>


    
<script>
// CONFIGURAÇÃO DO SUPABASE
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kcHZzcG53em9zdnBuaXljYXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MjkwNDksImV4cCI6MjA4NTAwNTA0OX0.hYgXJXn3CuvNJkbDyVkJNq6xREV-1OSohB1hhoetibk'
const supabaseUrl = 'https://ndpvspnwzosvpniycapc.supabase.co'

const db = supabase.createClient(supabaseUrl, supabaseKey)


// LISTAR
async function listar() {
  const { data, error } = await db
    .from('usuarios')
    .select('*')
    .order('id', { ascending: false })

  const lista = document.getElementById('lista')
  lista.innerHTML = ''

  data.forEach(user => {
    const li = document.createElement('li')
    li.innerHTML = `
      ${user.nome} - ${user.email}
      <div>
        <button onclick="editar(${user.id}, '${user.nome}', '${user.email}')">Editar</button>
        <button onclick="deletar(${user.id})">Excluir</button>
      </div>
    `
    lista.appendChild(li)
  })
}

listar()


// CRIAR E ATUALIZAR
document.getElementById('form').addEventListener('submit', async e => {
  e.preventDefault()

  const id = document.getElementById('id').value
  const nome = document.getElementById('nome').value
  const email = document.getElementById('email').value

  if (id) {
    await db
      .from('usuarios')
      .update({ nome, email })
      .eq('id', id)
  } else {
    await db
      .from('usuarios')
      .insert([{ nome, email }])
  }

  e.target.reset()
  document.getElementById('id').value = ''
  listar()
})


// EDITAR
function editar(id, nome, email) {
  document.getElementById('id').value = id
  document.getElementById('nome').value = nome
  document.getElementById('email').value = email
}


// DELETAR
async function deletar(id) {
  await db
    .from('usuarios')
    .delete()
    .eq('id', id)

  listar()
}

</script>
</body>
</html>
```
# TUDO CERTO ATE AQUI, VAMOS DAR UM PASSO ADIANTE!




























