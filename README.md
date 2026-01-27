✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# 🧱 Criar o projeto no Supabase
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
## Criar conta e projeto
* Acesse: https://supabase.com
* Crie uma conta
* Clique em New Project
## Escolha:
* Nome do projeto
* Senha do banco
* Região
  
# 🧨 RESET TOTAL DO SUPABASE (DADOS + AUTH + STORAGE)
@ 👉 Isso é o mais próximo possível de um banco novo.
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
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# config.js
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
##  Pegar as chaves do Supabase
## Vá em Settings
*  🧱 DATA API/Project URL/copiar🧱 
*  🔑 API Keis/anon public key/copiar🔑
*  🧠 Altentication/url config/ coloque o endereço de onde está hospedado
### Exemplo:
* URL: https://xxxxx.supabase.co
* EY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
* NO HTML/JS COLE EM [CONFIGURAÇÃO DO SUPABASE]
```
const dbsupabase = supabase.createClient(
  'SUA_URL_AQUI', 
  'SUA_KEY_AQUI'
)
```
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# como ler o codigo de barras com a camera
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅ 
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>codigo de barras</title>
 </head>
<body>
 <label>Código de Barras (EAN)</label>
   <div style="display: flex; gap: 5px;">
      <input type="text" id="codigo_de_barras" placeholder="0000000000000">
         <button type="button" class="btn-scan" onclick="abrirScanner()">
           <i class="fas fa-camera"></i>
           </button>
                </div>
            </div>
        </div>
        <div id="reader-container" style="display:none;">
            <div id="reader"></div>
            <button class="btn-cancel" onclick="fecharScanner()" style="margin-bottom: 20px;">Fechar Câmera</button>
        </div>
<script>
let html5QrCode; // Variável global para controlar a instância da câmera
/** Inicia a câmera e o processamento de imagem para ler códigos */
window.abrirScanner = function() {
    // Exibe o container onde o vídeo da câmera aparecerá
    const container = document.getElementById('reader-container');
    if (container) container.style.display = 'block';
    // Cria a instância do leitor apontando para o ID 'reader' no HTML
    html5QrCode = new Html5Qrcode("reader");
    // Configurações do Scanner
    const config = { 
        fps: 10,    // Quadros por segundo
        qrbox: 250  // Área de foco da leitura
    };
    // Inicia a câmera traseira ("environment")
    html5QrCode.start(
        { facingMode: "environment" }, 
        config,
        (decodedText) => {
            // AÇÃO AO LER COM SUCESSO:
            // Preenche o campo de código de barras e fecha a câmera
            const inputCodigo = document.getElementById('codigo_de_barras');
            if (inputCodigo) {
                inputCodigo.value = decodedText;
                // Opcional: emitir um sinal sonoro aqui
                console.log("Código lido: " + decodedText);
            }
            fecharScanner();
        }
    ).catch(err => {
        console.error("Erro ao iniciar câmera: ", err);
        alert("Não foi possível acessar a câmera. Verifique as permissões.");
    });
};

/**  * Para a câmera e limpa a memória  */
window.fecharScanner = function() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            const container = document.getElementById('reader-container');
            if (container) container.style.display = 'none';
            console.log("Câmera desligada.");
        }).catch(err => {
            console.warn("Erro ao parar a câmera: ", err);
        });
    }};
</script>
</body>
</html>
```
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# login.html
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅ 
```
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Login</title>
<script src="js/config.js" defer></script> 
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
body {
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 80px auto;
}

h2 {
  text-align: center;
}

input, button {
  width: 100%;
  padding: 10px;
  margin: 6px 0;
}

.senha {
  position: relative;
}

.senha span {
  position: absolute;
  right: 10px;
  top: 12px;
  cursor: pointer;
}

a {
  cursor: pointer;
  color: #0066cc;
  text-decoration: underline;
}

p {
  text-align: center;
}
</style>
</head>
<body>

<h2 id="titulo">Login</h2>

<input id="email" type="email" placeholder="Email" required>

<div class="senha">
  <input id="senha" type="password" placeholder="Senha (mín. 6 caracteres)" required>
  <span onclick="toggleSenha()">👁️</span>
