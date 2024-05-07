import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Image as ImageType } from "@/types";
import Image from "next/image";

type CarouselProps = {
  images: ImageType[];
  className: string;
};

const GalleryCarousel = ({ images, className }: CarouselProps) => {
  return (
    <Carousel className={cn("w-full", className)}>
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <div className="p-1">
              <Card>
                <CardContent className="aspect-square relative h-full w-full overflow-hidden">
                  <Image
                    fill
                    src={image.url}
                    alt="Image"
                    className="object-cover object-center"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute !left-4" />
      <CarouselNext className="absolute !right-4" />
    </Carousel>
  );
};

export default GalleryCarousel;
