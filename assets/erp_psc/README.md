# PROPOSTA TÉCNICA E COMERCIAL: ERP-PSC (PLATAFORMA CLÍNICA SEGURA
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# 1. VISÃO GERAL DO PROJETO
* O ERP-PSC é um ecossistema digital de alta performance desenvolvido exclusivamente para Psicopedagogos. 
* O sistema centraliza a gestão de pacientes, o acompanhamento terapêutico e o controle financeiro em um ambiente que garante o sigilo absoluto das informações clínicas, respeitando a ética profissional e a privacidade dos dados.
* O sistema terá trez niveis de acesso (supervisor/master - Psicopedagogos/funcionarios- Pacientes/clientes) cada um podendo acessar interface com nivel de acesso a sua categoria.
  
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# 2. DIFERENCIAIS DE SEGURANÇA (DADOS SENSÍVEIS)
Considerando que o sistema lida com diagnósticos e prontuários, a segurança foi construída em nível bancário:

• PROTEÇÃO RLS (Row Level Security): Os dados são blindados diretamente no Banco de Dados. Mesmo em caso de tentativas de acesso indevido, um profissional tecnicamente jamais conseguirá visualizar dados de pacientes de outro profissional.
• CONFORMIDADE COM A LGPD: O sistema segue as diretrizes da Lei Geral de Proteção de Dados, garantindo o direito ao sigilo e a rastreabilidade de acessos (Auditoria).
• AUTENTICAÇÃO CRIPTOGRAFADA: Uso de tokens JWT (JSON Web Tokens) que expiram automaticamente, garantindo que a sessão seja encerrada em caso de inatividade.

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# 3. ARQUITETURA TECNOLÓGICA
O sistema utiliza o que há de mais moderno em desenvolvimento web para garantir rapidez e robustez:
• FRONTEND: Interface responsiva (PC e Celular) utilizando Tailwind CSS.
• BACKEND: Infraestrutura em Nuvem (Supabase) com banco de dados PostgreSQL.
• SEGURANÇA: Camada intermediária de validação de acesso em tempo real.

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# 4. FUNCIONALIDADES PRINCIPAIS (FASE 1 e 2)
### [PARA O SUPERVISOR]
* ACESSO MASTER: Controle Total do Sistema.
• DASHBOARD ESTRATÉGICO: Resumo de pacientes, tarefas e saúde financeira.
• GESTÃO DE ENTIDADES: Cadastro completo (Colaboradores, Pacientes e Responsáveis).
• EVOLUÇÕES CLÍNICAS: Prontuário digital com histórico de sessões protegido.
• CONTROLE FINANCEIRO: Gestão de mensalidades e recebimentos.

### [PARA O PROFISSIONAL]
• DASHBOARD ESTRATÉGICO: Resumo de pacientes, tarefas e saúde financeira (APENAS LEITURA).
• GESTÃO DE ENTIDADES: Cadastro completo (Pacientes e Responsáveis).
• EVOLUÇÕES CLÍNICAS: Prontuário digital com histórico de sessões protegido.
• CONTROLE FINANCEIRO: Gestão de mensalidades e recebimentos.(APENAS LEITURA).

### [PARA O PACIENTE/RESPONSÁVEL]
• ÁREA DE ATIVIDADES: Acesso restrito via CPF para realização de tarefas e exercícios propostos.
• FEEDBACK TERAPÊUTICO: Visualização do progresso lúdico e feedbacks do profissional.
• CONTROLE FINANCEIRO: Gestão de mensalidades.(APENAS LEITURA).

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# 5. HOSPEDAGEM E DISPONIBILIDADE
O sistema será hospedado em servidores de alta disponibilidade (GitHub Pages/Vercel) e os dados residirão em um dos servidores mais seguros do mundo (Supabase/PostgreSQL), garantindo 99.9% de tempo de atividade e backups automáticos.


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# REGRAS DE NEGOCIO:

## 1. Arquitetura de Segurança (O Core do Projeto)
* Para dados sensíveis, não confiamos no JavaScript do navegador para proteger nada. O navegador serve apenas para exibir; quem protege é o Banco de Dados.
* Camada 1: RLS (Row Level Security) - Obrigatório: No Supabase, nenhuma tabela pode ser lida sem uma política de segurança.
- Regra: auth.uid() == profissional_responsavel_id. Isso garante que mesmo que um hacker descubra o ID de um paciente, ele não conseguirá puxar os dados se não for o "dono" do registro.
* Camada 2: Proteção de PII (Personally Identifiable Information): Dados como CPF e Diagnósticos devem ter políticas de acesso restritas.
* Camada 3: Auditoria: Criar uma tabela de logs_acesso para registrar quem visualizou qual ficha de paciente e quando.

