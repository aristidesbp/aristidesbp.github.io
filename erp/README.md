# ERP_ABP - Gestão Integrada ERP, PDV & Loja Virtual Delivery

Sistema completo de Gestão Empresarial (ERP), Frente de Caixa (PDV), Controle de Estoque, Financeiro, Cadastro de Entidades e Loja Virtual Delivery para Supermercados e Comércio Geral.

# Tecnologias Identificadas no Projeto
Com base na análise da estrutura de pastas, arquivos de configuração e no código fornecido, aqui está a lista detalhada de todas as tecnologias e ferramentas utilizadas no seu projeto:

## Tailwind CSS (Versão 4.3.3): 
Framework CSS utilitário utilizado para a estilização responsiva e customização visual da interface.  
## TypeScript: 
Superset do JavaScript com tipagem estática, evidenciado pela presença do arquivo de configuração tsconfig.json e de scripts como vite.config.ts.
## Vite: 
Empacotador (bundler) e ferramenta de build de altíssima performance para desenvolvimento web moderno (vite.config.ts).
## Bun: 
Gerenciador de pacotes e runtime moderno de alto desempenho (bun.lock).
## npm: 
Gerenciador de pacotes padrão do Node.js, indicado pelos arquivos package.json e package-lock.json.
## HTML5: 
Linguagem padrão de marcação para a estrutura da página web (index.html).
## Node.js: 
Ambiente de execução base para gerenciar as dependências e ferramentas de automação do projeto (node_modules).


Sobre o comando para ver as pastas, você pode usar qualquer um dos dois (`tree -d` ou `find`) quando precisar verificar alguma outra estrutura. No entanto, como você já listou o conteúdo da pasta `src` (`App.tsx`, `components`, `context`, `index.css`, `lib`, `main.tsx`, `types`), já temos o mapa principal para entender como o seu ERP foi construído!

Como este é um projeto em **React com TypeScript**, cada pasta tem uma função muito específica para organizar o código. Vamos ver o que cada uma faz:

---

### 📂 Descrição das Pastas e Arquivos da Pasta `src`

* **`components/` (Componentes)**
* **O que é:** É onde ficam os "blocos de montar" visuais da sua aplicação.
* **Para que serve:** Em vez de fazer uma página inteira gigante, você divide a interface em pedaços menores e reutilizáveis, como botões, barras de navegação, tabelas de produtos, modais de cadastro e gráficos.


* **`context/` (Contexto / Estado Global)**
* **O que é:** O cérebro que gerencia os dados que precisam ser compartilhados por várias telas ao mesmo tempo.
* **Para que serve:** Em um ERP, informações como o usuário logado, configurações do sistema ou a lista global de produtos/clientes precisam ser acessadas de qualquer lugar. O Context evita que você tenha que passar esses dados manualmente de componente em componente.


* **`lib/` (Bibliotecas e Utilitários)**
* **O que é:** Pasta reservada para configurações de serviços externos ou funções auxiliares.
* **Para que serve:** É aqui que normalmente ficam conexões com bancos de dados (como o Supabase), clientes de API, ou funções utilitárias que você usa no dia a dia (por exemplo, uma função para formatar valores em Reais `R$`, formatar datas, etc.).


* **`types/` (Tipos do TypeScript)**
* **O que é:** O dicionário de dados do seu projeto.
* **Para que serve:** Como o projeto usa **TypeScript**, esta pasta define o formato dos dados (interfaces). Por exemplo, ela diz ao código exatamente quais campos um objeto do tipo `Cliente` deve ter (como `id`, `nome`, `email`, `telefone`), ajudando a evitar erros de digitação enquanto você programa.



---

### 📄 Arquivos Principais na Raiz de `src`

* **`main.tsx`**: É o ponto de partida do aplicativo. É o arquivo responsável por "conectar" o seu código React dentro da página HTML (`index.html`).
* **`App.tsx`**: É o componente principal do aplicativo. Geralmente é ele que organiza as rotas, o menu lateral e decide qual tela ou módulo do ERP deve aparecer para o usuário.
* **`index.css`**: Arquivo de estilos globais onde o **Tailwind CSS** é configurado e aplicado a todo o projeto.

---

Qual parte ou arquivo desse sistema você gostaria de abrir, analisar ou modificar primeiro?



---

## ⚠️ Por que ocorre a "Tela Branca" no GitHub Pages? (Entenda o Motivo)

O navegador Web (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari) **não executa arquivos TypeScript (.tsx) e pacotes React diretamente sem compilação prévia**. 

Ao enviar os arquivos-fonte do projeto (`/src/main.tsx`, `App.tsx`) diretamente para o repositório sem compilar, o GitHub Pages serve o arquivo `index.html` bruto, que tenta carregar `/src/main.tsx`. O navegador não reconhece a sintaxe JSX/TSX e retorna erro **404 (Not Found)** ou erro de MIME type, resultando em uma **tela em branco**.

