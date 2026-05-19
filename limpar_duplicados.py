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
