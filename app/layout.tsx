import { cn } from "@/lib/utils";
import ModalProvider from "@/providers/modal-provider";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store",
  description: "Store front Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("relative h-full antialiased", urbanist.className)}>
        <ModalProvider />
        <div>{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
