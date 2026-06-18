# Documentação do Sistema de Login - Fontes Comportamentais

## 📋 Visão Geral
Este projeto consiste em uma interface de autenticação moderna e segura, desenvolvida com foco em experiência do usuário (UX) e arquitetura modular. A aplicação utiliza o Supabase como Backend-as-a-Service (BaaS) para gerenciamento de usuários.

## 🏗️ Arquitetura de Arquivos
O projeto foi refatorado para seguir o princípio de **Separação de Preocupações (SoC)**, dividindo responsabilidades entre diferentes arquivos:

1.  **`code.html`**: Contém apenas a estrutura (HTML) e a estilização (Tailwind CSS).
2.  **`supabase_config.js`**: Centraliza as credenciais e a inicialização da conexão com o banco de dados.
3.  **`login.js`**: Gerencia a lógica de interface (exibir senha, captcha visual) e as chamadas de API de autenticação.
4.  **`DESIGN.md`**: Documenta as escolhas visuais, paleta de cores e tipografia.

## 🛠️ Tecnologias Utilizadas
- **HTML5**: Estrutura semântica.
- **Tailwind CSS**: Estilização via classes utilitárias e tema customizado (Material Design 3).
- **Google Material Symbols**: Ícones vetoriais.
- **Supabase JS SDK**: Integração para autenticação via E-mail/Senha e OAuth.

## 🔐 Lógica de Autenticação
O fluxo de login segue os seguintes passos:
1.  **Validação de Campos**: O sistema verifica se e-mail e senha foram preenchidos.
2.  **Validação de Captcha**: Verifica se o componente visual de "Não sou um robô" foi acionado.
3.  **Chamada Supabase**:
    - Utiliza o método `auth.signInWithPassword` para credenciais padrão.
    - Utiliza `auth.signInWithOAuth` para login social via Google.
4.  **Redirecionamento**: Em caso de sucesso, o usuário é enviado para a `index.html`.

## 🚀 Como Configurar
Para que o sistema funcione em outro ambiente:
1. Obtenha as chaves `SUPABASE_URL` e `SUPABASE_ANON_KEY` no painel do Supabase.
2. Insira-as no arquivo `supabase_config.js`.
3. Certifique-se de que a ordem dos scripts no `code.html` seja mantida (Biblioteca -> Configuração -> Lógica).
