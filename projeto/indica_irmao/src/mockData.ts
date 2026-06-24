import { Categoria, UsuarioEspelho, Servico, Avaliacao, ChatThread } from './types';

export const MOCK_CATEGORIES: Categoria[] = [
  { id: 1, created_at: new Date().toISOString(), tipo_de_categoria: 'Reformas' },
  { id: 2, created_at: new Date().toISOString(), tipo_de_categoria: 'Aulas' },
  { id: 3, created_at: new Date().toISOString(), tipo_de_categoria: 'Culinária' },
  { id: 4, created_at: new Date().toISOString(), tipo_de_categoria: 'Limpeza' },
  { id: 5, created_at: new Date().toISOString(), tipo_de_categoria: 'Música' },
  { id: 6, created_at: new Date().toISOString(), tipo_de_categoria: 'Tecnologia' },
];

export const MOCK_PROFILES: UsuarioEspelho[] = [
  {
    id: 1,
    created_at: new Date().toISOString(),
    auth_users_id: 'user-1',
    nome_completo: 'Marcos Oliveira',
    bio: 'Profissional de paisagismo com mais de 8 anos de experiência cuidando de jardins e transformando quintais com muito carinho.',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    created_at: new Date().toISOString(),
    auth_users_id: 'user-2',
    nome_completo: 'Carlos Silva',
    bio: 'Pintor residencial cuidadoso, focado em acabamentos limpos e satisfação total de nossos irmãos da igreja.',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    created_at: new Date().toISOString(),
    auth_users_id: 'user-3',
    nome_completo: 'Ana Oliveira',
    bio: 'Chef de cozinha apaixonada por preparar refeições saudáveis, nutritivas e deliciosas para eventos e famílias.',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    created_at: new Date().toISOString(),
    auth_users_id: 'user-4',
    nome_completo: 'Bruno Mendes',
    bio: 'Professor de educação física e instrutor de yoga, focado em reabilitação, flexibilidade e bem-estar.',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    created_at: new Date().toISOString(),
    auth_users_id: 'user-5',
    nome_completo: 'Sra. Helena Costa',
    bio: 'Aposentada, boleira profissional. Faço bolos caseiros, pães e doces com receita de família para cultos e celebrações.',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
];

export const MOCK_SERVICES: Servico[] = [
  {
    id: 1,
    created_at: new Date().toISOString(),
    titulo: 'Jardinagem Profissional e Paisagismo',
    descricao: 'Manutenção completa de jardins residenciais com foco em sustentabilidade. Fazemos podas, adubação orgânica, controle de pragas e plantio de novas mudas de acordo com a iluminação do seu espaço.',
    categoria: 1,
    preco_estimado: 250,
    preco_detalhe: 'Visita para orçamento inclusa',
    foto_url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80',
    criado_por_usuario: 1,
    terceiro: false,
    eu_mesmo: true,
    whatsapp: '5511999999991',
  },
  {
    id: 2,
    created_at: new Date().toISOString(),
    titulo: 'Pintura Residencial Fina',
    descricao: 'Executo serviços de pintura interna e externa com proteção de móveis e acabamento impecável de portas e rodapés. Dedicação especial à limpeza pós-serviço.',
    categoria: 1,
    preco_estimado: 450,
    preco_detalhe: 'Preço aproximado por cômodo',
    foto_url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80',
    criado_por_usuario: 2,
    terceiro: false,
    eu_mesmo: true,
    whatsapp: '5511999999992',
  },
  {
    id: 3,
    created_at: new Date().toISOString(),
    titulo: 'Culinária Particular & Refeições Saudáveis',
    descricao: 'Preparo marmitas da semana ou jantares para reuniões comunitárias com cardápio balanceado. Adapto as receitas para restrições alimentares (sem glúten, sem lactose).',
    categoria: 3,
    preco_estimado: 180,
    preco_detalhe: 'Mais custo dos ingredientes',
    foto_url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80',
    criado_por_usuario: 3,
    terceiro: false,
    eu_mesmo: true,
    whatsapp: '5511999999993',
  },
  {
    id: 4,
    created_at: new Date().toISOString(),
    titulo: 'Yoga e Alongamento a Domicílio',
    descricao: 'Aulas personalizadas de Hatha Yoga e técnicas de respiração no conforto do seu lar. Indicado para todas as idades para alívio de estresse e melhora da postura.',
    categoria: 2,
    preco_estimado: 120,
    preco_detalhe: 'Sessão individual de 1 hora',
    foto_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
    criado_por_usuario: 4,
    terceiro: false,
    eu_mesmo: true,
    whatsapp: '5511999999994',
  },
  {
    id: 5,
    created_at: new Date().toISOString(),
    titulo: 'Bolos de Família e Pães Artesanais',
    descricao: 'Produção sob encomenda de pães de fermentação natural, bolos caseiros fresquinhos e cucas para seu café da tarde ou comemorações da igreja.',
    categoria: 3,
    preco_estimado: 45,
    preco_detalhe: 'Valor médio por bolo inteiro',
    foto_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    criado_por_usuario: 5,
    terceiro: false,
    eu_mesmo: true,
    whatsapp: '5511999999995',
  },
];

export const MOCK_REVIEWS: Avaliacao[] = [
  {
    id: 1,
    created_at: new Date().toISOString(),
    servico_id: 1,
    author_id: 3,
    nota: 5,
    comentario: 'O irmão Marcos fez um trabalho incrível em casa. Meu jardim estava muito desorganizado e ele trouxe vida de volta para as plantas. Pontual e muito gentil!',
  },
  {
    id: 2,
    created_at: new Date().toISOString(),
    servico_id: 1,
    author_id: 2,
    nota: 4,
    comentario: 'Excelente profissional. Muito experiente, trouxe as próprias ferramentas e sugeriu melhorias de drenagem.',
  },
  {
    id: 3,
    created_at: new Date().toISOString(),
    servico_id: 2,
    author_id: 1,
    nota: 5,
    comentario: 'O Carlos pintou minha sala com muito cuidado. Forrou tudo direitinho, limpou tudo no final e o preço foi muito justo. Recomendo de olhos fechados!',
  },
  {
    id: 4,
    created_at: new Date().toISOString(),
    servico_id: 3,
    author_id: 5,
    nota: 5,
    comentario: 'A comida da Ana é maravilhosa! Ela cozinhou para o nosso grupo de oração e todos elogiaram o sabor e o capricho.',
  },
];

export const MOCK_CHAT_THREADS: ChatThread[] = [
  {
    otherUser: MOCK_PROFILES[0], // Marcos
    lastMessage: {
      id: 101,
      created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
      sender_id: 1,
      receiver_id: 99, // Current active user ID
      texto: 'Olá irmão! Tudo bem? Posso fazer a poda na sexta-feira de manhã, fica bom para você?',
      servico_id: 1,
    },
    messages: [
      {
        id: 99,
        created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        sender_id: 99,
        receiver_id: 1,
        texto: 'Oi irmão Marcos! Queria ver um orçamento para organizar o canteiro de flores.',
        servico_id: 1,
      },
      {
        id: 100,
        created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        sender_id: 1,
        receiver_id: 99,
        texto: 'Claro! Consigo passar aí para avaliar.',
        servico_id: 1,
      },
      {
        id: 101,
        created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        sender_id: 1,
        receiver_id: 99,
        texto: 'Olá irmão! Tudo bem? Posso fazer a poda na sexta-feira de manhã, fica bom para você?',
        servico_id: 1,
      },
    ]
  },
  {
    otherUser: MOCK_PROFILES[2], // Ana
    lastMessage: {
      id: 202,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      sender_id: 3,
      receiver_id: 99,
      texto: 'Combinado! Vou mandar o cardápio sugerido para as marmitas.',
      servico_id: 3,
    },
    messages: [
      {
        id: 201,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        sender_id: 99,
        receiver_id: 3,
        texto: 'Ana, teria como fazer as marmitas com pouco sal?',
        servico_id: 3,
      },
      {
        id: 202,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        sender_id: 3,
        receiver_id: 99,
        texto: 'Combinado! Vou mandar o cardápio sugerido para as marmitas.',
        servico_id: 3,
      },
    ]
  }
];
