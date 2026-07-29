import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, Entity, CustomerChat, ChatMessage, N8nWebhookConfig } from '../../types';
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Phone,
  Search,
  Settings,
  Plus,
  Package,
  CheckCheck,
  Zap,
  RefreshCw,
  Clock,
  ExternalLink,
  Sliders,
  Sparkles,
  Paperclip,
  Check,
  ChevronRight,
  Shield,
  Trash2,
  Download,
  X,
  Store,
  ArrowLeft,
  Info,
} from 'lucide-react';

const STORAGE_WEBHOOK_KEY = 'erp_abp_n8n_webhook_url';
const STORAGE_API_KEY = 'erp_abp_n8n_api_key';
const STORAGE_AUTO_AI = 'erp_abp_n8n_auto_ai';
const STORAGE_CHATS_KEY = 'erp_abp_whatsapp_chats';

const INITIAL_MOCK_CHATS: CustomerChat[] = [
  {
    id: 'chat_1',
    customer_name: 'Maria Silva',
    customer_phone: '(11) 98765-4321',
    customer_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    last_message: 'Vocês têm Arroz 5kg em estoque e qual o valor da entrega?',
    last_message_time: '10:42',
    unread_count: 2,
    status: 'online',
    ai_enabled: true,
    n8n_session_id: 'n8n_sess_mariasilva_01',
    messages: [
      {
        id: 'msg_101',
        chat_id: 'chat_1',
        sender: 'customer',
        sender_name: 'Maria Silva',
        text: 'Bom dia! Gostaria de fazer um pedido para entrega no Bairro Centro.',
        timestamp: '10:40',
        status: 'read',
      },
      {
        id: 'msg_102',
        chat_id: 'chat_1',
        sender: 'customer',
        sender_name: 'Maria Silva',
        text: 'Vocês têm Arroz 5kg em estoque e qual o valor da entrega?',
        timestamp: '10:42',
        status: 'read',
      },
      {
        id: 'msg_103',
        chat_id: 'chat_1',
        sender: 'bot_n8n',
        sender_name: 'n8n IA Assistente',
        text: 'Olá Maria! Tudo bem? 😊\n\nTemos sim o Arroz Tipo 1 5kg em estoque! A taxa de entrega para o Centro é de R$ 5,00. Gostaria de incluir no seu carrinho?',
        timestamp: '10:43',
        status: 'delivered',
        n8n_processed: true,
      },
    ],
  },
  {
    id: 'chat_2',
    customer_name: 'João Souza',
    customer_phone: '(11) 97654-3210',
    customer_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    last_message: 'Obrigado, recebi as compras com sucesso!',
    last_message_time: 'Ontem',
    unread_count: 0,
    status: 'offline',
    ai_enabled: false,
    messages: [
      {
        id: 'msg_201',
        chat_id: 'chat_2',
        sender: 'customer',
        sender_name: 'João Souza',
        text: 'Qual a chave PIX do supermercado?',
        timestamp: '15:20',
        status: 'read',
      },
      {
        id: 'msg_202',
        chat_id: 'chat_2',
        sender: 'store',
        sender_name: 'Atendimento Supermercado',
        text: 'Olá João! Nossa chave PIX CNPJ é 12.345.678/0001-90 (Supermercado ABP).',
        timestamp: '15:22',
        status: 'read',
      },
      {
        id: 'msg_203',
        chat_id: 'chat_2',
        sender: 'customer',
        sender_name: 'João Souza',
        text: 'Obrigado, recebi as compras com sucesso!',
        timestamp: '16:05',
        status: 'read',
      },
    ],
  },
  {
    id: 'chat_3',
    customer_name: 'Pedro Santos (Restaurante)',
    customer_phone: '(11) 99888-7766',
    unread_count: 1,
    last_message: 'Preciso de uma cotação para 10 caixas de leite integral.',
    last_message_time: '09:15',
    status: 'online',
    ai_enabled: true,
    messages: [
      {
        id: 'msg_301',
        chat_id: 'chat_3',
        sender: 'customer',
        sender_name: 'Pedro Santos',
        text: 'Preciso de uma cotação para 10 caixas de leite integral.',
        timestamp: '09:15',
        status: 'read',
      },
    ],
  },
];

