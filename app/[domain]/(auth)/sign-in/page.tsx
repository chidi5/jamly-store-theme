import { SignInForm } from "@/components/auth/sign-in-form";

type SignInFormProps = {
  params: {
    domain: string;
  };
};

const SignInPage = ({ params }: SignInFormProps) => {
  return <SignInForm storeId={params.domain} />;
};

export default SignInPage;