## 2. Cronograma de Fases (Focado em Robustez)
* Infraestrutura e Autenticação Blindada (Concluída/Ajuste)
- Ajuste de Segurança: Mover as chaves do Supabase para variáveis de ambiente ou garantir que a anon_key tenha permissões mínimas.
- Middleware de Proteção: Criar um script security.js que roda antes de qualquer elemento da página carregar, verificando a validão do JWT (Token) do usuário.
- Mecanismo de Logout Automático: Se o usuário ficar inativo por 30 minutos, o sistema deve encerrar a sessão para evitar que terceiros vejam os dados em computadores compartilhados.

* Gestão de Entidades e Vínculo de Dados
- Criação do Perfil do Profissional: Ao logar pela primeira vez, o sistema obriga o preenchimento dos dados do psicopedagogo.
- Cadastro de Pacientes com Hash: O sistema deve validar CPFs e evitar duplicidade.
- Vínculo Forte: Todo registro nas tabelas tarefas, financeiro e evolucoes deve carregar obrigatoriamente o user_id do profissional e o paciente_id.

* Módulo Clínico (Área Crítica)
- Evoluções Diárias: Registro de sessões com texto criptografado ou protegido por RLS.
- Upload de Documentos: Utilizar o Supabase Storage com pastas privadas. O link do arquivo deve expirar em poucos minutos (Signed URLs).
- Tarefa e Exercícios: O paciente acessa apenas com seu CPF e uma senha simplificada, vendo exclusivamente o que lhe foi atribuído.

* Financeiro e Conformidade (LGPD)
- Relatórios: Geração de recibos e controle de pagamentos.
- Termos de Consentimento: O sistema deve gerar um termo digital onde o responsável pelo paciente aceita o tratamento dos dados, conforme a LGPD brasileira.

## 3. Plano de Implementação Técnica (Próximos Passos)
Para garantir a robustez, recomendo as seguintes ações imediatas:
* A. Central de Segurança (src/middleware/auth_check.js)
- Não use apenas um redirecionamento simples. Use um verificador que bloqueie o render do HTML:

```
// Este script deve ser o primeiro no <head>
(async () => {
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
        window.location.replace('login.html');
    } else {
        document.documentElement.style.display = 'block';
    }
})();
```

* B. Padronização de Erros
- Nunca exiba erros técnicos do banco para o usuário (ex: "Postgres Error 42P01"). Crie uma função de tratamento que apenas diga "Ocorreu um erro ao processar os dados. Tente novamente".

* C. Proteção no GitHub
- Arquivo .gitignore: Certifique-se de que arquivos de configuração com chaves privadas nunca sejam enviados para o repositório público.
- GitHub Actions: Configurar para que qualquer código enviado passe por uma análise básica de segurança.

## 4. Modelo de Dados Seguro (Tabela Entidades)
Sua tabela entidades no banco de dados deve refletir essa hierarquia:
* UUID (Internal): Para o sistema.
* Professional_ID: Quem é o dono do dado.
* Encrypted_Data (Opcional): Campos extremamente sensíveis podem ser salvos com uma camada extra de proteção.


## 5. VISAR ESCALABILIDADES PARA:
### 1. Segurança Jurídica e Conformidade (Além do RLS)
* Assinatura Digital de Prontuários: Para que o prontuário tenha validade jurídica plena (em caso de perícias ou solicitações judiciais), implemente uma função de "Fechamento de Evolução". Uma vez que o profissional escreve a nota do dia e a "assina" (pode ser via certificado digital ou um hash de integridade), o sistema impede edições retroativas.
* Trilha de Auditoria Expositiva (Audit Log): O Supabase permite rastrear mudanças, mas seria ideal ter uma interface para o Administrador/Supervisor ver quem acessou qual prontuário e quando. Isso é um requisito forte da LGPD para dados sensíveis.

### 2. Melhorias na Experiência do Paciente/Responsável
* Notificações via WhatsApp/E-mail: Integrar uma API (como Twilio ou Evolution API) para enviar lembretes de consultas automáticos. Em clínicas psicopedagógicas, o índice de faltas diminui drasticamente com lembretes 24h antes.
* Repositório de Documentos: Uma área onde o responsável possa fazer upload de laudos médicos anteriores, exames ou relatórios escolares, centralizando todo o histórico do paciente em um só lugar seguro.

### 3. Funcionalidades Clínicas Avançadas
* Gerador de Relatórios Automatizado: Criar modelos (templates) de relatórios psicopedagógicos onde o sistema puxa automaticamente os dados do paciente e as últimas evoluções, economizando horas de digitação para o profissional.
* Anamnese Personalizável: Em vez de um formulário fixo, permitir que o Supervisor crie campos personalizados para a anamnese, já que cada clínica pode ter um protocolo diferente.

