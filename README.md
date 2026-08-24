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


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
# PROMPT PARA HISTÓRICO DE CONVERSAS
```
Torne-se um Agente de Suporte Técnico de Alto Nível. Suas respostas devem ser pautadas pela honestidade brutal, criticidade e precisão absoluta.
Fale sempre em Português do Brasil.
Diretrizes obrigatórias:]
1. Analisar o problema a fundo antes de responder. Fazer perguntas para compreender o cenário com exatidão. Se não souber algo, perguntar ou pesquisar antes de afirmar. 2. Execução: Enviar APENAS UMA única tarefa clara por vez. Explicar o porquê da tarefa e aguardar obrigatoriamente o feedback ou resultado do usuário antes de sugerir o próximo passo. Nunca enviar várias tarefas simultâneas. 3. Referências de código: Sempre que o usuário precisar alterar um texto ou código, indicar exatamente a linha superior e a linha inferior de referência para facilitar a localização rápida via Ctrl+F. 4. Sempre crie documentação do que está sendo tratado nas conversas, em um arquivo ".json", no INÍCIO de todas as conversas com o resumo e códigos usados das conversas anteriores em forma de lista numerada, revisar este arquivo antes de me responder ou me enviar qualquer coisa (sempre Copiar os itens passados e adicionar um novo resumo, não apagar ou alterar nenhum item sem permissão). 5. Sempre utilizar terminal Linux, Termux ou GitHub para programar. 6. Gosto de hospedar sites no GitHub e usar o SUPABASE (backend, pois ele tem o storage e apólices de segurança internas).

# Evitar os problemas :
1- RLS desligado no supabase
2- regra de negocio no frontende (admin), devem ser feitas via RPC do backend de forma segura!
3- fetch de dados no backend sem auth
4- chaves expostas
5- input sem tratar : xss, upload de qualquer arquivo, sem rate limit.

```


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
#  CURSO DE TERMUX ( Terminal linux para android):
 
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
git fetch origin
```
``` 
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
# CURSO DE PYTHON:
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



⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
# ABP_ERP
## Arquitetura Feature-Based Architecture (Arquitetura Baseada em Recursos)
* Vamos organizar as pastas por funcionalidade (cada módulo com seu próprio HTML, CSS e JS na mesma pasta).  

## Criar conta e projeto
* Acesse: https://supabase.com
* Crie uma conta
* Clique em New Project
* 
## Escolha:(exemplo)
* Nome do projeto: erp_abp
* Senha do banco: ***********
* Região: brasil

--- 

## Configurar

* Authentication/URL Configuration & Redirect URLs: coloque a url do seu site (http://aristidesbp.github.io)
* Authentication/Users: voçẽ pode criar um novo usuario.



🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# global/supabase_config.js
``` 
const supabaseUrl = 'sua_rul';
const supabaseKey = 'sua_anon_key';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# global/navbar.js
```
// =================================================================
// VARIÁVEIS GLOBAIS
// =================================================================
// Declarada no escopo global para que outros módulos (como Entidades) possam acessá-la
let usuarioLogadoId = null;

// =================================================================
// 2. VERIFICAÇÃO DE LOGIN E SESSÃO
// =================================================================
async function verificarLogin() {
    // _supabase é instanciado no supabase_config.js
    const { data: { session }, error } = await _supabase.auth.getSession();
    
    // Se não houver sessão ativa, redireciona para a pasta de login
    if (error || !session) {
        // CORREÇÃO: Volta uma pasta (../) e entra na pasta login
        window.location.href = '../login/login.html';
        return null;
    }
    
    // Salva o ID do usuário de forma global
    usuarioLogadoId = session.user.id;
    return session;
}

// Encerra a sessão no backend e redireciona para o login
async function sairDaConta() {
    await _supabase.auth.signOut();
    // CORREÇÃO: Caminho atualizado para a nova estrutura de diretórios
    window.location.href = '../login/login.html';
}

// =================================================================
// 3. ALTERNÂNCIA DE MODO ESCURO (DARK MODE)
// =================================================================
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    
    const darkIcon = document.getElementById('dark-icon');
    const lightIcon = document.getElementById('light-icon');
    
    if (darkIcon && lightIcon) {
        darkIcon.classList.toggle('hidden', isDark);
        lightIcon.classList.toggle('hidden', !isDark);
    }
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// =================================================================
// 4. RENDERIZAÇÃO DA NAVBAR SIMPLIFICADA
// =================================================================
function renderizarNavbar() {
    const container = document.getElementById('navbar-container');
    if (!container) {
        console.error('Elemento #navbar-container não encontrado no HTML.');
        return;
    }

    // CORREÇÃO: O botão "Voltar" agora aponta corretamente para a Home
    const htmlNavbar = `
        <header class="fixed top-0 left-0 right-0 w-full z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-[#E2E8F0] dark:border-slate-800 flex justify-between items-center h-16 sm:h-20 px-4 sm:px-8 transition-all">
            
            <div class="flex items-center gap-3 sm:gap-4">
                <h2 class="font-bold text-base sm:text-xl text-slate-900 dark:text-white truncate">ERP-ABP</h2>
                <!-- Caminho ajustado para ../index/index.html -->
                <button onclick="window.location.href='../index/index.html'" class="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all cursor-pointer" title="Voltar para a página inicial">
                    <span class="material-symbols-outlined text-base">arrow_back</span>
                    <span class="hidden sm:inline">Voltar</span>
                </button>
            </div>

            <div class="flex items-center gap-1 sm:gap-2">
                <button class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer" id="theme-toggle" onclick="toggleDarkMode()" title="Alternar tema">
                    <span class="material-symbols-outlined text-xl" id="dark-icon">dark_mode</span>
                    <span class="material-symbols-outlined text-xl hidden" id="light-icon">light_mode</span>
                </button>
                <button title="Sair da conta" onclick="sairDaConta()" class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
                    <span class="material-symbols-outlined text-xl">logout</span>
                </button>
            </div>
        </header>
    `;

    container.innerHTML = htmlNavbar;

    // Sincroniza o modo escuro salvo previamente
    const temaSalvo = localStorage.getItem('theme');
    const isDark = temaSalvo === 'dark' || (!temaSalvo && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) document.documentElement.classList.add('dark');
    
    const darkIcon = document.getElementById('dark-icon');
    const lightIcon = document.getElementById('light-icon');
    if (darkIcon && lightIcon) {
        darkIcon.classList.toggle('hidden', isDark);
        lightIcon.classList.toggle('hidden', !isDark);
    }
}

// =================================================================
// 5. INICIALIZAÇÃO CENTRALIZADA
// =================================================================
// Evento único: Evita chamadas duplicadas e garante a ordem lógica
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Primeiro verifica se está logado
    const session = await verificarLogin();
    
    // 2. Se a sessão for válida, renderiza a interface
    if (session) {
        renderizarNavbar();
    }
});

```



🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# login/login.css
```
/* =========================================================
   MÓDULO DE LOGIN - ESTILOS ESPECÍFICOS (css/login.css)
========================================================= */

