
  /*script*/
    /* ===========================
       JS - Envio via WhatsApp
       Utilizando orientação a objeto
       =========================== */

    // Classe para manipular o formulário e montar a mensagem
    class PedidoPortfolio {
      constructor(formId, telefoneDestino) {
        // Recebe o id do form e o telefone para envio
        this.form = document.getElementById(formId);
        this.telefoneDestino = telefoneDestino;

        // Liga o evento de submit do formulário
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      }

      // Remove emojis e caracteres especiais do texto
      removeEmojis(text) {
        // Regex para remover caracteres fora do padrão básico (ASCII e alguns símbolos)
        return text.replace(/[^\w\s\.,\-@:\r\náéíóúãõçÁÉÍÓÚÃÕÇ]/g, '');
      }

      // Monta o texto para WhatsApp só com campos preenchidos
      montarMensagem(dados) {
        // Começa com o título e linha separadora, usando \r\n para quebra de linha
        let mensagem = "*NOVO PEDIDO DE PORTFÓLIO*\r\n";
        mensagem += "----------------------------------\r\n\r\n";

        // Percorre o objeto dados e adiciona somente campos preenchidos
        for (const [chave, valor] of Object.entries(dados)) {
          if (valor.trim() !== '') { // Se não estiver vazio
            // Chave em maiúscula + valor
            mensagem += `${chave.toUpperCase()}: ${valor.trim()}\r\n`;
          }
        }
        return mensagem;
      }

      // Evento do submit do form
      handleSubmit(event) {
        event.preventDefault(); // Evita envio padrão

        // Coleta dados do formulário em objeto
        const dados = {
          nome: this.removeEmojis(this.form.nome.value),
          telefone: this.removeEmojis(this.form.telefone.value),
          email: this.removeEmojis(this.form.email.value),
          empresa: this.removeEmojis(this.form.empresa.value),
          descricao: this.removeEmojis(this.form.descricao.value)
        };

        // Monta mensagem formatada
        const textoMensagem = this.montarMensagem(dados);

        // Gera URL para WhatsApp com encodeURIComponent para evitar problemas
        const urlWhats = "https://wa.me/" + this.telefoneDestino + "?text=" + encodeURIComponent(textoMensagem);

        // Abre nova aba para envio no WhatsApp Web ou app
        window.open(urlWhats, "_blank");
      }
    }

    // Instancia a classe, passando id do form e telefone destino para o WhatsApp (somente números e código do país)
    // Exemplo para Brasil: 5591999999999 (55=Brasil, 91=DDD, número)
    const pedido = new PedidoPortfolio('pedidoForm', '5591992420981');


/*hero*/
  // Função que toca o som e faz scroll suave até a seção com id="video"
  function playSoundAndScroll() {
    // Toca o áudio
    const audio = document.getElementById('clickSound');

    if (audio) {
      // 🔊 Som só será executado se houver interação direta com o clique
      audio.currentTime = 0;  // Reinicia o áudio se já tiver sido tocado
      audio.play().catch(error => {
        console.warn("O áudio não pôde ser reproduzido automaticamente:", error);
      });
    }

    // Rola suavemente até a seção com id="video"
    const videoSection = document.querySelector('#video');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  }


/* Swiper JS (slider/carrossel) */

    const swiper = new Swiper(".mySwiper", {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });
 

