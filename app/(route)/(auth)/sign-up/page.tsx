import { SignUpForm } from "@/components/auth/sign-up-form";
import { getStoreDetails } from "@/lib/queries";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const store = await getStoreDetails();

  if (!store) {
    redirect("/site");
  }

  return <SignUpForm storeId={store.id} />;
};

export default SignUpPage;
