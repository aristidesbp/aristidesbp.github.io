import subprocess
import os
import glob

def run_command(command, shell=True):
    try:
        result = subprocess.run(command, shell=shell, check=True, capture_output=True, text=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError:
        return None

def configurar_git():
    if not run_command("git --version"):
        print("Erro: Git não está instalado.")
        return

    # 1. Exibir configurações atuais
    configs = run_command("git config --list")
    print("\n--- Configurações Atuais ---")
    print(configs if configs else "Nenhuma configuração encontrada.")
    
    # 2. Exibir conteúdo das chaves SSH encontradas
    ssh_dir = os.path.expanduser("~/.ssh")
    print("\n--- Chaves SSH Encontradas em ~/.ssh ---")
    if os.path.exists(ssh_dir):
        chaves = glob.glob(os.path.join(ssh_dir, "*.pub"))
        for chave in chaves:
            with open(chave, 'r') as f:
                print(f"Arquivo: {os.path.basename(chave)}")
                print(f"Conteúdo: {f.read().strip()}")
                print("-" * 20)
    else:
        print("Diretório ~/.ssh não encontrado.")

    # 3. Menu de Opções
    while True:
        print("\nO que deseja fazer?")
        print("1. Alterar Nome de Usuário")
        print("2. Alterar E-mail")
        print("3. Adicionar diretório atual como seguro")
        print("4. Registrar chave SSH")
        print("5. Sair")
        
        escolha = input("\nEscolha uma opção (1-5): ")

        if escolha == '1':
            nome = input("Novo nome: ")
            run_command(f'git config --global user.name "{nome}"')
            print("Nome atualizado.")
        elif escolha == '2':
            email = input("Novo email: ")
            run_command(f'git config --global user.email "{email}"')
            print("Email atualizado.")
        elif escolha == '3':
            pwd = os.getcwd()
            run_command(f'git config --global --add safe.directory "{pwd}"')
            print(f"Diretório {pwd} adicionado.")
        elif escolha == '4':
            caminho = input("Caminho completo da chave (sem a extensão .pub): ")
            caminho_exp = os.path.expanduser(caminho)
            if os.path.exists(caminho_exp):
                os.system(f'eval "$(ssh-agent -s)" && ssh-add {caminho_exp}')
                print("Chave registrada no agente.")
            else:
                print("Erro: Arquivo de chave não encontrado.")
        elif escolha == '5':
            break
        else:
            print("Opção inválida.")

if __name__ == "__main__":
    configurar_git()
