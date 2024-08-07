"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCart from "@/hooks/use-cart";
import { CheckoutSchema } from "@/schemas";
import { Customer, Store } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Currency from "./currency";
import PayButton from "./pay-button";
import { Button } from "./ui/button";

type UserFormData = z.infer<typeof CheckoutSchema>;

type CheckOutFormProps = {
  storeId: string;
  customer?: Customer;
  store: Store;
};

const CheckOutForm = ({ storeId, customer, store }: CheckOutFormProps) => {
  const cart = useCart();
  const [formData, setFormData] = useState<UserFormData | null>(null);

  function addressStringToObject(addressString: string) {
    if (!addressString)
      return { address: "", city: "", zipCode: "", state: "", country: "" };
    const [address, city, zipCode, state, country] = addressString
      .split(",")
      .map((part) => part.trim());
    return {
      address: address,
      city: city,
      zipCode: zipCode,
      state: state,
      country: country,
    };
  }

  const customerAddress = customer
    ? addressStringToObject(customer.address)
    : { address: "", city: "", zipCode: "", state: "", country: "" };

  const formattedProducts = cart.items.map((product: any) => ({
    productId: product.id,
    name: product.name,
    quantity: product.variantQuantity,
    price: product.variantTotal,
    image: product.images[0].url,
  }));

  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number(item.variantTotal);
  }, 0);

  const form = useForm<UserFormData>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: customer
      ? {
          email: customer.email || "",
          phone: customer.phone || "",
          address: {
            address: customerAddress.address,
            city: customerAddress.city,
            zipCode: customerAddress.zipCode,
            state: customerAddress.state,
            country: customerAddress.country,
          },
        }
      : {
          email: "",
          phone: "",
          isCustomerInfo: false,
          address: {
            address: "",
            city: "",
            zipCode: "",
            state: "",
            country: "",
          },
        },
  });

  const onSubmit = async (data: UserFormData) => {
    setCookie("customer-details", JSON.stringify(data));
  };

  return (
    <MaxWidthWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 my-10 h-full">
        <div className="border-b md:border-r md:border-b-0 pb-6 px-4 lg:px-16 space-y-4">
          <h2 className="font-medium text-muted-foreground">
            Pay {store.name}
          </h2>
          <Currency value={totalPrice} className="text-slate-950 text-4xl" />
          <>
            {formattedProducts.map((product) => (
              <div
                key={product.productId}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-8 pt-10 mb-3"
              >
                <div className=" flex flex-col items-start text-sm space-y-1">
                  <h2 className="font-medium">{product.name}</h2>
                  <p className="text-muted-foreground">
                    Qty {product.quantity}
                  </p>
                </div>
                <Currency
                  value={product.price}
                  className="text-sm md:text-right font-medium text-slate-950"
                />
              </div>
            ))}
          </>
        </div>
        <div className="px-4 lg:px-16 space-y-4">
          <h2 className="font-medium">Shipping Information</h2>
          <Form {...form}>
            <form
              className="space-y-5 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="phone"
                        placeholder="phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="border p-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="address.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="text" placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="text" placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Post code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="text" placeholder="State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="text" placeholder="Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {customer && (
                <FormField
                  control={form.control}
                  name="isCustomerInfo"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Save details</FormLabel>
                        <FormDescription>
                          This will save the phone and address as default
                          details
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              )}
              <PayButton
                totalPrice={totalPrice}
                storeId={storeId}
                handleSubmit={form.handleSubmit}
                onSubmit={onSubmit}
              />
            </form>
          </Form>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default CheckOutForm;
