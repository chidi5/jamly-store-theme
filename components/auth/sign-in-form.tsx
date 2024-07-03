"use client";

import CardWrapper from "@/components/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signIn } from "@/lib/utils/auth";
import { CustomerSignInSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type UserFormData = z.infer<typeof CustomerSignInSchema>;

type SignInFormProps = {
  storeId: string;
};

export const SignInForm = ({ storeId }: SignInFormProps) => {
  const router = useRouter();
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<UserFormData>({
    resolver: zodResolver(CustomerSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: UserFormData) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const response = await signIn(data.email, data.password, storeId);
      if (response?.error) {
        setError(response.error);
      }
      if (response?.success) {
        form.reset();
        setSuccess(response.success);
        router.push("/");
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Sign in"
      backButtonLabel="Don't have an account?"
      backButtonHref="/sign-up"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={loading}
                    placeholder="Email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="flex items-center">
                    <>Password</>
                    <Button
                      size="sm"
                      variant="link"
                      asChild
                      className="p-0 font-normal ml-auto text-muted-foreground"
                    >
                      <Link href="/reset">Forgot password?</Link>
                    </Button>
                  </div>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      disabled={loading}
                      placeholder="Password"
                      {...field}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                      <EyeIcon
                        onClick={() => setShowPassword(!showPassword)}
                        className={cn(
                          "w-4 h-4 text-muted-foreground cursor-pointer",
                          showPassword && "hidden"
                        )}
                      />
                      <EyeOffIcon
                        onClick={() => setShowPassword(!showPassword)}
                        className={cn(
                          "w-4 h-4 text-muted-foreground cursor-pointer",
                          !showPassword && "hidden"
                        )}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={loading} className="w-full">
            Continue &nbsp; {loading && <Spinner />}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
