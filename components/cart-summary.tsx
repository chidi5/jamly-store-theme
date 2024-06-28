"use client";

import useCart from "@/hooks/use-cart";
import { PaymentConfig, Store } from "@/types";
import { useRouter } from "next/navigation";
import { PaystackButton } from "react-paystack";
import Currency from "./currency";
import { Button, buttonVariants } from "./ui/button";
import { SheetClose, SheetFooter } from "./ui/sheet";
import { toast } from "./ui/use-toast";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type CartSummaryProps = {
  store: Store;
};

const CartSummary = ({ store }: CartSummaryProps) => {
  const router = useRouter();
  const items = useCart((state) => state.items);
  const [publicKey, setPublicKey] = useState("");

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.variantPrice);
  }, 0);

  useEffect(() => {
    const getActivePublicKey = (configs: PaymentConfig[]) => {
      const activeConfig = configs.find((config) => config.isActive);
      setPublicKey(activeConfig!.publicKey);
    };

    if (store.paymentConfigs.length > 0) {
      getActivePublicKey(store.paymentConfigs);
    }
  }, [store]);

  //const publicKey = getActivePublicKey(store.paymentConfigs);

  const config = {
    reference: new Date().getTime().toString(),
    email: "joshdash.ji@gmail.com",
    amount: totalPrice * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: publicKey,
  };

  const handlePaystackSuccessAction = async (reference: string) => {
    toast({
      title: "Payment successfull",
      description: "Your payment has been successfully processed. ",
    });
    router.push("/store");
    console.log(reference);
  };

  const handlePaystackCloseAction = () => {
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Checkout",
    type: "submit",
    onSuccess: (reference: string) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

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
        <SheetClose asChild>
          <Link href="" className="p-0 w-full">
            <PaystackButton
              {...componentProps}
              className={cn(buttonVariants(), "w-full")}
            />
          </Link>
        </SheetClose>
      </SheetFooter>
    </>
  );
};

export default CartSummary;
