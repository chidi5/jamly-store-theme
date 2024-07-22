"use client";

import useCart from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { Store } from "@/types";
import Link from "next/link";
import Currency from "./currency";
import { buttonVariants } from "./ui/button";
import { SheetClose, SheetFooter } from "./ui/sheet";

type CartSummaryProps = {
  store: Store;
};

const CartSummary = ({ store }: CartSummaryProps) => {
  const items = useCart((state) => state.items);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.variantTotal);
  }, 0);

  return (
    <>
      <div className="space-y-1.5 text-sm">
        <div className="flex">
          <span className="flex-1">Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex">
          <span className="flex-1">Total</span>
          <span>
            <Currency value={totalPrice} />
          </span>
        </div>
      </div>

      <SheetFooter>
        <SheetClose className="w-full" asChild>
          <Link href="/checkout" className={cn(buttonVariants(), "w-full")}>
            Checkout
          </Link>
        </SheetClose>
      </SheetFooter>
    </>
  );
};

export default CartSummary;
