🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# PERSONA: ARISTIDES (MENTOR)
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
**Perfil do Mentor**: Engenheiro de Software Sênior e Professor de Computação focado em alta performance e concursos de TI. Seu objetivo é guiar o desenvolvimento do projeto "ERP ABP" utilizando o padrão "Padrão Ouro" de mercado.

# DIRETRIZES DE RESPOSTA:
**Metodologia Prática**: Não entregua apenas códigos isolados; explica onde o código se encaixa na arquitetura MVC (Model-View-Controller).
**Rigor Técnico**: Trata o projeto como um sistema real de alto valor comercial (R$ 10k+). Usando boas práticas de Engenharia de Software: Princípios SOLID, DRY (Don't Repeat Yourself) e Clean Code.

# CICLO DE DESENVOLVIMENTO: 
**Guia o projeto por fases**: Documentação e Requisitos -> Modelagem de Dados (MER/DER) -> Arquitetura de Pastas -> Desenvolvimento Modular -> Integrações (APIs/Automações) -> Testes e Deploy.
**Modernidade**: Sempre sugeri integrações inteligentes (Webhooks, APIs de pagamento, Automações com IA, Supabase para Backend as a Service) e tendências de UI/UX que valorizem o produto final.
**Linguagem**: Usa Markdown para clareza e LaTeX apenas para fórmulas matemáticas complexas. Priorize a organização visual que permita consulta rápida.


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# Estrutura do projeto MVC+Service (Model-View-Controller)
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
```
ERP-ABP/
├── 📂 coc/                 # Documentação do projeto
├── 📂 assets/              # Imagens, logos e ícones
├── 📂 css/                 # Estilos (Global e específicos)
│   ├── main.css
│   └── navbar.css
│ 
├── 📂 src/                  # Código-fonte principal (MVC)
│   ├── 📂 model/            # Camada de Dados e Regras de Negócio
│   │   ├── Database.js      # Configuração Supabase
│   │   ├── EstoqueModel.js  # Regras de baixa e validação
│   │   └── VendaModel.js    # Regras de cálculo e descontos
│   │ 
│   ├── 📂 view/             # Camada de Interface (DOM)
│   │   ├── navbar.js        # Renderiza menu de navegação
│   │   ├── tema.js          # botao tema  claro ou escruo
│   │   └── logalt.js        # botao para sair (modais, loaders)
│   │
│   └── 📂 controller/                # Camada de Controle (O "Maestro")
│       ├── AuthController.js
│       ├── criar_variaveis_id.js
│       ├── validar_acesso.js
│       └── FinanceiroController.js
│ 
├── 📂 services/               # Serviços de terceiros e APIs
│   ├── Mercado_pago.js        # Metodo de pagamento APIS (Integração)
│   ├── SupabaseService.js     # Abstração do banco (Select/Insert)
│   └── PrintService.js        # Lógica de geração de PDF (jsPDF)
│
├── 📂 utils/               # Funções auxiliares (Globais)
│   ├── Formatador.js       # Datas e Moeda (R$)
│   └── Validadores.js      # CPF/CNPJ e Senhas
│
├── entidades.html
├── financeiro.html
├── produtos.html
├── pdv.html
├── loja_virtual.html
├── tarefas.html
├── configuracoes.html
├── vendas.html
├── index.html              # Dashboard Principal
└── login.html              # Tela de Acesso
```

# Por que isso é importante para um "sistema de 10k"?
* Organização: Se você quiser mudar o design (View), não precisa mexer na lógica de cálculo (Model).
* Escalabilidade: Permite que vários desenvolvedores trabalhem simultaneamente: um cuida do banco de dados enquanto outro cuida da interface.
* Reuso: Você pode usar o mesmo Model (lógica de produtos) para o PDV e para um futuro aplicativo de estoque.

# 🧠 Por que esta estrutura é perfeita para concursos?
Se um avaliador olhar esse projeto, ele identificará os seguintes princípios de engenharia:
* **SRP** (Princípio de Responsabilidade Única): Cada arquivo faz apenas uma coisa. O arquivo que calcula o preço não é o mesmo que desenha o botão na tela.
* **SoC** (Separação de Preocupações): Se você decidir trocar o Supabase pelo Firebase, você só mexe na pasta SERVICES, o resto do sistema nem percebe a mudança.
* **DRY** (Don't Repeat Yourself): Funções como formatar "R$ 10,00" ficam em utils e são usadas em todo o sistema, evitando repetição de código.
* **Escalabilidade**: Esse projeto pode começar com 10 arquivos e chegar a 1.000 sem virar uma "bagunça de espaguete".

# src/model (modelo/db)
* É o cérebro do sistema, ele gerencia os dados, a lógica de negócio e as regras de armazenamento. O Model é representado pelas tabelas do Supabase (produtos, vendas, financeiro, tarefas) e pelas funções que manipulam esses dados antes de salvá-los.

Exemplo: A regra que impede a venda de um produto se o estoque_atual for menor que a quantidade desejada.

# src/view (js para construir a pagina, não interage com model)
É a interface com a qual o usuário interage (o que ele vê na tela).
View é o arquivo HTML.

Exemplo: O grid de produtos, o visor do carrinho e o botão "FINALIZAR (F2)".

# src/Controller 
* Pega os dados da view, trata e manda pro model.
* pega os dados do model, e manda para view.
* É o intermediário entre o Model e a View. Ele recebe as entradas do usuário (cliques, digitação), processa o pedido através do Model e atualiza a View com o resultado.

Exemplo: Quando o usuário clica em "adicionar ao carrinho", o Controller busca os dados no Model, faz o cálculo e manda a View atualizar o subtotal na tela.


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
## Checklist de Engenharia (Roadmap Crítico)
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
* No padrão "Padrão Ouro", seguimos o fluxo: Infraestrutura -> Dados -> Lógica -> Interface.
* Aqui está o seu Checklist de Engenharia (Roadmap Crítico), dividido por sprints lógicas para que o código não fique "solto no vento".
Não se escreve uma linha de lógica sem antes ter onde guardar os dados e como acessá-los.

## 🏁 Fase 0: O Alicerce (Infra e Configuração)
```
[ ] Configuração Supabase: Criar o projeto no Dashboard e obter URL e ANON_KEY.
[ ] src/model/Database.js: Centralizar as variáveis de ambiente e inicializar o client do Supabase.
[ ] services/SupabaseService.js: Criar as funções genéricas de CRUD (insert, select, update, delete). Isso evita que você repita código do SDK em todo arquivo.
[ ] utils/Formatador.js: Criar a função de formatação de moeda e data. Você usará isso do Dashboard ao PDV.
```
## 📊 Fase 1: Modelagem e Persistência (Back-end Mindset)
```
Aqui definimos as regras do jogo. O banco de dados é a única fonte da verdade.
[ ] SQL/Migrações: Executar o script SQL no Supabase para criar as tabelas (produtos, vendas, itens_venda, financeiro).
[ ] src/model/EstoqueModel.js: Implementar a lógica de "Baixa de Estoque".
Regra: Se estoque_atual < pedido, retorne erro.
[ ] src/model/VendaModel.js: Lógica de cálculo (Subtotal, Descontos, Impostos).
```
## ⚙️ Fase 2: O Cérebro (Controller)
```
O Controller liga os serviços ao modelo. É aqui que o sistema "ganha vida".
[ ] controller/AuthController.js: Validar login e persistir a sessão no localStorage.
[ ] controller/validar_acesso.js: Middleware que verifica em cada página .html se o usuário está logado. Se não, redireciona para login.html.
[ ] controller/FinanceiroController.js: Integrar a conclusão de uma venda com a criação automática de uma "Conta a Receber".
```
## 🎨 Fase 3: A Fachada (View & UI)
```
Agora, e somente agora, focamos no que o usuário toca.
[ ] src/view/navbar.js: Componentizar o menu para que ele seja injetado em todas as páginas (evita ter que alterar 10 HTMLs quando criar um menu novo).
[ ] src/view/tema.js: Persistência do Dark/Light mode no localStorage.
[ ] Integração do PDV (pdv.html): Conectar os inputs da tela com o VendaController.js.
```
## 🚀 Fase 4: Integrações e Polish (Valor Agregado)
```
O que transforma um CRUD básico em um produto de alto valor.
[ ] services/PrintService.js: Gerar o PDF do comprovante de venda usando jsPDF.
[ ] services/Mercado_pago.js: Gerar o QR Code de pagamento via API.
[ ] Dashboard (index.html): Gráficos simples consumindo dados do FinanceiroController.
```
# 1. Requisitos e Regras de Negócio (O Contrato)
Um sistema de 10k não começa no teclado, começa no papel. Em concursos, isso cai como Engenharia de Requisitos.
**RF001**: O sistema deve realizar uma venda garantindo a atomicidade. Ou seja, ou salva tudo (venda, itens, financeiro e baixa de estoque) ou não salva nada.
**ACID** (Atomicidade, Consistência, Isolamento e Durabilidade): Se o banco de dados falhar no meio do processo e você já tiver dado baixa no estoque mas não salvou o financeiro, seu sistema é lixo.
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# 🏁 Fase 0: O Alicerce (Infra e Configuração)
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
[ ] Configuração Supabase: Criar o projeto no Dashboard e obter URL e ANON_KEY.
```

```
[ ] src/model/Database.js: Centralizar as variáveis de ambiente e inicializar o client do Supabase.
[ ] services/SupabaseService.js: Criar as funções genéricas de CRUD (insert, select, update, delete). Isso evita que você repita código do SDK em todo arquivo.
[ ] utils/Formatador.js: Criar a função de formatação de moeda e data. Você usará isso do Dashboard ao PDV.


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# 2. Modelagem de Dados (MER/DER)
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

A camada **src/model/Database.js**: Este arquivo não deve apenas conter a chave do Supabase. Ele deve ser o **Singleton** (padrão de projeto) que garante que teremos apenas uma instância de conexão com o banco, economizando memória e recursos.

## Código Sugerido (Padrão Enterprise):
```
/**
 * src/model/Database.js
 * Padrão: Singleton
 * Responsabilidade: Gerenciar a conexão única com o provedor de dados (Supabase).
 */

class Database {
    constructor() {
        if (!Database.instance) {
            this.client = window.supabaseClient; // Já inicializado no supabase_config.js
            Database.instance = this;
        }
        return Database.instance;
    }

    getConnection() {
        if (!this.client) {
            throw new Error("Conexão com o banco de dados não inicializada.");
        }
        return this.client;
    }
}

const instance = new Database();
export default instance;
```

# Vamos à autópsia técnica do código:
## Análise Linha por Linha
``` 
class Database {
```
**O que é**: Definição de uma Classe em JavaScript (ES6).

**Visão de Mentor**: No padrão MVC, o Model começa aqui. Usamos classes para encapsular lógica e proteger os dados.
```
constructor() {
```
**O que é**: O método especial que é executado toda vez que você dá um new Database().
```
if (!Database.instance) {
```
**O que é**: Aqui começa a implementação do Padrão **Singleton**. Verificamos se "já existe uma cópia dessa classe viva na memória".

**Foco em Concurso**: O Singleton é um padrão Creational (de criação). Ele garante que uma classe tenha apenas uma única instância em todo o ciclo de vida da aplicação.
```
this.client = window.supabaseClient;
```
**O que é**: Atribuímos a conexão do Supabase (que **veio do seu arquivo supabase_config.js**) a uma propriedade interna da classe.
**Visão de Mentor**: Note que usamos o **window.supabaseClient**. Em um sistema profissional, isso evita que você crie várias conexões simultâneas, o que poderia derrubar seu limite de acessos no banco de dados.
```
Database.instance = this;
```
**O que é**: Guardamos a instância atual dentro da própria classe. É como se a classe dissesse: "Eu já existo, estou salva aqui".
```
return Database.instance;
```
**O que é**: Se alguém tentar criar um new Database() de novo, o construtor ignora a criação e devolve aquela que já estava pronta.
```
getConnection() {
```
**O que é**: Um método "Getter". É a porta de entrada para usar o banco.
**Rigor Técnico**: O Controller nunca deve tocar no this.client diretamente; ele deve pedir licença ao getConnection.
```
if (!this.client) { throw new Error("..."); }
```
**O que é**: Tratamento de erros (Fail-fast). Se por algum motivo a internet cair ou a chave do Supabase falhar, o sistema para aqui com uma mensagem clara, em vez de travar o navegador do cliente.
```
const instance = new Database();
```
**O que é:** Criamos a instância única.
```
export default instance;
```
**O que é**: Exportamos o objeto já pronto.

    Padrão Enterprise: Quem importar esse arquivo (o seu SupabaseService) já recebe a conexão aberta e pronta para o combate.

🧠 Por que isso cai em concursos de TI?

Se você estiver fazendo uma prova da FGV ou CESPE, eles podem perguntar sobre Design Patterns.

    Questão Teórica: "Qual padrão de projeto é indicado para gerenciar conexões com recursos escassos, como bancos de dados ou logs, garantindo um único ponto de acesso global?"
    Resposta: Singleton.

💡 A Diferença entre o Programador de R$ 2k e o de R$ 10k

    O de 2k: Copia e cola o código de conexão em cada página HTML. Se a senha do banco mudar, ele tem que abrir 20 arquivos para consertar.

    O de 10k (Você): Centraliza tudo no Database.js. Se mudar o banco para Firebase, PostgreSQL ou Oracle, você altera apenas um lugar. Isso se chama Manutenibilidade.

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# 3. A Camada Service: O "Garçom" do Sistema
Por que usamos a pasta **services/**? No MVC puro, o Controller fala com o Model. Mas em sistemas modernos (SaaS), usamos Services para isolar as chamadas de API. Se amanhã você sair do Supabase e for para o PostgreSQL puro, seu Controller não muda 1 linha de código. Isso é o **Princípio da Inversão de Dependência** (D de SOLID).

## Criando o services/SupabaseService.js
```
import db from '../src/model/Database.js';

export const SupabaseService = {
    /**
     * Busca todos os registros de uma tabela com filtro opcional.
     * @param {string} tabela 
     * @param {object} filtros 
     */
    async buscarTodos(tabela, colunaFiltro = 'id', valorFiltro = null) {
        let query = db.getConnection().from(tabela).select('*');
        
        if (valorFiltro) {
            query = query.eq(colunaFiltro, valorFiltro);
        }

        const { data, error } = await query;
        if (error) throw new Error(`Erro ao buscar em ${tabela}: ${error.message}`);
        return data;
    },

    async inserir(tabela, dados) {
        const { data, error } = await db.getConnection().from(tabela).insert(dados).select();
        if (error) throw new Error(`Erro ao inserir em ${tabela}: ${error.message}`);
        return data;
    }
};

```
Se o Database.js é o coração que bombeia a conexão, o SupabaseService.js são as artérias. Na engenharia de software, chamamos isso de Camada de Serviço (Service Layer) ou Data Access Object (DAO).

Este código é o que separa um sistema amador de um sistema de R$ 10k. Vamos à análise técnica:
Análise Linha por Linha

import db from '../src/model/Database.js';

    O que faz: Importa a instância única (Singleton) que criamos anteriormente.

    Rigor Técnico: Note que não importamos o Supabase diretamente aqui. Importamos o nosso "Gerenciador". Isso garante que o Service use a conexão oficial e protegida do sistema.

export const SupabaseService = {

    O que faz: Exporta um objeto literal contendo métodos reutilizáveis.

    Visão de Mentor: Em vez de escrever o código do Supabase em cada página (PDV, Estoque, Clientes), você centraliza aqui. Se o Supabase atualizar a versão da biblioteca deles, você só conserta neste arquivo.

async buscarTodos(tabela, colunaFiltro = 'id', valorFiltro = null) {

    O que faz: Uma função assíncrona genérica para buscar dados.

    Parâmetros:

        tabela: Qual tabela queremos (ex: 'produtos').

        colunaFiltro: Qual coluna testar (padrão é 'id').

        valorFiltro: O valor que buscamos. Se for null, ele traz tudo.

    Foco em Concurso: Isso demonstra Abstração. O Controller não precisa saber "como" o banco busca, apenas pede os dados.

let query = db.getConnection().from(tabela).select('*');

    O que faz: Prepara a "pergunta" (query) para o banco de dados.

    Linha Crítica: db.getConnection() chama aquele método que explicamos antes, garantindo que a conexão exista.

if (valorFiltro) { query = query.eq(colunaFiltro, valorFiltro); }

    O que faz: Se você passou um filtro (ex: buscar apenas o produto com código '123'), ele adiciona a cláusula .eq (equal/igual). Se não passou, a query continua configurada para trazer todos os registros.

const { data, error } = await query;

    O que faz: Executa a busca de fato e espera (await) o servidor responder.

    Rigor Técnico: O Supabase sempre retorna um objeto com data (sucesso) ou error (falha).

if (error) throw new Error(...);

    O que faz: Tratamento de Exceção. Se o banco estiver fora do ar ou a tabela não existir, o código "lança" um erro.

    Visão de Mentor: Um sistema de 10k nunca esconde erros. Ele os trata para que o desenvolvedor saiba exatamente o que falhou.

async inserir(tabela, dados) { ... }

    O que faz: Método genérico para salvar qualquer coisa (Vendas, Clientes, Tarefas).

    .insert(dados).select(): Insere os dados e pede para o banco retornar o registro que acabou de ser criado (útil para pegar o ID gerado automaticamente).

🧠 Por que isso é "Padrão Ouro"? (Visão de Concurso)

Em provas de Desenvolvimento de Sistemas, costuma-se cobrar o conceito de Desacoplamento.

Observe a hierarquia:

    View (HTML): Não sabe que o banco existe.

    Controller: Sabe que precisa de dados, mas não sabe "como" pegar. Ele chama o Service.

    Service: Sabe "como" falar com o Supabase.

    Database (Singleton): Sabe "onde" está a chave e a URL de conexão.

Vantagem Comercial: Se você quiser vender esse ERP para uma empresa que não usa nuvem e prefere um banco de dados local (MySQL), você só precisaria reescrever este arquivo SupabaseService.js. Todo o resto do seu sistema (PDV, Financeiro, etc.) continuaria funcionando sem mudar uma vírgula.














# EXEMPLOS DOS CODIGOS
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# login.html
```
<!DOCTYPE html>
<html class="dark" lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - ERP ABP</title>
    <script src="https://cdn.tailwindcss.com"></script>    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
       <link href="css/style.css" rel="stylesheet">
</head>
<body class="bg-slate-950 text-white flex items-center justify-center min-h-screen p-4">
    <div class="glass p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <div class="text-center mb-8">
            <h1 class="text-3xl font-black tracking-tighter text-blue-500">ERP ABP</h1>
            <p class="text-slate-400 text-sm">Acesse sua conta para gerenciar seus PDFs</p>
        </div>
<!--
        <button onclick="loginComGoogle()" class="w-full py-3 mb-6 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
            <img src="https://www.google.com/favicon.ico" class="w-4 h-4" alt="Google icon"> 
            Entrar com Gmail
        </button>
-->
        <div class="relative mb-6 text-center border-b border-slate-800">
            <span class="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-slate-950 px-2 text-xs text-slate-500 uppercase tracking-widest">ou e-mail</span>
        </div>
        <div class="space-y-4">
    <div>
        <label class="block text-xs font-bold mb-1 text-slate-400 uppercase">E-mail</label>
        <input type="email" id="email" placeholder="seu@email.com" class="w-full bg-slate-900 border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
    </div>
    <div class="relative">
        <label class="block text-xs font-bold mb-1 text-slate-400 uppercase">Senha</label>
        <input type="password" id="password" placeholder="••••••••" class="w-full bg-slate-900 border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
        <button type="button" onclick="alternarSenha()" class="absolute right-3 top-8 text-slate-500 hover:text-white">
            🔒
        </button>
    </div>
    <div class="text-right">
        <button onclick="solicitarRecuperacao()" class="text-xs text-blue-400 hover:underline">Esqueceu a senha?</button>
    </div>
    <div class="flex gap-3 pt-2">
        <button onclick="realizarLogin()" class="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20">
            ENTRAR
        </button>
        <button onclick="confirmarCadastro()" class="flex-1 py-3 border border-slate-700 hover:bg-slate-800 text-white font-bold rounded-xl transition-all">
            CADASTRAR
        </button>
    </div>
</div>
    </div>
    <!-- ############################################################################# --> 
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="js/supabase_config.js"></script>
    <script src="js/alternar_senha.js"></script>
    <script src="js/realizar_login.js"></script>
    <script src="js/realizar_cadastro.js"></script>
    <script src="js/recuperar_senha.js"></script>
    <script src="js/login_google.js"></script>
    <!-- ############################################################################# --> 
</body>
</html>
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# login/alternar_senha.js
```
/**
 * Nome do arquivo: alternar_senha.js
 * Objetivo: Alternar a visibilidade do campo de senha entre texto e asteriscos.
 */

function alternarSenha() {
    // Busca o elemento de entrada pelo ID
    const campo = document.getElementById('password');
    
    if (campo) {
        // Se for password, vira text (visível). Se for text, vira password (oculto).
        campo.type = campo.type === 'password' ? 'text' : 'password';
    }
}

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# login_google.js
```
/**
 * Nome do arquivo: login_google.js
 * Objetivo: Realizar autenticação social utilizando o provedor Google via OAuth.
 */

async function loginComGoogle() {
    const { data, error } = await window.supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // Define para onde o Google deve mandar o usuário após o login.
            // Usamos window.location.origin para garantir que funcione em qualquer ambiente.
            redirectTo: window.location.origin + '/assets/app/index.html'
        }
    });

    if (error) {
        console.error("Erro no login Google:", error.message);
        alert("Erro ao conectar com Google: " + error.message);
    }
}

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# realizar_cadastro.js
```
/**
 * Nome do arquivo: realizar_cadastro.js
 * Objetivo: Criar uma nova conta de usuário no sistema.
 */

async function realizarCadastro() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    if (!email || !senha) {
        alert("Preencha e-mail e senha primeiro!");
        return;
    }

    // Cria o usuário no Supabase. 
    // Nota: Se o 'Confirm Email' estiver ativo no painel, o user precisa validar o e-mail antes de logar.
    const { data, error } = await window.supabaseClient.auth.signUp({ 
        email, 
        password: senha 
    });

    if (error) {
        alert("Erro no cadastro: " + error.message);
    } else {
        alert("Conta criada com sucesso! Verifique seu e-mail ou tente fazer login.");
    }
}

/**
 * Função de apoio para evitar cadastros acidentais (UX)
 */
function confirmarCadastro() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite um e-mail!");
    
    if (confirm(`Deseja criar uma conta para: ${email}?`)) {
        realizarCadastro(); 
    }
}

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# realizar_login.js
```
/**
 * Nome do arquivo: realizar_login.js
 * Objetivo: Autenticar o usuário utilizando e-mail e senha no Supabase Auth.
 */

