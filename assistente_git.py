import hashlib
import os
import shutil
import subprocess
import sys


def executar_comando(comando, checar=True, capturar_saida=False):
    try:
        resultado = subprocess.run(
            comando, check=checar, text=True,
            capture_output=capturar_saida, shell=isinstance(comando, str)
        )
        return resultado
    except subprocess.CalledProcessError as e:
        return None


# --- SCRIPT 1: ORGANIZAR POR EXTENSÃO ---
def achatar_e_categorizar_por_tipo(pasta_origem, pasta_destino):
    print("\n[1/2] Executando organização por extensões...")
    arquivos_copiados = 0
    for pasta_atual, subpastas, arquivos in os.walk(pasta_origem):
        pasta_atual_abs = os.path.abspath(pasta_atual)
        if any(parte.startswith(".") for parte in pasta_atual_abs.split(os.sep)) or pasta_atual_abs.startswith(pasta_destino):
            continue
        for nome_arquivo in arquivos:
            if nome_arquivo in ["assistente_git.py", "organizar.py", "limpar_duplicados.py"] or nome_arquivo.startswith("."):
                continue
            caminho_origem = os.path.join(pasta_atual, nome_arquivo)
            nome_puro, extensao = os.path.splitext(nome_arquivo)
            nome_subpasta_tipo = extensao.replace(".", "").upper() if extensao else "SEM_EXTENSAO"
            caminho_pasta_tipo = os.path.join(pasta_destino, nome_subpasta_tipo)
            
            if not os.path.exists(caminho_pasta_tipo):
                os.makedirs(caminho_pasta_tipo)
                
            caminho_destino_final = os.path.join(caminho_pasta_tipo, nome_arquivo)
            contador = 1
            while os.path.exists(caminho_destino_final):
                novo_nome = f"{nome_puro}_{contador}{extensao}"
                caminho_destino_final = os.path.join(caminho_pasta_tipo, novo_nome)
                contador += 1
            try:
                shutil.copy2(caminho_origem, caminho_destino_final)
                arquivos_copiados += 1
            except Exception as erro:
                print(f"Erro ao copiar {nome_arquivo}: {erro}")
    print(f"-> Sucesso: {arquivos_copiados} arquivos organizados na pasta 'bkps'.")


# --- SCRIPT 2: LIMPAR DUPLICADOS ---
def calcular_hash(caminho_arquivo):
    hasher = hashlib.sha256()
    with open(caminho_arquivo, "rb") as f:
        while bloco := f.read(4096):
            hasher.update(bloco)
    return hasher.hexdigest()

def buscar_e_limpar_duplicados(pasta_origem):
    print("\n[2/2] Analisando arquivos em busca de conteúdo idêntico...")
    registro_hashes = {}
    for pasta_atual, subpastas, arquivos in os.walk(pasta_origem):
        pasta_atual_abs = os.path.abspath(pasta_atual)
        if any(parte.startswith(".") for parte in pasta_atual_abs.split(os.sep)):
            continue
        for nome_arquivo in arquivos:
            if nome_arquivo in ["assistente_git.py", "organizar.py", "limpar_duplicados.py"] or nome_arquivo.startswith("."):
                continue
            caminho_completo = os.path.join(pasta_atual, nome_arquivo)
            try:
                hash_arquivo = calcular_hash(caminho_completo)
                if hash_arquivo in registro_hashes:
                    registro_hashes[hash_arquivo].append(caminho_completo)
                else:
                    registro_hashes[hash_arquivo] = [caminho_completo]
            except:
                continue

    duplicatas = {h: c for h, c in registro_hashes.items() if len(c) > 1}
    if not duplicatas:
        print("-> Excelente! Nenhum arquivo idêntico encontrado.")
        return

    arquivos_para_deletar = []
    for hash_f, caminhos in duplicatas.items():
        for copia in caminhos[1:]:
            arquivos_para_deletar.append(copia)

    print(f"-> Encontrados {len(arquivos_para_deletar)} arquivos duplicados redundantes.")
    resposta = input("Deseja apagar essas duplicatas mantendo apenas os originais? (s/n): ").strip().lower()
    if resposta == 's':
        deletados = 0
        for caminho in arquivos_para_deletar:
            try:
                os.remove(caminho)
                deletados += 1
            except:
                pass
        print(f"-> Sucesso: {deletados} duplicatas removidas do armazenamento.")
    else:
        print("-> Remoção de duplicatas pulada.")


