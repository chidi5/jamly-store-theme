"use client";

import useCart from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { useState } from "react";
import Markdown from "react-markdown";
import Currency from "./currency";
import ProductOptions from "./product-option";
import { Button } from "./ui/button";

type InfoProps = {
  data: Product;
  n?: boolean;
};

const Info = ({ data, n }: InfoProps) => {
  const cart = useCart();

  // Handle products with variants and options
  const allVariantOptions =
    data.variants?.map((variant) => {
      const allOptions: { [key: string]: any } = {};

      variant.selectedOptions.forEach((item) => {
        allOptions[item.option.name] = item.value;
      });

      return {
        variant: variant.id,
        options: allOptions,
        variantTitle: variant.title,
        variantPrice: variant.priceData.price,
        variantInventory: variant.stock.quantity,
        variantInventoryStatus: variant.stock.inventoryStatus,
        variantQuantity: 1,
        id: data.id,
        name: data.name,
        handle: data.handle,
        images: data.images,
      };
    }) || [];

  const defaultValues: { [key: string]: any } = {};
  data.options.forEach((item) => {
    defaultValues[item.name] = item.values[0].value;
  });

  const [selectedVariant, setSelectedVariant] = useState(
    allVariantOptions[0] || null
  );
  const [selectedOptions, setSelectedOptions] = useState(defaultValues);

  const setOptions = (name: any, value: any) => {
    setSelectedOptions((prevState) => {
      const updatedOptions = { ...prevState, [name]: value };
      const matchingVariant = allVariantOptions.find(
        (item) =>
          JSON.stringify(item.options) === JSON.stringify(updatedOptions)
      );
      if (matchingVariant) {
        setSelectedVariant(matchingVariant);
        console.log(matchingVariant);
      }
      return updatedOptions;
    });
  };

  const addToCart = () => {
    if (selectedVariant) {
      cart.addItem(selectedVariant);
    } else {
      cart.addItem({
        id: data.id,
        name: data.name,
        handle: data.handle,
        images: data.images,
        variantInventory: data.stock.quantity,
        variantPrice: data.priceData.price,
        variantQuantity: 1,
        selectedOptions: selectedOptions,
      });
    }
  };

  const isOutOfStock = data.manageVariants
    ? selectedVariant.variantInventory === 0 ||
      selectedVariant.variantInventoryStatus === "OUT_OF_STOCK"
    : data.stock.quantity === 0 ||
      data.stock.inventoryStatus === "OUT_OF_STOCK";

  const getPrice = () => {
    if (data.manageVariants && selectedVariant) {
      return selectedVariant.variantPrice;
    }
    return data.priceData.price;
  };

  const getInventoryStatus = () => {
    if (data.manageVariants && selectedVariant) {
      return selectedVariant.variantInventory;
    }
    return data.stock.quantity;
  };

  return (
    <div className="lg:p-4">
      <h1 className="text-3xl sm:text-5xl xl:text-4xl font-semibold text-gray-900">
        {data.name}
      </h1>
      <div className="mt-6 flex flex-col">
        <div className="text-gray-900">
          <Currency value={getPrice()} className="text-lg font-medium" />
        </div>
        {data.options && data.options.length > 0 && (
          <>
            {data.options.map(({ name, values }) => (
              <ProductOptions
                key={`key-${name}`}
                name={name}
                values={values}
                selectedOptions={selectedOptions}
                setOptions={setOptions}
                selectedVariant={selectedVariant}
              />
            ))}
          </>
        )}
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button
          className="flex items-center gap-x-2 w-full rounded-none py-6"
          variant="outline"
          disabled={isOutOfStock}
          onClick={addToCart}
        >
          {isOutOfStock ? "Sold Out" : "Add to Cart"}
        </Button>
      </div>
      <div className="mt-4 text-left">
        <Markdown
          className={cn(
            "prose text-sm text-muted-foreground",
            n ? "line-clamp-1" : "line-clamp-none"
          )}
        >
          {data.description}
        </Markdown>
      </div>
    </div>
  );
};

export default Info;
