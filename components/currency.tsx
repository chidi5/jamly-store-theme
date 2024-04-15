"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

type CurrencyProps = {
  value: string | number;
};

const Currency = ({ value }: CurrencyProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="text-lg text-gray-700">
      {formatter.format(Number(value))}
    </div>
  );
};

export default Currency;
