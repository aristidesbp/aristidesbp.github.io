import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { MenuItemCard } from './components/MenuItemCard';
import { CartBar } from './components/CartBar';
import { CheckoutModal } from './components/CheckoutModal';
import { ItemCustomModal } from './components/ItemCustomModal';
import { MENU_ITEMS, CATEGORIES, RESTAURANT_INFO } from './data/menu';
import { MenuItem, CartItem, CategoryId } from './types';
import { Phone, Clock, MapPin, CheckCircle2 } from 'lucide-react';

const CART_STORAGE_KEY = 'tapiocaria_sabor_arte_cart_v1';

export default function App() {
  // State initialization with localStorage fallback
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeCategory, setActiveCategory] = useState<CategoryId>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  // Toast timer auto dismissal
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Cart helper functions
  const handleUpdateQuantity = (item: MenuItem, change: number) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (ci) => ci.menuItem.id === item.id
      );

      if (existingIndex > -1) {
        const newQty = prevCart[existingIndex].quantity + change;
        if (newQty <= 0) {
          return prevCart.filter((ci) => ci.menuItem.id !== item.id);
        }
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else if (change > 0) {
        setToastMessage(`Adicionado: ${item.name}`);
        return [...prevCart, { menuItem: item, quantity: change }];
      }
      return prevCart;
    });
  };

  const handleUpdateQuantityById = (menuItemId: string, change: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((ci) => {
          if (ci.menuItem.id === menuItemId) {
            const newQty = ci.quantity + change;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (menuItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.menuItem.id !== menuItemId));
  };

  const handleClearCart = () => {
    if (window.confirm('Tem certeza que deseja esvaziar a sacola?')) {
      setCart([]);
    }
  };

  const handleSaveNotes = (notes: string) => {
    if (!customizingItem) return;
    setCart((prev) =>
      prev.map((ci) =>
        ci.menuItem.id === customizingItem.id ? { ...ci, notes } : ci
      )
    );
    setToastMessage(`Observação salva para ${customizingItem.name}`);
  };

  // Filtered menu calculation
  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'todos' || item.category === activeCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Derived calculations
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#1e1b19] pb-28 sm:pb-32 selection:bg-[#712c00] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#712c00] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 border border-[#ffb693]/40 animate-fadeIn pointer-events-none">
          <CheckCircle2 className="w-4 h-4 text-[#ffb693]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <Header />

      {/* Sticky Category & Search Navigation */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="max-w-xl mx-auto px-4 mt-6 space-y-8">
        {searchQuery && (
          <div className="flex items-center justify-between text-xs text-[#887269] pb-1 border-b border-[#dcc1b6]">
            <span>
              Resultados para "<strong>{searchQuery}</strong>":
            </span>
            <span className="font-bold text-[#712c00]">
              {filteredMenuItems.length}{' '}
              {filteredMenuItems.length === 1 ? 'item' : 'itens'}
            </span>
          </div>
        )}

        {filteredMenuItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#dcc1b6] p-6 space-y-3">
            <span className="text-3xl block">🔍</span>
            <h3 className="font-bold text-[#1e1b19]">Nenhum item encontrado</h3>
            <p className="text-xs text-[#887269]">
              Tente buscar por outro termo ou mude a categoria selecionada.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('todos');
              }}
              className="mt-2 text-xs font-bold text-[#712c00] underline"
            >
              Ver todo o cardápio
            </button>
          </div>
        ) : (
          /* Render Categories */
          CATEGORIES.filter((c) => c.id !== 'todos').map((category) => {
            const categoryItems = filteredMenuItems.filter(
              (item) => item.category === category.id
            );

            if (categoryItems.length === 0) return null;

            return (
              <section key={category.id} id={category.id} className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#dcc1b6] pb-2">
                  <h2 className="text-lg sm:text-xl font-bold text-[#712c00] flex items-center gap-2">
                    <span className="text-xl">{category.icon}</span>
                    <span>{category.name}</span>
                  </h2>
                  <span className="text-xs font-semibold text-[#887269]">
                    {categoryItems.length}{' '}
                    {categoryItems.length === 1 ? 'opção' : 'opções'}
                  </span>
                </div>

                <div className="space-y-3">
                  {categoryItems.map((item) => {
                    const cartItem = cart.find(
                      (ci) => ci.menuItem.id === item.id
                    );
                    return (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        cartItem={cartItem}
                        onUpdateQuantity={handleUpdateQuantity}
                        onOpenNotesModal={setCustomizingItem}
                      />
                    );
                  })}
                </div>
              </section>
            );
          })
        )}
      </main>

      {/* Floating Cart Bar (Bottom sticky trigger) */}
      <CartBar
        itemCount={totalCartCount}
        totalPrice={totalCartPrice}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* 
        CHECKOUT DRAWER / MODAL
        Fixes "tela preta transparente que impede a edição do formulário":
        Modal mounts cleanly ONLY when isCheckoutOpen is true, with explicit z-index separation.
      */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantityById}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Item Notes Customization Modal */}
      <ItemCustomModal
        item={customizingItem}
        currentNotes={
          cart.find((ci) => ci.menuItem.id === customizingItem?.id)?.notes
        }
        onClose={() => setCustomizingItem(null)}
        onSaveNotes={handleSaveNotes}
      />

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-[#887269] py-8 border-t border-[#dcc1b6]/60 bg-[#eee7e3]/50">
        <div className="max-w-md mx-auto px-4 space-y-3">
          <p className="font-extrabold text-[#712c00] text-sm">
            {RESTAURANT_INFO.name}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 text-[11px] text-[#55433a]">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#c2410c]" />
              {RESTAURANT_INFO.openingHours}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#c2410c]" />
              {RESTAURANT_INFO.address}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#c2410c]" />
              {RESTAURANT_INFO.whatsappDisplay}
            </span>
          </div>
          <p className="pt-2 text-[10px] text-[#887269]">
            © {new Date().getFullYear()} Tapiocaria Sabor & Arte. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
