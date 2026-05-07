# ⚡ QUICK START - Financeiro ERP ABP

## 5 Minutos para Colocar em Produção

### Passo 1: Setup Supabase (2 min)

1. Acesse https://supabase.com e faça login
2. Clique em **"New Project"**
3. Preencha:
   - Name: `financeiro-erp`
   - Password: defina uma senha segura
   - Region: escolha a mais próxima
4. Aguarde criação (1-2 min)

### Passo 2: Execute o Schema (1 min)

1. No painel do Supabase, vá para **SQL Editor**
2. Clique em **"New Query"**
3. Cole o conteúdo inteiro do arquivo `schema.sql`
4. Clique em **"Run"**
5. Pronto! ✅

### Passo 3: Obtenha as Chaves (30 seg)

1. Vá para **Settings > API**
2. Copie:
   - **Project URL** (ex: `https://seu-projeto.supabase.co`)
   - **Anon Key** (começa com `eyJ...`)

### Passo 4: Configure o Script (1 min)

Abra `script.js` e substitua as linhas 14-15:

```javascript
const SUPABASE_URL = 'COLE_A_URL_AQUI';
const SUPABASE_KEY = 'COLE_A_CHAVE_AQUI';
```

Exemplos reais:
```javascript
const SUPABASE_URL = 'https://seu-projeto.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### Passo 5: Teste Localmente (30 seg)

```bash
# Se tem Python 3
python -m http.server 8000

# Se tem Node.js
npx http-server

# Se tem PHP
php -S localhost:8000
```

Abra no navegador: http://localhost:8000

### Passo 6: Deploy no GitHub Pages (1 min)

```bash
# Clone um repositório ou crie um novo
git clone https://github.com/SEU_USUARIO/seu-site.github.io.git
cd seu-site.github.io

# Copie os 3 arquivos aqui
# - index.html
# - style.css
# - script.js

# Commit e push
git add .
git commit -m "Add Financeiro ERP"
git push
```

✅ **Pronto! Seu app está em**: `https://seu-usuario.github.io`

---

## Estrutura de Pastas Recomendada

```
seu-projeto/
├── index.html          # 👈 Main file
├── style.css           # 👈 Estilos
├── script.js           # 👈 Lógica
├── schema.sql          # 📋 Para referência
├── README.md           # 📚 Documentação
├── CHANGELOG.md        # 📝 Histórico de mudanças
└── assets/ (opcional)
    ├── logo.png
    └── favicon.ico
```

---

## Primeiro Usuário

1. Abra a app
2. Clique em **"Cadastrar"** (se houver essa opção no Supabase)
3. Ou crie um usuário via SQL:

```sql
-- Execute no Supabase SQL Editor
INSERT INTO auth.users (email, password)
VALUES ('seu@email.com', 'sua-senha');
```

Depois faça login normalmente na app.

---

## Testar Funcionalidades

### ✅ Login
- Email: `seu@email.com`
- Senha: sua senha

### ✅ Criar Lançamento
1. Clique em **"Novo Lançamento"**
2. Preencha os campos (descrição, valor, data)
3. Clique em **"Gravar"**

### ✅ Upload de Arquivo
- Faça drag & drop na área de upload
- Ou clique para selecionar arquivo

### ✅ Gravar Áudio
- Clique em **"Gravar Áudio"**
- Fale suas observações
- Clique novamente para parar
- Gravação aparece na listagem

### ✅ Ler QR Code
- Clique em **"Ler Código"** (na câmera)
- Aponte para boleto ou QR code
- Código preencherá automaticamente

### ✅ Filtrar
- Use os filtros em **"Lançamentos"**
- Dashboard atualiza em tempo real

---

## Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| "Erro de autenticação" | Verifique email/senha. Se novo usuário, crie via Supabase Auth |
| "Upload não funciona" | Verifique se arquivo < 50MB e formato permitido (jpg, png, pdf) |
| "Câmera preta" | Dê permissão ao navegador e recarregue |
| "App em branco" | Abra console (F12) e veja erros |
| "Sem dados após login" | Dados serão vazios no primeiro login. Crie alguns lançamentos |

---

## Segurança

⚠️ **Importante**: As chaves Supabase estão expostas no código-cliente. Isso é normal para GitHub Pages.

**Segurança é garantida por**:
- ✅ RLS (Row Level Security) no banco
- ✅ Cada usuário só vê seus dados
- ✅ Senhas hasheadas no Supabase
- ✅ Validação no servidor

---

## Próximos Passos

Depois de colocar em produção:

1. **Customizar cores**: Edite `style.css` (variáveis CSS no topo)
2. **Adicionar campos**: Edite `schema.sql`, `index.html` e `script.js`
3. **Integrar com APIs**: Use `fetch()` no `script.js`
4. **Deploy automático**: Configure GitHub Actions
5. **Domínio customizado**: Configure DNS apontando para GitHub Pages

---

## Exemplos de Comandos Úteis

### Iniciar servidor local
```bash
# Python 3
python -m http.server

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

### Git
```bash
# Clone o repo
git clone https://github.com/seu-usuario/seu-repo.git

# Navegue
cd seu-repo

# Veja status
git status

# Adicione tudo
git add .

# Commit
git commit -m "Mensagem"

# Envie
git push
```

---

## Links Rápidos

- 🔗 [Supabase Console](https://app.supabase.com)
- 🔗 [GitHub Pages](https://pages.github.com)
- 🔗 [Tailwind CSS](https://tailwindcss.com)
- 🔗 [Font Awesome Icons](https://fontawesome.com)
- 🔗 [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## Suporte

- 📖 Leia `README.md` para documentação completa
- 📝 Veja `CHANGELOG.md` para histórico de mudanças
- 💬 Comentários no código estão em português
- 🐛 Abra issues no GitHub para bugs

---

**Você está pronto para começar! 🚀**

Qualquer dúvida, volte ao README.md ou aos comentários no código.
