// Adicione os dados do comprador (Payer) para habilitar os botões
const preferenceData = {
  items: body.itens.map((i: any) => ({
    title: i.nome,
    unit_price: i.preco,
    quantity: i.qtd,
    currency_id: 'BRL'
  })),
  payer: {
    name: body.nome,
    email: body.email, // O Mercado Pago exige e-mail válido para liberar o botão
  },
  // Garante que o cliente possa pagar com qualquer método
  payment_methods: {
    excluded_payment_types: [],
    installments: 12
  },
  // Redirecionamento automático após pagar
  back_urls: {
    success: "https://aristidesbp.github.io/sucesso.html",
    failure: "https://aristidesbp.github.io/pagamento.html",
    pending: "https://aristidesbp.github.io/sucesso.html", // Adicionado para Pix pendente
},
auto_return: "all", // Mude de "approved" para "all"
};
