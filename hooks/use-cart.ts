import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItems, Product } from "@/types";
import { toast } from "@/components/ui/use-toast";

type CartStore = {
  items: CartItems[];
  addItem: (data: CartItems) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
};

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: any) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) =>
            item.id === data.id &&
            (!item.selectedOptions ||
              JSON.stringify(item.selectedOptions) ===
                JSON.stringify(data.selectedOptions))
        );

        if (existingItem) {
          return toast({ description: "Item already in cart." });
        }
        set({ items: [...get().items, data] });
        toast({ description: "Item added to cart." });
      },
      removeItem: (id: string) => {
        set({
          items: [...get().items.filter((item) => item.id !== id)],
        });
        toast({ description: "Item removed from cart." });
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
