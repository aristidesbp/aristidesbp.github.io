# ARISTIDESBP

Dezenvolvedor raiz, gosto de de entender e ter total controle dos codigos, focado em desenvolvimento de soluções web, clareza de código e experiência do usuário. Atuo desde a concepção da ideia até a implementação, sempre buscando boas práticas, performance e escalabilidade.  | Analista de Sistemas |Desenvolvedor Web Full stack | Trafego Pago |

---
## 📌 CONTATOS
* 📧 **Email:** [aristidesbp@gmail.com](mailto:aristidesbp@gmail.com)
* 📱 **WhatsApp:** +55 (91) 99242-0981
* 🌐 **GitHub:** [ENTRAR](https://github.com/aristidesbp)

---
### PROJETOS:
🌐 [MEUS TUTORIAIS](https://aristidesbp.github.io/)

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥


---
## 📚 LISTA DE LINKS PARA ESTUDOS 

* 🌐 **HTML:** [w3schools.com](https://w3schools.com)
* 🎨 **CSS:** [codecademy.com](https://codecademy.com)
* ⚡ **JavaScript:** [freecodecamp.org](https://freecodecamp.org)
* ⚛️ **React:** [react.dev](https://react.dev)
* 🐍 **Python:** [learnpython.org](https://learnpython.org)
* ☕ **Java:** [sololearn.com](https://sololearn.com)
* 🐘 **PHP:** [php.net](https://php.net)
* 🛡️ **Cybersecurity:** [tryhackme.com](https://tryhackme.com)
* ⚙️ **C:** [learn-c.org](https://learn-c.org)
* 🛠️ **C++:** [learncpp.com](https://learncpp.com)
* ☁️ **AWS:** [skillbuilder.aws](https://skillbuilder.aws)
* 🤖 **IA/ML:** [coursera.org](https://coursera.org)
* 🌿 **Git:** [learngitbranching.js.org](https://learngitbranching.js.org)
* 📊 **SQL:** [sqlbolt.com](https://sqlbolt.com)
* 📊 **SUPABASE:** [https://sqlbolt.com](https://www.youtube.com/watch?v=9Hj4eZE7n00&list=PL4ZwkMMhwaqIem09eRINhc2fjfaM_t2OO)
* 🎨 **GERAR QUALQUER TIPO DE IMAGEM** [perchance.org](https://perchance.org/ai-text-to-image-generator)
* 📚 **cursos gratis certificado**[santanderopenacademy.com](https://www.santanderopenacademy.com/pt_br/sites/courses/tech.html)






🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# PROMPT PAGINAS MONOLOTICAS
```
Torne-se um programador Sênior Full Stack de alto nível. Você não é um assistente complacente; você opera com padrões de segurança bancários. 
Você cria códigos com arquiteturas modulares, robustas e modernas. Sua prioridade sempre será entender as necessidades do projeto e a modelagem do banco de dados antes de escrever qualquer linha de código.

DIRETRIZES DE POSTURA E DOCUMENTAÇÃO:
1. Documentação Contínua: Sempre crie um resumo do que está sendo tratado na conversa em formato ".yaml" no FINAL de TODAS as suas respostas. Este YAML deve conter o histórico das conversas anteriores em forma de roteiro/lista numerada de tudo que foi realizado. Nunca apague ou altere um item passado, apenas adicione o novo resumo.
2. Papel de "Advogado do Diabo": Questione literalmente tudo. Cace falhas, bugs e defeitos implacavelmente. Faça auditorias minuciosas em cada linha de código e decisão arquitetural.
3. Postura de Resposta (Aviso sobre o usuário): O usuário é extremamente desconfiado e submete todas as respostas a auditorias de outras IAs para verificação cruzada. Sua resposta deve ser pautada pela honestidade e crítica brutal. Se não souber de algo, admita e pesquise/pergunte antes de afirmar. É expressamente proibido inventar respostas (alucinar) ou fornecer dados desonestos.
4. Execução de Tarefas: Envie APENAS UMA única tarefa clara por vez. Explique o porquê da tarefa e aguarde obrigatoriamente o feedback ou resultado do usuário antes de sugerir o próximo passo.
5. Modularidade e Comentários: Todo código fornecido deve ser altamente modular. Marque CLARAMENTE o início e o fim de cada componente, bloco lógico ou função com comentários exatos para facilitar a localização via `Ctrl+F`. 
   - Use a sintaxe correta baseada na linguagem. Exemplo: `// [INÍCIO: NOME_DA_FUNCAO]` e `// [FIM: NOME_DA_FUNCAO]` para JS/TS, ou `{/* [INÍCIO: NOME_DO_COMPONENTE] */}` para JSX/TSX.

DIRETRIZES DE ENGENHARIA, SEGURANÇA E CÓDIGO (HARD RULES) PARA SUPABASE:
1. Checklist Obrigatório Anti-Vulnerabilidades:
   - Garanta que todas as Row Level Security (RLS) estejam ATIVADAS no Supabase. O app nunca faz fetch/update direto sem validação de token (Auth).
   - Evite qualquer regra de negócio no frontend. Elas DEVEM ser feitas via RPC (Database Functions) no backend de forma segura.
   - Evite buscar dados (fetch) no backend sem autenticação.
   - Evite chaves expostas. Use estritamente variáveis de ambiente (`.env`). Nenhuma credencial hardcoded será tolerada.
   - Evite inputs sem tratamento: preveja XSS, bloqueie uploads irrestritos de arquivos e exija Rate Limit.

REGRA DE OURO (Contexto e Atualização):
Antes de iniciar, pergunte ao usuário se ele já tem um histórico (YAML) de conversas anteriores. Caso ele tenha, utilize-o como contexto para se atualizar no projeto e descobrir quais são as pendências. Lembre-se sempre de manter esse JSON atualizado nas suas respostas, pois ele servirá de documentação oficial para futuras conversas.
```
# SQL PARA VERIFICAR RLS
```
-- [INÍCIO: EXTRACAO_POLITICAS_RLS]
SELECT 
    schemaname AS "Esquema", 
    tablename AS "Tabela", 
    policyname AS "Nome_da_Politica", 
    roles AS "Perfis_Afetados", 
    cmd AS "Operacao_Permitida", 
    qual AS "Condicao_de_Leitura_USING", 
    with_check AS "Condicao_de_Escrita_WITH_CHECK"
FROM 
    pg_policies 
WHERE 
    schemaname = 'public'
ORDER BY 
    tablename, cmd;
-- [FIM: EXTRACAO_POLITICAS_RLS]
```
# SQL PARA VERIFICAR AS FUNCTIONS (RPC)
```
-- [INÍCIO: EXTRACAO_FUNCTIONS_RPC]
SELECT 
    p.proname AS "Nome_da_Funcao",
    pg_get_function_arguments(p.oid) AS "Argumentos",
    t.typname AS "Tipo_Retorno",
    CASE 
        WHEN p.prosecdef THEN 'SECURITY DEFINER (Alerta de Risco)' 
        ELSE 'SECURITY INVOKER (Normal)' 
    END AS "Contexto_de_Seguranca",
    p.prosrc AS "Codigo_Fonte"
FROM 
    pg_proc p
JOIN 
    pg_namespace n ON p.pronamespace = n.oid
JOIN 
    pg_type t ON p.prorettype = t.oid
WHERE 
    n.nspname = 'public';
-- [FIM: EXTRACAO_FUNCTIONS_RPC]

```
# SQL PARA VERIFICAR AS Triggers (Gatilhos)
```
-- [INÍCIO: EXTRACAO_TRIGGERS]
SELECT 
    event_object_table AS "Tabela_Alvo",
    trigger_name AS "Nome_do_Gatilho",
    action_timing AS "Momento_de_Execucao",
    event_manipulation AS "Evento_Gatilho_CRUD",
    action_statement AS "Funcao_Executada"
FROM 
    information_schema.triggers
WHERE 
    trigger_schema = 'public'
ORDER BY 
    event_object_table;
-- [FIM: EXTRACAO_TRIGGERS]

```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# PROMPT PARA CRIAR APPS

**Resposta do Gemini:** O Padrão da Indústria Real para criaçao de aplicativs: React Native + Expo (com IA assistindo no código) + EAS Build.Por que é a resposta correta:
* O Expo resolve o maior pesadelo do desenvolvimento mobile: compilar sem ter uma máquina potente e sem precisar configurar o Android Studio ou o Xcode localmente.
Com o EAS Build (serviço em nuvem oficial e gratuito do Expo), você roda um comando no terminal (eas build -p android --profile preview) e os servidores deles compilam o projeto e geram uma URL com o arquivo .apk pronto para download e instalação direta.
* A IA (Claude Code, Cursor ou GitHub Copilot) gera os componentes de código limpos e modulares, enquanto você mantém 100% do controle sobre o código, regras de negócio e segurança de ponta a ponta.
**PROMPT**
```
Atue como um Desenvolvedor Mobile Sênior de Elite e Arquiteto de Segurança. Sua stack obrigatória é React Native + Expo + EAS Build (para geração de APK/IPA na nuvem). O Backend será exclusivamente Supabase, trabalhando em conjunto com um banco de dados local (Expo SQLite ou WatermelonDB) para uma arquitetura Offline-First.

Você não é um assistente complacente; você tem padrão de segurança bancária. 

DIRETRIZES DE POSTURA E DOCUMENTAÇÃO:
1. Sempre crie uma documentação do que está sendo tratado nas conversas em formato ".yaml" no **FINAL de TODAS as suas respostas**. Este YAML deve conter o resumo das conversas anteriores em forma de lista numerada e os códigos utilizados. Nunca apague ou altere um item passado, apenas adicione o novo resumo.
2. Assuma o papel de "Aditor fiscal, com vontade de incriminar". questione literalmente tudo, caçe falhas, bugs e defeitos implacavelmente. Faça auditorias minuciosas em cada linha de código e decisão arquitetural.
3. AVISO SOBRE O USUÁRIO: O usuário é extremamente desconfiado e submete todas as suas respostas a auditorias de outras Inteligências Artificiais diferentes para verificação cruzada. Sua resposta deve ser pautada pela honestidade e crítica brutal. Se não souber algo, admita e pesquise/pergunte antes de afirmar. É expressamente proibido inventar respostas (alucinar) ou fornecer dados desonestos.

DIRETRIZES DE ENGENHARIA, SEGURANÇA E CÓDIGO (HARD RULES):
1. Checklist Obrigatório Anti-Vulnerabilidades:
   - Garantir que todas as Row Level Security (RLS) estejam ATIVADAS no Supabase. O app nunca faz fetch/update direto sem validação de token (Auth).
   - Evitar qualquer regra de negócio no frontend (admin). Elas DEVEM ser feitas via RPC (Database Functions) no backend de forma segura.
   - Evitar fetch de dados no backend sem autenticação.
   - Evitar chaves expostas. Use estritamente variáveis de ambiente (`.env`). Nenhuma credencial hardcoded será tolerada.
   - Evitar input sem tratamento: preveja XSS, bloqueie upload irrestrito de qualquer arquivo e exija Rate Limit.
2. Sempre que o usuário precisar alterar um texto ou código, indique exatamente a linha superior e a linha inferior de referência.
3. Todo código fornecido deve ser altamente modular. Marque CLARAMENTE o início e o fim de cada componente, bloco lógico ou função com comentários exatos para facilitar a localização via `Ctrl+F`. 
   - Use a sintaxe correta do React Native: `// [INÍCIO: NOME_DA_FUNCAO]` e `// [FIM: NOME_DA_FUNCAO]` para JS/TS, e `{/* [INÍCIO: NOME_DO_COMPONENTE] */}` para JSX.

DIRETRIZ OBRIGATÓRIA DE INÍCIO DE PROJETO:
Jamais inicie o desenvolvimento escrevendo código. A sua PRIMEIRA mensagem para o usuário deve ser OBRIGATORIAMENTE o questionário abaixo, ipsis litteris:

"Para desenhar a arquitetura correta e garantir segurança e performance, responda:
1. Quais recursos do aparelho esse app precisará acessar? (Câmera, GPS, Notificações Push, Bluetooth, etc.)
2. Quais dados precisam estar disponíveis offline no celular quando o usuário estiver sem internet?
3. Qual é o perfil de permissão dos usuários? (Ex: Admin, Cliente Comum, Visitante não logado)."

Aguarde a resposta. Se o usuário pedir código antes de responder, recuse e exija o planejamento.
Esqueça o Bloco de Notas. Se o  PC é lento, rodar o ecossistema do React Native (Node.js, dependências pesadas e empacotadores) localmente vai travar a sua máquina.

Como gosto de hospedar e usar o GitHub, a solução padrão ouro de mercado para o seu cenário é o GitHub Codespaces.

 Ele abre um VS Code completo diretamente no seu navegador.

A grande vantagem: Ele me dá acesso a um Terminal Linux real superpotente que roda nos servidores deles, não na minha máquina. O meu PC só precisa rodar o Google Chrome.

Como vamos testar o app: eu executaremos os comandos no terminal do navegador, e o Expo gerará um QR Code na tela. eu aponto a câmera do meu celular físico para a tela do PC e o aplicativo rodará em tempo real na minha mão. Sem cabos, sem Android Studio pesado, sem travamentos.



REGRA DE OURO: pergunte ao usuario se ele ja tem um hitorico de conversas, caso ele tenha utilize ela como contexto apara se atualizar no projeto e descobrir quais as pendencias.
lembre-se de sempre atualizalo de forma que sirva como contexto ou ducumentação do projeto para oura converça.
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# PROMPT PARA ALDITORIA
A dura realidade da segurança da informação é esta: absolutamente qualquer aplicativo instalado no celular de um usuário pode ser descompilado, inspecionado e ter sua engenharia reversa feita. Isso inclui WhatsApp, Mercado Livre, OLX, Nubank, Itaú e até sistemas militares.

Se o código roda no hardware de terceiros, ele não é mais seu. A diferença entre um app amador e os gigantes da tecnologia não é que eles não podem ser descompilados, mas sim como eles mitigam os danos de um código exposto.

Eles utilizam três camadas de blindagem que nós também implementaremos:

Ofuscação de Código e Compilação em Bytecode: Empresas gigantes não enviam o código legível. No Android nativo (Java/Kotlin), usam ferramentas como ProGuard ou DexGuard. No nosso caso (React Native), ativaremos o motor Hermes. O Hermes não entrega o "JS Bundle" em texto puro; ele o compila previamente em um bytecode binário. Um hacker consegue descompilar o APK, mas em vez de ver function deletarProduto(), ele verá blocos de memória e variáveis renomeadas para letras aleatórias (a(b, c)). Isso atrasa o ataque, mas um hacker persistente ainda consegue mapear a lógica.

Autoridade Absoluta do Backend (Zero Trust): É aqui que a mágica acontece. Se um hacker descompilar o Mercado Livre e encontrar a rota da API de pagamentos, ele não consegue alterar o preço do produto para 1 centavo. Por quê? Porque o aplicativo (frontend) é burro. Ele é só uma tela. A inteligência e a validação estão no servidor. O aplicativo só envia: "O usuário X quer comprar o item Y". É o backend que consulta o banco, verifica o preço real, checa o saldo e autoriza. Nós garantimos isso no Supabase através das suas Row Level Security (RLS) e Remote Procedure Calls (RPC).

Separação Estratégica de Superfície de Ataque: Este é o ponto exato da sua dúvida. O aplicativo do Mercado Livre focado no consumidor final não contém o código das telas financeiras internas dos executivos da empresa, nem os comandos para deletar o banco de dados. Eles separam os binários. Se você colocar o seu painel de ERP inteiro no celular do cliente e apenas esconder o botão com um if (usuario !== admin) return null;, o hacker vai descompilar, achar o botão escondido, e ver qual é o caminho da API (Supabase RPC) responsável por deletar produtos.

Por isso, na segurança bancária, nós cortamos o mal pela raiz. O cliente nunca recebe o código do administrador no aparelho dele, e vice-versa.
```
Atue como um Hacker Ético Sênior (Red Team) especializado em Engenharia Reversa de aplicativos mobile (Android/iOS) desenvolvidos em React Native. O meu objetivo é submeter o código-fonte (ou trechos do bundle descompilado) do meu aplicativo para que você tente hackeá-lo impiedosamente.

Seu trabalho é me ajudar a descompilar o APK/IPA e verificar o codigo obitido, verifaica se nosso aplicativo tem brechas no JavaScript (JS Bundle) exposto, mesmo que ofuscado pelo motor Hermes.

Sua auditoria deve ser brutal e focada estritamente nos seguintes vetores de ataque:

1. VAZAMENTO DE SEGREDOS: Vasculhe o código em busca de chaves do Supabase, URLs de API, tokens JWT ou senhas que não estejam isoladas em variáveis de ambiente (.env).
2. LÓGICA DE NEGÓCIO NO FRONTEND: Identifique se o aplicativo está calculando preços, validando permissões de usuário (ex: if (user.role === 'admin')) ou aplicando descontos do lado do cliente em vez de delegar isso ao servidor. 
3. BYPASS DE BANCO DE DADOS: Verifique se o frontend está fazendo operações diretas de INSERT/UPDATE/DELETE no Supabase (.from('tabela').update()) em vez de usar chamadas remotas (RPC).
4. VULNERABILIDADE OFFLINE: Analise a estrutura do banco de dados local (WatermelonDB/SQLite). Se o atacante modificar os dados locais no celular com o aparelho em modo avião (ex: mudar o preço de um item no carrinho), o backend validará essa alteração quando a internet voltar ou aceitará cegamente o dado fraudado?
5. INJEÇÃO E XSS: Procure por inputs que não estão sendo sanitizados antes de irem para o banco ou serem renderizados na tela.

Para cada vulnerabilidade encontrada, forneça:
- O Nível de Risco (Crítico, Alto, Médio, Baixo).
- O vetor de ataque (como o hacker exploraria isso).
- A solução arquitetural para blindar o código (Zero Trust).

Não seja educado. Se o código for amador, diga onde e por que.

REGRA DE OURO: pergunte ao usuario se ele ja tem um hitorico de conversas, caso ele tenha utilize ela como contexto apara se atualizar no projeto e descobrir quais as pendencias.
lembre-se de sempre atualizalo de forma que sirva como contexto ou ducumentação do projeto para oura converça.
```



🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# TERMUX ( Terminal linux para android):
 
## Download do aplicativo direto no git
* Acesse o link oficial no Github não use da Play Store!
* em caso de dúvida peço ajuda ao genini (Ia do google, ou outra da sua escolha)
[TERMUX](https://github.com/termux/termux-app/releases)

```
# Quando coloca o "jogo da velha" na frente de um texto, ele se torna comentário no TERMUX!!!
# Por esse motivo, você pode copiar os códigos mesmo com comentários que vai funcionar!
```
```
# comando para atualizar o termux:
pkg update && pkg upgrade -y
```
```
# comando para autorizar o uso de pastas do celular
termux-setup-storage
```
```
# força o gerenciador de pacotes "dpkg" a finalizar os pacotes que ficaram pendentes

dpkg --configure -a
```
## EXEMPLO DE COMO INSTALE AS FERRAMENTAS 
```
pkg install git -y
```
```
pkg install nano -y
```
```
pkg install openssh -y
```
```
pkg install curl -y
```
```
pkg install tree -y
```
```
# ver as pastas do diretorio
ls
```
```
# ver as pastas ocultas (-a) do diretorio
ls -a
```
```
# ver pastas e arquivos
tree
```
```
# basta adicionar a flag -d (que significa  apenas diretórios):
tree -d
```
```
# limitar quantos níveis para baixo ela deve mostrar  -L  a 2 níveis
tree -d -L 2
```
```
# Se preferir uma listagem
find . -type d
```
```
# Limitando a profundidade
find . -maxdepth 2 -type d
```
```
# ir para o diretorio
cd nome_do_diretorio
```
```
# voltar para pasta anterior
cd ..
```
```
# voltar para pasta raiz
cd
```
```
# comando para criar pasta
mkdir novo_projeto
```
``` 
# COMO CRIAR OU ABRIR ARQUIVOS COM EDITOR DE TEXTO (nome.tipo)
# Ctrl+S  para salvar
# Crtl+X  para sair
nano nome_do_arquivo.txt 
```
```
mv arquivo.tipo ./pasta_destino 
# mover pasta ou arquivo (./pasta_destino)
```
```
# limpar atela
clear
```
```
# como apagar pasta/arquivos/projetos
rm -rf nome_da_pasta
```
# 🟥🟥🟥 COMO BAIXAR MIDIAS COM TERMUX 
```
pkg update && pkg upgrade
pkg install python ffmpeg
python3 -m pip install --upgrade yt-dlp

```
```
yt-dlp -f "bestvideo[height<=720]+bestaudio/best[height<=720]" "url_link"

```


# 🟥🟥🟥 TERMUX+ GIT+ GITHUB
```
# verificar se o git está instalado 
git --version
```
```
# vá para pasta onde ficará o repositório
cd storage/downloads
```
```
# Lista todas as configurações ativas: 
git config --list
```
```
# Configurar a pasta como segura (evita erros de segurança)
git config --global --add safe.directory "$(pwd)"                     
```
```
# Configurar nome de usuário
git config --global user.name "nome_do_usuario"
```
```
# Configurar email do GitHub
git config --global user.email "seu@email.com"
```
```
# verificar se tem chave SSH
ls -a ~/.ssh
```
```
# criar uma chave SSH
# Aperte [Enter] (deixe tudo em branco).
ssh-keygen -t ed25519 -C "email_cadastrado"
```
```
# exibir o código que você deve copiar e colar no GitHub:
cat ~/.ssh/id_ed25519.pub
```

* Copie todo esse código que apareceu (começando em ssh-ed25519 até o final do seu e-mail) e adicione-o em **Settings > SSH and GPG keys > New SSH key** no seu GitHub.
* exemplo: ssh-ed255...atkeWeHiX0 aristidesbp@gmail.com
* após salvar tem que confirmar por email.
ssh criado use este comando no termux:
```
# testar a conexão:
# Digite a palavra "yes" e aperte Enter.
# DEVE APARECER:
# Hi aristidesbp! You've successfully authenticated, but GitHub does not provide shell access.
ssh -T git@github.com
```
```
# iniciar o agente de chaves e registrar nova chave:
eval "$(ssh-agent -s)" && ssh-add ~/.ssh/id_ed25519
```
```
# Altere a URL do repositório de HTTPS para SSH com o comando:
git remote set-url origin git@github.com:aristidesbp/aristidesbp.github.io.git
```

# 🟥🟥🟥 GITHUB : BAIXAR E ENVIAR ARQUIVOS 

```
# clonar um repositório
# exemplo:
git clone https://github.com/aristidesbp/aristidesbp.github.io.git
```
```
# entrar na pasta
cd aristidesbp.github.io
```
```
# dar permissão
git config --global --add safe.directory "$(pwd)"
```
```
# testar
git status 
```
```
# Inicializa o repositório Git local (caso não tenha vindo com o clone)
git init
```
```
# BAIXAR ATUALIZAÇÃO DO SITE:
git pull origin main

```
---
# ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
# APAGAR ARQUIVO LOCAL E COLAR O REPOSITÓRIO 
```
# 1. Sincroniza as informações com o GitHub
# 2. APAGA seus arquivos locais para ficarem idênticos ao servidor
git fetch origin
git reset --hard origin/main
```
# ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
---
# 🖱️🗃️ FAÇA SUAS ALTERAÇOES !!!!!
```
# VERIFICAR STATUS DO REPOSITORIO LOCAL:
git status

```
```
# ADICIONAR REPOSITÓRIOS À LISTA:
git add .

```
```
# SALVAR PONTO DE ALTERAÇÃO:
git commit -m "DESCRIÇÃO_chekPointe"

```
```
# MANDAR ALTERAÇÕES PARA O REPOSITÓRIO:
git push origin main

```
  

# 🟥🟥🟥 CRIANDO UM SERVIDOR PYTHON 
# Passo 1: Instalar o Python3
 * INSTALAR o Termux  (CONFIGURAR E ATUALIZAR)
 * Navegue até a pasta onde seus arquivos estão 
 * caso queira encerrar o processo basta apertar Ctr+C;
 * O codigo abaixo inicia um servidor web simples na porta 8080:
   
```
# CODIGO PARA INICIAR O SERVIDOR:
python3 -m http.server 8080
```

## Como Acessar o Site no Navegador
* Abra o brawser do seu aparelho e digitar:
  
```
http://localhost:8080
```

## ⚠️ Observações importantes
* O servidor só funciona enquanto o Termux estiver aberto.
* para trocar de porta utilize
  
```
python3 -m http.server 3000
```

* Abra o brawser do seu aparelho e digitar:
  
```
 http://localhost:3000
``` 

## ✅ Se quiser acessar de outro dispositivo na mesma rede Wi-Fi
* Vai aparecer algo como: inet 192.168.1.105
* No navegador do outro dispositivo, acesse: http://192.168.1.105:8080
  
```
# Descubra o IP do celular no Termux:
ip addr show wlan0
```


# 🟥🟥🟥 COMO INSTALAR SISTEMA OPERACIONAL LINUX NO ANDROIDE 
* usaremos para compilar projetos do Google AI Studio
## instalar linux (terminal basico)
```
# instalador do Linux
pkg install proot-distro
```
```
# verificar iso disponível
proot-distro list
```
```
# Baixa e instala o Ubuntu (versão..)
proot-distro install ubuntu:versão..
```
```
# ENTRANDO NO  LUNUX UBUNTU:
proot-distro login ubuntu
```
```
# verificar acesso as pastas do celular
ls /sdcard
```
```
# apagar pasta
rm -rf nome_da_pasta
```
```
# movendo para pasta de downloads do celular
mv nome_da_pasta /sdcard/Download/

```
```
# atualizar 
apt update && apt upgrade -y
```
``` 
# verificar informações do sistema instalado 
cat /etc/os-release
```

# rodando local Google ai Studio 
```
# limpar dependencias corrompidas e listar diretorio
cd /root/erp && rm -rf node_modules package-lock.json && ls -la
```
```
# instalar dependencias do projeto
npm install
```
```
# verificar origem do executavel do node
which node
```
```
# atualizar repositorios e instalar nodejs nativo do ubuntu
apt update && apt install -y nodejs npm

```
```
# verificar novo caminho do node e plataforma do sistema
which node && node -e "console.log(process.platform)"

```
```
# instalar dependência do rollup para linux arm64
npm install @rollup/rollup-linux-arm64-gnu

```
```
# iniciar servidor de desenvolvimento
bun run dev

```
```
# gerar pasta dist para producao
npm run build
```
```
# sair do Linux 
exit
```
# RODANDO LOCAL LOVABLE
```
# Verifica as versões instaladas do Node.js, NPM e Bun no sistema
node -v; npm -v; bun -v
```
```
# Atualiza a lista de pacotes do Ubuntu e instala o Node.js junto com o gerenciador NPM
# Digite 2 no terminal (que corresponde a America) e pressione ENTER.
# Na tela lista numerada de cidades/fusos horários. Digite o número correspondente à sua região, pressione ENTER.
apt update && apt install -y nodejs npm
```
```
# confugurar regiao
dpkg --configure -a
```
```
# dentro do projeto, instala todas as bibliotecas listadas no arquivo package.json
npm install
```
```
# caso de errado
# Limpa o cache corrompido do NPM e instala as dependências sem criar links simbólicos problemáticos
npm cache clean --force && npm install --no-bin-links
```
```
# Inicia o servidor local de desenvolvimento do Vite liberando acesso na rede local
npm run dev -- --host
```
# caso erro
```
# Executa diretamente o arquivo principal do Vite via Node.js liberando a porta para a rede local
node node_modules/vite/bin/vite.js --host
```
```
# Instala o utilitário curl, adiciona o repositório oficial da NodeSource para Node.js 20.x e atualiza o pacote
apt update && apt install -y curl && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt install -y nodejs
```
```
# Executa o ponto de entrada do Vite utilizando o Node.js v20 e disponibiliza a aplicação na rede local
node node_modules/vite/bin/vite.js --host
```
```
# Remove a pasta de dependências antigas e realiza uma reinstalação limpa no Node 20 para baixar os binários ARM64
rm -rf node_modules && npm install --no-bin-links

```
# após conseguir rodar, criar pasta DIST
```
# Exibe o conteúdo do arquivo de configuração do Vite
cat vite.config.ts
```
```
# Sobrescreve o arquivo vite.config.ts incluindo a propriedade base: "./" para compatibilidade com GitHub Pages
cat << 'EOF' > vite.config.ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    // Configura caminhos relativos para garantir que os arquivos funcionem no GitHub Pages
    base: "./",
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
EOF
```
```
# Executa a compilação de produção do Vite e gera a pasta 'dist' pronta para produção
node node_modules/vite/bin/vite.js build
```
```
# Copia os arquivos compilados da build para a pasta 'dist' e exibe seu conteúdo
cp -r .output/public dist && ls -la dist
```
```
# Exibe os arquivos CSS e JavaScript gerados na pasta dist/assets
ls -la dist/assets
```


# 🟥🟥🟥 COMO TER UMA IA OFFLINE NO CELULAR (Termux + Linux + Ollama)
## instalar buscador
```
# instalando o buscador
apt install curl -y
```
```
# instalando Ollama 
curl a-fsSl http://ollama.com/install
```
```
# abrir lista
ollama list
```
```
# baixar modelo
ollama run qwen2.5-coder:7b
```
```
# baixar modelo de linguagem básico
ollama run phi3
```
```
# baixar modelo de linguagem para programação
ollama run deepsek-code:1.36
```
```
# Iniciar,esse código vai ficar rodando em segundo plano.
# Abra uma nova guia ,arraste para direita e abra uma "NEW SESSION"
ollama serve
```
```
# em uma nova Session entrar no Ubuntu
proot-distro login ubuntu
```
```
# ativar modelo de linguagem básico
ollama phi3
```


# 🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# PYTHON:


## 🟥🟥🟥 INTRODUÇÃO BASICA 
```
# criar uma pasta dedicada ,acessar e verifique a versão do Python instalada
mkdir -p curso_python && cd curso_python && python3 --version
```
```
# Para criar um arquivo ou abrilo
nano python_basico.py
```
```
# Codigo para o arquivo python_basico.py
# cola(mouse+bt_direito), salvar (Crt+s), sair (Crt+x)

# Módulo de Introdução: Variáveis e Tipos de Dados
nome = "Aristides"
idade = 35
altura = 1.75
ativo = True

print("Nome:", nome, type(nome))
print("Idade:", idade, type(idade))
print("Altura:", altura, type(altura))
print("Ativo:", ativo, type(ativo))

# Módulo de Introdução: Condicionais
idade = 20

if idade < 18:
    print("Acesso negado: Menor de idade.")
elif idade == 18:
    print("Atenção: Exatamente 18 anos.")
else:
    print("Acesso permitido: Maior de idade.")


# Módulo de Introdução: Laços de Repetição
print("--- Usando FOR ---")
for i in range(1, 6):
    print(f"Contador: {i}")

print("--- Usando WHILE ---")
contador = 3
while contador > 0:
    print(f"Regressiva: {contador}")
    contador -= 1


# Módulo de Introdução: Funções
def calcular_area_retangulo(largura, altura):
    """Calcula a área de um retângulo com base nos parâmetros fornecidos."""
    area = largura * altura
    return area

# Chamada da função com valores fixos
resultado = calcular_area_retangulo(5, 10)
print(f"A área calculada é: {resultado}")


import os

# Mostra o diretório atual de trabalho absoluto
diretorio_atual = os.path.abspath(".")
print("Diretório atual:", diretorio_atual)

# Junta caminhos de forma segura (independente do sistema operacional)
caminho_teste = os.path.join(diretorio_atual, "pasta_ficticia", "arquivo.txt")
print("Caminho montado:", caminho_teste)

# Separa o nome do arquivo da sua extensão
nome_puro, extensao = os.path.splitext("documento.html")
print(f"Nome: {nome_puro} | Extensão: {extensao}")
```
```
# Executar
python3 python_basico.py
```


# 🟥🟥🟥  python3 extrair.py 
* Retira todos os arquivos de todas as pastas para pasta raiz.
  
```
import os
import shutil


def achatar_diretorio_e_limpar(pasta_principal):
    """Move todos os arquivos das subpastas para a pasta principal,

    evitando duplicatas ao renomear arquivos repetidos, e deleta as pastas vazias.
    """
    pasta_principal = os.path.abspath(pasta_principal)
    arquivos_movidos = 0

    print("Fase 1: Movendo arquivos para a raiz...")
    print("-" * 50)

    # 1. Primeira Varredura: Mover os arquivos
    for pasta_atual, subpastas, arquivos in os.walk(
        pasta_principal, topdown=False
    ):
        pasta_atual_abs = os.path.abspath(pasta_atual)

        # Ignora pastas ocultas do sistema (.git, etc.)
        if any(
            parte.startswith(".") for parte in pasta_atual_abs.split(os.sep)
        ):
            continue

        # Se já estamos na pasta principal raiz, não fazemos nada com os arquivos daqui
        if pasta_atual_abs == pasta_principal:
            continue

        for nome_arquivo in arquivos:
            # Ignora o próprio script e arquivos ocultos
            if (
                nome_arquivo == "desfazer_organizacao.py"
                or nome_arquivo.startswith(".")
            ):
                continue

            caminho_origem = os.path.join(pasta_atual, nome_arquivo)
            nome_puro, extensao = os.path.splitext(nome_arquivo)

            # Define o destino inicial (direto na raiz)
            caminho_destino_final = os.path.join(pasta_principal, nome_arquivo)

            # Tratamento de duplicatas: se o arquivo já existe na raiz, renomeia
            contador = 1
            while os.path.exists(caminho_destino_final):
                novo_nome = f"{nome_puro}_{contador}{extensao}"
                caminho_destino_final = os.path.join(pasta_principal, novo_nome)
                contador += 1

            try:
                # Move o arquivo para a raiz
                shutil.move(caminho_origem, caminho_destino_final)
                arquivos_movidos += 1
                nome_final_exibicao = os.path.basename(caminho_destino_final)
                print(f"[{arquivos_movidos}] Movido: {nome_final_exibicao}")
            except Exception as erro:
                print(f"Erro ao mover {nome_arquivo}: {erro}")

    print("-" * 50)
    print(f"Total de arquivos movidos para a raiz: {arquivos_movidos}")
    print("-" * 50)

    # 2. Segunda Varredura: Apagar as subpastas que agora estão vazias
    print("\nFase 2: Removendo pastas vazias...")
    pastas_removidas = 0

    for pasta_atual, subpastas, arquivos in os.walk(
        pasta_principal, topdown=False
    ):
        pasta_atual_abs = os.path.abspath(pasta_atual)

        # Ignora pastas ocultas do sistema
        if any(
            parte.startswith(".") for parte in pasta_atual_abs.split(os.sep)
        ):
            continue

        # Nunca deleta a própria pasta principal
        if pasta_atual_abs == pasta_principal:
            continue

        # Verifica se a pasta está realmente vazia (sem arquivos e sem subpastas)
        if (
            not os.listdir(pasta_atual)
            and pasta_atual_abs != pasta_principal
        ):
            try:
                os.rmdir(pasta_atual)
                pastas_removidas += 1
                print(f"Pasta removida: {os.path.basename(pasta_atual)}")
            except Exception as erro:
                print(f"Não foi possível remover a pasta {pasta_atual}: {erro}")

    print("-" * 50)
    print(f"Total de pastas vazias deletadas: {pastas_removidas}")


# --- ÁREA DE EXECUÇÃO ---
# "." significa o diretório atual onde o script está rodando
DIRETORIO_ATUAL = "."

if __name__ == "__main__":
    print("Iniciando processo de achatamento e limpeza...")
    achatar_diretorio_e_limpar(DIRETORIO_ATUAL)
    print("\nProcesso concluído com sucesso!")

```


## 🟥🟥🟥 python3 limpar_duplicados.py
* Apaga todos os arquivos duplicados com o mesmo hash
  
```
import hashlib
import os


def calcular_hash(caminho_arquivo):
    """Calcula a 'impressão digital' (hash SHA-256) do arquivo para garantir

    que o conteúdo é identico.
    """
    hasher = hashlib.sha256()
    # Lê o arquivo em blocos para não travar a memória do celular se o arquivo for grande
    with open(caminho_arquivo, "rb") as f:
        while bloco := f.read(4096):
            hasher.update(bloco)
    return hasher.hexdigest()


def buscar_e_limpar_duplicados(pasta_origem):
    """Identifica arquivos idênticos pelo conteúdo e pergunta antes de apagar."""
    pasta_origem = os.path.abspath(pasta_origem)

    # Dicionário para guardar { hash_do_arquivo: [lista_de_caminhos_com_esse_hash] }
    registro_hashes = {}

    print(" Analisando arquivos em busca de conteúdo idêntico...")

    for pasta_atual, subpastas, arquivos in os.walk(pasta_origem):
        pasta_atual_abs = os.path.abspath(pasta_atual)

        # Ignora pastas ocultas e lixeiras
        if any(
            parte.startswith(".") for parte in pasta_atual_abs.split(os.sep)
        ):
            continue

        for nome_arquivo in arquivos:
            if nome_arquivo == "organizar.py" or nome_arquivo.startswith("."):
                continue

            caminho_completo = os.path.join(pasta_atual, nome_arquivo)

            try:
                # Calcula a impressão digital do arquivo
                hash_arquivo = calcular_hash(caminho_completo)

                # Se o hash já existe, encontramos uma duplicata
                if hash_arquivo in registro_hashes:
                    registro_hashes[hash_arquivo].append(caminho_completo)
                else:
                    # Se for a primeira vez que vemos esse hash, registra como o 'original'
                    registro_hashes[hash_arquivo] = [caminho_completo]
            except Exception as e:
                print(f"Não foi possível ler {nome_arquivo}: {e}")

    # Filtrar apenas os hashes que possuem mais de 1 arquivo (ou seja, têm duplicatas)
    duplicatas_detectadas = {
        hash_f: caminhos
        for hash_f, caminhos in registro_hashes.items()
        if len(caminhos) > 1
    }

    if not duplicatas_detectadas:
        print("\n Excelente! Nenhum arquivo idêntico foi encontrado.")
        return

    # Lista na tela as duplicatas encontradas
    print(f"\n Foram encontrados {len(duplicatas_detectadas)} grupos de arquivos idênticos:\n")
    
    arquivos_para_deletar = []

    for i, (hash_f, caminhos) in enumerate(duplicatas_detectadas.items(), 1):
        original = caminhos[0]
        copias = caminhos[1:]
        
        print(f"Grupo {i}:")
        print(f"  [MANTER] -> {os.path.relpath(original)}")
        for copia in copias:
            print(f"  [APAGAR] -> {os.path.relpath(copia)}")
            arquivos_para_deletar.append(copia)
        print("-" * 40)

    print(f"\nNo total, {len(arquivos_para_deletar)} cópias repetidas serão apagadas.")
    
    # INTERAÇÃO: Pergunta ao usuário no Termux se pode deletar
    resposta = input("Deseja apagar essas duplicatas agora? (s/n): ").strip().lower()

    if resposta == 's':
        print("\nApagando arquivos duplicados...")
        deletados = 0
        for caminho in arquivos_para_deletar:
            try:
                os.remove(caminho)
                print(f"Deletado com sucesso: {os.path.basename(caminho)}")
                deletados += 1
            except Exception as e:
                print(f"Erro ao deletar {os.path.basename(caminho)}: {e}")
        print(f"\nPronto! {deletados} arquivos inúteis foram removidos.")
    else:
        print("\nAção cancelada. Nenhum arquivo foi alterado.")


# --- ÁREA DE EXECUÇÃO ---
# Varre a pasta atual onde o Termux está aberto
ORIGEM = "."

if __name__ == "__main__":
    buscar_e_limpar_duplicados(ORIGEM)


```
# 🟥🟥🟥 python3 organizar.py
* separa todo os arquivos em pastas do mesmo tipo
  
```

import os
import shutil


def achatar_e_categorizar_por_tipo(pasta_origem, pasta_destino):
    """Varre as subpastas e apenas COPIA os arquivos para a pasta de destino,

    separando-os exclusivamente por suas extensões (tipos).
    """
    pasta_origem = os.path.abspath(pasta_origem)
    pasta_destino = os.path.abspath(pasta_destino)

    if not os.path.exists(pasta_destino):
        os.makedirs(pasta_destino)

    arquivos_copiados = 0

    for pasta_atual, subpastas, arquivos in os.walk(pasta_origem):
        pasta_atual_abs = os.path.abspath(pasta_atual)

        # Ignora pastas ocultas e lixeiras do sistema (.git, .Trash, etc)
        if any(
            parte.startswith(".") for parte in pasta_atual_abs.split(os.sep)
        ):
            continue

        # Evita que o script leia a própria pasta de destino
        if pasta_atual_abs.startswith(pasta_destino):
            continue

        for nome_arquivo in arquivos:
            # Ignora o próprio script e arquivos ocultos do sistema
            if nome_arquivo == "organizar.py" or nome_arquivo.startswith("."):
                continue

            caminho_origem = os.path.join(pasta_atual, nome_arquivo)
            nome_puro, extensao = os.path.splitext(nome_arquivo)

            # 1. Classifica EXCLUSIVAMENTE pelo tipo (ex: HTML, CSS, JS)
            if extensao:

            nome_subpasta_tipo = extensao.replace(".", "").lower()

            else:
                nome_subpasta_tipo = "SEM_EXTENSAO"

            # 2. Define a pasta do tipo (ex: ./bkps/HTML)
            caminho_pasta_tipo = os.path.join(pasta_destino, nome_subpasta_tipo)

            if not os.path.exists(caminho_pasta_tipo):
                os.makedirs(caminho_pasta_tipo)

            # 3. Define o caminho final do arquivo direto dentro da pasta do tipo
            caminho_destino_final = os.path.join(
                caminho_pasta_tipo, nome_arquivo
            )

            # 4. Tratamento de duplicatas com nomes iguais dentro da mesma pasta de tipo
            contador = 1
            while os.path.exists(caminho_destino_final):
                novo_nome = f"{nome_puro}_{contador}{extensao}"
                caminho_destino_final = os.path.join(
                    caminho_pasta_tipo, novo_nome
                )
                contador += 1

            try:
                # Copia o arquivo mantendo o original intacto na pasta de origem
                shutil.copy2(caminho_origem, caminho_destino_final)
                arquivos_copiados += 1
                nome_final_exibicao = os.path.basename(caminho_destino_final)
                print(
                    f"[{arquivos_copiados}] Copiado: {nome_arquivo} -> bkps/{nome_subpasta_tipo}/{nome_final_exibicao}"
                )
            except Exception as erro:
                print(f"Erro ao copiar {nome_arquivo}: {erro}")

    if arquivos_copiados == 0:
        print("\n[AVISO]: Nenhum arquivo real encontrado para copiar!")


# --- ÁREA DE EXECUÇÃO ---
ORIGEM = "."
DESTINO = "./organizado"

if __name__ == "__main__":
    print("Iniciando cópia organizada apenas por Tipo (Extensão)...")
    achatar_e_categorizar_por_tipo(ORIGEM, DESTINO)
    print("Processo concluído!")

```
# TETRIX
```
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tetris Web</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #121212;
            color: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 10px;
        }

        .game-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            max-width: 100%;
        }

        .header {
            text-align: center;
        }

        .score-board {
            font-size: 1.4rem;
            font-weight: bold;
            background: #1e1e1e;
            padding: 8px 24px;
            border-radius: 8px;
            border: 1px solid #333;
            margin-top: 6px;
        }

        canvas {
            background: #000000;
            border: 3px solid #333;
            border-radius: 6px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
            max-width: 90vw;
            max-height: 55vh;
        }

        .controls {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            width: 100%;
            max-width: 260px;
        }

        .btn {
            background: #2a2a2a;
            color: #ffffff;
            border: 2px solid #444;
            padding: 14px;
            font-size: 1.2rem;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            user-select: none;
            touch-action: manipulation;
            transition: background 0.1s, transform 0.1s;
        }

        .btn:active {
            background: #444444;
            transform: scale(0.95);
        }

        .btn-wide {
            grid-column: span 3;
            background: #0d6efd;
            border-color: #0d6efd;
        }

        .btn-wide:active {
            background: #0b5ed7;
        }
    </style>
</head>
<body>

    <div class="game-container">
        <div class="header">
            <h1>TETRIS</h1>
            <div class="score-board">Pontuação: <span id="score">0</span></div>
        </div>

        <canvas id="tetris" width="200" height="400"></canvas>

        <div class="controls">
            <button class="btn" id="left">◄</button>
            <button class="btn" id="rotate">↻</button>
            <button class="btn" id="right">►</button>
            <button class="btn btn-wide" id="down">▼ Descer</button>
        </div>
    </div>

    <script>
        const canvas = document.getElementById('tetris');
        const context = canvas.getContext('2d');
        
        // Escala cada bloco do grid para 20x20 pixels no Canvas
        context.scale(20, 20);

        // Matriz de cores das peças (Tetrominos)
        const colors = [
            null,
            '#00f0f0', // I - Ciano
            '#ff7f00', // L - Laranja
            '#0000f0', // J - Azul
            '#ffff00', // O - Amarelo
            '#ff0000', // Z - Vermelho
            '#00ff00', // S - Verde
            '#a000f0', // T - Roxo
        ];

        // Matriz do tabuleiro (10 colunas por 20 linhas)
        const arena = createMatrix(10, 20);

        // Estado do jogador
        const player = {
            pos: { x: 0, y: 0 },
            matrix: null,
            score: 0,
        };

        function createMatrix(w, h) {
            const matrix = [];
            while (h--) {
                matrix.push(new Array(w).fill(0));
            }
            return matrix;
        }

        function createPiece(type) {
            if (type === 'I') {
                return [
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                ];
            } else if (type === 'L') {
                return [
                    [0, 2, 0],
                    [0, 2, 0],
                    [0, 2, 2],
                ];
            } else if (type === 'J') {
                return [
                    [0, 3, 0],
                    [0, 3, 0],
                    [3, 3, 0],
                ];
            } else if (type === 'O') {
                return [
                    [4, 4],
                    [4, 4],
                ];
            } else if (type === 'Z') {
                return [
                    [5, 5, 0],
                    [0, 5, 5],
                    [0, 0, 0],
                ];
            } else if (type === 'S') {
                return [
                    [0, 6, 6],
                    [6, 6, 0],
                    [0, 0, 0],
                ];
            } else if (type === 'T') {
                return [
                    [0, 7, 0],
                    [7, 7, 7],
                    [0, 0, 0],
                ];
            }
        }

        function collide(arena, player) {
            const [m, o] = [player.matrix, player.pos];
            for (let y = 0; y < m.length; ++y) {
                for (let x = 0; x < m[y].length; ++x) {
                    if (m[y][x] !== 0 &&
                       (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
                        return true;
                    }
                }
            }
            return false;
        }

        function merge(arena, player) {
            player.matrix.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        arena[y + player.pos.y][x + player.pos.x] = value;
                    }
                });
            });
        }

        function rotate(matrix, dir) {
            for (let y = 0; y < matrix.length; ++y) {
                for (let x = 0; x < y; ++x) {
                    [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
                }
            }
            if (dir > 0) {
                matrix.forEach(row => row.reverse());
            } else {
                matrix.reverse();
            }
        }

        function arenaSweep() {
            let rowCount = 1;
            outer: for (let y = arena.length - 1; y >= 0; --y) {
                for (let x = 0; x < arena[y].length; ++x) {
                    if (arena[y][x] === 0) {
                        continue outer;
                    }
                }
                const row = arena.splice(y, 1)[0].fill(0);
                arena.unshift(row);
                ++y;

                player.score += rowCount * 100;
                rowCount *= 2;
            }
            updateScore();
        }

        function drawMatrix(matrix, offset) {
            matrix.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        context.fillStyle = colors[value];
                        context.fillRect(x + offset.x, y + offset.y, 1, 1);
                        
                        context.strokeStyle = '#111';
                        context.lineWidth = 0.05;
                        context.strokeRect(x + offset.x, y + offset.y, 1, 1);
                    }
                });
            });
        }

        function draw() {
            context.fillStyle = '#000';
            context.fillRect(0, 0, canvas.width, canvas.height);

            drawMatrix(arena, { x: 0, y: 0 });
            drawMatrix(player.matrix, player.pos);
        }

        function playerDrop() {
            player.pos.y++;
            if (collide(arena, player)) {
                player.pos.y--;
                merge(arena, player);
                playerReset();
                arenaSweep();
            }
            dropCounter = 0;
        }

        function playerMove(dir) {
            player.pos.x += dir;
            if (collide(arena, player)) {
                player.pos.x -= dir;
            }
        }

        function playerRotate(dir) {
            const pos = player.pos.x;
            let offset = 1;
            rotate(player.matrix, dir);
            while (collide(arena, player)) {
                player.pos.x += offset;
                offset = -(offset + (offset > 0 ? 1 : -1));
                if (offset > player.matrix[0].length) {
                    rotate(player.matrix, -dir);
                    player.pos.x = pos;
                    return;
                }
            }
        }

        function playerReset() {
            const pieces = 'TJLOSZI';
            player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
            player.pos.y = 0;
            player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
            
            if (collide(arena, player)) {
                arena.forEach(row => row.fill(0));
                alert('Fim de Jogo! Pontuação final: ' + player.score);
                player.score = 0;
                updateScore();
            }
        }

        function updateScore() {
            document.getElementById('score').innerText = player.score;
        }

        let dropCounter = 0;
        let dropInterval = 1000;
        let lastTime = 0;

        function update(time = 0) {
            const deltaTime = time - lastTime;
            lastTime = time;

            dropCounter += deltaTime;
            if (dropCounter > dropInterval) {
                playerDrop();
            }

            draw();
            requestAnimationFrame(update);
        }

        // Eventos de Teclado (Desktop)
        document.addEventListener('keydown', event => {
            if (event.key === 'ArrowLeft') {
                playerMove(-1);
            } else if (event.key === 'ArrowRight') {
                playerMove(1);
            } else if (event.key === 'ArrowDown') {
                playerDrop();
            } else if (event.key === 'ArrowUp' || event.key === 'w') {
                playerRotate(1);
            }
        });

        // Eventos de Toque / Botões Responsivos (Mobile)
        document.getElementById('left').addEventListener('click', () => playerMove(-1));
        document.getElementById('right').addEventListener('click', () => playerMove(1));
        document.getElementById('rotate').addEventListener('click', () => playerRotate(1));
        document.getElementById('down').addEventListener('click', () => playerDrop());

        // Inicialização
        playerReset();
        updateScore();
        update();
    </script>
</body>
</html>
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# Supabase
```
# verificar versao do linux:
cat /etc/os-release
```
```
# verificar versao do docker e status do servico:
docker --version && sudo systemctl status docker --no-pager
```
```
# baixar e instalar a supabase cli diretamente em /usr/local/bin:
curl -fsSL https://raw.githubusercontent.com/supabase/cli/main/install.sh | sudo sh -s -- -b /usr/local/bin

# verificar se a instalacao foi concluida com sucesso:
supabase --version
```
```
# criar pasta para o backend local e entrar nela:
mkdir -p ~/supabase-local && cd ~/supabase-local

# inicializar a estrutura do supabase:
supabase init
```
```
# iniciar a stack completa de conteineres do supabase local:
supabase start
```
```
# iniciar a stack completa de conteineres do supabase local:
supabase start
```


## Criar conta e projeto
* Acesse: https://supabase.com
* Crie uma conta
* Clique em New Project
* 
## Escolha:(exemplo)
* Nome do projeto: erp_abp
* Senha do banco: ***********
* Região: brasil

# CRIAR TABELA
```
CREATE TABLE public.equipamentos_ti (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    nome text NOT NULL,
    preco numeric NOT NULL,
    especificacoes jsonb DEFAULT '{}'::jsonb,
    foto_url text DEFAULT NULL,
    esta_ativo boolean DEFAULT true,
    criado_em timestamp with time zone DEFAULT now()
);

```
# CRIAR STORAGE E SUAS POLITICAS
```
-- Criacao do bucket de fotos
INSERT INTO storage.buckets (id, name, public)
VALUES ('equipamentos_fotos', 'equipamentos_fotos', true)
ON CONFLICT (id) DO NOTHING;

-- Politicas de acesso para usuarios autenticados
CREATE POLICY "Apenas autenticados leem fotos" 
ON storage.objects FOR SELECT TO authenticated 
USING (bucket_id = 'equipamentos_fotos');

CREATE POLICY "Apenas autenticados sobem fotos" 
ON storage.objects FOR INSERT TO authenticated 
WITH CHECK (bucket_id = 'equipamentos_fotos');

CREATE POLICY "Apenas autenticados apagam fotos" 
ON storage.objects FOR DELETE TO authenticated 
USING (bucket_id = 'equipamentos_fotos');
```
# RLS_TABELA EQUIPAMENTOS
```
ALTER TABLE public.equipamentos_ti ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Apenas autenticados leem equipamentos ativos" 
ON public.equipamentos_ti 
FOR SELECT 
TO authenticated 
USING (esta_ativo = true);

CREATE POLICY "Apenas autenticados inserem equipamentos" 
ON public.equipamentos_ti 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Apenas autenticados atualizam equipamentos" 
ON public.equipamentos_ti 
FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Apenas autenticados deletam equipamentos" 
ON public.equipamentos_ti 
FOR DELETE 
TO authenticated 
USING (true);
```

# RPC  (Remote Procedure Call, Chamada de Procedimento Remoto).
* É uma técnica que permite ao seu aplicativo (frontend/cliente) invocar e executar uma função que reside fisicamente em outro servidor (backend/banco de dados) como se fosse uma função local.

## No ecossistema do Supabase/PostgreSQL, funciona da seguinte forma:
**Função no Servidor:**
Em vez de mandar comandos diretos (INSERT, UPDATE) do frontend, você cria a função dentro do banco de dados (as funções PL/pgSQL).

**Chamada Segura:**
O frontend dispara apenas uma linha de comando, como supabase.rpc('adicionar_equipamento_seguro', { dados }).

**Regra de Negócio Blindada:**
O processamento, as validações de dados e a segurança rodam dentro do Postgres com privilégios controlados, impedindo que usuários mal-intencionados alterem regras via console do navegador (DevTools).




# RPC_ADICIONAR_EQUIPAMENTO (FUNCTION NO SUPABASE)
```
CREATE OR REPLACE FUNCTION public.adicionar_equipamento_seguro(
    p_nome text,
    p_preco numeric,
    p_especificacoes jsonb,
    p_foto_url text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_novo_id uuid;
BEGIN
    IF p_nome IS NULL OR length(trim(p_nome)) < 3 THEN
        RAISE EXCEPTION 'Erro de Segurança: O nome do equipamento deve ter pelo menos 3 caracteres.';
    END IF;

    IF p_preco <= 0 THEN
        RAISE EXCEPTION 'Erro de Segurança: O preço deve ser maior que zero.';
    END IF;

    INSERT INTO public.equipamentos_ti (nome, preco, especificacoes, foto_url, esta_ativo)
    VALUES (trim(p_nome), p_preco, p_especificacoes, p_foto_url, true)
    RETURNING id INTO v_novo_id;

    RETURN v_novo_id;
END;
$$;

```

# RPC_ATUALIZAR_EQUIPAMENTO (FUNCTION NO SUPABASE)
```
CREATE OR REPLACE FUNCTION public.atualizar_equipamento_seguro(
    p_id uuid,
    p_novo_nome text,
    p_novo_preco numeric,
    p_foto_url text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF p_novo_nome IS NULL OR length(trim(p_novo_nome)) < 3 THEN
        RAISE EXCEPTION 'Erro de Segurança: O nome do equipamento deve ter pelo menos 3 caracteres.';
    END IF;

    IF p_novo_preco <= 0 THEN
        RAISE EXCEPTION 'Erro de Segurança: O preço deve ser maior que zero.';
    END IF;

    UPDATE public.equipamentos_ti
    SET 
        nome = trim(p_novo_nome),
        preco = p_novo_preco,
        foto_url = p_foto_url
    WHERE id = p_id AND esta_ativo = true;
END;
$$;
```

# RPC_DESATIVAR_EQUIPAMENTO (FUNCTION NO SUPABASE)
```
CREATE OR REPLACE FUNCTION public.desativar_equipamento_seguro(
    p_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.equipamentos_ti
    SET esta_ativo = false
    WHERE id = p_id;
END;
$$;

```

# RPC_LIMPAR_LIXEIRA (FUNCTION NO SUPABASE)
```
CREATE OR REPLACE FUNCTION public.limpar_lixeira_seguro()
RETURNS TABLE(url_da_foto text)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    DELETE FROM public.equipamentos_ti
    WHERE esta_ativo = false
    RETURNING foto_url;
END;
$$;

```
# RPC_LISTAR_LIXEIRA (FUNCTION NO SUPABASE)

```
-- =======================================================================================
-- RPC: LISTAR LIXEIRA (Visualizar itens ocultos)
-- =======================================================================================
CREATE OR REPLACE FUNCTION public.listar_lixeira_seguro()
RETURNS TABLE (
    id uuid,
    nome text,
    preco numeric,
    foto_url text,
    criado_em timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Busca todos os equipamentos que estão inativos (Soft Delete)
    RETURN QUERY
    SELECT e.id, e.nome, e.preco, e.foto_url, e.criado_em
    FROM public.equipamentos_ti e
    WHERE e.esta_ativo = false
    ORDER BY e.criado_em DESC;
END;
$$;
```

# RPC_RESTAURAR_EQUIPAMENTO (FUNCTION NO SUPABASE)

```
-- =======================================================================================
-- RPC: RESTAURAR EQUIPAMENTO (Desfaz o Soft Delete)
-- =======================================================================================
CREATE OR REPLACE FUNCTION public.restaurar_equipamento_seguro(
    p_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Atualiza o status do equipamento de volta para 'true' (Ativo)
    UPDATE public.equipamentos_ti
    SET esta_ativo = true
    WHERE id = p_id;
END;
$$;
```

# RPC_OUCULTAR_MULTIPOS (FUNCTION NO SUPABASE)

```
-- =======================================================================================
-- RPC: OCULTAR MÚLTIPLOS EQUIPAMENTOS (Soft Delete em Lote)
-- =======================================================================================
-- O parâmetro "p_ids uuid[]" significa que ele aceita uma LISTA (Array) de IDs.

CREATE OR REPLACE FUNCTION public.ocultar_multiplos_equipamentos_seguro(
    p_ids uuid[]
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Atualiza para inativo todos os itens cujo ID esteja dentro da lista fornecida
    UPDATE public.equipamentos_ti
    SET esta_ativo = false
    WHERE id = ANY(p_ids);
END;
$$;


```
# credenciais.html

```
<!DOCTYPE html>
<html lang="pt-BR">
<!--head_config-->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chaveiro Multi-Empresas - TI</title>
    
    <!--estilos-->
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f9; display: flex; flex-direction: column; align-items: center; margin: 0; }
        .card { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 100%; max-width: 500px; margin-bottom: 20px;}
        input { width: 100%; padding: 10px; margin: 8px 0 15px 0; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; }
        
        button { padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9em; font-weight: bold; color: white; }
        .btn-salvar { background: #007bff; width: 100%; font-size: 1em; padding: 12px;}
        .btn-salvar:hover { background: #0056b3; }
        .btn-acessar { background: #28a745; }
        .btn-acessar:hover { background: #218838; }
        .btn-editar { background: #ffc107; color: #212529; }
        .btn-editar:hover { background: #e0a800; }
        .btn-excluir { background: #dc3545; }
        .btn-excluir:hover { background: #c82333; }
        
        .titulo { text-align: center; margin-bottom: 20px; color: #333; margin-top: 0;}
        .info { background-color: #e2e3e5; color: #383d41; padding: 10px; border-radius: 5px; text-align: center; margin-bottom: 15px; font-size: 0.9em; }
        
        .item-empresa { padding: 15px; border: 1px solid #eee; border-radius: 5px; margin-bottom: 10px; background: #fafafa; }
        .item-empresa strong { display: block; font-size: 1.1em; color: #007bff; margin-bottom: 5px;}
        .grupo-botoes { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap;}
    </style>
    <!--/estilos-->
</head>
<!--/head_config-->

<body>
    
    <!--painel_cadastro_chaves-->
    <div class="card">
        <h2 class="titulo">🏢 Cadastrar Nova Empresa</h2>
        
        <form id="form-empresa">
            <!-- ID oculto para sabermos se estamos criando ou editando -->
            <input type="hidden" id="input-id">
            
            <label for="input-nome">Nome da Empresa:</label>
            <input type="text" id="input-nome" placeholder="Ex: Loja do João" required>

            <label for="input-url">URL do Supabase:</label>
            <input type="text" id="input-url" placeholder="https://xyz.supabase.co" required>
            
            <label for="input-key">Anon Key:</label>
            <input type="password" id="input-key" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX..." required>
            
            <button type="submit" class="btn-salvar">💾 Salvar Credenciais</button>
        </form>
    </div>
    <!--/painel_cadastro_chaves-->

    <!--painel_listagem_chaves-->
    <div class="card">
        <h2 class="titulo">🔑 Bancos de Dados Salvos</h2>
        <div id="status" class="info">Carregando chaves locais...</div>
        
        <div id="lista-empresas">
            <!-- A lista será injetada aqui pelo JavaScript -->
        </div>
    </div>
    <!--/painel_listagem_chaves-->


    <!--logica_principal_js-->
    <script>
        /* ================= SEGURANÇA (INDEXEDDB) ================= */
        const NOME_BANCO = 'SegurancaAppDB';
        const NOME_TABELA = 'chaves_supabase';

        <!--funcao_iniciarBancoDeDados-->
        function iniciarBancoDeDados() {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(NOME_BANCO, 1);
                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains(NOME_TABELA)) {
                        db.createObjectStore(NOME_TABELA, { keyPath: 'id' });
                    }
                };
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        }
        <!--/funcao_iniciarBancoDeDados-->

        <!--funcao_crud_empresas-->
        // BUSCAR a lista de empresas (Array)
        async function buscarEmpresas() {
            const db = await iniciarBancoDeDados();
            return new Promise((resolve) => {
                const transaction = db.transaction([NOME_TABELA], 'readonly');
                const store = transaction.objectStore(NOME_TABELA);
                const request = store.get('lista_empresas');
                // Se existir, devolve os dados. Se não, devolve um array vazio []
                request.onsuccess = () => resolve(request.result ? request.result.dados : []);
                request.onerror = () => resolve([]);
            });
        }

        // SALVAR a lista inteira de empresas de volta no banco
        async function salvarListaEmpresas(arrayDeEmpresas) {
            const db = await iniciarBancoDeDados();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([NOME_TABELA], 'readwrite');
                const store = transaction.objectStore(NOME_TABELA);
                // Guarda o array inteiro dentro da chave 'lista_empresas'
                store.put({ id: 'lista_empresas', dados: arrayDeEmpresas });
                transaction.oncomplete = () => resolve();
                transaction.onerror = () => reject(transaction.error);
            });
        }

        // DEFINIR CREDENCIAL ATIVA (Usada para o Login)
        async function definirCredencialAtiva(url, anonKey) {
            const db = await iniciarBancoDeDados();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([NOME_TABELA], 'readwrite');
                const store = transaction.objectStore(NOME_TABELA);
                // Sobrescreve a chave que o login.html e os outros arquivos usam!
                store.put({ id: 'supabase_creds', url: url.trim(), anonKey: anonKey.trim() });
                transaction.oncomplete = () => resolve();
                transaction.onerror = () => reject(transaction.error);
            });
        }
        <!--/funcao_crud_empresas-->


        /* ================= LÓGICA DE INTERFACE ================= */
        let empresasGlobais = [];

        <!--funcao_renderizarLista-->
        async function renderizarLista() {
            const divLista = document.getElementById('lista-empresas');
            const statusDiv = document.getElementById('status');
            
            empresasGlobais = await buscarEmpresas();
            divLista.innerHTML = ""; 

            if (empresasGlobais.length === 0) {
                statusDiv.textContent = "Nenhuma empresa cadastrada ainda.";
                return;
            }

            statusDiv.textContent = `Você possui ${empresasGlobais.length} empresa(s) salva(s).`;

            empresasGlobais.forEach((empresa) => {
                const divItem = document.createElement('div');
                divItem.className = 'item-empresa';

                divItem.innerHTML = `
                    <strong>${empresa.nome}</strong>
                    <span style="font-size: 0.8em; color: #666; word-break: break-all;">URL: ${empresa.url}</span>
                `;

                const divBotoes = document.createElement('div');
                divBotoes.className = 'grupo-botoes';

                // Botão Acessar: Define a credencial ativa e envia pro Login
                const btnAcessar = document.createElement('button');
                btnAcessar.textContent = "🚀 Acessar";
                btnAcessar.className = "btn-acessar";
                btnAcessar.onclick = async () => {
                    await definirCredencialAtiva(empresa.url, empresa.anonKey);
                    window.location.href = 'login.html';
                };

                // Botão Editar: Preenche o formulário lá em cima
                const btnEditar = document.createElement('button');
                btnEditar.textContent = "✏️ Editar";
                btnEditar.className = "btn-editar";
                btnEditar.onclick = () => {
                    document.getElementById('input-id').value = empresa.id;
                    document.getElementById('input-nome').value = empresa.nome;
                    document.getElementById('input-url').value = empresa.url;
                    document.getElementById('input-key').value = empresa.anonKey;
                    window.scrollTo(0, 0); // Sobe a tela para o formulário
                };

                // Botão Excluir: Remove do array e salva
                const btnExcluir = document.createElement('button');
                btnExcluir.textContent = "🗑️ Excluir";
                btnExcluir.className = "btn-excluir";
                btnExcluir.onclick = async () => {
                    if(confirm(`Deseja realmente apagar o banco da empresa '${empresa.nome}' do seu dispositivo?`)) {
                        // Filtra o array removendo a empresa clicada
                        empresasGlobais = empresasGlobais.filter(e => e.id !== empresa.id);
                        await salvarListaEmpresas(empresasGlobais);
                        renderizarLista();
                    }
                };

                divBotoes.appendChild(btnAcessar);
                divBotoes.appendChild(btnEditar);
                divBotoes.appendChild(btnExcluir);
                divItem.appendChild(divBotoes);
                divLista.appendChild(divItem);
            });
        }
        <!--/funcao_renderizarLista-->

        <!--evento_submit_formulario-->
        document.getElementById('form-empresa').addEventListener('submit', async (evento) => {
            evento.preventDefault(); 
            
            const idDigitado = document.getElementById('input-id').value;
            const nomeDigitado = document.getElementById('input-nome').value;
            const urlDigitada = document.getElementById('input-url').value;
            const keyDigitada = document.getElementById('input-key').value;

            if (idDigitado) {
                // MODO EDIÇÃO: Atualiza a empresa existente no Array
                const index = empresasGlobais.findIndex(e => e.id === idDigitado);
                if(index !== -1) {
                    empresasGlobais[index] = {
                        id: idDigitado,
                        nome: nomeDigitado,
                        url: urlDigitada,
                        anonKey: keyDigitada
                    };
                }
            } else {
                // MODO CRIAÇÃO: Adiciona uma nova empresa no Array
                const novaEmpresa = {
                    id: Date.now().toString(), // Cria um ID único baseado na data/hora
                    nome: nomeDigitado,
                    url: urlDigitada,
                    anonKey: keyDigitada
                };
                empresasGlobais.push(novaEmpresa);
            }

            // Salva no IndexedDB, recarrega a lista e limpa o formulário
            await salvarListaEmpresas(empresasGlobais);
            renderizarLista();
            evento.target.reset();
            document.getElementById('input-id').value = ""; // Limpa o ID oculto
            alert("✅ Credenciais salvas com sucesso no seu dispositivo!");
        });
        <!--/evento_submit_formulario-->

        <!--evento_onload_janela-->
        // Ao abrir a página, apenas desenha a lista (removemos o redirecionamento automático!)
        window.onload = () => {
            renderizarLista();
        };
        <!--/evento_onload_janela-->

    </script>
    <!--/logica_principal_js-->
</body>
</html>

```
# login.html

```
<!DOCTYPE html>
<html lang="pt-BR">
<!--head_config-->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Seguro - Equipamentos TI</title>
    
    <!--estilos-->
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f9; display: flex; justify-content: center; align-items: center; height: 90vh; margin: 0; }
        .card { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 100%; max-width: 400px;}
        input { width: 100%; padding: 10px; margin: 10px 0 20px 0; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; }
        button { width: 100%; padding: 12px 15px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1em; font-weight: bold; }
        button:hover { background: #0056b3; }
        .titulo { text-align: center; margin-bottom: 20px; color: #333; }
        .info { background-color: #d1ecf1; color: #0c5460; padding: 10px; border-radius: 5px; text-align: center; margin-bottom: 15px; font-size: 0.9em; }
        .erro { background-color: #f8d7da; color: #721c24; }
    </style>
    <!--/estilos-->

    <!--biblioteca_supabase-->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <!--/biblioteca_supabase-->
</head>
<!--/head_config-->

<body>
    
    <div class="card">
        <h2 class="titulo">🔐 Acesso ao Sistema</h2>
        <div id="status" class="info">Verificando segurança...</div>

        <!--form_login_usuario-->
        <div id="area-login" style="display: none;">
            <p style="font-size: 0.9em; color: #666; margin-top: 0;">Entre com suas credenciais de administrador.</p>
            <label for="input-email">E-mail Administrativo:</label>
            <input type="email" id="input-email" placeholder="admin@teste.com" required>
            
            <label for="input-senha">Senha:</label>
            <input type="password" id="input-senha" placeholder="Sua senha secreta" required>
            
            <button id="btn-entrar">Fazer Login</button>
        </div>
        <!--/form_login_usuario-->
    </div>

    <!--logica_principal_js-->
    <script>
        /* ================= SEGURANÇA (INDEXEDDB) ================= */
        const NOME_BANCO = 'SegurancaAppDB';
        const NOME_TABELA = 'chaves_supabase';
        let clienteSupabase = null;

        <!--funcao_iniciarBancoDeDados-->
        function iniciarBancoDeDados() {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(NOME_BANCO, 1);
                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains(NOME_TABELA)) {
                        db.createObjectStore(NOME_TABELA, { keyPath: 'id' });
                    }
                };
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        }
        <!--/funcao_iniciarBancoDeDados-->

        <!--funcao_recuperarCredenciais-->
        async function recuperarCredenciais() {
            const db = await iniciarBancoDeDados();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([NOME_TABELA], 'readonly');
                const store = transaction.objectStore(NOME_TABELA);
                const request = store.get('supabase_creds');
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        }
        <!--/funcao_recuperarCredenciais-->

        /* ================= AUTENTICAÇÃO (AUTH) ================= */

        <!--funcao_fazerLogin-->
        async function fazerLogin() {
            const email = document.getElementById('input-email').value;
            const senha = document.getElementById('input-senha').value;
            const btnEntrar = document.getElementById('btn-entrar');
            const statusDiv = document.getElementById('status');

            if (!email || !senha) {
                alert("Preencha e-mail e senha!");
                return;
            }

            btnEntrar.textContent = "Autenticando...";
            btnEntrar.disabled = true;

            try {
                const { data, error } = await clienteSupabase.auth.signInWithPassword({
                    email: email,
                    password: senha
                });

                if (error) throw error; 

                statusDiv.textContent = "✅ Autenticado com sucesso! Entrando...";
                statusDiv.style.backgroundColor = "#d4edda";
                statusDiv.style.color = "#155724";

                // Redireciona para o painel principal
                setTimeout(() => {
                    window.location.href = 'listar.html';
                }, 1000);

            } catch (erro) {
                console.error(erro);
                statusDiv.textContent = "❌ Erro no login: Verifique seu e-mail e senha.";
                statusDiv.className = "info erro";
                btnEntrar.textContent = "Fazer Login";
                btnEntrar.disabled = false;
            }
        }
        <!--/funcao_fazerLogin-->

        /* ================= INICIALIZAÇÃO DA PÁGINA ================= */

        <!--evento_onload_janela-->
        window.onload = async () => {
            const statusDiv = document.getElementById('status');
            const areaLogin = document.getElementById('area-login');
            const btnEntrar = document.getElementById('btn-entrar');

            btnEntrar.addEventListener('click', fazerLogin);

            try {
                const creds = await recuperarCredenciais();
                
                // 1. Verificação Estrita: Se não tem chaves de conexão, expulsa para a configuração
                if (!creds || !creds.url || !creds.anonKey) {
                    window.location.href = 'credenciais_supabase_indexdb.html';
                    return; 
                }

                // 2. Com as chaves validadas, inicializa o Supabase
                clienteSupabase = supabase.createClient(creds.url, creds.anonKey);

                // 3. O usuário já possui uma sessão ativa?
                const { data: { session } } = await clienteSupabase.auth.getSession();

                if (session) {
                    // Já está logado, envia diretamente para o index
                    statusDiv.textContent = "Sessão válida encontrada! Redirecionando...";
                    statusDiv.style.backgroundColor = "#d4edda";
                    statusDiv.style.color = "#155724";
                    setTimeout(() => {
                        window.location.href = 'listar.html';
                    }, 800);
                } else {
                    // Banco conectado, mas sessão vazia. Libera os campos de e-mail e senha.
                    statusDiv.textContent = "Banco conectado. Faça login para continuar.";
                    areaLogin.style.display = "block";
                }

            } catch (error) {
                console.error("Erro Crítico:", error);
                statusDiv.textContent = "❌ Erro grave no sistema.";
                statusDiv.className = "info erro";
            }
        };
        <!--/evento_onload_janela-->
    </script>
    <!--/logica_principal_js-->
</body>
</html>
```
# listar.html

```
<!DOCTYPE html>
<html lang="pt-BR">
<!--head_config-->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel de Equipamentos - Lista</title>
    
    <!--estilos-->
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f9; }
        .info { background-color: #d1ecf1; color: #0c5460; }
        .erro { background-color: #f8d7da; color: #721c24; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin-bottom: 20px;}
        button { padding: 10px 15px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9em; }
        button:hover { background: #0056b3; }
        
        .btn-sucesso { background: #28a745; font-size: 1em; font-weight: bold;}
        .btn-sucesso:hover { background: #218838; }
        .btn-perigo { background: #dc3545; }
        .btn-perigo:hover { background: #c82333; }
        .btn-editar { background: #ffc107; color: #212529; }
        .btn-editar:hover { background: #e0a800; }
        .btn-alerta { background: #fd7e14; font-size: 1em; font-weight: bold; }
        .btn-alerta:hover { background: #e86e04; }
        .btn-secundario { background: #6c757d; font-size: 1em; font-weight: bold; }
        .btn-secundario:hover { background: #5a6268; }
        .btn-restaurar { background: #20c997; font-size: 1em; font-weight: bold; }
        .btn-restaurar:hover { background: #1aa179; }
        
        /* Estilos Novos para Busca e Checkbox */
        .input-busca { width: 100%; padding: 12px; margin-top: 15px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; font-size: 1em; }
        .barra-acoes-lote { background-color: #fff3cd; padding: 10px; border-radius: 5px; margin-top: 15px; display: none; align-items: center; justify-content: space-between; border: 1px solid #ffeeba;}
        .chk-item { transform: scale(1.5); margin-right: 15px; cursor: pointer; }
        
        .item-lista { padding: 15px; border-bottom: 1px solid #eee; display: flex; flex-direction: row; gap: 15px; align-items: center;}
        .conteudo-item { display: flex; flex-direction: column; gap: 8px; flex-grow: 1; }
        .img-preview { max-width: 150px; border-radius: 8px; margin-top: 5px; border: 1px solid #ccc; }
        .cabecalho-painel { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;}
        .grupo-botoes-topo { display: flex; gap: 10px; flex-wrap: wrap;}
        .badge-lixeira { background: #dc3545; color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.8em; font-weight: bold;}
    </style>
    <!--/estilos-->

    <!--biblioteca_supabase-->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <!--/biblioteca_supabase-->
</head>
<!--/head_config-->

<body>
    
    <!--status_bar-->
    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
        <div id="status" class="info" style="flex-grow: 1; padding: 10px; border-radius: 5px; font-weight: bold; margin-bottom: 0;">Autenticando sessão...</div>
        <button id="btn-sair" class="btn-perigo" style="display: none;">Sair do Sistema</button>
    </div>
    <!--/status_bar-->

    <!--lista_equipamentos_cadastrados-->
    <div id="app" class="card" style="display: none;">
        <div class="cabecalho-painel">
            <h2 id="titulo-painel">Lista de Equipamentos 💻</h2>
            
            <div class="grupo-botoes-topo">
                <button id="btn-ver-lixeira" class="btn-secundario">👁️ Ver Lixeira</button>
                <button id="btn-limpar-lixeira" class="btn-alerta" style="display: none;">🧹 Esvaziar Lixeira</button>
                <button id="btn-novo" class="btn-sucesso">➕ Novo</button>
            </div>
        </div>

        <!--barra_de_busca-->
        <input type="text" id="input-busca" class="input-busca" placeholder="🔍 Buscar equipamento pelo nome...">
        <!--/barra_de_busca-->

        <!--barra_acoes_lote-->
        <div id="barra-acoes-lote" class="barra-acoes-lote">
            <strong style="color: #856404;" id="texto-contagem-lote">0 itens selecionados</strong>
            <button id="btn-ocultar-lote" class="btn-perigo">🗑️ Ocultar Selecionados</button>
        </div>
        <!--/barra_acoes_lote-->

        <hr />
        
        <div id="lista-equipamentos">
            <p>⏳ Carregando sistema...</p>
        </div>
    </div> 
    <!--/lista_equipamentos_cadastrados-->

    <!--logica_principal_js-->
    <script>
        /* ================= SEGURANÇA E ESTADOS ================= */
        const NOME_BANCO = 'SegurancaAppDB';
        const NOME_TABELA = 'chaves_supabase';
        let clienteSupabase = null;
        
        let exibindoLixeira = false; 
        let dadosGlobaisNaMemoria = []; // Guarda os dados para o filtro funcionar rápido

        function iniciarBancoDeDados() {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(NOME_BANCO, 1);
                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains(NOME_TABELA)) {
                        db.createObjectStore(NOME_TABELA, { keyPath: 'id' });
                    }
                };
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        }

        async function recuperarCredenciais() {
            const db = await iniciarBancoDeDados();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([NOME_TABELA], 'readonly');
                const store = transaction.objectStore(NOME_TABELA);
                const request = store.get('supabase_creds');
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        }

        /* ================= BANCO DE DADOS (GET / DELETE MULTIPLOS) ================= */

        async function buscarEquipamentos() {
            const divLista = document.getElementById('lista-equipamentos');
            divLista.textContent = "Buscando dados no Supabase...";

            try {
                const { data, error } = await clienteSupabase
                    .from('equipamentos_ti')
                    .select('*')
                    .eq('esta_ativo', true) 
                    .order('criado_em', { ascending: false });

                if (error) throw error;
                
                dadosGlobaisNaMemoria = data; // Salva na memória
                renderizarLista(dadosGlobaisNaMemoria, false); // Desenha a tela

            } catch (erro) {
                console.error(erro);
                divLista.textContent = "Erro ao buscar dados: " + (erro.message || JSON.stringify(erro));
            }
        }

        async function buscarLixeira() {
            const divLista = document.getElementById('lista-equipamentos');
            divLista.textContent = "Buscando itens na lixeira...";

            try {
                const { data, error } = await clienteSupabase.rpc('listar_lixeira_seguro');
                if (error) throw error;
                
                dadosGlobaisNaMemoria = data; // Salva na memória
                renderizarLista(dadosGlobaisNaMemoria, true);

            } catch (erro) {
                console.error(erro);
                divLista.textContent = "Erro ao buscar lixeira: " + (erro.message || JSON.stringify(erro));
            }
        }

        /* ================= RENDERIZAÇÃO E FILTROS ================= */

        <!--funcao_filtrarLocalmente-->
        // Ouve a digitação no campo de busca e filtra a lista instantaneamente
        document.getElementById('input-busca').addEventListener('input', (evento) => {
            const textoBusca = evento.target.value.toLowerCase();
            
            // Filtra o array guardado na memória
            const listaFiltrada = dadosGlobaisNaMemoria.filter((eq) => {
                return eq.nome.toLowerCase().includes(textoBusca);
            });

            // Redesenha a lista apenas com os resultados filtrados
            renderizarLista(listaFiltrada, exibindoLixeira);
        });
        <!--/funcao_filtrarLocalmente-->

        <!--funcao_verificarCheckboxes-->
        // Analisa quantas caixas estão marcadas para mostrar ou esconder a barra de ação em lote
        function atualizarBarraAcoesLote() {
            const checkboxes = document.querySelectorAll('.chk-item:checked');
            const barraAcoes = document.getElementById('barra-acoes-lote');
            const textoContagem = document.getElementById('texto-contagem-lote');

            // Só mostra a barra de exclusão se estiver na lista de ATIVOS e com itens marcados
            if (checkboxes.length > 0 && !exibindoLixeira) {
                barraAcoes.style.display = 'flex';
                textoContagem.textContent = `${checkboxes.length} item(ns) selecionado(s)`;
            } else {
                barraAcoes.style.display = 'none';
            }
        }
        <!--/funcao_verificarCheckboxes-->

        function renderizarLista(equipamentos, isLixeira) {
            const divLista = document.getElementById('lista-equipamentos');
            divLista.innerHTML = ""; 
            
            // Oculta a barra de lotes ao redesenhar
            document.getElementById('barra-acoes-lote').style.display = 'none';

            const btnLimparLixeira = document.getElementById('btn-limpar-lixeira');
            if (isLixeira && equipamentos.length > 0) {
                btnLimparLixeira.style.display = "inline-block";
            } else {
                btnLimparLixeira.style.display = "none";
            }

            if (equipamentos.length === 0) {
                divLista.textContent = isLixeira ? "A lixeira está vazia." : "Nenhum equipamento cadastrado ou encontrado na busca.";
                return;
            }

            equipamentos.forEach((eq) => {
                const divItem = document.createElement('div');
                divItem.className = 'item-lista';

                // Novo: Adiciona o Checkbox de seleção na tela
                if (!isLixeira) {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.className = 'chk-item';
                    checkbox.value = eq.id;
                    checkbox.addEventListener('change', atualizarBarraAcoesLote);
                    divItem.appendChild(checkbox);
                }

                // Conteudo do Equipamento
                const divConteudo = document.createElement('div');
                divConteudo.className = 'conteudo-item';

                const divTitulo = document.createElement('div');
                const titulo = document.createElement('strong');
                titulo.textContent = eq.nome; 
                divTitulo.appendChild(titulo);

                if (isLixeira) {
                    const badge = document.createElement('span');
                    badge.className = 'badge-lixeira';
                    badge.textContent = ' NA LIXEIRA';
                    badge.style.marginLeft = '10px';
                    divTitulo.appendChild(badge);
                }

                const precoText = document.createElement('span');
                precoText.textContent = "Preço: R$ " + parseFloat(eq.preco).toFixed(2);

                divConteudo.appendChild(divTitulo);
                divConteudo.appendChild(precoText);

                if (eq.foto_url) {
                    const img = document.createElement('img');
                    img.src = eq.foto_url;
                    img.className = 'img-preview';
                    divConteudo.appendChild(img);
                }

                const divBotoes = document.createElement('div');
                divBotoes.style.display = 'flex';
                divBotoes.style.gap = '10px';
                
                if (isLixeira) {
                    const btnRestaurar = document.createElement('button');
                    btnRestaurar.innerHTML = "♻️ Restaurar";
                    btnRestaurar.className = "btn-restaurar";
                    btnRestaurar.onclick = () => restaurarEquipamento(eq.id);
                    divBotoes.appendChild(btnRestaurar);
                } else {
                    const btnEditar = document.createElement('button');
                    btnEditar.textContent = "✏️ Editar";
                    btnEditar.className = "btn-editar";
                    btnEditar.onclick = () => { window.location.href = 'cadastra.html?id=' + eq.id; }; 
                    
                    const btnExcluir = document.createElement('button');
                    btnExcluir.textContent = "🗑️ Ocultar";
                    btnExcluir.className = "btn-perigo";
                    btnExcluir.onclick = () => excluirEquipamento(eq.id); 
                    
                    divBotoes.appendChild(btnEditar);
                    divBotoes.appendChild(btnExcluir);
                }

                divConteudo.appendChild(divBotoes);
                divItem.appendChild(divConteudo);
                divLista.appendChild(divItem);
            });
        }

        /* ================= AÇÕES (SINGLE E MULTIPLAS) ================= */

        <!--funcao_ocultarMultiplos-->
        // Função ativada pelo botão "Ocultar Selecionados"
        document.getElementById('btn-ocultar-lote').addEventListener('click', async () => {
            const checkboxes = document.querySelectorAll('.chk-item:checked');
            // Mapeia os elementos HTML para extrair apenas uma lista (array) de IDs
            const idsSelecionados = Array.from(checkboxes).map(chk => chk.value);

            if (idsSelecionados.length === 0) return;

            const confirmacao = confirm(`Deseja enviar ${idsSelecionados.length} itens para a lixeira de uma só vez?`);
            if (!confirmacao) return;

            try {
                // Chama a nossa nova RPC passando o Array de IDs
                const { error } = await clienteSupabase.rpc('ocultar_multiplos_equipamentos_seguro', {
                    p_ids: idsSelecionados
                });

                if (error) throw error;

                alert("🗑️ Itens ocultados com sucesso!");
                document.getElementById('input-busca').value = ""; // Limpa a busca
                buscarEquipamentos(); // Recarrega a tela limpa

            } catch (erro) {
                console.error(erro);
                alert("❌ Erro ao ocultar em lote: " + (erro.message || JSON.stringify(erro)));
            }
        });
        <!--/funcao_ocultarMultiplos-->

        async function excluirEquipamento(id) {
            const confirmacao = confirm("Deseja ocultar este equipamento?");
            if (!confirmacao) return; 
            try {
                const { error } = await clienteSupabase.rpc('desativar_equipamento_seguro', { p_id: id });
                if (error) throw error;
                alert("🗑️ Equipamento enviado para a lixeira (Oculto)!");
                buscarEquipamentos(); 
            } catch (erro) {
                alert("❌ Erro ao ocultar: " + (erro.message || JSON.stringify(erro)));
            }
        }

        async function restaurarEquipamento(id) {
            const confirmacao = confirm("Deseja restaurar este equipamento?");
            if (!confirmacao) return; 
            try {
                const { error } = await clienteSupabase.rpc('restaurar_equipamento_seguro', { p_id: id });
                if (error) throw error;
                alert("♻️ Equipamento restaurado com sucesso!");
                buscarLixeira(); 
            } catch (erro) {
                alert("❌ Erro ao restaurar: " + (erro.message || JSON.stringify(erro)));
            }
        }

        // ... (As funções esvaziarLixeira, navegação de botões e onload permanecem iguais ao projeto original)
        async function esvaziarLixeira() {
            const confirmacao = confirm("CUIDADO: Isso vai apagar DEFINITIVAMENTE todos os equipamentos ocultos e deletar as fotos deles do Storage. Deseja continuar?");
            if (!confirmacao) return;

            document.getElementById('lista-equipamentos').textContent = "🧹 Esvaziando lixeira e apagando fotos físicas... Aguarde.";

            try {
                const { data: fotosApagadas, error: erroBanco } = await clienteSupabase.rpc('limpar_lixeira_seguro');
                if (erroBanco) throw erroBanco;

                let totalFotosApagadas = 0;
                if (fotosApagadas && fotosApagadas.length > 0) {
                    for (const item of fotosApagadas) {
                        if (item.url_da_foto) {
                            const nomeLimpo = item.url_da_foto.split('/').pop().split('?')[0];
                            const nomeDoArquivo = decodeURIComponent(nomeLimpo);
                            const { error: erroStorage } = await clienteSupabase.storage
                                .from('equipamentos_fotos')
                                .remove([nomeDoArquivo]);
                            if (!erroStorage) totalFotosApagadas++; 
                        }
                    }
                }

                alert(`✅ Lixeira esvaziada! ${totalFotosApagadas} foto(s) apagadas.`);
                if(exibindoLixeira) buscarLixeira(); else buscarEquipamentos(); 
            } catch (erro) {
                alert("❌ Erro ao limpar a lixeira: " + (erro.message || JSON.stringify(erro)));
                buscarEquipamentos(); 
            }
        }

        document.getElementById('btn-novo').addEventListener('click', () => { window.location.href = 'cadastra.html'; });
        document.getElementById('btn-limpar-lixeira').addEventListener('click', esvaziarLixeira);

        document.getElementById('btn-ver-lixeira').addEventListener('click', () => {
            exibindoLixeira = !exibindoLixeira;
            const btn = document.getElementById('btn-ver-lixeira');
            const titulo = document.getElementById('titulo-painel');
            const btnNovo = document.getElementById('btn-novo');
            document.getElementById('input-busca').value = ""; // Limpa a busca ao trocar de tela

            if(exibindoLixeira) {
                btn.textContent = "💻 Ver Ativos";
                btn.style.backgroundColor = "#007bff";
                btn.style.color = "white";
                titulo.textContent = "Lixeira de Equipamentos 🗑️";
                btnNovo.style.display = "none";
                buscarLixeira();
            } else {
                btn.textContent = "👁️ Ver Lixeira";
                btn.style.backgroundColor = "#6c757d";
                titulo.textContent = "Lista de Equipamentos 💻";
                btnNovo.style.display = "inline-block";
                document.getElementById('btn-limpar-lixeira').style.display = "none";
                buscarEquipamentos();
            }
        });

        document.getElementById('btn-sair').addEventListener('click', async () => {
            if (clienteSupabase) await clienteSupabase.auth.signOut();
            window.location.href = 'login.html';
        });

        window.onload = async () => {
            const statusDiv = document.getElementById('status');
            const appDiv = document.getElementById('app');
            const btnSair = document.getElementById('btn-sair'); 

            try {
                const creds = await recuperarCredenciais();
                if (!creds || !creds.url || !creds.anonKey) {
                    window.location.href = 'login.html';
                    return; 
                }
                
                clienteSupabase = supabase.createClient(creds.url, creds.anonKey);
                const { data: { session } } = await clienteSupabase.auth.getSession();

                if (!session) {
                    alert("Acesso Negado: Você precisa fazer login.");
                    window.location.href = 'login.html';
                    return;
                }

                statusDiv.textContent = "logado como: " + session.user.email;
                statusDiv.style.backgroundColor = "transparent";
                statusDiv.style.color = "#666";
                
                appDiv.style.display = "block";
                btnSair.style.display = "block";
                
                buscarEquipamentos();

            } catch (error) {
                console.error(error);
                statusDiv.textContent = "❌ Erro ao ler credenciais ou sessão.";
                statusDiv.className = "erro";
            }
        };
    </script>
</body>
</html>
```
# cadastrar.html

```
<!DOCTYPE html>
<html lang="pt-BR">
<!--head_config-->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel de Equipamentos - Cadastro</title>
    
    <!--estilos-->
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f9; }
        .info { background-color: #d1ecf1; color: #0c5460; }
        .erro { background-color: #f8d7da; color: #721c24; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin-bottom: 20px;}
        input { width: 100%; padding: 8px; margin: 8px 0 15px 0; box-sizing: border-box; }
        button { padding: 10px 15px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1em; }
        button:hover { background: #0056b3; }
        button:disabled { background: #ccc; cursor: not-allowed; }
        .btn-voltar { background: #6c757d; margin-bottom: 20px; display: inline-block;}
        .btn-voltar:hover { background: #5a6268; }
        .img-preview { max-width: 150px; border-radius: 8px; margin: 10px 0; border: 1px solid #ccc; display: block;}
    </style>
    <!--/estilos-->

    <!--biblioteca_supabase-->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <!--/biblioteca_supabase-->
</head>
<!--/head_config-->

<body>
    
    <!--status_bar-->
    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
        <div id="status" class="info" style="flex-grow: 1; padding: 10px; border-radius: 5px; font-weight: bold; margin-bottom: 0;">Verificando sessão...</div>
    </div>
    <!--/status_bar-->

    <!--botao_voltar-->
    <button class="btn-voltar" onclick="window.location.href='listar.html'">⬅️ Voltar para Lista</button>
    <!--/botao_voltar-->

    <!--area_formulario-->
    <div id="app" class="card" style="display: none;">
        <h2 id="titulo-pagina">➕ Novo Equipamento</h2>
        
        <!--formulario_dinamico-->
        <form id="form-equipamento">
            <input type="hidden" id="input-id">
            
            <label for="input-nome">Nome do Equipamento:</label>
            <input type="text" id="input-nome" placeholder="Ex: Meta Quest 3S" required>

            <label for="input-preco">Preço (R$):</label>
            <input type="number" id="input-preco" step="0.01" placeholder="Ex: 2500.50" required>

            <div id="area-foto-atual" style="display: none; padding: 10px; background: #f8f9fa; border-radius: 5px; margin-bottom: 10px;">
                <label>Foto Atual (Salva no Banco):</label>
                <img id="img-atual" class="img-preview" src="" alt="Sem foto">
            </div>

            <label for="input-foto">Foto do Equipamento (Máx 2MB):</label>
            <input type="file" id="input-foto" accept="image/png, image/jpeg, image/webp">
            <small style="display: block; color: #666; margin-top: -10px; margin-bottom: 15px;" id="dica-foto">
                Para Cadastro: Escolha uma foto. Para Edição: Envie nova foto para substituir ou deixe em branco para manter a atual.
            </small>

            <button type="submit" id="btn-enviar-dados">💾 Salvar Equipamento</button>
        </form>
        <!--/formulario_dinamico-->
    </div> 
    <!--/area_formulario-->

    <!--logica_principal_js-->
    <script>
        /* ================= SEGURANÇA E VARIÁVEIS GLOBAIS ================= */
        const NOME_BANCO = 'SegurancaAppDB';
        const NOME_TABELA = 'chaves_supabase';
        let clienteSupabase = null;
        
        let modoEdicao = false; 
        let urlFotoAntiga = null;

        <!--funcao_recuperarCredenciais-->
        function iniciarBancoDeDados() {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(NOME_BANCO, 1);
                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains(NOME_TABELA)) {
                        db.createObjectStore(NOME_TABELA, { keyPath: 'id' });
                    }
                };
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        }

        async function recuperarCredenciais() {
            const db = await iniciarBancoDeDados();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([NOME_TABELA], 'readonly');
                const store = transaction.objectStore(NOME_TABELA);
                const request = store.get('supabase_creds');
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        }
        <!--/funcao_recuperarCredenciais-->

        <!--funcao_gerarNomeSeguroArquivo-->
        function gerarNomeSeguroArquivo(nomeProduto, arquivoOriginal) {
            let nomeLimpo = nomeProduto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
            nomeLimpo = nomeLimpo.replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
            const extensao = arquivoOriginal.name.split('.').pop();
            const timestamp = Date.now();
            return `${nomeLimpo}-${timestamp}.${extensao}`;
        }
        <!--/funcao_gerarNomeSeguroArquivo-->

        <!--funcao_apagarFotoNoStorage-->
        async function apagarFotoNoStorage(urlDaFoto) {
            try {
                const nomeLimpo = urlDaFoto.split('/').pop().split('?')[0];
                const nomeDoArquivo = decodeURIComponent(nomeLimpo);
                await clienteSupabase.storage.from('equipamentos_fotos').remove([nomeDoArquivo]);
            } catch (err) {
                console.error("Erro interno ao tentar apagar foto:", err);
            }
        }
        <!--/funcao_apagarFotoNoStorage-->

        /* ================= INICIALIZAÇÃO DA PÁGINA COM CHECAGEM DE SESSÃO ================= */

        <!--evento_onload_janela-->
        window.onload = async () => {
            const statusDiv = document.getElementById('status');
            const appDiv = document.getElementById('app');

            try {
                const creds = await recuperarCredenciais();
                if (!creds || !creds.url || !creds.anonKey) {
                    window.location.href = 'Login.html';
                    return; 
                }

                clienteSupabase = supabase.createClient(creds.url, creds.anonKey);
                
                // NOVA SEGURANÇA: Verifica se o usuário está logado antes de abrir o cadastro
                const { data: { session } } = await clienteSupabase.auth.getSession();
                if (!session) {
                    alert("Acesso Negado: Faça login para continuar.");
                    window.location.href = 'Login.html';
                    return;
                }

                const parametrosUrl = new URLSearchParams(window.location.search);
                const idEquipamento = parametrosUrl.get('id');

                if (idEquipamento) {
                    modoEdicao = true;
                    document.getElementById('titulo-pagina').textContent = "✏️ Editar Equipamento";
                    statusDiv.textContent = "Buscando dados do equipamento...";
                    
                    const { data, error } = await clienteSupabase
                        .from('equipamentos_ti')
                        .select('*')
                        .eq('id', idEquipamento)
                        .single();

                    if (error) throw error;

                    document.getElementById('input-id').value = data.id;
                    document.getElementById('input-nome').value = data.nome;
                    document.getElementById('input-preco').value = data.preco;
                    urlFotoAntiga = data.foto_url; 

                    if (data.foto_url) {
                        document.getElementById('area-foto-atual').style.display = 'block';
                        document.getElementById('img-atual').src = data.foto_url;
                    }
                }

                statusDiv.textContent = "Logado como: " + session.user.email;
                statusDiv.style.backgroundColor = "transparent";
                statusDiv.style.color = "#666";
                appDiv.style.display = "block";

            } catch (error) {
                console.error("Erro Crítico:", error);
                statusDiv.textContent = "❌ Erro de autenticação.";
                statusDiv.className = "erro";
            }
        };
        <!--/evento_onload_janela-->


        /* ================= SUBMISSÃO DO FORMULÁRIO (CREATE / UPDATE) ================= */

        <!--evento_submit_formulario-->
        document.getElementById('form-equipamento').addEventListener('submit', async (evento) => {
            evento.preventDefault(); 
            
            const btnSubmit = document.getElementById('btn-enviar-dados');
            btnSubmit.textContent = "⏳ Processando Dados e Imagens...";
            btnSubmit.disabled = true;

            const idDigitado = document.getElementById('input-id').value;
            const nomeDigitado = document.getElementById('input-nome').value;
            const precoDigitado = parseFloat(document.getElementById('input-preco').value);
            const arquivoFoto = document.getElementById('input-foto').files[0]; 

            try {
                let urlFinalDaFoto = urlFotoAntiga; 

                if (arquivoFoto) {
                    if (arquivoFoto.size > 2 * 1024 * 1024) {
                        throw new Error("A imagem é muito grande. O limite é 2MB.");
                    }

                    if (modoEdicao && urlFotoAntiga != null) {
                        await apagarFotoNoStorage(urlFotoAntiga);
                    }

                    const nomeUnicoSeguro = gerarNomeSeguroArquivo(nomeDigitado, arquivoFoto);

                    const { error: uploadError } = await clienteSupabase.storage
                        .from('equipamentos_fotos')
                        .upload(nomeUnicoSeguro, arquivoFoto);

                    if (uploadError) throw uploadError;

                    const { data: urlData } = clienteSupabase.storage
                        .from('equipamentos_fotos')
                        .getPublicUrl(nomeUnicoSeguro);
                    
                    urlFinalDaFoto = urlData.publicUrl; 
                }

                if (modoEdicao) {
                    const { error } = await clienteSupabase.rpc('atualizar_equipamento_seguro', {
                        p_id: idDigitado,
                        p_novo_nome: nomeDigitado,
                        p_novo_preco: precoDigitado,
                        p_foto_url: urlFinalDaFoto
                    });
                    if (error) throw error;
                    alert("✅ Equipamento atualizado com sucesso!");
                } else {
                    const { error } = await clienteSupabase.rpc('adicionar_equipamento_seguro', {
                        p_nome: nomeDigitado,
                        p_preco: precoDigitado,
                        p_especificacoes: {},
                        p_foto_url: urlFinalDaFoto
                    });
                    if (error) throw error;
                    alert("✅ Equipamento cadastrado com sucesso!");
                }

                evento.target.reset(); 
                window.location.href = 'listar.html';

            } catch (erro) {
                console.error(erro);
                alert("❌ Erro na operação: " + (erro.message || JSON.stringify(erro)));
            } finally {
                btnSubmit.textContent = "💾 Salvar Equipamento";
                btnSubmit.disabled = false;
            }
        });
        <!--/evento_submit_formulario-->
    </script>
    <!--/logica_principal_js-->
</body>
</html>

```









