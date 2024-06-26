"use client";

import { Image as ImageType } from "@/types";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import GalleryTab from "./gallery-tab";
import { cn } from "@/lib/utils";

type GalleryProps = {
  images: ImageType[];
  className?: string;
};

const Gallery = ({ images, className }: GalleryProps) => {
  return (
    <Tab.Group as="div" className={cn("flex flex-col-reverse", className)}>
      <div className="hidden mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="aspect-square w-full">
        {images.map((image) => (
          <Tab.Panel key={image.id}>
            <div className="aspect-square relative h-full w-full overflow-hidden">
              <Image
                fill
                src={image.url}
                alt="Image"
                className="object-cover object-center"
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
