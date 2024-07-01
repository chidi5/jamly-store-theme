import { SignUpForm } from "@/components/auth/sign-up-form";

type SignUpFormProps = {
  params: {
    domain: string;
  };
};

const SignUpPage = ({ params }: SignUpFormProps) => {
  return <SignUpForm storeId={params.domain} />;
};

export default SignUpPage;
