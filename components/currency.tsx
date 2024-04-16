"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

type CurrencyProps = {
  value: string | number;
  className: string;
};

const Currency = ({ value, className }: CurrencyProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={cn("text-gray-700", className)}>
      {formatter.format(Number(value))}
    </div>
  );
};

export default Currency;
