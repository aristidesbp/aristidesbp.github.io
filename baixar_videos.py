import os
import shutil
import subprocess
import sys

def executar_comando(comando, exibir_saida=False):
    """Executa comandos no terminal. Se exibir_saida for True, mostra o progresso na tela."""
    try:
        subprocess.run(
            comando,
            shell=True,
            check=True,
            capture_output=not exibir_saida,
            text=True
        )
        return True
    except subprocess.CalledProcessError:
        return False

def verificar_dependencias():
    print("[*] Checando ambiente e dependências do Termux...")
    
    deps_faltando = False

    # Verifica se os executáveis estão no PATH do sistema
    if not shutil.which("ffmpeg"):
        print("[-] FFmpeg não encontrado.")
        deps_faltando = True
        
    if not shutil.which("yt-dlp"):
        print("[-] yt-dlp não encontrado.")
        deps_faltando = True

    # Se faltar algo, roda os comandos de instalação base
    if deps_faltando:
        print("\n[!] Iniciando instalação de pré-requisitos. Isso pode demorar alguns minutos...")
        
        print("-> Atualizando pacotes e instalando FFmpeg...")
        # Comando concatenado para atualizar e instalar via pkg
        executar_comando("pkg update -y && pkg upgrade -y && pkg install python ffmpeg -y", exibir_saida=True)
        
        print("\n-> Instalando yt-dlp via pip...")
        executar_comando("python3 -m pip install --upgrade yt-dlp", exibir_saida=True)
        
        print("\n[+] Ambiente configurado com sucesso!\n")
    else:
        print("[+] Tudo certo! Dependências já estão instaladas.\n")

def painel_download():
    # Limpa a tela para o painel ficar organizado
    os.system('clear' if os.name == 'posix' else 'cls')
    
    print("=" * 50)
    print(" TERMINAL DOWNLOADER (yt-dlp) ".center(50, "="))
    print("=" * 50)
    
    url = input("\n[?] Cole o link do vídeo: ").strip()
    
    if not url:
        print("[!] Nenhum link fornecido. Encerrando o script...")
        sys.exit(0)

    # Menu de seleção
    print("\n[1] Baixar Vídeo (Até 720p com áudio)")
    print("[2] Baixar Apenas Áudio (Arquivo MP3)")
    print("-" * 50)
    
    escolha = input("Escolha o formato desejado (1 ou 2): ").strip()
    
    if escolha == "1":
        print("\n[*] Iniciando o download do Vídeo...")
        comando_ytdlp = f'yt-dlp -f "bestvideo[height<=720]+bestaudio/best[height<=720]" "{url}"'
    elif escolha == "2":
        print("\n[*] Iniciando o download e conversão de Áudio (MP3)...")
        # Usa o FFmpeg (que o script já instala) para extrair e converter o áudio
        comando_ytdlp = f'yt-dlp -f "bestaudio" -x --audio-format mp3 "{url}"'
    else:
        print("\n[!] Opção inválida. Encerrando o script...")
        sys.exit(0)

    print("-" * 50)
    # Executa exibindo a saída para o usuário ver a barra de progresso
    sucesso = executar_comando(comando_ytdlp, exibir_saida=True)
    print("-" * 50)
    
    if sucesso:
        print("\n[+] Download concluído com sucesso! Arquivo salvo na pasta atual.")
    else:
        print("\n[-] Ocorreu um erro. Verifique se o link é válido e se a sua conexão está estável.")

if __name__ == "__main__":
    try:
        verificar_dependencias()
        painel_download()
    except KeyboardInterrupt:
        print("\n\n[!] Operação cancelada pelo usuário. Saindo...")
        sys.exit(0)