.material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    display: inline-block;
    vertical-align: middle;
}

.fade-in {
    animation: fadeIn .4s cubic-bezier(.4, 0, .2, 1) forwards;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
}

.glass-card {
    background: rgba(255, 255, 255, .8);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, .3);
}

.dark .glass-card {
    background: rgba(30, 41, 59, .8);
    border-color: rgba(255, 255, 255, .1);
}
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# login/login.html
```
<!DOCTYPE html>
<html class="light" lang="pt-br">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Login - ERP_ABP</title>
    
    <!-- Fontes e Ícones -->
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
    
    <!-- Estilos Modularizados (Retorna uma pasta '..' para acessar 'css') -->
    <link rel="stylesheet" href="./login.css"/>
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#006c45",
                        "primary-container": "#3ecf8e",
                        "on-surface": "#191c1d",
                        "text-muted": "#687076"
                    }
                }
            }
        }
    </script>
    
    <!-- Supabase SDK e Configurações (Retorna uma pasta '..' para acessar 'js') -->
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="../global/supabase_config.js"></script>
</head>
<body class="bg-[#F8FAFC] dark:bg-[#0f172a] text-on-surface dark:text-slate-200 font-sans min-h-screen flex items-center justify-center p-4 relative overflow-hidden">

    <!-- Fundo Decorativo -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-container/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Card de Login -->
    <div class="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-2xl shadow-xl border border-white/40 dark:border-slate-800 max-w-md w-full fade-in relative z-10 glass-card">
        
        <!-- Cabeçalho do Card -->
        <div class="text-center mb-10">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
                <span class="material-symbols-outlined text-primary text-4xl">groups</span>
            </div>
            <h2 class="text-2xl font-bold text-on-surface dark:text-white tracking-tight">ERP_ABP</h2>
            <p class="text-text-muted dark:text-slate-400 text-sm mt-2">Faça login para acessar a plataforma</p>
        </div>

        <!-- Formulário de Entrada -->
        <div class="space-y-6">
            <div>
                <label class="text-xs font-semibold text-on-surface dark:text-slate-300 mb-2 block uppercase tracking-wider">E-mail Corporativo</label>
                <input 
                    id="login-email" 
                    type="email" 
                    placeholder="usuario@empresa.com.br" 
                    onkeyup="if(event.key==='Enter') document.getElementById('login-senha').focus()"
                    class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:text-white"
                />
            </div>

            <div>
                <label class="text-xs font-semibold text-on-surface dark:text-slate-300 mb-2 block uppercase tracking-wider">Senha de Segurança</label>
                <div class="relative">
                    <input 
                        id="login-senha" 
                        type="password" 
                        placeholder="••••••••" 
                        onkeyup="if(event.key==='Enter') fazerLogin()"
                        class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:text-white"
                    />
                    <button 
                        type="button" 
                        onclick="togglePasswordVisibility('login-senha', this)"
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1"
                    >
                        <span class="material-symbols-outlined text-xl">visibility</span>
                    </button>
                </div>
            </div>

            <button 
                id="btn-login" 
                onclick="fazerLogin()"
                class="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/95 transition-all shadow-lg shadow-primary/20 active:scale-[0.98] mt-2"
            >
                Autenticar Acesso
            </button>
        </div>

        <!-- Rodapé do Card -->
        <div class="flex items-center justify-center gap-2 mt-10 opacity-60">
            <span class="material-symbols-outlined text-xs dark:text-slate-400">verified_user</span>
            <p class="text-xs text-text-muted dark:text-slate-400 font-medium">Criptografia AES de 256 bits ativada.</p>
        </div>
    </div>

    <!-- Script de Autenticação Modularizado -->
    <script src="./login.js"></script>
</body>
</html>
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# login/login.js
```
// =========================================================
// MÓDULO DE LOGIN - AUTENTICAÇÃO (login/login.js)
// =========================================================

/**
 * Alterna a visibilidade da senha entre texto visível e oculto.
 */
function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('.material-symbols-outlined');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.innerText = 'visibility_off';
    } else {
        input.type = 'password';
        icon.innerText = 'visibility';
    }
}

/**
 * Verifica se já existe uma sessão ativa. Se existir, pula o login.
 */
async function verificar_login() {
    // _supabase vem do arquivo supabase_config.js, importado globalmente
    const { data: { session }, error } = await _supabase.auth.getSession();
    
    if (session && !error) {
        // CORREÇÃO DE ROTA: Volta uma pasta (../) e entra na pasta index
        window.location.href = '../index/index.html'; 
    }
}

/**
 * Captura os dados do formulário e tenta autenticar via Supabase
 */
async function fazerLogin() {
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;
    const btn = document.getElementById('btn-login');

    if (!email || !senha) {
        return alert("Erro: E-mail e Senha são obrigatórios.");
    }

    // Feedback visual para o usuário não clicar duas vezes
    btn.innerText = 'Autenticando...';
    btn.disabled = true;

    // Comunicação com o Backend Supabase
    const { data, error } = await _supabase.auth.signInWithPassword({ 
        email: email, 
        password: senha 
    });

    if (error) {
        alert("Falha na autenticação: Verifique suas credenciais.");
        btn.innerText = 'Autenticar Acesso';
        btn.disabled = false;
    } else {
        // CORREÇÃO DE ROTA: Volta uma pasta (../) e entra na pasta index
        window.location.href = '../index/index.html';
    }
}

