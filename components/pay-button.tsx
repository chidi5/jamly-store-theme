"use client";

import useCart from "@/hooks/use-cart";
import { useUser } from "@/hooks/use-user";
import { CheckoutFormData } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Loader from "./loader";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

interface PayButtonProps {
  totalPrice: number;
  storeId: string;
  formData?: CheckoutFormData;
  onSubmit: () => Promise<void>;
}

const PayButton: React.FC<PayButtonProps> = ({
  totalPrice,
  storeId,
  formData,
  onSubmit,
}) => {
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  const [loading, setLoading] = useState(false);

  const initializePayment = async () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    setLoading(true);
    try {
      await onSubmit();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/${storeId}/checkout`,
        {
          products: cart.items,
          amount: totalPrice,
          customerId: user?.id,
          phone: formData?.phone,
          address: formData?.address,
        }
      );

      const { authorizationUrl } = response.data;

      if (authorizationUrl) {
        router.push(authorizationUrl);
      } else {
        toast({ variant: "destructive", description: "Checkout failed" });
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
      toast({
        variant: "destructive",
        description: "An error occurred while initializing payment",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="submit"
        disabled={loading}
        className="w-full"
        onClick={initializePayment}
      >
        Checkout
      </Button>
      <Loader show={loading} />
    </>
  );
};

export default PayButton;
