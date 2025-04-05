import { create } from "zustand";
import { Product } from "../interfaces/product";

interface CartStore {
  items: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
}

const removeFirst = (product: Product, items: Product[]): Product[] => {
  const index = items.findIndex((p) => p.id === product.id);
  if (index === -1) return items;
  return [...items.slice(0, index), ...items.slice(index + 1)];
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addToCart: (product: Product) =>
    set((state) => ({ items: [product, ...state.items] })),
  removeFromCart: (product: Product) =>
    set((state) => ({
      items: removeFirst(product, state.items),
    })),
  clearCart: () => set({ items: [] }),
}));