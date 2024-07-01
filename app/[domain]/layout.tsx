import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getStore } from "@/lib/queries";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { domain: string };
}) => {
  const store = await getStore(params.domain);
  if (!store) redirect(`${process.env.NEXT_PUBLIC_URL}`);

  return (
    <main className="relative flex flex-col min-h-screen">
      <Navbar store={store} />
      <div className="flex-grow flex-1 h-full flex flex-col">{children}</div>
      <Footer store={store} />
    </main>
  );
};

export default Layout;

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}) {
  const store = await getStore(params.domain);

  return {
    title: store.name,
    description: store.name,
  };
}