### 4. Gestão e Business Intelligence (BI)
* Dashboard de Conversão: Para o nível "Supervisor", um gráfico que mostre quantos pacientes iniciaram a avaliação e quantos seguiram para o tratamento (retenção).
* Controle de Fluxo de Caixa com DRE: Além de registrar entradas e saídas, gerar um demonstrativo simples para que o dono da clínica entenda o lucro real após impostos e custos fixos.

### 5. Melhorias Técnicas (Performance e UX)
* Modo Offline para Evoluções: Psicopedagogos muitas vezes atendem em locais com internet instável. Usar Service Workers (PWA) para permitir que o profissional escreva a evolução mesmo sem rede e o sistema sincronize com o Supabase assim que a conexão voltar.
* Máscaras e Validações no Frontend: No código que vi no arquivo, a validação é simples. Adicionar bibliotecas de máscara para CPF, Telefone e Datas evita que dados "sujos" cheguem ao banco de dados.

### 6. Automação de Marketing (Diferencial Comercial)
* Lista de Espera Inteligente: Se um paciente desmarcar, o sistema poderia sugerir automaticamente o próximo da lista de espera que tenha disponibilidade naquele horário.
   
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
## ARQUITETURA MVC DO ERP-PSC

```
PROJETO_ERP/
├── index.html # Redireciona para src/view/index.html
├── assets/ # Arquivos estáticos (CSS, Imagens)
│   ├── img/ # Ícones e logos
│   └── style/ # Estilos CSS segmentados
└── src/   # Código fonte da aplicação
    ├── model/ # Interação com Banco de Dados (Supabase)
    │   ├── supabase_config.js # cofiguraçao de chaves (Supabase)
    │   ├── login.js # cadastra e faz o login
    │   ├── auth_check.js. # validação em tempo real do JWT (JSON Web Token) 
    │   └── ...
    ├── view/                       # Interface do usuário (HTML puro)
    │   ├── index.html
    │   ├── login.html
    │   └── ...
    ├── controller/              # Lógica de interface e ponte MVC
    │   ├── navbar.js
    │   └── ...
    └── services/                # Integrações externas e Backend (Edge Functions)
        └── mercadopago_supabase/
            ├── doc.md
            ├── index.html
            ├── servicos.json
            ├── site.html
            ├── sucesso.html
            └── supabase/
                └── functions/
                    └── checkout/
                        ├── deno.json
                        └── index.ts

```

# LISTA DE TAREFAS:
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
## FASE 1: LOGIN 
* Criar arquivo src/view/login.html (google stitch)    # Tela html para o usuario fazer o login
* Criar arquivo src/view/index.html (google stitch)    # Tela html dando boas vindas (destino, caso o login seja realizado)
* Criar e configurar projeto no supabase               # Projeto que sera responsavel pelo banco de dados
* Criar arquivo src/model/supabase_config.js           # Arquivo com as credenciais e chaves do supabase
* Criar arquivo src/model/model_login.js               # arquivo para verificar os dados e fazer requisições no banco de dados (usuarios)
* Criar arquivo src/controller/controller_login.js     # arquivo responsavel em pegar os dados da pagina e chamar as funcoes do model_login.js
* Criar arquivo src/middleware/auth_check.js           # arquivo responsavel por bloquear acesso as paginas caso usuario nao esteja logago.

  Com base no planejamento de segurança em "nível bancário" e nas diretrizes de infraestrutura para o ERP-PSC, aqui está o **checklist detalhado** para o refinamento da **Fase 1 (Segurança e Infraestrutura)**:
### 🛡️ Central de Segurança (Middleware e Autenticação)
*   [ ] **Implementar `src/middleware/auth_check.js`:** Criar o script verificador que bloqueia a renderização de qualquer elemento HTML antes de validar a integridade do Token JWT.
*   [ ] **Configurar Logout por Inatividade:** Programar o encerramento automático da sessão após **30 minutos** sem interação do usuário.
*   [ ] **Validar `verificar_login.js`:** Garantir que o script de bloqueio esteja protegendo todas as páginas sensíveis, exceto a tela de login e a index pública.

### 🔐 Proteção de Dados e Banco (Supabase/PostgreSQL)
*   [ ] **Habilitar RLS (Row Level Security):** Ativar a segurança de linha em todas as tabelas, garantindo que nenhuma informação seja lida sem uma política definida.
*   [ ] **Configurar Regra de "Dono do Dado":** Aplicar a política `auth.uid() == profissional_responsavel_id` para blindar o acesso a prontuários e pacientes.
*   [ ] **Criar Tabela de Auditoria (`logs_acesso`):** Implementar o registro de rastreabilidade para identificar quem visualizou dados sensíveis e quando, conforme exigido pela LGPD.
*   [ ] **Restrição de PII:** Aplicar políticas de acesso restrito especificamente para campos de **CPF e Diagnósticos**.

