"use client";

import { Product } from "@/types";
import Image from "next/image";
import React, { MouseEventHandler } from "react";
import IconButton from "@/components/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/use-preview-modal";

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const previewModal = usePreviewModal();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.handle}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    previewModal.onOpen(data);
  };
  return (
    <div
      onClick={handleClick}
      className="bg-white group space-y-4 pt-8 cursor-pointer"
    >
      <div className="aspect-square relative">
        <Image
          className="aspect-square object-cover"
          fill
          src={data?.images?.[0]?.url}
          alt={data.name}
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="hidden sm:flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      <div>
        <Link href={`/product/${data.handle}`}>
          <h5 className="mb-2 text-xs font-normal tracking-tight group-hover:underline">
            {data.name}
          </h5>
        </Link>
        {data.manageVariants ? (
          <Currency
            value={data?.variants?.[0]?.priceData.price}
            className="text-base md:text-lg font-medium"
          />
        ) : (
          <Currency
            value={data?.priceData.price}
            className="text-base md:text-lg font-medium"
          />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
