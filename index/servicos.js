function criarServicos() {
  const container = document.getElementById("componente-servicos");
  if (!container) return;

  const servicos = [
    {
      titulo: "Desenvolvimento Web",
      descricao: "Por que todo comércio deve ter um site?",
      extra: `Em um mundo cada vez mais conectado, confiar apenas nas redes sociais para vender é como abrir uma loja no fundo de um beco e esperar que todos a encontrem por acaso. Ter um site é como estar na avenida principal da internet: representa presença, autoridade e controle.

Muitos empreendedores ainda acreditam que apenas o Instagram ou o WhatsApp são suficientes, mas essa é uma visão limitada e arriscada.

O primeiro grande diferencial de ter um site é a autoridade. Um domínio próprio transmite seriedade e confiança. Quem tem um site é percebido como uma empresa profissional, enquanto quem depende apenas das redes sociais pode parecer amador.

Em segundo lugar, o alcance orgânico de um site bem posicionado no Google permite atrair visitantes todos os dias, sem pagar anúncios — algo impossível apenas com redes sociais.

Terceiro: com um site, o comerciante tem liberdade total de conteúdo e identidade visual. Nas redes, tudo é limitado e padronizado. No site, a marca se destaca com design único, botão de WhatsApp integrado, catálogo inteligente e estratégias de SEO que posicionam o negócio à frente da concorrência.

Quarto: o site funciona 24 horas por dia, mesmo enquanto você dorme. Ele informa, vende e capta contatos automaticamente.

Por fim, o quinto motivo: independência de plataformas. As redes sociais mudam regras, bloqueiam contas e podem sair do ar com frequência. Um site é seu, estável e controlado por você.`
    },
    {
      titulo: "Gestão de Tráfego Pago",
      descricao: "Por que investir em Gestão de Tráfego Pago?",
      extra: `Enquanto muitos negócios lutam para conquistar visibilidade orgânica, campanhas de tráfego pago bem planejadas entregam resultados imediatos. Google Ads e Meta Ads são hoje os canais mais eficientes para atrair os clientes certos, no momento certo, com o menor custo possível — desde que bem configurados.

A principal vantagem está na segmentação avançada: é possível impactar exatamente quem procura pelo seu serviço, filtrando por localização, comportamento, interesse e até intenção de compra. Isso significa menos desperdício e mais retorno.

Além disso, anúncios eficazes exigem uma copy persuasiva. Não basta aparecer — é preciso convencer. Utilizamos gatilhos mentais, linguagem clara e direcionamento estratégico para transformar cliques em conversões reais.

Combinamos os anúncios com funis de vendas personalizados que conduzem o visitante por etapas lógicas: do interesse à ação. Isso reduz objeções, aumenta o engajamento e gera vendas consistentes.

Em resumo: quem investe em tráfego pago com estratégia consegue escalar. Quem tenta sozinho, gasta e não retorna. Deixe sua empresa nas mãos de quem entende de conversão — e veja seu faturamento subir.`
    },
    {
      titulo: "Consultoria Estratégica",
      descricao: "Por que sua empresa precisa de Consultoria Estratégica Digital?",
      extra: `Ter presença online hoje não é mais uma opção — é uma questão de sobrevivência. Mas estar presente sem direção é como remar sem bússola: você se cansa, investe, mas não sai do lugar. A Consultoria Estratégica resolve isso.

Começamos com um diagnóstico profundo do seu negócio: identificamos gargalos, oportunidades invisíveis e erros que estão custando caro. Depois, construímos um plano de ação prático, direto ao ponto — com estratégias baseadas em dados, não em achismos.

Você terá clareza total: o que fazer, como fazer e por que fazer. Cada ação é conectada a um objetivo real, com acompanhamento de métricas que mostram o que está funcionando e o que precisa ser ajustado.

Não é mágica. É método. Enquanto concorrentes improvisam, você conquista vantagem competitiva com processos otimizados, comunicação precisa e marketing que de fato atrai, engaja e converte.

A diferença entre empresas que crescem e empresas que sobrevivem está na estratégia. Se você quer vender mais, escalar com consistência e parar de desperdiçar tempo e dinheiro, essa consultoria é para você.`
    }
  ];

  container.innerHTML = `
    <div class="servicos-wrapper">
    
      ${servicos.map((s, i) => `
        <div class="card-servico" data-index="${i}">
          <h3>${s.titulo}</h3>
          <p>${s.descricao}</p>
          <div class="extra">${s.extra.replace(/\n/g, "<br>")}</div>
          <button class="btn-toggle">Saiba mais</button>
        </div>
      `).join('')}
    </div>

    <style>
      #componente-servicos {
        background: #111;
        color: #FFD700;
        padding: 4rem 2rem;
        font-family: 'DM Sans', sans-serif;
      }

      .servicos-wrapper {
        max-width: 1100px;
        margin: auto;
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      }

      .card-servico {
        background: #1a1a1a;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 0 15px rgba(255, 215, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .card-servico:hover {
        transform: translateY(-5px);
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
      }

      .card-servico h3 {
        margin-bottom: 0.5rem;
      }

      .card-servico p {
        color: #ccc;
        margin-bottom: 1rem;
      }

      .card-servico .extra {
        display: none;
        color: #fff;
        font-size: 0.95rem;
        margin-top: 0.5rem;
        white-space: pre-line;
      }

      .card-servico.ativo .extra {
        display: block;
      }

      .btn-toggle {
        background: #FFD700;
        border: none;
        color: #000;
        padding: 0.5rem 1rem;
        font-weight: bold;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.2s ease;
      }

      .btn-toggle:hover {
        background: #e0c100;
      }
    </style>
  `;

  container.querySelectorAll('.btn-toggle').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.card-servico');
      card.classList.toggle('ativo');
    });
  });
}

// Chamada da função
criarServicos();