### 💡 Como solucionar:
Para publicar no GitHub Pages com sucesso, é necessário **compilar o projeto** gerando a pasta de arquivos estáticos empacotados (`dist/`) executando o comando `npm run build` antes do deploy.

---

## 🖥️ 1. Como Testar e Executar no Modo Local no Linux (Ubuntu, Mint, Debian, etc.)

Siga o passo a passo abaixo para rodar e testar o projeto no seu próprio computador local Linux:

### Passo 1: Instalar o Node.js, npm e Git no Linux
Abra o terminal do seu Linux (`Ctrl + Alt + T`) e instale as ferramentas necessárias:

```bash
sudo apt update && sudo apt install -y nodejs npm git
```

*(Verifique as versões instaladas executando `node -v` e `npm -v`)*

---

### Passo 2: Clonar o Repositório do Projeto
Navegue até a pasta desejada no terminal e clone o repositório do GitHub:

```bash
git clone https://github.com/aristidesbp/aristidesbp.github.io.git
cd aristidesbp.github.io
```

---

### Passo 3: Instalar as Dependências do Projeto
Execute o comando do npm para baixar todas as bibliotecas do React, Vite, Tailwind CSS, Lucide Icons e Supabase:

```bash
npm install
```

---

### Passo 4: Iniciar o Servidor de Desenvolvimento Local
Rode o comando do Vite para iniciar o servidor local:

```bash
npm run dev
```

🎉 **Pronto!** Abra o seu navegador e acesse:
👉 **[http://localhost:3000](http://localhost:3000)** (ou a porta informada no terminal).

---

## 🚀 2. Como Publicar no GitHub Pages sem Tela Branca (Passo a Passo de Deploy)

### Configuração Prévia no `vite.config.ts` (Já efetuada!)
Garantimos que o arquivo `vite.config.ts` contém `base: './'`, permitindo que os caminhos dos arquivos CSS e JavaScript compilados funcionem corretamente no GitHub Pages:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // <- Permite carregar assets em subpastas do GitHub Pages
  plugins: [react()],
});
```

---

### Opção A: Publicação Automática via comando `gh-pages` (Recomendado)

1. No terminal do seu projeto, execute o comando de compilação:
   ```bash
   npm run build
   ```
2. Em seguida, envie os arquivos compilados para o GitHub Pages:
   ```bash
   npx gh-pages -d dist
   ```

---

### Opção B: Publicação Manual enviando os arquivos da pasta `dist`

1. Execute o comando de compilação no terminal:
   ```bash
   npm run build
   ```
   *Isso criará uma pasta chamada `dist` contendo o arquivo `index.html` compilado e a pasta `assets/` com todo o JavaScript e CSS minificados.*

2. Copie todo o **conteúdo interno da pasta `dist`** (não a pasta em si, mas o que está dentro dela) e cole na raiz do seu repositório do GitHub (ou na branch `gh-pages`).

3. No GitHub, vá nas configurações do repositório (**Settings → Pages**):
   - **Source**: Deploy from a branch
   - **Branch**: Escolha `main` ou `gh-pages`
   - **Folder**: `/ (root)`
   - Clique em **Save**.

4. Aguarde de 1 a 2 minutos e recarregue a URL do seu site:
   👉 **[https://aristidesbp.github.io/](https://aristidesbp.github.io/)**

---

## 📋 3. Resumo dos Comandos Essenciais do Terminal Linux

| Ação | Comando Terminal |
| :--- | :--- |
| **Rodar servidor local** | `npm run dev` |
| **Compilar para produção** | `npm run build` |
| **Publicar no GitHub Pages** | `npx gh-pages -d dist` |
| **Verificar erros/lint** | `npm run lint` |

---

## ✨ 4. Principais Funcionalidades do ERP_ABP

- 🏪 **Loja Virtual & Delivery de Supermercado**: Página inicial com catálogo de produtos, carrinho de compras, frete grátis, checkout com endereço de entrega e botão direto para **Área do Funcionário / Login ERP**.
- 🔐 **Portal do Funcionário & Multi-Usuário**: Login com perfis diferenciados (*Administrador*, *Operador de Caixa*, *Gerente de Estoque*, *Estoquista* e *Cliente*).
- 📷 **Leitor de Código de Barras via Câmera do Celular/PC**: Leitura de códigos SKU/EAN diretamente pela câmera nos módulos de PDV, Estoque e Financeiro.
- 💵 **Frente de Caixa (PDV)**: Lançamento de vendas, leitor de código de barras, sangria de caixa diário, e emissão/reimpressão de cupom térmico com histórico.
- 📦 **Estoque & Importação de NF-e (XML)**: Cadastro completo de produtos com foto, alertas de estoque baixo e leitura de arquivos XML de Nota Fiscal Eletrônica.
- 💰 **Financeiro & Upload de Comprovantes/Boletos**: Lançamento de receitas e despesas parceladas, baixas de pagamentos, anexos com Drag & Drop de boletos e recibos.
- 🙋 **Cadastro de Entidades**: Gerenciamento de clientes, fornecedores e colaboradores com busca por CEP automática via ViaCEP.
