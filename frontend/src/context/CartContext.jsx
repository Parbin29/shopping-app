import { createContext, useContext, useState } from "react";


const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);



  const addToCart = (product) => setCart(prev => {
    // if product doesn't exist, add it to the cart
    if (!product.quantity) {
      product.quantity = 1;
    }
    // check if product is already in cart
    const isProductInCart = prev.some(p => p.id === product.id);
    if (isProductInCart) {
      return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
    }

    return [...prev, product]
  });
  const removeFromCart = (id) => setCart(prev => prev.filter(p => p.id !== id));

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}


export const useCart = () => useContext(CartContext);
