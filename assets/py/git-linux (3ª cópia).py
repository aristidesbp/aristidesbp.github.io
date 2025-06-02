import os
import subprocess
import sys
from datetime import datetime

def run(cmd, check=True):
    print(f"\n🛠️ Executando comando: {cmd}")
    result = subprocess.run(cmd, shell=True, check=check, text=True)
    return result

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
    run("cat ~/.ssh/id_rsa.pub")

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

    run(f"git init")
    create_test_connection_file()

    run("git add .")
    run("git commit -m \"Teste de conexão com GitHub\"")
    run(f"git remote add origin {repositorio_url}")
    run("git push -u origin main")

    print("\n🚀 Tudo pronto! Repositório configurado e sincronizado com sucesso.")

if __name__ == "__main__":
    main()