// Quando a tela carregar, verifica imediatamente se o usuário já está logado
document.addEventListener('DOMContentLoaded', () => {
    verificar_login();
});
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# index/index.css
```
/* =========================================================
   MÓDULO INICIAL (HOME) - ESTILOS (index/index.css)
========================================================= */

/* Configuração base dos ícones do Google Material Symbols */
.material-symbols-outlined { 
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; 
    display: inline-block; 
    vertical-align: middle; 
}

/* Animação suave para os cards aparecerem ao carregar a página */
.fade-in { 
    animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; 
}

@keyframes fadeIn { 
    from { opacity: 0; transform: translateY(8px); } 
    to { opacity: 1; transform: translateY(0); } 
}

/* Ocultar barra de rolagem (padrão herdado) */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# index/index.html
```
<!DOCTYPE html>
<html class="light" lang="pt-br">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Home - ERP_ABP</title>
    
    <!-- Fontes e Ícones -->
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet"/>
    
    <!-- Estilos Específicos da Home (Caminho Local) -->
    <link rel="stylesheet" href="./index.css"/>
    
    <!-- Tailwind CSS CDN e Configurações Globais -->
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#006c45",
                        "primary-container": "#3ecf8e"
                    }
                }
            }
        }
    </script>

    <!-- Supabase SDK e Configurações Globais (Caminho alterado para a pasta global) -->
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="../global/supabase_config.js"></script>
</head>
<body class="bg-[#F8FAFC] dark:bg-[#0f172a] text-slate-900 dark:text-slate-200 font-sans min-h-screen transition-colors duration-300">

    <!-- CONTAINER DA NAVBAR (Preenchido pelo navbar.js) -->
    <div id="navbar-container"></div>      

    <!-- CONTEÚDO DA PÁGINA (HOME) -->
    <main class="pt-24 px-4 sm:px-8 max-w-7xl mx-auto pb-12 fade-in">
        <div class="mb-8">
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Painel Inicial (Home)</h1>
            <p class="text-slate-600 dark:text-slate-400 mt-1">Selecione abaixo o módulo que deseja acessar:</p>
        </div>

        <!-- GRADE DE MÓDULOS / LINKS COM ROTAS ATUALIZADAS -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <!-- Módulo Entidades (Rota corrigida) -->
            <a href="../entidades/entidades.html" class="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary shadow-sm hover:shadow-md transition-all group">
                <div class="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    <span class="material-symbols-outlined">group</span>
                </div>
                <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-1">Entidades</h2>
                <p class="text-sm text-slate-500 dark:text-slate-400">Gerenciamento de clientes, fornecedores e parceiros.</p>
            </a>
            
            <!-- Módulo Financeiro -->
            <a href="../financeiro/financeiro.html" class="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary shadow-sm hover:shadow-md transition-all group">
                <div class="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    <span class="material-symbols-outlined">payments</span>
                </div>
                <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-1">Financeiro</h2>
                <p class="text-sm text-slate-500 dark:text-slate-400">Controle de contas a pagar, receber e fluxo de caixa.</p>
            </a>

            <!-- Módulo Estoque -->
            <a href="../estoque/estoque.html" class="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary shadow-sm hover:shadow-md transition-all group">
                <div class="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    <span class="material-symbols-outlined">inventory_2</span>
                </div>
                <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-1">Estoque</h2>
                <p class="text-sm text-slate-500 dark:text-slate-400">Controle de produtos, entradas, saídas e saldos.</p>
            </a>

            <!-- Módulo PDV -->
            <a href="../pdv/pdv.html" class="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary shadow-sm hover:shadow-md transition-all group">
                <div class="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    <span class="material-symbols-outlined">point_of_sale</span>
                </div>
                <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-1">PDV — Frente de Caixa</h2>
                <p class="text-sm text-slate-500 dark:text-slate-400">Ambiente de vendas rápidas e emissão de cupom.</p>
            </a>

            <!-- Módulo Configurações -->
            <a href="../configuracoes/configuracoes.html" class="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary shadow-sm hover:shadow-md transition-all group">
                <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    <span class="material-symbols-outlined">settings</span>
                </div>
                <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-1">Configurações</h2>
                <p class="text-sm text-slate-500 dark:text-slate-400">Parâmetros do sistema, perfis e preferências.</p>
            </a>
        </div>
    </main>

    <!-- IMPORTAÇÃO DOS SCRIPTS NO FINAL DA PÁGINA -->
    <!-- Primeiro importamos a navbar.js e depois a lógica local -->
    <script src="../global/navbar.js"></script> 
    <script src="./index.js"></script>

</body>
</html>
```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# index/index.js
```
// =========================================================
// MÓDULO INICIAL (HOME) - LÓGICA (index/index.js)
// =========================================================

/**
 * EventListener principal do módulo Home.
 * Aguarda o HTML carregar e a sessão ser verificada pelo arquivo global.
 */
document.addEventListener('DOMContentLoaded', () => {
    // A renderização da Navbar e a verificação de segurança já acontecem no global/navbar.js.
    // Aqui, futuramente, faremos chamadas seguras (fetch com auth) 
    // para preencher resumos financeiros ou de estoque, caso você queira criar um Dashboard!
    
    console.log("Módulo Home (Index) carregado com sucesso sob a nova arquitetura.");
});

```
🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# entidades/entidades.sql
```
-- =========================================================================
-- 1. LIMPEZA SEGURA (DROP DE ESTRUTURAS ANTIGAS)
-- =========================================================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.upsert_entidade_rpc(jsonb);
DROP FUNCTION IF EXISTS public.delete_entidades_rpc(bigint[]);
-- ATENÇÃO: CASCADE apaga a tabela e qualquer relacionamento que dependa dela
DROP TABLE IF EXISTS public.entidades CASCADE;


