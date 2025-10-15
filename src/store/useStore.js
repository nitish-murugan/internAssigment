import { create } from 'zustand';

// Load initial state from localStorage
const loadState = () => {
  try {
    const savedState = localStorage.getItem('orange-juice-store');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Error loading state:', error);
  }
  return {};
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const stateToSave = {
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      cart: state.cart,
      favorites: state.favorites,
      orders: state.orders,
      viewMode: state.viewMode,
    };
    localStorage.setItem('orange-juice-store', JSON.stringify(stateToSave));
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

const initialState = loadState();

const useStore = create((set, get) => ({
  // User state
  user: initialState.user || null,
  isAuthenticated: initialState.isAuthenticated || false,
  
  // Cart state
  cart: initialState.cart || [],
  
  // Favorites
  favorites: initialState.favorites || [],
  
  // Orders
  orders: initialState.orders || [],
  
  // UI state
  viewMode: initialState.viewMode || 'grid',
  
  // Auth actions
  login: (userData) => {
    set({ user: userData, isAuthenticated: true });
    saveState(get());
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false, cart: [] });
    saveState(get());
  },
  
  updateUser: (userData) => {
    set({ user: userData });
    saveState(get());
  },
      
      // Cart actions
      addToCart: (product, size, quantity = 1, addons = []) => {
        const cart = get().cart;
        const existingItemIndex = cart.findIndex(
          item => item.product.id === product.id && 
                  item.size === size && 
                  JSON.stringify(item.addons) === JSON.stringify(addons)
        );
        
        if (existingItemIndex > -1) {
          const newCart = [...cart];
          newCart[existingItemIndex].quantity += quantity;
          set({ cart: newCart });
        } else {
          set({
            cart: [...cart, {
              id: `${product.id}-${size}-${Date.now()}`,
              product,
              size,
              quantity,
              addons
            }]
          });
        }
        saveState(get());
      },
      
      removeFromCart: (itemId) => {
        set({ cart: get().cart.filter(item => item.id !== itemId) });
        saveState(get());
      },
      
      updateCartItemQuantity: (itemId, quantity) => {
        const cart = get().cart;
        const newCart = cart.map(item =>
          item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
        );
        set({ cart: newCart });
        saveState(get());
      },
      
      clearCart: () => {
        set({ cart: [] });
        saveState(get());
      },
      
      getCartTotal: () => {
        const cart = get().cart;
        return cart.reduce((total, item) => {
          const basePrice = item.product.price;
          const addonsPrice = item.addons.reduce((sum, addon) => sum + (addon.price || 0), 0);
          return total + (basePrice + addonsPrice) * item.quantity;
        }, 0);
      },
      
      getCartItemsCount: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },
      
      // Favorites actions
      toggleFavorite: (productId) => {
        const favorites = get().favorites;
        if (favorites.includes(productId)) {
          set({ favorites: favorites.filter(id => id !== productId) });
        } else {
          set({ favorites: [...favorites, productId] });
        }
        saveState(get());
      },
      
      isFavorite: (productId) => {
        return get().favorites.includes(productId);
      },
      
      // Orders actions
      addOrder: (order) => {
        set({ orders: [order, ...get().orders] });
        saveState(get());
      },
      
      updateOrderStatus: (orderId, status) => {
        const orders = get().orders;
        const newOrders = orders.map(order =>
          order.id === orderId ? { ...order, status } : order
        );
        set({ orders: newOrders });
        saveState(get());
      },
      
      // UI actions
      setViewMode: (mode) => {
        set({ viewMode: mode });
        saveState(get());
      },
}));

export default useStore;
