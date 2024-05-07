import { OptionValue } from "@/types";
import React from "react";

type ProductOptionProps = {
  name: string;
  values: OptionValue[];
  selectedOptions: any;
  setOptions: any;
  selectedVariant: any;
};

const ProductOptions = ({
  name,
  values,
  selectedOptions,
  setOptions,
  selectedVariant,
}: ProductOptionProps) => {
  return (
    <fieldset className="mt-3">
      <legend className="font-semibold text-sm">{name}</legend>
      <div className="inline-flex items-center flex-wrap">
        {values.map((value) => {
          const id = value.id;
          const checked = selectedOptions[name] === value.value;

          return (
            <label key={id} htmlFor={id}>
              <input
                className="sr-only"
                type="radio"
                id={id}
                name={`option-${name}`}
                value={value.value}
                checked={checked}
                onChange={() => {
                  setOptions(name, value.value);
                }}
              />
              <div
                className={`p-2 mt-3 text-sm cursor-pointer mr-3 ${
                  checked
                    ? "text-white bg-gray-900"
                    : "text-gray-900 bg-gray-200"
                }`}
              >
                <span className="px-2 text-sm">{value.value}</span>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default ProductOptions;
