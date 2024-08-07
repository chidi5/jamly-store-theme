import { SignInForm } from "@/components/auth/sign-in-form";
import { getStoreDetails } from "@/lib/queries";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const store = await getStoreDetails();

  if (!store) {
    redirect("/site");
  }

  return <SignInForm storeId={store.id} />;
};

export default SignInPage;
