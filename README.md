# 📘 Dominando o Supabase: Do Zero ao ERP Profissional
## tutorial completo, do zero, didático, direto ao ponto, pensado para rodar 100% no front-end usando Supabase + GitHub Pages:
## A ideia é:
👉 GitHub Pages hospeda o site
👉 Supabase vira o banco de dados + API
👉 HTML + CSS + JavaScript puro
# 🎯 O que você vai construir
* CRUD completo 
* e-comerce completo 
* ERP completo focado em segurança e performace
# 📂 o que vamos ver neste curso tutorial?
## A Fundação (O Banco de Dados)
* Modelagem de Dados: tipos de dados e quano usar.
* Relacionamentos: Como conectar tabelas (Chaves Estrangeiras).
* Segurança e Apólices (RLS)
* O conceito de RLS: O muro de Berlim dos seus dados.
### Apólices de Acesso:
* Público Total vs. Usuários Autenticados.
* Propriedade de Dados (auth.uid()).
* Níveis de Acesso (Admin vs. Usuário).
* Controle de Fluxo: Diferenciando permissões de Leitura (SELECT) e Escrita (INSERT/UPDATE).
## Inteligência com Triggers e Funções
* Introdução às Functions (PL/pgSQL): Criando lógica dentro do banco.
* Trigger (Gatilhos):
* Automatizando o updated_at.
* Sincronizando estoque ao realizar uma venda.
* Criando perfis de usuário automaticamente após o cadastro.
## Views e Consultas Avançadas
* Database Views: Como simplificar relatórios financeiros complexos.
* Consultas no Front-end: Filtros, ordenação e paginação eficiente.
## Integração e Interface (O ERP na Prática)
* Conexão Segura: Protegendo chaves e gerenciando sessões.
*  Módulo de Dashboard: Gráficos e indicadores em tempo real.
*  Deploy Profissional: Hospedagem no GitHub Pages com integridade total.
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
### TABELA USUARIO 
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
Você pegou os três pilares fundamentais, mas no ecossistema do Supabase (e do PostgreSQL), existem variações estratégicas dessas regras que são o que separam um sistema amador de um ERP Profissional.
Para o ERP ABP Profissional, além desses três, existem mais 2 conceitos cruciais que você precisa dominar para garantir a escalabilidade do projeto.
# O Conceito de "Admin" ou "Nível de Acesso"
No seu ERP, não basta estar logado; alguns usuários poderão ver tudo, enquanto outros apenas o que lhes cabe.
A Situação: "Apenas gerentes podem excluir produtos".
* O USING: (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin'.
* Por que aprender: Isso permite que você use a própria autenticação do Supabase para guardar se o usuário é um "Vendedor" ou "Dono", sem precisar de tabelas extras complexas no início.
# Diferença entre SELECT e UPDATE (Controle de Fluxo)
Muitas vezes, a regra para ver é diferente da regra para mudar.
## A Situação:
* "Todos na empresa podem ver os clientes, mas apenas o criador pode editar".
## A Estratégia:
* Para o SELECT: Você usaria auth.role() = 'authenticated'.
* Para o UPDATE: Você usaria user_id = auth.uid().
* Por que aprender: Isso evita que um funcionário altere acidentalmente os dados de outro, mantendo a integridade do banco.
# 🔑 2. Pegar as chaves do Supabase
## Vá em Settings
*  DATA API/Project URL/copiar
*  API Keis/anon public key/copiar
### Exemplo:
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
# PARABÉNS VOCÊ JÁ TEM O SEU PRIMEIRO CRUD🥳🥳
# FASE 2:






























