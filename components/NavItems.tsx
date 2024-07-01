"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavItemsProps = {
  data: Category[];
  className?: string;
};

const NavItems = ({ data, className }: NavItemsProps) => {
  const pathName = usePathname();
  const routes = data.map((route) => ({
    href: `/category/${route.handle}`,
    label: route.name,
    active: pathName === `/category/${route.handle}`,
  }));
  return (
    <nav className={cn("flex gap-6 items-center", className)}>
      {routes.map((route) => (
        <li key={route.href} className="list-none">
          <Link
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-black",
              route.active ? "text-black" : "text-gray-600"
            )}
          >
            {route.label}
          </Link>
        </li>
      ))}
    </nav>
  );
};

export default NavItems;
