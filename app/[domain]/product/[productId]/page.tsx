import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/product-list";
import { getProduct, getProducts } from "@/lib/queries";

const Productpage = async ({
  params,
}: {
  params: { domain: string; productId: string };
}) => {
  const product = await getProduct(params.productId, params.domain);
  const suggestedProducts = await getProducts(params.domain, {
    categoryId: product?.category?.id,
    isFeatured: true,
  });
  return (
    <div className="bg-white">
      <MaxWidthWrapper className="py-10">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-4">
          <div className="m-0 p-0">
            <Gallery images={product.images} />
          </div>
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <Info data={product} />
          </div>
        </div>
        <hr className="my-10" />
        <ProductList title="Related Items" items={suggestedProducts} />
      </MaxWidthWrapper>
    </div>
  );
};

export default Productpage;