</div>

<button id="btnAcao" onclick="login()">Entrar</button>

<p>
  <a onclick="mostrarCadastro()">Criar conta</a> |
  <a onclick="resetSenha()">Esqueci minha senha</a>
</p>

<!-- Supabase JS -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>


<script>


/* ===============================
   UI
================================ */
function toggleSenha() {
  const input = document.getElementById('senha')
  input.type = input.type === 'password' ? 'text' : 'password'
}

/* ===============================
   LOGIN (COM AUDITORIA E CORREÇÕES)
================================ */
async function login() {
  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value

  // 1. Tenta o login
  const { data, error } = await dbsupabase.auth.signInWithPassword({
    email,
    password: senha
  })

  if (error) {
    alert("Erro: " + error.message)
    return
  }

  // 2. Se logou com sucesso, grava o Log de Auditoria
  if (data.user) {
    try {
      await dbsupabase.from('logs_acesso').insert([
        { 
          usuario_id: data.user.id, 
          user_agent: navigator.userAgent 
        }
      ]);
    } catch (logError) {
      console.error("Erro ao gravar log:", logError);
      // Não bloqueamos o login se o log falhar, para não travar o usuário
    }

    // 3. Redireciona
    window.location.href = 'index.html'
  }
}

/* ===============================
   RESET DE SENHA
================================ */
async function resetSenha() {
  const email = document.getElementById('email').value

  if (!email) {
    alert('Digite seu email para recuperar a senha')
    return
  }

  const { error } = await dbsupabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://aristidesbp.github.io' 
  })

  if (error) {
    alert(error.message)
    return
  }

  alert('Email de recuperação enviado!')
}

/* ===============================
   CADASTRO
================================ */
function mostrarCadastro() {
  document.getElementById('titulo').innerText = 'Cadastro'
  const btn = document.getElementById('btnAcao')
  btn.innerText = 'Cadastrar'
  btn.onclick = cadastrar
}

async function cadastrar() {
  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value

  if (senha.length < 6) {
    alert('A senha deve ter no mínimo 6 caracteres')
    return
  }

  const { error } = await dbsupabase.auth.signUp({
    email,
    password: senha
  })

  if (error) {
    alert(error.message)
    return
  }

  alert('Cadastro realizado! Verifique seu email para confirmar a conta.')
}
</script>

</body>
</html>

```
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# usuarios.sql
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅ 
```
create table public.usuarios (
  id uuid not null,
  email text not null,
  nome_completo text null,
  avatar_url text null,
  criado_em timestamp with time zone null default now(),
  status text null default 'ativo'::text,
  constraint usuarios_pkey primary key (id),
  constraint usuarios_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE,
  constraint usuarios_status_check check (
    (
      status = any (
        array['ativo'::text, 'suspenso'::text, 'pendente'::text]
      )
    )
  )
) TABLESPACE pg_default;
```
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
# apolicies
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅ 
```
* CREATE POLICY "Perfis: usuários podem atualizar apenas o seu" ON usuarios FOR UPDATE TO public USING ((auth.uid() = id)) WITH CHECK ((auth.uid() = id));
* CREATE POLICY "Perfis: usuários podem ver apenas o seu" ON usuarios FOR SELECT TO public USING ((auth.uid() = id));
* CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON usuarios FOR UPDATE TO public USING ((auth.uid() = id));
* CREATE POLICY "Usuários podem ver seu próprio perfil" ON usuarios FOR SELECT TO public USING ((auth.uid() = id));
```
## COMO FAZER BKP:
```
SELECT 
    'CREATE POLICY ' || quote_ident(policyname) || 
    ' ON ' || tablename || 
    ' FOR ' || cmd || 
    ' TO ' || array_to_string(roles, ',') || 
    ' USING (' || qual || ')' || 
    COALESCE(' WITH CHECK (' || with_check || ')', '') || ';' AS sql_backup
FROM pg_policies
WHERE schemaname = 'public' 
  AND tablename = 'NOME_DA_SUA_TABELA';
```






















