import { MenuItem, CategoryOption } from '../types';

export const CATEGORIES: CategoryOption[] = [
  { id: 'todos', name: 'Todos os Itens', icon: '🍽️' },
  { id: 'tradicionais', name: 'Tradicionais', icon: '🌾' },
  { id: 'especiais', name: 'Especiais', icon: '👑' },
  { id: 'doces', name: 'Doces', icon: '🍫' },
  { id: 'bebidas', name: 'Bebidas & Sucos', icon: '🥤' },
];

export const MENU_ITEMS: MenuItem[] = [
  // Tradicionais
  {
    id: 'manteiga-queijo-coalho',
    name: 'Manteiga e Queijo Coalho',
    description: 'Manteiga da terra artesanal com delicioso queijo coalho grelhado.',
    price: 10.00,
    category: 'tradicionais',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    isGlutenFree: true,
  },
  {
    id: 'carne-de-sol-queijo',
    name: 'Carne de Sol com Queijo',
    description: 'Carne de sol desfiada acebolada com generosa camada de queijo coalho.',
    price: 16.00,
    category: 'tradicionais',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    isGlutenFree: true,
  },
  {
    id: 'frango-catupiry',
    name: 'Frango com Catupiry',
    description: 'Frango desfiado temperado ao estilo da casa com requeijão cremoso.',
    price: 14.00,
    category: 'tradicionais',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    isGlutenFree: true,
  },
  {
    id: 'presunto-queijo',
    name: 'Presunto e Queijo Selado',
    description: 'Presunto fatiado com queijo derretido na chapa e um toque de orégano.',
    price: 12.00,
    category: 'tradicionais',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    isGlutenFree: true,
  },

  // Especiais
  {
    id: 'a-sertaneja',
    name: 'A Sertaneja',
    description: 'Carne de sol, banana da terra frita, queijo coalho e toque artesanal de rapadura.',
    price: 19.00,
    category: 'especiais',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    isGlutenFree: true,
  },
  {
    id: 'camarao-cremoso',
    name: 'Camarão Cremoso',
    description: 'Camarões refogados no azeite, ervas finas e catupiry original da casa.',
    price: 22.00,
    category: 'especiais',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    isGlutenFree: true,
  },
  {
    id: 'nordestina-gourmet',
    name: 'Nordestina Gourmet',
    description: 'Carne secada na manteiga de garrafa, queijo manteiga, bacon crocante e pimenta biquinho.',
    price: 21.00,
    category: 'especiais',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80',
    isGlutenFree: true,
  },

  // Doces
  {
    id: 'cartola-nordestina',
    name: 'Cartola Nordestina',
    description: 'Banana frita, queijo coalho derretido, açúcar e canela em pó.',
    price: 12.00,
    category: 'doces',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    isGlutenFree: true,
  },
  {
    id: 'prestigio-cremoso',
    name: 'Prestígio Cremoso',
    description: 'Chocolate meio amargo derretido com coco fresco ralado.',
    price: 13.00,
    category: 'doces',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    isGlutenFree: true,
  },
  {
    id: 'morango-nutella',
    name: 'Morango com Nutella',
    description: 'Morangos frescos fatiados com farta camada de creme de avelã Nutella.',
    price: 16.00,
    category: 'doces',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    isGlutenFree: true,
  },

  // Bebidas
  {
    id: 'suco-caju',
    name: 'Suco de Caju da Polpa (500ml)',
    description: 'Feito com fruta selecionada, batido na hora bem gelado.',
    price: 8.00,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
  },
  {
    id: 'suco-graviola',
    name: 'Suco Natural de Graviola (500ml)',
    description: 'Suco cremoso da fruta natural, refrescante e muito saboroso.',
    price: 9.00,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cafe-com-leite',
    name: 'Café com Leite na Xícara',
    description: 'Café coado na hora com leite quente espumoso e um toque de afeto.',
    price: 6.00,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'refrigerante-lata',
    name: 'Refrigerante Lata 350ml',
    description: 'Opções: Guaraná Antarctica, Coca-Cola, Coca Zero, Fanta Laranja.',
    price: 6.50,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
  }
];

export const RESTAURANT_INFO = {
  name: 'Tapiocaria Sabor & Arte',
  subtitle: 'A verdadeira tapioca nordestina crocante e recheada',
  tagline: 'FEITO NA CHAPA COM AMOR',
  whatsappNumber: '5591992420981',
  whatsappDisplay: '(91) 99242-0981',
  address: 'Atendimento Delivery e Retirada',
  openingHours: 'Terça a Domingo • 16h às 23h',
  logoUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=200&h=200&q=80',
  heroBannerUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80',
};
