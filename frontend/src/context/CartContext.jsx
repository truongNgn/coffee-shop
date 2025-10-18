import { useEffect } from "react";
import { use } from "react";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const save = localStorage.getItem("user");
  const user = save ? JSON.parse(save) : null;
  const phone = user ? user.phone : null;

  const fetchCart = async () => {
    const res = await fetch(`http://localhost:3000/cart/${phone}`);
    const data = await res.json();
    setCart(data);
  }

  useEffect(() => {
    fetchCart();
  }, []);

  // const addToCart = (product) => {
  //   setCart((prev) => {
  //     const exist = prev.find(
  //       (p) => p.id === product.id && p.size === product.size
  //     );
  //     if (exist) {
  //       return prev.map((p) =>
  //         p.id === product.id && p.size === product.size
  //           ? { ...p, qty: p.qty + product.qty }   // ✅ add correct qty
  //           : p
  //       );
  //       // const save = localStorage.getItem("user");
  //       // const user = save ? JSON.parse(save) : null;
  //       // const phone = user ? user.phone : null;
  //       // fetch(`http://localhost:3000/cart`, {
  //       //   method: "PUT",
  //       //   headers: { "Content-Type": "application/json" },
  //       //   body: JSON.stringify({
  //       //     phone: phone,
  //       //     id_product: product.id,
  //       //     quantity: exist.qty + product.qty,
  //       //     size: product.size,
  //       //   })
  //       // })
  //     } else {
  //       return [...prev, { ...product }]; // ✅ product already has qty
  //     }
  //   });
  // };

  const addToCart = async (product) => {
    const exist = cart.find(p => p.id_product === product.id && p.size === product.size);

    if (exist) {
      await fetch(`http://localhost:3000/cart`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone,
          id_product: product.id,
          quantity: exist.quantity + product.qty,
          size: product.size,
        })
      });
    } else {
      await fetch(`http://localhost:3000/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone,
          id_product: product.id,
          quantity: product.qty,
          size: product.size,
        })
      });
    }
    fetchCart();
  }


  // const removeFromCart = (id, size) => {
  //   setCart((prev) => prev.filter((p) => !(p.id === id && p.size === size)));
  // };

  // const clearCart = () => setCart([]);

  const removeFromCart = async (id_product, size) => {
    await fetch(`http://localhost:3000/cart`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: phone,
        id_product: id_product,
        size: size,
      })
    });
    fetchCart();
  }

  const clearCart = async () => {
    await fetch(`http://localhost:3000/cart/all`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: phone,
      })
    });
    fetchCart();
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
