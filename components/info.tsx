"use client";

import useCart from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { useState } from "react";
import Markdown from "react-markdown";
import Currency from "./currency";
import ProductOptions from "./product-option";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Label } from "./ui/label";
import { Minus, Plus } from "lucide-react";
import { Input } from "./ui/input";

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
        variantTotal: variant.priceData.price,
        maxQuantity: variant.stock.trackInventory
          ? variant.stock.quantity
          : variant.stock.inventoryStatus === "IN_STOCK"
          ? 1
          : 0,
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
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const setOptions = (name: any, value: any) => {
    setSelectedOptions((prevState) => {
      const updatedOptions = { ...prevState, [name]: value };
      const matchingVariant = allVariantOptions.find(
        (item: { options: any }) =>
          JSON.stringify(item.options) === JSON.stringify(updatedOptions)
      );
      if (matchingVariant) {
        setSelectedVariant(matchingVariant);
        setSelectedQuantity(1);
        console.log(matchingVariant);
      }
      return updatedOptions;
    });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedQuantity(Number(e.target.value));
  };

  const addToCart = () => {
    if (selectedVariant) {
      cart.addItem({
        ...selectedVariant,
        variantQuantity: selectedQuantity,
        variantTotal: getPrice() * selectedQuantity,
        selectedOptions: selectedOptions,
      });
    } else {
      cart.addItem({
        id: data.id,
        name: data.name,
        handle: data.handle,
        images: data.images,
        variantInventory: data.stock.quantity,
        variantPrice: data.priceData.price,
        variantQuantity: selectedQuantity,
        variantTotal: getPrice() * selectedQuantity,
        selectedOptions: selectedOptions,
      });
    }
  };

  const isOutOfStock = data.manageVariants
    ? selectedVariant.variantInventoryStatus === "OUT_OF_STOCK" &&
      selectedVariant.variantInventory === 0
    : data.stock.inventoryStatus === "OUT_OF_STOCK" &&
      (data.stock.quantity === 0 || data.stock.quantity === null);

  const getPrice = () => {
    if (data.manageVariants && selectedVariant) {
      return selectedVariant.variantPrice;
    }
    return data.priceData.price;
  };

  const getMaxQuantity = () => {
    if (data.manageVariants && selectedVariant) {
      return selectedVariant.maxQuantity;
    }
    return data.stock.trackInventory
      ? data.stock.quantity
      : data.stock.inventoryStatus === "IN_STOCK"
      ? 1
      : 0;
  };

  const incrementQuantity = () => {
    if (selectedQuantity < getMaxQuantity()) {
      setSelectedQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="lg:p-4">
      <h1 className="text-3xl sm:text-5xl xl:text-4xl font-medium text-gray-900">
        {data.name}
      </h1>
      <div className="mt-6 flex flex-col space-y-3">
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
        <div className="max-w-36">
          <Label htmlFor="quantity">Quantity</Label>
          <div className="relative flex items-center max-w-[11rem] mt-3">
            <Button
              type="button"
              data-action="decrement"
              variant="outline"
              disabled={isOutOfStock}
              className="h-11 w-20 py-1 border-r-0 border-slate-950"
              onClick={decrementQuantity}
            >
              <Minus className="font-normal w-3 h-3" />
            </Button>
            <Input
              type="number"
              name="quantity"
              min={1}
              max={getMaxQuantity()}
              value={selectedQuantity}
              onChange={handleQuantityChange}
              className="border-x-0 border-slate-950 text-center h-11 w-full py-1 px-0 outline-none focus-visible:ring-offset-0 focus-visible:ring-0 md:text-basecursor-default flex items-center"
              placeholder="100"
              disabled={isOutOfStock}
            />
            <Button
              type="button"
              data-action="increment"
              variant="outline"
              disabled={isOutOfStock}
              className="h-11 w-20 py-1 border-l-0 border-slate-950"
              onClick={incrementQuantity}
            >
              <Plus className="font-normal w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button
          className="flex items-center gap-x-2 w-full rounded-none py-6 border-slate-950"
          variant="outline"
          disabled={isOutOfStock}
          onClick={addToCart}
        >
          {isOutOfStock ? "Sold Out" : "Add to Cart"}
        </Button>
      </div>
      <div className="mt-4 text-left">
        <h3 className="mb-2 font-medium">Product description</h3>
        <Markdown
          className={cn(
            "prose text-sm text-muted-foreground",
            n ? "line-clamp-1" : "line-clamp-none"
          )}
        >
          {data.description}
        </Markdown>
      </div>
      <div className="mt-4 text-left">
        {data.additionalInfoSections.map((info) => (
          <Accordion key={info.id} type="single" collapsible>
            <AccordionItem value={info.id}>
              <AccordionTrigger className="text-gray-700">
                {info.title}
              </AccordionTrigger>
              <AccordionContent>
                <Markdown
                  className={cn(
                    "prose text-sm text-muted-foreground",
                    n ? "line-clamp-1" : "line-clamp-none"
                  )}
                >
                  {info.description}
                </Markdown>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Info;
