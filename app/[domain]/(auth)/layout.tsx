import { currentUser } from "@/hooks/use-auth";
import { redirect } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center w-full flex-grow py-6">
      {children}
    </div>
  );
}
