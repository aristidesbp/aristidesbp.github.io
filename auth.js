const SUPABASE_URL = 'https://ndpvspnwzosvpniycapc.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kcHZzcG53em9zdnBuaXljYXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MjkwNDksImV4cCI6MjA4NTAwNTA0OX0.hYgXJXn3CuvNJkbDyVkJNq6xREV-1OSohB1hhoetibk'

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

const form = document.getElementById('login-form')
const registerBtn = document.getElementById('register')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    alert(error.message)
  } else {
    window.location.href = 'app.html'
  }
})

registerBtn.addEventListener('click', async () => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    alert(error.message)
  } else {
    alert('Conta criada! Faça login.')
  }
})
