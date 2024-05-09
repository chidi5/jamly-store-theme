import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <MaxWidthWrapper className="my-10">
      <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-4">
        <div className="m-0 p-0 col-span-2">
          <Skeleton className="h-80 w-full" />
        </div>
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 space-y-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Loading;
