"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavItemsProps = {
  data: Category[];
};

const NavItems = ({ data }: NavItemsProps) => {
  const pathName = usePathname();
  const routes = data.map((route) => ({
    href: `/category/${route.handle}`,
    label: route.name,
    active: pathName === `/category/${route.handle}`,
  }));
  return (
    <nav className="flex gap-6 items-center">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-base font-medium transition-colors hover:text-black",
            route.active ? "text-black" : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
