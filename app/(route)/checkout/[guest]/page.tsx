import CheckOutForm from "@/components/checkout-form";
import { getStoreDetails } from "@/lib/queries";
import { redirect } from "next/navigation";

const CheckoutGuestPage = async () => {
  const store = await getStoreDetails();

  if (!store) redirect("/site");

  return <CheckOutForm storeId={store.id} store={store} />;
};

export default CheckoutGuestPage;