### 📂 Infraestrutura e Repositório (GitHub/Produção)
*   [ ] **Migração para Variáveis de Ambiente:** Mover as chaves do Supabase (`anon_key` e `URL`) para um arquivo `.env` seguro, removendo-as do código-fonte.
*   [ ] **Configurar `.gitignore`:** Garantir que o arquivo `.env` e outros arquivos de configuração local nunca sejam enviados ao repositório público.
*   [ ] **Ajuste de Permissões da `anon_key`:** Verificar no console do Supabase se a chave pública possui apenas as permissões mínimas necessárias.
*   [ ] **Ativar GitHub Actions:** Configurar o fluxo de automação para realizar análise de segurança básica em cada novo *commit*.

### ⚠️ Tratamento de Erros e UX
*   [ ] **Padronização de Mensagens de Erro:** Criar uma função global para interceptar erros do banco de dados (ex: Postgres Error 42P01) e exibir apenas mensagens amigáveis ao usuário.
*   [ ] **Feedback Visual (Tailwind):** Padronizar componentes de "Loading" para todas as chamadas assíncronas, melhorando a percepção de performance.

**Este checklist cobre todas as ações imediatas necessárias para garantir que o sistema seja robusto o suficiente antes de iniciar o cadastro de categorias na Fase 2.** Deseja que eu detalhe o plano para alguma dessas tarefas específicas?
  


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

