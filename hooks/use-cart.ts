import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItems, Product } from "@/types";
import { toast } from "@/components/ui/use-toast";

type CartStore = {
  items: CartItems[];
  addItem: (data: CartItems) => void;
  removeItem: (data: CartItems) => void;
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
                JSON.stringify(data.selectedOptions)) &&
            item.variantTitle === data.variantTitle
        );

        if (existingItem) {
          return toast({ description: "Item already in cart." });
        }
        set({ items: [...get().items, data] });
        toast({ description: "Item added to cart." });
      },
      removeItem: (data: any) => {
        const currentItems = get().items;

        const newItems = currentItems.filter((item) => {
          if (item.id === data.id) {
            if (data.variantTitle && item.variantTitle === data.variantTitle) {
              return (
                JSON.stringify(item.selectedOptions) !==
                JSON.stringify(data.selectedOptions)
              );
            } else if (
              data.selectedOptions &&
              JSON.stringify(item.selectedOptions) ===
                JSON.stringify(data.selectedOptions)
            ) {
              return item.variantTitle !== data.variantTitle;
            } else if (!data.variantTitle && !data.selectedOptions) {
              return false; // Remove this item based on id
            }
          }
          return true;
        });

        set({ items: newItems });
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
