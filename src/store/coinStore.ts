import { create } from "zustand";

type CoinStore = {
  coins: number;
  addCoins: (amount: number) => void;
  buyWithCoins: (amount: number) => boolean; // true: 성공, false: 실패
  reset: () => void;
};

export const useCoinStore = create<CoinStore>((set, get) => ({
  coins: Number(localStorage.getItem("coins")) || 0,
  addCoins: (amount) =>
    set((state) => {
      localStorage.setItem("coins", `${state.coins + amount}`);
      return { coins: state.coins + amount };
    }),
  buyWithCoins: (amount) => {
    const { coins } = get();
    if (coins >= amount) {
      localStorage.setItem("coins", `${coins + amount}`);
      set({ coins: coins - amount });
      return true;
    }
    return false;
  },
  reset: () => set({ coins: 0 }),
}));
