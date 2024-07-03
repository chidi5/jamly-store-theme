"use client";

import { getSession } from "@/lib/utils/auth";
import { useEffect } from "react";

const CustomerPage = () => {
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      console.log({ session });
    };

    fetchSession();
  }, []);
  return <div>CustomerPage</div>;
};

export default CustomerPage;