## FASE 2: CATEGORIAS
* Criar pagina src/view/listar_categorias.html (google stitch)
* Criar pagina src/view/cadastar_categorias.html(google stitch)
* Criar sql da tabela categorias
* Criar sql da apoliceis para tabela categorias
* Criar sql functions triger (caso precisar)
* Criar src/model/model_categorias.js
* Criar src/controller/controller_categorias.js
* Substituir cardes estaticos por função de geração via db


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
## FASE 3: NIVEL DE ACESSO
* Criar pagina src/view/personalizar_nivel_de_acesso_user.html (google stitch)
* Criar pagina src/view/index_proficional (google stitch)
* Criar pagina src/view/index_paciente (google stitch)
* Criar sql da tabela nivel_acesso
* Criar sql apolicies da tabela nivel_acesso
* Criar sql functions triger (caso precisar)
* Criar src/model/model_nivel_acesso.js
* Criar src/controller/controller_nivel_acesso.js
* Substituir cardes estaticos por função de geração via db
  
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
## FASE 4: ENTIDADES (USUARIOS: PROFICIONAIS/PACIENTES/RESPONSAVEIS/COLABORADORES)
* Criar pagina src/view/listar_entidades.html (google stitch                        # mostra uma lista com todos os usuarios cadastrados
* Criar pagina src/view/cadastrar_entidades.html (google stitch                     # cadastra um novo usuario
* Criar sql da tabela                                                               # cria a tabela no banco de dados
* Criar sql da apoliceis para tabela entidades                                      # cria as aplolices da tabela
* * Criar sql functions triger (caso precisar)                                      # todos usuarios cadastrados sao cadastrados em emtidades
* Criar arquivo src/model/model_entidades.                                          # crud da tabela entidades
* Criar arquivo src/controller_entidades.js                                         # prepara e chama as funçoes do crud
* Substituir cardes estaticos por função de geração via db                          # gerar daos dinamicos do banco
* Adicionar funçao de verificação na tela index.htm                                 # apos apertar no botao acessar o usuario deve ser colocado no ambiente certo
* testar se esta esta funcionando o acesso apenas para paginas correspondentes
* adicionar a proteção de acesso em todas as paginas com excessao de (index.html e login.html

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# FASE 5: INTELIGÊNCIA, BI E ESCALABILIDADE
* Foco: Gestão de alto nível e automação.
* RELATÓRIOS AUTOMATIZADOS: Gerador de relatórios de desempenho clínico baseados nas evoluções cadastradas.
* DASHBOARD FINANCEIRO AVANÇADO: Gráficos de inadimplência, projeção de faturamento e custos por profissional.
* OTIMIZAÇÃO DE PERFORMANCE: Implementação de Cache no Frontend para carregamento instantâneo de listas grandes.
* AUDITORIA EXPOSITIVA: Tela para o Supervisor consultar quem acessou quais dados (Log de Segurança LGPD).

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
## 6. PADRÃO DE CORREÇÕES TÉCNICAS (PRÓXIMOS PASSOS)
* SEGURANÇA: Revisar as Políticas de RLS para a tabela de documentos_paciente para garantir que apenas o profissional responsável e o supervisor leiam os arquivos.
* UX/UI: Padronizar componentes de "Loading" e "Feedback de Erro" no Tailwind para todas as chamadas assíncronas ao banco.
* PRODUÇÃO: Migrar as chaves do Supabase para um arquivo .env seguro antes do deploy final na Vercel.

    
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# CODIGOS CONSTRUIDOS : ( tarefas ja realizadas)
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# src/view/login.html
```
<!DOCTYPE html>
<html lang="pt-BR"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>ERP-PSC - Login</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#137fec",
                        "background-light": "#f8fafc",
                        "background-dark": "#0f172a",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style type="text/tailwindcss">
        body {
            min-height: 100dvh;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display flex flex-col items-center justify-center p-6">
<div class="w-full max-w-[400px] bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-2xl overflow-hidden flex flex-col items-center p-8 border border-slate-100 dark:border-slate-800">
<div class="flex flex-col items-center mb-10">
<div class="bg-primary/10 p-4 rounded-2xl mb-4">
<span class="material-symbols-outlined text-primary text-5xl">psychology</span>
</div>
<h1 class="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight">ERP-PSC</h1>
<p class="text-slate-500 dark:text-slate-400 text-sm mt-1 text-center">Acesse sua Conta</p>
</div>
<form class="w-full space-y-5">
<div class="flex flex-col gap-1.5">
<label class="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1" for="email">E-mail</label>
<div class="relative group">
<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors duration-200">mail</span>
</div>
<input class="block w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-0 ring-1 ring-slate-200 dark:ring-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-slate-900 transition-all placeholder:text-slate-400" id="email" name="email" placeholder="nome@exemplo.com" type="email"/>
</div>
</div>
<div class="flex flex-col gap-1.5">
<div class="flex justify-between items-center">
<label class="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1" for="password">Senha</label>
</div>
<div class="relative group">
<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors duration-200">lock</span>
</div>
<input class="block w-full pl-11 pr-12 py-3.5 bg-slate-50 dark:bg-slate-800 border-0 ring-1 ring-slate-200 dark:ring-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-slate-900 transition-all placeholder:text-slate-400" id="password" name="password" placeholder="••••••••" type="password"/>
<button class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-primary focus:outline-none transition-colors duration-200" onclick="const p = document.getElementById('password'); p.type = p.type === 'password' ? 'text' : 'password'; this.querySelector('span').innerText = p.type === 'password' ? 'visibility' : 'visibility_off';" type="button">
<span class="material-symbols-outlined text-[22px]">visibility</span>
</button>
</div>
</div>
<button class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 active:scale-[0.98]" type="submit">
<span>Entrar</span>
<span class="material-symbols-outlined text-xl">login</span>
</button>
</form>
<div class="mt-8 flex flex-col items-center gap-6 w-full">
<a class="text-primary hover:text-primary/80 text-sm font-semibold transition-colors" href="#">
                Esqueci minha senha
            </a>
<div class="w-full flex items-center gap-4">
<div class="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>
</div>
<p class="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] text-center">
                Desenvolvido para Psicopedagogos
            </p>
</div>
</div>
<!-- CONEXÃO SUPABASE -->   
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<script src="../model/supabase_config.js"></script>
<script src="../model/model_login.js"></script>
<script src="../controller/controller_login.js"></script>
<!-- FIM DO CONEXÃO SUPABASE -->
</body></html>

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# src/view/index.html
```
<!DOCTYPE html>

<html lang="pt-BR"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title> Bem vindo </title>
<!-- ############################################################################# -->    
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>     
<script src="../model/supabase_config.js"></script> 
<script src="../middleware/auth_check.js"></script>    
<!-- ############################################################################# -->

<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#137fec",
                        "background-light": "#f6f7f8",
                        "background-dark": "#101922",
                    },
                    fontFamily: {
                        "display": ["Lexend"]
                    },
                    borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        body {
            font-family: 'Lexend', sans-serif;
        }
        .ios-status-bar {
            height: 44px;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
<!-- Top Status Bar Placeholder (iOS Style) -->
<div class="ios-status-bar w-full flex justify-between items-center px-6 pt-4">
<span class="text-sm font-semibold text-slate-900 dark:text-slate-100">9:41</span>
<div class="flex gap-1 items-center">
<span class="material-symbols-outlined text-sm text-slate-900 dark:text-slate-100">signal_cellular_alt</span>
<span class="material-symbols-outlined text-sm text-slate-900 dark:text-slate-100">wifi</span>
<span class="material-symbols-outlined text-sm text-slate-900 dark:text-slate-100">battery_full</span>
</div>
</div>
<main class="flex-1 flex flex-col items-center justify-center px-6 py-12">
<div class="w-full max-w-[480px] flex flex-col items-center text-center">
<!-- Welcome Illustration / Icon Area -->
<div class="@container w-full mb-10">
<div class="relative w-full aspect-square max-w-[280px] mx-auto flex items-center justify-center rounded-full bg-primary/5 dark:bg-primary/10 overflow-hidden">
<!-- Abstract geometric pattern for a welcoming feel -->
<div class="absolute inset-0 opacity-20 bg-gradient-to-br from-primary via-transparent to-primary/40" data-alt="Suave padrão abstrato de boas-vindas em tons de azul"></div>
<div class="relative flex flex-col items-center">
<span class="material-symbols-outlined text-primary text-[80px] mb-2" style="font-variation-settings: 'FILL' 1">sentiment_satisfied</span>
<div class="w-16 h-1.5 bg-primary/20 rounded-full"></div>
</div>
</div>
</div>
<!-- Content Section -->
<div class="space-y-4">
<h1 class="text-slate-900 dark:text-slate-100 tracking-tight text-3xl font-bold leading-tight">
                    Bem-vindo de volta!
                </h1>
<p class="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed max-w-[320px] mx-auto">
                    É um prazer ver você novamente. Estamos preparando tudo para o seu atendimento.
                </p>
</div>
<!-- Action Area -->
<div class="w-full mt-12 mb-6">
<button class="w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-primary text-white text-lg font-semibold leading-normal tracking-wide transition-all active:scale-[0.98] shadow-lg shadow-primary/25">
<span class="truncate">Acessar meu Painel</span>
</button>
</div>
<!-- Subtle secondary hint -->
<div class="flex items-center gap-2 text-slate-400 dark:text-slate-500">
<span class="material-symbols-outlined text-lg">verified_user</span>
<span class="text-xs uppercase tracking-widest font-medium">Ambiente Seguro</span>
</div>
</div>
</main>
<!-- Bottom Indicator (iOS Style) -->
<div class="flex justify-center pb-2 pt-6">
<div class="w-32 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
</div>

</body></html>
```




🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# SUPABASE

## Criar conta e projeto
* Acesse: https://supabase.com
* Crie uma conta
* Clique em New Project
  
## Config do projeto
* Nome do projeto: nome_do_seu_projeto
* Senha do banco: ***********
* Região: brasil
* selecina o ssh
* criar!
* Authentication/URL Configuration/Site URL: https://url_do_seu_site
* Authentication/URL Configuration/Redirect URLs: https://url_do_seu_site
  
## Chaves de acesso
* Data API/API URL: copiar_url_do_danco_de_dados
* API Keys/Legacy anon, service_role API keys/anon
public: copiar_chave_de_acesso_do_supabase.
  
---

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# src/model/supabase_config.js
```
// SUPABASE_CONFIG.JS
const supabaseUrl = 'https://seu_endereço';
const supabaseKey = 'sua_senha';
// Inicializa o cliente Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
// Exporta para ser usado em outros scripts
window.supabaseClient = _supabase; 
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# src/model/login.js
```
/* ####################################################################################################################### */
/* ####################################################################################################################### */
/*
* Nome do arquivo: realizar_login.js
* Objetivo: Autenticar o usuário utilizando e-mail e senha no Supabase Auth.
* OBS: criar usuario diretamente no supabase para testar!
*/
async function realizarLogin() {

/* 
* Declaração da Função JavaScript 
* [async]: Define que esta função é assíncrona, é obrigatório (requisição pela internet algo que leva tempo), permite que usemos o await lá na frente.
* [realizarCadastro()]: O nome da função que você chamará no seu HTML (ex: onclick="realizarLogin()").
*/
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

/*
* Captura de Dados (DOM):
* const email = document.getElementById('email').value;
* const senha = document.getElementById('password').value;
* Aqui o JavaScript vai até o seu formulário HTML, procura os campos com os IDs 'email' e 'password' e extrai o que o usuário digitou neles (.value).
* const: Armazena esses valores em constantes, garantindo que eles não sejam alterados acidentalmente durante a execução da função.
*/

    
    // Validação básica de campos vazios
    if (!email || !senha) {
        alert("Ops! Você esqueceu de preencher o e-mail ou a senha. ✍️");
        return;
    }

/*
* Validação de Segurança Básica
* !email || !senha: Lê-se "Se não houver e-mail OU não houver senha".
* caso esteja vazio vai abrir um alerta com a mensagem
* return: Interrompe a função imediatamente. Se o usuário deixou algo vazio, o código para aqui e nem tenta falar com o servidor.
*/
    

    try {
        // Chamada oficial ao método de Sign In do Supabase
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: senha,
        });


/*
* A Chamada ao Supabase (O "Coração" do Código)
* [await]: Faz o código "esperar" a resposta do servidor do Supabase antes de ir para a próxima linha.
* [window.supabaseClient]: É a instância do SDK do Supabase que você configurou no seu projeto.
* auth.signInWithPassword: Este é o método específico para autenticação tradicional usando e-mail e senha. 
O Supabase também oferece métodos para login com Google, GitHub ou "Magic Links" (e-mail sem senha).
* { email, password: senha }: Envia as credenciais. 
* Note que usei email (abreviação para email: email) 
* password: senha (mapeando sua variável senha para a chave que o Supabase espera).
* { data, error }: Isso é uma desestruturação. O Supabase sempre retorna um objeto com dois caminhos possíveis: os dados do usuário (data) ou um erro (error).
*/        
       
        if (error) {
            console.error("Erro na autenticação:", error.message);
            alert("Erro ao entrar: " + error.message);

/*
* Se o objeto error não estiver vazio (por exemplo, se o e-mail for inválido ou a senha for muito curta)
* o alert exibirá a mensagem técnica explicando o que deu errado.
*/
        } else {
            console.log("Bem-vindo de volta!", data.user.email);
            // Redireciona para o painel principal após o sucesso
            window.location.href = 'https://aristidesbp.github.io/assets/erp/index.html';
        }
    } catch (err) {
        console.error("Ocorreu um erro inesperado no sistema:", err);
    }
}  

/* ####################################################################################################################### */
/* ####################################################################################################################### */

/* 
* Nome do arquivo: cadastrar_novo_usuario.js
* Objetivo: Criar uma nova conta de usuário no sistema.
* [window.supabaseClient.auth.signUp]: Chama o método de cadastro oficial do SDK do Supabase.
*/

async function realizarCadastro() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;    
    if (!email || !senha) { alert("Preencha e-mail e senha primeiro!"); return;}
    
    // Cria o usuário no Supabase. 
    // Nota: Se o 'Confirm Email' estiver ativo no painel, o user precisa validar o e-mail antes de logar.
    const { data, error } = await window.supabaseClient.auth.signUp({ email, password: senha });
   
    if (error) { alert("Erro no cadastro: " + error.message); }       
    else { alert("Conta criada com sucesso! Verifique seu e-mail ou tente fazer login."); }
}


/* ####################################################################################################################### */
/* ####################################################################################################################### */

/* Função de alerta confirmando se é para realmente cadastrar */
function confirmarCadastro() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite um e-mail!");  
    if (confirm(`Deseja criar uma conta para: ${email}?`)) {
        realizarCadastro(); 
    }
}

/* ####################################################################################################################### */
/* ####################################################################################################################### */

/* Objetivo:VER A SENHA DIGITADA, Alternar a visibilidade do campo de senha entre texto e asteriscos */
function alternarSenha() {
    // Busca o elemento de entrada pelo ID
    const campo = document.getElementById('password');
    
    if (campo) {
        // Se for password, vira text (visível). Se for text, vira password (oculto).
        campo.type = campo.type === 'password' ? 'text' : 'password';
    }
}

/* ####################################################################################################################### */
/* ####################################################################################################################### */
  
    /**
 * Nome do arquivo: recuperar_senha.js
 * Objetivo: Enviar e-mail de recuperação e atualizar a senha do usuário logado.
 */

async function solicitarRecuperacao() {
    const email = document.getElementById('email').value;
    if (!email) return alert("Digite seu e-mail.");

    // O Supabase envia um link que redireciona o usuário para a página de redefinição
    const { error } = await window.supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: 'redefinir_senha.html',
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


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# src/conntroller/controller_login.js
```

/**
 * Nome do arquivo: controller/login.js
 * Objetivo: Escutar os eventos da interface (HTML) e acionar as funções do Modelo.
 */

// Aguarda o DOM (HTML) carregar completamente antes de aplicar os gatilhos
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Gatilho para o Formulário de Login (Evento Submit)
    const loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            // Impede que a página recarregue ao clicar no botão
            event.preventDefault(); 
            // Chama a função de autenticação que está no model/login.js
            realizarLogin();
        });
    }

    // 2. Gatilho para o Link "Esqueci minha senha"
    // Procurei pelo link que contém o texto de recuperação
    const linkRecuperar = document.querySelector('a[href="#"]');
    if (linkRecuperar && linkRecuperar.innerText.includes("Esqueci minha senha")) {
        linkRecuperar.addEventListener('click', (event) => {
            event.preventDefault();
            solicitarRecuperacao();
        });
    }

    // 3. Gatilho para o Botão de Mostrar/Esconder Senha
    // Substitui o código inline do HTML pela função organizada do model
    const btnAlternarSenha = document.querySelector('button[type="button"]');
    if (btnAlternarSenha) {
        // Removemos o atributo onclick antigo via JS para usar o novo listener
        btnAlternarSenha.removeAttribute('onclick');
        btnAlternarSenha.addEventListener('click', () => {
            alternarSenha();
            
            // Ajuste visual do ícone (opcional, já que a função alternarSenha foca no tipo do campo)
            const spanIcon = btnAlternarSenha.querySelector('span');
            const inputSenha = document.getElementById('password');
            if (spanIcon && inputSenha) {
                spanIcon.innerText = inputSenha.type === 'password' ? 'visibility' : 'visibility_off';
            }
        });
    }

});


