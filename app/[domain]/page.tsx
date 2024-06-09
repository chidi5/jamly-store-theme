import Billboard from "@/components/billboard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductList from "@/components/product-list";
import { getBillboards, getProducts } from "@/lib/queries";

const Home = async ({ params }: { params: { domain: string } }) => {
  const products = await getProducts(params.domain, {
    isFeatured: true,
  });
  const billboard = await getBillboards(params.domain, { isBanner: true });
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
