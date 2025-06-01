import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../data/products";

type PurchaseState = {
  purchases: Product[];
  addPurchase: (product: Product) => void;
  reset: () => void;
};

export const usePurchaseStore = create<PurchaseState>()(
  persist(
    (set) => ({
      purchases: [],
      addPurchase: (product) =>
        set((state) => ({
          purchases: [...state.purchases, product],
        })),
      reset: () => set({ purchases: [] }),
    }),
    { name: "purchase-storage" }
  )
);
