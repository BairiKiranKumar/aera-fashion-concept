"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "@/types/commerce";

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aera_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem("aera_cart", JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (newItem: Omit<CartItem, "id">) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) =>
          i.productId === newItem.productId &&
          i.color === newItem.color &&
          i.size === newItem.size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }

      const id = `${newItem.productId}-${newItem.color}-${newItem.size}-${Date.now()}`;
      return [...prev, { ...newItem, id }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
