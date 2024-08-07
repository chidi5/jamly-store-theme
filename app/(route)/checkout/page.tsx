import CheckOutForm from "@/components/checkout-form";
import { currentUser } from "@/hooks/use-auth";
import { getCustomerById, getStoreDetails } from "@/lib/queries";
import { redirect } from "next/navigation";

const CheckoutPage = async () => {
  const store = await getStoreDetails();

  if (!store) redirect("/site");

  const user = await currentUser();

  if (!user) redirect("/sign-in?redirect=checkout");

  const customer = await getCustomerById(user.id, store.id);

  return <CheckOutForm storeId={store.id} customer={customer} store={store} />;
};

export default CheckoutPage;