async function realizarLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    // Validação básica de campos vazios
    if (!email || !senha) {
        alert("Ops! Você esqueceu de preencher o e-mail ou a senha. ✍️");
        return;
    }

    try {
        // Chamada oficial ao método de Sign In do Supabase
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: senha,
        });

        if (error) {
            console.error("Erro na autenticação:", error.message);
            alert("Erro ao entrar: " + error.message);
        } else {
            console.log("Bem-vindo de volta!", data.user.email);
            // Redireciona para o painel principal após o sucesso
            window.location.href = 'index.html';
        }
    } catch (err) {
        console.error("Ocorreu um erro inesperado no sistema:", err);
    }
}

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# recuperar_senha.js
```
/**
 * Nome do arquivo: recuperar_senha.js
 * Objetivo: Enviar e-mail de recuperação e atualizar a senha do usuário logado.
 */

async function solicitarRecuperacao() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite seu e-mail.");

    // O Supabase envia um link que redireciona o usuário para a página de redefinição
    const { error } = await window.supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://aristidesbp.github.io/assets/redefinir_senha.html',
    });

    if (error) alert(error.message);
    else alert("Link enviado! Verifique sua caixa de entrada.");
}

async function salvarNovaSenha() {
    const novaSenha = document.getElementById('novaSenha').value;
    if (novaSenha.length < 6) return alert("A senha deve ter no mínimo 6 caracteres.");

    // Atualiza os dados do usuário que clicou no link de recuperação
    const { error } = await window.supabaseClient.auth.updateUser({ password: novaSenha });

    if (error) {
        alert("Erro ao atualizar: " + error.message);
    } else {
        alert("Senha atualizada com sucesso!");
        window.location.href = 'index.html';
    }
}

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# sql notas (exemplo de como criar uma tabela)
```
-- 1. Criar a tabela de notas
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(), -- Vincula a nota ao usuário logado
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. Habilitar o Row Level Security (Segurança de Linha)
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- 3. Criar política: Usuários podem ver apenas suas próprias notas
CREATE POLICY "Usuários podem ver suas próprias notas" 
ON notes FOR SELECT 
USING (auth.uid() = user_id);

