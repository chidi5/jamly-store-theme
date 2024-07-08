"use client";

import { useEffect, useState, useMemo } from "react";
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
  const [isMounted, setIsMounted] = useState(false);

  const reference = searchParams.get("reference");

  // Memoize cart items to avoid unnecessary re-renders
  const memoizedCartItems = useMemo(() => cart.items, [cart.items]);

  useEffect(() => {
    const initializeCart = async () => {
      // Adding a delay to allow Zustand to initialize the cart state
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsCartInitialized(true);
    };

    initializeCart();
  }, []);

  useEffect(() => {
    const verifyPaymentAndCreateOrder = async () => {
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

      setIsProcessing(true);

      const user = await currentUser();

      let customer;

      if (!isMounted) {
        const session = getCookie("customer-details");
        if (!session) {
          toast({
            variant: "destructive",
            description: "Customer details not found",
          });
          setIsProcessing(false);
          return;
        }

        customer = JSON.parse(session as string);
      }

      try {
        const verifyResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/${params.domain}/verify-payment`,
          {
            params: { reference },
          }
        );

        if (verifyResponse.data.success) {
          const orderResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/${params.domain}/order`,
            {
              products: memoizedCartItems,
              address: customer?.address,
              phone: customer?.phone,
              customerId: user?.id,
            }
          );

          if (orderResponse.data.success) {
            toast({
              description: "Payment successful and order created",
            });
            setIsMounted(true);
            cart.removeAll();
            deleteCookie("customer-details");
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

    if (isCartInitialized && !isProcessing) {
      verifyPaymentAndCreateOrder();
    }
  }, [
    reference,
    params.domain,
    router,
    memoizedCartItems,
    isProcessing,
    isCartInitialized,
  ]);

  return <div>Payment Successful! Thank you for your purchase.</div>;
};

export default SuccessPage;
