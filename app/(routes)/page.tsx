import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";

const Home = async () => {
  const products = await getProducts({
    isFeatured: true,
    categoryId: "",
  });
  const billboard = await getBillboard("8947471c-b5ab-4fc4-99fe-f77362b728e4");
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