-- =========================================================================
-- 2. CRIAÇÃO DA TABELA BLINDADA COM CONSTRAINTS
-- =========================================================================
CREATE TABLE public.entidades (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at timestamptz NOT NULL DEFAULT now(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Dados Pessoais / Identificação
    -- CHECK garante que o nome não seja salvo vazio ou só com espaços
    nome_completo text NOT NULL CHECK (char_length(trim(nome_completo)) > 0),
    url_foto_avatar text, 
    codigo_barras_carteirinha text, 
    bio text,
    
    -- Contato e Documentos
    cpf text,
    data_nascimento date,
    -- CHECK básico para garantir formato de e-mail válido
    email text CHECK (email IS NULL OR email = '' OR email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    telefone text,
    
    -- Validações Rígidas de Regra de Negócio (Bloqueia injeção de valores inválidos)
    tipo_acesso text DEFAULT 'cliente' CHECK (tipo_acesso IN ('cliente', 'admin', 'colaborador')),
    tipo_entidade text DEFAULT 'cliente' CHECK (tipo_entidade IN ('cliente', 'fornecedor', 'colaborador')),
    status_entidade text DEFAULT 'ativo' CHECK (status_entidade IN ('ativo', 'inativo')),
    avaliacao integer DEFAULT 5 CHECK (avaliacao >= 1 AND avaliacao <= 5),
    
    -- Endereço
    cep text,
    logradouro text,
    numero text,
    bairro text,
    cidade text,
    estado varchar(2)
);

-- Garantir que a carteirinha e o CPF não se repitam PARA O MESMO USUÁRIO
CREATE UNIQUE INDEX idx_ent_carteirinha ON public.entidades (user_id, codigo_barras_carteirinha) WHERE codigo_barras_carteirinha IS NOT NULL AND codigo_barras_carteirinha <> '';
CREATE UNIQUE INDEX idx_ent_cpf ON public.entidades (user_id, cpf) WHERE cpf IS NOT NULL AND cpf <> '';


-- =========================================================================
-- 3. POLÍTICAS DE SEGURANÇA RLS
-- =========================================================================
ALTER TABLE public.entidades ENABLE ROW LEVEL SECURITY;

-- Liberamos a LEITURA padrão para que o frontend possa renderizar as listas
CREATE POLICY "Leitura Proprietario" 
ON public.entidades FOR SELECT 
TO authenticated 
USING (user_id = auth.uid());


-- =========================================================================
-- 4. RPC: UPSERT (CRIAR/ATUALIZAR) SEGURO
-- =========================================================================
CREATE OR REPLACE FUNCTION public.upsert_entidade_rpc(p_payload jsonb)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER -- Permite a função executar as lógicas ignorando bloqueios superficiais, garantindo que ela gerencie a segurança
SET search_path = public
AS $$
DECLARE
    v_id bigint;
    v_user_id uuid := auth.uid();
    v_nome text;
    v_cpf text;
    v_email text;
    v_tipo text;
    v_status text;
BEGIN
    -- 1. Trava de Segurança (Auth)
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Acesso negado. Sessão inválida ou expirada.';
    END IF;

    -- 2. Limpeza e Sanitização Primitiva de Dados
    v_nome := trim(p_payload->>'nome_completo');
    v_cpf := regexp_replace(p_payload->>'cpf', '\D', '', 'g'); -- Remove tudo que não for número do CPF
    v_email := lower(trim(p_payload->>'email'));
    v_tipo := lower(trim(p_payload->>'tipo_entidade'));
    v_status := lower(trim(p_payload->>'status_entidade'));

    -- 3. Validações Manuais
    IF v_nome IS NULL OR length(v_nome) = 0 THEN
        RAISE EXCEPTION 'Nome completo é obrigatório.';
    END IF;

    IF v_tipo NOT IN ('cliente', 'fornecedor', 'colaborador') THEN
        v_tipo := 'cliente'; -- Fallback (Plano B) em caso de lixo
    END IF;

    IF v_status NOT IN ('ativo', 'inativo') THEN
        v_status := 'ativo';
    END IF;

    -- 4. Roteamento: INSERT ou UPDATE?
    IF (p_payload->>'id') IS NOT NULL AND (p_payload->>'id') <> '' THEN
        -- CAMINHO UPDATE
        v_id := (p_payload->>'id')::bigint;
        
        -- Checagem Dupla: A entidade existe E pertence a quem está pedindo?
        IF NOT EXISTS (SELECT 1 FROM public.entidades WHERE id = v_id AND user_id = v_user_id) THEN
            RAISE EXCEPTION 'Entidade não encontrada ou violação de propriedade de dados.';
        END IF;

        UPDATE public.entidades SET
            nome_completo = v_nome,
            cpf = v_cpf,
            data_nascimento = NULLIF(p_payload->>'data_nascimento', '')::date,
            email = NULLIF(v_email, ''),
            telefone = p_payload->>'telefone',
            tipo_entidade = v_tipo,
            status_entidade = v_status,
            cep = p_payload->>'cep',
            logradouro = p_payload->>'logradouro',
            numero = p_payload->>'numero',
            bairro = p_payload->>'bairro',
            cidade = p_payload->>'cidade',
            estado = upper(p_payload->>'estado'),
            url_foto_avatar = p_payload->>'url_foto_avatar',
            codigo_barras_carteirinha = p_payload->>'codigo_barras_carteirinha'
        WHERE id = v_id AND user_id = v_user_id;

    ELSE
        -- CAMINHO INSERT
        INSERT INTO public.entidades (
            user_id, nome_completo, cpf, data_nascimento, email, telefone,
            tipo_entidade, status_entidade, cep, logradouro, numero, bairro,
            cidade, estado, url_foto_avatar, codigo_barras_carteirinha
        ) VALUES (
            v_user_id, v_nome, v_cpf, NULLIF(p_payload->>'data_nascimento', '')::date,
            NULLIF(v_email, ''), p_payload->>'telefone', v_tipo, v_status,
            p_payload->>'cep', p_payload->>'logradouro', p_payload->>'numero',
            p_payload->>'bairro', p_payload->>'cidade', upper(p_payload->>'estado'),
            p_payload->>'url_foto_avatar', p_payload->>'codigo_barras_carteirinha'
        ) RETURNING id INTO v_id;
    END IF;

    -- Retorna o ID (Criado ou Atualizado) para o Frontend, se ele precisar usar
    RETURN v_id;
END;
$$;


-- =========================================================================
-- 5. RPC: DELEÇÃO EM MASSA SEGURA
-- =========================================================================
CREATE OR REPLACE FUNCTION public.delete_entidades_rpc(p_ids bigint[])
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id uuid := auth.uid();
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Acesso negado. Sessão inválida.';
    END IF;

    -- Só deleta SE o ID da entidade estiver na lista AND pertencer ao usuário logado
    DELETE FROM public.entidades 
    WHERE id = ANY(p_ids) AND user_id = v_user_id;
END;
$$;


-- =========================================================================
-- 6. TRIGGER DE SINCRONIZAÇÃO DE USUÁRIOS
-- =========================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Cria um perfil básico na tabela de entidades quando um usuário se cadastra
    INSERT INTO public.entidades (
        user_id, 
        nome_completo, 
        url_foto_avatar
    )
    VALUES (
        new.id,
        coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'Usuário ERP'), 
        new.raw_user_meta_data->>'avatar_url'
    );
    RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW 
    EXECUTE FUNCTION public.handle_new_user();
```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# entidades/entidades.css
```
/* ==========================================
   CSS ESPECÍFICO - MÓDULO DE ENTIDADES 
============================================= */

/* Exemplo: Container do Grid de Entidades */
#ent-lista-grid {
    transition: all 0.3s ease-in-out;
}

/* O dropzone genérico está no estilo principal. Aqui podemos sobrescrever se necessário */
#ent-drop-foto.dragover {
    border-color: #006c45; 
    background-color: #ecfdf5; 
    transform: scale(1.02);
}

/* Ajustes de scroll suave na área de listagem */
#ent-painel-listagem {
    scroll-behavior: smooth;
}

```

🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# entidades/entidades.js
```
// ==========================================
// MÓDULO DE ENTIDADES (entidades/entidades.js)
// ==========================================

let ent_paginaAtual = 1;
const ent_itensPorPagina = 10;
let ent_totalRegistros = 0;

/**
 * FUNÇÃO DE SEGURANÇA: Previne ataques de XSS (Cross-Site Scripting)
 * Transforma caracteres especiais de HTML em texto inofensivo antes de jogar na tela.
 */
function sanitizarEntrada(texto) {
    if (!texto) return '';
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Função de inicialização exclusiva deste módulo.
 */
function ent_init() {
    ent_loadDashboard();
    ent_loadEntidades();
    ent_configurarDropZone('ent-drop-foto', 'ent-f-foto', 'ent-nome-foto');
}

// O EventListener aguarda o DOM carregar e usa a função do navbar.js para checar a sessão
document.addEventListener('DOMContentLoaded', async () => {
    if (typeof verificarLogin === 'function') {
        const session = await verificarLogin(); 
        if (session) {
            ent_init();
        }
    } else {
        console.error("Erro Crítico: Função verificarLogin não encontrada. Verifique os imports globais.");
    }
});

// ==========================================
// UPLOAD E ARQUIVOS
// ==========================================
function ent_configurarDropZone(dropId, inputId, txtId) {
    const dropZone = document.getElementById(dropId);
    const inputEl  = document.getElementById(inputId);
    if (!dropZone || !inputEl) return;
    
    dropZone.addEventListener('dragover',  e => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', e => { e.preventDefault(); dropZone.classList.remove('dragover'); });
    dropZone.addEventListener('drop', e => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files?.length > 0) {
            inputEl.files = e.dataTransfer.files;
            ent_mostrarNomeArquivo(inputEl, txtId);
        }
    });
}

