# 🧠 Insights de mercado (benchmarks reais)
* ERPs profissionais como Odoo e Dynamics 365 são altamente modulares e centralizam dados de usuários, vendas e finanças com regras de relacionamento bem definidas.
* Boas práticas de modelagem incluem usar chaves primárias únicas, relacionamentos claros (1-N, N-N), convenções de nomes consistentes e separação de entidades de negócio.
* Mesmo quando o banco é não relacional ou offline (como IndexedDB), é essencial planejar entidades e relacionamentos antes de implementar.

# 📌 MODELO DE DADOS INICIAL (IndexedDB) — CONCEITUAL
IndexedDB não usa tabelas como um banco relacional tradicional, mas sim object stores (coleções de objetos). Cada store tem uma chave primária e pode ter índices para consultas rápidas.

## Regras básicas de projeto IndexedDB:
* Cada object store representa uma entidade de negócio.
* Relacionamentos podem ser feitos por referências de chave (IDs relacionados).
* Use índices secundários para buscar por campos não-primários.

# 🗂️ ENTIDADES PRINCIPAIS
## 1) usuarios.json
Guarda dados de login e controle de acesso. Serve como base para todos os cadastros ligados a contas.
```
{
  "id": "string",
  "nome": "string",
  "email": "string",
  "senhaHash": "string",
  "role": "string", // ex: admin, gestor, chat_user
  "criadoEm": "date"
}
```
## clientes.json
```
{
  "id": "string",
  "usuarioId": "string", // FK → Usuario
  "nome": "string",
  "cpfCnpj": "string",
  "telefone": "string",
  "email": "string",
  "endereco": "object", // pode ser objeto denormalizado
  "criadoEm": "date"
}
```
## fornecedores.json
```
{
  "id": "string",
  "nome": "string",
  "cnpj": "string",
  "contato": "string",
  "telefone": "string",
  "email": "string",
  "endereco": "object"
}
```
## funcionarios.json
```
 {
  "id": "string",
  "usuarioId": "string", // FK → Usuário (se se logam no sistema)
  "nome": "string",
  "cpf": "string",
  "cargo": "string",
  "departamento": "string",
  "contato": "string",
  "dataAdmissao": "date"
}

```
## produtos.json
```
{
  "id": "string",
  "nome": "string",
  "descricao": "string",
  "preco": "number",
  "estoque": "number",
  "fornecedorId": "string" // FK → Fornecedor
}
```
## vendas.json
Venda é uma entidade de alto valor em ERP.
```
{
  "id": "string",
  "clienteId": "string", // FK → Cliente
  "dataVenda": "date",
  "valorTotal": "number",
  "itens": "array", // IDs OU detalhes embutidos
  "status": "string"
}
```
##  Financeiro.json
### O financeiro pode ter dois conceitos:
* Lançamentos financeiros
* Contas / categorias
Lançamentos
```
{
  "id": "string",
  "tipo": "string", // receita / despesa
  "valor": "number",
  "data": "date",
  "descricao": "string",
  "vendaId": "string?" // opcional link → Venda
}
```
## contas.json
```
{
  "id": "string",
  "nome": "string",
  "categoria": "string"
}
```
## Chatbot.json
Salvar perguntas/respostas automáticas.
```
{
  "id": "string",
  "pergunta": "string",
  "resposta": "string",
  "categoria": "string"
}
```
## bloco_de_notas.json
Simples e útil para usuários.
```
{
  "id": "string",
  "usuarioId": "string",
  "titulo": "string",
  "conteudo": "string",
  "criadoEm": "date"
}
```
## conversas_whatsApp_RedesSociais.json
IndexedDB pode armazenar conversas como JSON.
```
{
  "id": "string",
  "chatTipo": "string", // ex: whatsapp, instagram
  "usuarioId": "string",
  "mensagens": "array" // cada item com texto, data, remetente
}
```
## Mensagens_Envio.json
Mensagens que você planeja enviar (SMS, WhatsApp, e-mail etc.)
```
{
  "id": "string",
  "destinatario": "string",
  "conteudo": "string",
  "statusEnvio": "string",
  "tentativas": "number"
}
```
## politicas_de_servico.json
Texto de políticas/termos.
```
{
  "id": "string",
  "titulo": "string",
  "descricao": "string",
  "ativo": "boolean"
}
```
## documentacao.json
Pode guardar documentos ou links para documentos.
```
{
  "id": "string",
  "titulo": "string",
  "conteudo": "string", // pode ser markdown ou HTML
  "tags": "array",
  "criadoEm": "date"
}
```
## servicos
```
{
  "id": "string",
  "nome": "string",
  "descricao": "string",
  "preco": "number"
}
```

# 📊 Índices recomendados (IndexedDB)
```
| Store      | Índices úteis        |
| ---------- | -------------------- |
| usuários   | email                |
| clientes   | usuarioId, cpfCnpj   |
| produtos   | fornecedorId         |
| vendas     | clienteId, dataVenda |
| financeiro | tipo, data           |
| conversas  | chatTipo, usuarioId  |
```



