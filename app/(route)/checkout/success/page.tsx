import SuccessPage from "@/components/success-page";
import { getStoreDetails } from "@/lib/queries";
import { redirect } from "next/navigation";

const page = async () => {
  const store = await getStoreDetails();

  if (!store) redirect("/site");

  return <SuccessPage storeId={store.id} />;
};

export default page;