# --- FLUXO PRINCIPAL ---
def fluxo_github_completo():
    print("=" * 45)
    print(" SISTEMA DE GERENCIAMENTO GITHUB/TERMUX ".center(45, "="))
    print("=" * 45)
    print("[1] Clonar um novo repositório (Com auto-conversão SSH)")
    print("[2] Usar a pasta atual onde estou")
    print("-" * 45)
    
    opcao_inicial = input("Escolha uma opção (1 ou 2): ").strip()
    
    if opcao_inicial == "1":
        url_repo = input("\nDigite a URL do repositório para clonar (SSH ou HTTPS): ").strip()
        if not url_repo:
            print("[ERRO] URL inválida.")
            return

        # Descobre o nome da pasta limpando a extensão .git
        nome_pasta = url_repo.split("/")[-1]
        if nome_pasta.endswith(".git"):
            nome_pasta = nome_pasta[:-4]
        
        # Converte dinamicamente links HTTPS para SSH caso o usuário cole errado
        if url_repo.startswith("https://github.com/"):
            partes_link = url_repo.replace("https://github.com/", "").replace(".git", "")
            url_repo = f"git@github.com:{partes_link}.git"
            print(f"-> Link HTTPS convertido automaticamente para SSH seguro: {url_repo}")

        if os.path.exists(nome_pasta) and os.path.exists(os.path.join(nome_pasta, ".git")):
            print(f"\n[AVISO] A pasta '{nome_pasta}' já existe localmente.")
            os.chdir(nome_pasta)
        else:
            print("\n Otimizando configurações de rede do Git...")
            executar_comando(["git", "config", "--global", "http.postBuffer", "524288000"])
            
            print("\n Tentando clonar o repositório...")
            clone_resultado = executar_comando(["git", "clone", url_repo])
            
            if clone_resultado is None and os.path.exists(nome_pasta):
                print("\n[CONEXÃO INTERROMPIDA] Ativando modo de recuperação...")
                os.chdir(nome_pasta)
                executar_comando(["git", "config", "core.compression", "0"])
                executar_comando(["git", "fetch", "--keep", "origin"])
                executar_comando(["git", "checkout", "main"], checar=False)
            elif clone_resultado is None:
                print("[ERRO] Não foi possível iniciar o clone. Verifique suas chaves SSH.")
                return
            else:
                os.chdir(nome_pasta)
        
    elif opcao_inicial == "2":
        print("\n Verificando diretório atual...")
        if not os.path.exists(".git"):
            print("[ERRO] Esta pasta não possui um repositório Git (.git não encontrado)!")
            return
    else:
        print("[ERRO] Opção inválida.")
        return

    # Garante que a pasta atual use SSH na Origem Remota para evitar erros futuros de senha
    pasta_atual = os.path.abspath(os.getcwd())
    executar_comando(["git", "config", "--global", "--add", "safe.directory", pasta_atual])
    
    # Corrige a URL remota atual caso o repositório tenha sido clonado por HTTPS no passado
    url_atual_check = executar_comando(["git", "remote", "get-url", "origin"], capturar_saida=True)
    if url_atual_check and "https://github.com/" in url_atual_check.stdout:
        partes_remotas = url_atual_check.stdout.replace("https://github.com/", "").strip()
        url_ssh_corrigida = f"git@github.com:{partes_remotas}"
        executar_comando(["git", "remote", "set-url", "origin", url_ssh_corrigida])
        print("-> Link do repositório reconfigurado internamente para autenticação via Chave SSH.")

    print(f"\n-> Operando na pasta: {os.path.basename(pasta_atual)}")
    print("\n Sincronizando repositório local (Pull)...")
    executar_comando(["git", "pull", "origin", "main"], checar=False)

    # PERGUNTA SE DESEJA ENTRAR NAS OPÇÕES DE ORGANIZAÇÃO DE ARQUIVOS
    print("\n" + "-"*45)
    deseja_entrar = input(f"Deseja gerenciar os arquivos internos de '{os.path.basename(pasta_atual)}'? (s/n): ").strip().lower()
    
    if deseja_entrar == 's':
        print("\n" + "="*40)
        print(" FERRAMENTAS DE ARQUIVOS ".center(40, "="))
        print("="*40)
        
        opc_organizar = input("Deseja executar o script para ORGANIZAR os arquivos por extensão? (s/n): ").strip().lower()
        if opc_organizar == 's':
            achatar_e_categorizar_por_tipo(".", "./bkps")

        opc_limpar = input("\nDeseja executar o script para LIMPAR ARQUIVOS IDÊNTICOS (Duplicatas)? (s/n): ").strip().lower()
        if opc_limpar == 's':
            buscar_e_limpar_duplicados(".")

        print("\n" + "!" * 60)
        print(" AVISO: ALTERAÇÕES MANUAIS LIBERADAS ".center(60, "!"))
        print("!" * 60)
        print(f"Diretório ativo: {os.path.basename(pasta_atual)}")
        print("Caso precise modificar códigos ou ajustar pastas no Gerenciador, faça agora.")
        print("!" * 60)
    else:
        print("\n-> Movimentação de arquivos ignorada. Seguindo para o fluxo de deploy.")

    # MENU DE SAÍDA INTERATIVA NO ENTER
    print("\n" + "="*45)
    print(" [C] Continuar para o Git Push | [S] Sair e Matar Script ")
    print("="*45)
    escolha_final = input("Escolha uma ação (C ou S): ").strip().lower()

    if escolha_final == 's':
        print("\nProcesso interrompido com sucesso pelo usuário. Saindo...")
        sys.exit(0)

    # SEGUIR PARA SUBIR AO GITHUB
    print("\n Verificando modificações realizadas...")
    executar_comando(["git", "status"])
    print("-" * 50)

    confirmar = input("\nDeseja subir estas alterações para o repositório remoto agora? (s/n): ").strip().lower()
    if confirmar != 's':
        print("\nSincronização interrompida. Seus arquivos locais continuam salvos.")
        return

    print("\n Adicionando alterações...")
    executar_comando(["git", "add", "."])

    msg_commit = input("Mensagem do commit (Pressione Enter para padrão): ").strip()
    if not msg_commit:
        msg_commit = "Atualização automatizada do ecossistema"

    print("\n Efetuando Commit...")
    executar_comando(["git", "commit", "-m", msg_commit])

    print("\n Enviando dados para o GitHub (Push)...")
    if executar_comando(["git", "push", "origin", "main"]) is not None:
        print("\n Repositório sincronizado com sucesso!")


if __name__ == "__main__":
    try:
        fluxo_github_completo()
    except KeyboardInterrupt:
        print("\n\nScript abortado pelo usuário.")
        sys.exit(0)

