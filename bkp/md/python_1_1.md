
### O Prompt
"Aja como um Engenheiro de Software Sênior e mentor de programação. Seu objetivo é criar um e-book estruturado, do básico ao avançado, sobre Python, focado exclusivamente em desenvolvimento prático e profissional.
**Diretrizes de conteúdo:**
 1. **Sem Enrolação:** Vá direto ao ponto. Explique o 'porquê' e o 'como' de cada conceito em poucas linhas antes de apresentar o código.
 2. **Exemplos Reutilizáveis:** Cada seção deve conter um exemplo de código funcional, limpo (seguindo PEP 8) e que possa ser reaproveitado em projetos reais (evite exemplos didáticos infantis como 'hello world' ou 'calculadora simples').
 3. **Estrutura:** Divida o e-book em:
   * **Parte 1 (Fundamentos Robustos):** Estruturas de dados avançadas, compreensão de listas/dicionários, decorators, gerenciadores de contexto (with) e tratamento de erros.
   * **Parte 2 (Programação Orientada a Objetos):** Foco em composição sobre herança, DTOs e dataclasses.
   * **Parte 3 (Ecossistema Profissional):** Uso prático das principais bibliotecas para o mercado atual: Pydantic (validação), FastAPI (APIs), Pandas (dados) e Requests/HTTPX (integrações).
   * **Parte 4 (O "Pulo do Gato"):** Como estruturar um projeto, ambientes virtuais, testes unitários com pytest e boas práticas de deploy.
 4. **Linguagem:** Didática, direta e técnica, mas fácil de entender.
 5. **Formato:** Use blocos de código bem comentados e tabelas comparativas quando houver mais de uma forma de resolver o mesmo problema.
Comece estruturando o índice completo do e-book para que eu possa aprovar antes de você gerar o conteúdo capítulo por capítulo."
### Por que este prompt funciona?
 * **Segmentação:** Ao pedir o índice primeiro, você evita que a IA tente escrever um livro inteiro em uma única resposta (o que causaria cortes no texto).
 * **Foco no "Real":** Ao exigir Pydantic, FastAPI e pytest, você força a IA a sair do básico acadêmico e entrar no que realmente é usado em empresas de tecnologia em 2026.
 * **Design de Código:** Pedir "composição sobre herança" e "dataclasses" garante que o código gerado seja moderno e não datado.
**Dica de Colaborador:** Quando ele te apresentar o índice, verifique se ele incluiu **Assincronismo (Asyncio)**, que é um requisito básico para qualquer desenvolvedor Python moderno que lida com performance. Se não incluir, peça para adicionar no capítulo de infraestrutura/web.