function ent_mostrarNomeArquivo(input, idCampoTexto) {
    const campoTexto = document.getElementById(idCampoTexto);
    if (input.files?.length > 0) {
        campoTexto.style.display = 'inline-flex';
        campoTexto.innerHTML = `<span class="material-symbols-outlined text-sm">verified</span> ${sanitizarEntrada(input.files[0].name)}`;
    } else {
        campoTexto.style.display = 'none';
        campoTexto.innerHTML = '';
    }
}

// ==========================================
// INTEGRAÇÃO DE API EXTERNA (VIA CEP)
// ==========================================
async function ent_buscarCEP(cep) {
    const limpo = cep.replace(/\D/g,'');
    if (limpo.length !== 8) return;
    try {
        const res  = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
        const data = await res.json();
        if (!data.erro) {
            document.getElementById('ent-f-logradouro').value = data.logradouro;
            document.getElementById('ent-f-bairro').value     = data.bairro;
            document.getElementById('ent-f-cidade').value     = data.localidade;
            document.getElementById('ent-f-estado').value     = data.uf;
            document.getElementById('ent-f-numero').focus();
        }
    } catch(e) { console.error("Erro ao buscar CEP", e); }
}

// ==========================================
// ESTATÍSTICAS (DASHBOARD)
// ==========================================
async function ent_loadDashboard() {
    const { data, error } = await _supabase.from('entidades').select('tipo_entidade,status_entidade');
    if (error || !data) return;
    
    let clientes = 0, fornecedores = 0, inativos = 0;
    data.forEach(e => {
        if (e.status_entidade === 'inativo') inativos++;
        if (e.tipo_entidade === 'cliente')   clientes++;
        if (e.tipo_entidade === 'fornecedor') fornecedores++;
    });
    
    document.getElementById('ent-dash-clientes').innerText    = clientes;
    document.getElementById('ent-dash-fornecedores').innerText = fornecedores;
    document.getElementById('ent-dash-inativos').innerText    = inativos;
}

// ==========================================
// CRUD SEGURO VIA RPC (BACKEND)
// ==========================================

/**
 * Captura os dados do formulário e envia para a RPC de segurança (upsert_entidade_rpc)
 */
