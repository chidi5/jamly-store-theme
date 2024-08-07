import Billboard from "@/components/billboard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductList from "@/components/product-list";
import { getBillboards, getProducts, getStoreDetails } from "@/lib/queries";
import { redirect } from "next/navigation";

const Home = async () => {
  const store = await getStoreDetails();

  if (!store) {
    redirect("/site");
  }

  const products = await getProducts(store.id, {
    isFeatured: true,
    limit: 10,
  });
  const billboard = await getBillboards(store.id, { isBanner: true });
  return (
    <>
      <section className="p-0 pb-10 space-y-10">
        <Billboard data={billboard} />
        <MaxWidthWrapper>
          <div className="flex flex-col gap-y-8 py-8">
            <ProductList title="Featured Products" items={products} />
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default Home;
