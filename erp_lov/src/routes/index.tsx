import { createFileRoute } from '@tanstack/react-router';
import ErpApp from '../components/ErpApp';

export const Route = createFileRoute('/')({
  ssr: false,
  head: () => ({
    meta: [
      { title: 'ERP ABP — Gestão, Estoque, Financeiro e PDV' },
      {
        name: 'description',
        content:
          'Sistema ERP com PDV, controle de estoque, financeiro com parcelas e cadastro de entidades, sincronizado com Supabase e com modo offline.',
      },
      { property: 'og:title', content: 'ERP ABP — Gestão & PDV' },
      {
        property: 'og:description',
        content:
          'Gestão completa: entidades, estoque, financeiro, frente de caixa com cupom térmico e sincronização em nuvem.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: ErpApp,
});
