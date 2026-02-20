import { createContext, useContext, useState, useCallback } from 'react';
import api from '../api/axios';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const refreshCart = useCallback(async () => {
    try {
      const res = await api.get('/cart');
      const items = res.data.items || [];
      setCartItems(items);
      setCartCount(items.length);
      setCartTotal(res.data.total || 0);
    } catch {
      setCartItems([]);
      setCartCount(0);
      setCartTotal(0);
    }
  }, []);

  const clearCartCount = () => {
    setCartCount(0);
    setCartItems([]);
    setCartTotal(0);
  };

  return (
    <CartContext.Provider value={{ cartCount, cartItems, cartTotal, refreshCart, clearCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);