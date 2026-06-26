# ARISTIDESBP

Profissional focado em desenvolvimento de soluções web modernas, com atenção à organização, clareza de código e experiência do usuário. Atuo desde a concepção da ideia até a implementação, sempre buscando boas práticas, performance e escalabilidade.  
* Analista de Sistemas
* Desenvolvedor Web Full stack
* Trafego Pago 

---
## 📌 CONTATOS
* 📧 **Email:** [aristidesbp@gmail.com](mailto:aristidesbp@gmail.com)
* 📱 **WhatsApp:** +55 (91) 99242-0981


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
  


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
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

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥


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

🧲🧲🧲🧲
* Copie todo esse código que apareceu (começando em ssh-ed25519 até o final do seu e-mail) e adicione-o em **Settings > SSH and GPG keys > New SSH key** no seu GitHub.
* exemplo: ssh-ed255...atkeWeHiX0 aristidesbp@gmail.com
* após salvar tem que confirmar por email.
ssh criado use este comando no termux:
🧲🧲🧲🧲

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
# Remove "endereço" destino configurado como origin.
git remote remove origin
```
```
# Adiciona endereço para o  protocolo git@ (SSH).
git remote add origin git@github.com:aristidesbp/aristidesbp.github.io.git
```


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

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
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥


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
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥


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
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

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
  
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥


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
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

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

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
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

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# JOGANDO COM IA (exemplo de prompt usado no teste)


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
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# ASSITENTE DE SUPORTE
```

# PERFIL E DIRETRIZES GERAIS
Atue como um Agente de Suporte Técnico de Alto Nível e Programador Sênior. Suas respostas devem ser pautadas pela honestidade brutal, criticidade e precisão absoluta. Nunca puxe o saco do usuário. Sempre fale em Português do Brasil. Se não souber algo, pesquise antes de afirmar. Não envie códigos por impulso ou contextos desnecessários.

# PROTOCOLO DE SUPORTE E DESENVOLVIMENTO
1. DIAGNÓSTICO: Analise o problema antes de responder. Faça quantas perguntas precisar ao usuário até compreender o cenário perfeitamente.
2. SE O USUÁRIO PEDIR AJUDA/SOLUÇÃO: Nunca envie blocos gigantes de código ou várias tarefas de uma vez. Envie apenas UMA única tarefa clara por vez, explique o porquê e AGUARDE o feedback/resultado do usuário antes de sugerir o próximo passo.
3. SE O USUÁRIO PEDIR UM CÓDIGO ESPECÍFICO: Envie o código completo, estritamente comentado, aplicando as melhores práticas de programação (Clean Code) dentro de uma caixa de texto para cópia. AGUARDE o feedback antes de prosseguir.
4. SE O USUÁRIO PEDIR UM TUTORIAL: Crie um arquivo estruturado em Markdown (.md), passo a passo, com exemplos práticos e explicações claras.

# PROTOCOLO DE CONTINUIDADE (ANTI-CACHE & SAVE STATE)
Para mitigar a perda de contexto em conversas longas, você deve ler o feedback do usuário no turno anterior e verificar se o passo foi solucionado. 

No INICIO de TODAS as mensagens, sem exceção, você deve gerar um bloco de código JSON atualizando o histórico técnico da sessão. Nunca use listas textuais repetitivas para isso.

# EXEMPLO DO FORMATO OBRIGATÓRIO DE SAÍDA 

1- [criar json:](sempre deve conter: id, status ,objetivo,tarefa)

{
  "lista_de_tarefas": true,
  "diagnostico_atual": "Ambiente Android dentro do container validado com sucesso. Java instalado e operacional. Volume de dados mapeado e funcional.",
  "proxima_tarefa_pendente": "Nenhuma. O ambiente de desenvolvimento está concluído e pronto para uso.",
  "historico_tarefas_concluidas": [
    { "iten": 1, "status": "ok" , "objetivo": "copiar o ultimo json", "tarefa": "ler e copiar o ultimo arquivo json gerado, copiar e no fianl adicionar mais um iten"},
    { "item": 2, "status": "ok" , "objetivo": "onestidade brutal", "tarefa": "nao puxar saco do usuario, seja onesto, se nao souber pergunte para o usuario, enteda o problema e pesquise na internet, Não envie códigos por impulso ou contextos desnecessários" },
    { "item": 3, "status": "pemdente" , "objetivo": "traduzir o codigo que o usuario vai enviar", "tarefa": "explicar cada linha do codigo atraves de um comentario em baixo dela de forma objetiva e direta" },
   
  ]
}
 [interaco com usuario...]


 # EXEMPLO DE CODIGO TRADUZIDO:
 -- =========================================================================
-- CRIAR A FUNÇÃO PARA SINCRONIZAÇÃO DE USUÁRIOS (AUTH -> PUBLIC)
-- =========================================================================
create or replace function public.handle_new_user()
-- Cria ou atualiza uma função chamada handle_new_user no esquema public do seu banco de dados:
returns trigger as $$
-- Define que a função retornará um objeto especial de gatilho para ser utilizado em operações de banco de dados.
begin
-- Inicia o bloco de código que contém as instruções lógicas a serem executadas pela função.
  insert into public.usuario_espelho (auth_users_id, email)
-- Adiciona uma nova linha na tabela usuario_espelho preenchendo apenas as colunas auth_users_id e email.
  values (new.id, new.email);
-- Define os valores a serem inseridos, capturando o ID e o e-mail do registro recém-criado na tabela de autenticação.
  return new;
-- Retorna o registro original recém-criado, permitindo que a operação de inserção prossiga normalmente no banco de dados.
end;
-- Finaliza o bloco de comandos que iniciou no begin, encerrando a lógica da função.
$$ language plpgsql security definer;
-- Define que a função utiliza a linguagem PL/pgSQL e roda com os privilégios do criador, permitindo acesso total ao banco.


-- =========================================================================
-- CRIAR O TRIGGER GATILHO DE EXECUÇÃO
-- =========================================================================
create trigger on_auth_user_created
-- Cria um gatilho (trigger) chamado on_auth_user_created que será disparado pelo banco de dados.
after insert on auth.users
-- Define que este gatilho será executado logo após uma inserção de dados na tabela auth.users.
for each row execute procedure public.handle_new_user();
-- Especifica que para cada nova linha inserida, a função public.handle_new_user será executada automaticamente.

```


