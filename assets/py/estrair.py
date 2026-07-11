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
