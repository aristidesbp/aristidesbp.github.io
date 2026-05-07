# 📊 Financeiro ERP ABP - Documentação Completa

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Estrutura de Arquivos](#estrutura-de-arquivos)
3. [Setup Inicial](#setup-inicial)
4. [Configuração Supabase](#configuração-supabase)
5. [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
6. [Arquitetura do Código](#arquitetura-do-código)
7. [Como Usar](#como-usar)
8. [Deploy GitHub Pages](#deploy-github-pages)
9. [Boas Práticas](#boas-práticas)

---

## 🎯 Visão Geral

Esta é uma aplicação **modularizada e profissional** de gerenciamento financeiro com as seguintes características:

✅ **Modular**: Arquivos separados (HTML, CSS, JS)  
✅ **Seguro**: Autenticação via Supabase + RLS  
✅ **Offline**: Funciona em GitHub Pages  
✅ **Responsivo**: Mobile-first design  
✅ **Documentado**: Código limpo e bem comentado  
✅ **Escalável**: Fácil adicionar novas funcionalidades  

---

## 📁 Estrutura de Arquivos

```
seu-projeto/
├── index.html          # HTML - Estrutura e markup
├── style.css           # CSS - Estilos customizados
├── script.js           # JavaScript - Lógica completa
├── schema.sql          # SQL - Criação de tabelas
└── README.md          # Este arquivo
```

### Tamanho dos arquivos:
- `index.html` - ~12 KB
- `style.css` - ~8 KB
- `script.js` - ~28 KB
- `schema.sql` - ~5 KB

---

## 🚀 Setup Inicial

### 1. Crie uma conta Supabase (grátis)
- Acesse: https://supabase.com
- Clique em "Sign Up"
- Crie um novo projeto

### 2. Configure o Banco de Dados
No painel do Supabase:

1. Vá para **SQL Editor**
2. Clique em **"New Query"**
3. Cole todo o conteúdo do arquivo `schema.sql`
4. Clique em **"Run"**

✅ Pronto! As tabelas, índices e RLS serão criados automaticamente.

### 3. Configure Autenticação
No painel do Supabase:

1. Vá para **Authentication > Providers**
2. Ative **Email** (padrão)
3. Configure **Email Templates** (opcional)

### 4. Obtenha as Credenciais
No painel do Supabase:

1. Vá para **Settings > API**
2. Copie a **Project URL**
3. Copie a **Anon Key**
4. Substitua no arquivo `script.js` (linhas 14-15):

```javascript
const SUPABASE_URL = 'sua-url-aqui';
const SUPABASE_KEY = 'sua-chave-aqui';
```

---

## 🔐 Configuração Supabase

### URLs do Supabase
```javascript
SUPABASE_URL = https://seu-projeto.supabase.co
SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (Anon Key)
```

### Storage (Bucket)
O bucket `comprovantes` é criado automaticamente pelo `schema.sql`:
- Nome: `comprovantes`
- Público: Sim (permissão de leitura para todos)
- Limite: 50MB por arquivo
- Tipos aceitos: imagens, PDF, áudio

### RLS (Row Level Security)
Cada usuário só vê seus próprios lançamentos graças às políticas criadas pelo `schema.sql`.

---

## 🗄️ Estrutura do Banco de Dados

### Tabela: `financeiro`

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | UUID | Sim | Identificador único |
| `user_id` | UUID | Sim | Referência ao usuário (RLS) |
| `descricao` | TEXT | Sim | Nome do lançamento |
| `tipo` | TEXT | Sim | 'receita' ou 'despesa' |
| `categoria` | TEXT | Não | Categorização (padrão: 'Geral') |
| `status_lancamento` | TEXT | Não | 'aberto', 'finalizado', 'cancelado' |
| `valor_total` | DECIMAL | Sim | Valor em reais |
| `num_parcelas` | INTEGER | Não | Quantidade de parcelas |
| `data_vencimento` | DATE | Sim | Quando vence |
| `data_pagamento` | DATE | Não | Quando foi pago |
| `telefone` | TEXT | Não | Contato |
| `email` | TEXT | Não | Contato |
| `codigo_barra` | TEXT | Não | Código de barras/linha digitável |
| `boleto_url` | TEXT | Não | URL do boleto no Storage |
| `comprovante_url` | TEXT | Não | URL do comprovante no Storage |
| `audio_obs_url` | TEXT | Não | URL da observação em áudio |
| `created_at` | TIMESTAMP | Sim | Data de criação |
| `updated_at` | TIMESTAMP | Sim | Data de atualização |

### Índices
Para otimizar buscas, estão criados índices em:
- `user_id` (filtrar por usuário)
- `tipo` (filtrar receita/despesa)
- `categoria` (filtrar por categoria)
- `data_vencimento` (ordenar por data)
- `status_lancamento` (filtrar por status)

---

## 🏗️ Arquitetura do Código

### Padrão: Module Pattern com Namespaces

O JavaScript está organizado em **módulos temáticos** para melhor manutenção:

```javascript
// EXEMPLO DE ESTRUTURA
const Auth = {        // Autenticação
    login() { ... },
    logout() { ... }
};

const UI = {          // Interface do Usuário
    changePage() { ... }
};

const Lancamentos = { // CRUD de Lançamentos
    salvar() { ... },
    deletar() { ... }
};

const Uploads = {     // Gerenciamento de Arquivos
    uploadArquivo() { ... }
};

const Audio = {       // Gravação de Áudio
    toggle() { ... }
};
```

### Vantagens dessa Arquitetura:
✅ Código organizado em responsabilidades  
✅ Fácil localizar e modificar funcionalidades  
✅ Sem poluição do escopo global  
✅ Escalável para novos módulos  

---

## 💻 Como Usar

### 1. Primeiro Acesso
1. Abra `index.html` no navegador
2. Clique em **"Não tenho cadastro"** (se usando autenticação Supabase)
3. Ou faça login com credenciais cadastradas

### 2. Criar um Lançamento
1. Clique em **"Novo Lançamento"**
2. Preencha os campos obrigatórios (marcados com *)
3. Opcionalmente:
   - Anexe boleto ou comprovante (drag & drop)
   - Grave uma observação em áudio
   - Escaneie código de barras com câmera
4. Clique em **"Gravar Lançamento"**

### 3. Listar Lançamentos
1. Clique em **"Lançamentos"**
2. Use os filtros para buscar:
   - Por descrição
   - Por categoria
   - Por intervalo de datas
3. Veja o resumo no dashboard (receitas, despesas, pendente)
4. Clique em **"Editar"** ou **"Deletar"** em cada card

### 4. Editar Lançamento
1. No card do lançamento, clique em **"Editar"**
2. Modifique os campos desejados
3. Clique em **"Gravar Lançamento"** (agora faz UPDATE)

### 5. Deletar Lançamento
1. No card, clique em **"Deletar"**
2. Confirme na caixa de diálogo
3. Lançamento será removido permanentemente

---

## 🚀 Deploy GitHub Pages

### Passo 1: Crie um Repositório
```bash
# Crie um novo repositório no GitHub
# Nome: seu-nome.github.io (importante!)
```

### Passo 2: Clone e Adicione os Arquivos
```bash
git clone https://github.com/seu-nome/seu-nome.github.io.git
cd seu-nome.github.io

# Coloque os 3 arquivos aqui:
# - index.html
# - style.css
# - script.js
```

### Passo 3: Configure Supabase no HTML
No arquivo `index.html`, certifique-se de que as credenciais estão corretas:

```javascript
const SUPABASE_URL = 'https://seu-projeto.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### Passo 4: Commit e Push
```bash
git add .
git commit -m "Initial commit: Financeiro ERP"
git push origin main
```

### Passo 5: Ative GitHub Pages
1. Vá para **Settings** do repositório
2. Na aba **Pages**
3. Em **Source**, selecione **Deploy from a branch**
4. Selecione **main** (ou master)
5. Clique em **Save**

✅ Sua app estará em: `https://seu-nome.github.io`

---

## 📚 Boas Práticas

### 1. Validação de Entrada
Sempre valide dados antes de enviar ao banco:
```javascript
if (!email || !this.validarEmail(email)) {
    throw new Error('E-mail inválido');
}
```

### 2. Tratamento de Erros
Use try/catch e forneça feedback ao usuário:
```javascript
try {
    const resultado = await operacao();
} catch (erro) {
    Auth.mostrarAlerta('Erro: ' + erro.message, 'error');
}
```

### 3. Escape de HTML
Sempre escape strings antes de usar em innerHTML:
```javascript
const desc = Utilidades.escaparHTML(lancamento.descricao);
```

### 4. Limpeza de Recursos
Sempre pare streams de mídia:
```javascript
stream.getTracks().forEach(track => track.stop());
```

### 5. Índices no Banco
Para buscas rápidas, use índices no Supabase (já estão criados).

### 6. Segurança com RLS
O banco está configurado com RLS. Cada usuário só pode ver seus dados. Verificar no Supabase:

```sql
-- Visualizar policies
SELECT schemaname, tablename, policyname FROM pg_policies;
```

---

## 🔧 Customizações Comuns

### Alterar Cores
No arquivo `style.css`, modifique as variáveis CSS:

```css
:root {
    --primary: #10b981;        /* Cor principal */
    --danger: #ef4444;         /* Cor de perigo */
    --warning: #f59e0b;        /* Cor de aviso */
}
```

### Adicionar Novo Campo
1. No `schema.sql`, adicione coluna à tabela
2. No `index.html`, adicione o campo no form
3. No `script.js`, no objeto `STATE`, configure o novo campo
4. Em `Lancamentos.coletarDadosFormulario()`, capture o valor
5. Em `Lancamentos.validar()`, valide se necessário

### Exemplo: Adicionar campo "Observações"
```javascript
// 1. Em script.js, adicione ao formulário:
const observacoes = document.getElementById('formObservacoes').value;

// 2. Adicione ao payload:
payload.observacoes = observacoes || null;

// 3. No HTML, adicione o input:
<textarea id="formObservacoes" placeholder="Observações..."></textarea>
```

### Integrar com API Externa
```javascript
// Exemplo: Buscar dados de uma API
async function buscarDadosAPI() {
    try {
        const resposta = await fetch('https://api.exemplo.com/dados');
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        Auth.mostrarAlerta('Erro na API: ' + erro.message, 'error');
    }
}
```

---

## 🐛 Troubleshooting

### "Erro: Usuario não autenticado"
→ Verifique se fez login e se está dentro de `telaSistema`

### "Erro ao fazer upload de arquivo"
→ Verifique se:
- Arquivo é menor que 50MB
- Formato é permitido (jpg, png, pdf, etc)
- O bucket existe no Supabase

### "Lançamentos não aparecem"
→ Verifique:
- Se está logado com a conta correta
- Se os RLS estão ativados no Supabase
- Se há registros no banco para aquele usuário

### "Câmera não funciona"
→ Verifique:
- Se deu permissão ao navegador
- Se está em HTTPS (GitHub Pages oferece)
- Se o navegador suporta WebRTC

### "Áudio não funciona"
→ Verifique:
- Se o navegador suporta MediaRecorder
- Se deu permissão de microfone
- Se o áudio foi gravado antes de salvar

---

## 📖 Referências

- **Supabase Docs**: https://supabase.com/docs
- **JavaScript MDN**: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **Tailwind CSS**: https://tailwindcss.com/docs
- **GitHub Pages**: https://pages.github.com

---

## 📝 Licença

Este código é fornecido como material de referência para uso educacional e comercial.

---

## ✨ Dicas para Evolução

1. **Adicionar Categorias Gerenciáveis**: Criar tabela separada para categorias
2. **Relatórios em PDF**: Integrar biblioteca como jsPDF
3. **Gráficos**: Adicionar Chart.js para visualizar dados
4. **Integração com Stripe**: Para recebimento online
5. **App Mobile**: Converter para React Native ou Flutter
6. **Exportar CSV**: Adicionar funcionalidade de download

---

**Desenvolvido com ❤️ como material de referência profissional.**
