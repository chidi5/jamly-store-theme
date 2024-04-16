import { cn } from "@/lib/utils";
import { Image as ImageType } from "@/types";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import React from "react";

type GalleryTabProps = {
  image: ImageType;
};

const GalleryTab = ({ image }: GalleryTabProps) => {
  return (
    <Tab className="relative flex aspect-square cursor-pointer items-center justify-center bg-white">
      {({ selected }) => (
        <div>
          <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden">
            <Image
              fill
              src={image.url}
              alt="image"
              className="object-cover object-center"
            />
            <span
              className={cn(
                "absolute inset-0 ring-1 ring-offset-1",
                selected ? "ring-muted-foreground" : "ring-transparent"
              )}
            ></span>
          </span>
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
