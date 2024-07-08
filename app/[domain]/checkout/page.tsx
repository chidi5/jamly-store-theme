import CheckOutForm from "@/components/checkout-form";
import { currentUser } from "@/hooks/use-auth";
import { getCustomerById, getStore } from "@/lib/queries";
import { redirect } from "next/navigation";
import React from "react";

type CheckoutProps = {
  params: {
    domain: string;
  };
};

const CheckoutPage = async ({ params }: CheckoutProps) => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const customer = await getCustomerById(user.id, params.domain);

  const store = await getStore(params.domain);

  return (
    <CheckOutForm storeId={params.domain} customer={customer} store={store} />
  );
};

export default CheckoutPage;
