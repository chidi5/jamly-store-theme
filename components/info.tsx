import { Product } from "@/types";
import React from "react";
import Currency from "./currency";

type InfoProps = {
  data: Product;
};

const info = ({ data }: InfoProps) => {
  return (
    <div className="lg:p-4">
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-gray-900">
        {data.name}
      </h1>
      <div className="mt-6 flex items-end justify-between">
        <div className="text-gray-900">
          <Currency value={data.price} className="text-xl sm:text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default info;