export const CustomerChatView: React.FC = () => {
  const { products, entities, storeConfig } = useApp();

  // Chats state
  const [chats, setChats] = useState<CustomerChat[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CHATS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_MOCK_CHATS;
  });

  const [activeChatId, setActiveChatId] = useState<string>(chats[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'unread' | 'ai'>('all');
  const [messageText, setMessageText] = useState('');

  // n8n Webhook settings state
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState<string>(() => localStorage.getItem(STORAGE_WEBHOOK_KEY) || '');
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem(STORAGE_API_KEY) || '');
  const [autoRespondAi, setAutoRespondAi] = useState<boolean>(() => {
    const val = localStorage.getItem(STORAGE_AUTO_AI);
    return val !== null ? val === 'true' : true;
  });

  const [isSendingWebhook, setIsSendingWebhook] = useState(false);
  const [testWebhookResult, setTestWebhookResult] = useState<string | null>(null);

  // Product Selector Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  // New Chat Modal
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Active Chat reference
  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  // Save chats to localStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CHATS_KEY, JSON.stringify(chats));
    } catch {
      // ignore
    }
  }, [chats]);

  // Scroll to bottom when active chat messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  // Save Webhook settings
  const handleSaveWebhookSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_WEBHOOK_KEY, webhookUrl);
    localStorage.setItem(STORAGE_API_KEY, apiKey);
    localStorage.setItem(STORAGE_AUTO_AI, String(autoRespondAi));
    setIsConfigOpen(false);
    alert('Configurações de integração do n8n salvas com sucesso!');
  };

  // Send message from store operator
  const handleSendMessage = async (attachedProduct?: Product) => {
    if (!messageText.trim() && !attachedProduct) return;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      chat_id: activeChat.id,
      sender: 'store',
      sender_name: storeConfig.store_name || 'Atendimento Supermercado',
      text: messageText.trim(),
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      product_attachment: attachedProduct,
    };

    const updatedMessages = [...activeChat.messages, newMsg];
    const updatedChat: CustomerChat = {
      ...activeChat,
      last_message: attachedProduct ? `[Produto enviado: ${attachedProduct.nome}]` : newMsg.text,
      last_message_time: newMsg.timestamp,
      messages: updatedMessages,
    };

    setChats((prev) => prev.map((c) => (c.id === activeChat.id ? updatedChat : c)));
    setMessageText('');

    // Trigger n8n webhook if active and enabled
    if (activeChat.ai_enabled && autoRespondAi) {
      triggerN8nWebhook(updatedChat, newMsg);
    }
  };

  // Trigger simulated/real n8n Webhook
  const triggerN8nWebhook = async (chat: CustomerChat, userMessage: ChatMessage) => {
    setIsSendingWebhook(true);

    const payload = {
      event: 'whatsapp_message',
      chatId: chat.id,
      sessionId: chat.n8n_session_id || `n8n_${chat.id}`,
      customer: {
        name: chat.customer_name,
        phone: chat.customer_phone,
      },
      message: {
        id: userMessage.id,
        text: userMessage.text,
        sender: userMessage.sender,
        timestamp: userMessage.timestamp,
        productAttachment: userMessage.product_attachment
          ? {
              id: userMessage.product_attachment.id,
              nome: userMessage.product_attachment.nome,
              preco: userMessage.product_attachment.preco_venda,
            }
          : null,
      },
      store: {
        name: storeConfig.store_name,
        cnpj: storeConfig.cnpj,
        phone: storeConfig.phone,
      },
    };

    try {
      if (webhookUrl.trim()) {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        if (apiKey.trim()) {
          headers['Authorization'] = `Bearer ${apiKey.trim()}`;
          headers['x-api-key'] = apiKey.trim();
        }

        const res = await fetch(webhookUrl.trim(), {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const resData = await res.json().catch(() => null);
          const aiReplyText =
            resData?.reply ||
            resData?.text ||
            resData?.output ||
            resData?.message ||
            `Recebido via n8n webhook (Status ${res.status} OK)!`;

          addAiResponseToChat(chat.id, aiReplyText);
        } else {
          addAiResponseToChat(
            chat.id,
            `⚠️ [Aviso n8n Webhook] O servidor n8n retornou erro (HTTP ${res.status}). Verifique a URL do Webhook nas configurações.`
          );
        }
      } else {
        // Fallback simulation mode
        setTimeout(() => {
          let simulatedAiText = `🤖 [n8n IA Simulação] Olá ${chat.customer_name}! Recebi sua mensagem: "${userMessage.text}". \n\nPara conectar com o seu fluxo real no n8n, informe a URL do seu Webhook no botão de Configurações do n8n acima!`;

          if (userMessage.text.toLowerCase().includes('arroz')) {
            simulatedAiText = `🤖 [n8n IA] Localizei em nosso estoque! Temos Arroz Tipo 1 5kg em promoção por R$ 24,90. Deseja realizar a reserva para entrega imediata?`;
          } else if (userMessage.text.toLowerCase().includes('pix')) {
            simulatedAiText = `🤖 [n8n IA] Nossa chave PIX oficial é o CNPJ: ${storeConfig.cnpj || '12.345.678/0001-90'}. Após realizar a transferência, envie o comprovante por aqui!`;
          } else if (userMessage.text.toLowerCase().includes('entrega') || userMessage.text.toLowerCase().includes('frete')) {
            simulatedAiText = `🤖 [n8n IA] Nosso prazo de entrega para pedidos do WhatsApp é de até 45 minutos. Taxa fixa de entrega: R$ 5,00.`;
          }

          addAiResponseToChat(chat.id, simulatedAiText);
        }, 1200);
      }
    } catch (err: any) {
      addAiResponseToChat(
        chat.id,
        `🤖 [n8n IA Webhook Simulação] Mensagem processada! (Aviso: Webhook externo não respondeu: ${err.message || 'CORS / Offline'}).`
      );
    } finally {
      setIsSendingWebhook(false);
    }
  };

  const addAiResponseToChat = (chatId: string, replyText: string) => {
    const aiMsg: ChatMessage = {
      id: `msg_ai_${Date.now()}`,
      chat_id: chatId,
      sender: 'bot_n8n',
      sender_name: 'n8n IA Assistente',
      text: replyText,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
      n8n_processed: true,
    };

    setChats((prev) =>
      prev.map((c) => {
        if (c.id === chatId) {
          return {
            ...c,
            last_message: replyText,
            last_message_time: aiMsg.timestamp,
            messages: [...c.messages, aiMsg],
          };
        }
        return c;
      })
    );
  };

  // Simulate incoming Customer Message (for testing)
  const handleSimulateCustomerMessage = (textMessage?: string) => {
    if (!activeChat) return;

    const sampleTexts = [
      'Olá, qual o preço da caixa de leite?',
      'Vocês aceitam vale refeição Sodexo ou Ticket?',
      'Qual o horário de funcionamento do mercado hoje?',
      'Quero adicionar 2 pacotes de café ao meu pedido.',
    ];

    const customerText = textMessage || sampleTexts[Math.floor(Math.random() * sampleTexts.length)];

    const incomingMsg: ChatMessage = {
      id: `msg_cust_${Date.now()}`,
      chat_id: activeChat.id,
      sender: 'customer',
      sender_name: activeChat.customer_name,
      text: customerText,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'read',
    };

    const updatedMessages = [...activeChat.messages, incomingMsg];
    const updatedChat: CustomerChat = {
      ...activeChat,
      last_message: customerText,
      last_message_time: incomingMsg.timestamp,
      unread_count: 0,
      messages: updatedMessages,
    };

    setChats((prev) => prev.map((c) => (c.id === activeChat.id ? updatedChat : c)));

    // Automatically trigger n8n if AI is turned on for this chat
    if (activeChat.ai_enabled && autoRespondAi) {
      triggerN8nWebhook(updatedChat, incomingMsg);
    }
  };

  // Toggle AI for a specific chat
  const handleToggleChatAi = (chatId: string) => {
    setChats((prev) =>
      prev.map((c) => {
        if (c.id === chatId) {
          const nextState = !c.ai_enabled;
          return { ...c, ai_enabled: nextState };
        }
        return c;
      })
    );
  };

  // Create New Customer Chat
  const handleCreateNewChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName.trim()) return;

    const newChat: CustomerChat = {
      id: `chat_${Date.now()}`,
      customer_name: newCustomerName.trim(),
      customer_phone: newCustomerPhone.trim() || '(11) 99000-0000',
      last_message: 'Conversa iniciada',
      last_message_time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      unread_count: 0,
      status: 'online',
      ai_enabled: true,
      messages: [
        {
          id: `msg_init_${Date.now()}`,
          chat_id: `chat_${Date.now()}`,
          sender: 'store',
          sender_name: storeConfig.store_name || 'Atendimento',
          text: `Olá ${newCustomerName}! Seja bem-vindo ao atendimento via WhatsApp do ${storeConfig.store_name}. Como podemos te ajudar hoje?`,
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          status: 'sent',
        },
      ],
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setNewCustomerName('');
    setNewCustomerPhone('');
    setIsNewChatModalOpen(false);
  };

  // Select Entity from Customers list
  const handleSelectEntityForChat = (ent: Entity) => {
    const existing = chats.find((c) => c.customer_name === ent.nome_completo || c.customer_phone === ent.telefone);
    if (existing) {
      setActiveChatId(existing.id);
      setIsNewChatModalOpen(false);
      return;
    }

    const newChat: CustomerChat = {
      id: `chat_ent_${ent.id}`,
      customer_name: ent.nome_completo,
      customer_phone: ent.telefone || '(11) 90000-0000',
      customer_avatar: ent.foto_url,
      last_message: 'Nova conversa com cliente cadastrado',
      last_message_time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      unread_count: 0,
      status: 'online',
      ai_enabled: true,
      messages: [],
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setIsNewChatModalOpen(false);
  };

  // Filtered chats list
  const filteredChats = chats.filter((chat) => {
    const matchesQuery =
      chat.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.customer_phone.includes(searchQuery);

    if (filterTab === 'unread') return matchesQuery && chat.unread_count > 0;
    if (filterTab === 'ai') return matchesQuery && chat.ai_enabled;
    return matchesQuery;
  });

  // Test webhook endpoint manually
  const handleTestWebhookConnection = async () => {
    if (!webhookUrl.trim()) {
      setTestWebhookResult('❌ Por favor insira uma URL de Webhook válida primeiro.');
      return;
    }

    setTestWebhookResult('⏳ Testando conexão com o Webhook n8n...');
    try {
      const testPayload = {
        event: 'test_connection',
        source: 'ERP_ABP_Supermercado',
        timestamp: new Date().toISOString(),
      };

      const res = await fetch(webhookUrl.trim(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey.trim() ? { Authorization: `Bearer ${apiKey.trim()}` } : {}),
        },
        body: JSON.stringify(testPayload),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setTestWebhookResult(
          `✅ Webhook Conectado com Sucesso! (HTTP ${res.status})\nResposta n8n: ${JSON.stringify(data || { success: true }, null, 2)}`
        );
      } else {
        setTestWebhookResult(`⚠️ Servidor n8n respondeu com Erro HTTP ${res.status}.`);
      }
    } catch (err: any) {
      setTestWebhookResult(
        `❌ Não foi possível conectar ao Webhook n8n.\nCausa provável: CORS não configurado no n8n ou servidor offline.\nDetalhes: ${err.message}`
      );
    }
  };

  // Quick preset messages
  const quickReplies = [
    { label: '⚡ Horário de Atendimento', text: 'Nosso horário de atendimento é de Segunda a Sábado das 07h às 21h e Domingos das 08h às 14h.' },
    { label: '⚡ Chave PIX', text: `Nossa chave PIX oficial é o CNPJ: ${storeConfig.cnpj || '12.345.678/0001-90'}. Favorecido: ${storeConfig.store_name}.` },
    { label: '⚡ Taxa de Entrega', text: 'Entregamos em toda a região com taxa fixa de R$ 5,00. Pedidos acima de R$ 100,00 possuem frete grátis!' },
    { label: '⚡ Status da Entrega', text: 'Seu pedido já foi separado e está com o nosso entregador. Chegará em instantes!' },
  ];

  return (
    <div className="space-y-4">
      {/* Top Header Banner & n8n Bar */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-5 sm:p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-400/30 text-emerald-300 backdrop-blur-md">
            <MessageSquare className="w-8 h-8 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Chat WhatsApp & Atendimento IA (n8n)
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/30 border border-emerald-400/40 text-emerald-200">
                Pronto para n8n
              </span>
            </div>
            <p className="text-xs text-emerald-100/80 mt-1">
              Gerencie conversas com clientes em estilo WhatsApp integrado ao seu agente de IA via Webhook n8n.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setIsConfigOpen(true)}
            className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20 text-white font-extrabold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-2 text-xs border border-white/20 backdrop-blur-sm"
          >
            <Sliders className="w-4 h-4 text-emerald-300" /> Webhook n8n
          </button>
          <button
            onClick={() => setIsNewChatModalOpen(true)}
            className="flex-1 sm:flex-none bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-xs"
          >
            <Plus className="w-4 h-4" /> Novo Chat
          </button>
        </div>
      </div>

      {/* Main WhatsApp Layout container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px] h-[calc(100vh-220px)]">
        
        {/* Left Sidebar: Contacts & Chats (4 cols on lg) */}
        <div className="lg:col-span-4 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-950/40 h-full overflow-hidden">
          {/* Search & Filter Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3 bg-white dark:bg-slate-900">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou telefone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 pt-1">
              <button
                onClick={() => setFilterTab('all')}
                className={`flex-1 py-1.5 px-3 rounded-xl text-[11px] font-bold transition ${
                  filterTab === 'all'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                }`}
              >
                Todos ({chats.length})
              </button>
              <button
                onClick={() => setFilterTab('unread')}
                className={`flex-1 py-1.5 px-3 rounded-xl text-[11px] font-bold transition ${
                  filterTab === 'unread'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                }`}
              >
                Não Lidos ({chats.filter((c) => c.unread_count > 0).length})
              </button>
              <button
                onClick={() => setFilterTab('ai')}
                className={`flex-1 py-1.5 px-3 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 ${
                  filterTab === 'ai'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                }`}
              >
                <Bot className="w-3 h-3" /> IA n8n ({chats.filter((c) => c.ai_enabled).length})
              </button>
            </div>
          </div>

          {/* Chats List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredChats.length === 0 ? (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <MessageSquare className="w-8 h-8 mx-auto opacity-40" />
                <p className="text-xs font-bold">Nenhum chat encontrado</p>
                <p className="text-[11px]">Clique em "Novo Chat" acima para iniciar.</p>
              </div>
            ) : (
              filteredChats.map((chat) => {
                const isActive = chat.id === activeChat.id;
                return (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChatId(chat.id)}
                    className={`w-full p-3.5 text-left transition-all flex items-start gap-3 relative ${
                      isActive
                        ? 'bg-emerald-500/10 dark:bg-emerald-500/15 border-l-4 border-emerald-500'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      {chat.customer_avatar ? (
                        <img
                          src={chat.customer_avatar}
                          alt={chat.customer_name}
                          className="w-11 h-11 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                          {chat.customer_name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      {chat.status === 'online' && (
                        <span className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 absolute -bottom-0.5 -right-0.5" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                          {chat.customer_name}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                          {chat.last_message_time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate leading-snug">
                        {chat.last_message}
                      </p>

                      {/* Badges */}
                      <div className="flex items-center gap-1.5 mt-1.5">
                        {chat.ai_enabled && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                            <Bot className="w-2.5 h-2.5 text-purple-600 dark:text-purple-400" /> IA n8n
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 truncate">
                          {chat.customer_phone}
                        </span>
                        {chat.unread_count > 0 && (
                          <span className="ml-auto bg-emerald-600 text-white font-black text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                            {chat.unread_count}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Chat Area (8 cols on lg) */}
        {activeChat ? (
          <div className="lg:col-span-8 flex flex-col h-full bg-slate-100/60 dark:bg-slate-950/80">
            {/* Active Chat Header Bar */}
            <div className="p-3.5 sm:p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  {activeChat.customer_avatar ? (
                    <img
                      src={activeChat.customer_avatar}
                      alt={activeChat.customer_name}
                      className="w-10 h-10 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black flex items-center justify-center text-xs">
                      {activeChat.customer_name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                      {activeChat.customer_name}
                    </h3>
                    {activeChat.ai_enabled && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                        <Bot className="w-3 h-3 text-purple-600 dark:text-purple-400" /> Resposta IA Ativa
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <span>{activeChat.customer_phone}</span>
                    <span>•</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      {activeChat.status === 'online' ? 'Online no WhatsApp' : 'Offline'}
                    </span>
                  </p>
                </div>
              </div>

              {/* Chat Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleChatAi(activeChat.id)}
                  title={activeChat.ai_enabled ? 'Desativar IA neste chat' : 'Ativar IA neste chat'}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition flex items-center gap-1.5 ${
                    activeChat.ai_enabled
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {activeChat.ai_enabled ? 'IA n8n Ativa' : 'Ativar IA'}
                  </span>
                </button>

                <button
                  onClick={() => handleSimulateCustomerMessage()}
                  title="Simular mensagem recebida do cliente"
                  className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300 text-xs font-bold transition flex items-center gap-1"
                >
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="hidden md:inline">Simular Cliente</span>
                </button>
              </div>
            </div>

            {/* Chat Messages Body (WhatsApp Wallpaper Style) */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
              {/* Info Pill */}
              <div className="flex justify-center my-2">
                <div className="bg-amber-100/90 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-900/60 px-3 py-1.5 rounded-2xl text-[10px] font-bold shadow-xs flex items-center gap-1.5 max-w-md text-center">
                  <Shield className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>As mensagens enviadas por este canal acionam seu fluxo n8n se a chave IA estiver ligada.</span>
                </div>
              </div>

              {activeChat.messages.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <MessageSquare className="w-10 h-10 mx-auto opacity-30" />
                  <p className="text-xs font-bold">Nenhuma mensagem registrada nesta conversa.</p>
                </div>
              ) : (
                activeChat.messages.map((msg) => {
                  const isCustomer = msg.sender === 'customer';
                  const isBot = msg.sender === 'bot_n8n';

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-3.5 shadow-xs space-y-1.5 relative ${
                          isCustomer
                            ? 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-tl-xs'
                            : isBot
                            ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-tr-xs shadow-purple-600/20 shadow-md'
                            : 'bg-emerald-700 text-white rounded-tr-xs shadow-emerald-700/20 shadow-md'
                        }`}
                      >
                        {/* Header Sender Badge */}
                        <div className="flex items-center justify-between gap-3 text-[10px] font-bold opacity-80 border-b border-white/10 dark:border-slate-800 pb-1 mb-1">
                          <span className="flex items-center gap-1">
                            {isBot ? (
                              <>
                                <Bot className="w-3 h-3 text-purple-200" />
                                <span>n8n IA Assistente</span>
                              </>
                            ) : isCustomer ? (
                              <>
                                <User className="w-3 h-3 text-emerald-600" />
                                <span>{msg.sender_name || activeChat.customer_name}</span>
                              </>
                            ) : (
                              <>
                                <Store className="w-3 h-3 text-emerald-200" />
                                <span>{msg.sender_name || storeConfig.store_name}</span>
                              </>
                            )}
                          </span>

                          <span>{msg.timestamp}</span>
                        </div>

                        {/* Text Message */}
                        {msg.text && (
                          <p className="text-xs font-normal whitespace-pre-wrap leading-relaxed select-text">
                            {msg.text}
                          </p>
                        )}

                        {/* Product Attachment Card if present */}
                        {msg.product_attachment && (
                          <div className="p-2.5 bg-black/20 dark:bg-slate-950/40 rounded-xl border border-white/20 dark:border-slate-700 text-white space-y-1.5 mt-2">
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4 text-emerald-300" />
                              <span className="font-extrabold text-xs truncate">
                                {msg.product_attachment.nome}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/10">
                              <span>Estoque: <strong>{msg.product_attachment.quantidade_estoque} {msg.product_attachment.unidade}</strong></span>
                              <span className="font-extrabold text-emerald-300 text-xs">
                                R$ {msg.product_attachment.preco_venda.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Status Checkmarks */}
                        {!isCustomer && (
                          <div className="flex justify-end pt-0.5">
                            <CheckCheck className="w-3.5 h-3.5 text-white/80" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
              {isSendingWebhook && (
                <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/60 p-2.5 rounded-2xl w-fit animate-pulse">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>n8n IA está processando e gerando resposta...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Preset Replies Bar */}
            <div className="px-4 py-2 bg-slate-200/50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 shrink-0">
                Respostas Rápidas:
              </span>
              {quickReplies.map((qr, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMessageText(qr.text)}
                  className="bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 border border-slate-300 dark:border-slate-700 px-2.5 py-1 rounded-xl text-[11px] font-bold shrink-0 transition"
                >
                  {qr.label}
                </button>
              ))}
            </div>

            {/* Footer Input Bar */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(true)}
                  title="Anexar produto do estoque na conversa"
                  className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition shrink-0"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  placeholder="Digite a mensagem para o cliente..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500"
                />

                <button
                  type="submit"
                  disabled={!messageText.trim()}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-extrabold px-5 py-3 rounded-2xl shadow-md transition flex items-center gap-2 text-xs shrink-0"
                >
                  <Send className="w-4 h-4" /> Enviar
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-8 flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-3">
            <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-700" />
            <h3 className="font-extrabold text-slate-900 dark:text-white">Nenhum chat selecionado</h3>
            <p className="text-xs">Selecione uma conversa ao lado para visualizar o atendimento.</p>
          </div>
        )}
      </div>

      {/* MODAL 1: n8n Webhook Configuration Drawer/Modal */}
      {isConfigOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 rounded-xl">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Configurações do Webhook n8n (IA)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Integre o chat do supermercado com seu fluxo automatizado no n8n.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsConfigOpen(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveWebhookSettings} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  URL do Webhook do n8n:
                </label>
                <input
                  type="url"
                  placeholder="https://seu-n8n.com/webhook/whatsapp-agent"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  O ERP enviará um método <strong>POST</strong> com o payload contendo o nome do cliente, telefone e mensagem.
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Chave de API / Header Token (Opcional):
                </label>
                <input
                  type="password"
                  placeholder="Bearer token ou segredo de autenticação"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 rounded-2xl">
                <div>
                  <h4 className="font-bold text-xs text-purple-900 dark:text-purple-300">
                    Ativar Respostas IA Automáticas via n8n
                  </h4>
                  <p className="text-[11px] text-purple-700 dark:text-purple-400">
                    Quando ligado, qualquer nova mensagem de cliente será enviada ao n8n automaticamente.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={autoRespondAi}
                  onChange={(e) => setAutoRespondAi(e.target.checked)}
                  className="w-5 h-5 accent-purple-600 rounded cursor-pointer"
                />
              </div>

              {/* Test Button & Result */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <button
                  type="button"
                  onClick={handleTestWebhookConnection}
                  className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Testar Conexão com Webhook n8n
                </button>

                {testWebhookResult && (
                  <pre className="p-3 bg-slate-950 text-emerald-400 rounded-xl text-[10px] font-mono overflow-x-auto whitespace-pre-wrap max-h-40 border border-slate-800">
                    {testWebhookResult}
                  </pre>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsConfigOpen(false)}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-4 py-2.5 rounded-xl text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs shadow-md transition"
                >
                  Salvar Configurações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Attach Product from Inventory */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-emerald-600" />
                Anexar Produto do Estoque na Conversa
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar produto por nome ou código..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 divide-y divide-slate-100 dark:divide-slate-800">
              {products
                .filter(
                  (p) =>
                    p.nome.toLowerCase().includes(productSearch.toLowerCase()) ||
                    p.codigo_barras?.includes(productSearch)
                )
                .slice(0, 10)
                .map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      handleSendMessage(prod);
                      setIsProductModalOpen(false);
                    }}
                    className="p-2.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-xl cursor-pointer transition flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-bold text-xs text-slate-900 dark:text-white">{prod.nome}</p>
                      <p className="text-[10px] text-slate-500">
                        Estoque: {prod.quantidade_estoque} {prod.unidade} | Cód: {prod.codigo_barras || 'N/A'}
                      </p>
                    </div>
                    <span className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400">
                      R$ {prod.preco_venda.toFixed(2)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: New Chat Modal */}
      {isNewChatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" />
                Iniciar Nova Conversa de Atendimento
              </h3>
              <button
                onClick={() => setIsNewChatModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Select from Entities */}
            {entities.filter((e) => e.tipo_entidade === 'cliente').length > 0 && (
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Ou Selecione um Cliente Cadastrado:
                </label>
                <div className="max-h-36 overflow-y-auto space-y-1">
                  {entities
                    .filter((e) => e.tipo_entidade === 'cliente')
                    .map((ent) => (
                      <button
                        key={ent.id}
                        type="button"
                        onClick={() => handleSelectEntityForChat(ent)}
                        className="w-full p-2 text-left bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between"
                      >
                        <span>{ent.nome_completo}</span>
                        <span className="text-[10px] text-slate-400">{ent.telefone || 'Sem fone'}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}

            <form onSubmit={handleCreateNewChat} className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Nome do Cliente:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Ferreira"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Telefone / WhatsApp:
                </label>
                <input
                  type="text"
                  placeholder="(11) 99999-8888"
                  value={newCustomerPhone}
                  onChange={(e) => setNewCustomerPhone(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewChatModalOpen(false)}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-4 py-2 rounded-xl text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-md transition"
                >
                  Iniciar Chat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
