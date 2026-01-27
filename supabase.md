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
* Role: public anon
* USING: true
* Salvar

### EXEMPLO_2 (UPDATE)
* Policy UPDATE
* Role: public anon
* USING: true
* WITH CHECK: true
* Salvar

## 🧠 Primeiro: o que é USING e WITH CHECK
### 🔹 USING
👉 Quem pode ATUALIZAR a linha
### 🔹 WITH CHECK
👉 Que dados podem ser salvos após o UPDATE

## Se qualquer um pode editar qualquer linha, ambos ficam "true".
## Isso é necessário para funcionar no GitHub Pages (front-end puro).

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
*  Vá em Settings → API
  
### Você vai copiar:
* Project URL
* anon public key
  
## Exemplo:
* URL: https://xxxxx.supabase.co
* EY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# 🧩 3. HTML (index.html)
```
<!DOCTYPE html>
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
<script">
//CONFIGURAÇÃO DO SUPABASE
const supabaseUrl = 'https://SEU-PROJETO.supabase.co'
const supabaseKey = 'SUA-ANON-KEY'
const supabase = supabase.createClient(supabaseUrl, supabaseKey)


//lISTAR
async function listar() {
  const { data, error } = await supabase
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

//CRIAR E ATUALIZAR
document.getElementById('form').addEventListener('submit', async e => {
  e.preventDefault()

  const id = document.getElementById('id').value
  const nome = document.getElementById('nome').value
  const email = document.getElementById('email').value

  if (id) {
    await supabase
      .from('usuarios')
      .update({ nome, email })
      .eq('id', id)
  } else {
    await supabase
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


//DELETAR
async function deletar(id) {
  await supabase
    .from('usuarios')
    .delete()
    .eq('id', id)

  listar()
}


</script>
</body>
</html>
```





























