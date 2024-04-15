import { Billboard as BillboardType } from "@/types";
import React from "react";

type BillboardProps = {
  data: BillboardType;
};

const Billboard = ({ data }: BillboardProps) => {
  return (
    <div className="overflow-hidden">
      <div
        className="parallax aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
      >
        <div className="w-full h-full gap-y-8 text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight sm:max-w-4xl max-w-xs">
            {data.label}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