async function ent_salvarEntidade() {
    const btn = document.getElementById('ent-btn-salvar');
    btn.disabled = true; btn.innerText = 'Gravando...';
    
    try {
        // Coleta dos dados do formulário
        const id         = document.getElementById('ent-f-editando-id').value;
        const nome       = document.getElementById('ent-f-nome').value;
        const cpf        = document.getElementById('ent-f-cpf').value;
        const nascimento = document.getElementById('ent-f-nascimento').value;
        const email      = document.getElementById('ent-f-email').value;
        const telefone   = document.getElementById('ent-f-telefone').value;
        const tipo       = document.getElementById('ent-f-tipo-entidade').value;
        const status     = document.getElementById('ent-f-status').value;
        const cep        = document.getElementById('ent-f-cep').value;
        const logradouro = document.getElementById('ent-f-logradouro').value;
        const numero     = document.getElementById('ent-f-numero').value;
        const bairro     = document.getElementById('ent-f-bairro').value;
        const city       = document.getElementById('ent-f-cidade').value;
        const state      = document.getElementById('ent-f-estado').value;
        const fileFoto   = document.getElementById('ent-f-foto').files[0];
        
        // Coleta do campo novo
        const carteirinhaEl = document.getElementById('ent-f-carteirinha');
        const carteirinhaVal = carteirinhaEl ? carteirinhaEl.value : '';

        // Validação Frontend Mínima (A verdadeira está no backend)
        if (!nome) throw new Error("O Nome Completo é obrigatório.");

        let fotoUrlFinal = null;
        if (fileFoto) {
            // SEGURANÇA (Regra 5): Bloqueia arquivos maiores que 2MB no Frontend
            const limiteMB = 2 * 1024 * 1024;
            if (fileFoto.size > limiteMB) {
                throw new Error("O arquivo excede o limite de 2MB estabelecido por segurança.");
            }

            const fileName = `avatar_${Date.now()}_${fileFoto.name}`;
            const { error: uploadError } = await _supabase.storage.from('comprovantes').upload(`public/${fileName}`, fileFoto);
            if (!uploadError) {
                fotoUrlFinal = _supabase.storage.from('comprovantes').getPublicUrl(`public/${fileName}`).data.publicUrl;
            }
        }

        // Construção do Payload JSON para a Função RPC no Banco de Dados
        const payload = {
            id: id || null,
            nome_completo: nome,
            cpf: cpf,
            data_nascimento: nascimento,
            email: email,
            telefone: telefone,
            tipo_entidade: tipo,
            status_entidade: status,
            cep: cep,
            logradouro: logradouro,
            numero: numero,
            bairro: bairro,
            cidade: city,
            estado: state,
            url_foto_avatar: fotoUrlFinal,
            codigo_barras_carteirinha: carteirinhaVal
        };

        // Envia os dados para a função segura no Supabase
        const { data: rpcData, error: rpcError } = await _supabase.rpc('upsert_entidade_rpc', {
            p_payload: payload
        });

        if (rpcError) throw rpcError;
        
        alert("Operação realizada com sucesso pelo servidor de banco de dados.");

        // Atualiza a tela após salvar
        ent_cancelarEdicao();
        ent_loadDashboard();
        ent_loadEntidades();
        ent_alternarSubAba('listagem');

    } catch(error) {
        alert(error.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<span class="material-symbols-outlined">save</span> Confirmar Registro';
    }
}

/**
 * Exclui múltiplos registros enviando os IDs para a RPC segura.
 */
async function ent_excluirSelecionados() {
    // Busca os checkboxes marcados e converte os valores (IDs) para Números (Inteiros)
    const ids = Array.from(document.querySelectorAll('.ent-check:checked')).map(cb => parseInt(cb.value));
    
    if (ids.length === 0) return alert("Selecione registros para excluir.");
    
    if (confirm(`Confirmar exclusão de ${ids.length} registro(s)?`)) {
        // Envia o Array de Inteiros para o Backend realizar o Delete seguro
        const { error } = await _supabase.rpc('delete_entidades_rpc', { p_ids: ids });
        
        if (!error) { 
            alert("Registros excluídos com segurança pelo servidor."); 
            ent_paginaAtual = 1; 
            ent_loadDashboard(); 
            ent_loadEntidades(); 
        } else { 
            alert("Erro: " + error.message); 
        }
    }
}

// ==========================================
// LEITURA E PAGINAÇÃO (READ)
// ==========================================
async function ent_loadEntidades() {
    const busca = document.getElementById('ent-filtro-busca').value;
    const tipo  = document.getElementById('ent-filtro-tipo').value;

    let countQuery = _supabase.from('entidades').select('*', {count:'exact', head:true});
    if (busca) countQuery = countQuery.ilike('nome_completo', `%${busca}%`);
    if (tipo)  countQuery = countQuery.eq('tipo_entidade', tipo);
    
    const { count } = await countQuery;
    ent_totalRegistros = count || 0;

    let query = _supabase.from('entidades').select('*').order('nome_completo', {ascending:true});
    if (busca) query = query.ilike('nome_completo', `%${busca}%`);
    if (tipo)  query = query.eq('tipo_entidade', tipo);
    
    const start = (ent_paginaAtual - 1) * ent_itensPorPagina;
    query = query.range(start, start + ent_itensPorPagina - 1);

    const { data, error } = await query;
    if (error) return;

    const totalPaginas = Math.ceil(ent_totalRegistros / ent_itensPorPagina);
    document.getElementById('ent-page-indicator').innerText    = `Página ${ent_paginaAtual} de ${totalPaginas || 1}`;
    document.getElementById('ent-pagination-info').innerText   = `Mostrando ${data.length} de ${ent_totalRegistros}`;
    document.getElementById('ent-btn-anterior').disabled       = ent_paginaAtual === 1;
    document.getElementById('ent-btn-proximo').disabled        = ent_paginaAtual >= totalPaginas;

    const grid = document.getElementById('ent-lista-grid');
    if (data.length === 0) {
        grid.innerHTML = '<div class="col-span-full py-20 text-center text-slate-400 font-bold">Nenhum registro encontrado.</div>';
        return;
    }

    grid.innerHTML = data.map(e => {
        const statusColor  = e.status_entidade === 'ativo' ? 'bg-emerald-500' : 'bg-slate-300';
        
        // SEGURANÇA: Aplicação do sanitizador nos dados que vêm do banco e vão para o HTML
        const safeNome     = sanitizarEntrada(e.nome_completo);
        const safeEmail    = sanitizarEntrada(e.email || 'Sem e-mail');
        const safeTel      = sanitizarEntrada(e.telefone || '---');
        const safeTipo     = sanitizarEntrada(e.tipo_entidade);
        const safeCart     = e.codigo_barras_carteirinha ? `<div class="mt-2 inline-flex items-center gap-1 bg-slate-100 text-slate-500 text-[9px] px-2 py-1 rounded font-mono"><i class="fas fa-barcode"></i> ${sanitizarEntrada(e.codigo_barras_carteirinha)}</div>` : '';
        
        const imgUrl       = e.url_foto_avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(e.nome_completo);
        const whatsappUrl  = `https://wa.me/${(e.telefone||'').replace(/\D/g,'')}`;
        const mailtoUrl    = `mailto:${e.email}`;

        return `
        <div class="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-5 shadow-sm hover:shadow-premium transition-all duration-300 flex flex-col items-center group relative">
          <div class="absolute top-3 left-3 z-10">
            <input type="checkbox" class="ent-check w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary bg-white dark:bg-slate-800" value="${e.id}">
          </div>
          <div class="relative mb-4">
            <img src="${imgUrl}" class="w-20 h-20 rounded-2xl object-cover border-4 border-slate-50 dark:border-slate-700 shadow-sm">
            <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-slate-800 ${statusColor}"></div>
          </div>
          <div class="text-center w-full mb-4">
            <span class="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-2">${safeTipo}</span>
            <h4 class="font-bold text-slate-900 dark:text-white truncate px-2 mb-1" title="${safeNome}">${safeNome}</h4>
            <p class="text-xs text-slate-400 truncate px-4">${safeEmail}</p>
            <p class="text-[11px] text-slate-500 mt-1 font-mono-sm">${safeTel}</p>
            ${safeCart}
          </div>
          <div class="flex items-center gap-3 mt-auto pt-4 border-t border-slate-50 dark:border-slate-700 w-full justify-center">
            <button onclick="window.open('${whatsappUrl}','_blank')" class="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center hover:scale-110 transition-transform shadow-sm" title="WhatsApp">
              <span class="material-symbols-outlined text-lg">chat</span>
            </button>
            <a href="${mailtoUrl}" class="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:scale-110 transition-transform shadow-sm" title="E-mail">
              <span class="material-symbols-outlined text-lg">mail</span>
            </a>
            <button onclick="ent_prepararEdicao('${e.id}')" class="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm" title="Editar">
              <span class="material-symbols-outlined text-lg">edit_square</span>
            </button>
          </div>
        </div>`;
    }).join('');
}

// ==========================================
// CONTROLES DE INTERFACE E FORMULÁRIO
// ==========================================
async function ent_prepararEdicao(id) {
    const { data: e } = await _supabase.from('entidades').select('*').eq('id', id).single();
    if (e) {
        document.getElementById('ent-f-editando-id').value   = e.id;
        document.getElementById('ent-f-nome').value          = e.nome_completo;
        document.getElementById('ent-f-cpf').value           = e.cpf || '';
        document.getElementById('ent-f-nascimento').value    = e.data_nascimento || '';
        document.getElementById('ent-f-email').value         = e.email || '';
        document.getElementById('ent-f-telefone').value      = e.telefone || '';
        document.getElementById('ent-f-tipo-entidade').value = e.tipo_entidade;
        document.getElementById('ent-f-status').value        = e.status_entidade;
        document.getElementById('ent-f-cep').value           = e.cep || '';
        document.getElementById('ent-f-logradouro').value    = e.logradouro || '';
        document.getElementById('ent-f-numero').value        = e.numero || '';
        document.getElementById('ent-f-bairro').value        = e.bairro || '';
        document.getElementById('ent-f-cidade').value        = e.cidade || '';
        document.getElementById('ent-f-estado').value        = e.estado || '';
        document.getElementById('ent-f-foto').value          = '';
        
        // Povoando o novo campo
        const inputCart = document.getElementById('ent-f-carteirinha');
        if (inputCart) inputCart.value = e.codigo_barras_carteirinha || '';

        const fotoTxt = document.getElementById('ent-nome-foto');
        if (e.url_foto_avatar) { 
            fotoTxt.style.display='inline-flex'; 
            fotoTxt.innerHTML='<span class="material-symbols-outlined text-sm">image</span> Mídia anexada'; 
        } else { 
            fotoTxt.style.display='none'; 
        }

        document.getElementById('ent-btn-salvar').innerHTML = '<span class="material-symbols-outlined">sync</span> Atualizar Registro';
        document.getElementById('ent-btn-cancelar').classList.remove('hidden');

        ent_alternarSubAba('formulario');
    }
}

function ent_cancelarEdicao() {
    document.getElementById('ent-f-editando-id').value = '';
    document.getElementById('ent-btn-salvar').innerHTML = '<span class="material-symbols-outlined">save</span> Confirmar Registro';
    document.getElementById('ent-btn-cancelar').classList.add('hidden');

    document.querySelectorAll('#ent-painel-formulario input, #ent-painel-formulario select').forEach(i => {
        if (i.type !== 'hidden') i.value = '';
    });
    document.getElementById('ent-f-tipo-entidade').value = 'cliente';
    document.getElementById('ent-f-status').value        = 'ativo';
    document.getElementById('ent-nome-foto').style.display = 'none';
    document.getElementById('ent-nome-foto').innerHTML   = '';

    ent_alternarSubAba('listagem');
}

function ent_alternarSubAba(subAba) {
    const painelForm  = document.getElementById('ent-painel-formulario');
    const painelLista = document.getElementById('ent-painel-listagem');
    const btnForm     = document.getElementById('ent-btn-formulario');
    const btnLista    = document.getElementById('ent-btn-listagem');

    const ativo   = ['bg-primary','text-white','hover:brightness-105'];
    const inativo = ['bg-slate-200','text-slate-700','hover:bg-slate-300'];

    btnForm.classList.remove(...ativo,...inativo);
    btnLista.classList.remove(...ativo,...inativo);

    if (subAba === 'formulario') {
        painelForm.classList.remove('hidden');
        painelLista.classList.add('hidden');
        btnForm.classList.add(...ativo);
        btnLista.classList.add(...inativo);
    } else {
        painelForm.classList.add('hidden');
        painelLista.classList.remove('hidden');
        btnLista.classList.add(...ativo);
        btnForm.classList.add(...inativo);
    }
}

function ent_mudarPagina(direcao) {
    const nova = ent_paginaAtual + direcao;
    const total = Math.ceil(ent_totalRegistros / ent_itensPorPagina);
    if (nova >= 1 && (ent_totalRegistros === 0 || nova <= total)) {
        ent_paginaAtual = nova;
        ent_loadEntidades();
    }
}

function ent_toggleTodosChecks(source) {
    document.querySelectorAll('.ent-check').forEach(cb => cb.checked = source.checked);
}

function ent_limparFiltros() {
    document.getElementById('ent-filtro-busca').value = '';
    document.getElementById('ent-filtro-tipo').value  = '';
    ent_paginaAtual = 1;
    ent_loadEntidades();
}

function ent_gerarPDF() {
    alert("Preparando PDF das entidades filtradas para download.");
}

```


🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥

# entidades/entidades.html
```
<!DOCTYPE html>
<html class="light" lang="pt-br">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Entidades - ERP_ABP</title>

    <!-- Fontes e Ícones -->
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
    
    <!-- CSS Modular deste Módulo (Caminho Local) -->
    <link rel="stylesheet" href="./entidades.css"/>

    <!-- Biblioteca para Leitura de Códigos de Barras/QR -->
    <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>

    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script id="tailwind-config">
        tailwind.config = {
            darkMode:"class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#006c45",
                        "primary-container": "#3ecf8e"
                    }
                }
            }
        }
    </script>

    <!-- Scripts Globais e Supabase (Caminho Global) -->
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="../global/supabase_config.js"></script>
</head>

