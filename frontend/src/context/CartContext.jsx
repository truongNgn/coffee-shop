import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find(
        (p) => p.id === product.id && p.size === product.size
      );
      if (exist) {
        return prev.map((p) =>
          p.id === product.id && p.size === product.size
            ? { ...p, qty: p.qty + product.qty }   // ✅ add correct qty
            : p
        );
      } else {
        return [...prev, { ...product }]; // ✅ product already has qty
      }
    });
  };



  const removeFromCart = (id, size) => {
  setCart((prev) => prev.filter((p) => !(p.id === id && p.size === size)));
};

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