/**
 * src/controller/login.js
 * Escutador de eventos para o formulário


document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona o formulário do HTML
    const formulario = document.querySelector('form');

    if (formulario) {
        formulario.addEventListener('submit', async (event) => {
            // 1. Impede a página de recarregar (essencial para o Supabase)
            event.preventDefault();

            // 2. Chama a função que está no seu model_login.js
            console.log("Iniciando processo de login...");
            await realizarLogin();
        });
    }

});

 */
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# src/middleware/auth_check.js
```
 /**
 * MIDDLEWARE DE PROTEÇÃO - ERP-PSC
 * Finalidade: Bloquear a renderização do HTML antes da validação do JWT.
 * Referência: Planejamento Fase 1 - Central de Segurança [3, 4]
 */

(async function validateAccess() {
    // 1. Bloqueio imediato da interface (Prevenção de FOUC - Flicker of Unauthenticated Content)
    document.documentElement.style.display = 'none';

    // Importação dinâmica da configuração do Supabase (ajustar caminho se necessário)
    // Nota: O projeto utiliza supabase_config.js para chaves de acesso [5, 6]
    try {
        const { supabase } = await import('../model/supabase_config.js');

        // 2. Verificação da Sessão e do Token JWT
        const { data: { session }, error } = await supabase.auth.getSession();

        // 3. Lógica de Redirecionamento Blindado
        if (error || !session) {
            console.warn("Acesso não autorizado ou sessão expirada. Redirecionando...");
            window.location.href = 'login.html'; 
            return;
        }

        // 4. Verificação de Integridade (Opcional: validar se o token ainda é aceito pelo backend)
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            window.location.href = 'login.html';
            return;
        }

        // 5. Liberação da Interface
        // Se o usuário estiver autenticado com um JWT válido, o sistema permite o carregamento
        document.documentElement.style.display = 'block';

    } catch (err) {
        console.error("Erro crítico na validação de segurança:", err);
        // Em caso de falha técnica no script de segurança, o sistema bloqueia o acesso por padrão
        window.location.href = 'login.html';
    }
})();   
```


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# src/middleware/session_timeout.js
```

/**
 * MECANISMO DE LOGOUT AUTOMÁTICO - ERP-PSC
 * Finalidade: Encerrar a sessão após 30 minutos de inatividade para proteção de dados sensíveis.
 * Referência: Planejamento Fase 1 - Ajuste de Segurança (Item 2.2)
 */

import { supabase } from '../model/supabase_config.js';

// Define o tempo limite de inatividade (30 minutos = 1.800.000 ms)
const INACTIVITY_LIMIT = 30 * 60 * 1000; 
let timeoutId;

/**
 * Realiza o encerramento da sessão no banco de dados e limpa o acesso local
 */
async function performLogout() {
    console.warn("Sessão expirada por inatividade. Protegendo dados clínicos...");
    
    try {
        // Invalida o JWT no Supabase
        await supabase.auth.signOut();
        
        // Limpa o armazenamento local para garantir o sigilo
        localStorage.clear();
        
        // Redireciona para o login com parâmetro de motivo
        window.location.href = 'login.html?reason=timeout';
    } catch (error) {
        console.error("Erro ao encerrar sessão:", error);
        window.location.href = 'login.html';
    }
}

/**
 * Reinicia o cronômetro sempre que uma atividade é detectada
 */
function resetInactivityTimer() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(performLogout, INACTIVITY_LIMIT);
}

/**
 * Inicializa os ouvintes de eventos de interação do profissional
 */
function setupActivityListeners() {
    // Lista de eventos que caracterizam atividade do usuário
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    events.forEach(event => {
        document.addEventListener(event, resetInactivityTimer, true);
    });

    // Inicia a contagem na primeira execução
    resetInactivityTimer();
}

// Inicia o monitoramento de segurança
setupActivityListeners();






```