-- 4. Criar política: Usuários podem inserir apenas suas próprias notas
CREATE POLICY "Usuários podem inserir suas próprias notas" 
ON notes FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 5. Criar política: Usuários podem atualizar apenas suas próprias notas
CREATE POLICY "Usuários podem atualizar suas próprias notas" 
ON notes FOR UPDATE 
USING (auth.uid() = user_id);

-- 6. Criar política: Usuários podem deletar apenas suas próprias notas
CREATE POLICY "Usuários podem deletar suas próprias notas" 
ON notes FOR DELETE 
USING (auth.uid() = user_id);

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# produtos.html (exemplo de codigo completo)
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Produtos - ERP ABP</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="https://unpkg.com/html5-qrcode"></script>
    <link rel="stylesheet" href="style.css">
<style>
    :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; --accent: #6366f1; }
* { box-sizing: border-box; }
body { margin: 0; font-family: 'Inter', sans-serif; background: var(--bg); padding-top: 85px; }
.container { max-width: 1100px; margin: auto; padding: 20px; }
.card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; }
.section-title { color: var(--primary); font-size: 13px; text-transform: uppercase; margin: 25px 0 12px; border-bottom: 2px solid #f1f5f9; padding-bottom: 5px; font-weight: 800; }
.form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
label { display: block; margin-bottom: 5px; font-size: 12px; color: #64748b; font-weight: bold; }
input, select, textarea { width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; transition: 0.2s; }
input:focus { border-color: var(--primary); outline: none; box-shadow: 0 0 0 3px rgba(62, 207, 142, 0.1); }
.btn-scan { background: var(--accent); color: white; padding: 8px; border: none; border-radius: 6px; cursor: pointer; margin-bottom: 8px; width: 100%; font-size: 13px; font-weight: bold; }
#reader { width: 100%; border-radius: 8px; overflow: hidden; margin-bottom: 10px; display: none; border: 2px solid var(--accent); }
.btn-add { background: var(--primary); color: white; padding: 15px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 20px; font-size: 16px; }
.btn-cancel { background: #64748b; color: white; margin-top: 10px; border: none; padding: 10px; border-radius: 8px; cursor: pointer; display: none; width: 100%; }
.table-container { background: white; border-radius: 12px; overflow-x: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
table { width: 100%; border-collapse: collapse; min-width: 800px; }
th { background: #f8fafc; padding: 15px; color: #64748b; font-size: 11px; text-transform: uppercase; text-align: left; }
td { padding: 15px; border-top: 1px solid #f1f5f9; font-size: 14px; }
.tag { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 10px; color: #64748b; }
.low-stock { color: #ef4444; font-weight: bold; }
.navbar { position: fixed; top: 0; left: 0; width: 100%; background: white; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.05); z-index: 1000; }
.nav-logo { font-weight: 800; color: var(--dark); font-size: 1.1rem; display: flex; align-items: center; gap: 10px; }
.nav-logo i { color: var(--primary); }
.nav-buttons { display: flex; gap: 12px; }
.btn-nav { padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 13px; border: none; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
.btn-home { background: #ecfdf5; color: #059669; }
    
    </style>
</head>
<body>

<div class="navbar">
    <div class="nav-logo">
        <i class="fas fa-boxes"></i> ERP ABP - Produtos
    </div>
    <div class="nav-buttons">
        <a href="index.html" class="btn-nav btn-home"><i class="fas fa-home"></i> Início</a>
        <button class="btn-nav" onclick="sairDaConta()"><i class="fas fa-sign-out-alt"></i> Sair</button>
    </div>
</div>

<div class="container">
    <div class="card">
        <h3 id="form-title">Novo Produto</h3>
        <input type="hidden" id="edit-id">
        
        <div class="section-title">Informações Básicas</div>
        <div class="form-grid">
            <div style="grid-column: span 2;">
                <label>Nome do Produto *</label>
                <input type="text" id="nome" class="form-input" placeholder="Ex: Cimento CP-II">
            </div>
            <div>
                <label>Código de Barras (EAN)</label>
                <button type="button" class="btn-scan" onclick="startScanner()">
                    <i class="fas fa-camera"></i> Ler Código
                </button>
                <div id="reader"></div>
                <input type="text" id="codigo_de_barras" class="form-input">
            </div>
            <div>
                <label>Data de Compra</label>
                <input type="date" id="data_compra" class="form-input">
            </div>
            <div>
                <label>Marca</label>
                <input type="text" id="marca" class="form-input">
            </div>
            <div>
                <label>SKU / Código Interno</label>
                <input type="text" id="sku" class="form-input">
            </div>
            <div>
                <label>Categoria</label>
                <input type="text" id="categoria_prod" class="form-input">
            </div>
            <div>
                <label>Fornecedor (Entidade)</label>
                <select id="entidade_id" class="form-input">
                    <option value="">Carregando fornecedores...</option>
                </select>
            </div>
            <div>
                <label>Data de Vencimento</label>
                <input type="date" id="data_vencimento" class="form-input">
            </div>
        </div>

        <div class="section-title">Imagem do Produto</div>
        <div class="form-grid">
            <div style="grid-column: span 2;">
                <label>Foto do Produto (Câmera ou Arquivo)</label>
                <input type="file" id="foto_arquivo" accept="image/*" capture="environment" class="form-input" onchange="processarImagem(this)">
                <input type="hidden" id="imagem_url">
                <div id="preview-container" style="margin-top: 10px; display: none; text-align: center;">
                    <img id="img-preview" src="" style="max-width: 120px; border-radius: 8px; border: 2px solid #3ecf8e; margin: auto;">
                    <button type="button" onclick="removerFoto()" style="color: #ef4444; font-size: 11px; margin-top: 5px;">Remover Foto</button>
                </div>
            </div>
        </div>

        <div class="section-title">Descrição e Detalhes</div>
        <div style="margin-bottom: 20px;">
            <textarea id="descricao" class="form-input" rows="3" placeholder="Informações adicionais..."></textarea>
        </div>

        <div class="section-title">Preços e Estoque</div>
        <div class="form-grid">
            <div><label>Custo (R$)</label><input type="number" id="preco_custo" class="form-input" step="0.01" value="0.00"></div>
            <div><label>Venda (R$) *</label><input type="number" id="preco_venda" class="form-input" step="0.01" value="0.00"></div>
            <div><label>Estoque Atual *</label><input type="number" id="estoque_atual" class="form-input" value="0"></div>
            <div><label>Estoque Mínimo</label><input type="number" id="estoque_minimo" class="form-input" value="5"></div>
        </div>

        <button class="btn-add" id="btn-save" onclick="handleSaveProduto()">Salvar Produto</button>
        <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
    </div>

    <div class="card">
        <label><i class="fas fa-search"></i> BUSCA INTELIGENTE</label>
        <input type="text" id="inputBusca" onkeyup="filtrarProdutos()" placeholder="Buscar por Nome, SKU, Código ou Marca...">
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Foto / Código</th>
                    <th>Produto / Marca</th>
                    <th>Datas (Compra/Venc.)</th>
                    <th>Venda</th>
                    <th>Estoque</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="produtos-list"></tbody>
        </table>
    </div>
</div>
<script>

    // Configuração do Supabase (Mantenha suas chaves conforme o arquivo original)
const supabaseUrl = 'https://eisruaetsqrratemqswv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc3J1YWV0c3FycmF0ZW1xc3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDI4OTAsImV4cCI6MjA4NTM3ODg5MH0.Rb-nu9zBL7TNWoGNYHvETWMfbqO1NF7UID4TdSYyKS4';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
window.supabaseClient = _supabase;

let html5QrCode;

// --- 1. AUTENTICAÇÃO ---
async function checarAutenticacao() {
    const { data: { session }, error } = await window.supabaseClient.auth.getSession();
    if (error || !session) window.location.href = "login.html";
}

// --- 2. PROCESSAMENTO DE IMAGEM (COMPRESSÃO E BASE64) ---
function processarImagem(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 400; // Tamanho ideal para mobile
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_WIDTH) {
                    width *= MAX_WIDTH / height;
                    height = MAX_WIDTH;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Comprime para JPEG com 60% de qualidade
            const base64 = canvas.toDataURL('image/jpeg', 0.6);
            
            document.getElementById('imagem_url').value = base64;
            document.getElementById('img-preview').src = base64;
            document.getElementById('preview-container').style.display = 'block';
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function removerFoto() {
    document.getElementById('foto_arquivo').value = "";
    document.getElementById('imagem_url').value = "";
    document.getElementById('preview-container').style.display = 'none';
}

// --- 3. LEITOR DE CÓDIGO DE BARRAS ---
function startScanner() {
    const readerDiv = document.getElementById('reader');
    readerDiv.style.display = 'block';
    
    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 150 } },
        (decodedText) => {
            document.getElementById('codigo_de_barras').value = decodedText;
            stopScanner();
        },
        (errorMessage) => { /* Silencioso */ }
    ).catch(err => alert("Erro ao acessar câmera: " + err));
}

function stopScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            document.getElementById('reader').style.display = 'none';
        });
    }
}

// --- 4. CARREGAR FORNECEDORES (CORRIGIDO) ---
async function carregarFornecedores() {
    try {
        const { data, error } = await window.supabaseClient
            .from('entidades')
            .select('id, nome_completo');
        
        const select = document.getElementById('entidade_id');
        
        if (error) throw error;

        if (data && data.length > 0) {
            select.innerHTML = '<option value="">Selecione um fornecedor...</option>' + 
                data.map(e => `<option value="${e.id}">${e.nome_completo}</option>`).join('');
        } else {
            select.innerHTML = '<option value="">Nenhum fornecedor cadastrado</option>';
        }
    } catch (err) {
        console.error("Erro ao carregar fornecedores:", err);
    }
}

// --- 5. SALVAR PRODUTO (CORREÇÃO DE UUID VAZIO) ---
async function handleSaveProduto() {
    const id = document.getElementById('edit-id').value;
    const campos = [
        'nome', 'codigo_de_barras', 'marca', 'sku', 'categoria_prod',
        'entidade_id', 'data_vencimento', 'data_compra', 'descricao',
        'preco_custo', 'preco_venda', 'estoque_atual', 'estoque_minimo', 'imagem_url'
    ];

    const payload = {};
    campos.forEach(c => {
        const el = document.getElementById(c);
        if (el) {
            const valor = el.value.trim();
            if (valor !== "") {
                payload[c] = (el.type === 'number') ? parseFloat(valor || 0) : valor;
            }
        }
    });

    // Remove entidade_id se estiver vazio para evitar erro de UUID no Supabase
    if (!payload.entidade_id || payload.entidade_id === "") {
        delete payload.entidade_id;
    }

    let result;
    if (id) {
        result = await window.supabaseClient.from('produtos').update(payload).eq('id', id);
    } else {
        result = await window.supabaseClient.from('produtos').insert([payload]);
    }

    if (result.error) {
        alert("Erro ao salvar: " + result.error.message);
    } else {
        alert(id ? "Produto atualizado!" : "Produto cadastrado!");
        resetForm();
        loadProdutos();
    }
}

// --- 6. LISTAGEM E TABELA ---
async function loadProdutos() {
    const { data, error } = await window.supabaseClient.from('produtos').select('*').order('nome', { ascending: true });
    if (error) return console.error(error);
    renderTable(data);
}

function renderTable(data) {
    const tbody = document.getElementById('produtos-list');
    tbody.innerHTML = data.map(p => `
        <tr>
            <td>
                ${p.imagem_url ? `<img src="${p.imagem_url}" style="width:45px; height:45px; object-fit:cover; border-radius:6px; margin-bottom:5px;">` : '<i class="fas fa-image" style="font-size:24px; color:#ddd"></i>'}
                <br><span class="tag">${p.codigo_de_barras || 'S/ EAN'}</span>
            </td>
            <td><strong>${p.nome}</strong><br><small>${p.marca || '-'}</small></td>
            <td><small>Comp: ${p.data_compra || '-'}<br>Venc: ${p.data_vencimento || '-'}</small></td>
            <td>R$ ${parseFloat(p.preco_venda).toFixed(2)}</td>
            <td class="${p.estoque_atual <= p.estoque_minimo ? 'low-stock font-bold' : ''}">
                ${p.estoque_atual} ${p.estoque_atual <= p.estoque_minimo ? '<i class="fas fa-exclamation-triangle"></i>' : ''}
            </td>
            <td>
                <button class="btn-edit" onclick="editProduto('${p.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-del" onclick="deleteProduto('${p.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

// --- 7. UTILITÁRIOS ---
async function editProduto(id) {
    const { data, error } = await window.supabaseClient.from('produtos').select('*').eq('id', id).single();
    if (error) return alert("Erro ao carregar dados.");

    Object.keys(data).forEach(key => {
        const el = document.getElementById(key);
        if (el) {
            el.value = data[key] || (el.type === 'number' ? '0' : '');
            if (key === 'imagem_url' && data[key]) {
                document.getElementById('img-preview').src = data[key];
                document.getElementById('preview-container').style.display = 'block';
            }
        }
    });

    document.getElementById('edit-id').value = data.id;
    document.getElementById('form-title').innerText = "Editando: " + data.nome;
    document.getElementById('btn-save').innerText = "Atualizar Produto";
    document.getElementById('btn-cancel').style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteProduto(id) {
    if (!confirm("Excluir este produto?")) return;
    const { error } = await window.supabaseClient.from('produtos').delete().eq('id', id);
    if (!error) loadProdutos();
}

function filtrarProdutos() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    const linhas = document.querySelectorAll('#produtos-list tr');
    linhas.forEach(linha => {
        linha.style.display = linha.innerText.toLowerCase().includes(termo) ? '' : 'none';
    });
}

function resetForm() {
    // Limpa campos de input, select e textarea
    document.querySelectorAll('input, select, textarea').forEach(c => {
        if (c.id === 'estoque_minimo') c.value = '5';
        else if (c.type === 'number') c.value = '0.00';
        else c.value = '';
    });
    
    document.getElementById('edit-id').value = '';
    document.getElementById('imagem_url').value = '';
    document.getElementById('img-preview').src = '';
    document.getElementById('preview-container').style.display = 'none';
    document.getElementById('form-title').innerText = "Novo Produto";
    document.getElementById('btn-save').innerText = "Salvar Produto";
    document.getElementById('btn-cancel').style.display = "none";
}

async function sairDaConta() {
    if(confirm("Sair do sistema?")) {
        await window.supabaseClient.auth.signOut();
        window.location.href = 'login.html';
    }
}

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    checarAutenticacao();
    loadProdutos();
    carregarFornecedores();
});
    
</script>
</body>
</html>
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# entidades.html (exemplo de codigo completo)
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão de Entidades - ERP ABP</title>

<!-- STYLE -->
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"> 
<style>
    
:root {
    --primary: #3ecf8e;
    --dark: #0f172a;
    --bg: #f1f5f9;
}

* { box-sizing: border-box; }

body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background: var(--bg);
    padding-top: 85px;
}

.container {
    max-width: 1100px;
    margin: auto;
    padding: 20px;
}

.card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    margin-bottom: 20px;
}

.section-title {
    color: var(--primary);
    font-size: 14px;
    text-transform: uppercase;
    margin: 20px 0 10px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    font-weight: bold;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-size: 13px;
    color: #64748b;
    font-weight: bold;
}

input, select, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
}

/* Estilo para o campo de senha com Olho */
.password-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}
.password-wrapper i {
    position: absolute;
    right: 10px;
    cursor: pointer;
    color: #64748b;
}

input:focus, select:focus, textarea:focus {
    border-color: var(--primary);
    outline: none;
}

.btn-add {
    background: var(--primary);
    color: white;
    padding: 15px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    width: 100%;
    margin-top: 20px;
}

.btn-cancel {
    background: #64748b;
    color: white;
    margin-top: 10px;
    border: none;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    display: none;
    width: 100%;
}

.table-container {
    background: white;
    border-radius: 12px;
    overflow-x: auto;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

table { width: 100%; border-collapse: collapse; min-width: 800px; }
th { background: #f8fafc; padding: 15px; color: #64748b; font-size: 12px; text-transform: uppercase; }
td { padding: 15px; border-top: 1px solid #f1f5f9; }

.btn-edit { color: #3b82f6; cursor: pointer; font-size: 18px; background: none; border: none; margin-right: 10px;}
.btn-del { color: #ef4444; cursor: pointer; font-size: 18px; background: none; border: none; margin-right: 10px;}
.btn-wpp { color: #25d366; cursor: pointer; font-size: 18px; background: none; border: none; margin-right: 10px;}
.btn-mail { color: #ea4335; cursor: pointer; font-size: 18px; background: none; border: none; }

.navbar {
    position: fixed; top: 0; left: 0; width: 100%; background: white;
    padding: 15px 25px; display: flex; justify-content: space-between;
    align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000;
}
.nav-buttons { display: flex; gap: 15px; align-items: center; }
.btn-nav-back { text-decoration: none; color: #64748b; font-weight: bold; }
.btn-logout-nav {
    background: #ef4444; color: white; padding: 8px 15px; border-radius: 6px;
    font-weight: bold; font-size: 14px; border: none; cursor: pointer;
}

.export-area {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 15px;
}

.btn-export {
    background: #2c3e50;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-export-full {
    background: #1e293b;
}
   
</style>   
<!-- FIM DO STYLE -->

 <!-- CONEXÃO SUPABASE -->   
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<script>
// SUPABASE_CONFIG.JS
const supabaseUrl = 'https://eisruaetsqrratemqswv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc3J1YWV0c3FycmF0ZW1xc3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDI4OTAsImV4cCI6MjA4NTM3ODg5MH0.Rb-nu9zBL7TNWoGNYHvETWMfbqO1NF7UID4TdSYyKS4';
// Inicializa o cliente Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
// Exporta para ser usado em outros scripts
window.supabaseClient = _supabase;
</script>
<script>
    /** * Estrutura do verificar_login.js
 * Para começar, vamos focar na função de Verificação de Sessão. 
 * O comando básico do Supabase é: supabase.auth.getSession()
 */

// Esta função garante que apenas usuários logados acessem a página atual
async function checarAutenticacao() {
    // 1. Buscamos a sessão atual do cliente configurado no supabase_config.js
    const { data: { session }, error } = await window.supabaseClient.auth.getSession();

    // 2. Se houver erro ou se a sessão estiver vazia (null), o usuário não está logado
    if (error || !session) {
        console.log("Acesso negado: Usuário não autenticado.");
        // 3. Redireciona para o login.html na raiz, conforme nossa estrutura
        window.location.href = "login.html";
    } else {
        // Se a sessão existir, permitimos que ele continue na página
        console.log("Acesso autorizado para:", session.user.email);
    }
}

// Executamos a verificação imediatamente ao carregar o script
checarAutenticacao();
</script>
<!-- FIM DO CONEXÃO SUPABASE -->
   
</head>
<body>

<!-- NAVBAR -->
    <style>
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: white;
            padding: 15px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
        }

        .nav-buttons {
            display: flex;
            gap: 15px;
        }

        .btn-nav {
            background: #ef4444;
            color: white;
            padding: 8px 15px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 14px;
            border: none;
            cursor: pointer;
            transition: 0.3s;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-nav:hover {
            background: #dc2626;
            transform: scale(1.05);
        }

        .btn-home {
            background: #3ecf8e !important; /* Verde padrão do seu ERP */
        }

        /* Ajuste para o conteúdo não ficar embaixo da navbar fixa */
        body {
            padding-top: 80px;
        }
    </style>
    
    <div class="navbar">
        <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
            <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
        </div>
        <div class="nav-buttons">
            <a href="index.html" class="btn-nav btn-home"><i class="fas fa-home"></i> index</a>
            <button class="btn-nav" onclick="sairDaConta()">
                <i class="fas fa-sign-out-alt"></i> Sair
            </button>
        </div>
    </div>`;

    <script>
        async function sairDaConta() {
    if(confirm("Deseja realmente sair do sistema?")) {
        try {
            // Verifica se o cliente supabase existe antes de tentar deslogar
            if (typeof _supabase !== 'undefined') {
                await _supabase.auth.signOut();
            }
            window.location.href = 'login.html';
        } catch (error) {
            console.error("Erro ao sair:", error);
            window.location.href = 'login.html';
        }
    }
        }
    </script>
<!-- FIM DA NAVBAR -->
    
<!-- FORMULARIO -->
<div class="container">
    <div class="card">
        <h3 id="form-title">Novo Cadastro de Entidade</h3>
        <input type="hidden" id="edit-id">

        <div class="section-title">Informações e Acesso</div>
        <div class="form-grid">
            <div><label>Nome Completo / Razão *</label><input type="text" id="nome_completo"></div>
            <div><label>CPF / CNPJ</label><input type="text" id="cpf"></div>
            <div><label>Data Nascimento</label><input type="date" id="data_nascimento"></div>
            <div><label>E-mail</label><input type="email" id="email"></div>
            <div><label>Telefone / WhatsApp *</label><input type="text" id="telefone"></div>
            <div>
                <label>Senha Interna</label>
                <div class="password-wrapper">
                    <input type="password" id="senha_acesso">
                    <i class="fas fa-eye" id="togglePassword" onclick="togglePasswordVisibility()"></i>
                </div>
            </div>
            
            <div>
                <label>Nível de Acesso</label>
                <select id="acesso">
                    <option value="cliente">Cliente</option>
                    <option value="funcionario">Funcionário</option>
                    <option value="comprador">Comprador</option>
                    <option value="master">Master</option>
                </select>
            </div>
            <div>
                <label>Relacionamento</label>
                <select id="relacionamento">
                    <option value="cliente">Cliente</option>
                    <option value="funcionario">Funcionário</option>
                    <option value="fornecedor">Fornecedor</option>
                    <option value="terceirizado">Terceirizado</option>
                    <option value="outros">Outros</option>
                </select>
            </div>
            <div>
                <label>Status</label>
                <select id="status">
                    <option value="ativo">Ativo</option>
                    <option value="desativado">Desativado</option>
                </select>
            </div>
            <div><label>Avaliação (0-10)</label><input type="number" id="avaliacao" min="0" max="10" value="5"></div>
        </div>

        <div class="section-title">Endereço</div>
        <div class="form-grid">
            <div><label>CEP</label><input type="text" id="cep" maxlength="8" onblur="buscaCEP()"></div>
            <div style="grid-column: span 2;"><label>Logradouro</label><input type="text" id="logradouro"></div>
            <div><label>Número</label><input type="text" id="numero"></div>
            <div><label>Bairro</label><input type="text" id="bairro"></div>
            <div><label>Cidade</label><input type="text" id="cidade"></div>
            <div><label>UF</label><input type="text" id="estado" maxlength="2"></div>
        </div>

        <div class="section-title">Complementos</div>
        <div class="form-grid">
            <div style="grid-column: span 2;"><label>URL de Arquivos</label><input type="text" id="arquivos_url"></div>
            <div style="grid-column: span 2;"><label>Observações</label><textarea id="observacoes" rows="2"></textarea></div>
        </div>

        <button class="btn-add" id="btn-save" onclick="handleSave()">Salvar Entidade</button>
        <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
    </div>

    <div class="card" style="margin-bottom: 10px; padding: 15px;">
        <label><i class="fas fa-search"></i> BUSCAR ENTIDADE</label>
        <input type="text" id="inputBusca" placeholder="Digite o nome para filtrar..." onkeyup="filtrarTabela()">
        
        <div class="export-area">
            <button class="btn-export" onclick="exportarPDFListagem()">
                <i class="fas fa-list"></i> Exportar Listagem (PDF)
            </button>
            <button class="btn-export btn-export-full" onclick="exportarPDFFichaCompleta()">
                <i class="fas fa-file-invoice"></i> Exportar Fichas Detalhadas (PDF)
            </button>
        </div>
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Nome / Tipo</th>
                    <th>Telefone / E-mail</th>
                    <th>Acesso / Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="entities-list"></tbody>
        </table>
    </div>
</div>
<!-- FORMULARIO -->
<script>
    /** * ERP ABP - cadastrar.js */
async function handleSave() {
    const id = document.getElementById('edit-id').value;
    
    const campos = [
        'nome_completo', 'cpf', 'data_nascimento', 'genero', 'estado_civil',
        'tipo_entidade', 'status_entidade', 'tipo_acesso', 'email', 'telefone',
        'senha_acesso', 'cep', 'logradouro', 'numero', 'bairro', 'cidade',
        'estado', 'avaliacao', 'observacoes'
    ];

    const payload = {};
    campos.forEach(c => {
        const el = document.getElementById(c);
        if (el) payload[c] = el.value;
    });

    let result;
    if (id) {
        result = await window.supabaseClient.from('entidades').update(payload).eq('id', id);
    } else {
        result = await window.supabaseClient.from('entidades').insert([payload]);
    }

    if (result.error) {
        alert("Erro ao salvar: " + result.error.message);
    } else {
        alert(id ? "Atualizado com sucesso!" : "Cadastrado com sucesso!");
        resetForm();
        if (typeof loadEntities === "function") loadEntities();
    }
}
</script>
<script>
/** * ERP ABP - deletar.js */
async function deleteEntity(id) {
    if (!confirm("Tem certeza que deseja excluir esta entidade permanentemente?")) return;

    const { error } = await window.supabaseClient
        .from('entidades')
        .delete()
        .eq('id', id);

    if (error) {
        alert("Erro ao excluir: " + error.message);
    } else {
        if (typeof loadEntities === "function") loadEntities();
    }
}
</script>
 <script> 
/** * ERP ABP - editar.js */
async function editFull(id) {
    const { data, error } = await window.supabaseClient
        .from('entidades')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) return alert("Erro ao carregar dados para edição.");

    Object.keys(data).forEach(key => {
        const el = document.getElementById(key);
        if (el) el.value = data[key] || '';
    });

    document.getElementById('edit-id').value = data.id;
    document.getElementById('form-title').innerText = "Editando: " + data.nome_completo;
    document.getElementById('btn-save').innerText = "Atualizar Entidade";
    document.getElementById('btn-cancel').style.display = "block";
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
     }
 </script>
 <script>
     /** * ERP ABP - listar.js */
async function loadEntities() {
    const { data, error } = await window.supabaseClient
        .from('entidades')
        .select('*')
        .order('nome_completo', { ascending: true });

    if (error) {
        console.error("Erro ao carregar:", error.message);
        return;
    }
    renderTable(data || []);
}

function renderTable(data) {
    const tbody = document.getElementById('entities-list');
    if (!tbody) return;

    tbody.innerHTML = data.map(e => `
        <tr>
            <td><strong>${e.nome_completo}</strong><br><small class="tag">${e.tipo_entidade || 'N/A'}</small></td>
            <td>${e.telefone || '-'}<br><small>${e.email || '-'}</small></td>
            <td><span class="status-tag">${e.status_entidade || 'Ativo'}</span></td>
            <td>
                <button class="btn-edit" onclick="editFull('${e.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-del" onclick="deleteEntity('${e.id}')"><i class="fas fa-trash"></i></button>
                ${e.telefone ? `<button class="btn-wpp" onclick="window.open('https://wa.me/55${e.telefone.replace(/\D/g,'')}')"><i class="fab fa-whatsapp"></i></button>` : ''}
            </td>
        </tr>
    `).join('');
}

// Inicia ao carregar a página
document.addEventListener('DOMContentLoaded', loadEntities);
</script>
 <script>
/** * ERP ABP - utilidades.js
 * Funções auxiliares e automação de interface
 */

// 1. Limpa todos os campos e volta o formulário ao estado inicial
function resetForm() {
    // Limpa Inputs, Selects e Textareas
    document.querySelectorAll('input, select, textarea').forEach(campo => {
        if (campo.id === 'avaliacao') {
            campo.value = '5';
        } else if (campo.tagName === 'SELECT') {
            campo.selectedIndex = 0;
        } else {
            campo.value = '';
        }
    });

    // Reset de elementos visuais de edição
    const editId = document.getElementById('edit-id');
    if (editId) editId.value = '';

    const formTitle = document.getElementById('form-title');
    if (formTitle) formTitle.innerText = "Novo Cadastro de Entidade";

    const btnSave = document.getElementById('btn-save');
    if (btnSave) btnSave.innerText = "Salvar Entidade";

    const btnCancel = document.getElementById('btn-cancel');
    if (btnCancel) btnCancel.style.display = "none";

    console.log("🧹 Campos limpos com sucesso!");
}

// 2. Filtro de busca em tempo real (sem precisar de botão)
function filtrarTabela() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    const linhas = document.querySelectorAll('#entities-list tr');

    linhas.forEach(linha => {
        const texto = linha.innerText.toLowerCase();
        linha.style.display = texto.includes(termo) ? '' : 'none';
    });
}

// 3. Função para alternar visibilidade da senha
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('senha_acesso');
    const toggleIcon = document.getElementById('togglePassword');
    if (passwordInput && passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else if (passwordInput) {
        passwordInput.type = 'password';
        toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// 4. Busca de CEP automática (ViaCEP)
async function buscaCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await res.json();
            if (!data.erro) {
                document.getElementById('logradouro').value = data.logradouro || '';
                document.getElementById('bairro').value = data.bairro || '';
                document.getElementById('cidade').value = data.localidade || '';
                document.getElementById('estado').value = data.uf || '';
                console.log("📍 Endereço preenchido via CEP");
            }
        } catch (e) { console.error("Erro ao buscar CEP", e); }
    }
     }
 </script>
     
</body>
</html>

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# finaceiro.html (exemplo de codigo completo)
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão Financeira - ERP ABP</title>
    
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
 <style>
:root { 
    --primary: #3ecf8e; 
    --dark: #0f172a; 
    --bg: #f1f5f9; 
    --danger: #ef4444; 
}

* { box-sizing: border-box; }

body { 
    margin: 0; 
    font-family: 'Segoe UI', sans-serif; 
    background: var(--bg); 
    padding-top: 85px; 
}

.container { max-width: 1200px; margin: auto; padding: 20px; }

.card { 
    background: white; 
    padding: 25px; 
    border-radius: 12px; 
    box-shadow: 0 4px 15px rgba(0,0,0,0.05); 
    margin-bottom: 20px; 
}

.navbar { 
    position: fixed; top: 0; left: 0; width: 100%; 
    background: white; padding: 15px 25px; 
    display: flex; justify-content: space-between; align-items: center; 
    box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; 
}

.nav-link { text-decoration: none; color: #64748b; font-weight: bold; margin-right: 15px; }
.btn-exit { background: var(--danger); color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; }

.section-title { 
    color: var(--primary); font-size: 14px; text-transform: uppercase; 
    margin: 20px 0 10px; border-bottom: 1px solid #eee; 
    padding-bottom: 5px; font-weight: bold; 
}

.form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
label { display: block; margin-bottom: 5px; font-size: 13px; color: #64748b; font-weight: bold; }
input, select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }

.btn-add { background: var(--primary); color: white; padding: 15px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 20px; }
.btn-cancel { background: #64748b; color: white; margin-top: 10px; border: none; padding: 10px; border-radius: 6px; cursor: pointer; display: none; width: 100%; }

.table-container { background: white; border-radius: 12px; overflow-x: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
table { width: 100%; border-collapse: collapse; min-width: 1100px; }
th { background: #f8fafc; padding: 15px; color: #64748b; font-size: 12px; text-transform: uppercase; text-align: left; }
td { padding: 12px 15px; border-top: 1px solid #f1f5f9; font-size: 14px; }

.status-badge { padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
.status-pago { background: #dcfce7; color: #166534; }
.status-pendente { background: #fef9c3; color: #854d0e; }

.label-tipo { font-size: 10px; font-weight: bold; text-transform: uppercase; margin-right: 5px; }
.tipo-pagar { color: var(--danger); }
.tipo-receber { color: var(--primary); }

.resumo-financeiro { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px; }
.resumo-card { padding: 15px; border-radius: 10px; color: white; text-align: center; }
.resumo-entradas { background: #10b981; }
.resumo-saidas { background: #ef4444; }
.resumo-saldo { background: #3b82f6; }

.bulk-actions { margin-bottom: 10px; display: none; background: #fee2e2; padding: 10px; border-radius: 8px; border: 1px solid #fecaca; }
.btn-delete-bulk { background: var(--danger); color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-left: 15px; }
.btn-action { background: none; border: none; cursor: pointer; font-size: 16px; margin-right: 8px; }
.btn-pdf { background: #334155; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; }
</style>
  
</head>
<body>

<!-- NAVBAR -->
    <style>
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: white;
            padding: 15px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
        }

        .nav-buttons {
            display: flex;
            gap: 15px;
        }

        .btn-nav {
            background: #ef4444;
            color: white;
            padding: 8px 15px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 14px;
            border: none;
            cursor: pointer;
            transition: 0.3s;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-nav:hover {
            background: #dc2626;
            transform: scale(1.05);
        }

        .btn-home {
            background: #3ecf8e !important; /* Verde padrão do seu ERP */
        }

        /* Ajuste para o conteúdo não ficar embaixo da navbar fixa */
        body {
            padding-top: 80px;
        }
    </style>
    
    <div class="navbar">
        <div style="font-weight: bold; color: #0f172a; font-size: 1.2rem;">
            <i class="fas fa-chart-line" style="color: #3ecf8e;"></i> ERP ABP
        </div>
        <div class="nav-buttons">
            <a href="index.html" class="btn-nav btn-home"><i class="fas fa-home"></i> index</a>
            <button class="btn-nav" onclick="sairDaConta()">
                <i class="fas fa-sign-out-alt"></i> Sair
            </button>
        </div>
    </div>`;

    <script>
        async function sairDaConta() {
    if(confirm("Deseja realmente sair do sistema?")) {
        try {
            // Verifica se o cliente supabase existe antes de tentar deslogar
            if (typeof _supabase !== 'undefined') {
                await _supabase.auth.signOut();
            }
            window.location.href = 'login.html';
        } catch (error) {
            console.error("Erro ao sair:", error);
            window.location.href = 'login.html';
        }
    }
        }
    </script>
<!-- FIM DA NAVBAR -->

<div class="container">
    <div class="card">
        <h3 id="form-title">Novo Lançamento</h3>
        <input type="hidden" id="edit-id">
        
        <div class="section-title">Dados e Parcelamento</div>
        <div class="form-grid">
            <div><label>Tipo *</label><select id="tipo"><option value="pagar">Saída</option><option value="receber">Entrada</option></select></div>
            <div style="grid-column: span 2;"><label>Descrição *</label><input type="text" id="descricao"></div>
            <div><label>Valor Parcela (R$) *</label><input type="number" id="valor" step="0.01"></div>
            <div><label>Qtde Parcelas</label><input type="number" id="parcelas" value="1" min="1"></div>
        </div>

        <div class="section-title">Datas e Status</div>
        <div class="form-grid">
            <div><label>1º Vencimento *</label><input type="date" id="data_vencimento"></div>
            <div><label>Data Pagamento</label><input type="date" id="data_pagamento"></div>
            <div><label>Status</label><select id="status"><option value="pendente">Pendente</option><option value="pago">Pago/Recebido</option></select></div>
        </div>

        <div class="section-title">Classificação</div>
        <div class="form-grid">
            <div><label>Entidade</label><select id="entidade_id"><option value="">Selecione...</option></select></div>
            <div><label>Categoria</label><input type="text" id="categoria"></div>
            <div><label>Forma Pagto</label><input type="text" id="forma_pagamento"></div>
        </div>
        
        <button class="btn-add" id="btn-save" onclick="handleSave()">Salvar Lançamento(s)</button>
        <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
    </div>

    <div class="card">
        <div class="form-grid">
            <div style="grid-column: span 2;"><label>Busca Inteligente (Tudo)</label><input type="text" id="inputBusca" onkeyup="filtrarTabela()" placeholder="Busque por descrição, categoria, valor..."></div>
            <div><label>Início</label><input type="date" id="dataInicio" onchange="filtrarTabela()"></div>
            <div><label>Fim</label><input type="date" id="dataFim" onchange="filtrarTabela()"></div>
            <div style="display: flex; align-items: flex-end;">
                <button class="btn-pdf" onclick="exportarPDF()"><i class="fas fa-file-pdf"></i> PDF</button>
            </div>
        </div>
    </div>

    <div class="resumo-financeiro">
        <div class="resumo-card resumo-entradas"><span>Entradas</span><br><b id="total-receber">R$ 0,00</b></div>
        <div class="resumo-card resumo-saidas"><span>Saídas</span><br><b id="total-pagar">R$ 0,00</b></div>
        <div class="resumo-card resumo-saldo"><span>Saldo Filtrado</span><br><b id="total-saldo">R$ 0,00</b></div>
    </div>

    <div id="bulk-area" class="bulk-actions">
        <span id="selected-count" style="font-weight:bold; color:#b91c1c;">0 selecionados</span>
        <button onclick="deleteSelected()" class="btn-delete-bulk"><i class="fas fa-trash"></i> Excluir Selecionados</button>
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th width="40"><input type="checkbox" id="select-all" onclick="toggleSelectAll()"></th>
                    <th>Tipo</th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Forma Pagto</th>
                    <th>Vencimento</th>
                    <th>Pagamento</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="financeiro-list"></tbody>
        </table>
    </div>
</div>
<script>
// --- 1. CONFIGURAÇÃO E INICIALIZAÇÃO ---
const supabaseUrl = 'https://eisruaetsqrratemqswv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc3J1YWV0c3FycmF0ZW1xc3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDI4OTAsImV4cCI6MjA4NTM3ODg5MH0.Rb-nu9zBL7TNWoGNYHvETWMfbqO1NF7UID4TdSYyKS4';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

let dadosFinanceiros = []; // Cache local para busca e filtros

document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session) {
        window.location.href = "login.html";
        return;
    }
    carregarEntidades();
    loadFinanceiro();
});

// --- 2. CARREGAMENTO DE DADOS ---

async function carregarEntidades() {
    const { data, error } = await _supabase.from('entidades').select('id, nome_completo');
    if (!error) {
        const select = document.getElementById('entidade_id');
        data.forEach(ent => {
            const opt = document.createElement('option');
            opt.value = ent.id;
            opt.textContent = ent.nome_completo;
            select.appendChild(opt);
        });
    }
}

async function loadFinanceiro() {
    const { data, error } = await _supabase
        .from('financeiro')
        .select(`*, entidades(nome_completo)`)
        .order('data_vencimento', { ascending: true });

    if (error) {
        console.error("Erro ao carregar:", error);
        return;
    }

    dadosFinanceiros = data;
    renderTable(dadosFinanceiros);
}

// --- 3. RENDERIZAÇÃO E CÁLCULOS ---

function renderTable(data) {
    const tbody = document.getElementById('financeiro-list');
    tbody.innerHTML = '';
    
    let totalEntradas = 0;
    let totalSaidas = 0;

    data.forEach(item => {
        const valor = parseFloat(item.valor || 0);
        if (item.tipo.toLowerCase() === 'receber') totalEntradas += valor;
        else totalSaidas += valor;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="row-checkbox" value="${item.id}" onclick="updateSelectedCount()"></td>
            <td>
                <span class="label-tipo ${item.tipo.toLowerCase() === 'receber' ? 'tipo-receber' : 'tipo-pagar'}">
                    <i class="fas fa-${item.tipo.toLowerCase() === 'receber' ? 'arrow-up' : 'arrow-down'}"></i> ${item.tipo}
                </span>
            </td>
            <td><strong>${item.descricao}</strong><br><small>${item.entidades?.nome_completo || 'Sem Entidade'}</small></td>
            <td>${item.categoria || '-'}</td>
            <td>${item.forma_pagamento || '-'}</td>
            <td>${item.data_vencimento ? new Date(item.data_vencimento).toLocaleDateString('pt-BR') : '-'}</td>
            <td>${item.data_pagamento ? new Date(item.data_pagamento).toLocaleDateString('pt-BR') : '-'}</td>
            <td><strong>R$ ${valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong></td>
            <td><span class="status-badge status-${item.status.toLowerCase()}">${item.status}</span></td>
            <td>
                <button class="btn-action" style="color:#6366f1" onclick="editItem('${item.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-action" style="color:#ef4444" onclick="deleteItem('${item.id}')"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Atualiza Resumo
    document.getElementById('total-receber').innerText = `R$ ${totalEntradas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    document.getElementById('total-pagar').innerText = `R$ ${totalSaidas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    document.getElementById('total-saldo').innerText = `R$ ${(totalEntradas - totalSaidas).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
}

// --- 4. SALVAMENTO E PARCELAMENTO ---

async function handleSave() {
    const id = document.getElementById('edit-id').value;
    const qtdeParcelas = parseInt(document.getElementById('parcelas').value) || 1;
    
    const basePayload = {
        tipo: document.getElementById('tipo').value,
        descricao: document.getElementById('descricao').value,
        valor: parseFloat(document.getElementById('valor').value),
        status: document.getElementById('status').value,
        entidade_id: document.getElementById('entidade_id').value || null,
        categoria: document.getElementById('categoria').value,
        forma_pagamento: document.getElementById('forma_pagamento').value,
        data_pagamento: document.getElementById('data_pagamento').value || null
    };

    if (!basePayload.descricao || !basePayload.valor || !document.getElementById('data_vencimento').value) {
        alert("Preencha os campos obrigatórios (*)");
        return;
    }

    try {
        if (id) {
            // Edição simples
            basePayload.data_vencimento = document.getElementById('data_vencimento').value;
            const { error } = await _supabase.from('financeiro').update(basePayload).eq('id', id);
            if (error) throw error;
        } else {
            // Inserção com lógica de parcelas
            const lancamentos = [];
            let dataBase = new Date(document.getElementById('data_vencimento').value + "T12:00:00");

            for (let i = 0; i < qtdeParcelas; i++) {
                const novaData = new Date(dataBase);
                novaData.setMonth(dataBase.getMonth() + i);
                
                lancamentos.push({
                    ...basePayload,
                    descricao: qtdeParcelas > 1 ? `${basePayload.descricao} (${i + 1}/${qtdeParcelas})` : basePayload.descricao,
                    data_vencimento: novaData.toISOString().split('T')[0]
                });
            }
            const { error } = await _supabase.from('financeiro').insert(lancamentos);
            if (error) throw error;
        }

        alert("Sucesso!");
        resetForm();
        loadFinanceiro();
    } catch (err) {
        alert("Erro: " + err.message);
    }
}

// --- 5. AÇÕES (EDITAR, EXCLUIR, BUSCAR) ---

async function editItem(id) {
    const item = dadosFinanceiros.find(i => i.id === id);
    if (!item) return;

    document.getElementById('edit-id').value = item.id;
    document.getElementById('tipo').value = item.tipo.toLowerCase();
    document.getElementById('descricao').value = item.descricao;
    document.getElementById('valor').value = item.valor;
    document.getElementById('data_vencimento').value = item.data_vencimento;
    document.getElementById('data_pagamento').value = item.data_pagamento || '';
    document.getElementById('status').value = item.status.toLowerCase();
    document.getElementById('entidade_id').value = item.entidade_id || '';
    document.getElementById('categoria').value = item.categoria || '';
    document.getElementById('forma_pagamento').value = item.forma_pagamento || '';

    document.getElementById('form-title').innerText = "Editando Lançamento";
    document.getElementById('btn-save').innerText = "Atualizar";
    document.getElementById('btn-cancel').style.display = "block";
    document.getElementById('parcelas').disabled = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteItem(id) {
    if (confirm("Excluir este lançamento?")) {
        const { error } = await _supabase.from('financeiro').delete().eq('id', id);
        if (!error) loadFinanceiro();
    }
}

function filtrarTabela() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    const inicio = document.getElementById('dataInicio').value;
    const fim = document.getElementById('dataFim').value;

    const filtrados = dadosFinanceiros.filter(item => {
        const matchesTermo = JSON.stringify(item).toLowerCase().includes(termo);
        const dataVenc = item.data_vencimento;
        const matchesData = (!inicio || dataVenc >= inicio) && (!fim || dataVenc <= fim);
        return matchesTermo && matchesData;
    });

    renderTable(filtrados);
}

function resetForm() {
    document.getElementById('edit-id').value = '';
    document.querySelectorAll('input').forEach(i => i.value = i.id === 'parcelas' ? '1' : '');
    document.getElementById('status').value = 'pendente';
    document.getElementById('tipo').value = 'pagar';
    document.getElementById('entidade_id').value = '';
    document.getElementById('form-title').innerText = "Novo Lançamento";
    document.getElementById('btn-save').innerText = "Salvar Lançamento(s)";
    document.getElementById('btn-cancel').style.display = "none";
    document.getElementById('parcelas').disabled = false;
}

// --- 6. AÇÕES EM MASSA ---

function toggleSelectAll() {
    const master = document.getElementById('select-all');
    document.querySelectorAll('.row-checkbox').forEach(cb => cb.checked = master.checked);
    updateSelectedCount();
}

function updateSelectedCount() {
    const selecionados = document.querySelectorAll('.row-checkbox:checked').length;
    document.getElementById('bulk-area').style.display = selecionados > 0 ? 'block' : 'none';
    document.getElementById('selected-count').innerText = `${selecionados} selecionados`;
}

async function deleteSelected() {
    if (!confirm("Excluir todos os selecionados?")) return;
    const ids = Array.from(document.querySelectorAll('.row-checkbox:checked')).map(cb => cb.value);
    const { error } = await _supabase.from('financeiro').delete().in('id', ids);
    if (!error) {
        loadFinanceiro();
        updateSelectedCount();
    }
}

// --- 7. EXPORTAÇÃO PDF ---

function exportarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4');

    doc.text("Relatório Financeiro - ERP ABP", 14, 15);
    
    const rows = dadosFinanceiros.map(i => [
        i.tipo.toUpperCase(),
        i.descricao,
        i.data_vencimento,
        `R$ ${parseFloat(i.valor).toFixed(2)}`,
        i.status.toUpperCase()
    ]);

    doc.autoTable({
        head: [['Tipo', 'Descrição', 'Vencimento', 'Valor', 'Status']],
        body: rows,
        startY: 20
    });

    doc.save("financeiro.pdf");
}
</script>     

</body>
</html>
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# produtos.html
```



<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Produtos - ERP ABP</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="https://unpkg.com/html5-qrcode"></script>
    <link rel="stylesheet" href="style.css">
<style>
    :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; --accent: #6366f1; }
* { box-sizing: border-box; }
body { margin: 0; font-family: 'Inter', sans-serif; background: var(--bg); padding-top: 85px; }
.container { max-width: 1100px; margin: auto; padding: 20px; }
.card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; }
.section-title { color: var(--primary); font-size: 13px; text-transform: uppercase; margin: 25px 0 12px; border-bottom: 2px solid #f1f5f9; padding-bottom: 5px; font-weight: 800; }
.form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
label { display: block; margin-bottom: 5px; font-size: 12px; color: #64748b; font-weight: bold; }
input, select, textarea { width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; transition: 0.2s; }
input:focus { border-color: var(--primary); outline: none; box-shadow: 0 0 0 3px rgba(62, 207, 142, 0.1); }
.btn-scan { background: var(--accent); color: white; padding: 8px; border: none; border-radius: 6px; cursor: pointer; margin-bottom: 8px; width: 100%; font-size: 13px; font-weight: bold; }
#reader { width: 100%; border-radius: 8px; overflow: hidden; margin-bottom: 10px; display: none; border: 2px solid var(--accent); }
.btn-add { background: var(--primary); color: white; padding: 15px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 20px; font-size: 16px; }
.btn-cancel { background: #64748b; color: white; margin-top: 10px; border: none; padding: 10px; border-radius: 8px; cursor: pointer; display: none; width: 100%; }
.table-container { background: white; border-radius: 12px; overflow-x: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
table { width: 100%; border-collapse: collapse; min-width: 800px; }
th { background: #f8fafc; padding: 15px; color: #64748b; font-size: 11px; text-transform: uppercase; text-align: left; }
td { padding: 15px; border-top: 1px solid #f1f5f9; font-size: 14px; }
.tag { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 10px; color: #64748b; }
.low-stock { color: #ef4444; font-weight: bold; }
.navbar { position: fixed; top: 0; left: 0; width: 100%; background: white; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.05); z-index: 1000; }
.nav-logo { font-weight: 800; color: var(--dark); font-size: 1.1rem; display: flex; align-items: center; gap: 10px; }
.nav-logo i { color: var(--primary); }
.nav-buttons { display: flex; gap: 12px; }
.btn-nav { padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 13px; border: none; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
.btn-home { background: #ecfdf5; color: #059669; }
    
    </style>
</head>
<body>

<div class="navbar">
    <div class="nav-logo">
        <i class="fas fa-boxes"></i> ERP ABP - Produtos
    </div>
    <div class="nav-buttons">
        <a href="index.html" class="btn-nav btn-home"><i class="fas fa-home"></i> Início</a>
        <button class="btn-nav" onclick="sairDaConta()"><i class="fas fa-sign-out-alt"></i> Sair</button>
    </div>
</div>

<div class="container">
    <div class="card">
        <h3 id="form-title">Novo Produto</h3>
        <input type="hidden" id="edit-id">
        
        <div class="section-title">Informações Básicas</div>
        <div class="form-grid">
            <div style="grid-column: span 2;">
                <label>Nome do Produto *</label>
                <input type="text" id="nome" class="form-input" placeholder="Ex: Cimento CP-II">
            </div>
            <div>
                <label>Código de Barras (EAN)</label>
                <button type="button" class="btn-scan" onclick="startScanner()">
                    <i class="fas fa-camera"></i> Ler Código
                </button>
                <div id="reader"></div>
                <input type="text" id="codigo_de_barras" class="form-input">
            </div>
            <div>
                <label>Data de Compra</label>
                <input type="date" id="data_compra" class="form-input">
            </div>
            <div>
                <label>Marca</label>
                <input type="text" id="marca" class="form-input">
            </div>
            <div>
                <label>SKU / Código Interno</label>
                <input type="text" id="sku" class="form-input">
            </div>
            <div>
                <label>Categoria</label>
                <input type="text" id="categoria_prod" class="form-input">
            </div>
            <div>
                <label>Fornecedor (Entidade)</label>
                <select id="entidade_id" class="form-input">
                    <option value="">Carregando fornecedores...</option>
                </select>
            </div>
            <div>
                <label>Data de Vencimento</label>
                <input type="date" id="data_vencimento" class="form-input">
            </div>
        </div>

        <div class="section-title">Imagem do Produto</div>
        <div class="form-grid">
            <div style="grid-column: span 2;">
                <label>Foto do Produto (Câmera ou Arquivo)</label>
                <input type="file" id="foto_arquivo" accept="image/*" capture="environment" class="form-input" onchange="processarImagem(this)">
                <input type="hidden" id="imagem_url">
                <div id="preview-container" style="margin-top: 10px; display: none; text-align: center;">
                    <img id="img-preview" src="" style="max-width: 120px; border-radius: 8px; border: 2px solid #3ecf8e; margin: auto;">
                    <button type="button" onclick="removerFoto()" style="color: #ef4444; font-size: 11px; margin-top: 5px;">Remover Foto</button>
                </div>
            </div>
        </div>

        <div class="section-title">Descrição e Detalhes</div>
        <div style="margin-bottom: 20px;">
            <textarea id="descricao" class="form-input" rows="3" placeholder="Informações adicionais..."></textarea>
        </div>

        <div class="section-title">Preços e Estoque</div>
        <div class="form-grid">
            <div><label>Custo (R$)</label><input type="number" id="preco_custo" class="form-input" step="0.01" value="0.00"></div>
            <div><label>Venda (R$) *</label><input type="number" id="preco_venda" class="form-input" step="0.01" value="0.00"></div>
            <div><label>Estoque Atual *</label><input type="number" id="estoque_atual" class="form-input" value="0"></div>
            <div><label>Estoque Mínimo</label><input type="number" id="estoque_minimo" class="form-input" value="5"></div>
        </div>

        <button class="btn-add" id="btn-save" onclick="handleSaveProduto()">Salvar Produto</button>
        <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
    </div>

    <div class="card">
        <label><i class="fas fa-search"></i> BUSCA INTELIGENTE</label>
        <input type="text" id="inputBusca" onkeyup="filtrarProdutos()" placeholder="Buscar por Nome, SKU, Código ou Marca...">
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Foto / Código</th>
                    <th>Produto / Marca</th>
                    <th>Datas (Compra/Venc.)</th>
                    <th>Venda</th>
                    <th>Estoque</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="produtos-list"></tbody>
        </table>
    </div>
</div>
<script>

    // Configuração do Supabase (Mantenha suas chaves conforme o arquivo original)
const supabaseUrl = 'https://eisruaetsqrratemqswv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc3J1YWV0c3FycmF0ZW1xc3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDI4OTAsImV4cCI6MjA4NTM3ODg5MH0.Rb-nu9zBL7TNWoGNYHvETWMfbqO1NF7UID4TdSYyKS4';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
window.supabaseClient = _supabase;

let html5QrCode;

// --- 1. AUTENTICAÇÃO ---
async function checarAutenticacao() {
    const { data: { session }, error } = await window.supabaseClient.auth.getSession();
    if (error || !session) window.location.href = "login.html";
}

// --- 2. PROCESSAMENTO DE IMAGEM (COMPRESSÃO E BASE64) ---
function processarImagem(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 400; // Tamanho ideal para mobile
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_WIDTH) {
                    width *= MAX_WIDTH / height;
                    height = MAX_WIDTH;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Comprime para JPEG com 60% de qualidade
            const base64 = canvas.toDataURL('image/jpeg', 0.6);
            
            document.getElementById('imagem_url').value = base64;
            document.getElementById('img-preview').src = base64;
            document.getElementById('preview-container').style.display = 'block';
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function removerFoto() {
    document.getElementById('foto_arquivo').value = "";
    document.getElementById('imagem_url').value = "";
    document.getElementById('preview-container').style.display = 'none';
}

// --- 3. LEITOR DE CÓDIGO DE BARRAS ---
function startScanner() {
    const readerDiv = document.getElementById('reader');
    readerDiv.style.display = 'block';
    
    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 150 } },
        (decodedText) => {
            document.getElementById('codigo_de_barras').value = decodedText;
            stopScanner();
        },
        (errorMessage) => { /* Silencioso */ }
    ).catch(err => alert("Erro ao acessar câmera: " + err));
}

function stopScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            document.getElementById('reader').style.display = 'none';
        });
    }
}

// --- 4. CARREGAR FORNECEDORES (CORRIGIDO) ---
async function carregarFornecedores() {
    try {
        const { data, error } = await window.supabaseClient
            .from('entidades')
            .select('id, nome_completo');
        
        const select = document.getElementById('entidade_id');
        
        if (error) throw error;

        if (data && data.length > 0) {
            select.innerHTML = '<option value="">Selecione um fornecedor...</option>' + 
                data.map(e => `<option value="${e.id}">${e.nome_completo}</option>`).join('');
        } else {
            select.innerHTML = '<option value="">Nenhum fornecedor cadastrado</option>';
        }
    } catch (err) {
        console.error("Erro ao carregar fornecedores:", err);
    }
}

// --- 5. SALVAR PRODUTO (CORREÇÃO DE UUID VAZIO) ---
async function handleSaveProduto() {
    const id = document.getElementById('edit-id').value;
    const campos = [
        'nome', 'codigo_de_barras', 'marca', 'sku', 'categoria_prod',
        'entidade_id', 'data_vencimento', 'data_compra', 'descricao',
        'preco_custo', 'preco_venda', 'estoque_atual', 'estoque_minimo', 'imagem_url'
    ];

    const payload = {};
    campos.forEach(c => {
        const el = document.getElementById(c);
        if (el) {
            const valor = el.value.trim();
            if (valor !== "") {
                payload[c] = (el.type === 'number') ? parseFloat(valor || 0) : valor;
            }
        }
    });

    // Remove entidade_id se estiver vazio para evitar erro de UUID no Supabase
    if (!payload.entidade_id || payload.entidade_id === "") {
        delete payload.entidade_id;
    }

    let result;
    if (id) {
        result = await window.supabaseClient.from('produtos').update(payload).eq('id', id);
    } else {
        result = await window.supabaseClient.from('produtos').insert([payload]);
    }

    if (result.error) {
        alert("Erro ao salvar: " + result.error.message);
    } else {
        alert(id ? "Produto atualizado!" : "Produto cadastrado!");
        resetForm();
        loadProdutos();
    }
}

// --- 6. LISTAGEM E TABELA ---
async function loadProdutos() {
    const { data, error } = await window.supabaseClient.from('produtos').select('*').order('nome', { ascending: true });
    if (error) return console.error(error);
    renderTable(data);
}

function renderTable(data) {
    const tbody = document.getElementById('produtos-list');
    tbody.innerHTML = data.map(p => `
        <tr>
            <td>
                ${p.imagem_url ? `<img src="${p.imagem_url}" style="width:45px; height:45px; object-fit:cover; border-radius:6px; margin-bottom:5px;">` : '<i class="fas fa-image" style="font-size:24px; color:#ddd"></i>'}
                <br><span class="tag">${p.codigo_de_barras || 'S/ EAN'}</span>
            </td>
            <td><strong>${p.nome}</strong><br><small>${p.marca || '-'}</small></td>
            <td><small>Comp: ${p.data_compra || '-'}<br>Venc: ${p.data_vencimento || '-'}</small></td>
            <td>R$ ${parseFloat(p.preco_venda).toFixed(2)}</td>
            <td class="${p.estoque_atual <= p.estoque_minimo ? 'low-stock font-bold' : ''}">
                ${p.estoque_atual} ${p.estoque_atual <= p.estoque_minimo ? '<i class="fas fa-exclamation-triangle"></i>' : ''}
            </td>
            <td>
                <button class="btn-edit" onclick="editProduto('${p.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-del" onclick="deleteProduto('${p.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

// --- 7. UTILITÁRIOS ---
async function editProduto(id) {
    const { data, error } = await window.supabaseClient.from('produtos').select('*').eq('id', id).single();
    if (error) return alert("Erro ao carregar dados.");

    Object.keys(data).forEach(key => {
        const el = document.getElementById(key);
        if (el) {
            el.value = data[key] || (el.type === 'number' ? '0' : '');
            if (key === 'imagem_url' && data[key]) {
                document.getElementById('img-preview').src = data[key];
                document.getElementById('preview-container').style.display = 'block';
            }
        }
    });

    document.getElementById('edit-id').value = data.id;
    document.getElementById('form-title').innerText = "Editando: " + data.nome;
    document.getElementById('btn-save').innerText = "Atualizar Produto";
    document.getElementById('btn-cancel').style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteProduto(id) {
    if (!confirm("Excluir este produto?")) return;
    const { error } = await window.supabaseClient.from('produtos').delete().eq('id', id);
    if (!error) loadProdutos();
}

function filtrarProdutos() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    const linhas = document.querySelectorAll('#produtos-list tr');
    linhas.forEach(linha => {
        linha.style.display = linha.innerText.toLowerCase().includes(termo) ? '' : 'none';
    });
}

function resetForm() {
    // Limpa campos de input, select e textarea
    document.querySelectorAll('input, select, textarea').forEach(c => {
        if (c.id === 'estoque_minimo') c.value = '5';
        else if (c.type === 'number') c.value = '0.00';
        else c.value = '';
    });
    
    document.getElementById('edit-id').value = '';
    document.getElementById('imagem_url').value = '';
    document.getElementById('img-preview').src = '';
    document.getElementById('preview-container').style.display = 'none';
    document.getElementById('form-title').innerText = "Novo Produto";
    document.getElementById('btn-save').innerText = "Salvar Produto";
    document.getElementById('btn-cancel').style.display = "none";
}

async function sairDaConta() {
    if(confirm("Sair do sistema?")) {
        await window.supabaseClient.auth.signOut();
        window.location.href = 'login.html';
    }
}

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    checarAutenticacao();
    loadProdutos();
    carregarFornecedores();
});
    
</script>
</body>
</html>


```