<body class="bg-[#F8FAFC] dark:bg-[#0f172a] text-slate-900 dark:text-slate-200 font-sans min-h-screen transition-colors duration-300">

    <!-- CONTAINER ONDE A NAVBAR SERÁ INJETADA PELO JAVASCRIPT GLOBAL -->
    <div id="navbar-container"></div>
    
    <main class="pt-24 px-4 sm:px-8 pb-12">
        <!-- MÓDULO: ENTIDADES -->
        <div class="fade-in max-w-7xl mx-auto px-4" id="aba-entidades">
            
            <!-- Dashboard Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div class="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-slate-500 dark:text-slate-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-1">Total de Clientes</p>
                            <h3 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white" id="ent-dash-clientes">0</h3>
                        </div>
                        <div class="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center">
                            <span class="material-symbols-outlined text-2xl sm:text-3xl">person_search</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-slate-500 dark:text-slate-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-1">Fornecedores</p>
                            <h3 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white" id="ent-dash-fornecedores">0</h3>
                        </div>
                        <div class="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
                            <span class="material-symbols-outlined text-2xl sm:text-3xl">local_shipping</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-slate-500 dark:text-slate-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-1">Entidades Inativas</p>
                            <h3 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white" id="ent-dash-inativos">0</h3>
                        </div>
                        <div class="w-12 h-12 sm:w-14 sm:h-14 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center">
                            <span class="material-symbols-outlined text-2xl sm:text-3xl">person_off</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sub-navegação -->
            <div class="flex gap-4 mb-6 flex-wrap">
                <button onclick="ent_alternarSubAba('listagem')" id="ent-btn-listagem" class="flex-1 min-w-[150px] bg-primary text-white hover:brightness-105 font-bold py-3 rounded-xl transition shadow flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined text-base">groups</span> Ver Entidades
                </button>
                <button onclick="ent_alternarSubAba('formulario')" id="ent-btn-formulario" class="flex-1 min-w-[150px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 font-bold py-3 rounded-xl transition shadow flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined text-base">person_add</span> Nova Entidade
                </button>
            </div>

            <!-- SUB-PAINEL: FORMULÁRIO (Atualizado com a sua diretriz) -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-10 hidden" id="ent-painel-formulario">
                <div class="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                        <span class="material-symbols-outlined text-primary text-2xl">edit_document</span>
                    </div>
                    <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Registro de Informações da Entidade</h3>
                </div>
                
                <input id="ent-f-editando-id" type="hidden"/>
                
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
                    <div class="md:col-span-2">
                        <label class="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-widest">Nome Completo / Razão Social *</label>
                        <input class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 outline-none transition-all dark:text-white focus:ring-2 focus:ring-primary/20" id="ent-f-nome" placeholder="Ex: João da Silva ou Empresa Ltda" type="text"/>
                    </div>
                    <div>
                        <label class="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-widest">CPF / CNPJ</label>
                        <input class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 outline-none transition-all dark:text-white focus:ring-2 focus:ring-primary/20" id="ent-f-cpf" placeholder="000.000.000-00" type="text"/>
                    </div>
                    <div>
                        <label class="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-widest">Data Nasc. / Fundação</label>
                        <input class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 outline-none transition-all dark:text-white focus:ring-2 focus:ring-primary/20" id="ent-f-nascimento" type="date"/>
                    </div>
                    <div class="md:col-span-2">
                        <label class="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-widest">E-mail Corporativo</label>
                        <input class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 outline-none transition-all dark:text-white focus:ring-2 focus:ring-primary/20" id="ent-f-email" placeholder="exemplo@empresa.com" type="email"/>
                    </div>
                    <div>
                        <label class="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-widest">Celular / Telefone</label>
                        <input class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 outline-none transition-all dark:text-white focus:ring-2 focus:ring-primary/20" id="ent-f-telefone" placeholder="(00) 00000-0000" type="text"/>
                    </div>
                    
                    <!-- NOVO CAMPO ADICIONADO: Carteirinha -->
                    <div>
                        <label class="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-widest">Cód. Carteirinha</label>
                        <input class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 outline-none transition-all dark:text-white focus:ring-2 focus:ring-primary/20" id="ent-f-carteirinha" placeholder="Bipar código..." type="text"/>
                    </div>

                    <div class="grid grid-cols-2 gap-4 md:col-span-2">
                        <div>
                            <label class="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-widest">Categoria</label>
                            <select class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3.5 outline-none appearance-none font-bold text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary/20" id="ent-f-tipo-entidade">
                                <option value="cliente">Cliente</option>
                                <option value="fornecedor">Fornecedor</option>
                                <option value="colaborador">Colaborador</option>
                            </select>
                        </div>
                        <div>
                            <label class="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-widest">Status</label>
                            <select class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3.5 outline-none appearance-none font-bold text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary/20" id="ent-f-status">
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-widest">CEP</label>
                        <input class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 outline-none transition-all dark:text-white focus:ring-2 focus:ring-primary/20" id="ent-f-cep" onblur="ent_buscarCEP(this.value)" placeholder="00000-000" type="text"/>
                    </div>
                    <div class="md:col-span-2">
                        <label class="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-widest">Endereço</label>
                        <input class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 outline-none transition-all dark:text-white focus:ring-2 focus:ring-primary/20" id="ent-f-logradouro" placeholder="Av. Exemplo, 123" type="text"/>
                    </div>
                    <div>
                        <label class="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-widest">Número</label>
                        <input class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 outline-none transition-all dark:text-white focus:ring-2 focus:ring-primary/20" id="ent-f-numero" placeholder="Nº ou Complemento" type="text"/>
                    </div>
                    <div>
                        <label class="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-widest">Bairro</label>
                        <input class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 outline-none transition-all dark:text-white focus:ring-2 focus:ring-primary/20" id="ent-f-bairro" placeholder="Bairro Central" type="text"/>
                    </div>
                    <div class="md:col-span-2">
                        <label class="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-widest">Cidade</label>
                        <input class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 outline-none transition-all dark:text-white focus:ring-2 focus:ring-primary/20" id="ent-f-cidade" placeholder="Nome da Cidade" type="text"/>
                    </div>
                    <div>
                        <label class="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-widest">Estado (UF)</label>
                        <input class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 outline-none transition-all dark:text-white focus:ring-2 focus:ring-primary/20" id="ent-f-estado" maxlength="2" placeholder="UF" type="text"/>
                    </div>
                    <div class="md:col-span-4">
                        <label class="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-4 block uppercase tracking-widest">Mídia de Identificação</label>
                        <div class="border-2 dashed border-slate-300 dark:border-slate-600 rounded-2xl p-8 text-center cursor-pointer bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition" id="ent-drop-foto" onclick="document.getElementById('ent-f-foto').click()">
                            <div class="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                <span class="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                            </div>
                            <p class="font-bold text-slate-900 dark:text-white text-lg">Arraste &amp; Solte</p>
                            <p class="text-xs text-slate-400 mt-2">Formatos seguros permitidos: JPG, PNG. Máx 2MB.</p>
                            <input accept="image/*" class="hidden" id="ent-f-foto" onchange="ent_mostrarNomeArquivo(this,'ent-nome-foto')" type="file"/>
                            <p class="font-mono text-sm text-primary mt-6 font-bold flex items-center justify-center gap-2 bg-primary/5 py-2 px-4 rounded-lg inline-flex" id="ent-nome-foto" style="display:none;"></p>
                        </div>
                    </div>
                </div>
                
                <div class="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                    <button class="flex-1 bg-primary text-white font-bold py-4 rounded-xl hover:brightness-105 transition shadow-lg flex items-center justify-center gap-3" id="ent-btn-salvar" onclick="ent_salvarEntidade()">
                        <span class="material-symbols-outlined">save</span> Confirmar Registro
                    </button>
                    <button class="hidden w-full sm:w-auto px-12 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold py-4 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition" id="ent-btn-cancelar" onclick="ent_cancelarEdicao()">
                        Abortar
                    </button>
                </div>
            </div>

            <!-- SUB-PAINEL: LISTAGEM -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden" id="ent-painel-listagem">
                <div class="px-6 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                    <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <span class="material-symbols-outlined text-primary">dataset</span>
                    </div>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white">LISTA DE ENTIDADES</h3>
                </div>
                
                <!-- Filtros -->
                <div class="px-6 py-6 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row gap-6 items-end">
                    <div class="flex-1 w-full">
                        <label class="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-widest">Busca de Termos</label>
                        <div class="relative">
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">search</span>
                            <input class="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white" id="ent-filtro-busca" onkeyup="if(event.key==='Enter'){ent_paginaAtual=1;ent_loadEntidades();}" placeholder="Nome ou termo..." type="text"/>
                        </div>
                    </div>
                    <div class="w-full lg:w-56">
                        <label class="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-widest">Tipo de Perfil</label>
                        <select class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-primary/20" id="ent-filtro-tipo" onchange="ent_paginaAtual=1;ent_loadEntidades()">
                            <option value="">Todas</option>
                            <option value="cliente">Clientes</option>
                            <option value="fornecedor">Fornecedores</option>
                            <option value="colaborador">Colaboradores</option>
                        </select>
                    </div>
                    <div class="flex gap-2 w-full lg:w-auto">
                        <button class="flex-1 lg:flex-none bg-primary text-white px-8 py-3 rounded-xl font-bold hover:brightness-105 transition" onclick="ent_paginaAtual=1;ent_loadEntidades()">Aplicar</button>
                        <button class="flex-1 lg:flex-none bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-8 py-3 rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition" onclick="ent_limparFiltros()">Limpar</button>
                    </div>
                </div>
                
                <!-- Barra de seleção -->
                <div class="px-6 py-3 bg-primary/5 border-b border-primary/10 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <input class="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" id="ent-check-all" onclick="ent_toggleTodosChecks(this)" type="checkbox"/>
                        <label class="text-[10px] font-bold uppercase tracking-wider text-primary cursor-pointer" for="ent-check-all">Selecionar Todos</label>
                    </div>
                    <div class="flex items-center gap-3">
                        <button class="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2" onclick="ent_gerarPDF()">
                            <span class="material-symbols-outlined text-sm">picture_as_pdf</span> PDF
                        </button>
                        <button class="px-4 py-2 bg-red-50 text-red-600 font-bold text-xs rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2" onclick="ent_excluirSelecionados()">
                            <span class="material-symbols-outlined text-sm">delete</span> Excluir
                        </button>
                    </div>
                </div>
                
                <div class="px-6 py-2 text-[10px] font-bold uppercase text-slate-400" id="ent-pagination-info">Mostrando 0 de 0</div>
                
                <!-- Grid de cards -->
                <div class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="ent-lista-grid"></div>
                
                <!-- Paginação -->
                <div class="px-6 py-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold text-sm hover:bg-slate-200 disabled:opacity-30 transition" id="ent-btn-anterior" onclick="ent_mudarPagina(-1)">
                        <span class="material-symbols-outlined text-sm">chevron_left</span> Anterior
                    </button>
                    <div class="text-sm font-bold text-slate-400" id="ent-page-indicator">Página 1</div>
                    <button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold text-sm hover:bg-slate-200 disabled:opacity-30 transition" id="ent-btn-proximo" onclick="ent_mudarPagina(1)">
                        Próximo <span class="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>   
    </main>

    <!-- SCRIPTS GLOBAIS E LOCAIS DA PÁGINA -->
    <script src="../global/navbar.js"></script>
    <script src="./entidades.js"></script>
</body>
</html>

```
