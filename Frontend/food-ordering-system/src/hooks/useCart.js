import { useState, useEffect, useCallback } from 'react';
import cartService from '../services/cartService';

const useCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await cartService.getCart();
      setCart(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = async (menuItemId, quantity) => {
    try {
      await cartService.addItem({ menuItemId, quantity });
      await fetchCart();
    } catch (err) {
      throw err;
    }
  };

  const updateItem = async (cartItemId, quantity) => {
    try {
      await cartService.updateItem(cartItemId, { quantity });
      await fetchCart();
    } catch (err) {
      throw err;
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      await cartService.removeItem(cartItemId);
      await fetchCart();
    } catch (err) {
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCart(null);
    } catch (err) {
      throw err;
    }
  };

  const itemCount = cart?.itemCount || 0;

  return { cart, loading, error, fetchCart, addItem, updateItem, removeItem, clearCart, itemCount };
};

export default useCart;
