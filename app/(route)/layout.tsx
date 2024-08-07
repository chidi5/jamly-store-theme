import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getStoreDetails } from "@/lib/queries";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const store = await getStoreDetails();
  if (!store) redirect("/site");

  return (
    <main className="relative flex flex-col min-h-screen">
      <Navbar store={store} />
      <div className="flex-grow flex-1 h-full flex flex-col">{children}</div>
      <Footer store={store} />
    </main>
  );
};

export default Layout;

export async function generateMetadata() {
  const store = await getStoreDetails();

  return {
    title: store.name,
    description: store.name,
  };
}
