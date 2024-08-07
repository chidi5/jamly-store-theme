import { Billboard as BillboardType } from "@/types";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type BillboardProps = {
  data: BillboardType[];
};

const Billboard = ({ data }: BillboardProps) => {
  return (
    <div className="overflow-hidden">
      {data.length === 0 ? (
        <div className="aspect-square md:aspect-[2.4/1] overflow-hidden md:min-h-80 md:h-96 md:w-full md:bg-fixed bg-no-repeat bg-cover bg-center bg-[url('/banners.jpg')] bg-black/20 bg-blend-multiply">
          <div className="w-full h-full gap-y-8 text-center flex flex-col items-center justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight sm:max-w-4xl max-w-xs text-white">
              Welcome to my store
            </h1>
            <Button
              variant="outline"
              size="lg"
              className="!bg-transparent text-white"
              asChild
            >
              <Link href="/products">Shop now</Link>
            </Button>
          </div>
        </div>
      ) : (
        data.map((billboard) => (
          <div
            key={billboard.id}
            className="aspect-square md:aspect-[2.4/1] overflow-hidden md:min-h-80 md:h-96 md:w-full md:bg-fixed bg-no-repeat bg-cover bg-center bg-black/20 bg-blend-multiply"
            style={{ backgroundImage: `url(${billboard?.imageUrl})` }}
          >
            <div className="w-full h-full gap-y-8 text-center flex flex-col items-center justify-center">
              <h1 className="text-2xl sm:text-5xl lg:text-6xl font-medium tracking-tight sm:max-w-5xl max-w-xs text-white px-1">
                {billboard.label}
              </h1>
              <Button
                variant="outline"
                size="lg"
                className="!bg-transparent text-white hover:text-gray-100"
                asChild
              >
                <Link href="/products">Shop now</Link>
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Billboard;
