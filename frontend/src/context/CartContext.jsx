import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Ajouter au panier
  const addToCart = (service) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === service._id);
      if (exists) return prev; // On évite les doublons pour des services
      return [...prev, service];
    });
  };

  // Supprimer du panier
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  // Calculer le total
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);