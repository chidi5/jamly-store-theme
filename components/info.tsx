"use client";

import { Product } from "@/types";
import React, { useState } from "react";
import Currency from "./currency";
import ProductOptions from "./product-option";
import { Button } from "./ui/button";

type InfoProps = {
  data: Product;
};

const Info = ({ data }: InfoProps) => {
  const allVariantOptions = data.variants?.map((variant) => {
    const allOptions: { [key: string]: any } = {};

    variant.selectedOptions.map((item) => {
      allOptions[item.option.name] = item.value;
    });

    return {
      id: variant.id,
      options: allOptions,
      variantTitle: variant.title,
      variantPrice: variant.price,
      variantInventory: variant.inventory,
      variantQuantity: 1,
    };
  });

  const defaultValues: { [key: string]: any } = {};
  data.options.map((item) => {
    defaultValues[item.name] = item.values[0].value;
  });

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0]);
  const [selectedOptions, setSelectedOptions] = useState(defaultValues);

  function setOptions(name: any, value: any) {
    setSelectedOptions((prevState) => {
      return { ...prevState, [name]: value };
    });

    const selection = {
      ...selectedOptions,
      [name]: value,
    };

    allVariantOptions.map((item) => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item);
      }
    });
  }

  return (
    <div className="lg:p-4">
      <h1 className="text-3xl sm:text-5xl xl:text-4xl font-semibold text-gray-900">
        {data.name}
      </h1>
      <div className="mt-6 flex flex-col">
        <div className="text-gray-900">
          <Currency
            value={selectedVariant.variantPrice}
            className="text-lg font-medium"
          />
        </div>
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
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button
          className="flex items-center gap-x-2 w-full rounded-none py-6"
          variant="outline"
          disabled={selectedVariant.variantInventory === "0"}
        >
          {selectedVariant.variantInventory !== "0"
            ? "Add to Cart"
            : "Sold Out"}
        </Button>
      </div>
    </div>
  );
};

export default Info;
