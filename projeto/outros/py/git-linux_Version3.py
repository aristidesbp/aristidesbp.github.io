import os
import subprocess
import sys
from datetime import datetime

def run(cmd, check=True):
    print(f"\n🛠️ Executando comando: {cmd}")
    try:
        result = subprocess.run(cmd, shell=True, check=check, text=True)
        return result
    except subprocess.CalledProcessError as error:
        print(f"❌ Erro ao executar o comando: {cmd}")
        print(f"Detalhes: {error}")
        sys.exit(1)

def is_git_installed():
    try:
        subprocess.run(["git", "--version"], check=True, stdout=subprocess.DEVNULL)
        return True
    except subprocess.CalledProcessError:
        return False

def install_git():
    if sys.platform.startswith("linux"):
        print("📦 Instalando Git via apt...")
        run("sudo apt update && sudo apt install -y git")
    else:
        print("❌ Este script é específico para Linux. Saindo...")
        sys.exit(1)

def setup_git_config(nome, email):
    print("\n✅ Configurando o Git...")
    run(f"git config --global user.name \"{nome}\"")
    run(f"git config --global user.email \"{email}\"")
    run("git config --global init.defaultBranch main")
    run("git config --global core.editor nano")
    run("git config --list")

    ssh_key_path = os.path.expanduser("~/.ssh/id_rsa")
    if os.path.exists(ssh_key_path):
        print(f"⚠️ A chave SSH '{ssh_key_path}' já existe.")
        overwrite = input("Deseja sobrescrevê-la? (y/n): ").strip().lower()
        if overwrite != "y":
            print("✅ Usando a chave SSH existente.")
            run("ls ~/.ssh/")
            run("cat ~/.ssh/id_rsa.pub")
            return

    print("🔑 Gerando nova chave SSH...")
    run("ssh-keygen -t rsa -b 2048 -q -N \"\" -f ~/.ssh/id_rsa")
    run("ls ~/.ssh/")
    ssh_key = run("cat ~/.ssh/id_rsa.pub", check=False)
    print("\n🚨 Atenção! Adicione a chave SSH ao seu GitHub antes de prosseguir.")
    print("1. Copie a chave exibida acima.")
    print("2. Acesse: https://github.com/settings/keys")
    print("3. Clique em 'New SSH Key'.")
    print("4. Cole a chave e salve.")
    input("Pressione Enter após cadastrar a chave para continuar...")  # Aguarda confirmação

def configure_git_remote(repositorio_url):
    print("\n🌐 Configurando a URL remota para SSH...")
    ssh_url = repositorio_url.replace("https://github.com/", "git@github.com:")
    run(f"git remote set-url origin {ssh_url}")
    print(f"✅ URL remota configurada para: {ssh_url}")

def create_test_connection_file():
    file_path = "teste-conexao.txt"
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    mode = "a" if os.path.exists(file_path) else "w"
    with open(file_path, mode) as file:
        file.write(f"Conexão testada em: {now}\n")
    print(f"✅ Arquivo '{file_path}' atualizado com a data da conexão.")

def main():
    if not is_git_installed():
        print("🔍 Git não encontrado. Instalando...")
        install_git()

    nome = input("👤 Digite seu nome: ").strip()
    email = input("📧 Digite seu email: ").strip()
    repositorio_url = input("🌐 Digite a URL do repositório Git: ").strip()

    setup_git_config(nome, email)

    print("\n⏳ Inicializando o repositório Git...")
    run("git init")
    create_test_connection_file()

    print("\n🌐 Configurando a URL remota...")
    configure_git_remote(repositorio_url)

    print("\n📤 Realizando o push inicial para o GitHub...")
    try:
        run("git add .")
        run("git commit -m \"Teste de conexão com GitHub\"")
        run("git push -u origin main")
        print("\n🚀 Tudo pronto! Repositório configurado e sincronizado com sucesso.")
    except subprocess.CalledProcessError:
        print("\n❌ Erro ao realizar o push.")
        print("🚨 Certifique-se de que a chave SSH foi cadastrada no GitHub.")
        print("1. Acesse: https://github.com/settings/keys")
        print("2. Cadastre a chave exibida anteriormente.")
        print("3. Tente novamente.")

if __name__ == "__main__":
    main()