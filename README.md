
#### Artigo escrito por Aristides Barbosa Pontes. 09/10/2025
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# "Da falta de emprego à criação de oportunidades: o poder de empreender online"
## Uma proposta acessível para geração de renda e inclusão digital através de sites gratuitos e ferramentas open-source.

---
# 📘 ÍNDICE
1. [RESUMO](#resumo)
2. [INTRODUÇÃO](#introdução)
3. [COMO ORGANIZAR REPOSITÓRIO PELO CELULAR](#como-organizar-repositório-pelo-celular)
4. [INSTALAÇÃO E CONFIGURAÇÃO DO TERMUX](#instalação-e-configuração-do-termux)
5. [COMANDOS BÁSICOS DO TERMUX](#comandos-basicos-do-termux)
6. [Git-GitHub](#git-github)
7. [CLONANDO UM REPOSITÓRIO DO GITHUB](#clonando-um-repositório-do-github)
8. [BRANCHES AS RAMIFICAÇÕES](#branches-as-ramificações)
9. [TRABALHANDO COM COMMIT](#trabalhando-com-commit)
10. [CRIANDO UM SERVIDOR COM PYTHON](#criando-um-servidor-com-python)
11. [LOCALSTORAGE VS IDENXEDDB](#localstorage-vs-indexeddb)
13. 


---
# RESUMO
Este artigo apresenta estratégias práticas para criar e gerir um negócio digital utilizando apenas um celular, sem investimento inicial. O objetivo é fornecer orientações a indivíduos que desejam empreender de forma autônoma, especialmente mães e pais que necessitam conciliar trabalho e cuidados domésticos. São discutidos métodos para montar lojas virtuais, vender produtos ou serviços e aplicar técnicas de marketing digital de baixo custo.

Palavras-chave: empreendedorismo digital, e-commerce, celular, renda extra, autônomo.


---
# INTRODUÇÃO 
  A falta de empregos formais e a desigualdade de oportunidades têm sido problemas persistentes no mundo contemporâneo. Em meio a esse cenário, milhões de pessoas — especialmente mães de família, jovens e trabalhadores informais — buscam alternativas para gerar renda sem depender de grandes investimentos ou estrutura profissional.

Este artigo apresenta uma proposta prática e inclusiva: ensinar qualquer pessoa, utilizando apenas um celular e ferramentas gratuitas, a criar e hospedar um site de vendas. O objetivo é mostrar que é possível iniciar um negócio digital sem custo inicial, vendendo produtos próprios ou de terceiros, e transformar a tecnologia em uma aliada na luta contra o desemprego e a desigualdade.

A iniciativa parte do princípio de que o conhecimento digital acessível é uma das chaves para a autonomia financeira e o empoderamento social, contribuindo para uma sociedade mais justa e independente

O avanço da tecnologia e o acesso crescente à internet possibilitam que qualquer pessoa inicie um negócio online com recursos limitados. Este artigo busca demonstrar como é possível criar uma loja virtual profissional e vender produtos ou serviços de forma estratégica apenas com um celular.

O foco é ajudar pessoas sem capital inicial e que precisam gerar renda sem sair de casa, promovendo autonomia financeira e inclusão digital.


---
# Resultados Esperados

Ao seguir as orientações propostas, indivíduos poderão:
Iniciar vendas online sem capital inicial.
Alcançar autonomia financeira e flexibilidade de horário.
Desenvolver habilidades em marketing digital, gestão de clientes e negociação.


---
# Conclusão

A utilização de dispositivos móveis e ferramentas digitais acessíveis democratiza o empreendedorismo, permitindo que qualquer pessoa, independentemente de recursos financeiros, crie um negócio online. Este artigo contribui para a inclusão digital e para o desenvolvimento de renda extra de forma prática e profissional, especialmente para mães e pais que buscam conciliar trabalho e responsabilidades familiares.



---
# Como vender na internet usando GitHub

Você pode vender produtos ou serviços diretamente na internet usando GitHub Pages, uma ferramenta gratuita para hospedar sites estáticos. Com os códigos que você tem, é possível criar landing pages profissionais para cada tipo de negócio: vendas de produtos (como no exemplo do delivery) ou serviços.

### Passos básicos:

1. Crie um repositório no GitHub.
2. Suba todos os arquivos do site (HTML, CSS, JS, imagens).
3. Ative o GitHub Pages nas configurações do repositório.
4. O site será publicado em https://seuusuario.github.io/nome-do-repositorio/.
5. Configure formulários ou links de WhatsApp/checkout para receber pedidos.

### Vantagens de usar GitHub Pages:

Gratuito e confiável utilzado por grandes empresas e programadores.

Sistema de versionamento para backup.

Ideal para sites estáticos leves.

Integração com HTTPS nativa.

Configura domínio próprio via DNS passndo mais credibilidade, melhora SEO, URL mais curta e memorável.

Adiciona Tags de conversão e rastreamento (Google Analytics, Google Ads, Facebook Pixel) para medir vendas e cliques.
Permite otimizar campanhas e aumentar conversão.


### Desvantagens:

Não suporta backend dinâmico nativo (necessário usar APIs externas, neste artigo utilizaremos WhatsApp).

Não tem suporte a bancos de dados internos. (vamos utilizar localstorage, indexeddb, arquivo jsom para contornar essa tarefa ).

Recursos de e-commerce completos exigem integração externa.


### Resumo:
GitHub Pages é ótimo para começar a vender online sem custo, mas para negócios maiores, é recomendável usar domínio





🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥


  
# BUSCANDO UM NICHO E ELABORANDO UM NEGÓCIO COM IA
Neste  artigo, vamos atacar um nicho de criação de sites e gestão de tráfego pago, utilizaremos o chat GPT com os seguintes prompts abaixo:



## PASSO 1 [APRESENTAÇÃO DA LOJA/SERVIÇÕS]:
```
[Sou AristidesBP], [Moro em Belém do Pará , Brasil] vou vender na internete [o serviço de criação de sites e gestor de trafego pago] para um público
super exigente. Será uma campanha no Google Ads, logo eu preciso saber as informações 
que vou te passar abaixo.
```
## PASSO 2 [PESQUISAR PUBLICO ALVO (PERSONA)]:
```
Quero saber as  Dores, Desejos, as principais Objeções e as principais Motivações para Compra. 
Traga isso listado por topico de cada pergunta.
```
## PASSO 3 [PALAVRAS CHAVES]:
```
Agora quero criar uma campahna no google ADS paera vender este serviço. Me ajude trazendo as 10 palavras chaves mais usadas para pesquisa no
google, de quem deseja comprar este servoço.
```
## PASSO 4 [PALAVRAS CHAVES]:
```
Agora quero criar uma campahna no google ADS paera vender este serviço. Me ajude trazendo as 10 palavras chaves mais usadas para pesquisa no
google, de quem deseja comprar este servoço.
```
## VALIDAR AS PALAVRAS CHAVES:
#### ACESSAR A CONTA DO GOOGLE ADS:
https://ads.google.com
#### PESQUISAR POR : 
```
Planejador de palavra-chave
```
#### EM [DESCOBRIR NOVAS PALAVRAS CHAVES], COLE OS RESULTADOS DA IA, UMA POR VEZ!
#### APERTE EM BUSCAR E SELECIONE A REGIÃO.

## PASSO 5 [FAZER UMA PLANILHA PARA ANALIZAR AS PALAVRAS CHAVES]:
```
Quero construir uma tabela em um arquivo .md para verificar cada uma das palavras chaves.
1- Faça uma planilha ou Tabela com as seguintes colunas:
palavra-chave, busca por mês, CPC medio ,Custo do Tráfego, Concorrência, Relação com a solução(intenção de compra,maioria quer comprar,buscando solução,pesquisando o problema),Relação de Intencionalidade (Exclusiva,70%,50%,baixa intencionalidade),Relação site/ palavra chaves.
```

### EXEMPLO:
| Palavra-chave                              | Busca/mês (est.) | CPC médio (R$) | Custo do Tráfego* | Concorrência* | Relação com a solução         | Intencionalidade     | Relação site/palavra |
|--------------------------------------------|------------------|----------------|-------------------|----------------|-------------------------------|-----------------------|-----------------------|
| gestor de tráfego pago                     | 1,000–2,000      | 4,00–6,00      | Alta              | Alta           | Quer contratar                | Exclusiva (80–100%)   | Forte                |
| especialista em tráfego pago               | 800–1,500        | 5,00–7,00      | Alta              | Alta           | Busca solução profissional    | Exclusiva (80–100%)   | Forte                |
| gestor de tráfego para empresas            | 500–1,000        | 5,00–7,50      | Alta              | Média–alta     | Busca serviço B2B             | 70–80%               | Forte                |
| tráfego pago para vendas online            | 600–1,200        | 4,50–6,00      | Média–alta        | Média          | Quer aumentar vendas         | 70–80%               | Forte                |
| consultoria de tráfego pago                | 400–900          | 5,00–8,00      | Alta              | Média–alta     | Quer orientação especializada | Exclusiva (80–100%)   | Forte                |
| gerenciamento de anúncios Google Ads       | 700–1,300        | 4,00–6,50      | Média             | Alta           | Procuram gestão especializada| 50–70%               | Moderada             |
| profissional de tráfego pago               | 300–700          | 4,50–7,00      | Média–alta        | Média          | Quer contratar indivíduo     | 50–70%               | Moderada             |
| tráfego pago para e-commerce              | 500–1,000        | 4,00–6,00      | Média–alta        | Média          | Escalagem vendas online      | 70–80%               | Forte                |
| agência de tráfego pago                    | 600–1,100        | 4,50–7,50      | Alta              | Alta           | Busca empresa especializada  | Exclusiva (80–100%)   | Forte                |
| otimização de campanhas Google Ads         | 400–800          | 3,50–5,50      | Média             | Média          | Busca melhorar campanhas     | 50–70%               | Moderada             |

## "PARA CADA PRODUTO UMA CAMPANHA E UMA PAGINA, NÃO FAÇA CAMPANHAS PARA SITE INSTITUCIONAL!"
## "NO CONJUNTO DAS PALAVRAS NO MINIMO 10K DE BUSCA MES!"


# PASSO 6 : PALAVRAS NEGATIVAS
```
Quero construir uma tabela em um arquivo .md para verificar cada uma das palavras negativas.
1- Faça uma planilha ou Tabela com as seguintes colunas:
palavra-negativas, motivo.
```
## EXEMPLO:
| Palavra-negativa    | Motivo                                                         |
|---------------------|----------------------------------------------------------------|
| grátis              | Usuários buscando soluções sem pagar, sem intenção de compra   |
| tutorial            | Pessoas querendo aprender, não contratar                       |
| curso               | Interesse em aprender tráfego pago, não em contratar gestor    |
| pdf                 | Busca por material gratuito ou informativo                     |
| exemplo             | Usuários querendo modelos ou ideias, não serviços              |
| amostra             | Busca por algo sem custo ou demonstração gratuita               |
| como fazer          | Interesse em executar por conta própria                        |
| ferramenta gratuita | Procurando ferramentas e não serviços profissionais            |
| sem custo           | Busca por alternativas gratuitas                               |
| dicas               | Usuários querendo informações e não serviço pago               |



# "GOOGLE ADS É DIFERENTE DO META ADS, ELE TEM UMA HIERARQUIA NA ESTRUTURA DE CAMPANHAS QUE DEVE SER RESPEITADA!"
## PARA CADA SOLUÇÃO UMA CAMPANHA.
## PARA CADA INTERESSE , DA MESMA SOLUÇÃO UM GRUPO DE ANUNCIOS.
# PASSO 4 [FAZER UMA PLANILHA PARA SERAPARA AS PALAVRAS-CHAVES POR TIPO DE SOLUÇÃO E INTERESSE]:
```
Quero construir uma tabela em um arquivo .md para verificar cada uma das palavras-chaves.
1- Faça uma planilha ou Tabela com as seguintes colunas:
palavra-chaves, tipo de solução, interesse.
```
## EXEMPLO:
| Palavra-chave                        | Tipo de Solução                     | Interesse                              |
|--------------------------------------|--------------------------------------|----------------------------------------|
| gestor de tráfego pago               | Serviço profissional                 | Alta intenção de contratação          |
| especialista em tráfego pago         | Serviço profissional                 | Alta intenção de contratação          |
| consultoria de tráfego pago          | Consultoria e estratégia             | Média-alta intenção                    |
| tráfego pago para e-commerce         | Solução para e-commerce              | Média intenção                         |
| gerenciamento de anúncios Google Ads| Gestão de campanhas Google Ads       | Alta intenção de contratação          |
| agência de tráfego pago              | Agência especializada                | Alta intenção de contratação          |
| profissional de tráfego pago         | Serviço individual                   | Média intenção                         |
| tráfego pago para vendas online      | Solução para aumento de vendas       | Média intenção                         |
| otimização de campanhas Google Ads   | Serviço de otimização                | Média intenção                         |
| tráfego pago para empresas           | Solução B2B                          | Média-alta intenção                    |

# UM ANUNCIO BEM FEITO E QUASE GRARANTIA DE VENDAS!!
```
  Com base nas pesquisas realizadas , faça um anuncio com 4 tituloas (no maximo 30 caracteres cada um) e 2 descrições (com no maximo 90 caracteres cada uma).

## PARA CADA SOLUÇÃO UMA CAMPANHA.
## PARA CADA INTERESSE , DA MESMA SOLUÇÃO UM GRUPO DE ANUNCIOS.
## "NO CONJUNTO DAS PALAVRAS-CHAVES NO MINIMO 10K DE BUSCA MES!"

```
# MANUS [https://manus.im/app]
```
Eu quero criar um anúncio no Google para o meu serviço de [Trafego pago].Eu quero que voçe faça essa busca no Google, algumas vezes, e anlize todos os anuncios que vão aparecer.

A partir disso quero que voçe crie 5 ideias de anuncio, no mesmo formato que vai encontrar.Traga ideias de acordo com os prinscipais gatilhos que voçe encontrar.

E, além disso, crie um site navegavel com todos os insights do que vc encontrar nessa pesquisa.
```

# ESCOLHENDO 10 INFORMAÇÕES:
```
Quais são as 10 principais informações, dentro do que você pesquisou sobre esta persona, que se esta persona souber ela compra de mim?
Liste as 10 da mais importante para a menus importante.

```
# CRIANDO UMA COPY:
```
Agora eu quero que você tranforme esses em uma copy para um site, onde deve ter a primeira com uma oferta em  headline mais uma subheadline e um cta, e os demais blocos abaixo.

Depois da copy feita, crie este site para mim, use cores frias proficionais
```
# CRIANDO UMA TEG DE CONVERÇÃO:
## Crie uma pagina de obrigado pela compra para colocar a teg, e salve a url.
## 





# COMO CRIAR TEG DE CONVERÇÃO:
## PASSO 1: URL DA PAGINA DE OBRIGADO

Crie uma pagina agradecendo a compra, ela sera responsavel por armazenar a teg de conveção que por sua vez ira informar ao google que pode cobrar o trafego.








🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
---
#   COMO ORGANIZAR REPOSITÓRIO PELO CELULAR
---

  É possível programar pelo site do Github, mas 
caso você queira trabalhar diretamente pelo celular
de forma local aconselho você usar o TERMUX 
juntamente com o gerenciador de arquivos que 
permita edição, recomendo o F AQUIVOS. 
(OBS: VOU DEIXAR AMBOS NA PASTA DE APLICATIVOS)
  

---
# INSTALAÇÃO E CONFIGURAÇÃO DO TERMUX
---
Acesse o link oficial (não use da Play Store):
faça o download do aplicativo direto no github
https://github.com/termux/termux-app/releases

```
pkg update && pkg upgrade -y 
# comando utilizado para atualizar o Termux
```
```
termux-setup-storage
# comando usado para permitir acesso às pastas internas do Android
```
```
pkg install git -y
pkg install nano -y
pkg install openssh -y
pkg install curl -y
pkg install tree -y
# instala ferramentas básicas para programar e conectar ao GitHub
```


---
# COMANDOS BASICOS DO TERMUX 
---

```
# isto é um comentário utilizado para explicações
```
```
ls 
# O comando acima, mostrar conteudo da pasta
```
``` 
ls -a
# para mostrar conteudo o culto da pasta
```
```  
mkdir repositorios_git 
# para criar pasta com o nome repositorios_git
```
``` 
nano teste.txt 
# abre o arquivo teste.txt 
# obs: ele cria caso não exista
# Ctrl+S  para salvar
# Crtl+X  para sair
```
```
mv teste.txt ./repositorios_git 
# mover pasta ou arquivo (./pasta_destino)
```
``` 
cd repositorios_git 
# vai para dentro da pasta repositorios_git
```
``` 
cd .. 
# volta para pasta anterior
```
``` 
rm -rf teste.txt 
# apagar pasta/arquivo
```
``` 
clear 
# usado para limpar a tela
```






🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

---
# GIT-GITHUB 
---
  
```
git --help
# usado para procurar comandos git
```
```
git <comando> --help
# pesquise por comando especifico :
```             
```git init
# Inicializa o repositório Git local (caso não tenha vindo com o clone)
```
```
git config --global --add safe.directory "$(pwd)"
# Configurar a pasta como segura (evita erros de segurança)                               
```
```git config --list
# Lista todas as configurações ativas 
```
```
git config --global user.name "Seu Nome"
# Configurar nome de usuário
```
```
git config --global user.email "seu@email.com"
# Configurar email do GitHub
```
```
eval "$(ssh-agent -s)" ssh-add ~/.ssh/id_ed25519
# Iniciar o agente ssh
```
```
ssh-keygen -t ed25519 -C "seu@email.com"
#Gerar nova chave SSH (caso ainda não tenha)
```
```
cat ~/.ssh/id_ed25519.pub
# Mostrar a chave pública para adicionar no GitHub
```
```
git remote set-url origin git@github.com:usuario/repositorio.git
# Troque a URL remota para usar SSH
```
```
ssh -T git@github.com
## 🧪 Teste de conexão com GitHub via SSH 
### Se tudo estiver certo, você verá:
### Hi SEU_USUARIO! You've successfully authenticated..
```


## ⚠️ OBS: VERIFIQUE CONFIG GITHUB CASO NÃO FUNCIONE!
----------------------------------------------------
1. Acesse: https://github.com](https://github.com
2. Faça login na sua conta
3. No canto superior direito, clique na sua foto de perfil → **Settings**
4. Vá até **SSH and GPG keys** (ou "Chaves SSH e GPG")
5. Clique em **New SSH key**
6. Em **Title**, coloque um nome (ex: “Meu notebook”)
7. Em **Key**, cole a chave pública copiada (noterminal digite)
----------------------------------------------------



---
# Clonando um repositório do GitHub
---
 
```
git clone git@github.com:usuario/repositorio.git
## Clona o repositório com chave SSH
```
```
cd nome_do_reposito_clonado
## entra na pasta do repositório 
```
```
git config --global --add safe.directory "$(pwd)"```
## Configurar a pasta como segura (evita erros de segurança)   
```
```
git remote -v
## Mostra os repositórios remotos configurados
## git@github.com:usuario/repositorio.git (fetch).Mostra a URL SSH usada para buscar (fetch) atualizações do repositório remoto. Ou seja, de onde você pode baixar mudanças do GitHub para o seu computador.
## git@github.com:usuario/repositorio.git (push).Mostra a URL SSH usada para enviar (push) suas mudanças locais para o repositório no GitHub.
```
```
git fetch
## Busca atualizações sem aplicar
```
```
git pull origin main
## Sincroniza com o repositório remoto (branch main)
``` 



---
# BRANCHES AS RAMIFICAÇÕES
---

```
git branch
# Lista todas as branches (ramificações) existentes no repositório
```
```
git log
# Exibe histórico de commits com hash, autor e data (PARA SAIR DIGITE: q)
```
``` 
git checkout -b novaBranch numero-do-commit
# Cria uma nova branch a partir de um commit específico e já muda para ela
# Exemplo: git checkout -b novaBranch 2ad9347bba64542687c6
```
```
git branch nome-da-branch
# Cria uma nova branch com o nome informado (sem trocar para ela)
```
```
git checkout -b nova-branch
# Cria uma nova branch e já muda para ela
```
```
git stash
# Salva temporariamente alterações não commitadas (útil antes de trocar de branch)
```
```
git checkout main
# Troca para a branch principal (main)
```
```
git checkout nome-da-branch
# Troca para a branch especificada
```
```
git stash apply
# Recupera alterações salvas com `git stash`
``` 
```
git merge especificar-nome-da-branch
# Une a branch especificada com a branch atual
```
```
git branch -d nome-da-branch
# Deleta a branch local (apenas se já foi mesclada)
```
```
git merge nova-branch
# Junta as alterações da branch "nova-branch" com a atual (ex: main)
```
```
git pull origin main
# Atualiza a branch atual com as últimas alterações do repositório remoto (main)
```


---
# TRABALHANDO COM COMMIT 
---
```
git status
# Mostra o status atual dos arquivos (modificados, novos, deletados)
# digite Q para sair
```
```
git add nome-do-arquivo.ext
# Adiciona um arquivo específico para a área de staging
# OBS: CASO VOCÊ JÁ TENHA CRIADO OU ALTERADO ALGUM ATIVO
```
```
git add .
# Adiciona TODOS os arquivos modificados para o commit
```
```
git commit -m "Mensagem clara e objetiva"
# Cria um commit com a mensagem entre aspas
```
```
git commit -am "Mensagem"
# Adiciona e comita arquivos rastreados (não funciona com novos arquivos)
```
```
git diff
# Mostra as diferenças entre o código atual e o último commit
```
```
git show
# Mostra detalhes do último commit
```
```
git blame nome-do-arquivo
# Mostra linha por linha quem modificou o quê (ótimo para rastrear bugs)
```
```
git tag -a v1.0 -m "Versão 1.0"
# Cria uma tag de versão
```
```
git log --oneline
# Mostra o histórico de forma resumida (1 linha por commit)
```
```
git log
# Exibe histórico de todos os commits com hash, autor e data (PARA SAIR DIGITE: q) 
```
---
# 🧹 CORREÇÕES E AJUSTES 
---
```
git reset nome-do-arquivo
# Remove o arquivo da área de staging (antes do commit)
```
```
git reset --hard HEAD
# Remove todas as alterações e volta ao último commit
```
```
git clean -f
# Remove arquivos não rastreados (novos arquivos que não foram adicionados)
```
```
git revert <id-do-commit>
# Reverte um commit específico sem apagar o histórico
```

---
## 📤   RECEBENDO E ENVIANDO PARA O GITHUB 
---
```
git remote add origin git@github.com:usuario/repositorio.git
# Conecta seu repositório local ao repositório remoto via SSH
```
```
git fetch
# Busca atualizações do repositório remoto (mas não aplica)
```
```
git merge
# Aplica as atualizações buscadas com `git fetch`
```
```
git pull
# Baixa alterações do GitHub para seu projeto local
```
```
git pull origin main --rebase
##  Atualizar seu repositório local com o que está no GitHub:
```
```
git push -u origin main
# Envia o repositório local para o GitHub (main = branch principal)
```
---
# TUTORIAL: COMO RECUPERAR ARQUIVOS EXCLUÍDOS NO GIT:
### OBS: Este tutorial assume que você está dentro do repositório local.
---
```
git log --diff-filter=D --summary
# ETAPA 1 — LOCALIZAR ARQUIVOS DELETADOS
# Exibe o histórico de commits com resumo das alterações,e filtra SOMENTE commits que deletaram arquivos.
# DICA: Use a tecla Q para sair da visualização do log quando quiser.
```
```
git log --summary --name-status | grep -B 10 "editor-de-txt.html
# para buscar especificamente um arquivo que você quer recuperar:
# Neste exemplo, buscamos o arquivo "editor-de-txt.html"
# O parâmetro -B 10 mostra as 10 linhas antes da ocorrência,
# para encontrar o commit completo que removeu o arquivo.
# A saída  mostra algo assim:
# commit 7477572b4f232ee774236f1b58f510d57d0f7de9
# Author: aristidesbp <aristidesbp@gmail.com>
# Date:   Thu May 22 10:01:41 2025 -0300
# Mensagem: atualizarS
# D	editor-de-txt.html
# OBS: Anote o HASH DO COMMIT (exemplo acima: 7477572b4f232ee774236f1b58f510d57d0f7de9)
```
```
git show --name-status --diff-filter=D 7477572b4f232ee774236f1b58f510d57d0f7de9
# Agora você pode usar o comando abaixo para ver todos os arquivos DELETADOS no mesmo commit:
# Exemplo de saída esperada:
# D	editor-de-txt.html
# D	script-antigo.js
# D	css/velho-style.css
```
```
git checkout <HASH_DO_COMMIT>^ -- caminho/do/arquivo
# Para restaurar um arquivo deletado, use o comando:
# O ^ (circunflexo) indica que queremos o arquivo da versão ANTERIOR ao commit que deletou.
# Exemplo real:
# git checkout 7477572b4f232ee774236f1b58f510d57d0f7de9^ -- editor-de-txt.html
# Esse comando recupera o arquivo "editor-de-txt.html" e o adiciona de volta ao diretório atual.
```
```
git add editor-de-txt.html
# Após restaurar o arquivo, você deve adicioná-lo novamente ao controle de versão:
```
```
git commit -m "Recuperar arquivo editor-de-txt.html que havia sido deletado"
# Agora salve com um novo commit:
```
### PRONTO! O arquivo está de volta no seu projeto.
### CONCLUSÃO:
Usando Git, você pode recuperar QUALQUER arquivo que foi deletado
. Em qualquer ponto do histórico, mesmo que não saiba o commit exato.
. Sempre use git log e git show para investigar o histórico.
. Lembre-se: o Git guarda tudo. 😉

---
# ✅ 1. Voltar temporariamente a um commit (modo detached HEAD) Pressione q para sair da visualização.
---
```
git log
# Use o comando abaixo para listar o histórico de commits no (pc): assim você encontra o ID
```
```
git checkout <id_do_commit>
# Esse modo é útil apenas para explorar um commit antigo sem alterar o histórico da branch atual.
# Exemplo: git checkout a1b2c3d ⚠️ Neste modo, você não está em nenhuma branch. Se fizer alterações aqui, precisará criar uma nova branch para não perder seu trabalho.
```

---
# ✅ 2. Voltar permanentemente a um commit (desfazendo commits posteriores)
---
```
git reset --soft <id_do_commit>
# Opção A: Reset "soft" – mantém as alterações no stage
```
```
git reset <id_do_commit>
# Opção B: Reset "mixed" (padrão) – mantém alterações nos arquivos, mas remove do stage
```
```
git reset --hard <id_do_commit>
# Opção C: Reset "hard" – apaga tudo (perigoso!)
#⚠️ Atenção: Se você fizer --hard, todo o trabalho feito depois do commit escolhido será perdido, a menos que esteja salvo em algum lugar (como no GitHub ou em um branch separado).
#💡 Dica de segurança: Antes de usar reset --hard, é recomendado criar uma branch backup:(git branch backup-antes-do-reset) Assim, você pode recuperar os commits caso precise
```

---
# ✅ 3. Criar uma nova branch a partir de um commit antigo
---
```
git checkout -b nova-branch <id_do_commit>
# Se quiser preservar o histórico e começar uma nova linha de desenvolvimento a partir de um commit antigo:
# Exemplo: git checkout -b teste-antigo a1b2c3d
```

---
# CRIANDO UM SERVIDOR COM PYTHON 
---


# Passo 1: Instalar o Python

Se você já instalou o Termux  (CONFIGUROU E ATUALIZOU)
```
cd pasta_do_arquivo
# Navegue até a pasta onde seus arquivos estão 
```
```
python -m http.server 8080
# Ele inicia um servidor web simples na porta 8080:
# O Termux agora mostrará a mensagem: Serving HTTP on 0.0.0.0 port 8080 (http://0.0.0.0:8080/) ...
```
# Como Acessar o Site no Navegador
Abra o navegador do seu celular (Chrome, Firefox, etc.).
Digite o seguinte endereço na barra de URL:

```
http://localhost:8080/admin.html
```

O Painel Administrativo agora deve carregar, e o JavaScript (Bloco 6) deve funcionar, permitindo que você clique no botão para adicionar campos e que o localStorage funcione corretamente.

Para parar o servidor, volte para o Termux e pressione 
#### Ctrl + C.




🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# LOCALSTORAGE VS IDENXEDDB


---

🧱 localStorage

Armazena textos simples (strings).

Ideal para dados pequenos (configurações, preferências, listas curtas).

Limite médio: 5 MB por domínio.

É síncrono → pode travar a página se gravar muito.

Usa localStorage.setItem() e getItem().

Exemplo:

localStorage.setItem("nome", "Usuário");
console.log(localStorage.getItem("nome"));



---

🗄️ IndexedDB

Armazena grandes volumes de dados (até centenas de MB).

Aceita objetos complexos, imagens, arrays etc.

É assíncrono → não trava a página.

Funciona como um banco de dados real, com tabelas (“object stores”), índices e transações.

Ideal para aplicativos offline e sistemas grandes.

Exemplo básico:

const request = indexedDB.open("meuBanco", 1);
request.onsuccess = () => console.log("Banco aberto!");



---

📊 Resumo rápido:

Recurso	localStorage	IndexedDB

Tipo	Texto simples	Estrutura de banco de dados
Tamanho	~5 MB	Muito maior (depende do navegador)
Velocidade	Simples, mas pode travar	Rápido e assíncrono
Complexidade	Muito fácil	Mais complexo
Ideal para	Configurações, cache leve	Apps offline, dados grandes





---

✅ 1. Por que o botão não funcionou no celular

No Android, o Google Chrome Mobile não permite que o comando
indexedDB.databases() funcione — ele é bloqueado por segurança.
Por isso a página não mostra nada.
Mas o localStorage continua funcionando normalmente, só não dá para listar via script.


---

✅ 2. Como ver e apagar o armazenamento direto pelo Chrome (sem PC)

🔹 Passo a passo:

1. Abra o Chrome no seu celular.


2. Toque nos três pontinhos (⋮) no canto superior direito.


3. Vá em Configurações → Privacidade e segurança → Limpar dados de navegação.


4. Marque "Cookies e dados do site" e "Imagens e arquivos armazenados em cache".
→ Isso apaga tudo (inclusive localStorage e IndexedDB).


5. Toque em “Limpar dados”.



⚠️ Dica:
Se quiser apagar só um site específico (sem apagar tudo):

1. Abra o site que você quer limpar.


2. Toque nos três pontinhos → “Informações do site” → “Limpar e redefinir”.
→ Isso apaga o localStorage só daquele site.




---

✅ 3. Para ver quanto espaço o navegador está usando:

1. No Chrome, digite na barra:

chrome://settings/siteData


2. Toque em Enter.


3. Lá aparecem todos os sites com armazenamento (inclui localStorage, IndexedDB etc).


4. Você pode tocar em “Remover” em cada um.




---

✅ 4. Alternativa com código simples (só pra ver tamanho usado):

Crie um arquivo HTML com o código abaixo e abra no celular:

<!DOCTYPE html>
<html>
<body>
<h3>Ver uso de armazenamento</h3>
<p id="info"></p>
<script>
navigator.storage.estimate().then(info => {
  const usado = (info.usage / 1024 / 1024).toFixed(2);
  const limite = (info.quota / 1024 / 1024).toFixed(2);
  document.getElementById("info").innerText =
    `Armazenamento usado: ${usado} MB / Limite: ${limite} MB`;
});
</script>
</body>
</html>

👉 Esse mostra quanto espaço total seu navegador está usando e o limite máximo.


---


