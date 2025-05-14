#####################################################################################
####################### AUTOMAÇÃO GIT E GITHUB   ####################################
#####################################################################################
# Autor: AristidesBP | Função: Clonar e configurar repositório Git automaticamente
# Requisitos: Python 3, Git instalado ou permissões para instalar via terminal

#####################################################################################
###############        PASSO 1: 🧠 Importações (cabeçalho)    #######################
#####################################################################################
import os                     # Para interações com o sistema de arquivos
import subprocess             # Para executar comandos no terminal
import sys                    # Para encerramento do programa e detecção de SO
from pathlib import Path      # Para manipulação de caminhos multiplataforma

#####################################################################################
###############        PASSO 2: 🔁 Função para executar comandos    #################
#####################################################################################
def run(cmd, check=True):
    print(f"\n🛠️ Executando comando: {cmd}")  # Informa o comando em execução
    result = subprocess.run(cmd, shell=True, check=check, text=True)  # Executa no terminal
    return result

#####################################################################################
###############        PASSO 3: ✅ Verifica se o Git está instalado #################
#####################################################################################
def is_git_installed():
    try:
        subprocess.run(["git", "--version"], check=True, stdout=subprocess.DEVNULL)
        return True
    except subprocess.CalledProcessError:
        return False

#####################################################################################
########## PASSO 4: ⬇️ Instala o Git conforme o sistema detectado ###################
#####################################################################################
def install_git():
    if "com.termux" in os.environ.get("PREFIX", ""):
        print("📦 Ambiente Termux detectado. Instalando Git com pkg...")
        run("pkg update && pkg install -y git")
    elif sys.platform.startswith("linux"):
        print("📦 Instalando Git via apt...")
        run("sudo apt update && sudo apt install -y git")
    elif sys.platform.startswith("darwin"):
        print("📦 Instalando Git via Homebrew...")
        run("brew install git")
    elif sys.platform.startswith("win"):
        print("⚠️ Instalação automática no Windows não suportada. Acesse: https://git-scm.com")
        sys.exit(1)
    else:
        print("❌ Sistema operacional não suportado.")
        sys.exit(1)

#####################################################################################
###############        PASSO 5: 🧠 Função Principal ###############################
#####################################################################################
def main():
    # Verifica se o Git está instalado
    if not is_git_installed():
        print("🔍 Git não encontrado. Instalando...")
        install_git()

    # Solicita nome do usuário
    nome = input("👤 Digite seu nome: ").strip()
    if not nome:
        print("❌ Nome inválido!")
        sys.exit(1)

    # Solicita email do usuário
    email = input("📧 Digite seu email: ").strip()
    if not email:
        print("❌ Email inválido!")
        sys.exit(1)

    # Solicita URL do repositório Git
    repositorio_url = input("🌐 Digite a URL do repositório Git: ").strip()
    if not repositorio_url:
        print("❌ URL inválida!")
        sys.exit(1)

    # Solicita nome da pasta onde será clonado
    pasta = input("🗂️ Nome da pasta para o repositório: ").strip()
    if not pasta:
        print("❌ Nome da pasta inválido!")
        sys.exit(1)

    # Verifica se a pasta já existe
    if os.path.exists(pasta):
        print(f"🚫 Erro: A pasta '{pasta}' já existe e não está vazia. Escolha outro nome ou apague a pasta existente.")
        sys.exit(1)

    # Clona o repositório
    run(f"git clone {repositorio_url} {pasta}")

    # Acessa a pasta clonada
    os.chdir(pasta)

    # Configura nome e email no Git local
    run(f"git config user.name \"{nome}\"")
    run(f"git config user.email \"{email}\"")

    print("\n✅ Tudo pronto! Repositório clonado e configurado com sucesso!")

#####################################################################################
###############        PASSO 6: Executa se for chamado diretamente ##################
#####################################################################################
if __name__ == "__main__":
    main()

