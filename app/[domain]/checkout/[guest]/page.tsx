import CheckOutForm from "@/components/checkout-form";
import { getStore } from "@/lib/queries";

type CheckoutProps = {
  params: {
    domain: string;
  };
};

const CheckoutGuestPage = async ({ params }: CheckoutProps) => {
  const store = await getStore(params.domain);

  return <CheckOutForm storeId={params.domain} store={store} />;
};

export default CheckoutGuestPage;
