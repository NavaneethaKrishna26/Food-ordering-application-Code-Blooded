import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../api/apiClient';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [], totalAmount: 0, itemCount: 0, restaurantId: null });
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user || user.role !== 'CUSTOMER') {
      setCart({ items: [], totalAmount: 0, itemCount: 0, restaurantId: null });
      return;
    }
    try {
      const res = await api.getCart();
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (menuItemId, quantity = 1) => {
    setLoading(true);
    try {
      const res = await api.addToCart({ menuItemId, quantity });
      setCart(res.data);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      const res = await api.updateCartItem(cartItemId, quantity);
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    try {
      await api.clearCart();
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateQuantity, clearCart, refreshCart: fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
