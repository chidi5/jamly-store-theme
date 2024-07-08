import useCart from "@/hooks/use-cart";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Currency from "./currency";
import Image from "next/image";

const CartItems = () => {
  const cart = useCart();

  return (
    <div className="mt-8">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {cart.items.map((product) => (
            <li key={product.id} className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <Image
                  width={20}
                  height={20}
                  unoptimized
                  src={product.images[0].url}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <Link href={`/product/${product.handle}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <div className="ml-4">
                      <Currency value={product.variantPrice} />
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.variantTitle ||
                      Object.values(product.selectedOptions ?? {}).join(", ")}
                  </p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">Qty {product.variantQuantity}</p>

                  <div className="flex">
                    <Button
                      type="button"
                      variant="link"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => cart.removeItem(product)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CartItems;
