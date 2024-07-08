"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import useCart from "@/hooks/use-cart";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { currentUser } from "@/hooks/use-auth";

type CheckoutProps = {
  params: {
    domain: string;
  };
};

const SuccessPage = ({ params }: CheckoutProps) => {
  const searchParams = useSearchParams();
  const cart = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCartInitialized, setIsCartInitialized] = useState(false);

  const reference = searchParams.get("reference");

  useEffect(() => {
    const initializeCart = async () => {
      // Adding a delay to allow Zustand to initialize the cart state
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsCartInitialized(true);
    };

    initializeCart();
  }, []);

  useEffect(() => {
    if (isProcessing || !isCartInitialized) return;

    if (!reference) {
      // Handle case where reference is missing
      toast({
        variant: "destructive",
        description: "Payment reference not found",
      });
      router.push("/"); // Redirect to home or another appropriate page
      return;
    }

    const verifyPaymentAndCreateOrder = async () => {
      setIsProcessing(true);

      const user = await currentUser();

      const session = await getCookie("customer-details");

      if (!session) {
        toast({
          variant: "destructive",
          description: "Customer details not found",
        });
        setIsProcessing(false);
        return;
      }

      const customer = JSON.parse(session as string);

      // Log cart items
      console.log("Cart items:", cart.items);

      try {
        const verifyResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/${params.domain}/verify-payment`,
          {
            params: { reference },
          }
        );

        console.log(verifyResponse.data.success);

        if (verifyResponse.data.success) {
          const orderResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/${params.domain}/order`,
            {
              products: cart.items,
              address: customer?.address,
              phone: customer?.phone,
              customerId: user?.id,
            }
          );

          console.log("Order response:", orderResponse.data);

          if (orderResponse.data.success) {
            cart.removeAll();
            await deleteCookie("customer-details");
            toast({
              description: "Payment successful and order created",
            });
          } else {
            toast({
              variant: "destructive",
              description: "Order creation failed",
            });
          }
        } else {
          toast({
            variant: "destructive",
            description: "Payment verification failed",
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          description: "An error occurred during payment verification",
        });
        console.error(
          "Error during payment verification and order creation:",
          error
        );
      } finally {
        setIsProcessing(false);
      }
    };

    verifyPaymentAndCreateOrder();
  }, [
    reference,
    params.domain,
    router,
    cart.items,
    isProcessing,
    isCartInitialized,
  ]);

  return <div>Payment Successful! Thank you for your purchase.</div>;
};

export default SuccessPage;
