const SUPABASE_URL = 'https://ndpvspnwzosvpniycapc.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kcHZzcG53em9zdnBuaXljYXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MjkwNDksImV4cCI6MjA4NTAwNTA0OX0.hYgXJXn3CuvNJkbDyVkJNq6xREV-1OSohB1hhoetibk'

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

// 🔒 Proteção
async function checkAuth() {
  const { data } = await supabase.auth.getSession()
  if (!data.session) {
    window.location.href = 'index.html'
  }
}
checkAuth()

// 🚪 Logout
document.getElementById('logout').addEventListener('click', async () => {
  await supabase.auth.signOut()
  window.location.href = 'index.html'
})

// 📄 Listar
async function listar() {
  const { data } = await supabase
    .from('usuarios')
    .select('*')
    .order('id', { ascending: false })

  const lista = document.getElementById('lista')
  lista.innerHTML = ''

  data.forEach(u => {
    const li = document.createElement('li')
    li.innerHTML = `
      ${u.nome} - ${u.email}
      <div>
        <button onclick="editar(${u.id}, '${u.nome}', '${u.email}')">Editar</button>
        <button onclick="deletar(${u.id})">Excluir</button>
      </div>
    `
    lista.appendChild(li)
  })
}
listar()

// ➕ Criar / ✏️ Atualizar
document.getElementById('form').addEventListener('submit', async e => {
  e.preventDefault()

  const id = document.getElementById('id').value
  const nome = document.getElementById('nome').value
  const email = document.getElementById('email').value

  if (id) {
    await supabase.from('usuarios')
      .update({ nome, email })
      .eq('id', id)
  } else {
    await supabase.from('usuarios')
      .insert([{ nome, email }])
  }

  e.target.reset()
  document.getElementById('id').value = ''
  listar()
})

// ✏️ Editar
function editar(id, nome, email) {
  document.getElementById('id').value = id
  document.getElementById('nome').value = nome
  document.getElementById('email').value = email
}

// ❌ Deletar
async function deletar(id) {
  await supabase.from('usuarios')
    .delete()
    .eq('id', id)

  listar()
}
