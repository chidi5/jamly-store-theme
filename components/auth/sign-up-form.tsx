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
import { SignUp } from "@/lib/utils/auth";
import { CustomerSignUpSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type UserFormData = z.infer<typeof CustomerSignUpSchema>;

type SignUpFormProps = {
  storeId: string;
};

export const SignUpForm = ({ storeId }: SignUpFormProps) => {
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<UserFormData>({
    resolver: zodResolver(CustomerSignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: UserFormData) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const response = await SignUp(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        storeId
      );
      if (response?.error) {
        setError(response.error);
      }
      if (response?.success) {
        form.reset();
        setSuccess(response.success);
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Sign up"
      backButtonLabel="Already have an account?"
      backButtonHref="/sign-in"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder="First name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder="Last name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
