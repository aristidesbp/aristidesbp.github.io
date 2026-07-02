# ARISTIDESBP

Profissional focado em desenvolvimento de soluções web modernas, com atenção à organização, clareza de código e experiência do usuário. Atuo desde a concepção da ideia até a implementação, sempre buscando boas práticas, performance e escalabilidade.  | Analista de Sistemas |Desenvolvedor Web Full stack | Trafego Pago |

---
## 📌 CONTATOS
* 📧 **Email:** [aristidesbp@gmail.com](mailto:aristidesbp@gmail.com)
* 📱 **WhatsApp:** +55 (91) 99242-0981
* 🌐 **GitHub:** [ENTRAR](https://github.com/aristidesbp)

---
### ERP ABP Login
Acesse a aplicação de gerenciamento integrada ao ecossistema Supabase.
🌐 [teste_conexao](https://aristidesbp.github.io/teste_conexao.html)

---
## 📚 LINKS PARA ESTUDOS
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
* 📊 **SUPABASE:** [https://sqlbolt.com](https://www.youtube.com/watch?v=9Hj4eZE7n00&list=PL4ZwkMMhwaqIem09eRINhc2fjfaM_t2OO))
  


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

![imagem gamer master](assets/png/yaml_json.png)

# Poque uso JSON & YAML nos meus prompt de comando?
A traves de testes de jogos RPG interativos com IA (gratuitas), constatei que  ao atigir media de 20.000 a 25.000 caracteres elea começa a esquescer e mandar mensagens equivocadas, por isso decidi fazer um chekliste para ela revisar sempre antes de continuar com a aventura na tentativa de criar uma memoria persistente atraves de Ancoragem de Atenção.

Ancoragem de Atenção: Modelos de linguagem (LLMs) são excelentes em reconhecer padrões estruturados. Quando você força a IA a reescrever ou ler um JSON com chaves fixas ("historico_tarefas_concluidas", "localizacao_atual"), você está obrigando o mecanismo de atenção da IA a focar e atualizar esses pontos específicos.

Compactação de Contexto: Em vez de a IA ter que reler 10 páginas de conversa confusa para saber onde o personagem está, ela lê apenas as poucas linhas do último JSON resumido. É um "Save State" de videogame.

### Comparação de Formatos de Dados para Engenharia de Prompt que utlizo para memoria persistente

| Formato | Foco Principal | Vantagens | Desvantagens | Consumo de Tokens |
| :--- | :--- | :--- | :--- | :--- |
| **JSON** | Intercâmbio de dados entre sistemas (APIs). | * Rigidez absoluta.<br>* Padrão universal na web.<br>* Suporte nativo em qualquer linguagem. | * Sintaxe verbosa (muitas aspas, chaves e vírgulas).<br>* Fácil de quebrar por erro humano.<br>* Difícil de ler/escrever manualmente em chats. | **Alto** (Sintaxe consome espaço precioso). |
| **YAML** | Arquivos de configuração e dados legíveis. | * Extremamente limpo (sem chaves ou vírgulas).<br>* Economiza espaço (tokens).<br>* Altamente legível por humanos e IAs. | * Depende estritamente de espaços (identação).<br>* Um espaço errado pode mudar a hierarquia do dado.<br>* Menos tolerante a tabs acidentais. | **Baixo/Médio** (Focado apenas no conteúdo essencial). |
| **Markdown** | Formatação de documentos e textos ricos. | * Imune a erros de sintaxe (não quebra o chat).<br>* Perfeito para instruções, regras e descrições textuais.<br>* Visualmente agradável para o usuário. | * Ruim para armazenar dados matemáticos estruturados.<br>* A IA pode variar a formatação ao longo do tempo.<br>* Não serve como "banco de dados" rígido. | **Baixo** (Usa poucos caracteres especiais). |



# As 4 Regras de Ouro do JSON
* Tudo começa e termina com Chaves { }: Elas representam o objeto principal.
* Chaves sempre usam Aspas Duplas "": Nunca use aspas simples '' e nunca deixe a chave sem aspas.
* Certo: "nome": "Aristides"   , Errado: 'nome': "Aristides" ou nome: "Aristides"
* Separadores Obrigatórios:  Use dois pontos (:) para separar a chave do valor. Use vírgula (,) para separar um par de dados do próximo.

**Observação:** A Última Linha NUNCA tem vírgula: Se não houver mais nada depois daquele dado, colocar uma vírgula quebra o código.

## Tipos de Dados Permitidos o JSON só aceita estes tipos de valores:
* Texto (String): Sempre entre aspas duplas. "profissao": "Mestre de RPG"
* Número (Number): Fora das aspas. "nivel": 1 ou "peso": 75.5
* Booleano (Boolean): true ou false (letras minúsculas e sem aspas). "ativo": true
* Nulo (Null): null (sem aspas). "modificador": null
* Objeto (Object): Outro grupo de chaves {} lá dentro.
* Lista (Array): Uma lista de coisas dentro de colchetes [].

## A Diferença Crucial: Chaves {} vs Colchetes []
## Este é o erro mais comum. Memorize isto:
* { } CHAVES (Objeto): Guarda pares de "chave": "valor". Exige que você dê um nome para cada informação.
* [ ] COLCHETES (Array/Lista): Guarda apenas uma lista de valores diretos, separados por vírgula. Não tem chaves internas para cada item.


## exemplo
```json
{
  "nome_do_jogo": "RPG de Mesa",
  "atributos_do_jogador": {    
    "forca": 10,
    "agilidade": 12
  },
  "itens_na_mochila": [
    "Espada",
    "Escudo",
    "Pocao de Cura"
  ]
}
```

# ARQUIVO YAML (regras fundamentais)
 *Criar um arquivo YAML é muito simples porque você não precisa gerenciar chaves {} ou vírgulas. Você só precisa dominar a identação (os espaços no início da linha).

## As Regras de Espaçamento (Identação)
* No YAML, a hierarquia é definida por espaços. Se um dado está "dentro" de outro, ele deve ter 2 espaços de recuo.
* PROIBIDO usar a tecla TAB: O YAML aceita apenas espaços puros (aperte a barra de espaço duas vezes). O TAB quebra o arquivo.
* Use dois pontos : seguido de obrigatoriamente um espaço para separar a chave do valor.

##  Os Elementos Básicos do YAML
### A) Variável Simples (Texto ou Número)
Apenas a chave, dois pontos, um espaço e o valor. Não precisa de aspas (a menos que o texto tenha caracteres muito estranhos).
```
EXEMPLO DE VARIAVERIAVEIS (Texto ou Número):
  nome_do_mestre: aristidesbp
  nivel_dificuldade: 5
  jogo_ativo: true
```
### B) Objetos (Dados aninhados)
Para colocar dados dentro de um grupo (Dados aninhados), quebre a linha e dê 2 espaços de recuo.
```
jogador_aristides:
  nivel: 1
  vida: 100/100
  sono: 0/100
```
### C) Listas (Arrays)
Para fazer uma lista de coisas simples, use o hífen - seguido de um espaço.

```
itens_aristides:
  - 1 porção de cura
  - 1 pergaminho do terremoto
  - 2 porções de previsões
```



🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# JOGANDO COM IA

![imagem gamer master](assets/png/gamer_master.png)
* Sugiro usar o json para caso queria escutar as aventuras, dominar o json ajuda a trabalhar com dados, voçê podera usar futuramente json para exporta dados para o supabase, esta contido neste material. 
  
```
{
  "diretrizes": true,
  "como_voce_deve_se_comportar": "Se torne aristidesbp, um mestre de um jogo de RPG de mesa, criando aventuras imersivas e emocionantes, também administrando as mecânicas do jogo",
  "tarefa": "ABSOLUTAMENTE sempre No início de TODAS as suas mensagens, você copiar obrigatoriamente a FICHA DO STATUS DO GRUPO E AS REGRAS de forma completas dentro de uma caixa de texto em formato json descrita abaixo",
  "FICHA_STATUS_DO_GRUPO": [
    { "DIA": "1" },
    { "HORARIO": "00:00h" },
    { "MISSÃO_ATUAL": "objetivo da missão, quem é o patrocinador, recompensa" },
    { "RESUMO_DA_MISSAO": "Resumo dos fatos e objetivo atual para manter o contexto, sempre atualizados" },
    { "LOCALIZAÇÃO_ATUAL": "descrição do cenário atual e NPCs presentes relevantes para CONTEXTO E CONTINUAÇAO DA HISTORIA" }
  ],
  "jogador_aristides": [
    { "nivel": "01" },
    { "sono": "valor_atual/valor_maximo" },
    { "fome": "valor_atual/valor_maximo" },
    { "habilidade": "valor_atual/valor_maximo" },
    { "inteligencia": "valor_atual/valor_maximo" },
    { "vida": "valor_atual/valor_maximo" }
  ],
  "itens_aristides": [
    "1 porção de cura(regenera 50% da energia total, uso individual)",
    "1 pergaminho do terremoto (dando em área,-4 de energia)",
    "1 pergaminho fortuna (individual, regenera 50% da sorte, acrescenta +1 ao nível máximo de sorte)",
    "2 porções de previsões (comida regenera 100% da fome)"
  ],
  "REGRAS": [
    { "ESTRUTURAÇÃO_DO_FEEDBACK": "Não jogue por mim. Narre o parágrafo atual, apresente 3 sugestões ao jogador de forma numerada" },
    { "imparcialidade": "não puxe o saco, seja realista e coerente com a história, não facilitar ou salvar os jogadores" },
    { "narrativas": "faça narrativas logo após o arquivo json, use no máximo 900 caracteres para o usuário poder escutar, devem ser imersivas, emocionais e detalhadas." },
    { "MISSÃO": "uma por vez, os jogadores devem concluir ou escolher abandonar a missão antes de aceitar a outra." },
    { "HORA_E_DIA": "1 dia = 24 horas (cada interação do jogador equivalem a 30 minutos)" },
    { "FOME_E_SONO": "(aumentam +1 cada para cada hora que passa, se atingirem 100, desmaia -5 de energia)=0%;" },
    { "CRIANDO_PERSONAGEM_MONSTROS_DESAFIOS_NPC": "Jogue um dado de 6 lados (1d6), some 6 ao número que tirar esse será o total de HABILIDADE MAXIMA. Jogar 2d6 some 12 ao número, será o total maximo de ENERGIA. Há também o de SORTE. Jogue um 1d6, some 6 para obter o total." },
    { "desafios": "criar uma ficha aleatória igual a dos jogadores para cada monstro ou npc ou desafio, apresentá-la ao personagem antes de confrontos e testes" },
    { "TESTES_E_COMBATES": "(ambos rolam: 2d6 + valor_do_atributo_testado) quem tirar o maior valor vence. Em caso de combate subtrair -2 ENERGIA no oponente que perdeu" },
    { "habilidade": "testar para todo esforço físico, subtrair -1 do valor atual (fadiga)" },
    { "inteligencia": "testar sempre que o personagem usar para persuadir, criar algo, descobrir..., subtrair -1 do valor atual (fadiga)" },
    { "INICIANDO_JOGO": "PERGUNTE PARA O USUARIO QUAL o nome dos jogadores E O TIPO DE AVENTURA ELE QUER JOGAR" },
    { "combates": "sempre mostrar as fichas de todos os envolvidos e rolagem dos dados, pois assim os jogadores poderam analizar se deve fugir ou continuar" }
  ]
}

```


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# ASSITENTE DE SUPORTE

![imagem agente de suporte](assets/png/suporte.png)

```

{
"prontuário_das_conversas": true,
"protocolo_anti_cache": "Para mitigar a perda de contexto em conversas longas, você deve ler o pronuario (arquivo json) do usuário no turno anterior e verificar se o passo foi solucionado.",
"atualização_do_prontuario":"No INICIO de TODAS as mensagens, sem exceção, você deve gerar um bloco de código JSON, copiar todos os itens passados e adicionar o resumo da converssa atual,o obejetivo e criar um prontuario das conversas para que nao esquessamos oque ja foi feito ou realizado",
"prontuario": [
{ "item": 1,"resumo_da_conversa": "ususario pediu para Analisar o problema antes de responder. Faça quantas perguntas precisar ao usuário até compreender o cenário perfeitamente." },
{ "item": 2,"resumo_da_conversa": "usuario pediu para Nunca envie blocos gigantes de código ou várias tarefas de uma vez. Envie apenas UMA única tarefa clara por vez, explique o porquê e AGUARDE o feedback/resultado do usuário antes de sugerir o próximo passo."},
]

"proxima_tarefa_pendente": "...",

}

```


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
#  TERMINAL LINUX PARA CELULAR ANDROID (TERMUX)
 
## Download do aplicativo direto no git
* Acesse o link oficial no Github não use da Play Store!
* em caso de dúvida peço ajuda ao genini (Ia do google, ou outra da sua escolha)
[TERMUX](https://github.com/termux/termux-app/releases)


```
# Quando coloca o "jogo da velha" na frente de um texto, ele se torna comentário no TERMUX!!!
# Por esse motivo você pode copiar os códigos mesmo com comentários que vai funcionar!
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
## INSTALE AS FERRAMENTAS BÁSICAS PARA A PROGRAMAÇÃO:
pkg install git -y
pkg install nano -y
pkg install openssh -y
pkg install curl -y
pkg install tree -y
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
# limpar atela
clear
```
```
# como apagar pasta/arquivos/projetos
rm -rf nome_da_pasta
```


# 🟥 TERMUX+ GIT+ GITHUB
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

---
# 🟥 GITHUB : BAIXAR E ENVIAR ARQUIVOS 

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
git fetch origin
# 2. APAGA seus arquivos locais para ficarem idênticos ao servidor
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

# COMO BAIXAR MIDIAS COM TERMUX 
```
pkg update && pkg upgrade
pkg install python ffmpeg
python3 -m pip install --upgrade yt-dlp

```
```
yt-dlp -f "bestvideo[height<=720]+bestaudio/best[height<=720]" "url_link"

```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# 🟥 python3 organizar.py
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


# 🟥 python limpar_duplicados.py
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

# 🟥 SERVIDOR PYTHON 
# Passo 1: Instalar o Python3
 * Se você já instalou o Termux  (CONFIGUROU E ATUALIZOU)
 * Navegue até a pasta onde seus arquivos estão 
```
python3 -m http.server 8080
```
* Ele inicia um servidor web simples na porta 8080:
* caso queira encerrar o processo basta apertar Ctr+C;

**Como Acessar o Site no Navegador**
Abra o navegador do seu celular (Chrome, Firefox, etc.).

## [localhost CLIQUE AQUI](http://localhost:8080)
```
http://localhost:8080
```

## ⚠️ Observações importantes
O servidor só funciona enquanto o Termux estiver aberto
A porta 8080 pode ser trocada por outra, ex:
Copiar código
```
python -m http.server 3000
```
Aí o endereço vira:
* http://localhost:3000

## ✅ Se quiser acessar de outro dispositivo na mesma rede Wi-Fi
```
# Descubra o IP do celular no Termux:
ip addr show wlan0
```
Vai aparecer algo como:
* inet 192.168.1.105
No navegador do outro dispositivo, acesse:
* http://192.168.1.105:8080

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# COMO INSTALAR SISTEMA OPERACIONAL LINUX NO ANDROIDE
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
# instalar ubuntu
proot-distro ubuntu
```
```
# entrar no Ubuntu
proot-distro login ubuntu
```
```
# atualizar 
apt update && apt upgrade -y
```

# COMO TER UMA IA OFFLINE NO CELULAR (Termux + Linux + Ollama)
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
ollama serve
```
* ess código vai ficar rodando em segundo plano,
* arraste para direita e abra uma "NEW SESSION"


## em uma nova Session
```
# entrar no Ubuntu
proot-distro login ubuntu
```






🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# PROJETOS COM O SUPABASE E GITHUB_PAGES


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# tarefas.html (funcionando)
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TAREFAS - ERP ABP</title>

    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"> 
    
    <script src="https://unpkg.com/html5-qrcode"></script>

    <style>
        :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; --danger: #ef4444; }
        body { margin: 0; font-family: 'Inter', sans-serif; background: var(--bg); }
        .container { max-width: 1100px; margin: auto; padding: 20px; padding-top: 85px; }
        .card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; }
        .section-title { color: var(--primary); font-size: 14px; text-transform: uppercase; margin: 20px 0 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; font-weight: bold; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
        label { display: block; margin-bottom: 5px; font-size: 13px; color: #64748b; font-weight: bold; }
        input, select, textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
        
        .btn-add { background: var(--primary); color: white; padding: 15px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 20px; transition: 0.3s; }
        .btn-cancel { background: #64748b; color: white; margin-top: 10px; border: none; padding: 10px; border-radius: 6px; cursor: pointer; display: none; width: 100%; }
        
        .barcode-group { display: flex; gap: 5px; }
        .btn-scan { background: var(--dark); color: white; padding: 0 15px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; }

        #reader { width: 100%; max-width: 400px; margin: 10px auto; border-radius: 8px; overflow: hidden; display: none; }

        .tag { padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase; display: inline-block; margin-top: 4px;}
        .tag-pendente { background: #fef3c7; color: #92400e; }
        .tag-realizada { background: #dcfce7; color: #166534; }
        .tag-data { background: #e0f2fe; color: #0284c7; }
        .navbar { position: fixed; top: 0; left: 0; width: 100%; background: white; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; }
    </style>

    <!-- 1. Carrega a biblioteca do Supabase primeiro -->
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    
    <!-- 2. Carrega sua configuração centralizada (Certifique-se que o caminho está correto) -->
    <script src="supabase_config.js"></script>

    <script>
        // Inicializa o cliente usando as constantes do supabase_config.js
        const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

        let recordedAudioBlob = null;
        let mediaRecorder;
        let audioChunks = [];
        let html5QrCode;

        async function verificar_login() {
            const { data: { session } } = await _supabase.auth.getSession();
            if (!session) {
                document.getElementById('tela-login').style.display = 'flex';
                document.getElementById('tela-sistema').style.display = 'none';
            } else {
                document.getElementById('tela-login').style.display = 'none';
                document.getElementById('tela-sistema').style.display = 'block';
                loadtarefas(); 
            }
        }

        async function fazerLogin() {
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;
            const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
            if (error) alert("Erro: " + error.message);
            else verificar_login();
        }

        document.addEventListener('DOMContentLoaded', verificar_login);
    </script>
</head>
<body>

    <div id="tela-login" class="flex justify-center items-center h-screen bg-slate-900" style="display: none;">
        <div class="bg-white p-10 rounded-xl w-full max-w-sm text-center border-t-4 border-emerald-500">
            <h2 class="text-2xl font-bold mb-6 text-slate-800">ERP ABP</h2>
            <input type="email" id="login-email" placeholder="E-mail" class="mb-4">
            <input type="password" id="login-senha" placeholder="Senha" class="mb-6">
            <button class="bg-emerald-500 text-white w-full p-3 rounded font-bold" onclick="fazerLogin()">Entrar</button>
        </div>
    </div>

    <div id="tela-sistema" style="display: none;">
        <div class="navbar">
            <div class="font-bold text-slate-800 text-xl"><i class="fas fa-tasks text-emerald-500"></i> Gestão de Exercícios</div>
            <button class="text-red-500 font-bold" onclick="_supabase.auth.signOut().then(() => verificar_login());">Sair</button>
        </div>

        <div class="container">
            <div class="card">
                <h3 id="form-title" class="text-xl font-bold mb-4">Nova Atividade</h3>
                <input type="hidden" id="edit-id">

                <div class="section-title">Informações Básicas</div>
                <div class="form-grid">
                    <div style="grid-column: span 2;"><label>Título do Exercício *</label><input type="text" id="titulo"></div>
                    <div><label>Categoria</label><input type="text" id="categoria" placeholder="Ex: Matemática, Cognitivo..."></div>
                    <div>
                        <label>Código de Barras</label>
                        <div class="barcode-group">
                            <input type="text" id="codigo_de_barras" placeholder="Digite ou leia">
                            <button type="button" class="btn-scan" onclick="startScanner()" title="Abrir Câmera">
                                <i class="fas fa-barcode"></i>
                            </button>
                        </div>
                    </div>
                    <div><label>Data Prazo</label><input type="date" id="data_prazo"></div>
                    <div>
                        <label>Status</label>
                        <select id="status_exercicio">
                            <option value="pendente">Pendente</option>
                            <option value="realizada">Realizada</option>
                        </select>
                    </div>
                </div>

                <div id="reader"></div>
                <button id="btn-stop-scanner" class="bg-red-500 text-white p-2 rounded w-full mb-4 font-bold" style="display:none;" onclick="stopScanner()">Fechar Câmera</button>

                <div class="section-title">Conteúdo do Exercício</div>
                <textarea id="descricao" placeholder="Digite o enunciado aqui..."></textarea>

                <div class="section-title">Mídias e Notas</div>
                <div class="form-grid">
                    <div>
                        <label>Foto da Resolução</label>
                        <input type="file" id="foto_resolucao" accept="image/*" capture="environment">
                    </div>
                    <div>
                        <label>Gravar Áudio</label>
                        <button class="w-full border-2 border-dashed p-3 rounded bg-slate-50 text-slate-500 font-bold" id="btn-audio" onclick="toggleGravação()"><i class="fas fa-microphone"></i> Gravar Leitura</button>
                        <audio id="audio-preview" controls style="display:none; width:100%; margin-top:10px; height:35px;"></audio>
                    </div>
                    <div style="grid-column: 1 / -1;">
                        <label>Observações do Responsável</label>
                        <textarea id="observacoes" placeholder="Relate dificuldades ou progressos..."></textarea>
                    </div>
                </div>

                <button class="btn-add" id="btn-save" onclick="handleSave()">Salvar Registro</button>
                <button class="btn-cancel" id="btn-cancel" onclick="resetForm()">Cancelar Edição</button>
            </div>

            <div class="card">
                <input type="text" id="inputBusca" placeholder="Pesquisar exercícios..." onkeyup="filtrarTabela()" class="mb-4">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-50 text-slate-500 text-xs uppercase border-b">
                                <th class="p-4">Atividade / Categoria</th>
                                <th class="p-4">Código</th>
                                <th class="p-4">Status</th>
                                <th class="p-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="exercises-list"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script>
        // --- FUNÇÕES DO SCANNER ---
        function startScanner() {
            const readerDiv = document.getElementById('reader');
            const stopBtn = document.getElementById('btn-stop-scanner');
            readerDiv.style.display = 'block';
            stopBtn.style.display = 'block';
            html5QrCode = new Html5Qrcode("reader");
            const config = { fps: 10, qrbox: { width: 250, height: 150 } };
            html5QrCode.start({ facingMode: "environment" }, config, (decodedText) => {
                document.getElementById('codigo_de_barras').value = decodedText;
                stopScanner();
            }).catch(err => console.error(err));
        }

        function stopScanner() {
            if (html5QrCode) {
                html5QrCode.stop().then(() => {
                    document.getElementById('reader').style.display = 'none';
                    document.getElementById('btn-stop-scanner').style.display = 'none';
                });
            }
        }

        // --- ÁUDIO ---
        async function toggleGravação() {
            const btn = document.getElementById('btn-audio');
            const preview = document.getElementById('audio-preview');
            if (mediaRecorder && mediaRecorder.state === "recording") {
                mediaRecorder.stop();
                btn.innerHTML = '<i class="fas fa-microphone"></i> Gravar Novo Áudio';
            } else {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder = new MediaRecorder(stream);
                audioChunks = [];
                mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
                mediaRecorder.onstop = () => {
                    recordedAudioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    preview.src = URL.createObjectURL(recordedAudioBlob);
                    preview.style.display = 'block';
                };
                mediaRecorder.start();
                btn.innerHTML = '<i class="fas fa-stop-circle text-red-500"></i> Parar Gravação';
            }
        }

        // --- CRUD ---
        async function loadtarefas() {
            const { data, error } = await _supabase.from('tarefas').select('*').order('created_at', { ascending: false });
            if (error) { console.error(error); return; }
            const tbody = document.getElementById('exercises-list');
            tbody.innerHTML = data.map(e => {
                let prazo = e.data_prazo ? new Date(e.data_prazo).toLocaleDateString('pt-BR') : 'Sem prazo';
                return `
                <tr class="border-t">
                    <td class="p-4">
                        <span class="font-bold text-slate-800">${e.titulo}</span><br>
                        <span class="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold">${e.categoria || 'Geral'}</span>
                        <span class="tag tag-data"><i class="far fa-calendar-alt"></i> ${prazo}</span>
                    </td>
                    <td class="p-4 font-mono text-sm text-slate-400">${e.codigo_de_barras || '-'}</td>
                    <td class="p-4"><span class="tag tag-${e.status_exercicio}">${e.status_exercicio}</span></td>
                    <td class="p-4 text-center">
                        <button class="text-blue-500 mr-4" onclick="editFull('${e.id}')"><i class="fas fa-edit"></i></button>
                        <button class="text-red-500" onclick="deleteExercicio('${e.id}')"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>`}).join('');
        }

        async function handleSave() {
            const btn = document.getElementById('btn-save');
            btn.disabled = true; btn.innerText = "Salvando...";
            try {
                const id = document.getElementById('edit-id').value;
                const { data: { user } } = await _supabase.auth.getUser();
                const payload = {
                    titulo: document.getElementById('titulo').value,
                    descricao: document.getElementById('descricao').value,
                    categoria: document.getElementById('categoria').value,
                    codigo_de_barras: document.getElementById('codigo_de_barras').value,
                    data_prazo: document.getElementById('data_prazo').value || null,
                    status_exercicio: document.getElementById('status_exercicio').value,
                    observacoes: document.getElementById('observacoes').value,
                    user_id: user.id
                };
                
                // Storage handling (simplificado)
                const inputFoto = document.getElementById('foto_resolucao');
                if (inputFoto.files[0]) {
                    const fileName = `res_${Date.now()}.jpg`;
                    await _supabase.storage.from('resolucoes').upload(`public/${fileName}`, inputFoto.files[0]);
                    payload.foto_url = _supabase.storage.from('resolucoes').getPublicUrl(`public/${fileName}`).data.publicUrl;
                }

                const { error } = id ? await _supabase.from('tarefas').update(payload).eq('id', id) : await _supabase.from('tarefas').insert([payload]);
                if (error) throw error;
                resetForm(); loadtarefas();
            } catch (e) { alert(e.message); }
            finally { btn.disabled = false; btn.innerText = "Salvar Registro"; }
        }

        async function editFull(id) {
            const { data } = await _supabase.from('tarefas').select('*').eq('id', id).single();
            if (data) {
                document.getElementById('edit-id').value = data.id;
                document.getElementById('titulo').value = data.titulo;
                document.getElementById('descricao').value = data.descricao;
                document.getElementById('categoria').value = data.categoria || '';
                document.getElementById('codigo_de_barras').value = data.codigo_de_barras || '';
                document.getElementById('data_prazo').value = data.data_prazo || '';
                document.getElementById('status_exercicio').value = data.status_exercicio;
                document.getElementById('observacoes').value = data.observacoes || '';
                document.getElementById('form-title').innerText = "Editando Atividade";
                document.getElementById('btn-cancel').style.display = "block";
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        async function deleteExercicio(id) {
            if (confirm("Excluir?")) { await _supabase.from('tarefas').delete().eq('id', id); loadtarefas(); }
        }

        function resetForm() {
            document.getElementById('edit-id').value = '';
            document.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
            document.getElementById('status_exercicio').value = 'pendente';
            document.getElementById('form-title').innerText = "Nova Atividade";
            document.getElementById('btn-cancel').style.display = "none";
            recordedAudioBlob = null;
            document.getElementById('audio-preview').style.display = 'none';
        }

        function filtrarTabela() {
            const termo = document.getElementById('inputBusca').value.toLowerCase();
            document.querySelectorAll('#exercises-list tr').forEach(tr => {
                tr.style.display = tr.innerText.toLowerCase().includes(termo) ? '' : 'none';
            });
        }
    </script>
</body>
    <!--
    -- ============================================================================
-- SCRIPT: MÓDULO TAREFAS (GESTÃO DE EXERCÍCIOS)
-- ============================================================================

-- 1. Criação da Tabela com suporte a RLS e Identidade do Usuário
CREATE TABLE IF NOT EXISTS public.tarefas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    titulo TEXT NOT NULL,
    descricao TEXT,
    categoria TEXT,
    codigo_de_barras TEXT,
    data_prazo DATE,
    observacoes TEXT,
    foto_url TEXT,
    audio_url TEXT,
    status_exercicio TEXT DEFAULT 'pendente' CHECK (status_exercicio IN ('pendente', 'realizada')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.tarefas ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de Segurança: O usuário só vê e edita o que é DELE
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Usuários podem gerenciar suas próprias tarefas') THEN
        CREATE POLICY "Usuários podem gerenciar suas próprias tarefas" 
        ON public.tarefas 
        FOR ALL 
        USING (auth.uid() = user_id) 
        WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

-- 4. Configuração de Buckets para Mídias (Fotos e Áudios)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resolucoes', 'resolucoes', true) 
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('audios', 'audios', true) 
ON CONFLICT (id) DO NOTHING;

-- 5. Políticas de Storage: Permitir upload apenas para usuários autenticados
-- Nota: 'public' no bucket permite leitura anônima via URL, mas o upload exige login.
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Upload autenticado em mídias') THEN
        CREATE POLICY "Upload autenticado em mídias" 
        ON storage.objects FOR INSERT 
        WITH CHECK (auth.role() = 'authenticated');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Leitura pública de mídias') THEN
        CREATE POLICY "Leitura pública de mídias" 
        ON storage.objects FOR SELECT 
        USING (bucket_id IN ('resolucoes', 'audios'));
    END IF;
END $$;
    
    -->
</html>
```





🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# financeiro (completo funcionando)
```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Financeiro Completo - ERP ABP</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
    
    <style>
        :root { --primary: #3ecf8e; --dark: #0f172a; --bg: #f1f5f9; }
        body { font-family: 'Inter', sans-serif; background: var(--bg); }
        .card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        
        .status-pago { background: #d1fae5; color: #065f46; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 12px; }
        .status-pendente { background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 12px; }
        .status-atrasado { background: #fee2e2; color: #991b1b; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 12px; animation: pulse 2s infinite; }
        
        .highlight-parcelas { border: 2px solid #3b82f6 !important; background-color: #eff6ff !important; box-shadow: 0 0 10px rgba(59, 130, 246, 0.2); }
        .highlight-label { color: #1d4ed8; font-weight: 900; }

        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        
        label { font-size: 13px; font-weight: bold; color: #475569; margin-bottom: 4px; display: block; }
        input[type="text"], input[type="number"], input[type="date"], input[type="email"], input[type="password"], select { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; }
        input[type="checkbox"] { width: auto; transform: scale(1.2); cursor: pointer; }
        
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

        /* Estilo para a zona de Drop */
        .drop-zone { border: 2px dashed #cbd5e1; border-radius: 6px; padding: 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; background-color: #f8fafc; }
        .drop-zone:hover { background-color: #f1f5f9; border-color: #94a3b8; }
        .drop-zone.dragover { border-color: #3ecf8e; background-color: #ecfdf5; }
    </style>
</head>
<body>

    <div id="tela-login" class="hidden min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full mx-4 border-t-4 border-emerald-500">
            <div class="text-center mb-8">
                <i class="fas fa-wallet text-5xl text-emerald-500 mb-3"></i>
                <h2 class="text-2xl font-bold text-slate-800">ERP Financeiro</h2>
                <p class="text-slate-500 text-sm mt-1">Faça login para acessar suas contas</p>
            </div>
            
            <div class="space-y-4">
                <div>
                    <label class="text-sm font-bold text-slate-700">E-mail</label>
                    <input type="email" id="login-email" placeholder="seu@email.com" onkeyup="if(event.key === 'Enter') document.getElementById('login-senha').focus()">
                </div>
                <div>
                    <label class="text-sm font-bold text-slate-700">Senha</label>
                    <input type="password" id="login-senha" placeholder="••••••••" onkeyup="if(event.key === 'Enter') fazerLogin()">
                </div>
                <button id="btn-login" onclick="fazerLogin()" class="w-full bg-emerald-500 text-white font-bold py-3 rounded hover:bg-emerald-600 transition shadow-lg mt-2">
                    Entrar no Sistema
                </button>
            </div>
        </div>
    </div>

    <div id="tela-sistema" class="hidden">
        
        <nav class="bg-white p-4 shadow-md flex justify-between items-center fixed top-0 left-0 w-full z-40">
            <div class="flex items-center gap-4">
                <button onclick="abrirMenu()" class="text-slate-600 hover:text-emerald-500 text-2xl focus:outline-none px-2">
                    <i class="fas fa-bars"></i>
                </button>
                <h1 class="font-bold text-xl text-slate-800 hidden sm:block"><i class="fas fa-wallet text-emerald-500"></i> Financeiro ERP ABP</h1>
            </div>
            <button onclick="sairDaConta()" class="text-slate-500 hover:text-red-500 transition font-bold text-sm flex items-center gap-2">
                <span class="hidden sm:inline">Sair</span> <i class="fas fa-sign-out-alt"></i>
            </button>
        </nav>

        <div id="sidebar-menu" class="fixed inset-y-0 left-0 w-64 bg-slate-800 text-white transform -translate-x-full transition-transform duration-300 z-50 shadow-2xl">
            <div class="p-6 border-b border-slate-700 flex justify-between items-center">
                <h2 class="text-xl font-bold"><i class="fas fa-wallet text-emerald-500"></i> Menu</h2>
                <button onclick="fecharMenu()" class="text-slate-400 hover:text-white focus:outline-none"><i class="fas fa-times text-2xl"></i></button>
            </div>
            <ul class="p-4 space-y-2 font-medium">
                <li><a href="#" onclick="alternarAba('listagem'); fecharMenu();" class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-list w-6"></i> Lançamentos</a></li>
                <li><a href="#" onclick="alternarAba('formulario'); fecharMenu();" class="block p-3 rounded hover:bg-slate-700 transition"><i class="fas fa-plus-circle w-6"></i> Novo Lançamento</a></li>
                <li><hr class="border-slate-700 my-4"></li>
                <li><a href="#" onclick="sairDaConta()" class="block p-3 text-red-400 rounded hover:bg-slate-700 transition"><i class="fas fa-sign-out-alt w-6"></i> Sair do Sistema</a></li>
            </ul>
        </div>
        <div id="menu-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden" onclick="fecharMenu()"></div>

        <div class="container mx-auto px-4 pb-10 pt-24">
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div class="card border-l-4 border-emerald-500">
                    <p class="text-gray-500 text-sm">Receitas (Pagas)</p>
                    <h2 id="dash-receita" class="text-2xl font-bold text-emerald-600">R$ 0,00</h2>
                </div>
                <div class="card border-l-4 border-red-500">
                    <p class="text-gray-500 text-sm">Despesas (Pagas)</p>
                    <h2 id="dash-despesa" class="text-2xl font-bold text-red-600">R$ 0,00</h2>
                </div>
                <div class="card border-l-4 border-amber-500">
                    <p class="text-gray-500 text-sm">Previsão (Pendentes)</p>
                    <h2 id="dash-pendente" class="text-2xl font-bold text-amber-600">R$ 0,00</h2>
                </div>
            </div>

            <div class="flex gap-4 mb-6">
                <button onclick="alternarAba('listagem')" id="btn-aba-listagem" class="flex-1 bg-emerald-500 text-white hover:bg-emerald-600 font-bold py-3 rounded transition shadow">
                    <i class="fas fa-list"></i> Ver Lançamentos
                </button>
                <button onclick="alternarAba('formulario')" id="btn-aba-formulario" class="flex-1 bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold py-3 rounded transition shadow">
                    <i class="fas fa-plus-circle"></i> Novo Lançamento
                </button>
            </div>

            <div class="card mb-8 hidden" id="aba-formulario">
                <h3 class="font-bold text-lg mb-4 border-b pb-2 text-slate-800"><i class="fas fa-plus-circle"></i> Novo Lançamento</h3>
                
                <input type="hidden" id="f-editando-id">
                <input type="hidden" id="f-editando-financa-id">

                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div class="md:col-span-2"><label>Descrição da Conta *</label><input type="text" id="f-desc" placeholder="Ex: Aluguel, Internet, Venda"></div>
                    
                    <div>
                        <label>Tipo de Valor</label>
                        <select id="f-tipo-calculo" onchange="ajustarLabelsValor()">
                            <option value="total">Valor Total</option>
                            <option value="parcela">Valor da Parcela</option>
                        </select>
                    </div>
                    
                    <div><label id="label-valor">Valor Total (R$) *</label><input type="number" id="f-valor" step="0.01" placeholder="0.00"></div>
                    
                    <div><label>Tipo de Operação</label>
                        <select id="f-tipo">
                            <option value="despesa">Despesa (Saída)</option>
                            <option value="receita">Receita (Entrada)</option>
                        </select>
                    </div>

                    <div>
                        <label>Categoria</label>
                        <input type="text" id="f-categoria" list="lista-categorias" placeholder="Digite ou escolha..." value="Geral">
                        <datalist id="lista-categorias"></datalist>
                    </div>

                    <div><label>Status do Lançamento</label>
                        <select id="f-status">
                            <option value="aberto">Aberto</option>
                            <option value="finalizado">Finalizado</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>

                    <div class="relative md:col-span-1">
                        <label>Entidade / Cliente</label>
                        <input type="text" id="f-entidade-busca" placeholder="Buscar..." autocomplete="off">
                        <input type="hidden" id="f-entidade-id">
                        <ul id="lista-entidades" class="absolute z-10 w-full bg-white border border-slate-200 shadow-lg rounded max-h-40 overflow-y-auto hidden custom-scroll"></ul>
                    </div>
                    
                    <div>
                        <label>Frequência / Recorrência</label>
                        <select id="f-recorrencia">
                            <option value="1">Mensal</option>
                            <option value="3">Trimestral</option>
                            <option value="6">Semestral</option>
                            <option value="12">Anual</option>
                            <option value="diario">Diário</option> 
                        </select>
                    </div>

                    <div class="p-2 rounded highlight-parcelas">
                        <label class="highlight-label"><i class="fas fa-layer-group"></i> N° de Parcelas *</label>
                        <input type="number" id="f-parcelas" value="1" min="1" class="border-blue-300 font-bold text-blue-700">
                    </div>

                    <div><label>Data Vencimento *</label><input type="date" id="f-vencimento"></div>
                    
                    <div><label>Data de Pagamento</label><input type="date" id="f-data-pagamento"></div>

                    <div class="md:col-span-4">
                        <label><i class="fas fa-barcode"></i> Código de Barras / Linha Digitável</label>
                        <div class="flex gap-2">
                            <input type="text" id="f-barras" placeholder="Cole ou leia o código de barras" class="flex-1">
                            <button onclick="iniciarLeituraCamera()" type="button" class="bg-slate-800 text-white px-4 rounded hover:bg-slate-700 transition flex items-center gap-2">
                                <i class="fas fa-camera"></i> Ler Código
                            </button>
                        </div>
                        
                        <div id="camera-container" class="hidden mt-3 relative border-2 border-dashed border-slate-300 p-2 rounded bg-slate-50">
                            <div id="camera-preview" class="w-full max-w-sm mx-auto overflow-hidden rounded"></div>
                            <button onclick="pararCamera()" type="button" class="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex justify-center items-center hover:bg-red-600 shadow-lg z-10">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>

                    <div class="md:col-span-2">
                        <label><i class="fas fa-file-invoice"></i> Anexar Boleto</label>
                        <div class="drop-zone" id="drop-boleto" onclick="document.getElementById('f-boleto').click()">
                            <i class="fas fa-cloud-upload-alt text-2xl text-slate-400 mb-2"></i>
                            <p class="text-xs text-slate-500">Clique ou arraste o arquivo aqui</p>
                            <input type="file" id="f-boleto" accept="image/*,.pdf" class="hidden" onchange="mostrarNomeArquivo(this, 'nome-boleto')">
                            <p id="nome-boleto" class="text-[11px] font-bold text-emerald-600 mt-2 truncate"></p>
                        </div>
                    </div>

                    <div class="md:col-span-2">
                        <label><i class="fas fa-receipt"></i> Anexar Comprovante</label>
                        <div class="drop-zone" id="drop-comprovante" onclick="document.getElementById('f-comprovante').click()">
                            <i class="fas fa-cloud-upload-alt text-2xl text-slate-400 mb-2"></i>
                            <p class="text-xs text-slate-500">Clique ou arraste o arquivo aqui</p>
                            <input type="file" id="f-comprovante" accept="image/*,.pdf" class="hidden" onchange="mostrarNomeArquivo(this, 'nome-comprovante')">
                            <p id="nome-comprovante" class="text-[11px] font-bold text-emerald-600 mt-2 truncate"></p>
                        </div>
                    </div>
                </div>
                
                <div class="flex gap-4 mt-6">
                    <button onclick="gerarLancamentoCompleto()" id="btn-salvar" class="flex-1 bg-emerald-500 text-white font-bold py-3 rounded hover:bg-emerald-600 transition shadow-lg">
                        <i class="fas fa-save"></i> Gravar Lançamento
                    </button>
                    <button onclick="cancelarEdicao()" id="btn-cancelar" class="hidden bg-slate-500 text-white font-bold py-3 px-6 rounded hover:bg-slate-600 transition shadow-lg">
                        Cancelar
                    </button>
                </div>
            </div>

            <div class="card" id="aba-listagem">
                <div class="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 class="font-bold text-slate-800"><i class="fas fa-list"></i> Controle de Parcelas</h3>
                    <button onclick="excluirSelecionados()" class="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition text-sm">
                        <i class="fas fa-trash"></i> Excluir Selecionados
                    </button>
                </div>

                <div class="bg-slate-50 p-4 rounded mb-4 flex flex-wrap gap-4 items-end border border-slate-200">
                    <div class="flex-1 min-w-[200px]">
                        <label class="text-xs">Pesquisar Descrição</label>
                        <input type="text" id="filtro-busca" placeholder="Ex: Aluguel..." onkeyup="if(event.key === 'Enter') loadParcelas()">
                    </div>
                    <div>
                        <label class="text-xs">Filtrar Categoria</label>
                        <select id="filtro-categoria" onchange="loadParcelas()">
                            <option value="">Todas</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-xs">Data Início</label>
                        <input type="date" id="filtro-inicio" onchange="loadParcelas()">
                    </div>
                    <div>
                        <label class="text-xs">Data Fim</label>
                        <input type="date" id="filtro-fim" onchange="loadParcelas()">
                    </div>
                    <div class="flex gap-2">
                        <button onclick="loadParcelas()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow transition">
                            <i class="fas fa-search"></i> Filtrar
                        </button>
                        <button onclick="limparFiltros()" class="bg-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-400 transition">
                            Limpar
                        </button>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-100 text-slate-600 text-xs uppercase border-b-2 border-slate-200">
                                <th class="p-3 w-10 text-center"><input type="checkbox" id="check-all" onclick="toggleTodosChecks(this)"></th>
                                <th class="p-3">Datas (Venc. / Pag.)</th>
                                <th class="p-3">Descrição / Anexos</th>
                                <th class="p-3">Nº Parcela</th>
                                <th class="p-3">Valor (R$)</th>
                                <th class="p-3 text-center">Status</th>
                                <th class="p-3 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="lista-parcelas" class="text-sm"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div> 

```
### javascript
``` 
    <script>
        // Configuração do Supabase
        const supabaseUrl = 'https://wyusolfkxrnwijwjusnv.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dXNvbGZreHJud2lqd2p1c252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NzU0MTMsImV4cCI6MjA5MTA1MTQxM30.RJ0GOHHP4rB40CH0x8JZ1FWAzNcakSprgUwOBtOUVbA'; 
        const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

        let entidadesCache = [];
        let html5QrCode = null;

//====================================================================
        // CONTROLE DO MENU HAMBÚRGUER E ABAS
        // ====================================================================
        function abrirMenu() {
            document.getElementById('sidebar-menu').classList.remove('-translate-x-full');
            document.getElementById('menu-overlay').classList.remove('hidden');
        }

        function fecharMenu() {
            document.getElementById('sidebar-menu').classList.add('-translate-x-full');
            document.getElementById('menu-overlay').classList.add('hidden');
        }

        function alternarAba(abaAtiva) {
            const form = document.getElementById('aba-formulario');
            const lista = document.getElementById('aba-listagem');
            const btnForm = document.getElementById('btn-aba-formulario');
            const btnLista = document.getElementById('btn-aba-listagem');

            const classesVerde = ['bg-emerald-500', 'text-white', 'hover:bg-emerald-600'];
            const classesCinza = ['bg-slate-200', 'text-slate-700', 'hover:bg-slate-300'];

            btnForm.classList.remove(...classesVerde, ...classesCinza);
            btnLista.classList.remove(...classesVerde, ...classesCinza);

            if (abaAtiva === 'formulario') {
                form.classList.remove('hidden');
                lista.classList.add('hidden');
                btnForm.classList.add(...classesVerde);
                btnLista.classList.add(...classesCinza);
            } else {
                form.classList.add('hidden');
                lista.classList.remove('hidden');
                btnLista.classList.add(...classesVerde);
                btnForm.classList.add(...classesCinza);
            }
        }

        // ====================================================================
        // AUTENTICAÇÃO E CONTROLE DE TELAS
        // ====================================================================
        async function verificar_login() {
            const { data: { session } } = await _supabase.auth.getSession();
            const telaLogin = document.getElementById('tela-login');
            const telaSistema = document.getElementById('tela-sistema');

            if (!session) {
                telaLogin.classList.remove('hidden');
                telaLogin.classList.add('flex');
                telaSistema.classList.add('hidden');
            } else {
                telaLogin.classList.add('hidden');
                telaLogin.classList.remove('flex');
                telaSistema.classList.remove('hidden');
                init(); 
            }
        }

        async function fazerLogin() {
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;
            const btn = document.getElementById('btn-login');
            
            if(!email || !senha) return alert("Por favor, preencha e-mail e senha.");

            btn.innerText = 'Autenticando...';
            btn.disabled = true;

            const { error } = await _supabase.auth.signInWithPassword({ email, password: senha });
            
            if (error) {
                alert("Erro ao fazer login: Verifique seu e-mail e senha.");
                btn.innerText = 'Entrar no Sistema';
                btn.disabled = false;
            } else {
                document.getElementById('login-email').value = '';
                document.getElementById('login-senha').value = '';
                btn.innerText = 'Entrar no Sistema';
                btn.disabled = false;
                verificar_login(); 
            }
        }

        async function sairDaConta() {
            await _supabase.auth.signOut();
            document.getElementById('lista-parcelas').innerHTML = '';
            document.getElementById('dash-receita').innerText = 'R$ 0,00';
            document.getElementById('dash-despesa').innerText = 'R$ 0,00';
            document.getElementById('dash-pendente').innerText = 'R$ 0,00';
            fecharMenu();
            verificar_login();
        }

        
// ========================================================
// INICIALIZAÇÃO E ARRASTAR/SOLTAR
// ========================================================
        
   document.addEventListener('DOMContentLoaded', () => {
            verificar_login();
            configurarDropZone('drop-boleto', 'f-boleto', 'nome-boleto');
            configurarDropZone('drop-comprovante', 'f-comprovante', 'nome-comprovante');
        });

        async function init() {
            loadEntidades();
            loadCategoriasUnicas();
            loadDashboard();
            loadParcelas();
        }

        function configurarDropZone(dropId, inputId, txtId) {
            const dropZone = document.getElementById(dropId);
            const inputElement = document.getElementById(inputId);

            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('dragover');
            });

            dropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
                
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    inputElement.files = e.dataTransfer.files;
                    mostrarNomeArquivo(inputElement, txtId);
                }
            });
        }

        function mostrarNomeArquivo(input, idCampoTexto) {
            const campoTexto = document.getElementById(idCampoTexto);
            if (input.files && input.files.length > 0) {
                campoTexto.innerHTML = `<i class="fas fa-check"></i> ${input.files[0].name}`;
            } else {
                campoTexto.innerHTML = '';
            }
        }

        
    // ====================================================================
        // FUNÇÕES DO SISTEMA E CRUD
        // ====================================================================
        function ajustarLabelsValor() {
            const tipo = document.getElementById('f-tipo-calculo').value;
            document.getElementById('label-valor').innerText = tipo === 'total' ? 'Valor Total (R$)' : 'Valor da Parcela (R$)';
        }

        async function loadEntidades() {
            const { data } = await _supabase.from('entidades').select('id, nome_completo');
            if(data) entidadesCache = data;
        }

        async function loadCategoriasUnicas() {
            const { data } = await _supabase.from('financas').select('categoria');
            if (!data) return;
            
            const categorias = [...new Set(data.map(item => item.categoria).filter(c => c))];
            
            const datalist = document.getElementById('lista-categorias');
            const selectFiltro = document.getElementById('filtro-categoria');
            
            datalist.innerHTML = '';
            selectFiltro.innerHTML = '<option value="">Todas</option>';
            
            categorias.forEach(cat => {
                datalist.innerHTML += `<option value="${cat}">`;
                selectFiltro.innerHTML += `<option value="${cat}">${cat}</option>`;
            });
        }

        const inputBusca = document.getElementById('f-entidade-busca');
        const listaDropdown = document.getElementById('lista-entidades');
        const inputId = document.getElementById('f-entidade-id');

        inputBusca.addEventListener('input', (e) => {
            const termo = e.target.value.toLowerCase();
            listaDropdown.innerHTML = '';
            if (!termo) { listaDropdown.classList.add('hidden'); inputId.value = ''; return; }

            const filtradas = entidadesCache.filter(ent => ent.nome_completo.toLowerCase().includes(termo));
            if (filtradas.length > 0) {
                listaDropdown.classList.remove('hidden');
                filtradas.forEach(ent => {
                    const li = document.createElement('li');
                    li.className = 'p-3 hover:bg-slate-100 cursor-pointer text-sm border-b last:border-b-0';
                    li.innerHTML = `<i class="fas fa-user-circle text-slate-400 mr-2"></i>${ent.nome_completo}`;
                    li.onclick = () => {
                        inputBusca.value = ent.nome_completo;
                        inputId.value = ent.id;
                        listaDropdown.classList.add('hidden');
                    };
                    listaDropdown.appendChild(li);
                });
            } else { listaDropdown.classList.add('hidden'); inputId.value = ''; }
        });

        function iniciarLeituraCamera() {
            const container = document.getElementById('camera-container');
            container.classList.remove('hidden');
            html5QrCode = new Html5Qrcode("camera-preview");
            const config = { fps: 10, qrbox: { width: 300, height: 150 } };
            html5QrCode.start({ facingMode: "environment" }, config, (decodedText) => {
                document.getElementById('f-barras').value = decodedText;
                pararCamera();
            }).catch(() => { alert("Verifique as permissões da câmera."); container.classList.add('hidden'); });
        }

        function pararCamera() {
            if (html5QrCode) {
                html5QrCode.stop().then(() => { document.getElementById('camera-container').classList.add('hidden'); });
            } else { document.getElementById('camera-container').classList.add('hidden'); }
        }

        async function loadDashboard() {
            const { data: parcelas } = await _supabase.from('parcelas').select('*, financas(tipo)');
            if(!parcelas) return;
            let receita = 0, despesa = 0, pendente = 0;
            parcelas.forEach(p => {
                const valor = parseFloat(p.valor_parcela || 0);
                if (p.status === 'pago') { p.financas.tipo === 'receita' ? receita += valor : despesa += valor; }
                else { pendente += valor; }
            });
            document.getElementById('dash-receita').innerText = `R$ ${receita.toLocaleString('pt-br', {minimumFractionDigits: 2})}`;
            document.getElementById('dash-despesa').innerText = `R$ ${despesa.toLocaleString('pt-br', {minimumFractionDigits: 2})}`;
            document.getElementById('dash-pendente').innerText = `R$ ${pendente.toLocaleString('pt-br', {minimumFractionDigits: 2})}`;
        }

        async function gerarLancamentoCompleto() {
            const btn = document.getElementById('btn-salvar');
            btn.disabled = true; btn.innerText = 'Salvando...';

            try {
                const desc = document.getElementById('f-desc').value;
                const tipoCalculo = document.getElementById('f-tipo-calculo').value;
                const valorInput = parseFloat(document.getElementById('f-valor').value);
                const tipo = document.getElementById('f-tipo').value;
                const categoria = document.getElementById('f-categoria').value || 'Geral';
                const statusLancamento = document.getElementById('f-status').value;
                const qtd = parseInt(document.getElementById('f-parcelas').value);
                const recorrenciaVal = document.getElementById('f-recorrencia').value;
                const dataVenc = document.getElementById('f-vencimento').value;
                const dataPagamentoForm = document.getElementById('f-data-pagamento').value;
                const entidade = document.getElementById('f-entidade-id').value || null;
                const barras = document.getElementById('f-barras').value;
                
                const fileBoleto = document.getElementById('f-boleto').files[0];
                const fileComprovante = document.getElementById('f-comprovante').files[0];
                
                const editandoId = document.getElementById('f-editando-id').value;
                const financaId = document.getElementById('f-editando-financa-id').value;

                if(!desc || !valorInput || !dataVenc) throw new Error("Preencha Descrição, Valor e Data de Vencimento!");

                let valorTotal, valorParcela;
                if (tipoCalculo === 'total') {
                    valorTotal = valorInput;
                    valorParcela = (valorTotal / qtd).toFixed(2);
                } else {
                    valorParcela = valorInput;
                    valorTotal = (valorParcela * qtd).toFixed(2);
                }

                let boletoUrl = null;
                let comprovanteUrl = null;

                if (fileBoleto) {
                    const fileName = `bol_${Date.now()}_${fileBoleto.name}`;
                    const { error } = await _supabase.storage.from('comprovantes').upload(`public/${fileName}`, fileBoleto);
                    if(!error) boletoUrl = _supabase.storage.from('comprovantes').getPublicUrl(`public/${fileName}`).data.publicUrl;
                }

                if (fileComprovante) {
                    const fileName = `comp_${Date.now()}_${fileComprovante.name}`;
                    const { error } = await _supabase.storage.from('comprovantes').upload(`public/${fileName}`, fileComprovante);
                    if(!error) comprovanteUrl = _supabase.storage.from('comprovantes').getPublicUrl(`public/${fileName}`).data.publicUrl;
                }

                if (editandoId) {
                    await _supabase.from('financas').update({
                        descricao: desc, tipo: tipo, categoria: categoria, status_lancamento: statusLancamento, entidade_id: entidade
                    }).eq('id', financaId);

                    const payloadUpdate = {
                        valor_parcela: valorParcela,
                        data_vencimento: dataVenc,
                        status: dataPagamentoForm ? 'pago' : 'pendente',
                        data_pagamento: dataPagamentoForm || null,
                        codigo_barra: barras
                    };
                    if (boletoUrl) payloadUpdate.boleto_url = boletoUrl;
                    if (comprovanteUrl) payloadUpdate.comprovante_url = comprovanteUrl;

                    const { error: errUpdate } = await _supabase.from('parcelas').update(payloadUpdate).eq('id', editandoId);
                    if (errUpdate) throw errUpdate;

                    alert("Parcela atualizada com sucesso!");
                } else {
                    const { data: financa, error: errF } = await _supabase.from('financas').insert([{
                        descricao: desc, valor_total: valorTotal, tipo, categoria, status_lancamento: statusLancamento, num_parcelas: qtd, entidade_id: entidade
                    }]).select().single();
                    if(errF) throw errF;

                    let parcelas = [];
                    for(let i = 1; i <= qtd; i++) {
                        let venc = new Date(dataVenc + 'T12:00:00'); 
                        if (recorrenciaVal === 'diario') {
                            venc.setDate(venc.getDate() + (i - 1));
                        } else {
                            venc.setMonth(venc.getMonth() + ((i - 1) * parseInt(recorrenciaVal))); 
                        }
                        
                        parcelas.push({
                            financa_id: financa.id,
                            num_parcela: i,
                            valor_parcela: valorParcela,
                            data_vencimento: venc.toISOString().split('T')[0],
                            status: dataPagamentoForm ? 'pago' : 'pendente',
                            data_pagamento: dataPagamentoForm || null,
                            codigo_barra: barras,
                            boleto_url: boletoUrl,
                            comprovante_url: comprovanteUrl
                        });
                    }

                    const { error: errP } = await _supabase.from('parcelas').insert(parcelas);
                    if(errP) throw errP;

                    alert("Lançamento salvo!");
                }
                
                // Em vez de recarregar a página, podemos simplesmente voltar para a lista
                cancelarEdicao();
                loadParcelas();
                loadDashboard();
                alternarAba('listagem');
                btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Gravar Lançamento';

            } catch (error) {
                alert(error.message);
                btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Gravar Lançamento';
            }
        }

        function limparFiltros() {
            document.getElementById('filtro-busca').value = '';
            document.getElementById('filtro-categoria').value = '';
            document.getElementById('filtro-inicio').value = '';
            document.getElementById('filtro-fim').value = '';
            loadParcelas();
        }

```
```
        async function loadParcelas() {
            const busca = document.getElementById('filtro-busca').value;
            const categoria = document.getElementById('filtro-categoria').value;
            const dataInicio = document.getElementById('filtro-inicio').value;
            const dataFim = document.getElementById('filtro-fim').value;

            let query = _supabase.from('parcelas').select('*, financas!inner(descricao, tipo, categoria)').order('data_vencimento', { ascending: true });

            if (busca) query = query.ilike('financas.descricao', `%${busca}%`);
            if (categoria) query = query.eq('financas.categoria', categoria);
            if (dataInicio) query = query.gte('data_vencimento', dataInicio);
            if (dataFim) query = query.lte('data_vencimento', dataFim);

            const { data, error } = await query;
            if (error) { console.error("Erro ao carregar parcelas:", error.message); return; }
            
            const tbody = document.getElementById('lista-parcelas');
            const hoje = new Date().toISOString().split('T')[0];

            tbody.innerHTML = data.map(p => {
                let statusClass = p.status === 'pago' ? 'status-pago' : 'status-pendente';
                let statusTxt = p.status.toUpperCase();
                if(p.status === 'pendente' && p.data_vencimento < hoje) { statusClass = 'status-atrasado'; statusTxt = 'ATRASADO'; }

                const dtVenc = new Date(p.data_vencimento + 'T12:00:00').toLocaleDateString('pt-br');
                const dtPag = p.data_pagamento ? new Date(p.data_pagamento + 'T12:00:00').toLocaleDateString('pt-br') : '--/--/----';

                const iconeBoleto = p.boleto_url ? `<a href="${p.boleto_url}" target="_blank" class="text-blue-500 hover:text-blue-700 ml-2 bg-blue-50 px-2 py-1 rounded text-xs"><i class="fas fa-file-invoice"></i> Boleto</a>` : '';
                const iconeComp = p.comprovante_url ? `<a href="${p.comprovante_url}" target="_blank" class="text-emerald-500 hover:text-emerald-700 ml-2 bg-emerald-50 px-2 py-1 rounded text-xs"><i class="fas fa-receipt"></i> Recibo</a>` : '';
                const txtBarras = p.codigo_barra ? `<div class="text-gray-400 font-mono text-[10px] mt-1 break-all bg-slate-50 p-1 rounded"><i class="fas fa-barcode"></i> ${p.codigo_barra}</div>` : '';

                return `
                <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td class="p-3 text-center">
                        <input type="checkbox" class="check-parcela" value="${p.id}">
                    </td>
                    <td class="p-3">
                        <div class="text-slate-800 font-bold"><i class="far fa-calendar-alt text-slate-400"></i> ${dtVenc}</div>
                        <div class="text-xs text-slate-500 mt-1"><i class="fas fa-check text-emerald-400"></i> ${dtPag}</div>
                    </td>
                    <td class="p-3">
                        <div class="font-bold text-slate-700 mb-1">${p.financas.descricao} <span class="text-[10px] font-normal bg-gray-200 text-gray-600 px-1 rounded ml-1">${p.financas.categoria || 'Geral'}</span></div>
                        <div class="flex gap-1 mb-1">${iconeBoleto}${iconeComp}</div>
                        ${txtBarras}
                    </td>
                    <td class="p-3 font-bold text-slate-600">${p.num_parcela} / ${p.financas.num_parcelas}</td>
                    <td class="p-3 font-bold ${p.financas.tipo === 'receita' ? 'text-emerald-600' : 'text-red-600'}">
                        R$ ${parseFloat(p.valor_parcela).toFixed(2)}
                    </td>
                    <td class="p-3 text-center"><span class="${statusClass}">${statusTxt}</span></td>
                    <td class="p-3 text-center">
                        <button onclick="prepararEdicao('${p.id}')" class="bg-blue-100 text-blue-600 px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition text-sm">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                    </td>
                </tr>`;
            }).join('');
        }

        async function prepararEdicao(id) {
            const { data: p } = await _supabase.from('parcelas').select('*, financas(*)').eq('id', id).single();
            if (p) {
                document.getElementById('f-editando-id').value = p.id;
                document.getElementById('f-editando-financa-id').value = p.financas.id;
                
                document.getElementById('f-desc').value = p.financas.descricao;
                document.getElementById('f-tipo').value = p.financas.tipo;
                document.getElementById('f-categoria').value = p.financas.categoria || 'Geral';
                document.getElementById('f-status').value = p.financas.status_lancamento || 'aberto';
                
                document.getElementById('f-tipo-calculo').value = 'parcela';
                ajustarLabelsValor();
                document.getElementById('f-valor').value = p.valor_parcela;
                document.getElementById('f-parcelas').value = 1;
                document.getElementById('f-parcelas').disabled = true; 
                document.getElementById('f-recorrencia').disabled = true;
                
                document.getElementById('f-vencimento').value = p.data_vencimento;
                document.getElementById('f-data-pagamento').value = p.data_pagamento || '';
                document.getElementById('f-barras').value = p.codigo_barra || '';
                
                document.getElementById('btn-salvar').innerHTML = '<i class="fas fa-sync-alt"></i> Atualizar Parcela';
                document.getElementById('btn-cancelar').classList.remove('hidden');
                
                // Muda para a aba de formulário automaticamente ao clicar em editar
                alternarAba('formulario');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        function cancelarEdicao() {
            document.getElementById('f-editando-id').value = '';
            document.getElementById('f-editando-financa-id').value = '';
            document.getElementById('f-parcelas').disabled = false;
            document.getElementById('f-recorrencia').disabled = false;
            document.getElementById('btn-salvar').innerHTML = '<i class="fas fa-save"></i> Gravar Lançamento';
            document.getElementById('btn-cancelar').classList.add('hidden');
            
            document.getElementById('f-desc').value = '';
            document.getElementById('f-valor').value = '';
            document.getElementById('f-categoria').value = 'Geral';
            document.getElementById('f-vencimento').value = '';
            document.getElementById('f-data-pagamento').value = '';
            document.getElementById('f-barras').value = '';
            
            document.getElementById('nome-boleto').innerHTML = '';
            document.getElementById('nome-comprovante').innerHTML = '';
            document.getElementById('f-boleto').value = '';
            document.getElementById('f-comprovante').value = '';
        }

        function toggleTodosChecks(source) {
            const checkboxes = document.querySelectorAll('.check-parcela');
            checkboxes.forEach(cb => cb.checked = source.checked);
        }

        async function excluirSelecionados() {
            const selecionados = Array.from(document.querySelectorAll('.check-parcela:checked')).map(cb => cb.value);
            if (selecionados.length === 0) return alert("Selecione ao menos uma parcela para excluir.");

            if (confirm(`Atenção: Deseja realmente excluir ${selecionados.length} parcela(s)?`)) {
                const { error } = await _supabase.from('parcelas').delete().in('id', selecionados);
                if (!error) {
                    alert('Excluído com sucesso!');
                    loadParcelas();
                    loadDashboard();
                } else {
                    alert('Erro ao excluir: ' + error.message);
                }
            }
        }
    </script>
</body>
```
```
  <!--
-- ============================================================================
-- 0. LIMPEZA TOTAL DA VERSÃO ANTERIOR (DROP)
-- ============================================================================
-- Remove os gatilhos e funções antigas
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
-- CORREÇÃO AQUI: Procuramos na pasta public, não na auth
DROP FUNCTION IF EXISTS public.get_user_role(); 

-- Remove as políticas do Storage antigas (se existirem)
DROP POLICY IF EXISTS "Imagens publicas para visualizacao" ON storage.objects;
DROP POLICY IF EXISTS "Upload apenas para logados" ON storage.objects;
DROP POLICY IF EXISTS "Usuario edita a propria foto" ON storage.objects;
DROP POLICY IF EXISTS "Usuario apaga a propria foto" ON storage.objects;

-- Remove a tabela antiga e todas as políticas de segurança atreladas a ela
DROP TABLE IF EXISTS public.entidades CASCADE;

```
```
-- ============================================================================
--  CRIAÇÃO DA TABELA PRINCIPAL ATUALIZADA
-- ============================================================================
CREATE TABLE public.entidades (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- Vínculo de segurança com o Auth
    nome_completo TEXT NOT NULL,
    cpf TEXT,
    data_nascimento DATE,
    email TEXT,
    telefone TEXT,
    tipo_acesso TEXT DEFAULT 'cliente',
    tipo_entidade TEXT DEFAULT 'cliente',
    status_entidade TEXT DEFAULT 'ativo',
    avaliacao INTEGER DEFAULT 5,
    cep TEXT,
    logradouro TEXT,
    numero TEXT,
    bairro TEXT,
    cidade TEXT,
    estado VARCHAR(2),
    foto_url TEXT, -- Campo para armazenar o link da foto
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```
```
-- ============================================================================
-- 2. BLINDAGEM DA TABELA (ROW LEVEL SECURITY - RLS)
-- ============================================================================
-- Ativamos a segurança a nível de linha (ninguém acede sem permissão)
ALTER TABLE public.entidades ENABLE ROW LEVEL SECURITY;

-- CORREÇÃO AQUI: Função segura criada na pasta 'public'
CREATE OR REPLACE FUNCTION public.get_user_role() 
RETURNS TEXT AS $$
  SELECT tipo_acesso FROM public.entidades WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- APLICAÇÃO DAS REGRAS POR CARGO:

-- REGRA MASTER: Tem poder absoluto
CREATE POLICY "Master faz tudo" ON public.entidades 
FOR ALL TO authenticated 
USING (public.get_user_role() = 'master');

-- REGRA FUNCIONÁRIO: Pode ler, inserir e editar (Não pode apagar)
CREATE POLICY "Funcionario le" ON public.entidades 
FOR SELECT TO authenticated 
USING (public.get_user_role() = 'funcionario');

CREATE POLICY "Funcionario insere" ON public.entidades 
FOR INSERT TO authenticated 
WITH CHECK (public.get_user_role() = 'funcionario');

CREATE POLICY "Funcionario atualiza" ON public.entidades 
FOR UPDATE TO authenticated 
USING (public.get_user_role() = 'funcionario');

-- REGRA CLIENTE/FORNECEDOR: O utilizador só vê e altera A SUA PRÓPRIA LINHA
CREATE POLICY "Pessoa ve e edita os proprios dados" ON public.entidades 
FOR ALL TO authenticated 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

```
```
-- ============================================================================
-- 3. AUTOMATIZAÇÃO SEGURA (TRIGGER DE REGISTO NOVO UTILIZADOR)
-- ============================================================================
-- Função que insere na tabela 'entidades' quando alguém se regista no Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.entidades (user_id, email, nome_completo, status_entidade, tipo_acesso, tipo_entidade)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', 'Utilizador Novo'),
    'ativo',
    'cliente',
    'cliente'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Cria o gatilho associando a função acima ao evento de novo usuário
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

```
```
-- ============================================================================
-- 4. SEGURANÇA DO STORAGE (IMPEDIR UPLOADS MALICIOSOS NO BUCKET 'avatares')
-- ============================================================================
-- Nota: Lembra-te que o bucket 'avatares' deve ser criado manualmente no painel Storage!

-- Permite que qualquer pessoa veja as fotos
CREATE POLICY "Imagens publicas para visualizacao"
ON storage.objects FOR SELECT TO public
USING ( bucket_id = 'avatares' );

-- Permite que APENAS utilizadores logados façam upload
CREATE POLICY "Upload apenas para logados"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK ( bucket_id = 'avatares' );

-- Permite que o utilizador edite ou apague apenas a sua própria foto
CREATE POLICY "Usuario edita a propria foto"
ON storage.objects FOR UPDATE TO authenticated
USING ( bucket_id = 'avatares' AND auth.uid() = owner );

CREATE POLICY "Usuario apaga a propria foto"
ON storage.objects FOR DELETE TO authenticated
USING ( bucket_id = 'avatares' AND auth.uid() = owner );
    
```
```
    -- ============================================================================
-- 4. CRIAÇÃO E SEGURANÇA DO STORAGE (BUCKET 'avatares')
-- ============================================================================

-- A. LIMPEZA PREVENTIVA (Isto é o que evita o teu erro!)
DROP POLICY IF EXISTS "Imagens publicas para visualizacao" ON storage.objects;
DROP POLICY IF EXISTS "Upload apenas para logados" ON storage.objects;
DROP POLICY IF EXISTS "Usuario edita a propria foto" ON storage.objects;
DROP POLICY IF EXISTS "Usuario apaga a propria foto" ON storage.objects;


-- B. CRIA O BUCKET AUTOMATICAMENTE (Se ele ainda não existir)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatares', 'avatares', true)
ON CONFLICT (id) DO NOTHING;


-- C. APLICA AS REGRAS DE SEGURANÇA
CREATE POLICY "Imagens publicas para visualizacao"
ON storage.objects FOR SELECT TO public
USING ( bucket_id = 'avatares' );

CREATE POLICY "Upload apenas para logados"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK ( bucket_id = 'avatares' );

CREATE POLICY "Usuario edita a propria foto"
ON storage.objects FOR UPDATE TO authenticated
USING ( bucket_id = 'avatares' AND auth.uid() = owner );

CREATE POLICY "Usuario apaga a propria foto"
ON storage.objects FOR DELETE TO authenticated
USING ( bucket_id = 'avatares' AND auth.uid() = owner );
```
```
-- ============================================================================
-- 1. CRIAÇÃO DAS TABELAS FINANCEIRAS
-- ============================================================================

-- Tabela Pai: Lançamento Financeiro Geral (O "Cabeçalho" da conta)
CREATE TABLE public.financas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    -- O default auth.uid() preenche automaticamente com o ID de quem está logado
    user_id UUID DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
    entidade_id UUID REFERENCES public.entidades(id) ON DELETE SET NULL, -- Se apagar o cliente, a conta financeira não some
    descricao TEXT NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    tipo TEXT CHECK (tipo IN ('receita', 'despesa')),
    num_parcelas INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela Filha: Parcelas Individuais (As "Linhas" de pagamento)
CREATE TABLE public.parcelas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    financa_id UUID REFERENCES public.financas(id) ON DELETE CASCADE, -- Se apagar o "cabeçalho", apaga as parcelas junto
    num_parcela INTEGER NOT NULL,
    valor_parcela DECIMAL(10,2) NOT NULL,
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'pago', 'atrasado')),
    codigo_barra TEXT,       -- Campo para o leitor de barras
    boleto_url TEXT,         -- Link do boleto salvo no storage
    comprovante_url TEXT,    -- Link do comprovante salvo no storage
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```
```
-- ============================================================================
-- 2. SEGURANÇA DOS DADOS (ROW LEVEL SECURITY - RLS)
-- ============================================================================

ALTER TABLE public.financas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parcelas ENABLE ROW LEVEL SECURITY;

-- Regras para Finanças (Usuário só acessa as contas que ele mesmo criou)
CREATE POLICY "Pessoa ve as proprias financas" ON public.financas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Pessoa insere as proprias financas" ON public.financas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Pessoa atualiza as proprias financas" ON public.financas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Pessoa apaga as proprias financas" ON public.financas FOR DELETE USING (auth.uid() = user_id);

-- Regras para Parcelas (Usuário só acessa parcelas amarradas às suas finanças)
CREATE POLICY "Pessoa ve as proprias parcelas" ON public.parcelas FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.financas WHERE financas.id = parcelas.financa_id AND financas.user_id = auth.uid())
);
CREATE POLICY "Pessoa insere as proprias parcelas" ON public.parcelas FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.financas WHERE financas.id = parcelas.financa_id AND financas.user_id = auth.uid())
);
CREATE POLICY "Pessoa atualiza as proprias parcelas" ON public.parcelas FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.financas WHERE financas.id = parcelas.financa_id AND financas.user_id = auth.uid())
);
CREATE POLICY "Pessoa apaga as proprias parcelas" ON public.parcelas FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.financas WHERE financas.id = parcelas.financa_id AND financas.user_id = auth.uid())
);
```
```
-- ============================================================================
-- 3. CRIAÇÃO E SEGURANÇA DO STORAGE (BUCKET 'comprovantes')
-- ============================================================================

-- Cria o bucket 'comprovantes' automaticamente se ele ainda não existir
INSERT INTO storage.buckets (id, name, public)
VALUES ('comprovantes', 'comprovantes', true)
ON CONFLICT (id) DO NOTHING;

-- Aplica as Regras de quem pode mexer nos arquivos
CREATE POLICY "Comprovantes publicos" ON storage.objects FOR SELECT TO public USING ( bucket_id = 'comprovantes' );
CREATE POLICY "Upload de comprovantes" ON storage.objects FOR INSERT TO authenticated WITH CHECK ( bucket_id = 'comprovantes' );
CREATE POLICY "Edicao de comprovantes" ON storage.objects FOR UPDATE TO authenticated USING ( bucket_id = 'comprovantes' AND auth.uid() = owner );
CREATE POLICY "Delecao de comprovantes" ON storage.objects FOR DELETE TO authenticated USING ( bucket_id = 'comprovantes' AND auth.uid() = owner ); 
      
    
```
```
-- ============================================================================
-- ATUALIZAÇÃO DA TABELA 'financas'
-- ============================================================================

-- 1. Adiciona o campo 'categoria' com um valor padrão para não quebrar registros antigos
ALTER TABLE public.financas 
ADD COLUMN IF NOT EXISTS categoria TEXT DEFAULT 'Geral';

-- 2. Adiciona o campo 'status_lancamento' com validação (CHECK) para aceitar apenas os 3 status definidos
ALTER TABLE public.financas 
ADD COLUMN IF NOT EXISTS status_lancamento TEXT DEFAULT 'aberto' 
CHECK (status_lancamento IN ('aberto', 'finalizado', 'cancelado'));

-- ============================================================================
-- (OPCIONAL) ATUALIZAR REGISTROS ANTIGOS
-- Caso você já tenha dados cadastrados e queira garantir que todos tenham a
-- categoria 'Geral' e o status 'aberto' preenchidos (caso o default não aplique nos antigos)
-- ============================================================================

UPDATE public.financas 
SET categoria = 'Geral' 
WHERE categoria IS NULL;

UPDATE public.financas 
SET status_lancamento = 'aberto' 
WHERE status_lancamento IS NULL;
    -->
</html>
```
