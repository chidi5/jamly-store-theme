"use client";

import { toast } from "@/components/ui/use-toast";
import { currentUser } from "@/hooks/use-auth";
import useCart from "@/hooks/use-cart";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { headers } from "next/headers";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type SuccessProps = {
  storeId: string;
};

const SuccessPage = ({ storeId }: SuccessProps) => {
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
      if (isProcessing || !isCartInitialized || isMounted) return;

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
        const verifyResponse = axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/${storeId}/verify-payment`,
          { params: { reference } }
        );

        const orderResponse = axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/${storeId}/order`,
          {
            products: memoizedCartItems,
            guest: customer.email,
            address: customer?.address,
            phone: customer?.phone,
            customerId: user?.id,
          }
        );

        const [verifyResult, orderResult] = await Promise.all([
          verifyResponse,
          orderResponse,
        ]);

        const isPaymentSuccess = verifyResult.data.success;
        const isOrderSuccess = orderResult.data.success;

        if (isPaymentSuccess && isOrderSuccess) {
          toast({
            description: "Payment successful and order created",
          });
          setIsMounted(true); // Ensures the effect won't run again
          cart.removeAll();
          deleteCookie("customer-details");
          router.push("/");
        } else {
          if (!isPaymentSuccess) {
            toast({
              variant: "destructive",
              description: "Payment verification failed",
            });
          }

          if (!isOrderSuccess) {
            toast({
              variant: "destructive",
              description: "Order creation failed",
            });
          }
        }
      } catch (error) {
        toast({
          variant: "destructive",
          description:
            "An error occurred during payment verification and order creation",
        });
        console.error(
          "Error during payment verification and order creation:",
          error
        );
      } finally {
        setIsProcessing(false);
      }
    };

    if (isCartInitialized && !isProcessing && !isMounted) {
      verifyPaymentAndCreateOrder();
    }
  }, [
    reference,
    storeId,
    router,
    memoizedCartItems,
    isProcessing,
    isCartInitialized,
    isMounted,
  ]);

  return (
    <div className="my-20">
      Payment Successful! Thank you for your purchase.
    </div>
  );
};

export default SuccessPage;
