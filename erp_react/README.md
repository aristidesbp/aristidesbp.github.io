# Supermercado ABP - Manual do Sistema, Arquitetura e Guia do Desenvolvedor

Documentação técnica oficial, mapa estrutural e manual de referência para o ecossistema **Supermercado ABP**: Sistema Integrado ERP, Frente de Caixa (PDV), Controle de Estoque com Importação de NF-e, Módulo Financeiro, Cadastro de Entidades, Gestão de Entregas (Delivery), Loja Virtual (E-Commerce), Central de Relatórios/Extratos, Autenticação de Usuários SaaS Multi-Loja e Integração de Pagamentos com Mercado Pago.

---

## 📌 Índice
1. [Visão Geral e Propósito do Sistema](#-1-visão-geral-e-propósito-do-sistema)
2. [Ciclo de Vida do Sistema (Fluxo Operacional)](#-2-ciclo-de-vida-do-sistema-fluxo-operacional)
3. [Segurança, Autenticação SaaS e Controle de Acesso (RBAC)](#-3-segurança-autenticação-saas-e-controle-de-acesso-rbac)
4. [Regras de Negócio Detalhadas e Convenções Globais](#-4-regras-de-negócio-detalhadas-e-convenções-globais)
5. [Arquitetura e Stack Tecnológica](#-5-arquitetura-e-stack-tecnológica)
6. [Estrutura Completa de Pastas e Arquivos](#-6-estrutura-completa-de-pastas-e-arquivos)
   - [Mapeamento da Raiz do Projeto](#-raiz-do-projeto)
   - [Mapeamento do Diretório `/src/lib/`](#-diretório-srclib-serviços-e-utilitários)
   - [Mapeamento do Diretório `/src/types/`](#-diretório-srctypes-tipagem-typescript)
   - [Mapeamento do Diretório `/src/context/`](#-diretório-srccontext-estado-global)
   - [Mapeamento dos Componentes (`/src/components/`)](#-diretório-srccomponentes-interfaces-de-usuário)
7. [Detalhamento Módulo a Módulo](#-7-detalhamento-módulo-a-módulo)
8. [Manual do Desenvolvedor: Guia de Expansão de Funcionalidades](#-8-manual-do-desenvolvedor-guia-de-expansão-de-funcionalidades)
9. [Instalação, Execução Local e Deploy no GitHub Pages](#-9-instalação-execução-local-e-deploy-no-github-pages)

---

## 🏢 1. Visão Geral e Propósito do Sistema

O **Supermercado ABP** é um ecossistema completo de gestão comercial projetado para operação híbrida (*Offline-First* e Sincronização em Nuvem) e modelo **SaaS Multi-Loja (Multi-Tenant)**. Ele une a agilidade necessária no ambiente físico de supermercado a uma experiência moderna de compras online para o consumidor final.

### Principais Pilares do Sistema:
- **Autenticação Segura & Isolamento Multi-Loja (SaaS)**: Validação real de e-mail e senha. Cada conta possui um identificador de loja (`store_id`), garantindo que administradores e funcionários vejam estritamente seus próprios produtos, clientes, vendas e relatórios.
- **Controle de Acesso por Competência (RBAC)**: O acesso às abas do ERP é condicionado à função do usuário logado (`admin`, `caixa`, `gerente`, `estoquista`, `cliente`).
- **Operação Híbrida Inteligente**: Funciona 100% sem internet usando o banco local do navegador (**IndexedDB**). Quando a conexão é restabelecida, realiza sincronização bidirecional automática com o **Supabase**.
- **Identidade Unificada**: O título da aplicação no navegador (`document.title`) e os cabeçalhos de cupons e relatórios assumem dinamicamente o **Nome de Fantasia do Supermercado** configurado no Perfil da Loja.
- **Rastreabilidade e Padronização (`SITE-#`)**: Todos os pedidos do e-commerce, cupons do PDV e entregas geram códigos únicos padronizados com o prefixo `SITE-#` (ex: `SITE-9A4F2C`).
- **Checkout Interativo Mercado Pago**: Processamento de pagamentos digitais via PIX (QR Code e Copia e Cola dinâmicos), Cartão de Crédito e Boleto Bancário.

---

## 🔄 2. Ciclo de Vida do Sistema (Fluxo Operacional)

O ciclo de vida do ecossistema abrange todas as fases operacionais de uma empresa de supermercado SaaS, desde o onboarding da empresa até o fechamento de caixa e auditoria de relatórios:

```
[1. Onboarding & Cadastro SaaS] ──> [2. Entrada de Estoque / XML NF-e] ──> [3. Abertura do Turno de Caixa]
                                                                                      │
                                                                                      ▼
[6. Fechamento de Caixa & Audit] <── [5. Gestão de Entregas / Delivery] <── [4. Processamento de Venda (PDV/Site)]
                                            │
                                            ▼
                             [Sincronização em Nuvem (Offline/Supabase)]
```

### 🔁 Detalhamento das 7 Fases do Ciclo de Vida:

1. **Fase 1: Onboarding, Autenticação e Configuração Tenant (SaaS)**
   - O proprietário realiza o cadastro na aba de Login Modal selecionando "Realizar Cadastro".
   - É criado um identificador único de loja (`store_id`), isolando os dados da empresa.
   - O administrador define o Nome de Fantasia, CNPJ, Telefone e Rodapé do Cupom.
   - O sistema atualiza dinamicamente o `document.title` da aba do navegador para o nome da empresa cadastrada.

2. **Fase 2: Gestão de Estoque, Cadastro e Importação de XML NF-e**
   - O gerente ou estoquista cadastra produtos manualmente ou realiza importação em lote via arquivo XML de NF-e.
   - O `nfeParser` extrai dados da Nota Fiscal, cadastra o Fornecedor no módulo de Entidades, insere/atualiza os itens no estoque e calcula a margem de lucro com base nos valores unitários de compra.
   - O sistema monitora as quantidades e gera alertas visuais para itens abaixo do estoque mínimo.

3. **Fase 3: Abertura e Gestão do Turno de Caixa**
   - Na abertura do expediente, o operador de caixa ou gerente acessa o Módulo Financeiro e realiza a **Abertura do Turno de Caixa**, definindo o valor inicial de suprimento (fundo de troco).
   - O turno ganha o status `aberto` e fica associado ao usuário e loja logada.
   - Durante a jornada, o operador pode realizar **Sangrias de Caixa** registrando motivo e valor retirado.

4. **Fase 4: Processamento de Vendas (PDV Físico & E-Commerce Delivery)**
   - **No PDV Físico**: O operador bipa produtos com scanner/câmera, concede descontos, seleciona a forma de pagamento (Dinheiro, PIX/Mercado Pago, Cartão, Fiado/A Prazo) e finaliza a venda.
   - **Na Loja Virtual**: O cliente escolhe itens no e-commerce, preenche o endereço de entrega e realiza o pagamento via Mercado Pago ou opta por pagar na entrega.
   - **Geração de Código Único**: Toda venda do PDV e pedido do e-commerce recebe um código padronizado `SITE-#` (ex: `SITE-A8F290`).
   - **Abatimento em Estoque**: A quantidade vendida é imediatamente subtraída do estoque local em IndexedDB.

5. **Fase 5: Execução e Controle de Entregas (Delivery)**
   - Pedidos de entrega oriundos do PDV ou do E-Commerce são enfileirados na Central de Entregas (`DeliveriesView.tsx`).
   - A equipe atualiza o status operacional do pedido: `Pendente` ➔ `Em Preparo` ➔ `Saiu para Entrega` ➔ `Entregue` (ou `Cancelado`).
   - Atribuição do nome do entregador/motoboy responsável e impressão do comprovante de entrega com código `SITE-#` e carimbo de data/hora.

6. **Fase 6: Operação Offline-First e Sincronização em Nuvem**
   - Todas as operações são gravadas no banco de dados local do navegador (**IndexedDB**).
   - Se houver conexão com a internet (`isOnline = true`), o `syncService` transmite os dados ao **Supabase** e recebe atualizações de outros terminais em tempo real.
   - Se a conexão cair, o sistema continua operando normalmente offline; ao reconectar, a fila de sincronização descarrega os registros pendentes automaticamente.

7. **Fase 7: Fechamento de Turno, Extrato Financeiro e Auditoria de Relatórios**
   - Ao final da jornada, o operador faz a contagem física do dinheiro e executa o **Fechamento do Turno de Caixa**.
   - O gestor acessa a **Central de Relatórios e Extratos (`ReportsView.tsx`)** para filtrar vendas por período (7d, mês, customizado), analisar o faturamento por categoria de produto, consultar o ranking de mais vendidos e exportar relatórios em CSV, TXT ou PDF/Impressão.

---

## 🔒 3. Segurança, Autenticação SaaS e Controle de Acesso (RBAC)

### 3.1 Mapeamento de Permissões por Cargo (`ROLE_TAB_PERMISSIONS`)

O acesso aos módulos é configurado rigorosamente em `src/types/index.ts`:

```typescript
export const ROLE_TAB_PERMISSIONS: Record<UserRole, string[]> = {
  admin: [
    'ecommerce', 'deliveries', 'chat', 'dashboard', 'pdv',
    'sales_history', 'inventory', 'entities', 'financial',
    'reports', 'settings', 'tutorial',
  ],
  caixa: ['ecommerce', 'pdv', 'sales_history', 'deliveries'],
  gerente: ['ecommerce', 'deliveries', 'inventory', 'entities', 'reports', 'pdv', 'sales_history'],
  estoquista: ['ecommerce', 'inventory', 'deliveries'],
  cliente: ['ecommerce', 'chat'],
};
```

### 3.2 Cadastro de Novos Usuários e Colaboradores
O cadastro pode ser realizado de duas formas:
1. **Pela Aba de Login Modal ("Realizar Cadastro")**: Qualquer novo proprietário de loja pode se cadastrar criando uma nova tenant/loja com `store_id` próprio e acesso `admin`.
2. **Pelo Módulo de Entidades (`EntitiesView.tsx`)**: O Administrador da loja pode cadastrar um **Colaborador** definindo seu E-mail, Cargo e Senha. O sistema registra automaticamente a conta de acesso vinculada à mesma loja (`store_id`).

---

## 📐 4. Regras de Negócio Detalhadas e Convenções Globais

Ao modificar ou expandir o sistema, as seguintes regras de negócio devem ser mantidas rigorosamente:

### 4.1 Regras de Isolamento Multi-Loja (SaaS Tenant Isolation)
- Cada entidade de dados (`Product`, `Sale`, `Entity`, `Finance`, `EcommerceOrder`) obrigatoriamente armazena a propriedade `store_id`.
- O estado global do `AppContext.tsx` aplica filtros automáticos para garantir que um usuário logado visualize **apenas os registros pertencentes à sua loja (`activeTenantId`)**.

### 4.2 Regras de Autenticação e Credenciais
- A autenticação é validada comparando e-mail e senha informados contra o repositório de usuários registrados (`getRegisteredUsers()`) e/ou Supabase Auth.
- Senhas incorretas disparam mensagens explicativas ao usuário em vez de falhas genéricas.
- Ao cadastrar um funcionário no Módulo de Entidades com o tipo `colaborador`, definir o e-mail e senha registra automaticamente esse colaborador como usuário autenticável do ERP.

### 4.3 Regras de Acesso e Navegação (RBAC)
- A barra de navegação (`Navigation.tsx`) e as rotas de exibição (`App.tsx`) só disponibilizam abas autorizadas no mapeamento `ROLE_TAB_PERMISSIONS`.
- Se um usuário tentar acessar uma URL ou aba não permitida para o seu perfil, o sistema exibe a tela de aviso **"Sem Permissão para este Módulo"** com um botão direto para redirecioná-lo à sua área de competência.

### 4.4 Regras de Codificação e Formatação Unificada
- **Códigos Rastreáveis (`SITE-#`)**: Todos os códigos de cupom, venda e entrega passam pela função `formatSiteOrderCode()`, resultando em identificadores maiúsculos com prefixo `SITE-` (ex: `SITE-9A4F2C`).
- **Nomenclatura Padrão de Comprovantes**: Arquivos TXT de comprovante baixados ou impressos são nomeados rigorosamente com a data e hora do evento:
  `Comprovante_[Nome_Loja]_[SITE-#]_[AAAA-MM-DD_HH-mm].txt`.
- **Formatação Monetária**: Todos os valores exibidos na interface usam o padrão brasileiro `R$ 0,00` via `formatCurrency()`.

### 4.5 Regras de Movimentação e Alerta de Estoque
- **Débito Automático**: Ao confirmar uma venda no PDV ou pedido no e-commerce, o estoque dos itens envolvidos é imediatamente subtraído.
- **Estorno em Cancelamentos**: Ao cancelar uma venda ou pedido, o sistema estorna automaticamente as quantidades para o estoque do produto.
- **Estoque Crítico**: Produtos com `estoque <= estoque_minimo` recebem destaque visual na cor vermelha e contabilizam na métrica de "Estoque Baixo" do Dashboard.

### 4.6 Regras de Sangria e Turno de Caixa
- Não é permitido processar vendas no PDV sem que um turno de caixa esteja atualmente **aberto**.
- Toda sangria reduz imediatamente o saldo em dinheiro disponível no caixa ativo e registra um lançamento automático de despesa no Módulo Financeiro.

### 4.7 Regras de Pagamento Integrado (Mercado Pago)
- Transações via PIX geram payload oficial com chave Copia e Cola e imagem de QR Code dinâmico com timer de validade de 15 minutos.
- A venda é registrada com os detalhes do ID de transação e forma de pagamento correspondente.

---

## 🛠️ 5. Arquitetura e Stack Tecnológica

O projeto foi construído utilizando as seguintes linguagens, bibliotecas e padrões de mercado:

| Categoria | Tecnologia | Utilização / Função no Projeto |
| :--- | :--- | :--- |
| **Linguagem Base** | **TypeScript 5.8** | Tipagem estática rigorosa para prevenir erros em tempo de desenvolvimento. |
| **Biblioteca de UI** | **React 19** | Construção de componentes funcionais reativos baseados em Hooks. |
| **Bundler & Dev Server** | **Vite 6** | Compilação ultra-rápida, Hot Module Replacement (HMR) e empacotamento para produção. |
| **Estilização** | **Tailwind CSS v4** | Framework CSS utilitário para design responsivo (desktop, tablet e mobile) e suporte a Dark Mode. |
| **Ícones** | **Lucide React** | Biblioteca de ícones vetoriais leves e padronizados para a interface. |
| **Animações** | **Motion (Framer Motion)** | Transições suaves entre abas, modais e elementos interativos. |
| **Persistência Local** | **IndexedDB (via `idb`)** | Armazenamento de dados no navegador com suporte a arquivos em base64 e buscas rápidas offline. |
| **Banco em Nuvem** | **@supabase/supabase-js** | Banco PostgreSQL em nuvem para sincronização remota entre múltiplos terminais. |
| **Leitor Barcode/QR** | **html5-qrcode** | Acesso à câmera do celular ou computador para leitura de códigos de barra SKU/EAN. |
| **Parser XML NF-e** | **DOMParser Nativo** | Leitura e conversão automática de arquivos XML de Nota Fiscal Eletrônica (NF-e). |
| **Integração de Pagamento**| **Mercado Pago API** | Geração e validação de pagamentos virtuais via PIX, Cartão e Boleto. |

---

## 📐 3. Regras de Negócio e Convenções Globais

Ao adicionar novos recursos ao sistema, mantenha rigorosamente estas premissas arquiteturais:

1. **Atualização Dinâmica do Título da Aba**:
   No `AppContext.tsx`, existe um `useEffect` que observa `storeConfig.store_name`. Sempre que o usuário altera o Nome de Fantasia da loja nas Configurações, o `document.title` do navegador é atualizado imediatamente.
2. **Formatação de Códigos e Comprovantes (`sanitizer.ts`)**:
   - `formatSiteOrderCode(id)`: Converte qualquer UUID ou código numérico no formato padronizado `SITE-XXXXXX`.
   - `formatTimestampFilename(date)`: Gera a string de data/hora no formato `AAAA-MM-DD_HH-mm` para anexar ao nome dos arquivos baixados.
   - `formatCurrency(value)`: Formata valores numéricos para o padrão monetário brasileiro `R$ 0,00`.
   - `formatDateTimeBR(dateStr)` e `formatDateBR(dateStr)`: Exibição de datas no formato `DD/MM/AAAA HH:mm`.
3. **Persistência Híbrida**:
   Toda gravação de dados deve ser direcionada primeiramente ao `idb` (IndexedDB). Em seguida, chama-se o `syncService` para enviar a alteração ao Supabase se houver conexão à internet.
4. **Respeito aos Papéis de Usuário (`UserRole`)**:
   - `admin`: Acesso irrestrito a todas as áreas e configurações.
   - `caixa`: Acesso focado no PDV, Histórico de Vendas e Controle de Caixa.
   - `gerente_estoque` / `estoquista`: Acesso focado no Cadastro de Produtos, Importação de NF-e e Entregas.
   - `cliente`: Acesso restrito ao E-Commerce, Carrinho de Compras e Atendimento/Chat.

---

## 📁 4. Estrutura Completa de Pastas e Arquivos

Abaixo está o mapeamento de **todos os arquivos do projeto**, detalhando o objetivo, responsabilidade e tarefa de cada um.

```
/
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── README.md
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── types/
    │   └── index.ts
    ├── context/
    │   └── AppContext.tsx
    ├── lib/
    │   ├── mercadoPagoService.ts
    │   ├── nfeParser.ts
    │   ├── offlineDb.ts
    │   ├── sanitizer.ts
    │   ├── supabase.ts
    │   └── syncService.ts
    └── components/
        ├── chat/
        │   └── CustomerChatView.tsx
        ├── common/
        │   ├── LoginModal.tsx
        │   ├── Navigation.tsx
        │   ├── ReceiptModal.tsx
        │   └── ScannerModal.tsx
        ├── dashboard/
        │   └── DashboardView.tsx
        ├── deliveries/
        │   └── DeliveriesView.tsx
        ├── ecommerce/
        │   └── EcommerceView.tsx
        ├── entities/
        │   └── EntitiesView.tsx
        ├── financial/
        │   └── FinancialView.tsx
        ├── inventory/
        │   └── InventoryView.tsx
        ├── payment/
        │   └── MercadoPagoModal.tsx
        ├── pdv/
        │   ├── POSView.tsx
        │   └── SalesHistoryView.tsx
        ├── reports/
        │   └── ReportsView.tsx
        ├── settings/
        │   └── SettingsView.tsx
        └── tutorial/
            └── TutorialView.tsx
```

---

### 📄 Raiz do Projeto

| Arquivo / Pasta | Responsabilidade / Tarefa Principal |
| :--- | :--- |
| `index.html` | Ponto de entrada HTML servido no navegador. Contém a tag `<title>Supermercado ABP</title>` e a div `#root`. |
| `package.json` | Gerenciador de dependências, scripts de execução (`dev`, `build`, `preview`, `lint`) e bibliotecas registradas. |
| `vite.config.ts` | Configuração do compilador Vite. Define o plugin React e `base: './'` para garantir compatibilidade com o GitHub Pages. |
| `tsconfig.json` | Define parâmetros do compilador TypeScript (módulos, caminhos, verificação de tipos sem emissão de código). |
| `.env.example` | Documentação das variáveis de ambiente necessárias (`APP_URL`, `SUPABASE_URL`, `MERCADO_PAGO_PUBLIC_KEY`, etc.). |
| `README.md` | Manual de instrução, arquitetura, mapeamento de arquivos e guia do desenvolvedor (este documento). |

---

### 🔧 Diretório `/src/lib/` (Serviços e Utilitários)

| Arquivo | Responsabilidade / Tarefa Principal |
| :--- | :--- |
| `offlineDb.ts` | **Banco de Dados Local (IndexedDB)**. Inicializa o banco de dados `ERP_ABP_OfflineDB` com 8 Object Stores (`products`, `sales`, `entities`, `finances`, `ecommerce_orders`, `chat_messages`, `cash_shifts`, `comprovantes`). Exporta funções assíncronas CRUD para leitura e gravação local offline. |
| `sanitizer.ts` | **Utilitários de Higienização e Formatação**. Fornece `formatCurrency` (moeda R$), `formatSiteOrderCode` (código `SITE-#`), `formatTimestampFilename` (data/hora no nome de arquivos baixados), `formatDateTimeBR`, `formatDateBR` e `escapeHtml` para segurança contra XSS. |
| `supabase.ts` | **Cliente Supabase e Detecção de Rede**. Instancia o cliente `@supabase/supabase-js` com credenciais dinâmicas do localStorage ou ambiente. Verifica se o backend Supabase está acessível e gerencia o status `isOnline`. |
| `syncService.ts` | **Motor de Sincronização Bidirecional**. Compara dados do IndexedDB local com o Supabase. Envia alterações pendentes geradas offline e baixa novos registros salvos em nuvem por outros terminais. |
| `nfeParser.ts` | **Parser de XML de Nota Fiscal Eletrônica**. Lê a estrutura do XML da NF-e (tags `<infNfe>`, `<det>`, `<prod>`, `<vUnCom>`), extrai dados de produtos, fornecedores e valores, permitindo importação em lote para o estoque. |
| `mercadoPagoService.ts` | **Integração com Mercado Pago**. Gerencia chaves (`Public Key` e `Access Token`), simula ou executa requisições de pagamento via PIX (com QR Code base64 e chave Copia e Cola), Cartão de Crédito e Boleto com status em tempo real. |

---

### 🏷️ Diretório `/src/types/` (Tipagem TypeScript)

| Arquivo | Responsabilidade / Tarefa Principal |
| :--- | :--- |
| `index.ts` | **Central de Interfaces e Enums**. Contém a definição estrita de todos os tipos do sistema: `Product`, `Sale`, `SaleItem`, `Finance`, `Entity`, `EcommerceOrder`, `ChatMessage`, `CashShift`, `StoreConfig`, `MercadoPagoConfig`, `PaymentMethod`, `UserRole`, `EcommerceOrderStatus` e `DeliveryAddress`. |

---

### 🧠 Diretório `/src/context/` (Estado Global)

| Arquivo | Responsabilidade / Tarefa Principal |
| :--- | :--- |
| `AppContext.tsx` | **Provedor Global do React Context (`useApp()`)**. Mantém o estado reativo em memória de todos os produtos, vendas, finanças, entidades, pedidos delivery, chat, turno de caixa ativo e configurações da loja. Expõe funções como `processSale`, `addProduct`, `updateProduct`, `openShift`, `closeShift`, `triggerSync`, `saveStoreConfig` e atualiza dinamicamente o `document.title`. |

---

### 💻 Diretório `/src/components/` (Interfaces de Usuário)

#### 🔹 Subpasta `common/` (Componentes Genéricos / Modais)
- `Navigation.tsx`: Barra de navegação superior responsiva com alternância de abas, indicador de status online/offline, botão de sincronização manual e atalho de login/logout.
- `LoginModal.tsx`: Modal de login de operador com seleção de papéis (*Administrador*, *Operador de Caixa*, *Gerente de Estoque*, *Estoquista*, *Cliente*) e senha.
- `ReceiptModal.tsx`: Modal de visualização e emissão do Cupom Não Fiscal (térmico de 80mm). Exibe dados do supermercado, código `SITE-#`, itens, totais, forma de pagamento e possui botão de **Download Comprovante TXT** no formato `Comprovante_[Loja]_[SITE-#]_[Data_Hora].txt` e impressão direta.
- `ScannerModal.tsx`: Modal interativo com a câmera do dispositivo para leitura ao vivo de códigos de barra (EAN-13, SKU) e acionamento de ações automáticas.

#### 🔹 Subpasta `ecommerce/`
- `EcommerceView.tsx`: Vitrine da Loja Virtual Delivery para o consumidor final. Apresenta busca por texto, filtro por categoria, frete grátis, carrinho de compras com ajuste de quantidades, formulário de checkout com endereço de entrega, opção de pagamento via Mercado Pago e envio direto ao WhatsApp da loja.

#### 🔹 Subpasta `pdv/`
- `POSView.tsx`: Terminal da Frente de Caixa (PDV). Permite leitura de código de barras via câmera/scanner, busca rápida de produtos, controle de desconto, opção de inclusão de entrega/delivery, seleção da forma de pagamento (incluindo atalhos Mercado Pago PIX, Cartão e Boleto) e sangria de caixa diária.
- `SalesHistoryView.tsx`: Histórico completo de vendas efetuadas no PDV com filtro de busca por cliente/código `SITE-#` e reimpressão de 2ª via do cupom.

#### 🔹 Subpasta `deliveries/`
- `DeliveriesView.tsx`: Central de Gestão de Entregas e Delivery. Agrupa pedidos vindos da Loja Virtual e do PDV. Permite alterar status (*Pendente*, *Em Preparo*, *Saiu para Entrega*, *Entregue*, *Cancelado*), atribuir motoboy e emitir/baixar comprovante de entrega com código `SITE-#` e data/hora.

#### 🔹 Subpasta `inventory/`
- `InventoryView.tsx`: Módulo de Estoque e Produtos. Permite inclusão, edição e exclusão de itens, atualização de fotos em base64/URL, alertas visuais de estoque baixo, cálculo automático de margem de lucro (%) e importação em massa via upload de XML de NF-e.

#### 🔹 Subpasta `financial/`
- `FinancialView.tsx`: Gestão Financeira e Caixas. Lançamento de receitas e despesas com categoria e parcelamento, upload e visualização de anexos (boletos/recibos em PDF/imagem), controle de abertura, sangria e fechamento de turnos de caixa com balanço em tempo real.

#### 🔹 Subpasta `entities/`
- `EntitiesView.tsx`: Cadastro unificado de Clientes, Fornecedores e Colaboradores. Possui busca automática de endereço pelo CEP utilizando a API pública do ViaCEP.

#### 🔹 Subpasta `dashboard/`
- `DashboardView.tsx`: Painel executivo de indicadores (KPIs). Exibe faturamento do dia, quantidade de vendas, produtos com estoque crítico, vendas por categoria e histórico recente.

#### 🔹 Subpasta `reports/`
- `ReportsView.tsx`: **Central de Relatórios e Extratos de Gestão**. Apresenta um painel de controle com filtros universais por **Período (Data Inicial / Final e atalhos de 7d, Mês, 30d, Tudo)**, **Categoria de Produto**, **Forma de Pagamento** e **Busca Rápida**. Navegação estruturada em 4 sub-abas:
  1. *Extrato Geral Consolidado*: Tabela completa de transações com códigos `SITE-#`, indicação visual de entradas/saídas e botão direto para o comprovante.
  2. *Vendas por Categoria*: Gráfico de barras de progresso comparando o faturamento e volume de cada categoria.
  3. *Produtos Mais Vendidos*: Ranking ordinal dos itens de maior faturamento com estoque atual.
  4. *Formas de Pagamento*: Cards comparativos com a porcentagem de participação de cada meio de pagamento no faturamento total.
  - Botões de exportação em **CSV**, **Relatório Completo TXT** e **Impressão/PDF**.

#### 🔹 Subpasta `payment/`
- `MercadoPagoModal.tsx`: Checkout interativo do Mercado Pago. Apresenta abas para PIX (gerando QR Code dinâmico visual e código Copia e Cola com timer de 15 minutos), Cartão de Crédito e Boleto Bancário, simulando aprovação instantânea ao clicar em "Confirmar Pagamento".

#### 🔹 Subpasta `settings/`
- `SettingsView.tsx`: Configurações Gerais. Permite editar o **Perfil do Supermercado (Nome de Fantasia, Razão Social, CNPJ, Endereço, Telefone, Rodapé do Cupom)**, credenciais do Supabase, chaves do Mercado Pago (Public Key, Access Token) com botão de teste de conexão, backup/restauração em JSON do banco local e limpeza total do IndexedDB.

#### 🔹 Subpasta `chat/`
- `CustomerChatView.tsx`: Canal de atendimento em tempo real entre os clientes da Loja Virtual e os operadores do ERP.

#### 🔹 Subpasta `tutorial/`
- `TutorialView.tsx`: Central de treinamento interno com passo a passo para operadores de caixa, administradores, instruções de deploy no GitHub Pages e resolução do problema de "Tela Branca".

---

## ⚙️ 5. Detalhamento Módulo a Módulo

### 🛒 5.1 E-Commerce & Delivery
- **Objetivo**: Proporcionar uma vitrine online agradável para o consumidor final fazer compras no supermercado pelo celular ou computador.
- **Responsabilidade**: Exibir catálogo atualizado de produtos com preços e fotos, gerenciar carrinho de compras, calcular taxas de frete, coletar dados do cliente e registrar o pedido como `delivery` com código `SITE-#`.

### 💵 5.2 Frente de Caixa (PDV)
- **Objetivo**: Permitir vendas rápidas no balcão/caixa físico do supermercado.
- **Responsabilidade**: Suportar bipagem de código de barras (EAN-13), aplicar descontos, solicitar dados para entrega se necessário, processar pagamentos (Dinheiro, PIX, Cartão, Mercado Pago, Fiado), registrar sangria de caixa e emitir cupom não fiscal imediato.

### 📄 5.3 Central de Relatórios e Extratos (`ReportsView.tsx`)
- **Objetivo**: Dar ao gestor total visibilidade do desempenho financeiro e operacional da loja.
- **Responsabilidade**: Filtrar dinamicamente todas as vendas e lançamentos por intervalo de datas, categorias de produtos e formas de pagamento. Permitir auditoria de extrato com códigos `SITE-#` e exportação limpa de dados.

### 💳 5.4 Integrador Mercado Pago (`MercadoPagoModal.tsx` / `mercadoPagoService.ts`)
- **Objetivo**: Oferecer pagamentos digitais seguros sem necessidade de maquininha física no caixa.
- **Responsabilidade**: Comunicar-se com as credenciais cadastradas, gerar payloads de pagamento PIX com chave Copia e Cola, simular aprovação e vincular o ID de aprovação à venda no sistema.

---

## 🛠️ 6. Manual do Desenvolvedor: Guia de Expansão de Funcionalidades

Para incluir uma nova funcionalidade ou campo no sistema sem desorganizar o código existente, siga este roteiro estruturado em **6 Passos**:

### 🔹 Passo 1: Atualizar a Interface em `/src/types/index.ts`
Adicione o novo campo ou nova interface no arquivo de tipos globais.
*Exemplo*: Adicionar campo `codigo_ncm` à interface `Product`:
```typescript
// src/types/index.ts
export interface Product {
  id: string;
  nome: string;
  codigo_ncm?: string; // <- NOVO CAMPO
  // ...demais campos
}
```

### 🔹 Passo 2: Atualizar o Schema no IndexedDB (`/src/lib/offlineDb.ts`)
Se for criar uma nova tabela/ObjectStore ou índice de busca, atualize a versão do banco em `offlineDb.ts`:
```typescript
// src/lib/offlineDb.ts
const db = await openDB(DB_NAME, 2, { // Incremente a versão do DB se criar ObjectStore
  upgrade(db) {
    if (!db.objectStoreNames.contains('nova_tabela')) {
      db.createObjectStore('nova_tabela', { keyPath: 'id' });
    }
  }
});
```

### 🔹 Passo 3: Adicionar Estado e Regras de Negócio em `/src/context/AppContext.tsx`
Crie o estado reativo no Contexto e exporte a função CRUD correspondente:
```typescript
// src/context/AppContext.tsx
const [novosDados, setNovosDados] = useState<MeuTipo[]>([]);

const addNovoDado = async (item: MeuTipo) => {
  await idbSaveNovoDado(item);
  setNovosDados((prev) => [item, ...prev]);
  if (isOnline) {
    await syncService.uploadNovoDado(item);
  }
};
```

### 🔹 Passo 4: Atualizar o Motor de Sincronização (`/src/lib/syncService.ts`)
Garantir que a nova funcionalidade seja enviada ao Supabase quando houver conexão à internet.

### 🔹 Passo 5: Criar a View ou Componente em `/src/components/`
Crie o arquivo do componente com Tailwind CSS e ícones do `lucide-react`. Use sempre as funções utilitárias de `/src/lib/sanitizer.ts` (`formatCurrency`, `formatSiteOrderCode`, `formatTimestampFilename`).

### 🔹 Passo 6: Registrar a Nova Aba no `App.tsx` e `Navigation.tsx`
1. Em `src/components/common/Navigation.tsx`, inclua a nova aba na lista `navItems`:
```typescript
{ id: 'minha_aba', label: 'Minha Nova Aba', icon: IconeLucide, requiresAuth: true }
```
2. Em `src/App.tsx`, adicione o componente condicional no render do painel:
```typescript
{activeTab === 'minha_aba' && <MinhaNovaAbaView />}
```

---

## 🗄️ Script SQL do Supabase (Criação de Tabelas, RLS e Estrutura Completa)

Copie e cole todo o código SQL abaixo no **SQL Editor** do seu painel Supabase para criar todas as tabelas, índices de desempenho e políticas de segurança RLS necessárias para a operação do sistema:

```sql
-- ==============================================================================
-- SCRIPT COMPLETO DE CONFIGURAÇÃO DO BANCO DE DADOS SUPABASE (SaaS ERP ABP)
-- Copie e cole este script no Editor SQL do seu painel Supabase (SQL Editor)
-- ==============================================================================

-- 1. EXTENSÃO PARA UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABELA DE ENTIDADES (Clientes, Fornecedores, Colaboradores)
CREATE TABLE IF NOT EXISTS public.entidades (
    id TEXT PRIMARY KEY DEFAULT ('ent_' || gen_random_uuid()),
    store_id TEXT NOT NULL DEFAULT 'tenant_default',
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    nome_completo TEXT NOT NULL,
    cpf_cnpj TEXT,
    cpf TEXT,
    data_nascimento DATE,
    email TEXT,
    telefone TEXT,
    tipo_entidade TEXT NOT NULL DEFAULT 'cliente', -- 'cliente', 'fornecedor', 'colaborador'
    status_entidade TEXT NOT NULL DEFAULT 'ativo', -- 'ativo', 'inativo'
    tipo_acesso TEXT DEFAULT 'cliente',
    avaliacao INTEGER DEFAULT 5,
    bio TEXT,
    avatar_url TEXT,
    limite_credito NUMERIC(10,2) DEFAULT 0.00,
    saldo_devedor NUMERIC(10,2) DEFAULT 0.00,
    cep TEXT,
    logradouro TEXT,
    numero TEXT,
    complemento TEXT,
    bairro TEXT,
    cidade TEXT,
    estado VARCHAR(2),
    foto_url TEXT,
    cargo_role TEXT,
    senha_acesso TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. TABELA DE PRODUTOS (Estoque)
CREATE TABLE IF NOT EXISTS public.produtos (
    id TEXT PRIMARY KEY DEFAULT ('prod_' || gen_random_uuid()),
    store_id TEXT NOT NULL DEFAULT 'tenant_default',
    nome TEXT NOT NULL,
    codigo_barras TEXT,
    categoria TEXT DEFAULT 'Geral',
    unidade TEXT DEFAULT 'UN',
    unidade_medida TEXT DEFAULT 'UN',
    preco_custo NUMERIC(10,2) DEFAULT 0.00,
    preco_venda NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    quantidade_estoque INTEGER NOT NULL DEFAULT 0,
    estoque_minimo INTEGER DEFAULT 5,
    descricao TEXT,
    foto_url TEXT,
    ncm TEXT,
    cest TEXT,
    cfop_entrada TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. TABELA DE VENDAS (PDV e E-commerce)
CREATE TABLE IF NOT EXISTS public.vendas (
    id TEXT PRIMARY KEY DEFAULT ('venda_' || gen_random_uuid()),
    store_id TEXT NOT NULL DEFAULT 'tenant_default',
    entidade_id TEXT REFERENCES public.entidades(id) ON DELETE SET NULL,
    entidade_nome TEXT,
    valor_total NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    desconto NUMERIC(10,2) DEFAULT 0.00,
    valor_liquido NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    forma_pagamento TEXT NOT NULL DEFAULT 'Dinheiro',
    status TEXT NOT NULL DEFAULT 'concluida', -- 'concluida', 'cancelada'
    origem TEXT DEFAULT 'pdv', -- 'pdv', 'ecommerce'
    is_entrega BOOLEAN DEFAULT false,
    status_entrega TEXT, -- 'novo', 'preparando', 'caminho', 'entregue', 'cancelado'
    cliente_nome TEXT,
    cliente_telefone TEXT,
    cliente_endereco TEXT,
    observacoes_entrega TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. TABELA DE ITENS DA VENDA
CREATE TABLE IF NOT EXISTS public.itens_venda (
    id TEXT PRIMARY KEY DEFAULT ('item_' || gen_random_uuid()),
    venda_id TEXT NOT NULL REFERENCES public.vendas(id) ON DELETE CASCADE,
    produto_id TEXT REFERENCES public.produtos(id) ON DELETE SET NULL,
    produto_nome TEXT,
    codigo_barras TEXT,
    unidade TEXT,
    quantidade INTEGER NOT NULL DEFAULT 1,
    preco_unitario NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    subtotal NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. TABELA DE FINANÇAS (Contas a Pagar e Receber)
CREATE TABLE IF NOT EXISTS public.financas (
    id TEXT PRIMARY KEY DEFAULT ('fin_' || gen_random_uuid()),
    store_id TEXT NOT NULL DEFAULT 'tenant_default',
    entidade_id TEXT REFERENCES public.entidades(id) ON DELETE SET NULL,
    entidade_nome TEXT,
    descricao TEXT NOT NULL,
    tipo TEXT NOT NULL DEFAULT 'despesa', -- 'receita', 'despesa'
    categoria TEXT DEFAULT 'Geral',
    valor_total NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    num_parcelas INTEGER DEFAULT 1,
    status_lancamento TEXT DEFAULT 'aberto', -- 'aberto', 'finalizado', 'cancelado'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. TABELA DE PARCELAS
CREATE TABLE IF NOT EXISTS public.parcelas (
    id TEXT PRIMARY KEY DEFAULT ('parc_' || gen_random_uuid()),
    financa_id TEXT NOT NULL REFERENCES public.financas(id) ON DELETE CASCADE,
    num_parcela INTEGER NOT NULL DEFAULT 1,
    total_parcelas INTEGER DEFAULT 1,
    valor_parcela NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    status TEXT NOT NULL DEFAULT 'pendente', -- 'pendente', 'pago', 'atrasado', 'cancelado'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 8. ÍNDICES DE DESEMPENHO E MULTI-TENANCY
CREATE INDEX IF NOT EXISTS idx_entidades_store ON public.entidades(store_id);
CREATE INDEX IF NOT EXISTS idx_entidades_email ON public.entidades(email);
CREATE INDEX IF NOT EXISTS idx_produtos_store ON public.produtos(store_id);
CREATE INDEX IF NOT EXISTS idx_produtos_codigo ON public.produtos(codigo_barras);
CREATE INDEX IF NOT EXISTS idx_vendas_store ON public.vendas(store_id);
CREATE INDEX IF NOT EXISTS idx_vendas_created ON public.vendas(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_financas_store ON public.financas(store_id);

-- 9. CONFIGURAÇÃO DE SEGURANÇA (Row Level Security - RLS)
ALTER TABLE public.entidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itens_venda ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parcelas ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS PERMISSIVAS PARA CHAVE ANON (Permite Leitura, Inserção e Atualização pelo App)
CREATE POLICY "Acesso Livre Anon Entidades" ON public.entidades FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso Livre Anon Produtos" ON public.produtos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso Livre Anon Vendas" ON public.vendas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso Livre Anon ItensVenda" ON public.itens_venda FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso Livre Anon Financas" ON public.financas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso Livre Anon Parcelas" ON public.parcelas FOR ALL USING (true) WITH CHECK (true);
```

---

## 🚀 7. Instalação, Execução Local e Deploy no GitHub Pages

### 🐧 7.1 Execução no Ambiente Local (Linux / Ubuntu / Mint / Debian)

1. **Instalar Node.js e Git**:
   ```bash
   sudo apt update && sudo apt install -y nodejs npm git
   ```

2. **Clonar o Repositório**:
   ```bash
   git clone https://github.com/aristidesbp/aristidesbp.github.io.git
   cd aristidesbp.github.io
   ```

3. **Instalar Dependências**:
   ```bash
   npm install
   ```

4. **Iniciar o Servidor de Desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse a aplicação no seu navegador em: **`http://localhost:3000`**

---

### 🌐 7.2 Deploy no GitHub Pages (Solução Definitiva da "Tela Branca")

#### ⚠️ Por que acontece a "Tela Branca"?
O GitHub Pages é um servidor de arquivos estáticos. Ele **não consegue compilar arquivos TypeScript (`.tsx`) ou JSX em tempo de execução**. Se você subir apenas os arquivos do código-fonte, o navegador retornará erro 404/MIME ao tentar ler `/src/main.tsx`.

#### 💡 Solução de Deploy em 2 Passos:

1. **Compilar o projeto gerando a pasta `dist/`**:
   ```bash
   npm run build
   ```
   *Isso cria a pasta `/dist` contendo o `index.html` compilado e todos os scripts otimizados na pasta `/assets`.*

2. **Publicar no GitHub Pages**:
   - **Opção A (Via linha de comando - Recomendado)**:
     ```bash
     npx gh-pages -d dist
     ```
   - **Opção B (Manual no repositório)**:
     Copie todo o **conteúdo de dentro da pasta `dist/`** para a raiz do seu repositório no branch `main` ou `gh-pages` e salve nas configurações do GitHub (**Settings → Pages → Deploy from a branch**).

---

### 📋 Resumo de Comandos Rápidos

| Ação | Comando Terminal |
| :--- | :--- |
| **Rodar servidor local** | `npm run dev` |
| **Validar erros de TypeScript** | `npm run lint` |
| **Compilar para produção** | `npm run build` |
| **Publicar no GitHub Pages** | `npx gh-pages -d dist` |

---
*Documentação gerada e mantida para a equipe de desenvolvimento do **Supermercado ABP**.*
