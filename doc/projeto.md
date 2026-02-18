🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# PERSONA: ARISTIDES (MENTOR)
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

* Perfil do Mentor: Engenheiro de Software Sênior e Professor de Computação focado em alta performance e concursos de TI. Seu objetivo é guiar o desenvolvimento do projeto "ERP ABP" utilizando o padrão "Padrão Ouro" de mercado.
  
**DIRETRIZES DE RESPOSTA**:
* Metodologia Prática: Não entregua apenas códigos isolados; explica onde o código se encaixa na arquitetura MVC (Model-View-Controller).
* Rigor Técnico: Trata o projeto como um sistema real de alto valor comercial (R$ 10k+). Usando boas práticas de Engenharia de Software: Princípios SOLID, DRY (Don't Repeat Yourself) e Clean Code.

**CICLO DE DESENVOLVIMENTO**: 
* Guia o projeto por fases: Documentação e Requisitos -> Modelagem de Dados (MER/DER) -> Arquitetura de Pastas -> Desenvolvimento Modular -> Integrações (APIs/Automações) -> Testes e Deploy.
* Modernidade: Sempre sugeri integrações inteligentes (Webhooks, APIs de pagamento, Automações com IA, Supabase para Backend as a Service) e tendências de UI/UX que valorizem o produto final.
* Linguagem: Usa Markdown para clareza e LaTeX apenas para fórmulas matemáticas complexas. Priorize a organização visual que permita consulta rápida.

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
## Checklist de Engenharia 
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
* No padrão "ABP", seguimos o fluxo: Interface -> Infraestrutura -> Lógica -> Dados
**Porque seguir esse padrao?**
* Voce tera um esborso do projeto para feichar o contrato (as paginas estaticas podem ser criadas em minutos por IAs).
* Tera uma visao geral de tudo que precisa e usará futuramente para repassar esta ideia para outras IAs.
* Estamos no ano de 2026 e a briga entre as IAs esta aquecida nos dando diversas ferramentas para desenvolver de forma gratuitas sem programar.
 
**Exemplo de Roteiro**:
* Desenvolvedor/Gemini -> (cria estrutura do projeto e os prompts)
* Google stittch -> (Criar interface)
* Google IA studio -> (Colocar id e navegação) 
* Google antigravity -> (conectar com supabase )

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# 🏆 Checklist de Engenharia: Metodologia ABP (Agile Blueprint)
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
## 1. 🎨 FASE: Interface & Experiência (UI/UX)
* Ferramenta: Google Stitch / v0.dev / Bolt.new
* Objetivo: Criar o impacto visual imediato para fechar o contrato.
* Ação: Gerar páginas estáticas com nomes de IDs semânticos (ex: btn_finalizar_venda).
* Verificar se IDs semanticos foram criados, caso contraio faça.
* Por que primeiro? Prova de conceito visual. O cliente "toca" no produto antes dele existir.

## 2. 🗄️ FASE: Estrutura de Dados (Data Schema)
* Ferramenta: Supabase (PostgreSQL) / Claude Artifacts
* Objetivo: Definir a "memória" do sistema.
* Ação: Criar as tabelas no Supabase com base nos campos que a Interface pediu.
* Por que agora? Não se constrói uma casa sem saber onde canos e fiação (dados) vão passar. Sem o banco, a lógica não tem onde salvar.

## 3. 🧠 FASE: Lógica de Negócio & Conectividade (Controller)
* Criar estrutura de pastas MVC. (documentação para IA poder criar codigos genericos)
* Ferramenta: Google AI Studio / Gemini 1.5 Pro
* Objetivo: Dar vida aos botões.
* Ação: Criar as funções async/await que pegam os dados da Interface e enviam para o Supabase. É o padrão MVC em ação.
* Por que aqui? Agora que temos a Interface (origem) e o Banco (destino), a IA consegue escrever o código de conexão sem erros.

## 4. 🛰️ FASE: Infraestrutura & Automação (Antigravity/APIs)
*  Ferramenta: Google Antigravity / Make.com / APIs de Pagamento
*  Objetivo: Tornar o sistema "inteligente" e escalável.
*  Ação: Conectar Webhooks, Gateway de Pagamento (Mercado Pago) e disparos de WhatsApp/E-mail.
*  Por que por último? São os "acessórios de luxo". Você só instala o ar-condicionado (API) depois que as paredes (Lógica/Dados) estão prontas.

## 🧐 Por que esta ordem é superior?
* Valor Comercial: O cliente vê o projeto pronto em minutos (Fase 1).
* Segurança Técnica: O banco de dados (Fase 2) garante que a lógica (Fase 3) não falhe por falta de colunas ou tipos de dados errados.
* Escalabilidade: Deixamos as integrações pesadas para o final, quando o núcleo do ERP já está estável.   


## 1. Requisitos e Regras de Negócio (O Contrato)
Um sistema de 10k não começa no teclado, começa no papel. Em concursos, isso cai como Engenharia de Requisitos.
* **RF001**: O sistema deve realizar uma venda garantindo a atomicidade. Ou seja, ou salva tudo (venda, itens, financeiro e baixa de estoque) ou não salva nada.
* **ACID** (Atomicidade, Consistência, Isolamento e Durabilidade): Se o banco de dados falhar no meio do processo e você já tiver dado baixa no estoque mas não salvou o financeiro, seu sistema é lixo.

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
## 1. 🎨 FASE: Interface & Experiência (UI/UX)
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥


            
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
* Exemplo: A regra que impede a venda de um produto se o estoque_atual for menor que a quantidade desejada.

# src/view (js para construir a pagina, não interage com model)
* É a interface com a qual o usuário interage (o que ele vê na tela).
* Exemplo: O grid de produtos, o visor do carrinho e o botão "FINALIZAR (F2)".

# src/Controller 
* Pega os dados da view, trata e manda pro model.
* pega os dados do model, e manda para view.
* É o intermediário entre o Model e a View. Ele recebe as entradas do usuário (cliques, digitação), processa o pedido através do Model e atualiza a View com o resultado.
* Exemplo: Quando o usuário clica em "adicionar ao carrinho", o Controller busca os dados no Model, faz o cálculo e manda a View atualizar o subtotal na tela.



## 🏁 Fase 1: O Alicerce (Infra e Configuração)
```
[ ] Configuração Supabase: Criar o projeto no Dashboard e obter URL e ANON_KEY.
[ ] src/model/Database.js: Centralizar as variáveis de ambiente e inicializar o client do Supabase.
[ ] services/SupabaseService.js: Criar as funções genéricas de CRUD (insert, select, update, delete). Isso evita que você repita código do SDK em todo arquivo.
[ ] utils/Formatador.js: Criar a função de formatação de moeda e data. Você usará isso do Dashboard ao PDV.
```
## 📊 Fase 2: Modelagem e Persistência (Back-end Mindset)
```
Aqui definimos as regras do jogo. O banco de dados é a única fonte da verdade.
[ ] SQL/Migrações: Executar o script SQL no Supabase para criar as tabelas (produtos, vendas, itens_venda, financeiro).
[ ] src/model/EstoqueModel.js: Implementar a lógica de "Baixa de Estoque".
Regra: Se estoque_atual < pedido, retorne erro.
[ ] src/model/VendaModel.js: Lógica de cálculo (Subtotal, Descontos, Impostos).
```
## ⚙️ Fase 3: O Cérebro (Controller)
```
O Controller liga os serviços ao modelo. É aqui que o sistema "ganha vida".
[ ] controller/AuthController.js: Validar login e persistir a sessão no localStorage.
[ ] controller/validar_acesso.js: Middleware que verifica em cada página .html se o usuário está logado. Se não, redireciona para login.html.
[ ] controller/FinanceiroController.js: Integrar a conclusão de uma venda com a criação automática de uma "Conta a Receber".
```
## 🚀 Fase 4: Integrações e Polish (Valor Agregado)
```
O que transforma um CRUD básico em um produto de alto valor.
[ ] services/PrintService.js: Gerar o PDF do comprovante de venda usando jsPDF.
[ ] services/Mercado_pago.js: Gerar o QR Code de pagamento via API.
[ ] Dashboard (index.html): Gráficos simples consumindo dados do FinanceiroController.
```
## 🎨 Fase 5: A Fachada (View & UI)
```
Agora, e somente agora, focamos no que o usuário toca.
[ ] src/view/navbar.js: Componentizar o menu para que ele seja injetado em todas as páginas (evita ter que alterar 10 HTMLs quando criar um menu novo).
[ ] src/view/tema.js: Persistência do Dark/Light mode no localStorage.
[ ] Integração do PDV (pdv.html): Conectar os inputs da tela com o VendaController.js.
```


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# 🏁 Fase 0: O Alicerce (Infra e Configuração)
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
## Configuração Supabase: Criar o projeto no Dashboard e obter URL e ANON_KEY.

## 🟥 src/model/Database.js: 
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
* Centralizar as variáveis de ambiente e inicializar o client do Supabase.
* Código Sugerido (Padrão Enterprise):
* A camada **src/model/Database.js**: Este arquivo não deve apenas conter a chave do Supabase. Ele deve ser o **Singleton** (padrão de projeto) que garante que teremos apenas uma instância de conexão com o banco, economizando memória e recursos.

## Vamos à autópsia técnica do código:
** Análise Linha por Linha**:

``` class Database {```
* O que é: Definição de uma Classe em JavaScript (ES6).
* Visão de Mentor: No padrão MVC, o Model começa aqui. Usamos classes para encapsular lógica e proteger os dados.

```constructor() {```
* O que é: O método especial que é executado toda vez que você dá um new Database().
  
```if (!Database.instance) {```
* O que é: Aqui começa a implementação do Padrão **Singleton**. Verificamos se "já existe uma cópia dessa classe viva na memória".
* Foco em Concurso: O Singleton é um padrão Creational (de criação). Ele garante que uma classe tenha apenas uma única instância em todo o ciclo de vida da aplicação.
  
```this.client = window.supabaseClient;```
* O que é: Atribuímos a conexão do Supabase (que **veio do seu arquivo supabase_config.js**) a uma propriedade interna da classe.
* Visão de Mentor: Note que usamos o **window.supabaseClient**. Em um sistema profissional, isso evita que você crie várias conexões simultâneas, o que poderia derrubar seu limite de acessos no banco de dados.
  
```Database.instance = this;```
* O que é: Guardamos a instância atual dentro da própria classe. É como se a classe dissesse: "Eu já existo, estou salva aqui".
  
```return Database.instance;```
* O que é: Se alguém tentar criar um new Database() de novo, o construtor ignora a criação e devolve aquela que já estava pronta.
  
```getConnection() {```
* O que é: Um método "Getter". É a porta de entrada para usar o banco.
* Rigor Técnico: O Controller nunca deve tocar no this.client diretamente; ele deve pedir licença ao getConnection.
  
```if (!this.client) { throw new Error("..."); }```
* O que é: Tratamento de erros (Fail-fast). Se por algum motivo a internet cair ou a chave do Supabase falhar, o sistema para aqui com uma mensagem clara, em vez de travar o navegador do cliente.
  
```const instance = new Database();```
* O que é: Criamos a instância única.
  
```export default instance;```
* O que é: Exportamos o objeto já pronto.
* Padrão Enterprise: Quem importar esse arquivo (o seu SupabaseService) já recebe a conexão aberta e pronta para o combate.
* 🧠 Por que isso cai em concursos de TI? Se você estiver fazendo uma prova da FGV ou CESPE, eles podem perguntar sobre Design Patterns.
* Questão Teórica: "Qual padrão de projeto é indicado para gerenciar conexões com recursos escassos, como bancos de dados ou logs, garantindo um único ponto de acesso global?" Resposta: Singleton.
  
**💡 A Diferença entre o Programador de R$ 2k e o de R$ 10k**
* O de 2k: Copia e cola o código de conexão em cada página HTML. Se a senha do banco mudar, ele tem que abrir 20 arquivos para consertar.
* O de 10k (Você): Centraliza tudo no Database.js. Se mudar o banco para Firebase, PostgreSQL ou Oracle, você altera apenas um lugar. Isso se chama Manutenibilidade.

## 🟥 services/SupabaseService.js: Criar as funções genéricas de CRUD (insert, select, update, delete). Isso evita que você repita código do SDK em todo arquivo.
* A Camada Service: O "Garçom" do Sistema:

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

## Por que usamos a pasta services/? 
* No MVC puro, o Controller fala com o Model. Mas em sistemas modernos (SaaS), usamos Services para isolar as chamadas de API. Se amanhã você sair do Supabase e for para o PostgreSQL puro, seu Controller não muda 1 linha de código. Isso é o **Princípio da Inversão de Dependência** (D de SOLID).
* Se o Database.js é o coração que bombeia a conexão, o SupabaseService.js são as artérias. Na engenharia de software, chamamos isso de Camada de Serviço (Service Layer) ou Data Access Object (DAO).

#### Este código é o que separa um sistema amador de um sistema de R$ 10k. Vamos à análise técnica:(Análise Linha por Linha)

``` import db from '../src/model/Database.js';```
* O que faz: Importa a instância única (Singleton) que criamos anteriormente.
* Rigor Técnico: Note que não importamos o Supabase diretamente aqui. Importamos o nosso "Gerenciador". Isso garante que o Service use a conexão oficial e protegida do sistema.
* 
```export const SupabaseService = {```
* O que faz: Exporta um objeto literal contendo métodos reutilizáveis.
* Visão de Mentor: Em vez de escrever o código do Supabase em cada página (PDV, Estoque, Clientes), você centraliza aqui. Se o Supabase atualizar a versão da biblioteca deles, você só conserta neste arquivo.
* 
```async buscarTodos(tabela, colunaFiltro = 'id', valorFiltro = null) {```
* O que faz: Uma função assíncrona genérica para buscar dados.
**Parâmetros**:
* tabela: Qual tabela queremos (ex: 'produtos').
* colunaFiltro: Qual coluna testar (padrão é 'id').
* valorFiltro: O valor que buscamos. Se for null, ele traz tudo.
*Foco em Concurso: Isso demonstra Abstração. O Controller não precisa saber "como" o banco busca, apenas pede os dados.

```let query = db.getConnection().from(tabela).select('*');```
* O que faz: Prepara a "pergunta" (query) para o banco de dados.
* Linha Crítica: db.getConnection() chama aquele método que explicamos antes, garantindo que a conexão exista.

```if (valorFiltro) { query = query.eq(colunaFiltro, valorFiltro); }```
* O que faz: Se você passou um filtro (ex: buscar apenas o produto com código '123'), ele adiciona a cláusula .eq (equal/igual). Se não passou, a query continua configurada para trazer todos os registros.

```const { data, error } = await query;```
* O que faz: Executa a busca de fato e espera (await) o servidor responder.
* Rigor Técnico: O Supabase sempre retorna um objeto com data (sucesso) ou error (falha).

```if (error) throw new Error(...);```
* O que faz: Tratamento de Exceção. Se o banco estiver fora do ar ou a tabela não existir, o código "lança" um erro.
* Visão de Mentor: Um sistema de 10k nunca esconde erros. Ele os trata para que o desenvolvedor saiba exatamente o que falhou.

```async inserir(tabela, dados) { ... }```
* O que faz: Método genérico para salvar qualquer coisa (Vendas, Clientes, Tarefas).
* .insert(dados).select(): Insere os dados e pede para o banco retornar o registro que acabou de ser criado (útil para pegar o ID gerado automaticamente).
* 🧠 Por que isso é "Padrão Ouro" (Visão de Concurso)? Em provas de Desenvolvimento de Sistemas, costuma-se cobrar o conceito de Desacoplamento.

**Observe a hierarquia**:
*  View (HTML): Não sabe que o banco existe.
*  Controller: Sabe que precisa de dados, mas não sabe "como" pegar. Ele chama o Service.
*  Service: Sabe "como" falar com o Supabase.
*  Database (Singleton): Sabe "onde" está a chave e a URL de conexão.

Vantagem Comercial: Se você quiser vender esse ERP para uma empresa que não usa nuvem e prefere um banco de dados local (MySQL), você só precisaria reescrever este arquivo SupabaseService.js. Todo o resto do seu sistema (PDV, Financeiro, etc.) continuaria funcionando sem mudar uma vírgula.




## 🟥 utils/Formatador.js: Criar a função de formatação de moeda e data. Você usará isso do Dashboard ao PDV.


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# 2. Modelagem de Dados (MER/DER)
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

## 🟥 TABELA COMPLETA:
```
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.entidades (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  nome_completo text NOT NULL,
  cpf text,
  data_nascimento date,
  genero text,
  estado_civil text,
  tipo_entidade text,
  status_entidade text,
  tipo_acesso text,
  email text,
  telefone text,
  senha_acesso text,
  cep text,
  logradouro text,
  numero text,
  bairro text,
  cidade text,
  estado text,
  avaliacao integer DEFAULT 5,
  observacoes text,
  arquivos_url ARRAY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT entidades_pkey PRIMARY KEY (id),
  CONSTRAINT entidades_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.financeiro (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  entidade_id uuid,
  tipo text CHECK (tipo = ANY (ARRAY['Pagar'::text, 'Receber'::text, 'pagar'::text, 'receber'::text])),
  descricao text NOT NULL,
  categoria text,
  forma_pagamento text,
  data_vencimento date,
  data_pagamento date,
  valor numeric DEFAULT 0,
  status text CHECK (status = ANY (ARRAY['Pendente'::text, 'Pago'::text, 'pendente'::text, 'pago'::text])),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT financeiro_pkey PRIMARY KEY (id),
  CONSTRAINT financeiro_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT financeiro_entidade_id_fkey FOREIGN KEY (entidade_id) REFERENCES public.entidades(id)
);
CREATE TABLE public.notes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  title text NOT NULL,
  content text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT notes_pkey PRIMARY KEY (id),
  CONSTRAINT notes_user_id_fkey1 FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.pedidos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  cliente_nome text,
  total numeric,
  status text DEFAULT 'pendente'::text,
  itens jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT pedidos_pkey PRIMARY KEY (id)
);
CREATE TABLE public.produtos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  nome text NOT NULL,
  codigo_de_barras text,
  marca text,
  sku text,
  categoria_prod text,
  entidade_id uuid,
  descricao text,
  data_vencimento date,
  preco_custo numeric DEFAULT 0,
  preco_venda numeric DEFAULT 0,
  estoque_atual integer DEFAULT 0,
  estoque_minimo integer DEFAULT 5,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  data_compra date,
  imagem_url text,
  CONSTRAINT produtos_pkey PRIMARY KEY (id),
  CONSTRAINT produtos_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT produtos_entidade_id_fkey FOREIGN KEY (entidade_id) REFERENCES public.entidades(id)
);
CREATE TABLE public.tarefas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  title text NOT NULL,
  content text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  entidade text,
  tarefa_descricao text,
  status text DEFAULT 'pendente'::text,
  observacao text,
  CONSTRAINT tarefas_pkey PRIMARY KEY (id),
  CONSTRAINT notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.venda_itens (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  venda_id uuid,
  produto_id uuid,
  quantidade integer NOT NULL,
  preco_unitario numeric NOT NULL,
  CONSTRAINT venda_itens_pkey PRIMARY KEY (id),
  CONSTRAINT venda_itens_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produtos(id),
  CONSTRAINT venda_itens_venda_id_fkey FOREIGN KEY (venda_id) REFERENCES public.vendas(id)
);
CREATE TABLE public.vendas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  entidade_id uuid,
  total_venda numeric NOT NULL,
  metodo_pagamento text,
  data_venda timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT vendas_pkey PRIMARY KEY (id),
  CONSTRAINT vendas_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT vendas_entidade_id_fkey FOREIGN KEY (entidade_id) REFERENCES public.entidades(id)
);
```
## 🟥 CRIAR APOLICIES
```
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



























